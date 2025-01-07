import React, { useState } from 'react';
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf';
import Tesseract from 'tesseract.js';
import Api from './Api';
// Définir le chemin vers le worker pour pdf.js
pdfjsLib.GlobalWorkerOptions.workerSrc = '/node_modules/pdfjs-dist/legacy/build/pdf.worker.min.mjs';

function PostMedPdf({ onMedicamentsExtracted }) {
    const [loading, setLoading] = useState(false); // État pour le loader
    const [error, setError] = useState(null); // État pour les erreurs
    const [file, setFile] = useState(); // État pour le fichier sélectionné
    const [successMessage, setSuccessMessage] = useState(null); // Message de succès

    const handleFileChange = (e) => {
        setFile(e.target.files[0]); // Met à jour le fichier sélectionné
    };

    const handleFileUpload = async (event) => {
        event.preventDefault(); // Empêche le rechargement de la page
        if (!file) {
            setError("Veuillez sélectionner un fichier."); // Si aucun fichier n'est sélectionné
            return;
        }
    
        setLoading(true); // Active le loader
        setError(null); // Réinitialise les erreurs
        setSuccessMessage(null); // Réinitialise le message de succès
    
        try {
            const fileReader = new FileReader();
    
            const readFile = new Promise((resolve, reject) => {
                fileReader.onload = () => resolve(fileReader.result);
                fileReader.onerror = () => reject(new Error("Erreur lors de la lecture du fichier."));
            });
    
            fileReader.readAsArrayBuffer(file);
    
            const pdfData = new Uint8Array(await readFile); // Lecture réussie
            const pdf = await pdfjsLib.getDocument(pdfData).promise;
    
            console.log(`PDF chargé avec ${pdf.numPages} pages.`);
    
            const extractedTexts = [];
    
            for (let i = 1; i <= pdf.numPages; i++) {
                const page = await pdf.getPage(i);
                const viewport = page.getViewport({ scale: 2 });
    
                const canvas = document.createElement("canvas");
                const context = canvas.getContext("2d");
                canvas.width = viewport.width;
                canvas.height = viewport.height;
    
                const renderContext = {
                    canvasContext: context,
                    viewport: viewport,
                };
                await page.render(renderContext).promise;
    
                const imageData = canvas.toDataURL("image/png");
                console.log(`Analyse de la page ${i} en cours...`);
    
                const result = await Tesseract.recognize(imageData, "fra", {
                    logger: (m) => console.log(m), // Logs Tesseract
                });
    
                // Nettoyage et normalisation du texte extrait
                const extractedText = result.data.text;
                const normalizedText = extractedText.normalize("NFC");
                extractedTexts.push(normalizedText);
            }
    
            const fullText = extractedTexts.join("\n");
            console.log("Texte extrait complet :", fullText);
    
            // Envoi à l'API Symfony
            const response = await Api("produit/pdf", "post", null, { text: fullText });
    
            setSuccessMessage("Demande traitée avec succès.");
        } catch (err) {
            console.error("Erreur :", err);
            setError("Erreur lors du traitement du fichier PDF.");
        } finally {
            setLoading(false); // Désactive le loader, quoi qu'il arrive
        }
    };
    

    return (
        <div>
        <div className='flex justify-center items-center'>
            <form onSubmit={handleFileUpload} className="w-full max-w-md ">
                <h2 className="text-3xl text-center font-semibold pb-4">Envoyer le fichier fournisseur</h2>
                <p className="text-center text-gray-500">Entrez directement un fichier pdf afin de créer des produits ou d'incrémenter le stock.</p>
                <input 
                    type="file" 
                    accept=".pdf" 
                    onChange={handleFileChange} 
                    className="mb-4 p-2 border border-gray-300 rounded w-full"
                />
                <button 
                    type="submit" 
                    className="w-full sm:w-1/2 rounded-md bg-emerald-600 px-3 py-4 text-white hover:bg-emerald-700"
                >
                    Envoyer le fichier
                </button>
            </form>
            
        </div>
        <div className='flex justify-center items-center'>
        {loading && <p className="text-emerald-600 mt-4">Demande en cours...</p>}
            {error && <p className="text-red-500 mt-4">{error}</p>}
            {successMessage && <p className="text-green-500 mt-4">{successMessage}</p>}
            </div>
        </div>
    );
}

export default PostMedPdf;
