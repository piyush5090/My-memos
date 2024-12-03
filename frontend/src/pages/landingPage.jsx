import React, { useEffect, useState } from "react";
import chillguy from "../assets/chillguy.png"; 
import { FaStar } from "react-icons/fa"; 
import { Marquee } from "../components/marque"; 
import 'animate.css'; 
import { useNavigate } from "react-router-dom";

const reviews = [
  "My Memos has changed the way I manage my notes! - Alice",
  "Finally, a tool that keeps my team organized! - Bob",
  "A lifesaver for students! - Charlie",
  "Simple, effective, and fun to use! - Dave",
  "I can access my notes anywhere, anytime! - Eve",
];

const LandingPage = () => {
  const [currentReview, setCurrentReview] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentReview((prev) => (prev + 1) % reviews.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleStarted = () => {
    navigate("/login");
  }
  
  return (
    <>
      <div className="flex flex-col md:flex-row min-h-screen bg-gradient-to-b from-white to-blue-100 py-10">
        {/* Level 1: Left Section with Logo and Intro */}
        <div className="flex flex-col justify-center items-start md:w-1/2 p-10 animate__animated animate__fadeInLeft">
          <h2 className="site-name flex flex-row items-center text-2xl sm:text-3xl font-medium py-2 mb-4"> {/* Increased font size */}
            <img
              width="60" // Increased logo size
              height="60" // Increased logo size
              src="https://img.icons8.com/clouds/200/apple-notes.png"
              alt="apple-notes"
            />
            My Memos
          </h2>
          <h1 className="text-6xl font-bold mb-6 animate__animated animate__fadeIn animate__delay-1s">
            Welcome to My Memos
          </h1>
          <p className="text-xl mb-8 animate__animated animate__fadeIn animate__delay-2s">
            Your personal notes app for capturing thoughts, ideas, and tasks.
          </p>
          <p className="text-xl font-semibold mb-4 animate__animated animate__fadeIn animate__delay-3s">
            "Stay organized, stay focused!"
          </p>
          <p className="text-xl font-semibold mb-4 animate__animated animate__fadeIn animate__delay-4s">
            "Collaborate effortlessly with your team!"
          </p>

          {/* Additional Features */}
          <h2 className="text-2xl font-semibold mb-4 animate__animated animate__fadeIn animate__delay-5s">
            Key Features
          </h2>
          <ul className="list-disc list-inside mb-6 animate__animated animate__fadeIn animate__delay-6s">
            <li className="text-xl">Access your notes from anywhere, anytime.</li>
            <li className="text-xl">Seamless collaboration with your team.</li>
            <li className="text-xl">Intuitive design for easy note-taking.</li>
            <li className="text-xl">Customizable categories to organize your thoughts.</li>
            <li className="text-xl">Reminders to help you stay on track.</li>
          </ul>

          <button className="bg-blue-500 text-white py-3 px-5 rounded hover:bg-blue-600 transition duration-300"
            onClick={handleStarted}
          >
            Get Started
          </button>
        </div>

        {/* Level 1: Right Section with Chill Guy Image */}
        <div className="md:w-1/2 flex flex-col justify-center items-center relative animate__animated animate__fadeInRight">
          <img
            src={chillguy}
            alt="Chill Guy"
            className="w-3/4 md:w-2/3 h-auto mb-4 animate__animated animate__zoomIn"
          />
          <div className="text-center animate__animated animate__fadeInRight animate__delay-1s">
            <h3 className="text-2xl font-semibold">Stay Chill, Stay Organized!</h3>
            <p className="text-lg italic">"Your thoughts, organized!"</p>
            {/* Tagline Below Chill Guy */}
            <p className="text-lg mt-4">
              Lowkey is a Chill Guy because he knows all his notes are safe and organized by My Memos.
            </p>
          </div>
        </div>
      </div>

      {/* Level 2: Reviews Section */}
      <div className="w-full mt-10 text-center bg-white py-10 shadow-md animate__animated animate__fadeInUp">
        <h2 className="text-3xl font-semibold mb-4">What Our Users Say</h2>
        <Marquee className="text-lg italic transition-transform duration-700 transform">
          {reviews.map((review, index) => (
            <div key={index} className="flex items-center justify-center px-4">
              <FaStar className="text-yellow-500" />
              <span className="mx-2">{review}</span>
              <FaStar className="text-yellow-500" />
            </div>
          ))}
        </Marquee>
      </div>

      {/* Footer Section */}
      <footer className="absolute bottom-5 text-center w-full">
        <p className="text-sm text-gray-600 animate__animated animate__fadeInUp">
          © 2024 My Memos. All rights reserved.
        </p>
      </footer>
    </>
  );
};

export default LandingPage;
