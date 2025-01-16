import { useEffect, useState } from "react";
import Api from "../components/Api";
import { useSearchParams } from "react-router-dom";

function TestApiPut() {

    const [searchParams] = useSearchParams();
    const userid = searchParams.get("id");

    const [users, setUsers] = useState([])

    const fetchUsers = async () => {
        try {
            const result = await Api("user", "get", userid, null);
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

    const handleChangeFirstName = (id, value) => {
        setUsers((prevUsers)=>
        prevUsers.map((user) =>
            user.id === id ? { ...user, firstName: value} : user
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

        if (!user.firstName.trim()) {
            alert("First name cannot be empty");
            return;
        }
        if (!user.password.trim()) {
            alert("Password cannot be empty");
            return;
        }

        const data = {name: user.name, firstName: user.firstName, email: user.email, password: user.password};

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
        <div className="bg-orange-100 min-h-screen flex items-center justify-center">
  <div className="bg-cover bg-center h-54 lg:py-14 relative w-full" style={{ backgroundImage: "url('/arriereplan.jpg')" }}>
    <div className="absolute inset-0 bg-black opacity-65"></div>
    <div className="relative mx-auto my-20 w-5/6 lg:w-full max-w-3xl bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 rounded-xl sm:px-10">
      <div className="w-full">
        {users.map((user) => {
          return (
            <div key={user.id} className="mt-6">
              <form onSubmit={(e) => handleSubmit(e, user.id)} className="grid grid-cols-2 gap-6">
                <div className="relative">
                  <input
                    type="text"
                    name="name"
                    value={user.name}
                    onChange={(e) => handleChangeName(user.id, e.target.value)}
                    placeholder="Nom"
                    className="peer mt-1 w-full border-b-2 border-gray-300 px-0 py-1 placeholder-transparent focus:border-gray-500 focus:outline-none"
                  />
                  <label
                    htmlFor="name"
                    className="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800"
                  >
                    Nom
                  </label>
                </div>
                <div className="relative">
                  <input
                    type="text"
                    name="firstName"
                    value={user.firstName}
                    onChange={(e) => handleChangeFirstName(user.id, e.target.value)}
                    placeholder="Prénom"
                    className="peer mt-1 w-full border-b-2 border-gray-300 px-0 py-1 placeholder-transparent focus:border-gray-500 focus:outline-none"
                  />
                  <label
                    htmlFor="firstName"
                    className="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800"
                  >
                    Prénom
                  </label>
                </div>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    value={user.email}
                    onChange={(e) => handleChangeEmail(user.id, e.target.value)}
                    placeholder="Email"
                    className="peer mt-1 w-full border-b-2 border-gray-300 px-0 py-1 placeholder-transparent focus:border-gray-500 focus:outline-none"
                  />
                  <label
                    htmlFor="email"
                    className="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800"
                  >
                    Email
                  </label>
                </div>
                <div className="relative">
                  <input
                    type="password"
                    name="password"
                    value={user.password}
                    onChange={(e) => handleChangePassword(user.id, e.target.value)}
                    placeholder="Mot de passe"
                    className="peer mt-1 w-full border-b-2 border-gray-300 px-0 py-1 placeholder-transparent focus:border-gray-500 focus:outline-none"
                  />
                  <label
                    htmlFor="password"
                    className="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800"
                  >
                    Mot de passe
                  </label>
                </div>
                <div className="col-span-2 text-center">
                  <button
                    type="submit"
                    className="mt-4 w-1/2 rounded-md bg-emerald-600 px-3 py-4 text-white"
                  >
                    Envoyer
                  </button>
                </div>
              </form>
            </div>
          );
        })}
      </div>
    </div>
  </div>
</div>

        </>
    )
}

export default TestApiPut