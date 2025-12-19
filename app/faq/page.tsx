import Card from '@/components/Card';
import Link from 'next/link';

const FAQ_SECTIONS = [
  {
    title: '🏢 About Knight Financial',
    questions: [
      {
        q: 'What is Knight Financial?',
        a: `Knight Financial is a Black-owned FinTech SaaS company headquartered in Tuskegee, Alabama. We provide software tools, educational resources, and a community platform to help consumers understand and fight for their credit rights. Our mission is to become the world's first ethical Credit Reporting Agency (CRA) FOR THE PEOPLE.`,
      },
      {
        q: 'Is Knight Financial a credit repair company?',
        a: `NO. Knight Financial is NOT a Credit Repair Organization (CRO) as defined by the Credit Repair Organizations Act (CROA). We are a FinTech SaaS company that provides educational tools and resources. We do not repair credit—we empower you with knowledge and tools to advocate for yourself.`,
      },
      {
        q: 'Is Knight Financial a law firm?',
        a: `NO. Knight Financial is NOT a law firm and does not provide legal advice or legal representation. All information on our platform is for educational purposes only. We may connect you with attorneys in our network, but we do not provide legal services ourselves.`,
      },
      {
        q: 'Who founded Knight Financial?',
        a: `Knight Financial was founded by Di'Ondre Mathis Sr. (President & Founder), whose vision and leadership guide everything we do. Raheem Sanders serves as CEO & Co-Founder, and Di'Ondre Mathis Jr. serves as Director of Media. Together, this core team is building the future of ethical credit reporting.`,
      },
      {
        q: 'Where is Knight Financial located?',
        a: `Our corporate headquarters is located at 404 Brown Street, Tuskegee, Alabama 36083. We are proud to be a Black-owned company rooted in a historic community.`,
      },
      {
        q: 'Can I really reach the CEO directly?',
        a: `YES. Unlike any other FinTech company, Knight Financial's CEO Raheem Sanders is personally accessible. Call or text 334-938-9171 or email raheem@knightfin.org. This is real, unprecedented, and part of our commitment to transparency.`,
      },
    ],
  },
  {
    title: '💰 Data Partnership & Free Services',
    questions: [
      {
        q: 'How is Knight Financial free?',
        a: `We operate under a unique Data Partnership model. You provide data through our platform (credit reports, disputes, forms, etc.), and in exchange, we provide free access to our tools. Your anonymized, aggregated data powers research, litigation, and industry reports that generate revenue—NOT from selling your personal information to marketers.`,
      },
      {
        q: 'Do you sell my personal information?',
        a: `We NEVER sell your Personally Identifiable Information (PII) like your name, Social Security Number, email, or phone number to third parties for marketing. We monetize anonymized, aggregated datasets that identify patterns in credit reporting—not individual profiles.`,
      },
      {
        q: 'What happens to my data?',
        a: `Your data contributes to: (1) Pattern analysis identifying systematic FCRA violations, (2) Litigation support for lawsuits against credit bureaus, (3) Industry research reports, (4) Building the world's first ethical CRA. See our Privacy Policy for full details.`,
      },
      {
        q: 'Can I opt out of the Data Partnership?',
        a: `The Data Partnership is the foundation of our free service model. If you do not wish to participate, you may not use the free features of Knight Financial. Paid services have different terms.`,
      },
    ],
  },
  {
    title: '⭐ Knight Prime & Paid Services',
    questions: [
      {
        q: 'What is Knight Prime?',
        a: `Knight Prime is our premium subscription at $19.99/month. It unlocks Knight AI across all tools, premium templates, unlimited vault storage, priority support, and enhanced community status. It's everything in Alpha PLUS powerful AI-driven features.`,
      },
      {
        q: 'Can I cancel Knight Prime anytime?',
        a: `Yes. There are no contracts or cancellation fees. You can cancel at any time. Your access continues until the end of your billing period, then you return to Knight Alpha (still free!).`,
      },
      {
        q: 'What are the one-time service packages?',
        a: `We offer three service packages: $250 (Basic), $500 (Standard), and $2,500 (Premium). These include personalized case analysis, custom dispute strategies, and priority lawyer referrals. Visit our Services page for details.`,
      },
      {
        q: 'What payment methods do you accept?',
        a: `We accept major credit/debit cards and process payments through secure third-party providers. For one-time service packages, payment is collected via JotForm.`,
      },
    ],
  },
  {
    title: '🛠️ Tools & Features',
    questions: [
      {
        q: 'What tools does Knight Financial offer?',
        a: `We offer six core tools: Knight Scanner (credit report analysis), Knight Dispute (letter generation), Knight Tracker (dispute tracking), Knight Decoder (response analysis), Knight Vault (document storage), and Knight AI (Prime-only intelligent analysis).`,
      },
      {
        q: 'What is Knight AI?',
        a: `Knight AI is our intelligent analysis system available to Prime members. It analyzes your credit data, dispute letters, and bureau responses to provide personalized recommendations, legal citations, and strategy guidance. It's like having a credit expert on demand.`,
      },
      {
        q: 'How many dispute templates do you have?',
        a: `Knight Alpha members have access to 65 dispute templates. Knight Prime members have access to all 99 templates, including advanced litigation-ready templates.`,
      },
      {
        q: 'Is the Academy really free?',
        a: `Yes. Knight Academy offers 100+ courses on FCRA law, dispute strategies, and credit fundamentals—completely free. Prime members get additional premium content and AI-powered study assistance.`,
      },
    ],
  },
  {
    title: '⚖️ Legal & Lawyers',
    questions: [
      {
        q: 'Can Knight Financial help me sue a credit bureau?',
        a: `We do not provide legal services, but we can connect you with FCRA attorneys in our network. Use the "I Want a Lawyer" button in your Messages tab, and we'll facilitate introductions to qualified attorneys who specialize in credit reporting litigation.`,
      },
      {
        q: 'Will my data be used in lawsuits?',
        a: `Aggregated, anonymized data may support class action and individual litigation against credit bureaus. You may also be contacted as a potential plaintiff if your case matches criteria for active litigation. This is a benefit—you could receive compensation.`,
      },
      {
        q: 'What is the arbitration clause?',
        a: `By using Knight Financial, you agree to resolve disputes through binding individual arbitration rather than court. You waive your right to participate in class action lawsuits against Knight Financial (not against credit bureaus). You may opt out within 30 days of registration. See our Terms of Service for details.`,
      },
    ],
  },
  {
    title: '🔒 Privacy & Security',
    questions: [
      {
        q: 'Is my data secure?',
        a: `Yes. We use industry-standard security including 256-bit SSL/TLS encryption, encrypted database storage, and secure infrastructure through Supabase/AWS. We conduct regular security audits and maintain strict access controls.`,
      },
      {
        q: 'Can I delete my account?',
        a: `Yes. You can request account deletion by emailing support@knightfin.org. Note that deleting your account removes your profile but does NOT delete historical data already contributed to anonymized datasets.`,
      },
      {
        q: 'Do you comply with CCPA?',
        a: `Yes. California residents have additional rights under CCPA including the right to know, delete, and opt out. See our Privacy Policy for CCPA-specific disclosures.`,
      },
    ],
  },
  {
    title: '👥 Community',
    questions: [
      {
        q: 'What is the Knight Community?',
        a: `The Knight Community is a social platform where warriors share victories, ask questions, and support each other in fighting credit bureaus. Think of it as a credit advocacy forum with gamification—earn points and badges for participation.`,
      },
      {
        q: 'What are points and badges?',
        a: `Points are earned through platform activity: posting, commenting, completing courses, submitting forms, etc. Badges recognize achievements. Prime members earn faster and have enhanced visibility in the community.`,
      },
      {
        q: 'What are the community rules?',
        a: `No credit repair scams, no personal information sharing, no illegal advice, no harassment. Share victories, help fellow warriors, and follow our Warrior Code. Violations result in warnings or bans.`,
      },
    ],
  },
  {
    title: '📞 Support',
    questions: [
      {
        q: 'How do I contact support?',
        a: `Email support@knightfin.org or call 855-516-8003. Alpha members receive responses within 48-72 hours. Prime members receive priority responses within 24 hours. You can also message us directly through the platform.`,
      },
      {
        q: 'Can I text the CEO?',
        a: `Yes! Raheem Sanders, CEO, is available at 334-938-9171 (call or text). We are the only FinTech company where you can reach the CEO directly by phone.`,
      },
      {
        q: 'What if I find a bug?',
        a: `Report bugs via support@knightfin.org with subject line "Bug Report" or use the Messages tab in the platform. Include screenshots and steps to reproduce if possible.`,
      },
    ],
  },
];

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-knight-black py-12">
      <div className="container-knight max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gradient-gold mb-4">Frequently Asked Questions</h1>
          <p className="text-xl text-gray-400">Everything you need to know about Knight Financial</p>
        </div>

        {/* Quick Contact */}
        <Card className="mb-12 border-2 border-knight-gold">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-knight-gold mb-4">Can't Find Your Answer?</h2>
            <div className="flex flex-col md:flex-row justify-center gap-6">
              <div>
                <p className="text-gray-400 text-sm">CEO Direct Line</p>
                <a href="tel:3349389171" className="text-xl text-knight-gold hover:underline">334-938-9171</a>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Support</p>
                <a href="tel:8555168003" className="text-xl text-knight-gold hover:underline">855-516-8003</a>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Email</p>
                <a href="mailto:support@knightfin.org" className="text-xl text-knight-gold hover:underline">support@knightfin.org</a>
              </div>
            </div>
          </div>
        </Card>

        {/* FAQ Sections */}
        <div className="space-y-12">
          {FAQ_SECTIONS.map((section, sectionIndex) => (
            <div key={sectionIndex}>
              <h2 className="text-3xl font-bold text-white mb-6">{section.title}</h2>
              <div className="space-y-4">
                {section.questions.map((faq, faqIndex) => (
                  <Card key={faqIndex} hover>
                    <details className="group">
                      <summary className="cursor-pointer list-none">
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-bold text-white group-open:text-knight-gold transition">
                            {faq.q}
                          </h3>
                          <span className="text-knight-gold text-2xl group-open:rotate-45 transition-transform">
                            +
                          </span>
                        </div>
                      </summary>
                      <p className="mt-4 text-gray-300 leading-relaxed">
                        {faq.a}
                      </p>
                    </details>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <Card premium className="mt-16 text-center">
          <h2 className="text-2xl font-bold text-gradient-gold mb-4">Ready to Join the Fight?</h2>
          <p className="text-gray-300 mb-6">
            Thousands of warriors are already using Knight Financial to fight credit bureaus.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register" className="btn-knight inline-block text-center">
              Join Free →
            </Link>
            <Link href="/contact" className="btn-gold-outline inline-block text-center">
              Contact Us
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}
