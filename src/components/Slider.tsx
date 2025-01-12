/* eslint-disable @next/next/no-img-element */

"use client";

import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { useEffect } from "react";
import "../styles/slider.css";

const Slider = () => {
  useEffect(() => {
    gsap.registerPlugin(CustomEase);
    CustomEase.create(
      "hop",
      "M0,0 C0.071,0.505 0.192,0.726 0.318,0.852 0.45,0.984 0.504,1 1,1"
    );

    const sliderImages = document.querySelector(".slider-images")!;
    const counter = document.querySelector(".counter")!;
    const titles = document.querySelector(".slider-title-wrapper")!;
    const indicators = document.querySelectorAll<HTMLElement>(
      ".slider-indicators p"
    );
    const prevSlides = document.querySelectorAll<HTMLElement>(
      ".slider-preview .preview"
    );
    const sliderPreview = document.querySelector(".slider-preview")!;

    let currentImg = 1;
    const totalSlides = 5;
    let indicatorRotation = 0;

    const updateCounterAndTitlePosition = () => {
      const counterY = -20 * (currentImg - 1);
      const titleY = -60 * (currentImg - 1);

      gsap.to(counter, {
        y: counterY,
        duration: 1,
        ease: "hop",
      });

      gsap.to(titles, {
        y: titleY,
        duration: 1,
        ease: "hop",
      });
    };

    const updateActiveSlidePreview = () => {
      prevSlides.forEach((prev) => prev.classList.remove("active"));
      prevSlides[currentImg - 1].classList.add("active");
    };

    const animateSlide = (direction: string) => {
      const currentSlide =
        document.querySelectorAll<HTMLElement>(".img")[
          document.querySelectorAll(".img").length - 1
        ];

      const slideImg = document.createElement("div");
      slideImg.classList.add("img");

      const slideImgElem = document.createElement("img");
      slideImgElem.src = `/images/slide${currentImg}.jpg`;
      gsap.set(slideImgElem, {
        x: direction === "left" ? -300 : 300,
      });

      slideImg.appendChild(slideImgElem);
      sliderImages?.appendChild(slideImg);

      gsap.to(currentSlide.querySelector("img")!, {
        x: direction === "left" ? 300 : -300,
        duration: 1.5,
        ease: "power4.out",
      });

      gsap.fromTo(
        slideImg,
        {
          clipPath:
            direction === "left"
              ? "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)"
              : "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)",
        },
        {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          duration: 1.5,
          ease: "power4.out",
        }
      );

      gsap.to(slideImgElem, {
        x: 0,
        duration: 1.5,
        ease: "power4.out",
      });

      cleanupSlides();

      indicatorRotation += direction === "left" ? -90 : 90;
      gsap.to(indicators, {
        rotate: indicatorRotation,
        duration: 1,
        ease: "hop",
      });
    };

    document.addEventListener("click", (event) => {
      const sliderWidth = document.querySelector(".slider")?.clientWidth || 0;
      const clickPosition = event.clientX;

      if (sliderPreview?.contains(event.target as Node)) {
        const clickedPrev = (event.target as HTMLElement).closest(".preview");

        if (clickedPrev) {
          const clickedIndex =
            Array.from(prevSlides).indexOf(clickedPrev as HTMLElement) + 1;

          if (clickedIndex !== currentImg) {
            if (clickedIndex < currentImg) {
              currentImg = clickedIndex;
              animateSlide("left");
            } else {
              currentImg = clickedIndex;
              animateSlide("right");
            }
            updateActiveSlidePreview();
            updateCounterAndTitlePosition();
          }
        }
        return;
      }

      if (clickPosition < sliderWidth / 2 && currentImg !== 1) {
        currentImg--;
        animateSlide("left");
      } else if (
        clickPosition > sliderWidth / 2 &&
        currentImg !== totalSlides
      ) {
        currentImg++;
        animateSlide("right");
      }

      updateActiveSlidePreview();
      updateCounterAndTitlePosition();
    });

    function cleanupSlides() {
      const imgElements = document.querySelectorAll<HTMLElement>(
        ".slider-images .img"
      );
      if (imgElements.length > totalSlides) {
        imgElements[0].remove();
      }
    }
  }, []);

  return (
    <div className="slider">
      <div className="slider-images">
        <div className="img">
          <img src="/images/slide1.jpg" alt="" />
        </div>
      </div>
      <div className="slider-title">
        <div className="slider-title-wrapper">
          <p>Violin Mistress Meetup</p>
          <p>CS25 &mdash; Augmented Future Summit</p>
          <p>Opera House Renaissance Party</p>
          <p>Inter&mdash;School Badminton Meetup</p>
          <p>Nowrin&apos;s Scuba Pals &apos;25</p>
        </div>
      </div>
      <div className="slider-counter">
        <div className="counter">
          <p>1</p>
          <p>2</p>
          <p>3</p>
          <p>4</p>
          <p>5</p>
        </div>
        <div>
          <p>&mdash;</p>
        </div>
        <div>
          <p>5</p>
        </div>
      </div>
      <div className="slider-preview">
        <div className="preview active">
          <img src="/images/slide1.jpg" alt="" />
        </div>
        <div className="preview">
          <img src="/images/slide2.jpg" alt="" />
        </div>
        <div className="preview">
          <img src="/images/slide3.jpg" alt="" />
        </div>
        <div className="preview">
          <img src="/images/slide4.jpg" alt="" />
        </div>
        <div className="preview">
          <img src="/images/slide5.jpg" alt="" />
        </div>
      </div>
      <div className="slider-indicators">
        <p>+</p>
        <p>+</p>
      </div>
    </div>
  );
};

export default Slider;
