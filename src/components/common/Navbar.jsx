import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { Ellipsis } from "lucide-react"; // Icon dấu ba chấm

function Navbar({ links }) {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 1024);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return isMobile ? (
        <MobileNav links={links} />
    ) : (
        <DesktopNav links={links} />
    );
}

function MobileNav({ links }) {
    const [isOpen, setIsOpen] = useState(false);

    const handleClickOutside = (event) => {
        if (event.target.closest(".mobile-nav") === null) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        if (isOpen) {
            document.addEventListener("click", handleClickOutside);
        } else {
            document.removeEventListener("click", handleClickOutside);
        }
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [isOpen]);

    return (
        <nav className="bg-white p-2 mobile-nav shadow-md">
            <div className="flex justify-center items-center">
                <div onClick={() => setIsOpen(!isOpen)}>
                    <Ellipsis size={20} color="black" />
                </div>
            </div>
            <div
                className={`transition-max-height duration-500 ease-in-out overflow-hidden ${
                    isOpen ? "max-h-screen" : "max-h-0"
                }`}
            >
                <ul className="mt-2 border-t border-gray-200">
                    {links.map((link, index) => (
                        <li
                            key={index}
                            className="text-center text-base py-2 hover:bg-gray-100"
                        >
                            <a
                                href={link.href}
                                className="block text-blue-600 hover:text-blue-800"
                            >
                                {link.text}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
}

function DesktopNav({ links }) {
    return (
        <nav className="bg-white shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                <ul className="flex justify-between w-full">
                    {links.map((link, index) => (
                        <li
                            key={index}
                            className="flex-1 text-center text-base py-2 hover:bg-gray-100"
                        >
                            <a
                                href={link.href}
                                className="block text-blue-600 hover:text-blue-800"
                            >
                                {link.text}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
}

Navbar.propTypes =
    MobileNav.propTypes =
    DesktopNav.propTypes =
        {
            links: PropTypes.arrayOf(
                PropTypes.shape({
                    href: PropTypes.string.isRequired,
                    text: PropTypes.string.isRequired,
                })
            ).isRequired,
        };

export default Navbar;
