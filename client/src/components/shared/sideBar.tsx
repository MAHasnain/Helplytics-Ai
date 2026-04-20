
'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import useAuthStore from '@/store/authStore';
import { LayoutDashboard, List, PlusCircle, Trophy, LogOut, Pointer } from 'lucide-react';

const links = [
  { href: '/dashboard', label: 'Dashboard', icon: <LayoutDashboard size={15} /> },
  { href: '/requests', label: 'All Requests', icon: <List size={15} /> },
  { href: '/requests/create', label: 'New Request', icon: <PlusCircle size={15} /> },
  { href: '/leaderboard', label: 'Leaderboard', icon: <Trophy size={15} /> },
];


export default function Sidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuthStore();

  const initials = user?.username?.slice(0, 2).toUpperCase() || '??';

  return (
    <aside style={{
      width: 220, background: '#0c0c0b',
      borderRight: '1px solid rgba(240,235,224,0.07)',
      display: 'flex', flexDirection: 'column',
      height: '100vh', position: 'sticky', top: 0,
      fontFamily: "'DM Sans', sans-serif",
    }}>


      <div style={{ padding: '24px 20px 20px', borderBottom: '1px solid rgba(240,235,224,0.07)' }}>
        <span style={{
          fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: 16,
          letterSpacing: '-0.02em', color: '#f0ebe0',
        }}>Helplytics</span>
      </div>


      <nav style={{ flex: 1, padding: '16px 10px' }}>
        {links.map(link => {
          const active = pathname === link.href;
          return (
            <Link key={link.href} href={link.href} style={{
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '9px 12px', borderRadius: 8, marginBottom: 2,
              textDecoration: 'none',
              background: active ? 'rgba(240,235,224,0.08)' : 'transparent',
              color: active ? '#f0ebe0' : 'rgba(240,235,224,0.4)',
              fontSize: 14, fontWeight: active ? 500 : 400,
              transition: 'all 0.15s',
            }}
              onMouseEnter={e => { if (!active) e.currentTarget.style.color = 'rgba(240,235,224,0.7)'; }}
              onMouseLeave={e => { if (!active) e.currentTarget.style.color = 'rgba(240,235,224,0.4)'; }}
            >
              <span style={{ fontSize: 14, opacity: active ? 1 : 0.5 }}>{link.icon}</span>
              {link.label}
            </Link>
          );
        })}
      </nav>

      {/* User */}
      <div style={{ padding: '16px 10px', borderTop: '1px solid rgba(240,235,224,0.07)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10, padding: '8px 12px', borderRadius: 8, marginBottom: 4 }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 30, height: 30, borderRadius: '50%',
              background: 'rgba(200,185,110,0.15)',
              border: '1px solid rgba(200,185,110,0.25)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 11, fontWeight: 600, color: '#c8b96e', flexShrink: 0,
            }}>{initials}</div>
            <div style={{ minWidth: 0 }}>
              <p style={{ fontSize: 13, fontWeight: 500, color: '#f0ebe0', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user?.username}</p>
              <p style={{ fontSize: 11, color: 'rgba(200,185,110,0.7)', margin: 0 }}>⭐ {user?.trustScore ?? 0} pts</p>
            </div>
          </span>
          <LogOut size={20} style={{ cursor: 'pointer' }} onClick={() => logout()} />
        </div>
      </div>
    </aside>
  );
}