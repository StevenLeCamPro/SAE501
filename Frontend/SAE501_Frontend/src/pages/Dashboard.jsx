import { NavLink } from "react-router-dom"
import roleValidator from "../components/CookieValidator";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAccess = async () => {
        const access = await roleValidator(1);
        console.log(access);

        if (!access) {
            navigate('/login');
            return;
        }

    };
    checkAccess();
}, []);
    return (
        <div className="bg-orange-100 pb-10">
            <h1 className="text-center font-bold text-2xl py-10 xl:text-4xl">Tableau de Bord</h1>

            <div className="grid grid-cols-1 gap-10 p-6 mb-8">
                <div className="border-2 border-emerald-600 rounded-md bg-white shadow-lg p-4 xl:mx-48 xl:py-20 mb-8">
                  <div className="grid grid-cols-1 xl:grid-cols-2 xl:px-10">
                    <button className="bg-emerald-600 py-10 font-nunito text-white rounded-lg text-xl xl:text-3xl m-2 xl:m-10"><NavLink to="/dashboard/med">Gestion des médicaments</NavLink></button>
                    <button className="bg-emerald-600 py-10 font-nunito text-white rounded-lg text-xl xl:text-3xl m-2 xl:m-10"><NavLink to="">Gestion des commandes</NavLink></button>
                    <button className="bg-emerald-600 py-10 font-nunito text-white rounded-lg text-xl xl:text-3xl m-2 xl:m-10"><NavLink to="">Gestion des stocks</NavLink></button>
                    <button className="bg-emerald-600 py-10 font-nunito text-white rounded-lg text-xl xl:text-3xl m-2 xl:m-10"><NavLink to="/listUser">Gestion des utilisateurs</NavLink></button>
                  </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;