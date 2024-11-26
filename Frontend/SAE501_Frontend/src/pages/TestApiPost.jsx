import { useState } from "react";
import Api from "../components/Api";

function TestApiPost() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

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
            alert("User created successfully");
        } catch (error) {
            console.error("Error creating user:", error);
            alert("Error creating user. Check the console for details.");
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" value={name} onChange={(e) => {setName(e.target.value)}}/>
                <input type="email" name="email" value={email} onChange={(e) => {setEmail(e.target.value)}}/>
                <input type="password" name="password" value={password} onChange={(e) => {setPassword(e.target.value)}}/>
                <button type="submit">Envoyer</button>
            </form>
        </>
    )
}

export default TestApiPost