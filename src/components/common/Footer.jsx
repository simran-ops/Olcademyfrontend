import React, { useState } from 'react';
import { FaInstagram, FaFacebookF, FaYoutube, FaLinkedinIn } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <footer className="w-full bg-[#E8E4DB]">

      {/* ── SINGLE DASHED BOX — contains everything except bottom bar ── */}
      <div className="flex justify-center px-6 pt-10 pb-6">
        <div className="w-full max-w-[996px] px-10 py-10">

          {/* Newsletter heading + form — centered */}
          <div className="flex flex-col items-center text-center mb-8">
            <h2
              className="text-3xl font-bold text-[#1C1C1C] mb-3"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              The Vesarii Inner Circle
            </h2>
            <p className="text-sm text-[#555] mb-7 leading-relaxed max-w-[480px]">
              Private access to rare editions, secret previews, and Parisian inspirations.
            </p>

            <form onSubmit={handleSubmit} className="flex w-full max-w-[600px] mb-3">
              <input
                type="email"
                placeholder="EMAIL"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-4 py-3 text-xs tracking-widest text-[#999] bg-white outline-none border border-r-0 border-[#ccc] placeholder-[#bbb] uppercase"
                style={{ fontFamily: 'Manrope, sans-serif' }}
              />
              <button
                type="submit"
                className="bg-[#1C1C1C] text-white text-xs font-bold uppercase tracking-widest px-6 py-3 whitespace-nowrap hover:bg-[#333] transition-colors"
                style={{ fontFamily: 'Manrope, sans-serif' }}
              >
                JOIN THE CIRCLE
              </button>
            </form>

            <p className="text-[11px] text-[#999] tracking-wide">
              By joining, you'll receive updates on limited editions and private events.
            </p>
          </div>

          {/* Logo */}
          <div className="mb-5">
            <img
              src="/images/logo.png"
              alt="Vesarii"
              className="h-8 object-contain"
              onError={(e) => { e.target.style.display = 'none'; }}
            />
          </div>

          {/* Address + Contact + Socials LEFT | Nav links RIGHT */}
          <div className="flex flex-col md:flex-row justify-between items-start gap-8">

            {/* LEFT */}
            <div className="flex flex-col">
              <p
                className="text-sm font-bold text-[#1C1C1C] mb-1"
                style={{ fontFamily: 'Playfair Display, serif', letterSpacing: '0.03em' }}
              >
                Address:
              </p>
              <p className="text-sm text-[#1C1C1C] mb-5 tracking-wide">
                Vesarii Fragrance House, Paris, France
              </p>

              <p
                className="text-sm font-bold text-[#1C1C1C] mb-1"
                style={{ fontFamily: 'Playfair Display, serif', letterSpacing: '0.03em' }}
              >
                Contact:
              </p>
              <p className="text-sm text-[#1C1C1C] tracking-wide">+33 1 23 45 67</p>
              <p className="text-sm text-[#1C1C1C] mb-6 tracking-wide">contact@vesarii.com</p>

              {/* Social icons */}
              <div className="flex items-center gap-3">
                {[
                  { Icon: FaFacebookF,  label: 'Facebook' },
                  { Icon: FaInstagram,  label: 'Instagram' },
                  { Icon: FaYoutube,    label: 'YouTube' },
                  { Icon: FaLinkedinIn, label: 'LinkedIn' },
                  { Icon: FaXTwitter,   label: 'X / Twitter' },
                ].map(({ Icon, label }) => (
                  <button
                    key={label}
                    aria-label={label}
                    className="w-8 h-8 rounded-full border border-[#1C1C1C] flex items-center justify-center text-[#1C1C1C] hover:bg-[#1C1C1C] hover:text-white transition-all duration-200 flex-shrink-0"
                  >
                    <Icon size={12} />
                  </button>
                ))}
              </div>
            </div>

            {/* RIGHT — Two nav columns */}
            <div className="flex gap-16 md:gap-20">
              <div className="flex flex-col gap-[12px]">
                {['Shop', 'About', 'Journal', 'Contact', 'Careers'].map((link) => (
                  <a
                    key={link}
                    href={`/${link.toLowerCase()}`}
                    className="text-sm text-[#1C1C1C] hover:opacity-60 transition-opacity tracking-wide"
                    style={{ fontFamily: 'Manrope, sans-serif' }}
                  >
                    {link}
                  </a>
                ))}
              </div>
              <div className="flex flex-col gap-[12px]">
                {['Press', 'Stockists', 'Gift cards', 'Sustainability', 'Shipping'].map((link) => (
                  <a
                    key={link}
                    href={`/${link.toLowerCase().replace(' ', '-')}`}
                    className="text-sm text-[#1C1C1C] hover:opacity-60 transition-opacity tracking-wide"
                    style={{ fontFamily: 'Manrope, sans-serif' }}
                  >
                    {link}
                  </a>
                ))}
              </div>
            </div>

          </div>
        </div>{/* end dashed box */}
      </div>

      {/* ── BOTTOM BAR — outside the dashed box ── */}
      <div className="px-8 md:px-16 lg:px-24">
        <hr className="border-t border-[#1C1C1C]/20" />
        <div className="flex flex-col md:flex-row justify-between items-center py-4 gap-3">
          <p
            className="text-xs text-[#1C1C1C] tracking-wide"
            style={{ fontFamily: 'Manrope, sans-serif' }}
          >
            © 2024 Vesarii. All rights reserved.
          </p>
          <div className="flex gap-6 items-center">
            {['Privacy policy', 'Terms of service', 'Cookies settings'].map((label) => (
              <a
                key={label}
                href="#"
                className="text-xs text-[#1C1C1C] hover:opacity-60 transition-opacity whitespace-nowrap tracking-wide"
                style={{ fontFamily: 'Manrope, sans-serif' }}
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>

    </footer>
  );
};

export default Footer;
