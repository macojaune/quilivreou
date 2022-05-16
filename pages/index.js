import ShareLink from 'react-twitter-share-link'
import Head from 'next/head'
import Image from 'next/image'
import logoQlo from '../assets/images/logo-qlo.png'

export default function Home({sites}) {
	return (
		<div>
			<Head>
				<title>QuiLivreOù?</title>
				<meta name="description"
				      content="L&apos;annuaire des sites et boutiques qui livrent vers les Antilles"/>
				<link rel="icon" href="/favicon.ico"/>
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
						Depuis rien n&apos;a bougé <i>(les priorités, tu connais)</i>. Pourtant, si tu
						cherches <i>"qui livre en guadeloupe"</i>, le site est parmi les 1ers
						résultats Google, <i className="font-semibold">"WouaaW"</i>.</p>
				</section>
				<section className="mt-5 px-4">
					<h2 className="text-xl md:text-2xl font-semibold mb-3">Aujourd&apos;hui j&apos;ai eu
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
							Objectif n°1 : Partager 33 tweets avec le hashtag #BidimBo
						</h2>
						<Image src={logoQlo} alt="Capture du premier tweet"/>
					</div>
					<div className="sticky bottom-0 inset-x-0">
						<ShareLink
							text="C&apos;est parti pour la refonte @quilivreou il nous faut 33 tweets pour atteindre la prochaine étape !"
							link="https://quilivreou.fr" hashtags={['BidimBo']}>
							{link => <a
								className="inline-block p-6 w-full h-full text-center text-2xl bg-black text-white"
								href={link} target="_blank"  rel="noreferrer">Partage le projet</a>}
						</ShareLink>
					</div>
				</section>
				<section className="mt-5 px-4">
					<h2 className="text-xl md:text-2xl font-bold mb-3">Les sites{" "}
						<small className="font-normal italic text-sm md:text-base">ajoutés sur
							l&apos;ancienne version</small></h2>
					<div className="flex flex-row flex-wrap gap-2">
						{sites && sites.map(s => <a className="underline hover:decoration-4 font-semibold"
						                            key={s?.id}>{s?.title?.rendered}</a>)}
					</div>
				</section>
			</main>
			<footer className="px-6 my-12 text-center">
				<p className="font-semibold text-blue-500">Pondu avec humour par <a className="underline hover:decoration-4" href="https://marvinl.com" target="_blank" rel="noreferrer">MarvinL.com</a></p>
			</footer>
		</div>
	)
}


export async function getStaticProps() {
	const res = await fetch("http://quilivreou.fr/wp-json/wp/v2/posts?per_page=100")
	const data = await res.json()
	console.log(data)
	return {props: {sites: data}}
}
