import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
export default function Navbar() {

    const [squished, setSquished] = useState(false);
    const handleSquished = () => {
        setSquished(!squished)
    }

    return (
        <div className="sticky top-0 z-50">
            <nav className="flex items-center justify-between px-6 py-4 bg-white shadow-sm">
                <div className="text-xl font-bold">Valyrian Tourers</div>
                <div className="hidden md:flex items-center gap-8 text-sm font-medium">
                    <a href="#explore" className="hover:text-orange-600 transition-colors">Explore</a>
                    <a href="#packages" className="hover:text-orange-600 transition-colors">Hot Packages</a>
                    <a href="#contact" className="hover:text-orange-600 transition-colors">Contact</a>
                    <a href="#about" className="hover:text-orange-600 transition-colors">About</a>
                </div>
                <button className="md:hidden" onClick={handleSquished}>{squished ? "☰" : "✕"}</button>
            </nav>
            {!squished &&
                <div className="absolute top-full w-full flex flex-col gap-4 bg-white p-4 shadow-md text-center md:hidden">
                    <a onClick={handleSquished} href="#explore" className="hover:text-orange-600 transition-colors">Explore</a>
                    <a onClick={handleSquished} href="#packages" className="hover:text-orange-600 transition-colors">Hot Packages</a>
                    <a onClick={handleSquished} href="#contact" className="hover:text-orange-600 transition-colors">Contact</a>
                    <a onClick={handleSquished} href="#about" className="hover:text-orange-600 transition-colors">About</a>

                </div>
            }
        </div>
    )
}