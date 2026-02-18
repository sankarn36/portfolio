import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

function Home() {
  const heroRef = useRef(null);
  const marqueeRef = useRef(null);
  const skillsRef = useRef(null);
  const gridRef = useRef(null);
  const detailedRef = useRef(null);
  const navRef = useRef(null);
  const footerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Navbar Animation
      gsap.fromTo(navRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power4.out", delay: 0.2 }
      );

      // Hero Animation
      gsap.fromTo(
        heroRef.current.children,
        { y: 100, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, duration: 1.2, stagger: 0.15, ease: "power4.out", delay: 0.4 }
      );

      // Marquee Animation
      gsap.to(marqueeRef.current, {
        xPercent: -50,
        repeat: -1,
        duration: 15,
        ease: "linear",
      });

      // Skills Animation - INDIVIDUAL TRIGGERS
      // Ensuring each tech item animates in reliably
      const skills = gsap.utils.toArray(skillsRef.current.children);
      skills.forEach((skill, i) => {
        gsap.from(skill, {
          scrollTrigger: {
            trigger: skill,
            start: "top 95%", // Trigger as soon as it enters viewport
            toggleActions: "play none none none",
          },
          y: 30,
          opacity: 0,
          duration: 0.5,
          delay: i * 0.05, // Slight delay for a ripple effect
          ease: "back.out(1.7)"
        });
      });

      // Projects Grid Animation - INDIVIDUAL TRIGGERS
      // This ensures 3rd and 4th projects animate even if the container is tall
      const projects = gsap.utils.toArray(gridRef.current.children);
      projects.forEach((project) => {
        gsap.from(project, {
          scrollTrigger: {
            trigger: project,
            start: "top 90%", // Triggers as soon as it enters viewport
            toggleActions: "play none none none",
          },
          y: 50,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
        });
      });

      // Detailed Projects Animation
      const details = gsap.utils.toArray(detailedRef.current.children);
      details.forEach((detail, i) => {
        gsap.from(detail, {
          scrollTrigger: {
            trigger: detail,
            start: "top 85%",
            toggleActions: "play none none none",
          },
          x: i % 2 === 0 ? -50 : 50, // Alternate entry from left/right
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
        });
      });

      // Footer Animation
      gsap.from(footerRef.current, {
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top bottom",
          toggleActions: "play none none none",
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
      });
    });

    return () => ctx.revert(); // Cleanup
  }, []);

  const techStack = [
    "PYTHON", "HTML5", "CSS3", "JAVASCRIPT", "BOOTSTRAP 5", "REACT.JS", "PHP", "MYSQL", "TAILWIND", "GIT"
  ];

  const detailedProjects = [
    {
      title: "Mahalakshmi Multispeciality Hospital Website",
      tech: ["HTML5", "CSS", "Bootstrap 5", "PHP"],
      description: [
        "Designed patient-friendly interface with optimized navigation.",
        "Implemented PHP-based dynamic pages.",
        "Implemented appointment and enquiry forms using PHP."
      ]
    },
    {
      title: "Task Management System",
      tech: ["React", "Express JS", "Node JS", "MongoDB"],
      description: [
        "Developed a full-stack task management system using MERN stack with role-based access for Admins and Users.",
        "Enabled secure task creation, assignment, image uploads, and real-time tracking with JWT authentication and Cloudinary integration."
      ]
    },
    {
      title: "Jaya Group of Schools Website",
      tech: ["HTML5", "CSS", "Bootstrap 5", "PHP"],
      description: [
        "Built a multi-page educational website for managing information across multiple school branches.",
        "Implemented responsive layouts to support desktop, tablet, and mobile devices.",
        "Integrated dynamic content sections using PHP for easy updates.",
        "Followed clean code practices and maintained version control using Git."
      ]
    },
    {
      title: "Ideal Crelio LIMS Website",
      tech: ["HTML", "CSS", "JavaScript", "Bootstrap", "PHP"],
      description: [
        "Designed and developed a responsive Laboratory Information Management System (LIMS) website to showcase healthcare services and work.",
        "Built clean, structured layouts using Bootstrap to ensure mobile and cross-browser compatibility.",
        "Implemented interactive UI components using JavaScript to enhance user experience.",
        "Integrated PHP for dynamic content rendering and form handling.",
        "Optimized page load performance and ensured consistent UI across devices."
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white selection-invert">
      {/* Navbar */}
      <nav ref={navRef} className="flex justify-between items-center p-6 border-b-2 border-white/20">
        <div className="text-2xl font-bold font-mono tracking-tighter">
          WEB<span className="text-[var(--neon-green)]"> DEVEVLOPER</span>
        </div>
        <a href="#contact" className="brutal-border px-6 py-2 font-bold hover:bg-[var(--neon-green)] hover:!text-black transition-colors">
          Let's Work
        </a>
      </nav>

      {/* Hero Section */}
      <header ref={heroRef} className="container mx-auto px-6 py-32 flex flex-col items-center text-center">
        <h1 className="text-6xl md:text-9xl mb-4 leading-none mix-blend-difference neon-text-shadow">
          SANKAR
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--neon-green)] to-[var(--neon-pink)]">
            NARAYANAN
          </span>
        </h1>
        <p className="text-xl md:text-2xl font-mono text-gray-400 max-w-3xl mt-8 uppercase tracking-widest">
          Full Stack Developer • <span className="text-[var(--acid-yellow)]">Web Developer</span>
        </p>
      </header>

      {/* Marquee */}
      <div className="overflow-hidden bg-[var(--neon-green)] text-black py-4 rotate-[-1deg] mb-32 border-y-4 border-white">
        <div ref={marqueeRef} className="whitespace-nowrap flex text-4xl font-bold font-mono">
          {techStack.map((tech, i) => (
            <span key={i} className="mx-8">{tech} •</span>
          ))}
          {techStack.map((tech, i) => (
            <span key={`duplicate-${i}`} className="mx-8">{tech} •</span>
          ))}
        </div>
      </div>

      {/* Skills Section */}
      <section className="container mx-auto px-6 mb-32">
        <h2 className="text-5xl mb-12 text-center font-bold">TECHNICAL ARSENAL</h2>
        <div ref={skillsRef} className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
          {techStack.map((tech) => (
            <div key={tech} className="brutal-border px-8 py-4 text-xl font-mono hover:bg-white hover:text-black transition-colors cursor-default">
              {tech}
            </div>
          ))}
        </div>
      </section>

      {/* Bento Grid Section */}
      <section className="container mx-auto px-6 mb-32">
        <h2 className="text-5xl mb-16 text-center">FEATURED PROJECTS</h2>
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[250px]">
          {detailedProjects.map((project, index) => {
            const isWide = index === 0 || index === 3;
            // logic for colors based on original design
            const numberColor = isWide
              ? (index === 3 ? "text-[var(--neon-pink)]" : "text-[var(--neon-green)]")
              : "text-[var(--acid-yellow)]";

            const hoverTextColor = isWide
              ? (index === 3 ? "group-hover:text-[var(--neon-pink)]" : "group-hover:text-[var(--neon-green)]")
              : "group-hover:text-[var(--acid-yellow)]";

            const containerClasses = isWide
              ? `md:col-span-2 px-8 py-8 flex flex-col justify-between group overflow-hidden relative transition-all duration-300 brutal-border bg-[#1a1a1a] ${index === 3 ? "hover:border-[var(--neon-pink)]" : "hover:border-[var(--neon-green)]"}`
              : "p-6 flex flex-col justify-between group hover:bg-white/5 transition-all duration-300 hover:-translate-y-2 hover:shadow-[4px_4px_0px_var(--acid-yellow)] hover:border-[var(--acid-yellow)] brutal-border bg-[#1a1a1a]";

            return (
              <div key={index} className={containerClasses}>
                {isWide && (
                  <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 ${index === 3 ? "bg-[var(--neon-green)]" : "bg-[var(--neon-pink)]"}`}></div>
                )}

                <div className="z-10">
                  <span className={`font-mono ${numberColor}`}>
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h3 className={`text-2xl md:text-3xl mt-2 font-bold transition-colors ${hoverTextColor} line-clamp-2`}>
                    {project.title}
                  </h3>
                  {isWide && (
                    <p className="font-mono text-gray-400 mt-2 line-clamp-2 text-sm">{project.description[0]}</p>
                  )}
                </div>

                <div className={`flex flex-wrap gap-2 z-10 ${!isWide ? "mt-4" : ""}`}>
                  {project.tech.slice(0, isWide ? 4 : 3).map((t, i) => (
                    <span key={i} className={`text-xs font-mono border border-white/20 px-2 py-1 rounded-full ${isWide ? "bg-white/10" : "text-gray-400 border-transparent p-0"}`}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Detailed Project List */}
      <section className="container mx-auto px-6 mb-32">
        <h2 className="text-5xl mb-16 text-center font-bold">PROJECT DETAILS</h2>
        <div ref={detailedRef} className="flex flex-col gap-12 max-w-5xl mx-auto">
          {detailedProjects.map((project, index) => (
            <div key={index} className="brutal-border bg-[#1a1a1a] p-8 md:p-12 relative group hover:bg-white/5 transition-colors">
              <div className="absolute top-0 right-0 p-4 font-mono text-[var(--neon-green)] text-xl opacity-50">
                {String(index + 1).padStart(2, '0')}
              </div>

              <h3 className="text-3xl md:text-4xl font-bold mb-6 text-[var(--acid-yellow)] group-hover:text-white transition-colors">
                {project.title}
              </h3>

              <div className="flex flex-wrap gap-3 mb-6">
                {project.tech.map((t, i) => (
                  <span key={i} className="text-sm font-mono border border-white/30 px-3 py-1 bg-white/5 rounded-full text-[var(--neon-pink)]">
                    {t}
                  </span>
                ))}
              </div>

              <ul className="space-y-3 font-mono text-gray-300">
                {project.description.map((point, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-[var(--neon-green)] mt-1">▹</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer ref={footerRef} id="contact" className="border-t-2 border-white/20 pt-20 pb-10 text-center">
        <h2 className="text-6xl md:text-9xl mb-10 hover:text-[var(--neon-pink)] transition-colors cursor-pointer">
          GET IN TOUCH
        </h2>
        <div className="flex justify-center gap-8 font-mono text-gray-300">
          <a href="https://x.com/speed_xd96639" target="_blank" className="hover:text-white">TWITTER</a>
          <a href="https://github.com/sankarn36" target="_blank" className="hover:text-white">GITHUB</a>
          <a href="https://www.linkedin.com/in/sankar-narayanan-a-r-957213219/" target="_blank" className="hover:text-white">LINKEDIN</a>
          <a href="mailto:sankarnarayananam4554@gmail.com" target="_blank" className="hover:text-white">EMAIL</a>
        </div>
        <p className="mt-10 font-mono text-sm text-gray-600">
          © 2026 SANKAR NARAYANAN. ALL RIGHTS RESERVED.
        </p>
      </footer>
    </div>
  );
}

export default Home;
