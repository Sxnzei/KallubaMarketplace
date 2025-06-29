import { Gem, Shield, Globe } from "lucide-react";

export default function Footer() {
  const footerLinks = {
    marketplace: [
      "Gaming Accounts",
      "Streaming Services", 
      "Gift Cards",
      "Software Licenses",
      "Digital Assets"
    ],
    support: [
      "Help Center",
      "Contact Us",
      "Safety & Security",
      "Report an Issue",
      "Community Guidelines"
    ],
    company: [
      "About Us",
      "Privacy Policy",
      "Terms of Service",
      "Cookie Policy",
      "Careers"
    ]
  };

  return (
    <footer className="bg-kalluba-dark border-t border-kalluba-darker py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-kalluba-gold to-kalluba-blue rounded-lg flex items-center justify-center">
                <Gem className="text-kalluba-navy text-sm" size={16} />
              </div>
              <span className="text-xl font-bold text-gradient-gold">Kalluba</span>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              The world's leading marketplace for digital assets, premium accounts, and exclusive subscriptions.
            </p>
            <div className="flex space-x-4">
              {["twitter", "facebook", "discord", "telegram"].map((social) => (
                <a 
                  key={social}
                  href="#" 
                  className="text-gray-400 hover:text-kalluba-gold transition-colors"
                  aria-label={`Follow on ${social}`}
                >
                  <span className="text-sm">#{social}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Marketplace */}
          <div>
            <h4 className="font-bold text-white mb-4">Marketplace</h4>
            <ul className="space-y-2 text-sm">
              {footerLinks.marketplace.map((link, index) => (
                <li key={index}>
                  <a href="#" className="text-gray-400 hover:text-kalluba-gold transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-bold text-white mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              {footerLinks.support.map((link, index) => (
                <li key={index}>
                  <a href="#" className="text-gray-400 hover:text-kalluba-gold transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-bold text-white mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <a href="#" className="text-gray-400 hover:text-kalluba-gold transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-kalluba-darker pt-8 mt-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <p className="text-gray-400 text-sm">
              © 2024 Kalluba. All rights reserved.
            </p>
            <div className="flex items-center space-x-6 mt-4 md:mt-0">
              <div className="flex items-center space-x-2">
                <Shield className="text-green-400" size={16} />
                <span className="text-gray-400 text-sm">SSL Secured</span>
              </div>
              <div className="flex items-center space-x-2">
                <Globe className="text-green-400" size={16} />
                <span className="text-gray-400 text-sm">256-bit Encryption</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
