import { useRef, useEffect } from 'react';
import { Bot, BookAudio, HeartHandshake, PawPrint, ShoppingCart, Stethoscope } from 'lucide-react';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';

const Features = () => {

  const sectionRef = useRef<HTMLDivElement>(null);
  const featureRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    featureRefs.current.forEach((ref) => {
      if (ref) {
        observer.observe(ref);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  const features = [
    {
      icon: <Bot className="w-8 h-8" />,
      title: "AI Pet Assistant",
      description: "Get instant answers to your pet care questions.",
      number: "1️⃣",
      link: "/chat"
    },
    {
      icon: <Stethoscope className="w-8 h-8" />,
      title: "Pet Grooming & Veterinary Care",
      description: "Direct access to professional pet services near you.",
      number: "2️⃣",
      link: "/grooming-vet"
    },
    {
      icon: <ShoppingCart className="w-8 h-8" />,
      title: "Pet Products",
      description: "A diverse range of accessories for online purchase.",
      number: "3️⃣",
      link: "/store"
    },
    {
      icon: <HeartHandshake className="w-8 h-8" />,
      title: "Pet Adoption & Marketplace",
      description: "Adopt, buy, or sell pets responsibly and easily.",
      number: "4️⃣",
      link: "/adoption-marketplace"
    },
    {
      icon: <PawPrint className="w-8 h-8" />,
      title: "Breeding Matchmaking",
      description: "AI-driven tools for safe, responsible pet breeding.",
      number: "5️⃣",
      link: "/breeding-match"
    },{
     icon: <HeartHandshake className="w-8 h-8" />,
  title: "Vets",
  description: "Book appointments with professional veterinarians.",
  number: "6️⃣",
  link: "/vets"
    }
  ];

  return (
    <section id="features" className="section-padding">
      <div className="container-custom">
        {/* Section Header */}
        <div ref={sectionRef} className="text-center mb-16 animated-element">
          <div className="section-label">Features</div>
          <h2 className="heading-lg mb-4">Why OSCPETS?</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We're building the ultimate tech-powered platform for pet parents in India, simplifying pet care 
            by combining innovative technology with trusted products and services.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {features.map((feature, index) => (
            <Link
              key={index}
              to={feature.link}
              ref={(el) => (featureRefs.current[index] = el)}
              className="feature-card animated-element hover:shadow-xl transition-shadow duration-300"
              style={{ animationDelay: `${0.2 + index * 0.1}s` }}
            >
              <div className="absolute top-2 right-2 text-sm opacity-60">{feature.number}</div>
              <div className="feature-icon-container">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </Link>
          ))}
        </div>

        {/* Follow OSCPETS Button */}
        <div
          className="text-center mt-8 mb-6 animated-element"
          ref={(el) => (featureRefs.current[features.length] = el)}
          style={{ animationDelay: `${0.2 + features.length * 0.1}s` }}
        >
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSfvJgfxXnMjH989BrdP_4Hcbn6Af1yO152U5yPQZnFACDc57g/viewform?usp=dialog"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block"
          >
            <Button className="bg-osc-blue hover:bg-osc-blue/90 text-white rounded-full px-6 py-6 text-base">
              <BookAudio className="mr-2" /> Follow OSCPETS Now - Get Free Pet Care Ebooks
            </Button>
          </a>
          <p className="text-sm text-gray-600 mt-4">
            Fill the form to receive updates when we launch and get free pet care ebooks!
          </p>
        </div>
      </div>
    </section>
  );
};

export default Features;
