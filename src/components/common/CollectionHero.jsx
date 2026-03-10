import React from 'react';
import { motion } from 'framer-motion';
import Button from '../ui/Button';
import ProductService from '../../services/productService';
import { fadeIn } from '../../variants';

const CollectionHero = ({ banner, fallbackImage, onBannerClick }) => {
    if (!banner) return null;

    const handleClick = () => {
        if (onBannerClick) {
            onBannerClick(banner);
        }
        if (banner.buttonLink) {
            window.location.href = banner.buttonLink;
        }
    };

    const bannerImage = banner.backgroundImage
        ? ProductService.constructBannerURL(banner.backgroundImage)
        : fallbackImage;

    return (
        <motion.section
            variants={fadeIn("up", 0.2)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="relative overflow-hidden w-full h-[250px] sm:h-[320px] lg:h-[420px]"
        >
            {/* Immersive Background Image */}
            <motion.div
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="absolute inset-0 w-full h-full"
            >
                <img
                    src={bannerImage}
                    alt={banner.altText || banner.title}
                    className="w-full h-full object-cover object-center"
                    onError={(e) => {
                        console.warn('Hero banner failed to load:', e.target.src);
                        if (fallbackImage && e.target.src !== fallbackImage) {
                            e.target.src = fallbackImage;
                        } else {
                            e.target.src = '/images/baner1.jpeg';
                        }
                    }}
                />
                {/* Dynamic Overlay for better text readability and depth */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
                <div className="absolute inset-0 bg-black/10"></div>
            </motion.div>

            {/* Content Container */}
            <div className="relative h-full max-w-[1555px] mx-auto px-6 sm:px-10 lg:px-16 flex items-center">
                <div className="max-w-3xl">
                    {/* Subtitle / Category Label */}
                    {banner.subtitle && (
                        <motion.span
                            variants={fadeIn("right", 0.3)}
                            className="inline-block text-[#f6d110] font-manrope text-xs sm:text-sm uppercase tracking-[0.3em] mb-4"
                        >
                            {banner.subtitle}
                        </motion.span>
                    )}

                    {/* Headline */}
                    <motion.h1
                        variants={fadeIn("right", 0.4)}
                        className="text-white text-2xl sm:text-4xl lg:text-5xl font-playfair leading-[1.2] mb-4"
                        style={{
                            fontFamily: 'Playfair Display, serif',
                            color: banner.textColor || '#FFFFFF'
                        }}
                    >
                        {banner.title}
                        {banner.titleHighlight && (
                            <span className="block mt-2 italic" style={{ color: banner.highlightColor || '#f6d110' }}>
                                {banner.titleHighlight}
                            </span>
                        )}
                    </motion.h1>

                    {/* Description */}
                    {banner.description && (
                        <motion.p
                            variants={fadeIn("right", 0.5)}
                            className="text-gray-200 text-xs sm:text-sm lg:text-base font-manrope max-w-xl mb-6 leading-relaxed opacity-90"
                            style={{ fontFamily: 'Manrope, sans-serif' }}
                        >
                            {banner.description}
                        </motion.p>
                    )}

                    {/* CTA Button */}
                    {banner.buttonText && (
                        <motion.div variants={fadeIn("right", 0.6)}>
                            <Button
                                onClick={handleClick}
                                className="bg-gradient-to-r from-[#79300f] to-[#5a2408] hover:from-[#5a2408] hover:to-[#79300f] text-white px-7 sm:px-9 py-2.5 sm:py-3 text-xs sm:text-sm font-bold uppercase tracking-widest transition-all duration-500 rounded-none border-none shadow-xl hover:shadow-2xl"
                            >
                                <span className="relative z-10">{banner.buttonText}</span>
                            </Button>
                        </motion.div>
                    )}
                </div>
            </div>

            {/* Aesthetic Accents */}
            <div className="absolute bottom-0 right-0 p-8 hidden lg:block">
                <div className="w-24 h-[1px] bg-white/30 mb-2"></div>
                <div className="w-16 h-[1px] bg-white/20"></div>
            </div>
        </motion.section>
    );
};

export default CollectionHero;
