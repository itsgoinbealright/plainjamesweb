import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-black text-white py-12 px-6">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Column 1 */}
          <div>
            <h3 className="text-xl font-bold mb-4">Plain James</h3>
            <p className="text-gray-400">
              Custom millwork and cabinetry in Winnipeg, Manitoba.
            </p>
          </div>

          {/* Column 2 */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <nav className="space-y-2">
              <Link
                href="/projects"
                className="block text-gray-400 hover:text-forest-green transition-colors"
              >
                Projects
              </Link>
              <Link
                href="/process"
                className="block text-gray-400 hover:text-forest-green transition-colors"
              >
                Process
              </Link>
              <Link
                href="/contact"
                className="block text-gray-400 hover:text-forest-green transition-colors"
              >
                Contact
              </Link>
            </nav>
          </div>

          {/* Column 3 */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact</h3>
            <p className="text-gray-400">Winnipeg, Manitoba</p>
            <p className="text-gray-400">info@plainjames.com</p>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} Plain James. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
