"use client";
import Link from 'next/link';
import { Zap, ShieldCheck, Award, Rss } from 'lucide-react';

const features = [
  { icon: <Zap size={20} />, title: 'Smart Matching', desc: '...' },
  { icon: <ShieldCheck size={20} />, title: 'Trust Score System', desc: '...' },
  { icon: <Award size={20} />, title: 'Badge & Rewards', desc: '...' },
  { icon: <Rss size={20} />, title: 'Open Feed', desc: '...' },
];


const steps = [
  { num: '01', title: 'Create your profile', desc: 'Set your skills, interests, and whether you want to give help, get help, or both.' },
  { num: '02', title: 'Post or browse requests', desc: 'Describe what you need or scroll the live feed to find someone you can help today.' },
  { num: '03', title: 'Connect and solve', desc: 'Offer help directly on a request. Mark it solved. Earn trust points and badges.' },
];

const stats = [
  { value: '2.4k+', label: 'Requests resolved' },
  { value: '800+', label: 'Active helpers' },
  { value: '98%', label: 'Satisfaction rate' },
  { value: '40+', label: 'Skill categories' },
];

export default function page() {
  return (
    <main style={{ fontFamily: "'DM Sans', sans-serif", background: '#0c0c0b', color: '#f0ebe0', minHeight: '100vh' }}>

      <header style={{
        position: 'sticky', top: 0, zIndex: 50,
        borderBottom: '1px solid rgba(240,235,224,0.08)',
        background: 'rgba(12,12,11,0.85)',
        backdropFilter: 'blur(12px)',
        padding: '0 2rem',
      }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: 20, letterSpacing: '-0.02em', color: '#f0ebe0' }}>
            Helplytics
          </span>
          <nav style={{ display: 'flex', gap: 32, alignItems: 'center' }}>
            {['Features', 'How it works', 'Leaderboard'].map(n => (
              <a key={n} href={`#${n.toLowerCase().replace(/ /g, '-')}`}
                style={{ fontSize: 14, color: 'rgba(240,235,224,0.55)', textDecoration: 'none', letterSpacing: '0.01em', transition: 'color 0.2s' }}
                onMouseEnter={e => e.target.style.color = '#f0ebe0'}
                onMouseLeave={e => e.target.style.color = 'rgba(240,235,224,0.55)'}
              >{n}</a>
            ))}
          </nav>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <Link href="/login" style={{
              fontSize: 14, color: 'rgba(240,235,224,0.6)', textDecoration: 'none', padding: '8px 16px',
            }}>Sign in</Link>
            <Link href="/register" style={{
              fontSize: 14, fontWeight: 500, background: '#e8e0cc', color: '#0c0c0b',
              textDecoration: 'none', padding: '8px 20px', borderRadius: 8,
              letterSpacing: '0.01em',
            }}>Get started</Link>
          </div>
        </div>
      </header>

      <section style={{ padding: '120px 2rem 100px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', top: '10%', left: '50%', transform: 'translateX(-50%)',
          width: 600, height: 600, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(232,224,204,0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div style={{ maxWidth: 760, margin: '0 auto', position: 'relative' }}>
          <span style={{
            display: 'inline-block', fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase',
            color: 'rgba(240,235,224,0.4)', border: '1px solid rgba(240,235,224,0.12)',
            padding: '6px 16px', borderRadius: 100, marginBottom: 32,
            fontFamily: "'DM Sans', sans-serif",
          }}>Community-powered peer support</span>

          <h1 style={{
            fontFamily: "'Sora', sans-serif",
            fontSize: 'clamp(42px, 6vw, 72px)',
            fontWeight: 700,
            lineHeight: 1.08,
            letterSpacing: '-0.03em',
            color: '#f0ebe0',
            margin: '0 0 28px',
          }}>
            Find help faster.<br />
            <span style={{ color: 'rgba(240,235,224,0.35)' }}>Become help that matters.</span>
          </h1>

          <p style={{
            fontSize: 18, lineHeight: 1.7, color: 'rgba(240,235,224,0.5)',
            maxWidth: 520, margin: '0 auto 48px',
            fontWeight: 300,
          }}>
            Helplytics connects people who need help with those who can give it —
            building trust, earning recognition, and solving real problems together.
          </p>

          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/register" style={{
              background: '#e8e0cc', color: '#0c0c0b', textDecoration: 'none',
              padding: '14px 32px', borderRadius: 10, fontSize: 15, fontWeight: 600,
              letterSpacing: '-0.01em',
            }}>Join the community</Link>
            <Link href="/login" style={{
              background: 'transparent', color: '#f0ebe0', textDecoration: 'none',
              padding: '14px 32px', borderRadius: 10, fontSize: 15,
              border: '1px solid rgba(240,235,224,0.15)',
            }}>Sign in →</Link>
          </div>
        </div>
      </section>

      <section style={{
        borderTop: '1px solid rgba(240,235,224,0.08)',
        borderBottom: '1px solid rgba(240,235,224,0.08)',
        padding: '40px 2rem',
      }}>
        <div style={{
          maxWidth: 1100, margin: '0 auto',
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0,
        }}>
          {stats.map((s, i) => (
            <div key={s.label} style={{
              textAlign: 'center', padding: '0 24px',
              borderRight: i < 3 ? '1px solid rgba(240,235,224,0.08)' : 'none',
            }}>
              <p style={{ fontFamily: "'Sora', sans-serif", fontSize: 36, fontWeight: 700, color: '#f0ebe0', margin: '0 0 4px', letterSpacing: '-0.03em' }}>{s.value}</p>
              <p style={{ fontSize: 13, color: 'rgba(240,235,224,0.4)', margin: 0, letterSpacing: '0.02em' }}>{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="features" style={{ padding: '100px 2rem' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ marginBottom: 64 }}>
            <p style={{ fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(240,235,224,0.35)', marginBottom: 16 }}>Platform features</p>
            <h2 style={{ fontFamily: "'Sora', sans-serif", fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 700, letterSpacing: '-0.025em', color: '#f0ebe0', margin: 0, lineHeight: 1.2 }}>
              More than a form.<br />More like an ecosystem.
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 1, background: 'rgba(240,235,224,0.08)' }}>
            {features.map((f, i) => (
              <div key={f.title} style={{
                background: '#0c0c0b', padding: '48px 40px',
                transition: 'background 0.2s',
              }}
                onMouseEnter={e => e.currentTarget.style.background = '#111110'}
                onMouseLeave={e => e.currentTarget.style.background = '#0c0c0b'}
              >
                <span style={{ marginBottom: 20, display: 'block', color: 'rgba(240,235,224,0.4)' }}>
                  {f.icon}
                </span>
                <h3 style={{ fontFamily: "'Sora', sans-serif", fontSize: 20, fontWeight: 600, color: '#f0ebe0', margin: '0 0 12px', letterSpacing: '-0.02em' }}>{f.title}</h3>
                <p style={{ fontSize: 15, lineHeight: 1.7, color: 'rgba(240,235,224,0.45)', margin: 0, fontWeight: 300 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="how-it-works" style={{ padding: '100px 2rem', borderTop: '1px solid rgba(240,235,224,0.08)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
          <div>
            <p style={{ fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(240,235,224,0.35)', marginBottom: 16 }}>How it works</p>
            <h2 style={{ fontFamily: "'Sora', sans-serif", fontSize: 'clamp(28px, 3.5vw, 40px)', fontWeight: 700, letterSpacing: '-0.025em', color: '#f0ebe0', margin: '0 0 20px', lineHeight: 1.2 }}>
              From struggling alone to solving together.
            </h2>
            <p style={{ fontSize: 15, lineHeight: 1.8, color: 'rgba(240,235,224,0.45)', margin: 0, fontWeight: 300 }}>
              Helplytics turns isolated problems into community moments — where asking for help
              is respected, and giving it is rewarded.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {steps.map((s, i) => (
              <div key={s.num} style={{
                display: 'flex', gap: 28, padding: '32px 0',
                borderBottom: i < steps.length - 1 ? '1px solid rgba(240,235,224,0.08)' : 'none',
              }}>
                <span style={{ fontFamily: "'Sora', sans-serif", fontSize: 13, color: 'rgba(240,235,224,0.2)', fontWeight: 600, letterSpacing: '0.05em', minWidth: 28, paddingTop: 3 }}>{s.num}</span>
                <div>
                  <h3 style={{ fontFamily: "'Sora', sans-serif", fontSize: 17, fontWeight: 600, color: '#f0ebe0', margin: '0 0 8px', letterSpacing: '-0.01em' }}>{s.title}</h3>
                  <p style={{ fontSize: 14, lineHeight: 1.7, color: 'rgba(240,235,224,0.4)', margin: 0, fontWeight: 300 }}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{
        padding: '100px 2rem',
        borderTop: '1px solid rgba(240,235,224,0.08)',
        textAlign: 'center',
      }}>
        <div style={{ maxWidth: 600, margin: '0 auto' }}>
          <h2 style={{ fontFamily: "'Sora', sans-serif", fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 700, letterSpacing: '-0.03em', color: '#f0ebe0', margin: '0 0 20px', lineHeight: 1.1 }}>
            Ready to build something together?
          </h2>
          <p style={{ fontSize: 16, color: 'rgba(240,235,224,0.4)', margin: '0 0 40px', fontWeight: 300, lineHeight: 1.7 }}>
            Join hundreds of people already helping each other grow — for free.
          </p>
          <Link href="/register" style={{
            display: 'inline-block', background: '#e8e0cc', color: '#0c0c0b',
            textDecoration: 'none', padding: '16px 40px', borderRadius: 10,
            fontSize: 15, fontWeight: 600, letterSpacing: '-0.01em',
          }}>Create your account →</Link>
        </div>
      </section>

      <footer style={{
        borderTop: '1px solid rgba(240,235,224,0.08)',
        padding: '48px 2rem',
      }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 24 }}>
          <span style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: 16, color: 'rgba(240,235,224,0.5)' }}>Helplytics</span>
          <p style={{ fontSize: 13, color: 'rgba(240,235,224,0.25)', margin: 0 }}>
            © {new Date().getFullYear()} Helplytics. Built with purpose.
          </p>
          <div style={{ display: 'flex', gap: 24 }}>
            {['Privacy', 'Terms', 'Contact'].map(l => (
              <a key={l} href="#" style={{ fontSize: 13, color: 'rgba(240,235,224,0.3)', textDecoration: 'none' }}>{l}</a>
            ))}
          </div>
        </div>
      </footer>
    </main>
  );
}