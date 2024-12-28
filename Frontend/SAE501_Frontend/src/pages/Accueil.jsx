
function Accueil() {

    return (
        <>
            <div className="bg-orange-100 pb-10">
                <div className="bg-cover bg-center h-70 lg:py-52 relative" style={{ backgroundImage: "url('/arriereplan.jpg')" }}>
                    <div className="absolute inset-0 bg-black opacity-65"></div>
                    <h1 className="relative text-4xl text-white py-24 px-16 text-center md:text-5xl lg:text-6xl lg:py-32 lg:px-32">Bienvenue sur PharmInnov</h1>
                </div>
                <h2 className="underline decoration-solid text-center font-bold text-xl md:text-2xl lg:text-3xl mt-14">C'est quoi PharmInnov ?</h2>
                <p className="text-justify px-4 text-sm md:text-base lg:text-lg lg:px-48 font-medium mt-10">
                Dans un monde où l'accès aux médicaments est indispensable pour la santé de chacun, 
                l’évolution vers des solutions numériques se dessine de plus en plus. 
                Pharminnov est une réponse à ce besoin : une pharmacie en ligne qui propose du 
                « click and collect » permettant aux patients un gain de temps précieux ainsi qu’une 
                obtention de leur traitement simplement et efficacement. Avec Pharminnov, les patients 
                peuvent importer leur ordonnance sur le site et, une fois cette dernière vérifiée par 
                le médecin inscrit en bas de page, ils reçoivent un bon de commande contenant tous leurs 
                médicaments, ainsi qu’une notification si un ou plusieurs médicaments sont manquants. 
                Cela permet d’avoir une visibilité sur la disponibilité des produits en pharmacie, 
                sans avoir à se déplacer.
                </p>
            </div>
        </>
    )

}

export default Accueil

