"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { fadeUp } from "../utils/motion";

const heroItems = [
  {
    id: 1,
    headline: "Violin Mistress Meetup",
    description:
      "Join the harmony of elegance and artistry in an exclusive event dedicated to violin enthusiasts and maestros alike.",
    image: "/images/slide1.jpg",
  },
  {
    id: 2,
    headline: "CS25 Augmented Future Summit",
    description:
      "Experience the cutting-edge innovations in technology and artificial intelligence at the CS25 Augmented Future Summit.",
    image: "/images/slide2.jpg",
  },
  {
    id: 3,
    headline: "Medieval Opera Party",
    description:
      "Step into a world of grandeur and timeless melodies at the enchanting Medieval Opera Party.",
    image: "/images/slide3.jpg",
  },
  {
    id: 4,
    headline: "Femme Fatale Badminton Meetup",
    description:
      "Celebrate empowerment and sportsmanship at the Femme Fatale Badminton Meetup, where every match tells a story.",
    image: "/images/slide4.jpg",
  },
  {
    id: 5,
    headline: "Scuba Diving Conference",
    description:
      "Dive into adventure and exploration at the Scuba Diving Conference, where underwater wonders await.",
    image: "/images/slide5.jpg",
  },
];

const Hero = () => {
  return (
    <div className="h-[calc(100vh-4rem)]">
      <Swiper
        speed={1000}
        navigation={true}
        loop={true}
        grabCursor={true}
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        modules={[Navigation, Pagination, Autoplay]}
        className="h-full"
      >
        {heroItems.map((item) => (
          <SwiperSlide key={item.id}>
            <div
              className="hero h-full"
              style={{
                backgroundImage: `url(${item.image})`,
              }}
            >
              <div className="hero-overlay bg-opacity-60"></div>
              <div className="hero-content text-neutral-content text-center">
                <div className="max-w-md">
                  <div className="overflow-hidden">
                    <motion.h1
                      initial="hidden"
                      whileInView="visible"
                      variants={fadeUp(0.6)}
                      className="mb-5 text-5xl font-bold"
                    >
                      {item.headline}
                    </motion.h1>
                  </div>
                  <div className="overflow-hidden">
                    <motion.p
                      initial="hidden"
                      whileInView="visible"
                      variants={fadeUp(0.8)}
                      className="mb-5"
                    >
                      {item.description}
                    </motion.p>
                  </div>
                  <div className="overflow-hidden">
                    <motion.div
                      initial="hidden"
                      whileInView="visible"
                      variants={fadeUp(1)}
                    >
                      <Link href="/events" className="btn btn-primary">
                        Discover Exciting Events
                      </Link>
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Hero;
