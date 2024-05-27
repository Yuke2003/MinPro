// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { FiMapPin } from "react-icons/fi";
import { FaBed } from "react-icons/fa6";
import { MdOutlineBathroom } from "react-icons/md";
import { FaRegHospital } from "react-icons/fa";
import { FaBookReader } from "react-icons/fa";
import { FaLongArrowAltRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";
import { useAuthContext } from "../Context/authContext";
// import CreateRents from "./CreateRents";
// import CreateRents from './CreateRents';

const RentDetails = () => {
  const [rentDetails, setRentDetails] = useState([]);
  const { authUser, setRentId, rentId } = useAuthContext();

  useEffect(() => {
    const getRentDetails = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/v1/rents", {
          headers: {
            Authorization: `Bearer ${authUser.token}`, // Send token in Authorization header
          },
        });
        const data = await response.data;
        setRentDetails(data.data);
        console.log(data.data)
      } catch (err) {
        console.log(err.message);
      }
    };
    getRentDetails();
  }, [authUser.token]);

  const handleSetRentId = (id) => {
    setRentId(id);
    localStorage.setItem("rentId", rentId);
  };

  return (
    <div className="p-7">
      <div>
        <div className="p-2 px-4"></div>
        <div>
          <Link to="/createProperty">
              <button className="text-[#fff] bg-[#444] p-1 px-3 mb-2 rounded-lg">
                + Create Rent
              </button>
          </Link>
        </div>

        <ul className="grid grid-cols-3 mt-5 place-items-center">
          {rentDetails.map((Item) => (
            <li key={Item.id}>
              <div className="shadow-2xl w-80 h-auto">
                <div className="image">
                  <img
                    src={`/uploads/${Item.photo}`}
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
                    <p>{Item.regularPrice}</p>
                    <p>{Item.discountPrice} Discount</p>
                  </div>
                  <Link to="/RentDetail">
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
      </div>
    </div>
  );
};

export default RentDetails;
