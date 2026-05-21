import React, { useState } from "react";
import { ResumeData, WorkExperience, Education, Project, SocialLink } from "../types";
import { 
  Plus, 
  Trash2, 
  ArrowUp, 
  ArrowDown, 
  Save, 
  Undo, 
  Compass, 
  Briefcase, 
  GraduationCap, 
  Code, 
  ListPlus, 
  Link as LinkIcon,
  ChevronsUpDown,
  Laptop
} from "lucide-react";

interface ResumeEditProps {
  initialData: ResumeData;
  onSave: (updatedData: ResumeData) => Promise<void>;
  onCancel: () => void;
  isSaving: boolean;
}

type EditTab = "profile" | "experience" | "projects" | "education" | "skills";

export default function ResumeEdit({ initialData, onSave, onCancel, isSaving }: ResumeEditProps) {
  const [data, setData] = useState<ResumeData>({ ...initialData });
  const [activeTab, setActiveTab] = useState<EditTab>("profile");
  
  // Temp inputs for single add operations
  const [newSkill, setNewSkill] = useState("");
  const [newSocial, setNewSocial] = useState({ platform: "", url: "" });

  const handleFieldChange = (field: keyof ResumeData, value: any) => {
    setData(prev => ({ ...prev, [field]: value }));
  };

  // --- EXPERIENCE OPERATIONS ---
  const handleExperienceChange = (index: number, field: keyof WorkExperience, value: string) => {
    const updated = [...data.experience];
    updated[index] = { ...updated[index], [field]: value };
    handleFieldChange("experience", updated);
  };

  const addExperience = () => {
    const newExp: WorkExperience = { company: "", role: "", period: "", description: "" };
    handleFieldChange("experience", [...data.experience, newExp]);
  };

  const removeExperience = (index: number) => {
    const updated = data.experience.filter((_, i) => i !== index);
    handleFieldChange("experience", updated);
  };

  const moveExperience = (index: number, direction: "up" | "down") => {
    if (direction === "up" && index === 0) return;
    if (direction === "down" && index === data.experience.length - 1) return;
    const targetIdx = direction === "up" ? index - 1 : index + 1;
    const updated = [...data.experience];
    const temp = updated[index];
    updated[index] = updated[targetIdx];
    updated[targetIdx] = temp;
    handleFieldChange("experience", updated);
  };

  // --- EDUCATION OPERATIONS ---
  const handleEducationChange = (index: number, field: keyof Education, value: string) => {
    const updated = [...data.education];
    updated[index] = { ...updated[index], [field]: value };
    handleFieldChange("education", updated);
  };

  const addEducation = () => {
    const newEdu: Education = { school: "", degree: "", period: "", description: "" };
    handleFieldChange("education", [...data.education, newEdu]);
  };

  const removeEducation = (index: number) => {
    const updated = data.education.filter((_, i) => i !== index);
    handleFieldChange("education", updated);
  };

  const moveEducation = (index: number, direction: "up" | "down") => {
    if (direction === "up" && index === 0) return;
    if (direction === "down" && index === data.education.length - 1) return;
    const targetIdx = direction === "up" ? index - 1 : index + 1;
    const updated = [...data.education];
    const temp = updated[index];
    updated[index] = updated[targetIdx];
    updated[targetIdx] = temp;
    handleFieldChange("education", updated);
  };

  // --- PROJECTS OPERATIONS ---
  const handleProjectChange = (index: number, field: keyof Project, value: any) => {
    const updated = [...data.projects];
    updated[index] = { ...updated[index], [field]: value };
    handleFieldChange("projects", updated);
  };

  const addProject = () => {
    const newProj: Project = { name: "", description: "", link: "", technologies: [] };
    handleFieldChange("projects", [...data.projects, newProj]);
  };

  const removeProject = (index: number) => {
    const updated = data.projects.filter((_, i) => i !== index);
    handleFieldChange("projects", updated);
  };

  const moveProject = (index: number, direction: "up" | "down") => {
    if (direction === "up" && index === 0) return;
    if (direction === "down" && index === data.projects.length - 1) return;
    const targetIdx = direction === "up" ? index - 1 : index + 1;
    const updated = [...data.projects];
    const temp = updated[index];
    updated[index] = updated[targetIdx];
    updated[targetIdx] = temp;
    handleFieldChange("projects", updated);
  };

  // --- SKILLS OPERATIONS ---
  const addSkill = () => {
    const trimmed = newSkill.trim();
    if (trimmed && !data.skills.includes(trimmed)) {
      handleFieldChange("skills", [...data.skills, trimmed]);
      setNewSkill("");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    const updated = data.skills.filter(s => s !== skillToRemove);
    handleFieldChange("skills", updated);
  };

  // --- SOCIAL LINKS OPERATIONS ---
  const addSocial = () => {
    const platform = newSocial.platform.trim();
    const url = newSocial.url.trim();
    if (platform && url) {
      handleFieldChange("socialLinks", [...data.socialLinks, { platform, url }]);
      setNewSocial({ platform: "", url: "" });
    }
  };

  const removeSocial = (index: number) => {
    const updated = data.socialLinks.filter((_, i) => i !== index);
    handleFieldChange("socialLinks", updated);
  };

  const handleSaveClick = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!data.fullName.trim()) {
      alert("Full Name is required.");
      return;
    }
    await onSave(data);
  };

  return (
    <div className="bg-slate-900 text-slate-100 max-h-screen overflow-y-auto flex flex-col md:border-r border-slate-800 w-full h-full" id="resume-editor-parent">
      
      {/* Editor Header */}
      <div className="p-6 border-b border-slate-800 flex items-center justify-between shrink-0" id="editor-header-bar">
        <div>
          <h2 className="text-xl font-bold font-display text-white">Customize Resume</h2>
          <p className="text-xs text-slate-400 mt-1">Changes are saved to your global profile in real-time</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={onCancel}
            type="button"
            className="flex items-center gap-1 px-3 py-1.5 text-xs text-slate-300 bg-slate-800 hover:bg-slate-700 font-medium rounded-lg transition"
            id="btn-edit-cancel"
          >
            <Undo className="w-3.5 h-3.5" />
            <span>Cancel</span>
          </button>
          <button
            onClick={handleSaveClick}
            disabled={isSaving}
            type="button"
            className="flex items-center gap-1 px-4 py-1.5 text-xs bg-emerald-600 hover:bg-emerald-500 disabled:bg-emerald-800/50 text-white font-medium rounded-lg shadow-sm font-display tracking-wide transition"
            id="btn-edit-save"
          >
            <Save className="w-3.5 h-3.5" />
            <span>{isSaving ? "Saving..." : "Save Profile"}</span>
          </button>
        </div>
      </div>

      {/* Sidebar Tab Selectors */}
      <div className="flex border-b border-slate-800 bg-slate-950/40 p-1 shrink-0" id="editor-nav-tabs">
        {[
          { id: "profile", label: "Profile", icon: Compass },
          { id: "experience", label: "Careers", icon: Briefcase },
          { id: "projects", label: "Projects", icon: Laptop },
          { id: "education", label: "Academics", icon: GraduationCap },
          { id: "skills", label: "Expertise", icon: ListPlus }
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as EditTab)}
              className={`flex-1 py-3 text-xs font-semibold flex flex-col sm:flex-row items-center justify-center gap-1.5 border-b-2 transition ${
                isActive 
                  ? "border-blue-500 text-blue-400 font-bold bg-slate-800/40" 
                  : "border-transparent text-slate-400 hover:text-slate-200"
              }`}
              id={`tab-selector-${tab.id}`}
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Editor Content Forms */}
      <form onSubmit={handleSaveClick} className="p-6 flex-1 overflow-y-auto space-y-6" id="resume-edit-forms">
        
        {/* PROFILE TAB */}
        {activeTab === "profile" && (
          <div className="space-y-5" id="form-tab-profile">
            <h3 className="text-base font-bold text-white font-display mb-4">Basic Information & Layout</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-1.5">Full Name *</label>
                <input
                  type="text"
                  value={data.fullName}
                  onChange={e => handleFieldChange("fullName", e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 hover:border-slate-700 focus:border-blue-500 rounded-lg px-3 py-2 text-sm text-white focus:outline-hidden transition"
                  placeholder="e.g. Dr. John Doe"
                  required
                  id="input-fullName"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-1.5">Professional Title</label>
                <input
                  type="text"
                  value={data.title}
                  onChange={e => handleFieldChange("title", e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 hover:border-slate-700 focus:border-blue-500 rounded-lg px-3 py-2 text-sm text-white focus:outline-hidden transition"
                  placeholder="e.g. Professor of Computer Science"
                  id="input-title"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-1.5">Email Address</label>
                <input
                  type="email"
                  value={data.email}
                  onChange={e => handleFieldChange("email", e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 hover:border-slate-700 focus:border-blue-500 rounded-lg px-3 py-2 text-sm text-white focus:outline-hidden transition text-slate-400 cursor-not-allowed"
                  placeholder="e.g. john@university.edu"
                  disabled
                  id="input-email"
                />
                <span className="text-[10px] text-slate-400 mt-1 block">Authentication email cannot be changed</span>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-1.5">Phone Number</label>
                <input
                  type="text"
                  value={data.phone}
                  onChange={e => handleFieldChange("phone", e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 hover:border-slate-700 focus:border-blue-500 rounded-lg px-3 py-2 text-sm text-white focus:outline-hidden transition"
                  placeholder="e.g. +886 6 253 1234"
                  id="input-phone"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-1.5">Personal Website</label>
                <input
                  type="url"
                  value={data.website}
                  onChange={e => handleFieldChange("website", e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 hover:border-slate-700 focus:border-blue-500 rounded-lg px-3 py-2 text-sm text-white focus:outline-hidden transition"
                  placeholder="https://mywebsite.com"
                  id="input-website"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-1.5">Location</label>
                <input
                  type="text"
                  value={data.location}
                  onChange={e => handleFieldChange("location", e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 hover:border-slate-700 focus:border-blue-500 rounded-lg px-3 py-2 text-sm text-white focus:outline-hidden transition"
                  placeholder="e.g. Tainan, Taiwan"
                  id="input-location"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-1.5">Avatar / Profile Picture URL</label>
              <input
                type="text"
                value={data.avatarUrl}
                onChange={e => handleFieldChange("avatarUrl", e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 hover:border-slate-700 focus:border-blue-500 rounded-lg px-3 py-2 text-sm text-white focus:outline-hidden transition"
                placeholder="https://images.unsplash.com/... or Google profile photo"
                id="input-avatarUrl"
              />
            </div>

            {/* Resume Layout Theme Selector */}
            <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800">
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">Visual Style Theme</label>
              <div className="grid grid-cols-2 gap-3" id="theme-selectors-grid">
                {[
                  { id: "modern", name: "Modern Sans (STUST style)", desc: "Grotesk display headers with dynamic badges" },
                  { id: "minimal", name: "Minimalist (Classic)", desc: "Pristine Swiss geometry with clean typography" },
                  { id: "serif", name: "High-End Serif (Editorial)", desc: "Warm editorial headers with Georgia italic body" },
                  { id: "dark", name: "Cyber Dark (Developer)", desc: "Premium midnight dark mode aesthetics" }
                ].map(themeObj => (
                  <button
                    key={themeObj.id}
                    onClick={() => handleFieldChange("theme", themeObj.id)}
                    type="button"
                    className={`flex flex-col text-left p-3 rounded-lg border text-sm transition ${
                      data.theme === themeObj.id
                        ? "border-blue-500 bg-blue-900/20 text-white"
                        : "border-slate-800 bg-slate-900 hover:bg-slate-800 text-slate-300"
                    }`}
                    id={`toggle-theme-${themeObj.id}`}
                  >
                    <span className="font-bold">{themeObj.name}</span>
                    <span className="text-[10px] text-slate-400 mt-1 line-clamp-2">{themeObj.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-1.5">Professional Summary</label>
              <textarea
                value={data.summary}
                onChange={e => handleFieldChange("summary", e.target.value)}
                rows={5}
                className="w-full bg-slate-950 border border-slate-800 hover:border-slate-700 focus:border-blue-500 rounded-lg px-3 py-2 text-sm text-white focus:outline-hidden transition"
                placeholder="A compelling overview of your qualifications, focus, and history..."
                id="input-summary"
              />
            </div>
          </div>
        )}

        {/* EXPERIENCE TAB */}
        {activeTab === "experience" && (
          <div className="space-y-5" id="form-tab-experience">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h3 className="text-base font-bold text-white font-display">Work History & Careers</h3>
                <p className="text-xs text-slate-400 mt-0.5">Chronologically order your roles & contributions</p>
              </div>
              <button
                type="button"
                onClick={addExperience}
                className="flex items-center gap-1 bg-blue-600 hover:bg-blue-500 px-3 py-1.5 text-xs text-white rounded-lg font-medium transition"
                id="btn-add-experience"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Position</span>
              </button>
            </div>

            {data.experience.length === 0 ? (
              <div className="p-8 text-center bg-slate-950/40 rounded-xl border border-slate-800 text-slate-400 text-sm" id="empty-experience">
                No career history defined yet. Click &quot;Add Position&quot; to begin.
              </div>
            ) : (
              <div className="space-y-4" id="experience-items-editor">
                {data.experience.map((exp, idx) => (
                  <div key={idx} className="p-5 bg-slate-950/50 hover:bg-slate-950 border border-slate-800 rounded-xl space-y-4" id={`edit-experience-card-${idx}`}>
                    <div className="flex items-center justify-between" id={`exp-card-header-${idx}`}>
                      <span className="text-xs font-mono font-bold text-blue-500" id={`exp-idx-label-${idx}`}>POSITION #{idx + 1}</span>
                      <div className="flex gap-1.5">
                        <button
                          type="button"
                          onClick={() => moveExperience(idx, "up")}
                          disabled={idx === 0}
                          className="p-1 text-slate-400 hover:text-white disabled:text-slate-700 bg-slate-900 border border-slate-800 rounded-md transition"
                          id={`btn-move-up-exp-${idx}`}
                        >
                          <ArrowUp className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => moveExperience(idx, "down")}
                          disabled={idx === data.experience.length - 1}
                          className="p-1 text-slate-400 hover:text-white disabled:text-slate-700 bg-slate-900 border border-slate-800 rounded-md transition"
                          id={`btn-move-down-exp-${idx}`}
                        >
                          <ArrowDown className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => removeExperience(idx)}
                          className="p-1 text-red-400 hover:text-red-300 hover:bg-red-950/30 bg-slate-900 border border-slate-800 rounded-md transition"
                          id={`btn-remove-exp-${idx}`}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">Company / Organization</label>
                        <input
                          type="text"
                          value={exp.company}
                          onChange={e => handleExperienceChange(idx, "company", e.target.value)}
                          className="w-full bg-slate-900 border border-slate-800 focus:border-blue-500 rounded-lg px-3 py-1.5 text-sm text-white focus:outline-hidden transition"
                          placeholder="e.g. Acme Corporation"
                          id={`input-exp-company-${idx}`}
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">Job Role / Title</label>
                        <input
                          type="text"
                          value={exp.role}
                          onChange={e => handleExperienceChange(idx, "role", e.target.value)}
                          className="w-full bg-slate-900 border border-slate-800 focus:border-blue-500 rounded-lg px-3 py-1.5 text-sm text-white focus:outline-hidden transition"
                          placeholder="e.g. Lead Engineer"
                          id={`input-exp-role-${idx}`}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">Time Period</label>
                      <input
                        type="text"
                        value={exp.period}
                        onChange={e => handleExperienceChange(idx, "period", e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 focus:border-blue-500 rounded-lg px-3 py-1.5 text-sm text-white focus:outline-hidden transition"
                        placeholder="e.g. 2018 - Present or Jan 2020 - Dec 2022"
                        id={`input-exp-period-${idx}`}
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">Impact & Core Responsibility</label>
                      <textarea
                        value={exp.description}
                        onChange={e => handleExperienceChange(idx, "description", e.target.value)}
                        rows={3}
                        className="w-full bg-slate-900 border border-slate-800 focus:border-blue-500 rounded-lg px-3 py-1.5 text-sm text-white focus:outline-hidden transition"
                        placeholder="Detail achievements, core tech stack utilized, or student metrics improved..."
                        id={`input-exp-desc-${idx}`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* PROJECTS TAB */}
        {activeTab === "projects" && (
          <div className="space-y-5" id="form-tab-projects">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h3 className="text-base font-bold text-white font-display">Featured Projects</h3>
                <p className="text-xs text-slate-400 mt-0.5">Showcase real applications, libraries, or academic work</p>
              </div>
              <button
                type="button"
                onClick={addProject}
                className="flex items-center gap-1 bg-blue-600 hover:bg-blue-500 px-3 py-1.5 text-xs text-white rounded-lg font-medium transition"
                id="btn-add-project"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Project</span>
              </button>
            </div>

            {data.projects.length === 0 ? (
              <div className="p-8 text-center bg-slate-950/40 rounded-xl border border-slate-800 text-slate-400 text-sm" id="empty-projects">
                No projects defined yet. Click &quot;Add Project&quot; to begin.
              </div>
            ) : (
              <div className="space-y-4" id="projects-items-editor">
                {data.projects.map((proj, idx) => (
                  <div key={idx} className="p-5 bg-slate-950/50 hover:bg-slate-950 border border-slate-800 rounded-xl space-y-4" id={`edit-project-card-${idx}`}>
                    <div className="flex items-center justify-between" id={`proj-card-header-${idx}`}>
                      <span className="text-xs font-mono font-bold text-blue-500">PROJECT #{idx + 1}</span>
                      <div className="flex gap-1.5">
                        <button
                          type="button"
                          onClick={() => moveProject(idx, "up")}
                          disabled={idx === 0}
                          className="p-1 text-slate-400 hover:text-white disabled:text-slate-700 bg-slate-900 border border-slate-800 rounded-md transition"
                          id={`btn-move-up-proj-${idx}`}
                        >
                          <ArrowUp className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => moveProject(idx, "down")}
                          disabled={idx === data.projects.length - 1}
                          className="p-1 text-slate-400 hover:text-white disabled:text-slate-700 bg-slate-900 border border-slate-800 rounded-md transition"
                          id={`btn-move-down-proj-${idx}`}
                        >
                          <ArrowDown className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => removeProject(idx)}
                          className="p-1 text-red-400 hover:text-red-300 hover:bg-red-950/30 bg-slate-900 border border-slate-800 rounded-md transition"
                          id={`btn-remove-proj-${idx}`}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">Project Name</label>
                        <input
                          type="text"
                          value={proj.name}
                          onChange={e => handleProjectChange(idx, "name", e.target.value)}
                          className="w-full bg-slate-900 border border-slate-800 focus:border-blue-500 rounded-lg px-3 py-1.5 text-sm text-white focus:outline-hidden transition"
                          placeholder="e.g. EdgeVision AI"
                          id={`input-proj-name-${idx}`}
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">Repository/Live Link</label>
                        <input
                          type="url"
                          value={proj.link}
                          onChange={e => handleProjectChange(idx, "link", e.target.value)}
                          className="w-full bg-slate-900 border border-slate-800 focus:border-blue-500 rounded-lg px-3 py-1.5 text-sm text-white focus:outline-hidden transition"
                          placeholder="https://github.com/..."
                          id={`input-proj-link-${idx}`}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">Project Description</label>
                      <textarea
                        value={proj.description}
                        onChange={e => handleProjectChange(idx, "description", e.target.value)}
                        rows={2}
                        className="w-full bg-slate-900 border border-slate-800 focus:border-blue-500 rounded-lg px-3 py-1.5 text-sm text-white focus:outline-hidden transition"
                        placeholder="Summarize the core impact, architecture scope, and goals..."
                        id={`input-proj-desc-${idx}`}
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Technologies Used (Comma Separated)</label>
                      <input
                        type="text"
                        value={proj.technologies ? proj.technologies.join(", ") : ""}
                        onChange={e => handleProjectChange(idx, "technologies", e.target.value.split(",").map(t => t.trim()).filter(Boolean))}
                        className="w-full bg-slate-900 border border-slate-800 focus:border-blue-500 rounded-lg px-3 py-1.5 text-sm text-white focus:outline-hidden transition"
                        placeholder="React, TypeScript, Tailwind, Python"
                        id={`input-proj-tech-${idx}`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* EDUCATION TAB */}
        {activeTab === "education" && (
          <div className="space-y-5" id="form-tab-education">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h3 className="text-base font-bold text-white font-display">Academic Qualifications</h3>
                <p className="text-xs text-slate-400 mt-0.5">Degrees, Universities, and Achievements</p>
              </div>
              <button
                type="button"
                onClick={addEducation}
                className="flex items-center gap-1 bg-blue-600 hover:bg-blue-500 px-3 py-1.5 text-xs text-white rounded-lg font-medium transition"
                id="btn-add-education"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Degree</span>
              </button>
            </div>

            {data.education.length === 0 ? (
              <div className="p-8 text-center bg-slate-950/40 rounded-xl border border-slate-800 text-slate-400 text-sm" id="empty-education">
                No education history defined yet. Click &quot;Add Degree&quot; to begin.
              </div>
            ) : (
              <div className="space-y-4" id="education-items-editor">
                {data.education.map((edu, idx) => (
                  <div key={idx} className="p-5 bg-slate-950/50 hover:bg-slate-950 border border-slate-800 rounded-xl space-y-4" id={`edit-education-card-${idx}`}>
                    <div className="flex items-center justify-between" id={`edu-card-header-${idx}`}>
                      <span className="text-xs font-mono font-bold text-blue-500">DEGREE #{idx + 1}</span>
                      <div className="flex gap-1.5">
                        <button
                          type="button"
                          onClick={() => moveEducation(idx, "up")}
                          disabled={idx === 0}
                          className="p-1 text-slate-400 hover:text-white disabled:text-slate-700 bg-slate-900 border border-slate-800 rounded-md transition"
                          id={`btn-move-up-edu-${idx}`}
                        >
                          <ArrowUp className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => moveEducation(idx, "down")}
                          disabled={idx === data.education.length - 1}
                          className="p-1 text-slate-400 hover:text-white disabled:text-slate-700 bg-slate-900 border border-slate-800 rounded-md transition"
                          id={`btn-move-down-edu-${idx}`}
                        >
                          <ArrowDown className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => removeEducation(idx)}
                          className="p-1 text-red-400 hover:text-red-300 hover:bg-red-950/30 bg-slate-900 border border-slate-800 rounded-md transition"
                          id={`btn-remove-edu-${idx}`}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">University / School</label>
                        <input
                          type="text"
                          value={edu.school}
                          onChange={e => handleEducationChange(idx, "school", e.target.value)}
                          className="w-full bg-slate-900 border border-slate-800 focus:border-blue-500 rounded-lg px-3 py-1.5 text-sm text-white focus:outline-hidden transition"
                          placeholder="e.g. Harvard University"
                          id={`input-edu-school-${idx}`}
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">Degree / Distinction</label>
                        <input
                          type="text"
                          value={edu.degree}
                          onChange={e => handleEducationChange(idx, "degree", e.target.value)}
                          className="w-full bg-slate-900 border border-slate-800 focus:border-blue-500 rounded-lg px-3 py-1.5 text-sm text-white focus:outline-hidden transition"
                          placeholder="e.g. M.S. in Software Design"
                          id={`input-edu-degree-${idx}`}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">Time Period</label>
                        <input
                          type="text"
                          value={edu.period}
                          onChange={e => handleEducationChange(idx, "period", e.target.value)}
                          className="w-full bg-slate-900 border border-slate-800 focus:border-blue-500 rounded-lg px-3 py-1.5 text-sm text-white focus:outline-hidden transition"
                          placeholder="e.g. 2012 - 2014"
                          id={`input-edu-period-${idx}`}
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">Honors / Specifics (Optional)</label>
                        <textarea
                          value={edu.description}
                          onChange={e => handleEducationChange(idx, "description", e.target.value)}
                          rows={2}
                          className="w-full bg-slate-900 border border-slate-800 focus:border-blue-500 rounded-lg px-3 py-1.5 text-sm text-white focus:outline-hidden transition"
                          placeholder="e.g. Graduated Summa Cum Laude, GPA 3.9/4.0..."
                          id={`input-edu-desc-${idx}`}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* SKILLS & LINKS TAB */}
        {activeTab === "skills" && (
          <div className="space-y-6" id="form-tab-skills">
            
            {/* Tag Skills */}
            <div className="space-y-3" id="skills-sub-form">
              <div>
                <h3 className="text-base font-bold text-white font-display">Technical Expertise</h3>
                <p className="text-xs text-slate-400 mt-0.5">Manage clean standalone skill terms</p>
              </div>
              
              <div className="flex gap-2" id="skill-addition-bar">
                <input
                  type="text"
                  value={newSkill}
                  onChange={e => setNewSkill(e.target.value)}
                  onKeyDown={e => { if (e.key === "Enter") { e.preventDefault(); addSkill(); } }}
                  placeholder="Type skill & press Enter or Add"
                  className="flex-1 bg-slate-950 border border-slate-800 focus:border-blue-500 focus:outline-hidden text-sm rounded-lg px-3 py-2 text-white transition"
                  id="input-skill-term"
                />
                <button
                  type="button"
                  onClick={addSkill}
                  className="bg-slate-800 border border-slate-700 hover:bg-slate-700 px-4 py-2 text-xs text-white rounded-lg font-medium transition"
                  id="btn-add-skill-term"
                >
                  Add
                </button>
              </div>

              <div className="flex flex-wrap gap-2 p-3 bg-slate-950/40 rounded-xl border border-slate-800 min-h-16" id="tags-container">
                {data.skills.length === 0 ? (
                  <span className="text-slate-500 text-xs my-auto block">No technical focus terms listed. Add skills above.</span>
                ) : (
                  data.skills.map(skill => (
                    <span 
                      key={skill}
                      className="group flex items-center gap-1.5 bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 text-xs px-2.5 py-1 rounded-md transition"
                      id={`skill-tag-${skill}`}
                    >
                      <span>{skill}</span>
                      <button
                        type="button"
                        onClick={() => removeSkill(skill)}
                        className="text-slate-500 group-hover:text-red-400 p-0.5"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </span>
                  ))
                )}
              </div>
            </div>

            <hr className="border-slate-800" />

            {/* Social Media Links */}
            <div className="space-y-4" id="socials-sub-form">
              <div>
                <h3 className="text-base font-bold text-white font-display">Social & Academic Profile Links</h3>
                <p className="text-xs text-slate-400 mt-0.5">Integrate links for LinkedIn, GitHub, or Scholar</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-2 bg-slate-950/40 p-3 rounded-xl border border-slate-800" id="social-addition-bar">
                <input
                  type="text"
                  value={newSocial.platform}
                  onChange={e => setNewSocial(prev => ({ ...prev, platform: e.target.value }))}
                  placeholder="Platform (e.g., GitHub, Google Scholar)"
                  className="flex-1 bg-slate-900 border border-slate-800 focus:outline-hidden rounded-lg px-3 py-1.5 text-xs text-white transition-all"
                  id="input-social-platform"
                />
                <input
                  type="url"
                  value={newSocial.url}
                  onChange={e => setNewSocial(prev => ({ ...prev, url: e.target.value }))}
                  placeholder="URL (e.g., https://github.com/...)"
                  className="flex-1 bg-slate-900 border border-slate-800 focus:outline-hidden rounded-lg px-3 py-1.5 text-xs text-white transition-all"
                  id="input-social-url"
                />
                <button
                  type="button"
                  onClick={addSocial}
                  className="bg-blue-600 hover:bg-blue-500 text-white rounded-lg px-4 py-1.5 text-xs font-semibold shrink-0 transition"
                  id="btn-add-social"
                >
                  Add Link
                </button>
              </div>

              <div className="space-y-2" id="links-container">
                {data.socialLinks && data.socialLinks.map((link, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-slate-900/45 border border-slate-800/80 rounded-lg text-xs" id={`edit-social-row-${idx}`}>
                    <div className="flex items-center gap-2 text-slate-300">
                      <LinkIcon className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="font-bold">{link.platform}:</span>
                      <span className="text-slate-400 truncate max-w-[200px]">{link.url}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeSocial(idx)}
                      className="p-1 hover:bg-red-950/20 text-red-400 hover:text-red-300 rounded-md border border-transparent hover:border-slate-800 transition"
                      id={`btn-remove-social-${idx}`}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
                {(!data.socialLinks || data.socialLinks.length === 0) && (
                  <div className="p-4 text-center text-xs text-slate-500 bg-slate-950/20 rounded-lg border border-slate-800">
                    No social or external profile handles listed. Add your first link above.
                  </div>
                )}
              </div>
            </div>

          </div>
        )}

      </form>
    </div>
  );
}
