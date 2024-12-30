import { useEffect, useState } from "react";
import Api from "../components/Api";
import TestApiDelete from "./TestApiDelete";

function TestApiGet() {
  const [user, setUser] = useState([]);

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
    <div className="bg-orange-100 pb-10">
      <div className="p-6 overflow-scroll xl:overflow-hidden px-0">
        <h1 className="text-3xl font-semibold text-gray-900 mb-4">
          Liste des utilisateurs
        </h1>
        <table className="mt-4 w-full min-w-max table-auto text-left">
          <thead>
            <tr className="text-sm leading-normal">
              <th className="xl:text-xl text-nunito border-y border-gray-300 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
                ID
              </th>
              <th className="xl:text-xl text-nunito border-y border-gray-300 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
                Nom
              </th>
              <th className="xl:text-xl text-nunito border-y border-gray-300 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
                Prénom
              </th>
              <th className="xl:text-xl text-nunito border-y border-gray-300 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
                Mail
              </th>
             
              <th className="xl:text-xl text-nunito border-y border-gray-300 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
                N° de téléphone
              </th>
              <th className="xl:text-xl text-nunito border-y border-gray-300 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
                Adresse
              </th>
              <th className="xl:text-xl text-nunito border-y border-gray-300 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
                Rôles
              </th>
              <th className="xl:text-xl text-nunito border-y border-gray-300 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {user.map((users) => (
              <tr key={users.id} className="text-sm leading-normal">
                <td className="xl:text-xl text-nunito border-y border-gray-300 p-4">
                  {users.id}
                </td>
                <td className="xl:text-xl text-nunito border-y border-gray-300 p-4">
                  {users.name}
                </td>
                <td className="xl:text-xl text-nunito border-y border-gray-300 p-4">
                  {users.firstName}
                </td>
                <td className="xl:text-xl text-nunito border-y border-gray-300 p-4">
                  {users.email}
                </td>
                
                <td className="xl:text-xl text-nunito border-y border-gray-300 p-4">
                    {users.phone}
                </td>
                <td className="xl:text-xl text-nunito border-y border-gray-300 p-4">
                  {users.address}
                </td>
                <td className="xl:text-xl text-nunito border-y border-gray-300 p-4">
                  {users.roles}
                </td>
                <td className="xl:text-xl text-nunito border-y border-gray-300 p-4">
                  <div className="flex">
                    <TestApiDelete id={users.id} />
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

export default TestApiGet;
