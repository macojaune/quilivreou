import React from 'react';
import Link from 'next/link';
import Image from "next/image";
import TextInput from "../components/TextInput";


export default function AddSite() {

    const site = {
        url: "quilivreou.fr",
        title: "QuiLivreOù?",
        categories: ["Prêt-à-porter", ""],
        description: "Trouve les sites qui livrent vers les Antilles-Guyane et partage tes sites marchands préférés.",
        image: "https://via.placeholder.com/300x200"
    }

    return (
        <div>
            <main className="md:max-w-6xl mx-auto">
                <div className="md:my-10 flex flex-row justify-between items-center">
                    <Link href="/">
                        <a className="font-extrabold text-3xl md:text-6xl">
                            QuiLivreOù?
                        </a>
                    </Link>
                    <a className="text-xs font-bold underline hover:decoration-4"
                       target="_blank" href="https://t.me/macojaune" rel="noreferrer">
                        On dirait que ce site à besoin d&apos;un design ?
                        T&apos;as ça en stock ??</a>
                </div>
                <section className="mt-5 px-4">
                    <h1 className="text-3xl font-extrabold mb-5">Ajoute ton site préféré</h1>
                    <form action="">
                        <TextInput placeholder="URL du site"
                                   label="tape l'url du site (quilivreou.fr par exemple)"
                                   title="url"/>
                        {/*    Site Preview */}
                        <div
                            className="w-[70%] h-40 mx-auto px-8 my-4 flex flex-row items-center justify-evenly border-2 border-black border-dashed rounded-2xl">
                            {site && <>
								<div>
									<h2 className="font-bold text-2xl">{site?.title}</h2>
									<p className="text-sm">{site?.description}</p>
								</div>
								<Image src={site?.image} alt="" width={300} height={200}/>
							</>
                            }
                            {!site && <p>Colle ou tape l'URL, on s'occupe du reste</p>}
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
