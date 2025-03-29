"use client";
import useTextRevealAnimation from "@/hooks/useTextRevealAnimation";
import { usePresence, motion } from "motion/react";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import { HTMLAttributes, useEffect } from "react";
import { twMerge } from "tailwind-merge";

export const Testimonial = (
  props: {
    quote: string;
    name: string;
    role: string;
    company: string;
    imagePositionY: number;
    image: string | StaticImport;
    className?: string;
  } & HTMLAttributes<HTMLDivElement>
) => {
  const {
    quote,
    name,
    role,
    company,
    imagePositionY,
    image,
    className,
    ...rest
  } = props;

  const {
    scope: quoteScope,
    entranceAnimation: quoteEntranceAnimation,
    exitAnimation: quoteExitAnimation,
  } = useTextRevealAnimation();
  const {
    scope: citeScope,
    entranceAnimation: citeEntranceAnimation,
    exitAnimation: citeExitAnimation,
  } = useTextRevealAnimation();

  const [isPresent, safeToRemove] = usePresence();

  useEffect(() => {
    if (isPresent) {
      quoteEntranceAnimation().then(() => {
        citeEntranceAnimation();
      });
    } else {
      Promise.all([quoteExitAnimation(), citeExitAnimation()]).then(() => {
        safeToRemove();
      });
    }
  }, [
    isPresent,
    quoteEntranceAnimation,
    citeEntranceAnimation,
    quoteExitAnimation,
    citeExitAnimation,
    safeToRemove,
  ]);

  return (
    <div
      className={twMerge(
        "grid md:grid-cols-5 md:gap-8 lg:gap-16 md:items-center",
        className
      )}
      {...rest}
    >
      <div className="aspect-square md:aspect-[9/16] md:col-span-2 relative">
        <motion.div
          className="absolute h-full bg-stone-900"
          initial={{ width: "100%" }}
          animate={{ width: 0 }}
          exit={{ width: "100%" }}
          transition={{
            duration: 0.5,
          }}
        ></motion.div>
        <Image
          className="size-full object-cover"
          style={{ objectPosition: `50% ${imagePositionY * 100}%` }}
          src={image}
          alt={name}
        />
      </div>
      <blockquote className="md:col-span-3">
        <div
          ref={quoteScope}
          className="text-3xl md:text-5xl text-[#EC5000] lg:text-6xl mt-8 md:mt-0"
        >
          <span>&ldquo;</span>
          {quote}
          <span>&rdquo;</span>
        </div>
        <cite
          ref={citeScope}
          className="mt-4 md:md-8 md:text-lg not-italic text-white lg:text-xl block"
        >
          {name}, {role} at {company}
        </cite>
      </blockquote>
    </div>
  );
};
