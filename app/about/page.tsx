import Card from '@/components/Card';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-knight-black py-12">
      <div className="container-knight max-w-5xl">
        {/* Hero */}
        <div className="text-center mb-16">
          <div className="text-7xl mb-6">⚔️</div>
          <h1 className="text-5xl font-bold text-gradient-gold mb-4">About Knight Financial</h1>
          <p className="text-2xl text-gray-300">The World's First Ethical Credit Reporting Agency FOR THE PEOPLE</p>
          <p className="text-lg text-gray-500 mt-2">Black-Owned • Tuskegee, Alabama • Est. 2024</p>
        </div>

        {/* Mission Statement */}
        <Card premium className="mb-16">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gradient-gold mb-6">Our Mission</h2>
            <p className="text-xl text-gray-200 leading-relaxed max-w-3xl mx-auto">
              Knight Financial exists to disrupt the predatory credit reporting industry by building the world's first 
              <strong className="text-knight-gold"> ethical Credit Reporting Agency (CRA) FOR THE PEOPLE</strong>. 
              We are not here to repair credit—we are here to <strong className="text-knight-gold">fight back</strong> against 
              a system designed to profit from consumer suffering.
            </p>
            <p className="text-lg text-gray-400 mt-6">
              Through our revolutionary Data Partnership model, we transform consumer data into weapons for justice, 
              powering litigation against TransUnion, Equifax, Experian, and other entities that have profited from 
              reporting inaccuracies and FCRA violations for decades.
            </p>
          </div>
        </Card>

        {/* What We Are / What We're Not */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <Card>
            <h3 className="text-2xl font-bold text-green-400 mb-6">✅ What We ARE</h3>
            <ul className="space-y-4 text-gray-300">
              <li className="flex items-start gap-3">
                <span className="text-green-400 text-xl">•</span>
                <span><strong>FinTech SaaS Company</strong> — We provide software tools and technology platforms</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-400 text-xl">•</span>
                <span><strong>Financial Services Platform</strong> — We offer educational resources and data analytics</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-400 text-xl">•</span>
                <span><strong>Data Company</strong> — We aggregate and analyze credit reporting patterns</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-400 text-xl">•</span>
                <span><strong>Consumer Advocacy Platform</strong> — We empower consumers with knowledge and tools</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-400 text-xl">•</span>
                <span><strong>Community</strong> — We connect warriors fighting for their credit rights</span>
              </li>
            </ul>
          </Card>

          <Card>
            <h3 className="text-2xl font-bold text-red-400 mb-6">❌ What We Are NOT</h3>
            <ul className="space-y-4 text-gray-300">
              <li className="flex items-start gap-3">
                <span className="text-red-400 text-xl">•</span>
                <span><strong>NOT a Credit Repair Organization</strong> — We do not operate under CROA regulations</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-400 text-xl">•</span>
                <span><strong>NOT a Law Firm</strong> — We do not provide legal advice or representation</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-400 text-xl">•</span>
                <span><strong>NOT Credit Counselors</strong> — We do not provide personalized financial advice</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-400 text-xl">•</span>
                <span><strong>NOT Debt Settlement</strong> — We do not negotiate with creditors on your behalf</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-400 text-xl">•</span>
                <span><strong>NOT Bound by CROA</strong> — We are a FinTech platform, not a CRO</span>
              </li>
            </ul>
          </Card>
        </div>

        {/* Leadership Section */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-gradient-gold text-center mb-4">Our Leadership</h2>
          <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
            Knight Financial is led by a core team of visionaries committed to transforming the credit reporting industry 
            and fighting for consumer justice.
          </p>

          {/* Di'Ondre Mathis Sr. - President & Founder */}
          <Card premium className="mb-8">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="w-40 h-40 rounded-full bg-gradient-to-br from-knight-gold to-yellow-600 flex items-center justify-center text-6xl text-black font-bold flex-shrink-0">
                DM
              </div>
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-3xl font-bold text-white">Di'Ondre Mathis Sr.</h3>
                  <span className="bg-knight-gold text-black px-3 py-1 rounded-full text-sm font-bold">FOUNDER</span>
                </div>
                <p className="text-xl text-knight-gold mb-4">President & Founder</p>
                <p className="text-gray-300 leading-relaxed">
                  Di'Ondre Mathis Sr. is the visionary architect behind Knight Financial. Through his wisdom, leadership, 
                  and unwavering commitment to justice, he laid the foundation upon which everything Knight Financial 
                  does is built. His strategic vision for creating an ethical credit reporting ecosystem has guided 
                  every decision, every product, and every partnership. Under his presidency, Knight Financial has 
                  grown from a concept into a revolutionary platform challenging the very foundations of the credit 
                  reporting industry.
                </p>
                <p className="text-gray-400 mt-4 italic">
                  "Every move we make at Knight Financial exists because of his guidance. His vision is our roadmap." 
                  — Raheem Sanders, CEO
                </p>
              </div>
            </div>
          </Card>

          {/* Raheem Sanders - CEO & Co-Founder */}
          <Card className="mb-8 border-2 border-knight-gold">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="w-40 h-40 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-6xl text-white font-bold flex-shrink-0">
                RS
              </div>
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-3xl font-bold text-white">Raheem Sanders</h3>
                  <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-bold">CEO</span>
                </div>
                <p className="text-xl text-blue-400 mb-4">Chief Executive Officer & Co-Founder</p>
                <p className="text-gray-300 leading-relaxed">
                  Raheem Sanders serves as CEO and Co-Founder of Knight Financial, translating Di'Ondre Mathis Sr.'s 
                  vision into operational reality. With deep expertise in FCRA litigation strategy, Metro 2 compliance 
                  standards, and consumer advocacy, Raheem leads day-to-day operations and product development. He is 
                  personally accessible to every Knight Financial user—a rarity in corporate America.
                </p>
                <div className="mt-4 bg-knight-hover p-4 rounded-lg">
                  <p className="text-knight-gold font-bold mb-2">📞 Reach the CEO Directly</p>
                  <p className="text-white text-lg">334-938-9171 (Call or Text)</p>
                  <p className="text-gray-400">raheem@knightfin.org</p>
                  <p className="text-gray-500 text-sm mt-2">
                    We are the ONLY corporation in the FinTech space where you can reach the CEO directly by phone.
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* Di'Ondre Mathis Jr. - Director of Media */}
          <Card className="mb-8">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="w-40 h-40 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-6xl text-white font-bold flex-shrink-0">
                DJ
              </div>
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-3xl font-bold text-white">Di'Ondre Mathis Jr.</h3>
                  <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-bold">CREATIVE</span>
                </div>
                <p className="text-xl text-purple-400 mb-4">Director of Media</p>
                <p className="text-gray-300 leading-relaxed">
                  Di'Ondre Mathis Jr. is the artistic genius behind Knight Financial's visual identity. As Director of 
                  Media, he serves as the architect of all animations, visual experiences, and brand aesthetics that 
                  define the Knight Financial platform. His creative vision transforms complex financial concepts into 
                  engaging, accessible experiences. Every visual element you encounter—from the golden knight branding 
                  to the intuitive interface design—is a product of his artistic excellence.
                </p>
                <p className="text-gray-400 mt-4">
                  He turns what we do into what you see. The Knight Financial experience is his canvas.
                </p>
              </div>
            </div>
          </Card>

          {/* The Knight Financial Team */}
          <Card>
            <div className="text-center">
              <div className="text-5xl mb-4">⚔️</div>
              <h3 className="text-2xl font-bold text-knight-gold mb-4">The Knight Financial Team</h3>
              <p className="text-gray-300 max-w-2xl mx-auto">
                Behind our core leadership stands the dedicated Knight Financial team—developers, researchers, 
                community managers, and support specialists working together to deliver on our mission. We are a 
                Black-owned company headquartered in Tuskegee, Alabama, proud of our roots and committed to serving 
                communities that have been historically underserved by the financial industry.
              </p>
            </div>
          </Card>
        </div>

        {/* Headquarters */}
        <Card className="mb-16">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-knight-gold mb-4">🏢 Corporate Headquarters</h2>
            <p className="text-xl text-white">Knight Financial, LLC</p>
            <p className="text-lg text-gray-300">404 Brown Street</p>
            <p className="text-lg text-gray-300">Tuskegee, Alabama 36083</p>
            <p className="text-gray-500 mt-4">United States of America</p>
          </div>
        </Card>

        {/* Contact CTA */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Join the Fight?</h2>
          <p className="text-gray-400 mb-8">Become a Knight Financial warrior today.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register" className="btn-knight text-center">
              Join Free →
            </Link>
            <Link href="/contact" className="btn-gold-outline text-center">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
