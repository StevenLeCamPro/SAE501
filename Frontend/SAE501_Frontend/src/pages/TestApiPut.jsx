import { useEffect, useState } from "react";
import Api from "../components/Api";

function TestApiPut() {

    const [users, setUsers] = useState([])

    const fetchUsers = async () => {
        try {
            const result = await Api("user", "get", "1");
            setUsers(result);
        } catch (error) {
            console.error("Error fetching user:", error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleChangeName = (id, value) => {
        setUsers((prevUsers) =>
            prevUsers.map((user) =>
                user.id === id ? { ...user, name: value } : user
            )
        );
    };

    const handleChangeEmail = (id, value) => {
        setUsers((prevUsers) =>
            prevUsers.map((user) =>
                user.id === id ? { ...user, email: value } : user
            )
        );
    };

    const handleChangePassword = (id, value) => {
        setUsers((prevUsers) =>
            prevUsers.map((user) =>
                user.id === id ? { ...user, password: value } : user
            )
        );
    };

    const handleSubmit = async (e, id) => {
        e.preventDefault();

        const user = users.find((cat) => cat.id === id);

        if (!user.name.trim()) {
            alert("Name cannot be empty");
            return;
        }

        if (!user.email.trim()) {
            alert("Email cannot be empty");
            return;
        }

        if (!user.password.trim()) {
            alert("Password cannot be empty");
            return;
        }

        const data = {name: user.name, email: user.email, password: user.password};

        console.log(data)

        try {
            await Api("user", "put", id, data);
            alert("User updated successfully");
        } catch (error) {
            console.error("Error updating user:", error);
        }
    };

    return (
        <>
            {users.map((user) => {
                return (
                    <div key={user.id}>
                        <form onSubmit={(e) => handleSubmit(e, user.id)}>
                            <input type="text" name="name" value={user.name} onChange={(e) => handleChangeName(user.id, e.target.value)} />
                            <input type="text" name="name" value={user.email} onChange={(e) => handleChangeEmail(user.id, e.target.value)} />
                            <input type="text" name="name" value={user.password} onChange={(e) => handleChangePassword(user.id, e.target.value)} />
                            <button type="submit">Envoyer</button>
                        </form>
                    </div>
                )
            })}
        </>
    )
}

export default TestApiPut