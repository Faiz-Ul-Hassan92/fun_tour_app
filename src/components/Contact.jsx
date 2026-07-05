import { useState } from "react"

export default function Contact() {
    const [sentStatus, setSentStatus] = useState(false)
    const [loading, setLoading] = useState(false)
    const [info, setInfo] = useState({
        name: "",
        email: "",
        phoneNumber: "",
        message: ""
    })

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const payload = {
            access_key: "8df8b891-265e-4967-b768-d6758af7cc5d",
            ...info
        };

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify(payload)
            });
            const result = await response.json();

            if (result.success) {
                setSentStatus(true);
                setInfo({ name: "", email: "", phoneNumber: "", message: "" });
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <section id="contact" className="py-20 px-6 bg-gray-50">
            <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Contact Us</h2>
                    <p className="text-gray-500 text-sm">Dare to contact?</p>
                </div>

                {sentStatus ? (
                    <div className="bg-green-50 text-green-700 p-6 rounded-xl text-center font-medium border border-green-200">
                        Thanks for reaching out! We will send a dragon shortly.
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="flex flex-col gap-5">

                        <div className="flex flex-col gap-1">
                            <label className="text-sm font-semibold text-gray-700">Name</label>
                            <input
                                required
                                type="text"
                                value={info.name}
                                placeholder="What should we call you?"
                                onChange={(e) => setInfo({ ...info, name: e.target.value })}
                                className="px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
                            />
                        </div>

                        <div className="flex flex-col gap-1">
                            <label className="text-sm font-semibold text-gray-700">Email</label>
                            <input
                                required
                                type="email"
                                value={info.email}
                                placeholder="Your email please"
                                onChange={(e) => setInfo({ ...info, email: e.target.value })}
                                className="px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
                            />
                        </div>

                        <div className="flex flex-col gap-1">
                            <label className="text-sm font-semibold text-gray-700">Phone Number</label>
                            <input
                                required
                                type="tel"
                                value={info.phoneNumber}
                                placeholder="Where should we call you?"
                                onChange={(e) => setInfo({ ...info, phoneNumber: e.target.value })}
                                className="px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
                            />
                        </div>

                        <div className="flex flex-col gap-1">
                            <label className="text-sm font-semibold text-gray-700">Message</label>
                            <textarea
                                required
                                rows="4"
                                value={info.message}
                                placeholder="How can we help?"
                                onChange={(e) => setInfo({ ...info, message: e.target.value })}
                                className="px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all resize-none"
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="mt-2 bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 rounded-xl transition-all shadow-md disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {loading ? "Sending..." : "Send Message"}
                        </button>

                    </form>
                )}
            </div>
        </section>
    )
}