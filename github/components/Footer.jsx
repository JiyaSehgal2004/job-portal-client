import React from "react";
import { FaFacebook,FaLinkedin,FaSquareXTwitter  } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-blue/60 p-4 md:p-6 shadow-lg">
      <div className="mb-4 md:mb-0">
        <h2 className="font-semibold text-lg text-white">GetHired @2023</h2>
        <p className="text-sm text-white">
          We are a leading job portal, connecting talented individuals with the
          best job opportunities around the world.
        </p>
      </div>
      <div className="mb-4 md:mb-0">
        <h2 className="font-semibold text-lg text-white">Contact Us</h2>
        <p className="text-sm text-white">
          Email: gethired@jobportal.com
          <br />
          Phone: +91 999-9999-999
        </p>
      </div>
      <div className="flex gap-4">
        <Link className="text-white hover:text-white-600" href="#">
          <FaFacebook  className="h-6 w-6" />
        </Link>
        <Link className="text-white hover:text-white-400" href="#">
          <FaSquareXTwitter className="h-6 w-6" />
        </Link>
        <Link className="text-white hover:text-white-700" href="#">
          <FaLinkedin className="h-6 w-6" />
        </Link>
      </div>
    </div>
  );
};

export default Footer;
