"use client";
import { useEffect, useState } from "react";
import { Range } from "react-range";
import Card from "./components/Card";
import axios from "axios";
import Image from "next/image";

export default function Home() {
  const MIN = 20000;
  const MAX = 52000;
  const STEP = 1000;
  const itemsPerPage = 10;

  const [car, setCar] = useState("");
  const [brand, setBrand] = useState("All");
  const [seat, setSeat] = useState("All");
  const [fuel, setFuel] = useState("All");
  const [values, setValues] = useState([MIN, MAX]);
  const [alldata, setAlldata] = useState([]);
  const [data, setData] = useState([]);
  const [err, setErr] = useState();
  const [loading, setLoading] = useState(false);
  const [sortOrder, setSortOrder] = useState("asc");
  const [wishList, setWishList] = useState(false);
  const [wList, setWList] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const res = await axios.get("http://localhost:3000/api/cardetails");
        setAlldata(res.data);
        setErr("");
      } catch (err) {
        setErr(err.message || "Something went wrong");
      }
      setLoading(false);
    };
    getData();
  }, []);

  useEffect(() => {
    try {
      const storedWishlist = localStorage.getItem("wishlist");
      const parsedWishlist = storedWishlist ? JSON.parse(storedWishlist) : [];
      setWList(parsedWishlist);
    } catch (err) {
      console.error("Failed to parse wishlist:", err);
      setWList([]);
    }
  }, [wishList]);

  useEffect(() => {
    const updateData = () => {
      const x = alldata.filter((item) => {
        return (
          (brand === "All" || item.brand === brand) &&
          (fuel === "All" || item.fuel_type === fuel) &&
          (seat === "All" || item.seating_capacity == seat) &&
          item.price >= values[0] &&
          item.price <= values[1] &&
          (car === "All" || item.name.toLowerCase().includes(car.toLowerCase()))
        );
      });
      x.sort((a, b) =>
        sortOrder === "asc" ? a.price - b.price : b.price - a.price
      );
      setData(x);
      setCurrentPage(1);
    };
    updateData();
  }, [alldata, brand, fuel, seat, values, car, sortOrder]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const paginatedData = (wishList ? wList : data).slice(startIndex, endIndex);
  const totalPages = Math.ceil((wishList ? wList.length : data.length) / itemsPerPage);

  return (
    <div>
      <nav className="h-20 flex p-5">
        <div className="w-[20%] min-w-40 px-5">
          <Image src={require("./asset/logo.png")} height={90} width={80} className="px-1" />
        </div>
        <div className="flex justify-between w-full">
          <div className="bg-gray-200 rounded-2xl p-2 w-[60%] max-w-150">
            <span className="mr-4">🔍</span>
            <input
              type="text"
              value={car}
              placeholder="Search for your dream car"
              className="w-[70%] bg-transparent outline-none"
              onChange={(e) => {
                setCar(e.target.value);
              }}
            />
          </div>
          <div
            className="bg-gray-200 p-2 rounded-2xl cursor-pointer hover:scale-110 ease-in duration-100"
            onClick={() => {
              setWishList(!wishList);
              setCurrentPage(1);
            }}
          >
            <h2>WishList🖤</h2>
          </div>
        </div>
      </nav>

      <div className="flex">
        <div className="w-[20%] p-4 min-h-[89vh] min-w-[150]">
          <h2 className="text-xl font-semibold mb-2">Filter</h2>

          <label className="block mb-1">Brand:</label>
          <select
            className="mb-4 w-full cursor-pointer p-1 rounded border"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
          >
            <option>All</option>
            <option>BMW</option>
            <option>Audi</option>
            <option>TATA</option>
            <option>Ford</option>
          </select>

          <div className="mb-6 flex flex-col items-center text-center">
            <h3 className="mb-4 text-lg font-semibold text-gray-800">
              Price Range
            </h3>
            <div className="flex items-center gap-2 bg-gray-100 p-3 rounded-xl shadow-sm w-fit text-gray-700 text-sm font-medium flex-wrap justify-center">
              <span className="px-3 py-1 bg-white rounded-full shadow-inner border">
                ₹{values[0].toLocaleString()}
              </span>
              <span className="text-gray-500">to</span>
              <span className="px-3 py-1 bg-white rounded-full shadow-inner border">
                ₹{values[1].toLocaleString()}
              </span>
            </div>
          </div>

          <Range
            step={STEP}
            min={MIN}
            max={MAX}
            values={values}
            onChange={(newValues) => setValues(newValues)}
            renderTrack={({ props, children }) => (
              <div
                {...props}
                style={{
                  ...props.style,
                  height: "6px",
                  background: "linear-gradient(to right, #0a74da, #ccc)",
                  borderRadius: "3px",
                }}
              >
                {children}
              </div>
            )}
            renderThumb={({ props }, index) => (
              <div
                key={index}
                {...props}
                style={{
                  ...props.style,
                  height: "20px",
                  width: "20px",
                  backgroundColor: "#0a74da",
                  borderRadius: "50%",
                  outline: "none",
                }}
              />
            )}
          />

          <label className="block mt-4 mb-1">Fuel:</label>
          <select
            className="w-full p-1 rounded border cursor-pointer"
            value={fuel}
            onChange={(e) => setFuel(e.target.value)}
          >
            <option>All</option>
            <option>Petrol</option>
            <option>Diesel</option>
            <option>Electric</option>
            <option>CNG</option>
          </select>

          <label className="block mt-4 mb-1">Seating Capacity:</label>
          <select
            className="w-full p-1 rounded border cursor-pointer"
            value={seat}
            onChange={(e) => setSeat(e.target.value)}
          >
            <option>All</option>
            <option>4</option>
            <option>5</option>
            <option>6</option>
            <option>7</option>
          </select>
        </div>

        <div className="w-full bg-gray-100 p-4">
          <div className="flex justify-between">
            <h1 className="font-semibold text-[30px]">{wishList ? "WishList" : "Products"}</h1>
            <div>
              <label> Price: </label>
              <select
                className="cursor-pointer"
                onChange={(e) => setSortOrder(e.target.value)}
                value={sortOrder}
              >
                <option value="asc">Low - High</option>
                <option value="desc">High - Low</option>
              </select>
            </div>
          </div>

          <div className="flex flex-wrap gap-6 py-10 pl-[10%]">
            {loading ? (
              <h1 className="text-center text-xl font-semibold text-gray-600">Loading...</h1>
            ) : paginatedData.length > 0 ? (
              paginatedData.map((item, index) => (
                <Card
                  key={item.id || index}
                  name={item.name}
                  image_url={item.image_url}
                  fuel_capacity={item.fuel_capacity}
                  transmission={item.transmission}
                  seating_capacity={item.seating_capacity}
                  price={item.price}
                />
              ))
            ) : (
              <h1 className="text-center text-xl font-semibold text-gray-600">No cars found</h1>
            )}
          </div>
          <div className="flex justify-center gap-4 mt-6">
            <button
              className="bg-gray-500 text-white px-4 py-2 rounded-2xl disabled:opacity-50"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Prev
            </button>
            <span className="px-4 py-2">
              Page {currentPage} of {totalPages}
            </span>
            <button
              className="bg-gray-500 text-white px-4 py-2 rounded-2xl disabled:opacity-50"
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
