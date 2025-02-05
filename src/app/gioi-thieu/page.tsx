import React from "react";
import Image from "next/image";
import { FaGithub, FaTwitter, FaLinkedin } from "react-icons/fa";

interface Skill {
    name: string;
    icon: string;
}

const skills: Skill[] = [
    {
        name: "React",
        icon: "/icons/react.svg",
    },
    {
        name: "Next.js",
        icon: "/icons/nextjs.svg",
    },
    {
        name: ".NET",
        icon: "/icons/typescript.svg",
    },
    {
        name: "Nodejs",
        icon: "/icons/tailwind.svg",
    },
];

const PortfolioPage = () => {
    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
            {/* Hero Section */}
            <div className="px-6 lg:px-8 mx-auto max-w-7xl pt-24 pb-10">
                <div className="mx-auto max-w-2xl text-center">
                    <div className="relative w-24 h-24 mx-auto mb-8">
                        <Image
                            src="/avatar.jpg"
                            alt="Profile"
                            fill
                            priority
                            sizes="(max-width: 96px) 100vw, 96px"
                            className="rounded-full object-cover"
                        />
                    </div>
                    <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent sm:text-6xl">
                        Lorem ipsum dolor sit amet
                    </h1>
                    <p className="mt-6 text-lg leading-8 text-gray-700">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        <span>😁</span>
                    </p>

                    <div className="mt-8 flex justify-center gap-4">
                        <a
                            href="https://github.com"
                            className="text-blue-600 hover:text-blue-800"
                        >
                            <FaGithub size={24} />
                        </a>
                        <a
                            href="https://twitter.com"
                            className="text-blue-600 hover:text-blue-800"
                        >
                            <FaTwitter size={24} />
                        </a>
                        <a
                            href="https://linkedin.com"
                            className="text-blue-600 hover:text-blue-800"
                        >
                            <FaLinkedin size={24} />
                        </a>
                    </div>
                </div>
            </div>

            {/* Stats Section */}
            <div className="bg-white py-16">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
                        <div className="text-center">
                            <div className="text-4xl font-bold text-blue-600">
                                1+
                            </div>
                            <div className="mt-2 text-base text-gray-700">
                                Lorem ipsum dolor sit amet
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-bold text-purple-600">
                                20+
                            </div>
                            <div className="mt-2 text-base text-gray-700">
                                Lorem ipsum dolor sit amet
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-bold text-indigo-600">
                                4+
                            </div>
                            <div className="mt-2 text-base text-gray-700">
                                Lorem ipsum dolor sit amet
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Skills Section */}
            <div className="bg-white py-16">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-center mb-12 text-purple-600">
                        Lorem ipsum dolor sit amet
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {skills.map((skill, index) => (
                            <div
                                key={index}
                                className="text-center p-6 rounded-lg bg-gray-50 hover:shadow-lg transition-shadow duration-300"
                            >
                                <div className="relative h-12 w-12 mx-auto mb-4">
                                    <Image
                                        src={skill.icon}
                                        alt={skill.name}
                                        fill
                                        sizes="48px"
                                        className="object-contain"
                                    />
                                </div>
                                <h3 className="font-medium text-indigo-600">
                                    {skill.name}
                                </h3>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Contact Section */}
            <div className="py-16 px-6 lg:px-8 mx-auto max-w-7xl">
                <div className="text-center">
                    <h2 className="text-3xl font-bold mb-4 text-blue-600">
                        Lorem ipsum dolor sit amet
                    </h2>
                    <p className="text-gray-700 mb-8">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </p>
                    <a
                        href="https://www.facebook.com/nguyen.inh.869154/"
                        className="inline-block px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full hover:from-blue-700 hover:to-purple-700 transition-colors duration-300"
                    >
                        Get in touch
                    </a>
                </div>
            </div>
        </div>
    );
};

export default PortfolioPage;
