import React from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { Shield, Lock, Mail, Github, Linkedin, ExternalLink, Sparkles, Terminal as TerminalIcon, Trophy, Fingerprint } from 'lucide-react'
import Spline from '@splinetool/react-spline'

// Small helpers
function Pill({ children }) {
  return (
    <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 text-xs md:text-sm whitespace-nowrap">
      {children}
    </span>
  )
}

function NeonDivider() {
  return (
    <div className="relative my-10">
      <div className="h-px w-full bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />
      <div className="absolute left-1/2 -translate-x-1/2 -top-1.5 h-3 w-3 rounded-full bg-emerald-400/80 shadow-[0_0_30px_4px_rgba(16,185,129,0.45)]" />
    </div>
  )
}

function GlitchText({ children, className = '' }) {
  return (
    <div className={`relative inline-block select-none ${className}`}>
      <span className="relative z-10">{children}</span>
      <span aria-hidden className="absolute inset-0 translate-x-[2px] translate-y-[-1px] text-emerald-400/70 mix-blend-screen blur-[0.2px]">{children}</span>
      <span aria-hidden className="absolute inset-0 -translate-x-[2px] translate-y-[1px] text-teal-300/60 mix-blend-screen blur-[0.2px]">{children}</span>
    </div>
  )
}

function ProjectCard({ title, summary, tags, link }) {
  return (
    <motion.a
      href={link}
      target="_blank"
      rel="noreferrer"
      whileHover={{ y: -6, rotate: -0.25 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="group relative overflow-hidden rounded-xl border border-emerald-500/20 bg-zinc-950/60 p-5 md:p-6 shadow-[inset_0_0_0_1px_rgba(16,185,129,0.08)]"
      style={{ backgroundImage: 'radial-gradient(800px 200px at 120% -10%, rgba(16,185,129,0.10), transparent 40%)' }}
    >
      <div className="absolute -inset-px rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[conic-gradient(from_90deg_at_50%_50%,rgba(16,185,129,0.25),transparent_30%,transparent_70%,rgba(16,185,129,0.25))] blur-[12px]" />
      <div className="relative">
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
      </div>
    </motion.a>
  )
}

function Timeline({ items }) {
  return (
    <div className="relative pl-6">
      <div className="absolute left-1.5 top-0 bottom-0 w-[2px] bg-gradient-to-b from-emerald-500/60 via-emerald-500/20 to-transparent" />
      <div className="space-y-8">
        {items.map((it, idx) => (
          <div key={idx} className="relative">
            <div className="absolute -left-[9px] top-1 h-3 w-3 rounded-full bg-emerald-400 shadow-[0_0_20px_4px_rgba(16,185,129,0.35)]" />
            <div className="rounded-xl border border-zinc-800/70 bg-zinc-900/60 p-4">
              <div className="flex items-center justify-between gap-3">
                <div className="font-semibold text-zinc-100">{it.title}</div>
                <div className="text-xs text-zinc-500">{it.time}</div>
              </div>
              <div className="mt-1 text-sm text-zinc-400">{it.desc}</div>
              <div className="mt-3 flex flex-wrap gap-2">
                {it.tags?.map((t) => (
                  <Pill key={t}>{t}</Pill>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function Terminal({ lines }) {
  const [idx, setIdx] = React.useState(0)
  const [display, setDisplay] = React.useState('')

  React.useEffect(() => {
    const text = lines[idx % lines.length]
    setDisplay('')
    let i = 0
    const iv = setInterval(() => {
      setDisplay((d) => d + text[i])
      i++
      if (i >= text.length) {
        clearInterval(iv)
        setTimeout(() => setIdx((n) => (n + 1) % lines.length), 900)
      }
    }, 30)
    return () => clearInterval(iv)
  }, [idx, lines])

  return (
    <div className="rounded-xl border border-emerald-500/20 bg-zinc-950/70 p-4 font-mono text-sm text-emerald-300 shadow-[0_0_0_1px_rgba(16,185,129,0.06)_inset]">
      <div className="flex items-center gap-2 text-emerald-400/70 text-xs">
        <div className="h-2 w-2 rounded-full bg-red-400/60" />
        <div className="h-2 w-2 rounded-full bg-yellow-400/60" />
        <div className="h-2 w-2 rounded-full bg-green-400/60" />
        <span className="ml-2">/bin/secure-shell</span>
      </div>
      <div className="mt-3">
        <span className="text-emerald-400">guest@portfolio</span>:
        <span className="text-zinc-400">~$</span> {display}
        <span className="inline-block w-2 h-4 align-[-2px] bg-emerald-400 animate-pulse ml-1" />
      </div>
    </div>
  )
}

function CursorFollower() {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 300, damping: 30 })
  const springY = useSpring(y, { stiffness: 300, damping: 30 })

  React.useEffect(() => {
    const handler = (e) => {
      x.set(e.clientX - 10)
      y.set(e.clientY - 10)
    }
    window.addEventListener('mousemove', handler)
    return () => window.removeEventListener('mousemove', handler)
  }, [x, y])

  return (
    <motion.div
      style={{ left: springX, top: springY }}
      className="pointer-events-none fixed z-[100] h-5 w-5 rounded-full border border-emerald-400/60 shadow-[0_0_30px_6px_rgba(16,185,129,0.25)]"
    />
  )
}

export default function App() {
  // Mouse glow for interactive surfaces
  React.useEffect(() => {
    const handler = (e) => {
      document.querySelectorAll('[data-glow]')?.forEach((el) => {
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

  const timeline = [
    { title: 'Red Team Operation – Retail', time: '2024', desc: 'Assumed-breach op uncovering token replay in internal APIs; built detections and hardening playbooks.', tags: ['Red Team', 'Detection'] },
    { title: 'SOC Detection Uplift', time: '2023', desc: 'Deployed high-signal detections for OAuth abuse and shadow admins in cloud workloads.', tags: ['SIEM', 'Cloud'] },
    { title: 'Pentest – Fintech', time: '2022', desc: 'AppSec assessment resulting in priority fixes across authz, secrets, and rate-limiting.', tags: ['AppSec', 'Web'] }
  ]

  const skills = ['Web Exploitation', 'Cloud Security', 'Threat Hunting', 'Detections', 'Incident Response', 'Secure Design', 'Network', 'Automation']

  const terminalLines = [
    'whoami && cat mission.txt',
    'nmap -sC -sV target --top-ports 1000',
    'aws iam simulate-principal-policy --policy-source-arn ...',
    'jq -r ".events[] | select(.severity>7)" alerts.json'
  ]

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-200 relative overflow-clip">
      {/* Ambient layers */}
      <div className="pointer-events-none fixed inset-0 opacity-[0.07]" style={{ background: 'url(https://grainy-gradients.vercel.app/noise.svg)' }} />
      <div className="pointer-events-none absolute -top-[30%] -right-[20%] h-[60vh] w-[60vh] rounded-full blur-[120px] bg-emerald-500/20" />

      <CursorFollower />

      {/* Corner brand nav */}
      <header className="fixed top-5 left-5 z-40">
        <a href="#home" className="group inline-flex items-center gap-2 px-3 py-1.5 rounded-md border border-emerald-500/30 bg-black/40 text-emerald-200/90 backdrop-blur">
          <div className="h-6 w-6 rounded-md bg-emerald-500/20 border border-emerald-500/40 grid place-items-center text-emerald-300">
            <Fingerprint size={16} />
          </div>
          <span className="font-semibold tracking-tight">YourHandle</span>
          <Sparkles size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
        </a>
      </header>

      {/* Side rail */}
      <aside className="fixed top-1/2 -translate-y-1/2 right-5 z-40 hidden md:flex flex-col gap-3">
        <a href="#work" className="px-2 py-1 rounded-md text-xs border border-zinc-800/80 hover:border-emerald-500/40 hover:text-emerald-300">Work</a>
        <a href="#timeline" className="px-2 py-1 rounded-md text-xs border border-zinc-800/80 hover:border-emerald-500/40 hover:text-emerald-300">Timeline</a>
        <a href="#skills" className="px-2 py-1 rounded-md text-xs border border-zinc-800/80 hover:border-emerald-500/40 hover:text-emerald-300">Skills</a>
        <a href="#contact" className="px-2 py-1 rounded-md text-xs border border-zinc-800/80 hover:border-emerald-500/40 hover:text-emerald-300">Contact</a>
      </aside>

      {/* Hero */}
      <section id="home" className="relative pt-24 md:pt-28">
        {/* Angled layer */}
        <div className="absolute inset-0 -z-10" aria-hidden>
          <div className="absolute inset-x-0 -top-32 h-[55vh] skew-y-[-6deg] origin-top bg-[radial-gradient(900px_300px_at_10%_-10%,rgba(16,185,129,0.20),transparent_40%),radial-gradient(900px_400px_at_110%_-20%,rgba(16,185,129,0.18),transparent_45%),linear-gradient(180deg,rgba(2,6,12,0.9),rgba(2,6,12,0.6))]" />
          {/* Subtle grid */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.07)_1px,transparent_1px)] bg-[size:40px_40px] opacity-30" />
        </div>

        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-12 gap-10 items-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="md:col-span-6 lg:col-span-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-300 text-[10px] uppercase tracking-[0.25em]">
              <Shield size={14} /> Offense + Defense
            </div>
            <h1 className="mt-4 text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-none">
              <GlitchText>
                Secure by Design
              </GlitchText>
            </h1>
            <p className="mt-4 text-zinc-400 text-base md:text-lg max-w-prose">
              Field-tested cybersecurity work across web, cloud, and detection engineering. Breaking to build stronger systems.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a href="#work" className="px-5 py-2.5 rounded-md bg-emerald-600 hover:bg-emerald-500 text-white font-medium transition-colors">View Work</a>
              <a href="#contact" className="px-5 py-2.5 rounded-md border border-zinc-800 hover:border-emerald-500/40 hover:text-emerald-300 transition-colors">Get in touch</a>
            </div>
            <div className="mt-8 grid grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl font-extrabold text-emerald-400">50+</div>
                <div className="text-xs text-zinc-400">Vulns Remediated</div>
              </div>
              <div>
                <div className="text-3xl font-extrabold text-emerald-400">15</div>
                <div className="text-xs text-zinc-400">Assessments</div>
              </div>
              <div>
                <div className="text-3xl font-extrabold text-emerald-400">4</div>
                <div className="text-xs text-zinc-400">Certifications</div>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7 }} className="md:col-span-6 lg:col-span-7 relative h-[360px] sm:h-[420px] md:h-[520px] rounded-xl border border-zinc-800 overflow-hidden bg-zinc-900" data-glow>
            <div className="pointer-events-none absolute inset-0" style={{ background: 'radial-gradient(600px_circle_at_var(--x,50%)_var(--y,50%),rgba(16,185,129,0.14),transparent_40%)' }} />
            <Spline scene="https://prod.spline.design/mwBbOy4jrazr59EO/scene.splinecode" style={{ width: '100%', height: '100%' }} />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-zinc-950/60 via-transparent to-transparent" />
          </motion.div>
        </div>

        {/* Skill ticker */}
        <div className="mt-12 border-y border-zinc-800/80 bg-zinc-950/60">
          <div className="relative overflow-hidden">
            <div className="flex gap-8 py-4 animate-[marquee_18s_linear_infinite] whitespace-nowrap text-emerald-300/90">
              {[...skills, ...skills, ...skills].map((s, i) => (
                <span key={i} className="inline-flex items-center gap-2">
                  <span className="i">{s}</span>
                  <span className="h-1 w-1 rounded-full bg-emerald-400/70 inline-block" />
                </span>
              ))}
            </div>
          </div>
        </div>
        <style>{`@keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }`}</style>
      </section>

      {/* Work grid */}
      <section id="work" className="relative">
        <div className="max-w-6xl mx-auto px-4 py-12 md:py-16">
          <div className="flex items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-emerald-300 text-xs uppercase tracking-widest">
                <Lock size={16} /> Case Studies
              </div>
              <h2 className="mt-2 text-3xl md:text-4xl font-bold text-zinc-100">Selected Work</h2>
            </div>
            <div className="h-px flex-1 bg-gradient-to-r from-emerald-500/30 via-emerald-500/10 to-transparent" />
          </div>
          <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {projects.map((p) => (
              <ProjectCard key={p.title} {...p} />
            ))}
          </div>
        </div>
      </section>

      {/* Timeline + Terminal */}
      <section id="timeline" className="relative">
        <div className="max-w-6xl mx-auto px-4 py-12 md:py-16 grid md:grid-cols-5 gap-8">
          <div className="md:col-span-3">
            <div className="flex items-center gap-2 text-emerald-300 text-xs uppercase tracking-widest">
              <Trophy size={16} /> Milestones
            </div>
            <h2 className="mt-2 text-3xl md:text-4xl font-bold text-zinc-100">Impact Timeline</h2>
            <NeonDivider />
            <Timeline items={timeline} />
          </div>
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 text-emerald-300 text-xs uppercase tracking-widest">
              <TerminalIcon size={16} /> Live Console
            </div>
            <h3 className="mt-2 text-xl font-semibold text-zinc-100">Signals I care about</h3>
            <div className="mt-4">
              <Terminal lines={terminalLines} />
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="relative">
        <div className="max-w-6xl mx-auto px-4 py-12 md:py-16">
          <div className="flex items-center gap-2 text-emerald-300 text-xs uppercase tracking-widest">
            <Mail size={16} /> Contact
          </div>
          <h2 className="mt-2 text-3xl md:text-4xl font-bold text-zinc-100">Let’s collaborate</h2>
          <NeonDivider />
          <div className="grid md:grid-cols-3 gap-6">
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
          <p className="text-sm text-zinc-500">© {new Date().getFullYear()} Your Name • Security-first • Crafted with intent</p>
          <div className="text-xs text-zinc-600 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-400/70" />
            <span>Integrity • Confidentiality • Availability</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
