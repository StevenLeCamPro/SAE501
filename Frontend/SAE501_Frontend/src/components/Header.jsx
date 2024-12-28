import { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";

function Header() {
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
    const navigate = useNavigate();

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!isMobileMenuOpen);
    };

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
                    <NavLink to="/login" className="text-white">Se connecter</NavLink>
                    <NavLink to="/dashboard" className="text-white">Tableau de Bord</NavLink>
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
                        <NavLink to="/login" className="block text-white bg-emerald-800 px-4 py-2 rounded">Se connecter</NavLink>
                        <NavLink to="/dashboard" className="block text-white bg-emerald-800 px-4 py-2 rounded">Tableau de Bord</NavLink>
                    </div>
                )}
            </div>
        </>
    );
}

export default Header;
