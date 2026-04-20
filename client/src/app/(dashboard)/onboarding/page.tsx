'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import useUserStore from '@/store/userStore';
import useAuthStore from '@/store/authStore';

export default function OnboardingPage() {
  const { completeOnboarding } = useUserStore();
  const { user } = useAuthStore();
  const router = useRouter();
  const [form, setForm] = useState({
    role: 'both',
    skills: '',
    interests: '',
    location: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await completeOnboarding({
      ...form,
      skills: form.skills.split(',').map(s => s.trim()),
      interests: form.interests.split(',').map(s => s.trim()),
    });
    if (result.success) router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow p-8 w-full max-w-lg space-y-5">
        <div>
          <h1 className="text-2xl font-bold">Welcome, {user?.username}! 👋</h1>
          <p className="text-gray-500 text-sm mt-1">Let's set up your profile</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">I want to</label>
            <select value={form.role} onChange={e => setForm({ ...form, role: e.target.value })}
              className="w-full border rounded p-2">
              <option value="need-help">Get Help</option>
              <option value="can-help">Give Help</option>
              <option value="both">Both</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Your Skills</label>
            <input type="text" placeholder="e.g. React, Python, Design (comma separated)"
              value={form.skills}
              onChange={e => setForm({ ...form, skills: e.target.value })}
              className="w-full border rounded p-2" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Interests</label>
            <input type="text" placeholder="e.g. Web Dev, AI, Freelancing"
              value={form.interests}
              onChange={e => setForm({ ...form, interests: e.target.value })}
              className="w-full border rounded p-2" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Location</label>
            <input type="text" placeholder="e.g. Karachi"
              value={form.location}
              onChange={e => setForm({ ...form, location: e.target.value })}
              className="w-full border rounded p-2" />
          </div>

          <button type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded font-medium hover:bg-blue-700">
            Get Started →
          </button>
        </form>
      </div>
    </div>
  );
}