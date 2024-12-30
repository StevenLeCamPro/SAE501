import { NavLink } from "react-router-dom";
import Api from "./Api";
import { useEffect, useState } from "react";

function MedList() {
  const [produits, setProduits] = useState([]);

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
    <div className="bg-white pb-10">
      <h1 className="text-2xl font-bold text-center mt-6">
        Liste des médicaments
      </h1>
      <div class="p-6 overflow-scroll xl:overflow-hidden px-0">
        <table class="mt-4 w-full min-w-max table-auto text-left">
          <thead>
            <tr class="text-sm leading-normal">
              <th class="xl:text-xl text-nunito border-y border-gray-300 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
                Nom
              </th>
              <th class="xl:text-xl text-nunito border-y border-gray-300 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
                Description
              </th>
              <th class="xl:text-xl text-nunito border-y border-gray-300 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
                Prix
              </th>
              <th class="xl:text-xl text-nunito border-y border-gray-300 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
                Catégorie
              </th>
              <th class="xl:text-xl text-nunito border-y border-gray-300 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {produits.map((produit) => (
              <tr key={produit.id} class="text-sm leading-normal">
                <td class="xl:text-xl text-nunito border-y border-gray-300 p-4">
                  {produit.nom}
                </td>
                <td class="xl:text-xl text-nunito border-y border-gray-300 p-4">
                  {produit.description}
                </td>
                <td class="xl:text-xl text-nunito border-y border-gray-300 p-4">
                  {produit.prix} € unité
                </td>
                <td class="xl:text-xl text-nunito border-y border-gray-300 p-4">
                  {produit.categorie}
                </td>
                <td class="xl:text-xl text-nunito border-y border-gray-300 p-4">
                  <div className="flex ">
                    <NavLink to={`/medsbyid?id=${produit.id}`} class="" >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" class="h-4 w-4">
                        <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z"></path>
                      </svg>
                    </NavLink>
                    <NavLink to={`/dashboard/updateMed?id=${produit.id}`} class="mx-4" >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" class="h-4 w-4">
                        <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z"></path>
                      </svg>
                    </NavLink>
                    <NavLink to={`/medsbyid?id=${produit.id}`} class="" >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" class="h-4 w-4">
                        <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z"></path>
                      </svg>
                    </NavLink>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MedList;
