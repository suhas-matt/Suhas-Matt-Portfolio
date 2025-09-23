import React, { useState, useEffect } from 'react';
import { Briefcase, GraduationCap, Code, Server, Wrench, Mail, Phone, MapPin, Linkedin, Github, ChevronDown, Send, User, MessageSquare, Instagram, Facebook } from 'lucide-react';
import emailjs from "emailjs-com";
import javaLogo from './Images/java-4.svg';
import cLogo from './Images/c.svg';
import cppLogo from './Images/c++.svg';
import pythonLogo from './Images/python.svg';
import htmlLogo from './Images/html.svg';
import cssLogo from './Images/css.svg';
import springBootLogo from './Images/spring-boot.svg';
import hibernateLogo from './Images/hibernate.svg';
import mysqlLogo from './Images/mysql.svg';
import gitLogo from './Images/git.svg';
import githubLogo from './Images/github.svg';
import jenkinsLogo from './Images/jenkins.svg';
import dockerLogo from './Images/docker.svg';
import kubernetesLogo from './Images/kubernets.svg';
import awsLogo from './Images/aws.svg';
import prometheusLogo from './Images/prometheus.svg';
import grafanaLogo from './Images/grafana.svg';
import eclipseLogo from './Images/eclipse.svg';
import stsLogo from './Images/sts.svg';
import windowsLogo from './Images/windows.svg';
import linuxLogo from './Images/linux.svg';
// Resume data extracted from the document
const portfolioData = {
  name: "Suhas Matt M S",
  title: "Aspiring DevOps & Cloud Engineer",
  contact: {
    phone: "+91-8150803062",
    email: "suhasmattms@gmail.com",
    location: "Bengaluru, India",
    linkedin: "https://www.linkedin.com/in/suhas-matt/",
    github: "https://github.com/suhas-matt",
    instagram: "https://www.instagram.com/suhas_matt/",
    facebook: "https://www.facebook.com/suhasmatt/",
  },
  objective: "I have achieved a Master of Computer Applications degree at Dayananda Sagar Academy of Technology and Management under VTU with a CGPA of 8.82. Previously, I completed my B.Sc. in Applied Science through Kuvempu University achieving 69.5%. In 2025, I undertook a DevOps Engineering Internship at SST Technologies, Bengaluru, during which I acquired practical experience building CI/CD pipelines with Jenkins, containerizing applications using Docker, deploying in Kubernetes, provisioning AWS infrastructure, and implementing monitoring solutions based on Prometheus along with Grafana. I am proficient in C, C++, Java, Python, and SQL, and I have experience with frameworks including Spring Boot and Hibernate. Among other projects, I developed a car damage detection using CNN, a DevOps monitoring stack, and a CI/CD pipeline for a full-stack web-app. These projects demonstrate I am able to contribute to both software development practices along with DevOps practices.",
  experience: [
    {
      role: "DevOps Engineering Intern",
      company: "SST Technologies, Bengaluru",
      period: "May 2025 – Aug 2025",
      description: [
        "Built and automated CI/CD pipelines using Jenkins (pipeline-as-code with Groovy).",
        "Containerized applications with Docker and orchestrated using Kubernetes.",
        "Provisioned cloud infrastructure with AWS (EC2, VPC, S3, IAM).",
        "Implemented monitoring solutions with Prometheus and Grafana dashboards.",
        "Collaborated in code reviews, retrospectives, and a capstone project integrating CI/CD, containerization, and   monitoring tools.",
      ],
    },
  ],
  education: [
    {
      degree: "Master of Computer Applications (MCA)",
      institution: "Dayananda Sagar Academy of Technology and Management, Bangalore",
      university: "Visvesvaraya Technological University (VTU), Belgaum",
      period: "2025 – 8.82 CGPA",
    },
    {
      degree: "Bachelor of Science (B.Sc.) – Applied Science",
      institution: "S R N M National College for Applied Science, Shivamogga",
      university: "Kuvempu University, Karnataka",
      period: "2023 – 69.5%",
    },
    {
      degree: "PUC (12th Board)",
      institution: "H. S Rudrappa National PU College, Shivamogga",
      university: "Department of Pre-University Education, Karnataka",
      period: "2019 – 55%",
    },
    {
      degree: "SSLC (10th Board)",
      institution: "Taralabalu High School, Nallur, Karnataka",
      university: "Karnataka Secondary Education Examination Board",
      period: "2017 – 77.76%",
    },
  ],
  skills: {
    programming: ["C", "C++", "Java", "Python", "HTML", "CSS", "Spring Boot", "Hibernate", "MySQL"],
    devopsCloud: ["Git", "GitHub", "Jenkins", "Docker", "Kubernetes", "AWS", "Prometheus", "Grafana"],
    toolsOS: ["Eclipse", "STS", "Windows", "Linux"],
  },
  projects: [
    {
      title: "CNN-Based Car Damage Detection System",
      description: "Built a Convolutional Neural Network (CNN) model to detect and classify car damages from images, showcasing machine learning application.",
    },
    {
      title: "DevOps Monitoring Stack",
      description: "Deployed a comprehensive monitoring solution using Prometheus, Time Series Database, and Grafana on Kubernetes for scalable monitoring and insightful dashboards.",
    },
    {
      title: "CI/CD Pipeline for Full-Stack App",
      description: "Automated the build, test, and deployment process for a full-stack application using GitHub Actions, Jenkins, Docker, and AWS services.",
    },
  ],
};


// --- Helper Components ---
const Section = ({ id, title, icon, children, className = '' }) => (
  <section id={id} className={`py-16 md:py-24 px-4 sm:px-6 lg:px-8 ${className}`}>
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center mb-8">
        {icon}
        <h2 className="text-3xl md:text-4xl font-bold text-slate-100 ml-4">{title}</h2>
      </div>
      {children}
    </div>
  </section>
);

const SkillBadge = ({ skill }) => (
  <span className="inline-block bg-teal-400/10 text-teal-300 text-sm font-medium px-4 py-2 rounded-full transition-transform duration-300 hover:scale-105 hover:bg-teal-400/20">
    {skill}
  </span>
);

const SkillCard = ({ skill, image, isImage = false }) => (
  <div className="flex flex-col items-center justify-center p-4 bg-slate-800/50 rounded-lg hover:bg-slate-700/50 transition-colors duration-300 group">
    <div className="mb-3 group-hover:scale-110 transition-transform duration-300">
      {isImage ? (
        <img 
          src={image} 
          alt={`${skill} logo`} 
          className="w-12 h-12 object-contain"
        />
      ) : (
        <span className="text-4xl">{image}</span>
      )}
    </div>
    <span className="text-sm font-medium text-slate-300 text-center">{skill}</span>
  </div>
);


// --- Main Components ---
const AppHeader = ({ setActiveSection }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navLinks = ["About", "Experience", "Skills", "Projects", "Education", "Contact"];

  const handleLinkClick = (sectionId) => {
    setIsOpen(false);
    const element = document.getElementById(sectionId.toLowerCase());
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 70, // offset for header height
        behavior: 'smooth',
      });
      setActiveSection(sectionId.toLowerCase());
    }
  };
  
  return (
    <header className="bg-slate-900/80 backdrop-blur-sm sticky top-0 z-50 shadow-lg shadow-black/20">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <a href="#hero" onClick={() => handleLinkClick('hero')} className="text-2xl font-bold text-white transition-colors hover:text-teal-400">
              {portfolioData.name}
            </a>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navLinks.map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={() => handleLinkClick(item.toLowerCase())}
                  className="text-slate-300 hover:bg-slate-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-all duration-300"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-white hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-white"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </nav>
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={() => handleLinkClick(item.toLowerCase())}
                className="text-slate-300 hover:bg-slate-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium transition-all duration-300"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};


const Hero = () => (
  <section id="hero" className="min-h-screen flex items-center justify-center bg-slate-900 text-white relative overflow-hidden">
     <div className="absolute inset-0 bg-grid-slate-800/20 [mask-image:linear-gradient(to_bottom,white_5%,transparent_90%)]"></div>
     <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent"></div>
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center z-10">
      {/* Left side - Text content */}
      <div className="text-left">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4 tracking-tight leading-none whitespace-nowrap">
          {portfolioData.name}
        </h1>
        <p className="text-xl md:text-2xl text-teal-400 mb-8 font-light">
          {portfolioData.title}
        </p>
      </div>
      
      {/* Right side - Profile picture placeholder */}
      <div className="flex justify-center lg:justify-end">
        <div className="w-80 h-80 bg-slate-800/50 rounded-3xl border-2 border-teal-400/30 flex items-center justify-center shadow-2xl">
          <div className="text-center text-slate-400">
            <div className="w-32 h-32 bg-slate-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-6xl">👨‍💻</span>
            </div>
            <p className="text-sm">Your Profile Picture</p>
          </div>
        </div>
      </div>
    </div>
  </section>
);


const About = () => (
  <Section id="about" title="About Me" icon={<span className="text-4xl">📜</span>} className="bg-slate-900/50">
    <div className="bg-slate-800/50 p-6 rounded-lg shadow-lg hover:shadow-teal-400/10 transition-shadow duration-300">
      <p className="text-slate-400 text-base">
        {portfolioData.objective}
      </p>
    </div>
  </Section>
);


const Experience = () => (
    <Section id="experience" title="Experience" icon={<Briefcase size={36} className="text-teal-400" />} className="bg-slate-900/50">
        <div className="space-y-8">
            {portfolioData.experience.map((job, index) => (
                <div key={index} className="bg-slate-800/50 p-6 rounded-lg shadow-lg hover:shadow-teal-400/10 transition-shadow duration-300">
                    <p className="text-sm text-slate-400 mb-1">{job.period}</p>
                    <h3 className="text-2xl font-bold text-teal-300">{job.role}</h3>
                    <p className="text-lg font-semibold text-slate-300 mb-4">{job.company}</p>
                    <ul className="list-disc list-outside pl-6 text-slate-400 space-y-2">
  {job.description.map((point, i) => (
    <li key={i} className="text-justify">{point}</li>
  ))}
</ul>

                </div>
            ))}
        </div>
    </Section>
);

// Skill images and emojis mapping
const skillImages = {
  // Programming Languages
  'C': { image: cLogo, isImage: true },
  'C++': { image: cppLogo, isImage: true },
  'Java': { image: javaLogo, isImage: true },
  'Python': { image: pythonLogo, isImage: true },
  'SQL': { image: '🗄️', isImage: false },
  'HTML': { image: htmlLogo, isImage: true },
  'CSS': { image: cssLogo, isImage: true },
  'Spring Boot': { image: springBootLogo, isImage: true },
  'Hibernate': { image: hibernateLogo, isImage: true },
  'MySQL': { image: mysqlLogo, isImage: true },
  
  // DevOps & Cloud
  'Git': { image: gitLogo, isImage: true },
  'GitHub': { image: githubLogo, isImage: true },
  'Jenkins': { image: jenkinsLogo, isImage: true },
  'Docker': { image: dockerLogo, isImage: true },
  'Kubernetes': { image: kubernetesLogo, isImage: true },
  'AWS': { image: awsLogo, isImage: true },
  'Prometheus': { image: prometheusLogo, isImage: true },
  'Grafana': { image: grafanaLogo, isImage: true },
  
  // Tools & OS
  'Eclipse': { image: eclipseLogo, isImage: true },
  'IntelliJ IDEA': { image: '💡', isImage: false },
  'Maven': { image: '🏗️', isImage: false },
  'STS': { image: stsLogo, isImage: true },
  'Windows': { image: windowsLogo, isImage: true },
  'Linux': { image: linuxLogo, isImage: true }
};

const Skills = () => (
  <Section id="skills" title="Technical Skills" icon={<Code size={36} className="text-teal-400" />}>
    <div className="space-y-12">
      <div>
        <h3 className="text-xl font-semibold text-slate-200 mb-6 flex items-center">
          <span className="mr-3 text-2xl">👨‍💻</span> Programming & Frameworks
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {portfolioData.skills.programming.map(skill => {
            const skillData = skillImages[skill] || { image: '💻', isImage: false };
            return (
              <SkillCard 
                key={skill} 
                skill={skill} 
                image={skillData.image} 
                isImage={skillData.isImage}
              />
            );
          })}
        </div>
      </div>
       <div>
        <h3 className="text-xl font-semibold text-slate-200 mb-6 flex items-center">
          <Server size={24} className="mr-3 text-teal-400"/> DevOps & Cloud
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {portfolioData.skills.devopsCloud.map(skill => {
            const skillData = skillImages[skill] || { image: '🔧', isImage: false };
            return (
              <SkillCard 
                key={skill} 
                skill={skill} 
                image={skillData.image} 
                isImage={skillData.isImage}
              />
            );
          })}
        </div>
      </div>
       <div>
        <h3 className="text-xl font-semibold text-slate-200 mb-6 flex items-center">
          <Wrench size={24} className="mr-3 text-teal-400"/> Tools & Operating Systems
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {portfolioData.skills.toolsOS.map(skill => {
            const skillData = skillImages[skill] || { image: '🛠️', isImage: false };
            return (
              <SkillCard 
                key={skill} 
                skill={skill} 
                image={skillData.image} 
                isImage={skillData.isImage}
              />
            );
          })}
        </div>
      </div>
    </div>
  </Section>
);

const Projects = () => (
    <Section id="projects" title="Projects" icon={<Briefcase size={36} className="text-teal-400" />} className="bg-slate-900/50">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolioData.projects.map((project, index) => (
                <div key={index} className="bg-slate-800 p-6 rounded-lg shadow-lg flex flex-col transform hover:-translate-y-2 transition-transform duration-300">
                    <h3 className="text-xl font-bold text-teal-300 mb-3">{project.title}</h3>
                    <p className="text-slate-400 flex-grow">{project.description}</p>
                </div>
            ))}
        </div>
    </Section>
);

const Education = () => (
  <Section id="education" title="Education" icon={<GraduationCap size={36} className="text-teal-400" />}>
    <div className="space-y-8">
      {portfolioData.education.map((edu, index) => (
        <div key={index} className="bg-slate-800/50 p-6 rounded-lg shadow-lg">
          <p className="text-sm text-slate-400 mb-1">{edu.period}</p>
          <h3 className="text-xl font-bold text-teal-300">{edu.degree}</h3>
          <p className="text-md font-semibold text-slate-300">{edu.institution}</p>
           <p className="text-md text-slate-400">{edu.university}</p>
        </div>
      ))}
    </div>
  </Section>
);

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');

  // Initialize EmailJS
  useEffect(() => {
    emailjs.init('DST_jRvqwJajKMWOr');
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('');

    try {
      // EmailJS configuration
      const serviceId = 'service_zkrwadj';
      const templateId = 'template_ty9ohmc';
      const publicKey = 'DST_jRvqwJajKMWOr';

      const templateParams = {
        from_name: formData.name.split(' ')[0] || formData.name, // First name
        last_name: formData.name.split(' ').slice(1).join(' ') || '', // Last name
        email: formData.email,
        phone_number: formData.phone,
        message: formData.message
      };

      await emailjs.send(serviceId, templateId, templateParams, publicKey);
      
      setSubmitStatus('success');
      setFormData({ name: '', email: '', phone: '', message: '' });
      // Reset success status after 5 seconds
      setTimeout(() => setSubmitStatus(''), 5000);
    } catch (error) {
      console.error('Error sending email:', error);
      setSubmitStatus('error');
      // Reset status after 5 seconds
      setTimeout(() => setSubmitStatus(''), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Section id="contact" title="Get In Touch" icon={<Mail size={36} className="text-teal-400" />} className="bg-slate-900/50">
      <div className="grid lg:grid-cols-2 gap-12">
        {/* Contact Form */}
        <div className="bg-slate-800/50 p-8 rounded-lg shadow-lg">
          <h3 className="text-2xl font-bold text-teal-300 mb-6 flex items-center">
            <MessageSquare size={24} className="mr-3" />
            Send me a message
          </h3>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">
                <User size={16} className="inline mr-2" />
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors"
                placeholder="Your name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                <Mail size={16} className="inline mr-2" />
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors"
                placeholder="name.email@example.com"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-slate-300 mb-2">
                <Phone size={16} className="inline mr-2" />
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors"
                placeholder="+91-9100000000"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-2">
                <MessageSquare size={16} className="inline mr-2" />
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors resize-none"
                placeholder="Write your message here..."
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-teal-500 hover:bg-teal-600 disabled:bg-slate-600 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300 flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Sending...
                </>
              ) : (
                <>
                  <Send size={16} />
                  Send Message
                </>
              )}
            </button>

            {submitStatus === 'success' && (
              <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg text-green-300">
                ✅ Message sent successfully! I'll get back to you soon.
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-300">
                ❌ Failed to send message. Please try again or contact me directly.
              </div>
            )}
          </form>
        </div>

        {/* Contact Info */}
        <div className="space-y-8">
          <div>
            <h3 className="text-2xl font-bold text-teal-300 mb-6">Let's Connect</h3>
            <p className="text-lg text-slate-300 mb-8">
              I'm currently seeking new opportunities and would love to hear from you. 
              Feel free to reach out via the form, email, phone, or connect with me on social media.
            </p>
          </div>

          <div className="space-y-6">
            <a 
              href={`mailto:${portfolioData.contact.email}`} 
              className="flex items-center text-slate-300 hover:text-teal-400 transition-colors group"
            >
              <div className="w-12 h-12 bg-slate-700 rounded-lg flex items-center justify-center mr-4 group-hover:bg-teal-500/20 transition-colors">
                <Mail size={20} />
              </div>
              <div>
                <p className="font-medium">Email</p>
                <p className="text-sm text-slate-400">{portfolioData.contact.email}</p>
              </div>
            </a>

            <a 
              href={`tel:${portfolioData.contact.phone.replace(/-/g, '')}`} 
              className="flex items-center text-slate-300 hover:text-teal-400 transition-colors group"
            >
              <div className="w-12 h-12 bg-slate-700 rounded-lg flex items-center justify-center mr-4 group-hover:bg-teal-500/20 transition-colors">
                <Phone size={20} />
              </div>
              <div>
                <p className="font-medium">Phone</p>
                <p className="text-sm text-slate-400">{portfolioData.contact.phone}</p>
              </div>
            </a>

            <div className="flex items-center text-slate-300 group">
              <div className="w-12 h-12 bg-slate-700 rounded-lg flex items-center justify-center mr-4 group-hover:bg-teal-500/20 transition-colors">
                <MapPin size={20} />
              </div>
              <div>
                <p className="font-medium">Location</p>
                <p className="text-sm text-slate-400">{portfolioData.contact.location}</p>
              </div>
            </div>
          </div>

          <div className="pt-6">
            <p className="text-slate-300 mb-4">Follow me on social media</p>
            <div className="flex gap-4">
              <a 
                href={portfolioData.contact.linkedin} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-12 h-12 bg-slate-700 rounded-lg flex items-center justify-center text-slate-400 hover:text-teal-400 hover:bg-teal-500/20 transition-colors"
                title="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
              <a 
                href={portfolioData.contact.github} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-12 h-12 bg-slate-700 rounded-lg flex items-center justify-center text-slate-400 hover:text-teal-400 hover:bg-teal-500/20 transition-colors"
                title="GitHub"
              >
                <Github size={20} />
              </a>
              <a 
                href={portfolioData.contact.instagram} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-12 h-12 bg-slate-700 rounded-lg flex items-center justify-center text-slate-400 hover:text-teal-400 hover:bg-teal-500/20 transition-colors"
                title="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a 
                href={portfolioData.contact.facebook} 
          target="_blank"
          rel="noopener noreferrer"
                className="w-12 h-12 bg-slate-700 rounded-lg flex items-center justify-center text-slate-400 hover:text-teal-400 hover:bg-teal-500/20 transition-colors"
                title="Facebook"
              >
                <Facebook size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

const Footer = () => (
    <footer className="bg-slate-900 py-6 text-center text-slate-500">
        <p>&copy; {new Date().getFullYear()} {portfolioData.name}. All Rights Reserved.</p>
    </footer>
);


// --- Main App Component ---
export default function App() {
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    // You can add logic here to track scroll and update active section if needed
  }, []);

  return (
    <div className="bg-slate-900 font-sans leading-normal tracking-tight">
      <AppHeader setActiveSection={setActiveSection} />
      <main>
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <Education />
        <Contact />
      </main>
      <Footer />
    </div>
  );

}