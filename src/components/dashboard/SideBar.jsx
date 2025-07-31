import { useState } from "react";
import Checkbox from "./CheckBox";

const FiltersSidebar = () => {
  const [price, setPrice] = useState(15000);
  const [selectedRooms, setSelectedRooms] = useState('Any');
  const [selectedBathrooms, setSelectedBathrooms] = useState('Any');
  const [filters, setFilters] = useState({
      curfew: true,
      noCurfew: false,
      singleRoom: true,
      sharedRoom: false,
      attached: true,
      notAttached: false,
      cautionYes: true,
      cautionNo: false,
  });

  const handleCheckboxChange = (e) => {
      const { name, checked } = e.target;
      setFilters(prev => ({ ...prev, [name]: checked }));
  };

  return (
    <aside className="w-full p-6 bg-white rounded-xl shadow-lg h-fit">
      <h2 className="text-2xl font-bold mb-6">Filters</h2>

      <div className="space-y-6">
        {/* Amenities */}
        <div>
          <h3 className="font-semibold mb-3 text-lg">Amenities</h3>
          <input
            type="text"
            placeholder="Search..."
            className="w-full text-sm border-b border-gray-300 focus:outline-none focus:border-gray-500 pb-1 mb-3"
          />
          <div className="flex flex-wrap gap-2 text-sm">
            {['Free Wifi', 'Kitchen', 'Balcony', 'Terrece', 'Walking Distance', 'Mess Available'].map(amenity => (
              <button key={amenity} className="px-3 py-1.5 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200">
                {amenity}
              </button>
            ))}
          </div>
          <button className="text-sm text-gray-500 mt-2 hover:underline">+ View More</button>
        </div>
        <hr/>

        {/* Price */}
        <div>
          <h3 className="font-semibold mb-3 text-lg">Price</h3>
          <input
            type="range"
            min="1000"
            max="15000"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full h-1 bg-black rounded-lg appearance-none cursor-pointer range-slider"
          />
          <div className="flex justify-between text-sm text-gray-500 mt-1">
            <span>₹{Number(1000).toLocaleString()}</span>
            <span>₹{Number(price).toLocaleString()}</span>
          </div>
        </div>
        <hr/>

        {/* Type of Place */}
        <div>
          <h3 className="font-semibold mb-3 text-lg">Type of Place</h3>
          <div className="flex border border-gray-300 rounded-lg overflow-hidden text-center">
            <button className="flex-1 p-2 bg-gray-800 text-white">
              <p className="font-semibold">Hostel</p>
              <p className="text-xs font-normal">₹3,000 avg.</p>
            </button>
            <button className="flex-1 p-2 bg-white text-gray-700 hover:bg-gray-50">
              <p className="font-semibold">PG</p>
              <p className="text-xs font-normal">₹5,000 avg.</p>
            </button>
          </div>
        </div>
        <hr/>

        {/* Rooms & Bathrooms */}
        {['Rooms', 'Bathrooms'].map(type => {
            const state = type === 'Rooms' ? selectedRooms : selectedBathrooms;
            const setState = type === 'Rooms' ? setSelectedRooms : setSelectedBathrooms;
            return (
                <div key={type}>
                    <h3 className="font-semibold mb-3 text-lg">{type}</h3>
                    <div className="flex flex-wrap gap-2">
                        {['Any', '1', '2', '3', '4', '5+'].map(num => (
                            <button 
                                key={num} 
                                onClick={() => setState(num)}
                                className={`px-4 py-2 border rounded-lg ${state === num ? 'bg-gray-800 text-white border-gray-800' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'}`}
                            >
                                {num}
                            </button>
                        ))}
                    </div>
                </div>
            )
        })}
        <hr/>

        {/* Checkbox Filters */}
        <div className="space-y-4">
            <div>
                <h3 className="font-semibold mb-3 text-lg">Curfew</h3>
                <div className="space-y-2">
                    <Checkbox label="Mandatory Curfew" name="curfew" checked={filters.curfew} onChange={handleCheckboxChange} />
                    <Checkbox label="No Curfew" name="noCurfew" checked={filters.noCurfew} onChange={handleCheckboxChange} />
                </div>
            </div>
            <div>
                <h3 className="font-semibold mb-3 text-lg">Room Type</h3>
                 <div className="space-y-2">
                    <Checkbox label="Single Room" name="singleRoom" checked={filters.singleRoom} onChange={handleCheckboxChange} />
                    <Checkbox label="Shared Room" name="sharedRoom" checked={filters.sharedRoom} onChange={handleCheckboxChange} />
                </div>
            </div>
            <div>
                <h3 className="font-semibold mb-3 text-lg">Bathroom Attachment</h3>
                 <div className="space-y-2">
                    <Checkbox label="Attached" name="attached" checked={filters.attached} onChange={handleCheckboxChange} />
                    <Checkbox label="Not Attached" name="notAttached" checked={filters.notAttached} onChange={handleCheckboxChange} />
                </div>
            </div>
             <div>
                <h3 className="font-semibold mb-3 text-lg">Caution Deposit</h3>
                 <div className="space-y-2">
                    <Checkbox label="Yes" name="cautionYes" checked={filters.cautionYes} onChange={handleCheckboxChange} />
                    <Checkbox label="No" name="cautionNo" checked={filters.cautionNo} onChange={handleCheckboxChange} />
                </div>
            </div>
        </div>
      </div>
    </aside>
  );
};

export default FiltersSidebar;