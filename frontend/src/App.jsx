import HomePage from "./Pages/HomePage";
import { Routes, Route, Navigate } from "react-router";
import LoginForm from "./Pages/auth/LoginForm";
import SignUpForm from "./Pages/auth/Signup";
import CreateRents from "./Pages/CreateRents";
import { useAuthContext } from "./Context/authContext";
import OneRentDetail from "./Pages/OneRentDetail";
import ProfilePage from "./Pages/ProfilePage";
import SellerProperty from "./Pages/SellerProperty";
import RentDetails from "./Pages/RentDetails";
import UpdateRents from "./Pages/UpdateRents";

function App() {
  const { authUser } = useAuthContext();
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={authUser ? <HomePage /> : <Navigate to="/login" />}
        />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/createProperty" element={<CreateRents />} />
        <Route path="/OneRentDetail" element={<OneRentDetail />} />
        <Route path="/RentDetail" element={<RentDetails />} />
        <Route path="/ProfilePage" element={<ProfilePage />} />
        <Route path="/MyProperty" element={<SellerProperty />} />
        <Route path="/UpdateProperty" element={<UpdateRents />} />
      </Routes>
    </>
  );
}

export default App;

