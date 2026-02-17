import Link from 'next/link';
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

export default function Footer() {
    return (

        <footer className="bg-brand-600 text-white py-24 px-4 text-center">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-4xl font-bold mb-8">Need a Plumber Today?</h2>
                <a href="tel:+18336090936" className="inline-block bg-white text-brand-700 font-bold px-12 py-5 rounded-xl text-2xl hover:bg-brand-50 transition shadow-lg hover:scale-105">
                    (833) 609-0936
                </a>
            </div>
        </footer>
    );
}