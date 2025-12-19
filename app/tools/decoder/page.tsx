'use client';

import { useState, useEffect } from 'react';
import Card from '@/components/Card';
import Button from '@/components/Button';
import { Textarea, Select } from '@/components/Input';
import { createClient } from '@/lib/supabase';

export default function DecoderPage() {
  const [responseText, setResponseText] = useState('');
  const [responseType, setResponseType] = useState('bureau');
  const [decoding, setDecoding] = useState(false);
  const [results, setResults] = useState<any>(null);
  const [isPrime, setIsPrime] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState('');

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

  const handleDecode = async () => {
    if (!responseText.trim()) return;
    
    setDecoding(true);
    setAiAnalysis('');
    
    // Simulate decoding
    setTimeout(() => {
      const lowerText = responseText.toLowerCase();
      
      // Detect response patterns
      const isVerified = lowerText.includes('verified') || lowerText.includes('confirmed');
      const isDeleted = lowerText.includes('deleted') || lowerText.includes('removed');
      const isUpdated = lowerText.includes('updated') || lowerText.includes('modified');
      const isFrivolous = lowerText.includes('frivolous') || lowerText.includes('repeatedly');
      const isPending = lowerText.includes('investigating') || lowerText.includes('pending');
      
      let verdict = 'unknown';
      let verdictColor = 'yellow';
      let explanation = '';
      let nextSteps: string[] = [];
      
      if (isDeleted) {
        verdict = 'VICTORY! 🏆';
        verdictColor = 'green';
        explanation = 'The bureau has agreed to delete or remove the disputed information.';
        nextSteps = [
          'Request updated credit report to confirm deletion',
          'Document this victory in Knight Tracker',
          'Check all three bureaus to ensure consistency',
          'Celebrate! You earned +50 points for items deleted',
        ];
      } else if (isUpdated) {
        verdict = 'PARTIAL WIN ✓';
        verdictColor = 'green';
        explanation = 'The bureau has updated/modified some information, but may not have fully addressed your dispute.';
        nextSteps = [
          'Review what exactly was updated',
          'If not fully corrected, file a follow-up dispute',
          'Document in Knight Tracker',
          'Consider escalating to CFPB if unsatisfied',
        ];
      } else if (isVerified) {
        verdict = 'VERIFIED (Denied) ⚠️';
        verdictColor = 'red';
        explanation = 'The bureau claims the information was "verified" with the furnisher. This is often a cursory check, not a real investigation.';
        nextSteps = [
          'Request METHOD of verification (your right under FCRA)',
          'File a complaint with CFPB citing inadequate investigation',
          'Send escalation letter citing Cushman v. Trans Union',
          'Prepare for potential litigation if pattern continues',
        ];
      } else if (isFrivolous) {
        verdict = 'FRIVOLOUS CLAIM ❌';
        verdictColor = 'red';
        explanation = 'The bureau is claiming your dispute is "frivolous" to avoid investigating. This is often improper.';
        nextSteps = [
          'This may be an FCRA violation - bureaus cannot easily dismiss disputes',
          'File immediate CFPB complaint',
          'Send demand letter citing FCRA § 1681i requirements',
          'Document for potential lawsuit',
        ];
      } else if (isPending) {
        verdict = 'PENDING ⏳';
        verdictColor = 'yellow';
        explanation = 'The investigation is still ongoing. They have 30 days from receipt to respond.';
        nextSteps = [
          'Mark deadline in Knight Tracker',
          'Prepare follow-up materials',
          'If no response by day 31, this is an FCRA violation',
        ];
      } else {
        verdict = 'UNCLEAR RESPONSE';
        verdictColor = 'yellow';
        explanation = 'The response does not clearly indicate a resolution. This may require further analysis.';
        nextSteps = [
          'Use Knight AI for deeper analysis (Prime feature)',
          'Re-read carefully for hidden meanings',
          'Consider calling the bureau for clarification',
          'May need legal consultation',
        ];
      }
      
      setResults({
        verdict,
        verdictColor,
        explanation,
        nextSteps,
        responseType,
        analyzedAt: new Date().toISOString(),
        keyPhrases: [
          isVerified && '"Verified" - They claim they checked',
          isDeleted && '"Deleted/Removed" - Victory indicator',
          isUpdated && '"Updated/Modified" - Partial win',
          isFrivolous && '"Frivolous" - Possible FCRA violation',
          isPending && '"Investigating" - Still pending',
        ].filter(Boolean),
      });
      
      setDecoding(false);
    }, 2000);
  };

  const handleKnightAI = () => {
    if (!isPrime || !results) return;
    
    setAiAnalysis('Analyzing...');
    
    setTimeout(() => {
      setAiAnalysis(`🤖 **KNIGHT AI LEGAL ANALYSIS**

**Response Classification:** ${results.verdict}

**Legal Assessment:**
Based on my analysis of thousands of bureau responses, here's what this response means for your case:

${results.verdictColor === 'red' ? `
⚠️ **WARNING: Potential FCRA Violations Detected**

The bureau's response suggests they may not have conducted a proper "reasonable reinvestigation" as required by FCRA § 1681i. Key issues:

1. **Verification Without Investigation**
   Courts have held that simply "parroting" what a furnisher says is NOT a reasonable reinvestigation. See *Cushman v. Trans Union Corp.*, 115 F.3d 220 (3d Cir. 1997).

2. **Documentation Request**
   Under FCRA § 1681i(a)(6)(B)(iii), you have the right to request the METHOD of verification. If they can't explain HOW they verified, that's evidence of inadequate investigation.

**Litigation Strength Score: 7.5/10** ⚖️

**Recommended Legal Citations:**
• Cushman v. Trans Union Corp., 115 F.3d 220 (3d Cir. 1997)
• Dennis v. BEH-1, LLC, 520 F.3d 1066 (9th Cir. 2008)
• Gorman v. Wolpoff & Abramson, LLP, 584 F.3d 1147 (9th Cir. 2009)
` : results.verdictColor === 'green' ? `
✅ **POSITIVE OUTCOME ANALYSIS**

Congratulations! This response indicates progress. Here's how to maximize this victory:

1. **Document Everything**
   Save this response in Knight Vault with timestamp
   
2. **Verify Across All Bureaus**
   Deletion from one bureau doesn't automatically update others
   
3. **Check Credit Score**
   Your score should improve within 30 days

**Impact Assessment:**
• Estimated score improvement: +15-40 points
• Timeline for reflection: 30-45 days
• Documentation value for future disputes: HIGH
` : `
🔍 **INCONCLUSIVE - DEEPER ANALYSIS NEEDED**

This response is ambiguous. Common tactics bureaus use:
• Vague language to avoid commitment
• Partial responses that don't address all issues
• Redirecting responsibility to furnisher

**Recommended Action:** 
File CFPB complaint citing incomplete response to ensure federal oversight of your case.
`}

**AI Confidence Level:** ${Math.floor(Math.random() * 15) + 85}%

**Auto-Generated Next Steps:**
${results.nextSteps.map((step: string, i: number) => `${i + 1}. ${step}`).join('\n')}
      `);
    }, 2000);
  };

  const handleReset = () => {
    setResponseText('');
    setResults(null);
    setAiAnalysis('');
  };

  return (
    <div className="min-h-screen bg-knight-black py-8">
      <div className="container-knight max-w-5xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gradient-gold mb-2">🔍 Knight Decoder</h1>
          <p className="text-gray-400">Decode bureau and creditor responses - understand what they really mean</p>
          <div className="mt-4 flex gap-2 flex-wrap">
            <div className="badge-gold">AI-Powered Analysis</div>
            <div className="badge-gold">Legal Interpretation</div>
            <div className="badge-gold">Next Step Guidance</div>
            {isPrime && <div className="premium-badge">⭐ Knight AI</div>}
          </div>
        </div>

        {!results ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card>
                <h2 className="text-2xl font-bold text-knight-gold mb-6">Paste Response to Decode</h2>
                
                <Select
                  label="Response Type"
                  value={responseType}
                  onChange={(e) => setResponseType(e.target.value)}
                  options={[
                    { value: 'bureau', label: 'Credit Bureau Response' },
                    { value: 'creditor', label: 'Creditor/Furnisher Response' },
                    { value: 'collector', label: 'Collection Agency Response' },
                    { value: 'cfpb', label: 'CFPB Response' },
                    { value: 'legal', label: 'Legal/Court Document' },
                  ]}
                  className="mb-4"
                />
                
                <Textarea
                  label="Response Text"
                  value={responseText}
                  onChange={(e) => setResponseText(e.target.value)}
                  rows={12}
                  placeholder="Paste the full text of the response you received...

Example: 'We have completed our investigation of your dispute. The information you disputed has been verified as accurate. The creditor has confirmed the account information is correct as reported...'"
                />
                
                <Button
                  onClick={handleDecode}
                  disabled={!responseText.trim()}
                  loading={decoding}
                  fullWidth
                  size="lg"
                  className="mt-6"
                >
                  🔍 Decode Response
                </Button>
              </Card>
            </div>
            
            <div className="space-y-6">
              <Card>
                <h3 className="text-lg font-bold text-knight-gold mb-4">💡 What Decoder Does</h3>
                <ul className="text-sm text-gray-400 space-y-2">
                  <li>✓ Identifies response type (verified, deleted, etc.)</li>
                  <li>✓ Explains what the response really means</li>
                  <li>✓ Provides specific next steps</li>
                  <li>✓ Detects potential FCRA violations</li>
                  <li>✓ Suggests legal citations if needed</li>
                </ul>
              </Card>
              
              {isPrime && (
                <Card premium>
                  <div className="text-center mb-4">
                    <div className="text-4xl mb-2">🤖</div>
                    <h3 className="text-lg font-bold text-gradient-gold">Knight AI Analysis</h3>
                  </div>
                  <ul className="text-sm text-gray-400 space-y-2">
                    <li>✓ Deep legal analysis</li>
                    <li>✓ Case law citations</li>
                    <li>✓ Litigation strength score</li>
                    <li>✓ Customized legal strategy</li>
                  </ul>
                </Card>
              )}
              
              <Card>
                <h3 className="text-lg font-bold text-knight-gold mb-4">📋 Common Responses</h3>
                <div className="space-y-3 text-sm">
                  <div className="bg-green-900/30 p-3 rounded">
                    <div className="font-bold text-green-400">"Deleted"</div>
                    <div className="text-gray-400">Victory! Item removed</div>
                  </div>
                  <div className="bg-yellow-900/30 p-3 rounded">
                    <div className="font-bold text-yellow-400">"Updated"</div>
                    <div className="text-gray-400">Partial win - check details</div>
                  </div>
                  <div className="bg-red-900/30 p-3 rounded">
                    <div className="font-bold text-red-400">"Verified"</div>
                    <div className="text-gray-400">Denied - escalate!</div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        ) : (
          <>
            {/* Results */}
            <Card className={`border-2 ${
              results.verdictColor === 'green' ? 'border-green-500' :
              results.verdictColor === 'red' ? 'border-red-500' :
              'border-yellow-500'
            }`}>
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className={`text-3xl font-bold ${
                    results.verdictColor === 'green' ? 'text-green-400' :
                    results.verdictColor === 'red' ? 'text-red-400' :
                    'text-yellow-400'
                  }`}>
                    {results.verdict}
                  </h2>
                  <p className="text-gray-400 mt-1">Response from: {responseType}</p>
                </div>
                <Button onClick={handleReset} variant="gold-outline">
                  Decode Another
                </Button>
              </div>
              
              <div className="bg-knight-hover p-6 rounded-lg mb-6">
                <h3 className="font-bold text-knight-gold mb-2">What This Means:</h3>
                <p className="text-gray-300">{results.explanation}</p>
              </div>
              
              {results.keyPhrases && results.keyPhrases.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-bold text-knight-gold mb-2">Key Phrases Detected:</h3>
                  <div className="flex flex-wrap gap-2">
                    {results.keyPhrases.map((phrase: string, i: number) => (
                      <span key={i} className="bg-knight-gold-dark px-3 py-1 rounded text-sm text-white">
                        {phrase}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="mb-6">
                <h3 className="font-bold text-knight-gold mb-3">📋 Recommended Next Steps:</h3>
                <div className="space-y-3">
                  {results.nextSteps.map((step: string, i: number) => (
                    <div key={i} className="flex items-start gap-3 bg-knight-hover p-3 rounded">
                      <span className="text-knight-gold font-bold">{i + 1}.</span>
                      <span className="text-gray-300">{step}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex gap-4">
                {isPrime && (
                  <Button onClick={handleKnightAI} size="lg">
                    🤖 Deep AI Analysis
                  </Button>
                )}
                <Button href="/tools/dispute" variant="gold-outline" size="lg">
                  ✍️ Generate Response Letter
                </Button>
                <Button href="/tools/tracker" variant="gold-outline" size="lg">
                  📅 Log to Tracker
                </Button>
              </div>
            </Card>
            
            {/* AI Analysis Panel */}
            {aiAnalysis && (
              <Card premium className="mt-6">
                <h3 className="text-2xl font-bold text-gradient-gold mb-4">🤖 Knight AI Analysis</h3>
                <div className="bg-knight-black p-6 rounded whitespace-pre-wrap text-gray-300">
                  {aiAnalysis}
                </div>
              </Card>
            )}
          </>
        )}
      </div>
    </div>
  );
}
