import { ResumeData } from "../types";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Globe, 
  Github, 
  Linkedin, 
  BookOpen, 
  Briefcase, 
  Code, 
  ExternalLink,
  GraduationCap
} from "lucide-react";

interface ResumeViewProps {
  data: ResumeData;
}

export default function ResumeView({ data }: ResumeViewProps) {
  const {
    fullName,
    title,
    email,
    phone,
    location,
    website,
    summary,
    avatarUrl,
    theme,
    skills,
    experience,
    education,
    projects,
    socialLinks
  } = data;

  // Render social icon based on platform name
  const renderSocialIcon = (platform: string) => {
    const p = platform.toLowerCase();
    if (p.includes("github")) return <Github className="w-4 h-4" id="icon-github" />;
    if (p.includes("linkedin")) return <Linkedin className="w-4 h-4" id="icon-linkedin" />;
    if (p.includes("scholar")) return <BookOpen className="w-4 h-4" id="icon-scholar" />;
    return <ExternalLink className="w-4 h-4" id="icon-external" />;
  };

  // Generate Theme Specific Tailwind CSS Classes
  const getThemeStyles = () => {
    switch (theme) {
      case "dark":
        return {
          wrapper: "bg-zinc-950 text-zinc-100 min-h-screen selection:bg-indigo-500/30 selection:text-indigo-200",
          container: "max-w-4xl mx-auto px-6 py-16",
          fontTitle: "font-display text-4xl sm:text-5xl font-bold tracking-tight text-white mb-2",
          fontSub: "font-mono text-zinc-400 text-sm tracking-wider uppercase mb-6",
          sectionHeading: "font-display text-xl sm:text-2xl font-semibold text-white border-b border-zinc-800 pb-3 mb-6 flex items-center gap-3",
          cardBg: "bg-zinc-900/50 border border-zinc-800 p-6 rounded-xl hover:border-zinc-700 transition duration-200",
          badge: "bg-zinc-800 text-zinc-300 font-mono text-xs px-2.5 py-1 rounded-md border border-zinc-700",
          textMuted: "text-zinc-400 text-sm",
          link: "text-indigo-400 hover:text-indigo-300 transition duration-150 inline-flex items-center gap-1.5",
          avatar: "w-24 h-24 rounded-2xl border-2 border-zinc-800 object-cover shadow-2xl"
        };
      case "serif":
        return {
          wrapper: "bg-[#faf8f6] text-[#2c2826] min-h-screen selection:bg-[#dfd7d0]",
          container: "max-w-4xl mx-auto px-8 py-20",
          fontTitle: "font-serif text-4xl sm:text-5xl font-light tracking-wide text-[#1b1918] mb-2",
          fontSub: "font-serif italic text-[#605a56] text-lg mb-6",
          sectionHeading: "font-serif text-2xl font-normal text-[#1b1918] border-b border-[#e1d8d1] pb-3 mb-6 flex items-center gap-3",
          cardBg: "border-l-2 border-[#c5b5aa] pl-6 py-1 mb-8",
          badge: "bg-[#ece5df] text-[#554e4a] text-xs px-3 py-1 font-sans font-medium rounded-full",
          textMuted: "text-[#6c645e] font-serif italic text-sm",
          link: "text-[#8c7462] hover:text-[#5e4b3e] transition duration-150 underline underline-offset-4 inline-flex items-center gap-1.5",
          avatar: "w-28 h-28 rounded-full border-4 border-[#eae0d5] object-cover shadow-sm"
        };
      case "modern":
        return {
          wrapper: "bg-slate-50 text-slate-800 min-h-screen selection:bg-blue-100",
          container: "max-w-4xl mx-auto px-6 py-16",
          fontTitle: "font-display text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 mb-2",
          fontSub: "font-sans text-blue-600 font-semibold text-base sm:text-lg mb-6",
          sectionHeading: "font-display text-xl sm:text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3",
          cardBg: "bg-white border border-slate-200/80 p-6 rounded-2xl shadow-xs hover:shadow-md transition duration-200",
          badge: "bg-blue-50 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full",
          textMuted: "text-slate-500 text-sm",
          link: "text-blue-600 hover:text-blue-700 font-medium transition duration-150 inline-flex items-center gap-1.5",
          avatar: "w-24 h-24 rounded-full border-4 border-white shadow-md object-cover"
        };
      case "minimal":
      default:
        return {
          wrapper: "bg-white text-neutral-800 min-h-screen selection:bg-neutral-100",
          container: "max-w-3xl mx-auto px-6 py-16",
          fontTitle: "font-sans text-3xl sm:text-4xl font-semibold tracking-tight text-neutral-900 mb-1",
          fontSub: "font-sans text-neutral-500 font-medium text-sm sm:text-base mb-6",
          sectionHeading: "font-sans text-sm font-semibold text-neutral-900 tracking-widest uppercase border-b border-neutral-200 pb-2 mb-6 flex items-center gap-2",
          cardBg: "border-b border-neutral-100 pb-6 mb-6 last:border-0 last:pb-0 last:mb-0",
          badge: "bg-neutral-100 text-neutral-700 text-xs px-2 py-0.5 rounded font-mono",
          textMuted: "text-neutral-500 text-sm",
          link: "text-neutral-900 hover:underline transition duration-150 inline-flex items-center gap-1",
          avatar: "w-20 h-20 rounded-md border border-neutral-200 object-cover"
        };
    }
  };

  const styles = getThemeStyles();

  if (theme === "minimal") {
    const renderFormattedName = (name: string) => {
      const parts = name.split(" ");
      if (parts.length > 1) {
        const first = parts.slice(0, -1).join(" ");
        const last = parts[parts.length - 1];
        return (
          <>
            <span className="italic font-light">{first} </span>
            <span className="font-bold not-italic">{last}</span>
          </>
        );
      }
      return <span className="font-bold">{name}</span>;
    };

    return (
      <div className="bg-[#E5E7EB] min-h-screen p-4 sm:p-10 flex items-center justify-center transition-all-custom" id="resume-container-wrapper">
        <div className="w-full max-w-[680px] bg-white shadow-2xl overflow-hidden flex flex-col border border-gray-300 rounded-none" id="resume-container">
          
          {/* Resume Header */}
          <header className="p-12 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6" id="resume-header">
            <div>
              <h1 className="text-4xl sm:text-5xl font-light tracking-tighter mb-2 italic text-[#1a1a1a]" id="resume-fullname">
                {renderFormattedName(fullName)}
              </h1>
              <p className="text-gray-500 tracking-[0.2em] uppercase text-[11px] font-medium leading-relaxed" id="resume-title">
                {title} {location ? `/ ${location}` : ""}
              </p>
            </div>
            {avatarUrl && (
              <img 
                src={avatarUrl} 
                alt={fullName} 
                className="w-16 h-16 rounded-full border border-gray-100 object-cover"
                referrerPolicy="no-referrer"
                id="resume-avatar-img"
              />
            )}
          </header>

          <div className="flex-1 flex flex-col sm:flex-row divide-y sm:divide-y-0 sm:divide-x divide-gray-100">
            {/* Main Content */}
            <div className="flex-[1.6] p-10 pt-8 space-y-8">
              
              {/* Experience Section */}
              {experience && experience.length > 0 && (
                <section id="resume-experience-section">
                  <h2 className="text-[10px] uppercase tracking-widest text-[#1a1a1a] font-bold mb-6" id="heading-experience">Experience</h2>
                  <div className="space-y-6" id="resume-experiences-list">
                    {experience.map((job, idx) => (
                      <div key={idx} className="space-y-1.5" id={`experience-card-${idx}`}>
                        <div className="flex justify-between items-baseline gap-2">
                          <h3 className="font-bold text-xs text-neutral-900" id={`exp-role-${idx}`}>{job.role} at {job.company}</h3>
                          <span className="text-[9px] text-gray-400 font-mono shrink-0" id={`exp-period-${idx}`}>{job.period}</span>
                        </div>
                        <p className="text-[11px] text-gray-600 leading-relaxed whitespace-pre-wrap" id={`exp-desc-${idx}`}>{job.description}</p>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Projects Section */}
              {projects && projects.length > 0 && (
                <section id="resume-projects-section">
                  <h2 className="text-[10px] uppercase tracking-widest text-[#1a1a1a] font-bold mb-6" id="heading-projects">Projects</h2>
                  <div className="space-y-6" id="resume-projects-list">
                    {projects.map((proj, idx) => (
                      <div key={idx} className="space-y-2" id={`project-card-${idx}`}>
                        <div className="flex justify-between items-baseline gap-2">
                          <h3 className="font-bold text-xs text-neutral-900" id={`proj-name-${idx}`}>
                            {proj.name}
                          </h3>
                          {proj.link && (
                            <a 
                              href={proj.link} 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className="text-[9px] text-neutral-400 hover:text-black hover:underline inline-flex items-center gap-0.5"
                              id={`proj-link-${idx}`}
                            >
                              Explore ↗
                            </a>
                          )}
                        </div>
                        <p className="text-[11px] text-gray-600 leading-relaxed whitespace-pre-wrap" id={`proj-desc-${idx}`}>{proj.description}</p>
                        {proj.technologies && proj.technologies.length > 0 && (
                          <div className="flex flex-wrap gap-1" id={`proj-tech-container-${idx}`}>
                            {proj.technologies.map((tech, techIdx) => (
                              <span key={techIdx} className="px-1.5 py-0.5 bg-neutral-50 border border-neutral-200 text-[9px] font-mono text-gray-500 rounded" id={`proj-tech-${idx}-${techIdx}`}>
                                {tech}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Education Section */}
              {education && education.length > 0 && (
                <section id="resume-education-section">
                  <h2 className="text-[10px] uppercase tracking-widest text-[#1a1a1a] font-bold mb-6" id="heading-education">Education</h2>
                  <div className="space-y-4" id="resume-educations-list">
                    {education.map((edu, idx) => (
                      <div key={idx} className="space-y-1" id={`education-card-${idx}`}>
                        <div className="flex justify-between items-baseline gap-2">
                          <h3 className="font-bold text-xs text-neutral-900" id={`edu-school-${idx}`}>{edu.degree}</h3>
                          <span className="text-[9px] text-gray-400 font-mono shrink-0" id={`edu-period-${idx}`}>{edu.period}</span>
                        </div>
                        <p className="text-[11px] text-gray-500" id={`edu-degree-${idx}`}>{edu.school}</p>
                        {edu.description && (
                          <p className="text-[11px] text-gray-400 italic leading-snug" id={`edu-desc-${idx}`}>{edu.description}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              )}

            </div>

            {/* Sidebar Content */}
            <div className="flex-1 bg-gray-50/50 p-8 space-y-8">
              
              {/* Summary Section */}
              {summary && (
                <section id="resume-summary-section">
                  <h2 className="text-[10px] uppercase tracking-widest text-[#1a1a1a] font-bold mb-4">Summary</h2>
                  <p className="text-[11px] text-gray-600 leading-relaxed whitespace-pre-wrap" id="resume-summary-text">{summary}</p>
                </section>
              )}

              {/* Stack Section */}
              {skills && skills.length > 0 && (
                <section id="resume-skills-section">
                  <h2 className="text-[10px] uppercase tracking-widest text-[#1a1a1a] font-bold mb-4" id="heading-skills">Stack</h2>
                  <div className="flex flex-wrap gap-1.5" id="resume-skills-list">
                    {skills.map((skill, idx) => (
                      <span key={idx} className="px-2 py-0.5 bg-white border border-gray-200 text-[10px] font-mono font-medium text-gray-700 rounded-sm shadow-xs" id={`skill-item-${idx}`}>
                        {skill}
                      </span>
                    ))}
                  </div>
                </section>
              )}

              {/* Contact Section */}
              <section id="resume-contact-details">
                <h2 className="text-[10px] uppercase tracking-widest text-[#1a1a1a] font-bold mb-4">Contact</h2>
                <div className="space-y-2 text-[10px] text-gray-600">
                  {email && <p className="truncate" id="link-email">Email: {email}</p>}
                  {phone && <p id="link-phone">Phone: {phone}</p>}
                  {website && (
                    <p className="truncate" id="link-website">
                      Web: <a href={website} target="_blank" rel="noopener noreferrer" className="hover:underline text-black font-semibold">{website.replace(/^https?:\/\//, "")}</a>
                    </p>
                  )}
                </div>
                {socialLinks && socialLinks.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-gray-100 space-y-1.5" id="resume-socials">
                    {socialLinks.map((link, idx) => (
                      <a
                        key={idx}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-[10px] text-neutral-500 hover:text-black transition"
                        id={`social-link-${idx}`}
                      >
                        {link.platform} →
                      </a>
                    ))}
                  </div>
                )}
              </section>

            </div>
          </div>

          <footer className="h-1 bg-black w-full mt-auto"></footer>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.wrapper} id="resume-container-wrapper">
      <div className={styles.container} id="resume-container">
        
        {/* Header Block */}
        <header className="flex flex-col-reverse md:flex-row md:items-start md:justify-between gap-8 mb-12" id="resume-header">
          <div className="flex-1">
            <h1 className={styles.fontTitle} id="resume-fullname">{fullName}</h1>
            <p className={styles.fontSub} id="resume-title">{title}</p>
            
            {/* Contact Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4 mb-6 text-sm text-neutral-500" id="resume-contact-details">
              {email && (
                <a href={`mailto:${email}`} className="flex items-center gap-2.5 hover:text-neutral-900 transition-colors" id="link-email">
                  <Mail className="w-4 h-4 shrink-0 opacity-70" />
                  <span>{email}</span>
                </a>
              )}
              {phone && (
                <a href={`tel:${phone}`} className="flex items-center gap-2.5 hover:text-neutral-900 transition-colors" id="link-phone">
                  <Phone className="w-4 h-4 shrink-0 opacity-70" />
                  <span>{phone}</span>
                </a>
              )}
              {location && (
                <div className="flex items-center gap-2.5 opacity-80" id="info-location">
                  <MapPin className="w-4 h-4 shrink-0 opacity-70" />
                  <span>{location}</span>
                </div>
              )}
              {website && (
                <a href={website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 hover:text-neutral-900 transition-colors" id="link-website">
                  <Globe className="w-4 h-4 shrink-0 opacity-70" />
                  <span>{website.replace(/^https?:\/\//, "")}</span>
                </a>
              )}
            </div>

            {/* Social Links */}
            {socialLinks && socialLinks.length > 0 && (
              <div className="flex flex-wrap gap-3" id="resume-socials">
                {socialLinks.map((link, idx) => (
                  <a
                    key={idx}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1 text-xs border border-neutral-300/60 hover:border-neutral-900 hover:text-neutral-900 rounded-lg bg-white/50 backdrop-blur-xs shadow-xs text-neutral-600 transition"
                    id={`social-link-${idx}`}
                  >
                    {renderSocialIcon(link.platform)}
                    <span>{link.platform}</span>
                  </a>
                ))}
              </div>
            )}
          </div>

          {avatarUrl && (
            <div className="shrink-0 flex justify-center md:justify-end" id="resume-avatar-container">
              <img 
                src={avatarUrl} 
                alt={fullName} 
                className={styles.avatar}
                referrerPolicy="no-referrer"
                id="resume-avatar-img"
              />
            </div>
          )}
        </header>

        {/* Summary Segment */}
        {summary && (
          <section className="mb-12" id="resume-summary-section">
            <p className="text-base sm:text-lg leading-relaxed font-light whitespace-pre-wrap" id="resume-summary-text">
              {summary}
            </p>
          </section>
        )}

        {/* Work Experience Section */}
        {experience && experience.length > 0 && (
          <section className="mb-12" id="resume-experience-section">
            <h2 className={styles.sectionHeading} id="heading-experience">
              <Briefcase className="w-5 h-5 opacity-80" />
              <span>Professional Experience</span>
            </h2>
            <div className="flex flex-col gap-6" id="resume-experiences-list">
              {experience.map((job, idx) => (
                <div key={idx} className={styles.cardBg} id={`experience-card-${idx}`}>
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-2">
                    <div>
                      <h3 className="font-semibold text-base sm:text-lg text-neutral-900" id={`exp-role-${idx}`}>{job.role}</h3>
                      <p className="font-medium text-neutral-700 text-sm" id={`exp-company-${idx}`}>{job.company}</p>
                    </div>
                    <span className={`${styles.textMuted} font-mono sm:text-right shrink-0`} id={`exp-period-${idx}`}>
                      {job.period}
                    </span>
                  </div>
                  <p className="text-sm text-neutral-600 leading-relaxed whitespace-pre-wrap" id={`exp-desc-${idx}`}>
                    {job.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects Section */}
        {projects && projects.length > 0 && (
          <section className="mb-12" id="resume-projects-section">
            <h2 className={styles.sectionHeading} id="heading-projects">
              <Code className="w-5 h-5 opacity-80" />
              <span>Selected Projects</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6" id="resume-projects-list">
              {projects.map((proj, idx) => (
                <div key={idx} className={styles.cardBg} id={`project-card-${idx}`}>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-semibold text-base text-neutral-900" id={`proj-name-${idx}`}>{proj.name}</h3>
                    {proj.link && (
                      <a 
                        href={proj.link} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className={styles.link}
                        id={`proj-link-${idx}`}
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                  <p className="text-sm text-neutral-600 leading-relaxed mb-4 whitespace-pre-wrap" id={`proj-desc-${idx}`}>
                    {proj.description}
                  </p>
                  {proj.technologies && proj.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1.5" id={`proj-tech-container-${idx}`}>
                      {proj.technologies.map((tech, techIdx) => (
                        <span key={techIdx} className={styles.badge} id={`proj-tech-${idx}-${techIdx}`}>
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education Section */}
        {education && education.length > 0 && (
          <section className="mb-12" id="resume-education-section">
            <h2 className={styles.sectionHeading} id="heading-education">
              <GraduationCap className="w-5 h-5 opacity-80" />
              <span>Education</span>
            </h2>
            <div className="flex flex-col gap-6" id="resume-educations-list">
              {education.map((edu, idx) => (
                <div key={idx} className={styles.cardBg} id={`education-card-${idx}`}>
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-2">
                    <div>
                      <h3 className="font-semibold text-neutral-900 text-base" id={`edu-school-${idx}`}>{edu.school}</h3>
                      <p className="font-medium text-neutral-700 text-sm" id={`edu-degree-${idx}`}>{edu.degree}</p>
                    </div>
                    <span className={`${styles.textMuted} font-mono sm:text-right shrink-0`} id={`edu-period-${idx}`}>
                      {edu.period}
                    </span>
                  </div>
                  {edu.description && (
                    <p className="text-sm text-neutral-600 leading-relaxed whitespace-pre-wrap" id={`edu-desc-${idx}`}>
                      {edu.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills Section */}
        {skills && skills.length > 0 && (
          <section id="resume-skills-section">
            <h2 className={styles.sectionHeading} id="heading-skills">
              <Code className="w-5 h-5 opacity-80" />
              <span>Expertise & Skills</span>
            </h2>
            <div className="flex flex-wrap gap-2" id="resume-skills-list">
              {skills.map((skill, idx) => (
                <span 
                  key={idx} 
                  className={
                    theme === "serif"
                    ? "font-serif bg-[#ece5df] text-[#554e4a] text-sm px-4 py-1.5 rounded-full border border-[#dfd7d0]"
                    : theme === "dark"
                    ? "bg-zinc-900 border border-zinc-800 text-zinc-300 font-mono text-xs px-3 py-1.5 rounded-md hover:border-zinc-700"
                    : "bg-blue-50/80 border border-blue-100 hover:border-blue-200 text-blue-800 px-3.5 py-1.5 rounded-full text-sm font-medium hover:bg-blue-100/50 transition cursor-default"
                  }
                  id={`skill-item-${idx}`}
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>
        )}

      </div>
    </div>
  );
}
