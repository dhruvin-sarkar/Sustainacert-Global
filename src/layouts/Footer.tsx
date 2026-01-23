import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Linkedin, Twitter, Facebook } from 'lucide-react';

const quickLinks = [
  { name: 'Home', href: '/' },
  { name: 'About Us', href: '/about-us' },
  { name: 'Services', href: '/services' },
  { name: 'News & Blogs', href: '/news-blogs' },
  { name: 'Contact', href: '/contact-us' },
];

const resourceLinks = [
  { name: 'News', href: '/news' },
  { name: 'Blogs', href: '/blogs' },
  { name: 'Quality Policy', href: '/quality-policy' },
  { name: 'Apply for Certification', href: '/apply' },
  { name: 'Verify Certification', href: '/verify' },
];

export default function Footer() {
  return (
    <footer className="bg-gable-green text-tiara">
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">S</span>
              </div>
              <span className="font-bold text-xl tracking-tight text-tiara">
                SUSTAINACERT
              </span>
            </Link>
            <p className="text-gothic text-sm leading-relaxed mb-6">
              An independent global certification, inspection, and verification body focused on sustainability, ethical sourcing, and quality assurance across international supply chains.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-casal/50 flex items-center justify-center hover:bg-primary transition-colors"
              >
                <Linkedin size={18} />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-casal/50 flex items-center justify-center hover:bg-primary transition-colors"
              >
                <Twitter size={18} />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-casal/50 flex items-center justify-center hover:bg-primary transition-colors"
              >
                <Facebook size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-tiara mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-gothic text-sm hover:text-mountain-meadow transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold text-tiara mb-6">Resources</h4>
            <ul className="space-y-3">
              {resourceLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-gothic text-sm hover:text-mountain-meadow transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-tiara mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Mail size={18} className="text-mountain-meadow mt-0.5 flex-shrink-0" />
                <div className="text-sm">
                  <a href="mailto:compliance@sustanacert.com" className="text-gothic hover:text-tiara block">
                    compliance@sustanacert.com
                  </a>
                  <a href="mailto:info@sustanacert.com" className="text-gothic hover:text-tiara block">
                    info@sustanacert.com
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-mountain-meadow flex-shrink-0" />
                <a href="tel:+971569397516" className="text-gothic text-sm hover:text-tiara">
                  +971 56 939 7516
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-mountain-meadow mt-0.5 flex-shrink-0" />
                <span className="text-gothic text-sm">
                  2501, Iris Bay, Business Bay,<br />Dubai, UAE
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-casal/50 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gothic text-sm">
            © {new Date().getFullYear()} SUSTAINACERT International. All rights reserved.
          </p>
          <p className="text-gothic text-sm">
            Global Standards, Trusted Certification
          </p>
        </div>
      </div>
    </footer>
  );
}
