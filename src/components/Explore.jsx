import { useState } from "react";

export default function Explore() {
    const [query, setQuery] = useState("");
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [masti, setMasti] = useState(false)

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!query) return;

        setLoading(true);
        setMasti(false); // Reset the warning on a new search

        const accessKey = "Zq04tzmwWRIX88auPRjYjjTk9i0QR63mhNjjzqELY6Q";
        const geoapifyKey = "b9e4d09de6b847b183515e8d9784c5e0";

        try {
            const geoResponse = await fetch(`https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(query)}&apiKey=${geoapifyKey}`);
            const geoData = await geoResponse.json();
            if (geoData.statusCode) {
                console.error("Geoapify API Error:", geoData.message);
                setLoading(false);
                return;
            }

            let resolvedLocation = query;

            const isValidPlace = geoData.features && geoData.features.some(feature => {
                const type = feature.properties.result_type;
                const importance = feature.properties.rank?.importance || 0;

                if (["city", "country", "state", "county", "island"].includes(type) || importance > 0.4) {
                    resolvedLocation = feature.properties.city || feature.properties.name || feature.properties.formatted || query;
                    return true;
                }
                return false;
            });

            if (!isValidPlace) {
                setMasti(true);
                setImages([]);
                setLoading(false);
                return;
            }

            const response = await fetch(`https://api.unsplash.com/search/photos?page=1&query=${encodeURIComponent(resolvedLocation)}&client_id=${accessKey}&per_page=8`);
            const data = await response.json();
            console.log(data)
            setImages(data.results);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section id="explore" className="py-20 px-6 max-w-7xl mx-auto">
            <div className="text-center mb-10">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">Explore The World</h2>
                <p className="text-gray-500">Discover beautiful destinations and let your imagination run wild.</p>
            </div>

            <form onSubmit={handleSearch} className="mb-12">
                <div className="flex w-full bg-white shadow-md rounded-full overflow-hidden border border-gray-200 focus-within:ring-2 focus-within:ring-orange-500 transition-all">
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search for a location (e.g., Riyadh, LA, Tehran)..."
                        className="w-full px-6 py-4 outline-none text-gray-700 bg-transparent"
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-orange-600 hover:bg-orange-700 text-white font-bold px-8 py-4 transition-colors disabled:opacity-70"
                    >
                        {loading ? "Searching..." : "Search"}
                    </button>
                </div>
            </form>


            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {images.map((img) => (
                    <div key={img.id} className="relative group overflow-hidden rounded-2xl shadow-sm aspect-square bg-gray-100">
                        <img
                            src={img.urls.small}
                            alt={img.alt_description}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />

                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                            <span className="text-white font-medium capitalize">
                                {img.user.location || img.alt_description || "Beautiful Place"}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            {masti ? (
                <div>
                    Its a tour&travel site man, stawp it
                </div>
            ) : (images.length === 0 && !loading && (
                <div className="text-center text-gray-400 py-10">
                    Find Your Next Vacation Spot
                </div>
            ))}

        </section>
    );
}