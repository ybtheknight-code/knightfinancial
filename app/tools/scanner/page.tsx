'use client';

import { useState } from 'react';
import Card from '@/components/Card';
import Button from '@/components/Button';
import { Input } from '@/components/Input';

export default function ScannerPage() {
  const [file, setFile] = useState<File | null>(null);
  const [scanning, setScanning] = useState(false);
  const [results, setResults] = useState<any>(null);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setResults(null);
    }
  };
  
  const handleScan = async () => {
    if (!file) return;
    
    setScanning(true);
    
    // Simulate scanning with realistic violations
    setTimeout(() => {
      setResults({
        health_score: Math.floor(Math.random() * 30) + 50, // 50-80
        violations: [
          {
            type: 'Incorrect Balance',
            severity: 'high',
            creditor: 'Sallie Mae',
            account: '****1234',
            description: 'Reported balance of $15,342 but actual balance is $12,891',
            impact: 35,
            recommendation: 'Dispute with TransUnion immediately using FCRA § 1681e(b)',
          },
          {
            type: 'Missing Deferment Code',
            severity: 'high',
            creditor: 'Navient',
            account: '****5678',
            description: 'Student loan missing PDE code during CARES Act period (March 2020 - August 2023)',
            impact: 40,
            recommendation: 'This is a Miller v. TransUnion violation. Generate dispute citing Metro 2 omission.',
          },
          {
            type: 'Unauthorized Hard Inquiry',
            severity: 'medium',
            creditor: 'Capital One',
            account: 'N/A',
            description: 'Hard inquiry from April 2024 without your permission',
            impact: 15,
            recommendation: 'Request validation and deletion. May violate FCRA § 1681b',
          },
          {
            type: 'Duplicate Account',
            severity: 'medium',
            creditor: 'Discover Card',
            account: '****9012',
            description: 'Same account reported twice with different numbers',
            impact: 20,
            recommendation: 'Dispute as duplicate. One must be deleted.',
          },
        ],
        bureaus: {
          transunion: 4,
          equifax: 2,
          experian: 1,
        },
        scanned_at: new Date().toISOString(),
      });
      setScanning(false);
    }, 3000);
  };
  
  return (
    <div className="min-h-screen bg-knight-black py-8">
      <div className="container-knight max-w-5xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gradient-gold mb-2">🔍 Knight Scanner</h1>
          <p className="text-gray-400">Analyze your credit reports for FCRA violations and errors</p>
        </div>
        
        <Card>
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-knight-gold mb-4">Upload Credit Report</h2>
              <p className="text-gray-400 text-sm mb-4">
                Supported formats: PDF, PNG, JPG. We support all three bureaus.
              </p>
              
              <div className="border-2 border-dashed border-knight-gold-dark rounded-lg p-8 text-center hover:border-knight-gold transition">
                <input
                  type="file"
                  accept=".pdf,.png,.jpg,.jpeg"
                  onChange={handleFileChange}
                  className="hidden"
                  id="file-upload"
                />
                <label htmlFor="file-upload" className="cursor-pointer">
                  <div className="text-6xl mb-4">📄</div>
                  <div className="text-white font-bold mb-2">
                    {file ? file.name : 'Click to upload or drag and drop'}
                  </div>
                  <div className="text-gray-400 text-sm">
                    PDF, PNG, JPG up to 50MB
                  </div>
                </label>
              </div>
            </div>
            
            <Button 
              onClick={handleScan} 
              disabled={!file || scanning}
              loading={scanning}
              fullWidth 
              size="lg"
            >
              {scanning ? 'Analyzing Report...' : '🔍 Scan for Violations'}
            </Button>
          </div>
        </Card>
        
        {results && (
          <>
            {/* Health Score */}
            <Card className="mt-8">
              <div className="text-center">
                <div className="text-6xl mb-4">
                  {results.health_score >= 80 ? '💚' : results.health_score >= 60 ? '💛' : '❤️'}
                </div>
                <div className="text-6xl font-bold text-knight-gold mb-2">{results.health_score}</div>
                <div className="text-xl text-white font-bold mb-4">Credit Report Health Score</div>
                <div className="text-gray-400">
                  {results.health_score >= 80 ? 'Excellent! Very few issues found.' :
                   results.health_score >= 60 ? 'Good, but some violations need attention.' :
                   'Poor. Multiple violations detected. Take action now.'}
                </div>
              </div>
            </Card>
            
            {/* Violations by Bureau */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <Card>
                <div className="text-3xl mb-2">🔴</div>
                <div className="text-3xl font-bold text-knight-gold">{results.bureaus.transunion}</div>
                <div className="text-sm text-gray-400">TransUnion Violations</div>
              </Card>
              <Card>
                <div className="text-3xl mb-2">🟡</div>
                <div className="text-3xl font-bold text-knight-gold">{results.bureaus.equifax}</div>
                <div className="text-sm text-gray-400">Equifax Violations</div>
              </Card>
              <Card>
                <div className="text-3xl mb-2">🔵</div>
                <div className="text-3xl font-bold text-knight-gold">{results.bureaus.experian}</div>
                <div className="text-sm text-gray-400">Experian Violations</div>
              </Card>
            </div>
            
            {/* Violations List */}
            <Card className="mt-8">
              <h2 className="text-2xl font-bold text-knight-gold mb-6">Violations Found ({results.violations.length})</h2>
              
              <div className="space-y-4">
                {results.violations.map((violation: any, index: number) => (
                  <div 
                    key={index}
                    className="bg-knight-hover p-6 rounded-lg border-2 border-knight-gold-dark"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`text-2xl ${
                            violation.severity === 'high' ? '🔴' :
                            violation.severity === 'medium' ? '🟡' : '🟢'
                          }`}></span>
                          <h3 className="text-xl font-bold text-white">{violation.type}</h3>
                        </div>
                        <div className="text-sm text-gray-400">
                          {violation.creditor} • {violation.account}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-knight-gold">-{violation.impact}</div>
                        <div className="text-xs text-gray-400">Score Impact</div>
                      </div>
                    </div>
                    
                    <div className="bg-knight-black p-4 rounded mb-3">
                      <p className="text-white text-sm">{violation.description}</p>
                    </div>
                    
                    <div className="alert-info">
                      <p className="text-white text-sm">
                        <strong>💡 Recommendation:</strong> {violation.recommendation}
                      </p>
                    </div>
                    
                    <div className="mt-3 flex gap-2">
                      <Button href="/tools/dispute" size="sm">
                        Generate Dispute Letter
                      </Button>
                      <Button href="/academy" variant="gold-outline" size="sm">
                        Learn More
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
            
            {/* Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <Card hover>
                <div className="text-4xl mb-3">✍️</div>
                <h3 className="text-xl font-bold text-knight-gold mb-2">Generate Disputes</h3>
                <p className="text-gray-400 text-sm mb-4">
                  Create professional dispute letters for all violations found
                </p>
                <Button href="/tools/dispute" fullWidth>
                  Generate Letters →
                </Button>
              </Card>
              
              <Card hover>
                <div className="text-4xl mb-3">📚</div>
                <h3 className="text-xl font-bold text-knight-gold mb-2">Learn Your Rights</h3>
                <p className="text-gray-400 text-sm mb-4">
                  Take courses on FCRA, Metro 2, and how to fight these violations
                </p>
                <Button href="/academy" variant="gold-outline" fullWidth>
                  Browse Courses →
                </Button>
              </Card>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
