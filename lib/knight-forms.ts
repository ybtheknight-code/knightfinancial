// ============================================================================
// KNIGHT FORMS - CONSUMER DATA COLLECTION SYSTEM
// 30 intake forms for different credit violation scenarios
// Data collected feeds into Knight Intel aggregation
// ============================================================================

export interface KnightForm {
  id: string;
  title: string;
  description: string;
  category: 'violation' | 'harm' | 'bureau' | 'creditor' | 'lawsuit' | 'general';
  icon: string;
  fields: KnightFormField[];
  points_reward: number;
  estimated_time: string;
}

export interface KnightFormField {
  id: string;
  label: string;
  type: 'text' | 'select' | 'multiselect' | 'textarea' | 'number' | 'date' | 'currency' | 'radio' | 'checkbox';
  placeholder?: string;
  options?: string[];
  required: boolean;
  help_text?: string;
}

export const KNIGHT_FORMS: KnightForm[] = [
  // ========================================================================
  // VIOLATION REPORTING FORMS (1-10)
  // ========================================================================
  {
    id: 'inaccurate-balance',
    title: 'Report Inaccurate Balance',
    description: 'Account showing wrong balance on your credit report',
    category: 'violation',
    icon: '💰',
    points_reward: 25,
    estimated_time: '5 minutes',
    fields: [
      { id: 'bureau', label: 'Which bureau(s)?', type: 'multiselect', options: ['TransUnion', 'Equifax', 'Experian', 'Innovis'], required: true },
      { id: 'creditor', label: 'Creditor Name', type: 'text', required: true },
      { id: 'account_type', label: 'Account Type', type: 'select', options: ['Credit Card', 'Student Loan', 'Auto Loan', 'Mortgage', 'Personal Loan', 'Other'], required: true },
      { id: 'reported_balance', label: 'Balance Shown on Report', type: 'currency', required: true },
      { id: 'actual_balance', label: 'Actual Balance', type: 'currency', required: true },
      { id: 'difference', label: 'Difference Amount', type: 'currency', required: true },
      { id: 'proof', label: 'Do you have proof?', type: 'radio', options: ['Yes - Statement', 'Yes - Payment History', 'Yes - Payoff Letter', 'No'], required: true },
      { id: 'impact', label: 'How has this affected you?', type: 'textarea', placeholder: 'Credit denials, higher rates, etc.', required: true },
    ],
  },

  {
    id: 'missing-deferment-code',
    title: 'Missing Student Loan Deferment Code',
    description: 'Student loan missing required Metro 2 fields (Miller case!)',
    category: 'violation',
    icon: '🎓',
    points_reward: 50,
    estimated_time: '7 minutes',
    fields: [
      { id: 'bureau', label: 'Which bureau(s)?', type: 'multiselect', options: ['TransUnion', 'Equifax', 'Experian'], required: true },
      { id: 'servicer', label: 'Loan Servicer', type: 'text', required: true },
      { id: 'deferment_type', label: 'Deferment Type', type: 'select', options: ['CARES Act', 'In-School', 'Economic Hardship', 'Military', 'Other'], required: true },
      { id: 'deferment_start', label: 'Deferment Start Date', type: 'date', required: true },
      { id: 'deferment_end', label: 'Deferment End Date', type: 'date', required: false },
      { id: 'missing_fields', label: 'Missing Fields', type: 'multiselect', options: ['Field 21 (Current Balance)', 'Field 22 (Amount Past Due)', 'Field 15 (Scheduled Payment)', 'Field 16 (Actual Payment)', 'Deferment Code'], required: true },
      { id: 'months_missing', label: 'How many months reported incorrectly?', type: 'number', required: true },
      { id: 'proof_deferment', label: 'Do you have deferment documentation?', type: 'radio', options: ['Yes', 'No'], required: true },
    ],
  },

  {
    id: 'duplicate-account',
    title: 'Duplicate Account Reporting',
    description: 'Same account reported multiple times',
    category: 'violation',
    icon: '👥',
    points_reward: 20,
    estimated_time: '5 minutes',
    fields: [
      { id: 'bureau', label: 'Which bureau(s)?', type: 'multiselect', options: ['TransUnion', 'Equifax', 'Experian'], required: true },
      { id: 'creditor', label: 'Original Creditor', type: 'text', required: true },
      { id: 'times_reported', label: 'How many times appears?', type: 'number', required: true },
      { id: 'account_numbers', label: 'Account Numbers Shown', type: 'textarea', placeholder: 'List all account numbers appearing', required: true },
      { id: 'collection_agencies', label: 'Are collection agencies involved?', type: 'radio', options: ['Yes', 'No'], required: true },
      { id: 'impact_score', label: 'Estimated score impact', type: 'number', required: false },
    ],
  },

  {
    id: 'unauthorized-inquiry',
    title: 'Unauthorized Hard Inquiry',
    description: 'Hard inquiry you didn\'t authorize',
    category: 'violation',
    icon: '🔍',
    points_reward: 15,
    estimated_time: '4 minutes',
    fields: [
      { id: 'bureau', label: 'Which bureau(s)?', type: 'multiselect', options: ['TransUnion', 'Equifax', 'Experian'], required: true },
      { id: 'company', label: 'Company That Pulled', type: 'text', required: true },
      { id: 'inquiry_date', label: 'Inquiry Date', type: 'date', required: true },
      { id: 'purpose', label: 'Stated Purpose', type: 'select', options: ['Auto Loan', 'Credit Card', 'Mortgage', 'Employment', 'Unknown', 'Other'], required: true },
      { id: 'authorization', label: 'Did you authorize?', type: 'radio', options: ['No', 'Maybe - Not Sure', 'No - Identity Theft'], required: true },
      { id: 'relationship', label: 'Relationship with company?', type: 'select', options: ['Never heard of them', 'Visited but didn\'t apply', 'Applied but was told soft pull only', 'No relationship'], required: true },
    ],
  },

  {
    id: 'wrong-payment-status',
    title: 'Incorrect Payment Status',
    description: 'Account showing late when you paid on time',
    category: 'violation',
    icon: '📅',
    points_reward: 30,
    estimated_time: '6 minutes',
    fields: [
      { id: 'bureau', label: 'Which bureau(s)?', type: 'multiselect', options: ['TransUnion', 'Equifax', 'Experian'], required: true },
      { id: 'creditor', label: 'Creditor Name', type: 'text', required: true },
      { id: 'reported_status', label: 'Status Shown', type: 'select', options: ['30 Days Late', '60 Days Late', '90 Days Late', '120+ Days Late', 'Charge-off'], required: true },
      { id: 'actual_status', label: 'Actual Status', type: 'select', options: ['Current', 'Never Late', 'Late Once (different time)', 'Paid Off'], required: true },
      { id: 'payment_proof', label: 'Have payment proof?', type: 'radio', options: ['Yes - Bank Records', 'Yes - Receipts', 'Yes - Confirmation Numbers', 'No'], required: true },
      { id: 'months_affected', label: 'How many months?', type: 'number', required: true },
      { id: 'score_drop', label: 'Score drop (if known)', type: 'number', required: false },
    ],
  },

  {
    id: 'mixed-file',
    title: 'Mixed Credit File',
    description: 'Someone else\'s accounts on your report',
    category: 'violation',
    icon: '🔀',
    points_reward: 40,
    estimated_time: '8 minutes',
    fields: [
      { id: 'bureau', label: 'Which bureau(s)?', type: 'multiselect', options: ['TransUnion', 'Equifax', 'Experian'], required: true },
      { id: 'other_person_name', label: 'Other Person\'s Name (if known)', type: 'text', required: false },
      { id: 'similar_name', label: 'Is name similar to yours?', type: 'radio', options: ['Yes - Very Similar', 'Yes - Same Last Name', 'Somewhat Similar', 'Not Similar'], required: true },
      { id: 'num_accounts', label: 'How many accounts aren\'t yours?', type: 'number', required: true },
      { id: 'account_types', label: 'Types of accounts', type: 'multiselect', options: ['Credit Cards', 'Student Loans', 'Auto Loans', 'Mortgages', 'Other'], required: true },
      { id: 'addresses_wrong', label: 'Are there wrong addresses too?', type: 'radio', options: ['Yes', 'No'], required: true },
      { id: 'identity_theft', label: 'Could this be identity theft?', type: 'radio', options: ['Yes', 'No', 'Not Sure'], required: true },
    ],
  },

  {
    id: 'outdated-info',
    title: 'Outdated Negative Information',
    description: 'Negative item older than 7 years still reporting',
    category: 'violation',
    icon: '⏰',
    points_reward: 25,
    estimated_time: '5 minutes',
    fields: [
      { id: 'bureau', label: 'Which bureau(s)?', type: 'multiselect', options: ['TransUnion', 'Equifax', 'Experian'], required: true },
      { id: 'creditor', label: 'Creditor/Company', type: 'text', required: true },
      { id: 'item_type', label: 'Type of Item', type: 'select', options: ['Collection Account', 'Charge-off', 'Late Payments', 'Judgment', 'Tax Lien', 'Bankruptcy', 'Other'], required: true },
      { id: 'date_occurred', label: 'When did it happen?', type: 'date', required: true },
      { id: 'years_old', label: 'How many years old?', type: 'number', required: true },
      { id: 'still_reporting', label: 'Still showing on report?', type: 'radio', options: ['Yes', 'No - Recently removed', 'No - Been gone a while'], required: true },
    ],
  },

  {
    id: 'not-my-account',
    title: 'Account Not Mine',
    description: 'Account on report that doesn\'t belong to you',
    category: 'violation',
    icon: '❌',
    points_reward: 35,
    estimated_time: '6 minutes',
    fields: [
      { id: 'bureau', label: 'Which bureau(s)?', type: 'multiselect', options: ['TransUnion', 'Equifax', 'Experian'], required: true },
      { id: 'creditor', label: 'Creditor Name', type: 'text', required: true },
      { id: 'account_type', label: 'Account Type', type: 'select', options: ['Credit Card', 'Loan', 'Collection', 'Other'], required: true },
      { id: 'opened_date', label: 'Date "Opened"', type: 'date', required: false },
      { id: 'balance', label: 'Balance Shown', type: 'currency', required: false },
      { id: 'relationship', label: 'Any relationship with creditor?', type: 'radio', options: ['Never heard of them', 'Used to have account (closed)', 'Family member might have', 'Identity theft'], required: true },
      { id: 'disputed_before', label: 'Disputed before?', type: 'radio', options: ['Yes', 'No'], required: true },
    ],
  },

  {
    id: 'reinvestigation-failure',
    title: 'Failed Investigation',
    description: 'Bureau didn\'t properly investigate your dispute',
    category: 'violation',
    icon: '⚠️',
    points_reward: 45,
    estimated_time: '10 minutes',
    fields: [
      { id: 'bureau', label: 'Which bureau?', type: 'select', options: ['TransUnion', 'Equifax', 'Experian'], required: true },
      { id: 'dispute_date', label: 'When did you dispute?', type: 'date', required: true },
      { id: 'dispute_method', label: 'How did you dispute?', type: 'select', options: ['Certified Mail', 'Online Portal', 'Phone', 'Other'], required: true },
      { id: 'response_date', label: 'When did they respond?', type: 'date', required: false },
      { id: 'response_time', label: 'Did they respond within 30 days?', type: 'radio', options: ['Yes', 'No', 'Never responded'], required: true },
      { id: 'outcome', label: 'Their Response', type: 'select', options: ['Verified as Accurate', 'Frivolous', 'Insufficient Information', 'No Response', 'Other'], required: true },
      { id: 'evidence_sent', label: 'Did you send evidence?', type: 'radio', options: ['Yes', 'No'], required: true },
      { id: 'evidence_ignored', label: 'Did they ignore your evidence?', type: 'radio', options: ['Yes', 'No', 'Not Sure'], required: true },
      { id: 'creditor_contacted', label: 'Did they forward to creditor?', type: 'radio', options: ['Yes', 'No', 'Don\'t Know'], required: false },
    ],
  },

  {
    id: 'creditor-wont-fix',
    title: 'Creditor Won\'t Correct Error',
    description: 'Creditor refuses to fix inaccurate reporting',
    category: 'creditor',
    icon: '🏢',
    points_reward: 40,
    estimated_time: '8 minutes',
    fields: [
      { id: 'creditor', label: 'Creditor Name', type: 'text', required: true },
      { id: 'error_type', label: 'Type of Error', type: 'select', options: ['Wrong Balance', 'Wrong Payment Status', 'Wrong Date', 'Duplicate', 'Not My Account', 'Other'], required: true },
      { id: 'contacted_date', label: 'When did you contact them?', type: 'date', required: true },
      { id: 'contact_method', label: 'How?', type: 'multiselect', options: ['Phone', 'Mail', 'Email', 'Online Portal'], required: true },
      { id: 'their_response', label: 'Their Response', type: 'textarea', required: true },
      { id: 'proof_sent', label: 'Did you send proof?', type: 'radio', options: ['Yes', 'No'], required: true },
      { id: 'times_contacted', label: 'How many times contacted?', type: 'number', required: true },
    ],
  },

  // ========================================================================
  // HARM DOCUMENTATION FORMS (11-15)
  // ========================================================================
  {
    id: 'credit-denial',
    title: 'Credit Application Denial',
    description: 'Denied credit due to inaccurate reporting',
    category: 'harm',
    icon: '🚫',
    points_reward: 30,
    estimated_time: '7 minutes',
    fields: [
      { id: 'denial_type', label: 'Type of Credit', type: 'select', options: ['Credit Card', 'Auto Loan', 'Mortgage', 'Personal Loan', 'Business Loan', 'Apartment Rental', 'Other'], required: true },
      { id: 'lender', label: 'Lender/Company', type: 'text', required: true },
      { id: 'denial_date', label: 'Denial Date', type: 'date', required: true },
      { id: 'denial_reason', label: 'Reason Given', type: 'textarea', required: true },
      { id: 'adverse_action', label: 'Did you get adverse action notice?', type: 'radio', options: ['Yes', 'No'], required: true },
      { id: 'error_responsible', label: 'Which error caused this?', type: 'text', required: true },
      { id: 'financial_impact', label: 'Financial Impact', type: 'currency', required: false, help_text: 'Higher rate offered, lost opportunity, etc.' },
    ],
  },

  {
    id: 'emotional-distress',
    title: 'Emotional Distress',
    description: 'How credit errors have affected your mental health',
    category: 'harm',
    icon: '😔',
    points_reward: 35,
    estimated_time: '10 minutes',
    fields: [
      { id: 'severity', label: 'Severity Level', type: 'select', options: ['Mild Stress', 'Moderate Anxiety', 'Severe Anxiety', 'Depression', 'Severe Depression'], required: true },
      { id: 'symptoms', label: 'Symptoms Experienced', type: 'multiselect', options: ['Sleep Problems', 'Anxiety Attacks', 'Loss of Appetite', 'Depression', 'Relationship Strain', 'Work Problems', 'Physical Symptoms'], required: true },
      { id: 'description', label: 'Describe Impact', type: 'textarea', placeholder: 'Be specific about how this affected your daily life', required: true },
      { id: 'medical_help', label: 'Sought medical help?', type: 'radio', options: ['Yes - Therapy', 'Yes - Medication', 'Yes - Both', 'No'], required: true },
      { id: 'duration', label: 'How long?', type: 'select', options: ['Days', 'Weeks', 'Months', '1+ Years'], required: true },
      { id: 'ongoing', label: 'Still experiencing?', type: 'radio', options: ['Yes', 'No'], required: true },
    ],
  },

  {
    id: 'financial-harm',
    title: 'Financial Harm',
    description: 'Quantify your financial losses',
    category: 'harm',
    icon: '💸',
    points_reward: 25,
    estimated_time: '8 minutes',
    fields: [
      { id: 'higher_interest', label: 'Higher interest paid', type: 'currency', required: false },
      { id: 'lost_opportunity', label: 'Lost opportunities', type: 'currency', required: false, help_text: 'Home purchase, business loan, etc.' },
      { id: 'fees_paid', label: 'Late fees/penalties', type: 'currency', required: false },
      { id: 'legal_costs', label: 'Legal costs', type: 'currency', required: false },
      { id: 'credit_monitoring', label: 'Credit monitoring/repair', type: 'currency', required: false },
      { id: 'other_costs', label: 'Other financial harm', type: 'currency', required: false },
      { id: 'total_estimate', label: 'Total Estimated Loss', type: 'currency', required: true },
      { id: 'documentation', label: 'Have documentation?', type: 'radio', options: ['Yes - Complete', 'Yes - Partial', 'No'], required: true },
    ],
  },

  {
    id: 'job-impact',
    title: 'Employment Impact',
    description: 'Job loss or denial due to credit errors',
    category: 'harm',
    icon: '💼',
    points_reward: 40,
    estimated_time: '7 minutes',
    fields: [
      { id: 'impact_type', label: 'What happened?', type: 'select', options: ['Job Offer Rescinded', 'Denied Promotion', 'Lost Security Clearance', 'Terminated', 'Denied Job'], required: true },
      { id: 'employer', label: 'Company Name', type: 'text', required: true },
      { id: 'date', label: 'When?', type: 'date', required: true },
      { id: 'reason_given', label: 'Reason Given', type: 'textarea', required: true },
      { id: 'salary_loss', label: 'Annual Salary Lost', type: 'currency', required: false },
      { id: 'found_other_job', label: 'Found other employment?', type: 'radio', options: ['Yes - Lower Pay', 'Yes - Same Pay', 'No'], required: true },
      { id: 'fcra_notice', label: 'Did they follow FCRA procedures?', type: 'radio', options: ['Yes', 'No', 'Not Sure'], required: true },
    ],
  },

  {
    id: 'housing-impact',
    title: 'Housing Impact',
    description: 'Rental denials or housing issues',
    category: 'harm',
    icon: '🏠',
    points_reward: 35,
    estimated_time: '6 minutes',
    fields: [
      { id: 'impact_type', label: 'What happened?', type: 'select', options: ['Rental Denied', 'Higher Deposit Required', 'Eviction', 'Can\'t Refinance', 'Lost Home'], required: true },
      { id: 'property', label: 'Property/Landlord', type: 'text', required: true },
      { id: 'date', label: 'When?', type: 'date', required: true },
      { id: 'financial_impact', label: 'Financial Impact', type: 'currency', required: false, help_text: 'Higher rent, extra deposit, moving costs, etc.' },
      { id: 'adverse_action', label: 'Got adverse action notice?', type: 'radio', options: ['Yes', 'No'], required: true },
      { id: 'current_situation', label: 'Current Housing Status', type: 'select', options: ['Homeless', 'Staying with Family/Friends', 'Found More Expensive Place', 'Still Looking', 'Resolved'], required: true },
    ],
  },

  // ========================================================================
  // BUREAU BEHAVIOR FORMS (16-20)
  // ========================================================================
  {
    id: 'frivolous-claim',
    title: 'Frivolous Dispute Claim',
    description: 'Bureau called your legitimate dispute frivolous',
    category: 'bureau',
    icon: '🎭',
    points_reward: 50,
    estimated_time: '8 minutes',
    fields: [
      { id: 'bureau', label: 'Which bureau?', type: 'select', options: ['TransUnion', 'Equifax', 'Experian'], required: true },
      { id: 'dispute_date', label: 'Dispute Date', type: 'date', required: true },
      { id: 'items_disputed', label: 'How many items?', type: 'number', required: true },
      { id: 'evidence_sent', label: 'Evidence sent?', type: 'radio', options: ['Yes - Detailed', 'Yes - Some', 'No'], required: true },
      { id: 'their_reason', label: 'Their reason for frivolous claim', type: 'textarea', required: true },
      { id: 'legitimate_reason', label: 'Why was it legitimate?', type: 'textarea', required: true },
      { id: 'previously_disputed', label: 'Disputed same items before?', type: 'radio', options: ['Yes - Same Items', 'Yes - Different Items', 'No - First Time'], required: true },
    ],
  },

  {
    id: 'slow-investigation',
    title: 'Delayed Investigation',
    description: 'Bureau took longer than 30 days',
    category: 'bureau',
    icon: '🐌',
    points_reward: 30,
    estimated_time: '5 minutes',
    fields: [
      { id: 'bureau', label: 'Which bureau?', type: 'select', options: ['TransUnion', 'Equifax', 'Experian'], required: true },
      { id: 'mailed_date', label: 'When did they receive it?', type: 'date', required: true, help_text: 'Date on return receipt' },
      { id: 'response_date', label: 'When did they respond?', type: 'date', required: false },
      { id: 'days_taken', label: 'Total days', type: 'number', required: true },
      { id: 'certified_mail', label: 'Sent certified mail?', type: 'radio', options: ['Yes - Have Receipt', 'Yes - No Receipt', 'No'], required: true },
      { id: 'followed_up', label: 'Did you follow up?', type: 'radio', options: ['Yes', 'No'], required: true },
    ],
  },

  {
    id: 'bureau-no-response',
    title: 'No Response From Bureau',
    description: 'Bureau never responded to your dispute',
    category: 'bureau',
    icon: '👻',
    points_reward: 45,
    estimated_time: '6 minutes',
    fields: [
      { id: 'bureau', label: 'Which bureau?', type: 'select', options: ['TransUnion', 'Equifax', 'Experian'], required: true },
      { id: 'mailed_date', label: 'Mail date', type: 'date', required: true },
      { id: 'certified_mail', label: 'Certified mail?', type: 'radio', options: ['Yes - Have Receipt', 'Yes - Lost Receipt', 'No'], required: true },
      { id: 'days_waiting', label: 'Days waiting', type: 'number', required: true },
      { id: 'followed_up', label: 'Followed up?', type: 'multiselect', options: ['Phone Call', 'Another Letter', 'Online Portal', 'Haven\'t Yet'], required: true },
      { id: 'items_disputed', label: 'Number of items', type: 'number', required: true },
    ],
  },

  {
    id: 'reinsertion',
    title: 'Deleted Item Re-inserted',
    description: 'Bureau put back item they already deleted',
    category: 'bureau',
    icon: '🔄',
    points_reward: 40,
    estimated_time: '7 minutes',
    fields: [
      { id: 'bureau', label: 'Which bureau?', type: 'select', options: ['TransUnion', 'Equifax', 'Experian'], required: true },
      { id: 'original_deletion', label: 'When was it deleted?', type: 'date', required: true },
      { id: 'reappeared_date', label: 'When did it reappear?', type: 'date', required: true },
      { id: 'notification', label: 'Did they notify you?', type: 'radio', options: ['Yes', 'No'], required: true },
      { id: 'creditor_name', label: 'Creditor', type: 'text', required: true },
      { id: 'same_or_different', label: 'Same info or different?', type: 'select', options: ['Exact Same', 'Slightly Different', 'Very Different'], required: true },
    ],
  },

  {
    id: 'bureau-retaliation',
    title: 'Bureau Retaliation',
    description: 'Bureau seems to be retaliating against you',
    category: 'bureau',
    icon: '⚔️',
    points_reward: 60,
    estimated_time: '10 minutes',
    fields: [
      { id: 'bureau', label: 'Which bureau?', type: 'select', options: ['TransUnion', 'Equifax', 'Experian'], required: true },
      { id: 'retaliation_type', label: 'Type of retaliation', type: 'multiselect', options: ['Called disputes frivolous', 'Added negative items', 'Delayed investigations', 'Ignored evidence', 'Harassment', 'Other'], required: true },
      { id: 'timeline', label: 'Describe timeline', type: 'textarea', required: true },
      { id: 'filed_cfpb', label: 'Filed CFPB complaint?', type: 'radio', options: ['Yes', 'No'], required: true },
      { id: 'considering_lawsuit', label: 'Considering lawsuit?', type: 'radio', options: ['Yes', 'No', 'Not Sure'], required: true },
    ],
  },

  // ========================================================================
  // LAWSUIT PREPARATION FORMS (21-25)
  // ========================================================================
  {
    id: 'lawsuit-interest',
    title: 'Interested in Suing',
    description: 'You\'re considering filing a lawsuit',
    category: 'lawsuit',
    icon: '⚖️',
    points_reward: 100,
    estimated_time: '15 minutes',
    fields: [
      { id: 'defendants', label: 'Who would you sue?', type: 'multiselect', options: ['TransUnion', 'Equifax', 'Experian', 'Creditor/Furnisher', 'Collection Agency', 'Other'], required: true },
      { id: 'violation_types', label: 'Types of violations', type: 'multiselect', options: ['§1681e(b) Inaccuracy', '§1681i Failed Investigation', '§1681s-2 Furnisher', 'Metro 2 Omissions', 'FDCPA', 'Other'], required: true },
      { id: 'pro_se_or_lawyer', label: 'How would you sue?', type: 'select', options: ['Pro Se (Myself)', 'With Lawyer', 'Not Sure'], required: true },
      { id: 'disputed_already', label: 'Already disputed?', type: 'radio', options: ['Yes - Multiple Times', 'Yes - Once', 'No'], required: true },
      { id: 'cfpb_filed', label: 'Filed CFPB complaint?', type: 'radio', options: ['Yes', 'No'], required: true },
      { id: 'total_damages', label: 'Estimated total damages', type: 'currency', required: false },
      { id: 'documentation', label: 'Documentation level', type: 'select', options: ['Excellent - Everything', 'Good - Most Things', 'Some - Need More', 'Minimal'], required: true },
      { id: 'timeline', label: 'When would you file?', type: 'select', options: ['ASAP', '1-3 Months', '3-6 Months', 'Not Sure'], required: true },
      { id: 'location', label: 'Your State', type: 'text', required: true },
      { id: 'need_lawyer', label: 'Need lawyer referral?', type: 'radio', options: ['Yes', 'No', 'Maybe'], required: true },
    ],
  },

  {
    id: 'active-lawsuit',
    title: 'Active Lawsuit',
    description: 'You already filed a lawsuit',
    category: 'lawsuit',
    icon: '📋',
    points_reward: 150,
    estimated_time: '12 minutes',
    fields: [
      { id: 'case_number', label: 'Case Number', type: 'text', required: false },
      { id: 'court', label: 'Court', type: 'text', required: true },
      { id: 'filing_date', label: 'Filing Date', type: 'date', required: true },
      { id: 'defendants', label: 'Defendants', type: 'multiselect', options: ['TransUnion', 'Equifax', 'Experian', 'Creditor', 'Other'], required: true },
      { id: 'claims', label: 'Claims', type: 'multiselect', options: ['§1681e(b)', '§1681i', '§1681s-2', 'FDCPA', 'State Law', 'Other'], required: true },
      { id: 'pro_se', label: 'Pro se?', type: 'radio', options: ['Yes', 'No - Have Lawyer'], required: true },
      { id: 'stage', label: 'Case Stage', type: 'select', options: ['Just Filed', 'Discovery', 'Motion Practice', 'Trial Scheduled', 'Settled', 'Judgment'], required: true },
      { id: 'need_help', label: 'Need help?', type: 'radio', options: ['Yes', 'No'], required: true },
    ],
  },

  {
    id: 'settlement-offer',
    title: 'Settlement Offer Received',
    description: 'Bureau/creditor offered to settle',
    category: 'lawsuit',
    icon: '🤝',
    points_reward: 75,
    estimated_time: '8 minutes',
    fields: [
      { id: 'from_who', label: 'Settlement offer from', type: 'text', required: true },
      { id: 'amount', label: 'Settlement Amount', type: 'currency', required: true },
      { id: 'terms', label: 'Terms', type: 'textarea', required: true },
      { id: 'deadline', label: 'Response deadline', type: 'date', required: false },
      { id: 'original_claim', label: 'Your original claim', type: 'currency', required: false },
      { id: 'considering', label: 'Will you accept?', type: 'select', options: ['Yes', 'No', 'Negotiating', 'Not Sure'], required: true },
      { id: 'need_advice', label: 'Need advice?', type: 'radio', options: ['Yes', 'No'], required: true },
    ],
  },

  {
    id: 'discovery-help',
    title: 'Discovery Assistance',
    description: 'Need help with discovery phase',
    category: 'lawsuit',
    icon: '📂',
    points_reward: 50,
    estimated_time: '10 minutes',
    fields: [
      { id: 'case_number', label: 'Case Number', type: 'text', required: false },
      { id: 'discovery_type', label: 'Discovery Type', type: 'multiselect', options: ['Interrogatories', 'Requests for Production', 'Requests for Admission', 'Depositions'], required: true },
      { id: 'help_needed', label: 'What help do you need?', type: 'textarea', required: true },
      { id: 'deadline', label: 'Deadline', type: 'date', required: false },
      { id: 'defendant', label: 'Defendant', type: 'text', required: true },
    ],
  },

  {
    id: 'judgment-won',
    title: 'Judgment Won',
    description: 'You won your case!',
    category: 'lawsuit',
    icon: '🏆',
    points_reward: 200,
    estimated_time: '10 minutes',
    fields: [
      { id: 'case_number', label: 'Case Number', type: 'text', required: false },
      { id: 'judgment_date', label: 'Judgment Date', type: 'date', required: true },
      { id: 'defendant', label: 'Defendant', type: 'text', required: true },
      { id: 'award_amount', label: 'Award Amount', type: 'currency', required: true },
      { id: 'damages_breakdown', label: 'Damages Breakdown', type: 'textarea', required: true },
      { id: 'attorney_fees', label: 'Attorney Fees Awarded', type: 'currency', required: false },
      { id: 'pro_se', label: 'Pro Se?', type: 'radio', options: ['Yes', 'No'], required: true },
      { id: 'share_story', label: 'Can we share your story?', type: 'radio', options: ['Yes - Public', 'Yes - Anonymous', 'No'], required: true },
    ],
  },

  // ========================================================================
  // GENERAL FORMS (26-30)
  // ========================================================================
  {
    id: 'general-violations',
    title: 'General Violations Report',
    description: 'Multiple violations or complex situation',
    category: 'general',
    icon: '📝',
    points_reward: 50,
    estimated_time: '15 minutes',
    fields: [
      { id: 'bureaus', label: 'Bureaus Involved', type: 'multiselect', options: ['TransUnion', 'Equifax', 'Experian', 'Innovis'], required: true },
      { id: 'violation_count', label: 'Number of violations', type: 'number', required: true },
      { id: 'summary', label: 'Summary of issues', type: 'textarea', required: true },
      { id: 'timeline', label: 'Timeline', type: 'textarea', required: true },
      { id: 'actions_taken', label: 'Actions taken so far', type: 'textarea', required: true },
      { id: 'documentation', label: 'Documentation available', type: 'textarea', required: true },
    ],
  },

  {
    id: 'covid-impact',
    title: 'COVID-19 CARES Act Issues',
    description: 'Deferment or forbearance reporting problems',
    category: 'general',
    icon: '🦠',
    points_reward: 35,
    estimated_time: '8 minutes',
    fields: [
      { id: 'loan_type', label: 'Loan Type', type: 'multiselect', options: ['Federal Student Loan', 'Private Student Loan', 'Mortgage', 'Auto Loan', 'Other'], required: true },
      { id: 'servicer', label: 'Servicer/Lender', type: 'text', required: true },
      { id: 'deferment_dates', label: 'Deferment Period', type: 'text', required: true },
      { id: 'reporting_issue', label: 'Reporting Issue', type: 'select', options: ['Showing as Delinquent', 'Missing Deferment Code', 'Wrong Balance', 'Not Showing Forbearance', 'Other'], required: true },
      { id: 'documentation', label: 'Have CARES Act documentation?', type: 'radio', options: ['Yes', 'No'], required: true },
    ],
  },

  {
    id: 'identity-theft',
    title: 'Identity Theft Report',
    description: 'Fraudulent accounts from identity theft',
    category: 'general',
    icon: '🚨',
    points_reward: 60,
    estimated_time: '12 minutes',
    fields: [
      { id: 'discovered_date', label: 'When discovered?', type: 'date', required: true },
      { id: 'num_accounts', label: 'Fraudulent accounts', type: 'number', required: true },
      { id: 'total_fraud_amount', label: 'Total fraud amount', type: 'currency', required: false },
      { id: 'police_report', label: 'Filed police report?', type: 'radio', options: ['Yes', 'No', 'In Progress'], required: true },
      { id: 'ftc_report', label: 'Filed FTC report?', type: 'radio', options: ['Yes', 'No'], required: true },
      { id: 'credit_freeze', label: 'Placed credit freeze?', type: 'radio', options: ['Yes - All Bureaus', 'Yes - Some Bureaus', 'No'], required: true },
      { id: 'suspect_known', label: 'Know who did it?', type: 'radio', options: ['Yes', 'No', 'Suspect'], required: true },
      { id: 'bureaus_notified', label: 'Notified bureaus?', type: 'multiselect', options: ['TransUnion', 'Equifax', 'Experian', 'Haven\'t Yet'], required: true },
    ],
  },

  {
    id: 'bankruptcy',
    title: 'Bankruptcy Reporting Issues',
    description: 'Problems with bankruptcy on credit report',
    category: 'general',
    icon: '⚖️',
    points_reward: 40,
    estimated_time: '8 minutes',
    fields: [
      { id: 'chapter', label: 'Chapter', type: 'select', options: ['Chapter 7', 'Chapter 11', 'Chapter 13'], required: true },
      { id: 'filing_date', label: 'Filing Date', type: 'date', required: true },
      { id: 'discharge_date', label: 'Discharge Date', type: 'date', required: false },
      { id: 'issue_type', label: 'Issue', type: 'multiselect', options: ['Still Reporting Discharged Debts', 'Wrong Discharge Date', 'Showing Wrong Chapter', 'Should Be Deleted (10 years passed)', 'Other'], required: true },
      { id: 'accounts_affected', label: 'Number of accounts', type: 'number', required: false },
      { id: 'bureaus', label: 'Which bureaus?', type: 'multiselect', options: ['TransUnion', 'Equifax', 'Experian'], required: true },
    ],
  },

  {
    id: 'success-story',
    title: 'Share Your Victory',
    description: 'You got items deleted or won your case!',
    category: 'general',
    icon: '🎉',
    points_reward: 100,
    estimated_time: '10 minutes',
    fields: [
      { id: 'victory_type', label: 'Type of Victory', type: 'select', options: ['Items Deleted', 'Lawsuit Won', 'Settlement Reached', 'Bureau Apologized', 'Other'], required: true },
      { id: 'defendant', label: 'Who did you fight?', type: 'multiselect', options: ['TransUnion', 'Equifax', 'Experian', 'Creditor', 'Collection Agency'], required: true },
      { id: 'items_deleted', label: 'Items deleted', type: 'number', required: false },
      { id: 'award_amount', label: 'Settlement/Award', type: 'currency', required: false },
      { id: 'story', label: 'Your Story', type: 'textarea', placeholder: 'Tell us what happened!', required: true },
      { id: 'tools_used', label: 'Knight Tools Used', type: 'multiselect', options: ['Scanner', 'Dispute', 'Tracker', 'Decoder', 'Vault', 'Community', 'Academy'], required: false },
      { id: 'share_public', label: 'Share publicly?', type: 'select', options: ['Yes - Full Name', 'Yes - First Name Only', 'Yes - Anonymous', 'No'], required: true },
    ],
  },

  // ========================================================================
  // CREDITOR-SPECIFIC FORMS (31-35)
  // ========================================================================
  {
    id: 'student-loan-servicer',
    title: 'Student Loan Servicer Violations',
    description: 'Issues with Navient, Nelnet, Great Lakes, etc.',
    category: 'creditor',
    icon: '🎓',
    points_reward: 35,
    estimated_time: '8 minutes',
    fields: [
      { id: 'servicer', label: 'Servicer Name', type: 'select', options: ['Navient', 'Nelnet', 'Great Lakes', 'MOHELA', 'Aidvantage', 'EdFinancial', 'Other'], required: true },
      { id: 'violation_type', label: 'Violation Type', type: 'multiselect', options: ['Wrong Deferment Status', 'Missing CARES Act Relief', 'Incorrect Balance', 'Wrong Payment Status', 'Harassment', 'Other'], required: true },
      { id: 'loan_type', label: 'Loan Type', type: 'select', options: ['Federal Direct', 'Federal FFEL', 'Private', 'Perkins', 'PLUS'], required: true },
      { id: 'amount_affected', label: 'Amount Affected', type: 'currency', required: false },
      { id: 'contacted_servicer', label: 'Contacted servicer?', type: 'radio', options: ['Yes', 'No'], required: true },
      { id: 'their_response', label: 'Their Response', type: 'textarea', required: false },
    ],
  },

  {
    id: 'credit-card-company',
    title: 'Credit Card Company Issues',
    description: 'Problems with Capital One, Chase, Discover, etc.',
    category: 'creditor',
    icon: '💳',
    points_reward: 30,
    estimated_time: '7 minutes',
    fields: [
      { id: 'card_company', label: 'Card Company', type: 'select', options: ['Capital One', 'Chase', 'Bank of America', 'Discover', 'Citi', 'American Express', 'Other'], required: true },
      { id: 'issue_type', label: 'Issue Type', type: 'multiselect', options: ['Wrong Balance', 'Unauthorized Charges', 'Late Fees Disputed', 'Credit Limit Wrong', 'Fraudulent Account', 'Other'], required: true },
      { id: 'account_number_last4', label: 'Last 4 of Account', type: 'text', required: false },
      { id: 'disputed_with_company', label: 'Disputed with company?', type: 'radio', options: ['Yes', 'No'], required: true },
      { id: 'outcome', label: 'Outcome', type: 'textarea', required: false },
    ],
  },

  {
    id: 'collection-agency',
    title: 'Collection Agency Violations',
    description: 'FDCPA violations, harassment, wrong amounts',
    category: 'creditor',
    icon: '📞',
    points_reward: 40,
    estimated_time: '9 minutes',
    fields: [
      { id: 'agency_name', label: 'Collection Agency', type: 'text', required: true },
      { id: 'original_creditor', label: 'Original Creditor', type: 'text', required: false },
      { id: 'fdcpa_violations', label: 'FDCPA Violations', type: 'multiselect', options: ['Harassment', 'Called After Cease & Desist', 'Called Employer', 'Threatened Illegal Action', 'False Statements', 'Reported Before Validation', 'Other'], required: true },
      { id: 'debt_amount', label: 'Claimed Debt Amount', type: 'currency', required: false },
      { id: 'debt_valid', label: 'Is debt valid?', type: 'radio', options: ['No', 'Partially', 'Yes but Wrong Amount', 'Not Sure'], required: true },
      { id: 'validation_sent', label: 'Sent validation request?', type: 'radio', options: ['Yes', 'No'], required: true },
      { id: 'harassment_details', label: 'Harassment Details', type: 'textarea', required: false },
    ],
  },

  {
    id: 'auto-lender',
    title: 'Auto Lender Reporting Errors',
    description: 'Issues with auto loan reporting',
    category: 'creditor',
    icon: '🚗',
    points_reward: 25,
    estimated_time: '6 minutes',
    fields: [
      { id: 'lender', label: 'Lender Name', type: 'text', required: true },
      { id: 'error_type', label: 'Error Type', type: 'multiselect', options: ['Wrong Balance', 'Wrong Payment Status', 'Showing Repo (but not repod)', 'Not Showing Payments', 'Wrong Open Date', 'Other'], required: true },
      { id: 'vehicle', label: 'Vehicle', type: 'text', placeholder: 'Year, make, model', required: false },
      { id: 'loan_balance', label: 'Actual Loan Balance', type: 'currency', required: false },
      { id: 'reported_balance', label: 'Reported Balance', type: 'currency', required: false },
    ],
  },

  {
    id: 'mortgage-lender',
    title: 'Mortgage Lender Issues',
    description: 'Problems with mortgage reporting',
    category: 'creditor',
    icon: '🏠',
    points_reward: 35,
    estimated_time: '8 minutes',
    fields: [
      { id: 'lender', label: 'Mortgage Lender', type: 'text', required: true },
      { id: 'issue', label: 'Issue', type: 'multiselect', options: ['Wrong Balance', 'Not Showing Modification', 'Not Showing Forbearance', 'Wrong Payment Status', 'Foreclosure Status Wrong', 'Other'], required: true },
      { id: 'mortgage_type', label: 'Mortgage Type', type: 'select', options: ['Conventional', 'FHA', 'VA', 'USDA', 'Other'], required: false },
      { id: 'in_modification', label: 'In loan modification?', type: 'radio', options: ['Yes', 'No'], required: false },
      { id: 'in_forbearance', label: 'In forbearance?', type: 'radio', options: ['Yes', 'No'], required: false },
    ],
  },

  // ========================================================================
  // STATE-SPECIFIC FORMS (36-40)
  // ========================================================================
  {
    id: 'california-specific',
    title: 'California Consumer Rights',
    description: 'CA-specific credit violations (CCPA, state law)',
    category: 'general',
    icon: '🌴',
    points_reward: 30,
    estimated_time: '7 minutes',
    fields: [
      { id: 'violation_type', label: 'CA Violation Type', type: 'multiselect', options: ['CCPA Data Rights', 'Rosenthal Act', 'Song-Beverly Act', 'CA Civil Code 1785', 'Other'], required: true },
      { id: 'defendant', label: 'Who violated?', type: 'text', required: true },
      { id: 'details', label: 'Details', type: 'textarea', required: true },
      { id: 'damages', label: 'Estimated Damages', type: 'currency', required: false },
    ],
  },

  {
    id: 'new-york-specific',
    title: 'New York Consumer Rights',
    description: 'NY-specific credit violations',
    category: 'general',
    icon: '🗽',
    points_reward: 30,
    estimated_time: '7 minutes',
    fields: [
      { id: 'violation_type', label: 'NY Violation Type', type: 'multiselect', options: ['NY GBL § 380-j', 'NY DFS Regulations', 'NYC Consumer Protection', 'Other'], required: true },
      { id: 'defendant', label: 'Who violated?', type: 'text', required: true },
      { id: 'details', label: 'Details', type: 'textarea', required: true },
    ],
  },

  {
    id: 'texas-specific',
    title: 'Texas Consumer Rights',
    description: 'TX-specific credit violations (DTPA)',
    category: 'general',
    icon: '🤠',
    points_reward: 30,
    estimated_time: '7 minutes',
    fields: [
      { id: 'violation_type', label: 'TX Violation Type', type: 'multiselect', options: ['DTPA', 'TX Finance Code', 'TX Debt Collection Act', 'Other'], required: true },
      { id: 'defendant', label: 'Who violated?', type: 'text', required: true },
      { id: 'details', label: 'Details', type: 'textarea', required: true },
    ],
  },

  {
    id: 'florida-specific',
    title: 'Florida Consumer Rights',
    description: 'FL-specific credit violations',
    category: 'general',
    icon: '🌊',
    points_reward: 30,
    estimated_time: '7 minutes',
    fields: [
      { id: 'violation_type', label: 'FL Violation Type', type: 'multiselect', options: ['FL Consumer Collection Practices Act', 'FL Credit Reporting Statutes', 'Other'], required: true },
      { id: 'defendant', label: 'Who violated?', type: 'text', required: true },
      { id: 'details', label: 'Details', type: 'textarea', required: true },
    ],
  },

  {
    id: 'illinois-specific',
    title: 'Illinois Consumer Rights',
    description: 'IL-specific credit violations',
    category: 'general',
    icon: '🏙️',
    points_reward: 30,
    estimated_time: '7 minutes',
    fields: [
      { id: 'violation_type', label: 'IL Violation Type', type: 'multiselect', options: ['IL Consumer Fraud Act', 'IL Collection Agency Act', 'Other'], required: true },
      { id: 'defendant', label: 'Who violated?', type: 'text', required: true },
      { id: 'details', label: 'Details', type: 'textarea', required: true },
    ],
  },

  // ========================================================================
  // ADVANCED HARM FORMS (41-45)
  // ========================================================================
  {
    id: 'relationship-harm',
    title: 'Relationship & Family Harm',
    description: 'How credit errors hurt relationships',
    category: 'harm',
    icon: '💔',
    points_reward: 40,
    estimated_time: '10 minutes',
    fields: [
      { id: 'relationship_type', label: 'Affected Relationship', type: 'multiselect', options: ['Marriage/Partnership', 'Family', 'Friends', 'Dating', 'Business Partnerships'], required: true },
      { id: 'impact_description', label: 'How It Affected Relationship', type: 'textarea', required: true },
      { id: 'separated_divorced', label: 'Led to separation/divorce?', type: 'radio', options: ['Yes', 'No', 'Contributing Factor'], required: false },
      { id: 'counseling', label: 'Sought relationship counseling?', type: 'radio', options: ['Yes', 'No'], required: false },
      { id: 'financial_arguments', label: 'Caused financial arguments?', type: 'radio', options: ['Yes - Frequent', 'Yes - Occasional', 'No'], required: true },
    ],
  },

  {
    id: 'business-harm',
    title: 'Business & Career Harm',
    description: 'Business opportunities lost due to credit',
    category: 'harm',
    icon: '💼',
    points_reward: 45,
    estimated_time: '9 minutes',
    fields: [
      { id: 'harm_type', label: 'Type of Business Harm', type: 'multiselect', options: ['Business Loan Denied', 'Partnership Lost', 'Vendor Credit Denied', 'Business License Denied', 'Franchising Denied', 'Investment Opportunity Lost'], required: true },
      { id: 'business_type', label: 'Business Type', type: 'text', required: false },
      { id: 'lost_revenue', label: 'Estimated Lost Revenue', type: 'currency', required: false },
      { id: 'business_failed', label: 'Did business fail?', type: 'radio', options: ['Yes', 'No', 'Still Struggling'], required: false },
    ],
  },

  {
    id: 'medical-impact',
    title: 'Medical & Health Impact',
    description: 'Physical health issues from credit stress',
    category: 'harm',
    icon: '🏥',
    points_reward: 45,
    estimated_time: '10 minutes',
    fields: [
      { id: 'medical_issues', label: 'Medical Issues', type: 'multiselect', options: ['High Blood Pressure', 'Heart Problems', 'Panic Attacks', 'Insomnia', 'Migraines', 'Stomach Issues', 'Other'], required: true },
      { id: 'doctor_visits', label: 'Doctor visits related?', type: 'number', required: false },
      { id: 'medication', label: 'Started medication?', type: 'radio', options: ['Yes', 'No'], required: false },
      { id: 'hospitalization', label: 'Hospitalization required?', type: 'radio', options: ['Yes', 'No'], required: false },
      { id: 'medical_costs', label: 'Medical costs', type: 'currency', required: false },
    ],
  },

  {
    id: 'military-harm',
    title: 'Military Service Impact',
    description: 'Credit issues affecting service members',
    category: 'harm',
    icon: '🎖️',
    points_reward: 50,
    estimated_time: '8 minutes',
    fields: [
      { id: 'branch', label: 'Military Branch', type: 'select', options: ['Army', 'Navy', 'Air Force', 'Marines', 'Coast Guard', 'Space Force', 'National Guard', 'Reserves'], required: true },
      { id: 'impact_type', label: 'Impact Type', type: 'multiselect', options: ['Security Clearance Issues', 'Promotion Denied', 'Deployment Stress', 'Family Separation Made Worse', 'SCRA Violations', 'MLA Violations'], required: true },
      { id: 'clearance_affected', label: 'Security clearance affected?', type: 'radio', options: ['Yes - Denied', 'Yes - Revoked', 'Yes - Delayed', 'No'], required: false },
      { id: 'career_impact', label: 'Career Impact', type: 'textarea', required: true },
    ],
  },

  {
    id: 'education-harm',
    title: 'Education Impact',
    description: 'How credit errors affected education',
    category: 'harm',
    icon: '🎓',
    points_reward: 35,
    estimated_time: '7 minutes',
    fields: [
      { id: 'impact_type', label: 'Education Impact', type: 'multiselect', options: ['Student Loans Denied', 'Had to Drop Out', 'Couldn\'t Attend Grad School', 'Lost Scholarship', 'Financial Aid Problems'], required: true },
      { id: 'school_name', label: 'School Name', type: 'text', required: false },
      { id: 'amount_affected', label: 'Financial Impact', type: 'currency', required: false },
      { id: 'completed_degree', label: 'Able to complete degree?', type: 'radio', options: ['Yes - Eventually', 'No', 'Still Trying'], required: false },
    ],
  },

  // ========================================================================
  // ADVANCED LAWSUIT FORMS (46-50)
  // ========================================================================
  {
    id: 'class-action-interest',
    title: 'Class Action Interest',
    description: 'Want to join or start a class action',
    category: 'lawsuit',
    icon: '👥',
    points_reward: 100,
    estimated_time: '12 minutes',
    fields: [
      { id: 'defendant', label: 'Against Who?', type: 'multiselect', options: ['TransUnion', 'Equifax', 'Experian', 'Specific Creditor', 'Collection Agency'], required: true },
      { id: 'violation_type', label: 'Violation Pattern', type: 'textarea', placeholder: 'Describe the systematic pattern', required: true },
      { id: 'num_affected', label: 'How many people affected (estimate)?', type: 'select', options: ['Just Me', '10-100', '100-1000', '1000+', 'Don\'t Know'], required: true },
      { id: 'role_preference', label: 'Your Role', type: 'select', options: ['Named Plaintiff', 'Class Member', 'Either'], required: true },
      { id: 'have_lawyer', label: 'Have class action lawyer?', type: 'radio', options: ['Yes', 'No', 'Looking'], required: true },
      { id: 'jurisdiction', label: 'Preferred State', type: 'text', required: true },
    ],
  },

  {
    id: 'appeal-help',
    title: 'Appeal Assistance',
    description: 'Need help appealing a loss',
    category: 'lawsuit',
    icon: '⚖️',
    points_reward: 75,
    estimated_time: '10 minutes',
    fields: [
      { id: 'case_number', label: 'Case Number', type: 'text', required: false },
      { id: 'decision_date', label: 'Decision Date', type: 'date', required: true },
      { id: 'reason_lost', label: 'Why did you lose?', type: 'textarea', required: true },
      { id: 'appeal_deadline', label: 'Appeal Deadline', type: 'date', required: false },
      { id: 'pro_se', label: 'Representing yourself?', type: 'radio', options: ['Yes', 'No'], required: true },
      { id: 'help_needed', label: 'What help do you need?', type: 'textarea', required: true },
    ],
  },

  {
    id: 'arbitration-forced',
    title: 'Forced Arbitration Clause',
    description: 'Dealing with arbitration agreement',
    category: 'lawsuit',
    icon: '📜',
    points_reward: 60,
    estimated_time: '8 minutes',
    fields: [
      { id: 'company', label: 'Company with Arbitration Clause', type: 'text', required: true },
      { id: 'clause_valid', label: 'Believe clause is valid?', type: 'radio', options: ['Yes', 'No - Unconscionable', 'Not Sure'], required: true },
      { id: 'want_to_challenge', label: 'Want to challenge it?', type: 'radio', options: ['Yes', 'No - Will Arbitrate', 'Not Sure'], required: true },
      { id: 'arbitration_forum', label: 'Arbitration Forum', type: 'text', placeholder: 'AAA, JAMS, etc.', required: false },
    ],
  },

  {
    id: 'pro-se-support',
    title: 'Pro Se Support Request',
    description: 'Representing yourself and need guidance',
    category: 'lawsuit',
    icon: '📖',
    points_reward: 40,
    estimated_time: '8 minutes',
    fields: [
      { id: 'case_stage', label: 'Case Stage', type: 'select', options: ['Planning to File', 'Just Filed', 'Discovery', 'Motion Practice', 'Pre-Trial', 'Trial'], required: true },
      { id: 'specific_help', label: 'Specific Help Needed', type: 'multiselect', options: ['Drafting Complaint', 'Discovery Requests', 'Responding to Motions', 'Evidence Organization', 'Trial Prep', 'Settlement Negotiation'], required: true },
      { id: 'court_type', label: 'Court Type', type: 'select', options: ['Small Claims', 'District Court', 'Superior Court', 'Federal Court'], required: true },
      { id: 'urgent', label: 'Is this urgent?', type: 'radio', options: ['Yes - Deadline Soon', 'Somewhat', 'No'], required: true },
    ],
  },

  {
    id: 'expert-witness-need',
    title: 'Expert Witness Request',
    description: 'Need credit expert for your case',
    category: 'lawsuit',
    icon: '🎓',
    points_reward: 80,
    estimated_time: '9 minutes',
    fields: [
      { id: 'case_number', label: 'Case Number', type: 'text', required: false },
      { id: 'expert_type', label: 'Expert Type Needed', type: 'multiselect', options: ['Credit Reporting Expert', 'FCRA Expert', 'Metro 2 Expert', 'Damages Expert', 'Credit Scoring Expert'], required: true },
      { id: 'trial_date', label: 'Trial Date', type: 'date', required: false },
      { id: 'budget', label: 'Budget for Expert', type: 'currency', required: false },
      { id: 'specific_issues', label: 'Specific Issues', type: 'textarea', required: true },
    ],
  },
];

// Helper functions
export function getFormById(formId: string): KnightForm | undefined {
  return KNIGHT_FORMS.find(form => form.id === formId);
}

export function getFormsByCategory(category: KnightForm['category']): KnightForm[] {
  return KNIGHT_FORMS.filter(form => form.category === category);
}

export const TOTAL_KNIGHT_FORMS = KNIGHT_FORMS.length; // 50
