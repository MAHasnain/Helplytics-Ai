'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Mail, Lock, ArrowRight, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import useAuthStore from '@/store/authStore';
 
const loginSchema = Yup.object({
  email:    Yup.string().email('Invalid email').required('Email required'),
  password: Yup.string().min(6, 'Min 6 characters').required('Password required'),
});
 
export default function Login() {
  const { login, isLoading, error, clearError, token } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (token) router.replace('/dashboard');
  }, [token]);

  if (token) return null;
 
  useEffect(() => { clearError(); }, []);
 
  const formik = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      const result = await login(values);
      if (result.success) router.push('/dashboard');
    },
  });
 
  const fieldStyle = (name) => ({
    width: '100%', background: 'rgba(240,235,224,0.04)',
    border: `1px solid ${formik.touched[name] && formik.errors[name] ? 'rgba(200,100,100,0.5)' : 'rgba(240,235,224,0.1)'}`,
    borderRadius: 10, padding: '12px 14px 12px 40px',
    fontSize: 14, color: '#f0ebe0', outline: 'none',
    fontFamily: "'DM Sans', sans-serif",
    boxSizing: 'border-box',
    transition: 'border-color 0.2s',
  });
 
  return (
    <div style={{
      fontFamily: "'DM Sans', sans-serif",
      minHeight: '100vh', background: '#0c0c0b',
      display: 'flex',
    }}>
      <div style={{
        flex: 1, display: 'flex', flexDirection: 'column',
        justifyContent: 'space-between', padding: '48px',
        borderRight: '1px solid rgba(240,235,224,0.07)',
      }}>
        <span style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: 18, color: '#f0ebe0', letterSpacing: '-0.02em' }}>
          Helplytics
        </span>
        <div>
          <p style={{ fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(240,235,224,0.3)', marginBottom: 16 }}>
            Community-powered
          </p>
          <h2 style={{ fontFamily: "'Sora', sans-serif", fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 700, color: '#f0ebe0', margin: '0 0 20px', letterSpacing: '-0.03em', lineHeight: 1.15 }}>
            Find help faster.<br />
            <span style={{ color: 'rgba(240,235,224,0.3)' }}>Become help<br />that matters.</span>
          </h2>
          <p style={{ fontSize: 14, color: 'rgba(240,235,224,0.35)', margin: 0, lineHeight: 1.7, maxWidth: 340, fontWeight: 300 }}>
            Connect with people who have the exact skills you need — or help others and build your reputation.
          </p>
        </div>
        <div style={{ display: 'flex', gap: 32 }}>
          {[['800+', 'Active helpers'], ['2.4k+', 'Problems solved'], ['98%', 'Satisfaction']].map(([v, l]) => (
            <div key={l}>
              <p style={{ fontFamily: "'Sora', sans-serif", fontSize: 22, fontWeight: 700, color: '#f0ebe0', margin: '0 0 2px', letterSpacing: '-0.02em' }}>{v}</p>
              <p style={{ fontSize: 12, color: 'rgba(240,235,224,0.3)', margin: 0 }}>{l}</p>
            </div>
          ))}
        </div>
      </div>
 
      <div style={{ width: 480, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '48px 56px' }}>
        <div style={{ width: '100%' }}>
          <h1 style={{ fontFamily: "'Sora', sans-serif", fontSize: 26, fontWeight: 700, color: '#f0ebe0', margin: '0 0 6px', letterSpacing: '-0.025em' }}>
            Welcome back
          </h1>
          <p style={{ fontSize: 14, color: 'rgba(240,235,224,0.35)', margin: '0 0 36px', fontWeight: 300 }}>
            Sign in to your account to continue
          </p>
 
          {error && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(200,100,100,0.08)', border: '1px solid rgba(200,100,100,0.2)', borderRadius: 8, padding: '10px 14px', marginBottom: 20 }}>
              <AlertCircle size={14} color="#c87070" />
              <p style={{ fontSize: 13, color: '#c87070', margin: 0 }}>{error}</p>
            </div>
          )}
 
          <form onSubmit={formik.handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <label style={{ fontSize: 12, color: 'rgba(240,235,224,0.45)', display: 'block', marginBottom: 8, letterSpacing: '0.04em' }}>EMAIL</label>
              <div style={{ position: 'relative' }}>
                <Mail size={15} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'rgba(240,235,224,0.25)' }} />
                <input type="email" placeholder="you@example.com" {...formik.getFieldProps('email')} style={fieldStyle('email')} />
              </div>
              {formik.touched.email && formik.errors.email && (
                <p style={{ fontSize: 12, color: '#c87070', margin: '6px 0 0' }}>{formik.errors.email}</p>
              )}
            </div>
 
            <div>
              <label style={{ fontSize: 12, color: 'rgba(240,235,224,0.45)', display: 'block', marginBottom: 8, letterSpacing: '0.04em' }}>PASSWORD</label>
              <div style={{ position: 'relative' }}>
                <Lock size={15} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'rgba(240,235,224,0.25)' }} />
                <input type="password" placeholder="••••••••" {...formik.getFieldProps('password')} style={fieldStyle('password')} />
              </div>
              {formik.touched.password && formik.errors.password && (
                <p style={{ fontSize: 12, color: '#c87070', margin: '6px 0 0' }}>{formik.errors.password}</p>
              )}
            </div>
 
            <button type="submit" disabled={isLoading || !formik.isValid} style={{
              marginTop: 8, width: '100%', background: '#e8e0cc', color: '#0c0c0b',
              border: 'none', borderRadius: 10, padding: '13px', fontSize: 14,
              fontWeight: 600, cursor: isLoading ? 'not-allowed' : 'pointer',
              opacity: isLoading || !formik.isValid ? 0.5 : 1,
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              fontFamily: "'DM Sans', sans-serif", letterSpacing: '-0.01em',
              transition: 'opacity 0.2s',
            }}>
              {isLoading ? 'Signing in...' : <><span>Sign in</span><ArrowRight size={15} /></>}
            </button>
          </form>
 
          <p style={{ fontSize: 13, color: 'rgba(240,235,224,0.3)', textAlign: 'center', marginTop: 28 }}>
            No account?{' '}
            <Link href="/register" style={{ color: 'rgba(240,235,224,0.7)', textDecoration: 'none', fontWeight: 500 }}>
              Create one →
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}