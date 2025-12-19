import Link from 'next/link';
import Button from '@/components/Button';
import Card from '@/components/Card';

export default function HomePage() {
  return (
    <div className="bg-knight-black">
      {/* Hero Section */}
      <section className="py-20 md:py-32">
        <div className="container-knight">
          <div className="text-center animate-fade-in">
            <div className="text-6xl md:text-8xl mb-6 animate-glow">⚔️</div>
            <h1 className="text-4xl md:text-6xl font-bold text-gradient-gold mb-4">
              KNIGHT FINANCIAL
            </h1>
            <p className="text-xl md:text-2xl text-white mb-4">
              The World's First <span className="text-knight-gold font-bold">FOR THE PEOPLE</span> Credit Platform
            </p>
            <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
              Ethical FinTech SaaS • Data Analytics • Social Platform • Future Credit Bureau
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button href="/register" size="lg">
                Sign Up FREE - Get Started 🚀
              </Button>
              <Button href="/about" variant="gold-outline" size="lg">
                Learn More
              </Button>
            </div>
            <p className="text-sm text-gray-500 mt-4">
              100+ Free Courses • Unlimited Tools • No Credit Card Required
            </p>
          </div>
        </div>
      </section>
      
      {/* Nuclear Value Prop */}
      <section className="py-16 bg-knight-card">
        <div className="container-knight">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gradient-gold mb-4">
              INSANE VALUE - 100% FREE
            </h2>
            <p className="text-gray-400 text-lg">
              Everything you need to fight credit bureaus. Zero cost. Zero limits.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <div className="text-4xl mb-4">📚</div>
              <h3 className="text-2xl font-bold text-knight-gold mb-2">100+ FREE Courses</h3>
              <p className="text-gray-400">
                Complete education on FCRA, credit law, pro se litigation, Metro 2, and more. Worth $10,000+.
              </p>
            </Card>
            
            <Card>
              <div className="text-4xl mb-4">⚔️</div>
              <h3 className="text-2xl font-bold text-knight-gold mb-2">6 Knight Tools</h3>
              <p className="text-gray-400">
                Scanner, Dispute Generator, Tracker, Decoder, Vault, Community - ALL unlimited forever.
              </p>
            </Card>
            
            <Card>
              <div className="text-4xl mb-4">📄</div>
              <h3 className="text-2xl font-bold text-knight-gold mb-2">100+ Templates</h3>
              <p className="text-gray-400">
                Dispute letters, FCRA violations, CFPB complaints, court filings. Ready to use.
              </p>
            </Card>
          </div>
        </div>
      </section>
      
      {/* Knight Tools */}
      <section className="py-16">
        <div className="container-knight">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gradient-gold mb-4">
              THE 6 KNIGHT TOOLS
            </h2>
            <p className="text-gray-400 text-lg">
              Professional-grade software. Free forever.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card hover>
              <div className="text-3xl mb-3">🔍</div>
              <h3 className="text-xl font-bold text-knight-gold mb-2">Knight Scanner</h3>
              <p className="text-gray-400 text-sm">
                Analyze credit reports. Find violations. Get your health score.
              </p>
            </Card>
            
            <Card hover>
              <div className="text-3xl mb-3">✍️</div>
              <h3 className="text-xl font-bold text-knight-gold mb-2">Knight Dispute</h3>
              <p className="text-gray-400 text-sm">
                Generate professional dispute letters in seconds. 100+ templates.
              </p>
            </Card>
            
            <Card hover>
              <div className="text-3xl mb-3">📅</div>
              <h3 className="text-xl font-bold text-knight-gold mb-2">Knight Tracker</h3>
              <p className="text-gray-400 text-sm">
                Track disputes. Never miss a 30-day deadline. Automated reminders.
              </p>
            </Card>
            
            <Card hover>
              <div className="text-3xl mb-3">🔓</div>
              <h3 className="text-xl font-bold text-knight-gold mb-2">Knight Decoder</h3>
              <p className="text-gray-400 text-sm">
                Translate bureau responses. Understand their tactics. Know next steps.
              </p>
            </Card>
            
            <Card hover>
              <div className="text-3xl mb-3">🗄️</div>
              <h3 className="text-xl font-bold text-knight-gold mb-2">Knight Vault</h3>
              <p className="text-gray-400 text-sm">
                Secure storage for credit reports, documents, IDs. 100MB free.
              </p>
            </Card>
            
            <Card hover>
              <div className="text-3xl mb-3">👥</div>
              <h3 className="text-xl font-bold text-knight-gold mb-2">Knight Community</h3>
              <p className="text-gray-400 text-sm">
                Connect with others. Share victories. Get support. Learn together.
              </p>
            </Card>
          </div>
        </div>
      </section>
      
      {/* Why Different */}
      <section className="py-16 bg-knight-card">
        <div className="container-knight">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gradient-gold mb-4">
              WHY WE'RE DIFFERENT
            </h2>
            <p className="text-gray-400 text-lg">
              We're not hiding anything. We're brutally honest.
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto space-y-6">
            <Card>
              <h3 className="text-xl font-bold text-knight-gold mb-2">🎯 We're Not a Credit Repair Company</h3>
              <p className="text-gray-400">
                We're a <strong className="text-white">FinTech SaaS Platform</strong>. We provide tools. YOU do the work. We just make it 1000x easier.
              </p>
            </Card>
            
            <Card>
              <h3 className="text-xl font-bold text-knight-gold mb-2">💎 We're Building a Data Company</h3>
              <p className="text-gray-400">
                We collect data on credit bureau violations. We sell it to law firms. We use it to sue TransUnion, Equifax, Experian. <strong className="text-white">You benefit from this.</strong>
              </p>
            </Card>
            
            <Card>
              <h3 className="text-xl font-bold text-knight-gold mb-2">🏛️ We're Building the Future CRA</h3>
              <p className="text-gray-400">
                One day, Knight Financial will become a Credit Reporting Agency that actually <strong className="text-white">FIGHTS FOR YOU</strong>, not against you. We'll offer cards and loans because <strong className="text-white">WE ACTUALLY CARE</strong>.
              </p>
            </Card>
            
            <Card>
              <h3 className="text-xl font-bold text-knight-gold mb-2">📞 Text the CEO Directly</h3>
              <p className="text-gray-400">
                <a href="sms:3349389171" className="link-knight">334-938-9171</a> - That's Raheem Sanders' cell. The only major US company where you can text the CEO directly. Try it.
              </p>
            </Card>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20">
        <div className="container-knight">
          <Card premium className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Join 10,000+ People Fighting Back
            </h2>
            <p className="text-gray-300 text-lg mb-8">
              100% free. No credit card. No limits. Start fighting credit bureaus today.
            </p>
            <Button href="/register" size="lg">
              Create Free Account - Get Started 🚀
            </Button>
            <p className="text-sm text-gray-400 mt-4">
              Join the revolution. Be part of history.
            </p>
          </Card>
        </div>
      </section>
    </div>
  );
}
