'use client';

import { useState } from 'react';
import Link from 'next/link';

interface KnightAIProps {
  isPrime: boolean;
  type: 'scanner' | 'dispute' | 'decoder' | 'tracker' | 'academy' | 'form';
  data?: any;  // Input data to "analyze"
  onAnalyze?: () => void;
}

// Pre-written "AI" responses based on context
const AI_RESPONSES = {
  scanner: {
    title: '🤖 Knight AI Credit Analysis',
    analyzing: 'Scanning for FCRA violations...',
    responses: [
      {
        score: 8.5,
        summary: 'Your credit report contains multiple actionable violations that could result in significant damages.',
        findings: [
          '⚠️ **Metro 2 Field Omissions Detected** - Missing compliance fields in 3 tradelines',
          '🎯 **Pattern Recognition** - Systematic reporting errors suggest automated processing failures',
          '⚖️ **FCRA § 1681e(b) Violation** - Furnisher failed to maintain maximum possible accuracy',
          '💰 **Potential Damages** - Based on similar cases: $3,500 - $12,000 per violation',
        ],
        recommendation: 'Immediate dispute recommended. Document all violations for potential litigation.',
        caseStrength: 'Strong - Multiple documented violations with clear statutory basis',
      },
      {
        score: 7.2,
        summary: 'Several reporting inconsistencies identified that warrant dispute action.',
        findings: [
          '⚠️ **Balance Discrepancy** - Reported balance differs from actual by $1,247',
          '🎯 **Date Inconsistency** - Payment date reported incorrectly for 2 accounts',
          '⚖️ **Mixed File Risk** - Account information may be commingled with another consumer',
          '💰 **Potential Damages** - Estimated range: $1,500 - $5,000',
        ],
        recommendation: 'File disputes with all bureaus citing specific inaccuracies.',
        caseStrength: 'Moderate - Clear errors but documentation needed',
      },
    ],
  },
  dispute: {
    title: '🤖 Knight AI Dispute Optimizer',
    analyzing: 'Optimizing your dispute strategy...',
    responses: [
      {
        score: 9.1,
        summary: 'Your dispute letter has been optimized for maximum legal impact.',
        findings: [
          '✅ **Legal Citations Added** - Relevant FCRA sections referenced',
          '📝 **Language Strengthened** - Converted passive requests to legal demands',
          '⏰ **Deadline Emphasized** - 30-day response requirement clearly stated',
          '📋 **Documentation Request** - Added verification method requirements',
        ],
        recommendation: 'Send via certified mail with return receipt. Keep copies of everything.',
        tips: [
          'Send to all three bureaus simultaneously',
          'Request "method of verification" in your letter',
          'Follow up at day 25 if no response',
          'Document any phone calls',
        ],
      },
    ],
  },
  decoder: {
    title: '🤖 Knight AI Response Analysis',
    analyzing: 'Decoding bureau response patterns...',
    responses: [
      {
        score: 7.5,
        summary: 'Response contains potential FCRA violations you can exploit.',
        findings: [
          '🚨 **Verification Gap** - Bureau failed to describe verification method',
          '⚖️ **Reinvestigation Failure** - Response suggests rubber-stamp verification',
          '📋 **Missing Documentation** - No proof of contact with furnisher',
          '⏰ **Timeline Issue** - Response may have exceeded 30-day limit',
        ],
        nextSteps: [
          'Request Method of Verification letter',
          'File CFPB complaint citing procedural violations',
          'Consider 1681i demand letter',
          'Document for potential lawsuit',
        ],
        legalBasis: 'Cushman v. Trans Union (2001) - Bureaus must conduct meaningful reinvestigation',
      },
    ],
  },
  tracker: {
    title: '🤖 Knight AI Dispute Strategy',
    analyzing: 'Analyzing your dispute timeline...',
    responses: [
      {
        score: 8.0,
        summary: 'Your dispute tracking indicates strategic opportunities.',
        findings: [
          '⏰ **Day 28 Alert** - TransUnion dispute approaching deadline',
          '📈 **Pattern Detected** - 67% success rate on Metro 2 disputes',
          '🎯 **Escalation Recommended** - 2 disputes qualify for CFPB complaint',
          '💡 **Tip** - Bundle related disputes for stronger impact',
        ],
        recommendation: 'Prepare CFPB complaint for any dispute exceeding 30 days.',
      },
    ],
  },
  academy: {
    title: '🤖 Knight AI Study Assistant',
    analyzing: 'Personalizing your learning path...',
    responses: [
      {
        score: 0,
        summary: 'Based on your progress, here are personalized recommendations.',
        findings: [
          '📚 **Next Lesson** - FCRA § 1681i Reinvestigation Rights',
          '🎯 **Focus Area** - You excel at disputes, work on legal citations',
          '⏰ **Study Streak** - 5 days! Keep it up for bonus points',
          '🏆 **Achievement Close** - 2 more lessons for "Legal Scholar" badge',
        ],
        quiz: [
          { q: 'How many days do bureaus have to respond?', a: '30 days (45 with extension)' },
          { q: 'What does FCRA stand for?', a: 'Fair Credit Reporting Act' },
          { q: 'What section covers reinvestigation?', a: '§ 1681i' },
        ],
      },
    ],
  },
  form: {
    title: '🤖 Knight AI Form Assistant',
    analyzing: 'Reviewing your submission...',
    responses: [
      {
        score: 9.5,
        summary: 'Your form data strengthens your potential case significantly.',
        findings: [
          '✅ **Completeness** - All required fields properly filled',
          '📋 **Documentation Ready** - Information suitable for legal proceedings',
          '💰 **Damages Documented** - Financial harm clearly established',
          '⚖️ **Pattern Match** - Your situation aligns with successful FCRA cases',
        ],
        recommendation: 'Your information has been added to our litigation database. You may be contacted for class action inclusion.',
      },
    ],
  },
};

export default function KnightAI({ isPrime, type, data, onAnalyze }: KnightAIProps) {
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<any>(null);

  const config = AI_RESPONSES[type];

  const handleAnalyze = () => {
    if (!isPrime) return;
    
    setAnalyzing(true);
    
    // Simulate "AI thinking" - it's just picking a random pre-written response
    setTimeout(() => {
      const responses = config.responses;
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      setResult(randomResponse);
      setAnalyzing(false);
      onAnalyze?.();
    }, 2000 + Math.random() * 1500); // 2-3.5 second "analysis"
  };

  // LOCKED STATE - Free users
  if (!isPrime) {
    return (
      <div className="knight-ai-locked p-6 mt-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl opacity-50">🤖</span>
            <div>
              <h3 className="text-lg font-bold text-gray-400">Knight AI Analysis</h3>
              <p className="text-sm text-gray-500">Premium feature</p>
            </div>
          </div>
          <span className="text-2xl">🔒</span>
        </div>
        
        <div className="bg-knight-black/50 rounded-lg p-4 mb-4">
          <p className="text-gray-500 text-sm">
            Knight AI provides intelligent analysis, personalized recommendations, and legal insights.
            Upgrade to Prime to unlock this powerful feature.
          </p>
        </div>

        <Link href="/pricing">
          <button className="w-full bg-gradient-to-r from-knight-gold to-yellow-500 text-black font-bold py-3 px-6 rounded-lg hover:from-yellow-500 hover:to-knight-gold transition-all">
            ⭐ Upgrade to Prime - $19.99/mo
          </button>
        </Link>
      </div>
    );
  }

  // PRIME USER - Show AI
  return (
    <div className="knight-ai-box p-6 mt-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <span className="text-3xl">🤖</span>
          <div>
            <h3 className="text-lg font-bold text-purple-300">{config.title}</h3>
            <p className="text-sm text-purple-400">⭐ Prime Feature</p>
          </div>
        </div>
        {result && result.score > 0 && (
          <div className="text-center">
            <div className="text-3xl font-bold text-knight-gold">{result.score}/10</div>
            <div className="text-xs text-gray-400">AI Score</div>
          </div>
        )}
      </div>

      {!result && !analyzing && (
        <button
          onClick={handleAnalyze}
          className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold py-4 px-6 rounded-lg hover:from-purple-500 hover:to-blue-500 transition-all flex items-center justify-center gap-2"
        >
          <span className="text-xl">🤖</span>
          Run Knight AI Analysis
        </button>
      )}

      {analyzing && (
        <div className="text-center py-8">
          <div className="text-5xl mb-4 animate-pulse">🤖</div>
          <p className="text-purple-300 animate-pulse">{config.analyzing}</p>
          <div className="mt-4 h-2 bg-knight-black rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-purple-500 to-blue-500 animate-pulse" style={{ width: '60%' }}></div>
          </div>
        </div>
      )}

      {result && (
        <div className="space-y-4">
          {/* Summary */}
          <div className="bg-knight-black/50 rounded-lg p-4">
            <p className="text-white">{result.summary}</p>
          </div>

          {/* Findings */}
          {result.findings && (
            <div>
              <h4 className="text-sm font-bold text-purple-300 mb-2">📋 Key Findings</h4>
              <ul className="space-y-2">
                {result.findings.map((finding: string, i: number) => (
                  <li key={i} className="text-sm text-gray-300 bg-knight-black/30 p-2 rounded">
                    {finding}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Next Steps */}
          {result.nextSteps && (
            <div>
              <h4 className="text-sm font-bold text-purple-300 mb-2">🎯 Recommended Actions</h4>
              <ol className="space-y-1 list-decimal list-inside">
                {result.nextSteps.map((step: string, i: number) => (
                  <li key={i} className="text-sm text-gray-300">{step}</li>
                ))}
              </ol>
            </div>
          )}

          {/* Tips */}
          {result.tips && (
            <div>
              <h4 className="text-sm font-bold text-purple-300 mb-2">💡 Pro Tips</h4>
              <ul className="space-y-1">
                {result.tips.map((tip: string, i: number) => (
                  <li key={i} className="text-sm text-gray-300 flex items-start gap-2">
                    <span>•</span> {tip}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Case Strength */}
          {result.caseStrength && (
            <div className="bg-green-900/30 border border-green-500 rounded-lg p-3">
              <h4 className="text-sm font-bold text-green-400">⚖️ Case Strength</h4>
              <p className="text-sm text-green-300">{result.caseStrength}</p>
            </div>
          )}

          {/* Legal Basis */}
          {result.legalBasis && (
            <div className="bg-blue-900/30 border border-blue-500 rounded-lg p-3">
              <h4 className="text-sm font-bold text-blue-400">📚 Legal Basis</h4>
              <p className="text-sm text-blue-300">{result.legalBasis}</p>
            </div>
          )}

          {/* Recommendation */}
          {result.recommendation && (
            <div className="bg-knight-gold/10 border border-knight-gold rounded-lg p-3">
              <h4 className="text-sm font-bold text-knight-gold">💡 Recommendation</h4>
              <p className="text-sm text-gray-300">{result.recommendation}</p>
            </div>
          )}

          {/* Quiz for Academy */}
          {result.quiz && (
            <div>
              <h4 className="text-sm font-bold text-purple-300 mb-2">🧠 Quick Quiz</h4>
              <div className="space-y-2">
                {result.quiz.map((item: { q: string; a: string }, i: number) => (
                  <details key={i} className="bg-knight-black/30 rounded p-3">
                    <summary className="text-sm text-white cursor-pointer">{item.q}</summary>
                    <p className="text-sm text-knight-gold mt-2 pl-4">→ {item.a}</p>
                  </details>
                ))}
              </div>
            </div>
          )}

          {/* Run Again */}
          <button
            onClick={() => { setResult(null); setAnalyzing(false); }}
            className="w-full bg-knight-hover text-gray-300 py-2 px-4 rounded-lg hover:bg-knight-gold-dark transition text-sm"
          >
            🔄 Run Analysis Again
          </button>
        </div>
      )}
    </div>
  );
}
