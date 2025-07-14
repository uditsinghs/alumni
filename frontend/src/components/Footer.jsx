import React from "react";
import { Facebook, Twitter, Instagram, Linkedin, Youtube } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="text-2xl font-bold text-blue-600">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGBZhQbrcMQV_GBExnXGmsYPZAJujaCY6Seg&s"
            alt="logo"
            className="w-20"
          />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">
            Future University
          </h2>
          <p className="text-sm">
            Empowering students to build the future through knowledge and
            innovation.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-2">Quick Links</h3>
          <ul className="space-y-1 text-sm">
            <li>
              <a href="/" className="hover:underline">
                Home
              </a>
            </li>
            <li>
              <a href="/alumni-list" className="hover:underline">
                Alumni
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:underline">
                Contact Us : 090123 13333 <br />
                E-mail     : info@futureuniversity.in

              </a>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-2">Follow Us</h3>
          <div className="flex gap-4">
            <a href="https://www.facebook.com/futureuniversitybly/" className="hover:text-white">
              <Facebook size={20} />
            </a>
            <a href="https://www.youtube.com/@futureuniversitybareilly" className="hover:text-white">
              <Youtube size={20} />
            </a>
            <a href="https://www.instagram.com/futureuniversitybly" className="hover:text-white">
              <Instagram size={20} />
            </a>
            <a href="https://www.linkedin.com/company/future-university-bareilly/" className="hover:text-white">
              <Linkedin size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Text */}
      <div className="text-center text-sm text-gray-500 mt-8">
        © {new Date().getFullYear()} Future University. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
