import Card from '@/components/Card';
import Link from 'next/link';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-knight-black py-12">
      <div className="container-knight max-w-5xl">
        {/* Hero */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gradient-gold mb-4">Contact Us</h1>
          <p className="text-xl text-gray-400">We're the ONLY company where you can reach the CEO directly.</p>
        </div>

        {/* CEO Direct Access - Featured */}
        <Card premium className="mb-12">
          <div className="text-center">
            <div className="text-6xl mb-4">📞</div>
            <h2 className="text-3xl font-bold text-gradient-gold mb-2">Reach the CEO Directly</h2>
            <p className="text-gray-300 mb-6">
              Unlike any other corporation in the FinTech, SaaS, or financial services industry, 
              Knight Financial's CEO is personally accessible to every user.
            </p>
            
            <div className="bg-knight-black rounded-xl p-8 inline-block">
              <p className="text-gray-400 mb-2">Raheem Sanders, CEO & Co-Founder</p>
              <a href="tel:3349389171" className="text-4xl font-bold text-knight-gold hover:underline block mb-2">
                334-938-9171
              </a>
              <p className="text-gray-500">Call or Text Anytime</p>
              <a href="mailto:raheem@knightfin.org" className="text-knight-gold hover:underline block mt-4">
                raheem@knightfin.org
              </a>
            </div>
            
            <p className="text-gray-500 text-sm mt-6">
              This is real. This is unprecedented. This is Knight Financial.
            </p>
          </div>
        </Card>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* General Support */}
          <Card>
            <div className="text-center">
              <div className="text-4xl mb-4">🆘</div>
              <h3 className="text-2xl font-bold text-white mb-2">General Support</h3>
              <p className="text-gray-400 mb-6">Platform questions, technical issues, account help</p>
              
              <a href="tel:8555168003" className="text-2xl font-bold text-knight-gold hover:underline block mb-2">
                855-516-8003
              </a>
              <a href="mailto:support@knightfin.org" className="text-knight-gold hover:underline block">
                support@knightfin.org
              </a>
              
              <div className="mt-6 text-sm text-gray-500">
                <p>Response Time: 24-72 hours</p>
                <p>Prime Members: 24 hours</p>
              </div>
            </div>
          </Card>

          {/* Corporate Headquarters */}
          <Card>
            <div className="text-center">
              <div className="text-4xl mb-4">🏢</div>
              <h3 className="text-2xl font-bold text-white mb-2">Corporate Headquarters</h3>
              <p className="text-gray-400 mb-6">Official mailing address for correspondence</p>
              
              <div className="text-lg text-gray-200">
                <p className="font-bold">Knight Financial, LLC</p>
                <p>404 Brown Street</p>
                <p>Tuskegee, Alabama 36083</p>
                <p className="text-gray-500 mt-2">United States</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Department Contacts */}
        <Card className="mb-12">
          <h2 className="text-2xl font-bold text-knight-gold mb-6 text-center">Contact by Department</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-knight-hover p-4 rounded-lg">
              <h4 className="font-bold text-white mb-2">⚖️ Legal / Lawyer Referrals</h4>
              <p className="text-sm text-gray-400 mb-2">FCRA attorney connections, litigation questions</p>
              <p className="text-knight-gold">support@knightfin.org</p>
              <p className="text-xs text-gray-500 mt-1">Subject: "Lawyer Request"</p>
            </div>
            
            <div className="bg-knight-hover p-4 rounded-lg">
              <h4 className="font-bold text-white mb-2">💎 Knight Intel (B2B)</h4>
              <p className="text-sm text-gray-400 mb-2">Data partnerships, enterprise access</p>
              <p className="text-knight-gold">raheem@knightfin.org</p>
              <p className="text-xs text-gray-500 mt-1">CEO Approval Required</p>
            </div>
            
            <div className="bg-knight-hover p-4 rounded-lg">
              <h4 className="font-bold text-white mb-2">🎨 Media / Press</h4>
              <p className="text-sm text-gray-400 mb-2">Press inquiries, interviews, features</p>
              <p className="text-knight-gold">support@knightfin.org</p>
              <p className="text-xs text-gray-500 mt-1">Subject: "Media Inquiry"</p>
            </div>
            
            <div className="bg-knight-hover p-4 rounded-lg">
              <h4 className="font-bold text-white mb-2">🤝 Partnerships</h4>
              <p className="text-sm text-gray-400 mb-2">Law firm partnerships, integrations</p>
              <p className="text-knight-gold">raheem@knightfin.org</p>
              <p className="text-xs text-gray-500 mt-1">Subject: "Partnership"</p>
            </div>
            
            <div className="bg-knight-hover p-4 rounded-lg">
              <h4 className="font-bold text-white mb-2">🐛 Bug Reports</h4>
              <p className="text-sm text-gray-400 mb-2">Technical issues, platform bugs</p>
              <p className="text-knight-gold">support@knightfin.org</p>
              <p className="text-xs text-gray-500 mt-1">Subject: "Bug Report"</p>
            </div>
            
            <div className="bg-knight-hover p-4 rounded-lg">
              <h4 className="font-bold text-white mb-2">💡 Feedback</h4>
              <p className="text-sm text-gray-400 mb-2">Suggestions, feature requests</p>
              <p className="text-knight-gold">support@knightfin.org</p>
              <p className="text-xs text-gray-500 mt-1">Subject: "Feedback"</p>
            </div>
          </div>
        </Card>

        {/* For Logged In Users */}
        <Card className="mb-12 border-2 border-blue-500">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-blue-400 mb-4">💬 Already a Member?</h3>
            <p className="text-gray-300 mb-6">
              Use our internal messaging system for faster response times and tracked conversations.
            </p>
            <Link href="/messages" className="btn-knight inline-block">
              Go to Messages →
            </Link>
          </div>
        </Card>

        {/* Important Notice */}
        <Card>
          <h3 className="text-xl font-bold text-knight-gold mb-4">⚠️ Important Notice</h3>
          <div className="text-sm text-gray-400 space-y-3">
            <p>
              <strong className="text-white">Knight Financial, LLC</strong> is a FinTech SaaS company providing 
              software tools, educational resources, and data analytics services. We are NOT a credit repair 
              organization, law firm, or credit counseling agency.
            </p>
            <p>
              We do not provide legal advice. Any information on our platform is for educational purposes only. 
              For legal matters, we recommend consulting with a qualified attorney.
            </p>
            <p>
              By contacting Knight Financial, you acknowledge our <Link href="/terms" className="text-knight-gold hover:underline">Terms of Service</Link> and 
              <Link href="/privacy" className="text-knight-gold hover:underline"> Privacy Policy</Link>, including our Data Partnership Agreement 
              and binding arbitration clause.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
