function Footer() {
  return (
    <footer className="w-full bg-gray-50 border-t border-gray-200 py-4 mt-auto">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between px-4">
        <div className="text-gray-600 text-sm mb-2 md:mb-0">
          © 2025 SRM University AP. All rights reserved.
        </div>
        <div className="flex space-x-4 text-sm">
          <a href="/privacy-policy" className="text-gray-500 hover:text-blue-600">Privacy Policy</a>
          <a href="/terms-of-service" className="text-gray-500 hover:text-blue-600">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;