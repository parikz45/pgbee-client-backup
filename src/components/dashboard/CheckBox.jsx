import { Icon, ICONS } from "./Icons";

const Checkbox = ({ label, name, checked, onChange }) => (
    <label className="flex items-center space-x-3 cursor-pointer">
        <input type="checkbox" name={name} checked={checked} onChange={onChange} className="hidden" />
        <span className={`w-5 h-5 border-2 rounded-md flex items-center justify-center ${checked ? 'bg-gray-900 border-gray-900' : 'border-gray-300'}`}>
            {checked && <Icon path={ICONS.check} className="w-3 h-3 text-white" />}
        </span>
        <span className="text-gray-700">{label}</span>
    </label>
);

export default Checkbox;