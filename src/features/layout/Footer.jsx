// export default function Footer() {
//     return (
//         <footer className="mt-auto border-t border-gray-100 rounded-xl bg-white py-6">
//             <div className="container px-4 text-center">
//                 <p className="text-xs font-medium text-gray-500 uppercase tracking-widest">
//                     &copy; {new Date().getFullYear()} EcoTracker. All rights reserved.
//                 </p>
//                 <div className="mt-4 flex justify-center gap-6 text-[10px] font-bold text-gray-500 tracking-wider">
//                     <a href="#" className="hover:text-emerald-600 transition-colors">Privacy Policy</a>
//                     <a href="#" className="hover:text-emerald-600 transition-colors">Terms of Service</a>
//                 </div>
//             </div>
//         </footer>
//     );
// }


export default function Footer() {
    return (
        <footer className="mt-auto border-t border-gray-200 py-6">
            <div className="max-w-7xl mx-auto px-4 flex flex-col items-center text-center gap-3">

                {/* Text */}
                <p className="text-xs font-medium text-gray-500 uppercase tracking-widest">
                    © {new Date().getFullYear()} EcoTracker. All rights reserved.
                </p>

                {/* Links */}
                <div className="flex gap-6 text-[11px] font-semibold text-gray-500 tracking-wider">
                    <a
                        href="#"
                        className="hover:text-emerald-600 transition-colors"
                    >
                        Privacy Policy
                    </a>
                    <a
                        href="#"
                        className="hover:text-emerald-600 transition-colors"
                    >
                        Terms of Service
                    </a>
                </div>

            </div>
        </footer>
    );
}

