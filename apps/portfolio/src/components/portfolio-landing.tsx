"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Github, Linkedin, Mail, Package, Moon, Sun } from "lucide-react"
import Image from "next/image"



export function PortfolioLanding() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    const isDarkMode = localStorage.getItem("darkMode") === "true"
    setDarkMode(isDarkMode)
    document.documentElement.classList.toggle("dark", isDarkMode)
  }, [])

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode
    setDarkMode(newDarkMode)
    localStorage.setItem("darkMode", newDarkMode.toString())
    document.documentElement.classList.toggle("dark", newDarkMode)
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      <header className="sticky top-0 z-10 bg-white dark:bg-gray-800 shadow-md transition-colors duration-300">
        <nav className="container mx-auto px-6 py-3">
          <div className="flex justify-between items-center">
            <a href="#" className="text-2xl font-bold text-gray-800 dark:text-white transition-colors duration-300">
              Jane Doe
            </a>
            <div className="hidden md:flex items-center space-x-4">
              <a href="#about" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-300">
                About
              </a>
              <a href="#skills" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-300">
                Skills
              </a>
              <a href="#projects" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-300">
                Projects
              </a>
              <a href="#packages" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-300">
                NPM Packages
              </a>
              <a href="#contact" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-300">
                Contact
              </a>
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 transition-colors duration-300"
                aria-label="Toggle dark mode"
              >
                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
            </div>
            <div className="md:hidden flex items-center">
              <button
                onClick={toggleDarkMode}
                className="p-2 mr-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 transition-colors duration-300"
                aria-label="Toggle dark mode"
              >
                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              <button className="text-gray-600 dark:text-gray-300" onClick={toggleMenu}>
                <svg className="w-6 h-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 24" stroke="currentColor">
                  <path d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
              </button>
            </div>
          </div>
          {isMenuOpen && (
            <div className="mt-4 md:hidden">
              <a href="#about" className="block py-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-300">About</a>
              <a href="#skills" className="block py-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-300">Skills</a>
              <a href="#projects" className="block py-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-300">Projects</a>
              <a href="#packages" className="block py-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-300">NPM Packages</a>
              <a href="#contact" className="block py-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-300">Contact</a>
            </div>
          )}
        </nav>
      </header>

      <main>
        <section className="py-20 bg-white dark:bg-gray-800 transition-colors duration-300">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <h1 className="text-4xl md:text-6xl font-bold text-gray-800 dark:text-white mb-4 transition-colors duration-300">
                Jane Doe
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 transition-colors duration-300">
                Lead Engineer | TypeScript Enthusiast | Next.js Expert
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto transition-colors duration-300">
                Passionate about building scalable web applications and creating developer-friendly npm packages.
                Aspiring to become a principal engineer and drive technical excellence.
              </p>
            </motion.div>
          </div>
        </section>

        <section id="about" className="py-20 bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row items-center justify-center gap-12">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="w-64 h-64 rounded-full overflow-hidden shadow-lg"
              >
                <Image
                  src="/placeholder.svg?height=256&width=256"
                  alt="Jane Doe"
                  width={256}
                  height={256}
                  className="object-cover w-full h-full"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="max-w-lg"
              >
                <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4 transition-colors duration-300">
                  About Me
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4 transition-colors duration-300">
                  Hi, I'm Jane Doe, a lead engineer with over 10 years of experience in web development. I specialize in TypeScript, React, and Next.js, and I'm passionate about creating efficient, scalable, and user-friendly web applications.
                </p>
                <p className="text-gray-600 dark:text-gray-400 mb-4 transition-colors duration-300">
                  My journey in tech started with a fascination for problem-solving and has evolved into a career focused on pushing the boundaries of what's possible on the web. I'm constantly learning and sharing my knowledge through open-source contributions and npm packages.
                </p>
                <p className="text-gray-600 dark:text-gray-400 transition-colors duration-300">
                  When I'm not coding, you can find me hiking in the mountains, reading sci-fi novels, or experimenting with new cooking recipes. I believe in maintaining a healthy work-life balance and bringing fresh perspectives to my work.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        <section id="skills" className="py-20 bg-white dark:bg-gray-800 transition-colors duration-300">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-8 transition-colors duration-300">
              Skills & Technologies
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {["TypeScript", "Next.js", "React", "Tailwind CSS", "Node.js", "GraphQL", "Jest", "CI/CD"].map((skill, index) => (
                <motion.div
                  key={skill}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-gray-100 dark:bg-gray-900 rounded-lg shadow-md p-6 text-center transition-colors duration-300"
                >
                  <p className="text-lg font-semibold text-gray-700 dark:text-gray-300 transition-colors duration-300">{skill}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="projects" className="py-20 bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-8 transition-colors duration-300">
              Featured Projects
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  title: "E-commerce Platform",
                  description: "A scalable e-commerce solution built with Next.js, TypeScript, and GraphQL.",
                  link: "#"
                },
                {
                  title: "Developer Dashboard",
                  description: "An analytics dashboard for developers to monitor their npm package usage.",
                  link: "#"
                }
              ].map((project, index) => (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-colors duration-300"
                >
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2 transition-colors duration-300">{project.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4 transition-colors duration-300">{project.description}</p>
                  <a href={project.link} className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-300">
                    Learn more →
                  </a>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="packages" className="py-20 bg-white dark:bg-gray-800 transition-colors duration-300">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-8 transition-colors duration-300">
              NPM Packages
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { name: "ts-utils", downloads: "500k+", description: "A collection of TypeScript utilities" },
                { name: "react-nextjs-components", downloads: "250k+", description: "Reusable React components for Next.js" },
                { name: "tailwind-themes", downloads: "100k+", description: "Easy theming for Tailwind CSS" }
              ].map((pkg, index) => (
                <motion.div
                  key={pkg.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-gray-100 dark:bg-gray-900 rounded-lg shadow-md p-6 transition-colors duration-300"
                >
                  <div className="flex items-center mb-4">
                    <Package className="w-6 h-6 text-blue-500 mr-2" />
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-white transition-colors duration-300">{pkg.name}</h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 mb-2 transition-colors duration-300">{pkg.description}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-500 transition-colors duration-300">{pkg.downloads} downloads</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="py-20 bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-8 transition-colors duration-300">
              Get in Touch
            </h2>
            <div className="flex justify-center space-x-4">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-300">
                <Github className="w-8 h-8" />
                <span className="sr-only">GitHub</span>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-300">
                <Linkedin className="w-8 h-8" />
                <span className="sr-only">LinkedIn</span>
              </a>
              <a href="mailto:jane@example.com" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-300">
                <Mail className="w-8 h-8" />
                <span className="sr-only">Email</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-white dark:bg-gray-800 py-8 transition-colors duration-300">
        <div className="container mx-auto px-6 text-center">
          <p className="text-gray-600 dark:text-gray-400 transition-colors duration-300">
            © {new Date().getFullYear()} Jane Doe. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
