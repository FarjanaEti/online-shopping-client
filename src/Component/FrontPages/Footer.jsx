import React from 'react';
import { FaFacebookF, FaTwitter, FaYoutube, FaInstagram } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className=" rounded-3xl  bg-gradient-to-r from-red-200 to-blue-300 shadow-2xl shadow-fuchsia-200 text-black p-10">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
                {/* Branding */}
                <aside className="text-center md:text-left">
                    <div className="flex items-center gap-2 justify-center md:justify-start">
                        <svg
                            width="40"
                            height="40"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                            className="fill-current text-primary">
                            <path d="M22.672 15.226l-2.432.811..."></path>
                        </svg>
                        <span className="text-xl font-bold">NeoMartX</span>
                    </div>
                    <p className="mt-2 text-sm">Your Trusted Online Shopping Partner since 2024</p>
                    <p className="text-xs mt-1">© {new Date().getFullYear()} NeoMartX. All rights reserved.</p>
                </aside>

                {/* Navigation Links */}
                <nav className="text-center">
                    <h3 className="font-semibold mb-2">Quick Links</h3>
                    <ul className="space-y-1 text-sm">
                        <li><a href="/" className="hover:underline">Home</a></li>
                        <li><a href="/shop" className="hover:underline">Shop</a></li>
                        <li><a href="/dashboard" className="hover:underline">Dashboard</a></li>
                        <li><a href="/contact" className="hover:underline">Contact</a></li>
                    </ul>
                </nav>

                {/* Social Icons */}
                <div className="text-center">
                    <h3 className="font-semibold mb-2">Follow Us</h3>
                    <div className="flex justify-center gap-4 text-xl">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><FaFacebookF /></a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter"><FaTwitter /></a>
                        <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube"><FaYoutube /></a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><FaInstagram /></a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
