import ShareLink from 'react-twitter-share-link'
import Head from 'next/head'
import Image from 'next/image'
import logoQlo from '../assets/images/logo-qlo.png'
import tweetQlo from '../assets/images/tweet-qlo.png'

import gtag from '../lib/gtag'
import useSWR from 'swr'

const fetcher = (...args) => fetch(...args).then(res => res.json())

export default function Home({sites}) {
	const {data} = useSWR('/api/twitter', fetcher)

	const handleClick = () => {
		gtag.event({
			action: 'share_tweet',
			category: 'engagement',
			label: "challenge1"
		})
	}
	return (
		<div>
			<Head>
				<title>QuiLivreOù? - L&apos;annuaire des boutiques qui livrent aux
					Antilles-Guyane</title>
				<meta charSet="utf-8"/>
				<meta name="viewport" content="initial-scale=1.0, width=device-width"/>
				<meta name="title"
				      content="QuiLivreOù? - L'annuaire des boutiques qui livrent aux Antilles-Guyane"/>
				<meta name="description" content="Participe au développement du projet !
				Trouve les sites qui livrent vers les Antilles-Guyane et partage tes sites marchands préférés."/>

				<meta property="og:type" content="website"/>
				<meta property="og:url" content="https://quilivreou.fr/"/>
				<meta property="og:title"
				      content="QuiLivreOù? - L'annuaire des boutiques qui livrent aux Antilles-Guyane"/>
				<meta property="og:description" content="Participe au développement du projet !
				Trouve les sites qui livrent vers les Antilles-Guyane et partage tes sites marchands préférés."/>
				<meta property="og:image" content="https://quilivreou.fr/screen.JPG"/>

				<meta property="twitter:card" content="summary_large_image"/>
				<meta property="twitter:url" content="https://www.quilivreou.fr/"/>
				<meta property="twitter:site" content="@quilivreou"/>
				<meta property="twitter:title"
				      content="QuiLivreOù? - L'annuaire des boutiques qui livrent aux Antilles-Guyane"/>
				<meta property="twitter:description" content="Participe au développement du projet !
				Trouve les sites qui livrent vers les Antilles-Guyane et partage tes sites marchands préférés."/>
				<meta property="twitter:image" content="https://www.quilivreou.fr/screen.JPG"/>
				<link rel="icon" href="/favicon.bmp"/>
			</Head>

			<main className="md:max-w-6xl mx-auto ">
				<div className="text-center mb-3 px-4">
					<a className="text-xs font-bold underline hover:decoration-4"
					   href="https://t.me/macojaune">
						On dirait que ce site à besoin d&apos;un design ? T&apos;as ça en stock
						??</a>
				</div>
				<div
					className="flex flex-row items-center gap-2 px-4 justify-between md:justify-around">
					<div className="md:w-1/5">
						<Image src={logoQlo} height="390" width="530" alt="logo QuiLivreOù"/>
					</div>
					<span className="md:text-xl">devient</span>
					<span className="font-extrabold text-3xl md:text-6xl">
                QuiLivreOù?
            </span>
				</div>
				<section className="mt-5 px-4">
					<p className="text-xl md:text-2xl">
						<b>QuiLivreOù?</b> C’est l’annuaire des sites qui livrent vers nos îles et
						territoires.
					</p>
					<p className="mt-5 text-sm md:text-base">
						En 2015, sur un coup de tête comme celui-ci, je lance quilivreou.fr. Un
						thème wordpress gratuit avec un formulaire sur mesure et un fonctionnement
						sommaire, simple. Efficace ? Pas trop.<br/>
						Depuis rien n&apos;a bougé <i>(les priorités, tu connais)</i>. Pourtant, si
						tu
						cherches <i>&quot;qui livre en guadeloupe&quot;</i>, le site est parmi les
						1ers
						résultats Google, <i className="font-semibold">&quot;WouaaW&quot;</i>.</p>
				</section>
				<section className="mt-5 px-4">
					<h2 className="text-xl md:text-2xl font-semibold mb-3">Aujourd&apos;hui
						j&apos;ai eu
						l&apos;idée de le retaper d&apos;<a className="underline hover:decoration-4"
						                                    href="https://www.figma.com/file/QCZURRHmMDw27kxeLo0px1/QuiLivreO%C3%B9-Road-to-v2"
						                                    target="_blank" rel="noreferrer">une
							façon stimulante</a>.</h2>
					<div className="flex justify-center">
						<ol className="list-decimal text-lg">
							<li>Je développe et publie une fonctionnalité</li>
							<li className="font-semibold text-lg">Vous testez et faites péter
								l&apos;objectif
							</li>
							<li>Je passe à la suivante et <b>RE-BE-LOTE</b></li>
						</ol>
					</div>
					<p className="text-center my-2 font-bold">Chaud·es ?</p>
				</section>
				<section className="mt-5">
					<div className="px-4 mb-3  md:text-center">
						<h2 className="text-xl md:text-3xl font-extrabold mb-3">
							Objectif n°1 : Partager {" "}
							{data && <span>{data}<small>/33</small></span> || 33} tweets avec le
							hashtag #BidimBo
						</h2>
						<Image src={tweetQlo} width={1640} height={742}
						       alt="Capture du premier tweet"/>
					</div>
					<div className="sticky bottom-0 inset-x-0">
						<ShareLink
							text={`C'est parti pour la refonte @quilivreou il nous faut ${data ? 'encore '+ (33-data) : '33'} tweets pour atteindre la prochaine étape !`}
							link="https://www.quilivreou.fr" hashtags={['BidimBo']}
							onClick={handleClick}>
							{link => <a
								className="inline-block p-6 w-full h-full text-center text-2xl bg-black text-white"
								href={link} target="_blank" rel="noreferrer">Partage le projet</a>}
						</ShareLink>
					</div>
				</section>
				<section className="mt-5 px-4">
					<h2 className="text-xl md:text-2xl font-bold mb-3">Les sites{" "}
						<small className="font-normal italic text-sm md:text-base">ajoutés sur
							l&apos;ancienne version</small></h2>
					<div className="flex flex-row flex-wrap gap-2">
						{sites && sites.map(s => <a
							className="underline hover:decoration-4 font-semibold"
							key={s?.id}>{s?.title?.rendered}</a>)}
					</div>
				</section>
			</main>
			<footer className="px-6 my-12 text-center">
				<p className="font-semibold text-blue-500">Pondu avec humour par <a
					className="underline hover:decoration-4" href="https://marvinl.com"
					target="_blank" rel="noreferrer">MarvinL.com</a></p>
			</footer>
		</div>
	)
}


export async function getStaticProps() {
	const res = await fetch("http://old.quilivreou.fr/wp-json/wp/v2/posts?per_page=100")
	const data = await res.json()
	return {props: {sites: data}}
}
