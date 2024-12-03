import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white py-12">
      <div className="container mx-auto px-4 md:ml-[310px]">
        {/* Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 text-center sm:text-left">
          {/* Contact Section */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li>
                <a href="mailto:contact@mymemos.com" className="hover:underline text-gray-400">
                  Email: businessmymemos@gmail.com
                </a>
              </li>
              <li>
                <a href="tel:+917648950874" className="hover:underline text-gray-400">
                  Phone: +91 764895874
                </a>
              </li>
              <li>
                <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 text-gray-400">
                  Facebook
                </a>
              </li>
            </ul>
          </div>

          {/* About Section */}
          <div>
            <h3 className="text-xl font-semibold mb-4">About Us</h3>
            <p className="text-gray-400 text-sm">
              My Memos is your go-to platform for organizing your life. Join us in simplifying your tasks and maximizing your productivity.
            </p>
          </div>

          {/* Social Links Section */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
            <div className="flex justify-center sm:justify-start space-x-6">
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-500">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-300">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-700">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-10 text-center border-t border-gray-700 pt-6">
          <p className="text-sm text-gray-400 mb-2">
            &copy; {new Date().getFullYear()} My Memos. All rights reserved.
          </p>
          <p className="text-sm text-gray-400">
            Designed with ❤️ by{' '}
            <a
              href="https://your-portfolio-link.com"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-white"
            >
              PNP tech.
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
