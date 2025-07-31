import React, { useState } from 'react';

// Helper component for Icons. In a real app, you'd use a library like lucide-react.
const Icon = ({ path, className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d={path} />
  </svg>
);

// Icon Paths
const ICONS = {
  wifi: "M12 4.5C7 4.5 2.73 7.61 0 12c2.73 4.39 7 7.5 12 7.5s9.27-3.11 12-7.5C21.27 7.61 17 4.5 12 4.5zm0 11.5c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm-7-4c0-1.3.4-2.5 1.1-3.5L3.5 8.9C2.2 10.2 1.2 11.8 1 12c1.2 2.4 3.1 4.5 5.5 5.9l2.4-2.4C8.4 14.5 8 13.3 8 12zm12.5 2.9l2.4 2.4c2.4-1.4 4.3-3.5 5.5-5.9-.2-0.2-1.2-1.8-2.5-3.1l-2.6 2.6c0.7 1 1.1 2.2 1.1 3.5z",
  balcony: "M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zM8 18H4V6h4v12zm6 0h-4V6h4v12zm6 0h-4V6h4v12z",
  kitchen: "M18 2.01L6 2c-1.11 0-2 .89-2 2v16c0 1.11.89 2 2 2h12c1.11 0 2-.89 2-2V4c0-1.11-.89-2-2-2zM8 4h8v2H8V4zm8 16H8v-2h8v2zm0-4H8v-2h8v2zm0-4H8V8h8v4z",
  laundry: "M19.53 4.27L16.26 1H7.74L4.47 4.27L2 4.5v15l2 2h16l2-2v-15l-2.27-.23zM9 16.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5zm6 0c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5zM18 8H6V5h12v3z",
  heart: "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z",
  star: "M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z",
  globe: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L8 12v1c0 1.1.9 2 2 2v3.93zm2-14.25c.59-.55 1.26-1.04 2-1.45 1.57.89 2.8 2.12 3.53 3.7H13v-2.25zM12 10H8v2h4V10zm-3.5 2L5.21 9.21C5.08 9.79 5 10.38 5 11c0 4.08 3.05 7.44 7 7.93v-3.93c-1.1 0-2-.9-2-2v-1zM13 12h3.5c.13-.6.2-1.21.2-1.82 0-1.96-.8-3.73-2.08-5.02.18.64.28 1.31.28 2.02v2.82H13v2z",
  chevronDown: "M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z",
  search: "M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z",
};

// Dummy Data for Hostel Listings
const dummyHostels = [
  {
    id: 1,
    name: 'Ideal Hostel',
    location: 'Opposite College Gate',
    amenities: ['Free Wifi', 'Balcony', 'Kitchen', 'Terrace'],
    rating: 4.5,
    reviews: 100,
    price: 3400,
    originalPrice: 4000,
    images: [
      'https://placehold.co/400x300/a3b18a/ffffff?text=Ideal+Hostel',
      'https://placehold.co/100x80/a3b18a/ffffff?text=Room',
      'https://placehold.co/100x80/a3b18a/ffffff?text=Bath',
      'https://placehold.co/100x80/a3b18a/ffffff?text=View',
    ],
  },
  {
    id: 2,
    name: 'Shelter',
    location: '200m from College',
    amenities: ['Free Wifi', 'Balcony', 'Kitchen', 'Washing Machine'],
    rating: 3.6,
    reviews: 20,
    price: 4800,
    originalPrice: 5000,
    images: [
      'https://placehold.co/400x300/3a5a40/ffffff?text=Shelter',
      'https://placehold.co/100x80/3a5a40/ffffff?text=Lobby',
      'https://placehold.co/100x80/3a5a40/ffffff?text=Bed',
      'https://placehold.co/100x80/3a5a40/ffffff?text=Desk',
    ],
  },
    {
    id: 3,
    name: 'Campus Corner',
    location: '5 min walk to campus',
    amenities: ['Free Wifi', 'Kitchen', 'Study Hall'],
    rating: 4.2,
    reviews: 78,
    price: 3900,
    originalPrice: 4200,
    images: [
      'https://placehold.co/400x300/588157/ffffff?text=Campus+Corner',
      'https://placehold.co/100x80/588157/ffffff?text=Room',
      'https://placehold.co/100x80/588157/ffffff?text=Common',
      'https://placehold.co/100x80/588157/ffffff?text=Exterior',
    ],
  },
];

// Header Component
const Header = () => (
  <header className="bg-white shadow-sm py-3 px-4 sm:px-6 lg:px-8">
    <div className="container mx-auto flex justify-between items-center">
      <div className="flex items-center">
        <h1 className="text-2xl font-bold text-gray-800">PgBee</h1>
      </div>
      <div className="flex-1 max-w-xl mx-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Type a location..."
            className="w-full py-2 pl-4 pr-20 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
          <button className="absolute right-0 top-0 h-full px-5 bg-gray-800 text-white rounded-r-md hover:bg-gray-700 font-semibold">
            Search
          </button>
        </div>
      </div>
      <nav className="hidden md:flex items-center space-x-6 text-sm font-medium text-gray-600">
        <a href="#" className="flex items-center hover:text-gray-900">
          <Icon path={ICONS.globe} className="w-5 h-5 mr-1" />
          <span>EN</span>
          <Icon path={ICONS.chevronDown} className="w-4 h-4 ml-1" />
        </a>
        <a href="#" className="flex items-center hover:text-gray-900">
          <Icon path={ICONS.heart} className="w-5 h-5 mr-1" />
          <span>Wishlist</span>
        </a>
        <a href="#" className="hover:text-gray-900">Hello, Demo</a>
      </nav>
    </div>
  </header>
);

// Filters Sidebar Component
const FiltersSidebar = () => {
  const [price, setPrice] = useState(15000);

  return (
    <aside className="w-full lg:w-1/4 xl:w-1/5 p-4 bg-white rounded-lg shadow-md h-fit">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Filters</h2>
        <button className="text-sm text-gray-500 hover:text-gray-800">Clear All</button>
      </div>

      {/* Amenities Filter */}
      <div className="mb-6">
        <h3 className="font-semibold mb-2">Amenities</h3>
        <input
          type="text"
          placeholder="Search amenities..."
          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md mb-3 focus:outline-none focus:ring-1 focus:ring-yellow-500"
        />
        <div className="flex flex-wrap gap-2 text-sm">
          {['Free Wi-Fi', 'Kitchen', 'Balcony', 'Most preferable', 'Gym'].map(amenity => (
            <button key={amenity} className="px-3 py-1 bg-gray-100 border border-gray-300 rounded-full hover:bg-gray-200">
              {amenity}
            </button>
          ))}
        </div>
        <button className="text-sm text-yellow-600 mt-2 hover:underline">+View more (3 more)</button>
      </div>

      {/* Price Filter */}
      <div className="mb-6">
        <h3 className="font-semibold mb-2">Price</h3>
        <input
          type="range"
          min="5000"
          max="15000"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
        <div className="flex justify-between text-sm text-gray-500 mt-1">
          <span>₹5000</span>
          <span>₹{price}</span>
        </div>
      </div>

      {/* Type of Place Filter */}
      <div className="mb-6">
        <h3 className="font-semibold mb-2">Type of Place</h3>
        <div className="flex border border-gray-300 rounded-md overflow-hidden">
          <button className="flex-1 p-3 text-center bg-gray-800 text-white font-semibold">
            <p>Hostel</p>
            <p className="text-xs font-normal">₹8000 Avg</p>
          </button>
          <button className="flex-1 p-3 text-center bg-white text-gray-700 hover:bg-gray-50">
            <p>PG</p>
            <p className="text-xs font-normal">₹6000 Avg</p>
          </button>
        </div>
      </div>

      {/* Rooms Filter */}
      <div className="mb-6">
        <h3 className="font-semibold mb-2">Rooms</h3>
        <div className="flex flex-wrap gap-2">
            {['1', '2', '3', '4', '5+'].map(num => (
                 <button key={num} className={`w-10 h-10 border rounded-md ${num === '1' ? 'bg-gray-800 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}>
                    {num}
                 </button>
            ))}
        </div>
      </div>

      {/* Gender Filter */}
      <div>
        <h3 className="font-semibold mb-2">Gender</h3>
        <div className="flex border border-gray-300 rounded-md overflow-hidden">
             <button className="flex-1 py-2 text-center bg-white text-gray-700 hover:bg-gray-50">Male</button>
             <button className="flex-1 py-2 text-center bg-white text-gray-700 border-l border-r border-gray-300 hover:bg-gray-50">Female</button>
             <button className="flex-1 py-2 text-center bg-white text-gray-700 hover:bg-gray-50">Co-ed</button>
        </div>
      </div>
    </aside>
  );
};

// Hostel Card Component
const HostelCard = ({ hostel }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col md:flex-row mb-6">
      {/* Image Gallery */}
      <div className="w-full md:w-1/3 flex-shrink-0">
        <img src={hostel.images[0]} alt={hostel.name} className="w-full h-48 md:h-full object-cover" />
        <div className="hidden md:flex p-2 space-x-2 bg-white">
          {hostel.images.slice(1).map((img, index) => (
            <img key={index} src={img} alt={`${hostel.name} thumbnail ${index + 1}`} className="w-1/4 h-16 object-cover rounded-md cursor-pointer" />
          ))}
        </div>
      </div>

      {/* Hostel Details */}
      <div className="p-4 flex flex-col flex-grow">
        <div>
          <h3 className="text-xl font-bold text-gray-800">{hostel.name}</h3>
          <p className="text-sm text-gray-500 mb-3">{hostel.location}</p>
        </div>
        
        <div className="flex flex-wrap items-center text-xs text-gray-600 mb-4">
          {hostel.amenities.map(amenity => (
            <span key={amenity} className="flex items-center mr-4 mb-1">
              <span className="w-1 h-1 bg-gray-400 rounded-full mr-2"></span>
              {amenity}
            </span>
          ))}
        </div>

        <div className="flex-grow"></div> {/* Spacer */}

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-auto">
          <div>
            <div className="flex items-center mb-2">
              <span className="bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded-md flex items-center">
                {hostel.rating}
                <Icon path={ICONS.star} className="w-3 h-3 ml-1" />
              </span>
              <span className="text-sm text-gray-600 ml-2">({hostel.reviews} Ratings)</span>
            </div>
            <div className="flex items-baseline">
              <p className="text-xl font-bold text-gray-900">₹{hostel.price.toLocaleString()}</p>
              <p className="text-sm text-gray-500 line-through ml-2">₹{hostel.originalPrice.toLocaleString()}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2 mt-4 sm:mt-0">
            <button className="px-4 py-2 text-sm font-semibold border border-gray-800 text-gray-800 rounded-md hover:bg-gray-100">
              View Details
            </button>
            <button className="px-4 py-2 text-sm font-semibold bg-gray-800 text-white rounded-md hover:bg-gray-700">
              Book Now
            </button>
            <button onClick={() => setIsWishlisted(!isWishlisted)} className="p-2 rounded-full hover:bg-red-50">
              <Icon path={ICONS.heart} className={`w-6 h-6 ${isWishlisted ? 'text-red-500' : 'text-gray-400'}`} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};


// Main App Component
export default function App() {
  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <Header />
      <main className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Sidebar */}
          <FiltersSidebar />

          {/* Right Content */}
          <div className="w-full lg:w-3/4 xl:w-4/5">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              Hostels in College Of Engineering, Trivandrum ({dummyHostels.length} search results)
            </h2>
            <div>
              {dummyHostels.map(hostel => (
                <HostelCard key={hostel.id} hostel={hostel} />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
