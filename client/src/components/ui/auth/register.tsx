'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Mail, Lock, User, Phone, Calendar, ArrowRight, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import useAuthStore from '@/store/authStore';

const registerSchema = Yup.object({
  username:        Yup.string().min(3, 'Min 3 chars').max(20, 'Max 20 chars').required('Required'),
  email:           Yup.string().email('Invalid email').required('Required'),
  phoneNumber:     Yup.string().matches(/^[0-9]{10,11}$/, 'Invalid number').required('Required'),
  dob:             Yup.string().required('Required'),
  password:        Yup.string().min(8, 'Min 8 chars').matches(/[A-Z]/, 'One uppercase required').matches(/[0-9]/, 'One number required').required('Required'),
  confirmPassword: Yup.string().oneOf([Yup.ref('password')], 'Passwords do not match').required('Required'),
});

const InputField = ({ formik, name, type = 'text', placeholder, icon: Icon, label }) => (
  <div>
    <label style={{ fontSize: 12, color: 'rgba(240,235,224,0.45)', display: 'block', marginBottom: 8, letterSpacing: '0.04em' }}>
      {label}
    </label>
    <div style={{ position: 'relative' }}>
      <Icon size={15} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'rgba(240,235,224,0.25)', pointerEvents: 'none' }} />
      <input
        type={type} placeholder={placeholder}
        {...formik.getFieldProps(name)}
        style={{
          width: '100%', background: 'rgba(240,235,224,0.04)',
          border: `1px solid ${formik.touched[name] && formik.errors[name] ? 'rgba(200,100,100,0.5)' : 'rgba(240,235,224,0.1)'}`,
          borderRadius: 10, padding: '12px 14px 12px 40px',
          fontSize: 14, color: '#f0ebe0', outline: 'none',
          fontFamily: "'DM Sans', sans-serif", boxSizing: 'border-box',
          transition: 'border-color 0.2s',
        }}
      />
    </div>
    {formik.touched[name] && formik.errors[name] && (
      <p style={{ fontSize: 12, color: '#c87070', margin: '6px 0 0' }}>{formik.errors[name]}</p>
    )}
  </div>
);

export default function Register() {
  const { register, isLoading, error, clearError } = useAuthStore();
  const router = useRouter();

  useEffect(() => { clearError(); }, []);

  const formik = useFormik({
    initialValues: { username: '', email: '', phoneNumber: '', dob: '', password: '', confirmPassword: '' },
    validationSchema: registerSchema,
    onSubmit: async (values) => {
      const { confirmPassword, ...payload } = values;
      const result = await register(payload);
      if (result.success) router.push('/onboarding');
    },
  });

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", minHeight: '100vh', background: '#0c0c0b', display: 'flex' }}>

      {/* Left — Branding */}
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
            Join the community
          </p>
          <h2 style={{ fontFamily: "'Sora', sans-serif", fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 700, color: '#f0ebe0', margin: '0 0 20px', letterSpacing: '-0.03em', lineHeight: 1.15 }}>
            Enter the<br />support network.
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 28 }}>
            {[
              'Set your role — need help, give help, or both',
              'Build a trust score with every contribution',
              'Earn badges as your reputation grows',
            ].map(item => (
              <div key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#c8b96e', flexShrink: 0, marginTop: 7 }} />
                <p style={{ fontSize: 14, color: 'rgba(240,235,224,0.4)', margin: 0, lineHeight: 1.6, fontWeight: 300 }}>{item}</p>
              </div>
            ))}
          </div>
        </div>
        <p style={{ fontSize: 13, color: 'rgba(240,235,224,0.2)', margin: 0 }}>Already have an account?{' '}
          <Link href="/login" style={{ color: 'rgba(240,235,224,0.5)', textDecoration: 'none' }}>Sign in →</Link>
        </p>
      </div>

      {/* Right — Form */}
      <div style={{ width: 520, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '48px 56px', overflowY: 'auto' }}>
        <div style={{ width: '100%' }}>
          <h1 style={{ fontFamily: "'Sora', sans-serif", fontSize: 26, fontWeight: 700, color: '#f0ebe0', margin: '0 0 6px', letterSpacing: '-0.025em' }}>
            Create your account
          </h1>
          <p style={{ fontSize: 14, color: 'rgba(240,235,224,0.35)', margin: '0 0 32px', fontWeight: 300 }}>
            It takes less than 2 minutes
          </p>

          {error && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(200,100,100,0.08)', border: '1px solid rgba(200,100,100,0.2)', borderRadius: 8, padding: '10px 14px', marginBottom: 20 }}>
              <AlertCircle size={14} color="#c87070" />
              <p style={{ fontSize: 13, color: '#c87070', margin: 0 }}>{error}</p>
            </div>
          )}

          <form onSubmit={formik.handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <InputField formik={formik} name="username"    label="USERNAME"        placeholder="mahasnain"        icon={User}     />
            <InputField formik={formik} name="email"       label="EMAIL"           placeholder="you@example.com"  icon={Mail}     type="email" />
            <InputField formik={formik} name="phoneNumber" label="PHONE NUMBER"    placeholder="03001234567"      icon={Phone}    type="tel" />
            <InputField formik={formik} name="dob"         label="DATE OF BIRTH"   placeholder=""                 icon={Calendar} type="date" />
            <InputField formik={formik} name="password"    label="PASSWORD"        placeholder="••••••••"         icon={Lock}     type="password" />
            <InputField formik={formik} name="confirmPassword" label="CONFIRM PASSWORD" placeholder="••••••••"   icon={Lock}     type="password" />

            <button type="submit" disabled={isLoading || !formik.isValid} style={{
              marginTop: 8, width: '100%', background: '#e8e0cc', color: '#0c0c0b',
              border: 'none', borderRadius: 10, padding: '13px',
              fontSize: 14, fontWeight: 600, cursor: isLoading ? 'not-allowed' : 'pointer',
              opacity: isLoading || !formik.isValid ? 0.5 : 1,
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              fontFamily: "'DM Sans', sans-serif", letterSpacing: '-0.01em',
              transition: 'opacity 0.2s',
            }}>
              {isLoading ? 'Creating account...' : <><span>Create account</span><ArrowRight size={15} /></>}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}