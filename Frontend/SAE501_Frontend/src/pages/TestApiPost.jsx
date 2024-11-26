import { useState } from "react";
import Api from "../components/Api";
import { useNavigate } from "react-router-dom";

function TestApiPost() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name.trim()) {
            alert("Name cannot be empty");
            return;
        }
        if (!email.trim()) {
            alert("Mail cannot be empty")
            return
        }
        if (!password.trim()) {
            alert("Password cannot be empty")
            return
        }

        const data = {name, email, password};

        console.log(data)

        try {
            const result = await Api("user", "post", null, data);
            console.log("API Response:", result);
            alert("Votre compte a bien été créé");
            navigate("/");
        } catch (error) {
            console.error("Erreur pendant la création de votre compte :", error);
            alert("Erreur pendant la création de votre compte");
        }
 
   
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
                <table className="w-full">
                    <tbody>
                        <tr className="mb-4">
                            <th className="text-left pb-2">Prénom</th>
                            <td>
                                <input 
                                    type="text" 
                                    name="name" 
                                    value={name} 
                                    onChange={(e) => setName(e.target.value)} 
                                    className="w-full p-2 border border-gray-300 rounded mt-1"
                                />
                            </td>
                        </tr>
                        <tr className="mb-4">
                            <th className="text-left pb-2">Email</th>
                            <td>
                                <input 
                                    type="email" 
                                    name="email" 
                                    value={email} 
                                    onChange={(e) => setEmail(e.target.value)} 
                                    className="w-full p-2 border border-gray-300 rounded mt-1"
                                />
                            </td>
                        </tr>
                        <tr className="mb-4">
                            <th className="text-left pb-2">Mot de passe</th>
                            <td>
                                <input 
                                    type="password" 
                                    name="password" 
                                    value={password} 
                                    onChange={(e) => setPassword(e.target.value)} 
                                    className="w-full p-2 border border-gray-300 rounded mt-1"
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
                <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded mt-4 hover:bg-blue-600">
                    Envoyer
                </button>
            </form>
            
        </>
    )
}

export default TestApiPost