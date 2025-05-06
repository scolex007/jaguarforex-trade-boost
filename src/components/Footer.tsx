
import { FacebookIcon, TwitterIcon, InstagramIcon, YoutubeIcon, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-jaguarblue-900 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-2xl font-bold mb-4 gradient-text">JaguarForex</h3>
            <p className="text-gray-400 mb-4">
              Premium trading tools and cashback rewards for forex traders worldwide.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-jaguargold transition-colors">
                <FacebookIcon className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-jaguargold transition-colors">
                <TwitterIcon className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-jaguargold transition-colors">
                <InstagramIcon className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-jaguargold transition-colors">
                <YoutubeIcon className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-white text-lg">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#features" className="text-gray-400 hover:text-jaguargold transition-colors">Features</a></li>
              <li><a href="#tools" className="text-gray-400 hover:text-jaguargold transition-colors">Trading Tools</a></li>
              <li><a href="#cashback" className="text-gray-400 hover:text-jaguargold transition-colors">Cashback</a></li>
              <li><a href="#faq" className="text-gray-400 hover:text-jaguargold transition-colors">FAQ</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-white text-lg">Trading Tools</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-jaguargold transition-colors">Expert Advisors</a></li>
              <li><a href="#" className="text-gray-400 hover:text-jaguargold transition-colors">Indicators</a></li>
              <li><a href="#" className="text-gray-400 hover:text-jaguargold transition-colors">Scripts</a></li>
              <li><a href="#" className="text-gray-400 hover:text-jaguargold transition-colors">Trading Calculators</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-white text-lg">Contact Us</h4>
            <ul className="space-y-2">
              <li className="flex items-center text-gray-400">
                <Mail className="h-5 w-5 mr-2 text-jaguargold" />
                support@jaguarforex.com
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-jaguargold transition-colors">Contact Form</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-jaguargold transition-colors">Support Center</a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-jaguarblue-700">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} JaguarForex. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-500 text-sm hover:text-jaguargold transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-gray-500 text-sm hover:text-jaguargold transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-500 text-sm hover:text-jaguargold transition-colors">
                Risk Disclosure
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
