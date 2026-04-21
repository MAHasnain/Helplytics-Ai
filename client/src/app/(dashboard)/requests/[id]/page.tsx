'use client';
import { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import useRequestStore from '@/store/requestStore';
import useAuthStore from '@/store/authStore';
import { ArrowLeft, Clock, MapPin, Wrench, HandHeart, CheckCircle2, Tag, AlertTriangle } from 'lucide-react';
import Link from 'next/link';

const urgencyStyle = {
  high:   { bg: 'rgba(200,112,112,0.1)', color: '#c87070', border: 'rgba(200,112,112,0.25)', label: 'High urgency' },
  medium: { bg: 'rgba(180,150,80,0.1)',  color: '#b49650', border: 'rgba(180,150,80,0.25)',  label: 'Medium urgency' },
  low:    { bg: 'rgba(110,160,110,0.1)', color: '#6ea06e', border: 'rgba(110,160,110,0.25)', label: 'Low urgency' },
};

const statusStyle = {
  open:          { bg: 'rgba(110,160,110,0.08)',  color: '#6ea06e', dot: '#6ea06e'  },
  'in-progress': { bg: 'rgba(180,150,80,0.08)',   color: '#b49650', dot: '#b49650'  },
  solved:        { bg: 'rgba(128,128,200,0.08)',  color: '#8080c8', dot: '#8080c8'  },
};

const categoryColors = {
  programming: '#6eb4c8', design: '#c8b96e', math: '#8080c8',
  science: '#6ea06e', language: '#c87070', career: '#b49650', other: 'rgba(240,235,224,0.4)',
};

export default function RequestDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { request, getRequestById, offerHelp, markSolved, isLoading } = useRequestStore();
  const { user } = useAuthStore();

  useEffect(() => { if (id) getRequestById(id); }, [id]);

  if (isLoading || !request) return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", padding: '48px 40px', color: 'rgba(240,235,224,0.3)', fontSize: 14 }}>
      Loading...
    </div>
  );

  const isAuthor  = user?._id === request.author?._id;
  const isHelper  = request.helpers?.some(h => h._id === user?._id);
  const canHelp   = !isAuthor && !isHelper && request.status !== 'solved';
  const canSolve  = isAuthor && request.status !== 'solved';

  const urg = urgencyStyle[request.urgency] || urgencyStyle.low;
  const st  = statusStyle[request.status]   || statusStyle.open;
  const catColor = categoryColors[request.category] || 'rgba(240,235,224,0.4)';

  const handleHelp = async () => {
    await offerHelp(id);
    getRequestById(id);
  };

  const handleSolve = async () => {
    await markSolved(id);
    getRequestById(id);
  };

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", minHeight: '100vh', padding: '40px' }}>

      {/* Back */}
      <button onClick={() => router.back()} style={{
        display: 'flex', alignItems: 'center', gap: 8,
        background: 'none', border: 'none', cursor: 'pointer',
        color: 'rgba(240,235,224,0.35)', fontSize: 13, padding: 0, marginBottom: 32,
        fontFamily: "'DM Sans', sans-serif",
        transition: 'color 0.15s',
      }}
        onMouseEnter={e => e.currentTarget.style.color = 'rgba(240,235,224,0.7)'}
        onMouseLeave={e => e.currentTarget.style.color = 'rgba(240,235,224,0.35)'}
      >
        <ArrowLeft size={14} /> Back to requests
      </button>

      {/* Main Card — full width, min half page */}
      <div style={{
        background: '#111110',
        border: '1px solid rgba(240,235,224,0.08)',
        borderRadius: 16,
        minHeight: '50vh',
        marginBottom: 16,
        overflow: 'hidden',
      }}>
        {/* Top accent bar */}
        <div style={{ height: 3, background: `linear-gradient(90deg, ${catColor}, transparent)` }} />

        {/* Content Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', minHeight: 'calc(50vh - 3px)' }}>

          {/* Left — Request Info */}
          <div style={{ padding: '36px 40px', borderRight: '1px solid rgba(240,235,224,0.06)' }}>

            {/* Pills row */}
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 20 }}>
              <span style={{ fontSize: 11, color: st.color, background: st.bg, padding: '4px 12px', borderRadius: 100, display: 'flex', alignItems: 'center', gap: 5 }}>
                <span style={{ width: 5, height: 5, borderRadius: '50%', background: st.dot }} />
                {request.status}
              </span>
              <span style={{ fontSize: 11, color: urg.color, background: urg.bg, border: `1px solid ${urg.border}`, padding: '4px 12px', borderRadius: 100 }}>
                {urg.label}
              </span>
              <span style={{ fontSize: 11, color: catColor, background: `${catColor}12`, border: `1px solid ${catColor}25`, padding: '4px 12px', borderRadius: 100 }}>
                {request.category}
              </span>
            </div>

            {/* Title */}
            <h1 style={{
              fontFamily: "'Sora', sans-serif", fontSize: 26, fontWeight: 700,
              letterSpacing: '-0.025em', color: '#f0ebe0', margin: '0 0 20px', lineHeight: 1.2,
            }}>
              {request.title}
            </h1>

            {/* Description */}
            <p style={{ fontSize: 15, lineHeight: 1.8, color: 'rgba(240,235,224,0.55)', margin: '0 0 32px', fontWeight: 300 }}>
              {request.description}
            </p>

            {/* Meta row */}
            <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
              {request.location && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <MapPin size={13} color="rgba(240,235,224,0.25)" />
                  <span style={{ fontSize: 13, color: 'rgba(240,235,224,0.35)' }}>{request.location}</span>
                </div>
              )}
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <Clock size={13} color="rgba(240,235,224,0.25)" />
                <span style={{ fontSize: 13, color: 'rgba(240,235,224,0.35)' }}>
                  {new Date(request.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}
                </span>
              </div>
            </div>

            {/* Skills tags */}
            {request.skills?.length > 0 && (
              <div style={{ marginTop: 24, paddingTop: 24, borderTop: '1px solid rgba(240,235,224,0.06)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                  <Wrench size={13} color="rgba(240,235,224,0.25)" />
                  <span style={{ fontSize: 12, color: 'rgba(240,235,224,0.3)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>Skills needed</span>
                </div>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  {request.skills.map(skill => (
                    <span key={skill} style={{
                      fontSize: 12, background: 'rgba(240,235,224,0.05)',
                      border: '1px solid rgba(240,235,224,0.1)',
                      color: 'rgba(240,235,224,0.5)', padding: '4px 12px', borderRadius: 100,
                    }}>{skill}</span>
                  ))}
                </div>
              </div>
            )}

            {/* Tags */}
            {request.tags?.length > 0 && (
              <div style={{ marginTop: 20, display: 'flex', gap: 6, flexWrap: 'wrap', alignItems: 'center' }}>
                <Tag size={12} color="rgba(240,235,224,0.2)" />
                {request.tags.map(tag => (
                  <span key={tag} style={{ fontSize: 11, color: 'rgba(240,235,224,0.25)', background: 'rgba(240,235,224,0.04)', padding: '2px 8px', borderRadius: 100 }}>
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Action Buttons */}
            <div style={{ marginTop: 36, display: 'flex', gap: 10 }}>
              {canHelp && (
                <button onClick={handleHelp} style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  background: '#e8e0cc', color: '#0c0c0b',
                  border: 'none', borderRadius: 10, padding: '12px 24px',
                  fontSize: 14, fontWeight: 600, cursor: 'pointer',
                  fontFamily: "'DM Sans', sans-serif",
                }}>
                  <HandHeart size={15} /> I Can Help
                </button>
              )}
              {canSolve && (
                <button onClick={handleSolve} style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  background: 'rgba(110,160,110,0.15)', color: '#6ea06e',
                  border: '1px solid rgba(110,160,110,0.3)', borderRadius: 10, padding: '12px 24px',
                  fontSize: 14, fontWeight: 600, cursor: 'pointer',
                  fontFamily: "'DM Sans', sans-serif",
                }}>
                  <CheckCircle2 size={15} /> Mark as Solved
                </button>
              )}
              {isHelper && !isAuthor && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#6ea06e', fontSize: 14 }}>
                  <CheckCircle2 size={15} /> You are helping
                </div>
              )}
              {request.status === 'solved' && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#8080c8', fontSize: 14 }}>
                  <CheckCircle2 size={15} /> This request is solved
                </div>
              )}
            </div>
          </div>

          {/* Right — Author + Helpers */}
          <div style={{ padding: '36px 28px', display: 'flex', flexDirection: 'column', gap: 28 }}>

            {/* Author */}
            <div>
              <p style={{ fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(240,235,224,0.25)', margin: '0 0 14px' }}>Posted by</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{
                  width: 38, height: 38, borderRadius: '50%',
                  background: `${catColor}15`, border: `1px solid ${catColor}30`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 14, fontWeight: 700, color: catColor, flexShrink: 0,
                }}>
                  {request.author?.username?.[0]?.toUpperCase()}
                </div>
                <div>
                  <p style={{ fontSize: 14, fontWeight: 500, color: '#f0ebe0', margin: '0 0 2px' }}>{request.author?.username}</p>
                  <p style={{ fontSize: 12, color: '#c8b96e', margin: 0 }}>⭐ {request.author?.trustScore ?? 0} Trust Score</p>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div style={{ height: 1, background: 'rgba(240,235,224,0.06)' }} />

            {/* Helpers */}
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(240,235,224,0.25)', margin: '0 0 14px' }}>
                Helpers {request.helpers?.length > 0 && `(${request.helpers.length})`}
              </p>

              {request.helpers?.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '24px 0' }}>
                  <HandHeart size={22} style={{ color: 'rgba(240,235,224,0.1)', marginBottom: 8 }} />
                  <p style={{ fontSize: 13, color: 'rgba(240,235,224,0.2)', margin: 0, lineHeight: 1.6 }}>
                    No helpers yet.<br />Be the first to help.
                  </p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10, maxHeight: 320, overflowY: 'auto' }}>
                  {request.helpers.map(helper => (
                    <div key={helper._id} style={{
                      display: 'flex', alignItems: 'center', gap: 10,
                      padding: '10px 12px', borderRadius: 8,
                      background: 'rgba(240,235,224,0.03)',
                      border: '1px solid rgba(240,235,224,0.06)',
                    }}>
                      <div style={{
                        width: 32, height: 32, borderRadius: '50%',
                        background: 'rgba(110,160,110,0.12)', border: '1px solid rgba(110,160,110,0.25)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 12, fontWeight: 700, color: '#6ea06e', flexShrink: 0,
                      }}>
                        {helper.username?.[0]?.toUpperCase()}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{ fontSize: 13, fontWeight: 500, color: '#f0ebe0', margin: '0 0 1px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {helper.username}
                        </p>
                        <p style={{ fontSize: 11, color: '#c8b96e', margin: 0 }}>⭐ {helper.trustScore ?? 0}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}