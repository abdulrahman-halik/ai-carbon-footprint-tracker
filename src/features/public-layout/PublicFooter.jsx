import React from 'react';
import Link from 'next/link';
import { Leaf, Twitter, Facebook, Instagram, Linkedin } from 'lucide-react';

export function PublicFooter() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-white border-t border-gray-100">
            <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-4 lg:grid-cols-5">
                    {/* Brand & Mission */}
                    <div className="md:col-span-2 lg:col-span-2">
                        <Link href="/" className="flex items-center gap-2 mb-4">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-100 text-primary">
                                <Leaf size={20} />
                            </div>
                            <span className="text-lg font-bold text-gray-900">EcoTracker</span>
                        </Link>
                        <p className="text-sm text-gray-500 max-w-xs leading-relaxed">
                            Empowering individuals to understand their diverse carbon footprints
                            and take actionable steps towards a sustainable future. Join us in
                            making a difference, one choice at a time.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">
                            Platform
                        </h3>
                        <ul className="space-y-3">
                            <li>
                                <Link href="/learn" className="text-sm text-gray-600 hover:text-primary transition-colors">
                                    Education Hub
                                </Link>
                            </li>
                            <li>
                                <Link href="/projects" className="text-sm text-gray-600 hover:text-primary transition-colors">
                                    Offset Projects
                                </Link>
                            </li>
                            <li>
                                <Link href="/estimator" className="text-sm text-gray-600 hover:text-primary transition-colors">
                                    Footprint Estimator
                                </Link>
                            </li>
                            <li>
                                <Link href="/login" className="text-sm text-gray-600 hover:text-primary transition-colors">
                                    Login / Register
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">
                            Company
                        </h3>
                        <ul className="space-y-3">
                            <li>
                                <Link href="/about" className="text-sm text-gray-600 hover:text-primary transition-colors">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link href="/careers" className="text-sm text-gray-600 hover:text-primary transition-colors">
                                    Careers
                                </Link>
                            </li>
                            <li>
                                <Link href="/privacy" className="text-sm text-gray-600 hover:text-primary transition-colors">
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link href="/terms" className="text-sm text-gray-600 hover:text-primary transition-colors">
                                    Terms of Service
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Social */}
                    <div>
                        <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">
                            Connect
                        </h3>
                        <div className="flex space-x-4">
                            <Link href="#" className="text-gray-400 hover:text-primary transition-colors" aria-label="Twitter">
                                <Twitter size={20} />
                            </Link>
                            <Link href="#" className="text-gray-400 hover:text-primary transition-colors" aria-label="Facebook">
                                <Facebook size={20} />
                            </Link>
                            <Link href="#" className="text-gray-400 hover:text-primary transition-colors" aria-label="Instagram">
                                <Instagram size={20} />
                            </Link>
                            <Link href="#" className="text-gray-400 hover:text-primary transition-colors" aria-label="LinkedIn">
                                <Linkedin size={20} />
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center bg-gray-50/50 p-4 rounded-2xl">
                    <p className="text-sm text-gray-500">
                        © {currentYear} EcoTracker. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
