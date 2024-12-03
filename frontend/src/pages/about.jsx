import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Sidebar from "../components/sidebar"; 
import BottomNavbar from "../components/bottomBar"; 
import Navbar from "../components/Navbar";
import axiosInstance from "../utils/axiosInstance";
import Team from "../components/cards/membersInfo"; 
import Footer from "../components/footer";
import { useNavigate } from "react-router-dom";

const AboutUs = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [feedback, setFeedback] = useState(""); 
  const [isFeedbackSubmitted, setIsFeedbackSubmitted] = useState(false); 
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false); 

  const navigate = useNavigate();

  const fadeIn = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3, delayChildren: 0.2 },
    },
  };

  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/getUser");
      if (response.data && response.data.user) {
        setUserInfo(response.data.user);
      }
    } catch (error) {
      if (error.response.status === 401) {
        localStorage.clear();
        navigate("/");
      }
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  const handleFeedbackChange = (e) => {
    setFeedback(e.target.value);
  };

  const handleFeedbackSubmit = async () => {
    if (feedback.trim()) {
      setIsLoading(true);
      try {
        const userId = userInfo ? userInfo._id : null; 
        const response = await axiosInstance.post("/submitFeedback", { feedback, userId });
        if (response.data.success) {
          setIsFeedbackSubmitted(true);
          setFeedback(""); 
          setErrorMessage(""); 
        }
        console.log(response);
      } catch (error) {
        console.error("Error submitting feedback", error);
        setErrorMessage("Error submitting feedback. Please try again later.");
        setIsFeedbackSubmitted(false);
      }finally {
        setIsLoading(false); 
      }

    }
  };

  return (
    <div className="relative">
      {/* Top Navbar */}
      <Navbar userInfo={userInfo} showSearchIcon={false} />
      <div className="flex flex-col md:flex-row mt-20">
        {/* Side Navbar */}
        <Sidebar /> 

        {/* Main Content */}
        <motion.div
          className="md:ml-64 w-full"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <div className="container mx-auto px-4 md:px-6 py-10">
            <motion.h1 className="text-4xl md:text-5xl font-bold mb-10 text-gray-800" variants={fadeIn}>
              About Us
            </motion.h1>
            <motion.p className="text-lg md:text-2xl text-gray-700 mb-6 leading-relaxed" variants={fadeIn}>
              Welcome to <strong>My Memos</strong>, your ultimate solution for
              seamless note-taking and collaboration! We make it easier for you
              to organize, share, and manage your notes, anytime and anywhere.
            </motion.p>
            <motion.p className="text-lg md:text-2xl text-gray-700 mb-6 leading-relaxed" variants={fadeIn}>
              Whether you’re a student, a professional, or part of a family,
              <strong> My Memos</strong> has been built to empower you with
              tools to stay organized and productive.
            </motion.p>
            <motion.ul className="list-disc text-lg md:text-2xl text-gray-700 ml-8 mb-6" variants={fadeIn}>
              <li>Students can share and organize study materials.</li>
              <li>Teams can collaborate on projects with shared note-taking.</li>
              <li>Families can plan vacations or events with ease and accessibility.</li>
            </motion.ul>
            <motion.p className="text-lg md:text-2xl text-gray-700 leading-relaxed" variants={fadeIn}>
              Thank you for choosing <strong>My Memos</strong>. Let's make
              organizing a breeze. Happy note-taking!
            </motion.p>

            {/* Our Team Section */}
            <motion.h2
              className="text-3xl md:text-4xl font-bold mt-12 text-gray-800"
              variants={fadeIn}
            >
              Our Team
            </motion.h2>
            <motion.p
              className="text-lg md:text-xl text-gray-700 mb-6 leading-relaxed"
              variants={fadeIn}
            >
              Meet the dedicated team behind the development of My Memos.
              We are passionate about making note-taking seamless and
              collaborative for everyone.
            </motion.p>

            {/* Display the Team Component */}
            <Team /> {/* This renders the team member cards */}

            {/* Feedback Section */}
            <motion.div className="mt-12" variants={fadeIn}>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Give Us Your Feedback</h2>
              <p className="text-lg md:text-xl text-gray-700 mb-6">
                We are constantly improving our product, and your feedback helps us
                make it better. Feel free to share your suggestions, ideas, or anything
                you'd like to see in future updates.
              </p>
              <textarea
                value={feedback}
                onChange={handleFeedbackChange}
                className="w-full h-40 p-4 border border-gray-300 rounded-md mb-4"
                placeholder="Write your feedback or suggestion here..."
              />
              <button
                onClick={handleFeedbackSubmit}
                className={`px-6 py-2 text-white rounded-md ${
                  isLoading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
                }`}
                disabled={isLoading}
              >
                {isLoading ? "Submitting..." : "Submit Feedback"}
              </button>

              {isFeedbackSubmitted && (
                <div>
                <p className="text-green-600 mt-4">Thank you for your feedback!</p>
                <p>You may have recived an email to your registered email id</p>
                </div>
              )}
              {errorMessage && (
                <p className="text-red-600 mt-4">{errorMessage}</p>
              )}
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Navbar */}
      <BottomNavbar />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default AboutUs;
