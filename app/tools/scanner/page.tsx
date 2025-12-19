'use client';

import { useState } from 'react';
import Card from '@/components/Card';

// Quiz-style guided scanner
interface Question {
  id: string;
  question: string;
  options: { value: string; label: string; points: number; flag?: string }[];
  category: string;
}

const SCANNER_QUESTIONS: Question[] = [
  // Account Status
  {
    id: 'late_payments',
    question: 'Do you have any late payments showing on your credit report?',
    category: 'Payment History',
    options: [
      { value: 'none', label: 'No late payments', points: 100 },
      { value: '30day', label: 'Yes, 30-day late(s)', points: 60, flag: 'late_payment' },
      { value: '60day', label: 'Yes, 60-day late(s)', points: 40, flag: 'late_payment' },
      { value: '90plus', label: 'Yes, 90+ day late(s)', points: 20, flag: 'severe_late' },
    ],
  },
  {
    id: 'collections',
    question: 'Do you have any collection accounts?',
    category: 'Collections',
    options: [
      { value: 'none', label: 'No collections', points: 100 },
      { value: '1-2', label: '1-2 collections', points: 50, flag: 'collections' },
      { value: '3-5', label: '3-5 collections', points: 30, flag: 'collections' },
      { value: '6plus', label: '6+ collections', points: 10, flag: 'severe_collections' },
    ],
  },
  {
    id: 'charge_offs',
    question: 'Do you have any charge-offs on your report?',
    category: 'Charge-Offs',
    options: [
      { value: 'none', label: 'No charge-offs', points: 100 },
      { value: '1', label: '1 charge-off', points: 50, flag: 'charge_off' },
      { value: '2-3', label: '2-3 charge-offs', points: 30, flag: 'charge_off' },
      { value: '4plus', label: '4+ charge-offs', points: 10, flag: 'severe_charge_off' },
    ],
  },
  {
    id: 'inquiries',
    question: 'How many hard inquiries in the last 2 years?',
    category: 'Inquiries',
    options: [
      { value: '0-2', label: '0-2 inquiries', points: 100 },
      { value: '3-5', label: '3-5 inquiries', points: 70, flag: 'inquiries' },
      { value: '6-10', label: '6-10 inquiries', points: 40, flag: 'excessive_inquiries' },
      { value: '10plus', label: '10+ inquiries', points: 20, flag: 'severe_inquiries' },
    ],
  },
  {
    id: 'utilization',
    question: 'What is your overall credit utilization (balance vs limit)?',
    category: 'Utilization',
    options: [
      { value: 'under10', label: 'Under 10%', points: 100 },
      { value: '10-30', label: '10-30%', points: 80 },
      { value: '30-50', label: '30-50%', points: 50, flag: 'high_util' },
      { value: '50-75', label: '50-75%', points: 30, flag: 'high_util' },
      { value: 'over75', label: 'Over 75%', points: 10, flag: 'severe_util' },
    ],
  },
  {
    id: 'account_age',
    question: 'How old is your oldest account?',
    category: 'Credit Age',
    options: [
      { value: '10plus', label: '10+ years', points: 100 },
      { value: '5-10', label: '5-10 years', points: 80 },
      { value: '2-5', label: '2-5 years', points: 60 },
      { value: '1-2', label: '1-2 years', points: 40 },
      { value: 'under1', label: 'Under 1 year', points: 20, flag: 'thin_file' },
    ],
  },
  {
    id: 'mix',
    question: 'What types of credit do you have?',
    category: 'Credit Mix',
    options: [
      { value: 'diverse', label: 'Mix of cards, loans, mortgage', points: 100 },
      { value: 'some', label: 'Cards and 1 installment loan', points: 70 },
      { value: 'cards_only', label: 'Credit cards only', points: 50, flag: 'limited_mix' },
      { value: 'none', label: 'Very limited or none', points: 20, flag: 'thin_file' },
    ],
  },
  {
    id: 'public_records',
    question: 'Do you have any bankruptcies, judgments, or tax liens?',
    category: 'Public Records',
    options: [
      { value: 'none', label: 'None', points: 100 },
      { value: 'old', label: 'Yes, but over 5 years old', points: 50, flag: 'public_record' },
      { value: 'recent', label: 'Yes, within last 5 years', points: 20, flag: 'recent_public' },
      { value: 'active', label: 'Yes, still active', points: 5, flag: 'active_public' },
    ],
  },
  // Metro 2 Violations (Knight's Secret Sauce)
  {
    id: 'date_reporting',
    question: 'Are there accounts showing "$0 balance" but still reporting negatively?',
    category: 'Metro 2 Violations',
    options: [
      { value: 'no', label: 'No / Not sure', points: 0 },
      { value: 'yes', label: 'Yes, I see this', points: 0, flag: 'metro2_violation' },
    ],
  },
  {
    id: 'missing_fields',
    question: 'Do any accounts show BLANK (not $0) for payment amounts or balances?',
    category: 'Metro 2 Violations',
    options: [
      { value: 'no', label: 'No / Not sure', points: 0 },
      { value: 'yes', label: 'Yes, some fields are blank', points: 0, flag: 'omission_violation' },
    ],
  },
];

const FLAG_RECOMMENDATIONS: Record<string, { title: string; action: string; dispute: boolean }> = {
  late_payment: { title: '⚠️ Late Payments Found', action: 'Dispute accuracy of payment history. Request validation of payment dates.', dispute: true },
  severe_late: { title: '🚨 Severe Late Payments', action: 'Priority dispute! Challenge dates, amounts, and creditor compliance.', dispute: true },
  collections: { title: '⚠️ Collection Accounts', action: 'Request debt validation under FDCPA. Dispute if older than 7 years or inaccurate.', dispute: true },
  severe_collections: { title: '🚨 Multiple Collections', action: 'Systematic dispute strategy needed. Start with oldest accounts.', dispute: true },
  charge_off: { title: '⚠️ Charge-Off Accounts', action: 'Dispute accuracy. Verify if properly reporting zero balance after charge-off.', dispute: true },
  severe_charge_off: { title: '🚨 Multiple Charge-Offs', action: 'Comprehensive dispute campaign needed. Check for Metro 2 violations.', dispute: true },
  inquiries: { title: '⚠️ Multiple Inquiries', action: 'Dispute unauthorized inquiries. Request removal of duplicates.', dispute: true },
  excessive_inquiries: { title: '🚨 Excessive Inquiries', action: 'Priority inquiry dispute. May indicate identity theft - consider freeze.', dispute: true },
  severe_inquiries: { title: '🚨 Severe Inquiry Damage', action: 'Full inquiry audit needed. Dispute ALL unauthorized inquiries.', dispute: true },
  high_util: { title: '⚠️ High Utilization', action: 'Pay down balances to under 30%. Consider balance transfer or CAPS strategy.', dispute: false },
  severe_util: { title: '🚨 Maxed Out Accounts', action: 'Emergency debt reduction needed. Consider debt management or negotiation.', dispute: false },
  thin_file: { title: '⚠️ Thin Credit File', action: 'Build credit with secured card, authorized user, or credit builder loan.', dispute: false },
  limited_mix: { title: '⚠️ Limited Credit Mix', action: 'Add installment loan (credit builder) to improve mix.', dispute: false },
  public_record: { title: '⚠️ Public Record', action: 'Verify accuracy. Challenge if over 7-10 years (depending on type).', dispute: true },
  recent_public: { title: '🚨 Recent Public Record', action: 'Verify legal accuracy. Ensure proper discharge/satisfaction reporting.', dispute: true },
  active_public: { title: '🚨 Active Public Record', action: 'Seek legal counsel. Focus on resolution strategy.', dispute: false },
  metro2_violation: { title: '🎯 METRO 2 VIOLATION DETECTED!', action: 'BLANK ≠ ZERO! This is the Omission Harm Theory. Generate dispute letter NOW.', dispute: true },
  omission_violation: { title: '🎯 OMISSION VIOLATION FOUND!', action: 'Missing fields violate CRRG 4.3! Creditor MUST report required fields. Strong dispute case!', dispute: true },
};

export default function ScannerPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [flags, setFlags] = useState<string[]>([]);
  const [totalPoints, setTotalPoints] = useState(0);
  const [showResults, setShowResults] = useState(false);
  
  const handleAnswer = (questionId: string, value: string, points: number, flag?: string) => {
    setAnswers({ ...answers, [questionId]: value });
    setTotalPoints(totalPoints + points);
    if (flag) {
      setFlags([...flags, flag]);
    }
    
    if (currentQuestion < SCANNER_QUESTIONS.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };
  
  const getScoreGrade = () => {
    const maxPoints = SCANNER_QUESTIONS.length * 100;
    const percentage = (totalPoints / maxPoints) * 100;
    
    if (percentage >= 90) return { grade: 'A', color: 'text-green-400', message: 'Excellent! Your credit profile is strong.' };
    if (percentage >= 80) return { grade: 'B', color: 'text-green-300', message: 'Good! Minor improvements possible.' };
    if (percentage >= 70) return { grade: 'C', color: 'text-yellow-400', message: 'Fair. Several areas need attention.' };
    if (percentage >= 60) return { grade: 'D', color: 'text-orange-400', message: 'Below Average. Significant work needed.' };
    return { grade: 'F', color: 'text-red-400', message: 'Critical! Immediate action required.' };
  };
  
  const resetScanner = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setFlags([]);
    setTotalPoints(0);
    setShowResults(false);
  };
  
  const question = SCANNER_QUESTIONS[currentQuestion];
  const scoreInfo = getScoreGrade();
  
  return (
    <div className="min-h-screen bg-knight-black py-8">
      <div className="container-knight max-w-3xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gradient-gold mb-4">🔍 Knight Scanner</h1>
          <p className="text-gray-400">AI-Powered Credit Analysis in 60 Seconds</p>
        </div>
        
        {!showResults ? (
          <Card>
            {/* Progress */}
            <div className="mb-6">
              <div className="flex justify-between text-sm text-gray-400 mb-2">
                <span>Question {currentQuestion + 1} of {SCANNER_QUESTIONS.length}</span>
                <span>{question.category}</span>
              </div>
              <div className="w-full bg-knight-hover rounded-full h-2">
                <div 
                  className="bg-knight-gold h-2 rounded-full transition-all"
                  style={{ width: `${((currentQuestion + 1) / SCANNER_QUESTIONS.length) * 100}%` }}
                />
              </div>
            </div>
            
            {/* Question */}
            <h2 className="text-2xl font-bold text-white mb-6">{question.question}</h2>
            
            {/* Options */}
            <div className="space-y-3">
              {question.options.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleAnswer(question.id, option.value, option.points, option.flag)}
                  className="w-full text-left p-4 bg-knight-hover rounded-lg border border-knight-gold-dark hover:border-knight-gold hover:bg-knight-gold-dark transition"
                >
                  <span className="text-white">{option.label}</span>
                </button>
              ))}
            </div>
          </Card>
        ) : (
          <div className="space-y-6">
            {/* Score Card */}
            <Card className="text-center">
              <h2 className="text-2xl font-bold text-white mb-4">📊 Your Credit Health Score</h2>
              <div className={`text-8xl font-bold ${scoreInfo.color} mb-4`}>{scoreInfo.grade}</div>
              <p className="text-xl text-gray-300 mb-4">{scoreInfo.message}</p>
              <div className="text-gray-400">
                Score: {totalPoints} / {SCANNER_QUESTIONS.length * 100} points
              </div>
            </Card>
            
            {/* Flags & Recommendations */}
            {flags.length > 0 && (
              <Card>
                <h2 className="text-2xl font-bold text-white mb-4">🎯 Issues Found & Action Plan</h2>
                <div className="space-y-4">
                  {[...new Set(flags)].map((flag) => {
                    const rec = FLAG_RECOMMENDATIONS[flag];
                    if (!rec) return null;
                    return (
                      <div key={flag} className="bg-knight-hover rounded-lg p-4 border-l-4 border-knight-gold">
                        <h3 className="text-white font-bold mb-2">{rec.title}</h3>
                        <p className="text-gray-300 mb-2">{rec.action}</p>
                        {rec.dispute && (
                          <a 
                            href="/tools/dispute" 
                            className="inline-block text-knight-gold hover:underline text-sm"
                          >
                            → Generate Dispute Letter
                          </a>
                        )}
                      </div>
                    );
                  })}
                </div>
              </Card>
            )}
            
            {/* Metro 2 Alert */}
            {(flags.includes('metro2_violation') || flags.includes('omission_violation')) && (
              <Card className="border-2 border-knight-gold bg-gradient-to-r from-knight-gold/20 to-transparent">
                <div className="text-center">
                  <div className="text-5xl mb-4">🎯</div>
                  <h2 className="text-2xl font-bold text-knight-gold mb-2">METRO 2 VIOLATION DETECTED!</h2>
                  <p className="text-white mb-4">
                    You may have grounds for FCRA litigation based on the <strong>Omission Harm Theory</strong>. 
                    BLANK fields ≠ ZERO! This is a reporting violation under CRRG standards.
                  </p>
                  <a href="/tools/dispute" className="btn-knight">
                    ⚔️ Generate Violation Dispute Letter
                  </a>
                </div>
              </Card>
            )}
            
            {/* Actions */}
            <div className="flex gap-4">
              <button onClick={resetScanner} className="btn-knight-outline flex-1">
                🔄 Scan Again
              </button>
              <a href="/tools/dispute" className="btn-knight flex-1 text-center">
                ⚔️ Generate Disputes
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
