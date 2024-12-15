import { useEffect, useState } from "react";
import Api from "./Api";
import { useNavigate } from "react-router-dom";

function UpdateProduit() {
    const [id, setId] = useState();
    const [nom, setNom] = useState("");
    const [description, setDescription] = useState("");
    const [prix, setPrix] = useState(0);
    const [categorie, setCategorie] = useState([]);
    const [databaseCategories, setDatabaseCategories] = useState([])
    const [images, setImage] = useState("file");
    const [file, setFile] = useState(null);
    const [databaseImages, setDatabaseImages] = useState([]);
    const [databaseProduit, setDatabaseProduit] = useState([])

    const navigate = useNavigate();

    const fetchDatabaseCategories = async () => {
        try {
            const result = await Api("categorie", "get", null, null)
            setDatabaseCategories(result)
        } catch (error) {
            console.error("Erreur lors de la récupération des catégories:", error)
        }
    }

    const fetchDatabaseImages = async () => {
        try {
            const result = await Api("image", "get", null, null);
            setDatabaseImages(result);
        } catch (error) {
            console.error("Error fetching images:", error);
        }
    };

    const fetchProduitList = async () => {
        try {
            const produit = await Api("produit", "get", null, null);
            setDatabaseProduit(produit)
        } catch (error) {
            console.error("Error fetching product data:", error);
        }
    };

    useEffect(() => {
        fetchDatabaseCategories();
        fetchDatabaseImages();
        fetchProduitList();
    }, []);

    useEffect(() => {
        databaseProduit.map((produit) => {
            if (produit.id == id) {
                setNom(produit.nom)
                setDescription(produit.description)
                setCategorie(produit.categorie[0])
                setPrix(produit.prix)
                if (produit.imageId) {
                    setImage(produit.imageId)
                }
            }
        })
    }, [id])

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const fileInput = () => {
        if (images === "file") {
            return <input type="file" onChange={handleFileChange} />;
        }
        return null;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // if (!nom.trim()) {
        //     alert("Veuillez entrer le nom du produit");
        //     return;
        // }
        // if (!description.trim()) {
        //     alert("Veuillez entrer la description du produit");
        //     return
        // }
        // if (!prix.trim()) {
        //     alert("Veuillez entrer le prix du produit");
        //     return
        // }

        let imageId = images;

        if (images === "file" && file) {
            const reader = new FileReader();

            reader.onloadend = async () => {
                const base64 = reader.result.split(",")[1];

                const data = {
                    filename: file.name,
                    filedata: base64,
                };

                try {
                    const result = await Api("image", "post", null, data);
                    console.log("Upload successful:", result);

                    fetchDatabaseImages();

                    console.log(databaseImages)

                    const lastImage = databaseImages.slice(-1)[0];
                    imageId = lastImage ? lastImage.id : null;

                    const dataMed = { nom, description, prix, categorie, imageId };

                    console.log(dataMed)

                    try {
                        const result = await Api("produit", "put", id, dataMed);
                        console.log("API Response:", result);
                        alert("Le produit a bien été modifié");
                        fetchDatabaseImages();
                    } catch (error) {
                        console.error("Erreur pendant la modification du produit :", error);
                        alert("Erreur pendant la modification du produit");
                    }
                } catch (error) {
                    console.error("Erreur durant l'upload de l'image :", error);
                    alert("Erreur durant l'upload de l'image. Vérifiez la console.");
                }
            };

            reader.readAsDataURL(file);
        } else {
            const data = { nom, description, prix, categorie, imageId };

            console.log(data)

            try {
                const result = await Api("produit", "put", id, data);
                console.log("API Response:", result);
                alert("Le produit a bien été modifié");
            } catch (error) {
                console.error("Erreur pendant la modification du produit :", error);
                alert("Erreur pendant la modification du produit");
            }
        }
    };

    return (
        <>
            <div className="bg-orange-100">
                <div className="bg-cover bg-center h-54 lg:py-14 relative" style={{ backgroundImage: "url('/arriereplan.jpg')" }}>
                    <div className="absolute inset-0 bg-black opacity-65"></div>
                    <div class="relative mx-auto my-20 w-full max-w-3xl bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:rounded-xl sm:px-10">
                        <div class="w-full">
                            <div class="text-center">
                                <h1 class="text-3xl font-semibold text-gray-900">Modification de médicament</h1>
                                <p class="mt-2 text-gray-500">Remplissez le formulaire ci-dessous pour modifier un médicament</p>
                            </div>
                            <div>
                                <form>
                                    <select name="choixProduit" id="choixProduit" onChange={(e) => setId(e.target.value)}>
                                        <option value=""></option>
                                        {databaseProduit.map((produit) => {
                                            return (
                                                <option value={produit.id} key={produit.id}>{produit.nom}</option>
                                            )
                                        })}
                                    </select>
                                </form>
                            </div>
                            <div class="mt-5">
                                <form onSubmit={handleSubmit} class="grid grid-cols-2 gap-6">
                                    <div class="relative mt-6">
                                        <input type="text" name="nom" value={nom} onChange={(e) => setNom(e.target.value)} placeholder="Nom" class="peer mt-1 w-full border-b-2 border-gray-300 px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none" />
                                        <label for="nom" class="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800">Nom</label>
                                    </div>
                                    <div class="relative mt-6">
                                        <input type="number" name="prix" value={prix} onChange={(e) => setPrix(e.target.value)} placeholder="Prix" class="peer mt-1 w-full border-b-2 border-gray-300 px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none" />
                                        <label for="prix" class="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800">Prix</label>
                                    </div>
                                    <div class="relative mt-6">
                                        <input type="text" name="description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description du médicament" class="peer mt-1 w-full border-b-2 border-gray-300 px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none" />
                                        <label for="description" class="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800">Description</label>
                                    </div>
                                    <div className="relative mt-6">
                                        <select name="categorie" id="categorie" value={categorie} onChange={(e) => setCategorie([e.target.value])}>
                                            <option value=""></option>
                                            {databaseCategories.map((categorie) => (
                                                <option value={categorie.id} key={categorie.id}>{categorie.nom}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div class="relative mt-6">
                                        <select name="image" id="image" value={images} onChange={(e) => setImage(e.target.value)}>
                                            <option value="file">Uploader une image</option>
                                            {databaseImages.map((image) => (
                                                <option value={image.id} key={image.id}>{image.path}</option>
                                            ))}
                                        </select>
                                    </div>
                                    {fileInput()}
                                    <div class="col-span-2 my-6 text-center">
                                        <button type="submit" class="w-1/2 rounded-md bg-emerald-600 px-3 py-4 text-white ">Créer un médicament</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UpdateProduit;