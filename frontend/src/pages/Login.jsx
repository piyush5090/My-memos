import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { Link, useNavigate } from "react-router-dom";
import PasswordInput from "../components/PasswordInput";
import { validateEmail } from "../utils/helper";
import axiosInstance from "../utils/axiosInstance";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError("Please Enter a Valid Email");
      return;
    }
    if (!password) {
      setError("Please Enter Password");
      return;
    }
    setError("");
    setLoading(true); 

    try {
      const response = await axiosInstance.post("/login", {
        email: email,
        password: password,
      });
      console.log(email + " " + password);

      if (response.data && response.data.accessToken) {
        localStorage.setItem("token", response.data.accessToken);
        navigate("/dashboard");
      }
    } catch (error) {
      
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("An unexpected error occurred. Please try again.");
        console.log(error);
      }
    } finally {
      setLoading(false); 
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-blue-50 to-blue-100">
        <div className="w-full max-w-md border border-gray-300 rounded-2xl bg-white shadow-lg px-8 py-10">
          <form onSubmit={handleLogin}>
            <h4 className="text-3xl font-bold text-center mb-6 text-gray-800">Log in</h4>
            <input
              type="text"
              placeholder="Enter Email"
              className="input-box w-full border border-gray-300 rounded-md p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <PasswordInput
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
            <button
              type="submit"
              className={`btn-primary w-full bg-blue-600 text-white rounded-md py-3 mt-6 transition duration-200 ${
                loading ? "cursor-not-allowed opacity-50" : "hover:bg-blue-700"
              }`}
              disabled={loading} 
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin h-5 w-5 mr-2 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 100 8v4a8 8 0 01-8-8z"
                    ></path>
                  </svg>
                  Loading...
                </span>
              ) : (
                "Take to Space"
              )}
            </button>
            <p className="text-sm text-center mt-4 text-gray-600">
              Not Registered?{" "}
              <Link to="/Signup" className="font-medium text-blue-600 underline">
                Create an Account
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
