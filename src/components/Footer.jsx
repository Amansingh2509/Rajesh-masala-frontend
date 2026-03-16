const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
            Rajesh Masala
          </h3>
          <p className="text-gray-400 mb-4">
            Premium provisions marketplace for quality-conscious customers and
            trusted owners.
          </p>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-white">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
              </svg>
            </a>
          </div>
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-gray-400">
            <li>
              <a href="/" className="hover:text-white transition-colors">
                Home
              </a>
            </li>
            <li>
              <a
                href="/user/login"
                className="hover:text-white transition-colors"
              >
                User Login
              </a>
            </li>
            <li>
              <a
                href="/owner/login"
                className="hover:text-white transition-colors"
              >
                Owner Login
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors">
                Contact
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-4">Services</h4>
          <ul className="space-y-2 text-gray-400">
            <li>
              <a href="#" className="hover:text-white transition-colors">
                Rice & Grains
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors">
                Pulses & Dals
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors">
                Spices
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors">
                Ghee & Oils
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
          <p className="text-gray-400 mb-2">Rajesh Masala Agency</p>
          <p className="text-gray-400 mb-2">+91 98765 43210</p>
          <p className="text-gray-400">contact@rajeshmasala.com</p>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400 text-sm">
        © 2024 Rajesh Masala. All rights reserved. | Premium Provisions
        Marketplace
      </div>
    </footer>
  );
};

export default Footer;
