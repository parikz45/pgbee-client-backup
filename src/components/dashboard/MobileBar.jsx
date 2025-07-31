import { ICONS } from "./Icons";

const MobileSidebar = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50">
            {/* Overlay */}
            <div className="absolute inset-0 bg-black opacity-50" onClick={onClose}></div>
            
            {/* Sidebar */}
            <div className="absolute top-0 right-0 h-full w-64 bg-white shadow-xl p-6 transform transition-transform duration-300 ease-in-out">
                <button onClick={onClose} className="absolute top-4 right-4 p-2 text-gray-500 hover:text-gray-800">
                    <Icon path={ICONS.close} className="w-6 h-6" />
                </button>
                <nav className="mt-10 flex flex-col space-y-6 text-lg">
                    <a href="#" className="flex items-center hover:text-gray-900">
                        <Icon path={ICONS.globe} className="w-5 h-5 mr-2" />
                        <span>EN</span>
                    </a>
                    <a href="#" className="flex items-center hover:text-gray-900">
                        <Icon path={ICONS.rupee} className="w-5 h-5 mr-2" />
                        <span>INR</span>
                    </a>
                    <a href="#" className="flex items-center hover:text-gray-900">
                        <Icon path={ICONS.heart} className="w-5 h-5 mr-2" />
                        <span>Wishlist</span>
                    </a>
                    <a href="/auth/login" className="flex items-center hover:text-gray-900">
                        <Icon path={ICONS.user} className="w-5 h-5 mr-2" />
                        <span>Login / Signup</span>
                    </a>
                </nav>
            </div>
        </div>
    );
};

export default MobileSidebar;