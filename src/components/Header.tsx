import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<{ firstName: string } | null>(null);

  // Safely get user from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem("user");
      if (stored && stored !== "undefined") {
        setUser(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Failed to parse user data:", e);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-white/80 backdrop-blur-md shadow-sm py-4"
          : "bg-transparent py-6"
      )}
    >
      <div className="container-custom flex items-center justify-between">
        {/* Logo */}
        <div className="relative z-10">
          <a href="/" className="flex items-center">
            <img
              src="/lovable-uploads/3927147b-bff0-46d6-b1bb-8df967d67e53.png"
              alt="OSCPETS Logo"
              className="h-10 md:h-12"
            />
          </a>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <a
            href="/store"
            className="text-sm font-medium text-gray-700 hover:text-osc-blue transition-colors"
          >
            Products
          </a>
          <a
            href="/vets"
            className="text-sm font-medium text-gray-700 hover:text-osc-blue transition-colors"
          >
            Vets
          </a>
          <a
            href="/chat"
            className="text-sm font-medium text-gray-700 hover:text-osc-blue transition-colors"
          >
            AI Assistant
          </a>

          <a
            href="/myorders"
            className="text-sm font-medium text-gray-700 hover:text-osc-blue transition-colors"
          >
            My Orders
          </a>
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSfvJgfxXnMjH989BrdP_4Hcbn6Af1yO152U5yPQZnFACDc57g/viewform?usp=dialog"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            Join Community
          </a>
          <button
            className="btn-primary"
            onClick={() => (window.location.href = "/createpetprofile")}
          >
            Create Pet Profile
          </button>
          {user ? (
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-gray-700">
                <a href="/userprofile">
                  Welcome, {user.firstName}!
                </a>
              </span>

            </div>
          ) : (
            <button
              className="btn-primary"
              onClick={() => (window.location.href = "/login")}
            >
              Login
            </button>

          )}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden relative z-10 p-2"
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Menu */}
        <div
          className={cn(
            "fixed inset-0 bg-white z-40 flex flex-col items-center justify-center space-y-8 transition-transform duration-300 ease-in-out",
            mobileMenuOpen ? "translate-x-0" : "translate-x-full"
          )}
        >
          <a
            href="#features"
            className="text-xl font-medium"
            onClick={toggleMobileMenu}
          >
            Why OSCPETS?
          </a>
          <a
            href="#how-it-works"
            className="text-xl font-medium"
            onClick={toggleMobileMenu}
          >
            How It Works
          </a>
          <a
            href="#testimonials"
            className="text-xl font-medium"
            onClick={toggleMobileMenu}
          >
            Testimonials
          </a>
          <a
            href="#faq"
            className="text-xl font-medium"
            onClick={toggleMobileMenu}
          >
            FAQ
          </a>
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSfvJgfxXnMjH989BrdP_4Hcbn6Af1yO152U5yPQZnFACDc57g/viewform?usp=dialog"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary mt-6"
            onClick={toggleMobileMenu}
          >
            Join Community
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
