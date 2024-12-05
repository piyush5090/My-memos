import React, { useEffect, useState } from "react";
import { FaLinkedin, FaInstagram, FaEnvelope } from "react-icons/fa";
import piyush from "../../assets/piyush2.jpg";
import om from "../../assets/om.jpg";

const Team = () => {
  const [visible, setVisible] = useState([]);

  const members = [
    {
      name: "Piyush Govindani",
      role: "Full Stack Developer",
      description:
        "Piyush designed and implemented the robust Groups section, enabling seamless group creation, member management, and group-specific notes functionality. He also enhanced the app's user interface for an intuitive experience.",
      photo: piyush,
      socialLinks: {
        linkedin: "https://www.linkedin.com/in/piyush-govindani/",
        instagram: "https://www.instagram.com/_piyush_govindani/?__pwa=1#",
        email: "govindanipiyush@gmail.com",
      },
    },
    {
      name: "Om Govindani",
      role: "Full Stack Developer",
      description:
        "Om focused on the individual Notes section, building features like creating, editing, and managing notes efficiently. He also contributed to the frontend design, ensuring a smooth and visually appealing interface.",
      photo: om,
      socialLinks: {
        linkedin: "https://www.linkedin.com/in/om-govindani/",
        instagram: "https://www.instagram.com/dichotomyofame/?__pwa=1#",
        email: "omgovindani@gmail.com",
      },
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible((prev) => [...prev, entry.target.id]);
          }
        });
      },
      { threshold: 0.5 }
    );

    const elements = document.querySelectorAll(".team-card");
    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="container mx-auto mt-10 px-4">
      <h1 className="text-4xl font-bold text-center">Meet Our Team</h1>
      <div className="grid grid-cols-1 mt-10 sm:grid-cols-2 gap-10">
        {members.map((member, index) => (
          <div
            key={index}
            id={`team-card-${index}`}
            className={`team-card flex md:h-[450px] h-[750px] flex-col sm:flex-row bg-white shadow-lg rounded-lg border-4 hover:border-blue-500 border-gray-300 overflow-hidden transform transition-all duration-700 hover:scale-105 p-4 relative ${
              visible.includes(`team-card-${index}`)
                ? "opacity-100 translate-y-0 scale-100"
                : "opacity-0 translate-y-12 scale-95"
            }`}
          >
            {/* Animated Border */}
            <div className="absolute inset-0 border-4 border-transparent transition duration-300 rounded-lg" />
            {/* Image Section */}
            <div className="w-full sm:w-1/2 bg-gray-200 overflow-hidden relative group">
              <img
                src={member.photo}
                alt={`${member.name}'s photo`}
                className="h-[300px] md:h-[450px] w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            {/* Description Section */}
            <div className="w-full sm:w-1/2 p-6 flex flex-col justify-between bg-white relative z-10">
              <div>
                <h2 className="text-2xl font-semibold">{member.name}</h2>
                <p className="text-gray-600">{member.role}</p>
                <p className="text-gray-700 mt-4 leading-relaxed">{member.description}</p>
              </div>
              {/* Social Links Section */}
              <div className="mt-6 flex justify-center space-x-6">
                {member.socialLinks.linkedin && (
                  <a
                    href={member.socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-700 text-2xl transform transition duration-300 hover:scale-110"
                  >
                    <FaLinkedin />
                  </a>
                )}
                {member.socialLinks.instagram && (
                  <a
                    href={member.socialLinks.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-pink-500 text-2xl transform transition duration-300 hover:scale-110"
                  >
                    <FaInstagram />
                  </a>
                )}
                {member.socialLinks.email && (
                  <a
                    href={`mailto:${member.socialLinks.email}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 text-2xl transform transition duration-300 hover:scale-110"
                  >
                    <FaEnvelope />
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Team;
  