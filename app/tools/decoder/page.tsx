'use client';

import { useState } from 'react';
import Card from '@/components/Card';

interface DecoderQuestion {
  id: string;
  question: string;
  options: { value: string; label: string; meaning: string; action: string }[];
}

const RESPONSE_TYPES = [
  { id: 'verified', label: '✅ Account Verified', icon: '✅' },
  { id: 'updated', label: '🔄 Account Updated', icon: '🔄' },
  { id: 'deleted', label: '🗑️ Account Deleted', icon: '🗑️' },
  { id: 'remains', label: '⚠️ Remains / No Change', icon: '⚠️' },
  { id: 'frivolous', label: '🚫 Frivolous / Not Investigated', icon: '🚫' },
  { id: 'reinvestigation', label: '📋 Reinvestigation Results', icon: '📋' },
];

const DECODER_ANALYSIS: Record<string, { title: string; meaning: string; action: string; nextSteps: string[]; victory: boolean }> = {
  'verified': {
    title: '❌ Bad News: Account Verified as Accurate',
    meaning: 'The bureau contacted the creditor who confirmed the information. However, "verified" does NOT mean they actually investigated properly.',
    action: 'Challenge the verification method! Under FCRA §611, they must conduct a REASONABLE investigation.',
    nextSteps: [
      'Send Method of Verification (MOV) request letter',
      'Ask specifically HOW they verified (phone? electronic?)',
      'Request name and contact of person who verified',
      'If they can\'t provide MOV details, dispute again citing procedural failure',
      'Consider escalating to CFPB complaint',
    ],
    victory: false,
  },
  'updated': {
    title: '🔄 Partial Win: Account Was Updated',
    meaning: 'The creditor made changes to how the account is being reported. This could be a date change, balance update, or status change.',
    action: 'Review EXACTLY what changed. If it\'s still negative, dispute again on different grounds.',
    nextSteps: [
      'Get fresh credit report to see what changed',
      'Compare old vs new reporting',
      'If still inaccurate, dispute the NEW inaccuracy',
      'Document this as evidence they CAN make changes',
      'Use this in any future disputes as proof of errors',
    ],
    victory: false,
  },
  'deleted': {
    title: '🏆 VICTORY! Account Deleted!',
    meaning: 'The negative item has been REMOVED from your credit report! This is the best possible outcome.',
    action: 'Celebrate! But verify the deletion and protect your win.',
    nextSteps: [
      'Get updated credit report to CONFIRM deletion',
      'Check ALL THREE bureaus (may need to dispute others)',
      'Save proof of deletion for your records',
      'Monitor for 90 days - sometimes items get re-inserted',
      'If re-inserted, send "Re-Insertion" dispute letter immediately',
    ],
    victory: true,
  },
  'remains': {
    title: '⚠️ No Change: Account Remains',
    meaning: 'The bureau claims the account is accurate and made no changes. But this doesn\'t mean you\'re done!',
    action: 'This is NOT the end. Escalate with more specific disputes.',
    nextSteps: [
      'Dispute with DIFFERENT reasons (dates, amounts, status codes)',
      'Send direct dispute to the CREDITOR (not just bureau)',
      'File CFPB complaint citing failure to investigate',
      'Request your complete file disclosure',
      'Check for Metro 2 violations (Field 15, 16, 21, 22)',
      'Consider legal consultation for FCRA violation',
    ],
    victory: false,
  },
  'frivolous': {
    title: '🚫 Dispute Deemed Frivolous',
    meaning: 'The bureau claims your dispute lacks sufficient information or is repetitive. This is often a VIOLATION of your rights!',
    action: 'Fight back! Bureaus overuse "frivolous" to avoid investigating.',
    nextSteps: [
      'Send "Frivolous Response Challenge" letter',
      'Include MORE documentation with next dispute',
      'Cite FCRA §611(a)(3) - they must investigate unless frivolous',
      'File CFPB complaint - frivolous findings are often improper',
      'Document EVERYTHING for potential lawsuit',
      'Consult attorney - improper frivolous = damages',
    ],
    victory: false,
  },
  'reinvestigation': {
    title: '📋 Reinvestigation Results Received',
    meaning: 'You received the results of a reinvestigation. Review carefully for what changed or stayed the same.',
    action: 'Analyze every detail of the reinvestigation report.',
    nextSteps: [
      'Compare each field to original report',
      'Note ANY changes (even small ones) as evidence',
      'If still inaccurate, prepare Round 2 dispute',
      'Request the METHOD of verification used',
      'Check if they investigated ALL items you disputed',
    ],
    victory: false,
  },
};

const BUREAU_CODES: Record<string, { code: string; meaning: string }[]> = {
  'TransUnion': [
    { code: 'XB', meaning: 'Account verified as belonging to consumer' },
    { code: 'XC', meaning: 'Account deleted' },
    { code: 'XD', meaning: 'Account updated' },
    { code: 'XE', meaning: 'Investigation in progress' },
    { code: 'XR', meaning: 'Reinvestigation in process' },
  ],
  'Equifax': [
    { code: 'Verified', meaning: 'Account verified as accurate' },
    { code: 'Deleted', meaning: 'Account removed from file' },
    { code: 'Modified', meaning: 'Account information updated' },
    { code: 'Consumer Statement Added', meaning: 'Your statement was added' },
  ],
  'Experian': [
    { code: 'Verified as Accurate', meaning: 'Creditor confirmed information' },
    { code: 'Deleted', meaning: 'Item removed' },
    { code: 'Updated', meaning: 'Information changed' },
    { code: 'Disputed by Consumer', meaning: 'Dispute notation added' },
  ],
};

export default function DecoderPage() {
  const [selectedResponse, setSelectedResponse] = useState<string | null>(null);
  const [showCodes, setShowCodes] = useState(false);
  
  const analysis = selectedResponse ? DECODER_ANALYSIS[selectedResponse] : null;
  
  return (
    <div className="min-h-screen bg-knight-black py-8">
      <div className="container-knight max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gradient-gold mb-4">🔓 Knight Decoder</h1>
          <p className="text-gray-400">Decode Bureau Responses & Plan Your Next Move</p>
        </div>
        
        {/* Step 1: Select Response Type */}
        <Card className="mb-6">
          <h2 className="text-xl font-bold text-white mb-4">📬 Step 1: What response did you receive?</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {RESPONSE_TYPES.map((type) => (
              <button
                key={type.id}
                onClick={() => setSelectedResponse(type.id)}
                className={`p-4 rounded-lg border transition text-left ${
                  selectedResponse === type.id
                    ? 'border-knight-gold bg-knight-gold/20'
                    : 'border-knight-gold-dark bg-knight-hover hover:border-knight-gold'
                }`}
              >
                <div className="text-2xl mb-2">{type.icon}</div>
                <div className="text-white text-sm font-bold">{type.label}</div>
              </button>
            ))}
          </div>
        </Card>
        
        {/* Analysis Result */}
        {analysis && (
          <Card className={`mb-6 ${analysis.victory ? 'border-2 border-green-500' : ''}`}>
            {analysis.victory && (
              <div className="bg-green-500/20 -mx-6 -mt-6 px-6 py-4 rounded-t-lg mb-4 text-center">
                <span className="text-4xl">🏆</span>
                <span className="text-2xl ml-2 text-green-400 font-bold">VICTORY!</span>
              </div>
            )}
            
            <h2 className="text-2xl font-bold text-white mb-4">{analysis.title}</h2>
            
            <div className="space-y-4">
              <div className="bg-knight-hover rounded-lg p-4">
                <h3 className="text-knight-gold font-bold mb-2">📖 What This Means:</h3>
                <p className="text-gray-300">{analysis.meaning}</p>
              </div>
              
              <div className="bg-knight-hover rounded-lg p-4">
                <h3 className="text-knight-gold font-bold mb-2">⚔️ Your Action:</h3>
                <p className="text-gray-300">{analysis.action}</p>
              </div>
              
              <div className="bg-knight-hover rounded-lg p-4">
                <h3 className="text-knight-gold font-bold mb-2">📋 Next Steps:</h3>
                <ol className="space-y-2">
                  {analysis.nextSteps.map((step, i) => (
                    <li key={i} className="text-gray-300 flex items-start gap-2">
                      <span className="text-knight-gold font-bold">{i + 1}.</span>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 mt-6">
              {!analysis.victory && (
                <a href="/tools/dispute" className="btn-knight">
                  ⚔️ Generate Follow-Up Letter
                </a>
              )}
              <a href="/tools/tracker" className="btn-knight-outline">
                📊 Track This Dispute
              </a>
              <a href="/tools/vault" className="btn-knight-outline">
                📁 Save Response
              </a>
            </div>
          </Card>
        )}
        
        {/* Bureau Code Reference */}
        <Card>
          <button
            onClick={() => setShowCodes(!showCodes)}
            className="w-full flex items-center justify-between text-white font-bold"
          >
            <span>📚 Bureau Response Code Reference</span>
            <span>{showCodes ? '▼' : '▶'}</span>
          </button>
          
          {showCodes && (
            <div className="mt-4 space-y-4">
              {Object.entries(BUREAU_CODES).map(([bureau, codes]) => (
                <div key={bureau} className="bg-knight-hover rounded-lg p-4">
                  <h3 className="text-knight-gold font-bold mb-2">{bureau}</h3>
                  <div className="space-y-1">
                    {codes.map((code, i) => (
                      <div key={i} className="text-sm">
                        <span className="text-white font-mono bg-knight-black px-2 py-0.5 rounded">
                          {code.code}
                        </span>
                        <span className="text-gray-400 ml-2">{code.meaning}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
        
        {/* Pro Tips */}
        <Card className="mt-6">
          <h2 className="text-xl font-bold text-white mb-4">💡 Knight Pro Tips</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-knight-hover rounded-lg p-4">
              <h3 className="text-knight-gold font-bold mb-2">📅 The 30-Day Rule</h3>
              <p className="text-gray-400 text-sm">
                Bureaus have 30 days to investigate (45 if you send documents). 
                If they take longer without notifying you, that's a VIOLATION!
              </p>
            </div>
            <div className="bg-knight-hover rounded-lg p-4">
              <h3 className="text-knight-gold font-bold mb-2">🎯 Method of Verification</h3>
              <p className="text-gray-400 text-sm">
                Always request HOW they verified. "We contacted the creditor" is NOT enough. 
                They must provide specific details.
              </p>
            </div>
            <div className="bg-knight-hover rounded-lg p-4">
              <h3 className="text-knight-gold font-bold mb-2">📝 Documentation is King</h3>
              <p className="text-gray-400 text-sm">
                Keep EVERY letter, envelope (postmark dates!), and response. 
                This is your evidence trail for potential litigation.
              </p>
            </div>
            <div className="bg-knight-hover rounded-lg p-4">
              <h3 className="text-knight-gold font-bold mb-2">🔄 Never Give Up</h3>
              <p className="text-gray-400 text-sm">
                "Verified" doesn't mean accurate! Dispute using different angles. 
                Many victories come after 2-3 rounds of disputes.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
