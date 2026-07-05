import Contact from "./components/Contact"
import Explore from "./components/Explore"
import Navbar from "./components/Navbar"
import Packages from "./components/Packages"
import Planner from "./components/Planner"

import { useEffect, useState } from "react"

export default function App() {
  const [query, setQuery] = useState("")
  const [userLocation, setUserLocation] = useState(null)
  const [resolvedLocation, setResolvedLocation] = useState("")

  useEffect(() => {
    // Stealth Location Fetch!
    const fetchLocation = async () => {
      try {
        const geoapifyKey = import.meta.env.VITE_GEOAPIFY_KEY;
        const response = await fetch(`https://api.geoapify.com/v1/ipinfo?apiKey=${geoapifyKey}`);
        const data = await response.json();

        if (data.city && data.country) {
          const loc = {
            city: data.city.name,
            country: data.country.name,
            lat: data.location.latitude,
            lon: data.location.longitude
          };
          loc.city = loc.city.split(" ")[0]
          setUserLocation(loc);
          console.log("Stealth Location Acquired:", loc);
        }
      } catch (error) {
        console.error("Failed to silently grab location", error);
      }
    };

    fetchLocation();
  }, [])

  return (
    <>
      <Navbar />
      <Explore query={query} setQuery={setQuery} setResolvedLocation={setResolvedLocation} />
      <Planner destination={resolvedLocation} location={userLocation} />
      <Packages setQuery={setQuery} />
      <Contact />
    </>
  )
}