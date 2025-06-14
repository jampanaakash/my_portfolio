import React, { useState, useEffect } from 'react';
import { 
  Menu, 
  X, 
  Github, 
  Linkedin, 
  Mail, 
  Phone, 
  Download, 
  ExternalLink,
  Code,
  Database,
  Brain,
  Users,
  Target,
  MessageSquare,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import emailjs from '@emailjs/browser';

const Portfolio = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  // Initialize EmailJS
  useEffect(() => {
    emailjs.init("your_public_key_here"); // Replace with your EmailJS public key
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'skills', 'projects', 'experience', 'education', 'contact'];
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('sending');

    try {
      await emailjs.send(
        'your_service_id', // Replace with your EmailJS service ID
        'your_template_id', // Replace with your EmailJS template ID
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          to_email: 'akashkumarreddy955@gmail.com'
        }
      );
      
      setFormStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setFormStatus('idle'), 5000);
    } catch (error) {
      setFormStatus('error');
      setTimeout(() => setFormStatus('idle'), 5000);
    }
  };

  const skills = {
    technical: [
      { name: 'Python', level: 85 },
      { name: 'JavaScript', level: 80 },
      { name: 'Node.js', level: 75 },
      { name: 'SAP BASIS', level: 70 },
      { name: 'MongoDB', level: 70 },
      { name: 'Java', level: 65 },
      { name: 'OpenCV', level: 60 },
      { name: 'Git', level: 80 }
    ],
    soft: [
      'Problem-Solving',
      'Analytical Thinking',
      'Team Collaboration',
      'Adaptability',
      'Communication',
      'Learning Agility'
    ]
  };

  const projects = [
    {
      title: 'E-Waste Facility Locator',
      description: 'Web app that helps users locate nearby e-waste centers, schedule pickups, and earn rewards. Includes map integration and admin dashboard.',
      tech: ['HTML', 'CSS', 'JavaScript', 'Node.js', 'MongoDB', 'Google Maps API'],
      github: 'https://github.com/jampanaakash/ewaste-facility.github.io',
      live: 'https://jampanaakash.github.io/ewaste-facility.github.io/',
      image: 'https://images.pexels.com/photos/3850512/pexels-photo-3850512.jpeg?auto=compress&cs=tinysrgb&w=500'
    },
    {
      title: 'Object Detection with Audio Feedback',
      description: 'Python-based app that uses OpenCV to detect objects and pyttsx3 for audio feedback. Designed for accessibility support.',
      tech: ['Python', 'OpenCV', 'pyttsx3'],
      github: 'https://github.com/jampanaakash/object-detection-audio-feedback',
      live: null,
      image: 'https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg?auto=compress&cs=tinysrgb&w=500'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Akash Kumar Reddy
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {['hero', 'about', 'skills', 'projects', 'experience', 'education', 'contact'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`capitalize transition-colors duration-200 ${
                    activeSection === section
                      ? 'text-blue-600 font-semibold'
                      : 'text-gray-600 hover:text-blue-600'
                  }`}
                >
                  {section === 'hero' ? 'Home' : section}
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-200/20">
              {['hero', 'about', 'skills', 'projects', 'experience', 'education', 'contact'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className="block w-full text-left py-2 capitalize text-gray-600 hover:text-blue-600 transition-colors duration-200"
                >
                  {section === 'hero' ? 'Home' : section}
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1920')`,
            filter: 'grayscale(100%)'
          }}
        />
        
        {/* Glassmorphism Overlay */}
        <div className="absolute inset-0 bg-white/10 backdrop-blur-sm" />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20" />

        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 sm:p-12 shadow-2xl border border-white/20">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-white mb-6">
              Akash Kumar Reddy
            </h1>
            <p className="text-xl sm:text-2xl text-white/90 mb-8 font-light">
              Aspiring Data Analyst • SAP BASIS Analyst at Deloitte
            </p>
            <p className="text-lg text-white/80 mb-12 max-w-2xl mx-auto leading-relaxed">
              Passionate about transforming data into insights and solving real-world problems 
              through technology and analytical thinking.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={() => scrollToSection('contact')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Get In Touch
              </button>
              <a
                href="/Akash_Resume.pdf"
                download
                className="bg-white/20 hover:bg-white/30 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 border border-white/30 backdrop-blur-sm flex items-center gap-2"
              >
                <Download size={20} />
                Download Resume
              </a>
            </div>

            <div className="flex justify-center space-x-6 mt-12">
              <a
                href="https://github.com/jampanaakash"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/80 hover:text-white transition-colors duration-200 transform hover:scale-110"
              >
                <Github size={28} />
              </a>
              <a
                href="https://linkedin.com/in/jampanaakash"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/80 hover:text-white transition-colors duration-200 transform hover:scale-110"
              >
                <Linkedin size={28} />
              </a>
              <a
                href="mailto:akashkumarreddy955@gmail.com"
                className="text-white/80 hover:text-white transition-colors duration-200 transform hover:scale-110"
              >
                <Mail size={28} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">About Me</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="text-lg text-gray-700 leading-relaxed">
                I'm a B.Tech graduate in Information Technology (2020–2024) with a passion for 
                data analysis and technology. Currently working full-time at Deloitte as an SAP BASIS Analyst, 
                where I've gained valuable experience in system monitoring, performance optimization, and 
                collaborative problem-solving.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                With experience in Python, Node.js, and web technologies, I'm actively transitioning 
                toward a career in data analysis. I completed a 6-month internship before joining Deloitte 
                and have consistently demonstrated strong learning agility and analytical thinking skills.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                My approach combines technical expertise with creative problem-solving, always focusing 
                on real-world applications and user-centered solutions.
              </p>

              <div className="grid grid-cols-2 gap-4 mt-8">
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl">
                  <Code className="text-blue-600 mb-2" size={32} />
                  <h4 className="font-semibold text-gray-900">Technical Skills</h4>
                  <p className="text-gray-600 text-sm">Python, JavaScript, SAP</p>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-blue-50 p-6 rounded-xl">
                  <Brain className="text-green-600 mb-2" size={32} />
                  <h4 className="font-semibold text-gray-900">Analytical Mind</h4>
                  <p className="text-gray-600 text-sm">Data-driven insights</p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-3xl p-8 text-center">
                <div className="w-48 h-48 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full mx-auto mb-6 flex items-center justify-center">
                  <span className="text-6xl font-bold text-white">AK</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Always Learning</h3>
                <p className="text-gray-600">
                  Committed to continuous growth and staying updated with the latest technologies
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Skills & Expertise</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Technical Skills */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Code className="mr-3 text-blue-600" size={28} />
                Technical Skills
              </h3>
              <div className="space-y-4">
                {skills.technical.map((skill, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-2">
                      <span className="font-medium text-gray-700">{skill.name}</span>
                      <span className="text-blue-600 font-semibold">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-1000"
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Soft Skills */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Users className="mr-3 text-green-600" size={28} />
                Soft Skills
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {skills.soft.map((skill, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-br from-green-50 to-blue-50 p-4 rounded-xl text-center hover:shadow-md transition-shadow duration-300"
                  >
                    <span className="font-medium text-gray-800">{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Projects</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="h-48 bg-gradient-to-br from-blue-100 to-purple-100 relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{project.title}</h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex space-x-4">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-gray-700 hover:text-blue-600 transition-colors duration-200"
                    >
                      <Github size={20} className="mr-2" />
                      Code
                    </a>
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-gray-700 hover:text-blue-600 transition-colors duration-200"
                      >
                        <ExternalLink size={20} className="mr-2" />
                        Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Professional Experience</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-start space-x-4">
              <div className="bg-blue-600 rounded-full p-3">
                <Database className="text-white" size={24} />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-gray-900">Analyst – SAP BASIS</h3>
                <p className="text-blue-600 font-semibold mb-2">Deloitte Touche Tohmatsu LLP</p>
                <p className="text-gray-500 mb-4">Jan 2025 – Present</p>
                
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <Target className="mr-3 mt-1 text-blue-600 flex-shrink-0" size={16} />
                    Performed system monitoring, patching, and upgrades for SAP environments
                  </li>
                  <li className="flex items-start">
                    <Target className="mr-3 mt-1 text-blue-600 flex-shrink-0" size={16} />
                    Supported the VIL project during peak loads, ensuring high system efficiency
                  </li>
                  <li className="flex items-start">
                    <Target className="mr-3 mt-1 text-blue-600 flex-shrink-0" size={16} />
                    Collaborated with teams to troubleshoot and maintain system stability
                  </li>
                  <li className="flex items-start">
                    <Target className="mr-3 mt-1 text-blue-600 flex-shrink-0" size={16} />
                    Handled routine administration tasks and performance optimization
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Education</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl shadow-lg p-8 text-center max-w-3xl mx-auto">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full mx-auto mb-6 flex items-center justify-center">
              <span className="text-2xl font-bold text-white">🎓</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Bachelor of Technology</h3>
            <p className="text-lg text-blue-600 font-semibold mb-2">Information Technology</p>
            <p className="text-gray-600 mb-4">MGIT • 2020–2024</p>
            <div className="bg-white rounded-xl p-4 inline-block">
              <span className="text-2xl font-bold text-gray-900">7.2/10</span>
              <p className="text-gray-600 text-sm">CGPA</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Get In Touch</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
            <p className="text-lg text-gray-600 mt-6 max-w-2xl mx-auto">
              I'm always open to discussing new opportunities, collaborations, or just having a chat about technology and data analysis.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Let's Connect</h3>
                
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="bg-blue-100 p-3 rounded-full">
                      <Mail className="text-blue-600" size={24} />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Email</p>
                      <a
                        href="mailto:akashkumarreddy955@gmail.com"
                        className="text-blue-600 hover:text-blue-700 transition-colors duration-200"
                      >
                        akashkumarreddy955@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="bg-blue-100 p-3 rounded-full">
                      <Github className="text-blue-600" size={24} />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">GitHub</p>
                      <a
                        href="https://github.com/jampanaakash"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-700 transition-colors duration-200"
                      >
                        @jampanaakash
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="bg-blue-100 p-3 rounded-full">
                      <Linkedin className="text-blue-600" size={24} />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">LinkedIn</p>
                      <a
                        href="https://linkedin.com/in/jampanaakash"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-700 transition-colors duration-200"
                      >
                        /in/jampanaakash
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <MessageSquare className="mr-3 text-blue-600" size={28} />
                Send Message
              </h3>

              {formStatus === 'success' && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center">
                  <CheckCircle className="text-green-600 mr-3" size={20} />
                  <span className="text-green-800">Message sent successfully! I'll get back to you soon.</span>
                </div>
              )}

              {formStatus === 'error' && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center">
                  <AlertCircle className="text-red-600 mr-3" size={20} />
                  <span className="text-red-800">Failed to send message. Please try again or email me directly.</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                    placeholder="Tell me about your project or just say hello!"
                  />
                </div>

                <button
                  type="submit"
                  disabled={formStatus === 'sending'}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {formStatus === 'sending' ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
              Akash Kumar Reddy
            </div>
            <p className="text-gray-400 mb-6">
              Aspiring Data Analyst • SAP BASIS Analyst at Deloitte
            </p>
            
            <div className="flex justify-center space-x-6 mb-8">
              <a
                href="https://github.com/jampanaakash"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                <Github size={24} />
              </a>
              <a
                href="https://linkedin.com/in/jampanaakash"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                <Linkedin size={24} />
              </a>
              <a
                href="mailto:akashkumarreddy955@gmail.com"
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                <Mail size={24} />
              </a>
            </div>

            <div className="border-t border-gray-800 pt-8">
              <p className="text-gray-400 text-sm">
                © 2025 Akash Kumar Reddy. All rights reserved. Built with React & Tailwind CSS.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;