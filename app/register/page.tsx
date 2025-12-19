'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Button from '@/components/Button';
import { Input, Select } from '@/components/Input';
import Card from '@/components/Card';

const US_STATES = [
  { value: 'AL', label: 'Alabama' }, { value: 'AK', label: 'Alaska' }, { value: 'AZ', label: 'Arizona' },
  { value: 'AR', label: 'Arkansas' }, { value: 'CA', label: 'California' }, { value: 'CO', label: 'Colorado' },
  { value: 'CT', label: 'Connecticut' }, { value: 'DE', label: 'Delaware' }, { value: 'FL', label: 'Florida' },
  { value: 'GA', label: 'Georgia' }, { value: 'HI', label: 'Hawaii' }, { value: 'ID', label: 'Idaho' },
  { value: 'IL', label: 'Illinois' }, { value: 'IN', label: 'Indiana' }, { value: 'IA', label: 'Iowa' },
  { value: 'KS', label: 'Kansas' }, { value: 'KY', label: 'Kentucky' }, { value: 'LA', label: 'Louisiana' },
  { value: 'ME', label: 'Maine' }, { value: 'MD', label: 'Maryland' }, { value: 'MA', label: 'Massachusetts' },
  { value: 'MI', label: 'Michigan' }, { value: 'MN', label: 'Minnesota' }, { value: 'MS', label: 'Mississippi' },
  { value: 'MO', label: 'Missouri' }, { value: 'MT', label: 'Montana' }, { value: 'NE', label: 'Nebraska' },
  { value: 'NV', label: 'Nevada' }, { value: 'NH', label: 'New Hampshire' }, { value: 'NJ', label: 'New Jersey' },
  { value: 'NM', label: 'New Mexico' }, { value: 'NY', label: 'New York' }, { value: 'NC', label: 'North Carolina' },
  { value: 'ND', label: 'North Dakota' }, { value: 'OH', label: 'Ohio' }, { value: 'OK', label: 'Oklahoma' },
  { value: 'OR', label: 'Oregon' }, { value: 'PA', label: 'Pennsylvania' }, { value: 'RI', label: 'Rhode Island' },
  { value: 'SC', label: 'South Carolina' }, { value: 'SD', label: 'South Dakota' }, { value: 'TN', label: 'Tennessee' },
  { value: 'TX', label: 'Texas' }, { value: 'UT', label: 'Utah' }, { value: 'VT', label: 'Vermont' },
  { value: 'VA', label: 'Virginia' }, { value: 'WA', label: 'Washington' }, { value: 'WV', label: 'West Virginia' },
  { value: 'WI', label: 'Wisconsin' }, { value: 'WY', label: 'Wyoming' },
];

export default function RegisterPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [agreementScrolled, setAgreementScrolled] = useState(false);
  
  const [formData, setFormData] = useState({
    first_name: '', last_name: '', email: '', password: '', confirmPassword: '',
    phone: '', state: '', zip_code: '', address: '', dob: '', gender: '',
    ethnicity: '', annual_income: '', employment_status: '',
  });
  
  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };
  
  const validateForm = () => {
    if (!formData.first_name.trim()) { setError('First name required'); return false; }
    if (!formData.last_name.trim()) { setError('Last name required'); return false; }
    if (!formData.email.includes('@')) { setError('Valid email required'); return false; }
    if (!formData.phone.trim()) { setError('Phone required'); return false; }
    if (!formData.state) { setError('State required'); return false; }
    if (formData.zip_code.length !== 5) { setError('Valid ZIP required'); return false; }
    if (formData.password.length < 7) { setError('Password: 7+ chars'); return false; }
    if (!/[A-Z]/.test(formData.password)) { setError('Password: 1 uppercase'); return false; }
    if (!/[a-z]/.test(formData.password)) { setError('Password: 1 lowercase'); return false; }
    if (!/[0-9]/.test(formData.password)) { setError('Password: 1 number'); return false; }
    if (formData.password !== formData.confirmPassword) { setError('Passwords mismatch'); return false; }
    return true;
  };
  
  const handleSubmitForm = () => { if (validateForm()) { setStep(2); window.scrollTo(0, 0); } };
  const handleAgreementScroll = (e: any) => {
    const el = e.currentTarget;
    if (el.scrollHeight - el.scrollTop <= el.clientHeight + 50) setAgreementScrolled(true);
  };
  
  const handleRegister = async () => {
    if (!validateForm()) return;
    
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Registration failed');
      }
      
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Registration failed. Please try again.');
      setLoading(false);
    }
  };
  
  if (step === 1) {
    return (
      <div className="min-h-screen py-12 bg-knight-black">
        <div className="container-knight max-w-2xl">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">⚔️</div>
            <h1 className="text-4xl font-bold text-gradient-gold mb-2">Join Knight Financial</h1>
            <p className="text-gray-400">Create your free account - No credit card required</p>
          </div>
          
          <Card>
            {error && <div className="alert-warning mb-6"><p className="text-white">{error}</p></div>}
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input label="First Name" name="first_name" value={formData.first_name} onChange={handleChange} required placeholder="John" />
                <Input label="Last Name" name="last_name" value={formData.last_name} onChange={handleChange} required placeholder="Doe" />
              </div>
              
              <Input label="Email" name="email" type="email" value={formData.email} onChange={handleChange} required placeholder="john@example.com" />
              <Input label="Phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} required placeholder="(334) 555-1234" />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Select label="State" name="state" value={formData.state} onChange={handleChange} required options={US_STATES} />
                <Input label="ZIP Code" name="zip_code" value={formData.zip_code} onChange={handleChange} required placeholder="36083" maxLength={5} />
              </div>
              
              <Input label="Address (Optional)" name="address" value={formData.address} onChange={handleChange} placeholder="123 Main St" />
              <Input label="Password" name="password" type="password" value={formData.password} onChange={handleChange} required placeholder="7+ chars, 1 upper, 1 lower, 1 number" />
              <Input label="Confirm Password" name="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleChange} required />
              
              <div className="divider-knight"></div>
              
              <h3 className="text-lg font-bold text-knight-gold">Optional Demographics</h3>
              
              <Input label="DOB (Optional)" name="dob" type="date" value={formData.dob} onChange={handleChange} />
              <Select label="Gender (Optional)" name="gender" value={formData.gender} onChange={handleChange} options={[
                { value: 'male', label: 'Male' }, { value: 'female', label: 'Female' },
                { value: 'non-binary', label: 'Non-Binary' }, { value: 'prefer-not-to-say', label: 'Prefer Not to Say' }
              ]} />
              <Select label="Ethnicity (Optional)" name="ethnicity" value={formData.ethnicity} onChange={handleChange} options={[
                { value: 'white', label: 'White' }, { value: 'black', label: 'Black' },
                { value: 'hispanic', label: 'Hispanic' }, { value: 'asian', label: 'Asian' },
                { value: 'mixed', label: 'Mixed' }, { value: 'other', label: 'Other' }
              ]} />
              <Select label="Income (Optional)" name="annual_income" value={formData.annual_income} onChange={handleChange} options={[
                { value: '0-25k', label: 'Under $25k' }, { value: '25k-50k', label: '$25k-$50k' },
                { value: '50k-100k', label: '$50k-$100k' }, { value: '100k+', label: 'Over $100k' }
              ]} />
              
              <Button onClick={handleSubmitForm} fullWidth size="lg">Continue to Agreement →</Button>
              
              <p className="text-center text-sm text-gray-400">
                Already have an account? <Link href="/login" className="link-knight">Log in</Link>
              </p>
            </div>
          </Card>
        </div>
      </div>
    );
  }
  
  if (step === 2) {
    return (
      <div className="min-h-screen py-12 bg-knight-black">
        <div className="container-knight max-w-4xl">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">📜</div>
            <h1 className="text-4xl font-bold text-gradient-gold mb-2">Data Partnership Agreement</h1>
            <p className="text-gray-400">Read carefully - NOT a typical terms</p>
          </div>
          
          <Card>
            <div className="alert-warning mb-6">
              <h2 className="text-2xl font-bold text-red-400 mb-4">⚠️ READ EVERY WORD</h2>
              <p className="text-white">This is a <strong>DATA PARTNERSHIP</strong>. We're BRUTALLY HONEST. Uncomfortable? <strong>WALK AWAY NOW.</strong></p>
            </div>
            
            <div className="bg-knight-hover border-2 border-knight-gold-dark rounded-lg p-6 h-96 overflow-y-auto mb-6" onScroll={handleAgreementScroll}>
              <div className="space-y-4 text-white text-sm">
                <h3 className="text-xl font-bold text-knight-gold">KNIGHT FINANCIAL DATA PARTNERSHIP AGREEMENT</h3>
                
                <div><h4 className="font-bold text-knight-gold">1. WHAT WE DO WITH YOUR DATA</h4><p>We collect EVERYTHING: credit reports, forms, disputes, emotional harm stories, bankruptcy data, feelings about bureaus. We use it to:</p>
                <ul className="list-disc ml-6 space-y-1"><li>Sue TransUnion, Equifax, Experian, Innovis</li><li>Sell aggregated data to law firms</li><li>Sell to data companies, colleges, journalists</li><li>Build legal evidence for class actions</li><li>Create ethical CRA that fights FOR you</li></ul></div>
                
                <div><h4 className="font-bold text-knight-gold">2. YOU BENEFIT</h4><ul className="list-disc ml-6 space-y-1"><li>100+ free courses ($10k value)</li><li>Unlimited Knight Tools forever</li><li>100+ free templates</li><li>Your data helps destroy bad credit bureaus</li><li>You might be plaintiff in lawsuits (share settlements)</li></ul></div>
                
                <div><h4 className="font-bold text-knight-gold">3. WE COLLECT</h4><p><strong>Automatically:</strong> Every report, form, letter, scan, course, post, message. <strong>You Provide:</strong> Personal info (SSN, address, DOB), employment, income, emotional distress, financial harm, bankruptcy/foreclosure history, feelings about each bureau.</p></div>
                
                <div><h4 className="font-bold text-knight-gold">4. YOUR RIGHTS</h4><p><strong>CAN:</strong> Delete account (we keep historical data), download your data, opt out of public name use. <strong>CANNOT:</strong> Sue us for using data, join class action against us, demand deletion of historical data after contributing, stop anonymized aggregated data use.</p></div>
                
                <div><h4 className="font-bold text-knight-gold">5. WE PROMISE</h4><ul className="list-disc ml-6 space-y-1"><li>NEVER sell PII (name, SSN, email) to third parties</li><li>ALWAYS anonymize before sharing externally</li><li>ONLY use for ethical purposes (helping consumers)</li><li>PROTECT with encryption</li><li>BE TRANSPARENT</li></ul></div>
                
                <div><h4 className="font-bold text-knight-gold">6. ARBITRATION</h4><p><strong>YOU AGREE TO BINDING ARBITRATION, NOT COURT.</strong> No jury, no class actions against us. You can still sue bureaus!</p></div>
                
                <div><h4 className="font-bold text-knight-gold">7. ZERO TOLERANCE SCAMS</h4><p>Scam = permanent ban + email/phone blocked forever + reported to authorities.</p></div>
                
                <div><h4 className="font-bold text-knight-gold">8. DATA KEPT FOREVER</h4><p>We keep your data until: (1) we shut down (90-day notice), (2) court orders deletion, (3) you're in CA/EU with data protection laws.</p></div>
                
                <div><h4 className="font-bold text-knight-gold">9. YOUR RESPONSIBILITIES</h4><p><strong>MUST:</strong> Provide accurate info, update if changes, keep login secure, follow community rules, comply with laws. <strong>MUST NOT:</strong> Share account, use illegally, upload viruses, scrape content, harass users, post spam.</p></div>
                
                <div><h4 className="font-bold text-knight-gold">10. CONTACT</h4><p><strong>CEO:</strong> Raheem Sanders - raheem@knightfin.org - <strong>334-938-9171 (TEXT THE CEO!)</strong></p><p><strong>Support:</strong> support@knightfin.org - 855-516-8003</p></div>
                
                <div className="bg-knight-black p-4 rounded border-2 border-knight-gold"><h4 className="font-bold text-knight-gold mb-2">BY CLICKING "I AGREE":</h4><ul className="list-disc ml-6 space-y-1"><li>You READ and UNDERSTAND this agreement</li><li>You agree to DATA PARTNERSHIP</li><li>You consent to collecting, using, selling your data</li><li>You agree to arbitration, waive right to sue us</li><li>You're okay with anonymized data in legal cases</li><li>You promise accurate information</li><li>You won't scam or get banned forever</li><li>You're 18+ years old</li><li>You're doing this voluntarily</li></ul></div>
                
                <div className="text-center text-lg"><p className="font-bold text-knight-gold">IF YOU DON'T AGREE: <strong className="text-white">WALK AWAY.</strong></p><p>We won't be offended. Knight Financial isn't for everyone.</p></div>
                
                <p className="text-xs text-gray-500">Last Updated: December 18, 2025 | Knight Financial, LLC | 404 Brown Street, Tuskegee, AL 36083</p>
              </div>
            </div>
            
            {!agreementScrolled && (
              <p className="text-yellow-400 text-sm mb-4 text-center">↓ Scroll to bottom to continue ↓</p>
            )}
            
            <div className="flex gap-4">
              <Button variant="gold-outline" onClick={() => setStep(1)} fullWidth>← Back to Form</Button>
              <Button onClick={handleRegister} disabled={!agreementScrolled} loading={loading} fullWidth size="lg">
                ✅ I AGREE - Create Account
              </Button>
            </div>
            
            <p className="text-center text-xs text-gray-500 mt-4">
              By clicking "I AGREE", you acknowledge reading and accepting the entire Data Partnership Agreement
            </p>
          </Card>
        </div>
      </div>
    );
  }
  
  return null;
}
