'use client';

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
  check: "M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z",
  checkCircle: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z",
  menu: "M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z",
  filter: "M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z",
  whatsapp: "M16.75 13.96c.25.25.25.66 0 .91l-1.54 1.54c-.12.12-.28.19-.45.19-.17 0-.33-.07-.45-.19-1.22-.48-2.5-1.44-3.6-2.55-1.1-1.1-2.07-2.38-2.55-3.6-.25-.25-.25-.66 0-.91l1.54-1.54c.25-.25.66-.25.91 0l1.13 1.13c.25.25.25.66 0 .91L11.5 10.5c-.12.12-.19.28-.19.45s.07.33.19.45c.48 1.22 1.44 2.5 2.55 3.6 1.1 1.1 2.38 2.07 3.6 2.55.25.25.66.25.91 0l1.13-1.13c.25-.25.66-.25.91 0l1.13 1.13zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z",
  instagram: "M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8A3.6 3.6 0 0 0 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6A3.6 3.6 0 0 0 16.4 4H7.6m9.65 1.5a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5M12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10m0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6z",
  facebook: "M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z",
  rupee: "M13.5 2.5H6v2h5.5c1.38 0 2.5 1.12 2.5 2.5S12.88 9.5 11.5 9.5H6v2h5.5c2.49 0 4.5 2.01 4.5 4.5s-2.01 4.5-4.5 4.5H6v2h7.5c3.59 0 6.5-2.91 6.5-6.5s-2.91-6.5-6.5-6.5z",
  user: "M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z",
  nearMe: "M12 8c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm8.94 3c-.46-4.17-3.77-7.48-7.94-7.94V1h-2v2.06C6.83 3.52 3.52 6.83 3.06 11H1v2h2.06c.46 4.17 3.77 7.48 7.94 7.94V23h2v-2.06c4.17-.46 7.48-3.77 7.94-7.94H23v-2h-2.06zM12 19c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z",
};

// Dummy Data for Hostel Listings
const dummyHostels = [
  {
    id: 1,
    name: 'Golden Turtles Homestay',
    location: 'Vattappara, India',
    amenities: ['Free Wifi', 'Balcony', 'Kitchen', 'Terrace', 'AC', 'Parking', 'TV', 'Geyser', 'Washing Machine', 'CCTV', 'Security', 'Power Backup', 'Housekeeping', 'Laundry', 'RO Water', 'Hot Water', 'Pantry'],
    rating: 3.6,
    reviews: 766,
    price: 5000,
    originalPrice: 5500,
    images: [
      '/house1.png',
      '/house2.png',
      '/house3.png',
      '/house4.png',
      '/house5.png',
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
      '/shelter_1.webp',
      '/shelter_2.webp',
      '/shelter_3.webp',
      '/shelter_4.avif',
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
      'niva(1).webp',
      'niva(2).webp',
      'niva(3).webp',
      'niva(4).webp',
      'niva(5).webp',
    ],
  },
];

// Header Component
const Header = () => (
  <header className="bg-white shadow-sm py-5 px-4 sm:px-6 lg:px-8">
    <div className="container mx-auto flex justify-between items-center">
      <div className="flex items-center">
        <h1 className="text-3xl font-bold text-gray-800">
            <img src="/PgBee.png" alt="PgBee Logo" className="h-8" />
        </h1>
      </div>
      <div className=" max-w-xl mx-4 hidden sm:flex items-center border rounded-full shadow-sm">
        <input
            type="text"
            placeholder="Bangalore, India"
            className="w-full py-2 pl-3 pr-4 lg:px-4 rounded-l-full focus:outline-none"
        />
        <button className="flex items-center bg-gray-100 text-gray-600 px-4 py-1.5 rounded-full mx-2 whitespace-nowrap text-sm hover:bg-gray-200">
            <Icon path={ICONS.nearMe} className="w-4 h-4 mr-1" />
            Near me
        </button>
        <button className=" relative left- px-6 py-2 bg-gray-800 text-white rounded-2xl hover:bg-gray-700 font-semibold">
            Search
        </button>
      </div>
      <nav className="hidden md:flex items-center space-x-4 text-sm font-medium text-gray-600">
        <a href="#" className="flex items-center hover:text-gray-900">
          <Icon path={ICONS.globe} className="w-5 h-5 mr-1" />
          <span>EN</span>
        </a>
        <a href="#" className="flex items-center hover:text-gray-900">
          <Icon path={ICONS.rupee} className="w-5 h-5 mr-1" />
          <span>INR</span>
        </a>
        <a href="#" className="flex items-center hover:text-gray-900">
          <Icon path={ICONS.heart} className="w-5 h-5 mr-1" />
          <span>Wishlist</span>
        </a>
        <a href="/auth/login" className="flex items-center hover:text-gray-900">
            <Icon path={ICONS.user} className="w-5 h-5 mr-1" />
            <span>Login / Signup</span>
        </a>
      </nav>
      <div className="md:hidden">
        <button className="p-2 rounded-md text-gray-600 hover:bg-gray-100">
            <Icon path={ICONS.search} className="w-6 h-6" />
        </button>
      </div>
    </div>
  </header>
);

// Custom Checkbox Component
const Checkbox = ({ label, name, checked, onChange }) => (
    <label className="flex items-center space-x-3 cursor-pointer">
        <input type="checkbox" name={name} checked={checked} onChange={onChange} className="hidden" />
        <span className={`w-5 h-5 border-2 rounded-md flex items-center justify-center ${checked ? 'bg-gray-900 border-gray-900' : 'border-gray-300'}`}>
            {checked && <Icon path={ICONS.check} className="w-3 h-3 text-white" />}
        </span>
        <span className="text-gray-700">{label}</span>
    </label>
);

// Filters Sidebar Component
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


// Hostel Card Component
const HostelCard = ({ hostel }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const displayedThumbnails = hostel.images.slice(1, 6);
  const remainingImagesCount = hostel.images.length - 6;
  const displayedAmenities = hostel.amenities.slice(0, 4);
  const remainingAmenitiesCount = hostel.amenities.length - 4;


  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col md:flex-row mb-3">
      {/* Image Gallery */}
      <div className="w-full md:w-2/5 md:h-70 flex-shrink-0 flex gap-1 p-2">
        {/* Main Image */}
        <div className="w-3/4">
          <img
            src={hostel.images[0]}
            alt={hostel.name}
            className="w-full h-48 md:h-65 object-cover rounded-xl"
            onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/300x300?text=Error'; }}
          />
        </div>
        {/* Vertical Thumbnails */}
        <div className="w-1/4 flex flex-col gap-1 md:h-60">
          {displayedThumbnails.map((img, index) => (
            <div key={index} className="relative h-1/5">
              <img
                src={img}
                alt={`${hostel.name} thumbnail ${index + 2}`}
                className="w-full h-full object-cover rounded-lg cursor-pointer"
                onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/100x100?text=Error'; }}
              />
              {index === 4 && remainingImagesCount > 0 && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg cursor-pointer">
                  <span className="text-white text-lg font-bold">+{remainingImagesCount}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>


      {/* Hostel Details */}
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-2xl font-bold text-gray-900">{hostel.name}</h3>
        <p className="text-lg text-gray-400 mb-2">{hostel.location}</p>
        
        <div className="flex flex-wrap items-center text-sm text-gray-800 my-2 gap-x-4 gap-y-2">
          {displayedAmenities.map(amenity => (
            <span key={amenity} className="flex items-center">
              <Icon path={ICONS.checkCircle} className="w-5 h-5 mr-1.5 text-gray-500" />
              {amenity}
            </span>
          ))}
          {remainingAmenitiesCount > 0 && (
            <span className="text-sm text-gray-500">+ {remainingAmenitiesCount} more</span>
          )}
        </div>

        <div className="flex items-center mb-3">
          <span className="bg-yellow-400 text-black text-sm font-bold px-2 py-1 rounded flex items-center">
            {hostel.rating}
            <Icon path={ICONS.star} className="w-3 h-3 ml-1" />
          </span>
          <span className="text-sm text-gray-600 ml-2">({hostel.reviews} Ratings)</span>
        </div>

        <div className="flex items-baseline mb-4">
          <p className="text-lg font-bold text-gray-900">₹{hostel.price.toLocaleString()}</p>
          <p className="text-base text-gray-400 line-through ml-2">₹{hostel.originalPrice.toLocaleString()}</p>
        </div>
        <button className='text-sm text-blue-500 hover:underline focus:outline-none mb-2 text-left'>Location</button>
        <div className="flex items-center mt-auto">
          <div className="flex items-center space-x-2">
            <button className="px-5 py-2 text-base font-semibold border border-gray-400 text-gray-800 rounded-lg hover:bg-gray-100">
              View Details
            </button>
            <button className="px-5 py-2 text-base font-semibold bg-gray-900 text-white rounded-lg hover:bg-gray-800">
              Book Now
            </button>
          </div>
          <button onClick={() => setIsWishlisted(!isWishlisted)} className="ml-auto p-2 border border-gray-300 rounded-full hover:bg-gray-100">
            <Icon path={ICONS.heart} className={`w-6 h-6 ${isWishlisted ? 'text-red-500' : 'text-gray-400'}`} />
          </button>
        </div>
      </div>
    </div>
  );
};

// Footer Component
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


// Main App Component
export default function App() {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="bg-gray-50 min-h-screen font-sans flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="lg:hidden mb-4">
            <button
                onClick={() => setShowFilters(!showFilters)}
                className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
                <Icon path={ICONS.filter} className="w-5 h-5 mr-2 -ml-1" />
                {showFilters ? 'Hide Filters' : 'Show Filters'}
            </button>
        </div>
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Sidebar */}
          <div className={`${showFilters ? 'block' : 'hidden'} lg:block w-full lg:w-1/4 xl:w-1/5`}>
            <FiltersSidebar />
          </div>

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
      <Footer />
    </div>
  );
}
