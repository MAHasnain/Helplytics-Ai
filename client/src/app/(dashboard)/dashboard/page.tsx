'use client';
import { useEffect } from 'react';
import useUserStore from '@/store/userStore';
import useAuthStore from '@/store/authStore';
import { TrendingUp, Users, BookOpen, CheckCircle, Medal, Plus, ArrowRight } from 'lucide-react';
import Link from 'next/link';
 
const badgeColors: Record<string, { bg: string; border: string; text: string }> = {
  'First Helper':    { bg: 'rgba(200,185,110,0.08)', border: 'rgba(200,185,110,0.25)', text: '#c8b96e' },
  'Rising Star':     { bg: 'rgba(110,180,200,0.08)', border: 'rgba(110,180,200,0.25)', text: '#6eb4c8' },
  'Top Contributor': { bg: 'rgba(200,110,110,0.08)', border: 'rgba(200,110,110,0.25)', text: '#c87070' },
};
 
const statusStyle: Record<string, { bg: string; color: string; dot: string }> = {
  open:          { bg: 'rgba(110,160,110,0.1)',  color: '#6ea06e', dot: '#6ea06e' },
  'in-progress': { bg: 'rgba(180,150,80,0.1)',   color: '#b49650', dot: '#b49650' },
  solved:        { bg: 'rgba(128,128,200,0.1)',  color: '#8080c8', dot: '#8080c8' },
};
 
const statCards = (stats: any) => [
  { label: 'Trust Score',   value: stats.trustScore    ?? 0, icon: TrendingUp,   accent: '#c8b96e' },
  { label: 'People Helped', value: stats.totalHelped   ?? 0, icon: Users,        accent: '#6ea06e' },
  { label: 'My Requests',   value: stats.totalRequests ?? 0, icon: BookOpen,     accent: '#8080c8' },
  { label: 'Solved',        value: stats.solved        ?? 0, icon: CheckCircle,  accent: '#6eb4c8' },
];
 
export default function DashboardPage() {
  const { dashboard, getDashboard, isLoading } = useUserStore();
  const { user } = useAuthStore();
 
  useEffect(() => { getDashboard(); }, []);
 
  const stats   = dashboard?.stats    || {};
  const requests = dashboard?.recentRequests || [];
  const badges  = user?.badges        || [];
 
  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", padding: '48px 40px', maxWidth: 1000 }}>
 
      {/* Header */}
      <div style={{ marginBottom: 40 }}>
        <p style={{ fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(240,235,224,0.3)', margin: '0 0 8px' }}>Overview</p>
        <h1 style={{ fontFamily: "'Sora', sans-serif", fontSize: 30, fontWeight: 700, letterSpacing: '-0.025em', color: '#f0ebe0', margin: 0 }}>
          Good to see you, {user?.username}
        </h1>
      </div>
 
      {/* Stat Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12, marginBottom: 24 }}>
        {statCards(stats).map(({ label, value, icon: Icon, accent }) => (
          <div key={label} style={{
            background: '#111110',
            border: '1px solid rgba(240,235,224,0.07)',
            borderRadius: 12, padding: '22px 20px',
            position: 'relative', overflow: 'hidden',
          }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: accent, opacity: 0.8 }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
              <p style={{ fontSize: 12, color: 'rgba(240,235,224,0.35)', margin: 0, letterSpacing: '0.04em' }}>{label}</p>
              <div style={{ width: 28, height: 28, borderRadius: 8, background: `${accent}15`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon size={14} color={accent} />
              </div>
            </div>
            <p style={{ fontFamily: "'Sora', sans-serif", fontSize: 34, fontWeight: 700, color: '#f0ebe0', margin: 0, letterSpacing: '-0.03em', lineHeight: 1 }}>{value}</p>
          </div>
        ))}
      </div>
 
      {/* Badges + Requests */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 16 }}>
 
        {/* Badges */}
        <div style={{ background: '#111110', border: '1px solid rgba(240,235,224,0.07)', borderRadius: 12, padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
            <Medal size={14} color="rgba(240,235,224,0.3)" />
            <p style={{ fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(240,235,224,0.3)', margin: 0 }}>Badges</p>
          </div>
 
          {badges.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '28px 0' }}>
              <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'rgba(240,235,224,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>
                <Medal size={18} color="rgba(240,235,224,0.15)" />
              </div>
              <p style={{ fontSize: 13, color: 'rgba(240,235,224,0.2)', margin: 0, lineHeight: 1.6 }}>Help someone to earn your first badge</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {badges.map((badge: string) => {
                const s = badgeColors[badge as keyof typeof badgeColors] || { bg: 'rgba(240,235,224,0.05)', border: 'rgba(240,235,224,0.1)', text: 'rgba(240,235,224,0.6)' };
                return (
                  <div key={badge} style={{ background: s.bg, border: `1px solid ${s.border}`, borderRadius: 8, padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: s.text, flexShrink: 0 }} />
                    <span style={{ fontSize: 13, color: s.text, fontWeight: 500 }}>{badge}</span>
                  </div>
                );
              })}
            </div>
          )}
 
          {/* Trust progress */}
          <div style={{ marginTop: 24, paddingTop: 20, borderTop: '1px solid rgba(240,235,224,0.06)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ fontSize: 12, color: 'rgba(240,235,224,0.3)' }}>Trust progress</span>
              <span style={{ fontSize: 12, color: '#c8b96e', fontWeight: 500 }}>{stats.trustScore ?? 0} / 100</span>
            </div>
            <div style={{ background: 'rgba(240,235,224,0.06)', borderRadius: 4, height: 4 }}>
              <div style={{ width: `${Math.min((stats.trustScore ?? 0), 100)}%`, height: '100%', background: '#c8b96e', borderRadius: 4, transition: 'width 0.8s ease' }} />
            </div>
          </div>
        </div>
 
        {/* Recent Requests */}
        <div style={{ background: '#111110', border: '1px solid rgba(240,235,224,0.07)', borderRadius: 12, padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <BookOpen size={14} color="rgba(240,235,224,0.3)" />
              <p style={{ fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(240,235,224,0.3)', margin: 0 }}>Recent requests</p>
            </div>
            <Link href="/requests/create" style={{
              display: 'flex', alignItems: 'center', gap: 6,
              fontSize: 12, color: 'rgba(240,235,224,0.5)', textDecoration: 'none',
              border: '1px solid rgba(240,235,224,0.1)', borderRadius: 6, padding: '5px 12px',
            }}>
              <Plus size={12} /> New
            </Link>
          </div>
 
          {isLoading ? (
            <div style={{ padding: '40px 0', textAlign: 'center', color: 'rgba(240,235,224,0.2)', fontSize: 14 }}>Loading...</div>
          ) : requests.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 0' }}>
              <p style={{ fontSize: 13, color: 'rgba(240,235,224,0.2)', margin: 0 }}>No requests yet — post your first one</p>
            </div>
          ) : (
            <div>
              {requests.map((req, i) => {
                const st = statusStyle[req.status] || statusStyle.open;
                return (
                  <Link key={req._id} href={`/requests/${req._id}`} style={{
                    textDecoration: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    padding: '14px 0',
                    borderBottom: i < requests.length - 1 ? '1px solid rgba(240,235,224,0.05)' : 'none',
                  }}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ fontSize: 14, color: '#f0ebe0', margin: '0 0 4px', fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{req.title}</p>
                      <p style={{ fontSize: 12, color: 'rgba(240,235,224,0.3)', margin: 0 }}>{req.category} · {new Date(req.createdAt).toLocaleDateString()}</p>
                    </div>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 5, background: st.bg, color: st.color, fontSize: 11, padding: '4px 10px', borderRadius: 100, marginLeft: 16, flexShrink: 0, letterSpacing: '0.03em' }}>
                      <span style={{ width: 5, height: 5, borderRadius: '50%', background: st.dot }} />
                      {req.status}
                    </span>
                  </Link>
                );
              })}
            </div>
          )}
 
          <Link href="/requests" style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
            marginTop: 20, paddingTop: 16, borderTop: '1px solid rgba(240,235,224,0.05)',
            fontSize: 13, color: 'rgba(240,235,224,0.3)', textDecoration: 'none',
          }}>
            View all requests <ArrowRight size={13} />
          </Link>
        </div>
      </div>
    </div>
  );
}