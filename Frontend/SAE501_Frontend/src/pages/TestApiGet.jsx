import { useEffect, useState } from "react";
import Api from "../components/Api";
import TestApiDelete from "./TestApiDelete";

function TestApiGet() {
    const [user, setUser] = useState([])

    const fetchUser = async () => {
        try {
            const result = await Api("user", "get", null, null);
            setUser(result);
        } catch (error) {
            console.error("Error fetching user:", error);
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <>
            <div>
                <h1>Liste des users</h1>
                {user.map((users, index) => {
                    return (
                        <div id={index} key={users.id}>
                            <p>{users.id} {users.name}</p>
                            <TestApiDelete id={users.id}/>
                        </div>
                    )
                })}
            </div>
        </>
    )
}

export default TestApiGet