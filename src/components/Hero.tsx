import { useEffect, useRef, useState } from "react";
import { Smartphone, Instagram } from "lucide-react";

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  // Text animation keywords
  const keywords = ["Buy 🛍️", "Sell 📦", "Adopt 🐶"];
  const finalName = "OSCPETS";

  const [index, setIndex] = useState(0);
  const [showFinal, setShowFinal] = useState(false);

  // Hero images (fade slider)
  const images = [
    "/lovable-uploads/dog2.png",
    "/lovable-uploads/vets.jpg",
    "/lovable-uploads/vendors.jpg",
  ];
  const [imageIndex, setImageIndex] = useState(0);

  /* ---------------- HERO TEXT + PARALLAX ---------------- */
  useEffect(() => {
    const animateHero = () => {
      if (textRef.current) {
        textRef.current.classList.add("animate-fade-in");
        textRef.current.style.animationDelay = "0.2s";
      }

      if (imageRef.current) {
        imageRef.current.classList.add("animate-fade-in-right");
        imageRef.current.style.animationDelay = "0.4s";
      }

      if (ctaRef.current) {
        ctaRef.current.classList.add("animate-fade-in");
        ctaRef.current.style.animationDelay = "0.6s";
      }

      const timer = setInterval(() => {
        setIndex((prev) => {
          if (prev < keywords.length - 1) return prev + 1;
          setShowFinal(true);
          clearInterval(timer);
          return prev;
        });
      }, 1500);

      return () => clearInterval(timer);
    };

    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (textRef.current) {
        textRef.current.style.transform = `translateY(${scrollY * 0.1}px)`;
      }
      if (imageRef.current) {
        imageRef.current.style.transform = `translateY(${scrollY * 0.05}px)`;
      }
    };

    animateHero();
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ---------------- IMAGE FADE SLIDER ---------------- */
  useEffect(() => {
    const imageTimer = setInterval(() => {
      setImageIndex((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(imageTimer);
  }, []);

  return (
    <div
      ref={heroRef}
      className="relative min-h-screen flex items-center pt-20"
    >
      {/* Background Blur */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute top-40 right-20 w-72 h-72 bg-osc-pale-blue rounded-full blur-3xl opacity-30" />
        <div className="absolute bottom-40 left-20 w-96 h-96 bg-osc-light-pink rounded-full blur-3xl opacity-20" />
      </div>

      <div className="container-custom grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* ---------------- TEXT ---------------- */}
        <div ref={textRef} className="animated-element order-2 md:order-1">
          <div className="section-label">Pet Care Simplified</div>

          <h1 className="heading-xl mb-6">
            Your One-Stop Tech-Enabled Pet Marketplace in India – Shop, Care &
            Connect! 🐾
          </h1>

          <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
            Find the best pet products, get expert pet care advice, and connect
            with trusted vendors – all in one tech-driven platform!
          </p>

          {/* CTA Buttons */}
          <div
            ref={ctaRef}
            className="animated-element flex flex-col sm:flex-row gap-4"
          >
            <a
              href="https://chat.whatsapp.com/invite-link"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary flex items-center justify-center gap-2"
            >
              <Smartphone size={18} />
              Join Our Pet Parent Community
            </a>

            <a
              href="https://instagram.com/oscpets"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary flex items-center justify-center gap-2"
            >
              <Instagram size={18} />
              Follow Us on Instagram
            </a>
          </div>
        </div>

        {/* ---------------- IMAGE SLIDER ---------------- */}
        <div
          ref={imageRef}
          className="animated-element order-1 md:order-2 flex justify-center"
        >
          <div className="relative">
            <div className="w-64 h-64 md:w-80 md:h-80 bg-osc-pale-blue rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10" />

            {/* Fade Images */}
           <div className="relative w-full h-full md:w-96 md:h-96">


              {images.map((src, i) => (
                <img
                  key={src}
                  src={src}
                  alt="OSCPETS Pets"
                  className={`absolute inset-0 w-full h-full object-cover rounded-2xl shadow-lg animate-float transition-opacity duration-1000
                    ${i === imageIndex ? "opacity-100" : "opacity-0"}
                  `}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
