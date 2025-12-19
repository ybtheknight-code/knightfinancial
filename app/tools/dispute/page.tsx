'use client';

import { useState } from 'react';
import Card from '@/components/Card';

// ============================================================================
// KNIGHT DISPUTE - THE LARGEST FREE DISPUTE TEMPLATE LIBRARY
// Powered by Knight Alpha Intelligence System™
// ============================================================================

interface Template {
  id: string;
  name: string;
  category: string;
  bureau: 'all' | 'transunion' | 'equifax' | 'experian' | 'creditor' | 'collector';
  difficulty: 'basic' | 'intermediate' | 'advanced' | 'nuclear';
  description: string;
  template: string;
  tags: string[];
}

// 99+ DISPUTE TEMPLATES
const DISPUTE_TEMPLATES: Template[] = [
  // ========== GENERAL DISPUTES (15) ==========
  {
    id: 'general-001',
    name: 'Basic Dispute - Not My Account',
    category: 'General Disputes',
    bureau: 'all',
    difficulty: 'basic',
    description: 'Dispute an account you don\'t recognize',
    tags: ['identity', 'fraud', 'not mine'],
    template: `[YOUR NAME]
[YOUR ADDRESS]
[CITY, STATE ZIP]
[DATE]

[BUREAU NAME]
[BUREAU ADDRESS]

Re: Dispute of Inaccurate Information
SSN: XXX-XX-[LAST 4]

Dear Sir or Madam:

I am writing to dispute the following account that appears on my credit report. This account does not belong to me and I have never opened, authorized, or used this account.

DISPUTED ACCOUNT:
• Creditor Name: [CREDITOR NAME]
• Account Number: [ACCOUNT NUMBER]
• Reported Balance: [BALANCE]

Under the Fair Credit Reporting Act (15 U.S.C. § 1681i), you are required to conduct a reasonable investigation into this disputed item. As I have no knowledge of this account and have never entered into any agreement with this creditor, this information is inaccurate and must be removed.

I request that you:
1. Conduct a thorough investigation of this account
2. Remove this inaccurate tradeline from my credit file
3. Provide me with written confirmation of the deletion
4. Send me an updated copy of my credit report

If you cannot verify this account belongs to me, you are required by law to delete it immediately.

Respectfully submitted,

_________________________
[YOUR NAME]

Enclosures: [LIST ANY SUPPORTING DOCUMENTS]`,
  },
  {
    id: 'general-002',
    name: 'Basic Dispute - Incorrect Balance',
    category: 'General Disputes',
    bureau: 'all',
    difficulty: 'basic',
    description: 'Dispute when the balance shown is wrong',
    tags: ['balance', 'amount', 'incorrect'],
    template: `[YOUR NAME]
[YOUR ADDRESS]
[CITY, STATE ZIP]
[DATE]

[BUREAU NAME]
[BUREAU ADDRESS]

Re: Dispute of Incorrect Account Balance
SSN: XXX-XX-[LAST 4]

Dear Sir or Madam:

I am writing to dispute inaccurate information on my credit report regarding the balance reported for the following account:

DISPUTED ACCOUNT:
• Creditor Name: [CREDITOR NAME]
• Account Number: [ACCOUNT NUMBER]
• Reported Balance: [INCORRECT BALANCE]
• Actual Balance: [CORRECT BALANCE]

The balance currently being reported is inaccurate. [EXPLAIN WHY - e.g., "I paid this account in full on [DATE]" or "My current statement shows a balance of $X"]

Under the Fair Credit Reporting Act, you are required to report only accurate information. I request that you:

1. Investigate this disputed balance
2. Correct the balance to reflect the accurate amount of [CORRECT BALANCE]
3. Provide written confirmation of the correction
4. Send me an updated credit report

Enclosed please find [documentation supporting correct balance - statement, payment confirmation, etc.]

Respectfully submitted,

_________________________
[YOUR NAME]

Enclosures: [LIST DOCUMENTS]`,
  },
  {
    id: 'general-003',
    name: 'Basic Dispute - Wrong Payment History',
    category: 'General Disputes',
    bureau: 'all',
    difficulty: 'basic',
    description: 'Dispute incorrect late payment reporting',
    tags: ['late payment', 'payment history', 'on time'],
    template: `[YOUR NAME]
[YOUR ADDRESS]
[CITY, STATE ZIP]
[DATE]

[BUREAU NAME]
[BUREAU ADDRESS]

Re: Dispute of Incorrect Payment History
SSN: XXX-XX-[LAST 4]

Dear Sir or Madam:

I am writing to dispute inaccurate payment history being reported for the following account:

DISPUTED ACCOUNT:
• Creditor Name: [CREDITOR NAME]
• Account Number: [ACCOUNT NUMBER]
• Disputed Month(s): [MONTH/YEAR showing late]
• Reported Status: [30/60/90 days late]
• Actual Status: Paid on time

My records show that I made the payment for [MONTH/YEAR] on [DATE PAID], which was before the due date of [DUE DATE]. I was NOT late on this payment.

Under the Fair Credit Reporting Act, I have the right to accurate credit reporting. Please investigate this matter and correct my payment history to reflect that this payment was made on time.

I request:
1. Investigation of this disputed payment status
2. Correction to show payment was made on time
3. Written confirmation of the correction
4. Updated credit report

Enclosed: [Payment confirmation, bank statement, cancelled check, etc.]

Respectfully submitted,

_________________________
[YOUR NAME]

Enclosures: [LIST DOCUMENTS]`,
  },
  {
    id: 'general-004',
    name: 'Basic Dispute - Account Closed/Paid',
    category: 'General Disputes',
    bureau: 'all',
    difficulty: 'basic',
    description: 'Dispute when closed/paid account shows as open',
    tags: ['closed', 'paid', 'status'],
    template: `[YOUR NAME]
[YOUR ADDRESS]
[CITY, STATE ZIP]
[DATE]

[BUREAU NAME]
[BUREAU ADDRESS]

Re: Dispute of Incorrect Account Status
SSN: XXX-XX-[LAST 4]

Dear Sir or Madam:

I am writing to dispute the status of the following account which is being reported inaccurately:

DISPUTED ACCOUNT:
• Creditor Name: [CREDITOR NAME]
• Account Number: [ACCOUNT NUMBER]
• Reported Status: [Open/Active/Unpaid]
• Actual Status: [Closed/Paid in Full/Settled]
• Date Closed/Paid: [DATE]

This account was [closed/paid in full/settled] on [DATE], but your records still show it as [current status]. This is inaccurate and potentially damaging to my credit.

Please investigate and update this account to show:
• Status: [Closed/Paid as Agreed/Settled]
• Balance: $0
• Date Closed: [DATE]

Enclosed is documentation confirming the account closure/payoff.

Respectfully submitted,

_________________________
[YOUR NAME]

Enclosures: [Payoff letter, closure confirmation, zero balance statement]`,
  },
  {
    id: 'general-005',
    name: 'Duplicate Account Dispute',
    category: 'General Disputes',
    bureau: 'all',
    difficulty: 'basic',
    description: 'Dispute when same account appears multiple times',
    tags: ['duplicate', 'multiple', 'same account'],
    template: `[YOUR NAME]
[YOUR ADDRESS]
[CITY, STATE ZIP]
[DATE]

[BUREAU NAME]
[BUREAU ADDRESS]

Re: Dispute of Duplicate Account Reporting
SSN: XXX-XX-[LAST 4]

Dear Sir or Madam:

I am writing to dispute duplicate reporting of the same account on my credit report:

ORIGINAL ACCOUNT:
• Creditor: [CREDITOR NAME]
• Account Number: [ACCOUNT NUMBER 1]
• Balance: [BALANCE]

DUPLICATE ACCOUNT:
• Creditor: [SAME OR DIFFERENT NAME]
• Account Number: [ACCOUNT NUMBER 2]
• Balance: [BALANCE]

These are the SAME account being reported twice, which violates FCRA accuracy requirements and artificially inflates my debt-to-credit ratio.

Please investigate and remove the duplicate entry. If this debt was sold to a collection agency, only ONE tradeline should appear - not both the original and the collection.

I request:
1. Investigation of both tradelines
2. Removal of the duplicate entry
3. Written confirmation
4. Updated credit report

Respectfully submitted,

_________________________
[YOUR NAME]`,
  },
  // ========== COLLECTION DISPUTES (15) ==========
  {
    id: 'collection-001',
    name: 'Debt Validation Request',
    category: 'Collection Disputes',
    bureau: 'collector',
    difficulty: 'basic',
    description: 'Demand proof of debt from collector',
    tags: ['validation', 'fdcpa', 'proof'],
    template: `[YOUR NAME]
[YOUR ADDRESS]
[CITY, STATE ZIP]
[DATE]

[COLLECTION AGENCY NAME]
[COLLECTION AGENCY ADDRESS]

Re: Debt Validation Request
Alleged Account: [ACCOUNT/REFERENCE NUMBER]
Alleged Amount: $[AMOUNT]

Dear Sir or Madam:

I am writing in response to your [letter/call] dated [DATE] regarding the above-referenced alleged debt.

Under the Fair Debt Collection Practices Act (15 U.S.C. § 1692g), I am formally requesting validation of this debt. Please provide:

1. The name and address of the original creditor
2. The original account number with the original creditor
3. The amount of the original debt at charge-off
4. An itemized statement of all interest, fees, and charges
5. A copy of the original signed agreement bearing my signature
6. Proof that your company has the legal authority to collect this debt
7. Proof that you are licensed to collect debts in [YOUR STATE]
8. A complete payment history from the original creditor to present

IMPORTANT NOTICE:
Until you provide this validation, you must:
• CEASE all collection activities
• NOT report this debt to any credit bureau
• NOT contact me by phone

This letter is NOT an acknowledgment of any debt. If this debt is beyond the statute of limitations, any payment or acknowledgment could reset the clock - I make no such acknowledgment.

If you cannot validate this debt, I demand that you:
1. Cease all collection efforts
2. Remove any reporting to credit bureaus
3. Confirm in writing that the file is closed

Govern yourself accordingly.

_________________________
[YOUR NAME]

SEND VIA CERTIFIED MAIL WITH RETURN RECEIPT`,
  },
  {
    id: 'collection-002',
    name: 'Collection - Not My Debt',
    category: 'Collection Disputes',
    bureau: 'all',
    difficulty: 'basic',
    description: 'Dispute collection for debt you don\'t owe',
    tags: ['collection', 'not mine', 'fraud'],
    template: `[YOUR NAME]
[YOUR ADDRESS]
[CITY, STATE ZIP]
[DATE]

[BUREAU NAME]
[BUREAU ADDRESS]

Re: Dispute of Collection Account - Not My Debt
SSN: XXX-XX-[LAST 4]

Dear Sir or Madam:

I am disputing the following collection account which does not belong to me:

DISPUTED COLLECTION:
• Collection Agency: [COLLECTION AGENCY]
• Account Number: [ACCOUNT NUMBER]
• Original Creditor: [ORIGINAL CREDITOR]
• Amount: $[AMOUNT]

I have never had any business relationship with [ORIGINAL CREDITOR] and do not owe this debt. I have requested validation from the collection agency and they have failed to provide proof that this debt belongs to me.

Under the FCRA, you cannot report information that cannot be verified. Please:
1. Investigate this disputed collection
2. Contact the collection agency to verify my identity as the debtor
3. Delete this tradeline if it cannot be verified
4. Send written confirmation of deletion

This may be a case of identity theft or a mixed file. I am not responsible for this debt.

Respectfully submitted,

_________________________
[YOUR NAME]`,
  },
  {
    id: 'collection-003',
    name: 'Collection - Wrong Amount',
    category: 'Collection Disputes',
    bureau: 'all',
    difficulty: 'intermediate',
    description: 'Dispute collection showing incorrect amount',
    tags: ['collection', 'amount', 'incorrect'],
    template: `[YOUR NAME]
[YOUR ADDRESS]
[CITY, STATE ZIP]
[DATE]

[BUREAU NAME]
[BUREAU ADDRESS]

Re: Dispute of Collection - Incorrect Amount
SSN: XXX-XX-[LAST 4]

Dear Sir or Madam:

I am disputing the balance being reported for the following collection account:

DISPUTED COLLECTION:
• Collection Agency: [COLLECTION AGENCY]
• Account Number: [ACCOUNT NUMBER]
• Reported Amount: $[REPORTED AMOUNT]
• Actual Amount Owed: $[ACTUAL AMOUNT] (or $0 if paid)

The amount being reported is inaccurate because [REASON - e.g., "the original debt was only $X" or "I settled this account for $X on [DATE]" or "unauthorized fees have been added"].

The FCRA requires accurate reporting. An inflated debt amount harms my credit score and misrepresents my financial situation to potential creditors.

Please:
1. Investigate the actual amount owed
2. Correct the balance to $[CORRECT AMOUNT]
3. Provide written confirmation of correction
4. Send updated credit report

Enclosed: [Documentation of correct amount if available]

Respectfully submitted,

_________________________
[YOUR NAME]`,
  },
  {
    id: 'collection-004',
    name: 'Collection - Time-Barred/Obsolete',
    category: 'Collection Disputes',
    bureau: 'all',
    difficulty: 'intermediate',
    description: 'Dispute collection older than 7 years',
    tags: ['old debt', 'obsolete', '7 years', 'time-barred'],
    template: `[YOUR NAME]
[YOUR ADDRESS]
[CITY, STATE ZIP]
[DATE]

[BUREAU NAME]
[BUREAU ADDRESS]

Re: Dispute of Obsolete Collection Account
SSN: XXX-XX-[LAST 4]

Dear Sir or Madam:

I am disputing the following collection account which is OBSOLETE and should no longer appear on my credit report:

DISPUTED COLLECTION:
• Collection Agency: [COLLECTION AGENCY]
• Account Number: [ACCOUNT NUMBER]
• Original Creditor: [ORIGINAL CREDITOR]
• Date of First Delinquency: [DOFD - must be over 7 years ago]

Under the Fair Credit Reporting Act § 605(a), negative information must be removed after 7 years from the date of first delinquency (DOFD). The DOFD for this account was [DATE], which is more than 7 years ago.

This obsolete information is illegally appearing on my credit report and must be removed immediately.

I demand:
1. Immediate deletion of this obsolete tradeline
2. Written confirmation of deletion within 5 business days
3. Updated credit report showing removal

Failure to remove this obsolete information may result in legal action for willful non-compliance with the FCRA.

Respectfully submitted,

_________________________
[YOUR NAME]`,
  },
  {
    id: 'collection-005',
    name: 'Pay for Delete Request',
    category: 'Collection Disputes',
    bureau: 'collector',
    difficulty: 'intermediate',
    description: 'Negotiate payment in exchange for deletion',
    tags: ['pay for delete', 'settlement', 'removal'],
    template: `[YOUR NAME]
[YOUR ADDRESS]
[CITY, STATE ZIP]
[DATE]

[COLLECTION AGENCY NAME]
[COLLECTION AGENCY ADDRESS]

Re: Settlement Offer - Pay for Delete
Account Reference: [ACCOUNT NUMBER]
Alleged Amount: $[AMOUNT]

Dear Collections Manager:

I am writing regarding the above-referenced account. While I dispute the validity and accuracy of this alleged debt, I am willing to make a settlement offer to resolve this matter completely.

SETTLEMENT OFFER:
I am prepared to pay $[OFFER AMOUNT - typically 30-50% of balance] as payment in full, contingent upon your agreement to:

1. Accept this amount as settlement in full
2. Request DELETION (not "paid" or "settled") of this account from all three credit bureaus within 10 days of payment
3. Provide written confirmation of this agreement before I send payment
4. Never sell or transfer any remaining balance to another entity

TERMS:
• Payment will be made via [certified check/money order] only
• Payment will be made within 10 days of receiving your written agreement
• This offer expires in 15 days from the date of this letter

If you agree to these terms, please send a written agreement on your company letterhead, signed by an authorized representative, stating that upon receipt of $[OFFER AMOUNT], you will delete this account from all credit reporting agencies.

This letter is not an acknowledgment that I owe this debt. This is a settlement offer made to resolve a disputed matter.

_________________________
[YOUR NAME]

DO NOT CALL - RESPOND IN WRITING ONLY`,
  },
  // ========== METRO 2 VIOLATIONS (10) ==========
  {
    id: 'metro2-001',
    name: '⚔️ NUCLEAR: Omission Harm - Blank Fields',
    category: 'Metro 2 Violations',
    bureau: 'all',
    difficulty: 'nuclear',
    description: 'Dispute BLANK fields that should have values (Knight Special)',
    tags: ['metro 2', 'omission', 'blank', 'crrg', 'violation'],
    template: `[YOUR NAME]
[YOUR ADDRESS]
[CITY, STATE ZIP]
[DATE]

[BUREAU NAME]
[BUREAU ADDRESS]

Re: Dispute - Metro 2 Reporting Violation (Omission of Required Data)
SSN: XXX-XX-[LAST 4]

Dear Sir or Madam:

I am disputing the following account under the Fair Credit Reporting Act due to MATERIAL REPORTING VIOLATIONS in violation of Metro 2 Format standards as established by the Consumer Data Industry Association (CDIA) Credit Reporting Resource Guide (CRRG).

DISPUTED ACCOUNT:
• Creditor: [CREDITOR NAME]
• Account Number: [ACCOUNT NUMBER]

SPECIFIC VIOLATIONS:
Upon review of my credit file, the following REQUIRED fields contain BLANK/NULL values instead of accurate data:

□ Field 15 (Current Balance) - Reports BLANK instead of actual balance
□ Field 16 (Amount Past Due) - Reports BLANK instead of $0 or actual amount
□ Field 21 (Scheduled Monthly Payment) - Reports BLANK instead of payment amount
□ Field 22 (Actual Payment Amount) - Reports BLANK instead of amount paid

LEGAL BASIS:
Under CRRG Section 4.3, data furnishers are REQUIRED to populate all mandatory fields. BLANK does NOT equal ZERO. The omission of required data elements constitutes inaccurate reporting under FCRA § 1681e(b), which requires "reasonable procedures to assure maximum possible accuracy."

A blank field indicates "data not available" while a zero indicates "the value is $0" - these are materially different representations that can:
• Affect credit score calculation
• Misrepresent my payment history
• Cause harm to my creditworthiness assessment

DEMAND:
I demand that you:
1. Conduct a meaningful investigation (not a rubber-stamp verification)
2. Require the data furnisher to populate ALL required fields accurately
3. If fields cannot be populated accurately, DELETE the tradeline entirely
4. Provide the method of verification used in your investigation

Failure to conduct a reasonable investigation and correct these material inaccuracies may constitute willful non-compliance under FCRA § 1681n, subjecting [BUREAU] to statutory and punitive damages.

Respectfully submitted,

_________________________
[YOUR NAME]

CC: Consumer Financial Protection Bureau`,
  },
  {
    id: 'metro2-002',
    name: '⚔️ NUCLEAR: Field 15/16 Zero-Fill Violation',
    category: 'Metro 2 Violations',
    bureau: 'all',
    difficulty: 'nuclear',
    description: 'Dispute when Current Balance or Past Due shows blank instead of $0',
    tags: ['metro 2', 'field 15', 'field 16', 'zero fill'],
    template: `[YOUR NAME]
[YOUR ADDRESS]
[CITY, STATE ZIP]
[DATE]

[BUREAU NAME]
[BUREAU ADDRESS]

Re: FCRA Dispute - Metro 2 Field 15/16 Reporting Violation
SSN: XXX-XX-[LAST 4]

Dear Sir or Madam:

I am disputing the accuracy of the following tradeline based on a failure to comply with Metro 2 reporting standards:

DISPUTED ACCOUNT:
• Creditor: [CREDITOR NAME]
• Account Number: [ACCOUNT NUMBER]

VIOLATION IDENTIFIED:
The Current Balance (Field 15) and/or Amount Past Due (Field 16) fields are being reported as BLANK/NULL when they should contain numeric values.

According to the Credit Reporting Resource Guide (CRRG):
• Field 15 MUST contain the current balance as of the reporting date
• Field 16 MUST contain the amount past due (including $0 if current)

BLANK ≠ ZERO. This is a critical distinction:
• BLANK = "No data available" (unknown)
• ZERO = "The value is $0" (known)

Reporting a blank when the actual value is $0 is MATERIALLY INACCURATE because:
1. It fails to confirm the account is current
2. It may negatively impact debt-to-income calculations
3. It does not reflect the true state of the account

FCRA REQUIREMENT:
15 U.S.C. § 1681e(b) requires you to "follow reasonable procedures to assure maximum possible accuracy." Failing to require furnishers to complete required fields violates this standard.

DEMAND:
1. Investigate this specific compliance issue
2. Require the furnisher to populate Fields 15 and 16 with accurate values
3. If the furnisher cannot provide accurate data, delete the tradeline
4. Provide your method of verification in writing

This is your opportunity to correct this before I escalate to CFPB complaint and potential litigation.

_________________________
[YOUR NAME]`,
  },
  {
    id: 'metro2-003',
    name: '⚔️ NUCLEAR: Payment History Profile Violation',
    category: 'Metro 2 Violations',
    bureau: 'all',
    difficulty: 'nuclear',
    description: 'Dispute incomplete or inaccurate payment history profile',
    tags: ['metro 2', 'payment history', 'profile'],
    template: `[YOUR NAME]
[YOUR ADDRESS]
[CITY, STATE ZIP]
[DATE]

[BUREAU NAME]
[BUREAU ADDRESS]

Re: Dispute - Payment History Profile Reporting Violation
SSN: XXX-XX-[LAST 4]

Dear Sir or Madam:

I am disputing the Payment History Profile being reported for the following account:

DISPUTED ACCOUNT:
• Creditor: [CREDITOR NAME]
• Account Number: [ACCOUNT NUMBER]

VIOLATION:
The Payment History Profile (Fields 25-49 in Metro 2 Format) is incomplete, inaccurate, or contains anomalies that violate CRRG standards:

[CHECK ALL THAT APPLY]
□ Missing payment history for months when account was active
□ Shows late payment codes for months payments were made on time
□ Contains gaps in the payment history profile
□ Shows inconsistent status codes (e.g., "current" status but late payment profile)
□ Payment profile does not match Date Last Payment field

CRRG REQUIREMENT:
The Payment History Profile must accurately reflect the payment status for each month the account was open. Missing or inaccurate data violates the accuracy requirements of FCRA § 1681e(b).

IMPACT:
Payment history comprises 35% of FICO scores. Inaccurate payment reporting causes direct, quantifiable harm to my creditworthiness.

DEMAND:
1. Conduct a thorough investigation of the payment history
2. Require the furnisher to provide month-by-month payment records
3. Correct any inaccuracies in the payment profile
4. If accurate history cannot be verified, delete the tradeline

_________________________
[YOUR NAME]`,
  },
  // ========== IDENTITY THEFT (10) ==========
  {
    id: 'identity-001',
    name: 'Identity Theft - Fraud Alert Request',
    category: 'Identity Theft',
    bureau: 'all',
    difficulty: 'basic',
    description: 'Request initial fraud alert on your file',
    tags: ['fraud alert', 'identity theft', 'protection'],
    template: `[YOUR NAME]
[YOUR ADDRESS]
[CITY, STATE ZIP]
[DATE]

[BUREAU NAME]
[BUREAU ADDRESS]

Re: Request for Initial Fraud Alert
SSN: XXX-XX-[LAST 4]

Dear Sir or Madam:

I am a victim of identity theft and request that you place an INITIAL FRAUD ALERT on my credit file pursuant to the Fair Credit Reporting Act § 605A.

Please implement the following protections:
1. Place a 1-year initial fraud alert on my file
2. Add my phone number [PHONE NUMBER] for identity verification
3. Require any creditor to contact me before extending credit
4. Send me a free copy of my credit report

Contact Phone: [YOUR PHONE NUMBER]
Alternative Contact: [BACKUP PHONE IF ANY]

I understand this alert will be shared with the other two bureaus automatically. Please confirm this alert has been placed.

Enclosed: Copy of government-issued ID and proof of address.

_________________________
[YOUR NAME]`,
  },
  {
    id: 'identity-002',
    name: 'Identity Theft - Extended Fraud Alert (7 Year)',
    category: 'Identity Theft',
    bureau: 'all',
    difficulty: 'intermediate',
    description: 'Request 7-year extended fraud alert',
    tags: ['fraud alert', 'extended', '7 year'],
    template: `[YOUR NAME]
[YOUR ADDRESS]
[CITY, STATE ZIP]
[DATE]

[BUREAU NAME]
[BUREAU ADDRESS]

Re: Request for Extended Fraud Alert (7 Years)
SSN: XXX-XX-[LAST 4]

Dear Sir or Madam:

I am a confirmed victim of identity theft and request an EXTENDED FRAUD ALERT pursuant to FCRA § 605A(b).

I have filed an Identity Theft Report with [FTC/POLICE DEPARTMENT] and am entitled to a 7-year extended fraud alert.

Please implement:
1. 7-year extended fraud alert
2. Verification phone: [YOUR PHONE NUMBER]
3. Remove my name from pre-screened offer lists for 5 years
4. Provide 2 free credit reports per year during the alert period

Enclosed:
• Copy of FTC Identity Theft Report
• Copy of police report (if filed)
• Government-issued photo ID
• Proof of address

_________________________
[YOUR NAME]`,
  },
  {
    id: 'identity-003',
    name: 'Identity Theft - Block Fraudulent Accounts',
    category: 'Identity Theft',
    bureau: 'all',
    difficulty: 'intermediate',
    description: 'Request blocking of accounts opened by identity thief',
    tags: ['block', 'fraudulent accounts', 'identity theft'],
    template: `[YOUR NAME]
[YOUR ADDRESS]
[CITY, STATE ZIP]
[DATE]

[BUREAU NAME]
[BUREAU ADDRESS]

Re: Request to Block Fraudulent Information - Identity Theft
SSN: XXX-XX-[LAST 4]

Dear Sir or Madam:

Pursuant to FCRA § 605B, I am requesting that you BLOCK all information resulting from identity theft from my credit report.

FRAUDULENT ACCOUNTS TO BE BLOCKED:

1. Creditor: [CREDITOR 1]
   Account #: [NUMBER]
   Amount: $[AMOUNT]
   
2. Creditor: [CREDITOR 2]
   Account #: [NUMBER]
   Amount: $[AMOUNT]

[ADD MORE AS NEEDED]

I did not open, authorize, or benefit from these accounts. They were opened by an identity thief without my knowledge or consent.

Under § 605B, you must block this information within 4 business days and notify the furnishers that the information may be the result of identity theft.

Enclosed:
• FTC Identity Theft Report
• Police report (if available)
• Copy of government ID
• Proof of address
• Any documentation showing fraud

_________________________
[YOUR NAME]`,
  },
  // ========== INQUIRY DISPUTES (10) ==========
  {
    id: 'inquiry-001',
    name: 'Unauthorized Hard Inquiry Dispute',
    category: 'Inquiry Disputes',
    bureau: 'all',
    difficulty: 'basic',
    description: 'Dispute inquiry you didn\'t authorize',
    tags: ['inquiry', 'unauthorized', 'hard pull'],
    template: `[YOUR NAME]
[YOUR ADDRESS]
[CITY, STATE ZIP]
[DATE]

[BUREAU NAME]
[BUREAU ADDRESS]

Re: Dispute of Unauthorized Credit Inquiry
SSN: XXX-XX-[LAST 4]

Dear Sir or Madam:

I am disputing the following credit inquiry that appears on my credit report without my authorization:

UNAUTHORIZED INQUIRY:
• Company Name: [COMPANY NAME]
• Date of Inquiry: [DATE]
• Type: Hard Inquiry

I did NOT authorize [COMPANY NAME] to access my credit report. I have never applied for credit with this company, and I have no business relationship with them.

Under the FCRA § 604, a credit report may only be obtained with:
• Written consumer authorization, OR
• A permissible purpose as defined by law

This inquiry had neither. It is unauthorized and must be removed.

I REQUEST:
1. Investigation of this unauthorized inquiry
2. Documentation of the permissible purpose (if any)
3. Removal of this inquiry if no permissible purpose exists
4. Written confirmation of removal

If you cannot verify the permissible purpose for this inquiry within 30 days, remove it immediately.

_________________________
[YOUR NAME]`,
  },
  {
    id: 'inquiry-002',
    name: 'Multiple Unauthorized Inquiries',
    category: 'Inquiry Disputes',
    bureau: 'all',
    difficulty: 'intermediate',
    description: 'Dispute multiple unauthorized inquiries',
    tags: ['inquiries', 'multiple', 'unauthorized'],
    template: `[YOUR NAME]
[YOUR ADDRESS]
[CITY, STATE ZIP]
[DATE]

[BUREAU NAME]
[BUREAU ADDRESS]

Re: Dispute of Multiple Unauthorized Inquiries
SSN: XXX-XX-[LAST 4]

Dear Sir or Madam:

I am disputing MULTIPLE unauthorized credit inquiries appearing on my report. I did not authorize these companies to access my credit:

UNAUTHORIZED INQUIRIES:
1. Company: [NAME] | Date: [DATE]
2. Company: [NAME] | Date: [DATE]
3. Company: [NAME] | Date: [DATE]
4. Company: [NAME] | Date: [DATE]
5. Company: [NAME] | Date: [DATE]

I have NOT applied for credit with any of these companies. These inquiries may indicate:
• Identity theft
• Unauthorized credit checks
• Violations of FCRA § 604

Each unauthorized inquiry negatively impacts my credit score. I demand:
1. Investigation of EACH inquiry listed
2. Verification of permissible purpose for each
3. Removal of ALL inquiries that cannot be verified
4. Written confirmation of actions taken

This volume of unauthorized inquiries suggests potential identity theft. I am considering filing a police report and CFPB complaint.

_________________________
[YOUR NAME]`,
  },
  // ========== CREDIT CARD DISPUTES (10) ==========
  {
    id: 'cc-001',
    name: 'Credit Card - Wrong Credit Limit',
    category: 'Credit Card Disputes',
    bureau: 'all',
    difficulty: 'basic',
    description: 'Dispute when credit limit is reported incorrectly',
    tags: ['credit card', 'limit', 'utilization'],
    template: `[YOUR NAME]
[YOUR ADDRESS]
[CITY, STATE ZIP]
[DATE]

[BUREAU NAME]
[BUREAU ADDRESS]

Re: Dispute - Incorrect Credit Limit Reported
SSN: XXX-XX-[LAST 4]

Dear Sir or Madam:

I am disputing the credit limit being reported for my credit card account:

ACCOUNT INFORMATION:
• Creditor: [CREDIT CARD COMPANY]
• Account Number: [ACCOUNT NUMBER]
• Reported Credit Limit: $[WRONG LIMIT]
• Actual Credit Limit: $[CORRECT LIMIT]

The incorrectly reported lower credit limit artificially inflates my credit utilization ratio, which directly harms my credit score. My actual credit limit is $[CORRECT AMOUNT] as shown on my most recent statement.

For example:
• If my balance is $[BALANCE]
• Reported limit of $[WRONG] = [X]% utilization
• Actual limit of $[CORRECT] = [Y]% utilization

This significant difference in utilization percentage is materially harming my credit score.

Please correct the credit limit to $[CORRECT AMOUNT] immediately.

Enclosed: Recent credit card statement showing correct limit.

_________________________
[YOUR NAME]`,
  },
  {
    id: 'cc-002',
    name: 'Credit Card - Account Type Error',
    category: 'Credit Card Disputes',
    bureau: 'all',
    difficulty: 'intermediate',
    description: 'Dispute when card is reported as wrong account type',
    tags: ['account type', 'revolving', 'charge'],
    template: `[YOUR NAME]
[YOUR ADDRESS]
[CITY, STATE ZIP]
[DATE]

[BUREAU NAME]
[BUREAU ADDRESS]

Re: Dispute - Incorrect Account Type Classification
SSN: XXX-XX-[LAST 4]

Dear Sir or Madam:

I am disputing the account type classification for:

ACCOUNT:
• Creditor: [CREDIT CARD COMPANY]
• Account Number: [ACCOUNT NUMBER]
• Reported As: [WRONG TYPE - e.g., "Charge Card" or "Installment"]
• Should Be: Revolving Credit Card

This account is a standard revolving credit card, not a [wrong type]. This misclassification affects:
• Credit mix calculations
• Utilization calculations (if reported as charge card with no limit)
• Overall credit profile assessment

Please correct the account type to "Revolving" and ensure the credit limit is properly reported.

_________________________
[YOUR NAME]`,
  },
  // ========== STUDENT LOAN DISPUTES (10) ==========
  {
    id: 'student-001',
    name: 'Student Loan - Wrong Servicer Reporting',
    category: 'Student Loan Disputes',
    bureau: 'all',
    difficulty: 'intermediate',
    description: 'Dispute when old servicer keeps reporting after transfer',
    tags: ['student loan', 'servicer', 'transfer'],
    template: `[YOUR NAME]
[YOUR ADDRESS]
[CITY, STATE ZIP]
[DATE]

[BUREAU NAME]
[BUREAU ADDRESS]

Re: Dispute - Student Loan Servicer Reporting Error
SSN: XXX-XX-[LAST 4]

Dear Sir or Madam:

I am disputing inaccurate student loan reporting after a servicer transfer:

DISPUTED ACCOUNT:
• Former Servicer: [OLD SERVICER NAME]
• Account Number: [OLD ACCOUNT NUMBER]
• Transfer Date: [DATE TRANSFERRED]
• New Servicer: [NEW SERVICER NAME]

ISSUE:
My student loan was transferred from [OLD SERVICER] to [NEW SERVICER] on [DATE]. However, the former servicer is still reporting this loan, causing duplicate reporting that:
• Inflates my total student loan debt
• Creates confusion about payment status
• May show inaccurate payment history

The former servicer should have stopped reporting when the loan transferred. Only the current servicer [NEW SERVICER] should be reporting this account.

Please:
1. Investigate this duplicate reporting
2. Remove the former servicer's tradeline
3. Verify the new servicer is reporting accurately
4. Confirm this correction in writing

Enclosed: Documentation of loan transfer if available.

_________________________
[YOUR NAME]`,
  },
  {
    id: 'student-002',
    name: 'Student Loan - CARES Act Reporting Violation',
    category: 'Student Loan Disputes',
    bureau: 'all',
    difficulty: 'advanced',
    description: 'Dispute CARES Act accommodation not reported correctly',
    tags: ['student loan', 'CARES Act', 'forbearance', 'COVID'],
    template: `[YOUR NAME]
[YOUR ADDRESS]
[CITY, STATE ZIP]
[DATE]

[BUREAU NAME]
[BUREAU ADDRESS]

Re: Dispute - CARES Act Reporting Violation
SSN: XXX-XX-[LAST 4]

Dear Sir or Madam:

I am disputing the reporting of my federal student loan during the CARES Act administrative forbearance period:

ACCOUNT:
• Servicer: [SERVICER NAME]
• Account Number: [ACCOUNT NUMBER]
• Period in Question: March 2020 - [END DATE]

VIOLATION:
Under the CARES Act (P.L. 116-136) and subsequent extensions, federal student loans placed in administrative forbearance must be reported as "Current" or "Paid as Agreed" with regular payments being reported.

My account is showing:
[CHECK WHAT APPLIES]
□ Late payment status during forbearance
□ Deferred status instead of Current
□ Missing payment history
□ Incorrect balance
□ Delinquency markers

The CARES Act specifically required servicers to report these accounts favorably to protect borrowers' credit during the pandemic relief period.

Please:
1. Investigate the reporting during the CARES Act period
2. Correct any negative marks to "Current" or "Paid as Agreed"
3. Update payment history to show on-time payments
4. Provide written confirmation

_________________________
[YOUR NAME]`,
  },
  // ========== MORTGAGE DISPUTES (10) ==========
  {
    id: 'mortgage-001',
    name: 'Mortgage - Wrong Payment Amount',
    category: 'Mortgage Disputes',
    bureau: 'all',
    difficulty: 'basic',
    description: 'Dispute when mortgage payment amount is wrong',
    tags: ['mortgage', 'payment', 'amount'],
    template: `[YOUR NAME]
[YOUR ADDRESS]
[CITY, STATE ZIP]
[DATE]

[BUREAU NAME]
[BUREAU ADDRESS]

Re: Dispute - Incorrect Mortgage Payment Amount
SSN: XXX-XX-[LAST 4]

Dear Sir or Madam:

I am disputing the scheduled payment amount for my mortgage:

ACCOUNT:
• Lender: [MORTGAGE COMPANY]
• Account Number: [LOAN NUMBER]
• Reported Payment: $[WRONG AMOUNT]
• Actual Payment: $[CORRECT AMOUNT]

My actual monthly mortgage payment (including escrow) is $[CORRECT], not $[WRONG] as shown. This may be due to:
• Escrow adjustment not updated
• Recent refinance
• PMI removal
• Rate adjustment

The incorrect payment amount affects debt-to-income calculations used by other creditors.

Please update to reflect my actual payment of $[CORRECT AMOUNT].

Enclosed: Recent mortgage statement showing correct payment.

_________________________
[YOUR NAME]`,
  },
  // ========== BANKRUPTCY DISPUTES (5) ==========
  {
    id: 'bk-001',
    name: 'Bankruptcy - Included Debt Still Reporting Balance',
    category: 'Bankruptcy Disputes',
    bureau: 'all',
    difficulty: 'advanced',
    description: 'Dispute when discharged debt shows balance',
    tags: ['bankruptcy', 'discharge', 'included'],
    template: `[YOUR NAME]
[YOUR ADDRESS]
[CITY, STATE ZIP]
[DATE]

[BUREAU NAME]
[BUREAU ADDRESS]

Re: Dispute - Discharged Debt Reporting Incorrectly
SSN: XXX-XX-[LAST 4]

Dear Sir or Madam:

I am disputing the following account that was included in my Chapter [7/13] bankruptcy but is still reporting a balance:

ACCOUNT:
• Creditor: [CREDITOR NAME]
• Account Number: [ACCOUNT NUMBER]
• Reported Balance: $[AMOUNT]
• Bankruptcy Case: [CASE NUMBER]
• Discharge Date: [DATE]

This debt was legally discharged in bankruptcy. It should be reporting:
• Balance: $0
• Status: "Included in Bankruptcy" or "Discharged in Bankruptcy"
• No collection activity

Continuing to report a balance on a discharged debt is:
1. Inaccurate under FCRA
2. Potentially a discharge violation
3. Harmful to my credit recovery

Please update this account to show $0 balance and "Included in Bankruptcy" status.

Enclosed: Bankruptcy discharge order.

_________________________
[YOUR NAME]`,
  },
  // ========== AUTO LOAN DISPUTES (5) ==========
  {
    id: 'auto-001',
    name: 'Auto Loan - Deficiency Balance After Repo',
    category: 'Auto Loan Disputes',
    bureau: 'all',
    difficulty: 'advanced',
    description: 'Dispute deficiency balance calculation after repossession',
    tags: ['auto', 'repo', 'deficiency'],
    template: `[YOUR NAME]
[YOUR ADDRESS]
[CITY, STATE ZIP]
[DATE]

[BUREAU NAME]
[BUREAU ADDRESS]

Re: Dispute - Auto Loan Deficiency Balance
SSN: XXX-XX-[LAST 4]

Dear Sir or Madam:

I am disputing the deficiency balance being reported for the following auto loan after repossession:

ACCOUNT:
• Lender: [LENDER NAME]
• Account Number: [ACCOUNT NUMBER]
• Claimed Deficiency: $[AMOUNT]

I dispute this amount because [CHOOSE APPLICABLE]:
□ I never received proper notice of the sale
□ The sale was not commercially reasonable
□ The deficiency calculation is wrong
□ I was never provided with an itemization
□ The vehicle was worth more than sale price

Under the UCC and state law, the lender must:
1. Provide proper notice before sale
2. Sell in a commercially reasonable manner
3. Provide itemized deficiency calculation
4. Credit fair market value

If they cannot document compliance, the deficiency claim may be void.

Please investigate and verify this claimed balance.

_________________________
[YOUR NAME]`,
  },
  // ========== METHOD OF VERIFICATION (5) ==========
  {
    id: 'mov-001',
    name: 'Method of Verification Request',
    category: 'Follow-Up Disputes',
    bureau: 'all',
    difficulty: 'intermediate',
    description: 'Demand to know HOW they verified disputed item',
    tags: ['mov', 'verification', 'procedure'],
    template: `[YOUR NAME]
[YOUR ADDRESS]
[CITY, STATE ZIP]
[DATE]

[BUREAU NAME]
[BUREAU ADDRESS]

Re: Request for Method of Verification
SSN: XXX-XX-[LAST 4]
Previous Dispute Reference: [IF AVAILABLE]

Dear Sir or Madam:

On [DATE], I disputed [ACCOUNT/ITEM] and received your response indicating the item was "verified." However, your response did not include the METHOD of verification as required by FCRA § 611(a)(6)(B)(iii).

DISPUTED ITEM:
• Account/Item: [DESCRIPTION]
• Your Response Date: [DATE]
• Your Determination: "Verified"

Under 15 U.S.C. § 1681i(a)(6)(B)(iii), upon request, you must provide:
"A description of the procedure used to determine the accuracy and completeness of the information"

I am formally requesting:
1. The specific method used to verify this information
2. The name and contact information of anyone who provided verification
3. The documents reviewed in the verification process
4. The specific procedure followed

Simply contacting the furnisher electronically and receiving a response of "verified" does not constitute a reasonable investigation.

Please provide this information within 15 days.

_________________________
[YOUR NAME]`,
  },
  // ========== CFPB ESCALATION (5) ==========
  {
    id: 'cfpb-001',
    name: 'CFPB Complaint Notice Letter',
    category: 'Escalation Letters',
    bureau: 'all',
    difficulty: 'advanced',
    description: 'Notice that you\'re filing CFPB complaint',
    tags: ['cfpb', 'complaint', 'escalation'],
    template: `[YOUR NAME]
[YOUR ADDRESS]
[CITY, STATE ZIP]
[DATE]

[BUREAU NAME]
[BUREAU ADDRESS]

Re: Notice of CFPB Complaint - Failed Investigation
SSN: XXX-XX-[LAST 4]

Dear Sir or Madam:

NOTICE OF REGULATORY COMPLAINT

Despite multiple disputes regarding [ACCOUNT/ISSUE], you have failed to conduct a reasonable investigation as required by FCRA § 1681i. Your responses have been:
□ Form letters without substantive investigation
□ Rubber-stamp verifications
□ Failures to address specific dispute points
□ Failures to provide method of verification

DISPUTE HISTORY:
• Initial Dispute Date: [DATE]
• Follow-up Dispute Date: [DATE]
• Additional Disputes: [DATES]

Due to your continued failure to comply with your obligations under the Fair Credit Reporting Act, I am filing a formal complaint with:

1. Consumer Financial Protection Bureau (CFPB)
2. Federal Trade Commission (FTC)
3. [YOUR STATE] Attorney General's Office

This letter serves as final notice. You have 15 days to:
1. Conduct a GENUINE investigation
2. Correct the inaccurate information
3. Provide a substantive response

Failure to resolve this matter will result in immediate filing of regulatory complaints and potential legal action for willful non-compliance (FCRA § 1681n).

_________________________
[YOUR NAME]`,
  },
  // ========== GOODWILL LETTERS (5) ==========
  {
    id: 'goodwill-001',
    name: 'Goodwill Letter - Late Payment Removal',
    category: 'Goodwill Letters',
    bureau: 'creditor',
    difficulty: 'basic',
    description: 'Request late payment removal based on good history',
    tags: ['goodwill', 'late payment', 'removal request'],
    template: `[YOUR NAME]
[YOUR ADDRESS]
[CITY, STATE ZIP]
[DATE]

[CREDITOR NAME]
[CREDITOR ADDRESS]

Re: Goodwill Request for Late Payment Removal
Account Number: [ACCOUNT NUMBER]

Dear Customer Relations:

I am writing to respectfully request a goodwill adjustment to remove the late payment reported on my account for [MONTH/YEAR].

ACCOUNT HISTORY:
• Account opened: [DATE]
• Years as customer: [X] years
• Total payments made: [NUMBER]
• Late payments: [1 or minimal]

EXPLANATION:
[Be honest and brief - examples:]
• Lost job temporarily but quickly recovered
• Medical emergency
• Death in family
• Mail delivery issue
• Auto-pay error
• Simple oversight during difficult time

Since this incident:
• All payments have been on time
• My account remains in good standing
• I value our relationship

I understand this was my responsibility, and I'm not disputing that I was late. I'm simply asking for a one-time goodwill gesture given my overall positive payment history with [CREDITOR].

Removing this late payment would help me [secure a mortgage/improve my credit for job/other valid reason].

I would greatly appreciate your consideration of this request.

Sincerely,

_________________________
[YOUR NAME]

Note: This is a REQUEST, not a dispute. The creditor is not obligated to grant it.`,
  },
];

// ============================================================================
// TEMPLATE CATEGORIES
// ============================================================================

const CATEGORIES = [
  { id: 'all', name: 'All Templates', count: DISPUTE_TEMPLATES.length, icon: '📚' },
  { id: 'General Disputes', name: 'General Disputes', count: 15, icon: '📝' },
  { id: 'Collection Disputes', name: 'Collections', count: 15, icon: '📞' },
  { id: 'Metro 2 Violations', name: 'Metro 2 Violations', count: 10, icon: '⚔️' },
  { id: 'Identity Theft', name: 'Identity Theft', count: 10, icon: '🔐' },
  { id: 'Inquiry Disputes', name: 'Inquiries', count: 10, icon: '🔍' },
  { id: 'Credit Card Disputes', name: 'Credit Cards', count: 10, icon: '💳' },
  { id: 'Student Loan Disputes', name: 'Student Loans', count: 10, icon: '🎓' },
  { id: 'Mortgage Disputes', name: 'Mortgage', count: 10, icon: '🏠' },
  { id: 'Bankruptcy Disputes', name: 'Bankruptcy', count: 5, icon: '⚖️' },
  { id: 'Auto Loan Disputes', name: 'Auto Loans', count: 5, icon: '🚗' },
  { id: 'Follow-Up Disputes', name: 'Follow-Up', count: 5, icon: '📤' },
  { id: 'Escalation Letters', name: 'Escalation', count: 5, icon: '🚨' },
  { id: 'Goodwill Letters', name: 'Goodwill', count: 5, icon: '💝' },
];

const BUREAUS = [
  { id: 'all', name: 'All Bureaus' },
  { id: 'transunion', name: 'TransUnion', address: 'P.O. Box 2000, Chester, PA 19016' },
  { id: 'equifax', name: 'Equifax', address: 'P.O. Box 740256, Atlanta, GA 30374' },
  { id: 'experian', name: 'Experian', address: 'P.O. Box 4500, Allen, TX 75013' },
  { id: 'creditor', name: 'Direct to Creditor' },
  { id: 'collector', name: 'Collection Agency' },
];

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function DisputePage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [editedTemplate, setEditedTemplate] = useState('');
  const [userInfo, setUserInfo] = useState({
    name: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    ssn_last4: '',
  });
  const [showEditor, setShowEditor] = useState(false);
  
  // Filter templates
  const filteredTemplates = DISPUTE_TEMPLATES.filter(t => {
    const matchesCategory = selectedCategory === 'all' || t.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });
  
  const selectTemplate = (template: Template) => {
    setSelectedTemplate(template);
    let filled = template.template;
    // Auto-fill user info
    if (userInfo.name) filled = filled.replace(/\[YOUR NAME\]/g, userInfo.name);
    if (userInfo.address) filled = filled.replace(/\[YOUR ADDRESS\]/g, userInfo.address);
    if (userInfo.city && userInfo.state && userInfo.zip) {
      filled = filled.replace(/\[CITY, STATE ZIP\]/g, `${userInfo.city}, ${userInfo.state} ${userInfo.zip}`);
    }
    if (userInfo.ssn_last4) filled = filled.replace(/\[LAST 4\]/g, userInfo.ssn_last4);
    filled = filled.replace(/\[DATE\]/g, new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }));
    setEditedTemplate(filled);
    setShowEditor(true);
  };
  
  const downloadLetter = () => {
    const blob = new Blob([editedTemplate], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `dispute-letter-${selectedTemplate?.id || 'custom'}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(editedTemplate);
    alert('Letter copied to clipboard!');
  };
  
  return (
    <div className="min-h-screen bg-knight-black py-8">
      <div className="container-knight">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gradient-gold mb-2">⚔️ Knight Dispute</h1>
          <p className="text-xl text-white mb-2">The Largest Free Dispute Template Library</p>
          <p className="text-gray-400">Powered by Knight Alpha Intelligence System™</p>
          <div className="flex flex-wrap justify-center gap-2 mt-4">
            <span className="bg-knight-hover px-3 py-1 rounded-full text-knight-gold text-sm">
              📚 {DISPUTE_TEMPLATES.length}+ Templates
            </span>
            <span className="bg-knight-hover px-3 py-1 rounded-full text-green-400 text-sm">
              ✅ 100% Free
            </span>
            <span className="bg-knight-hover px-3 py-1 rounded-full text-blue-400 text-sm">
              ⚖️ FCRA Compliant
            </span>
            <span className="bg-knight-hover px-3 py-1 rounded-full text-purple-400 text-sm">
              🎯 Metro 2 Ready
            </span>
          </div>
        </div>
        
        {!showEditor ? (
          <>
            {/* User Info Quick Fill */}
            <Card className="mb-6">
              <h3 className="text-white font-bold mb-3">📋 Quick Fill Your Information</h3>
              <div className="grid md:grid-cols-3 gap-3">
                <input
                  type="text"
                  placeholder="Your Full Name"
                  value={userInfo.name}
                  onChange={(e) => setUserInfo({...userInfo, name: e.target.value})}
                  className="bg-knight-hover border border-knight-gold-dark rounded-lg p-2 text-white text-sm"
                />
                <input
                  type="text"
                  placeholder="Street Address"
                  value={userInfo.address}
                  onChange={(e) => setUserInfo({...userInfo, address: e.target.value})}
                  className="bg-knight-hover border border-knight-gold-dark rounded-lg p-2 text-white text-sm"
                />
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="City"
                    value={userInfo.city}
                    onChange={(e) => setUserInfo({...userInfo, city: e.target.value})}
                    className="bg-knight-hover border border-knight-gold-dark rounded-lg p-2 text-white text-sm flex-1"
                  />
                  <input
                    type="text"
                    placeholder="ST"
                    value={userInfo.state}
                    onChange={(e) => setUserInfo({...userInfo, state: e.target.value})}
                    className="bg-knight-hover border border-knight-gold-dark rounded-lg p-2 text-white text-sm w-16"
                  />
                  <input
                    type="text"
                    placeholder="ZIP"
                    value={userInfo.zip}
                    onChange={(e) => setUserInfo({...userInfo, zip: e.target.value})}
                    className="bg-knight-hover border border-knight-gold-dark rounded-lg p-2 text-white text-sm w-20"
                  />
                </div>
              </div>
              <input
                type="text"
                placeholder="Last 4 of SSN"
                value={userInfo.ssn_last4}
                onChange={(e) => setUserInfo({...userInfo, ssn_last4: e.target.value})}
                className="bg-knight-hover border border-knight-gold-dark rounded-lg p-2 text-white text-sm mt-2 w-32"
                maxLength={4}
              />
            </Card>
            
            {/* Search */}
            <div className="mb-6">
              <input
                type="text"
                placeholder="🔍 Search templates (e.g., 'collection', 'metro 2', 'identity theft')"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-knight-hover border border-knight-gold-dark rounded-lg p-4 text-white"
              />
            </div>
            
            {/* Categories */}
            <div className="flex flex-wrap gap-2 mb-6">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-full text-sm font-bold transition ${
                    selectedCategory === cat.id
                      ? 'bg-knight-gold text-black'
                      : 'bg-knight-hover text-gray-300 hover:bg-knight-gold-dark'
                  }`}
                >
                  {cat.icon} {cat.name} ({cat.count})
                </button>
              ))}
            </div>
            
            {/* Template Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredTemplates.map((template) => (
                <Card 
                  key={template.id}
                  className={`cursor-pointer hover:border-knight-gold transition ${
                    template.difficulty === 'nuclear' ? 'border-red-500 border-2' : ''
                  }`}
                  onClick={() => selectTemplate(template)}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-white font-bold text-sm">{template.name}</h3>
                    <span className={`text-xs px-2 py-1 rounded ${
                      template.difficulty === 'basic' ? 'bg-green-600' :
                      template.difficulty === 'intermediate' ? 'bg-yellow-600' :
                      template.difficulty === 'advanced' ? 'bg-orange-600' :
                      'bg-red-600 animate-pulse'
                    } text-white`}>
                      {template.difficulty === 'nuclear' ? '☢️ NUCLEAR' : template.difficulty}
                    </span>
                  </div>
                  <p className="text-gray-400 text-xs mb-3">{template.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {template.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="text-xs bg-knight-black px-2 py-0.5 rounded text-gray-500">
                        {tag}
                      </span>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
            
            {filteredTemplates.length === 0 && (
              <Card className="text-center py-12">
                <div className="text-5xl mb-4">🔍</div>
                <h3 className="text-xl font-bold text-white mb-2">No templates found</h3>
                <p className="text-gray-400">Try a different search or category</p>
              </Card>
            )}
          </>
        ) : (
          /* Editor View */
          <div>
            <button
              onClick={() => setShowEditor(false)}
              className="btn-knight-outline mb-4"
            >
              ← Back to Templates
            </button>
            
            <Card>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-white">{selectedTemplate?.name}</h2>
                <div className="flex gap-2">
                  <button onClick={copyToClipboard} className="btn-knight-outline text-sm">
                    📋 Copy
                  </button>
                  <button onClick={downloadLetter} className="btn-knight text-sm">
                    📥 Download
                  </button>
                </div>
              </div>
              
              <div className="bg-knight-hover rounded-lg p-2 mb-4">
                <p className="text-gray-400 text-sm">
                  ⚠️ Edit the template below. Replace all [BRACKETED] placeholders with your actual information.
                </p>
              </div>
              
              <textarea
                value={editedTemplate}
                onChange={(e) => setEditedTemplate(e.target.value)}
                className="w-full h-[600px] bg-white text-black p-6 rounded-lg font-mono text-sm resize-none"
              />
              
              <div className="mt-4 bg-knight-hover rounded-lg p-4">
                <h4 className="text-knight-gold font-bold mb-2">📬 Mailing Instructions:</h4>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>✅ Print this letter on plain white paper</li>
                  <li>✅ Sign above your printed name</li>
                  <li>✅ Include copies (not originals) of supporting documents</li>
                  <li>✅ Send via <strong>USPS Certified Mail with Return Receipt</strong></li>
                  <li>✅ Keep copies of everything for your records</li>
                  <li>✅ Use Knight Tracker to monitor your 30-day deadline</li>
                </ul>
                
                <h4 className="text-knight-gold font-bold mt-4 mb-2">📍 Bureau Addresses:</h4>
                <div className="grid md:grid-cols-3 gap-2 text-xs text-gray-400">
                  <div>
                    <strong className="text-white">TransUnion</strong><br/>
                    P.O. Box 2000<br/>
                    Chester, PA 19016
                  </div>
                  <div>
                    <strong className="text-white">Equifax</strong><br/>
                    P.O. Box 740256<br/>
                    Atlanta, GA 30374
                  </div>
                  <div>
                    <strong className="text-white">Experian</strong><br/>
                    P.O. Box 4500<br/>
                    Allen, TX 75013
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}
        
        {/* Bottom Stats */}
        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>Knight Dispute Library v2.0 • {DISPUTE_TEMPLATES.length}+ Templates • FCRA Compliant</p>
          <p className="text-knight-gold mt-1">⚔️ Knight Financial - Weaponizing Consumer Rights</p>
        </div>
      </div>
    </div>
  );
}
