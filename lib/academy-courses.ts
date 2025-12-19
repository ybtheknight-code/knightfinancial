// lib/academy-courses.ts
// KNIGHT ACADEMY - COMPLETE COURSE LIBRARY
// 50+ FREE Courses | 50+ PRIME Courses

export interface Quiz {
  question: string;
  options: string[];
  correct: number;
}

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  content: string;
  quiz?: Quiz[];
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
// FREE COURSES - EVERYTHING CREDIT GURUS CHARGE FOR, FREE!
// ============================================================================

export const FREE_COURSES: Course[] = [
  // ==================== CREDIT BASICS (10 courses) ====================
  {
    id: 'credit-scores-101',
    title: 'Credit Scores 101',
    description: 'Master the fundamentals of credit scores - what they are, how they work, and why they matter',
    category: 'Credit Basics',
    difficulty: 'beginner',
    duration: '25 min',
    isPrime: false,
    points: 25,
    icon: '📊',
    lessons: [
      {
        id: '1',
        title: 'What is a Credit Score?',
        duration: '5 min',
        content: `A credit score is a three-digit number between 300-850 that represents your creditworthiness. Think of it as your financial GPA.

## The Score Ranges (FICO)

- 800-850: EXCEPTIONAL - Top tier. Best rates on everything.
- 740-799: VERY GOOD - Qualifies for most premium offers.
- 670-739: GOOD - Acceptable to most lenders.
- 580-669: FAIR - Subprime territory. Higher rates.
- 300-579: POOR - Difficult to get approved. Rebuilding needed.

## Why Your Score Matters

Your credit score affects almost every financial decision:

1. LOAN APPROVALS - Banks use it to decide if you qualify
2. INTEREST RATES - Higher score = lower rates = less money paid
3. CREDIT CARDS - Determines which cards you can get
4. APARTMENTS - Landlords check credit before renting
5. INSURANCE - Some states use credit for insurance rates
6. JOBS - Certain employers check credit for positions
7. UTILITIES - May require deposits with low scores

## The Real Cost of Bad Credit

Example: $300,000 mortgage over 30 years
- 760+ score: 6.5% rate = $1,896/month
- 620 score: 8.5% rate = $2,306/month

That's $410 MORE per month, or $147,600 over the life of the loan!

## Key Takeaway

Every 20 points can make a significant difference. A 680 vs 700 can mean thousands in savings.`,
        quiz: [
          {
            question: 'What is the credit score range?',
            options: ['0-100', '100-500', '300-850', '500-1000'],
            correct: 2
          },
          {
            question: 'Which score range is considered "Very Good"?',
            options: ['580-669', '670-739', '740-799', '800-850'],
            correct: 2
          }
        ]
      },
      {
        id: '2',
        title: 'The Five Factors That Control Your Score',
        duration: '8 min',
        content: `Your FICO score is calculated from five factors. Understanding these is KEY to improving your score.

## 1. PAYMENT HISTORY (35%) - Most Important!

This is whether you pay on time. Late payments HURT.

Impact of late payments:
- 30 days late: -60 to -110 points
- 60 days late: -80 to -130 points
- 90+ days late: -100 to -150 points
- Collection: -100 to -150 points

The more recent the late payment, the worse the damage.

## 2. CREDIT UTILIZATION (30%) - Second Most Important

This is how much of your available credit you're using.

Formula: (Total Balances ÷ Total Limits) × 100

- Under 10%: OPTIMAL - Maximum points
- 10-30%: GOOD - Minimal impact
- 30-50%: FAIR - Score starts dropping
- 50-75%: BAD - Significant damage
- Over 75%: CRITICAL - Major damage

Example: $3,000 balance on $10,000 limit = 30% utilization

## 3. LENGTH OF CREDIT HISTORY (15%)

Longer history = better score. This includes:
- Age of oldest account
- Age of newest account
- Average age of all accounts

This is why you should NEVER close old cards!

## 4. CREDIT MIX (10%)

Having different types of credit helps:
- Credit cards (revolving)
- Auto loans (installment)
- Mortgage (installment)
- Personal loans (installment)
- Student loans (installment)

You don't need all types, but diversity helps.

## 5. NEW CREDIT/INQUIRIES (10%)

Each hard inquiry can cost 5-10 points. Multiple applications in short time = red flag.

Exception: Rate shopping for mortgage/auto within 14-45 days counts as ONE inquiry.`,
        quiz: [
          {
            question: 'What percentage does Payment History affect your score?',
            options: ['10%', '15%', '30%', '35%'],
            correct: 3
          },
          {
            question: 'What is the optimal credit utilization?',
            options: ['Under 10%', 'Under 30%', 'Under 50%', 'Under 75%'],
            correct: 0
          }
        ]
      },
      {
        id: '3',
        title: 'FICO vs VantageScore - Know the Difference',
        duration: '6 min',
        content: `There are TWO main scoring models. Understanding both is essential.

## FICO Score

- Created by Fair Isaac Corporation in 1989
- Used by 90% of lenders for decisions
- Score range: 300-850
- Multiple versions (FICO 8, FICO 9, FICO 10, etc.)

FICO Versions by Use:
- FICO Auto Score: Car loans
- FICO Bankcard Score: Credit cards
- FICO Mortgage Score: Home loans (usually older versions)

## VantageScore

- Created by the 3 bureaus (Experian, Equifax, TransUnion) in 2006
- Used by Credit Karma, many free services
- Score range: 300-850 (VantageScore 3.0+)
- Currently on VantageScore 4.0

## Key Differences

| Factor | FICO | VantageScore |
|--------|------|--------------|
| Late Payments | All hurt equally | Mortgage late hurts more |
| Collections | Paid collections still hurt | Paid collections ignored |
| Utilization | Per-card matters | Total utilization focus |
| History Needed | 6 months | 1 month |
| Inquiries | 45-day window | 14-day window |

## Which One Matters?

FICO is what lenders use. VantageScore is good for monitoring trends, but your actual approval depends on FICO.

When you check Credit Karma, you see VantageScore. When you apply for a loan, they pull FICO. This is why scores often differ!

## Pro Tip

Get your actual FICO scores from:
- Discover (free, even without account)
- Experian (free FICO 8)
- MyFICO.com (paid, all versions)`,
        quiz: [
          {
            question: 'Which score do 90% of lenders use?',
            options: ['VantageScore', 'FICO', 'Credit Karma Score', 'TransUnion Score'],
            correct: 1
          }
        ]
      },
      {
        id: '4',
        title: 'Credit Score Myths EXPOSED',
        duration: '6 min',
        content: `Let's destroy the myths that hold people back.

## MYTH 1: "Checking my score hurts it"

FALSE! Checking your OWN score is a "soft inquiry" with ZERO impact. Check it daily if you want.

Hard inquiry = You apply for credit (affects score)
Soft inquiry = You check your own (no effect)

## MYTH 2: "I need to carry a balance"

FALSE! This is the most expensive myth. Carrying a balance just costs you interest. Pay in FULL every month.

The utilization is calculated on your STATEMENT DATE, not your due date. So even paying in full, utilization is reported.

## MYTH 3: "Closing old cards helps"

FALSE! Closing cards HURTS your score by:
- Reducing total available credit (higher utilization)
- Reducing average account age
- Reducing credit mix

Keep old cards open, even if unused. Put a small recurring charge on them.

## MYTH 4: "Income affects my score"

FALSE! Income is NOT a factor in credit scores. A minimum wage worker can have an 850 score.

Income affects debt-to-income ratio for loan approval, but NOT your credit score itself.

## MYTH 5: "Paying off collections removes them"

FALSE! Paid collections still show on your report for 7 years. The status changes to "Paid Collection" but it's still there.

Exception: Some newer FICO models (FICO 9) and VantageScore 3.0+ ignore paid collections.

## MYTH 6: "All debt is bad"

FALSE! Responsibly managed debt can help your score. A mortgage paid on time for 10 years is EXCELLENT for your credit.

## MYTH 7: "You only have one credit score"

FALSE! You have DOZENS of scores. Each bureau has different data. Each scoring model calculates differently.`
      }
    ],
  },
  {
    id: 'reading-credit-reports',
    title: 'How to Read Your Credit Report Like a Pro',
    description: 'Learn to decode every section of your credit report and spot errors that cost you money',
    category: 'Credit Basics',
    difficulty: 'beginner',
    duration: '30 min',
    isPrime: false,
    points: 35,
    icon: '📄',
    lessons: [
      {
        id: '1',
        title: 'The Three Credit Bureaus',
        duration: '5 min',
        content: `There are THREE major credit bureaus. Each maintains a separate file on you.

## TransUnion
- Headquarters: Chicago, IL
- Founded: 1968
- Dispute Address: P.O. Box 2000, Chester, PA 19016
- Phone: 1-800-916-8800
- Online: transunion.com

## Equifax
- Headquarters: Atlanta, GA
- Founded: 1899 (oldest bureau!)
- Dispute Address: P.O. Box 740256, Atlanta, GA 30374
- Phone: 1-800-685-1111
- Online: equifax.com

## Experian
- Headquarters: Costa Mesa, CA
- Founded: 1996 (newest major bureau)
- Dispute Address: P.O. Box 4500, Allen, TX 75013
- Phone: 1-888-397-3742
- Online: experian.com

## Why Three Bureaus?

Not all creditors report to all three bureaus. This means:
- Your reports can be DIFFERENT at each bureau
- Your scores can be DIFFERENT at each bureau
- You need to check ALL THREE regularly

## Getting Your Free Reports

AnnualCreditReport.com - Official site for free reports
- One free report from each bureau per year
- Additional free reports if denied credit
- Free weekly reports (currently extended)

DO NOT use other sites that claim "free" - they often sign you up for paid services.`,
        quiz: [
          {
            question: 'How many major credit bureaus are there?',
            options: ['1', '2', '3', '4'],
            correct: 2
          }
        ]
      },
      {
        id: '2',
        title: 'Personal Information Section',
        duration: '5 min',
        content: `The first section of your credit report contains your personal identifying information.

## What's Included:

- Full legal name (and variations/misspellings)
- Current and previous addresses
- Social Security Number
- Date of birth
- Current and previous employers

## What to Check:

1. NAME ACCURACY
Look for misspellings or names that aren't yours. This could indicate:
- Simple error
- Mixed file (someone else's info on your report)
- Identity theft

2. ADDRESS HISTORY
All addresses should be places you've actually lived. Unknown addresses may indicate:
- Fraud
- Someone using your SSN
- Mixed file

3. EMPLOYER INFORMATION
This doesn't affect your score but check for accuracy. Wrong employers could indicate mixed files.

## Red Flags to Watch:

⚠️ Addresses you've never lived at
⚠️ Names you don't recognize
⚠️ Wrong date of birth
⚠️ Employers you've never worked for

## What This Section Does NOT Affect:

Your personal information section does NOT directly impact your credit score. But errors here can indicate larger problems with your file.

## Action Step:

If you find errors, you can dispute them. Include documentation proving your correct information.`
      },
      {
        id: '3',
        title: 'Account Information (Tradelines)',
        duration: '10 min',
        content: `This is the MEAT of your credit report. Each account is called a "tradeline."

## What's Included for Each Account:

- Creditor name
- Account number (partially masked)
- Account type
- Date opened
- Credit limit or loan amount
- Current balance
- Payment status
- Payment history (24-84 months)
- Date of last activity
- Date reported

## Account Types Explained:

REVOLVING ACCOUNTS
- Credit cards
- Lines of credit
- Balance can go up and down
- Payment varies based on balance

INSTALLMENT ACCOUNTS
- Auto loans
- Mortgages
- Student loans
- Fixed payment amount
- Set end date

OPEN ACCOUNTS
- Charge cards (Amex Green/Gold/Platinum)
- Full balance due each month

## Payment Status Codes:

- Current / Paid as Agreed: You're good! ✓
- 30 Days Late: Uh oh. Score damage starting.
- 60 Days Late: Serious damage.
- 90+ Days Late: Major damage.
- Charge-Off: Creditor gave up. Very bad.
- Collection: Sold to collectors. Very bad.

## Payment History Symbols:

Most reports show a grid of your payment history:
- OK or 1: Paid on time
- 30 or 2: 30-59 days late
- 60 or 3: 60-89 days late
- 90 or 4: 90-119 days late
- 120 or 5: 120-149 days late
- 150 or 6: 150-179 days late
- CO: Charge-off

## What to Check:

✓ Are all accounts yours?
✓ Are balances correct?
✓ Are credit limits correct? (Affects utilization!)
✓ Is payment history accurate?
✓ Are closed accounts showing as closed?
✓ Are there duplicates?`,
        quiz: [
          {
            question: 'What is a tradeline?',
            options: ['A credit score', 'A bank account', 'A credit account on your report', 'A type of loan'],
            correct: 2
          }
        ]
      },
      {
        id: '4',
        title: 'Public Records & Inquiries',
        duration: '5 min',
        content: `The final sections of your report can significantly impact your creditworthiness.

## Public Records

As of 2017-2018, most public records were removed. Currently only BANKRUPTCY appears.

Types of Bankruptcy:
- Chapter 7: Liquidation - stays 10 years
- Chapter 13: Repayment plan - stays 7 years

Tax liens and civil judgments were removed from credit reports in 2017-2018.

## Credit Inquiries

Two types of inquiries appear:

HARD INQUIRIES (Affect Score)
- You applied for credit
- Creditor pulled your report
- Stays for 2 years
- Only affects score for 1 year
- Each can cost 5-10 points

Examples: Credit card application, loan application, apartment rental application (sometimes)

SOFT INQUIRIES (No Effect)
- You checked your own credit
- Pre-approved offers
- Existing creditor review
- Employment check (usually)

Visible only to you, not other creditors.

## Rate Shopping Protection

If you're shopping for a mortgage, auto loan, or student loan:
- Multiple inquiries within 14-45 days count as ONE
- This lets you compare rates without score damage
- Credit card shopping does NOT have this protection!

## What to Check:

✓ Do you recognize all hard inquiries?
✓ Are there inquiries you didn't authorize?
✓ Any inquiries from companies you never applied to?

Unauthorized inquiries may indicate:
- Identity theft
- Creditor error
- Violation of FCRA (lawsuit potential!)`
      },
      {
        id: '5',
        title: 'Spotting Errors That Cost You Money',
        duration: '5 min',
        content: `Studies show 1 in 5 credit reports contain errors. Here's how to find them.

## Common Errors to Find:

### Identity Errors
- Wrong name or misspellings
- Wrong address
- Wrong Social Security Number
- Accounts belonging to someone with similar name

### Account Status Errors
- Closed accounts showing as open
- Paid accounts showing balance
- Wrong account open date
- Wrong credit limit (common!)
- Discharged bankruptcy debt showing balance

### Balance Errors
- Higher balance than actual
- Wrong credit limit
- Incorrect high balance

### Payment Errors
- On-time payments marked late
- Wrong payment dates
- Missing payments you made
- Incorrect last payment date

### Duplicate Errors
- Same account listed twice
- Original creditor AND collection for same debt
- Multiple collection agencies for same debt

### Outdated Information
- Negative items older than 7 years
- Bankruptcy older than 10 years (Ch. 7) or 7 years (Ch. 13)
- Inquiries older than 2 years

## How Errors Happen:

1. Data entry mistakes
2. Mixed files (similar names/SSN)
3. Identity theft
4. Creditor reporting errors
5. Outdated systems

## Your Rights:

Under the FCRA, you have the RIGHT to dispute ANY information you believe is inaccurate. The bureau MUST investigate within 30 days.

## Knight Pro Tip:

Use Knight Scanner to analyze your report and automatically identify potential errors and violations!`
      }
    ],
  },
  {
    id: 'credit-utilization-mastery',
    title: 'Credit Utilization Mastery',
    description: 'The fastest way to boost your score - master utilization strategies the pros use',
    category: 'Credit Basics',
    difficulty: 'beginner',
    duration: '20 min',
    isPrime: false,
    points: 30,
    icon: '📈',
    lessons: [
      {
        id: '1',
        title: 'Utilization Deep Dive',
        duration: '5 min',
        content: `Credit utilization is 30% of your score and the FASTEST way to improve it.

## The Formula

Utilization = (Credit Card Balances ÷ Credit Limits) × 100

## Example:
- Card 1: $500 balance / $2,000 limit = 25%
- Card 2: $1,500 balance / $5,000 limit = 30%
- Card 3: $0 balance / $3,000 limit = 0%
- TOTAL: $2,000 / $10,000 = 20% overall

## The Utilization Sweet Spots

🏆 1-9%: OPTIMAL - Maximum score benefit
✓ 10-29%: GOOD - Minimal impact
⚠️ 30-49%: FAIR - Starting to hurt
❌ 50-74%: BAD - Significant damage
💀 75%+: CRITICAL - Major score drop

## Two Types of Utilization

1. OVERALL UTILIZATION
Total balances ÷ Total limits across ALL cards

2. PER-CARD UTILIZATION  
Each individual card's balance ÷ its limit

BOTH matter! One maxed card hurts even if others are at $0.

## Why Per-Card Matters

Example:
- Card 1: $4,500 / $5,000 = 90% ❌
- Card 2: $0 / $5,000 = 0%
- Overall: $4,500 / $10,000 = 45%

Even though overall is 45%, that 90% per-card utilization HURTS.

## The Magic of Utilization

Unlike payment history, utilization has NO MEMORY. 

Pay down your cards today, your score can improve THIS MONTH.

This makes utilization the fastest lever to pull for score improvement.`
      },
      {
        id: '2',
        title: 'The Statement Date Secret',
        duration: '5 min',
        content: `Most people pay their credit card on the DUE DATE. Pros pay on the STATEMENT DATE.

## How Reporting Works

Credit card companies report your balance to bureaus once per month, typically on or near your STATEMENT DATE (not your due date).

Statement Date: When your bill is generated
Due Date: When payment is due (usually 21-25 days later)

## The Problem

If you charge $900 on a $1,000 limit card and pay in full by the due date:
- Statement date: $900 balance reported (90% utilization!)
- Due date: You pay $900
- Result: 90% utilization hits your credit report

## The Solution

Pay your balance BEFORE the statement date:
- Day before statement: Pay balance down to $50
- Statement date: $50 balance reported (5% utilization!)
- Due date: Pay remaining $50
- Result: 5% utilization reported

## The AZEO Method (All Zero Except One)

For MAXIMUM score optimization:
1. Pay ALL cards to $0 before their statement dates
2. Leave ONE small balance ($5-20) on ONE card
3. This shows activity but near-zero utilization

Why not all zeros? Some scoring models see all zeros as "not using credit."

## Finding Your Statement Date

- Check your credit card statement
- Call customer service
- Look at online account

Most cards let you CHANGE your statement date. Consider aligning them all for easier management.`
      },
      {
        id: '3',
        title: 'Utilization Hacks & Strategies',
        duration: '5 min',
        content: `Advanced strategies to optimize your utilization instantly.

## HACK 1: Request Credit Limit Increases

Higher limits = lower utilization without changing spending.

How to request:
- Call customer service
- Use online account (often no hard pull)
- Best time: After 6 months on account
- Best time: After income increase

Example:
- Before: $1,000 balance / $2,000 limit = 50%
- After CLI: $1,000 balance / $5,000 limit = 20%

## HACK 2: Multiple Payments Per Month

Don't wait for the bill. Make payments weekly or bi-weekly.
- Keeps utilization consistently low
- Never have high balance reported
- Builds good habits

## HACK 3: Balance Transfer for Utilization

If one card is maxed:
- Transfer some balance to a card with more room
- Spreads utilization across cards
- Lowers per-card utilization

## HACK 4: Become an Authorized User

Get added to someone's high-limit, low-balance card:
- Their limit adds to your available credit
- Instantly lowers your utilization
- No hard inquiry for you

## HACK 5: Open New Card (Carefully)

A new card adds to total available credit.
- Lowers overall utilization
- BUT creates hard inquiry
- BUT lowers average account age
- Best if you need more credit anyway

## HACK 6: Ask for Limit Match

If approved for high limit elsewhere, call other cards:
"I was just approved for a $10,000 limit with [Card]. Can you match that?"

Many will increase without hard pull to keep your business.`
      },
      {
        id: '4',
        title: 'Emergency Utilization Fix (48-Hour Boost)',
        duration: '5 min',
        content: `Need to boost your score FAST before a major application? Here's how.

## The 48-Hour Method

If you're applying for a mortgage, auto loan, or important credit card:

### 48 Hours Before Application:

1. PAY DOWN ALL CARDS
   • Get overall utilization under 10%
   • Get EACH card under 10%
   • Leave one card with tiny balance ($5-10)

2. VERIFY PAYMENTS POSTED
   • Check online that payments cleared
   • Balance should show updated
   • Wait for "current balance" to reflect payment

3. CHECK IF REPORTED YET
   • Most cards report monthly
   • If statement already closed, change may not show until next month
   • Consider calling card company to request early reporting

### If You Can't Pay Down:

Options if you don't have cash to pay:
- Borrow from family temporarily
- Transfer balances strategically
- Request emergency limit increase
- Delay application until you can pay down

### Timing Tips:

- Ask each card: "When do you report to bureaus?"
- Time payments to post before reporting date
- Allow 3-5 business days for bureaus to update
- Some cards report mid-cycle for balance changes

## Real Example:

John has $8,000 balance on $10,000 total limits (80% utilization).
His score is 640.

He pays down to $500 (5% utilization) 5 days before his mortgage application.

His score jumps to 695 - a 55 point increase!

This qualifies him for a much better interest rate.

## Warning:

Don't rack balances back up after getting approved. Lenders may do a final credit check before closing!`
      }
    ],
  },

  // ==================== FCRA & YOUR RIGHTS (8 courses) ====================
  {
    id: 'fcra-your-rights',
    title: 'FCRA: Your Legal Rights Explained',
    description: 'The Fair Credit Reporting Act gives you POWERFUL rights - learn to use them',
    category: 'FCRA Fundamentals',
    difficulty: 'beginner',
    duration: '35 min',
    isPrime: false,
    points: 40,
    icon: '⚖️',
    lessons: [
      {
        id: '1',
        title: 'What is the FCRA?',
        duration: '7 min',
        content: `The Fair Credit Reporting Act is YOUR weapon against credit bureaus and bad reporting.

## History

- Enacted: 1970
- Major Updates: 1996, 2003 (FACTA), 2010 (Dodd-Frank)
- Enforced by: FTC, CFPB, State Attorneys General
- Citation: 15 U.S.C. § 1681 et seq.

## What the FCRA Does

The FCRA regulates:
- How credit bureaus collect information
- How they share your information
- How long negative info can stay
- Your rights to dispute and correct
- Who can access your report

## The Key Players

1. CONSUMER REPORTING AGENCIES (CRAs)
   • TransUnion, Equifax, Experian
   • Also: ChexSystems, LexisNexis, etc.
   • Must follow FCRA rules

2. FURNISHERS
   • Banks, credit card companies, lenders
   • Collection agencies
   • They REPORT information to bureaus
   • Also have FCRA obligations

3. USERS
   • Anyone who pulls your credit
   • Must have "permissible purpose"
   • Must follow adverse action rules

## Why This Matters to You

The FCRA gives you the RIGHT to:
- Get free copies of your reports
- Dispute inaccurate information
- Know who accessed your report
- Sue for violations and collect damages

Understanding FCRA = Understanding your POWER.`
      },
      {
        id: '2',
        title: 'Your Right to Accurate Information',
        duration: '7 min',
        content: `The FCRA requires MAXIMUM POSSIBLE ACCURACY. This is your strongest weapon.

## The Accuracy Standard - §1681e(b)

"Whenever a consumer reporting agency prepares a consumer report it shall follow REASONABLE PROCEDURES to assure MAXIMUM POSSIBLE ACCURACY."

## What This Means

Bureaus cannot just report whatever creditors send them. They must:
- Have procedures to verify accuracy
- Investigate disputes properly
- Remove unverifiable information
- Prevent re-insertion of deleted items

## What Counts as "Inaccurate"?

- Completely false information
- Partially incorrect information
- Incomplete information that's misleading
- Outdated information
- Information belonging to someone else

## Examples of Inaccuracy:

✗ Wrong balance reported
✗ Wrong payment history
✗ Wrong account status
✗ Wrong dates
✗ Account that's not yours
✗ Duplicate reporting
✗ Failing to show account as disputed

## The "Technically True" Trap

Bureaus sometimes argue information is "technically accurate." Courts have ruled that MISLEADING information, even if technically true, can violate FCRA.

Example: Reporting a debt as "unpaid" when it was included in bankruptcy is misleading even if technically the debt wasn't directly "paid."

## Your Power

When information is inaccurate:
1. You can dispute it
2. Bureau MUST investigate
3. If unverifiable, must DELETE
4. If they fail, you can SUE`
      },
      {
        id: '3',
        title: 'Your Right to Dispute',
        duration: '7 min',
        content: `The dispute process is the heart of credit repair. Here's how the law protects you.

## The Dispute Right - §1681i

You have the RIGHT to dispute ANY information you believe is inaccurate or incomplete.

## Bureau Obligations When You Dispute:

1. CONDUCT INVESTIGATION
   • Must be "reasonable"
   • Cannot be just rubber-stamp verification
   • Must review all information you provide

2. TIME LIMIT: 30 DAYS
   • Must complete investigation within 30 days
   • Extended to 45 days if you provide additional info
   • Clock starts when they receive dispute

3. NOTIFY THE FURNISHER
   • Must tell creditor about your dispute
   • Must forward all relevant information
   • Furnisher must investigate too

4. REVIEW AND CONSIDER
   • Must consider all information you submit
   • Cannot ignore your evidence

5. REPORT RESULTS
   • Must notify you of results
   • Must provide updated report if changes made
   • Must tell you about your rights if unchanged

## What They MUST Delete:

- Information that cannot be verified
- Information the furnisher cannot support
- Information that is inaccurate
- Information that is incomplete and misleading

## The "Reinvestigation" Requirement

This is NOT just verification. They must actually INVESTIGATE. Simply asking the creditor "is this right?" and accepting "yes" may not be sufficient.

## Document Everything

- Send disputes via CERTIFIED MAIL
- Keep copies of all letters
- Note dates of all communications
- Save all responses`
      },
      {
        id: '4',
        title: 'Time Limits on Negative Information',
        duration: '7 min',
        content: `Negative information can't haunt you forever. The FCRA sets strict time limits.

## The 7-Year Rule - §1681c

Most negative information must be REMOVED after 7 years.

## Specific Time Limits:

LATE PAYMENTS: 7 years from date of delinquency

COLLECTIONS: 7 years from original delinquency date (NOT from when sold to collector)

CHARGE-OFFS: 7 years from date of first delinquency leading to charge-off

CHAPTER 13 BANKRUPTCY: 7 years from filing date

CHAPTER 7 BANKRUPTCY: 10 years from filing date

PAID TAX LIENS: Removed from reports (as of 2018)

UNPAID TAX LIENS: Removed from reports (as of 2018)

CIVIL JUDGMENTS: Removed from reports (as of 2017)

HARD INQUIRIES: 2 years

## How to Calculate the Date

The key is the DATE OF FIRST DELINQUENCY (DOFD).

This is the date you FIRST went late and never brought current again.

Example:
- January 2020: Account goes 30 days late
- February 2020: Goes 60 days late
- March 2020: Goes 90 days late
- June 2020: Charged off
- October 2020: Sold to collections

The DOFD is January 2020. The 7-year clock started then.
Must be removed by January 2027.

## The Collection Date Trick

Some collectors try to restart the clock. THIS IS ILLEGAL.

The collection agency cannot change your DOFD. It's based on the ORIGINAL creditor's first delinquency date.

If a collector is reporting a later date, DISPUTE IT!

## Obsolete Information = Easy Win

If negative info is older than the time limit:
1. Dispute it as obsolete
2. Bureau MUST remove it
3. If they don't, you have lawsuit grounds`
      },
      {
        id: '5',
        title: 'Your Right to Sue (And Win)',
        duration: '7 min',
        content: `When bureaus violate your rights, you can take them to court and get PAID.

## FCRA Damages - §1681n and §1681o

Two types of violations:

### WILLFUL Violations (§1681n)
When they KNOWINGLY violate or show RECKLESS DISREGARD:
- Actual damages (what you lost)
- Statutory damages: $100 - $1,000 per violation
- Punitive damages (punishment)
- Attorney fees and costs

### NEGLIGENT Violations (§1681o)
When they failed to follow reasonable procedures:
- Actual damages
- Attorney fees and costs

## What Are "Actual Damages"?

- Credit denials
- Higher interest rates paid
- Lost job opportunities
- Emotional distress
- Out-of-pocket costs

## Examples of Violations That Win Cases:

✓ Failing to investigate dispute properly
✓ Reporting information after told it's wrong
✓ Reinserting deleted information
✓ Mixing your file with someone else's
✓ Reporting obsolete information
✓ Ignoring your dispute entirely
✓ Not reporting dispute status to creditor

## Statute of Limitations

You must sue within:
- 2 years of discovering the violation, OR
- 5 years after the violation occurred
(whichever is earlier)

## Finding an Attorney

Many FCRA attorneys work on CONTINGENCY (no upfront cost).

Resources:
- National Association of Consumer Advocates (NACA)
- Consumer lawyers in your state
- Knight can provide referrals for PRIME members

## The Settlement Reality

Most FCRA cases settle before trial. Bureaus don't want to risk:
- Bad publicity
- Large jury verdicts
- Setting precedent
- Attorney fees piling up

Your documented disputes create the foundation for any potential lawsuit.`
      }
    ],
  },
  {
    id: 'disputing-step-by-step',
    title: 'Disputing Errors: Complete Step-by-Step Guide',
    description: 'The exact process to dispute errors and WIN - from first letter to final deletion',
    category: 'FCRA Fundamentals',
    difficulty: 'beginner',
    duration: '40 min',
    isPrime: false,
    points: 45,
    icon: '📝',
    lessons: [
      {
        id: '1',
        title: 'Before You Dispute: Preparation',
        duration: '8 min',
        content: `Proper preparation makes your disputes more effective.

## Step 1: Get All Three Reports

Get your free reports from AnnualCreditReport.com:
- TransUnion
- Equifax  
- Experian

Review EACH ONE separately. They often have different information.

## Step 2: Create Your Dispute List

For each error, document:
- Which bureau(s) it appears on
- Account name and number
- What's wrong specifically
- What it should say
- Evidence you have

## Step 3: Gather Supporting Documents

Collect anything that proves your case:
- Bank statements showing payments
- Letters from creditors
- Court documents
- Payment confirmations
- Identity theft reports

ALWAYS send COPIES, never originals!

## Step 4: Prioritize Your Disputes

Focus first on:
1. Items with biggest score impact (recent lates, collections)
2. Items easiest to prove wrong
3. Items that are clearly inaccurate

Don't try to dispute everything at once. 3-5 items per round is ideal.

## Step 5: Choose Your Method

THREE ways to dispute:

1. MAIL (Recommended)
   • Creates paper trail
   • Certified mail proves receipt
   • Forces proper investigation

2. ONLINE
   • Faster but less effective
   • Limited space to explain
   • No paper trail

3. PHONE
   • Least recommended
   • No documentation
   • Easy for them to ignore

For serious disputes, ALWAYS use certified mail.`
      },
      {
        id: '2',
        title: 'Writing Effective Dispute Letters',
        duration: '10 min',
        content: `Your dispute letter is your legal document. Make it count.

## Essential Elements:

### 1. YOUR INFORMATION
- Full legal name
- Current address
- Social Security Number (last 4 okay)
- Date of birth

### 2. CLEAR IDENTIFICATION
"I am disputing the following item on my credit report:"
- Creditor name
- Account number
- Type of account

### 3. SPECIFIC REASON
Don't be vague. State EXACTLY what's wrong:

BAD: "This account is wrong."
GOOD: "This account shows a balance of $5,432 but was paid in full on March 15, 2024. Enclosed is the payoff letter confirming zero balance."

### 4. WHAT YOU WANT
State your requested outcome:
- "Please delete this account"
- "Please update the balance to $0"
- "Please change the status to 'Paid as Agreed'"

### 5. LEGAL REFERENCE
"Under the Fair Credit Reporting Act, 15 U.S.C. § 1681i, you are required to investigate this dispute within 30 days."

### 6. DOCUMENTATION LIST
"Enclosed please find copies of:"
- Payment confirmation dated XX
- Letter from creditor dated XX
- Bank statement from XX

### 7. REQUEST FOR RESPONSE
"Please send written confirmation of your investigation results and an updated copy of my credit report."

## Sample Opening:

"Dear Sir or Madam:

I am writing to dispute inaccurate information appearing on my credit report. Under the Fair Credit Reporting Act, I have the right to dispute any information I believe to be inaccurate, and you are required to investigate.

The following item is inaccurate and must be corrected or removed:"

## Tone Tips:

- Be professional, not emotional
- Stick to facts
- Don't threaten (yet)
- Be specific, not vague
- Keep it concise

Use Knight Dispute Generator for professionally crafted letters!`
      },
      {
        id: '3',
        title: 'Sending Your Dispute',
        duration: '7 min',
        content: `HOW you send your dispute matters as much as what you send.

## The Certified Mail Rule

ALWAYS send disputes via USPS Certified Mail with Return Receipt Requested.

Why:
- Proves they received it
- Documents the exact date received
- Starts the 30-day investigation clock
- Creates evidence for potential lawsuit
- Prevents "we never got it" claims

## How to Send Certified Mail:

1. Go to the Post Office
2. Ask for "Certified Mail with Return Receipt"
3. Fill out the green card (return receipt)
4. Keep your receipt with tracking number
5. Cost: About $7-8 total

## What to Include in the Envelope:

- Your dispute letter
- Copies of supporting documents
- Copy of your credit report with items circled (optional)
- Copy of your ID (they may request)

## Mailing Addresses:

TransUnion Consumer Solutions
P.O. Box 2000
Chester, PA 19016

Equifax Information Services LLC
P.O. Box 740256
Atlanta, GA 30374

Experian
P.O. Box 4500
Allen, TX 75013

## After Mailing:

1. Track your certified mail online at USPS.com
2. Note the delivery date (30-day clock starts)
3. File your receipt with your records
4. Set calendar reminder for 30 days
5. Wait for response

## Record Keeping:

Create a folder (physical or digital) containing:
- Copy of your dispute letter
- Copies of all enclosures
- Certified mail receipt
- Tracking confirmation
- Delivery confirmation
- Their response (when received)`
      },
      {
        id: '4',
        title: 'Understanding Their Response',
        duration: '8 min',
        content: `You'll get one of several responses. Here's what each means and what to do.

## RESPONSE 1: "Item Deleted"

🎉 VICTORY! The item has been removed.

Action:
- Get updated credit report to confirm
- Check ALL THREE bureaus
- Save the deletion letter
- Monitor for re-insertion (illegal if it happens)

## RESPONSE 2: "Item Updated/Modified"

Partial win. They changed something but didn't delete.

Action:
- Review what was changed
- If still inaccurate, dispute AGAIN with new specifics
- Request "method of verification"
- Consider escalating

## RESPONSE 3: "Verified as Accurate"

They claim the item is correct.

Action:
- This does NOT mean they properly investigated
- Request "Method of Verification" letter
- Prepare follow-up dispute with more evidence
- Consider direct dispute to furnisher
- Consider CFPB complaint
- Consult attorney if continued failures

## RESPONSE 4: "Frivolous/Not Investigated"

They claim your dispute lacks sufficient information.

Action:
- Often ILLEGAL - they must investigate unless truly frivolous
- Send new dispute with MORE detail and documentation
- File CFPB complaint
- This may be grounds for lawsuit

## RESPONSE 5: No Response (After 30+ Days)

They failed to respond in time.

Action:
- This is a VIOLATION of FCRA
- Send follow-up letter noting the violation
- File CFPB complaint immediately
- Consult attorney - this is strong lawsuit material

## The Method of Verification Request

If they "verify" something, you have the right to know HOW.

Send a letter requesting:
"Please provide the method of verification used in your investigation, including the name and contact information of anyone you spoke with."

Bureaus often can't provide real verification details because they didn't really investigate. This creates lawsuit ammunition.`
      },
      {
        id: '5',
        title: 'Escalation Strategies',
        duration: '7 min',
        content: `When regular disputes don't work, it's time to escalate.

## LEVEL 1: Direct Furnisher Dispute

Dispute directly with the creditor/collection agency (not just the bureau).

Under §1681s-2(b), when they receive notice of dispute, furnishers MUST:
- Conduct their own investigation
- Review all information you provide  
- Report results to bureau
- Correct any inaccuracies

Send the same dispute letter directly to the furnisher. They often respond better than bureaus.

## LEVEL 2: CFPB Complaint

The Consumer Financial Protection Bureau takes complaints seriously.

Website: consumerfinance.gov/complaint

Your complaint:
- Gets sent to the bureau/furnisher
- Requires response within 15 days
- Creates federal record
- Often gets better results

Include:
- Copies of your disputes
- Their responses
- Explanation of the issue
- What you want done

## LEVEL 3: State Attorney General

Your state AG has authority to act on credit reporting issues.

Find yours at: naag.org

File complaint similar to CFPB.

## LEVEL 4: Legal Action

When all else fails, a lawsuit often gets results.

Benefits of suing:
- Bureaus take it seriously
- Many cases settle quickly
- You can recover damages
- Attorneys often work on contingency

Grounds for lawsuit:
- Failure to investigate properly
- Continued reporting after dispute
- Reinserting deleted items
- Mixing files
- Reporting obsolete info
- Willful non-compliance

## Escalation Letter Language:

"Despite multiple disputes, you have failed to properly investigate or correct this inaccurate information. This constitutes a violation of FCRA §1681i. 

If this matter is not resolved within 15 days, I will:
1. File a complaint with the Consumer Financial Protection Bureau
2. File a complaint with the [State] Attorney General
3. Pursue all legal remedies available under the FCRA, including statutory and punitive damages."

Sometimes the threat of action gets results. But be prepared to follow through.`
      }
    ],
  },
  {
    id: 'collection-accounts-guide',
    title: 'Collections: The Complete Survival Guide',
    description: 'Everything you need to know about dealing with collection accounts legally',
    category: 'Debt Management',
    difficulty: 'beginner',
    duration: '45 min',
    isPrime: false,
    points: 50,
    icon: '📞',
    lessons: [
      {
        id: '1',
        title: 'Understanding Collections',
        duration: '7 min',
        content: `Collection accounts are one of the most damaging items on a credit report. Here's how they work.

## The Collection Timeline

1. You miss payments (30, 60, 90 days)
2. Original creditor sends to internal collections
3. Account "charges off" (typically 180 days)
4. Sold or assigned to collection agency
5. Collection appears on credit report
6. May be sold to another collector
7. Eventually falls off (7 years from DOFD)

## Types of Debt Collectors

FIRST-PARTY COLLECTORS
- Original creditor's internal collection department
- Still own the debt
- More likely to work with you

THIRD-PARTY COLLECTION AGENCIES
- Hired by original creditor
- May not own the debt
- Work on commission

DEBT BUYERS
- Purchase debts for pennies on the dollar
- Now own the debt
- Most aggressive
- Often have poorest documentation

## How Collections Affect Your Score

- First collection: -50 to -100+ points
- Recent collections hurt more than old ones
- Multiple collections have diminishing additional impact
- Newer FICO models (9, 10) ignore paid collections
- VantageScore 3.0+ ignores paid collections

## The Original Creditor Relationship

Key distinction:
- Original creditor may STILL report their tradeline
- Collection agency reports THEIR tradeline
- You may see BOTH on your report
- This is legal but should show same debt

You should NOT see:
- Original creditor showing balance AND collection showing balance
- Multiple collectors reporting same debt simultaneously`
      },
      {
        id: '2',
        title: 'Your Rights Under the FDCPA',
        duration: '8 min',
        content: `The Fair Debt Collection Practices Act protects you from collector abuse.

## What Collectors CANNOT Do:

### Harassment (§1692d)
- Call repeatedly to annoy
- Use profane language
- Threaten violence
- Publish your name as a debtor

### False or Misleading Statements (§1692e)
- Lie about the amount owed
- Claim to be attorneys when not
- Threaten actions they can't take
- Imply you committed a crime

### Unfair Practices (§1692f)
- Collect unauthorized amounts
- Deposit post-dated checks early
- Take property without right
- Use deceptive means to collect

## Communication Restrictions (§1692c)

Collectors CANNOT:
- Call before 8 AM or after 9 PM (your time zone)
- Call you at work if you tell them not to
- Contact you after you request written-only communication
- Contact you if you have an attorney (must contact attorney)
- Discuss your debt with others (except spouse, attorney, cosigner)

## Validation Rights (§1692g)

Within 5 days of first contact, they MUST send:
- Amount of the debt
- Name of creditor
- Notice of your right to dispute
- Notice they'll provide verification if requested

If you request validation within 30 days:
- They MUST stop collection
- They MUST provide validation
- Cannot resume until they do

## Your Right to Stop Contact

You can send a "cease and desist" letter demanding they stop contacting you.

They can then ONLY contact you to:
- Confirm they'll stop
- Notify you of specific action (lawsuit)

WARNING: This doesn't make the debt go away. They can still sue.`
      },
      {
        id: '3',
        title: 'Debt Validation: Your Secret Weapon',
        duration: '10 min',
        content: `Debt validation is the most powerful tool against collectors. Use it.

## What is Debt Validation?

Your legal right to demand PROOF that:
- The debt is actually yours
- The amount is correct
- They have the right to collect

## When to Request Validation

ALWAYS within 30 days of their first contact.

After 30 days, you can still request, but they don't have to stop collecting while getting proof.

## What to Request:

1. Proof you owe the debt
2. Name and address of original creditor
3. Amount of original debt
4. Complete payment history
5. Copy of original signed agreement
6. Proof they own or have authority to collect the debt
7. Their license to collect in your state

## Why Validation Works

Many debts, especially old ones, have been sold multiple times. 

Original documentation gets lost. The collector may have:
- No signed contract
- No proof of original balance
- No chain of ownership
- No proof it's even your debt

If they can't PROVE it, they can't legally collect it.

## What Happens After You Request:

SCENARIO 1: They Validate
- They provide documentation
- You now know the debt is legitimate
- Proceed with dispute or negotiation

SCENARIO 2: They Can't Validate
- They must stop collecting
- They must remove from credit reports
- The debt essentially goes away

SCENARIO 3: They Ignore and Keep Collecting
- This is an FDCPA violation
- You can sue for damages
- Consult an attorney

## Sample Validation Letter:

"I am writing regarding the above-referenced account. Under the Fair Debt Collection Practices Act (15 U.S.C. § 1692g), I am requesting validation of this alleged debt.

Please provide:
1. Proof that I owe this debt
2. The name and address of the original creditor
3. A copy of the original signed agreement
4. Complete account and payment history
5. Documentation of your authority to collect

Until validation is provided, cease all collection activities and credit reporting.

This is not an acknowledgment of any debt."

Send via certified mail!`
      },
      {
        id: '4',
        title: 'Negotiation Strategies',
        duration: '10 min',
        content: `If you owe the debt and want to resolve it, negotiation can save you money.

## STRATEGY 1: Pay for Delete (PFD)

Offer to pay in exchange for COMPLETE REMOVAL from credit reports.

How it works:
- Offer to pay (usually less than full amount)
- Condition: They delete the tradeline entirely
- Get agreement IN WRITING before paying
- They remove, your credit improves

Success rate: Mixed. Some collectors do it, some don't. Debt buyers more likely to agree.

Sample language:
"I am willing to pay $X as settlement in full, contingent upon your written agreement to delete all references to this account from my credit reports within 30 days of payment."

## STRATEGY 2: Settlement

Pay less than the full amount to resolve the debt.

Typical settlements:
- Recent debt: 50-70% of balance
- Old debt: 20-40% of balance
- Debt buyers: Sometimes as low as 10-20%

Tips:
- Start LOW (25% of balance)
- Negotiate up slowly
- Get it in writing BEFORE paying
- Understand it may still show as "settled" on credit report

## STRATEGY 3: Payment Plan

If you can't pay lump sum, negotiate payments.

Get in writing:
- Total amount
- Monthly payment amount
- Duration
- Interest (should be 0%)
- What happens if you miss a payment

## STRATEGY 4: Hardship Programs

If you're facing genuine hardship:
- Medical issues
- Job loss
- Divorce
- Natural disaster

Explain your situation. Many creditors have hardship programs with:
- Reduced payments
- Lower interest
- Waived fees
- Settlement options

## NEVER Do These Things:

❌ Give them access to your bank account
❌ Pay with post-dated checks
❌ Acknowledge the debt is yours (until verified)
❌ Make partial payments without agreement (can restart statute of limitations in some states)
❌ Agree to anything verbally - GET IT IN WRITING`
      },
      {
        id: '5',
        title: 'Statute of Limitations',
        duration: '10 min',
        content: `The statute of limitations can make old debts uncollectible. This is powerful knowledge.

## What is the Statute of Limitations?

The time period during which a creditor can SUE you to collect a debt.

After SOL expires:
- Debt is "time-barred"
- They can't win a lawsuit
- But they can still ATTEMPT to collect
- And it can still be on your credit report (separate 7-year rule)

## SOL by State (Common Debt Types)

This varies by state and debt type. Common ranges:
- Credit cards: 3-6 years
- Medical debt: 3-6 years
- Auto loans: 4-6 years
- Mortgages: 6-15 years

Check your state's specific laws!

## When Does SOL Start?

Usually starts from:
- Date of last payment, OR
- Date of last activity, OR
- Date of charge-off

Depends on your state's law and the contract.

## DANGER: Restarting the Clock

In many states, certain actions can RESTART the SOL:
- Making a payment (even $1)
- Making a promise to pay
- Acknowledging the debt in writing
- Entering a payment plan

This is why collectors try to get you to:
- Make a "good faith" payment
- Agree to pay
- Acknowledge you owe it

NEVER do this on old debt without understanding SOL!

## Using SOL in Your Defense

If sued on time-barred debt:
1. RESPOND to the lawsuit (don't ignore!)
2. Raise SOL as an "affirmative defense"
3. Request case dismissal
4. Consider counter-suing if they knew it was time-barred

## SOL vs. Credit Reporting

These are DIFFERENT timelines:

SOL: How long they can sue (state law, varies)
Credit Reporting: How long it appears on report (7 years from DOFD)

A debt can be:
- Past SOL but still on credit report
- Within SOL but fallen off credit report

## Sample Response to Time-Barred Collection:

"I am in receipt of your letter dated [X] regarding the alleged debt referenced above.

Please be advised that this debt is beyond the statute of limitations in [State] and is therefore legally unenforceable.

I demand that you cease all collection activities and remove any reporting to credit bureaus.

Any attempt to collect this time-barred debt may constitute a violation of the FDCPA."`
      }
    ],
  },
  // ==================== CREDIT BUILDING (8 courses) ====================
  {
    id: 'building-credit-from-zero',
    title: 'Building Credit From Zero',
    description: 'No credit history? No problem. Build excellent credit from scratch.',
    category: 'Credit Building',
    difficulty: 'beginner',
    duration: '30 min',
    isPrime: false,
    points: 35,
    icon: '🏗️',
    lessons: [
      {
        id: '1',
        title: 'No Credit vs Bad Credit',
        duration: '5 min',
        content: `First, understand where you're starting from.

## No Credit ("Thin File")

You have no credit if:
- You've never had a credit card
- You've never had a loan in your name
- You have no accounts reporting to bureaus
- You're new to the country

Result: No credit score or "insufficient history"

## Bad Credit (Low Score)

You have bad credit if:
- You have negative items (late payments, collections)
- Your score is below 580
- You have accounts but they're damaging

## Which is Easier to Fix?

NO CREDIT is generally easier to fix.
- Just need to build positive history
- No negatives to remove
- Can build to 700+ in 6-12 months

BAD CREDIT requires:
- Building positive history AND
- Dealing with negative items
- Takes longer (1-3 years typically)

## The Good News

Both are fixable! The strategies differ but success is achievable in both cases.

## Your Starting Point

If checking your credit shows:
- "No record found" = No credit, build from scratch
- Score below 500 = Bad credit, need repair + building
- Score 500-600 = Some negative history, repair + building
- Score 600+ = Working credit, optimize and grow`
      },
      {
        id: '2',
        title: 'Secured Credit Cards',
        duration: '7 min',
        content: `Secured cards are the foundation of credit building. Everyone qualifies.

## What is a Secured Card?

A credit card backed by a cash deposit you provide.
- Your deposit = your credit limit
- $200 deposit = $200 limit
- The deposit protects the bank if you don't pay

## Why Secured Cards Work

- Almost everyone gets approved
- Reports to bureaus like regular credit card
- Builds real payment history
- Many "graduate" to unsecured cards
- Gets your foot in the door

## Best Secured Cards for Building Credit

DISCOVER IT SECURED
- Reports to all 3 bureaus
- Earns cash back rewards
- Automatic graduation reviews
- No annual fee
- Deposit returned when you upgrade

CAPITAL ONE SECURED
- May require less than full deposit
- Reports to all 3 bureaus
- No annual fee
- Automatic credit line reviews

OPENSKY SECURED
- No credit check at all
- Reports to all 3 bureaus
- $35 annual fee
- Good for bad credit rebuilding

## How to Use Your Secured Card

1. Put down minimum deposit ($200-500)
2. Use for ONE small recurring purchase (Netflix, etc.)
3. Set up AUTOPAY for full balance
4. Never use more than 10% of limit
5. Pay statement balance in full monthly

Example with $500 limit:
- Charge $30/month (6% utilization)
- Autopay pays it off
- Perfect payment history builds
- After 6-12 months, request graduation

## The Graduation Path

After 6-12 months of perfect payments:
- Discover: Automatic review, may upgrade automatically
- Capital One: Review and may increase limit/convert
- Others: Apply for unsecured card, then close secured

When you graduate, you get your deposit back!`
      },
      {
        id: '3',
        title: 'Authorized User Strategy',
        duration: '7 min',
        content: `Becoming an authorized user is the FASTEST way to build credit. Instant history.

## What is an Authorized User?

You're added to someone else's credit card account. Their account history appears on YOUR credit report.

## Why It's Powerful

- INSTANT credit history
- You inherit their payment history
- You inherit their account age
- You don't even need to use the card
- No hard inquiry on your credit

## The Ideal Account to Be Added To

Look for an account with:
✓ Perfect payment history (no lates EVER)
✓ Low utilization (under 20%)
✓ Long history (5+ years ideal, 10+ amazing)
✓ High credit limit ($5,000+)
✓ No negative marks

## Who to Ask

- Parents (best option - willing to help)
- Spouse
- Siblings
- Close family members
- Very trusted friends

This requires trust. They're giving you potential access to their credit line. And their behavior affects you now.

## How It Works

1. Account owner calls credit card company
2. Requests to add you as authorized user
3. Provides your name, DOB, SSN
4. Card is issued in your name (optional - you don't need to use it)
5. Account history appears on your report (often within 30 days)

## Important Notes

- Not all cards report AU accounts to all bureaus
- Chase, Amex, Discover, most major banks DO report
- Some cards report full history, others only from when you were added
- You're not legally responsible for the debt
- You can be removed at any time

## AU "Piggybacking"

There are services that sell authorized user spots on stranger's accounts. This:
- Is expensive ($200-500+ per tradeline)
- May work but risky
- Might be detected by lenders
- Not recommended when you can use family

## Best Practice

Get added to 1-2 family members' oldest, best accounts. Even one good AU account can jump-start your credit file significantly.`
      },
      {
        id: '4',
        title: 'Credit Builder Loans',
        duration: '5 min',
        content: `Credit builder loans help establish installment loan history without traditional approval.

## How Credit Builder Loans Work

Unlike normal loans:
1. You apply and get approved
2. The loan amount goes into a SAVINGS ACCOUNT (you don't get it yet)
3. You make monthly payments
4. Payments are reported to credit bureaus
5. When loan is paid off, you get the money

You're essentially saving money while building credit.

## Why They Work

- Almost anyone qualifies
- Builds installment loan history
- Improves credit mix
- Forces savings discipline
- Payments reported to bureaus

## Where to Get Credit Builder Loans

SELF (formerly Self Lender)
- App-based, easy to use
- $25-150/month payments
- Reports to all 3 bureaus
- Popular choice

CREDIT UNIONS
- Many offer credit builder programs
- Often lower fees
- Local support

COMMUNITY BANKS
- Similar programs available
- Check local options

CHIME CREDIT BUILDER
- Secured credit card that works like credit builder
- Move money to "Credit Builder" account
- Spend from it and it's reported as on-time payments

## Typical Terms

- Loan amounts: $300 - $3,000
- Terms: 12-24 months
- Payments: $25-150/month
- Interest: 5-15% APR (but you're earning it back)

## The Combo Strategy

For fastest credit building, combine:
1. Secured credit card (revolving credit)
2. Credit builder loan (installment credit)
3. Authorized user account (age + history)

This gives you:
- Multiple account types (credit mix)
- Multiple payment history sources
- Faster score growth`
      },
      {
        id: '5',
        title: 'Your Credit Building Timeline',
        duration: '6 min',
        content: `Here's a realistic timeline for building credit from nothing.

## MONTH 1: Foundation

Actions:
- Open secured credit card ($200-500 deposit)
- Get added as authorized user (if possible)
- Start credit builder loan

Status:
- No score yet (need 6 months of history for FICO)
- VantageScore may generate sooner

## MONTHS 2-3: Building

Actions:
- Use secured card for one small charge/month
- Pay statement balance in FULL
- Keep utilization under 10%
- Make credit builder payments on time

Status:
- Still building, no score yet
- Perfect payment history accumulating

## MONTHS 4-6: First Score

Actions:
- Continue perfect payments
- Check for errors on reports
- Consider second secured card (only if responsible)

Status:
- FICO score generates around month 6
- Expect 650-700 if all positive
- With good AU account, possibly higher

## MONTHS 7-12: Growth

Actions:
- Continue perfect behavior
- Request secured card graduation
- Consider first unsecured card application

Status:
- Score should be 680-720+
- Building towards "good credit" territory
- History establishes consistency

## YEAR 2: Optimization

Actions:
- Graduate to unsecured cards
- Request credit limit increases
- Let accounts age
- Diversify credit types if needed

Status:
- Score should be 720-750+
- Qualifying for good interest rates
- Strong foundation established

## YEAR 3+: Excellent Credit

Actions:
- Maintain perfect payments
- Keep utilization low
- Don't close old accounts
- Strategic applications only

Status:
- Score 750-800+
- Best rates available
- Strong credit profile

## Key Success Factors

✓ NEVER miss a payment (set up autopay!)
✓ Keep utilization under 10%
✓ Don't apply for too much too fast
✓ Don't close old accounts
✓ Be patient - time is part of the formula`
      }
    ],
  },
  {
    id: 'rebuilding-after-disaster',
    title: 'Rebuilding Credit After Financial Disaster',
    description: 'Bankruptcy, foreclosure, or total collapse? Here is your comeback plan.',
    category: 'Credit Building',
    difficulty: 'intermediate',
    duration: '35 min',
    isPrime: false,
    points: 40,
    icon: '🔄',
    lessons: [
      {
        id: '1',
        title: 'Life After Bankruptcy',
        duration: '7 min',
        content: `Bankruptcy isn't the end. Many people rebuild to excellent credit within 2-3 years.

## Types of Bankruptcy

CHAPTER 7 (Liquidation)
- Wipes out most unsecured debt
- Assets may be sold (with exemptions)
- Stays on credit report: 10 years
- Eligibility: Income-based (means test)

CHAPTER 13 (Repayment Plan)
- 3-5 year repayment plan
- Keep your assets
- Stays on credit report: 7 years
- More control over process

## Immediate Impact

After bankruptcy, expect:
- Score drop of 100-200+ points
- Difficulty getting approved for credit
- Higher interest rates when approved
- Some landlords may reject applications
- Some employers may have concerns

## The Silver Lining

Bankruptcy can HELP your credit recovery:
- Eliminates debt-to-income ratio (no more debt!)
- Removes collections and charge-offs as "active" issues
- Provides clean slate to rebuild
- Discharged debts should show $0 balance

## Your Rights After Bankruptcy

Creditors CANNOT:
- Continue to report balance on discharged debts
- Continue collection activity
- Report late payments on discharged debts

If they do, this is both a bankruptcy violation AND FCRA violation. Dispute it!

## Rebuilding Strategy

Start IMMEDIATELY after discharge:
1. Get secured credit card (yes, you can!)
2. Apply for credit builder loan
3. Become authorized user if possible
4. Make perfect payments on ALL bills
5. Monitor credit reports closely

Many people with bankruptcies reach 700+ within 2 years of discharge.`
      },
      {
        id: '2',
        title: 'Recovering from Collections & Charge-offs',
        duration: '7 min',
        content: `Multiple collections or charge-offs? Here's your action plan.

## Assess the Damage

First, get all three credit reports and list:
- All collection accounts
- All charge-offs
- The dates on each (DOFD)
- The amounts
- How long until they fall off

## Priority Strategy

Focus on accounts in this order:

1. ACCOUNTS WITH ERRORS
   Easiest wins - dispute inaccuracies first

2. NEWEST ACCOUNTS
   Recent negatives hurt most - try to resolve

3. LARGEST BALANCES
   Bigger impact on credit utilization

4. OLDEST ACCOUNTS
   May be close to falling off - sometimes best to wait

## The Dispute-First Approach

Before paying ANYTHING, dispute:
- Any accounts you don't recognize
- Inaccurate balances
- Wrong dates
- Duplicate accounts
- Accounts past 7-year mark

You may get deletions without paying!

## If You Need to Pay

For legitimate debts you owe:

Pay for Delete > Settlement > Full Payment

Try to negotiate deletion in exchange for payment. Get it in writing before paying.

## The Waiting Game

Sometimes the best strategy is to:
- Focus on building NEW positive credit
- Let old negatives age (they hurt less over time)
- Wait for them to fall off at 7 years

This is especially true if:
- You can't afford to pay
- Accounts are 4+ years old
- Creditor won't negotiate

## Rebuilding While Recovering

Even with active negatives:
- Get secured credit cards (possible even with bad credit)
- Start credit builder loan
- Become authorized user
- Build positive history that will outlast the negatives`
      },
      {
        id: '3',
        title: 'After Foreclosure',
        duration: '7 min',
        content: `Foreclosure is devastating but recoverable. Here's the path back to homeownership.

## Foreclosure Impact

- Score drop: 100-150+ points
- Stays on credit report: 7 years
- Waiting period for new mortgage: 2-7 years
- May have deficiency balance (if home sold for less than owed)

## Waiting Periods for New Mortgage

FHA LOANS
- With extenuating circumstances: 1 year
- Standard: 3 years

CONVENTIONAL LOANS
- Fannie Mae/Freddie Mac: 7 years
- Can reduce to 3 years with extenuating circumstances + 20% down

VA LOANS
- 2 years from foreclosure completion
- Must have restored entitlement

USDA LOANS
- 3 years

## Extenuating Circumstances

You may qualify for shorter waiting periods if:
- Job loss beyond your control
- Medical emergency
- Divorce (sometimes)
- Military deployment issues
- Death of wage earner

Document everything. You'll need to prove it wasn't poor financial management.

## The Deficiency Balance Problem

If your home sold for less than you owed:
- You may owe the difference
- This may become a collection account
- Some states don't allow deficiency collection (non-recourse)

Check your state's laws and address any deficiency strategically.

## Rebuilding Path

YEARS 1-2
- Secured credit cards
- Credit builder loans
- Perfect payment history
- Save for down payment

YEARS 2-3
- Unsecured credit cards
- Auto loan if needed (helps credit mix)
- Score recovery to 640+

YEARS 3-7
- Eligible for FHA (year 3)
- Continue building
- Conventional at year 7 (or 3 with circumstances)

## The Goal

Many people buy homes again:
- FHA allows purchase with 580 score and 3.5% down
- After 3-year waiting period, homeownership is possible again
- Use the time to build savings and credit`
      },
      {
        id: '4',
        title: 'The 2-Year Comeback Plan',
        duration: '7 min',
        content: `No matter how bad things are, this 2-year plan works.

## THE FOUNDATION (Months 1-3)

WEEK 1:
- Pull all 3 credit reports
- List every negative item
- Identify errors to dispute
- Open secured credit card

MONTH 1:
- Send disputes for clear errors
- Set up small recurring charge on secured card
- Enable autopay for full balance
- Start credit builder loan if possible

MONTHS 2-3:
- Continue perfect payments
- Review dispute responses
- Send follow-up disputes
- Research authorized user options

## BUILDING PHASE (Months 4-12)

MONTH 4-6:
- Payment history building
- More disputes if needed
- Get added as authorized user
- Score should start generating

MONTH 7-9:
- Score improvements visible
- Consider second secured card
- Continue negotiating old debts
- Request credit limit increases

MONTH 10-12:
- Apply for first unsecured card
- Score should be 600+
- Progress visible
- Maintain perfect behavior

## GROWTH PHASE (Year 2)

MONTH 13-18:
- Graduate secured cards
- Add more positive accounts
- Score should reach 680-720
- Negatives hurting less

MONTH 19-24:
- Apply for prime credit cards
- Consider auto loan if needed
- Score should be 700+
- Well-established positive history

## Keys to Success

✓ Perfect payments from Day 1
✓ Low utilization always
✓ Regular monitoring
✓ Strategic disputes
✓ Patience with process
✓ Don't give up!

## Real Results

Most people following this plan see:
- 100+ point improvement in Year 1
- 150-200+ point improvement by Year 2
- From "poor" to "good" credit
- Qualifying for mainstream credit products`
      },
      {
        id: '5',
        title: 'Protecting Your Comeback',
        duration: '7 min',
        content: `You've worked hard to rebuild. Here's how to protect your progress.

## Never Miss a Payment

This is rule #1. Set up:
- Autopay on all accounts
- Calendar reminders
- Multiple payment sources
- Emergency payment plan

A single late payment can drop your score 50-100 points and undo months of progress.

## Keep Utilization Low Forever

Even after rebuilding:
- Keep credit card utilization under 30%
- Ideal: under 10%
- Pay before statement closes
- Multiple payments per month if needed

## Don't Close Old Accounts

Your old accounts (once cleaned up) are valuable:
- They add to credit history length
- They provide available credit
- Closing hurts average age
- Keep them open and use occasionally

## Limit New Applications

After rebuilding:
- Only apply when necessary
- Space applications out
- Research approval odds first
- Avoid department store card offers

Each application = hard inquiry = small score drop

## Monitor Continuously

Set up:
- Free credit monitoring (Credit Karma, etc.)
- Alerts for new accounts
- Alerts for address changes
- Annual review of all 3 reports

Catch problems EARLY before they spiral.

## Emergency Fund

The best credit protection is financial stability:
- 3-6 months expenses saved
- Prevents missing payments during crisis
- Eliminates need for emergency debt

## The Mindset Shift

Credit is a TOOL, not a goal:
- Don't chase score for score's sake
- Use credit responsibly
- Live below your means
- Credit supports your goals, not the other way around

## Your Credit Future

With disciplined habits:
- 700+ is achievable and maintainable
- Best rates become available
- Financial opportunities open
- Stress about credit disappears

The rebuild is worth it. Protect what you've built.`
      }
    ],
  },

  // ==================== IDENTITY THEFT & FRAUD (4 courses) ====================
  {
    id: 'identity-theft-protection',
    title: 'Identity Theft: Prevention & Recovery',
    description: 'Protect yourself from fraud and recover if it happens to you',
    category: 'Credit Basics',
    difficulty: 'beginner',
    duration: '30 min',
    isPrime: false,
    points: 35,
    icon: '🛡️',
    lessons: [
      {
        id: '1',
        title: 'Types of Identity Theft',
        duration: '6 min',
        content: `Identity theft takes many forms. Know what to watch for.

## Financial Identity Theft

Most common type:
- Opening credit cards in your name
- Taking out loans using your identity
- Draining your bank accounts
- Filing fraudulent tax returns

## Medical Identity Theft

- Using your insurance for medical care
- Getting prescriptions in your name
- Can affect your medical records
- Can impact your insurance rates

## Criminal Identity Theft

- Giving your name when arrested
- Creates criminal record in your name
- Difficult to clear
- Can affect employment, housing

## Child Identity Theft

- Children's SSNs used fraudulently
- Often not discovered for years
- Clean credit file = attractive target
- May be done by family members

## Synthetic Identity Theft

- Criminals combine real and fake info
- May use your SSN with fake name
- Harder to detect
- Growing problem

## How Thieves Get Your Info

- Data breaches (company gets hacked)
- Phishing emails/texts
- Mail theft
- Dumpster diving
- Wallet/purse theft
- Social engineering
- Dark web purchases
- Skimming devices
- Public WiFi interception

## Warning Signs

🚨 Bills for accounts you didn't open
🚨 Collection calls for unknown debts
🚨 Credit denials when you have good credit
🚨 Missing mail or bills
🚨 IRS notices about income you didn't earn
🚨 Medical bills for services you didn't receive
🚨 Unfamiliar accounts on credit report`
      },
      {
        id: '2',
        title: 'Fraud Alerts & Credit Freezes',
        duration: '8 min',
        content: `Two powerful tools to protect your credit: Fraud Alerts and Credit Freezes.

## FRAUD ALERTS

A flag on your credit file that tells lenders to verify your identity before opening new credit.

### Initial Fraud Alert
- Lasts 1 year
- Free to place
- Only need to contact ONE bureau (they notify others)
- Businesses must take extra steps to verify you

### Extended Fraud Alert
- Lasts 7 years
- Requires identity theft report
- Removes you from pre-screened offers for 5 years
- Stronger protection

### Active Duty Alert
- For military members
- Lasts 1 year
- Similar to initial alert

How to Place:
- TransUnion: 1-800-680-7289
- Equifax: 1-800-525-6285
- Experian: 1-888-397-3742
- Online at each bureau's website

## CREDIT FREEZE (Security Freeze)

STRONGER than fraud alerts. Completely BLOCKS access to your credit report.

### How It Works
- No one can pull your credit
- No new accounts can be opened
- You control when to lift it
- Completely FREE (as of 2018)

### To Place a Freeze
Contact EACH bureau separately:
- TransUnion: transunion.com/freeze
- Equifax: equifax.com/freeze
- Experian: experian.com/freeze

You'll receive a PIN to unfreeze when needed.

### When to Lift
When you need to:
- Apply for credit
- Rent an apartment
- Get new insurance
- Apply for certain jobs

You can lift temporarily (specific time) or for specific creditor.

## Which Should You Use?

FRAUD ALERT if:
- You want some protection
- You frequently apply for credit
- You want easy management

CREDIT FREEZE if:
- You want maximum protection
- You rarely need new credit
- You're willing to unfreeze when needed

## Pro Tip: Use BOTH

Place a fraud alert AND a credit freeze for maximum protection.`
      },
      {
        id: '3',
        title: 'If You Become a Victim',
        duration: '8 min',
        content: `Identity theft happened. Here's your immediate action plan.

## STEP 1: Place Fraud Alert & Freeze (Immediately)

Call one bureau for fraud alert (they notify others):
- TransUnion: 1-800-680-7289

Place freeze at all three:
- Do this ASAP to prevent more damage

## STEP 2: Get Your Credit Reports

Request free reports from all three bureaus:
- AnnualCreditReport.com
- You're entitled to additional free reports as fraud victim

Review for:
- Accounts you didn't open
- Addresses you don't recognize
- Inquiries you didn't authorize

## STEP 3: File FTC Identity Theft Report

Go to: IdentityTheft.gov

This creates your official Identity Theft Report which:
- Proves you're a victim
- Required for extended fraud alert
- Helps with disputes
- May be needed by creditors

## STEP 4: File Police Report

Go to your local police department with:
- Your FTC Identity Theft Report
- Proof of your identity
- Evidence of the fraud

Get a copy of the police report. Some agencies may be reluctant but you have the right to file.

## STEP 5: Contact Creditors

For each fraudulent account:
- Call the fraud department
- Explain you're an identity theft victim
- Send written dispute with Identity Theft Report
- Request account closure
- Request removal from credit reports

## STEP 6: Dispute with Credit Bureaus

Send disputes for each fraudulent item:
- Include Identity Theft Report
- Include police report
- Include FTC affidavit
- Request blocking under FCRA (identity theft victims have special rights)

## STEP 7: Additional Steps as Needed

If your SSN was compromised:
- Consider IRS Identity Protection PIN
- Monitor tax returns carefully

If bank accounts affected:
- Close compromised accounts
- Open new accounts with new numbers
- Set up new PINs and passwords

If driver's license used:
- Contact your state DMV
- Request new license number

## Document Everything

Keep records of:
- Every call (date, time, person, what was said)
- Every letter sent (keep copies)
- Every response received
- Police report and case number
- FTC report number`
      },
      {
        id: '4',
        title: 'Preventing Future Theft',
        duration: '8 min',
        content: `Prevention is easier than recovery. Protect yourself going forward.

## Protect Your Information

SOCIAL SECURITY NUMBER
- Never carry your card in wallet
- Only give when absolutely necessary
- Ask why it's needed and how it's protected
- Watch for SSN in mail

FINANCIAL ACCOUNTS
- Use strong, unique passwords
- Enable two-factor authentication
- Use password manager
- Monitor accounts regularly

MAIL
- Use informed delivery (USPS)
- Pick up mail promptly
- Shred sensitive documents
- Consider PO Box or locked mailbox

ONLINE
- Don't click links in emails
- Verify websites before entering info
- Use secure WiFi only
- Be careful on social media

## Monitor Your Credit

Set up free monitoring:
- Credit Karma (TransUnion, Equifax)
- Experian free account
- Bank/credit card free services

Enable alerts for:
- New accounts
- Credit inquiries
- Address changes
- Large transactions

## Check Regularly

Monthly:
- Review bank statements
- Review credit card statements
- Check credit scores

Annually:
- Review all three credit reports
- Review Social Security statement
- Review medical insurance statements

## Children's Credit

Protect your kids:
- Check if they have a credit file (they shouldn't)
- Consider freezing their credit
- Monitor for signs of misuse
- Don't share their SSN unnecessarily

## Advanced Protection

Consider:
- Identity theft insurance (often included with credit cards)
- Credit monitoring services
- Dark web monitoring
- IRS Identity Protection PIN

## Quick Reference

IF YOU SEE THIS → DO THIS

Unfamiliar account → Dispute immediately, file fraud alert
Unfamiliar inquiry → Contact the company, dispute with bureau
Missing mail → Contact creditors, check for address change
Collection for unknown debt → Request validation, dispute as fraud
Denied credit unexpectedly → Pull reports, check for fraud`
      }
    ],
  },
  {
    id: 'credit-cards-strategic-guide',
    title: 'Credit Cards: The Strategic Guide',
    description: 'Use credit cards to BUILD wealth, not destroy it. Master strategic card use.',
    category: 'Credit Basics',
    difficulty: 'intermediate',
    duration: '35 min',
    isPrime: false,
    points: 40,
    icon: '💳',
    lessons: [
      {
        id: '1',
        title: 'Credit Card Types Explained',
        duration: '7 min',
        content: `Not all credit cards are created equal. Know your options.

## SECURED CARDS

- Require security deposit
- Deposit = your credit limit
- For building/rebuilding credit
- Graduate to unsecured eventually

Best for: No credit or bad credit

## UNSECURED CARDS (Standard)

- No deposit required
- Credit limit based on approval
- Various rewards and benefits
- Require decent credit to qualify

Best for: Established credit (640+)

## REWARDS CARDS

### Cash Back
- Earn % back on purchases
- Simple and straightforward
- Often 1-5% depending on category
- Examples: Citi Double Cash, Chase Freedom

### Travel/Points
- Earn points/miles for travel
- Can be worth more than cash back
- More complex redemption
- Examples: Chase Sapphire, Amex Gold

### Store Cards
- Discounts at specific retailer
- Often easier approval
- Usually lower limits
- High interest rates

## PREMIUM CARDS

- High annual fees ($450-700+)
- Luxury benefits (lounges, credits, insurance)
- High rewards rates
- Examples: Amex Platinum, Chase Sapphire Reserve

Best for: High spenders who use benefits

## CHARGE CARDS

- Must pay in full monthly
- No preset spending limit
- Usually annual fee
- Examples: Amex Green, Gold, Platinum

## BUSINESS CARDS

- For business expenses
- May not report to personal credit
- Higher limits often
- Separate from personal cards

## Balance Transfer Cards

- 0% intro APR on transfers
- For paying down existing debt
- Usually 3-5% transfer fee
- Regular APR after intro period

## Student Cards

- For college students
- Easier approval
- Lower limits
- Builds early credit history`
      },
      {
        id: '2',
        title: 'Choosing the Right Card',
        duration: '7 min',
        content: `Match your card to your situation for maximum benefit.

## Know Your Credit Score

- Below 580: Secured cards only
- 580-669: Secured or basic unsecured
- 670-739: Most cards available
- 740+: Premium cards available

## Know Your Spending

Track where your money goes:
- Groceries
- Gas
- Dining
- Travel
- Online shopping
- Bills

Choose cards that reward your ACTUAL spending.

## Evaluate True Value

### Annual Fee Math

Card costs $95/year but gives:
- $200 travel credit (if you'd spend it anyway) = +$200
- 3x points on dining ($300/month × 12 × 3% = $108 value)
- Net: +$213 value

Worth it!

### Don't Pay for Benefits You Won't Use

Premium card benefits only matter if you USE them:
- Lounge access (do you travel enough?)
- Hotel status (do you stay at that chain?)
- Credits (will you actually use them?)

## Starter Card Recommendations

NO/BAD CREDIT
- Discover it Secured
- Capital One Secured
- OpenSky Secured

FAIR CREDIT (580-669)
- Capital One QuicksilverOne
- Discover it Chrome
- Credit One (watch fees)

GOOD CREDIT (670-739)
- Chase Freedom Unlimited
- Citi Double Cash
- Capital One Quicksilver

EXCELLENT CREDIT (740+)
- Chase Sapphire Preferred
- American Express Gold
- Capital One Venture

## Avoid These Mistakes

❌ Applying for cards you can't get approved for
❌ Paying annual fee for benefits you won't use
❌ Choosing card based on signup bonus alone
❌ Ignoring interest rate if you carry balances`
      },
      {
        id: '3',
        title: 'Maximizing Rewards',
        duration: '7 min',
        content: `Turn everyday spending into real money with strategic card use.

## The Multi-Card Strategy

Use different cards for different categories:

EXAMPLE SETUP:
- Card A: 5% on groceries
- Card B: 3% on dining and travel
- Card C: 2% on everything else

$1,000/month groceries × 5% = $50/month in rewards
$500/month dining × 3% = $15/month
$1,000/month other × 2% = $20/month
Total: $85/month = $1,020/year

## Rotating Category Cards

Some cards offer 5% in rotating categories:
- Chase Freedom Flex (quarterly categories)
- Discover it (quarterly categories)

Categories might include:
- Q1: Groceries
- Q2: Gas stations
- Q3: Restaurants
- Q4: Amazon

Activate each quarter and use appropriately.

## Sign-Up Bonuses

New cards often offer big bonuses:
- "Spend $3,000 in 3 months, get $200"
- Can be worth hundreds of dollars
- Time new applications around planned spending
- Don't spend extra just for bonus

## Portal Shopping

Most rewards programs have shopping portals:
- Extra points for shopping through their link
- Same prices as going direct
- Can stack with card rewards

Example: Card gives 2% + portal gives 5% = 7% back

## Redemption Strategy

CASH BACK:
- Simple: Take the cash
- Usually 1 cent per point

TRAVEL POINTS:
- Can be worth more than cash
- Book through card portal
- Transfer to airlines/hotels for better value
- 1 point can = 1.5-2+ cents with good redemption

## Common Mistakes

❌ Carrying a balance (interest erases rewards!)
❌ Missing rotating category activation
❌ Letting points expire
❌ Poor redemption choices
❌ Spending more to earn rewards`
      },
      {
        id: '4',
        title: 'Managing Cards Responsibly',
        duration: '7 min',
        content: `Credit cards are powerful tools that can build OR destroy your finances.

## The Golden Rules

### 1. NEVER Carry a Balance (If Possible)
Interest rates are 15-29%+. That $100 purchase becomes much more over time.

Exception: 0% intro APR cards for planned large purchases

### 2. Pay Statement Balance in Full
By the due date, every month. Set up autopay.

### 3. Keep Utilization Low
Under 30% at all times
Under 10% before credit applications

### 4. Never Miss a Payment
Set up autopay at minimum for at least minimum payment
Late payments destroy your credit

### 5. Don't Close Old Cards
Keep them open for:
- Credit history length
- Available credit (utilization)
- Occasional small purchase to keep active

## How Many Cards?

No perfect number, but consider:
- 2-3 cards for most people
- More if you can manage responsibly
- Each card = available credit
- Too many applications = too many inquiries

## When to Request Limit Increases

Good times:
- After 6+ months on account
- After income increase
- When utilization consistently low
- When you have perfect payment history

Bad times:
- Right after applying for other credit
- When you need to use the higher limit
- When you've been late recently

## Managing Multiple Cards

Keep organized:
- Track due dates (or autopay everything)
- Monitor all accounts regularly
- Keep list of cards, limits, and benefits
- Know which card to use where

## Warning Signs You're Overdoing It

🚨 Carrying balances month to month
🚨 Only paying minimum payments
🚨 Using cards for necessities you can't afford
🚨 Applying for cards to pay other cards
🚨 Not knowing how much you owe total

If any of these apply, STOP and reassess.`
      },
      {
        id: '5',
        title: 'Common Card Problems & Solutions',
        duration: '7 min',
        content: `Problems happen. Here's how to handle common credit card issues.

## Problem: Card Declined

Possible causes:
- Over credit limit
- Suspicious activity (fraud protection)
- Card expired
- Technical issue
- Account closed

Solution:
- Call the number on back of card
- Verify recent transactions
- Check your account online
- Use a different card temporarily

## Problem: Fraudulent Charges

Immediate actions:
- Call card issuer immediately
- Dispute the charges
- Request new card number
- Review recent transactions

Your liability:
- Federal law limits liability to $50 max
- Most cards offer $0 fraud liability

## Problem: Can't Make Payment

Before missing payment:
- Call the card company FIRST
- Ask about hardship programs
- Request payment extension
- Negotiate reduced payment

Options if you can't pay:
- Pay at least minimum
- Balance transfer to 0% card
- Personal loan to consolidate
- Credit counseling agency

## Problem: Interest Rate Too High

Solution:
- Call and ask for lower rate
- Mention your payment history
- Mention competitive offers
- Be prepared to close if they refuse (sometimes)

Script: "I've been a good customer for X years. I've seen offers for cards with X% APR. Can you lower my rate to be competitive?"

## Problem: Annual Fee Not Worth It

Options:
- Call and ask for fee waiver
- Ask for retention offer (bonus points)
- Ask to downgrade to no-fee version
- Close as last resort

Script: "I'm considering closing this card because I'm not using the benefits enough to justify the fee. What can you offer to keep my business?"

## Problem: Credit Limit Too Low

Solution:
- Request increase online (often soft pull)
- Call and request
- Wait 6 months between requests
- Pay down balance first

## Problem: Want to Cancel a Card

Consider:
- Will it hurt credit score?
- Is there a no-fee downgrade option?
- Do you have points to redeem?
- Is there an annual fee due soon?

If you must cancel:
- Redeem all points first
- Pay off balance completely
- Call to close (get confirmation number)
- Follow up in writing
- Monitor that it shows "closed by consumer"`
      }
    ],
  },
  // ==================== ADDITIONAL FREE COURSES ====================
  {
    id: 'understanding-interest-rates',
    title: 'Understanding Interest Rates & APR',
    description: 'Know exactly how much credit really costs you',
    category: 'Credit Basics',
    difficulty: 'beginner',
    duration: '20 min',
    isPrime: false,
    points: 25,
    icon: '📊',
    lessons: [
      {
        id: '1',
        title: 'What is APR?',
        duration: '5 min',
        content: `APR stands for Annual Percentage Rate. It's what credit really costs.

## APR Explained

APR represents the yearly cost of borrowing money, expressed as a percentage.

Example: 20% APR means you pay 20% of your balance in interest over a year (if unpaid).

## Types of APR

PURCHASE APR
- Applied to regular purchases
- Most common APR you'll see
- What you pay on carried balances

BALANCE TRANSFER APR
- Applied to balances transferred from other cards
- Often promotional (0% for 12-18 months)
- Returns to regular rate after promo

CASH ADVANCE APR
- Applied to cash withdrawals
- Usually HIGHER than purchase APR
- Often no grace period
- Avoid cash advances!

PENALTY APR
- Applied after missed payments
- Can be 29.99% or higher
- May apply to entire balance
- Can take 6+ months of good behavior to remove

## Fixed vs Variable APR

FIXED APR
- Stays the same (mostly)
- Can still change with notice
- Rare these days

VARIABLE APR
- Tied to Prime Rate
- Changes when Prime Rate changes
- Most cards today
- Your APR = Prime Rate + Margin

## The Real Cost

At 20% APR:
- $1,000 balance
- Minimum payments only
- Takes ~2 years to pay off
- Total paid: ~$1,200+

That $1,000 purchase actually cost you $1,200!`
      },
      {
        id: '2',
        title: 'How Interest is Calculated',
        duration: '5 min',
        content: `Understanding the math helps you avoid costly mistakes.

## Daily Periodic Rate

Credit cards charge interest DAILY, not monthly.

Formula: APR ÷ 365 = Daily Rate

Example: 20% APR ÷ 365 = 0.0548% per day

## Average Daily Balance Method

Most cards use this calculation:

1. Add up your balance for each day of the billing cycle
2. Divide by number of days
3. Multiply by daily rate
4. Multiply by days in cycle

Example:
- Day 1-15: $500 balance
- Day 16-30: $1,000 balance
- Average: (500×15 + 1000×15) ÷ 30 = $750
- Daily rate: 0.0548%
- Monthly interest: $750 × 0.0548% × 30 = $12.33

## The Grace Period

Most cards have a grace period:
- Usually 21-25 days
- From statement close to due date
- NO interest if paid in full by due date

The catch:
- Only applies if you paid last month in full
- Carry a balance? Grace period disappears
- Interest charged from purchase date

## How to Pay Zero Interest

1. Pay statement balance in full
2. By the due date
3. Every single month

Do this and you'll NEVER pay interest, no matter what your APR is.

## When Interest Starts

NEW PURCHASES
- After grace period (if you have one)
- Immediately if carrying balance

BALANCE TRANSFERS
- After promotional period ends
- Sometimes immediately on remaining balance

CASH ADVANCES
- IMMEDIATELY
- No grace period ever
- Higher APR usually`
      },
      {
        id: '3',
        title: 'Minimizing Interest Costs',
        duration: '5 min',
        content: `Strategies to reduce or eliminate interest charges.

## Strategy 1: Pay in Full

The simplest and best strategy:
- Pay statement balance completely
- By the due date
- Zero interest, period

## Strategy 2: Pay More Than Minimum

If you can't pay in full:
- Pay as much as possible
- Minimum payments = maximum interest
- Even $50 extra helps significantly

Example: $5,000 balance at 20% APR
- Minimum only: 10+ years, $6,000+ in interest
- $200/month: 2.5 years, $1,100 in interest

## Strategy 3: Balance Transfer

Move high-interest debt to 0% APR card:
- Pay off during promotional period
- Avoid interest completely
- Watch for transfer fees (3-5%)

Math: $5,000 at 20% APR vs 0% transfer with 3% fee
- Keep at 20%: $1,000/year in interest
- Transfer: $150 fee, $0 interest
- Save $850 first year alone

## Strategy 4: Request Lower Rate

Call your card company:
- Mention your payment history
- Mention competitor offers
- Ask for rate reduction

Even a few percentage points helps.

## Strategy 5: Strategic Payment Timing

Pay before statement closes:
- Lowers reported balance
- May reduce interest if carrying balance
- Multiple payments per month

## Strategy 6: Debt Avalanche

If multiple cards with balances:
1. Pay minimum on all cards
2. Put extra money toward HIGHEST APR card
3. When that's paid, move to next highest
4. Mathematically optimal approach

## What NOT to Do

❌ Pay only minimums
❌ Skip payments to pay other bills
❌ Take cash advances
❌ Ignore the problem`
      },
      {
        id: '4',
        title: 'Loan Interest vs Credit Card Interest',
        duration: '5 min',
        content: `Different types of credit charge interest differently.

## Credit Card Interest

- Variable APR (usually)
- Compound daily
- Average daily balance method
- Grace period for purchases
- High rates (15-29%+)

## Personal Loan Interest

- Fixed or variable
- Simple interest usually
- Calculated on principal
- No grace period
- Lower rates (6-20%)

## Auto Loan Interest

- Usually fixed rate
- Simple interest
- Precomputed or simple interest
- Lower rates (3-10%+)
- Secured by vehicle

## Mortgage Interest

- Fixed or adjustable
- Amortized over loan term
- Lowest rates (3-8%)
- Secured by home
- Tax deductible (often)

## Student Loan Interest

- Fixed (federal) or variable (private)
- Simple interest
- Capitalization events
- Various repayment options
- May be tax deductible

## Why Card Interest is Higher

Credit cards are UNSECURED:
- No collateral
- Higher risk for lender
- Higher rates to compensate

Secured loans have COLLATERAL:
- Home, car, etc.
- Lower risk
- Lower rates

## Using This Knowledge

If carrying debt:
- Consider personal loan to pay off cards
- 10% personal loan beats 24% credit card
- Consolidation can save thousands

Example:
- $10,000 credit card debt at 20%
- Minimum payments: $400/month, 3+ years, $3,000+ interest
- Personal loan at 10%: $325/month, 3 years, $1,600 interest
- Save $1,400+`
      }
    ],
  },
];

// ============================================================================
// PRIME COURSES - NUCLEAR VALUE
// Metro 2 Mastery, Omission Harm, Pro Se Litigation, Business Credit
// ============================================================================

export const PRIME_COURSES: Course[] = [
  // ==================== METRO 2 MASTERY (10 courses) ====================
  {
    id: 'metro2-deep-dive',
    title: '👑 Metro 2 Format: The Complete Guide',
    description: 'Master the credit reporting format that bureaus use - knowledge that wins cases',
    category: 'Metro 2 Mastery',
    difficulty: 'advanced',
    duration: '60 min',
    isPrime: true,
    points: 100,
    icon: '👑',
    lessons: [
      {
        id: '1',
        title: 'What is Metro 2 Format?',
        duration: '10 min',
        content: `Metro 2 is the standardized format creditors use to report your data to credit bureaus. Understanding it gives you power.

## The History

- Original Metro format created in 1970s
- Metro 2 introduced in 1997
- Maintained by Consumer Data Industry Association (CDIA)
- Updated annually with new guidelines

## The CRRG (Credit Reporting Resource Guide)

The "bible" of credit reporting:
- Published by CDIA
- Contains all field definitions
- Specifies reporting requirements
- Used by furnishers and bureaus

This document is KEY to advanced disputes.

## Why Metro 2 Matters

Creditors are REQUIRED to follow Metro 2 standards when reporting. When they don't:
- The information may be inaccurate
- You have grounds for dispute
- You may have grounds for litigation
- FCRA violations may apply

## The Structure

Metro 2 files contain:
- HEADER RECORD: Identifies the furnisher
- BASE SEGMENT: Core account information (69+ fields)
- J1 SEGMENT: Additional borrower info
- J2 SEGMENT: Additional borrower info
- K1-K4 SEGMENTS: Specialized data
- TRAILER RECORD: Summary information

## Your Power

By understanding Metro 2:
- You can identify technical violations
- You can write more effective disputes
- You can spot errors others miss
- You can build stronger legal cases

This knowledge separates average consumers from INFORMED consumers.`
      },
      {
        id: '2',
        title: 'The Base Segment: All 69+ Fields',
        duration: '15 min',
        content: `The Base Segment contains the core data about each account. Every field matters.

## Critical Fields Overview

ACCOUNT IDENTIFICATION
- Field 2: Account Number
- Field 3: Account Type
- Field 4: Date Opened
- Field 5: Credit Limit / High Credit

BALANCE INFORMATION
- Field 15: Current Balance
- Field 16: Amount Past Due
- Field 17: Original Charge-Off Amount

PAYMENT INFORMATION
- Field 21: Payment Amount Scheduled
- Field 22: Actual Payment Amount
- Field 23: Date of Last Payment

STATUS INFORMATION
- Field 24: Account Status
- Field 25-49: Payment History Profile (24 months)

## Field 15: Current Balance

This field shows what you currently owe.

REQUIREMENTS:
- Must be accurate as of report date
- CANNOT be blank if account is open
- Must be $0 if paid off (not blank!)

COMMON VIOLATIONS:
- Blank field when balance exists
- Outdated balance not updated
- Wrong balance amount

## Field 16: Amount Past Due

Shows how much is overdue.

REQUIREMENTS:
- Must reflect actual past due amount
- Must be $0 if account is current
- CANNOT be blank

COMMON VIOLATIONS:
- Showing past due when current
- Blank instead of $0
- Wrong amount

## Field 21: Scheduled Payment Amount

The monthly payment you're supposed to make.

REQUIREMENTS:
- Required for installment accounts
- Must be current payment amount
- Updated when payment changes

## Field 22: Actual Payment Amount

What you actually paid last month.

REQUIREMENTS:
- Must show actual amount paid
- Required when payment is made
- Shows your payment history

## The Payment History Profile (Fields 25-49)

24-month payment history showing:
- 0 or blank: Current/no payment due
- 1: 30-59 days late
- 2: 60-89 days late
- 3: 90-119 days late
- 4: 120-149 days late
- 5: 150-179 days late
- 6: 180+ days late

This creates your payment history record.`
      },
      {
        id: '3',
        title: 'CRRG Section 4.3: Required Fields',
        duration: '12 min',
        content: `Section 4.3 of the Credit Reporting Resource Guide specifies REQUIRED fields. This is powerful knowledge.

## What Section 4.3 Says

"Data furnishers shall report all required fields. The omission of required data elements may result in inaccurate credit files."

## Required Fields Include:

ALWAYS REQUIRED:
- Account Number
- Account Type
- Date Opened
- Current Balance (Field 15)
- Account Status
- Payment History Profile

CONDITIONALLY REQUIRED:
- Credit Limit (revolving accounts)
- Payment Amount (installment accounts)
- Amount Past Due (when applicable)
- Date of Last Payment (when payment made)

## The "Required" Standard

When CRRG says a field is required:
- Furnisher MUST populate it
- Blank is NOT acceptable
- $0 is different from blank

## Why This Matters

If a required field is BLANK:
1. The furnisher violated CRRG standards
2. The information may be incomplete
3. The credit file may be inaccurate
4. You have grounds for dispute
5. You may have grounds for legal action

## Documentation

When disputing based on blank fields:
- Get your raw credit data
- Identify blank required fields
- Reference CRRG Section 4.3
- Explain why blank ≠ accurate

## Sample Language for Disputes

"The account [NAME] is reporting in violation of Metro 2 standards. Field 15 (Current Balance) is reported as BLANK when CRRG Section 4.3 requires this field to be populated. Per the CRRG, blank indicates 'data not available' while zero indicates 'the value is $0.' This distinction is meaningful and the omission renders the tradeline inaccurate under FCRA §1681e(b)."`
      },
      {
        id: '4',
        title: 'Fields 15, 16, 21, 22 Deep Dive',
        duration: '12 min',
        content: `These four fields are the foundation of the Omission Harm Theory. Master them.

## Field 15: Current Balance

PURPOSE: Shows what consumer currently owes

VALID VALUES:
- Actual dollar amount ($0 to maximum)
- $0 when fully paid

INVALID:
- Blank (meaning "data not available")

WHY IT MATTERS:
- Affects credit utilization calculations
- Shows account status
- Used by scoring models
- Blank creates incomplete picture

## Field 16: Amount Past Due

PURPOSE: Shows how much is overdue

VALID VALUES:
- $0 if current
- Actual past due amount if delinquent

INVALID:
- Blank when account exists

WHY IT MATTERS:
- Indicates delinquency status
- Affects score calculations
- Used by lenders for risk assessment
- Blank vs $0 = different meanings

## Field 21: Scheduled Payment Amount

PURPOSE: Monthly payment amount due

VALID VALUES:
- Required monthly payment amount
- $0 for certain account types only

REQUIRED FOR:
- Installment loans
- Mortgage accounts
- Any account with scheduled payments

WHY IT MATTERS:
- Helps verify payment history
- Used in DTI calculations
- Shows account terms

## Field 22: Actual Payment Amount

PURPOSE: What consumer actually paid

VALID VALUES:
- Amount paid last reporting period
- $0 if no payment made

WHY IT MATTERS:
- Documents payment behavior
- Verifies payment history
- Shows consumer's actual payments

## The Pattern of Violations

Common issues found in credit reports:
- Field 15: Blank instead of actual balance
- Field 16: Blank instead of $0 (when current)
- Field 21: Blank when payment exists
- Field 22: Blank when payment was made

Each blank field = potential violation.

## Using This in Disputes

Document specific fields that are blank:

"Upon review of my credit report, the following required Metro 2 fields are blank rather than properly populated:

- Field 15 (Current Balance): BLANK - should show actual balance or $0
- Field 16 (Amount Past Due): BLANK - should show $0 if current

These omissions violate CRRG reporting standards and render the tradeline inaccurate."`
      },
      {
        id: '5',
        title: 'Status Codes & Account Types',
        duration: '11 min',
        content: `Understanding status codes reveals exactly what's being reported about you.

## Account Status Codes (Field 24)

DF: Deleted (previously reported)
11: Current
13: Paid/closed - zero balance
61: Paid - collection
62: Paid - charge off
63: Paid - foreclosure
64: Paid - was 30 days late
65: Paid - was 60 days late
71: 30 days past due
78: 60 days past due
80: 90 days past due
82: 120 days past due
83: 150 days past due
84: 180+ days past due
93: Government claim
94: Foreclosure
95: Voluntary surrender
97: Unpaid charge off

## Account Type Codes (Field 3)

REVOLVING ACCOUNTS
- 01: Credit card
- 07: Retail revolving
- 18: Line of credit

INSTALLMENT ACCOUNTS
- 02: Auto loan
- 05: Personal loan
- 12: Education loan
- 13: Lease
- 26: Mortgage

COLLECTION ACCOUNTS
- 9A: Collection account
- 9B: Purchased debt

## How Status Affects Your Score

Current statuses (11, 13): Positive or neutral
Paid derogatory (61-65): Mixed - shows paid but history remains
Active derogatory (71-84): Negative impact
Severe derogatory (93-97): Most negative impact

## Checking Your Status Codes

Your credit report shows these codes. Look for:
- Incorrect status codes
- Outdated status not updated
- Wrong account type
- Duplicate entries

## Disputing Wrong Status

If status code is wrong:
"The account [NAME] shows status code [XX] when the correct status is [YY]. The account was [paid in full/never late/etc.]. Please correct this inaccurate status code to accurately reflect the account standing."`
      }
    ],
  },
  {
    id: 'omission-harm-theory',
    title: '👑 The Omission Harm Theory',
    description: 'The advanced legal theory that challenges blank field reporting',
    category: 'Metro 2 Mastery',
    difficulty: 'expert',
    duration: '75 min',
    isPrime: true,
    points: 125,
    icon: '🎯',
    lessons: [
      {
        id: '1',
        title: 'Theory Foundation',
        duration: '12 min',
        content: `The Omission Harm Theory is an advanced approach to challenging inaccurate credit reporting based on BLANK fields.

## Core Principle

When credit bureaus report BLANK fields instead of actual values (including $0), this causes harm to consumers through incomplete and potentially inaccurate credit files.

## The Legal Foundation

FCRA §1681e(b): Requires "reasonable procedures to assure maximum possible accuracy"

The argument:
- BLANK ≠ accurate
- BLANK = data not available
- $0 = actual zero value
- These are fundamentally different
- Reporting BLANK when actual data exists = inaccurate

## Why BLANK ≠ ZERO

In Metro 2 format:
- BLANK means: "Data not available" or "Not reported"
- ZERO means: "The value is $0"

These communicate different things:
- To scoring models
- To lenders reviewing your file
- To anyone evaluating your credit

Example:
- Field 15 (Current Balance) = BLANK → "We don't know the balance"
- Field 15 (Current Balance) = $0 → "The balance is zero"

For a paid-off account, BLANK is misleading. $0 is accurate.

## The Harm Caused

Blank fields can:
- Affect credit score calculations
- Mislead lenders about your status
- Fail to show positive information (like $0 balance)
- Create incomplete credit file
- Potentially result in credit denials

## Why This Theory Works

Courts have recognized:
- Incomplete information can be inaccurate
- "Technical" compliance doesn't equal accuracy
- CRRG standards inform accuracy requirements
- Consumer harm is relevant`
      },
      {
        id: '2',
        title: 'Case Law Support',
        duration: '15 min',
        content: `Legal precedent supports challenges to incomplete credit reporting.

## Key FCRA Principles from Case Law

### Maximum Possible Accuracy
Courts interpret §1681e(b) to require MORE than minimal compliance. The standard is "maximum possible accuracy."

### Reasonable Procedures
Bureaus must have REASONABLE procedures - not just any procedures.

### Incomplete = Inaccurate
Multiple courts have found that incomplete information can constitute inaccurate information under FCRA.

## Relevant Case Holdings

### On Investigation Requirements
Courts have held that bureaus cannot simply accept furnisher verification without meaningful investigation.

### On Accuracy Standard
Technical compliance with format doesn't guarantee the accuracy of the content reported.

### On Consumer Harm
Documentation of actual harm strengthens FCRA claims, but isn't always required for statutory damages.

## Building Your Case

To succeed with Omission Harm Theory:

1. DOCUMENT THE OMISSIONS
   • Obtain your credit file data
   • Identify specific blank fields
   • Note which fields should have values

2. SHOW THE STANDARD
   • Reference CRRG requirements
   • Show field is "required"
   • Explain blank vs zero distinction

3. DEMONSTRATE THE HARM
   • How does blank affect scoring?
   • How does it affect lender decisions?
   • Any concrete harm (denials, higher rates)?

4. CREATE PAPER TRAIL
   • Dispute specifically citing omissions
   • Request proper population of fields
   • Document their responses

## The Settlement Reality

Most FCRA cases settle before trial because:
- Bureaus want to avoid precedent
- Litigation is expensive
- Bad publicity is harmful
- Multiple plaintiffs create risk

Your documented disputes create leverage for potential resolution.`
      },
      {
        id: '3',
        title: 'Identifying Omission Violations',
        duration: '12 min',
        content: `How to find and document omission violations in your credit file.

## Getting Your Data

To identify omissions, you need detailed credit data:

OPTION 1: Direct Disclosure
- Request full file disclosure from each bureau
- Ask for "all information in my file"
- May show more than consumer report

OPTION 2: Third-Party Services
- Some services show field-level data
- Credit monitoring with detailed views
- Data broker disclosures

OPTION 3: Dispute Responses
- Method of verification requests
- May reveal what was (or wasn't) reported

## What to Look For

CHECK EACH TRADELINE FOR:

Field 15 (Current Balance):
- Is it blank?
- Does it match your actual balance?
- If account paid, does it show $0?

Field 16 (Amount Past Due):
- Is it blank?
- If account current, does it show $0?
- If past due, is amount correct?

Field 21 (Scheduled Payment):
- For installment loans, is it populated?
- Does it match your actual payment?

Field 22 (Actual Payment):
- Is your last payment reflected?
- Is the amount correct?

Payment History Profile:
- Any unexplained blanks?
- Incorrect status codes?

## Creating Your Documentation

For each violation found, document:

| Account | Field | Should Be | Actually Shows | Why It's Wrong |
|---------|-------|-----------|----------------|----------------|
| ABC Bank | 15 | $0 | BLANK | Paid in full |
| XYZ Card | 16 | $0 | BLANK | Account current |

## Evidence Gathering

Collect supporting documents:
- Account statements showing actual values
- Payment confirmations
- Payoff letters
- Account closure confirmations

This becomes your evidence package for disputes and potential litigation.`
      },
      {
        id: '4',
        title: 'Drafting Omission-Based Disputes',
        duration: '18 min',
        content: `Advanced dispute letters targeting Metro 2 omission violations.

## Structure of an Omission Dispute

### SECTION 1: Introduction
Identify yourself and invoke your rights.

"I am writing to dispute inaccurate information appearing on my credit report pursuant to the Fair Credit Reporting Act, 15 U.S.C. § 1681i."

### SECTION 2: Identify the Account
Clearly specify which account(s).

"This dispute concerns the following tradeline:
- Creditor: [NAME]
- Account Number: [XXXX]
- Date Opened: [DATE]"

### SECTION 3: Specify the Violation
Identify exactly what's wrong.

"This tradeline contains the following Metro 2 reporting deficiencies:

1. Field 15 (Current Balance) is reported as BLANK rather than showing the actual balance of $0.

2. Field 16 (Amount Past Due) is reported as BLANK rather than $0, despite the account being current."

### SECTION 4: Explain Why It's Inaccurate
Reference the standards.

"Under the CDIA's Credit Reporting Resource Guide (CRRG) Section 4.3, these are required fields that must be populated. The CRRG specifically distinguishes between BLANK (data not available) and ZERO (value is $0). Reporting BLANK when actual data exists renders the tradeline inaccurate.

This omission violates the FCRA's requirement under §1681e(b) that consumer reporting agencies 'follow reasonable procedures to assure maximum possible accuracy.'"

### SECTION 5: State the Harm
Explain the impact.

"These omissions harm my credit file by:
- Failing to accurately represent my account status
- Potentially affecting credit score calculations
- Creating an incomplete picture for potential creditors"

### SECTION 6: Demand Action
Specify what you want.

"I demand that you:
1. Conduct a reasonable investigation of this dispute
2. Require the furnisher to populate all required Metro 2 fields with accurate data
3. If accurate data cannot be obtained, delete the tradeline entirely
4. Provide me with written confirmation of the results

If the information cannot be verified as accurate and complete within 30 days as required by FCRA §1681i(a)(1), please delete the tradeline."

### SECTION 7: Close
"I reserve all rights under the FCRA including the right to seek statutory and actual damages for any violations.

Please send written confirmation of your investigation results and an updated copy of my credit report."

## Follow-Up Strategy

After sending:
- Wait 30 days for response
- If "verified" without fixing, request Method of Verification
- Consider CFPB complaint
- Document everything for potential legal action`
      },
      {
        id: '5',
        title: 'When to Escalate to Legal Action',
        duration: '18 min',
        content: `Sometimes disputes aren't enough. Know when and how to escalate.

## Signs It's Time for Legal Action

✓ Multiple disputes ignored or denied
✓ "Verified" responses without real investigation
✓ Continued reporting of inaccurate information
✓ Bureau fails to respond within 30 days
✓ Pattern of non-compliance
✓ Concrete harm documented (denials, higher rates)

## What You Need

Before consulting an attorney:

1. COMPLETE DISPUTE HISTORY
   • Copies of all dispute letters
   • Certified mail receipts
   • Delivery confirmations
   • All bureau responses

2. EVIDENCE OF VIOLATIONS
   • Credit reports showing issues
   • Documentation of blank fields
   • CRRG references
   • Proof of actual values

3. EVIDENCE OF HARM
   • Credit denials
   • Higher interest rates
   • Lost opportunities
   • Emotional distress documentation

## Types of Damages Available

ACTUAL DAMAGES
- Denied credit or loans
- Higher interest rates paid
- Lost job opportunities
- Out-of-pocket expenses
- Emotional distress

STATUTORY DAMAGES
- $100 - $1,000 per violation
- For willful violations
- Even without proving actual harm

PUNITIVE DAMAGES
- For willful violations
- Designed to punish bad behavior
- Can be substantial

ATTORNEY FEES AND COSTS
- Successful plaintiffs can recover
- Makes contingency representation viable

## Finding an Attorney

RESOURCES:
- National Association of Consumer Advocates (NACA): naca.net
- Consumer law attorneys in your state
- FCRA-specific attorneys

QUESTIONS TO ASK:
- Do you handle FCRA cases?
- Do you work on contingency?
- What's your experience with credit reporting cases?
- What do you think of my case?

## The Process

1. Consultation (usually free)
2. Case evaluation
3. Engagement letter if they take case
4. Pre-litigation demand letter
5. Settlement negotiations
6. Litigation if necessary

## Realistic Expectations

Most cases settle before trial
- Bureaus prefer to settle
- Settlement amounts vary widely
- Cases with clear violations and harm settle higher
- Process can take 6-18+ months

Your documented dispute history is the foundation of any legal case.`
      }
    ],
  },

  // ==================== PRO SE LITIGATION (5 courses) ====================
  {
    id: 'pro-se-litigation-basics',
    title: '👑 Pro Se Litigation: Representing Yourself',
    description: 'Learn to file and fight your own FCRA lawsuit without an attorney',
    category: 'Legal Strategy',
    difficulty: 'expert',
    duration: '90 min',
    isPrime: true,
    points: 150,
    icon: '⚖️',
    lessons: [
      {
        id: '1',
        title: 'What is Pro Se Litigation?',
        duration: '12 min',
        content: `Pro se means representing yourself in court without an attorney. It's your constitutional right.

## The Right to Self-Representation

The 6th Amendment guarantees your right to represent yourself. Courts must allow it, though they may warn you about the risks.

## Why Go Pro Se?

ADVANTAGES:
- No attorney fees (contingency or hourly)
- You control your case completely
- You know your facts best
- Emotional investment in outcome
- Learning experience
- Can always hire attorney later

DISADVANTAGES:
- Steep learning curve
- Judges hold you to same standards as attorneys
- Opposing counsel may try to take advantage
- Time-intensive
- Emotional stress
- Risk of procedural errors

## When Pro Se Makes Sense

GOOD CANDIDATES:
- Clear-cut FCRA violations
- Strong documentation
- Willing to learn legal procedures
- Time to dedicate to case
- Small claims or straightforward matters

CONSIDER AN ATTORNEY IF:
- Complex legal issues
- Large potential damages
- Opposing party has strong legal team
- You can find contingency representation
- You're uncomfortable with legal procedures

## The FCRA Advantage

FCRA cases can be good for pro se because:
- Relatively straightforward law
- Clear violation standards
- Statutory damages available
- Attorney fee provision (if you win, defendant pays)
- Many cases settle
- Bureaus often prefer to settle

## Reality Check

Pro se litigation is HARD WORK:
- Expect 50-100+ hours of preparation
- Must learn legal procedures
- Must meet all deadlines
- Must follow court rules precisely
- Mistakes can cost you the case

But it IS possible. Many pro se plaintiffs have succeeded in FCRA cases.`
      },
      {
        id: '2',
        title: 'Building Your Case File',
        duration: '15 min',
        content: `A strong case file is the foundation of successful litigation.

## Essential Documents

DISPUTE CORRESPONDENCE:
- All dispute letters you sent
- Certified mail receipts
- Return receipt cards
- Tracking confirmations
- All bureau responses

CREDIT REPORTS:
- Reports showing violations
- Reports before and after disputes
- All three bureaus if applicable
- Dated copies at key points

EVIDENCE OF ACTUAL VALUES:
- Account statements
- Payment confirmations
- Payoff letters
- Correspondence with creditors

EVIDENCE OF HARM:
- Credit denial letters
- Higher rate notifications
- Application records
- Medical records (emotional distress)
- Journal of distress (contemporaneous)

## Organizing Your File

Create sections:
1. CHRONOLOGY - Timeline of events
2. DISPUTES - All dispute correspondence
3. RESPONSES - All bureau responses
4. CREDIT REPORTS - Copies showing issues
5. EVIDENCE - Supporting documentation
6. HARM - Evidence of damages
7. LEGAL RESEARCH - Relevant cases and statutes

## The Chronology

Create a detailed timeline:

| Date | Event | Document |
|------|-------|----------|
| 1/15/24 | Pulled credit report | Exhibit A |
| 1/20/24 | Sent dispute to TransUnion | Exhibit B |
| 1/21/24 | Certified mail delivered | Exhibit C |
| 2/25/24 | Received response | Exhibit D |
| 2/26/24 | Verified without fixing | Exhibit D |
| 3/1/24 | Sent follow-up dispute | Exhibit E |

This becomes your roadmap for the case.

## Key Evidence to Highlight

Focus on proving:
1. Information was inaccurate
2. You disputed properly
3. Bureau failed to investigate/correct
4. You suffered harm as result

Each element needs supporting evidence.`
      },
      {
        id: '3',
        title: 'Filing Your Lawsuit',
        duration: '18 min',
        content: `The mechanics of actually filing an FCRA lawsuit.

## Choosing Your Court

FEDERAL COURT:
- FCRA is federal law - federal courts have jurisdiction
- More formal procedures
- Judges more familiar with FCRA
- Recommended for most FCRA cases

STATE COURT:
- FCRA allows state court filing
- May be less formal
- May be more convenient
- Concurrent jurisdiction

SMALL CLAIMS:
- For smaller damages
- Simplified procedures
- Lower filing fees
- May have damage caps

## The Complaint

Your complaint must include:

1. CAPTION
   • Court name
   • Parties (you vs. defendants)
   • Case number (assigned by clerk)

2. JURISDICTION
   • Why this court has authority
   • FCRA provides federal jurisdiction

3. PARTIES
   • Your name and address
   • Defendant names and addresses

4. FACTUAL ALLEGATIONS
   • What happened
   • Numbered paragraphs
   • Chronological order

5. CAUSES OF ACTION
   • Which FCRA sections violated
   • How defendant violated them

6. DAMAGES
   • What you're seeking
   • Actual, statutory, punitive

7. PRAYER FOR RELIEF
   • Specific request to court

## Filing Process

1. Prepare complaint (multiple copies)
2. Go to court clerk's office
3. Pay filing fee ($350-400 federal)
4. Clerk assigns case number
5. Get copies stamped "filed"
6. Serve defendants within time limit

## Service of Process

Defendants must be formally notified:
- Personal service
- Certified mail (if allowed)
- Process server
- Must follow court rules exactly

## Defendant's Response

After service, defendants typically have:
- 21 days (federal court)
- 30 days (varies by state)
- May file answer or motion to dismiss`
      },
      {
        id: '4',
        title: 'Discovery & Motion Practice',
        duration: '20 min',
        content: `Discovery is where you gather evidence. Motions are how you argue legal issues.

## Discovery Tools

INTERROGATORIES:
- Written questions to opposing party
- Must answer under oath
- Limited number (usually 25)
- Good for basic facts

REQUESTS FOR PRODUCTION:
- Demand documents from other side
- Investigation files
- Policies and procedures
- Training materials
- Communications about your dispute

REQUESTS FOR ADMISSION:
- Ask them to admit/deny facts
- Failure to respond = admitted
- Can establish undisputed facts
- Strategic tool

DEPOSITIONS:
- Oral questioning under oath
- Recorded by court reporter
- Most expensive discovery tool
- Very effective but time-intensive

## What to Request

FROM CREDIT BUREAUS:
- Your complete credit file
- Dispute investigation records
- Communications with furnisher
- Reinvestigation procedures
- Employee training materials
- Similar complaints/lawsuits

FROM FURNISHERS:
- Account records
- Communication with bureaus
- Investigation records
- Policies for reporting
- Correction procedures

## Common Motions

MOTION TO DISMISS:
- Defendant argues case should be thrown out
- You must respond (opposition)
- Court decides if case proceeds

MOTION FOR SUMMARY JUDGMENT:
- Either side argues no trial needed
- Facts are undisputed
- Entitled to judgment as matter of law

MOTION TO COMPEL:
- Force other side to provide discovery
- When they don't respond properly

## Responding to Motions

When defendants file motions:
- Read carefully
- Note deadline to respond
- Research the legal arguments
- File opposition on time
- Ask court for hearing if helpful

## Discovery Disputes

If other side doesn't cooperate:
- Meet and confer (required)
- File motion to compel
- Request sanctions if warranted`
      },
      {
        id: '5',
        title: 'Settlement & Trial',
        duration: '25 min',
        content: `Most cases settle. But you must be prepared for trial.

## Settlement Negotiations

WHEN TO NEGOTIATE:
- After filing (shows you're serious)
- After discovery (facts established)
- Before trial (avoid uncertainty)
- Any time both sides are willing

WHAT TO CONSIDER:
- Your actual damages
- Statutory damages possible
- Likelihood of winning at trial
- Time and stress of continuing
- Defendant's settlement patterns

SETTLEMENT RANGE:
- Simple cases: $1,000 - $10,000
- Moderate cases: $10,000 - $50,000
- Strong cases with harm: $50,000+
- Class actions: Much more

## Settlement Agreement Terms

Typical terms include:
- Payment amount
- Timeline for payment
- Deletion of disputed items (sometimes)
- Confidentiality clause
- Release of claims
- No admission of liability

## Mediation

Many courts require mediation:
- Neutral third party facilitates
- Non-binding (usually)
- Can help bridge gaps
- Worth trying before trial

## If You Go to Trial

PREPARATION:
- Organize all exhibits
- Prepare witness list
- Write opening statement
- Prepare direct examination questions
- Anticipate cross-examination
- Write closing argument
- Know the evidence rules

TRIAL BASICS:
- Arrive early and dress professionally
- Address judge as "Your Honor"
- Be respectful always
- Stick to relevant facts
- Don't argue with opposing counsel
- Let your evidence speak

## The Verdict

If you win:
- Judgment entered in your favor
- Defendant must pay
- May need to collect judgment
- Can request attorney fees (even pro se)

If you lose:
- Can appeal (but costly)
- Learn from experience
- Consider what went wrong

## Pro Se Success Stories

Many consumers have succeeded pro se:
- Settlements before trial
- Favorable verdicts
- Items deleted as part of resolution
- Financial compensation

The key is preparation and persistence.`
      }
    ],
  },

  // ==================== PRO SE LITIGATION (5 courses) ====================
  {
    id: 'pro-se-litigation-basics',
    title: '👑 Pro Se Litigation: Representing Yourself',
    description: 'Learn to file and fight your own FCRA lawsuit without an attorney',
    category: 'Legal Strategy',
    difficulty: 'expert',
    duration: '90 min',
    isPrime: true,
    points: 150,
    icon: '⚖️',
    lessons: [
      {
        id: '1',
        title: 'What is Pro Se Litigation?',
        duration: '12 min',
        content: `Pro se means representing yourself in court without an attorney. It's your constitutional right.

## The Right to Self-Representation

The 6th Amendment guarantees your right to represent yourself. Courts must allow it, though they may warn you about the risks.

## Why Go Pro Se?

ADVANTAGES:
- No attorney fees (contingency or hourly)
- You control your case completely
- You know your facts best
- Emotional investment in outcome
- Learning experience
- Can always hire attorney later

DISADVANTAGES:
- Steep learning curve
- Judges hold you to same standards as attorneys
- Opposing counsel may try to take advantage
- Time-intensive
- Emotional stress
- Risk of procedural errors

## When Pro Se Makes Sense

GOOD CANDIDATES:
- Clear-cut FCRA violations
- Strong documentation
- Willing to learn legal procedures
- Time to dedicate to case
- Small claims or straightforward matters

CONSIDER AN ATTORNEY IF:
- Complex legal issues
- Large potential damages
- Opposing party has strong legal team
- You can find contingency representation
- You're uncomfortable with legal procedures

## The FCRA Advantage

FCRA cases can be good for pro se because:
- Relatively straightforward law
- Clear violation standards
- Statutory damages available
- Attorney fee provision (if you win, defendant pays)
- Many cases settle
- Bureaus often prefer to settle

## Reality Check

Pro se litigation is HARD WORK:
- Expect 50-100+ hours of preparation
- Must learn legal procedures
- Must meet all deadlines
- Must follow court rules precisely
- Mistakes can cost you the case

But it IS possible. Many pro se plaintiffs have succeeded in FCRA cases.`
      },
      {
        id: '2',
        title: 'Building Your Case File',
        duration: '15 min',
        content: `A strong case file is the foundation of successful litigation.

## Essential Documents

DISPUTE CORRESPONDENCE:
- All dispute letters you sent
- Certified mail receipts
- Return receipt cards
- Tracking confirmations
- All bureau responses

CREDIT REPORTS:
- Reports showing violations
- Reports before and after disputes
- All three bureaus if applicable
- Dated copies at key points

EVIDENCE OF ACTUAL VALUES:
- Account statements
- Payment confirmations
- Payoff letters
- Correspondence with creditors

EVIDENCE OF HARM:
- Credit denial letters
- Higher rate notifications
- Application records
- Medical records (emotional distress)
- Journal of distress (contemporaneous)

## Organizing Your File

Create sections:
1. CHRONOLOGY - Timeline of events
2. DISPUTES - All dispute correspondence
3. RESPONSES - All bureau responses
4. CREDIT REPORTS - Copies showing issues
5. EVIDENCE - Supporting documentation
6. HARM - Evidence of damages
7. LEGAL RESEARCH - Relevant cases and statutes

## The Chronology

Create a detailed timeline:

| Date | Event | Document |
|------|-------|----------|
| 1/15/24 | Pulled credit report | Exhibit A |
| 1/20/24 | Sent dispute to TransUnion | Exhibit B |
| 1/21/24 | Certified mail delivered | Exhibit C |
| 2/25/24 | Received response | Exhibit D |
| 2/26/24 | Verified without fixing | Exhibit D |
| 3/1/24 | Sent follow-up dispute | Exhibit E |

This becomes your roadmap for the case.

## Key Evidence to Highlight

Focus on proving:
1. Information was inaccurate
2. You disputed properly
3. Bureau failed to investigate/correct
4. You suffered harm as result

Each element needs supporting evidence.`
      },
      {
        id: '3',
        title: 'Filing Your Lawsuit',
        duration: '18 min',
        content: `The mechanics of actually filing an FCRA lawsuit.

## Choosing Your Court

FEDERAL COURT:
- FCRA is federal law - federal courts have jurisdiction
- More formal procedures
- Judges more familiar with FCRA
- Recommended for most FCRA cases

STATE COURT:
- FCRA allows state court filing
- May be less formal
- May be more convenient
- Concurrent jurisdiction

SMALL CLAIMS:
- For smaller damages
- Simplified procedures
- Lower filing fees
- May have damage caps

## The Complaint

Your complaint must include:

1. CAPTION
   • Court name
   • Parties (you vs. defendants)
   • Case number (assigned by clerk)

2. JURISDICTION
   • Why this court has authority
   • FCRA provides federal jurisdiction

3. PARTIES
   • Your name and address
   • Defendant names and addresses

4. FACTUAL ALLEGATIONS
   • What happened
   • Numbered paragraphs
   • Chronological order

5. CAUSES OF ACTION
   • Which FCRA sections violated
   • How defendant violated them

6. DAMAGES
   • What you're seeking
   • Actual, statutory, punitive

7. PRAYER FOR RELIEF
   • Specific request to court

## Filing Process

1. Prepare complaint (multiple copies)
2. Go to court clerk's office
3. Pay filing fee ($350-400 federal)
4. Clerk assigns case number
5. Get copies stamped "filed"
6. Serve defendants within time limit

## Service of Process

Defendants must be formally notified:
- Personal service
- Certified mail (if allowed)
- Process server
- Must follow court rules exactly

## Defendant's Response

After service, defendants typically have:
- 21 days (federal court)
- 30 days (varies by state)
- May file answer or motion to dismiss`
      },
      {
        id: '4',
        title: 'Discovery & Motion Practice',
        duration: '20 min',
        content: `Discovery is where you gather evidence. Motions are how you argue legal issues.

## Discovery Tools

INTERROGATORIES:
- Written questions to opposing party
- Must answer under oath
- Limited number (usually 25)
- Good for basic facts

REQUESTS FOR PRODUCTION:
- Demand documents from other side
- Investigation files
- Policies and procedures
- Training materials
- Communications about your dispute

REQUESTS FOR ADMISSION:
- Ask them to admit/deny facts
- Failure to respond = admitted
- Can establish undisputed facts
- Strategic tool

DEPOSITIONS:
- Oral questioning under oath
- Recorded by court reporter
- Most expensive discovery tool
- Very effective but time-intensive

## What to Request

FROM CREDIT BUREAUS:
- Your complete credit file
- Dispute investigation records
- Communications with furnisher
- Reinvestigation procedures
- Employee training materials
- Similar complaints/lawsuits

FROM FURNISHERS:
- Account records
- Communication with bureaus
- Investigation records
- Policies for reporting
- Correction procedures

## Common Motions

MOTION TO DISMISS:
- Defendant argues case should be thrown out
- You must respond (opposition)
- Court decides if case proceeds

MOTION FOR SUMMARY JUDGMENT:
- Either side argues no trial needed
- Facts are undisputed
- Entitled to judgment as matter of law

MOTION TO COMPEL:
- Force other side to provide discovery
- When they don't respond properly

## Responding to Motions

When defendants file motions:
- Read carefully
- Note deadline to respond
- Research the legal arguments
- File opposition on time
- Ask court for hearing if helpful

## Discovery Disputes

If other side doesn't cooperate:
- Meet and confer (required)
- File motion to compel
- Request sanctions if warranted`
      },
      {
        id: '5',
        title: 'Settlement & Trial',
        duration: '25 min',
        content: `Most cases settle. But you must be prepared for trial.

## Settlement Negotiations

WHEN TO NEGOTIATE:
- After filing (shows you're serious)
- After discovery (facts established)
- Before trial (avoid uncertainty)
- Any time both sides are willing

WHAT TO CONSIDER:
- Your actual damages
- Statutory damages possible
- Likelihood of winning at trial
- Time and stress of continuing
- Defendant's settlement patterns

SETTLEMENT RANGE:
- Simple cases: $1,000 - $10,000
- Moderate cases: $10,000 - $50,000
- Strong cases with harm: $50,000+
- Class actions: Much more

## Settlement Agreement Terms

Typical terms include:
- Payment amount
- Timeline for payment
- Deletion of disputed items (sometimes)
- Confidentiality clause
- Release of claims
- No admission of liability

## Mediation

Many courts require mediation:
- Neutral third party facilitates
- Non-binding (usually)
- Can help bridge gaps
- Worth trying before trial

## If You Go to Trial

PREPARATION:
- Organize all exhibits
- Prepare witness list
- Write opening statement
- Prepare direct examination questions
- Anticipate cross-examination
- Write closing argument
- Know the evidence rules

TRIAL BASICS:
- Arrive early and dress professionally
- Address judge as "Your Honor"
- Be respectful always
- Stick to relevant facts
- Don't argue with opposing counsel
- Let your evidence speak

## The Verdict

If you win:
- Judgment entered in your favor
- Defendant must pay
- May need to collect judgment
- Can request attorney fees (even pro se)

If you lose:
- Can appeal (but costly)
- Learn from experience
- Consider what went wrong

## Pro Se Success Stories

Many consumers have succeeded pro se:
- Settlements before trial
- Favorable verdicts
- Items deleted as part of resolution
- Financial compensation

The key is preparation and persistence.`
      }
    ],
  },

  // ==================== BUSINESS CREDIT (5 courses) ====================
  {
    id: 'business-credit-fundamentals',
    title: '👑 Business Credit Fundamentals',
    description: 'Build business credit separate from your personal credit',
    category: 'Advanced Disputes',
    difficulty: 'advanced',
    duration: '45 min',
    isPrime: true,
    points: 75,
    icon: '🏢',
    lessons: [
      {
        id: '1',
        title: 'What is Business Credit?',
        duration: '8 min',
        content: `Business credit is separate from personal credit and opens massive opportunities.

## Personal vs Business Credit

PERSONAL CREDIT:
- Tied to your SSN
- Reports to TransUnion, Equifax, Experian
- Used for personal loans/cards
- Follows YOU

BUSINESS CREDIT:
- Tied to your EIN (business tax ID)
- Reports to Dun & Bradstreet, Experian Business, Equifax Business
- Used for business financing
- Follows your BUSINESS

## Why Business Credit Matters

SEPARATION:
- Protects personal credit
- Business debt stays on business
- Personal credit unaffected (usually)

HIGHER LIMITS:
- Business cards often $10,000-$100,000+
- Business loans can be substantial
- Terms based on business strength

MORE OPPORTUNITIES:
- Net 30/60/90 accounts
- Trade credit
- Equipment financing
- Lines of credit
- SBA loans

TAX BENEFITS:
- Business expenses deductible
- Cleaner accounting
- Better financial management

## The Business Credit Bureaus

DUN & BRADSTREET (D&B):
- Most important for business credit
- PAYDEX score (0-100)
- Requires DUNS number
- Used by major vendors

EXPERIAN BUSINESS:
- Intelliscore (0-100)
- Credit score similar to personal
- Widely used

EQUIFAX BUSINESS:
- Business Credit Risk Score
- Payment Index
- Less commonly used

## Getting Started

Requirements:
- Registered business entity (LLC, Corp)
- EIN from IRS
- Business bank account
- Business address and phone
- Professional presence`
      },
      {
        id: '2',
        title: 'Setting Up Your Business Properly',
        duration: '10 min',
        content: `Proper setup is essential for building business credit.

## Step 1: Choose Business Structure

SOLE PROPRIETORSHIP:
- Easiest to form
- No separation from you personally
- NOT recommended for credit building

LLC (Limited Liability Company):
- Personal liability protection
- Flexible taxation
- RECOMMENDED for most

CORPORATION (S-Corp or C-Corp):
- Most formal structure
- Best liability protection
- More complex requirements
- Good for larger businesses

## Step 2: Get Your EIN

Apply at IRS.gov - free and instant:
- Employer Identification Number
- Like SSN for your business
- Required for business credit
- Apply online in minutes

## Step 3: Business Bank Account

Open a dedicated business account:
- Separates business/personal finances
- Required by most creditors
- Use your EIN, not SSN
- Choose a business-friendly bank

## Step 4: Business Address

Options:
- Commercial address (best)
- Home address (okay to start)
- Virtual office address
- PO Box (not ideal for credit)

Consistent address across all filings is key.

## Step 5: Business Phone

Dedicated business line:
- Listed in your business name
- Can be VOIP (Google Voice, etc.)
- Must be findable in directories
- 411 listing helpful

## Step 6: Professional Presence

WEBSITE:
- Professional business website
- Business email (not gmail)
- Shows legitimacy

LICENSES:
- Business license
- State registration
- Industry-specific licenses

## Step 7: Get Your DUNS Number

Apply at dnb.com:
- Free DUNS number
- Takes 30 days (or pay to expedite)
- Required for D&B credit profile
- Use for vendor applications`
      },
      {
        id: '3',
        title: 'Building Business Credit: The Process',
        duration: '12 min',
        content: `The step-by-step process to establish and build business credit.

## PHASE 1: Starter Vendors (Month 1-3)

Apply for "starter" trade accounts that extend credit to new businesses:

TIER 1 - Easiest Approval:
- Uline (shipping supplies)
- Grainger (industrial supplies)
- Quill (office supplies)
- Strategic Network Solutions
- Crown Office Supplies

These offer NET 30 accounts:
- Buy products on credit
- Pay within 30 days
- They report to business bureaus

STRATEGY:
- Apply for 3-5 starter accounts
- Make small purchases
- Pay EARLY (before due date)
- Build payment history

## PHASE 2: Store Credit (Month 3-6)

After some payment history:

TIER 2:
- Home Depot Pro
- Lowes Business
- Staples Business
- Amazon Business Line
- BP/Shell Fleet Cards

Requirements:
- Some business credit history
- D&B file established
- Consistent payment history

## PHASE 3: Business Credit Cards (Month 6+)

Once established:

TIER 3:
- Brex
- Divvy
- Capital One Spark
- Chase Ink Business
- American Express Business

Many don't require personal guarantee once business credit is strong.

## PHASE 4: Major Financing (Year 1+)

With strong business credit:
- Business lines of credit
- Equipment financing
- SBA loans
- Commercial real estate

## Key Success Factors

PAY EARLY:
- NET 30 = pay in 15-20 days
- Shows reliability
- Builds PAYDEX score

START SMALL:
- Small orders first
- Increase over time
- Don't overextend

USE CREDIT REGULARLY:
- Active accounts score better
- Regular purchases and payments
- Shows ongoing business activity

MONITOR REPORTS:
- Check D&B, Experian Business
- Dispute errors
- Track progress`
      },
      {
        id: '4',
        title: 'Business Credit Scores Explained',
        duration: '8 min',
        content: `Understanding how business credit scores work.

## D&B PAYDEX Score (0-100)

The most important business score:

- 80-100: Low risk (pays early or on time)
- 50-79: Medium risk (pays on time to slightly slow)
- 0-49: High risk (pays significantly slow)

HOW IT'S CALCULATED:
- 100% based on payment history
- Days beyond terms (DBT)
- Payment experiences from vendors
- Weighted by dollar amounts

TO GET 80+:
- Pay all accounts early
- NET 30 = pay by day 20
- Consistency is key

## Experian Intelliscore Plus (1-100)

FACTORS:
- Payment history
- Credit utilization
- Length of credit history
- Company size
- Industry risk
- Public records

RANGES:
- 76-100: Low risk
- 51-75: Low-medium risk
- 26-50: Medium risk
- 1-25: High risk

## Equifax Business Credit Risk Score (101-992)

RANGES:
- 892-992: Low risk
- 796-891: Low-medium risk
- 670-795: Medium risk
- Below 670: Higher risk

## FICO SBSS Score (0-300)

Used for SBA loans:
- Combines personal and business credit
- 140+ often required for SBA
- Most important for SBA 7(a) loans

## Monitoring Your Scores

FREE OPTIONS:
- Nav.com - Free business credit monitoring
- Credit.net - D&B access
- Some business cards offer monitoring

PAID OPTIONS:
- D&B CreditBuilder
- Experian Business Credit Advantage
- Full access and monitoring`
      },
      {
        id: '5',
        title: 'Advanced Business Credit Strategies',
        duration: '7 min',
        content: `Advanced tactics to maximize your business credit.

## Strategy 1: The Velocity Method

Rapidly build trade references:
- Open 3-5 starter accounts
- Make purchases each month
- Pay early consistently
- Report builds quickly

Within 90 days, you'll have:
- Multiple positive tradelines
- Established PAYDEX score
- Foundation for tier 2 accounts

## Strategy 2: Personal Guarantee Removal

Start with cards that need personal guarantee, then:
- Build business credit history
- Request guarantee removal
- Or apply for no-PG cards once established

NO-PG OPTIONS (with established business credit):
- Brex
- Divvy
- Some Amex Business cards

## Strategy 3: Strategic Credit Utilization

Business credit utilization matters too:
- Keep utilization under 30%
- Higher limits help
- Multiple accounts spread utilization

## Strategy 4: Credit Building Services

Consider services that report:
- Credit building programs
- Alternative tradelines
- Must report to bureaus to count

## Strategy 5: SBA Loan Positioning

To qualify for SBA loans:
- FICO SBSS score 140+
- Clean personal credit (650+)
- Strong business credit
- 2+ years in business (preferred)
- Profitable financials

## Protecting Business Credit

SEPARATE EVERYTHING:
- Never mix personal/business expenses
- Pay business debts from business account
- Keep clean records

MONITOR REGULARLY:
- Check reports monthly
- Dispute errors immediately
- Watch for fraud

MAINTAIN RELATIONSHIPS:
- Keep accounts active
- Pay early always
- Increase limits over time

## The Long Game

Year 1: Foundation
- Starter vendors
- DUNS established
- Basic business cards

Year 2: Growth
- Higher limits
- Multiple tradelines
- PAYDEX 80+

Year 3+: Optimization
- No-PG financing
- Major credit lines
- SBA loan eligibility
- Commercial real estate potential`
      }
    ],
  },

  // ==================== LLC & CORPORATE STRUCTURE (3 courses) ====================
  {
    id: 'llc-formation-guide',
    title: '👑 LLC Formation: Complete Guide',
    description: 'Form your LLC properly for maximum legal and credit protection',
    category: 'Advanced Disputes',
    difficulty: 'intermediate',
    duration: '40 min',
    isPrime: true,
    points: 60,
    icon: '📋',
    lessons: [
      {
        id: '1',
        title: 'Why Form an LLC?',
        duration: '8 min',
        content: `An LLC (Limited Liability Company) provides crucial protections for business owners.

## Personal Liability Protection

Without an LLC:
- You ARE the business
- Business debts = personal debts
- Lawsuits can take personal assets
- No separation exists

With an LLC:
- Business is separate legal entity
- Personal assets protected (generally)
- Debts belong to LLC
- Limited personal exposure

## Tax Flexibility

LLCs can be taxed as:
- Sole proprietorship (default for single-member)
- Partnership (default for multi-member)
- S-Corporation (by election)
- C-Corporation (by election)

This flexibility lets you optimize taxes.

## Credibility

An LLC provides:
- Professional appearance
- Legitimacy with vendors
- Required for some opportunities
- Better for business credit

## Requirements to Maintain Protection

The "corporate veil" protects you IF you:
- Keep business/personal finances separate
- Maintain proper records
- Don't commingle funds
- Follow formalities
- Adequately capitalize business
- Don't commit fraud

## When an LLC Isn't Enough

Consider additional protection:
- Insurance (general liability, E&O)
- Multiple LLCs for different activities
- Holding company structure
- Professional advice for complex situations`
      },
      {
        id: '2',
        title: 'Forming Your LLC Step-by-Step',
        duration: '12 min',
        content: `The exact process to form your LLC properly.

## Step 1: Choose Your State

WHERE TO FORM:
- Your home state (usually best)
- Delaware (privacy, business-friendly)
- Wyoming (low cost, privacy)
- Nevada (no state taxes)

For most small businesses, your home state is simplest.

## Step 2: Choose Your Name

REQUIREMENTS:
- Must include "LLC" or "Limited Liability Company"
- Must be distinguishable from existing businesses
- Cannot include restricted words (Bank, Insurance, etc.)

CHECK AVAILABILITY:
- Secretary of State website
- Trademark search (USPTO)
- Domain availability

## Step 3: Designate Registered Agent

REGISTERED AGENT:
- Receives legal documents for your LLC
- Must have physical address in state
- Must be available during business hours

OPTIONS:
- Yourself
- Professional service ($50-300/year)
- Attorney

## Step 4: File Articles of Organization

FILE WITH:
- Your state's Secretary of State
- Online or by mail
- Fee varies ($50-500 depending on state)

INFORMATION NEEDED:
- LLC name
- Registered agent name and address
- Principal address
- Organizer name
- Management structure

## Step 5: Create Operating Agreement

EVEN IF NOT REQUIRED by your state, create one:
- Defines ownership percentages
- Management structure
- Profit/loss distribution
- Member responsibilities
- What happens if member leaves

## Step 6: Get Your EIN

APPLY AT IRS.GOV:
- Free
- Instant online
- Required for bank accounts
- Required for business credit

## Step 7: Open Business Bank Account

BRING TO BANK:
- Articles of Organization
- EIN letter
- Operating Agreement
- Government ID

## Step 8: Comply with Ongoing Requirements

ANNUAL REQUIREMENTS (vary by state):
- Annual report
- Franchise tax
- Registered agent maintenance
- Business license renewal`
      },
      {
        id: '3',
        title: 'S-Corp Election: When and Why',
        duration: '10 min',
        content: `The S-Corp election can save significant taxes for profitable businesses.

## What is an S-Corp?

An S-Corp is a TAX ELECTION, not an entity type.

Your LLC remains an LLC legally, but is TAXED as an S-Corp.

## How S-Corp Taxation Works

WITHOUT S-CORP:
- All profit = self-employment income
- Pay 15.3% self-employment tax on all profit
- Plus income tax

WITH S-CORP:
- Pay yourself "reasonable salary"
- Only salary has employment taxes
- Remaining profit = distribution (no self-employment tax)

## Example

$100,000 profit:

SOLE PROPRIETOR:
- Self-employment tax: $14,130 (15.3% on 92.35%)
- Plus income tax on $100,000

S-CORP ($50,000 salary):
- Payroll taxes: ~$7,650 on salary
- Income tax on full $100,000
- SAVINGS: ~$6,500+ per year

## When S-Corp Makes Sense

GENERALLY WORTH IT WHEN:
- Net profit exceeds $40,000-$50,000+
- Can pay reasonable salary
- Willing to do payroll

NOT WORTH IT WHEN:
- Lower profits
- Losses expected
- Complexity isn't justified

## Requirements

TO ELECT S-CORP:
- File Form 2553 with IRS
- Must be within 75 days of start of year
- All shareholders must consent

ONGOING REQUIREMENTS:
- Pay yourself reasonable salary
- Run payroll (withholding, payroll taxes)
- Quarterly payroll filings
- Year-end W-2

## Professional Help Recommended

S-Corp election involves:
- Tax planning
- Payroll setup
- Ongoing compliance

Consider consulting:
- CPA or tax professional
- Payroll service
- Business attorney`
      },
      {
        id: '4',
        title: 'Corporate Credit Strategies',
        duration: '10 min',
        content: `Using your LLC strategically for credit building.

## Establishing Corporate Credit

Your LLC should have:
- EIN (not SSN)
- DUNS number
- Business bank account
- Business address and phone
- Clean corporate records

## Building Credit Under Your LLC

STEP 1: Starter Trade Accounts
- Apply using EIN
- Business name and address
- Build payment history

STEP 2: Business Credit Cards
- Start with cards requiring EIN
- May need personal guarantee initially
- Build to no-PG cards

STEP 3: Business Lines of Credit
- After 1-2 years of history
- Strong revenue helps
- Business credit score matters

## Personal Guarantee Strategy

STARTING OUT:
- Most cards require personal guarantee
- This is normal - don't avoid it
- Build history while personally guaranteeing

GOAL:
- Strong business credit profile
- Request PG removal
- Apply for no-PG products

NO-PG OPTIONS (established businesses):
- Brex
- Divvy
- Some Amex Business products
- Bank lines of credit (with strong financials)

## Separating Business and Personal

CRITICAL RULES:
- Never put personal expenses on business cards
- Never put business expenses on personal cards
- Keep bank accounts completely separate
- Pay business debts from business account
- Maintain clear records

## Multiple LLC Strategy

Consider separate LLCs for:
- Different business activities
- Real estate holdings
- High-liability operations
- Asset protection

Each can build its own credit profile.

## Corporate Credit Score Factors

WHAT MATTERS:
- Payment history (most important)
- Credit utilization
- Length of credit history
- Public records
- Industry risk

WHAT DOESN'T MATTER:
- Your personal credit (mostly)
- Revenue (for scoring, but matters for approval)
- Number of employees`
      }
    ],
  },

  // ==================== ADVANCED DISPUTE STRATEGIES (4 courses) ====================
  {
    id: 'nuclear-dispute-strategies',
    title: '👑 Nuclear Dispute Strategies',
    description: 'When standard disputes fail, deploy these advanced tactics',
    category: 'Advanced Disputes',
    difficulty: 'expert',
    duration: '50 min',
    isPrime: true,
    points: 80,
    icon: '☢️',
    lessons: [
      {
        id: '1',
        title: 'Method of Verification Demands',
        duration: '10 min',
        content: `When bureaus "verify" without fixing, demand to know HOW they verified.

## Your Right to MOV

Under FCRA §1681i(a)(6)(B)(iii):

After completing an investigation, if you request, the bureau must provide:
"A description of the procedure used to determine the accuracy and completeness of the information"

This includes:
- Business name and address of furnisher contacted
- Telephone number (if reasonably available)
- Description of investigation conducted

## Why MOV Matters

When bureaus rubber-stamp "verified":
- They often didn't really investigate
- MOV exposes this
- Creates evidence for lawsuit
- Puts them on notice

## How to Request

After receiving "verified" response:

"Pursuant to FCRA §1681i(a)(6)(B)(iii), I am requesting a description of the method of verification used in your investigation of my dispute.

Please provide:
1. The name, address, and telephone number of any person or entity contacted
2. A description of the investigation conducted
3. The specific information reviewed or relied upon
4. How accuracy was determined

Please respond within 15 days."

## What to Do with Response

IF THEY PROVIDE REAL VERIFICATION:
- Review it carefully
- Identify any weaknesses
- Use for next dispute round
- Prepare for potential litigation

IF THEY PROVIDE FORM RESPONSE:
- Document the inadequate response
- This supports "failure to investigate" claim
- File CFPB complaint
- Consider legal action

IF THEY DON'T RESPOND:
- FCRA violation
- Document it
- Strong evidence for lawsuit`
      },
      {
        id: '2',
        title: 'Direct Furnisher Disputes',
        duration: '10 min',
        content: `Bypass the bureaus - dispute directly with the creditor/collector.

## Furnisher Obligations Under FCRA

§1681s-2(b) requires furnishers to:
- Conduct investigation when notified of dispute
- Review all information provided
- Report results to bureau
- Modify or delete inaccurate information
- Notify other bureaus if information found inaccurate

## When to Use Direct Disputes

USE WHEN:
- Bureau disputes not working
- You have specific evidence
- Original creditor might be more responsive
- Collection agency may not have documentation

## How to Send

Send dispute DIRECTLY to the furnisher:
- Certified mail with return receipt
- Same structure as bureau dispute
- Include all supporting evidence
- Reference FCRA obligations

## Sample Direct Dispute

"RE: Account #XXXX - Dispute of Inaccurate Information

Dear [Furnisher]:

I am disputing the accuracy of information you are reporting to credit bureaus regarding the above account.

Specifically:
[List specific inaccuracies]

Under FCRA §1681s-2(b), upon notification of a dispute, you are required to conduct an investigation, review all relevant information, and report results to the credit bureau.

Enclosed please find evidence supporting my dispute:
[List documents]

Please investigate this matter and correct the inaccurate information with all credit bureaus within 30 days.

Sincerely,
[Your name]"

## Strategic Advantage

Direct furnisher disputes:
- Create additional violation potential
- Furnishers have independent duty
- May get better response than bureau
- Builds paper trail for litigation`
      },
      {
        id: '3',
        title: 'CFPB Complaints That Get Results',
        duration: '12 min',
        content: `The Consumer Financial Protection Bureau is a powerful ally.

## Why CFPB Complaints Work

- Federal agency oversight
- Companies MUST respond
- Creates regulatory record
- Often gets results when disputes fail
- Can trigger investigations

## When to File

FILE AFTER:
- At least one dispute attempt
- Bureau fails to properly investigate
- 30+ days without response
- "Verified" without real investigation
- Ongoing reporting of inaccurate info

## How to File

WEBSITE: consumerfinance.gov/complaint

SELECT:
- Credit reporting
- Specific bureau (TransUnion, Equifax, Experian)
- Problem type

## Complaint Structure

BE SPECIFIC:
- What information is inaccurate
- When you disputed
- What bureau did (or didn't do)
- What you want resolved

INCLUDE TIMELINE:
- Date inaccuracy discovered
- Date(s) of dispute(s)
- Date(s) of response(s)
- Current status

ATTACH DOCUMENTS:
- Dispute letters
- Bureau responses
- Evidence of inaccuracy
- Any other relevant docs

## Sample Complaint

"I am disputing inaccurate information on my TransUnion credit report. The account [NAME/NUMBER] shows [INACCURATE INFO] when the correct information is [ACCURATE INFO].

I disputed this on [DATE] via certified mail. TransUnion responded on [DATE] claiming the information was 'verified' without providing any evidence of a real investigation.

I followed up requesting Method of Verification on [DATE]. [Their response or lack thereof].

The information remains inaccurate. I have attached [documents] proving the inaccuracy.

I request that TransUnion conduct a proper investigation and correct this inaccurate information immediately."

## After Filing

- Company has 15 days to respond
- You can respond to their response
- CFPB tracks resolution
- Can file follow-up if not resolved`
      },
      {
        id: '4',
        title: 'Attorney General & State Actions',
        duration: '8 min',
        content: `State-level complaints add additional pressure.

## State Attorney General

Every state has an AG with consumer protection authority.

FIND YOURS: naag.org

## When to Contact AG

- CFPB complaint didn't resolve issue
- Systematic violations (not just your case)
- Pattern of behavior
- Egregious conduct

## Filing an AG Complaint

Most states have online complaint forms:
- Similar to CFPB complaint
- Include all documentation
- Explain what you've already tried
- Request investigation

## What AGs Can Do

- Investigate companies
- Issue subpoenas
- File lawsuits
- Obtain settlements
- Order changes to practices
- Collect civil penalties

## Multi-State Actions

Sometimes AGs coordinate:
- Major bureau investigations
- Industry-wide problems
- Can result in large settlements

Example: 2015 AG settlement with bureaus required dispute handling improvements.

## State-Specific Laws

Some states have ADDITIONAL protections:
- California - strongest consumer protections
- New York - active enforcement
- Some states have additional damages

Check your state's consumer protection laws.

## Combining Strategies

MAXIMUM PRESSURE:
1. Dispute with bureau
2. Direct dispute with furnisher
3. CFPB complaint
4. State AG complaint
5. All documented
6. Lawsuit as final option

Each step creates more pressure and documentation.`
      },
      {
        id: '5',
        title: 'Preparing for Legal Action',
        duration: '10 min',
        content: `When all else fails, litigation becomes your final tool.

## Building Your Litigation File

ESSENTIAL DOCUMENTATION:
- Every dispute letter (copies)
- Certified mail receipts
- Return receipts showing delivery
- Every bureau response
- Method of verification requests and responses
- CFPB complaint and response
- State AG complaint and response
- Evidence of inaccuracy
- Evidence of harm

## Evidence of Violations

DOCUMENT:
- Dates and deadlines
- What bureau was supposed to do
- What bureau actually did
- How their actions (or inaction) violated FCRA

COMMON VIOLATIONS:
- Failed to investigate within 30 days
- Failed to provide MOV
- "Verified" without investigation
- Continued reporting known inaccuracy
- Failed to note dispute on report

## Evidence of Damages

ACTUAL DAMAGES:
- Credit denials (save denial letters)
- Higher interest rates (show rate difference)
- Lost opportunities (document them)
- Emotional distress (contemporaneous journal)
- Out-of-pocket costs

STATUTORY DAMAGES:
- Available for willful violations
- $100-$1,000 per violation
- Don't need to prove actual damages

## Consultation Preparation

BEFORE MEETING ATTORNEY:
- Organize chronologically
- Create summary of events
- List all violations
- Calculate potential damages
- Have questions ready

## Finding the Right Attorney

LOOK FOR:
- Consumer law specialization
- FCRA experience specifically
- Contingency arrangements
- Good communication
- Realistic assessment

RESOURCES:
- National Association of Consumer Advocates
- Consumer lawyers in your state
- Referrals from legal aid

## The Settlement Advantage

With strong documentation:
- Most cases settle
- Bureaus prefer to settle
- Your paper trail creates leverage
- Results can include payment AND deletion`
      }
    ],
  },
];


// ============================================================================
// COURSE CATEGORIES
// ============================================================================

export const COURSE_CATEGORIES = [
  { id: 'all', name: 'All Courses', icon: '📚' },
  { id: 'Credit Basics', name: 'Credit Basics', icon: '📊' },
  { id: 'FCRA Fundamentals', name: 'FCRA Fundamentals', icon: '⚖️' },
  { id: 'Debt Management', name: 'Debt Management', icon: '💳' },
  { id: 'Credit Building', name: 'Credit Building', icon: '🏗️' },
  { id: 'Metro 2 Mastery', name: 'Metro 2 Mastery', icon: '👑' },
  { id: 'Legal Strategy', name: 'Legal Strategy', icon: '⚖️' },
  { id: 'Advanced Disputes', name: 'Advanced Disputes', icon: '☢️' },
];


// ============================================================================
// COMBINED EXPORTS
// ============================================================================

export const ALL_COURSES = [...FREE_COURSES, ...PRIME_COURSES];

export const getCourseById = (id: string): Course | undefined => {
  return ALL_COURSES.find(course => course.id === id);
};

export const getCoursesByCategory = (category: string): Course[] => {
  if (category === 'all') return ALL_COURSES;
  return ALL_COURSES.filter(course => course.category === category);
};

export const getFreeCourses = (): Course[] => FREE_COURSES;

export const getPrimeCourses = (): Course[] => PRIME_COURSES;
