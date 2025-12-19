'use client';

import { useEffect } from 'react';
import Card from '@/components/Card';
import Button from '@/components/Button';
import Link from 'next/link';

export default function PricingPage() {
  useEffect(() => {
    // Load PayPal SDK
    const script = document.createElement('script');
    script.src = 'https://www.paypal.com/sdk/js?client-id=ATu37jGeO0-iGJU021IwMepTydlnlsJ7F9Xd8dHwnP5fAJUhvXMMA6BltRPOYbxd8538LJ_fSaJg-Fbu&vault=true&intent=subscription';
    script.setAttribute('data-sdk-integration-source', 'button-factory');
    script.async = true;
    script.onload = () => {
      if ((window as any).paypal) {
        (window as any).paypal.Buttons({
          style: {
            shape: 'rect',
            color: 'gold',
            layout: 'vertical',
            label: 'subscribe'
          },
          createSubscription: function(data: any, actions: any) {
            return actions.subscription.create({
              plan_id: 'P-96788471AA430284MNFBBRRY'
            });
          },
          onApprove: function(data: any, actions: any) {
            // TODO: Call API to update user's is_prime status
            alert('Success! Subscription ID: ' + data.subscriptionID + '\n\nYour Prime membership is now active!');
            window.location.href = '/dashboard?prime=activated';
          }
        }).render('#paypal-button-container');
      }
    };
    document.body.appendChild(script);
    
    return () => {
      // Cleanup
      const existingScript = document.querySelector('script[src*="paypal.com/sdk"]');
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-knight-black py-12">
      <div className="container-knight max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gradient-gold mb-4">Simple Pricing</h1>
          <p className="text-xl text-gray-400 mb-2">Everything is FREE. Seriously.</p>
          <p className="text-gray-500">Prime is for warriors who want NUCLEAR power.</p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
          {/* ALPHA - FREE */}
          <Card className="relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-green-600 text-white px-4 py-1 text-sm font-bold">
              100% FREE
            </div>
            
            <div className="text-center mb-6">
              <div className="text-5xl mb-3">⚔️</div>
              <h2 className="text-3xl font-bold text-white mb-2">ALPHA</h2>
              <p className="text-gray-400">Full Arsenal. No Limits. Free Forever.</p>
            </div>
            
            <div className="text-center mb-6">
              <span className="text-5xl font-bold text-green-400">$0</span>
              <span className="text-gray-400">/forever</span>
            </div>
            
            <div className="space-y-3 mb-8">
              <div className="flex items-center gap-3">
                <span className="text-green-400 text-xl">✓</span>
                <span className="text-white"><strong>UNLIMITED</strong> Knight Scanner</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-green-400 text-xl">✓</span>
                <span className="text-white"><strong>UNLIMITED</strong> Dispute Letters</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-green-400 text-xl">✓</span>
                <span className="text-white"><strong>UNLIMITED</strong> Knight Tracker</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-green-400 text-xl">✓</span>
                <span className="text-white"><strong>UNLIMITED</strong> Knight Decoder</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-green-400 text-xl">✓</span>
                <span className="text-white"><strong>UNLIMITED</strong> Vault Storage</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-green-400 text-xl">✓</span>
                <span className="text-white">Full Knight Academy Access</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-green-400 text-xl">✓</span>
                <span className="text-white">Community Access</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-green-400 text-xl">✓</span>
                <span className="text-white">99 Dispute Templates</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-green-400 text-xl">✓</span>
                <span className="text-white">Points & Badges</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-green-400 text-xl">✓</span>
                <span className="text-white">Data Partnership Benefits</span>
              </div>
            </div>
            
            <Link href="/register">
              <Button variant="gold-outline" fullWidth size="lg">
                Get Started Free
              </Button>
            </Link>
            
            <p className="text-center text-gray-500 text-sm mt-4">
              No credit card required. No tricks. Just free.
            </p>
          </Card>

          {/* PRIME - $19.99/mo */}
          <Card premium className="relative overflow-hidden border-2 border-knight-gold">
            <div className="absolute top-0 right-0 bg-knight-gold text-black px-4 py-1 text-sm font-bold">
              ☢️ NUCLEAR VALUE
            </div>
            
            <div className="text-center mb-6">
              <div className="text-5xl mb-3">👑</div>
              <h2 className="text-3xl font-bold text-gradient-gold mb-2">PRIME</h2>
              <p className="text-gray-400">Knight AI + Social Media Clout</p>
            </div>
            
            <div className="text-center mb-6">
              <span className="text-5xl font-bold text-knight-gold">$19.99</span>
              <span className="text-gray-400">/month</span>
            </div>
            
            <div className="space-y-3 mb-6">
              <p className="text-knight-gold font-bold text-sm uppercase tracking-wide mb-2">Everything in Alpha, PLUS:</p>
              
              {/* Knight AI Section */}
              <div className="bg-knight-hover rounded-lg p-3 mb-4">
                <p className="text-knight-gold font-bold mb-2">🤖 KNIGHT AI EXPANSION</p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-knight-gold">★</span>
                    <span className="text-white">24/7 AI Credit Strategist</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-knight-gold">★</span>
                    <span className="text-white">AI-Powered Letter Generation</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-knight-gold">★</span>
                    <span className="text-white">Personalized Case Analysis</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-knight-gold">★</span>
                    <span className="text-white">Smart Dispute Strategy</span>
                  </div>
                </div>
              </div>
              
              {/* Social Clout Section */}
              <div className="bg-knight-hover rounded-lg p-3 mb-4">
                <p className="text-knight-gold font-bold mb-2">📱 SOCIAL MEDIA CLOUT</p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-knight-gold">★</span>
                    <span className="text-white">Verified Prime Badge 👑</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-knight-gold">★</span>
                    <span className="text-white">Shareable Victory Cards</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-knight-gold">★</span>
                    <span className="text-white">Featured in Community</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-knight-gold">★</span>
                    <span className="text-white">Ambassador Program Access</span>
                  </div>
                </div>
              </div>
              
              {/* Metro 2 Mastery Section */}
              <div className="bg-knight-hover rounded-lg p-3">
                <p className="text-knight-gold font-bold mb-2">📚 METRO 2 MASTERY</p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-knight-gold">★</span>
                    <span className="text-white">Omission Harm Theory Certification</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-knight-gold">★</span>
                    <span className="text-white">Advanced FCRA Litigation</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* PayPal Button Container */}
            <div id="paypal-button-container" className="mb-4"></div>
            
            <p className="text-center text-gray-500 text-sm">
              Cancel anytime. 7-day money back guarantee.
            </p>
          </Card>
        </div>

        {/* Why Free? */}
        <Card className="mb-12">
          <h2 className="text-3xl font-bold text-knight-gold text-center mb-6">
            Why Is Everything Free? 🤔
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-4xl mb-3">🤝</div>
              <h3 className="font-bold text-white mb-2">Data Partnership</h3>
              <p className="text-gray-400 text-sm">
                Your anonymized data helps us fight credit bureaus and fund free tools for everyone.
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-3">⚖️</div>
              <h3 className="font-bold text-white mb-2">We're Building a CRA</h3>
              <p className="text-gray-400 text-sm">
                We're on a mission to become the first ethical Credit Reporting Agency FOR THE PEOPLE.
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-3">💪</div>
              <h3 className="font-bold text-white mb-2">Power to the People</h3>
              <p className="text-gray-400 text-sm">
                Credit repair tools shouldn't be locked behind paywalls. We believe in equal access.
              </p>
            </div>
          </div>
        </Card>

        {/* One-Time Services */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">Need More Hands-On Help?</h2>
          <p className="text-gray-400">Our done-for-you service packages with CAPS</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card hover>
            <div className="text-center">
              <div className="text-3xl mb-2">🛡️</div>
              <h3 className="text-xl font-bold text-white mb-1">Knight Starter</h3>
              <p className="text-3xl font-bold text-knight-gold mb-2">$250</p>
              <p className="text-gray-400 text-sm mb-2">3 custom letters + basic analysis</p>
              <p className="text-green-400 text-xs mb-4">+ CAPS Basic Credit Building</p>
              <Link href="/services">
                <Button variant="gold-outline" size="sm" fullWidth>
                  Learn More
                </Button>
              </Link>
            </div>
          </Card>
          
          <Card hover className="border-2 border-knight-gold relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-knight-gold text-black px-3 py-1 rounded-full text-xs font-bold">
              POPULAR
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">⚔️</div>
              <h3 className="text-xl font-bold text-white mb-1">Knight Warrior</h3>
              <p className="text-3xl font-bold text-knight-gold mb-2">$500</p>
              <p className="text-gray-400 text-sm mb-2">7 letters + CFPB draft + consultation</p>
              <p className="text-green-400 text-xs mb-4">+ CAPS Pro Credit Building</p>
              <Link href="/services">
                <Button size="sm" fullWidth>
                  Learn More
                </Button>
              </Link>
            </div>
          </Card>
          
          <Card hover>
            <div className="text-center">
              <div className="text-3xl mb-2">👑</div>
              <h3 className="text-xl font-bold text-white mb-1">Knight Champion</h3>
              <p className="text-3xl font-bold text-knight-gold mb-2">$2,500</p>
              <p className="text-gray-400 text-sm mb-2">Full litigation case file + CEO access</p>
              <p className="text-green-400 text-xs mb-4">+ CAPS Elite Credit Building</p>
              <Link href="/services">
                <Button variant="gold-outline" size="sm" fullWidth>
                  Learn More
                </Button>
              </Link>
            </div>
          </Card>
        </div>

        {/* FAQ */}
        <Card>
          <h2 className="text-2xl font-bold text-knight-gold mb-6">Common Questions</h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-bold text-white mb-1">Is Alpha really unlimited?</h3>
              <p className="text-gray-400 text-sm">
                Yes! Unlimited scans, letters, tracking, decoding, and storage. No hidden limits.
              </p>
            </div>
            
            <div>
              <h3 className="font-bold text-white mb-1">What's the catch with free?</h3>
              <p className="text-gray-400 text-sm">
                No catch. Your anonymized data helps us build insights that fund everything. We're transparent about this.
              </p>
            </div>
            
            <div>
              <h3 className="font-bold text-white mb-1">What is the Omission Harm Theory?</h3>
              <p className="text-gray-400 text-sm">
                Developed by Raheem Sanders in Miller v. TransUnion, it's the legal theory that blank Metro 2 
                fields constitute FCRA inaccuracies. Prime members get full certification.
              </p>
            </div>
            
            <div>
              <h3 className="font-bold text-white mb-1">Can I cancel Prime anytime?</h3>
              <p className="text-gray-400 text-sm">
                Yes, cancel with one click anytime. 7-day money-back guarantee, no questions asked.
              </p>
            </div>
          </div>
        </Card>

        {/* CTA */}
        <div className="text-center mt-12">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Fight Back?</h2>
          <p className="text-gray-400 mb-6">Join thousands of warriors reclaiming their credit</p>
          <Link href="/register">
            <Button size="lg">
              ⚔️ Start Free (Alpha)
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
