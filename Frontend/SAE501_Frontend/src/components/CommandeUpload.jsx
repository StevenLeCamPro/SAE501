import React, { useState } from 'react';
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf';
import Tesseract from 'tesseract.js';
import Api from './Api';
// Définir le chemin vers le worker pour pdf.js
pdfjsLib.GlobalWorkerOptions.workerSrc = '/node_modules/pdfjs-dist/legacy/build/pdf.worker.min.mjs';

export const handleValidateCommande = async (commandeId) => {
    try {
        await Api("commande/validate", "post", commandeId, null);
        console.log('Commande validée avec succès. Stock mis à jour.');
    } catch (err) {
        console.error('Erreur lors de la validation de la commande.', err);
    }
};

export const handleDeleteCommande = async (commandeId) => {
    try {
        await Api("commande", "delete", commandeId, null);
        console.log('Commande supprimée avec succès.');
    } catch (err) {
        console.error('Erreur lors de la suppression de la commande.', err);
    }
};

function CommandeUpload() {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const [commandeId, setCommandeId] = useState(null);
    const [medicaments, setMedicaments] = useState([]);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleFileUpload = async (event) => {
        event.preventDefault(); // Empêche le rechargement de la page
        if (!file) return;

        setLoading(true);
        setError(null);
        setSuccessMessage(null);

        try {
            const fileReader = new FileReader();
            fileReader.onload = async () => {
                const pdfData = new Uint8Array(fileReader.result);
                const pdf = await pdfjsLib.getDocument(pdfData).promise;

                const extractedTexts = [];
                
                for (let i = 1; i <= pdf.numPages; i++) {
                    const page = await pdf.getPage(i);
                    const viewport = page.getViewport({ scale: 2 });

                    const canvas = document.createElement('canvas');
                    const context = canvas.getContext('2d');
                    canvas.width = viewport.width;
                    canvas.height = viewport.height;

                    const renderContext = {
                        canvasContext: context,
                        viewport: viewport,
                    };
                    await page.render(renderContext).promise;

                    const imageData = canvas.toDataURL('image/png');
                    console.log(`Analyse de la page ${i} en cours...`);

                    const result = await Tesseract.recognize(imageData, 'fra', {
                        logger: (m) => console.log(m),
                    });

                    const extractedText = result.data.text;
                    const normalizedText = extractedText.normalize('NFC');
                    extractedTexts.push(normalizedText);
                }

                const fullText = extractedTexts.join('\n');
                console.log('Texte extrait complet :', fullText);

                const response = await Api("commande", "post", null, { text: fullText });
                setMedicaments(response.medicaments)
                setCommandeId(response.commandeId);
                setSuccessMessage('Demande traitée avec succès.');
            };
    
            fileReader.readAsArrayBuffer(file);
        } catch (err) {
            console.error('Erreur:', err);
            setError('Une erreur est survenue lors de l’envoi.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-cover bg-center flex items-center justify-center" style={{ backgroundImage: "url('/arriereplan.jpg')" }}>
            <form onSubmit={handleFileUpload} className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-3xl text-center font-semibold pb-4">Uploader une ordonnance</h2>
                <input 
                    type="file" 
                    accept=".pdf" 
                    onChange={handleFileChange} 
                    className="mb-4 p-2 border border-gray-300 rounded w-full"
                />
                <button 
                    type="submit" 
                    className="w-full bg-emerald-600 text-white py-2 px-4 rounded hover:bg-emerald-800 transition duration-200"
                >
                    Envoyer le fichier
                </button>
            </form>
            {loading && <p className="text-emerald-600 mt-4">Demande en cours...</p>}
            {error && <p className="text-red-500 mt-4">{error}</p>}
            {successMessage && <p className="text-green-500 mt-4">{successMessage}</p>}
            
             
        </div>
    );
}

export default CommandeUpload;
