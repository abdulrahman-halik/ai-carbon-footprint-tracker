export default function Footer() {
    return (
        <footer className="mt-auto border-t border-gray-100 bg-white py-6">
            <div className="container px-4 text-center">
                <p className="text-sm text-gray-400">
                    &copy; {new Date().getFullYear()} EcoTracker. All rights reserved.
                </p>
                <div className="mt-2 flex justify-center gap-4 text-xs text-gray-400">
                    <a href="#" className="hover:text-gray-600 hover:underline">Privacy Policy</a>
                    <a href="#" className="hover:text-gray-600 hover:underline">Terms of Service</a>
                </div>
            </div>
        </footer>
    );
}
