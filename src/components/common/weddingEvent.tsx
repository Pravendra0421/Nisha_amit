'use client';
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

const eventsData = [
  {
    id:1,
    title: "Haldi 💛",
    imageUrl: "https://res.cloudinary.com/ddguf7pkw/image/upload/v1754549835/Gemini_Generated_Image_d37ezjd37ezjd37e_a5zyiq.png",
    animationDirection: "left",
    date:"19 feb",
    url:"/events/haldi"
  },
  {
    id:2,
    title: "Mehendi 🌿",
    imageUrl: "https://res.cloudinary.com/ddguf7pkw/image/upload/v1754549080/Gemini_Generated_Image_4haed74haed74hae_cdvhxh.png",
    animationDirection: "bottom",
    date:"19 feb",
    url:"/events/mehandi"
  },
  {
    id:3,
    title: "Lagun 🙏",
    imageUrl: "https://res.cloudinary.com/ddguf7pkw/image/upload/v1754549425/Gemini_Generated_Image_5fly9e5fly9e5fly_gy8yp2.png",
    animationDirection: "right",
    date:"19 feb",
    url:"/events/lagun"
  },
  {
    id:4,
    title: "Sangeet 💃",
    imageUrl: "https://res.cloudinary.com/ddguf7pkw/image/upload/v1754549542/Gemini_Generated_Image_nr9eucnr9eucnr9e_obee2t.png",
    animationDirection: "left",
    date:"19 feb",
    url:"/events/sangeet"
  },
  {
    id:5,
    title: "Phere 🔥",
    imageUrl: "https://res.cloudinary.com/ddguf7pkw/image/upload/v1754549632/Gemini_Generated_Image_m1kzxxm1kzxxm1kz_kio8er.png",
    animationDirection: "bottom",
    date:"19 feb",
    url:"/events/phere"
  },
  {
    id:6,
    title: "Vidai 😢",
    imageUrl: "https://res.cloudinary.com/ddguf7pkw/image/upload/v1754549722/Gemini_Generated_Image_g3qv2vg3qv2vg3qv_xdeutl.png",
    animationDirection: "right",
    date:"19 feb",
    url:"/events/vidai"
  },
];

const cardVariants = {
  hidden: (direction: string) => ({
    opacity: 0,
    x: direction === 'left' ? -100 : direction === 'right' ? 100 : 0,
    y: direction === 'bottom' ? 100 : 0,
  }),
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
  },
};

const WeddingEvents = () => {
  return (
    // The fix is applied here
    <div className='p-2 overflow-x-hidden'> 
      <div className="max-w-7xl mx-auto">
        <motion.h2 
          className="text-4xl md:text-5xl font-serif font-bold text-center text-white mb-12"
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          EVENTS
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {eventsData.map((event) => (
            <Link href={event.url} key={event.id}>
                <motion.div
              key={event.id}
              className="relative rounded-xl overflow-hidden shadow-lg group"
              variants={cardVariants}
              custom={event.animationDirection}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <Image
                src={event.imageUrl}
                alt={event.title}
                width={500}
                height={500}
                className="w-full h-96 object-cover transform transition-transform duration-500 ease-in-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
              <div className="absolute inset-0 gap-14 flex items-end p-6">
                <div className="font-serif text-3xl font-bold text-amber-300 transform transition-transform duration-500 group-hover:-translate-y-2">
                  {event.title}
                </div>
                <div className='font-serif text-3xl font-bold text-amber-300 transform transition-transform duration-500 group-hover:-translate-y-2'>
                  {event.date}
                </div>
              </div>
            </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WeddingEvents;