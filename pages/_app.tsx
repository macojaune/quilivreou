import '../assets/styles/global.css'
import {useRouter} from "next/router";
import Script from 'next/script'
import {useEffect} from "react";
import * as gtag from '../lib/gtag'
import {ApolloProvider, useLazyQuery, useMutation} from "@apollo/client";
import apolloClient from "../lib/apollo";
import {DO_ANONYMOUS_SIGNUP} from "../graphql/mutations";
import {RandomUserQuery} from "../graphql/queries";


const MyApp = ({Component, pageProps}) => {
    const router = useRouter()
    const [fetchRandomUser, {
        data,
        error
    }] = useLazyQuery(RandomUserQuery, {client: apolloClient})
    const [doAnonymousSignup, _] = useMutation(DO_ANONYMOUS_SIGNUP, {client: apolloClient})

    useEffect(() => {
            //todo handle anonymous Login
            const token = localStorage.getItem('token')
            if (!token) {
                (async () => {
                    try {
                        await fetchRandomUser()
                        if (!error && data?.randomUser) {
                            const {data: {register}} = await doAnonymousSignup({variables: data.randomUser})
                            //save token
                            localStorage.setItem('token', register?.jwt)
                        }
                    } catch (e) {
                        console.error(e)
                    }
                })()

            }
        },
        []
    )

    useEffect(() => {
        const handleRouteChange = (url) => {
            gtag.pageview(url)
        }
        router.events.on('routeChangeComplete', handleRouteChange)
        router.events.on('hashChangeComplete', handleRouteChange)
        return () => {
            router.events.off('routeChangeComplete', handleRouteChange)
            router.events.off('hashChangeComplete', handleRouteChange)
        }
    }, [router.events])

    return <>
        {/* Global Site Tag (gtag.js) - Google Analytics */}
        <Script
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
        />
        <Script
            id="gtag-init"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
                __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${gtag.GA_TRACKING_ID}', {
                page_path: window.location.pathname,
              });
            `,
            }}
        />
        <ApolloProvider client={apolloClient}>
            <Component {...pageProps} />
            <footer className="px-6 my-12 text-center">
                <p className="font-semibold text-blue-500">Pondu avec humour par <a
                    className="underline hover:decoration-4" href="https://marvinl.com"
                    target="_blank" rel="noreferrer">MarvinL.com</a></p>
            </footer>
        </ApolloProvider>
    </>
}

export default MyApp
