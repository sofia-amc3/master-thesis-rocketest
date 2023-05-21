import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "@/styles/app.module.css";

const SideMenuAuth = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isIntervalActive, setIsIntervalActive] = useState(true); // to check if automated sliding is active or not
  const slides = [
    <>
      Rocketest has been designed to streamline usability testing processes and
      make them more efficient. This application aims to help user experience
      designers and researchers spend{" "}
      <strong className={styles.strongMedium}>less time on logistics</strong>{" "}
      and{" "}
      <strong className={styles.strongMedium}>
        more time on actually testing and improving their designs
      </strong>
      .
    </>,
    <>
      Whether you&apos;re testing a new product or a website, Rocketest provides
      various templates that will help you to get{" "}
      <strong className={styles.strongMedium}>
        accurate and meaningful results in no time
      </strong>
      , making it the go-to tool for anyone looking to optimize their usability
      tests.
    </>,
  ];

  useEffect(() => {
    let interval: any;

    if (isIntervalActive) {
      interval = setInterval(() => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
      }, 7000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isIntervalActive]);

  const handleClickSlide = (slideIndex: React.SetStateAction<number>) => {
    setCurrentSlide(slideIndex);
    setIsIntervalActive(false); // stops the automatic slider whenever the user clicks on its buttons
    setTimeout(() => {
      setIsIntervalActive(true); // waits for 5 seconds before turning on the automatic sliding again
    }, 5000);
  };

  return (
    <div className={styles.sideMenuAuth}>
      {/* LOGO */}
      <Link href="/">
        <Image
          src="/logo-darkBg.png"
          alt="Rocketest Logo"
          width={198}
          height={50}
        />
      </Link>

      {/* Introduction Text - Slider */}
      <h5>Why Rocketest?</h5>
      <p>{slides[currentSlide]}</p>
      {/* Slider Buttons */}
      <div className={styles.sliderButtonsContainer}>
        {slides.map((_, index) => (
          <button
            key={index}
            className={currentSlide === index ? styles.activeSliderButton : ""}
            onClick={() => handleClickSlide(index)}
          />
        ))}
      </div>

      <div className={styles.bottomContainer}>
        {/* Social Media */}
        <div className={styles.socialMediaContainer}>
          <a href={"https://www.facebook.com/"} target="_blank">
            <Image
              src="/icons/facebook.png"
              alt="Facebook Icon"
              width={20}
              height={20}
            />
          </a>
          <a href={"https://www.twitter.com/"} target="_blank">
            <Image
              src="/icons/twitter.png"
              alt="Twitter Icon"
              width={20}
              height={20}
            />
          </a>
          <a href={"https://www.instagram.com/"} target="_blank">
            <Image
              src="/icons/instagram.png"
              alt="Instagram Icon"
              width={20}
              height={20}
            />
          </a>
        </div>

        {/* Links */}
        <div className={styles.linksContainer}>
          <Link href="/termsAndConditions">Terms and Conditions</Link>
          <Link href="/contactUs">Contact Us</Link>
          <span>© 2023 Rocketest</span>
        </div>
      </div>
    </div>
  );
};

export default SideMenuAuth;
