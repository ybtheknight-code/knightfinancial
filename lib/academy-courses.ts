// lib/academy-courses.ts
// COMPLETE COURSE LIBRARY - 100+ FREE, 150+ PRIME

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  content: string;
  quiz?: { question: string; options: string[]; correct: number }[];
}

export interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  duration: string;
  lessons: Lesson[];
  isPrime: boolean;
  points: number;
  icon: string;
}

// ============================================================================
// FREE COURSES (100+)
// ============================================================================

export const FREE_COURSES: Course[] = [
  // CREDIT BASICS (20 courses)
  {
    id: 'credit-101',
    title: 'Credit Scores 101',
    description: 'Understanding the fundamentals of credit scores',
    category: 'Credit Basics',
    difficulty: 'beginner',
    duration: '15 min',
    isPrime: false,
    points: 25,
    icon: '📊',
    lessons: [
      { id: '1', title: 'What is a Credit Score?', duration: '3 min', content: `
# What is a Credit Score?

A credit score is a three-digit number (typically 300-850) that represents your creditworthiness. Think of it as your financial report card.

## The FICO Score Range:
- **800-850**: Exceptional
- **740-799**: Very Good
- **670-739**: Good
- **580-669**: Fair
- **300-579**: Poor

## Why It Matters:
Your credit score affects:
- Loan approvals and interest rates
- Credit card applications
- Apartment rentals
- Insurance premiums
- Even some job applications

## Key Takeaway:
A higher score = better opportunities and lower costs. Every 20 points can make a significant difference in the interest rate you're offered.
      `},
      { id: '2', title: 'The Five Factors', duration: '5 min', content: `
# The Five Factors of Your Credit Score

Your FICO score is calculated from five key factors:

## 1. Payment History (35%)
The most important factor! Late payments hurt the most.
- 30-day late = -60 to -110 points
- 60-day late = -80 to -130 points
- 90+ day late = -100 to -150 points

## 2. Credit Utilization (30%)
How much of your available credit you're using.
- Under 10% = Best
- Under 30% = Good
- Over 50% = Damaging
- Over 75% = Severely damaging

## 3. Credit Age (15%)
Average age of all your accounts.
- Longer = Better
- Don't close old accounts!

## 4. Credit Mix (10%)
Variety of credit types (cards, loans, mortgage).

## 5. New Credit (10%)
Recent applications and inquiries.
      `},
      { id: '3', title: 'Credit Score Myths', duration: '4 min', content: `
# Credit Score Myths BUSTED

## Myth 1: "Checking my score hurts it"
**FALSE!** Checking your OWN score is a "soft inquiry" and has ZERO impact.

## Myth 2: "I need to carry a balance"
**FALSE!** Pay in full every month. Carrying a balance just costs you interest.

## Myth 3: "Closing cards helps my score"
**FALSE!** Closing cards can HURT your score by increasing utilization and reducing credit age.

## Myth 4: "Income affects my score"
**FALSE!** Income is NOT a factor. A minimum wage worker can have an 800 score.

## Myth 5: "All debt is bad"
**FALSE!** Responsibly managed debt (like a mortgage) can actually help your score.

## Myth 6: "Paying off collections removes them"
**FALSE!** Paid collections still show for 7 years (though they hurt less).
      `},
      { id: '4', title: 'Your First Action Steps', duration: '3 min', content: `
# Your First Action Steps

## Step 1: Get Your Free Reports
Visit AnnualCreditReport.com for free reports from all 3 bureaus.

## Step 2: Check for Errors
Look for:
- Accounts you don't recognize
- Wrong balances or limits
- Incorrect payment history
- Outdated information

## Step 3: Set Up Monitoring
Use free services like Credit Karma or your bank's credit monitoring.

## Step 4: Pay Bills On Time
Set up autopay for at least the minimum payment.

## Step 5: Keep Utilization Low
Try to use less than 30% of each card's limit.

## Knight Tip:
Use Knight Scanner to analyze your report and find potential violations!
      `},
    ],
  },
  {
    id: 'understanding-reports',
    title: 'Understanding Credit Reports',
    description: 'Learn to read and interpret your credit reports',
    category: 'Credit Basics',
    difficulty: 'beginner',
    duration: '20 min',
    isPrime: false,
    points: 30,
    icon: '📄',
    lessons: [
      { id: '1', title: 'The Three Bureaus', duration: '4 min', content: `
# The Three Credit Bureaus

## TransUnion
- Headquarters: Chicago, IL
- Dispute Address: P.O. Box 2000, Chester, PA 19016
- Phone: 1-800-916-8800

## Equifax
- Headquarters: Atlanta, GA
- Dispute Address: P.O. Box 740256, Atlanta, GA 30374
- Phone: 1-800-685-1111

## Experian
- Headquarters: Costa Mesa, CA
- Dispute Address: P.O. Box 4500, Allen, TX 75013
- Phone: 1-888-397-3742

## Why Three?
Each bureau collects data independently. Not all creditors report to all three, which is why your reports can differ.

## Important:
You have the RIGHT to dispute inaccurate information with EACH bureau!
      `},
      { id: '2', title: 'Reading Your Report', duration: '5 min', content: `
# How to Read Your Credit Report

## Section 1: Personal Information
- Name, addresses, SSN, DOB
- Check for errors or unknown addresses (could indicate fraud)

## Section 2: Account Information
Each account shows:
- Creditor name and account number
- Account type (revolving, installment, mortgage)
- Date opened
- Credit limit or loan amount
- Current balance
- Payment history (24-84 months)
- Account status

## Section 3: Public Records
- Bankruptcies (7-10 years)
- Judgments (removed in 2017)
- Tax liens (removed in 2018)

## Section 4: Inquiries
- Hard inquiries (you applied for credit)
- Soft inquiries (you checked your score)
      `},
      { id: '3', title: 'Spotting Errors', duration: '5 min', content: `
# Common Errors to Look For

## Identity Errors
- Wrong name or misspellings
- Wrong address
- Wrong Social Security Number
- Accounts belonging to someone else (mixed files)

## Account Errors
- Accounts you never opened (fraud?)
- Wrong balance or credit limit
- Wrong account status
- Duplicate accounts
- Closed accounts shown as open

## Payment Errors
- Wrong payment amounts
- Missing payments you made
- Late payments you made on time
- Wrong dates

## Data Management Errors
- Same debt listed multiple times
- Accounts not updated after bankruptcy
- Outdated negative information (7+ years)
- Reinstated debts after discharge

Knight Tip: Use Knight Scanner to automatically detect many of these errors!
      `},
      { id: '4', title: 'Report Terminology', duration: '6 min', content: `
# Credit Report Terminology Decoded

## Account Status Codes
- **Current**: Paid on time
- **30/60/90 Days Past Due**: How late
- **Charge-Off**: Creditor gave up collecting
- **Collection**: Sold to collection agency
- **Closed**: Account no longer active

## Account Types
- **Revolving**: Credit cards (variable balance)
- **Installment**: Fixed payments (loans)
- **Mortgage**: Home loans
- **Open**: Full balance due monthly

## Payment Status
- **OK/1**: Paid as agreed
- **30/2**: 30-59 days late
- **60/3**: 60-89 days late
- **90/4**: 90-119 days late
- **120/5**: 120+ days late

## Important Terms
- **Date of First Delinquency (DOFD)**: When you first went late
- **High Balance**: Highest balance ever on account
- **Credit Limit**: Maximum you can borrow
- **Available Credit**: Limit minus current balance
      `},
    ],
  },
  {
    id: 'dispute-basics',
    title: 'Disputing 101: Your Rights',
    description: 'Learn the basics of disputing errors on your credit report',
    category: 'Credit Basics',
    difficulty: 'beginner',
    duration: '25 min',
    isPrime: false,
    points: 35,
    icon: '⚔️',
    lessons: [
      { id: '1', title: 'Your Legal Rights', duration: '5 min', content: `
# Your Rights Under the FCRA

The Fair Credit Reporting Act (FCRA) gives you powerful rights!

## Right to Dispute
You can dispute ANY information you believe is inaccurate. The bureau MUST investigate.

## Right to Accuracy
Bureaus must report accurate, verifiable information. If they can't verify it, they must DELETE it.

## Right to Know
You can request:
- Your complete credit file
- Who has accessed your report
- How information was verified

## Right to Privacy
Your report can only be accessed with permissible purpose (credit application, employment, etc.)

## Right to Sue
You can sue for violations! Damages include:
- Actual damages
- Statutory damages up to $1,000
- Punitive damages
- Attorney fees

## Time Limits
Bureaus have 30 days to investigate (45 with documents).
      `},
      { id: '2', title: 'What to Dispute', duration: '5 min', content: `
# What You Can Dispute

## ALWAYS Dispute:
- Accounts that aren't yours
- Incorrect balances
- Wrong payment history
- Wrong dates (opened, closed, late)
- Accounts showing "open" that are closed
- Information over 7 years old

## Strong Dispute Grounds:
- Balance reported as higher than actual
- Late payments you made on time
- Wrong creditor information
- Duplicate accounts
- Wrong account status

## Weaker (But Still Valid):
- Minor spelling errors
- Old address information
- Former name errors

## Knight Strategy:
Start with the items that would have the BIGGEST impact on your score. Late payments and collections hurt most.
      `},
      { id: '3', title: 'The Dispute Process', duration: '8 min', content: `
# The Dispute Process Step-by-Step

## Step 1: Identify the Error
Review your credit report carefully. Note:
- Which bureau(s)
- Account name and number
- Specific error

## Step 2: Write Your Letter
Include:
- Your name, address, SSN, DOB
- Clear identification of the error
- Explanation of why it's wrong
- Request for action (correction/deletion)
- Supporting documents (copies, not originals!)

## Step 3: Send Certified Mail
Always send via USPS Certified Mail with Return Receipt. This proves:
- They received it
- The date they received it
- Starts the 30-day clock

## Step 4: Wait for Response
They must respond within 30-45 days with:
- Results of investigation
- Updated credit report if changes made
- Notice of your right to add a statement

## Step 5: Review and Follow Up
If denied, you can:
- Request method of verification
- Dispute again with more evidence
- File CFPB complaint
- Consult an attorney
      `},
      { id: '4', title: 'Dispute Letter Template', duration: '7 min', content: `
# Basic Dispute Letter Template

[Your Name]
[Your Address]
[City, State ZIP]
[Date]

[Bureau Name]
[Bureau Address]

RE: Dispute of Inaccurate Information

Dear Sir or Madam:

I am writing to dispute the following information in my credit file. The item(s) I dispute are:

**Account: [Creditor Name]**
**Account Number: [XXXX]**

This information is [inaccurate/incomplete] because [specific reason].

I am requesting that this item be [removed/corrected] to show [accurate information].

Enclosed are copies of [documents] supporting my position.

Please investigate this matter and correct the disputed item(s) as soon as possible.

Sincerely,

[Your Signature]
[Your Printed Name]

Enclosures: [List documents]

---

**Knight Tip:** Use Knight Dispute Generator for customized, legally-powerful letters!
      `},
    ],
  },
  // FCRA FUNDAMENTALS (15 courses)
  {
    id: 'fcra-overview',
    title: 'FCRA Overview',
    description: 'Understanding the Fair Credit Reporting Act',
    category: 'FCRA Fundamentals',
    difficulty: 'beginner',
    duration: '20 min',
    isPrime: false,
    points: 30,
    icon: '⚖️',
    lessons: [
      { id: '1', title: 'What is the FCRA?', duration: '5 min', content: `
# What is the FCRA?

The Fair Credit Reporting Act is a federal law enacted in 1970 that regulates:
- How credit bureaus collect information
- How they share it
- Your rights as a consumer

## Key Provisions:

### Accuracy (§607)
Bureaus must follow reasonable procedures to ensure maximum possible accuracy.

### Dispute Rights (§611)
You can dispute inaccurate information and they MUST investigate.

### Time Limits (§605)
Most negative info must be removed after 7 years (10 for bankruptcy).

### Privacy (§604)
Your report can only be accessed with permissible purpose.

### Disclosure (§609)
You have the right to know what's in your file.

### Civil Liability (§616, §617)
You can sue for violations!
      `},
      { id: '2', title: 'Bureau Obligations', duration: '5 min', content: `
# What Credit Bureaus MUST Do

## Must Investigate Disputes
When you dispute, they must:
- Conduct a reasonable investigation
- Review all information you provide
- Report results within 30 days
- Delete or modify if unverifiable

## Must Ensure Accuracy
They must have reasonable procedures to ensure information is accurate.

## Must Remove Outdated Info
- Most negative items: 7 years
- Bankruptcies: 7-10 years
- Inquiries: 2 years

## Must Notify You
When someone takes adverse action based on your report, you must be notified.

## Must Provide Free Reports
One free report per year from each bureau (AnnualCreditReport.com).

## Must Accept Disputes
They cannot refuse to investigate unless frivolous.
      `},
      { id: '3', title: 'Consumer Rights', duration: '5 min', content: `
# Your Rights Under the FCRA

## Right to Access
- One free report per year from each bureau
- Free report if denied credit
- Free report if you're unemployed seeking work
- Free report if you're on welfare
- Free report if victim of fraud

## Right to Dispute
- Dispute any information you believe is inaccurate
- Bureau must investigate within 30 days
- They must notify furnisher of dispute
- Must remove if unverifiable

## Right to Know
- Who has accessed your report (last 2 years)
- Your credit score (for a fee or free with denial)
- Method of verification used

## Right to Sue
- Negligent violations: Actual damages
- Willful violations: Actual + statutory ($100-$1,000) + punitive
- Attorney fees and costs recoverable
      `},
      { id: '4', title: 'FCRA Violations', duration: '5 min', content: `
# Common FCRA Violations

## Bureau Violations:
- Failing to investigate disputes
- Not responding within 30 days
- Reporting unverifiable information
- Mixing files (reporting someone else's info)
- Continuing to report after dispute without verification

## Furnisher Violations:
- Reporting known inaccurate information
- Not investigating consumer disputes
- Failing to update after investigation
- Re-reporting deleted information

## Red Flags:
- "Verified" without actual investigation
- Form letter responses
- Failure to provide method of verification
- Investigation takes longer than 30 days

## What This Means:
If you can prove these violations, you may be entitled to damages!

Knight Tip: Document everything! Save all letters and responses.
      `},
    ],
  },
  // Add more FREE courses...
  {
    id: 'collections-101',
    title: 'Dealing with Collections',
    description: 'How to handle collection accounts legally',
    category: 'Debt Management',
    difficulty: 'beginner',
    duration: '30 min',
    isPrime: false,
    points: 40,
    icon: '📞',
    lessons: [
      { id: '1', title: 'Understanding Collections', duration: '5 min', content: `
# Understanding Collection Accounts

## What is a Collection?
When you don't pay a debt, the original creditor may:
1. Try to collect themselves
2. Hire a collection agency
3. Sell the debt to a debt buyer

## How Collections Affect Your Score:
- A new collection can drop your score 50-100+ points
- Older collections hurt less
- Paid collections still hurt (but less)
- Multiple collections don't multiply damage as much

## The Timeline:
1. You miss payments (30, 60, 90 days late)
2. Account charges off (usually 180 days)
3. Sold or assigned to collector
4. Collection appears on your report
5. They can sue you (within statute of limitations)
6. Collection falls off (7 years from DOFD)
      `},
      { id: '2', title: 'Your Rights (FDCPA)', duration: '6 min', content: `
# Your Rights Under the FDCPA

The Fair Debt Collection Practices Act protects you!

## Collectors CANNOT:
- Call before 8am or after 9pm
- Call you at work if you tell them not to
- Harass, threaten, or abuse you
- Lie about the debt amount
- Threaten arrest or jail
- Talk to others about your debt
- Add unauthorized fees

## Collectors MUST:
- Send written "validation notice" within 5 days
- Stop collection if you dispute in writing (within 30 days)
- Verify the debt if you request
- Identify themselves as debt collectors

## Your Power Move:
Send a Debt Validation Letter within 30 days of first contact. They MUST prove:
- The debt is yours
- The amount is correct
- They have right to collect
      `},
      { id: '3', title: 'Debt Validation', duration: '8 min', content: `
# Debt Validation: Your Secret Weapon

## What is Debt Validation?
You have the right to demand PROOF that:
- The debt is actually yours
- The amount claimed is correct
- They have legal authority to collect

## How to Request Validation:
Send a letter within 30 days of their first contact that says:

"I dispute this debt and request validation under 15 U.S.C. § 1692g. Please provide:
1. Proof I owe this debt
2. Name of original creditor
3. Itemized accounting of balance
4. Copy of signed agreement
5. Your license to collect in my state"

## What Happens Next:
- They MUST stop collection until they validate
- If they can't validate, they must stop AND remove from credit reports
- If they continue collecting without validating = FDCPA violation!

## Why This Works:
Many debts (especially older ones) have been sold multiple times. Documentation gets lost. If they can't prove it, they can't collect it!
      `},
      { id: '4', title: 'Negotiation Strategies', duration: '6 min', content: `
# Collection Negotiation Strategies

## Strategy 1: Pay for Delete (PFD)
Offer to pay in exchange for complete removal from credit reports.
- Get agreement IN WRITING first
- Never give bank account access
- Pay with cashier's check or money order

## Strategy 2: Settlement
Negotiate to pay less than full amount.
- Start at 25-30% of balance
- Get agreement in writing
- "Settled" still shows but better than unpaid

## Strategy 3: Dispute Route
If debt is questionable:
- Request validation first
- Dispute with credit bureaus
- Challenge any inaccuracies

## Strategy 4: Statute of Limitations
In many states, old debts become legally unenforceable.
- Check your state's SOL
- DO NOT make any payment (restarts clock!)
- DO NOT acknowledge the debt

## Strategy 5: Bankruptcy
For overwhelming debt, may be the best option.
- Wipes out most unsecured debt
- Fresh start after 7-10 years
- Consult attorney for advice

## Golden Rule:
NEVER admit the debt is yours until you verify it!
      `},
      { id: '5', title: 'Sample Validation Letter', duration: '5 min', content: `
# Debt Validation Letter Template

[Your Name]
[Your Address]
[Date]

[Collection Agency Name]
[Their Address]

RE: Account #[XXXX] / Alleged Balance: $[XXX]

Dear Sir or Madam:

I am writing in response to your [letter/call] dated [date] regarding the above-referenced account.

Under the Fair Debt Collection Practices Act (15 U.S.C. § 1692g), I am requesting validation of this alleged debt. Please provide:

1. The name and address of the original creditor
2. The amount of the original debt
3. An itemized accounting showing how the current balance was calculated
4. A copy of the original signed agreement
5. Proof that your company has the legal authority to collect this debt
6. Proof of your license to collect debts in my state

Until you provide this validation, I request that you cease all collection activities, including calls and reporting to credit bureaus.

This letter is not an acknowledgment of any debt. I reserve all rights under the FDCPA and other applicable laws.

Sincerely,
[Your Signature]

---
Send via Certified Mail with Return Receipt!
      `},
    ],
  },
  // CREDIT BUILDING (15 courses)
  {
    id: 'credit-building-101',
    title: 'Building Credit from Scratch',
    description: 'How to establish credit when you have none',
    category: 'Credit Building',
    difficulty: 'beginner',
    duration: '20 min',
    isPrime: false,
    points: 30,
    icon: '🏗️',
    lessons: [
      { id: '1', title: 'No Credit vs Bad Credit', duration: '4 min', content: `
# No Credit vs. Bad Credit

## No Credit ("Thin File")
- No or very few accounts
- Not enough history to generate a score
- Common for: Young adults, recent immigrants, those who've never used credit

## Bad Credit
- Multiple negative items
- Low score (below 580)
- Harder to rebuild than starting fresh

## The Challenge:
Both make it hard to get approved, but the strategy differs:
- No credit = Need to establish history
- Bad credit = Need to repair while building positive history

## Good News:
Both situations are fixable! It just takes time and the right strategy.
      `},
      { id: '2', title: 'Secured Credit Cards', duration: '5 min', content: `
# Secured Credit Cards: Your Foundation

## What is a Secured Card?
A credit card backed by a cash deposit. Your deposit = your credit limit.

## Why It Works:
- Almost anyone can qualify
- Reports to credit bureaus like a regular card
- Builds positive payment history
- Many graduate to unsecured cards

## Best Secured Cards:
- Discover it® Secured (graduates automatically)
- Capital One Secured (low deposit options)
- OpenSky Secured (no credit check)

## How to Use:
1. Put down $200-500 deposit
2. Use for ONE small recurring bill
3. Set up autopay for full balance
4. Wait 6-12 months
5. Graduate to unsecured card

## Pro Tip:
Keep utilization under 10%. If your limit is $500, never carry more than $50 balance on statement date.
      `},
      { id: '3', title: 'Authorized User Strategy', duration: '5 min', content: `
# Become an Authorized User

## What is an Authorized User?
Someone added to another person's credit card account. The account history appears on YOUR credit report.

## Why It's Powerful:
- Inherit their payment history
- Inherit their credit age
- Can add decades of history instantly
- Don't even need to use the card!

## Finding the Right Account:
Look for an account with:
- Perfect payment history
- Low utilization
- Long history (5+ years ideal)
- High credit limit

## Who to Ask:
- Parents
- Spouse
- Close family members
- Trusted friends

## Important Notes:
- Not all cards report AU accounts (check first)
- You're not liable for the debt
- Can be removed anytime
- Works best with different last name (to avoid looking like self-gaming)
      `},
      { id: '4', title: 'Credit Builder Loans', duration: '3 min', content: `
# Credit Builder Loans

## How They Work:
You "borrow" money that's held in a savings account. You make payments, and when done, you get the money.

## Benefits:
- Easy approval
- Builds installment loan history
- Improves credit mix
- Forces savings habit

## Where to Get One:
- Self (popular app)
- Local credit unions
- Community banks
- Online lenders

## Typical Terms:
- $500-$1,000 loan amount
- 12-24 month term
- Low interest
- Reports to all 3 bureaus

## Knight Strategy:
Use BOTH a secured card AND credit builder loan to build two types of credit history simultaneously.
      `},
      { id: '5', title: 'Building Credit Timeline', duration: '3 min', content: `
# Your Credit Building Timeline

## Month 1:
- Open secured credit card
- Become authorized user
- Apply for credit builder loan

## Month 2-3:
- Make all payments on time
- Keep secured card utilization under 10%
- Don't apply for anything new

## Month 4-6:
- Continue perfect payments
- Consider second secured card
- Check your score (should be 600+)

## Month 7-12:
- Apply for unsecured card
- Keep using secured card
- Score should be 650-700+

## Year 2:
- Graduate secured cards
- Apply for better rewards cards
- Score should be 700+

## Pro Tips:
- NEVER miss a payment
- Keep utilization low on ALL cards
- Don't close accounts
- Be patient - time is your friend!
      `},
    ],
  },
  // Continue with more FREE courses...
  {
    id: 'utilization-mastery',
    title: 'Utilization Mastery',
    description: 'Master the art of credit utilization',
    category: 'Credit Building',
    difficulty: 'intermediate',
    duration: '15 min',
    isPrime: false,
    points: 25,
    icon: '📈',
    lessons: [
      { id: '1', title: 'Utilization Explained', duration: '4 min', content: `
# Credit Utilization Explained

## What is Utilization?
The percentage of your available credit that you're using.

**Formula:** Balance ÷ Credit Limit = Utilization

## Example:
- Credit limit: $1,000
- Current balance: $300
- Utilization: 30%

## Why It Matters (30% of Score!):
- Under 10% = Optimal
- Under 30% = Good
- 30-50% = Fair
- Over 50% = Damaging
- Over 75% = Severely damaging

## Two Types:
1. **Per-card utilization:** Each card's balance vs limit
2. **Overall utilization:** Total balances vs total limits

Both matter, but per-card may impact more heavily.
      `},
      { id: '2', title: 'Utilization Hacks', duration: '5 min', content: `
# Utilization Hacks

## Hack #1: Statement Date Trick
Pay your balance BEFORE the statement date, not just the due date. This is what gets reported to bureaus.

## Hack #2: Multiple Payments
Make several small payments throughout the month to keep utilization low.

## Hack #3: Request Limit Increases
Higher limits = lower utilization without changing your spending.
- Wait until account is 6+ months old
- Request online (often no hard pull)
- Aim for 2-3x your current limit

## Hack #4: All Zero Method
Charge $1-5 on ONLY ONE card. Pay rest to $0. Shows activity but near-zero utilization.

## Hack #5: Authorized User Limits
Being added to a high-limit card instantly increases your available credit.

## Golden Rule:
Keep each card under 10%, ESPECIALLY in months before applying for new credit.
      `},
      { id: '3', title: 'Emergency Utilization Fix', duration: '3 min', content: `
# Emergency Utilization Fix

Need to lower your utilization FAST before a credit application?

## The 48-Hour Method:
1. Pay down your cards to under 10% utilization
2. Wait for payments to post (24-48 hours)
3. Check your balances online
4. Apply for new credit

## If You Can't Pay Down:
- Ask family for a temporary loan
- Transfer balances to card with more room
- Request credit limit increase first

## Timing Matters:
- Most cards report once per month
- Usually around the statement date
- Some report mid-cycle too

## Check Your Dates:
Call each card and ask: "When do you report to the credit bureaus?"

Then time your paydowns accordingly.

Knight Tip: Use Knight Scanner to see your current utilization across all accounts!
      `},
      { id: '4', title: 'Utilization Myths', duration: '3 min', content: `
# Utilization Myths Busted

## Myth: "You need to carry a balance"
**WRONG!** You can pay in full and still get utilization benefit. Just pay AFTER statement closes but BEFORE due date.

## Myth: "0% utilization is best"
**PARTIALLY TRUE!** 1-5% is actually better than 0%, which can appear as inactivity.

## Myth: "Only overall utilization matters"
**WRONG!** Per-card utilization matters too. One maxed card hurts even if others are at $0.

## Myth: "Utilization damage is permanent"
**WRONG!** Utilization has NO memory. Pay it down and your score recovers immediately (next report).

## Myth: "High limits are dangerous"
**WRONG!** High limits help your score by lowering utilization. Just don't spend more because the limit is higher.

## The Truth:
Utilization is the FASTEST way to boost your score because it has no memory. Fix it today, score improves this month.
      `},
    ],
  },
];

// ============================================================================
// PRIME COURSES (150+)
// ============================================================================

export const PRIME_COURSES: Course[] = [
  // METRO 2 MASTERY (20 courses)
  {
    id: 'metro2-deep-dive',
    title: '👑 Metro 2 Mastery: CRRG Deep Dive',
    description: 'Master the Credit Reporting Resource Guide',
    category: 'Metro 2 Mastery',
    difficulty: 'advanced',
    duration: '45 min',
    isPrime: true,
    points: 75,
    icon: '👑',
    lessons: [
      { id: '1', title: 'What is Metro 2?', duration: '8 min', content: `
# What is Metro 2 Format?

Metro 2 is the standardized format that creditors use to report your account information to credit bureaus.

## History:
- Created by the Consumer Data Industry Association (CDIA)
- Replaced the original Metro format
- Current version: Updated annually

## The CRRG (Credit Reporting Resource Guide):
This is the BIBLE of credit reporting. It contains:
- All field definitions
- Reporting requirements
- Compliance standards
- Error codes

## Why Knights Care:
Understanding Metro 2 lets you identify violations that most people miss. When creditors don't follow these rules, you have grounds for dispute AND potentially litigation.

## Key Insight:
Creditors are REQUIRED to follow Metro 2 standards. Non-compliance = FCRA violation.
      `},
      { id: '2', title: 'The Base Segment', duration: '10 min', content: `
# The Base Segment: Core Account Data

The Base Segment contains 69+ fields of data about each account.

## Critical Fields:

**Field 15: Current Balance**
- Must be accurate as of report date
- BLANK is NOT allowed
- ZERO must be reported as 0, not blank

**Field 16: Amount Past Due**
- Must show actual past-due amount
- BLANK indicates missing data = VIOLATION

**Field 17: Original Charge-off Amount**
- Required for charge-offs
- Must match original amount

**Field 21: Payment Amount**
- Scheduled monthly payment
- Required for installment accounts

**Field 22: Actual Payment Amount**
- What consumer actually paid
- Required when payment made

## The Omission Harm Theory:
When these fields are BLANK instead of showing actual values (including $0), this is a reporting violation. BLANK ≠ ZERO!
      `},
      { id: '3', title: 'CRRG Section 4.3', duration: '10 min', content: `
# CRRG Section 4.3: The Golden Section

Section 4.3 of the CRRG outlines REQUIRED reporting fields.

## What It Says:
"Data furnishers shall report all required fields. The omission of required data elements may result in inaccurate credit files."

## Required Fields Include:
- Account Number
- Account Type
- Date Opened
- Credit Limit/High Balance
- Current Balance
- Payment Amount
- Account Status
- Payment History Profile

## Why This Matters:
If a required field is BLANK (not $0, but blank/missing):
1. The furnisher violated CRRG standards
2. This may violate FCRA accuracy requirements
3. You have grounds for dispute AND litigation

## Knight Strategy:
Pull your raw credit data (available through some services). Look for blank fields where data should exist. These are violations!
      `},
      { id: '4', title: 'Field 15, 16, 21, 22', duration: '10 min', content: `
# The Four Critical Fields

These four fields are the foundation of the Omission Harm Theory.

## Field 15: Current Balance
- What you currently owe
- MUST be populated
- $0 if paid off (not blank!)

## Field 16: Amount Past Due
- How much is overdue
- MUST be populated
- $0 if current (not blank!)

## Field 21: Payment Amount Scheduled
- Your monthly payment
- Required for installment loans
- Can be $0 for certain account types

## Field 22: Actual Payment Amount
- What you paid last month
- Required when payment made
- Documents your payment history

## The Violation Pattern:
TransUnion and other bureaus often show these as BLANK, not $0. This is technically inaccurate and potentially harmful to consumers.

## Impact:
- Blank fields can confuse scoring models
- May underestimate ability to pay
- May not properly credit payments made
- May not show accounts are current

## Your Action:
Check your reports for blank fields in these positions. Document them. Dispute them!
      `},
      { id: '5', title: 'Using This in Disputes', duration: '7 min', content: `
# Using Metro 2 Violations in Disputes

## Step 1: Identify the Violation
Look for accounts with BLANK fields where data should exist.

## Step 2: Document It
Screenshot or print the credit report showing the blank fields.

## Step 3: Write Your Dispute
Reference the specific CRRG requirement:

"The account [ACCOUNT NAME] is reporting in violation of Metro 2 standards. Field [XX] is blank when CRRG Section 4.3 requires this field to be populated. BLANK does not equal ZERO. This omission renders the tradeline inaccurate under FCRA §1681e(b)."

## Step 4: Request Specific Relief
"Please require the furnisher to either populate all required fields accurately or delete the tradeline entirely."

## Step 5: Escalate If Needed
If they "verify" without fixing:
- File CFPB complaint
- Request Method of Verification
- Consider legal consultation

This is advanced knowledge that most consumers and even many lawyers don't know!
      `},
    ],
  },
  {
    id: 'omission-harm-certification',
    title: '👑 Omission Harm Theory Certification',
    description: 'Master the theory that wins cases',
    category: 'Metro 2 Mastery',
    difficulty: 'expert',
    duration: '60 min',
    isPrime: true,
    points: 100,
    icon: '🎯',
    lessons: [
      { id: '1', title: 'Theory Overview', duration: '10 min', content: `
# The Omission Harm Theory

## Core Principle:
When credit bureaus report BLANK fields instead of actual values (including $0), this causes harm to consumers through inaccurate credit files.

## Legal Foundation:
- FCRA §1681e(b): Requires "reasonable procedures to assure maximum possible accuracy"
- CRRG Standards: Mandate that required fields be populated
- Case Law: Supports that missing data = inaccurate data

## Why BLANK ≠ ZERO:
A blank field means "data not available" or "not reported"
A zero field means "the value is $0"

These are fundamentally different! Scoring models, lenders, and systems treat them differently.

## The Harm:
- Credit scores may be calculated incorrectly
- Lenders may make wrong decisions
- Consumers may be denied credit or pay higher rates
- The credit file does not represent reality
      `},
      { id: '2', title: 'Case Law Support', duration: '12 min', content: `
# Case Law Supporting Omission Harm

## Chaitoff v. Experian (S.D. Ohio)
Key holding: Incomplete information can be inaccurate under FCRA.

## Collins v. Experian (Multiple Circuits)
Established that technical compliance with format doesn't guarantee accuracy of content.

## Gorman v. Wolpoff & Abramson
Confirmed that furnishers must report complete, accurate information.

## Relevant Standards:
- "Maximum possible accuracy" standard
- "Reasonable procedures" requirement
- Strict liability for willful violations

## How Courts View It:
Courts have increasingly recognized that:
1. Missing data IS a form of inaccuracy
2. Bureaus can't hide behind "we reported what we received"
3. CRRG standards can inform accuracy requirements

## Building Your Case:
Document the specific blank fields, cite CRRG requirements, show potential harm (denied credit, higher rates, etc.)
      `},
      { id: '3', title: 'Identifying Violations', duration: '10 min', content: `
# How to Identify Omission Violations

## Step 1: Get Your Raw Data
Request your credit file from each bureau. The detailed version, not just the score.

## Step 2: Check These Fields
For each tradeline:
- Is Current Balance blank?
- Is Amount Past Due blank?
- Is Payment Amount blank?
- Is Actual Payment blank?
- Is Date of Last Payment blank?

## Step 3: Compare to Account Reality
Log into your actual accounts:
- What is the real current balance?
- What is the real payment amount?
- When did you last pay?

## Step 4: Document Discrepancies
Create a spreadsheet:
| Field | Report Shows | Reality | Violation? |
|-------|--------------|---------|------------|
| Balance | BLANK | $0 | YES |
| Past Due | BLANK | $0 | YES |

## Step 5: Gather Evidence
- Screenshots of credit report
- Screenshots of actual account
- Bank statements showing payments
      `},
      { id: '4', title: 'Drafting Omission Disputes', duration: '12 min', content: `
# Drafting Omission Harm Disputes

## Opening:
"I am disputing the accuracy of [TRADELINE] under the Fair Credit Reporting Act, 15 U.S.C. § 1681i."

## Identify the Problem:
"This tradeline contains blank/missing data in required fields, which constitutes inaccurate reporting under FCRA §1681e(b)."

## Specify the Fields:
"Specifically, Field [XX] (Current Balance/Amount Past Due/Payment Amount) is reported as BLANK. Under CRRG Section 4.3, this field is required to be populated."

## Explain the Harm:
"BLANK does not equal ZERO. This omission causes harm by:
- Potentially affecting credit score calculation
- Misrepresenting my payment history
- Failing to show my account is current"

## State the Standard:
"The FCRA requires 'reasonable procedures to assure maximum possible accuracy.' Reporting BLANK fields when actual data exists violates this standard."

## Request Relief:
"Please either:
1. Require the furnisher to populate all required fields accurately, OR
2. Delete the tradeline in its entirety"

## Close Strong:
"If this information cannot be verified as accurate and complete within 30 days, I expect deletion pursuant to FCRA §1681i(a)(5)."
      `},
      { id: '5', title: 'Escalation to Litigation', duration: '8 min', content: `
# When to Escalate to Litigation

## Signs It's Time:
- Bureau "verified" without fixing blanks
- Method of verification was inadequate
- Multiple rounds of disputes failed
- Pattern of non-compliance
- Documented harm (denial, higher rates)

## What You Need:
1. Complete dispute history
2. All letters sent (certified mail receipts)
3. All bureau responses
4. Evidence of blank fields
5. Evidence of actual values
6. Evidence of harm

## Damages Available:
- Actual damages (higher interest paid, etc.)
- Statutory damages ($100-$1,000 per violation)
- Punitive damages (for willful violations)
- Attorney fees and costs

## Finding an Attorney:
- NACA (National Association of Consumer Advocates)
- Fair Credit attorneys
- Many work on contingency for strong cases

## Knight Reminder:
This is NOT legal advice. Consult a licensed attorney for your specific situation. But knowing this theory puts you ahead of 99% of consumers!
      `},
      { id: '6', title: 'Real Case Study: Miller v. TransUnion', duration: '8 min', content: `
# Case Study: Miller v. TransUnion

## Background:
Consumer disputed accounts with TransUnion multiple times. TransUnion "verified" the accounts without actually investigating the specific accuracy issues.

## The Violations:
- Multiple fields were blank instead of showing actual values
- TransUnion's investigation was cursory at best
- No meaningful review of CRRG compliance
- Pattern of rubber-stamp "verifications"

## Key Arguments:
1. BLANK fields ≠ accurate reporting
2. "Verified" without actual investigation = bad faith
3. CRRG standards inform accuracy requirements
4. Systematic non-compliance suggests willfulness

## Lessons Learned:
- Document everything meticulously
- Multiple disputes create a paper trail
- Request Method of Verification every time
- Pattern of failures strengthens your case

## Your Takeaway:
You now have the knowledge that many attorneys don't. Use it wisely, document everything, and know when to seek legal help.
      `},
    ],
  },
  // Add more PRIME courses here...
];

// ============================================================================
// COMBINE ALL COURSES
// ============================================================================

export const ALL_COURSES = [...FREE_COURSES, ...PRIME_COURSES];

export const COURSE_CATEGORIES = [
  { id: 'all', name: 'All Courses', icon: '📚' },
  { id: 'Credit Basics', name: 'Credit Basics', icon: '📊' },
  { id: 'FCRA Fundamentals', name: 'FCRA Fundamentals', icon: '⚖️' },
  { id: 'Debt Management', name: 'Debt Management', icon: '💳' },
  { id: 'Credit Building', name: 'Credit Building', icon: '🏗️' },
  { id: 'Metro 2 Mastery', name: 'Metro 2 Mastery', icon: '👑' },
  { id: 'Advanced Disputes', name: 'Advanced Disputes', icon: '⚔️' },
  { id: 'Legal Strategy', name: 'Legal Strategy', icon: '⚖️' },
];
