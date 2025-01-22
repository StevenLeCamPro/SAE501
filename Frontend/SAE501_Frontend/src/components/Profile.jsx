import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import Api from '../components/Api';

function Profile() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const userCookie = Cookies.get('pharminnov_login');
        if (userCookie) {
            const { user_id } = JSON.parse(userCookie);
            fetchUser(user_id);
        }
    }, []);

    const fetchUser = async (id) => {
        try {
            const result = await Api("user", "get", id, null);
            if (result && result.length > 0) {
                setUser(result[0]);
            } else {
                console.warn("No user data returned.");
            }
        } catch (error) {
            console.error("Error fetching user:", error);
        }
    };

    return (
        <div className="bg-orange-100 pb-10 min-h-screen flex items-center justify-center">
            {user ? (
                <div className="bg-orange-100 pb-10 min-h-screen flex items-center justify-center">
                    <div>
                        <h1 className="text-2xl font-bold mb-4">Profil de {user.firstName} {user.name}</h1>
                        <div className="bg-white shadow-md rounded-lg p-6 max-w-md w-full">
                            
                            <div className="space-y-4">
                                <div className="flex font-bold text-xl">
                                    <span className='mx-2'>{user.firstName}</span>
                                    <span>{user.name}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="font-semibold">Email:</span>
                                    <span>{user.email}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="font-semibold">N° de Téléphone:</span>
                                    <span>{user.phone}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="font-semibold">Adresse:</span>
                                    <span>{user.address}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="font-semibold">Date de naissance:</span>
                                    <span>{new Date(user.birthDate.date).toLocaleDateString()}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <p className="text-center text-gray-500">Chargement du profil...</p>
            )}
        </div>
    );
}

export default Profile;
