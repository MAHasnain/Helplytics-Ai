'use client';
import { useEffect } from 'react';
import useUserStore from '@/store/userStore';


export default function page() {
  const { leaderboard, getLeaderboard } = useUserStore();

  useEffect(() => { getLeaderboard(); }, []);


  return (
    <div className="font-['DM_Sans'] px-10 py-12 max-w-[900px]">
      <div className="mb-10">
        <p className="text-xs leading-[1.2] tracking-[0.1em] uppercase text-[rgba(240,235,224,0.3)] mb-2">Community</p>
        <h1 className="font-['Sora'] text-[30px] font-bold tracking-[-0.025em] text-[#f0ebe0] m-0">
          Leaderboard
        </h1>
      </div>

      <div className="bg-[#111110] border border-[rgba(240,235,224,0.07)] rounded-xl overflow-hidden">
        {leaderboard.map((user, index) => (
          <div key={user._id}
            className={`flex items-center gap-4 px-6 py-4 border-b border-[rgba(240,235,224,0.05)] last:border-0 ${index === 0 ? 'bg-[rgba(200,185,110,0.08)]' :
                index === 1 ? 'bg-[rgba(110,180,200,0.08)]' :
                  index === 2 ? 'bg-[rgba(200,110,110,0.08)]' : ''
              }`}>
            <span className="text-[24px] w-8 text-center font-['Sora'] font-semibold">
              {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `${index + 1}`}
            </span>
            <div className="w-10 h-10 rounded-full flex items-center justify-center text-[10px] font-semibold border" style={{
              background: 'rgba(240,235,224,0.1)',
              borderColor: 'rgba(240,235,224,0.2)',
              color: '#f0ebe0'
            }}>
              {user.username?.[0]?.toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-['Sora'] text-[15px] font-semibold text-[#f0ebe0] mb-1 tracking-[-0.01em] overflow-hidden text-ellipsis whitespace-nowrap m-0">{user.username}</p>
              <div className="flex gap-2 mt-1">
                {user.badges?.map(badge => (
                  <span key={badge} className="text-[11px] px-2 py-[2px] rounded-full border" style={{
                    background: 'rgba(200,185,110,0.08)',
                    borderColor: 'rgba(200,185,110,0.25)',
                    color: '#c8b96e'
                  }}>
                    {badge}
                  </span>
                ))}
              </div>
            </div>
            <div className="text-right flex-shrink-0">
              <p className="font-['Sora'] text-[15px] font-bold text-[#c8b96e] mb-1 tracking-[-0.01em]">{user.trustScore} pts</p>
              <p className="text-xs text-[rgba(240,235,224,0.3)]">{user.totalHelped} helped</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}