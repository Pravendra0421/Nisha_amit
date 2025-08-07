// src/app/haldi/page.tsx

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

const CalendarIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>;
const MapPinIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>;
const ShirtIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z"></path></svg>;

// --- MOCK DATA (Replace with your actual data) ---
const haldiData = {
  heroImage: "https://res.cloudinary.com/ddguf7pkw/image/upload/v1754549080/Gemini_Generated_Image_4haed74haed74hae_cdvhxh.png",
  date: "Friday, 19th February 2026",
  time: "11:00 AM Onwards",
  venue: "Hotel Ram Raja Palace, Shivpuri",
  venueLink: "https://www.google.com/maps/place/CM6C%2B5GP+Ram+raja+vivah+ghar+shivpuri,+Shivpuri+-+Jhansi+Rd,+Airport,+Shivpuri,+Madhya+Pradesh+473638/data=!4m2!3m1!1s0x3970bb356e46d7fd:0xad1dfaf7a000c6f5?utm_source=mstt_1&entry=gps&coh=192189&g_ep=CAESBzI1LjMxLjIYACCenQoqkAEsOTQyNjc3MjcsOTQyODQ0ODcsOTQyMjMyOTksOTQyMTY0MTMsOTQyODA1NzYsOTQyMTI0OTYsOTQyMDczOTQsOTQyMDc1MDYsOTQyMDg1MDYsOTQyMTc1MjMsOTQyMTg2NTMsOTQyMjk4MzksOTQyNzUxNjgsNDcwODQzOTMsOTQyMTMyMDAsOTQyNTgzMjVCAklO&skid=6cb41489-de18-441d-b772-1ddddca8cf9c",
  dressCode: "Shades of Yellow & Gold",
  gallery: [
    "https://res.cloudinary.com/ddguf7pkw/image/upload/v1754549080/Gemini_Generated_Image_4haed74haed74hae_cdvhxh.png",
    "https://res.cloudinary.com/ddguf7pkw/image/upload/v1754549080/Gemini_Generated_Image_4haed74haed74hae_cdvhxh.png",
    "https://res.cloudinary.com/ddguf7pkw/image/upload/v1754549080/Gemini_Generated_Image_4haed74haed74hae_cdvhxh.png",
    "https://res.cloudinary.com/ddguf7pkw/image/upload/v1754549080/Gemini_Generated_Image_4haed74haed74hae_cdvhxh.png",
    "https://res.cloudinary.com/ddguf7pkw/image/upload/v1754549080/Gemini_Generated_Image_4haed74haed74hae_cdvhxh.png",
    "https://res.cloudinary.com/ddguf7pkw/image/upload/v1754549080/Gemini_Generated_Image_4haed74haed74hae_cdvhxh.png",
  ],
};

const MehandiPage = () => {
  const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};

  return (
    <div className="bg-[#FFF8E1]"> {/* A light creamy yellow background */}
      
      {/* --- 1. Hero Section --- */}
      <section className="relative h-[60vh] md:h-[70vh] w-full flex items-center justify-center text-center text-white">
        <Image src={haldiData.heroImage} alt="Haldi Ceremony" layout="fill" objectFit="cover" className="brightness-75" />
        <motion.div 
          className="relative z-10"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          <h1 className="text-4xl md:text-6xl font-serif font-bold tracking-tight">The Mehandi Ceremony</h1>
          <p className="mt-4 text-lg md:text-xl font-light">{haldiData.date}</p>
        </motion.div>
      </section>

      <main className="max-w-5xl mx-auto px-4 py-16 sm:py-24">
        
        {/* --- 2. Event Details Card --- */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="bg-white rounded-2xl shadow-lg p-8 grid grid-cols-1 md:grid-cols-3 gap-8 text-center -mt-32 relative z-20"
        >
          <div className="flex flex-col items-center gap-2 text-gray-700">
            <CalendarIcon />
            <h3 className="font-bold text-lg">When</h3>
            <p className="text-sm">{haldiData.time}</p>
          </div>
            <Link href={haldiData.venueLink} target='_blank'>
          <div className="flex flex-col items-center gap-2 text-gray-700">
            <MapPinIcon />
            <h3 className="font-bold text-lg">Where</h3>
            <p rel="noopener noreferrer" className="text-sm hover:text-amber-600 transition-colors">{haldiData.venue}</p>
          </div>
            </Link>
          <div className="flex flex-col items-center gap-2 text-gray-700">
            <ShirtIcon />
            <h3 className="font-bold text-lg">Dress Code</h3>
            <p className="text-sm">{haldiData.dressCode}</p>
          </div>
        </motion.div>

        {/* --- 3. The Story of Haldi --- */}
        <motion.div 
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="text-center mt-20"
        >
          <h2 className="text-3xl font-serif text-amber-800">A Ceremony of Blessings</h2>
          <p className="max-w-3xl mx-auto mt-4 text-gray-600">
            The Haldi ceremony is a cherished pre-wedding ritual where a paste of turmeric, oil, and water is applied to the bride and groom. This tradition symbolizes purification, blesses the couple with prosperity, and wards off evil spirits, marking an auspicious beginning to their new life together.
          </p>
        </motion.div>

        {/* --- 4. Photo Gallery (Masonry Layout) --- */}
        <motion.div 
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="mt-20"
        >
            <h2 className="text-3xl font-serif text-amber-800 text-center mb-8">Glimpses of Joy</h2>
            <div className="columns-2 md:columns-3 gap-4">
              {haldiData.gallery.map((src, index) => (
                <div key={index} className="mb-4 break-inside-avoid">
                  <Image src={src} alt={`Haldi gallery image ${index + 1}`} width={500} height={700} className="rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"/>
                </div>
              ))}
            </div>
        </motion.div>
    
        <motion.div
  variants={sectionVariants}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, amount: 0.3 }}
  transition={{ duration: 0.7, ease: 'easeOut' }}
  className="mt-20"
>
  <h2 className="text-3xl font-serif text-amber-800 text-center mb-8">
    How to Get There
  </h2>
  <div className="w-full h-[400px] rounded-2xl shadow-lg overflow-hidden">
    <iframe
      title="Wedding Venue Map"
      src={`https://maps.google.com/maps?q=${encodeURIComponent(haldiData.venue)}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
      width="100%"
      height="100%"
      style={{ border: 0 }}
      allowFullScreen={false}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    ></iframe>
  </div>
</motion.div>
      </main>
    </div>
  );
};

export default MehandiPage;