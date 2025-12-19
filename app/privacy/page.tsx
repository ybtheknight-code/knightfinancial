import Card from '@/components/Card';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-knight-black py-12">
      <div className="container-knight max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gradient-gold mb-4">Privacy Policy</h1>
          <p className="text-gray-400">Last Updated: December 18, 2025</p>
          <p className="text-gray-500">Effective Date: December 18, 2025</p>
        </div>

        <div className="space-y-8 text-gray-300">
          {/* Introduction */}
          <Card>
            <h2 className="text-2xl font-bold text-knight-gold mb-4">1. Introduction</h2>
            <p className="mb-4">
              Knight Financial, LLC ("Knight Financial," "we," "us," or "our") operates the Knight Financial 
              platform located at knightfinancialofficial.vercel.app and related services (collectively, the "Platform"). 
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you 
              use our Platform.
            </p>
            <p className="mb-4">
              <strong className="text-white">IMPORTANT:</strong> Knight Financial operates under a unique 
              <strong className="text-knight-gold"> Data Partnership Model</strong>. By using our Platform, you are 
              entering into a mutual data relationship where you provide information in exchange for free access to 
              our tools and resources.
            </p>
            <p>
              Knight Financial, LLC is headquartered at 404 Brown Street, Tuskegee, Alabama 36083, United States.
            </p>
          </Card>

          {/* Company Identity */}
          <Card>
            <h2 className="text-2xl font-bold text-knight-gold mb-4">2. Company Identity & Classification</h2>
            <p className="mb-4">Knight Financial, LLC is:</p>
            <ul className="list-disc ml-6 space-y-2 mb-4">
              <li>A <strong className="text-white">Financial Technology (FinTech) Software-as-a-Service (SaaS) company</strong></li>
              <li>A <strong className="text-white">Data analytics and aggregation company</strong></li>
              <li>A <strong className="text-white">Consumer education platform</strong></li>
            </ul>
            <p className="mb-4">Knight Financial, LLC is <strong className="text-red-400">NOT</strong>:</p>
            <ul className="list-disc ml-6 space-y-2">
              <li>A Credit Repair Organization (CRO) as defined under the Credit Repair Organizations Act (CROA)</li>
              <li>A law firm or provider of legal advice or legal services</li>
              <li>A credit counseling agency</li>
              <li>A debt settlement or debt management company</li>
            </ul>
          </Card>

          {/* Data Partnership */}
          <Card premium>
            <h2 className="text-2xl font-bold text-gradient-gold mb-4">3. Data Partnership Agreement</h2>
            <p className="mb-4">
              <strong className="text-white">THE CORE OF OUR MODEL:</strong> Knight Financial provides free access to 
              powerful tools and resources in exchange for your participation in our Data Partnership. This is not 
              a traditional "take your data and run" model—this is a <strong className="text-knight-gold">mutual 
              partnership</strong> where your data contributes to systemic change in the credit reporting industry.
            </p>
            
            <h3 className="text-xl font-bold text-white mt-6 mb-3">3.1 What We Collect</h3>
            <ul className="list-disc ml-6 space-y-2 mb-4">
              <li><strong>Account Information:</strong> Name, email, phone number, address, date of birth, state of residence</li>
              <li><strong>Demographic Data:</strong> Gender, ethnicity, income range, employment status (optional but appreciated)</li>
              <li><strong>Credit Data:</strong> Credit reports you upload, dispute letters you generate, bureau responses you receive</li>
              <li><strong>Financial Harm Data:</strong> Loan denials, interest rate increases, emotional distress documentation</li>
              <li><strong>Platform Activity:</strong> Form submissions, course progress, community posts, tool usage patterns</li>
              <li><strong>Technical Data:</strong> IP address, browser type, device information, cookies</li>
            </ul>

            <h3 className="text-xl font-bold text-white mt-6 mb-3">3.2 How We Use Your Data</h3>
            <ul className="list-disc ml-6 space-y-2 mb-4">
              <li><strong className="text-knight-gold">Litigation Support:</strong> Aggregated, anonymized data powers lawsuits against credit bureaus</li>
              <li><strong className="text-knight-gold">Pattern Analysis:</strong> Identifying systematic FCRA violations across bureaus</li>
              <li><strong className="text-knight-gold">Research & Reports:</strong> Creating industry reports sold to law firms, researchers, and journalists</li>
              <li><strong className="text-knight-gold">Platform Improvement:</strong> Enhancing tools based on usage patterns</li>
              <li><strong className="text-knight-gold">Class Action Identification:</strong> You may be contacted as a potential plaintiff</li>
              <li><strong className="text-knight-gold">Ethical CRA Development:</strong> Building the world's first FOR THE PEOPLE credit reporting infrastructure</li>
            </ul>

            <h3 className="text-xl font-bold text-white mt-6 mb-3">3.3 Data Monetization Disclosure</h3>
            <p className="mb-4">
              <strong className="text-white">WE ARE TRANSPARENT:</strong> Knight Financial monetizes aggregated, 
              anonymized data. This is how we sustain free services. We sell:
            </p>
            <ul className="list-disc ml-6 space-y-2 mb-4">
              <li>Aggregated violation pattern reports to FCRA law firms</li>
              <li>Industry analysis to academic researchers</li>
              <li>Market reports to financial journalists</li>
              <li>Compliance data to ethical financial institutions</li>
            </ul>
            <p className="bg-knight-black p-4 rounded-lg">
              <strong className="text-knight-gold">OUR PROMISE:</strong> We NEVER sell your Personally Identifiable 
              Information (PII) including your name, Social Security Number, email, or phone number to third parties 
              for marketing purposes.
            </p>
          </Card>

          {/* Data Retention */}
          <Card>
            <h2 className="text-2xl font-bold text-knight-gold mb-4">4. Data Retention</h2>
            <p className="mb-4">
              Knight Financial retains your data indefinitely to support ongoing litigation, pattern analysis, 
              and historical research. This is essential to our mission.
            </p>
            <p className="mb-4">Data is retained until:</p>
            <ul className="list-disc ml-6 space-y-2">
              <li>Knight Financial ceases operations (90-day notice will be provided)</li>
              <li>A court of competent jurisdiction orders deletion</li>
              <li>You exercise rights under applicable data protection laws (California, EU, etc.)</li>
            </ul>
            <p className="mt-4 text-gray-400">
              Note: Deleting your account removes your profile but does NOT delete historical data already 
              contributed to anonymized datasets.
            </p>
          </Card>

          {/* Third Party Sharing */}
          <Card>
            <h2 className="text-2xl font-bold text-knight-gold mb-4">5. Third-Party Sharing</h2>
            <p className="mb-4">We share data with:</p>
            <ul className="list-disc ml-6 space-y-2">
              <li><strong>FCRA Attorneys:</strong> Pre-qualified case files (with your explicit consent)</li>
              <li><strong>Service Providers:</strong> Hosting (Vercel), database (Supabase), payment processing</li>
              <li><strong>Legal Proceedings:</strong> When required by law or subpoena</li>
              <li><strong>Business Transfers:</strong> In the event of merger, acquisition, or sale</li>
            </ul>
          </Card>

          {/* Communications */}
          <Card>
            <h2 className="text-2xl font-bold text-knight-gold mb-4">6. Communications & SMS Consent</h2>
            <p className="mb-4">
              By providing your phone number and using the Platform, you consent to receive:
            </p>
            <ul className="list-disc ml-6 space-y-2 mb-4">
              <li>Account verification codes</li>
              <li>Dispute deadline reminders</li>
              <li>Platform updates and announcements</li>
              <li>Marketing communications (opt-out available)</li>
              <li>Litigation opportunity notifications</li>
            </ul>
            <p className="text-gray-400">
              Message and data rates may apply. Text STOP to opt out of marketing messages. 
              Essential account communications cannot be opted out.
            </p>
          </Card>

          {/* Cookies */}
          <Card>
            <h2 className="text-2xl font-bold text-knight-gold mb-4">7. Cookies & Tracking</h2>
            <p className="mb-4">Knight Financial uses:</p>
            <ul className="list-disc ml-6 space-y-2">
              <li><strong>Essential Cookies:</strong> Authentication, security, basic functionality</li>
              <li><strong>Analytics Cookies:</strong> Understanding platform usage patterns</li>
              <li><strong>Preference Cookies:</strong> Remembering your settings</li>
            </ul>
            <p className="mt-4 text-gray-400">
              You can disable cookies in your browser settings, but this may affect Platform functionality.
            </p>
          </Card>

          {/* Security */}
          <Card>
            <h2 className="text-2xl font-bold text-knight-gold mb-4">8. Data Security</h2>
            <p className="mb-4">We implement industry-standard security measures including:</p>
            <ul className="list-disc ml-6 space-y-2">
              <li>256-bit SSL/TLS encryption for data in transit</li>
              <li>Encrypted database storage</li>
              <li>Regular security audits</li>
              <li>Access controls and authentication</li>
              <li>Secure data centers (Supabase/AWS infrastructure)</li>
            </ul>
            <p className="mt-4 text-gray-400">
              No system is 100% secure. In the event of a data breach, affected users will be notified 
              within 72 hours as required by law.
            </p>
          </Card>

          {/* Your Rights */}
          <Card>
            <h2 className="text-2xl font-bold text-knight-gold mb-4">9. Your Rights</h2>
            <p className="mb-4">Depending on your jurisdiction, you may have the right to:</p>
            <ul className="list-disc ml-6 space-y-2 mb-4">
              <li><strong>Access:</strong> Request a copy of your personal data</li>
              <li><strong>Correction:</strong> Request correction of inaccurate data</li>
              <li><strong>Deletion:</strong> Request deletion of your account (subject to retention policies)</li>
              <li><strong>Portability:</strong> Request your data in a portable format</li>
              <li><strong>Opt-Out:</strong> Opt out of marketing communications</li>
            </ul>
            <p className="mb-4">To exercise these rights, contact:</p>
            <p className="text-knight-gold">support@knightfin.org</p>
            <p className="text-gray-400 mt-4">
              California residents: See our CCPA disclosures at the bottom of this policy.
            </p>
          </Card>

          {/* Children */}
          <Card>
            <h2 className="text-2xl font-bold text-knight-gold mb-4">10. Children's Privacy</h2>
            <p>
              Knight Financial is not intended for users under 18 years of age. We do not knowingly collect 
              personal information from children. If we discover we have collected information from a child 
              under 18, we will delete it immediately.
            </p>
          </Card>

          {/* Changes */}
          <Card>
            <h2 className="text-2xl font-bold text-knight-gold mb-4">11. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy periodically. Changes will be posted on this page with an 
              updated "Last Updated" date. Continued use of the Platform after changes constitutes acceptance 
              of the revised policy.
            </p>
          </Card>

          {/* Contact */}
          <Card>
            <h2 className="text-2xl font-bold text-knight-gold mb-4">12. Contact Information</h2>
            <div className="space-y-4">
              <div>
                <p className="font-bold text-white">Knight Financial, LLC</p>
                <p>404 Brown Street</p>
                <p>Tuskegee, Alabama 36083</p>
              </div>
              <div>
                <p><strong>CEO:</strong> Raheem Sanders</p>
                <p className="text-knight-gold">raheem@knightfin.org</p>
                <p>334-938-9171</p>
              </div>
              <div>
                <p><strong>General Support:</strong></p>
                <p className="text-knight-gold">support@knightfin.org</p>
                <p>855-516-8003</p>
              </div>
            </div>
          </Card>

          {/* CCPA */}
          <Card>
            <h2 className="text-2xl font-bold text-knight-gold mb-4">California Consumer Privacy Act (CCPA) Disclosure</h2>
            <p className="mb-4">California residents have additional rights under the CCPA:</p>
            <ul className="list-disc ml-6 space-y-2 mb-4">
              <li>Right to know what personal information is collected</li>
              <li>Right to know whether personal information is sold or disclosed</li>
              <li>Right to opt out of sale of personal information</li>
              <li>Right to non-discrimination for exercising CCPA rights</li>
            </ul>
            <p>
              To exercise CCPA rights, email <span className="text-knight-gold">support@knightfin.org</span> with 
              subject line "CCPA Request."
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
