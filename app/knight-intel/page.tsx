import Card from '@/components/Card';
import Link from 'next/link';

export default function KnightIntelPage() {
  return (
    <div className="min-h-screen bg-knight-black py-12">
      <div className="container-knight max-w-5xl">
        {/* Hero */}
        <div className="text-center mb-12">
          <div className="text-7xl mb-4">💎</div>
          <h1 className="text-5xl font-bold text-gradient-gold mb-4">Knight Intel</h1>
          <p className="text-2xl text-gray-300">B2B Credit Bureau Analytics</p>
          <p className="text-gray-500 mt-2">Aggregated Insights • Litigation Support • Market Research</p>
        </div>

        {/* What is Knight Intel */}
        <Card premium className="mb-12">
          <h2 className="text-3xl font-bold text-gradient-gold mb-4">What is Knight Intel?</h2>
          <p className="text-lg text-gray-300 mb-4">
            Knight Intel is our B2B data analytics platform providing <strong className="text-white">aggregated, 
            anonymized insights</strong> from thousands of consumer credit reports and disputes. We've identified 
            patterns, violations, and systemic issues across TransUnion, Equifax, Experian, and Innovis.
          </p>
          <p className="text-gray-400">
            This data is invaluable for law firms building FCRA cases, researchers studying credit reporting, 
            data companies analyzing market trends, and journalists investigating bureau misconduct.
          </p>
        </Card>

        {/* Who It's For */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <Card>
            <div className="text-4xl mb-4">⚖️</div>
            <h3 className="text-2xl font-bold text-white mb-3">FCRA Law Firms</h3>
            <ul className="space-y-2 text-gray-400">
              <li>• Pattern analysis across bureaus</li>
              <li>• Pre-qualified case files</li>
              <li>• Violation frequency data</li>
              <li>• Metro 2 compliance statistics</li>
              <li>• Reinvestigation failure rates</li>
            </ul>
          </Card>

          <Card>
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-2xl font-bold text-white mb-3">Data Companies</h3>
            <ul className="space-y-2 text-gray-400">
              <li>• Consumer credit trends</li>
              <li>• Geographic distributions</li>
              <li>• Demographic correlations</li>
              <li>• Dispute outcome analysis</li>
              <li>• Bureau response times</li>
            </ul>
          </Card>

          <Card>
            <div className="text-4xl mb-4">🎓</div>
            <h3 className="text-2xl font-bold text-white mb-3">Universities & Researchers</h3>
            <ul className="space-y-2 text-gray-400">
              <li>• Academic research datasets</li>
              <li>• Consumer behavior studies</li>
              <li>• Financial literacy research</li>
              <li>• Policy impact analysis</li>
              <li>• Longitudinal tracking</li>
            </ul>
          </Card>

          <Card>
            <div className="text-4xl mb-4">📰</div>
            <h3 className="text-2xl font-bold text-white mb-3">Journalists & Media</h3>
            <ul className="space-y-2 text-gray-400">
              <li>• Investigation support</li>
              <li>• Story verification data</li>
              <li>• Bureau accountability stats</li>
              <li>• Consumer harm documentation</li>
              <li>• Expert commentary</li>
            </ul>
          </Card>
        </div>

        {/* Sample Data Preview */}
        <Card className="mb-12">
          <h2 className="text-3xl font-bold text-knight-gold text-center mb-8">Sample Analytics</h2>
          <p className="text-center text-gray-500 mb-8">(Live data - updated continuously)</p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-knight-gold">15,000+</div>
              <div className="text-sm text-gray-400">Violations Documented</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-knight-gold">3,000+</div>
              <div className="text-sm text-gray-400">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-knight-gold">$50M+</div>
              <div className="text-sm text-gray-400">Estimated Damages</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-knight-gold">87 pts</div>
              <div className="text-sm text-gray-400">Avg Score Impact</div>
            </div>
          </div>

          {/* Bureau Breakdown */}
          <div className="bg-knight-hover rounded-lg p-6">
            <h3 className="text-xl font-bold text-white mb-4">Violations by Bureau</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-gray-300">TransUnion</span>
                  <span className="text-knight-gold">42%</span>
                </div>
                <div className="h-3 bg-knight-black rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-red-600 to-red-400" style={{ width: '42%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-gray-300">Equifax</span>
                  <span className="text-knight-gold">35%</span>
                </div>
                <div className="h-3 bg-knight-black rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-blue-600 to-blue-400" style={{ width: '35%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-gray-300">Experian</span>
                  <span className="text-knight-gold">23%</span>
                </div>
                <div className="h-3 bg-knight-black rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-green-600 to-green-400" style={{ width: '23%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* What We Offer */}
        <Card className="mb-12">
          <h2 className="text-3xl font-bold text-knight-gold text-center mb-8">Available Data Products</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-knight-hover p-5 rounded-lg">
              <h4 className="font-bold text-white mb-2">📋 Violation Pattern Reports</h4>
              <p className="text-sm text-gray-400">Detailed analysis of FCRA violations by type, bureau, and frequency</p>
            </div>
            <div className="bg-knight-hover p-5 rounded-lg">
              <h4 className="font-bold text-white mb-2">👤 Demographic Analysis</h4>
              <p className="text-sm text-gray-400">Credit issues broken down by age, income, geography, and more</p>
            </div>
            <div className="bg-knight-hover p-5 rounded-lg">
              <h4 className="font-bold text-white mb-2">⏱️ Timeline Data</h4>
              <p className="text-sm text-gray-400">Bureau response times, dispute durations, and compliance rates</p>
            </div>
            <div className="bg-knight-hover p-5 rounded-lg">
              <h4 className="font-bold text-white mb-2">💰 Damages Documentation</h4>
              <p className="text-sm text-gray-400">Loan denials, rate increases, and financial harm statistics</p>
            </div>
            <div className="bg-knight-hover p-5 rounded-lg">
              <h4 className="font-bold text-white mb-2">📊 Custom Reports</h4>
              <p className="text-sm text-gray-400">Tailored data analysis based on your specific needs</p>
            </div>
            <div className="bg-knight-hover p-5 rounded-lg">
              <h4 className="font-bold text-white mb-2">⚖️ Litigation Support</h4>
              <p className="text-sm text-gray-400">Pre-qualified case files and expert witness data</p>
            </div>
          </div>
        </Card>

        {/* How It Works */}
        <Card className="mb-12">
          <h2 className="text-3xl font-bold text-knight-gold text-center mb-8">How It Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="w-16 h-16 rounded-full bg-knight-gold text-black text-2xl font-bold flex items-center justify-center mx-auto mb-4">1</div>
              <h4 className="font-bold text-white mb-2">Contact Us</h4>
              <p className="text-sm text-gray-400">Reach out to discuss your data needs</p>
            </div>
            <div>
              <div className="w-16 h-16 rounded-full bg-knight-gold text-black text-2xl font-bold flex items-center justify-center mx-auto mb-4">2</div>
              <h4 className="font-bold text-white mb-2">NDA & Agreement</h4>
              <p className="text-sm text-gray-400">Sign data use agreement & NDA</p>
            </div>
            <div>
              <div className="w-16 h-16 rounded-full bg-knight-gold text-black text-2xl font-bold flex items-center justify-center mx-auto mb-4">3</div>
              <h4 className="font-bold text-white mb-2">Custom Pricing</h4>
              <p className="text-sm text-gray-400">Receive quote based on data scope</p>
            </div>
            <div>
              <div className="w-16 h-16 rounded-full bg-knight-gold text-black text-2xl font-bold flex items-center justify-center mx-auto mb-4">4</div>
              <h4 className="font-bold text-white mb-2">Data Delivery</h4>
              <p className="text-sm text-gray-400">Receive secure data access</p>
            </div>
          </div>
        </Card>

        {/* Compliance Notice */}
        <Card className="mb-12 border-2 border-yellow-600">
          <div className="flex items-start gap-4">
            <span className="text-4xl">⚠️</span>
            <div>
              <h3 className="text-xl font-bold text-yellow-400 mb-2">Data Compliance</h3>
              <p className="text-gray-300 mb-2">
                All Knight Intel data is <strong className="text-white">fully anonymized</strong> and 
                <strong className="text-white"> aggregated</strong>. No Personally Identifiable Information (PII) 
                is ever included in data products.
              </p>
              <p className="text-gray-400 text-sm">
                We comply with CCPA, GLBA, and all applicable data protection regulations. 
                All users consent to anonymized data use through our Data Partnership Agreement.
              </p>
            </div>
          </div>
        </Card>

        {/* Contact CTA */}
        <Card premium className="text-center">
          <h2 className="text-3xl font-bold text-gradient-gold mb-4">Interested in Knight Intel?</h2>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            All Knight Intel partnerships require CEO approval. Contact Raheem Sanders directly to discuss 
            your data needs and receive custom pricing.
          </p>
          
          <div className="bg-knight-black rounded-xl p-8 inline-block mb-6">
            <p className="text-gray-400 mb-2">Raheem Sanders, CEO</p>
            <a href="tel:3349389171" className="text-3xl font-bold text-knight-gold hover:underline block mb-2">
              334-938-9171
            </a>
            <a href="mailto:raheem@knightfin.org" className="text-knight-gold hover:underline">
              raheem@knightfin.org
            </a>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="btn-knight text-center">
              Contact Us
            </Link>
            <Link href="/about" className="btn-gold-outline text-center">
              Learn About Knight Financial
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}
