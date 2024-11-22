
function Header() {

    return(
        <>
            <div className="bg-emerald-600 flex justify-between items-center p-4">
                <div className="flex items-center">
                    <img src="/logo_site.png" alt="Logo" className="h-8 mr-2" />
                </div>
                <div className="flex space-x-4">
                    <a href="/" className="text-white">Accueil</a>
                    <a href="/medicaments" className="text-white">Médicaments</a>
                    <a href="/categories" className="text-white">Visite Virtuelle</a>
                    <a href="/recherche" className="text-white">Se connecter</a>
                </div>
            </div>
        </>
    )

}

export default Header