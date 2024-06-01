// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import Header from "./Header";
import axios from "axios";
import { FiMapPin } from "react-icons/fi";
import { FaBed } from "react-icons/fa6";
import { MdOutlineBathroom } from "react-icons/md";
import { FaRegHospital } from "react-icons/fa";
import { FaBookReader } from "react-icons/fa";
import { useAuthContext } from "../Context/authContext";
import Loader from "./Loader";
const OneRentDetail = () => {
  const [getOneRent, setGetOneRent] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sentmessage, setSentMessage] = useState("");
  const { authUser, rentId } = useAuthContext();

  // Wherever you set the rentId

  useEffect(() => {
    const getOneRentDetails = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://minpro-1.onrender.com/api/v1/rents/${
            rentId || localStorage.getItem("rentId")
          }`,
          {
            headers: {
              Authorization: `Bearer ${authUser.token}`, // Send token in Authorization header
            },
          }
        );
        const data = response.data;
        setGetOneRent(data.data);
        localStorage.setItem("emailUser", data.data.user.email);
      } catch (err) {
        console.log(err.message);
      } finally {
        setLoading(false);
      }
    };
    getOneRentDetails();
  }, [authUser.token, rentId, setGetOneRent]);

   const handleSendEmail = async () => {
    try {
      const res = await axios.post(
        "https://minpro-1.onrender.com/api/v1/emails",
        {
          toEmail: localStorage.getItem("emailUser"),
          fromEmail: "yukeshmeganathan2003@gmail.com",
          sendSubject: "Interested in your property listing",
          sendText:
            "I came across your property listing on Rentify and I am very interested in learning more about the rental opportunity. The location and amenities seem ideal for my needs .I would love to schedule a time to discuss the property further with you. Please let me know if you have any availability in the next few days to chat on the phone or meet in person if possible",
          sendHtml:
            "<p>I came across your property listing on Rentify and I am very interested in learning more about the rental opportunity. The location and amenities seem ideal for my needs. I would love to schedule a time to discuss the property further with you. Please let me know if you have any availability in the next few days to chat on the phone or meet in person if possible</p>",
        },
        {
          headers: {
            Authorization: `Bearer ${authUser.token}`,
          },
        }
      );

      console.log(res.data);
    } catch (err) {
      console.log(err.message);
      setSentMessage("email sent success fully");
    }
  };

  return (
    <div>
      <Header />
      {loading ? <Loader /> :<div name="details" className="bg-[#f2eeee] h-screen">
        <div id="image">
          <img
            className=" w-screen h-96 object-center"
            src={`https://minpro-1.onrender.com/uploads/${getOneRent.photo}`}
            alt=""
          />
        </div>
        <div
          id="details"
          className="flex flex-col justify-center ml-14 px-96 py-4 gap-3"
        >
          <div id="name">
            <h1 className="font-bold">
              {getOneRent.name} - {getOneRent.regularPrice}/Month
            </h1>
          </div>
          <div id="address" className="flex flex-col gap-2">
            <h3 className="flex gap-2 items-center font-thin">
              <span className="text-green-600">
                <FiMapPin />{" "}
              </span>
              {getOneRent.address}
            </h3>
            <div id="price" className="flex gap-3">
              <p className=" bg-red-700 p-2 text-sm rounded-lg px-4 text-white ">
                For Rent
              </p>
              <p className=" bg-green-700 p-2 rounded-lg px-4 text-white">
                {getOneRent.discountPrice}% Discount
              </p>
            </div>
          </div>
          <div id="description">
            <h4 className=" font-light ">
              Description: {getOneRent.description}
            </h4>
          </div>

          <div id="facilities" className="flex gap-2">
            <p className=" text-green-600 flex items-center gap-2 ">
              <span>
                <FaBed />
              </span>{" "}
              Bedroom
            </p>
            <p className=" text-green-600 flex items-center gap-2">
              <span>
                <MdOutlineBathroom />
              </span>{" "}
              Bathroom
            </p>
            <p className=" text-green-600 flex items-center gap-2">
              <span>
                <FaRegHospital />
              </span>{" "}
              Hospitals
            </p>
            <p className=" text-green-600 flex items-center gap-2">
              <span>
                <FaBookReader />
              </span>{" "}
              College
            </p>
          </div>
          <button className=" text-center w-[540px] mt-3 text-[#dfdcdc] bg-[#444] p-2" onClick={handleSendEmail}>
            Contact Seller
          </button>
           { <div className="text-center font-bold mr-16 ">{`"${sentmessage}"`}</div> }
        </div>
      </div>}
    </div>
  );
};

export default OneRentDetail;
