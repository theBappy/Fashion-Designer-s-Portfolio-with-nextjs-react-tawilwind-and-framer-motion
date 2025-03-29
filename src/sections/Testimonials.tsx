"use client";
import { FC, useRef, useState } from "react";
import image1 from "@/assets/images/test1.svg";
import image2 from "@/assets/images/test0.svg";
import image3 from "@/assets/images/test2.svg";
import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { Testimonial } from "@/components/Testimonial";

/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
const testimonials = [
  {
    name: "Tom Hardy",
    company: "Pixel Perfect",
    role: "Head of Design",
    quote:
      "Adriana's expertise in both technical development and design created a beautiful, high-performing website.",
    image: image1,
    imagePositionY: 0.2,
  },
  {
    name: "Jenny Wilson",
    company: "Craft Coffee Co.",
    role: "Founder",
    quote:
      "Lima transformed our boutique coffee brand with a website that perfectly balances aesthetics and functionality.",
    image: image2,
    imagePositionY: 0.1,
  },
  {
    name: "Emily Watson",
    company: "Studio Minimal",
    role: "Creative Director",
    quote:
      "The collaborative process was amazing. Alex brought lots of fresh perspectives and innovative solutions.",
    image: image3,
    imagePositionY: 0.55,
  },
];

const Testimonials: FC = () => {
  const titleRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: titleRef,
    offset: ["start end", "end start"],
  });

  const transformTop = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  const transformBottom = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);

  const [testimonialIndex, setTestimonialIndex] = useState(0);

  const handleClickPrev = () =>{
    setTestimonialIndex((curr) => {
      if(curr === 0){
        return testimonials.length - 1;
      }
      return curr - 1;
    })
  }

  const handleClickNext = () =>{
    setTestimonialIndex((curr) =>{
      if(curr === testimonials.length - 1) return 0;
      return curr + 1;
    })
  }

  return (
    <section id="testimonials" className="section">
      <h2
        ref={titleRef}
        className="text-4xl md:text-7xl lg:text-8xl flex flex-col overflow-hidden"
      >
        <motion.span
          style={{
            x: transformTop,
          }}
          className="whitespace-nowrap text-white"
        >
          Some nice words from my past clients
        </motion.span>
        <motion.span
          style={{
            x: transformBottom,
          }}
          className="whitespace-nowrap self-end text-red-orange-500"
        >
          Some nice words from my past clients
        </motion.span>
      </h2>
      <div className="container">
        <div className="mt-20">
          <AnimatePresence mode="wait" initial={false}>
          {testimonials.map(
            ({ name, imagePositionY, company, role, quote, image }, index) =>
              index === testimonialIndex && (
                <Testimonial
                  key={name}
                  name={name}
                  company={company}
                  role={role}
                  quote={quote}
                  image={image}
                  imagePositionY={imagePositionY}
                />
              )
          )}
          </AnimatePresence>
        </div>
        <div className="flex gap-4 mt-6 lg:mt-10">
          <button className="border border-[#EC5000] size-11 inline-flex items-center justify-center rounded-full hover:bg-red-orange-500 hover:text-white hover:border-red-orange-500 transition-all duration-300"
          onClick={handleClickPrev}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6 text-[#EC5000] hover:text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
              />
            </svg>
          </button>
          <button 
          onClick={handleClickNext}
          className="border border-[#EC5000] size-11 inline-flex items-center justify-center rounded-full
          hover:bg-red-orange-500 hover:text-white hover:border-red-orange-500 transition-all duration-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6 text-[#EC5000] hover:text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
