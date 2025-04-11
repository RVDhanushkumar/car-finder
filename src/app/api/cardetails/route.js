const { NextResponse } = require("next/server")

const getDetails = ()=>{
    const data = [
        {
          "id": 1,
          "name": "Edge",
          "brand": "Ford",
          "fuel_capacity": "55L",
          "fuel_type": "Petrol",
          "transmission": "Automatic",
          "seating_capacity": 4,
          "price": 29915,
          "image_url": "https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg"
        },
        {
          "id": 2,
          "name": "X7",
          "brand": "BMW",
          "fuel_capacity": "66L",
          "fuel_type": "Diesel",
          "transmission": "Automatic",
          "seating_capacity": 5,
          "price": 49337,
          "image_url": "https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg"
        },
        {
          "id": 3,
          "name": "Nexon",
          "brand": "Tata",
          "fuel_capacity": "52L",
          "fuel_type": "Electric",
          "transmission": "Automatic",
          "seating_capacity": 4,
          "price": 44789,
          "image_url": "https://images.pexels.com/photos/210019/pexels-photo-210019.jpeg"
        },
        {
          "id": 4,
          "name": "Z4",
          "brand": "BMW",
          "fuel_capacity": "47L",
          "fuel_type": "Petrol",
          "transmission": "Manual",
          "seating_capacity": 7,
          "price": 22113,
          "image_url": "https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg"
        },
        {
          "id": 5,
          "name": "Bronco",
          "brand": "Ford",
          "fuel_capacity": "48L",
          "fuel_type": "Diesel",
          "transmission": "Automatic",
          "seating_capacity": 4,
          "price": 51006,
          "image_url": "https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg"
        },
        {
          "id": 6,
          "name": "Edge",
          "brand": "Ford",
          "fuel_capacity": "55L",
          "fuel_type": "Petrol",
          "transmission": "Automatic",
          "seating_capacity": 4,
          "price": 29915,
          "image_url": "https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg"
        },
        {
          "id": 7,
          "name": "X7",
          "brand": "BMW",
          "fuel_capacity": "66L",
          "fuel_type": "Diesel",
          "transmission": "Automatic",
          "seating_capacity": 5,
          "price": 49337,
          "image_url": "https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg"
        },
        {
          "id": 8,
          "name": "Nexon",
          "brand": "Tata",
          "fuel_capacity": "52L",
          "fuel_type": "Electric",
          "transmission": "Automatic",
          "seating_capacity": 4,
          "price": 44789,
          "image_url": "https://images.pexels.com/photos/210019/pexels-photo-210019.jpeg"
        },
        {
          "id": 9,
          "name": "Z4",
          "brand": "BMW",
          "fuel_capacity": "47L",
          "fuel_type": "Petrol",
          "transmission": "Manual",
          "seating_capacity": 7,
          "price": 22113,
          "image_url": "https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg"
        },
        {
          "id": 10,
          "name": "Bronco",
          "brand": "Ford",
          "fuel_capacity": "48L",
          "fuel_type": "Diesel",
          "transmission": "Automatic",
          "seating_capacity": 4,
          "price": 51006,
          "image_url": "https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg"
        }
      ];
            
      return data;
}
const handler = () => {
    const carDetails = getDetails();
    return NextResponse.json(carDetails);
  };
  
  module.exports = { GET: handler };