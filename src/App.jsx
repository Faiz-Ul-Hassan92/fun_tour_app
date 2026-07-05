import Contact from "./components/Contact"
import Explore from "./components/Explore"
import Navbar from "./components/Navbar"
import Packages from "./components/Packages"

import { useEffect, useState } from "react"

export default function App() {

  const [query, setQuery] = useState("")

  useEffect(() => {

  }, [])

  return (
    <>
      <Navbar />
      <Explore query={query} setQuery={setQuery} />
      <Packages setQuery={setQuery} />
      <Contact />
    </>
  )
}