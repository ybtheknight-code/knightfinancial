'use client';

import { useState, useEffect } from 'react';
import Card from '@/components/Card';
import Button from '@/components/Button';
import { Input, Textarea, Select } from '@/components/Input';
import { createClient } from '@/lib/supabase';

// Form categories designed for B2B value
const FORM_CATEGORIES = [
  {
    id: 'violation',
    name: '⚖️ Violation Reports',
    description: 'Document credit report errors and FCRA violations',
    b2bValue: 'Powers litigation for FCRA law firms',
    points: 25,
    color: 'from-red-600 to-red-700',
    icon: '⚖️',
  },
  {
    id: 'bureau',
    name: '🏢 Bureau Experience',
    description: 'Rate your experience with TransUnion, Equifax, Experian',
    b2bValue: 'Bureau accountability research',
    points: 15,
    color: 'from-blue-600 to-blue-700',
    icon: '🏢',
  },
  {
    id: 'financial',
    name: '💰 Financial Impact',
    description: 'Document loan denials, rate increases, financial harm',
    b2bValue: 'Damages documentation for cases',
    points: 30,
    color: 'from-green-600 to-green-700',
    icon: '💰',
  },
  {
    id: 'timeline',
    name: '📅 Dispute Timeline',
    description: 'Track dispute dates, response times, outcomes',
    b2bValue: 'Compliance analysis data',
    points: 20,
    color: 'from-purple-600 to-purple-700',
    icon: '📅',
  },
  {
    id: 'demographic',
    name: '👤 Profile Builder',
    description: 'Help us understand who is affected by credit issues',
    b2bValue: 'Market research & academic studies',
    points: 15,
    color: 'from-orange-600 to-orange-700',
    icon: '👤',
  },
  {
    id: 'journey',
    name: '📈 Credit Journey',
    description: 'Track your score changes and credit milestones',
    b2bValue: 'Trend analysis for data companies',
    points: 20,
    color: 'from-cyan-600 to-cyan-700',
    icon: '📈',
  },
];

// Individual forms within each category
const FORMS: Record<string, any[]> = {
  violation: [
    {
      id: 'violation-report',
      name: 'Report a Violation',
      description: 'Document a specific error on your credit report',
      points: 25,
      fields: [
        { name: 'bureau', label: 'Which bureau?', type: 'select', options: ['TransUnion', 'Equifax', 'Experian', 'All Three'], required: true },
        { name: 'violation_type', label: 'Type of violation', type: 'select', options: ['Incorrect Balance', 'Wrong Account', 'Identity Error', 'Duplicate Account', 'Outdated Info', 'Mixed File', 'Metro 2 Error', 'Other'], required: true },
        { name: 'account_type', label: 'Account type', type: 'select', options: ['Credit Card', 'Auto Loan', 'Mortgage', 'Student Loan', 'Medical Debt', 'Collection', 'Other'], required: true },
        { name: 'error_description', label: 'Describe the error in detail', type: 'textarea', required: true },
        { name: 'correct_info', label: 'What should it say?', type: 'textarea', required: true },
        { name: 'discovered_date', label: 'When did you discover this?', type: 'date', required: true },
        { name: 'has_documentation', label: 'Do you have documentation?', type: 'select', options: ['Yes - uploaded to Vault', 'Yes - have physical copies', 'No'], required: true },
      ],
    },
    {
      id: 'metro2-analysis',
      name: 'Metro 2 Field Check',
      description: 'Report missing or incorrect Metro 2 compliance fields',
      points: 35,
      fields: [
        { name: 'bureau', label: 'Which bureau?', type: 'select', options: ['TransUnion', 'Equifax', 'Experian'], required: true },
        { name: 'creditor_name', label: 'Creditor/Furnisher name', type: 'text', required: true },
        { name: 'missing_fields', label: 'Which fields are missing/wrong?', type: 'multiselect', options: ['Account Status', 'Payment History', 'Date of First Delinquency', 'Original Creditor', 'Credit Limit', 'High Balance', 'Payment Amount', 'Account Type', 'Consumer Info Indicator'], required: true },
        { name: 'details', label: 'Explain what you found', type: 'textarea', required: true },
      ],
    },
    {
      id: 'reinvestigation-failure',
      name: 'Reinvestigation Failure',
      description: 'Bureau failed to properly investigate your dispute',
      points: 40,
      fields: [
        { name: 'bureau', label: 'Which bureau?', type: 'select', options: ['TransUnion', 'Equifax', 'Experian'], required: true },
        { name: 'dispute_date', label: 'When did you dispute?', type: 'date', required: true },
        { name: 'response_date', label: 'When did they respond?', type: 'date', required: true },
        { name: 'response_type', label: 'What was their response?', type: 'select', options: ['Verified without investigation', 'Generic response', 'No response (30+ days)', 'Frivolous/irrelevant determination', 'Partial correction only'], required: true },
        { name: 'evidence', label: 'What evidence shows improper investigation?', type: 'textarea', required: true },
        { name: 'contacted_furnisher', label: 'Did they contact the furnisher?', type: 'select', options: ['No evidence they did', 'Yes but incorrectly', 'Unknown'], required: true },
      ],
    },
  ],
  bureau: [
    {
      id: 'bureau-rating',
      name: 'Rate Your Bureau Experience',
      description: 'How did each bureau handle your disputes?',
      points: 15,
      fields: [
        { name: 'transunion_rating', label: 'TransUnion (1-5 stars)', type: 'select', options: ['1 - Terrible', '2 - Poor', '3 - Average', '4 - Good', '5 - Excellent', 'No experience'], required: true },
        { name: 'equifax_rating', label: 'Equifax (1-5 stars)', type: 'select', options: ['1 - Terrible', '2 - Poor', '3 - Average', '4 - Good', '5 - Excellent', 'No experience'], required: true },
        { name: 'experian_rating', label: 'Experian (1-5 stars)', type: 'select', options: ['1 - Terrible', '2 - Poor', '3 - Average', '4 - Good', '5 - Excellent', 'No experience'], required: true },
        { name: 'best_experience', label: 'Which bureau was easiest to work with?', type: 'select', options: ['TransUnion', 'Equifax', 'Experian', 'All equally bad', 'All equally good'], required: true },
        { name: 'worst_experience', label: 'Which bureau was hardest?', type: 'select', options: ['TransUnion', 'Equifax', 'Experian', 'All equally bad'], required: true },
        { name: 'comments', label: 'Any specific experiences to share?', type: 'textarea', required: false },
      ],
    },
    {
      id: 'dispute-response-quality',
      name: 'Dispute Response Quality',
      description: 'Rate the quality of bureau responses',
      points: 20,
      fields: [
        { name: 'bureau', label: 'Which bureau?', type: 'select', options: ['TransUnion', 'Equifax', 'Experian'], required: true },
        { name: 'response_speed', label: 'How fast did they respond?', type: 'select', options: ['Under 15 days', '15-30 days', '30-45 days', 'Over 45 days', 'Never responded'], required: true },
        { name: 'response_quality', label: 'Was the response helpful?', type: 'select', options: ['Very helpful - issue resolved', 'Somewhat helpful', 'Generic/unhelpful', 'Made things worse', 'No response'], required: true },
        { name: 'verification_method', label: 'Did they explain how they verified?', type: 'select', options: ['Yes - detailed explanation', 'Yes - vague explanation', 'No explanation', 'Did not verify'], required: true },
        { name: 'outcome', label: 'What was the outcome?', type: 'select', options: ['Deleted', 'Corrected', 'Verified as accurate', 'No change', 'Pending'], required: true },
      ],
    },
  ],
  financial: [
    {
      id: 'loan-denial',
      name: 'Loan/Credit Denial',
      description: 'Document a denial due to credit report errors',
      points: 30,
      fields: [
        { name: 'denial_type', label: 'What were you denied?', type: 'select', options: ['Mortgage', 'Auto Loan', 'Credit Card', 'Personal Loan', 'Student Loan', 'Apartment Rental', 'Job/Employment', 'Insurance', 'Other'], required: true },
        { name: 'lender_name', label: 'Lender/Company name', type: 'text', required: true },
        { name: 'denial_date', label: 'Date of denial', type: 'date', required: true },
        { name: 'denial_reason', label: 'Stated reason for denial', type: 'textarea', required: true },
        { name: 'related_to_error', label: 'Was it related to a credit report error?', type: 'select', options: ['Yes - definitely', 'Yes - probably', 'Unsure', 'No'], required: true },
        { name: 'amount_requested', label: 'Amount you were seeking', type: 'select', options: ['Under $5,000', '$5,000-$25,000', '$25,000-$100,000', '$100,000-$500,000', 'Over $500,000'], required: true },
        { name: 'has_adverse_action', label: 'Did you receive an adverse action notice?', type: 'select', options: ['Yes', 'No'], required: true },
      ],
    },
    {
      id: 'rate-increase',
      name: 'Interest Rate Impact',
      description: 'Document higher rates due to credit issues',
      points: 25,
      fields: [
        { name: 'product_type', label: 'What type of product?', type: 'select', options: ['Mortgage', 'Auto Loan', 'Credit Card', 'Personal Loan', 'Insurance Premium'], required: true },
        { name: 'rate_offered', label: 'Rate you were offered (%)', type: 'text', required: true },
        { name: 'rate_expected', label: 'Rate you expected/qualified for (%)', type: 'text', required: true },
        { name: 'loan_amount', label: 'Loan/Credit amount', type: 'text', required: true },
        { name: 'extra_cost', label: 'Estimated extra cost over life of loan', type: 'text', required: false },
        { name: 'related_to_error', label: 'Related to credit report error?', type: 'select', options: ['Yes', 'Probably', 'Unsure', 'No'], required: true },
      ],
    },
    {
      id: 'emotional-distress',
      name: 'Emotional Impact',
      description: 'Document stress and emotional harm from credit issues',
      points: 20,
      fields: [
        { name: 'stress_level', label: 'Overall stress level (1-10)', type: 'select', options: ['1-2 (Minimal)', '3-4 (Low)', '5-6 (Moderate)', '7-8 (High)', '9-10 (Severe)'], required: true },
        { name: 'sleep_impact', label: 'Has it affected your sleep?', type: 'select', options: ['No impact', 'Some trouble sleeping', 'Significant sleep issues', 'Severe insomnia'], required: true },
        { name: 'relationship_impact', label: 'Has it affected relationships?', type: 'select', options: ['No impact', 'Minor strain', 'Significant strain', 'Major conflict'], required: true },
        { name: 'work_impact', label: 'Has it affected your work?', type: 'select', options: ['No impact', 'Some distraction', 'Missed work', 'Job loss/career impact'], required: true },
        { name: 'sought_help', label: 'Have you sought professional help?', type: 'select', options: ['No', 'Considering it', 'Yes - counseling', 'Yes - medication', 'Yes - both'], required: true },
        { name: 'description', label: 'Describe the emotional impact', type: 'textarea', required: true },
      ],
    },
  ],
  timeline: [
    {
      id: 'dispute-timeline',
      name: 'Dispute Timeline Entry',
      description: 'Track a specific dispute from start to finish',
      points: 20,
      fields: [
        { name: 'bureau', label: 'Which bureau?', type: 'select', options: ['TransUnion', 'Equifax', 'Experian'], required: true },
        { name: 'dispute_method', label: 'How did you dispute?', type: 'select', options: ['Online portal', 'Certified mail', 'Regular mail', 'Phone', 'Fax'], required: true },
        { name: 'dispute_date', label: 'Date dispute sent', type: 'date', required: true },
        { name: 'acknowledgment_date', label: 'Date acknowledged (if any)', type: 'date', required: false },
        { name: 'response_date', label: 'Date of response', type: 'date', required: false },
        { name: 'days_to_respond', label: 'Total days to respond', type: 'text', required: false },
        { name: 'outcome', label: 'Outcome', type: 'select', options: ['Deleted', 'Corrected', 'Verified', 'No response', 'Pending'], required: true },
        { name: 'follow_up_needed', label: 'Follow-up needed?', type: 'select', options: ['No - resolved', 'Yes - escalating', 'Yes - CFPB complaint', 'Yes - legal action'], required: true },
      ],
    },
  ],
  demographic: [
    {
      id: 'profile-extended',
      name: 'Extended Profile',
      description: 'Help us understand who is affected by credit issues',
      points: 15,
      fields: [
        { name: 'age_range', label: 'Age range', type: 'select', options: ['18-24', '25-34', '35-44', '45-54', '55-64', '65+'], required: true },
        { name: 'income_range', label: 'Household income', type: 'select', options: ['Under $25k', '$25k-$50k', '$50k-$75k', '$75k-$100k', '$100k-$150k', 'Over $150k', 'Prefer not to say'], required: true },
        { name: 'education', label: 'Education level', type: 'select', options: ['High school', 'Some college', 'Associates', 'Bachelors', 'Masters', 'Doctorate', 'Trade/vocational'], required: true },
        { name: 'employment', label: 'Employment status', type: 'select', options: ['Employed full-time', 'Employed part-time', 'Self-employed', 'Unemployed', 'Retired', 'Student', 'Disabled'], required: true },
        { name: 'housing', label: 'Housing situation', type: 'select', options: ['Own home', 'Renting', 'Living with family', 'Other'], required: true },
        { name: 'military', label: 'Military status', type: 'select', options: ['Never served', 'Active duty', 'Veteran', 'Reserve/Guard', 'Military spouse'], required: true },
      ],
    },
    {
      id: 'geographic-info',
      name: 'Geographic Information',
      description: 'Help us map credit issues by region',
      points: 10,
      fields: [
        { name: 'region', label: 'Region', type: 'select', options: ['Northeast', 'Southeast', 'Midwest', 'Southwest', 'West', 'Northwest'], required: true },
        { name: 'area_type', label: 'Area type', type: 'select', options: ['Urban', 'Suburban', 'Rural'], required: true },
        { name: 'years_at_address', label: 'Years at current address', type: 'select', options: ['Less than 1', '1-2', '3-5', '5-10', 'Over 10'], required: true },
      ],
    },
  ],
  journey: [
    {
      id: 'score-change',
      name: 'Score Change Report',
      description: 'Track significant changes to your credit score',
      points: 20,
      fields: [
        { name: 'score_before', label: 'Score before', type: 'text', required: true },
        { name: 'score_after', label: 'Score after', type: 'text', required: true },
        { name: 'change_direction', label: 'Direction', type: 'select', options: ['Increased', 'Decreased'], required: true },
        { name: 'time_period', label: 'Time period', type: 'select', options: ['1 month', '3 months', '6 months', '1 year', 'Over 1 year'], required: true },
        { name: 'cause', label: 'What caused the change?', type: 'select', options: ['Dispute resolved', 'Account deleted', 'Paid off debt', 'New account', 'Hard inquiry', 'Collection added', 'Error appeared', 'Unknown'], required: true },
        { name: 'bureau', label: 'Which bureau score?', type: 'select', options: ['TransUnion', 'Equifax', 'Experian', 'FICO', 'VantageScore', 'Unknown'], required: true },
      ],
    },
    {
      id: 'credit-milestone',
      name: 'Credit Milestone',
      description: 'Celebrate and document your credit wins',
      points: 15,
      fields: [
        { name: 'milestone_type', label: 'Type of milestone', type: 'select', options: ['First credit card', 'Score hit 700+', 'Score hit 750+', 'Score hit 800+', 'Debt free', 'All disputes resolved', 'Approved for mortgage', 'Approved for auto', 'Removed collection', 'Other'], required: true },
        { name: 'date_achieved', label: 'Date achieved', type: 'date', required: true },
        { name: 'time_to_achieve', label: 'How long did it take?', type: 'select', options: ['Under 3 months', '3-6 months', '6-12 months', '1-2 years', 'Over 2 years'], required: true },
        { name: 'knight_helped', label: 'Did Knight Financial help?', type: 'select', options: ['Yes - significantly', 'Yes - somewhat', 'Used other tools', 'Did it myself'], required: true },
        { name: 'advice', label: 'What advice would you give others?', type: 'textarea', required: false },
      ],
    },
  ],
};

export default function FormsPage() {
  const [user, setUser] = useState<any>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedForm, setSelectedForm] = useState<any>(null);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [totalFormsCompleted, setTotalFormsCompleted] = useState(0);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const supabase = createClient();
    const { data: { user: authUser } } = await supabase.auth.getUser();
    if (authUser) {
      const { data: profile } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', authUser.id)
        .single();
      setUser(profile);
      
      // Get count of forms submitted
      const { count } = await supabase
        .from('form_submissions')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', authUser.id);
      setTotalFormsCompleted(count || 0);
    }
  };

  const handleSubmit = async () => {
    if (!selectedForm || !user) return;
    
    setSubmitting(true);
    const supabase = createClient();
    
    // Submit form data
    const { error } = await supabase.from('form_submissions').insert({
      user_id: user.id,
      form_id: selectedForm.id,
      form_category: selectedCategory,
      form_name: selectedForm.name,
      data: formData,
      points_awarded: selectedForm.points,
    });
    
    if (!error) {
      // Award points
      await supabase.rpc('award_points', {
        p_user_id: user.id,
        p_points: selectedForm.points,
        p_reason: `Completed form: ${selectedForm.name}`,
      });
      
      setSubmitted(true);
      setTotalFormsCompleted(prev => prev + 1);
      
      // Reset after delay
      setTimeout(() => {
        setSubmitted(false);
        setSelectedForm(null);
        setFormData({});
      }, 3000);
    }
    
    setSubmitting(false);
  };

  const renderField = (field: any) => {
    const value = formData[field.name] || '';
    
    switch (field.type) {
      case 'select':
        return (
          <Select
            key={field.name}
            label={field.label}
            value={value}
            onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
            options={[{ value: '', label: 'Select...' }, ...field.options.map((o: string) => ({ value: o, label: o }))]}
            required={field.required}
          />
        );
      case 'textarea':
        return (
          <Textarea
            key={field.name}
            label={field.label}
            value={value}
            onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
            rows={4}
            required={field.required}
          />
        );
      case 'date':
        return (
          <Input
            key={field.name}
            type="date"
            label={field.label}
            value={value}
            onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
            required={field.required}
          />
        );
      default:
        return (
          <Input
            key={field.name}
            type="text"
            label={field.label}
            value={value}
            onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
            required={field.required}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-knight-black py-8">
      <div className="container-knight">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">📋</div>
          <h1 className="text-4xl font-bold text-gradient-gold mb-2">Knight Forms</h1>
          <p className="text-xl text-gray-400">Earn Points • Power Free Tools • Fight Bureaus</p>
        </div>

        {/* Transparency Banner */}
        <Card className="mb-8 border-2 border-knight-gold">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="text-6xl">🤝</div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-knight-gold mb-2">Our Data Partnership Promise</h2>
              <p className="text-gray-300 mb-2">
                <strong className="text-white">No Deception:</strong> Your anonymized data helps fund our free tools and powers 
                litigation against credit bureaus. Law firms, researchers, and data companies pay for aggregated insights—
                <strong className="text-knight-gold"> never your personal information</strong>.
              </p>
              <p className="text-gray-400 text-sm">
                Every form you complete earns you points AND helps build the world's first ethical CRA for the people.
              </p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-knight-gold">{totalFormsCompleted}</div>
              <div className="text-sm text-gray-400">Forms Completed</div>
            </div>
          </div>
        </Card>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="text-center py-4">
            <div className="text-2xl font-bold text-knight-gold">{user?.points || 0}</div>
            <div className="text-xs text-gray-400">Your Points</div>
          </Card>
          <Card className="text-center py-4">
            <div className="text-2xl font-bold text-green-400">{totalFormsCompleted}</div>
            <div className="text-xs text-gray-400">Forms Done</div>
          </Card>
          <Card className="text-center py-4">
            <div className="text-2xl font-bold text-blue-400">{Object.values(FORMS).flat().length}</div>
            <div className="text-xs text-gray-400">Total Forms</div>
          </Card>
          <Card className="text-center py-4">
            <div className="text-2xl font-bold text-purple-400">
              {Object.values(FORMS).flat().reduce((acc, f) => acc + f.points, 0)}
            </div>
            <div className="text-xs text-gray-400">Total Pts Available</div>
          </Card>
        </div>

        {/* Success Message */}
        {submitted && (
          <Card className="mb-8 bg-green-900/30 border-2 border-green-500">
            <div className="text-center">
              <div className="text-5xl mb-2">🎉</div>
              <h3 className="text-2xl font-bold text-green-400">Form Submitted!</h3>
              <p className="text-gray-300">+{selectedForm?.points} points earned</p>
              <p className="text-gray-500 text-sm mt-2">Thank you for contributing to the fight!</p>
            </div>
          </Card>
        )}

        {/* Form Display */}
        {selectedForm ? (
          <Card>
            {/* Form Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <button 
                  onClick={() => { setSelectedForm(null); setFormData({}); }}
                  className="text-knight-gold hover:underline mb-2"
                >
                  ← Back to categories
                </button>
                <h2 className="text-2xl font-bold text-white">{selectedForm.name}</h2>
                <p className="text-gray-400">{selectedForm.description}</p>
              </div>
              <div className="text-center bg-knight-gold/20 px-4 py-2 rounded-lg">
                <div className="text-2xl font-bold text-knight-gold">+{selectedForm.points}</div>
                <div className="text-xs text-gray-400">points</div>
              </div>
            </div>

            {/* Form Fields */}
            <div className="space-y-4 mb-6">
              {selectedForm.fields.map((field: any) => renderField(field))}
            </div>

            {/* Submit */}
            <Button
              onClick={handleSubmit}
              loading={submitting}
              fullWidth
              size="lg"
              disabled={!selectedForm.fields.every((f: any) => !f.required || formData[f.name])}
            >
              Submit Form (+{selectedForm.points} pts)
            </Button>
          </Card>
        ) : selectedCategory ? (
          <div>
            {/* Category Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <button 
                  onClick={() => setSelectedCategory(null)}
                  className="text-knight-gold hover:underline mb-2"
                >
                  ← Back to all categories
                </button>
                <h2 className="text-3xl font-bold text-white">
                  {FORM_CATEGORIES.find(c => c.id === selectedCategory)?.name}
                </h2>
              </div>
            </div>

            {/* Forms in Category */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {FORMS[selectedCategory]?.map((form) => (
                <Card key={form.id} hover className="cursor-pointer" onClick={() => setSelectedForm(form)}>
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-bold text-white">{form.name}</h3>
                    <span className="bg-knight-gold text-black px-3 py-1 rounded-full text-sm font-bold">
                      +{form.points} pts
                    </span>
                  </div>
                  <p className="text-gray-400 mb-4">{form.description}</p>
                  <p className="text-sm text-gray-500">{form.fields.length} questions</p>
                </Card>
              ))}
            </div>
          </div>
        ) : (
          <div>
            {/* Category Cards */}
            <h2 className="text-2xl font-bold text-white mb-6">Choose a Category</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {FORM_CATEGORIES.map((category) => (
                <Card 
                  key={category.id} 
                  hover 
                  className="cursor-pointer"
                  onClick={() => setSelectedCategory(category.id)}
                >
                  <div className={`bg-gradient-to-r ${category.color} text-white px-3 py-1 rounded-full text-sm font-bold inline-block mb-3`}>
                    {category.icon} {category.name}
                  </div>
                  <p className="text-gray-300 mb-3">{category.description}</p>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500">{FORMS[category.id]?.length || 0} forms</span>
                    <span className="text-knight-gold font-bold">+{category.points}+ pts</span>
                  </div>
                  <div className="mt-3 pt-3 border-t border-knight-gold-dark">
                    <p className="text-xs text-gray-500">
                      <span className="text-knight-gold">B2B Value:</span> {category.b2bValue}
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* B2B Value Footer */}
        <Card className="mt-12 text-center">
          <h3 className="text-xl font-bold text-knight-gold mb-4">💎 Where Your Data Goes</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <div className="text-2xl mb-2">⚖️</div>
              <div className="text-white font-bold">Law Firms</div>
              <div className="text-gray-500">FCRA litigation support</div>
            </div>
            <div>
              <div className="text-2xl mb-2">📊</div>
              <div className="text-white font-bold">Data Companies</div>
              <div className="text-gray-500">Market research</div>
            </div>
            <div>
              <div className="text-2xl mb-2">🎓</div>
              <div className="text-white font-bold">Universities</div>
              <div className="text-gray-500">Academic studies</div>
            </div>
            <div>
              <div className="text-2xl mb-2">📰</div>
              <div className="text-white font-bold">Journalists</div>
              <div className="text-gray-500">Investigative reports</div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
