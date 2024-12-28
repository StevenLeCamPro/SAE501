import { useState } from "react";
import Api from "../components/Api";
import { useNavigate } from "react-router-dom";

function TestApiPost() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("")
    const [firstName, setFirstName] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [birthDate, setBirthDate] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name.trim()) {
            alert("Veuillez entrer votre nom");
            return;
        }
        if (!email.trim()) {
            alert("Veuillez entrer votre email");
            return
        }
        if (!password.trim()) {
            alert("Veuillez entrer votre mot de passe");
            return
        }
        if (password.length < 6) {
            alert("Password must be at least 6 characters")
            return
        }
        if (password != confirmPassword) {
            alert("Le mot de passe et la confirmation de mot de passe ne correspondent pas.")
            return
        }
        if (!firstName.trim()) {
            alert("Veuillez entrer votre prénom");
            return
        }
        if (!phone.trim()) {
            alert("Veuillez entrer votre numéro de téléphone");
            return
        }
        if (!address.trim()) {
            alert("Veuillez entrer votre adresse");
            return
        }
        if (!birthDate.trim()) {
            alert("Veuillez entrer votre date de naissance");
            return
        }
        const data = { name, email, password, confirmPassword, firstName, phone, address, birthDate };

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
         <div className="bg-orange-100">
                <div className="bg-cover bg-center h-54 lg:py-14 relative" style={{ backgroundImage: "url('/arriereplan.jpg')" }}>
                    <div className="absolute inset-0 bg-black opacity-65"></div>
            <div class="relative mx-auto my-20 w-full max-w-3xl bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:rounded-xl sm:px-10">
                <div class="w-full">
                    <div class="text-center">
                        <h1 class="text-3xl font-semibold text-gray-900">Inscrivez-vous</h1>
                        <p class="mt-2 text-gray-500">Remplissez le formulaire ci-dessous pour créer votre compte</p>
                    </div>
                    <div class="mt-5">
                        <form onSubmit={handleSubmit} class="grid grid-cols-2 gap-6">
                            <div class="relative mt-6">
                                <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Nom" class="peer mt-1 w-full border-b-2 border-gray-300 px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none" />
                                <label for="name" class="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800">Nom</label>
                            </div>
                            <div class="relative mt-6">
                                <input type="date" name="birthDate" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} placeholder="Date de naissance" class="peer mt-1 w-full border-b-2 border-gray-300 px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none" />
                                <label for="birthDate" class="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800">Date de naissance</label>
                            </div>
                            <div class="relative mt-6">
                                <input type="text" name="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="Prénom" class="peer mt-1 w-full border-b-2 border-gray-300 px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none" />
                                <label for="firstName" class="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800">Prénom</label>
                            </div>
                            <div class="relative mt-6">
                                <input type="tel" name="phone" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Téléphone" class="peer mt-1 w-full border-b-2 border-gray-300 px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none" />
                                <label for="phone" class="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800">Téléphone</label>
                            </div>
                            <div class="relative mt-6">
                                <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" class="peer mt-1 w-full border-b-2 border-gray-300 px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none" />
                                <label for="email" class="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800">Email</label>
                            </div>
                            <div class="relative mt-6">
                                <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Mot de passe" class="peer mt-1 w-full border-b-2 border-gray-300 px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none" />
                                <label for="password" class="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800">Mot de passe</label>
                            </div>
                            <div class="relative mt-6">
                                <input type="text" name="address" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Adresse" class="peer mt-1 w-full border-b-2 border-gray-300 px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none" />
                                <label for="address" class="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800">Adresse</label>
                            </div>
                            <div class="relative mt-6">
                                <input type="password" name="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirmer le mot de passe" class="peer mt-1 w-full border-b-2 border-gray-300 px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none" />
                                <label for="confirmPassword" class="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800">Confirmer le mot de passe</label>
                            </div>
                            <div class="col-span-2 my-6 text-center">
                                <button type="submit" class="w-1/2 rounded-md bg-emerald-600 px-3 py-4 text-white ">Créer un compte</button>
                                <p className="text-center text-sm text-gray-500">
                                    Déjà un compte ? <a href="/login" className="text-emerald-600 hover:underline">Se connecter</a>
                                </p>                            
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

export default TestApiPost