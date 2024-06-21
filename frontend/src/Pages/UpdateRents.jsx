// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import Header from "./Header";
import { useAuthContext } from "../Context/authContext";
import axios from "axios";
import { useNavigate } from "react-router";

const UpdateRents = () => {
  const { authUser, updateId } = useAuthContext();
  const [createInput, setCreateInput] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getProperty = async () => {
      try {
        const response = await axios.get(
          `https://minpro-1.onrender.com/api/v1/rents/${updateId}`,
          {
            headers: {
              Authorization: `Bearer ${authUser.token}`,
            },
          }
        );
        const data = response.data.data;
        setCreateInput(data);
      } catch (err) {
        console.log(err.message);
      }
    };
    getProperty();
  }, [updateId, authUser]);

  const updateRentProperty = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.patch(
        `https://minpro-1.onrender.com/api/v1/rents/${updateId}`,
        createInput,
        {
          headers: {
            Authorization: `Bearer ${authUser.token}`,
          },
        }
      );
    } catch (err) {
      console.log(err.message);
    } finally {
      setLoading(false);
      navigate("/");
    }
  };

  return (
    <div>
      <Header className="margin" />
      <div className="h-screen  bg-[#e2dede]">
        <h1 className="text-center text-4xl font-extrabold text-[black] py-3">
          Update RentProperty
        </h1>
        <form
          className="p-12 px-96 flex gap-8 justify-center"
          onSubmit={updateRentProperty}
        >
          <div className="" name="sideform">
            <div className="mb-4" name="username">
              <h3 className="text-lg">Name</h3>
              <input
                type="text"
                className="border-2 border-black p-2 rounded w-96"
                value={createInput.name}
                onChange={(e) =>
                  setCreateInput({
                    ...createInput,
                    name: e.target.value,
                  })
                }
                placeholder="Name of the Property"
              />
            </div>
            <div className="mb-4" name="description">
              <h3 className="text-lg ">Description</h3>
              <input
                type="text"
                className="border-2 border-black p-2 rounded w-96"
                value={createInput.description}
                onChange={(e) =>
                  setCreateInput({
                    ...createInput,
                    description: e.target.value,
                  })
                }
                placeholder="Description"
              />
            </div>
            <div className="mb-4" name="Address">
              <h3 className="text-lg ">Address</h3>
              <input
                type="text"
                className="border-2 border-black p-2 rounded w-96"
                value={createInput.address}
                onChange={(e) =>
                  setCreateInput({ ...createInput, address: e.target.value })
                }
                placeholder="Address"
              />
            </div>
            <div className="flex gap-9" name="Prices">
              <div className="flex items-center gap-3">
                <h3 className="text-lg ">
                  Regular <br /> Price
                </h3>
                <input
                  type="text"
                  className="border-2 border-black p-2 rounded w-20"
                  value={createInput.regularPrice}
                  onChange={(e) =>
                    setCreateInput({
                      ...createInput,
                      regularPrice: e.target.value,
                    })
                  }
                />
              </div>
              <div className="flex items-center gap-3">
                <h3 className="text-lg ">
                  Discount <br /> Price
                </h3>
                <input
                  type="text"
                  className="border-2 border-black p-2 rounded w-20"
                  value={createInput.discountPrice}
                  onChange={(e) =>
                    setCreateInput({
                      ...createInput,
                      discountPrice: e.target.value,
                    })
                  }
                />
              </div>
            </div>
            <div className="flex flex-row gap-3 mt-3 " name="roomDetails">
              <div className="flex flex-col">
                <div className="flex items-center justify-center gap-2 mb-5">
                  <h3 className="text-lg mr-2 ">Bedrooms</h3>
                  <input
                    type="number"
                    value={createInput.bedrooms}
                    onChange={(e) =>
                      setCreateInput({
                        ...createInput,
                        bedrooms: e.target.value,
                      })
                    }
                    className="border-2 border-black p-2 rounded w-20"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg">Bathrooms</h3>
                  <input
                    type="number"
                    value={createInput.bathrooms}
                    onChange={(e) =>
                      setCreateInput({
                        ...createInput,
                        bathrooms: e.target.value,
                      })
                    }
                    className="border-2 border-black p-2 rounded w-20"
                  />
                </div>
              </div>
              <div className="flex flex-col ">
                <div className="flex items-center justify-center gap-2 mb-5">
                  <h3 className="text-lg ">Hospitals</h3>
                  <input
                    type="number"
                    value={createInput.hospitals}
                    onChange={(e) =>
                      setCreateInput({
                        ...createInput,
                        hospitals: e.target.value,
                      })
                    }
                    className="border-2 border-black p-2 rounded w-20"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg mr-3 ">College</h3>
                  <input
                    type="number"
                    value={createInput.colleges}
                    onChange={(e) =>
                      setCreateInput({
                        ...createInput,
                        colleges: e.target.value,
                      })
                    }
                    className="border-2 border-black p-2 rounded w-20"
                  />
                </div>
              </div>
            </div>
            <button className="w-96 bg-[#444] text-[#fff] rounded-md mt-6 p-3 font-bold ">
              {loading ? "Updating..." : "Update Rents"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateRents;
