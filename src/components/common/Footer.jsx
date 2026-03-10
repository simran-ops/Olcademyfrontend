import React from 'react';
import { FaInstagram, FaFacebookF, FaYoutube, FaLinkedinIn } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-[#1C160C] to-[#292218] px-6 md:px-16 lg:px-24 py-10 font-[Manrope] font-semibold text-sm md:text-base leading-[160%] tracking-wider">
      {/* Top Section */}
      <div className="flex flex-col md:flex-row justify-between mb-4 space-y-8 md:space-y-0">
        {/* Address & Contact */}
        <div className="space-y-2">
          <p className="mb-1 bg-gradient-to-r from-[#CDAF6E] via-[#E4C77F] to-[#F5E6A1] bg-clip-text text-transparent text-lg md:text-lg tracking-wider">
            Address
          </p>
          <p className="text-xs opacity-80 mb-3 bg-gradient-to-r from-[#CDAF6E] via-[#E4C77F] to-[#F5E6A1] bg-clip-text text-transparent md:text-[10px] lg:text-sm">
            Vesarii Fragrance House, Paris, France
          </p>

          <div className="mt-6">
            <p className="mb-1 bg-gradient-to-r from-[#CDAF6E] via-[#E4C77F] to-[#F5E6A1] bg-clip-text text-transparent text-lg md:text-lg">
              Contact
            </p>
            <p className="text-sm md:text-sm opacity-80 cursor-pointer bg-gradient-to-r from-[#CDAF6E] via-[#E4C77F] to-[#F5E6A1] bg-clip-text text-transparent tracking-wide">
              +33 1 23 45 67
            </p>
            <p className="text-sm md:text-sm opacity-80 cursor-pointer bg-gradient-to-r from-[#CDAF6E] via-[#E4C77F] to-[#F5E6A1] bg-clip-text text-transparent tracking-wide">
              contact@vesarii.com
            </p>
          </div>
        </div>

        {/* Links */}
        <div className="grid grid-cols-2 gap-10 text-xs md:text-[10px] lg:text-sm transform -translate-x-0 lg:-translate-x-0">
          <div className="space-y-3">
            <p className="cursor-pointer bg-gradient-to-r from-[#CDAF6E] via-[#E4C77F] to-[#F5E6A1] bg-clip-text text-transparent tracking-wide">
              Shop
            </p>
            <p className="cursor-pointer bg-gradient-to-r from-[#CDAF6E] via-[#E4C77F] to-[#F5E6A1] bg-clip-text text-transparent tracking-wide">
              About
            </p>
            <p className="cursor-pointer bg-gradient-to-r from-[#CDAF6E] via-[#E4C77F] to-[#F5E6A1] bg-clip-text text-transparent tracking-wide">
              Journal
            </p>
            <p className="cursor-pointer bg-gradient-to-r from-[#CDAF6E] via-[#E4C77F] to-[#F5E6A1] bg-clip-text text-transparent tracking-wide">
              Contact
            </p>
            <p className="cursor-pointer bg-gradient-to-r from-[#CDAF6E] via-[#E4C77F] to-[#F5E6A1] bg-clip-text text-transparent tracking-wide">
              Careers
            </p>
          </div>
          <div className="space-y-3">
            <p className="cursor-pointer bg-gradient-to-r from-[#CDAF6E] via-[#E4C77F] to-[#F5E6A1] bg-clip-text text-transparent tracking-wide">
              Press
            </p>
            <p className="cursor-pointer bg-gradient-to-r from-[#CDAF6E] via-[#E4C77F] to-[#F5E6A1] bg-clip-text text-transparent tracking-wide">
              Stockists
            </p>
            <p className="cursor-pointer bg-gradient-to-r from-[#CDAF6E] via-[#E4C77F] to-[#F5E6A1] bg-clip-text text-transparent tracking-wide">
              Gift cards
            </p>
            <p className="cursor-pointer bg-gradient-to-r from-[#CDAF6E] via-[#E4C77F] to-[#F5E6A1] bg-clip-text text-transparent tracking-wide">
              Sustainability
            </p>
            <p className="cursor-pointer bg-gradient-to-r from-[#CDAF6E] via-[#E4C77F] to-[#F5E6A1] bg-clip-text text-transparent tracking-wide">
              Shipping
            </p>
          </div>
        </div>
      </div>

      {/* Social Icons */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 border border-[#EFDB94] rounded-full flex items-center justify-center cursor-pointer hover:bg-[#CDAF6E]/10 transition-colors">
          <FaFacebookF className="text-sm text-[#CDAF6E]" />
        </div>
        <div className="w-8 h-8 border border-[#EFDB94] rounded-full flex items-center justify-center cursor-pointer hover:bg-[#CDAF6E]/10 transition-colors">
          <FaInstagram className="text-sm text-[#CDAF6E]" />
        </div>
        <div className="w-8 h-8 border border-[#EFDB94] rounded-full flex items-center justify-center cursor-pointer hover:bg-[#CDAF6E]/10 transition-colors">
          <FaXTwitter className="text-sm text-[#CDAF6E]" />
        </div>
        <div className="w-8 h-8 border border-[#EFDB94] rounded-full flex items-center justify-center cursor-pointer hover:bg-[#CDAF6E]/10 transition-colors">
          <FaLinkedinIn className="text-sm text-[#CDAF6E]" />
        </div>
        <div className="w-8 h-8 border border-[#EFDB94] rounded-full flex items-center justify-center cursor-pointer hover:bg-[#CDAF6E]/10 transition-colors">
          <FaYoutube className="text-sm text-[#CDAF6E]" />
        </div>
      </div>

      {/* Bottom Section */}
      <div className="flex flex-col md:flex-row justify-between items-center border-t border-[#EFDB94]/30 pt-4 text-xs md:text-[10px]">
        <p className="bg-gradient-to-r from-[#CDAF6E] via-[#E4C77F] to-[#F5E6A1] bg-clip-text text-transparent md:text-xs lg:text-sm tracking-wider">
          © 2024 Vesarii. All rights reserved.
        </p>
        <div className="flex md:gap-6 lg:gap-8 gap-4 lg:mt-0 md:mt-0 mt-3">
          <p className="cursor-pointer bg-gradient-to-r from-[#CDAF6E] via-[#E4C77F] to-[#F5E6A1] bg-clip-text text-transparent md:text-xs lg:text-sm tracking-wide">
            Privacy policy
          </p>
          <p className="cursor-pointer bg-gradient-to-r from-[#CDAF6E] via-[#E4C77F] to-[#F5E6A1] bg-clip-text text-transparent md:text-xs lg:text-sm tracking-wide">
            Terms of service
          </p>
          <p className="cursor-pointer bg-gradient-to-r from-[#CDAF6E] via-[#E4C77F] to-[#F5E6A1] bg-clip-text text-transparent md:text-xs lg:text-sm tracking-wide">
            Cookies settings
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;