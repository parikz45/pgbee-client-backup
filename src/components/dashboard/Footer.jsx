import { Icon, ICONS } from "./Icons";

const Footer = () => (
    <footer className="bg-white border-t">
        <div className="container mx-auto py-4 px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center text-sm text-gray-600">
            <div className="flex items-center space-x-4 mb-4 sm:mb-0">
                <span>© 2025 PgBee</span>
                <a href="#" className="hover:underline">Privacy</a>
                <a href="#" className="hover:underline">Terms</a>
                <a href="#" className="hover:underline">Company details</a>
            </div>
            <div className="flex items-center space-x-4">
                <a href="#" className="text-gray-600 hover:text-gray-900">
                    <Icon path={ICONS.whatsapp} className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-600 hover:text-gray-900">
                    <Icon path={ICONS.instagram} className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-600 hover:text-gray-900">
                    <Icon path={ICONS.facebook} className="w-5 h-5" />
                </a>
            </div>
        </div>
    </footer>
);

export default Footer;