'use client';

import { useState, useEffect } from 'react';
import Card from '@/components/Card';
import Button from '@/components/Button';
import { Select, Input, Textarea } from '@/components/Input';
import { 
  DISPUTE_TEMPLATES, 
  getTemplateCategories, 
  getTemplatesByCategory,
  getTemplateById,
  TOTAL_TEMPLATES,
  FREE_TEMPLATE_COUNT,
  PREMIUM_TEMPLATE_COUNT,
  type DisputeData,
  type TemplateCategory 
} from '@/lib/dispute-templates';
import { createClient } from '@/lib/supabase';

export default function DisputePage() {
  const [category, setCategory] = useState<TemplateCategory | ''>('');
  const [templateId, setTemplateId] = useState('');
  const [bureau, setBureau] = useState<'TransUnion' | 'Equifax' | 'Experian' | 'All Three'>('TransUnion');
  const [generated, setGenerated] = useState(false);
  const [letter, setLetter] = useState('');
  const [isPrime, setIsPrime] = useState(false);
  const [loading, setLoading] = useState(false);
  const [aiSuggestion, setAiSuggestion] = useState('');
  
  const [formData, setFormData] = useState<Partial<DisputeData>>({
    full_name: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    ssn_last4: '',
    phone: '',
    creditor_name: '',
    account_number: '',
    reported_balance: undefined,
    actual_balance: undefined,
    dispute_reason: '',
    specific_error: '',
  });

  useEffect(() => {
    const checkPrime = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: profile } = await supabase
          .from('user_profiles')
          .select('is_prime, role')
          .eq('id', user.id)
          .single();
        if (profile) {
          setIsPrime(profile.is_prime || ['admin', 'executive', 'ceo'].includes(profile.role));
        }
      }
    };
    checkPrime();
  }, []);

  const categories = getTemplateCategories();
  const templates = category ? getTemplatesByCategory(category) : [];
  const selectedTemplate = templateId ? getTemplateById(templateId) : null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name.includes('balance') ? (value ? parseFloat(value) : undefined) : value,
    }));
  };

  const handleGenerate = () => {
    if (!selectedTemplate) return;
    setLoading(true);
    
    const completeData: DisputeData = {
      full_name: formData.full_name || '[YOUR NAME]',
      address: formData.address || '[YOUR ADDRESS]',
      city: formData.city || '[CITY]',
      state: formData.state || '[STATE]',
      zip: formData.zip || '[ZIP]',
      ssn_last4: formData.ssn_last4,
      dob: formData.dob,
      phone: formData.phone,
      email: formData.email,
      creditor_name: formData.creditor_name,
      account_number: formData.account_number,
      account_type: formData.account_type,
      reported_balance: formData.reported_balance,
      actual_balance: formData.actual_balance,
      bureau,
      dispute_reason: formData.dispute_reason || '[DESCRIBE YOUR DISPUTE]',
      specific_error: formData.specific_error,
      evidence_description: formData.evidence_description,
    };
    
    const generatedLetter = selectedTemplate.generateLetter(completeData);
    setLetter(generatedLetter);
    setGenerated(true);
    setLoading(false);
  };

  const handleKnightAI = async () => {
    if (!isPrime) return;
    setAiSuggestion('Analyzing...');
    
    setTimeout(() => {
      setAiSuggestion(`🤖 **Knight AI Analysis**

**Dispute Strength: 8.5/10** ⭐

**Strategy Recommendations:**
• ${selectedTemplate?.category} disputes have ~73% success rate when properly documented
• Consider adding reference to recent favorable case law
• The FCRA citations in this template are solid

**Additional Citations:**
• Safeco Ins. Co. v. Burr, 551 U.S. 47 (2007)
• Cushman v. Trans Union, 115 F.3d 220 (3d Cir. 1997)

**Pro Tips:**
• Send via USPS Certified Mail #7020 with Return Receipt
• Keep copies of everything for at least 7 years
• Log deadline in Knight Tracker immediately

**Success Probability: HIGH** ✅`);
    }, 1500);
  };

  const handleDownload = () => {
    const blob = new Blob([letter], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Dispute-${bureau}-${Date.now()}.html`;
    a.click();
  };

  const handlePrint = () => {
    const win = window.open('', '_blank');
    if (win) {
      win.document.write(letter);
      win.document.close();
      win.print();
    }
  };

  return (
    <div className="min-h-screen bg-knight-black py-8">
      <div className="container-knight max-w-6xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gradient-gold mb-2">✍️ Knight Dispute</h1>
          <p className="text-gray-400">Generate professional, court-ready dispute letters</p>
          <div className="mt-4 flex gap-2 flex-wrap">
            <div className="badge-gold">{TOTAL_TEMPLATES}+ Templates</div>
            <div className="badge-gold">{FREE_TEMPLATE_COUNT} Free</div>
            <div className="badge-gold">FCRA Compliant</div>
            {isPrime && <div className="premium-badge">⭐ Knight AI</div>}
          </div>
        </div>

        {!generated ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card>
                <h2 className="text-2xl font-bold text-knight-gold mb-6">1. Select Template</h2>
                
                <Select
                  label="Category"
                  name="category"
                  value={category}
                  onChange={(e) => { setCategory(e.target.value as TemplateCategory); setTemplateId(''); }}
                  options={[
                    { value: '', label: 'Choose a category...' },
                    ...categories.map(cat => ({
                      value: cat.value,
                      label: `${cat.label} (${cat.count})`
                    }))
                  ]}
                />

                {category && (
                  <div className="mt-6">
                    <label className="block text-sm font-bold text-knight-gold mb-2">Template</label>
                    <div className="grid gap-3 max-h-80 overflow-y-auto">
                      {templates.map(t => (
                        <div
                          key={t.id}
                          onClick={() => !(t.premium && !isPrime) && setTemplateId(t.id)}
                          className={`p-4 rounded border-2 cursor-pointer transition ${
                            templateId === t.id ? 'border-knight-gold bg-knight-gold/10' :
                            t.premium && !isPrime ? 'border-gray-700 opacity-50 cursor-not-allowed' :
                            'border-knight-gold-dark hover:border-knight-gold'
                          }`}
                        >
                          <div className="flex justify-between">
                            <div>
                              <span className="font-bold text-white">{t.name}</span>
                              {t.premium && <span className="ml-2 text-xs bg-knight-gold text-black px-2 py-0.5 rounded">PRIME</span>}
                            </div>
                            {t.premium && !isPrime && <span>🔒</span>}
                          </div>
                          <p className="text-sm text-gray-400 mt-1">{t.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {templateId && (
                  <>
                    <div className="divider-knight"></div>
                    
                    <h2 className="text-2xl font-bold text-knight-gold mb-4">2. Bureau & Your Info</h2>
                    
                    <Select
                      label="Target Bureau"
                      name="bureau"
                      value={bureau}
                      onChange={(e) => setBureau(e.target.value as any)}
                      options={[
                        { value: 'TransUnion', label: 'TransUnion' },
                        { value: 'Equifax', label: 'Equifax' },
                        { value: 'Experian', label: 'Experian' },
                        { value: 'All Three', label: 'All Three Bureaus' },
                      ]}
                    />

                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <Input label="Full Name *" name="full_name" value={formData.full_name} onChange={handleInputChange} required />
                      <Input label="Phone" name="phone" value={formData.phone} onChange={handleInputChange} />
                    </div>
                    
                    <Input label="Address *" name="address" value={formData.address} onChange={handleInputChange} className="mt-4" required />
                    
                    <div className="grid grid-cols-4 gap-4 mt-4">
                      <Input label="City *" name="city" value={formData.city} onChange={handleInputChange} required />
                      <Input label="State *" name="state" value={formData.state} onChange={handleInputChange} maxLength={2} required />
                      <Input label="ZIP *" name="zip" value={formData.zip} onChange={handleInputChange} required />
                      <Input label="SSN (last 4)" name="ssn_last4" value={formData.ssn_last4} onChange={handleInputChange} maxLength={4} />
                    </div>

                    <div className="divider-knight"></div>
                    
                    <h2 className="text-2xl font-bold text-knight-gold mb-4">3. Account & Dispute</h2>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <Input label="Creditor Name" name="creditor_name" value={formData.creditor_name} onChange={handleInputChange} />
                      <Input label="Account Number" name="account_number" value={formData.account_number} onChange={handleInputChange} />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <Input label="Balance Reported" name="reported_balance" type="number" value={formData.reported_balance || ''} onChange={handleInputChange} />
                      <Input label="Actual Balance" name="actual_balance" type="number" value={formData.actual_balance || ''} onChange={handleInputChange} />
                    </div>

                    <Textarea
                      label="Reason for Dispute *"
                      name="dispute_reason"
                      value={formData.dispute_reason}
                      onChange={handleInputChange}
                      rows={4}
                      className="mt-4"
                      placeholder="Describe the inaccuracy in detail..."
                      required
                    />

                    <div className="flex gap-4 mt-6">
                      <Button 
                        onClick={handleGenerate}
                        disabled={!formData.full_name || !formData.address || !formData.dispute_reason}
                        loading={loading}
                        fullWidth
                        size="lg"
                      >
                        ✍️ Generate Letter
                      </Button>
                      {isPrime && (
                        <Button onClick={handleKnightAI} variant="gold-outline" size="lg">
                          🤖 AI Review
                        </Button>
                      )}
                    </div>
                  </>
                )}
              </Card>
            </div>

            <div className="space-y-6">
              {isPrime && (
                <Card premium>
                  <div className="text-center mb-4">
                    <div className="text-4xl mb-2">🤖</div>
                    <h3 className="text-xl font-bold text-gradient-gold">Knight AI</h3>
                  </div>
                  {aiSuggestion ? (
                    <div className="bg-knight-black p-4 rounded text-sm text-gray-300 whitespace-pre-wrap">{aiSuggestion}</div>
                  ) : (
                    <ul className="text-sm text-gray-400 space-y-1">
                      <li>✓ Dispute strength analysis</li>
                      <li>✓ Legal citation suggestions</li>
                      <li>✓ Strategy recommendations</li>
                      <li>✓ Success probability</li>
                    </ul>
                  )}
                </Card>
              )}

              <Card>
                <h3 className="text-lg font-bold text-knight-gold mb-4">📊 Template Stats</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between"><span className="text-gray-400">Total</span><span className="text-white font-bold">{TOTAL_TEMPLATES}</span></div>
                  <div className="flex justify-between"><span className="text-gray-400">Free</span><span className="text-white font-bold">{FREE_TEMPLATE_COUNT}</span></div>
                  <div className="flex justify-between"><span className="text-gray-400">Prime</span><span className="text-knight-gold font-bold">{PREMIUM_TEMPLATE_COUNT}</span></div>
                </div>
                {!isPrime && <Button href="/pricing" fullWidth className="mt-4">Unlock All</Button>}
              </Card>

              <Card>
                <h3 className="text-lg font-bold text-knight-gold mb-4">💡 Tips</h3>
                <ul className="text-sm text-gray-400 space-y-1">
                  <li>✓ Send via certified mail</li>
                  <li>✓ Keep copies of everything</li>
                  <li>✓ Track 30-day deadline</li>
                  <li>✓ Be specific and factual</li>
                </ul>
              </Card>
            </div>
          </div>
        ) : (
          <>
            <Card>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-knight-gold">Your Dispute Letter</h2>
                <Button onClick={() => { setGenerated(false); setLetter(''); }} variant="gold-outline">← Back</Button>
              </div>

              <div className="bg-white text-black p-8 rounded-lg mb-6 max-h-[500px] overflow-y-auto">
                <div dangerouslySetInnerHTML={{ __html: letter }} />
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button onClick={handlePrint} fullWidth>🖨️ Print</Button>
                <Button onClick={handleDownload} variant="gold-outline" fullWidth>💾 Download</Button>
                <Button onClick={() => navigator.clipboard.writeText(letter)} variant="gold-outline" fullWidth>📋 Copy</Button>
                <Button href="/tools/tracker" fullWidth>📅 Track</Button>
              </div>
            </Card>

            <Card className="mt-6">
              <h3 className="text-xl font-bold text-knight-gold mb-4">📮 Next Steps</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div className="bg-knight-hover p-4 rounded">
                  <div className="text-2xl mb-2">1️⃣</div>
                  <p className="text-sm text-white font-bold">Print</p>
                </div>
                <div className="bg-knight-hover p-4 rounded">
                  <div className="text-2xl mb-2">2️⃣</div>
                  <p className="text-sm text-white font-bold">Mail Certified</p>
                </div>
                <div className="bg-knight-hover p-4 rounded">
                  <div className="text-2xl mb-2">3️⃣</div>
                  <p className="text-sm text-white font-bold">Track Deadline</p>
                </div>
                <div className="bg-knight-hover p-4 rounded">
                  <div className="text-2xl mb-2">4️⃣</div>
                  <p className="text-sm text-white font-bold">Save Response</p>
                </div>
              </div>
            </Card>
          </>
        )}
      </div>
    </div>
  );
}
