import Card from '@/components/Card';
import Link from 'next/link';

const SERVICE_PACKAGES = [
  {
    name: 'Knight Starter',
    price: 250,
    tagline: 'Perfect for Getting Started',
    color: 'from-green-600 to-green-700',
    borderColor: 'border-green-500',
    features: [
      'Initial credit report analysis',
      '3 custom dispute letters',
      'Basic violation identification',
      'Standard dispute strategy guide',
      'Email support (72hr response)',
      'Academy course recommendations',
      '30-day follow-up check-in',
    ],
    caps: [
      '📈 CAPS Basic: 1 authorized user tradeline strategy',
      '📈 CAPS Basic: Self-lender account setup guide',
      '📈 CAPS Basic: Credit builder card recommendations',
    ],
    notIncluded: [
      'Knight AI analysis',
      'Lawyer referral',
      'Priority support',
      'CFPB complaint drafting',
      'Advanced CAPS protocols',
    ],
    jotformUrl: 'https://form.jotform.com/253493603801051',
    bestFor: 'Consumers with 1-3 disputable items who want professional guidance getting started.',
  },
  {
    name: 'Knight Warrior',
    price: 500,
    tagline: 'Most Popular Choice',
    color: 'from-blue-600 to-purple-600',
    borderColor: 'border-blue-500',
    popular: true,
    features: [
      'Comprehensive credit report analysis',
      '7 custom dispute letters',
      'Advanced violation identification',
      'Bureau-specific strategy for all 3 CRAs',
      'CFPB complaint draft (if applicable)',
      'Priority email support (24hr response)',
      'Knight AI analysis report',
      '60-day case tracking',
      'Lawyer referral introduction',
      '1 phone consultation (30 min)',
    ],
    caps: [
      '📈 CAPS Pro: Authorized user tradeline placement (2 accounts)',
      '📈 CAPS Pro: Personal loan credit builder strategy',
      '📈 CAPS Pro: Credit card stacking blueprint',
      '📈 CAPS Pro: Utilization optimization plan',
      '📈 CAPS Pro: Inquiry removal strategy',
      '📈 CAPS Pro: 90-day score improvement roadmap',
    ],
    notIncluded: [
      'Litigation case building',
      'Court document preparation',
      'Elite CAPS protocols',
    ],
    jotformUrl: 'https://form.jotform.com/253493613919062',
    bestFor: 'Consumers with multiple errors ready for aggressive dispute action and active credit building.',
  },
  {
    name: 'Knight Champion',
    price: 2500,
    tagline: 'Full Litigation + Maximum Credit Building',
    color: 'from-knight-gold to-yellow-500',
    borderColor: 'border-knight-gold',
    premium: true,
    features: [
      'Everything in Knight Warrior PLUS:',
      'Complete litigation case file preparation',
      'Damages documentation package',
      'Expert FCRA violation analysis',
      'Priority lawyer matching & introduction',
      'Court-ready dispute chronology',
      'CFPB complaint filing assistance',
      'State AG complaint preparation',
      'Direct CEO access for case questions',
      '90-day intensive support',
      'Unlimited custom dispute letters',
      'Metro 2 compliance analysis',
      'Potential class action identification',
      '2 phone consultations (60 min each)',
    ],
    caps: [
      '📈 CAPS ELITE: Full authorized user tradeline package (5 accounts)',
      '📈 CAPS ELITE: Business credit building blueprint',
      '📈 CAPS ELITE: Credit card churning strategy',
      '📈 CAPS ELITE: Personal loan ladder system',
      '📈 CAPS ELITE: Real estate credit optimization',
      '📈 CAPS ELITE: Debt restructuring plan',
      '📈 CAPS ELITE: Score maximization protocol (800+ target)',
      '📈 CAPS ELITE: Credit monitoring setup (all 3 bureaus)',
      '📈 CAPS ELITE: 6-month credit coaching (bi-weekly calls)',
      '📈 CAPS ELITE: Goodwill letter package',
      '📈 CAPS ELITE: Pay-for-delete negotiation scripts',
    ],
    notIncluded: [],
    jotformUrl: 'https://form.jotform.com/253493757778074',
    bestFor: 'Consumers seeking maximum credit transformation with litigation support and comprehensive credit building.',
  },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-knight-black py-12">
      <div className="container-knight">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gradient-gold mb-4">Professional Services</h1>
          <p className="text-xl text-gray-400 mb-2">One-Time Packages for Serious Cases</p>
          <p className="text-gray-500">Personalized support beyond our free platform tools</p>
        </div>

        {/* Important Disclaimer */}
        <Card className="mb-12 border-2 border-yellow-600">
          <div className="flex items-start gap-4">
            <span className="text-4xl">⚠️</span>
            <div>
              <h3 className="text-xl font-bold text-yellow-400 mb-2">Important Disclaimer</h3>
              <p className="text-gray-300 mb-3">
                Knight Financial is a <strong className="text-white">FinTech SaaS company</strong>, NOT a credit repair 
                organization (CRO) or law firm. These services provide educational resources, document preparation 
                assistance, and connections to legal professionals—NOT credit repair services as defined by CROA.
              </p>
              <p className="text-gray-400 text-sm">
                Results vary by individual case. We do not guarantee any specific outcome. For legal advice, 
                consult a licensed attorney.
              </p>
            </div>
          </div>
        </Card>

        {/* Service Packages */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {SERVICE_PACKAGES.map((pkg, index) => (
            <div key={index} className="relative">
              {pkg.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                  <span className="bg-blue-600 text-white font-bold px-6 py-2 rounded-full text-sm shadow-lg">
                    🔥 MOST POPULAR
                  </span>
                </div>
              )}
              {pkg.premium && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                  <span className="bg-gradient-to-r from-knight-gold to-yellow-500 text-black font-bold px-6 py-2 rounded-full text-sm shadow-lg">
                    ⭐ PREMIUM
                  </span>
                </div>
              )}
              
              <Card className={`h-full ${pkg.borderColor} border-2 ${pkg.premium ? 'prime-glow' : ''}`}>
                <div className="text-center mb-6">
                  <div className={`inline-block bg-gradient-to-r ${pkg.color} text-white px-4 py-1 rounded-full text-sm font-bold mb-4`}>
                    {pkg.tagline}
                  </div>
                  <h2 className="text-3xl font-bold text-white mb-2">{pkg.name}</h2>
                  <div className="flex items-center justify-center gap-1">
                    <span className="text-5xl font-bold text-gradient-gold">${pkg.price.toLocaleString()}</span>
                  </div>
                  <p className="text-gray-500 mt-2">One-time payment</p>
                </div>

                {/* Features */}
                <div className="mb-6">
                  <h4 className="text-sm font-bold text-knight-gold mb-3">WHAT'S INCLUDED:</h4>
                  <ul className="space-y-2">
                    {pkg.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <span className="text-green-400 mt-0.5">✓</span>
                        <span className="text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CAPS - Credit Ascension Protocols */}
                {pkg.caps && pkg.caps.length > 0 && (
                  <div className="mb-6 bg-gradient-to-r from-green-900/20 to-blue-900/20 rounded-lg p-4 border border-green-500/30">
                    <h4 className="text-sm font-bold text-green-400 mb-3 flex items-center gap-2">
                      <span>🚀</span> CAPS - Credit Ascension Protocols:
                    </h4>
                    <ul className="space-y-2">
                      {pkg.caps.map((cap, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm">
                          <span className="text-green-400">{cap}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Not Included */}
                {pkg.notIncluded.length > 0 && (
                  <div className="mb-6">
                    <h4 className="text-sm font-bold text-gray-500 mb-3">NOT INCLUDED:</h4>
                    <ul className="space-y-2">
                      {pkg.notIncluded.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm">
                          <span className="text-gray-600 mt-0.5">✗</span>
                          <span className="text-gray-500">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Best For */}
                <div className="bg-knight-hover p-3 rounded-lg mb-6">
                  <p className="text-xs text-gray-400">
                    <strong className="text-white">Best For:</strong> {pkg.bestFor}
                  </p>
                </div>

                {/* CTA */}
                <a 
                  href={pkg.jotformUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`block w-full text-center font-bold py-4 px-6 rounded-lg transition-all ${
                    pkg.premium 
                      ? 'bg-gradient-to-r from-knight-gold to-yellow-500 text-black hover:from-yellow-500 hover:to-knight-gold'
                      : pkg.popular
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-500 hover:to-purple-500'
                        : 'bg-green-600 text-white hover:bg-green-500'
                  }`}
                >
                  Get Started →
                </a>
              </Card>
            </div>
          ))}
        </div>

        {/* Process Section */}
        <Card className="mb-16">
          <h2 className="text-3xl font-bold text-knight-gold text-center mb-8">How It Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-knight-gold text-black text-2xl font-bold flex items-center justify-center mx-auto mb-4">
                1
              </div>
              <h3 className="font-bold text-white mb-2">Choose Package</h3>
              <p className="text-sm text-gray-400">Select the service level that matches your needs</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-knight-gold text-black text-2xl font-bold flex items-center justify-center mx-auto mb-4">
                2
              </div>
              <h3 className="font-bold text-white mb-2">Submit Information</h3>
              <p className="text-sm text-gray-400">Complete the secure intake form with your case details</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-knight-gold text-black text-2xl font-bold flex items-center justify-center mx-auto mb-4">
                3
              </div>
              <h3 className="font-bold text-white mb-2">Expert Analysis</h3>
              <p className="text-sm text-gray-400">Our team reviews your case and prepares deliverables</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-knight-gold text-black text-2xl font-bold flex items-center justify-center mx-auto mb-4">
                4
              </div>
              <h3 className="font-bold text-white mb-2">Receive Package</h3>
              <p className="text-sm text-gray-400">Get your custom documents and strategy within 5-7 days</p>
            </div>
          </div>
        </Card>

        {/* Free vs Paid */}
        <Card className="mb-16">
          <h2 className="text-3xl font-bold text-knight-gold text-center mb-8">Free Platform vs. Paid Services</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-knight-gold-dark">
                  <th className="text-left p-4 text-white">Feature</th>
                  <th className="text-center p-4 text-white">Free Platform</th>
                  <th className="text-center p-4 text-knight-gold">Paid Services</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-knight-gold-dark">
                <tr>
                  <td className="p-4 text-gray-300">Dispute Letter Templates</td>
                  <td className="p-4 text-center text-green-400">65 templates (self-service)</td>
                  <td className="p-4 text-center text-knight-gold">Custom-written for your case</td>
                </tr>
                <tr>
                  <td className="p-4 text-gray-300">Credit Analysis</td>
                  <td className="p-4 text-center text-green-400">Knight Scanner (automated)</td>
                  <td className="p-4 text-center text-knight-gold">Human expert review</td>
                </tr>
                <tr>
                  <td className="p-4 text-gray-300">Strategy</td>
                  <td className="p-4 text-center text-green-400">General guidance</td>
                  <td className="p-4 text-center text-knight-gold">Personalized case strategy</td>
                </tr>
                <tr>
                  <td className="p-4 text-gray-300">Support</td>
                  <td className="p-4 text-center text-green-400">Community + email</td>
                  <td className="p-4 text-center text-knight-gold">Direct phone + priority email</td>
                </tr>
                <tr>
                  <td className="p-4 text-gray-300">Lawyer Access</td>
                  <td className="p-4 text-center text-green-400">"I Want a Lawyer" button</td>
                  <td className="p-4 text-center text-knight-gold">Priority matching + introduction</td>
                </tr>
                <tr>
                  <td className="p-4 text-gray-300">Litigation Support</td>
                  <td className="p-4 text-center text-gray-500">❌</td>
                  <td className="p-4 text-center text-knight-gold">✓ Champion package</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>

        {/* FAQ */}
        <Card className="mb-16">
          <h2 className="text-3xl font-bold text-knight-gold text-center mb-8">Service FAQs</h2>
          
          <div className="space-y-4">
            <details className="bg-knight-hover p-4 rounded-lg">
              <summary className="cursor-pointer font-bold text-white">Is this credit repair?</summary>
              <p className="mt-3 text-gray-400">
                No. Knight Financial is a FinTech SaaS company, not a credit repair organization (CRO). 
                We provide educational resources, document preparation assistance, and connections to legal 
                professionals. We do not perform credit repair services as defined under CROA.
              </p>
            </details>
            
            <details className="bg-knight-hover p-4 rounded-lg">
              <summary className="cursor-pointer font-bold text-white">What's your refund policy?</summary>
              <p className="mt-3 text-gray-400">
                Due to the nature of our services (immediate work begins upon payment), refunds are provided 
                at Knight Financial's sole discretion. If we are unable to deliver the promised services, 
                a full or partial refund may be issued.
              </p>
            </details>
            
            <details className="bg-knight-hover p-4 rounded-lg">
              <summary className="cursor-pointer font-bold text-white">How long until I receive my deliverables?</summary>
              <p className="mt-3 text-gray-400">
                Starter and Warrior packages are typically delivered within 5-7 business days. Champion 
                packages require 10-14 business days due to the comprehensive nature of litigation preparation.
              </p>
            </details>
            
            <details className="bg-knight-hover p-4 rounded-lg">
              <summary className="cursor-pointer font-bold text-white">Can I upgrade packages?</summary>
              <p className="mt-3 text-gray-400">
                Yes. If you start with Starter and want to upgrade to Warrior, you pay the difference ($250). 
                Same applies to upgrading to Champion. Contact us to discuss upgrading.
              </p>
            </details>
            
            <details className="bg-knight-hover p-4 rounded-lg">
              <summary className="cursor-pointer font-bold text-white">What are CAPS (Credit Ascension Protocols)?</summary>
              <p className="mt-3 text-gray-400">
                CAPS are our proprietary credit-building strategies that work alongside dispute efforts. While 
                we fight inaccuracies, CAPS add positive data to your credit profile through authorized user 
                tradelines, credit builder accounts, strategic loan applications, and utilization optimization. 
                This dual approach (remove negatives + add positives) accelerates credit improvement.
              </p>
            </details>
          </div>
        </Card>

        {/* CAPS Explanation */}
        <Card className="mb-12 border-2 border-green-500/30 bg-gradient-to-r from-green-900/10 to-blue-900/10">
          <div className="text-center mb-6">
            <span className="text-5xl">🚀</span>
            <h2 className="text-3xl font-bold text-green-400 mt-4">Credit Ascension Protocols (CAPS)</h2>
            <p className="text-gray-400 mt-2">Positive data strategies to complement your dispute efforts</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <div className="text-center p-4 bg-knight-hover rounded-lg">
              <div className="text-3xl mb-2">👥</div>
              <h3 className="font-bold text-white mb-1">Authorized User</h3>
              <p className="text-sm text-gray-400">Strategic placement on established tradelines to boost history</p>
            </div>
            <div className="text-center p-4 bg-knight-hover rounded-lg">
              <div className="text-3xl mb-2">🏦</div>
              <h3 className="font-bold text-white mb-1">Credit Builders</h3>
              <p className="text-sm text-gray-400">Self-lender accounts, secured cards, and starter loans</p>
            </div>
            <div className="text-center p-4 bg-knight-hover rounded-lg">
              <div className="text-3xl mb-2">📊</div>
              <h3 className="font-bold text-white mb-1">Utilization</h3>
              <p className="text-sm text-gray-400">Optimize credit utilization ratios across all accounts</p>
            </div>
            <div className="text-center p-4 bg-knight-hover rounded-lg">
              <div className="text-3xl mb-2">📈</div>
              <h3 className="font-bold text-white mb-1">Score Tracking</h3>
              <p className="text-sm text-gray-400">Monitor progress and adjust strategy in real-time</p>
            </div>
          </div>
          
          <div className="text-center">
            <p className="text-knight-gold font-bold text-lg mb-2">The Knight Strategy: REMOVE + ADD</p>
            <p className="text-gray-400 text-sm">
              Other services only focus on disputes. We attack from both sides: removing inaccurate negatives 
              AND adding positive tradelines. This comprehensive approach delivers faster, more sustainable results.
            </p>
          </div>
        </Card>

        {/* Contact */}
        <Card premium className="text-center">
          <h2 className="text-3xl font-bold text-gradient-gold mb-4">Questions Before Purchasing?</h2>
          <p className="text-gray-300 mb-6">
            Talk to our CEO directly. We're here to help you choose the right service for your situation.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <div>
              <p className="text-gray-400 text-sm">Call or Text CEO</p>
              <a href="tel:3349389171" className="text-2xl text-knight-gold hover:underline font-bold">334-938-9171</a>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Email</p>
              <a href="mailto:raheem@knightfin.org" className="text-2xl text-knight-gold hover:underline font-bold">raheem@knightfin.org</a>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
