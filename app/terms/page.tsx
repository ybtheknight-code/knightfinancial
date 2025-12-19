import Card from '@/components/Card';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-knight-black py-12">
      <div className="container-knight max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gradient-gold mb-4">Terms of Service</h1>
          <p className="text-gray-400">Last Updated: December 18, 2025</p>
          <p className="text-gray-500">Effective Date: December 18, 2025</p>
        </div>

        <div className="space-y-8 text-gray-300">
          {/* Agreement */}
          <Card premium>
            <h2 className="text-2xl font-bold text-gradient-gold mb-4">AGREEMENT TO TERMS</h2>
            <p className="mb-4">
              <strong className="text-white">PLEASE READ THESE TERMS OF SERVICE CAREFULLY.</strong> By accessing or 
              using Knight Financial's platform (the "Platform"), you agree to be bound by these Terms of Service 
              ("Terms"). If you do not agree to all of these Terms, do not access or use the Platform.
            </p>
            <p className="mb-4">
              These Terms constitute a legally binding agreement between you ("User," "you," or "your") and 
              <strong className="text-white"> Knight Financial, LLC</strong>, a limited liability company organized 
              under the laws of Alabama, with its principal place of business at 404 Brown Street, Tuskegee, 
              Alabama 36083 ("Knight Financial," "Company," "we," "us," or "our").
            </p>
            <p className="bg-knight-black p-4 rounded-lg text-knight-gold">
              <strong>BY CREATING AN ACCOUNT, YOU ACKNOWLEDGE THAT YOU HAVE READ, UNDERSTOOD, AND AGREE TO BE 
              BOUND BY THESE TERMS, INCLUDING THE BINDING ARBITRATION CLAUSE AND CLASS ACTION WAIVER IN SECTION 15.</strong>
            </p>
          </Card>

          {/* Company Description */}
          <Card>
            <h2 className="text-2xl font-bold text-knight-gold mb-4">1. COMPANY DESCRIPTION & DISCLAIMERS</h2>
            
            <h3 className="text-xl font-bold text-white mt-4 mb-3">1.1 What Knight Financial IS</h3>
            <p className="mb-4">Knight Financial, LLC is:</p>
            <ul className="list-disc ml-6 space-y-2 mb-4">
              <li>A Financial Technology (FinTech) company</li>
              <li>A Software-as-a-Service (SaaS) provider</li>
              <li>A data analytics and aggregation company</li>
              <li>A consumer education and resource platform</li>
              <li>A social community for credit advocacy</li>
            </ul>

            <h3 className="text-xl font-bold text-white mt-6 mb-3">1.2 What Knight Financial IS NOT</h3>
            <div className="bg-red-900/20 border border-red-600 p-4 rounded-lg mb-4">
              <p className="text-red-300 font-bold mb-2">CRITICAL DISCLAIMERS:</p>
              <ul className="list-disc ml-6 space-y-2 text-gray-300">
                <li>Knight Financial is <strong>NOT a Credit Repair Organization (CRO)</strong> as defined by the 
                Credit Repair Organizations Act (CROA), 15 U.S.C. § 1679 et seq.</li>
                <li>Knight Financial is <strong>NOT a law firm</strong> and does not provide legal advice, legal 
                representation, or legal services of any kind.</li>
                <li>Knight Financial is <strong>NOT a credit counseling agency</strong>.</li>
                <li>Knight Financial is <strong>NOT a debt settlement or debt management company</strong>.</li>
                <li>Knight Financial is <strong>NOT regulated by CROA</strong> as we do not perform credit repair services.</li>
              </ul>
            </div>

            <h3 className="text-xl font-bold text-white mt-6 mb-3">1.3 No Legal Advice</h3>
            <p>
              All information, tools, templates, courses, and resources provided on the Platform are for 
              <strong className="text-white"> educational and informational purposes only</strong>. Nothing on this 
              Platform constitutes legal advice. For legal matters, you should consult with a licensed attorney 
              in your jurisdiction. Knight Financial may connect you with attorneys in our network, but we are 
              not responsible for any legal services they provide.
            </p>
          </Card>

          {/* Eligibility */}
          <Card>
            <h2 className="text-2xl font-bold text-knight-gold mb-4">2. ELIGIBILITY</h2>
            <p className="mb-4">To use the Platform, you must:</p>
            <ul className="list-disc ml-6 space-y-2">
              <li>Be at least 18 years of age</li>
              <li>Be a legal resident of the United States</li>
              <li>Have the legal capacity to enter into binding contracts</li>
              <li>Not be barred from using the Platform under applicable law</li>
              <li>Agree to the Data Partnership Agreement</li>
            </ul>
          </Card>

          {/* Data Partnership */}
          <Card>
            <h2 className="text-2xl font-bold text-knight-gold mb-4">3. DATA PARTNERSHIP AGREEMENT</h2>
            <p className="mb-4">
              By using the Platform, you enter into a <strong className="text-white">Data Partnership</strong> with 
              Knight Financial. This partnership is the foundation of our free service model.
            </p>
            <h3 className="text-xl font-bold text-white mt-4 mb-3">3.1 Your Contributions</h3>
            <p className="mb-4">You agree to provide accurate, truthful information including:</p>
            <ul className="list-disc ml-6 space-y-2 mb-4">
              <li>Personal identification information</li>
              <li>Credit reports and financial documents you upload</li>
              <li>Dispute letters and bureau correspondence</li>
              <li>Responses to forms and surveys</li>
              <li>Community posts and interactions</li>
            </ul>
            
            <h3 className="text-xl font-bold text-white mt-4 mb-3">3.2 Our Use of Your Data</h3>
            <p className="mb-4">You grant Knight Financial a perpetual, irrevocable, royalty-free license to:</p>
            <ul className="list-disc ml-6 space-y-2 mb-4">
              <li>Aggregate and anonymize your data for research and litigation</li>
              <li>Use patterns identified in your data for legal proceedings</li>
              <li>Sell anonymized, aggregated datasets to third parties</li>
              <li>Contact you regarding potential litigation opportunities</li>
              <li>Improve our Platform and services</li>
            </ul>
            <p className="text-gray-400">
              See our Privacy Policy for complete details on data handling.
            </p>
          </Card>

          {/* User Responsibilities */}
          <Card>
            <h2 className="text-2xl font-bold text-knight-gold mb-4">4. USER RESPONSIBILITIES</h2>
            <p className="mb-4">You agree to:</p>
            <ul className="list-disc ml-6 space-y-2 mb-4">
              <li>Provide accurate, complete, and current information</li>
              <li>Maintain the security of your account credentials</li>
              <li>Notify us immediately of any unauthorized access</li>
              <li>Use the Platform only for lawful purposes</li>
              <li>Comply with all applicable laws and regulations</li>
              <li>Respect other users and the community guidelines</li>
            </ul>
            <p className="mb-4">You agree NOT to:</p>
            <ul className="list-disc ml-6 space-y-2">
              <li>Provide false or misleading information</li>
              <li>Use the Platform for illegal activities</li>
              <li>Harass, abuse, or harm other users</li>
              <li>Attempt to hack, scrape, or compromise the Platform</li>
              <li>Share your account with others</li>
              <li>Use automated systems to access the Platform</li>
              <li>Promote scams, illegal credit repair schemes, or fraud</li>
            </ul>
          </Card>

          {/* Subscription Terms */}
          <Card>
            <h2 className="text-2xl font-bold text-knight-gold mb-4">5. SUBSCRIPTION & PAYMENT TERMS</h2>
            
            <h3 className="text-xl font-bold text-white mt-4 mb-3">5.1 Free Services (Knight Alpha)</h3>
            <p className="mb-4">
              Knight Alpha provides free access to core Platform features in exchange for participation in our 
              Data Partnership. No payment is required.
            </p>
            
            <h3 className="text-xl font-bold text-white mt-4 mb-3">5.2 Premium Services (Knight Prime)</h3>
            <p className="mb-4">
              Knight Prime is a paid subscription at $19.99/month providing enhanced features. By subscribing:
            </p>
            <ul className="list-disc ml-6 space-y-2 mb-4">
              <li>You authorize recurring monthly charges to your payment method</li>
              <li>Subscriptions renew automatically until cancelled</li>
              <li>You may cancel at any time; access continues until the billing period ends</li>
              <li>Refunds are provided at Knight Financial's sole discretion</li>
            </ul>
            
            <h3 className="text-xl font-bold text-white mt-4 mb-3">5.3 One-Time Service Packages</h3>
            <p>
              Knight Financial offers one-time service packages ($250, $500, $2,500). These are separate from 
              subscriptions and are subject to their own terms disclosed at purchase.
            </p>
          </Card>

          {/* Intellectual Property */}
          <Card>
            <h2 className="text-2xl font-bold text-knight-gold mb-4">6. INTELLECTUAL PROPERTY</h2>
            <p className="mb-4">
              All content on the Platform—including text, graphics, logos, icons, images, software, and 
              compilations—is the property of Knight Financial or its licensors and is protected by U.S. 
              and international copyright, trademark, and other intellectual property laws.
            </p>
            <p>
              "Knight Financial," "Knight AI," "Knight Scanner," "Knight Dispute," and related marks are 
              trademarks of Knight Financial, LLC.
            </p>
          </Card>

          {/* Disclaimers */}
          <Card>
            <h2 className="text-2xl font-bold text-knight-gold mb-4">7. DISCLAIMERS</h2>
            <div className="bg-knight-black p-4 rounded-lg mb-4">
              <p className="uppercase text-white font-bold">
                THE PLATFORM IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR 
                IMPLIED. KNIGHT FINANCIAL DISCLAIMS ALL WARRANTIES, INCLUDING IMPLIED WARRANTIES OF MERCHANTABILITY, 
                FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
              </p>
            </div>
            <p className="mb-4">Specifically, Knight Financial does NOT warrant that:</p>
            <ul className="list-disc ml-6 space-y-2">
              <li>The Platform will be uninterrupted, error-free, or secure</li>
              <li>Any specific outcome will result from using our tools or templates</li>
              <li>Credit bureaus will respond favorably to disputes</li>
              <li>Any legal outcome will be achieved</li>
              <li>Information provided by users or third parties is accurate</li>
            </ul>
          </Card>

          {/* Limitation of Liability */}
          <Card>
            <h2 className="text-2xl font-bold text-knight-gold mb-4">8. LIMITATION OF LIABILITY</h2>
            <div className="bg-knight-black p-4 rounded-lg">
              <p className="text-white">
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, KNIGHT FINANCIAL AND ITS OFFICERS, DIRECTORS, EMPLOYEES, 
                AGENTS, AND AFFILIATES SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, 
                OR PUNITIVE DAMAGES, INCLUDING LOSS OF PROFITS, DATA, OR GOODWILL, ARISING FROM YOUR USE OF THE 
                PLATFORM. IN NO EVENT SHALL KNIGHT FINANCIAL'S TOTAL LIABILITY EXCEED THE AMOUNTS PAID BY YOU TO 
                KNIGHT FINANCIAL IN THE TWELVE (12) MONTHS PRECEDING THE CLAIM, OR ONE HUNDRED DOLLARS ($100), 
                WHICHEVER IS GREATER.
              </p>
            </div>
          </Card>

          {/* Indemnification */}
          <Card>
            <h2 className="text-2xl font-bold text-knight-gold mb-4">9. INDEMNIFICATION</h2>
            <p>
              You agree to indemnify, defend, and hold harmless Knight Financial, its officers, directors, 
              employees, agents, licensors, and suppliers from and against all claims, losses, expenses, 
              damages, and costs, including reasonable attorneys' fees, arising from: (a) your violation 
              of these Terms; (b) your use of the Platform; (c) your violation of any rights of a third 
              party; (d) any content you submit to the Platform; or (e) your violation of any applicable law.
            </p>
          </Card>

          {/* SMS Consent */}
          <Card>
            <h2 className="text-2xl font-bold text-knight-gold mb-4">10. SMS/TEXT MESSAGE CONSENT</h2>
            <p className="mb-4">
              By providing your phone number, you expressly consent to receive text messages from Knight 
              Financial, including:
            </p>
            <ul className="list-disc ml-6 space-y-2 mb-4">
              <li>Account verification and security alerts</li>
              <li>Dispute deadline reminders</li>
              <li>Platform updates and feature announcements</li>
              <li>Marketing and promotional messages</li>
              <li>Litigation opportunity notifications</li>
            </ul>
            <p className="text-gray-400">
              Message frequency varies. Message and data rates may apply. Text STOP to opt out of marketing 
              messages. Text HELP for assistance. Opting out of marketing does not affect transactional messages.
            </p>
          </Card>

          {/* Termination */}
          <Card>
            <h2 className="text-2xl font-bold text-knight-gold mb-4">11. TERMINATION</h2>
            <p className="mb-4">
              Knight Financial may terminate or suspend your account at any time, with or without cause, 
              with or without notice. Grounds for termination include:
            </p>
            <ul className="list-disc ml-6 space-y-2 mb-4">
              <li>Violation of these Terms</li>
              <li>Fraudulent, abusive, or illegal activity</li>
              <li>Providing false information</li>
              <li>Scam activity or promoting illegal credit repair</li>
              <li>Harassment of other users or staff</li>
            </ul>
            <p>
              Upon termination, your right to use the Platform ceases immediately. Sections that by their 
              nature should survive termination will survive, including intellectual property, disclaimers, 
              limitations of liability, indemnification, and arbitration.
            </p>
          </Card>

          {/* Governing Law */}
          <Card>
            <h2 className="text-2xl font-bold text-knight-gold mb-4">12. GOVERNING LAW</h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of the State of 
              Alabama, without regard to its conflict of law provisions. You agree to submit to the personal 
              jurisdiction of the courts located in Macon County, Alabama, for any actions not subject to 
              arbitration.
            </p>
          </Card>

          {/* Arbitration */}
          <Card premium>
            <h2 className="text-2xl font-bold text-gradient-gold mb-4">13. BINDING ARBITRATION & CLASS ACTION WAIVER</h2>
            <div className="bg-red-900/20 border border-red-600 p-4 rounded-lg mb-4">
              <p className="text-red-300 font-bold">
                PLEASE READ THIS SECTION CAREFULLY. IT AFFECTS YOUR LEGAL RIGHTS, INCLUDING YOUR RIGHT TO 
                FILE A LAWSUIT IN COURT.
              </p>
            </div>
            
            <h3 className="text-xl font-bold text-white mt-4 mb-3">13.1 Agreement to Arbitrate</h3>
            <p className="mb-4">
              You and Knight Financial agree that any dispute, claim, or controversy arising out of or relating 
              to these Terms or the Platform shall be resolved through <strong className="text-white">BINDING 
              INDIVIDUAL ARBITRATION</strong> rather than in court, except for claims that may be brought in 
              small claims court.
            </p>
            
            <h3 className="text-xl font-bold text-white mt-4 mb-3">13.2 Class Action Waiver</h3>
            <p className="mb-4 bg-knight-black p-4 rounded-lg">
              <strong className="text-knight-gold">YOU WAIVE YOUR RIGHT TO PARTICIPATE IN A CLASS ACTION 
              LAWSUIT OR CLASS-WIDE ARBITRATION AGAINST KNIGHT FINANCIAL.</strong> All claims must be 
              brought in your individual capacity, not as a plaintiff or class member in any purported 
              class or representative proceeding.
            </p>
            
            <h3 className="text-xl font-bold text-white mt-4 mb-3">13.3 Arbitration Procedures</h3>
            <p className="mb-4">Arbitration will be conducted by JAMS under its Streamlined Arbitration Rules:</p>
            <ul className="list-disc ml-6 space-y-2">
              <li>The arbitration will take place in Macon County, Alabama, or by phone/video</li>
              <li>The arbitrator's decision will be final and binding</li>
              <li>Each party bears its own costs, unless the arbitrator rules otherwise</li>
              <li>The arbitrator may award any remedy available under applicable law</li>
            </ul>
            
            <h3 className="text-xl font-bold text-white mt-4 mb-3">13.4 Opt-Out</h3>
            <p>
              You may opt out of arbitration by sending written notice to Knight Financial at 
              404 Brown Street, Tuskegee, AL 36083 within 30 days of account creation. The notice must 
              include your name, address, email, and a clear statement that you opt out.
            </p>
          </Card>

          {/* Severability */}
          <Card>
            <h2 className="text-2xl font-bold text-knight-gold mb-4">14. SEVERABILITY</h2>
            <p>
              If any provision of these Terms is found to be unenforceable or invalid, that provision shall 
              be limited or eliminated to the minimum extent necessary, and the remaining provisions shall 
              remain in full force and effect.
            </p>
          </Card>

          {/* Entire Agreement */}
          <Card>
            <h2 className="text-2xl font-bold text-knight-gold mb-4">15. ENTIRE AGREEMENT</h2>
            <p>
              These Terms, together with the Privacy Policy and Data Partnership Agreement, constitute the 
              entire agreement between you and Knight Financial regarding the Platform and supersede all 
              prior agreements and understandings.
            </p>
          </Card>

          {/* Contact */}
          <Card>
            <h2 className="text-2xl font-bold text-knight-gold mb-4">16. CONTACT INFORMATION</h2>
            <div className="space-y-4">
              <div>
                <p className="font-bold text-white">Knight Financial, LLC</p>
                <p>404 Brown Street</p>
                <p>Tuskegee, Alabama 36083</p>
              </div>
              <div>
                <p><strong>CEO:</strong> Raheem Sanders</p>
                <p className="text-knight-gold">raheem@knightfin.org | 334-938-9171</p>
              </div>
              <div>
                <p><strong>Support:</strong></p>
                <p className="text-knight-gold">support@knightfin.org | 855-516-8003</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
