'use client'
import Link from 'next/link'
import { useState } from 'react'

export default function LegalPage() {
  const [activeSection, setActiveSection] = useState<string | null>(null)

  const toggleSection = (id: string) => {
    setActiveSection(activeSection === id ? null : id)
  }

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '60px 20px', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif', color: '#1C1209', background: '#FFFFFF', minHeight: '100vh' }}>
      
      {/* Navigation */}
      <div style={{ marginBottom: '60px' }}>
        <Link href="/" style={{ color: '#6B5B4E', textDecoration: 'none', fontSize: '14px', fontWeight: '500', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
          Back to Home
        </Link>
      </div>

      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '60px', padding: '40px 20px', background: 'linear-gradient(135deg, #FDF8F3 0%, #FFFFFF 100%)', borderRadius: '16px', border: '1px solid #F0EAE3' }}>
        <div style={{ width: '80px', height: '80px', background: '#D4873A', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', boxShadow: '0 8px 24px rgba(212, 135, 58, 0.2)' }}>
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line></svg>
        </div>
        <h1 style={{ fontSize: '42px', fontWeight: '800', color: '#1C1209', marginBottom: '16px', letterSpacing: '-1px' }}>
          Terms of Service, Privacy & Cookie Policy
        </h1>
        <p style={{ fontSize: '16px', color: '#6B5B4E', maxWidth: '600px', margin: '0 auto', lineHeight: '1.6' }}>
          Last updated: November 2026 | SEARCH. SETTLE. STUDY.
        </p>
        <p style={{ fontSize: '14px', color: '#999', marginTop: '12px' }}>
          EHANI HOMES | 1098-60200, Meru, Kenya
        </p>
      </div>

      {/* Table of Contents */}
      <div style={{ background: '#F9FAFB', padding: '32px', borderRadius: '12px', border: '1px solid #F0EAE3', marginBottom: '48px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#1C1209', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#D4873A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>
          Table of Contents
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
          <TOCItem number="PART A" title="Terms of Service" range="Clauses 1–24" color="#D4873A" />
          <TOCItem number="PART B" title="Privacy Policy" range="Clauses 25–48" color="#007BFF" />
          <TOCItem number="PART C" title="Cookie Policy" range="Clauses 49–59" color="#9C27B0" />
          <TOCItem number="ANNEX 1" title="Verification Lifecycle" range="" color="#4CAF50" />
          <TOCItem number="ANNEX 2" title="Contact Disclosure Principles" range="" color="#FF9800" />
          <TOCItem number="ANNEX 3" title="Privacy Request Route" range="" color="#9C27B0" />
          <TOCItem number="ANNEX 4" title="Glossary" range="" color="#607D8B" />
        </div>
      </div>

      {/* PART A - Terms of Service */}
      <PartSection 
        id="part-a"
        title="PART A — TERMS OF SERVICE"
        subtitle="Clauses 1–24"
        icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#D4873A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>}
        color="#D4873A"
      >
        <Clause number="1" title="INTRODUCTION AND ACCEPTANCE" content={[
          "1.1 These Terms govern access to and use of the EHANI HOMES website, marketplace, account features, listing tools, property-verification features and related services (\"Platform\").",
          "1.2 EHANI HOMES (\"Ehani\", \"we\", \"us\") operates under the identity SEARCH. SETTLE. STUDY. These Terms apply to students, accommodation providers, visitors and other Platform users.",
          "1.3 By registering, submitting a listing, accessing gated contact details, paying a Platform fee or using a feature requiring acceptance, you agree to these Terms. If you do not agree, do not use the relevant feature.",
          "1.4 These Terms operate with the Privacy Policy, displayed fee schedules, verification instructions and feature-specific conditions. The Privacy Policy explains personal-data processing and does not replace these Terms."
        ]} />

        <Clause number="2" title="LEGAL IDENTITY AND PLATFORM ROLE" content={[
          "2.1 EHANI HOMES is a registered business name operated by Eugene Larry Ososo, of 1098-60200, Meru, Kenya. Hereinafter referred to as \"Ehani\", \"we\", \"us\" or \"our\"",
          "2.2 Ehani operates a digital accommodation-discovery marketplace. Providers submit listings; students discover listings and may access authorised contact information when applicable conditions are met.",
          "2.3 Ehani is not the owner of every advertised property, a tenancy party, property manager, letting agent, rent/deposit intermediary, guarantor, conveyancing service or government inspection authority.",
          "2.4 Ehani does not receive or hold rent or tenancy deposits, negotiate tenancy terms, execute tenancy agreements, guarantee accommodation or arrange meetings between students and providers. Users communicate, inspect, negotiate and contract independently."
        ]} />

        <Clause number="3" title="DEFINITIONS AND INTERPRETATION" content={[
          "3.1 \"Account\" means a registered user profile and related authentication records. \"Provider/Landlord\" means a person authorised to advertise accommodation. \"Listing\" means property information, photographs, prices, amenities, location and availability submitted for display.",
          "3.2 \"Contact Details\" means provider phone, email or other fields designated as gated. \"Verification\" means Ehani's time-limited inspection, review and approval—not a government certification, title search or guarantee.",
          "3.3 \"Verified Period\" means 12 months from approval unless verification is earlier suspended, withdrawn or invalidated. \"Student\" means an eligible adult using the Platform to discover accommodation; enrolment is not independently verified unless a feature expressly says so.",
          "3.4 \"Personal Data\" and \"Applicable Law\" have the meanings assigned by Kenyan data-protection law. Headings aid navigation; \"including\" is not limiting; singular includes plural where context permits; legal references include amendments and replacement legislation."
        ]} />

        <Clause number="4" title="SCOPE AND NATURE OF THE MARKETPLACE" content={[
          "4.1 The Platform organises and presents accommodation information and may provide search, filtering, listing submission, administrative review, verification indicators and controlled contact disclosure.",
          "4.2 Listings are supplied by providers and may change. Publication does not confirm ownership, authority, legal compliance, availability, price accuracy, property condition, safety, suitability or future performance.",
          "4.3 The Platform is not a substitute for independent property inspection, identity checks, written tenancy agreements, legal advice, institutional guidance or due diligence.",
          "4.4 Ehani may introduce, modify, limit or discontinue features, subject to law and applicable contractual obligations."
        ]} />

        <Clause number="5" title="ELIGIBILITY AND USER CATEGORIES" content={[
          "5.1 Accounts are intended for persons aged 18 or older. A person under 18 must not create an account. Ehani may restrict an account where age requirements appear unmet.",
          "5.2 Students use the Platform to discover accommodation and access gated contacts where conditions apply. Providers submit and manage listings, verification requests and contact information.",
          "5.3 A user representing an organisation must have authority to do so and must not misrepresent that authority."
        ]} />

        <Clause number="6" title="REGISTRATION AND ACCOUNT SECURITY" content={[
          "6.1 Students ordinarily register using email and verify it. Standard student signup is intended to collect email only. Providers ordinarily submit display/account name, email and phone and verify email.",
          "6.2 A display name need not be a legal name but must not impersonate or deceive. Users must provide accurate information, maintain a valid email and update material account details.",
          "6.3 Email verification confirms control of an inbox at that time; it does not establish identity, ownership, student status, solvency or trustworthiness.",
          "6.4 Users must protect passwords, verification links and devices, avoid account sharing and notify Ehani promptly of suspected compromise. Ehani may request proportionate additional checks for security, fraud or legal compliance."
        ]} />

        <Clause number="7" title="LANDLORD/PROVIDER OBLIGATIONS" content={[
          "7.1 Providers must own, manage, represent or otherwise be lawfully entitled to advertise the property and demonstrate authority when reasonably requested.",
          "7.2 Providers are responsible for accurate and current rent, deposit, location, accommodation type, amenities, distance, availability, descriptions and photographs.",
          "7.3 Material changes to price, availability, condition, authority or other listing facts must be updated promptly. Providers must not leave materially misleading listings live.",
          "7.4 Providers must not unlawfully discriminate, conceal material defects, fabricate credentials, misrepresent properties or advertise accommodation they cannot lawfully offer.",
          "7.5 Providers must cooperate with inspection arrangements, provide safe lawful access with consent and answer verification questions truthfully.",
          "7.6 Providers must not manipulate verification, bribe/threaten agents, submit fabricated evidence or portray expired/suspended verification as current.",
          "7.7 Providers must communicate responsibly, must not harass or misuse student information and must respect law and platform rules.",
          "7.8 Providers remain responsible for licences, permits, tenancy documents, safety, management, taxes and legal compliance. Platform publication does not transfer those duties to Ehani."
        ]} />

        <Clause number="8" title="LISTING CONTENT AND STANDARDS" content={[
          "8.1 Listings may include property name, location, accommodation type, rent, deposit, amenities, distance to institution, photographs, availability and required form fields.",
          "8.2 Descriptions must be truthful, clear and not materially misleading. Price and deposit should state amount and currency. Claims such as \"near campus\", \"secure\", \"furnished\" or \"available\" require a reasonable factual basis.",
          "8.3 Photographs must relate to the property and not materially misrepresent size, condition, amenities or surroundings. Providers must hold rights and permissions to upload them.",
          "8.4 Avoid photographs containing identifiable people, children, identity documents, private correspondence or unrelated personal spaces unless necessary, lawful and authorised.",
          "8.5 Ehani may establish formatting, image-quality, location, completeness and safety rules. Non-compliant submissions may be returned, rejected, hidden or removed.",
          "8.6 A listing is not an offer by Ehani to enter a tenancy; availability and terms must be confirmed directly with the provider."
        ]} />

        <Clause number="9" title="REVIEW, MODERATION AND PUBLICATION" content={[
          "9.1 Ehani may review submissions before publication and later conduct checks for completeness, consistency, duplication, image quality, verification status and risk.",
          "9.2 Ehani may approve, reject, request clarification, edit formatting, restrict, suspend or remove a listing that is incomplete, misleading, unlawful, duplicated, unsafe, unsupported or reported.",
          "9.3 Administrative approval is a platform decision, not legal certification or guarantee. An unverified listing must not be represented as verified.",
          "9.4 Ehani may temporarily restrict a listing during a fraud, safety, verification, legal or complaint investigation. Where practicable, a provider may be given reasons and an opportunity to respond unless that would compromise safety, evidence or law.",
          "9.5 Restricted moderation records may be retained for accountability, security, complaints or legal purposes under the retention schedule."
        ]} />

        <Clause number="10" title="INSPECTION AND VERIFICATION FRAMEWORK" content={[
          "10.1 Assigned field agents inspect specified observable aspects of a property and compare findings with listing information.",
          "10.2 Inspection may cover location, visible accommodation features, amenities, photographs, material claims and checklist items. Scope may be limited by access, safety, consent or circumstances.",
          "10.3 Providers must secure lawful access and consent. Agents must not trespass, force entry or photograph unrelated personal material.",
          "10.4 Agents submit findings for administrative review. Ehani administration—not payment alone—decides approval, rejection, suspension or withdrawal.",
          "10.5 Inspection does not establish title, beneficial ownership, planning approval, structural integrity, fire compliance, utility reliability, neighbourhood safety or absence of hidden defects. It is not a professional survey or government inspection.",
          "10.6 Ehani may correct records, conduct follow-up inspection or withdraw a decision where material error, fraud, changed conditions or new evidence is identified."
        ]} />

        <Clause number="11" title="VERIFICATION FEE, VALIDITY AND RENEWAL" content={[
          "11.1 The annual verification fee covers one package: fresh physical inspection, verification assessment/review and contact visibility for the approved 12-month period. No separate contact-visibility fee applies under the current model.",
          "11.2 Payment does not itself grant verification. Required inspection and administrative approval must be completed.",
          "11.3 The Verified Period is 12 months from approval unless earlier suspended or withdrawn. Expiry is not automatically extended by payment or a pending request.",
          "11.4 Renewal is not automatic. It requires applicable renewal payment, fresh physical inspection and new approval. Ehani may approve or reject based on findings, accuracy, cooperation, complaints or reasonable platform grounds.",
          "11.5 While inspection/review is pending, badge and contact access remain disabled unless Ehani expressly records otherwise.",
          "11.6 On expiry, rejection, suspension or withdrawal, the badge is removed/disabled and contacts return to gated status. A listing may remain published if ordinary rules are met, without implying current verification.",
          "11.7 Approval of a fresh inspection restores badge/contact access for a new 12-month period from the new approval date.",
          "11.8 Ehani may suspend or withdraw verification before expiry for discrepancies, fraud, safety concerns, non-cooperation or other reasonable grounds; notice and opportunity to respond may be provided where practicable.",
          "11.9 Fees, taxes and instructions must be displayed before payment. Fee changes apply prospectively and do not silently alter an already-paid period."
        ]} />

        <Clause number="12" title="CONTACT GATING AND DISCLOSURE" content={[
          "12.1 Provider contacts are gated by default. Ehani controls whether specified fields are visible and may apply authorisation, account, listing, verification, security or other access conditions.",
          "12.2 Authorisation must identify provider, listing, exact fields, conditions/period, notice version and date/time. Ehani should retain evidence of authorisation and relevant disclosure events.",
          "12.3 When enabled, only authorised fields may be disclosed to eligible users. Disclosure may be logged with timestamp and relevant account/listing identifiers.",
          "12.4 Contact access does not guarantee provider response, property availability or tenancy.",
          "12.5 Providers may request withdrawal/restriction through support@ehani.co.ke. Ehani verifies the requester and restricts future disclosures where appropriate; it cannot retract information already lawfully disclosed or erase recipients' memory.",
          "12.6 Contacts must not be scraped, bulk-exported, sold, reposted or used for unrelated marketing. Ehani may restrict accounts and investigate misuse."
        ]} />

        <Clause number="13" title="STUDENT USE AND DUE DILIGENCE" content={[
          "13.1 Students should confirm directly availability, current rent/deposit, utilities, rules, occupancy, access, furnishings and material terms.",
          "13.2 Before paying or moving in, students should inspect where possible, verify provider identity/authority, understand the tenancy agreement, confirm payment recipient and obtain written terms/receipts.",
          "13.3 Do not send money solely because a listing appears on Ehani or bears a verification badge. Verification is not a guarantee of ownership, safety, availability or freedom from fraud.",
          "13.4 Students must communicate respectfully, protect personal information, avoid harassment/discrimination and report suspected fraud or unsafe listings.",
          "13.5 Ehani does not direct rent/deposit payments through the Platform and does not receive tenancy payments. Independent payments are between the parties."
        ]} />

        <Clause number="14" title="INDEPENDENT DEALINGS AND TENANCY ARRANGEMENTS" content={[
          "14.1 Viewing, negotiation, reservation, tenancy agreement, rent, deposit, maintenance, eviction, refund or occupancy arrangements are independent dealings between provider and student.",
          "14.2 Ehani is not party to those arrangements and does not control property, recipient, contract, conduct or performance.",
          "14.3 Users should document agreements and seek legal/institutional guidance as needed. Platform moderation is not a court, tribunal, police or regulator."
        ]} />

               <Clause number="15" title="FEES, PAYMENT PROCESSING AND REFUNDS" content={[
          "15.1 Platform fees relate to Ehani services such as verification/renewal and are separate from rent, deposits and utility charges.",
          "15.2 Ehani currently uses KCB Buni APIs for M-Pesa payment processing and a KCB business bank account for settlement, subject to configuration changes.",
          "15.3 Ehani may receive transaction reference, amount, status, timestamp and reconciliation information. Payment credentials should be handled by providers; Ehani should not store full authentication credentials.",
          "15.4 Successful payment does not approve a listing or verification; payment reconciliation and inspection/review are separate processes.",
          "15.5 For failed, duplicate, reversed, disputed or incorrectly credited payments, users should contact support with the transaction reference for a full refund.",
          "15.6 Refund Eligibility for Verification Fees: The verification fee covers the operational cost of the physical inspection and administrative review. Therefore: (a) Full refunds are granted if Ehani cancels the inspection or if the payment fails. (b) The fee is non-refundable if the landlord cancels after an agent has been dispatched, refuses access, or if the property fails the verification checklist. (c) Ehani may, at its sole discretion, issue a refund for cancellations made prior to agent dispatch.",
          "15.7 Ehani does not guarantee provider processing or settlement time and does not control outages, bank delays or mobile-network failures."
        ]} />

        <Clause number="16" title="PROHIBITED CONDUCT AND PLATFORM INTEGRITY" content={[
          "16.1 Prohibited conduct includes fake/copy/unauthorised listings, images or evidence; impersonation; harassment, threats, fraud or unlawful discrimination; scraping or bypassing contact gates; unauthorised access; malware or spam; infringement; resale or unrelated marketing of contact details; bribery or manipulation of agents; and unlawful accommodation or exploitation.",
          "16.2 Ehani may investigate, preserve evidence, remove content, restrict features, suspend/close accounts, notify affected parties or authorities and pursue lawful remedies."
        ]} />

        <Clause number="17" title="INTELLECTUAL PROPERTY AND CONTENT LICENCE" content={[
          "17.1 Platform software, design, branding, text, layout, databases and original materials are owned by or licensed to Ehani, subject to third-party rights.",
          "17.2 Providers retain rights in submitted content and grant Ehani a non-exclusive, worldwide, royalty-free licence for the period reasonably needed to host, reproduce, format, review, display, promote listings, perform verification, secure service and maintain lawful records. The licence narrows/ends after removal except for necessary archives, backups or claims.",
          "17.3 Providers warrant that they have rights and permissions and that content does not infringe privacy, copyright, trademark or other rights.",
          "17.4 Users may not commercially exploit or redistribute Platform content except as permitted by law or written permission."
        ]} />

        <Clause number="18" title="AVAILABILITY, MAINTENANCE AND TECHNICAL LIMITATIONS" content={[
          "18.1 Ehani aims for reliability but does not guarantee uninterrupted or error-free service. Hosting, database, email, payment, network and third-party failures may affect functionality.",
          "18.2 Ehani may conduct maintenance, updates, backups, feature changes or emergency interventions and will communicate material planned interruptions where practicable.",
          "18.3 Users maintain compatible devices, browsers, connectivity and secure credentials. Ehani is not responsible for failures caused by user devices/networks or third parties outside reasonable control."
        ]} />

        <Clause number="19" title="COMPLAINTS, REPORTS AND DISPUTES" content={[
          "19.1 Report inaccurate listings, fraud, unsafe conditions, contact misuse, privacy concerns, discrimination or violations to support@ehani.co.ke.",
          "19.2 Reports should identify listing/account, concern, dates, evidence and safe response channel. Ehani may request details and take interim action.",
          "19.3 Ehani assesses reports reasonably and prioritises urgent safety, fraud, privacy and security issues; it may protect confidential investigations and other persons' data.",
          "19.4 Platform complaints may be raised with support. Independent tenancy disputes remain between parties and may require competent authorities or legal processes."
        ]} />

        <Clause number="20" title="SUSPENSION, TERMINATION AND ACCOUNT CLOSURE" content={[
          "20.1 Ehani may suspend/terminate access for breach, security/legal risk, false information, contact misuse, inspection interference, verification failure or suspected fraud.",
          "20.2 Where appropriate, Ehani may provide notice, reasons and response opportunity. Immediate restriction may protect users, evidence, systems or legal interests.",
          "20.3 Account closure may be requested by email to support@ehani.co.ke from the registered email address. Ehani verifies the requester and disables access. Self-service closure is not currently promised.",
          "20.4 Closure may remove listings, badge and contact visibility. It is not automatic erasure of every record; necessary tax, accounting, security, complaint, legal or evidentiary records may remain.",
          "20.5 Ehani deletes/anonymises unnecessary information. Closure may not immediately remove records from backups or provider systems subject to lawful retention."
        ]} />

        <Clause number="21" title="DISCLAIMERS AND RISK ALLOCATION" content={[
          "21.1 The Platform is an information/discovery service; provider statements are not necessarily independently verified in every respect.",
          "21.2 A badge records completion/approval of a defined Ehani process for a stated period; it is not government certification, title search, professional survey, safety warranty or promise of tenancy performance.",
          "21.3 Ehani does not warrant provider identity, ownership, authority, condition, compliance, availability, price accuracy after publication, suitability, security or user conduct.",
          "21.4 Users make their own decisions and assume due diligence, communication, payment, contract and occupancy responsibility. Non-waivable legal duties remain unaffected.",
          "21.5 External services/links are subject to third-party terms and availability; Ehani does not control those systems."
        ]} />

        <Clause number="22" title="LIABILITY AND INDEMNITY" content={[
          "22.1 Nothing excludes liability for fraud, wilful misconduct, negligence causing death/personal injury, statutory consumer/data rights or liability that Kenyan law prohibits excluding.",
          "22.2 To the extent permitted by law, Ehani is not liable for indirect/consequential loss, lost opportunity, independent tenancy transactions, provider misrepresentation, user misuse of contacts, third-party outages or circumstances outside reasonable control.",
          "22.3 A user responsible for unlawful content, infringement, personal-data misuse or breach may be liable for losses and reasonable costs caused, subject to law; indemnity cannot remove non-waivable rights.",
          "22.4 No provision denies a remedy or protection under mandatory Kenyan law."
        ]} />

        <Clause number="23" title="NOTICES, AMENDMENTS AND GENERAL PROVISIONS" content={[
          "23.1 Operational notices may be delivered through Platform, email or reasonable channels; users should keep email current.",
          "23.2 Material changes will be communicated reasonably and renewed acceptance obtained where required. Versions/effective dates should be recorded and accessible.",
          "23.3 Invalid clauses are severed or adjusted minimally; remaining provisions continue. Non-enforcement is not waiver.",
          "23.4 Users may not transfer accounts without permission. Ehani may transfer operational rights in lawful restructuring subject to data-protection obligations.",
          "23.5 These Terms, Privacy Policy and feature conditions govern Platform use subject to mandatory law."
        ]} />

        <Clause number="24" title="GOVERNING LAW AND CONTACT" content={[
          "24.1 These Terms are governed by Kenyan law; competent Kenyan courts and dispute-resolution bodies may have jurisdiction subject to mandatory rules.",
          "24.2 EHANI HOMES | 1098-60200, Meru, Kenya | support@ehani.co.ke | Website: ehani.co.ke."
        ]} />
      </PartSection>

      {/* PART B - Privacy Policy */}
      <PartSection 
        id="part-b"
        title="PART B — PRIVACY POLICY"
        subtitle="Clauses 25–48"
        icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#007BFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>}
        color="#007BFF"
      >
        <Clause number="25" title="PRIVACY COMMITMENT AND SCOPE" content={[
          "25.1 This Policy explains how EHANI HOMES collects, uses, stores, discloses, protects and disposes of personal data connected with the Platform.",
          "25.2 Ehani seeks lawful, fair, transparent, purpose-limited and proportionate processing, retention only as necessary, and privacy by design/default—including gated provider contacts.",
          "25.3 It applies to students, providers, agents, support correspondents, visitors and other individuals whose data Ehani processes; read it with collection notices and feature explanations."
        ]} />

        <Clause number="26" title="CONTROLLER IDENTITY AND RESPONSIBILITY" content={[
          "26.1 The controller for Platform account, listing, inspection, verification, disclosure and operations is EHANI HOMES, operated by Eugene Larry Ososo, 1098-60200, Meru, Kenya.",
          "26.2 Privacy enquiries, rights requests and complaints: support@ehani.co.ke. Requests may be verified proportionately to protect individuals.",
          "26.3 Service providers may be processors for specified activities or independent controllers for their own legal, payment, security or service purposes."
        ]} />

        <Clause number="27" title="PERSONAL DATA INVENTORY" content={[
          "27.1 Student: Email, verification status, account identifier, timestamps and necessary account/security records; standard signup intends email only.",
          "27.2 Provider: Display name, email, phone, account identifier, verification status, listing relationships and security records.",
          "27.3 Listing: Property name, location, type, rent/deposit, amenities, distance, photos, availability, description, status and provider association; property data may be personal data if it identifies a person.",
          "27.4 Inspection: Appointment, assigned agent, checklist, findings, notes, photos, discrepancy records, decisions, badge period, renewal, suspension and withdrawal history.",
          "27.5 Disclosure: Provider authorisation, authorised fields, listing, conditions, notice version, timestamp, recipient/account event where logged and withdrawal/restriction record.",
          "27.6 Payment: Reference, amount, currency, status, timestamp, fee category, reconciliation, refund/reversal and account/listing association; full credentials should remain with provider.",
          "27.7 Technical/security: Verification/authentication events, logs, IP/network/device/browser information where generated, errors, alerts and session data.",
          "27.8 Support/complaints: Emails, request content, attachments, complaint details, limited identity verification, response and closure records.",
          "27.9 Agents: Agent identity/contact, assignments, permissions, inspection submissions, training acknowledgements and incident reports."
        ]} />

        <Clause number="28" title="PURPOSES AND LAWFUL BASES" content={[
          "28.1 Accounts: Create and secure accounts, verify email, authenticate and provide features; basis may include requested steps/contract, legitimate interests or another lawful basis.",
          "28.2 Listings: Receive, review, display, update and moderate listings; communicate status and maintain integrity.",
          "28.3 Inspection: Assign agents, inspect, assess accuracy, record findings, approve/reject verification, manage 12-month period/renewal and address reports.",
          "28.4 Disclosure: Gate contacts by default and disclose authorised fields only when provider authorisation and conditions are met; retain accountability records.",
          "28.5 Payments: Initiate/reconcile Platform fees, confirm status, resolve failures/disputes, account for receipts and meet legal obligations.",
          "28.6 Security: Detect compromise, fraud, scraping, impersonation, spam, misuse and unauthorised access; investigate and protect systems/users.",
          "28.7 Support/rights: Respond to enquiries, complaints, rights requests and disputes; preserve necessary evidence and document decisions.",
          "28.8 Legal: Comply with legal, regulatory, tax, court, law-enforcement and ODPC requirements subject to lawful process.",
          "28.9 Improvement: Diagnose errors, improve usability/reliability and understand aggregate activity; use anonymised/aggregated information where possible."
        ]} />

        <Clause number="29" title="COLLECTION NOTICES AND TRANSPARENCY" content={[
          "29.1 At or before collection, provide controller identity, purpose, data categories, lawful basis as appropriate, recipients, transfers, rights, security contact, whether provision is required/optional and consequences of non-provision.",
          "29.2 For indirect collection, assess and provide information as required by law subject to exceptions.",
          "29.3 Record notice/consent version, timestamp, account and action where appropriate. Do not use blanket acceptance to justify unrelated optional processing.",
          "29.4 For incompatible new purposes, assess lawful requirements and provide notice or obtain consent where required before processing."
        ]} />

        <Clause number="30" title="ACCOUNT AND AUTHENTICATION PROCESSING" content={[
          "30.1 Email verification confirms control of an inbox and reduces fake/mistyped accounts; tokens should be time-limited and protected.",
          "30.2 Authentication/security records help detect suspicious access, protect accounts, enforce rules and investigate incidents.",
          "30.3 Do not collect student identity documents, university registration numbers, financial profiles or additional details at standard signup without defined feature, lawful basis and notice.",
          "30.4 Users may request correction; limited records may remain after closure for security, legal, accounting or disputes."
        ]} />

        <Clause number="31" title="LISTING AND PROPERTY DATA" content={[
          "31.1 Providers submit listing data directly. Ehani uses it to review/display accommodation, search/filter, manage status, verify and respond to reports.",
          "31.2 Property information may reveal an owner, tenant, caretaker or other identifiable person. Ehani assesses risk and avoids unrelated personal information.",
          "31.3 Public fields are limited to those selected for publication; contacts remain gated unless conditions are met.",
          "31.4 Providers should avoid images/descriptions containing personal data of occupants, neighbours or children without lawful basis and permission."
        ]} />

        <Clause number="32" title="INSPECTION AND FIELD-AGENT PROCESSING" content={[
          "32.1 Agents receive limited information for assigned inspections; access is scoped by task and removed when assignment ends.",
          "32.2 Photos/notes document observable conditions and claims, support review, record decisions and respond to disputes/complaints.",
          "32.3 Agents use approved devices/channels, avoid unnecessary images of people/documents, upload promptly and avoid personal cloud/email/messaging storage unless expressly authorised.",
          "32.4 Ehani may review agent access/submissions; separate agent agreements establish confidentiality and handling duties."
        ]} />

        <Clause number="33" title="VERIFICATION AND CONTACT DISCLOSURE" content={[
          "33.1 Inspection/verification data supports assessment of platform criteria and badge administration.",
          "33.2 Annual fee covers fresh physical inspection, review and contact visibility for approved 12 months; no separate contact fee under current model.",
          "33.3 Expiry, rejection, suspension or withdrawal removes/disables badge and re-gates contacts; compliant listings may remain live.",
          "33.4 Renewal requires payment, fresh physical inspection and approval; payment alone does not restore access.",
          "33.5 Provider authorisation and relevant disclosure events are recorded; contacts are not sold or used for unrelated marketing."
        ]} />

        <Clause number="34" title="PAYMENTS AND FINANCIAL RECORDS" content={[
          "34.1 KCB Buni APIs process M-Pesa Platform fees and KCB business bank account receives settlement, subject to current configuration. Providers/banks may process data under their own duties.",
          "34.2 Ehani receives necessary transaction information and should not retain full payment authentication credentials.",
          "34.3 Financial records may be retained for statutory tax/accounting, reconciliation, fraud and dispute purposes; this does not justify indefinite retention of unrelated profile data."
        ]} />

        <Clause number="35" title="RECIPIENTS AND DATA SHARING" content={[
          "35.1 Recipients may include authorised administrators/support staff; assigned agents; eligible students receiving authorised contact fields; hosting/database/email/payment/security providers; professional advisers; competent authorities where lawful; and parties to lawful restructuring subject to safeguards.",
          "35.2 Ehani does not sell personal data or disclose contacts for unrelated advertising/bulk marketing. New sharing purposes require assessment and transparent notice."
        ]} />

        <Clause number="36" title="PROCESSORS AND SERVICE PROVIDERS" content={[
          "36.1 Current providers: Hosting.com (hosting), Supabase (database/email verification), KCB Buni APIs (M-Pesa), and KCB business banking (settlement).",
          "36.2 Roles vary by activity. Identify processor functions, document instructions, execute written terms where required, assess subprocessors and monitor material changes.",
          "36.3 Contracts/settings should address confidentiality, security, access, incident notification, rights assistance, deletion/return, audit information, subprocessors and transfer safeguards.",
          "36.4 Providers may independently process data for law, fraud prevention, security or payment/banking obligations under their notices."
        ]} />

        <Clause number="37" title="INTERNATIONAL TRANSFERS AND DATA LOCATIONS" content={[
          "37.1 Confirm countries/regions where data is stored, accessed, backed up or processed by providers/subprocessors.",
          "37.2 For transfers outside Kenya, assess and implement required safeguards and legal conditions, including adequacy, contractual, consent or other lawful mechanisms.",
          "37.3 A provider's Kenyan-facing website does not prove Kenyan data storage; do not claim local-only storage without verification.",
          "37.4 Published notices should accurately identify destinations/categories and safeguards consistent with actual arrangements."
        ]} />

        <Clause number="38" title="SECURITY SAFEGUARDS" content={[
          "38.1 Safeguards should include least-privilege roles; separate administrator/agent access; MFA for privileged access where available; secure passwords, API keys and secrets; encryption in transit and appropriate at-rest protection; secure development and updates; monitoring, backup/restore; confidentiality/training; minimisation; and periodic access/provider reviews.",
          "38.2 No internet service is completely secure. Ehani will take reasonable measures against unauthorised access, alteration, loss, disclosure or destruction and respond to risks."
        ]} />

        <Clause number="39" title="DATA BREACHES AND INCIDENT RESPONSE" content={[
          "39.1 A breach may include unauthorised access/disclosure, loss, alteration, destruction, theft, misdirected communication, compromised credentials, exposed files or other incident affecting personal data.",
          "39.2 Agents, staff and processors report suspected incidents immediately to support@ehani.co.ke/designated contact with facts, timing, data, systems and containment.",
          "39.3 Ehani assesses, contains, preserves evidence, identifies affected data/persons, evaluates harm, documents decisions and corrects causes.",
          "39.4 Where statutory threshold applies, notify ODPC without delay and within applicable 72-hour period from awareness; notify affected individuals where required. Processor/agent contracts require prompt reporting.",
          "39.5 Incident records capture facts, impact, remediation, notification decisions, communications and lessons. Not every technical event is automatically a reportable personal-data breach."
        ]} />

        <Clause number="40" title="RETENTION AND DISPOSAL" content={[
          "40.1 Retain data only as reasonably necessary for purpose, legal obligations, security, accounting, complaints, disputes or claims.",
          "40.2 A separate schedule sets categories, triggers, periods, disposal methods and holds; review periodically and when processing changes.",
          "40.3 At purpose expiry delete, erase, anonymise or pseudonymise unless lawful retention applies. Pseudonymised data remains personal data where re-identification is possible.",
          "40.4 Review inactive accounts after 12 months; this is a review trigger, not automatic deletion. Consider listings, verification, transactions, complaints, security and holds.",
          "40.5 Proposed internal target: delete/anonymise unnecessary personal data within 30 days of verified closure, subject to legal retention, backup cycles and justified exceptions. It is not a universal statutory deadline.",
          "40.6 Inspection records: during verification and proposed 24 months after expiry/withdrawal/replacement where needed. Relevant tax/accounting records may require generally at least five years; do not apply that period indiscriminately to all personal data.",
          "40.7 Backups may retain deleted data until rolling expiry. Restrict access and document provider cycles. Legal holds pause deletion only for relevant records and are reviewed periodically."
        ]} />

        <Clause number="41" title="DATA SUBJECT RIGHTS" content={[
          "41.1 Right to be informed about use of personal data.",
          "41.2 Right to access personal data held about the individual.",
          "41.3 Right to correction of inaccurate, false or misleading data.",
          "41.4 Right to deletion where legal conditions apply; not absolute where lawful retention/claims apply.",
          "41.5 Right to object in circumstances provided by law, including qualifying legitimate-interest processing.",
          "41.6 Right to restriction where applicable, such as while accuracy or objection is assessed.",
          "41.7 Right to portability of qualifying data in structured, commonly used, machine-readable format and direct transmission where technically possible and applicable.",
          "41.8 Right to withdraw consent where consent is the basis; withdrawal does not invalidate prior lawful processing.",
          "41.9 Right to complain to Ehani and/or ODPC where rights are believed infringed."
        ]} />

        <Clause number="42" title="RIGHTS-REQUEST PROCEDURE" content={[
          "42.1 Send requests to support@ehani.co.ke from registered email where possible or another reasonable channel. Ehani may proportionately verify identity/authority; do not send passwords or unnecessary documents.",
          "42.2 Register request date/type, verification, systems searched, owner, decision, response, extension/refusal reason and closure.",
          "42.3 Respond within applicable statutory period. General Regulations commonly provide 7 days for access, 14 days for rectification/erasure/objection/restriction and 30 days for portability.",
          "42.4 For refusal/limitation, explain reasons as legally permitted and relevant complaint/review route.",
          "42.5 Protect other persons' data, privileged/security-sensitive information and lawful exceptions; consider redaction or partial response."
        ]} />

        <Clause number="43" title="COOKIES AND SIMILAR TECHNOLOGIES" content={[
          "43.1 Essential cookies/similar technologies may support sessions, authentication, security, preferences and functionality.",
          "43.2 Non-essential analytics, advertising or tracking should not be deployed without notice and consent where required; maintain a live cookie inventory.",
          "43.3 Browser controls may manage cookies; disabling essential cookies may affect login/functionality."
        ]} />

        <Clause number="44" title="COMMUNICATIONS AND MARKETING" content={[
          "44.1 Necessary communications include verification, security, listing decisions, renewal reminders, payment confirmations, support and policy changes.",
          "44.2 Marketing is separate; obtain consent or another lawful basis where required, provide opt-out and honour objections.",
          "44.3 Disclosed landlord contacts are not used for unrelated marketing or sold to third parties."
        ]} />

        <Clause number="45" title="CHILDREN AND AGE RESTRICTION" content={[
          "45.1 Accounts are intended for adults 18+. Ehani does not knowingly invite children to register.",
          "45.2 If data is found collected contrary to age rules, Ehani assesses and takes protective, deletion or other lawful action.",
          "45.3 Age restriction does not remove legal obligations for incidental child data or a future child-facing service."
        ]} />

        <Clause number="46" title="AUTOMATED DECISIONS AND MODERATION" content={[
          "46.1 Technical rules may support email verification, access gating, expiry calculations, listing status, fraud detection and alerts.",
          "46.2 Verification decisions are intended to involve administrative review of inspection findings; do not describe purely automated decisions as human review.",
          "46.3 For solely automated decisions with legal or similarly significant effects, assess applicable safeguards, information, review or contest rights."
        ]} />

        <Clause number="47" title="PRIVACY COMPLAINTS AND REGULATORY ESCALATION" content={[
          "47.1 Privacy complaints and rights requests go to support@ehani.co.ke. Ehani investigates and responds within applicable periods and records outcomes.",
          "47.2 Individuals may also complain to ODPC. Ehani cooperates with lawful inquiries and preserves relevant records.",
          "47.3 A complaint does not automatically require disclosure of another person's information or suspension of all processing; assess and act proportionately."
        ]} />

        <Clause number="48" title="POLICY UPDATES AND CONTACT" content={[
          "48.1 Revise this Policy when practices, features, providers or law change. Communicate material changes reasonably and obtain new notice/consent where required.",
          "48.2 Published version should show effective date and maintain prior versions where useful for accountability.",
          "48.3 EHANI HOMES | support@ehani.co.ke | 1098-60200, Meru, Kenya | Website: ehani.co.ke."
        ]} />
      </PartSection>

      {/* 🆕 PART C - Cookie Policy */}
      <PartSection 
        id="part-c"
        title="PART C — COOKIE POLICY"
        subtitle="Clauses 49–59"
        icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#9C27B0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>}
        color="#9C27B0"
      >
        <Clause number="49" title="INTRODUCTION" content={[
          "49.1 This Cookie Policy explains how EHANI HOMES (“Ehani Homes”, “we”, “us” or “our”) uses cookies and similar technologies when you visit https://ehani.co.ke, use our accommodation marketplace, or interact with related website features.",
          "49.2 It explains what these technologies are, why they may be used, and how you can manage your choices.",
          "49.3 This Policy should be read together with the EHANI HOMES Privacy Policy and Terms of Service. If a cookie or similar technology processes information relating to an identified or identifiable person, the processing is also governed by applicable data-protection requirements."
        ]} />

        <Clause number="50" title="WHO OPERATES EHANI HOMES?" content={[
          "50.1 EHANI HOMES is a registered business name operated by Eugene Larry Ososo, of 1098-60200, Meru, Kenya. The registered business name is not, by itself, a separate legal person.",
          "50.2 Privacy and cookie enquiries: support@ehani.co.ke"
        ]} />

        <Clause number="51" title="WHAT ARE COOKIES AND SIMILAR TECHNOLOGIES?" content={[
          "51.1 Cookies are small text files that a website may place on your browser or device. They can help a website remember a session, maintain security, recognise preferences or understand how its pages are used.",
          "51.2 A cookie may be set by the website you visit (a first-party cookie) or by another service whose technology is embedded in the website (a third-party cookie).",
          "51.3 “Similar technologies” may include browser local storage or session storage, pixels, tags, scripts, software development kits (SDKs), and other technologies that store information on, or access information from, your device. This Policy uses “cookies” as a convenient umbrella term unless a distinction is necessary."
        ]} />

        <Clause number="52" title="WHY WE MAY USE COOKIES" content={[
          "52.1 Strictly necessary / essential technologies: These support functions needed for the website or a service you request—for example, maintaining a secure login session, protecting account access, routing requests, preventing abuse, or remembering a security-related state. They are not intended to be used for unrelated advertising.",
          "52.2 Preferences and functionality: These may remember choices that improve usability, such as a display preference or a setting you have selected. We will use them only where they are deployed and appropriately disclosed.",
          "52.3 Analytics and performance: If enabled, analytics technologies may help us understand aggregate or individual interaction patterns, such as pages visited, navigation errors, performance and the effectiveness of improvements. They must not be activated before the applicable consent or other lawful requirements are satisfied.",
          "52.4 Advertising, targeting or social-media technologies: EHANI HOMES does not describe advertising or cross-site tracking cookies as active merely because such technologies are common online. If we introduce them, this Policy and the consent interface will be updated before deployment, and appropriate choices will be provided."
        ]} />

        <Clause number="53" title="COOKIE CATEGORIES AND USER CHOICES" content={[
          "53.1 The live website presents a clear cookie preference mechanism where optional technologies are used. The categories below describe the intended choice structure.",
          "53.2 Essential: Security, authentication, session continuity and core site operation. (Always active where strictly necessary; explained to users).",
          "53.3 Preferences: Remember user-selected settings. (Optional where not strictly necessary; user choice).",
          "53.4 Analytics: Measure use and improve performance. (Off by default until valid consent where required).",
          "53.5 Marketing / targeting: Advertising, profiling or cross-site tracking, if ever deployed. (Off by default until valid consent; not currently asserted as active)."
        ]} />

        <Clause number="54" title="CONSENT AND PREFERENCE MANAGEMENT" content={[
          "54.1 Where consent is required, EHANI HOMES will seek it before placing or using non-essential cookies or similar technologies. A consent request should be clear, specific, informed and freely given.",
          "54.2 Users should be able to accept or reject optional categories with comparable ease, and change or withdraw their choices later through a clearly labelled “Cookie settings” or equivalent control.",
          "54.3 Withdrawal should take effect for future use and should not affect the lawfulness of processing before withdrawal.",
          "54.4 We will retain a proportionate record of consent choices where needed to demonstrate compliance.",
          "54.5 Browser settings can also be used to block or delete cookies. Blocking essential cookies may prevent login, security functions or other parts of the platform from working correctly."
        ]} />

        <Clause number="55" title="COOKIES AND EHANI HOMES ACCOUNT FEATURES" content={[
          "55.1 EHANI HOMES provides account registration, email verification and login features. The website and its authentication services may use session or security-related storage to maintain authentication state, protect sessions and support requested account functions.",
          "55.2 A cookie or storage item does not itself verify a property, approve a listing, or determine whether a landlord is entitled to contact visibility. Those processes are governed by platform rules and administrative review."
        ]} />

        <Clause number="56" title="THIRD-PARTY SERVICES" content={[
          "56.1 Some website functions may rely on third-party service providers. EHANI HOMES currently uses Supabase for database and email-verification functionality and Hosting.com for hosting; payment functionality is being integrated through KCB BUNI APIs.",
          "56.2 These providers may process technical information necessary to deliver their services. We will identify third-party technologies that actually set or access cookies or similar identifiers, explain their purposes, and provide links to relevant provider information where appropriate."
        ]} />

        <Clause number="57" title="PERSONAL DATA, SECURITY AND RETENTION" content={[
          "57.1 Cookie identifiers, device information, IP addresses, online activity or other technical information may constitute personal data when they relate to an identifiable person.",
          "57.2 Where applicable, EHANI HOMES processes such information consistently with the Kenya Data Protection Act, 2019, applicable regulations, our Privacy Policy and relevant ODPC guidance.",
          "57.3 We use appropriate technical and organisational safeguards for information processed through the website. Cookie and related data are retained only for the period reasonably necessary for their stated purpose."
        ]} />

        <Clause number="58" title="YOUR RIGHTS AND HOW TO CONTACT US" content={[
          "58.1 Depending on the circumstances and applicable law, you may have rights concerning personal data processed through cookies or similar technologies, including rights to be informed, access, correction, deletion, objection, restriction or withdrawal of consent.",
          "58.2 To ask a question, make a request or raise a concern about cookies, contact: EHANI HOMES | Email: support@ehani.co.ke | Address: 1098-60200, Meru, Kenya.",
          "58.3 You may also raise a data-protection concern with the Office of the Data Protection Commissioner of Kenya. Contacting EHANI HOMES first is not a condition for exercising a right or making a complaint to the ODPC."
        ]} />

        <Clause number="59" title="CHANGES TO THIS COOKIE POLICY" content={[
          "59.1 We may update this Policy when our website, technologies, legal obligations or processing practices change.",
          "59.2 The “Last updated” date at the beginning will show when the latest version was issued. Material changes will be communicated through the website or another appropriate channel."
        ]} />
      </PartSection>

      {/* Annexes */}
      <AnnexSection 
        id="annex-1"
        number="ANNEX 1"
        title="VERIFICATION LIFECYCLE"
        color="#4CAF50"
      >
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
          <thead>
            <tr style={{ background: '#F0FDF4', borderBottom: '2px solid #4CAF50' }}>
              <th style={{ padding: '12px', textAlign: 'left', color: '#1C1209', fontWeight: '600' }}>Stage</th>
              <th style={{ padding: '12px', textAlign: 'left', color: '#1C1209', fontWeight: '600' }}>Badge</th>
              <th style={{ padding: '12px', textAlign: 'left', color: '#1C1209', fontWeight: '600' }}>Contact/Listing</th>
            </tr>
          </thead>
          <tbody>
            <AnnexRow stage="New/unverified" badge="Off" contact="Contacts gated; listing may be live" />
            <AnnexRow stage="Inspection pending" badge="Off" contact="Contacts gated" />
            <AnnexRow stage="Approved" badge="On for 12 months" contact="Authorised contacts enabled" />
            <AnnexRow stage="Approaching expiry" badge="On until expiry" contact="Enabled while valid" />
            <AnnexRow stage="Expired" badge="Off" contact="Contacts gated; listing may remain live" />
            <AnnexRow stage="Fee paid, inspection pending" badge="Off" contact="Contacts gated" />
            <AnnexRow stage="Inspection rejected" badge="Off" contact="Contacts gated" />
            <AnnexRow stage="Fresh inspection approved" badge="Restored 12 months" contact="Contacts restored subject to authorisation" />
          </tbody>
        </table>
      </AnnexSection>

      <AnnexSection 
        id="annex-2"
        number="ANNEX 2"
        title="CONTACT DISCLOSURE PRINCIPLES"
        color="#FF9800"
      >
        <ul style={{ paddingLeft: '20px', lineHeight: '2', fontSize: '15px', color: '#4B5563', margin: 0 }}>
          <li>Contacts gated by default.</li>
          <li>Disclose only specifically authorised fields.</li>
          <li>Keep authorisation and notice-version evidence.</li>
          <li>Apply verification/access conditions before release.</li>
          <li>Log disclosure events where technically feasible.</li>
          <li>Provide withdrawal/correction route.</li>
          <li>Prohibit scraping, resale, bulk use and unrelated marketing.</li>
          <li>Re-gate automatically on expiry, suspension or withdrawal.</li>
        </ul>
      </AnnexSection>

      <AnnexSection 
        id="annex-3"
        number="ANNEX 3"
        title="PRIVACY REQUEST ROUTE"
        color="#9C27B0"
      >
        <div style={{ background: '#F3E5F5', padding: '24px', borderRadius: '8px', borderLeft: '4px solid #9C27B0' }}>
          <p style={{ margin: 0, fontSize: '15px', color: '#4B5563', lineHeight: '1.7' }}>
            Email <a href="mailto:support@ehani.co.ke" style={{ color: '#9C27B0', fontWeight: '600', textDecoration: 'none' }}>support@ehani.co.ke</a> with subject <strong>"Privacy Request"</strong> or <strong>"Account Closure"</strong>. Include registered email, request type and enough detail to identify data/account. Do not send passwords or unnecessary identity documents. Ehani may request proportionate verification.
          </p>
        </div>
      </AnnexSection>

      <AnnexSection 
        id="annex-4"
        number="ANNEX 4"
        title="GLOSSARY"
        color="#607D8B"
      >
        <GlossaryTerm term="Anonymisation" definition="Irreversibly transforming data so an individual is no longer identifiable using reasonably available means." />
        <GlossaryTerm term="Controller" definition="Person/entity determining purposes and means of personal-data processing." />
        <GlossaryTerm term="Processor" definition="Person/entity processing personal data on behalf of a controller under instructions." />
        <GlossaryTerm term="Data subject" definition="Identified or identifiable natural person to whom data relates." />
        <GlossaryTerm term="Disclosure" definition="Making personal data available to another person, including displaying gated contact fields." />
        <GlossaryTerm term="Legal hold" definition="Documented pause in deletion for legal, regulatory, dispute, security or evidentiary purpose." />
        <GlossaryTerm term="Personal data" definition="Information relating to an identified or identifiable natural person." />
        <GlossaryTerm term="Pseudonymisation" definition="Processing preventing attribution without separately held information; may remain personal data." />
        <GlossaryTerm term="Verification" definition="Ehani's defined inspection/review approval for a stated period, subject to suspension/withdrawal." />
      </AnnexSection>

      {/* Contact Section */}
      <div style={{ background: 'linear-gradient(135deg, #FDF8F3 0%, #FFFFFF 100%)', padding: '48px', borderRadius: '16px', border: '2px solid #F0EAE3', textAlign: 'center', marginTop: '60px' }}>
        <h3 style={{ fontSize: '24px', fontWeight: '700', color: '#1C1209', marginBottom: '16px' }}>Questions or Legal Concerns?</h3>
        <p style={{ fontSize: '15px', color: '#6B5B4E', marginBottom: '32px', lineHeight: '1.6', maxWidth: '600px', margin: '0 auto 32px' }}>
          If you have any questions regarding these terms, our privacy practices, or wish to exercise your data rights, please contact our legal and support team.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
          <a href="mailto:support@ehani.co.ke" style={{ color: '#1C1209', fontWeight: '600', fontSize: '14px', textDecoration: 'none', background: 'white', padding: '12px 24px', borderRadius: '8px', border: '2px solid #E5E7EB', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#D4873A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
            support@ehani.co.ke
          </a>
          <a href="tel:+254710236242" style={{ color: '#1C1209', fontWeight: '600', fontSize: '14px', textDecoration: 'none', background: 'white', padding: '12px 24px', borderRadius: '8px', border: '2px solid #E5E7EB', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#D4873A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
            +254 710 236 242
          </a>
        </div>
      </div>

      {/* Footer */}
      <div style={{ marginTop: '60px', textAlign: 'center', padding: '32px', borderTop: '1px solid #F0EAE3' }}>
        <p style={{ color: '#999', fontSize: '13px', marginBottom: '8px' }}>
          © {new Date().getFullYear()} EHANI HOMES. All rights reserved.
        </p>
        <p style={{ color: '#999', fontSize: '12px' }}>
          1098-60200, Meru, Kenya | SEARCH. SETTLE. STUDY.
        </p>
      </div>
    </div>
  )
}

// Helper Components

function TOCItem({ number, title, range, color }: { number: string, title: string, range: string, color: string }) {
  return (
    <div style={{ padding: '12px', background: 'white', borderRadius: '8px', border: `1px solid ${color}33` }}>
      <div style={{ fontSize: '11px', fontWeight: '700', color, marginBottom: '4px', letterSpacing: '0.5px' }}>{number}</div>
      <div style={{ fontSize: '14px', fontWeight: '600', color: '#1C1209', marginBottom: '2px' }}>{title}</div>
      {range && <div style={{ fontSize: '12px', color: '#999' }}>{range}</div>}
    </div>
  )
}

function PartSection({ id, title, subtitle, icon, color, children }: { id: string, title: string, subtitle: string, icon: React.ReactNode, color: string, children: React.ReactNode }) {
  return (
    <div id={id} style={{ marginBottom: '64px', scrollMarginTop: '20px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px', paddingBottom: '16px', borderBottom: `3px solid ${color}` }}>
        <div style={{ width: '48px', height: '48px', background: `${color}15`, borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {icon}
        </div>
        <div>
          <h2 style={{ fontSize: '26px', fontWeight: '800', color: '#1C1209', margin: 0 }}>{title}</h2>
          <p style={{ fontSize: '14px', color: '#6B5B4E', margin: '4px 0 0 0' }}>{subtitle}</p>
        </div>
      </div>
      <div style={{ paddingLeft: '64px' }}>
        {children}
      </div>
    </div>
  )
}

function Clause({ number, title, content }: { number: string, title: string, content: string[] }) {
  return (
    <div style={{ marginBottom: '32px' }}>
      <h3 style={{ fontSize: '17px', fontWeight: '700', color: '#1C1209', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <span style={{ background: '#F0EAE3', color: '#D4873A', padding: '4px 12px', borderRadius: '6px', fontSize: '13px', fontWeight: '700' }}>{number}</span>
        {title}
      </h3>
      <div style={{ paddingLeft: '48px' }}>
        {content.map((paragraph, idx) => (
          <p key={idx} style={{ fontSize: '14px', color: '#4B5563', lineHeight: '1.8', margin: '0 0 12px 0' }}>
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  )
}

function AnnexSection({ id, number, title, color, children }: { id: string, number: string, title: string, color: string, children: React.ReactNode }) {
  return (
    <div id={id} style={{ marginBottom: '48px', scrollMarginTop: '20px', background: '#F9FAFB', padding: '32px', borderRadius: '12px', border: `2px solid ${color}33` }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
        <div style={{ fontSize: '11px', fontWeight: '800', color, background: `${color}15`, padding: '6px 12px', borderRadius: '6px' }}>{number}</div>
        <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#1C1209', margin: 0 }}>{title}</h3>
      </div>
      {children}
    </div>
  )
}

function AnnexRow({ stage, badge, contact }: { stage: string, badge: string, contact: string }) {
  return (
    <tr style={{ borderBottom: '1px solid #E5E7EB' }}>
      <td style={{ padding: '12px', color: '#1C1209', fontWeight: '500' }}>{stage}</td>
      <td style={{ padding: '12px', color: '#4B5563' }}>{badge}</td>
      <td style={{ padding: '12px', color: '#4B5563' }}>{contact}</td>
    </tr>
  )
}

function GlossaryTerm({ term, definition }: { term: string, definition: string }) {
  return (
    <div style={{ marginBottom: '16px', paddingBottom: '16px', borderBottom: '1px solid #E5E7EB' }}>
      <div style={{ fontSize: '15px', fontWeight: '700', color: '#1C1209', marginBottom: '6px' }}>{term}</div>
      <div style={{ fontSize: '14px', color: '#4B5563', lineHeight: '1.6' }}>{definition}</div>
    </div>
  )
}
