// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { FiMapPin } from "react-icons/fi";
import { FaBed } from "react-icons/fa6";
import { MdOutlineBathroom } from "react-icons/md";
import { FaRegHospital } from "react-icons/fa";
import { FaBookReader } from "react-icons/fa";
import { FaLongArrowAltRight } from "react-icons/fa";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import { Link } from "react-router-dom";
import axios from "axios";
import { useAuthContext } from "../Context/authContext";
import Loader from "./Loader";
import Header from "./Header";

const RentDetails = () => {
  const [rentDetails, setRentDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sortItem, setSortItem] = useState("");
  const [filterItem,setFilterItem] = useState("")
  const [page, setPage] = useState(1);
  const { authUser, setRentId, rentId } = useAuthContext();

  useEffect(() => {
    const getRentDetails = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://minpro-1.onrender.com/api/v1/rents?page=${page}&limit=${6}&${filterItem}&sort=${sortItem}`,
          {
            headers: {
              Authorization: `Bearer ${authUser.token}`, // Send token in Authorization header
            },
          }
        );
        const data = await response.data;
        setRentDetails(data.data);
      } catch (err) {
        console.log(err.message);
      } finally {
        setLoading(false);
      }
    };
    getRentDetails();
  }, [authUser.token,filterItem,sortItem,page]);

  const handleSetRentId = (id) => {
    setRentId(id);
    localStorage.setItem("rentId", rentId);
  };

  const handlesubmit = async () => {
    const res = await axios.get(
      `https://minpro-1.onrender.com/api/v1/rents/top-5-cheap`,
      {
        headers: {
          Authorization: `Bearer ${authUser.token}`, // Send token in Authorization header
        },
      }
    );
    const data = res.data;
    setRentDetails(data.data);
  };

  return (
    <div className="p-3">
      <Header />
      <div>
        {loading ? (
          <Loader />
        ) : (
          <>
             <div className="flex items-center ">
            {authUser.data.user.role === "buyer" ? (
              ""
            ) : (
              <div className="">
                <Link to="/createProperty">
                  <button className="text-[#fff] bg-[#444] p-1 px-3 mb-2 rounded-lg">
                    + Create Rent
                  </button>
                </Link>
              </div>
            )}

          <div className="p-3">
        <select id="sort" onChange={(e) => setSortItem(e.target.value)} className=" border-2 p-1 px-3 mb-2 rounded-xl border-gray-900  ">
          <option value="">Sort By</option>
          <option value="regularPrice">MinPrice</option>
          <option value="-regularPrice">MaxPrice </option>
          <option value="discountPrice">MinDiscount</option>
          <option value="-discountPrice">MaxDiscount </option>
        </select>
            </div>

            <div className="p-3">
        <select id="filter" onChange={(e) => setFilterItem(e.target.value)} className=" border-2 p-1 px-3 mb-2 rounded-xl border-gray-900  ">
          <option value="">Filters</option>
          <option value="regularPrice[gte]=1000">{`Price >= $1000`}</option>
          <option value="regularPrice[lte]=1000">{`Price <= $1000`} </option>
          <option value="regularPrice[gte]=2000">{`Price >= $2000`}</option>
          <option value="regularPrice[gte]=2500">{`Price >= $2500`} </option>
        </select>
            </div>
                <button
                className=" px-3 mb-2 ml-3 p-1 border-2 border-black rounded-xl"
                onClick={handlesubmit}
              >
                Top-5-cheap
              </button>
            </div>
            <ul className="grid grid-cols-3 place-items-center">
              {rentDetails.map((Item) => (
                <li key={Item.id}>
                  <div className="shadow-2xl w-80 h-auto">
                    <div className="image">
                      <img
                        src={`https://minpro-1.onrender.com/uploads/${Item.photo}`}
                        alt={`${Item.photo}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-5">
                      <div className="flex flex-col gap-2">
                        <h3 className="font-bold">{Item.name}</h3>
                        <h3 className="flex gap-2 items-center">
                          <span>
                            <FiMapPin />
                          </span>
                          {Item.address}
                        </h3>
                        <h3 className="italic">{Item.description}</h3>
                      </div>
                      <div className="grid grid-cols-2 mt-3">
                        <p className="flex gap-2 items-center">
                          <span>
                            <FaBed />
                          </span>
                          Bedroom
                        </p>
                        <p className="flex gap-2 items-center">
                          <span>
                            <MdOutlineBathroom />
                          </span>
                          Bathroom
                        </p>
                        <p className="flex gap-2 items-center">
                          <span>
                            <FaRegHospital />
                          </span>
                          Hospitals
                        </p>
                        <p className="flex gap-2 items-center">
                          <span>
                            <FaBookReader />
                          </span>
                          College
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-16 bg-[#f2eeee] w-80 h-auto p-5">
                      <div className="flex flex-col gap-2">
                        <p>$ {Item.regularPrice}/Month</p>
                        <p>{Item.discountPrice}% Discount</p>
                      </div>
                      <Link to="/OneRentDetail">
                        <button
                          onClick={() => handleSetRentId(Item.id)}
                          className="bg-[#444] rounded-full p-3 px-5 text-[#fff] flex items-center gap-2 justify-center"
                        >
                          Details
                          <span>
                            <FaLongArrowAltRight />
                          </span>
                        </button>
                      </Link>
                    </div>
                  </div>
                </li>
              ))}
              ;
            </ul>
          </>
        )}
            <div className="flex items-center justify-between p-8 px-24 ">
          <div
            id="left"
            className="text-[#fff] bg-[#444] text-xl cursor-pointer p-2 px-5"
            onClick={() => setPage(page - 1)}
          >
            <FaArrowLeftLong />
          </div>
          {rentDetails.length < 6 ? (
            ""
          ) : (
            <div
              id="right"
              className="text-[#fff] bg-[#444] text-xl cursor-pointer p-2 px-5"
              onClick={() => setPage(page + 1)}
            >
              <FaArrowRightLong />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RentDetails;
