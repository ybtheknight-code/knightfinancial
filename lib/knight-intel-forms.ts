// ============================================================================
// KNIGHT INTEL - B2B DATA REQUEST FORMS
// 30 specialized forms for different data analysis needs
// ============================================================================

export interface KnightIntelForm {
  id: string;
  name: string;
  description: string;
  category: 'violation' | 'demographic' | 'geographic' | 'temporal' | 'bureau' | 'legal';
  fields: FormField[];
  requires_ceo_approval: boolean;
  estimated_cost: string;
}

export interface FormField {
  id: string;
  label: string;
  type: 'text' | 'select' | 'multiselect' | 'date' | 'number' | 'textarea';
  options?: string[];
  required: boolean;
}

export const KNIGHT_INTEL_FORMS: KnightIntelForm[] = [
  // ========================================================================
  // VIOLATION ANALYSIS FORMS (1-10)
  // ========================================================================
  {
    id: 'violation-pattern-analysis',
    name: 'Violation Pattern Analysis',
    description: 'Identify systemic violation patterns across specific bureaus, account types, or time periods',
    category: 'violation',
    requires_ceo_approval: true,
    estimated_cost: '$5,000 - $15,000',
    fields: [
      { id: 'bureau', label: 'Target Bureau(s)', type: 'multiselect', options: ['TransUnion', 'Equifax', 'Experian', 'Innovis'], required: true },
      { id: 'violation_types', label: 'Violation Types', type: 'multiselect', options: ['§1681e(b)', '§1681i', '§1681s-2', 'Metro 2', 'Permissible Purpose'], required: true },
      { id: 'date_range', label: 'Date Range', type: 'text', required: true },
      { id: 'account_types', label: 'Account Types', type: 'multiselect', options: ['Student Loans', 'Credit Cards', 'Auto Loans', 'Mortgages', 'Personal Loans'], required: false },
    ],
  },
  
  {
    id: 'metro2-omission-analysis',
    name: 'Metro 2 Field Omission Study',
    description: 'Comprehensive analysis of missing required Metro 2 fields (Miller case focus)',
    category: 'violation',
    requires_ceo_approval: true,
    estimated_cost: '$8,000 - $20,000',
    fields: [
      { id: 'bureaus', label: 'Bureau(s)', type: 'multiselect', options: ['TransUnion', 'Equifax', 'Experian'], required: true },
      { id: 'field_numbers', label: 'Target Field Numbers', type: 'text', required: true },
      { id: 'account_type', label: 'Account Type', type: 'select', options: ['Student Loans', 'Credit Cards', 'All'], required: true },
    ],
  },
  
  {
    id: 'reinvestigation-failure',
    name: 'Reinvestigation Failure Analysis',
    description: 'Track §1681i reinvestigation failures, response times, and outcomes',
    category: 'violation',
    requires_ceo_approval: true,
    estimated_cost: '$6,000 - $12,000',
    fields: [
      { id: 'bureau', label: 'Bureau', type: 'select', options: ['TransUnion', 'Equifax', 'Experian', 'All'], required: true },
      { id: 'dispute_method', label: 'Dispute Method', type: 'select', options: ['Mail', 'Online', 'Phone', 'All'], required: true },
      { id: 'outcome_focus', label: 'Focus On', type: 'select', options: ['Failures', 'Delayed', 'Frivolous Claims', 'All'], required: true },
    ],
  },
  
  {
    id: 'duplicate-account-analysis',
    name: 'Duplicate Account Reporting',
    description: 'Identify patterns in duplicate account reporting across bureaus',
    category: 'violation',
    requires_ceo_approval: false,
    estimated_cost: '$3,000 - $8,000',
    fields: [
      { id: 'bureau', label: 'Bureau', type: 'multiselect', options: ['TransUnion', 'Equifax', 'Experian'], required: true },
      { id: 'creditor_type', label: 'Creditor Type', type: 'select', options: ['All', 'Banks', 'Collection Agencies', 'Credit Cards'], required: false },
    ],
  },
  
  {
    id: 'unauthorized-inquiry',
    name: 'Unauthorized Inquiry Analysis',
    description: 'Track unauthorized hard inquiries and permissible purpose violations',
    category: 'violation',
    requires_ceo_approval: false,
    estimated_cost: '$4,000 - $10,000',
    fields: [
      { id: 'bureau', label: 'Bureau', type: 'multiselect', options: ['TransUnion', 'Equifax', 'Experian'], required: true },
      { id: 'inquiry_source', label: 'Inquiry Source Type', type: 'select', options: ['All', 'Auto', 'Credit Card', 'Employment', 'Other'], required: false },
    ],
  },
  
  {
    id: 'mixed-file-analysis',
    name: 'Mixed File Analysis',
    description: 'Study patterns in mixed credit files and identity confusion',
    category: 'violation',
    requires_ceo_approval: true,
    estimated_cost: '$7,000 - $15,000',
    fields: [
      { id: 'bureau', label: 'Bureau', type: 'multiselect', options: ['TransUnion', 'Equifax', 'Experian'], required: true },
      { id: 'name_similarity', label: 'Name Similarity Threshold', type: 'select', options: ['Exact', 'Similar', 'All'], required: true },
    ],
  },
  
  {
    id: 'outdated-info-analysis',
    name: 'Outdated Information Reporting',
    description: 'Track violations of 7-year deletion rules (§1681c)',
    category: 'violation',
    requires_ceo_approval: false,
    estimated_cost: '$3,500 - $9,000',
    fields: [
      { id: 'bureau', label: 'Bureau', type: 'select', options: ['TransUnion', 'Equifax', 'Experian', 'All'], required: true },
      { id: 'record_type', label: 'Record Type', type: 'select', options: ['All', 'Bankruptcy', 'Judgments', 'Collection', 'Late Payments'], required: true },
    ],
  },
  
  {
    id: 'balance-discrepancy',
    name: 'Balance Discrepancy Patterns',
    description: 'Analyze incorrect balance reporting across account types',
    category: 'violation',
    requires_ceo_approval: false,
    estimated_cost: '$4,500 - $11,000',
    fields: [
      { id: 'bureau', label: 'Bureau', type: 'multiselect', options: ['TransUnion', 'Equifax', 'Experian'], required: true },
      { id: 'account_type', label: 'Account Type', type: 'select', options: ['All', 'Student Loans', 'Credit Cards', 'Auto Loans'], required: true },
    ],
  },
  
  {
    id: 'status-code-errors',
    name: 'Account Status Code Errors',
    description: 'Track incorrect payment status and account status codes',
    category: 'violation',
    requires_ceo_approval: false,
    estimated_cost: '$3,000 - $7,500',
    fields: [
      { id: 'bureau', label: 'Bureau', type: 'select', options: ['TransUnion', 'Equifax', 'Experian', 'All'], required: true },
    ],
  },
  
  {
    id: 'furnisher-violations',
    name: 'Furnisher Violation Patterns',
    description: '§1681s-2 violation analysis by furnisher type',
    category: 'violation',
    requires_ceo_approval: true,
    estimated_cost: '$6,500 - $14,000',
    fields: [
      { id: 'furnisher_type', label: 'Furnisher Type', type: 'select', options: ['All', 'Banks', 'Collection Agencies', 'Auto Lenders', 'Student Loan Servicers'], required: true },
      { id: 'violation_focus', label: 'Focus Area', type: 'select', options: ['Reporting Accuracy', 'Investigation Response', 'All'], required: true },
    ],
  },
  
  // ========================================================================
  // DEMOGRAPHIC ANALYSIS FORMS (11-16)
  // ========================================================================
  {
    id: 'demographic-impact',
    name: 'Demographic Impact Analysis',
    description: 'Violation patterns across demographic groups (anonymized)',
    category: 'demographic',
    requires_ceo_approval: true,
    estimated_cost: '$10,000 - $25,000',
    fields: [
      { id: 'demographics', label: 'Demographic Factors', type: 'multiselect', options: ['Age Range', 'Income Level', 'Geographic', 'Education Level'], required: true },
      { id: 'violation_type', label: 'Violation Type', type: 'select', options: ['All', 'Specific'], required: true },
    ],
  },
  
  {
    id: 'income-impact',
    name: 'Income-Based Violation Analysis',
    description: 'How violations correlate with income levels',
    category: 'demographic',
    requires_ceo_approval: false,
    estimated_cost: '$5,000 - $12,000',
    fields: [
      { id: 'income_ranges', label: 'Income Ranges', type: 'multiselect', options: ['Under $25k', '$25k-$50k', '$50k-$75k', '$75k-$100k', 'Over $100k'], required: true },
    ],
  },
  
  {
    id: 'age-impact',
    name: 'Age-Based Pattern Analysis',
    description: 'Violation frequency across age groups',
    category: 'demographic',
    requires_ceo_approval: false,
    estimated_cost: '$4,500 - $10,000',
    fields: [
      { id: 'age_groups', label: 'Age Groups', type: 'multiselect', options: ['18-25', '26-35', '36-45', '46-55', '56-65', '65+'], required: true },
    ],
  },
  
  {
    id: 'employment-status',
    name: 'Employment Status Correlation',
    description: 'How employment status correlates with violation types',
    category: 'demographic',
    requires_ceo_approval: false,
    estimated_cost: '$3,500 - $8,000',
    fields: [
      { id: 'employment', label: 'Employment Types', type: 'multiselect', options: ['Employed', 'Unemployed', 'Self-Employed', 'Student', 'Retired'], required: true },
    ],
  },
  
  {
    id: 'education-impact',
    name: 'Education Level Analysis',
    description: 'Violation patterns by education level',
    category: 'demographic',
    requires_ceo_approval: false,
    estimated_cost: '$4,000 - $9,500',
    fields: [
      { id: 'education', label: 'Education Levels', type: 'multiselect', options: ['High School', 'Some College', 'Bachelors', 'Masters', 'Doctorate'], required: true },
    ],
  },
  
  {
    id: 'first-time-buyers',
    name: 'First-Time Buyer Impact',
    description: 'How violations affect first-time home/auto buyers',
    category: 'demographic',
    requires_ceo_approval: false,
    estimated_cost: '$5,500 - $12,000',
    fields: [
      { id: 'purchase_type', label: 'Purchase Type', type: 'select', options: ['Home', 'Auto', 'Both'], required: true },
    ],
  },
  
  // ========================================================================
  // GEOGRAPHIC ANALYSIS FORMS (17-22)
  // ========================================================================
  {
    id: 'state-by-state',
    name: 'State-by-State Violation Heatmap',
    description: 'Violation frequency and types by US state',
    category: 'geographic',
    requires_ceo_approval: false,
    estimated_cost: '$8,000 - $18,000',
    fields: [
      { id: 'states', label: 'Target States', type: 'multiselect', options: ['All', 'Specific States'], required: true },
      { id: 'metric', label: 'Primary Metric', type: 'select', options: ['Frequency', 'Severity', 'Financial Impact'], required: true },
    ],
  },
  
  {
    id: 'zip-code-analysis',
    name: 'ZIP Code Level Analysis',
    description: 'Granular analysis at ZIP code level',
    category: 'geographic',
    requires_ceo_approval: true,
    estimated_cost: '$12,000 - $30,000',
    fields: [
      { id: 'zip_codes', label: 'ZIP Code(s) or Range', type: 'text', required: true },
      { id: 'comparison_type', label: 'Comparison', type: 'select', options: ['National Average', 'State Average', 'Regional'], required: true },
    ],
  },
  
  {
    id: 'urban-rural',
    name: 'Urban vs Rural Analysis',
    description: 'Compare violation patterns urban/rural areas',
    category: 'geographic',
    requires_ceo_approval: false,
    estimated_cost: '$6,000 - $14,000',
    fields: [
      { id: 'area_type', label: 'Area Focus', type: 'select', options: ['Urban', 'Suburban', 'Rural', 'All'], required: true },
    ],
  },
  
  {
    id: 'regional-patterns',
    name: 'Regional Pattern Analysis',
    description: 'Violation patterns by US region (Northeast, South, etc.)',
    category: 'geographic',
    requires_ceo_approval: false,
    estimated_cost: '$7,500 - $16,000',
    fields: [
      { id: 'regions', label: 'Regions', type: 'multiselect', options: ['Northeast', 'Southeast', 'Midwest', 'Southwest', 'West'], required: true },
    ],
  },
  
  {
    id: 'county-analysis',
    name: 'County-Level Study',
    description: 'Detailed county-by-county analysis',
    category: 'geographic',
    requires_ceo_approval: false,
    estimated_cost: '$5,000 - $12,000',
    fields: [
      { id: 'counties', label: 'Target Counties', type: 'text', required: true },
      { id: 'state', label: 'State', type: 'select', options: ['Alabama', 'Alaska'], required: true },
    ],
  },
  
  {
    id: 'metro-area',
    name: 'Metropolitan Area Analysis',
    description: 'Focus on specific metro areas (NYC, LA, Chicago, etc.)',
    category: 'geographic',
    requires_ceo_approval: false,
    estimated_cost: '$8,500 - $19,000',
    fields: [
      { id: 'metro_areas', label: 'Metro Areas', type: 'multiselect', options: ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Other'], required: true },
    ],
  },
  
  // ========================================================================
  // TEMPORAL ANALYSIS FORMS (23-26)
  // ========================================================================
  {
    id: 'time-series',
    name: 'Time Series Violation Trends',
    description: 'Track violation frequency and severity over time',
    category: 'temporal',
    requires_ceo_approval: false,
    estimated_cost: '$9,000 - $20,000',
    fields: [
      { id: 'start_date', label: 'Start Date', type: 'date', required: true },
      { id: 'end_date', label: 'End Date', type: 'date', required: true },
      { id: 'granularity', label: 'Time Granularity', type: 'select', options: ['Daily', 'Weekly', 'Monthly', 'Quarterly'], required: true },
    ],
  },
  
  {
    id: 'seasonal-patterns',
    name: 'Seasonal Pattern Detection',
    description: 'Identify seasonal trends in violations or bureau behavior',
    category: 'temporal',
    requires_ceo_approval: false,
    estimated_cost: '$6,500 - $15,000',
    fields: [
      { id: 'years', label: 'Years to Analyze', type: 'multiselect', options: ['2023', '2024', '2025'], required: true },
    ],
  },
  
  {
    id: 'response-time-trends',
    name: 'Bureau Response Time Analysis',
    description: 'Track bureau response times and how they change',
    category: 'temporal',
    requires_ceo_approval: false,
    estimated_cost: '$5,000 - $11,000',
    fields: [
      { id: 'bureau', label: 'Bureau', type: 'select', options: ['TransUnion', 'Equifax', 'Experian', 'All'], required: true },
      { id: 'time_range', label: 'Time Range', type: 'text', required: true },
    ],
  },
  
  {
    id: 'covid-impact',
    name: 'COVID-19 Impact Analysis',
    description: 'How pandemic policies affected credit reporting',
    category: 'temporal',
    requires_ceo_approval: false,
    estimated_cost: '$8,000 - $18,000',
    fields: [
      { id: 'focus_area', label: 'Focus Area', type: 'select', options: ['Deferment Reporting', 'CARES Act Compliance', 'Forbearance', 'All'], required: true },
    ],
  },
  
  // ========================================================================
  // BUREAU COMPARISON FORMS (27-29)
  // ========================================================================
  {
    id: 'bureau-comparison',
    name: 'Bureau-to-Bureau Comparison',
    description: 'Comparative analysis of violation rates across bureaus',
    category: 'bureau',
    requires_ceo_approval: false,
    estimated_cost: '$7,000 - $16,000',
    fields: [
      { id: 'bureaus', label: 'Bureaus to Compare', type: 'multiselect', options: ['TransUnion', 'Equifax', 'Experian'], required: true },
      { id: 'metrics', label: 'Comparison Metrics', type: 'multiselect', options: ['Violation Frequency', 'Response Time', 'Accuracy', 'Resolution Rate'], required: true },
    ],
  },
  
  {
    id: 'bureau-behavior',
    name: 'Bureau Behavioral Analysis',
    description: 'Study patterns in how bureaus handle specific violation types',
    category: 'bureau',
    requires_ceo_approval: true,
    estimated_cost: '$10,000 - $22,000',
    fields: [
      { id: 'bureau', label: 'Bureau', type: 'select', options: ['TransUnion', 'Equifax', 'Experian'], required: true },
      { id: 'behavior_focus', label: 'Behavior Focus', type: 'select', options: ['Reinvestigation', 'Deletions', 'Frivolous Claims', 'All'], required: true },
    ],
  },
  
  {
    id: 'bureau-accuracy-score',
    name: 'Bureau Accuracy Scoreboard',
    description: 'Rank bureaus by accuracy and compliance metrics',
    category: 'bureau',
    requires_ceo_approval: false,
    estimated_cost: '$9,500 - $21,000',
    fields: [
      { id: 'weight_factors', label: 'Weighting Factors', type: 'multiselect', options: ['Violation Frequency', 'Resolution Speed', 'Consumer Impact', 'Legal Compliance'], required: true },
    ],
  },
  
  // ========================================================================
  // LEGAL SUPPORT FORM (30)
  // ========================================================================
  {
    id: 'litigation-support',
    name: 'Custom Litigation Support Package',
    description: 'Customized data package for ongoing or planned litigation',
    category: 'legal',
    requires_ceo_approval: true,
    estimated_cost: '$15,000 - $50,000',
    fields: [
      { id: 'case_description', label: 'Case Description', type: 'textarea', required: true },
      { id: 'plaintiffs', label: 'Number of Plaintiffs', type: 'number', required: true },
      { id: 'defendant', label: 'Defendant(s)', type: 'text', required: true },
      { id: 'violation_focus', label: 'Violation Focus', type: 'multiselect', options: ['§1681e(b)', '§1681i', '§1681s-2', 'Metro 2', 'Mixed Files', 'Other'], required: true },
      { id: 'jurisdiction', label: 'Jurisdiction', type: 'text', required: true },
      { id: 'deadline', label: 'Discovery Deadline', type: 'date', required: false },
    ],
  },
];

// Helper function to get form by ID
export function getKnightIntelForm(formId: string): KnightIntelForm | undefined {
  return KNIGHT_INTEL_FORMS.find(form => form.id === formId);
}

// Helper function to get forms by category
export function getFormsByCategory(category: KnightIntelForm['category']): KnightIntelForm[] {
  return KNIGHT_INTEL_FORMS.filter(form => form.category === category);
}

// Export total count
export const TOTAL_KNIGHT_INTEL_FORMS = KNIGHT_INTEL_FORMS.length; // 30
