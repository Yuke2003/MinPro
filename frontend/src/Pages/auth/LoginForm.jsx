// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import Header from "../Header";
import { useAuthContext } from "../../Context/authContext";
import axios from "axios";
import { Link } from "react-router-dom";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setAuthUser, setLoading } = useAuthContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/auth/login",
        { email,password }
      );
      const data = response.data;
      console.log(data);
      console.log(data.token);
      localStorage.setItem("user-info", JSON.stringify(data));
      setAuthUser(data);
      setEmail("")
      setPassword("")
      if (data.error) {
        throw new Error(data.error);
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  

  return (
    <div>
      <Header />
      <div className=" bg-[#e2dede] h-screen">
        <form
          className="flex flex-col items-center justify-center p-16"
          onSubmit={handleSubmit}
        >
          <div className="mb-4" name="Email">
            <h3 className="text-lg ">Email</h3>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border-2 border-black p-2 rounded w-96"
              placeholder="Email"
            />
          </div>
          <div className="mb-4" name="password">
            <h3 className="text-lg ">Password</h3>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border-2 border-black p-2 rounded w-96"
              placeholder="password"
            />
          </div>
          <Link to="/signup"><h3 className="hover:text-blue-500 underline mt-2">Dont have an account?</h3></Link>
         <button className="text-center w-96 text-[#f7f7f7] p-2 mt-4 rounded-full bg-[#444]">
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
