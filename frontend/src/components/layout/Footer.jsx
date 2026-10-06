import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";

import logo from "../assets/bid-black-logo.png";

/* -------------------------------------------------------------------------- */
/* ANIMATION                                                                  */
/* -------------------------------------------------------------------------- */

const footerStagger = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.12,
      staggerChildren: 0.08,
    },
  },
};

const footerItem = {
  hidden: {
    opacity: 0,
    y: 22,
  },

  visible: {
    opacity: 1,
    y: 0,

    transition: {
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

/* -------------------------------------------------------------------------- */
/* SOCIAL ICONS                                                               */
/* -------------------------------------------------------------------------- */

const InstagramIcon = () => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className="h-[19px] w-[19px]"
    >
      <rect
        x="3"
        y="3"
        width="18"
        height="18"
        rx="5"
        stroke="currentColor"
        strokeWidth="1.6"
      />

      <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.6" />

      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
    </svg>
  );
};

const FacebookIcon = () => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className="h-[19px] w-[19px]"
    >
      <path
        d="M13.5 21V13.2H16.1L16.5 10.15H13.5V8.2C13.5 7.32 13.75 6.72 15.03 6.72H16.6V4C16.33 3.96 15.39 3.88 14.3 3.88C12.02 3.88 10.46 5.27 10.46 7.84V10.15H8V13.2H10.46V21H13.5Z"
        fill="currentColor"
      />
    </svg>
  );
};

/* -------------------------------------------------------------------------- */
/* SOCIAL LINK                                                                */
/* -------------------------------------------------------------------------- */

const SocialLink = ({ href, label, icon }) => {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      initial="rest"
      whileHover="hover"
      className="
        group
        flex
        w-[165px]
        items-center
        justify-between
        border-b
        border-[#D8CFAF]
        pb-[11px]
        font-sans
        text-[#30251A]
        transition-colors
        duration-300
        hover:border-[#C6A66B]
        hover:text-[#C6A66B]
      "
    >
      <span className="flex items-center gap-3">
        <motion.span
          variants={{
            rest: {
              rotate: 0,
              x: 0,
              y: 0,
              scale: 1,
            },

            hover: {
              rotate: [0, -7, 7, -5, 5, 0],
              x: [0, -1, 1, -1, 1, 0],
              y: [0, 1, -1, 1, -1, 0],
              scale: [1, 1.05, 1],

              transition: {
                duration: 0.5,
                ease: "easeInOut",
              },
            },
          }}
          className="
            flex
            h-[34px]
            w-[34px]
            items-center
            justify-center
            rounded-full
            border
            border-[#D8CFAF]
            text-[#30251A]
            transition-colors
            duration-300
            group-hover:border-[#C6A66B]
            group-hover:bg-[#C6A66B]
            group-hover:text-[#FEFAE0]
          "
        >
          {icon}
        </motion.span>

        <span className="font-medium text-[14px]">{label}</span>
      </span>

      <motion.span
        variants={{
          rest: {
            opacity: 0.55,
            x: 0,
            y: 0,
          },

          hover: {
            opacity: 1,
            x: 3,
            y: -3,

            transition: {
              duration: 0.25,
              ease: "easeOut",
            },
          },
        }}
        className="text-[16px] text-[#30251A]"
      >
        ↗
      </motion.span>
    </motion.a>
  );
};

/* -------------------------------------------------------------------------- */
/* FOOTER                                                                     */
/* -------------------------------------------------------------------------- */

const Footer = () => {
  const currentYear = new Date().getFullYear();

  /* ------------------------------------------------------------------------ */
  /* SCROLL REVEAL                                                            */
  /* ------------------------------------------------------------------------ */

  const revealRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: revealRef,
    offset: ["start end", "end end"],
  });

  /* ------------------------------------------------------------------------ */
  /* SMOOTH PROGRESS                                                          */
  /* ------------------------------------------------------------------------ */

  const progress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 26,
    mass: 0.7,
  });

  /* ------------------------------------------------------------------------ */
  /* FOOTER REVEAL                                                            */
  /* ------------------------------------------------------------------------ */

  const clipPath = useTransform(
    progress,
    [0, 0.08, 0.25, 0.5, 0.75, 1],
    [
      "inset(100% 0% 0% 0%)",
      "inset(92% 0% 0% 0%)",
      "inset(75% 0% 0% 0%)",
      "inset(50% 0% 0% 0%)",
      "inset(25% 0% 0% 0%)",
      "inset(0% 0% 0% 0%)",
    ],
  );

  const footerOpacity = useTransform(
    progress,
    [0, 0.15, 0.4, 1],
    [0.75, 0.9, 0.98, 1],
  );

  /* ------------------------------------------------------------------------ */
  /* BACKGROUND BRANDING                                                      */
  /* ------------------------------------------------------------------------ */

  const backgroundY = useTransform(progress, [0, 1], [35, 0]);

  const backgroundOpacity = useTransform(
    progress,
    [0, 0.35, 0.75, 1],
    [0, 0.35, 0.75, 1],
  );

  /* ------------------------------------------------------------------------ */
  /* BACK TO TOP                                                              */
  /* ------------------------------------------------------------------------ */

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <section
      ref={revealRef}
      className="
        relative
        z-0

        h-[680px]

        sm:h-[760px]

        min-[1050px]:h-[700px]
      "
    >
      {/* ------------------------------------------------------------------ */}
      {/* FOOTER                                                              */}
      {/* ------------------------------------------------------------------ */}

      <motion.footer
        style={{
          clipPath,
          opacity: footerOpacity,
        }}
        className="
          absolute
          bottom-0
          left-0
          right-0

          h-[520px]

          overflow-hidden
          border-t
          border-[#D8CFAF]
          bg-[#FEFAE0]

          px-0
          pb-[34px]
          pt-[85px]

          text-[#30251A]

          sm:h-[560px]
          sm:pt-[115px]

          min-[1050px]:h-[500px]
          min-[1050px]:pt-[85px]
        "
      >
        {/* ---------------------------------------------------------------- */}
        {/* LARGE BACKGROUND BRANDING                                       */}
        {/* ---------------------------------------------------------------- */}

        <motion.div
          style={{
            y: backgroundY,
            opacity: backgroundOpacity,
          }}
          className="
    pointer-events-none
    absolute
    inset-x-0
    z-0

    flex
    justify-center

    select-none
    overflow-visible
    whitespace-nowrap

    font-display
    font-normal
    leading-[0.72]
    tracking-[-0.075em]

    text-[#30251A]/[0.075]

    w-full
    text-[clamp(5.5rem,19vw,19rem)]

    max-[1049px]:text-[clamp(4.8rem,15vw,9rem)]
    max-[1049px]:tracking-[-0.065em]

    max-[749px]:text-[clamp(3.4rem,15vw,6.2rem)]
    max-[749px]:tracking-[-0.06em]

    max-[420px]:text-[clamp(3rem,15vw,5rem)]
  "
        >
          <span className="inline-block">Iban Banerjea</span>
        </motion.div>

        {/* ---------------------------------------------------------------- */}
        {/* CONTENT                                                          */}
        {/* ---------------------------------------------------------------- */}

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.02,
          }}
          variants={footerStagger}
          className="
            relative
            z-10

            mx-auto
            h-full
            w-[calc(100%-40px)]
            max-w-[1400px]

            min-[1050px]:w-[calc(100%-80px)]
          "
        >
          {/* -------------------------------------------------------------- */}
          {/* MAIN FOOTER                                                    */}
          {/* -------------------------------------------------------------- */}

          <div
            className="
              grid
              grid-cols-1
              gap-[55px]

              min-[750px]:grid-cols-[1.15fr_1.85fr]
              min-[750px]:gap-[60px]

              min-[1050px]:grid-cols-[2.2fr_3fr]
              min-[1050px]:gap-[95px]
            "
          >
            {/* ========================================================== */}
            {/* BRAND                                                       */}
            {/* ========================================================== */}

            <motion.div
              variants={footerItem}
              className="
                max-w-[520px]

                min-[1050px]:max-w-[420px]
              "
            >
              <Link
                to="/"
                aria-label="Being Iban Digital"
                className="flex shrink-0 items-center"
              >
                <img
                  src={logo}
                  alt="Being Iban Digital"
                  className="
                    block
                    h-[52px]
                    w-auto
                    max-w-[190px]
                    object-contain

                    min-[901px]:h-[52px]

                    max-[1024px]:h-[48px]
                    max-[1024px]:max-w-[175px]

                    max-[640px]:h-[44px]
                    max-[640px]:max-w-[160px]
                  "
                />
              </Link>

              <p
                className="
                  my-[24px]
                  max-w-[400px]

                  font-sans
                  text-[15px]
                  font-medium
                  leading-[1.75]

                  text-[#655343]

                  sm:my-[30px_38px]
                "
              >
                Helping brands grow through creative storytelling, premium
                websites, branding and performance marketing.
              </p>
            </motion.div>

            {/* ========================================================== */}
            {/* RIGHT SIDE NAVIGATION                                       */}
            {/* ========================================================== */}

            <div
              className="
                grid
                grid-cols-2
                gap-[42px]

                sm:grid-cols-3
                sm:gap-[35px]

                min-[1050px]:grid-cols-3
                min-[1050px]:gap-[65px]
              "
            >
              {/* -------------------------------------------------------- */}
              {/* EXPLORE                                                    */}
              {/* -------------------------------------------------------- */}

              <motion.div variants={footerItem} className="flex flex-col">
                <h3
                  className="
                    mb-[25px]

                    font-sans
                    text-[11px]
                    font-bold
                    tracking-[0.2em]
                    text-[#30251A]

                    sm:mb-[30px]
                  "
                >
                  EXPLORE
                </h3>

                <div className="flex flex-col items-start gap-[17px]">
                  {[
                    ["Home", "/"],
                    ["Personal", "/personal"],
                    ["Professional", "/professional"],
                  ].map(([label, path]) => (
                    <Link
                      key={path}
                      to={path}
                      className="
                        group
                        relative

                        font-sans
                        text-[14px]
                        font-medium
                        leading-[1.4]

                        text-[#655343]

                        transition-all
                        duration-300

                        hover:translate-x-2
                        hover:text-[#C6A66B]
                      "
                    >
                      <span
                        className="
                          absolute
                          -left-[16px]
                          top-1/2

                          h-px
                          w-0

                          -translate-y-1/2

                          bg-[#C6A66B]

                          transition-all
                          duration-300

                          group-hover:w-[8px]
                        "
                      />

                      {label}
                    </Link>
                  ))}
                </div>
              </motion.div>

              {/* -------------------------------------------------------- */}
              {/* FOLLOW                                                     */}
              {/* -------------------------------------------------------- */}

              <motion.div variants={footerItem} className="flex flex-col">
                <h3
                  className="
                    mb-[25px]

                    font-sans
                    text-[11px]
                    font-bold
                    tracking-[0.2em]

                    text-[#30251A]

                    sm:mb-[30px]
                  "
                >
                  FOLLOW
                </h3>

                <div className="flex flex-col gap-[15px]">
                  <SocialLink
                    href="https://www.instagram.com/being_iban_digital"
                    label="Instagram"
                    icon={<InstagramIcon />}
                  />

                  <SocialLink
                    href="https://www.facebook.com/people/Being-Iban-Digital/61591181224638"
                    label="Facebook"
                    icon={<FacebookIcon />}
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </motion.footer>
    </section>
  );
};

export default Footer;
