'use client';

import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-knight-card border-t-2 border-knight-gold mt-auto">
      <div className="container-knight py-12">
        {/* Disclaimer */}
        <div className="alert-warning mb-8">
          <p className="text-sm text-white">
            <strong>IMPORTANT DISCLAIMER:</strong> Knight Financial is a technology platform providing software tools for consumer education and self-service credit management. 
            We are <strong>NOT</strong> a law firm, credit repair organization, or financial advisor. We do not provide legal, financial, or credit repair services. 
            All users are responsible for their own actions and decisions.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Company */}
          <div>
            <h3 className="heading-knight text-lg mb-4">Knight Financial</h3>
            <p className="text-gray-400 text-sm mb-4">
              The World's First FOR THE PEOPLE Credit Reporting Platform
            </p>
            <div className="flex gap-2">
              <div className="text-3xl">⚔️</div>
              <div className="text-3xl">💎</div>
              <div className="text-3xl">🏆</div>
            </div>
          </div>
          
          {/* Product */}
          <div>
            <h3 className="heading-knight text-lg mb-4">Product</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/tools" className="link-knight">Knight Tools</Link></li>
              <li><Link href="/academy" className="link-knight">Academy</Link></li>
              <li><Link href="/resources" className="link-knight">Resources</Link></li>
              <li><Link href="/community" className="link-knight">Community</Link></li>
              <li><Link href="/pricing" className="link-knight">Pricing</Link></li>
            </ul>
          </div>
          
          {/* Company */}
          <div>
            <h3 className="heading-knight text-lg mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="link-knight">About Us</Link></li>
              <li><Link href="/contact" className="link-knight">Contact</Link></li>
              <li><Link href="/privacy" className="link-knight">Privacy Policy</Link></li>
              <li><Link href="/terms" className="link-knight">Terms of Service</Link></li>
              <li><Link href="/data-partnership" className="link-knight">Data Partnership</Link></li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="heading-knight text-lg mb-4">Contact</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <strong className="text-knight-gold">CEO:</strong><br />
                Raheem Sanders<br />
                <a href="mailto:raheem@knightfin.org" className="link-knight">raheem@knightfin.org</a><br />
                <a href="sms:3349389171" className="link-knight">334-938-9171</a> (Text!)
              </li>
              <li>
                <strong className="text-knight-gold">Support:</strong><br />
                <a href="mailto:support@knightfin.org" className="link-knight">support@knightfin.org</a><br />
                <a href="tel:8555168003" className="link-knight">855-516-8003</a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="divider-knight"></div>
        
        {/* Bottom */}
        <div className="text-center text-sm text-gray-400">
          <p className="mb-2">
            © {currentYear} Knight Financial, LLC. All rights reserved.
          </p>
          <p className="text-xs">
            404 Brown Street, Tuskegee, AL 36083 | 
            <Link href="/terms" className="link-knight ml-1">Terms</Link> | 
            <Link href="/privacy" className="link-knight ml-1">Privacy</Link>
          </p>
          <p className="text-xs mt-4 text-knight-gold">
            🏆 Built by Raheem Sanders - Young Black Excellence 💎
          </p>
        </div>
      </div>
    </footer>
  );
}
