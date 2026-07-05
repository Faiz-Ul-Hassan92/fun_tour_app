import React from 'react';
import {
    ComposableMap,
    Geographies,
    Geography,
    Line,
    Marker
} from "react-simple-maps";

const geoUrl = "https://unpkg.com/world-atlas@2.0.2/countries-110m.json";

function calculateDistance(lat1, lon1, lat2, lon2) {
    if (!lat1 || !lon1 || !lat2 || !lon2) return null;
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return Math.round(R * c);
}

export default function Planner({ destination, location }) {

    if (!location) return null;

    let distance = 0;
    if (destination) {
        distance = calculateDistance(location.lat, location.lon, destination.lat, destination.lon);
    }

    return (
        <section className="py-20 px-6 max-w-5xl mx-auto">
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 flex flex-col md:flex-row">


                <div className="p-10 md:w-1/2 flex flex-col justify-center bg-orange-50 relative z-10">
                    <h2 className="text-3xl font-extrabold text-gray-900 mb-6">Your Journey Awaits</h2>

                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold">A</div>
                        <div>
                            <p className="text-xs text-orange-600 font-bold uppercase tracking-wider">Starting Point</p>
                            <p className="text-lg font-semibold text-gray-800">{location.city}, {location.country}</p>
                        </div>
                    </div>

                    <div className="flex flex-col ml-5 border-l-2 border-dashed border-orange-300 pl-8 py-2 my-1 relative">
                        <span className="absolute -left-3 top-1/2 -translate-y-1/2 bg-white text-orange-500 rounded-full p-1 border border-orange-200">
                            ✈️
                        </span>
                        <p className="text-sm font-bold text-gray-500">{distance ? `${distance.toLocaleString()} km` : "Check How far are you from your dream place..."}</p>
                        <p className="text-xs text-gray-400">{destination ? "Estimated flight distance" : ""}</p>
                    </div>

                    <div className="flex items-center gap-4 mt-4 mb-8">
                        <div className="w-10 h-10 rounded-full bg-orange-600 flex items-center justify-center text-white font-bold">{destination ? "B" : "?"}</div>
                        <div>
                            <p className="text-xs text-orange-600 font-bold uppercase tracking-wider">Destination</p>
                            <p className="text-lg font-semibold text-gray-800">{destination ? destination.name : ""}</p>
                        </div>
                    </div>

                    {destination && (
                        <a href="#contact" className="mt-auto">
                            <button className="cursor-pointer w-full bg-orange-600 hover:bg-orange-500 text-white font-bold py-4 px-8 rounded-xl shadow-lg transition-transform hover:-translate-y-1">
                                Book Your Tour to {destination.name}
                            </button>
                        </a>
                    )}
                </div>


                <div className="md:w-1/2 bg-[#1a1b26] relative min-h-[350px] flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 opacity-40 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-orange-400 via-[#1a1b26] to-black pointer-events-none"></div>

                    <ComposableMap
                        projection="geoEqualEarth"
                        className="w-full h-full scale-[1.3]"
                    >
                        <Geographies geography={geoUrl}>
                            {({ geographies }) =>
                                geographies.map((geo) => (
                                    <Geography
                                        key={geo.rsmKey}
                                        geography={geo}
                                        fill="#2d3748"
                                        stroke="#4a5568"
                                        strokeWidth={0.5}
                                        style={{
                                            default: { outline: "none" },
                                            hover: { fill: "#4a5568", outline: "none" },
                                            pressed: { outline: "none" },
                                        }}
                                    />
                                ))
                            }
                        </Geographies>


                        {destination && location && (
                            <Line
                                from={[location.lon, location.lat]}
                                to={[destination.lon, destination.lat]}
                                stroke="#ea580c"
                                strokeWidth={3}
                                strokeLinecap="round"
                                style={{ strokeDasharray: "4 4" }}
                            />
                        )}


                        {location && (
                            <Marker coordinates={[location.lon, location.lat]}>
                                <circle r={4} fill="#ea580c" stroke="#fff" strokeWidth={2} />
                                <text textAnchor="middle" y={-10} style={{ fill: "#fff", fontSize: "12px", fontWeight: "bold" }}>
                                    You
                                </text>
                            </Marker>
                        )}


                        {destination && (
                            <Marker coordinates={[destination.lon, destination.lat]}>
                                <circle r={6} fill="#ea580c" stroke="#fff" strokeWidth={2} />
                                <text textAnchor="middle" y={-12} style={{ fill: "#fff", fontSize: "14px", fontWeight: "bold" }}>
                                    {destination.name}
                                </text>
                            </Marker>
                        )}
                    </ComposableMap>
                </div>

            </div>
        </section>
    )
}