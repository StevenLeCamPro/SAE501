import { NavLink, useNavigate } from "react-router-dom";
import Api from "./Api";
import { useEffect, useState } from "react";
import roleValidator from "./CookieValidator";
import { handleValidateCommande, handleDeleteCommande } from './CommandeUpload';
import Cookies from 'js-cookie';

function CommandeGet() {
    const [commandes, setCommandes] = useState([]); // Initialisation avec un tableau vide
    const navigate = useNavigate();
    const userCookie = Cookies.get("pharminnov_login");
    const { user_id } = JSON.parse(userCookie);

    const fetchCommandes = async () => {
        try {
            const result = await Api("commande/userid", "get", user_id, null);
            setCommandes(Array.isArray(result) ? result : []); // Assurez que le résultat est un tableau
        } catch (error) {
            console.error("Error fetching commandes:", error);
            setCommandes([]); // Définit un tableau vide en cas d'erreur
        }
    };

    useEffect(() => {
        const checkAccess = async () => {
            const access = await roleValidator(1);
            console.log(access);

            if (!access) {
                navigate('/');
                return;
            }

            fetchCommandes();
        };
        checkAccess();
    }, []);

    return (
        <div className="bg-orange-100 pb-10">
            <h1 className="text-center font-bold text-2xl py-10 xl:text-4xl">Liste des commandes</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 p-6 mb-8">
                {commandes && commandes.length > 0 ? (
                    commandes.map((commande, index) => (
                        <div className="border-2 border-emerald-600 rounded-md bg-white shadow-lg p-4 mb-8" key={index}>
                            <div className="px-4 text-center">
                                <p className="font-bold  text-lg xl:text-2xl">Commande #{commande.id}</p>
                                
                            </div>
                            <div className="px-4 my-4">
                               
                                <p className="text-base xl:text-xl"><span className="font-bold">Produits :</span></p>
                                <ul className="list-disc pl-8 text-base xl:text-xl">
                                {commande.quantites && Object.keys(commande.quantites).length > 0 ? (
                Object.entries(commande.quantites).map((medicament, index) => (
                    <li key={index}>
                        <p> {medicament[1].Nom} {medicament[1].dosage}</p>
                        <p>- Quantité : {medicament[1].quantite}</p>
                        <p>- Prix unitaire : {medicament[1].prix} €</p>
                        
                    </li>
                ))
            ) : (
                <li>Aucun médicament trouvé pour cette commande.</li>
            )}

                                </ul>
                            </div>
                            <p className="text-base xl:text-xl"><span className="font-bold">Prix total :</span> {commande.prix_total ? commande.prix_total.toFixed(2) : 'Non calculé'} €</p>
                            <div className="flex justify-around my-4 xl:mt-10">
                                
        <button onClick={() => handleValidateCommande(commande.id, setCommandes)} className="bg-emerald-600 text-white px-4 py-4 rounded-md text-base xl:text-xl">Valider</button>
        <button onClick={() => handleDeleteCommande(commande.id, setCommandes)} className="bg-red-600 text-white px-4 py-4 rounded-md text-base xl:text-xl">Supprimer</button>

                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-lg xl:text-2xl">Aucune commande disponible.</p>
                )}
            </div>
        </div>
    );
}

export default CommandeGet;
