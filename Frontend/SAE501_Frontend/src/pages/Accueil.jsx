
function Accueil() {

    return (
        <>
            <div className="bg-orange-100 pb-10">
                <div className="bg-cover bg-center h-70 lg:py-52 relative" style={{ backgroundImage: "url('/arriereplan.jpg')" }}>
                    <div className="absolute inset-0 bg-black opacity-65"></div>
                    <h1 className="relative text-4xl text-white py-24 px-16 text-center md:text-5xl lg:text-6xl lg:py-32 lg:px-32">Bienvenue sur PharmInnov</h1>
                </div>
                <h2 className="underline decoration-solid text-center font-bold text-xl md:text-2xl lg:text-3xl mt-14"> C'est quoi PharmInnov ?</h2>
                <p className="text-left p-4 lg:px-96 lg:mx-56 text-sm md:text-base lg:text-lg font-medium mt-10"> 
                    Dorem ipsum dolor sit amet, consectetur adipiscing elit. 
                    Etiam eu turpis molestie, dictum est a, mattis tellus. 
                    Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, 
                    ut interdum tellus elit sed risus. Maecenas eget condimentum velit, 
                    sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, 
                    per inceptos himenaeos. Praesent auctor purus luctus enim egestas, ac scelerisque ante pulvinar. 
                    Donec ut rhoncus ex. Suspendisse ac rhoncus nisl, eu tempor urna. Curabitur vel bibendum lorem. 
                    Morbi convallis convallis diam sit amet lacinia. Aliquam in elementum tellus.

                </p>
            </div>
        </>
    )

}

export default Accueil

