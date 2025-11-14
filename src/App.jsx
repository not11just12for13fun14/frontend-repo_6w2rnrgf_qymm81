import React from 'react'
import { motion } from 'framer-motion'
import { ShieldCheck, Lock, Mail, Github, Linkedin, ExternalLink, Award, FileText } from 'lucide-react'
import Spline from '@splinetool/react-spline'

function Stat({ value, label }) {
  return (
    <div className="text-center">
      <div className="text-3xl md:text-4xl font-extrabold text-emerald-400 tracking-tight">{value}</div>
      <div className="text-sm md:text-base text-zinc-400">{label}</div>
    </div>
  )
}

function Pill({ children }) {
  return (
    <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 text-xs md:text-sm">
      {children}
    </span>
  )
}

function ProjectCard({ title, summary, tags, link }) {
  return (
    <motion.a
      href={link}
      target="_blank"
      rel="noreferrer"
      whileHover={{ y: -4 }}
      className="group relative overflow-hidden rounded-xl border border-zinc-800/80 bg-zinc-900/60 hover:bg-zinc-900 transition-colors p-5 md:p-6"
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: 'radial-gradient(600px circle at var(--x,50%) var(--y,50%), rgba(16,185,129,0.12), transparent 40%)'
        }}
      />
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-300">
          <Lock size={18} />
        </div>
        <h3 className="font-semibold text-zinc-100 text-lg flex-1">{title}</h3>
        <ExternalLink size={18} className="text-zinc-500 group-hover:text-emerald-300 transition-colors" />
      </div>
      <p className="mt-3 text-zinc-400 leading-relaxed text-sm md:text-base">{summary}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {tags.map((t) => (
          <Pill key={t}>{t}</Pill>
        ))}
      </div>
    </motion.a>
  )
}

function SectionTitle({ icon: Icon, title, subtitle }) {
  return (
    <div className="flex items-end justify-between gap-4">
      <div>
        <div className="flex items-center gap-2 text-emerald-300">
          <Icon size={18} />
          <span className="text-xs uppercase tracking-widest">{subtitle}</span>
        </div>
        <h2 className="mt-2 text-2xl md:text-3xl font-bold text-zinc-100">{title}</h2>
      </div>
      <div className="h-px flex-1 bg-gradient-to-r from-emerald-500/30 via-emerald-500/10 to-transparent" />
    </div>
  )
}

export default function App() {
  // Mouse glow effect for project cards
  React.useEffect(() => {
    const handler = (e) => {
      document.querySelectorAll('.group').forEach((el) => {
        const rect = el.getBoundingClientRect()
        el.style.setProperty('--x', `${e.clientX - rect.left}px`)
        el.style.setProperty('--y', `${e.clientY - rect.top}px`)
      })
    }
    window.addEventListener('mousemove', handler)
    return () => window.removeEventListener('mousemove', handler)
  }, [])

  const projects = [
    {
      title: 'Banking Web App Penetration Test',
      summary:
        'Led a full black-box assessment of a fintech app. Identified auth bypass via JWT misconfiguration and chained it with IDOR for account takeover. Delivered fixes and verified remediation.',
      tags: ['Web', 'Auth', 'IDOR', 'JWT', 'Reporting'],
      link: 'https://example.com/case-study/fintech-pt'
    },
    {
      title: 'Cloud Security Hardening (AWS)',
      summary:
        'Audited 40+ resources with IAM least-privilege, S3 bucket policies, and GuardDuty/Config baselines. Reduced public exposures by 100% and improved CIS score to 93%.',
      tags: ['Cloud', 'AWS', 'IAM', 'CIS'],
      link: 'https://example.com/case-study/aws-hardening'
    },
    {
      title: 'CTF & Research: Modern Phishing Kits',
      summary:
        'Reverse engineered kit behavior and built detections for MFA fatigue and token replay. Published write-up and IoCs; leveraged in blue team playbooks.',
      tags: ['Detection', 'DFIR', 'Research', 'CTF'],
      link: 'https://example.com/writeups/phishing-kits'
    }
  ]

  const skills = [
    'Network Pentesting',
    'Web Exploitation',
    'Cloud Security (AWS/Azure)',
    'Threat Hunting',
    'SIEM & Detections',
    'Secure Architecture',
    'Vulnerability Management',
    'Incident Response'
  ]

  const certs = [
    { name: 'OSCP', org: 'OffSec' },
    { name: 'eJPT', org: 'INE' },
    { name: 'Security+', org: 'CompTIA' },
    { name: 'AWS SAA', org: 'Amazon' }
  ]

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-200">
      {/* Top nav */}
      <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-zinc-950/60 bg-zinc-950/50 border-b border-zinc-800">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <a href="#home" className="flex items-center gap-2 text-zinc-100 font-semibold tracking-tight">
            <div className="h-6 w-6 rounded-md bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-300">
              <ShieldCheck size={16} />
            </div>
            <span>Cyber Portfolio</span>
          </a>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a href="#about" className="hover:text-emerald-300 transition-colors">About</a>
            <a href="#work" className="hover:text-emerald-300 transition-colors">Work</a>
            <a href="#skills" className="hover:text-emerald-300 transition-colors">Skills</a>
            <a href="#certs" className="hover:text-emerald-300 transition-colors">Certs</a>
            <a href="#contact" className="hover:text-emerald-300 transition-colors">Contact</a>
          </nav>
          <div className="flex items-center gap-2">
            <a href="mailto:you@email.com" className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-medium transition-colors">
              <Mail size={16} /> Contact
            </a>
          </div>
        </div>
      </header>

      {/* Hero with Spline */}
      <section id="home" className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(600px_circle_at_20%_10%,rgba(16,185,129,0.15),transparent_40%)] pointer-events-none" />
        <div className="max-w-6xl mx-auto px-4 py-10 md:py-16 lg:py-20 grid md:grid-cols-2 gap-10 items-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-300 text-xs uppercase tracking-widest">
              <Lock size={14} /> Cybersecurity Engineer
            </div>
            <h1 className="mt-4 text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-zinc-100">
              Secure by Design. Proven in the Field.
            </h1>
            <p className="mt-4 text-zinc-400 text-base md:text-lg">
              I help teams find and fix what matters—combining offensive testing with blue team detection engineering. Explore selected engagements, write-ups, and certifications.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a href="#work" className="px-5 py-2.5 rounded-md bg-emerald-600 hover:bg-emerald-500 text-white font-medium transition-colors">View Work</a>
              <a href="#contact" className="px-5 py-2.5 rounded-md border border-zinc-800 hover:border-emerald-500/40 hover:text-emerald-300 transition-colors">Get in touch</a>
            </div>
            <div className="mt-10 grid grid-cols-3 gap-6">
              <Stat value="50+" label="Vulns Remediated" />
              <Stat value="15" label="Assessments" />
              <Stat value="4" label="Certifications" />
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7 }} className="relative h-[360px] sm:h-[420px] md:h-[500px] lg:h-[560px] rounded-xl border border-zinc-800 overflow-hidden bg-zinc-900">
            <Spline scene="https://prod.spline.design/mwBbOy4jrazr59EO/scene.splinecode" style={{ width: '100%', height: '100%' }} />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-zinc-950/60 via-transparent to-transparent" />
          </motion.div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="relative">
        <div className="max-w-6xl mx-auto px-4 py-12 md:py-16">
          <SectionTitle icon={ShieldCheck} title="About me" subtitle="Overview" />
          <div className="mt-6 grid md:grid-cols-2 gap-8">
            <div className="text-zinc-400 leading-relaxed">
              Over the past years, Ive worked across offensive and defensive security: from web and network pentesting to cloud hardening, threat hunting, and building practical detections. I focus on high-signal findings and clear remediation guidance.
            </div>
            <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-5">
              <ul className="space-y-3 text-sm text-zinc-300">
                <li className="flex items-center gap-3"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Risk-driven reporting with reproducible steps</li>
                <li className="flex items-center gap-3"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Cloud-first mindset and automation</li>
                <li className="flex items-center gap-3"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Collaboration with engineering and product</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Work */}
      <section id="work" className="relative">
        <div className="max-w-6xl mx-auto px-4 py-12 md:py-16">
          <SectionTitle icon={FileText} title="Selected work" subtitle="Case studies" />
          <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {projects.map((p) => (
              <ProjectCard key={p.title} {...p} />
            ))}
          </div>
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="relative">
        <div className="max-w-6xl mx-auto px-4 py-12 md:py-16">
          <SectionTitle icon={Award} title="Skills & tooling" subtitle="Capabilities" />
          <div className="mt-6 flex flex-wrap gap-2">
            {skills.map((s) => (
              <Pill key={s}>{s}</Pill>
            ))}
          </div>
        </div>
      </section>

      {/* Certs */}
      <section id="certs" className="relative">
        <div className="max-w-6xl mx-auto px-4 py-12 md:py-16">
          <SectionTitle icon={Award} title="Certifications" subtitle="Validated knowledge" />
          <div className="mt-6 grid sm:grid-cols-2 md:grid-cols-4 gap-4">
            {certs.map((c) => (
              <div key={c.name} className="rounded-lg border border-zinc-800 bg-zinc-900/60 p-4 flex items-center justify-between">
                <div>
                  <div className="font-semibold text-zinc-100">{c.name}</div>
                  <div className="text-xs text-zinc-500">{c.org}</div>
                </div>
                <div className="text-emerald-300"><ShieldCheck size={18} /></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="relative">
        <div className="max-w-6xl mx-auto px-4 py-12 md:py-16">
          <SectionTitle icon={Mail} title="Lets collaborate" subtitle="Contact" />
          <div className="mt-6 grid md:grid-cols-3 gap-6">
            <a href="mailto:you@email.com" className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-6 hover:border-emerald-500/40 hover:bg-zinc-900 transition-colors">
              <div className="text-emerald-300"><Mail /></div>
              <div className="mt-2 font-semibold text-zinc-100">Email</div>
              <div className="text-sm text-zinc-400">Reach me directly for engagements and questions.</div>
            </a>
            <a href="https://github.com/" target="_blank" rel="noreferrer" className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-6 hover:border-emerald-500/40 hover:bg-zinc-900 transition-colors">
              <div className="text-emerald-300"><Github /></div>
              <div className="mt-2 font-semibold text-zinc-100">GitHub</div>
              <div className="text-sm text-zinc-400">Code samples, tooling, and write-ups.</div>
            </a>
            <a href="https://linkedin.com/" target="_blank" rel="noreferrer" className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-6 hover:border-emerald-500/40 hover:bg-zinc-900 transition-colors">
              <div className="text-emerald-300"><Linkedin /></div>
              <div className="mt-2 font-semibold text-zinc-100">LinkedIn</div>
              <div className="text-sm text-zinc-400">Background, recommendations, and updates.</div>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-800">
        <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-sm text-zinc-500">© {new Date().getFullYear()} Your Name. All rights reserved.</p>
          <div className="text-xs text-zinc-600">Built with care • Security-first • Dark mode</div>
        </div>
      </footer>
    </div>
  )
}
