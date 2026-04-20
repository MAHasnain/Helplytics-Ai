'use client';
import { useEffect, useState, useCallback } from 'react';
import useRequestStore from '@/store/requestStore';
import { Search, SlidersHorizontal, Plus, ArrowRight, Clock, Tag } from 'lucide-react';
import Link from 'next/link';

const categories = ['all', 'programming', 'design', 'math', 'science', 'language', 'career', 'other'];
const urgencies = ['all', 'low', 'medium', 'high'];

const urgencyStyle = {
  high: { bg: 'rgba(200,112,112,0.1)', color: '#c87070', border: 'rgba(200,112,112,0.2)' },
  medium: { bg: 'rgba(180,150,80,0.1)', color: '#b49650', border: 'rgba(180,150,80,0.2)' },
  low: { bg: 'rgba(110,160,110,0.1)', color: '#6ea06e', border: 'rgba(110,160,110,0.2)' },
};

const statusStyle = {
  open: { bg: 'rgba(110,160,110,0.08)', color: '#6ea06e' },
  'in-progress': { bg: 'rgba(180,150,80,0.08)', color: '#b49650' },
  solved: { bg: 'rgba(128,128,200,0.08)', color: '#8080c8' },
};

const categoryColors = {
  programming: '#6eb4c8', design: '#c8b96e', math: '#8080c8',
  science: '#6ea06e', language: '#c87070', career: '#b49650', other: 'rgba(240,235,224,0.4)',
};

function useDebounce(value, delay) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
}

export default function RequestsPage() {
  const { requests, getRequests, isLoading } = useRequestStore();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [urgency, setUrgency] = useState('');

  const debouncedSearch = useDebounce(search, 350);

  // ✅ Fetch whenever filters change
  useEffect(() => {
    const params = {};
    if (debouncedSearch) params.search = debouncedSearch;
    if (category && category !== 'all') params.category = category;
    if (urgency && urgency !== 'all') params.urgency = urgency;
    getRequests(params);
  }, [debouncedSearch, category, urgency]);

  const selectStyle = {
    background: '#111110', border: '1px solid rgba(240,235,224,0.1)',
    borderRadius: 8, padding: '9px 14px', fontSize: 13,
    color: 'rgba(240,235,224,0.6)', outline: 'none', cursor: 'pointer',
    fontFamily: "'DM Sans', sans-serif", appearance: 'none',
  };

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", padding: '48px 40px', maxWidth: 900 }}>

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 36 }}>
        <div>
          <p style={{ fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(240,235,224,0.3)', margin: '0 0 8px' }}>Community</p>
          <h1 style={{ fontFamily: "'Sora', sans-serif", fontSize: 30, fontWeight: 700, letterSpacing: '-0.025em', color: '#f0ebe0', margin: 0 }}>
            All Requests
          </h1>
        </div>
        <Link href="/requests/create" style={{
          display: 'flex', alignItems: 'center', gap: 8,
          background: '#e8e0cc', color: '#0c0c0b', textDecoration: 'none',
          padding: '10px 20px', borderRadius: 8, fontSize: 14, fontWeight: 600,
          letterSpacing: '-0.01em', fontFamily: "'DM Sans', sans-serif",
        }}>
          <Plus size={15} /> New Request
        </Link>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 28, flexWrap: 'wrap' }}>
        {/* Search */}
        <div style={{ position: 'relative', flex: 1, minWidth: 200 }}>
          <Search size={14} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'rgba(240,235,224,0.3)' }} />
          <input
            type="text" placeholder="Search requests..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              width: '100%', background: '#111110',
              border: `1px solid ${search ? 'rgba(240,235,224,0.2)' : 'rgba(240,235,224,0.1)'}`,
              borderRadius: 8, padding: '9px 14px 9px 36px',
              fontSize: 13, color: '#f0ebe0', outline: 'none',
              fontFamily: "'DM Sans', sans-serif", boxSizing: 'border-box',
              transition: 'border-color 0.2s',
            }}
          />
          {search && (
            <button onClick={() => setSearch('')} style={{
              position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)',
              background: 'none', border: 'none', color: 'rgba(240,235,224,0.3)',
              cursor: 'pointer', fontSize: 16, lineHeight: 1, padding: 2,
            }}>×</button>
          )}
        </div>

        {/* Category */}
        <div style={{ position: 'relative' }}>
          <Tag size={13} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: 'rgba(240,235,224,0.3)', pointerEvents: 'none' }} />
          <select value={category} onChange={e => setCategory(e.target.value)}
            style={{ ...selectStyle, paddingLeft: 30 }}>
            {categories.map(c => (
              <option key={c} value={c === 'all' ? '' : c} style={{ background: '#1a1a18' }}>
                {c.charAt(0).toUpperCase() + c.slice(1)}
              </option>
            ))}
          </select>
        </div>

        {/* Urgency */}
        <div style={{ position: 'relative' }}>
          <SlidersHorizontal size={13} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: 'rgba(240,235,224,0.3)', pointerEvents: 'none' }} />
          <select value={urgency} onChange={e => setUrgency(e.target.value)}
            style={{ ...selectStyle, paddingLeft: 30 }}>
            {urgencies.map(u => (
              <option key={u} value={u === 'all' ? '' : u} style={{ background: '#1a1a18' }}>
                {u.charAt(0).toUpperCase() + u.slice(1)} urgency
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Active filter chips */}
      {(search || (category && category !== 'all') || (urgency && urgency !== 'all')) && (
        <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap', alignItems: 'center' }}>
          <span style={{ fontSize: 12, color: 'rgba(240,235,224,0.3)', marginRight: 4 }}>Filters:</span>
          {search && (
            <span style={{ fontSize: 12, background: 'rgba(240,235,224,0.06)', border: '1px solid rgba(240,235,224,0.1)', color: 'rgba(240,235,224,0.6)', padding: '3px 10px', borderRadius: 100 }}>
              "{search}"
            </span>
          )}
          {category && category !== 'all' && (
            <span style={{ fontSize: 12, background: `${categoryColors[category]}15`, border: `1px solid ${categoryColors[category]}30`, color: categoryColors[category], padding: '3px 10px', borderRadius: 100 }}>
              {category}
            </span>
          )}
          {urgency && urgency !== 'all' && (
            <span style={{ fontSize: 12, background: urgencyStyle[urgency]?.bg, border: `1px solid ${urgencyStyle[urgency]?.border}`, color: urgencyStyle[urgency]?.color, padding: '3px 10px', borderRadius: 100 }}>
              {urgency} urgency
            </span>
          )}
          <button onClick={() => { setSearch(''); setCategory(''); setUrgency(''); }}
            style={{ fontSize: 12, background: 'none', border: 'none', color: 'rgba(240,235,224,0.3)', cursor: 'pointer', padding: '3px 8px', textDecoration: 'underline' }}>
            Clear all
          </button>
        </div>
      )}

      {/* Results count */}
      {!isLoading && (
        <p style={{ fontSize: 12, color: 'rgba(240,235,224,0.25)', margin: '0 0 16px', letterSpacing: '0.02em' }}>
          {requests.length} request{requests.length !== 1 ? 's' : ''} found
        </p>
      )}

      {/* Cards */}
      {isLoading ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {[1, 2, 3].map(n => (
            <div key={n} style={{ background: '#111110', border: '1px solid rgba(240,235,224,0.06)', borderRadius: 12, padding: '24px', height: 100 }} />
          ))}
        </div>
      ) : requests.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '80px 0', background: '#111110', border: '1px solid rgba(240,235,224,0.06)', borderRadius: 12 }}>
          <Search size={28} style={{ color: 'rgba(240,235,224,0.1)', marginBottom: 12 }} />
          <p style={{ fontSize: 15, color: 'rgba(240,235,224,0.3)', margin: '0 0 6px' }}>No requests found</p>
          <p style={{ fontSize: 13, color: 'rgba(240,235,224,0.2)', margin: 0 }}>Try different filters or be the first to post one</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {requests.map(req => {
            const urg = urgencyStyle[req.urgency] || urgencyStyle.low;
            const st = statusStyle[req.status] || statusStyle.open;
            const catColor = categoryColors[req.category] || 'rgba(240,235,224,0.4)';

            return (
              <Link key={req._id} href={`/requests/${req._id}`} style={{ textDecoration: 'none' }}>
                <div style={{
                  background: '#111110', border: '1px solid rgba(240,235,224,0.07)',
                  borderRadius: 12, padding: '20px 24px',
                  transition: 'border-color 0.15s, background 0.15s',
                  cursor: 'pointer',
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(240,235,224,0.15)'; e.currentTarget.style.background = '#151513'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(240,235,224,0.07)'; e.currentTarget.style.background = '#111110'; }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16 }}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <h3 style={{ fontFamily: "'Sora', sans-serif", fontSize: 15, fontWeight: 600, color: '#f0ebe0', margin: '0 0 8px', letterSpacing: '-0.01em', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {req.title}
                      </h3>
                      <p style={{ fontSize: 13, color: 'rgba(240,235,224,0.4)', margin: '0 0 14px', lineHeight: 1.6, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                        {req.description}
                      </p>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                        {/* Author avatar */}
                        <div style={{ width: 22, height: 22, borderRadius: '50%', background: `${catColor}20`, border: `1px solid ${catColor}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, color: catColor, fontWeight: 600 }}>
                          {req.author?.username?.[0]?.toUpperCase()}
                        </div>
                        <span style={{ fontSize: 12, color: 'rgba(240,235,224,0.3)' }}>by {req.author?.username}</span>

                        <span style={{ fontSize: 12, color: 'rgba(240,235,224,0.1)' }}>·</span>

                        {/* Category */}
                        <span style={{ fontSize: 11, color: catColor, background: `${catColor}12`, border: `1px solid ${catColor}25`, padding: '2px 8px', borderRadius: 100 }}>
                          {req.category}
                        </span>

                        {/* Urgency */}
                        <span style={{ fontSize: 11, color: urg.color, background: urg.bg, border: `1px solid ${urg.border}`, padding: '2px 8px', borderRadius: 100 }}>
                          {req.urgency}
                        </span>

                        {/* Date */}
                        <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, color: 'rgba(240,235,224,0.2)' }}>
                          <Clock size={10} />
                          {new Date(req.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 12, flexShrink: 0 }}>
                      <span style={{ fontSize: 11, color: st.color, background: st.bg, padding: '4px 10px', borderRadius: 100 }}>
                        {req.status}
                      </span>
                      <ArrowRight size={14} style={{ color: 'rgba(240,235,224,0.2)' }} />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}