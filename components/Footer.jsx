import Link from "next/link";

export default function Footer() {
  return (
    <footer className="text-white py-24 px-6" style={{ backgroundColor: '#9E3A26' }}>
      <div className="container mx-auto pt-[5vh]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-16">
          {/* Column 1 */}
          <div>
            <h3 className="text-2xl font-bold mb-6">Plain James</h3>
            <p className="text-gray-200 text-lg">
              Custom millwork and cabinetry in Winnipeg, Manitoba.
            </p>
          </div>

          {/* Column 2 */}
          <div>
            <h3 className="text-2xl font-bold mb-6">Quick Links</h3>
            <nav className="space-y-4">
              <Link
                href="/projects"
                className="block text-gray-200 text-lg hover:text-white transition-colors"
              >
                Projects
              </Link>
              <Link
                href="/process"
                className="block text-gray-200 text-lg hover:text-white transition-colors"
              >
                Process
              </Link>
              <Link
                href="/contact"
                className="block text-gray-200 text-lg hover:text-white transition-colors"
              >
                Contact
              </Link>
            </nav>
          </div>

          {/* Column 3 */}
          <div>
            <h3 className="text-2xl font-bold mb-6">Contact</h3>
            <p className="text-gray-200 text-lg">Winnipeg, Manitoba</p>
            <p className="text-gray-200 text-lg">info@plainjames.com</p>
          </div>
        </div>

        <div className="border-t border-white/20 pt-16 text-center text-gray-200">
          <p className="text-lg">
            &copy; {new Date().getFullYear()} Plain James. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}