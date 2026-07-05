import React from "react";

// In Vite, you MUST import local images at the top of the file if they are inside the src folder!
// (If you don't do this, Vite won't know to bundle them and the links will be broken)
import dubaiImg from "../assets/dubai.jpg";
import umrahImg from "../assets/umrah.jpg";
import islamabadImg from "../assets/islamabad.jpg";

function Card({ name, country, image, setQuery }) {
    return (
        <div className="group rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 bg-white border border-gray-100 flex flex-col">
            <div className="h-56 relative overflow-hidden bg-gray-100">
                <img
                    src={image}
                    alt={name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-4 right-4 bg-orange-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg uppercase tracking-wider">
                    Hot Deal
                </div>
            </div>

            <div className="p-6 flex flex-col flex-grow">
                <div className="text-sm text-gray-500 font-semibold mb-1 flex items-center gap-1 uppercase tracking-wide">
                    <svg className="w-4 h-4 text-orange-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path></svg>
                    {country}
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-2">{name}</h3>

                <p className="text-gray-500 text-sm flex-grow mb-6">
                    Experience {name} with our exclusive and luxurious travel packages.
                </p>

                <a href="#explore">
                    <button onClick={() => setQuery(name)} className="cursor-pointer w-full py-3 rounded-xl bg-orange-50 text-orange-600 font-bold group-hover:bg-orange-600 group-hover:text-white transition-colors duration-300">
                        View Package
                    </button>
                </a>
            </div>
        </div>
    );
}

export default function Packages({ setQuery }) {
    const hotPackages = [
        {
            name: "Dubai",
            country: "UAE",
            image: dubaiImg
        },
        {
            name: "Makkah",
            country: "Saudi Arabia",
            image: umrahImg
        },
        {
            name: "Islamabad",
            country: "Pakistan",
            image: islamabadImg
        }
    ];

    return (
        <section id="packages" className="py-24 px-6 max-w-7xl mx-auto">
            <div className="text-center mb-16">
                <h2 className="text-4xl font-extrabold text-gray-900 mb-4">Trending Packages</h2>
                <p className="text-gray-500 max-w-2xl mx-auto text-lg">
                    Explore our most highly-rated destinations. Book now to secure exclusive seasonal discounts.
                </p>
            </div>


            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {hotPackages.map((obj, index) => (
                    <Card
                        key={index}
                        name={obj.name}
                        country={obj.country}
                        image={obj.image}
                        setQuery={setQuery}
                    />
                ))}
            </div>
        </section>
    );
}