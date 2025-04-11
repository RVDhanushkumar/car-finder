import Image from "next/image";
import { useEffect, useState } from "react";

export default function Card(props) {

  const [wished,setWished] = useState(false);
  useEffect(() => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    const alreadyWished = wishlist.some(item => item.name === props.name);
    if (alreadyWished) {
      setWished(true);
    }
  }, [props.name]);

  const addToWishList = ()=>{
    const car = {
        id : props.id,
        name: props.name,
        brand: props.brand,
        fuel_capacity: props.fuel_capacity,
        fuel_type: props.fuel_type,
        transmission: props.transmission,
        seating_capacity: props.seating_capacity,
        price: props.price,
        image_url: props.image_url,
    };
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    const alreadyWished = wishlist.some(item => item.name === car.name);
    if (!alreadyWished) {
        wishlist.push(car);
        localStorage.setItem("wishlist", JSON.stringify(wishlist));
        setWished(true);
        alert("Added to wishlist..!");
      } else {
        const removedData = wishlist.filter(item => item.name !== car.name);
        localStorage.setItem("wishlist", JSON.stringify(removedData))
        setWished(false);
        alert("Removed from Wishlist..!!");
      }
  }

  return (
    <div className="w-60 h-75 bg-white rounded-2xl p-2 shadow-2xl">
      <div>
        <h1 className="font-extrabold mt-2">{props.name}</h1>
      </div>
      <div className="max-h-40 overflow-hidden my-3">
        <Image
          height={250}
          width={300}
          className="rounded-2xl "
          src={props.image_url}
          alt="Car_pic"
        ></Image>
      </div>

      <div className="flex justify-between p-2">
        <p className="text-gray-500">⛽{props.fuel_capacity}</p>
        <p className="text-gray-500">🎚 {props.transmission}</p>
        <p className="text-gray-500">💺 {props.seating_capacity}</p>
      </div>
      <div className="flex justify-between mx-2">
        <p className="p-1">$ {props.price}</p>
        <div className="p-2 bg-black text-white rounded-2xl font-stretch-50% cursor-pointer hover:scale-110 ease-in duration-100" onClick={addToWishList}>
          {wished ? "Added ✔️" : "Add to Wishlist 🛒"}
        </div>
      </div>
    </div>
  );
}
