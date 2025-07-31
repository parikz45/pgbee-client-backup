import { getAccessToken } from '@/utils/auth';
import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE;

const Data = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/hostel`, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
    const hostelsRaw = response.data.data.hostels
    const transformedData = hostelsRaw.map((hostel) => ({
      id: hostel.id,
      name: hostel.hostelName,
      address: hostel.address,
      location: hostel.location,
      amenities: [
        ...(hostel.Ammenity?.wifi ? ['Free Wifi'] : []),
        ...(hostel.Ammenity?.ac ? ['AC'] : []),
        ...(hostel.Ammenity?.kitchen ? ['Kitchen'] : []),
        ...(hostel.Ammenity?.parking ? ['Parking'] : []),
        ...(hostel.Ammenity?.laundry ? ['Laundry'] : []),
        ...(hostel.Ammenity?.tv ? ['TV'] : []),
        ...(hostel.Ammenity?.firstAid ? ['First Aid'] : []),
        ...(hostel.Ammenity?.workspace ? ['Workspace'] : []),
        ...(hostel.Ammenity?.security ? ['Security'] : []),
        ...(hostel.Ammenity?.currentBill ? ['Electricity Bill Included'] : []),
        ...(hostel.Ammenity?.waterBill ? ['Water Bill Included'] : []),
        ...(hostel.Ammenity?.food ? ['Food Included'] : []),
        ...(hostel.Ammenity?.furniture ? ['Furniture'] : []),
        ...(hostel.Ammenity?.bed ? ['Bed'] : []),
        ...(hostel.Ammenity?.water ? ['Water'] : []),
      ],
      rating: 0.0,
      reviews: hostel.Reviews?.length || 0,
      price: hostel.Rents?.[0]?.rent || 0,
      originalPrice: (hostel.Rents?.[0]?.rent || 0) + 500,
      images: hostel.files?.split(',').map((file) => file.trim()) || [],
    }));
    console.log(location)
    return transformedData;
  } catch (error) {
    console.error('❌ Error fetching hostels:', error);
    return [];
  }
};

export default Data;
