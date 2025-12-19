import Card from '@/components/Card';
import Button from '@/components/Button';
import Link from 'next/link';

export default function ToolsPage() {
  const tools = [
    {
      href: '/tools/scanner',
      icon: '🔍',
      name: 'Knight Scanner',
      description: 'Upload and analyze your credit reports for FCRA violations, errors, and potential legal issues.',
      features: ['Violation detection', 'Score impact analysis', 'Legal recommendations'],
    },
    {
      href: '/tools/dispute',
      icon: '✍️',
      name: 'Knight Dispute',
      description: 'Generate professional, legally compliant dispute letters for all three bureaus.',
      features: ['100+ templates', 'FCRA compliant', 'Court-ready letters'],
    },
    {
      href: '/tools/tracker',
      icon: '📅',
      name: 'Knight Tracker',
      description: 'Track your disputes, deadlines, and bureau responses all in one place.',
      features: ['Deadline alerts', 'Status tracking', '30-day countdown'],
    },
    {
      href: '/tools/decoder',
      icon: '🔓',
      name: 'Knight Decoder',
      description: 'Translate confusing bureau responses into plain English with next-step recommendations.',
      features: ['Translation engine', 'Response analysis', 'Next steps'],
    },
    {
      href: '/tools/vault',
      icon: '🗄️',
      name: 'Knight Vault',
      description: 'Securely store all your credit-related documents in one encrypted location.',
      features: ['100MB free storage', 'Encrypted files', 'Easy organization'],
    },
  ];
  
  return (
    <div className="min-h-screen bg-knight-black py-8">
      <div className="container-knight">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gradient-gold mb-2">🛡️ Knight Tools</h1>
          <p className="text-gray-400">Your arsenal for fighting credit bureau injustice</p>
          <div className="mt-4 flex gap-2 flex-wrap">
            <div className="badge-gold">100% Free to Start</div>
            <div className="badge-gold">No Credit Card Required</div>
            <div className="badge-gold">Unlimited for Prime</div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool) => (
            <Card key={tool.href} hover>
              <div className="text-5xl mb-4">{tool.icon}</div>
              <h2 className="text-2xl font-bold text-white mb-2">{tool.name}</h2>
              <p className="text-gray-400 mb-4">{tool.description}</p>
              
              <ul className="space-y-2 mb-6">
                {tool.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm">
                    <span className="text-knight-gold">✓</span>
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Button href={tool.href} fullWidth>
                Use {tool.name.split(' ')[1]} →
              </Button>
            </Card>
          ))}
        </div>
        
        {/* How It Works */}
        <Card className="mt-12">
          <h2 className="text-2xl font-bold text-knight-gold mb-6 text-center">How Knight Tools Work Together</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 text-center">
            <div>
              <div className="text-4xl mb-2">1️⃣</div>
              <div className="text-knight-gold font-bold mb-1">Scan</div>
              <p className="text-xs text-gray-400">Upload report to Scanner</p>
            </div>
            <div className="hidden md:block text-4xl text-knight-gold-dark">→</div>
            <div>
              <div className="text-4xl mb-2">2️⃣</div>
              <div className="text-knight-gold font-bold mb-1">Dispute</div>
              <p className="text-xs text-gray-400">Generate dispute letters</p>
            </div>
            <div className="hidden md:block text-4xl text-knight-gold-dark">→</div>
            <div>
              <div className="text-4xl mb-2">3️⃣</div>
              <div className="text-knight-gold font-bold mb-1">Track</div>
              <p className="text-xs text-gray-400">Monitor deadlines</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 text-center mt-6">
            <div>
              <div className="text-4xl mb-2">4️⃣</div>
              <div className="text-knight-gold font-bold mb-1">Decode</div>
              <p className="text-xs text-gray-400">Understand responses</p>
            </div>
            <div className="hidden md:block text-4xl text-knight-gold-dark">→</div>
            <div>
              <div className="text-4xl mb-2">5️⃣</div>
              <div className="text-knight-gold font-bold mb-1">Store</div>
              <p className="text-xs text-gray-400">Save everything in Vault</p>
            </div>
            <div className="hidden md:block text-4xl text-knight-gold-dark">→</div>
            <div>
              <div className="text-4xl mb-2">🏆</div>
              <div className="text-knight-gold font-bold mb-1">Victory!</div>
              <p className="text-xs text-gray-400">Items deleted, score improved</p>
            </div>
          </div>
        </Card>
        
        {/* CTA */}
        <Card premium className="mt-8 text-center">
          <div className="text-5xl mb-4">⭐</div>
          <h2 className="text-2xl font-bold text-gradient-gold mb-2">Upgrade to Prime</h2>
          <p className="text-gray-300 mb-6">
            Get unlimited access to all tools, priority support, and exclusive features.
          </p>
          <Button href="/pricing" size="lg">
            See Prime Benefits →
          </Button>
        </Card>
      </div>
    </div>
  );
}
