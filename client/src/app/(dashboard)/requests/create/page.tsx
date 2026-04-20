'use client';
import { useRouter } from 'next/navigation';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FileText, AlignLeft, Tag, Zap, MapPin, Wrench, ArrowRight, AlertCircle } from 'lucide-react';
import useRequestStore from '@/store/requestStore';

const schema = Yup.object({
    title: Yup.string().min(5, 'Min 5 chars').required('Title required'),
    description: Yup.string().min(20, 'Min 20 chars').required('Description required'),
    category: Yup.string().required('Category required'),
    urgency: Yup.string().required(),
});

const categories = [
    { value: 'programming', label: 'Programming' },
    { value: 'design', label: 'Design' },
    { value: 'math', label: 'Math' },
    { value: 'science', label: 'Science' },
    { value: 'language', label: 'Language' },
    { value: 'career', label: 'Career' },
    { value: 'health', label: 'Health' },
    { value: 'education', label: 'Education' },
    { value: 'technology', label: 'Technology' },
    { value: 'business', label: 'Business' },
    { value: 'other', label: 'Other' },
];

const urgencies = [
    { value: 'low', label: 'Low', color: '#6ea06e', desc: 'Whenever possible' },
    { value: 'medium', label: 'Medium', color: '#b49650', desc: 'Within a few days' },
    { value: 'high', label: 'High', color: '#c87070', desc: 'Urgent — ASAP' },
];

const inputStyle = (hasError) => ({
    width: '100%', background: 'rgba(240,235,224,0.04)',
    border: `1px solid ${hasError ? 'rgba(200,100,100,0.4)' : 'rgba(240,235,224,0.1)'}`,
    borderRadius: 10, padding: '12px 14px 12px 40px',
    fontSize: 14, color: '#f0ebe0', outline: 'none',
    fontFamily: "'DM Sans', sans-serif", boxSizing: 'border-box',
    transition: 'border-color 0.2s',
});

const labelStyle = {
    fontSize: 12, color: 'rgba(240,235,224,0.45)',
    display: 'block', marginBottom: 8, letterSpacing: '0.04em',
};

export default function CreateRequestPage() {
    const { createRequest, isLoading, error } = useRequestStore();
    const router = useRouter();

    const formik = useFormik({
        initialValues: { title: '', description: '', category: 'programming', urgency: 'medium', location: '', skills: '' },
        validationSchema: schema,
        onSubmit: async (values) => {
            const payload = {
                ...values,
                skills: values.skills ? values.skills.split(',').map(s => s.trim()).filter(Boolean) : [],
            };
            const result = await createRequest(payload);
            if (result.success) router.push('/requests');
        },
    });

    const selectedUrgency = urgencies.find(u => u.value === formik.values.urgency);

    return (
        <div style={{ fontFamily: "'DM Sans', sans-serif", padding: '48px 40px', maxWidth: 860, minHeight: '100vh' }}>

            {/* Header */}
            <div style={{ marginBottom: 48 }}>
                <p style={{ fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(240,235,224,0.3)', margin: '0 0 8px' }}>
                    New request
                </p>
                <h1 style={{ fontFamily: "'Sora', sans-serif", fontSize: 32, fontWeight: 700, letterSpacing: '-0.025em', color: '#f0ebe0', margin: '0 0 8px' }}>
                    Turn a rough problem into a clear help request.
                </h1>
                <p style={{ fontSize: 14, color: 'rgba(240,235,224,0.35)', margin: 0, fontWeight: 300 }}>
                    The more specific you are, the faster and better help you will get.
                </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 24, alignItems: 'start' }}>

                {/* Left — Main Form */}
                <form onSubmit={formik.handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

                    {error && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(200,100,100,0.08)', border: '1px solid rgba(200,100,100,0.2)', borderRadius: 8, padding: '10px 14px' }}>
                            <AlertCircle size={14} color="#c87070" />
                            <p style={{ fontSize: 13, color: '#c87070', margin: 0 }}>{error}</p>
                        </div>
                    )}

                    {/* Title */}
                    <div style={{ background: '#111110', border: '1px solid rgba(240,235,224,0.07)', borderRadius: 12, padding: '24px' }}>
                        <label style={labelStyle}>TITLE</label>
                        <div style={{ position: 'relative' }}>
                            <FileText size={15} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'rgba(240,235,224,0.25)' }} />
                            <input
                                type="text" placeholder="e.g. Need review on my JavaScript quiz app before submission"
                                {...formik.getFieldProps('title')}
                                style={inputStyle(formik.touched.title && formik.errors.title)}
                            />
                        </div>
                        {formik.touched.title && formik.errors.title && (
                            <p style={{ fontSize: 12, color: '#c87070', margin: '6px 0 0' }}>{formik.errors.title}</p>
                        )}
                    </div>

                    {/* Description */}
                    <div style={{ background: '#111110', border: '1px solid rgba(240,235,224,0.07)', borderRadius: 12, padding: '24px' }}>
                        <label style={labelStyle}>DESCRIPTION</label>
                        <div style={{ position: 'relative' }}>
                            <AlignLeft size={15} style={{ position: 'absolute', left: 14, top: 14, color: 'rgba(240,235,224,0.25)' }} />
                            <textarea
                                placeholder="Explain your current challenge, what you've tried, and what kind of help would be useful..."
                                {...formik.getFieldProps('description')}
                                rows={5}
                                style={{
                                    ...inputStyle(formik.touched.description && formik.errors.description),
                                    resize: 'vertical', lineHeight: 1.7, paddingTop: 12,
                                }}
                            />
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
                            {formik.touched.description && formik.errors.description
                                ? <p style={{ fontSize: 12, color: '#c87070', margin: 0 }}>{formik.errors.description}</p>
                                : <span />
                            }
                            <p style={{ fontSize: 12, color: 'rgba(240,235,224,0.2)', margin: 0 }}>
                                {formik.values.description.length} chars
                            </p>
                        </div>
                    </div>

                    {/* Category + Location */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                        <div style={{ background: '#111110', border: '1px solid rgba(240,235,224,0.07)', borderRadius: 12, padding: '24px' }}>
                            <label style={labelStyle}>CATEGORY</label>
                            <div style={{ position: 'relative' }}>
                                <Tag size={15} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'rgba(240,235,224,0.25)' }} />
                                <select
                                    {...formik.getFieldProps('category')}
                                    style={{ ...inputStyle(false), cursor: 'pointer', appearance: 'none', paddingRight: 14 }}
                                >
                                    {categories.map(c => (
                                        <option key={c.value} value={c.value} style={{ background: '#1a1a18', color: '#f0ebe0' }}>
                                            {c.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div style={{ background: '#111110', border: '1px solid rgba(240,235,224,0.07)', borderRadius: 12, padding: '24px' }}>
                            <label style={labelStyle}>LOCATION (OPTIONAL)</label>
                            <div style={{ position: 'relative' }}>
                                <MapPin size={15} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'rgba(240,235,224,0.25)' }} />
                                <input type="text" placeholder="e.g. Karachi, Remote"
                                    {...formik.getFieldProps('location')}
                                    style={inputStyle(false)} />
                            </div>
                        </div>
                    </div>

                    {/* Skills */}
                    <div style={{ background: '#111110', border: '1px solid rgba(240,235,224,0.07)', borderRadius: 12, padding: '24px' }}>
                        <label style={labelStyle}>SKILLS NEEDED (OPTIONAL)</label>
                        <div style={{ position: 'relative' }}>
                            <Wrench size={15} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'rgba(240,235,224,0.25)' }} />
                            <input type="text" placeholder="React, Node.js, MongoDB — comma separated"
                                {...formik.getFieldProps('skills')}
                                style={inputStyle(false)} />
                        </div>
                        {formik.values.skills && (
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 12 }}>
                                {formik.values.skills.split(',').filter(s => s.trim()).map(tag => (
                                    <span key={tag} style={{
                                        fontSize: 12, background: 'rgba(240,235,224,0.06)',
                                        border: '1px solid rgba(240,235,224,0.1)',
                                        color: 'rgba(240,235,224,0.5)', padding: '3px 10px', borderRadius: 100,
                                    }}>{tag.trim()}</span>
                                ))}
                            </div>
                        )}
                    </div>

                    <button type="submit" disabled={isLoading || !formik.isValid} style={{
                        width: '100%', background: '#e8e0cc', color: '#0c0c0b',
                        border: 'none', borderRadius: 10, padding: '14px',
                        fontSize: 14, fontWeight: 600, cursor: isLoading ? 'not-allowed' : 'pointer',
                        opacity: isLoading || !formik.isValid ? 0.5 : 1,
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                        fontFamily: "'DM Sans', sans-serif", letterSpacing: '-0.01em',
                        transition: 'opacity 0.2s',
                    }}>
                        {isLoading ? 'Publishing...' : <><span>Publish request</span><ArrowRight size={15} /></>}
                    </button>
                </form>

                {/* Right — Urgency Picker */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16, position: 'sticky', top: 24 }}>
                    <div style={{ background: '#111110', border: '1px solid rgba(240,235,224,0.07)', borderRadius: 12, padding: '24px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                            <Zap size={14} style={{ color: 'rgba(240,235,224,0.3)' }} />
                            <label style={{ ...labelStyle, margin: 0 }}>URGENCY</label>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                            {urgencies.map(u => (
                                <button
                                    key={u.value} type="button"
                                    onClick={() => formik.setFieldValue('urgency', u.value)}
                                    style={{
                                        background: formik.values.urgency === u.value ? `rgba(${u.value === 'high' ? '200,112,112' : u.value === 'medium' ? '180,150,80' : '110,160,110'}, 0.1)` : 'rgba(240,235,224,0.03)',
                                        border: `1px solid ${formik.values.urgency === u.value ? u.color : 'rgba(240,235,224,0.08)'}`,
                                        borderRadius: 8, padding: '12px 14px',
                                        display: 'flex', alignItems: 'center', gap: 12,
                                        cursor: 'pointer', textAlign: 'left',
                                        transition: 'all 0.15s',
                                    }}
                                >
                                    <span style={{ width: 8, height: 8, borderRadius: '50%', background: u.color, flexShrink: 0 }} />
                                    <div>
                                        <p style={{ fontSize: 13, fontWeight: 500, color: formik.values.urgency === u.value ? u.color : 'rgba(240,235,224,0.6)', margin: '0 0 2px', fontFamily: "'DM Sans', sans-serif" }}>
                                            {u.label}
                                        </p>
                                        <p style={{ fontSize: 11, color: 'rgba(240,235,224,0.25)', margin: 0, fontFamily: "'DM Sans', sans-serif" }}>{u.desc}</p>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Tips */}
                    <div style={{ background: '#111110', border: '1px solid rgba(240,235,224,0.07)', borderRadius: 12, padding: '24px' }}>
                        <p style={{ fontSize: 12, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(240,235,224,0.25)', margin: '0 0 14px' }}>Tips for better help</p>
                        {[
                            'Be specific about what you\'ve already tried',
                            'Mention your skill level or context',
                            'Add relevant tags to attract the right helpers',
                        ].map(tip => (
                            <div key={tip} style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
                                <span style={{ width: 4, height: 4, background: '#c8b96e', borderRadius: '50%', flexShrink: 0, marginTop: 7 }} />
                                <p style={{ fontSize: 12, color: 'rgba(240,235,224,0.35)', margin: 0, lineHeight: 1.6, fontWeight: 300 }}>{tip}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}