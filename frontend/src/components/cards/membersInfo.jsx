import React, { useEffect, useState } from "react";
import { FaLinkedin, FaInstagram, FaEnvelope, FaSpotify } from "react-icons/fa"; 
import nilesh from "../../assets/nilesh.jpg";
import piyush from "../../assets/piyush.jpg";
import parul from "../../assets/parul.jpg";


const Team = () => {
  const [visible, setVisible] = useState([]);
  const members = [
    {
      name: "Piyush Govindani",
      role: "Backend Developer",
      description: "Piyush builds the backend, ensuring smooth server-side processes and efficient API integrations.",
      photo: piyush,
      socialLinks: {
        linkedin: "https://www.linkedin.com/in/piyush-govindani/",
        instagram: "https://www.instagram.com/_piyush_govindani/?__pwa=1#",
        email: "govindanipiyush@gmail.com",
      },
    },
    {
      name: "Parul Sharma",
      role: "Frontend Developer",
      description: "Parul crafts the frontend with expertise in React, HTML, and CSS to deliver a functional and visually appealing experience.",
      photo: parul,
      socialLinks: {
        linkedin: "https://www.linkedin.com/in/parul-sharma-95a821336/",
        instagram: "https://www.instagram.com/parul_sharma303/?__pwa=1#",
        email: "parul@example.com",
      },
    },
    {
      name: "Nilesh Panchal",
      role: "UI/UX Designer & Music Producer",
      description: "Nilesh brings creative UI/UX designs, combining user-centered design with his unique music production perspective.",
      photo: nilesh,
      socialLinks: {
        linkedin: "https://www.linkedin.com/in/nileshpanchal",
        instagram: "https://www.instagram.com/_nilesh_panchal__/?__pwa=1#",
        spotify: "https://l.instagram.com/?u=https%3A%2F%2Fopen.spotify.com%2Fartist%2F53jLbrhSb6wHQlnjrXVL2I%3Fsi%3DmTS4dBdBRYium2KvE_4k1Q%26utm_source%3Dcopy-link%26fbclid%3DPAZXh0bgNhZW0CMTEAAabEucjyjj47C43Ai8Pa-2D08e1sX96T1uyksLUhdMoxCSA8TARSJfqqWwE_aem_e54FoIuJSNs4GP_U5TqBVg&e=AT368RHF7AcxOAglaNMu1Gg_Y2_f9cx7I6q5ITBOtRILY9hNTbM7vX6lh9AUl0lkOYWArbNlpsHH0UbYmUjh_HjyA1FwCVdj_reJeW1EsH_ABXHyXaDoJrM",
        email: "nilesh@example.com",
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
      <div className="grid grid-cols-1 mt-10 md:mt-32 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {members.map((member, index) => (
          <div
            key={index}
            id={`team-card-${index}`}
            className={`team-card bg-white shadow-lg rounded-lg mt-20 md:mt-4 overflow-visible text-center transform transition-all duration-700 hover:scale-105 h-[310px] ${
              visible.includes(`team-card-${index}`)
                ? "opacity-100 translate-y-0 scale-100 blur-0"
                : "opacity-0 translate-y-12 scale-95 blur-sm"
            }`}
          >
            {/* Image Section */}
            <div className="relative">
              <div className="absolute inset-x-0 -top-24">
                <img
                  src={member.photo}
                  alt={`${member.name}'s photo`}
                  className="w-40 h-40 mx-auto rounded-full object-cover border-4 border-white shadow-lg transform transition-transform duration-300 hover:scale-110 hover:shadow-2xl"
                />
              </div>
            </div>
            {/* Card Content */}
            <div className="pt-24 px-6">
              <h2 className="text-2xl font-semibold">{member.name}</h2>
              <p className="text-gray-600">{member.role}</p>
              <p className="text-gray-700 mt-2">{member.description}</p>

              {/* Social Links Section */}
              <div className="mt-4 flex justify-center space-x-4">
                {member.socialLinks.linkedin && (
                  <a
                    href={member.socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-700 text-xl transform transition duration-300 hover:scale-110"
                  >
                    <FaLinkedin />
                  </a>
                )}
                {member.socialLinks.instagram && (
                  <a
                    href={member.socialLinks.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-pink-500 text-xl transform transition duration-300 hover:scale-110"
                  >
                    <FaInstagram />
                  </a>
                )}
                {member.socialLinks.spotify && (
                  <a
                    href={member.socialLinks.spotify}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-500 text-xl transform transition duration-300 hover:scale-110"
                  >
                    <FaSpotify />
                  </a>
                )}
                {member.socialLinks.email && (
                  <a
                    href={`mailto:${member.socialLinks.email}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 text-xl transform transition duration-300 hover:scale-110"
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
