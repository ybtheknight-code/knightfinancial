import Link from 'next/link';
import Card from '@/components/Card';

export default function ServicesPage() {
  const services = [
    {
      name: 'STANDARD',
      price: '$250',
      description: 'Perfect for those starting their credit journey',
      features: [
        '📊 Full Credit Analysis',
        '📝 3 Custom Dispute Letters',
        '📧 Email Support',
        '📚 Basic Credit Education',
        '⏱️ 30-Day Turnaround',
      ],
      caps: [
        '💳 1 AU Tradeline Strategy',
        '🏦 Self-Lender Setup Guide',
        '💰 Credit Builder Card Recommendations',
      ],
      color: 'from-blue-600 to-blue-800',
      jotformLink: 'https://form.jotform.com/250656318498165', // STARTER form
      popular: false,
    },
    {
      name: 'PROFESSIONAL',
      price: '$500',
      description: 'Comprehensive credit repair for serious results',
      features: [
        '📊 Advanced Credit Analysis',
        '📝 6 Custom Dispute Letters',
        '📞 Phone & Email Support',
        '📚 Full Credit Education Suite',
        '⏱️ Priority 14-Day Turnaround',
        '🔄 30-Day Follow-Up',
      ],
      caps: [
        '💳 2 AU Tradeline Placements',
        '🏦 Personal Loan Strategy',
        '💰 Credit Card Stacking Plan',
        '📈 Utilization Optimization',
      ],
      color: 'from-knight-gold to-yellow-600',
      jotformLink: 'https://form.jotform.com/250656318498165', // WARRIOR form
      popular: true,
    },
    {
      name: 'EXECUTIVE',
      price: '$2,500',
      description: 'The ultimate credit transformation package',
      features: [
        '📊 Elite Credit Analysis & Strategy',
        '📝 Unlimited Dispute Letters',
        '📞 Direct CEO Access',
        '📚 Complete Education Library',
        '⏱️ Express 7-Day Turnaround',
        '🔄 90-Day Active Management',
        '⚖️ Legal Consultation Access',
        '🎯 Credit Goal Planning',
      ],
      caps: [
        '💳 5 AU Tradeline Package',
        '🏢 Business Credit Building',
        '💰 Credit Card Churning Strategy',
        '📈 Loan Ladder Protocol',
        '🎯 800+ Credit Score Protocol',
        '👨‍🏫 6-Month Personal Coaching',
      ],
      color: 'from-purple-600 to-pink-600',
      jotformLink: 'https://form.jotform.com/250656318498165', // CHAMPION form
      popular: false,
    },
  ];

  return (
    <div className="min-h-screen bg-knight-black">
      {/* Hero */}
      <section className="py-20 bg-gradient-to-b from-knight-hover to-knight-black">
        <div className="container-knight text-center">
          <h1 className="text-5xl font-bold text-gradient-gold mb-6">
            ⚔️ Professional Credit Services
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Expert credit repair services powered by the <span className="text-knight-gold font-bold">Omission Harm Theory</span> and 
            our proprietary <span className="text-knight-gold font-bold">Credit Ascension Protocols (CAPS)</span>
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="container-knight">
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service) => (
              <div key={service.name} className="relative">
                {service.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                    <span className="bg-knight-gold text-black px-4 py-1 rounded-full text-sm font-bold">
                      ⭐ MOST POPULAR
                    </span>
                  </div>
                )}
                <Card className={`h-full ${service.popular ? 'border-2 border-knight-gold' : ''}`}>
                  <div className={`bg-gradient-to-r ${service.color} -mx-6 -mt-6 px-6 py-8 rounded-t-lg mb-6`}>
                    <h2 className="text-2xl font-bold text-white mb-2">{service.name}</h2>
                    <div className="text-4xl font-bold text-white">{service.price}</div>
                    <p className="text-white/80 text-sm mt-2">{service.description}</p>
                  </div>
                  
                  <div className="space-y-6">
                    {/* Features */}
                    <div>
                      <h3 className="text-white font-bold mb-3">📋 What's Included:</h3>
                      <ul className="space-y-2">
                        {service.features.map((feature, i) => (
                          <li key={i} className="text-gray-300 text-sm flex items-start gap-2">
                            <span className="text-green-400">✓</span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    {/* CAPS */}
                    <div className="bg-knight-hover rounded-lg p-4">
                      <h3 className="text-knight-gold font-bold mb-3">🚀 CAPS (Credit Ascension):</h3>
                      <ul className="space-y-2">
                        {service.caps.map((cap, i) => (
                          <li key={i} className="text-gray-300 text-sm flex items-start gap-2">
                            <span className="text-knight-gold">★</span>
                            {cap}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    {/* CTA */}
                    <a
                      href={service.jotformLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`block w-full text-center py-4 rounded-lg font-bold transition ${
                        service.popular
                          ? 'bg-gradient-to-r from-knight-gold to-yellow-500 text-black hover:shadow-lg hover:shadow-knight-gold/50'
                          : 'bg-knight-hover text-white hover:bg-knight-gold-dark'
                      }`}
                    >
                      Get Started →
                    </a>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-knight-hover">
        <div className="container-knight">
          <h2 className="text-3xl font-bold text-center text-gradient-gold mb-12">
            Why Knight Financial?
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            <Card className="text-center">
              <div className="text-4xl mb-4">⚔️</div>
              <h3 className="text-white font-bold mb-2">Battle-Tested</h3>
              <p className="text-gray-400 text-sm">Our methods come from real litigation experience</p>
            </Card>
            <Card className="text-center">
              <div className="text-4xl mb-4">📚</div>
              <h3 className="text-white font-bold mb-2">CRRG Expertise</h3>
              <p className="text-gray-400 text-sm">Deep knowledge of Metro 2 reporting standards</p>
            </Card>
            <Card className="text-center">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-white font-bold mb-2">Omission Theory</h3>
              <p className="text-gray-400 text-sm">Proprietary approach to finding violations</p>
            </Card>
            <Card className="text-center">
              <div className="text-4xl mb-4">🚀</div>
              <h3 className="text-white font-bold mb-2">CAPS System</h3>
              <p className="text-gray-400 text-sm">Build positive credit while disputing negative</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16">
        <div className="container-knight text-center">
          <Card className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-4">Need Custom Solutions?</h2>
            <p className="text-gray-400 mb-6">
              Contact us directly for enterprise solutions, law firm partnerships, or custom credit strategies.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="tel:3349389171" className="btn-knight">
                📞 Call: 334-938-9171
              </a>
              <Link href="/contact" className="btn-knight-outline">
                ✉️ Send Message
              </Link>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}
