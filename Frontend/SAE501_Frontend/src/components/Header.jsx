import { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";

import Cookies from 'js-cookie';
import logout from "./Logout";

function Header() {
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
    const navigate = useNavigate();

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!isMobileMenuOpen);
    };

    const loginNav = () => {
        if (Cookies.get('pharminnov_login')) {
            return (
                <>
                    <NavLink to="/" className="text-white" onClick={logout}>Se déconnecter</NavLink>
                    <NavLink to="/commande/liste" className="text-white">Commandes</NavLink>
                    <NavLink to="/dashboard" className="text-white">Tableau de bord</NavLink>
                </>
            );
        }
        return <NavLink to="/login" className="text-white">Se connecter</NavLink>;
    }

    const loginNavPhone = () => {
        if (Cookies.get('pharminnov_login')) {
            return (<>
            <NavLink to="/" className="block text-white bg-emerald-800 px-4 py-2 rounded" onClick={logout}>Se déconnecter</NavLink>
            <NavLink to="/commande/liste" className="block text-white bg-emerald-800 px-4 py-2 rounded">Commandes</NavLink>
            <NavLink to="/dashboard" className="block text-white bg-emerald-800 px-4 py-2 rounded">Tableau de bord</NavLink>

            </>)
        }
        return <NavLink to="/login" className="block text-white bg-emerald-800 px-4 py-2 rounded">Se connecter</NavLink>
    }

    return (
        <>
            {/* navbar pour les ordis */}
            <div className="hidden lg:flex bg-emerald-600 justify-between items-center p-4">
                <div className="flex items-center">
                    <button onClick={() => navigate("/")}>
                        <img src="/logo_site.png" alt="Logo" className="h-12 mr-2" />
                    </button>
                </div>
                <div className="flex space-x-4">
                    <NavLink to="/" className="text-white">Accueil</NavLink>
                    <NavLink to="/medicaments" className="text-white">Médicaments</NavLink>
                    <NavLink to="/" className="text-white">Visite Virtuelle</NavLink>
                    {/* <NavLink to="/login" className="text-white">Se connecter</NavLink> */}
                    {loginNav()}
                    
                </div>
            </div>

            {/* logo pour le menu burger */}
            <div className="lg:hidden bg-emerald-600 p-4">
                <div className="flex justify-between items-center">
                    <button onClick={() => navigate("/")}>
                        <img src="/logo_site.png" alt="Logo" className="h-8" />
                    </button>
                    <button
                        onClick={toggleMobileMenu}
                        className="text-white focus:outline-none"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                        </svg>
                    </button>
                </div>

                {/* navbar pour télephone */}
                {isMobileMenuOpen && (
                    <div className="mt-2 space-y-2">
                        <NavLink to="/" className="block text-white bg-emerald-800 px-4 py-2 rounded">Accueil</NavLink>
                        <NavLink to="/medicaments" className="block text-white bg-emerald-800 px-4 py-2 rounded">Médicaments</NavLink>
                        <NavLink to="/" className="block text-white bg-emerald-800 px-4 py-2 rounded">Visite Virtuelle</NavLink>
                        {/* <NavLink to="/login" className="block text-white bg-emerald-800 px-4 py-2 rounded">Se connecter</NavLink> */}
                        {loginNavPhone()}
                    </div>
                )}
            </div>
        </>
    );
}

export default Header;
