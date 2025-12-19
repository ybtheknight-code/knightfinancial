import Card from '@/components/Card';
import Button from '@/components/Button';
import Link from 'next/link';

const RESOURCES = {
  credit: [
    { title: 'Sample Credit Report (TransUnion)', type: 'pdf', description: 'Annotated example report', free: true },
    { title: 'Sample Credit Report (Equifax)', type: 'pdf', description: 'Annotated example report', free: true },
    { title: 'Credit Score Calculation Formula', type: 'pdf', description: 'How scores are computed', free: true },
    { title: 'Bureau Contact Information', type: 'pdf', description: 'Addresses for all 3 bureaus', free: true },
  ],
  legal: [
    { title: 'FCRA Full Text (15 U.S.C. § 1681)', type: 'pdf', description: 'Complete Fair Credit Reporting Act', free: true },
    { title: 'FTC Regulations', type: 'pdf', description: 'Official FTC guidelines', free: true },
    { title: 'Metro 2 CRRG 2023', type: 'pdf', description: 'Complete Metro 2 Bible', free: true },
    { title: 'CARES Act Student Loan Provisions', type: 'pdf', description: 'Payment pause documentation', free: true },
    { title: 'Miller v. TransUnion Case (33 pages)', type: 'pdf', description: 'Plaintiffs objections brief', free: true },
    { title: 'Chaitoff v. Experian Opinion (30 pages)', type: 'pdf', description: '7th Circuit omission case', free: true },
    { title: 'Pro Se Filing Guide', type: 'pdf', description: 'How to file without lawyer', free: false },
  ],
  templates: [
    { title: '100+ Dispute Letter Templates', type: 'docx', description: 'Every template in Word format', free: true },
    { title: 'CFPB Complaint Template', type: 'docx', description: 'File formal complaints', free: true },
    { title: 'Goodwill Letter Templates', type: 'docx', description: 'Request deletions nicely', free: true },
    { title: 'Validation Request Templates', type: 'docx', description: 'Demand proof of debt', free: true },
    { title: 'Court Filing Templates', type: 'docx', description: 'Pro se legal documents', free: false },
  ],
  financial: [
    { title: 'Budget Template (Excel)', type: 'xlsx', description: 'Track income & expenses', free: true },
    { title: 'Debt Payoff Calculator', type: 'xlsx', description: 'Plan your debt elimination', free: true },
    { title: 'Net Worth Worksheet', type: 'xlsx', description: 'Calculate your net worth', free: true },
  ],
  business: [
    { title: 'Business Credit Guide', type: 'pdf', description: 'Build business credit', free: true },
    { title: 'EIN Application Guide', type: 'pdf', description: 'Get your tax ID', free: true },
    { title: 'LLC Formation Checklist', type: 'pdf', description: 'Start your business', free: true },
  ],
};

export default function ResourcesPage() {
  return (
    <div className="min-h-screen bg-knight-black py-8">
      <div className="container-knight">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gradient-gold mb-2">📚 Resources Library</h1>
          <p className="text-gray-400">Free credit, legal, and financial resources</p>
          <div className="mt-4 flex gap-2 flex-wrap">
            <div className="badge-gold">Legal Documents</div>
            <div className="badge-gold">Templates</div>
            <div className="badge-gold">Guides</div>
            <div className="badge-gold">Calculators</div>
          </div>
        </div>
        
        {/* Credit Resources */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-knight-gold mb-6">📊 Credit Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {RESOURCES.credit.map((resource, i) => (
              <Card key={i} hover>
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">📄</span>
                    {resource.free && <span className="badge-gold text-xs">FREE</span>}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{resource.title}</h3>
                  <p className="text-sm text-gray-400">{resource.description}</p>
                  <p className="text-xs text-gray-500 mt-2">{resource.type.toUpperCase()}</p>
                </div>
                <Button variant="gold-outline" fullWidth>
                  📥 Download
                </Button>
              </Card>
            ))}
          </div>
        </div>
        
        {/* Legal Resources */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-knight-gold mb-6">⚖️ Legal Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {RESOURCES.legal.map((resource, i) => (
              <Card key={i} hover className={!resource.free ? 'opacity-75' : ''}>
                {!resource.free && (
                  <div className="absolute top-4 right-4 z-10">
                    <span className="bg-knight-gold text-black text-xs font-bold px-2 py-1 rounded">
                      ⭐ PRIME
                    </span>
                  </div>
                )}
                
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">📑</span>
                    {resource.free && <span className="badge-gold text-xs">FREE</span>}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{resource.title}</h3>
                  <p className="text-sm text-gray-400">{resource.description}</p>
                  <p className="text-xs text-gray-500 mt-2">{resource.type.toUpperCase()}</p>
                </div>
                
                {resource.free ? (
                  <Button variant="gold-outline" fullWidth>
                    📥 Download
                  </Button>
                ) : (
                  <Button href="/pricing" fullWidth>
                    🔒 Unlock with Prime
                  </Button>
                )}
              </Card>
            ))}
          </div>
        </div>
        
        {/* Templates */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-knight-gold mb-6">📄 Letter Templates</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {RESOURCES.templates.map((resource, i) => (
              <Card key={i} hover className={!resource.free ? 'opacity-75' : ''}>
                {!resource.free && (
                  <div className="absolute top-4 right-4 z-10">
                    <span className="bg-knight-gold text-black text-xs font-bold px-2 py-1 rounded">
                      ⭐ PRIME
                    </span>
                  </div>
                )}
                
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">✉️</span>
                    {resource.free && <span className="badge-gold text-xs">FREE</span>}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{resource.title}</h3>
                  <p className="text-sm text-gray-400">{resource.description}</p>
                  <p className="text-xs text-gray-500 mt-2">{resource.type.toUpperCase()}</p>
                </div>
                
                {resource.free ? (
                  <Button variant="gold-outline" fullWidth>
                    📥 Download
                  </Button>
                ) : (
                  <Button href="/pricing" fullWidth>
                    🔒 Unlock with Prime
                  </Button>
                )}
              </Card>
            ))}
          </div>
        </div>
        
        {/* Financial Tools */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-knight-gold mb-6">💰 Financial Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {RESOURCES.financial.map((resource, i) => (
              <Card key={i} hover>
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">📊</span>
                    <span className="badge-gold text-xs">FREE</span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{resource.title}</h3>
                  <p className="text-sm text-gray-400">{resource.description}</p>
                  <p className="text-xs text-gray-500 mt-2">{resource.type.toUpperCase()}</p>
                </div>
                <Button variant="gold-outline" fullWidth>
                  📥 Download
                </Button>
              </Card>
            ))}
          </div>
        </div>
        
        {/* Business Resources */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-knight-gold mb-6">🏢 Business Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {RESOURCES.business.map((resource, i) => (
              <Card key={i} hover>
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">💼</span>
                    <span className="badge-gold text-xs">FREE</span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{resource.title}</h3>
                  <p className="text-sm text-gray-400">{resource.description}</p>
                  <p className="text-xs text-gray-500 mt-2">{resource.type.toUpperCase()}</p>
                </div>
                <Button variant="gold-outline" fullWidth>
                  📥 Download
                </Button>
              </Card>
            ))}
          </div>
        </div>
        
        {/* CTA */}
        <Card premium className="text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Want More Resources?</h2>
          <p className="text-gray-300 mb-6">
            Prime members get access to premium legal templates, advanced guides, and exclusive resources.
          </p>
          <Button href="/pricing" size="lg">
            Upgrade to Prime - $19.99/mo
          </Button>
        </Card>
      </div>
    </div>
  );
}
