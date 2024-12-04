import { NavLink } from "react-router-dom";

function MedsById() {
    return (
        <div className="bg-orange-100 pb-10">
            <h1 className="text-center font-bold text-2xl py-10 xl:text-4xl">Doliprane</h1>

            <div className="grid grid-cols-1 gap-10 p-6 mb-8">
                <div className="border-2 border-emerald-600 rounded-md bg-white shadow-lg p-4 xl:mx-48 xl:py-20 mb-8">
                    <div className="flex flex-col lg:flex-row lg:items-center">
                        <div className="lg:w-1/2 lg:flex lg:flex-col lg:items-right lg:pr-6">
                            <div className="text-center lg:text-left mb-4 pl-20">
                                <p className="font-bold text-lg xl:text-3xl">Doliprane 500mg</p>
                                <p className="font-bold text-lg xl:text-3xl">Boîte de 16 gélules</p>
                            </div>
                            <div className="flex justify-center lg:justify-start">
                                <img src="doliprane500.png" alt="Doliprane" className="w-full h-auto lg:w-5/6"/>
                            </div>
                        </div>
                        <div className="mt-4 lg:mt-0 lg:w-1/2">
                            <div className="flex justify-between items-center px-4 mt-4 lg:mt-0">
                                <div>
                                    <p className="font-bold text-lg xl:text-3xl">3.99€</p>
                                </div>
                                <div>
                                    <p className="flex text-base xl:text-xl text-red-500"><img src="stock.svg" alt="stock" className="h-6 xl:h-8"/>Indisponible</p>
                                    <p className="text-base xl:text-xl">0 en stock</p>
                                </div>
                            </div>
                            <hr className="border-1 border-emerald-600 my-4" />
                            <div className="text-justify my-4 mx-6 xl:mt-10">
                                <p className="text-base xl:text-xl"> Doliprane est un médicament utilisé pour traiter la douleur et la fièvre. Il contient du paracétamol, un analgésique et antipyrétique couramment utilisé. Ce médicament est souvent prescrit pour des maux de tête, des douleurs musculaires, des douleurs articulaires, des douleurs dentaires et des états grippaux.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MedsById;