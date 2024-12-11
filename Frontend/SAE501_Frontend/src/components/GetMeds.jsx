import { NavLink } from "react-router-dom";
import Api from "./Api";
import { useEffect, useState } from "react";

function GetMeds() {

    const [produits, setProduits] = useState([])

    const fetchProduits = async () => {
        try {
            const result = await Api("produit", "get", null, null);
            setProduits(result);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    useEffect(() => {
        fetchProduits();
    }, []);

    return (
        <div className="bg-orange-100 pb-10">
            <h1 className="text-center font-bold text-2xl py-10 xl:text-4xl">Liste des médicaments</h1>
            <div>
                <span>Espace pour le filtre</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 p-6 mb-8">

                {produits.map((produit, index) => {
                    var imagePath = "http://127.0.0.1:8000" + produit.image
                    return (
                        <div className="border-2 border-emerald-600 rounded-md bg-white shadow-lg p-4 mb-8" key={index}>
                            <div className="flex justify-center">
                                <img src={imagePath} alt={produit.image} className="w-full h-auto xl:h-5/6 xl:w-5/6" />
                            </div>
                            <div className="flex justify-between items-center xl:mb-4 px-4">
                                <div>
                                    <p className="font-bold text-lg xl:text-2xl">{produit.nom}</p>
                                    {/* <p className="font-bold text-lg xl:text-2xl">Boîte de 16 gélules</p> */}
                                </div>
                                <div>
                                    <p className="font-bold text-lg xl:text-2xl">{produit.prix} €</p>
                                </div>
                            </div>
                            <div className="flex justify-between items-center px-4">
                                <p className="flex text-base xl:text-xl"><img src="stock.svg" alt="stock" className="h-6 xl:h-8" />Disponible</p>
                                <p className="text-base xl:text-xl">25 en stock</p> {/* uniquement pour les pharmaciens */}
                            </div>
                            <div className="text-center my-4 xl:mt-10">
                                <button className="bg-emerald-600 text-white px-4 py-4 rounded-md text-base xl:text-2xl"><NavLink to={`/medsbyid?id=${produit.id}`}>Voir les détails</NavLink></button>
                            </div>
                        </div>
                    )
                })}

            </div>
        </div>
    );
}

export default GetMeds;
