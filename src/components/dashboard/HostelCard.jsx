import { useState } from "react";
import { Icon, ICONS } from "./Icons";

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
        <p className="text-lg text-gray-400 mb-2">{hostel.address}</p>
        
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
        <p>gender : {hostel.sex}</p>
        <a href={hostel.location} target="_blank">
          <button className='text-sm text-blue-500 hover:underline focus:outline-none mb-2 text-left'>Location</button>
        </a>
        <div className="flex items-center mt-auto">
          <div className="flex items-center space-x-2">
            <button className="px-5 py-2 text-base font-semibold border border-gray-400 text-gray-800 rounded-lg hover:bg-gray-100">
              {hostel.phone}
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

export default HostelCard;