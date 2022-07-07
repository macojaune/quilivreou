import React, {useState} from 'react';
import Link from 'next/link';
import TextInput from "../components/TextInput";
import {useLazyQuery} from "@apollo/client";
import {SiteDataQuery, SitesQuery} from "../graphql/queries";

interface Site {
    id: number
    attributes: {
        url: string
        title: string
        slug: string
        description: string
        image: string
        createdAt: string
        updatedAt: string
        publishedAt: string
    }
}


export default function AddSite() {
    const [fetchSites, {data, loading, error}] = useLazyQuery(SitesQuery)
    const [fetchSiteData, {
        data: siteData,
        loading: siteDataLoading,
        error: siteDataError
    }] = useLazyQuery(SiteDataQuery)

    const sites = data?.sites?.data
    const siteMeta = siteData?.siteData

    const [url, setUrl] = useState("")
    const [site, setSite] = useState()

    const stripUrl = (url: string) => {
        let toRemove = ""
        let newUrl

        if (url.startsWith("http://"))
            toRemove = "http://"
        if (url.startsWith("https://"))
            toRemove = "https://"

        newUrl = url.slice(toRemove.length)

        if (newUrl.startsWith("www."))
            return newUrl.slice(4)

        return newUrl
    }

    const checkIfSiteExists = async (val) => {
        setUrl(val)
        if (val.length < 3)
            return
        const url = stripUrl(val.target.value)
        await fetchSites({variables: {url}})
        if (sites?.length === 0) {
            //no sites with this URL
            await fetchSiteData({variables: {url: "http://" + url}})
        }
    }

    const next = () => {
        // todo go to next step

    }

    return (
        <div>
            <main className="md:max-w-6xl mx-auto">
                <header className="px-3 md:my-10 flex flex-row justify-between items-center">
                    <Link href="/">
                        <a className="font-extrabold text-3xl md:text-6xl">
                            QuiLivreOù?
                        </a>
                    </Link>
                    <a className="text-xs font-bold underline hover:decoration-4"
                       target="_blank" href="https://t.me/macojaune" rel="noreferrer">
                        On dirait que ce site à besoin d&apos;un design ?
                        T&apos;as ça en stock ??</a>
                </header>
                <section className="mt-5 px-4">
                    <h1 className="text-3xl font-extrabold mb-5">Ajoute ton site préféré</h1>
                    <form action="">
                        {error && <p className="accent-red-500">{error.message}</p>}
                        <TextInput placeholder="URL du site"
                                   label="tape l'url du site (quilivreou.fr par exemple)"
                                   title="url" handleChange={checkIfSiteExists}
                                   isLoading={loading}
                        />
                        <div>
                            {sites?.length > 0 && <div>
								<p className="text-lg font-semibold">On dirait qu'on l'à déjà en
									machine ?</p>
								<ul className="flex justify-around">
                                    {sites.map(({attributes: s}, index) =>
                                        <li className="flex flex-col justify-evenly w-1/3 p-3 border-2 border-black cursor-pointer"
                                            key={s.slug} onClick={next}>
                                            <h3 className="font-bold">{s.title}</h3>
                                            <span>{s.url}</span>
                                            {/*    Todo catégories */}
                                        </li>
                                    )}
								</ul>
							</div>}
                        </div>
                        {/*    Site Preview */}
                        <div
                            className="w-[70%] mx-auto px-8 my-4 border-2 border-black border-dashed rounded-2xl">
                            {url !== '' && site && <>
								<div>
									<h2 className="font-bold text-2xl">{site?.data?.attributes?.title}</h2>
									<p className="text-sm">{site?.data?.attributes?.description}</p>
								</div>
                                {/*<Image src={site?.image} alt="" width={300} height={200}/>*/}
							</>
                            }
                            {((url.length <= 3 || !site) && !siteMeta) &&
								<p>Colle ou tape l'URL, on s'occupe du reste</p>}
                            {siteMeta &&
								<div className="flex flex-row items-center justify-between gap-2">
									<div className="flex-grow">
										<p className="font-semibold"><strong
											className="font-bold uppercase">{siteMeta.domain}</strong> - {siteMeta.title}
										</p>
										<p>{siteMeta.description}</p>
									</div>
									<div className="w-1/3">
										<img
											src={siteMeta.images[siteMeta.images.length - 1]}
											className="h-full" alt=""/>
                                    </div>
								</div>}
                        </div>
                        {/*    */}
                        <TextInput placeholder="Catégories"
                                   label="sélectionne une ou plusieurs catégories"
                                   title="category"/>
                        <TextInput placeholder="Pays"
                                   label="tape le pays d'origine du site (si tu le connnais)"
                                   title="region"/>
                        <button type="submit"
                                className="md:mt-12 p-6 w-full text-center text-2xl bg-black text-white">
                            Let's go
                        </button>
                    </form>
                </section>
            </main>
        </div>)
}
