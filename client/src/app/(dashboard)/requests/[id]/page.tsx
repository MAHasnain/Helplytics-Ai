// app/(dashboard)/requests/[id]/page.jsx
'use client';
import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import useRequestStore from '@/store/requestStore';
import useAuthStore from '@/store/authStore';

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

export default function RequestDetailPage() {
    const { id } = useParams();
    const { request, getRequestById, offerHelp, markSolved, isLoading } = useRequestStore();
    const { user } = useAuthStore();

    useEffect(() => { getRequestById(id); }, [id]);

    if (isLoading || !request) return <div className="font-['DM_Sans'] px-10 py-12 max-w-[900px]">Loading...</div>;

    const isAuthor = user?._id === request.author?._id;
    const isHelper = request.helpers?.some(h => h._id === user?._id);
    const canHelp = !isAuthor && !isHelper && request.status !== 'solved';
    const canSolve = isAuthor && request.status !== 'solved';

    const handleHelp = async () => {
        await offerHelp(id);
        getRequestById(id);
    };

    const handleSolve = async () => {
        await markSolved(id);
        getRequestById(id);
    };

    return (
        <>
            <div className="font-['DM_Sans'] px-10 py-12 max-w-[900px] space-y-5">
                <div className="bg-[#111110] border border-[rgba(240,235,224,0.07)] rounded-xl p-6">
                    <div className="flex justify-between items-start">
                        <div>
                            <h1 className="font-['Sora'] text-[30px] font-bold tracking-[-0.025em] text-[#f0ebe0] m-0">{request.title}</h1>
                            <div className="flex gap-2 mt-2">
                                <span className="text-[11px] px-2 py-[2px] rounded-full border" style={{
                                    color: categoryColors[request.category] || '#f0ebe0',
                                    background: `${categoryColors[request.category] || '#f0ebe0'}12`,
                                    borderColor: `${categoryColors[request.category] || '#f0ebe0'}25`
                                }}>{request.category}</span>
                                <span className="text-[11px] px-2 py-[2px] rounded-full border" style={{
                                    color: urgencyStyle[request.urgency]?.color,
                                    background: urgencyStyle[request.urgency]?.bg,
                                    borderColor: urgencyStyle[request.urgency]?.border
                                }}>{request.urgency} urgency</span>
                                <span className="text-[11px] px-2 py-[2px] rounded-full" style={{
                                    color: statusStyle[request.status]?.color,
                                    background: statusStyle[request.status]?.bg
                                }}>{request.status}</span>
                                {request.tags.map(tag => (
                                    <span key={tag} className="text-[11px] bg-[rgba(240,235,224,0.06)] text-[rgba(240,235,224,0.6)] border border-[rgba(240,235,224,0.1)] px-2 py-[2px] rounded">{tag}</span>
                                ))}
                            </div>
                        </div>

                        <div className="bg-[#111110] border border-[rgba(240,235,224,0.07)] rounded-xl p-5">
                            <h2 className="font-['Sora'] text-[15px] font-semibold text-[#f0ebe0] mb-3 tracking-[-0.01em]">Posted by</h2>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full flex items-center justify-center text-[10px] font-semibold border" style={{
                                    background: 'rgba(240,235,224,0.1)',
                                    borderColor: 'rgba(240,235,224,0.2)',
                                    color: '#f0ebe0'
                                }}>
                                    {request.author?.username?.[0]?.toUpperCase()}
                                </div>
                                <div>
                                    <p className="font-['Sora'] text-[15px] font-semibold text-[#f0ebe0] tracking-[-0.01em]">{request.author?.username}</p>
                                    <p className="text-xs text-[#c8b96e]">⭐ {request.author?.trustScore} Trust Score</p>
                                </div>
                            </div>
                        </div>

                        {request.helpers?.length > 0 && (
                            <div className="bg-[#111110] border border-[rgba(240,235,224,0.07)] rounded-xl p-5">
                                <h2 className="font-['Sora'] text-[15px] font-semibold text-[#f0ebe0] mb-3 tracking-[-0.01em]">🤝 Helpers ({request.helpers.length})</h2>
                                <div className="space-y-2">
                                    {request.helpers.map((helper: any) => (
                                        <div key={helper._id} className="flex items-center gap-2">
                                            <div className="w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-semibold border" style={{
                                                background: 'rgba(110,160,110,0.1)',
                                                borderColor: 'rgba(110,160,110,0.2)',
                                                color: '#6ea06e'
                                            }}>
                                                {helper.username?.[0]?.toUpperCase()}
                                            </div>
                                            <span className="text-sm text-[#f0ebe0] font-medium">{helper.username}</span>
                                            <span className="text-xs text-[#c8b96e]">⭐ {helper.trustScore}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

