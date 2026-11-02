import Link from 'next/link'

export default function TermsPage() {
  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '60px 20px', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif', color: '#1C1209', background: '#FFFFFF' }}>
      
      {/* Navigation */}
      <div style={{ marginBottom: '60px' }}>
        <Link href="/" style={{ color: '#6B5B4E', textDecoration: 'none', fontSize: '14px', fontWeight: '500', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
          Back to Home
        </Link>
      </div>

      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '60px' }}>
        <h1 style={{ fontSize: '40px', fontWeight: '800', color: '#1C1209', marginBottom: '16px', letterSpacing: '-1px' }}>
          Terms of Service & Privacy Policy
        </h1>
        <p style={{ fontSize: '16px', color: '#6B5B4E', maxWidth: '600px', margin: '0 auto', lineHeight: '1.6' }}>
          Last updated: {new Date().toLocaleDateString()}. By accessing or using the Ehani Homes platform, you agree to be bound by the following comprehensive terms and policies.
        </p>
      </div>

      {/* Table of Contents */}
      <div style={{ background: '#FDF8F3', padding: '32px', borderRadius: '16px', border: '1px solid #F0EAE3', marginBottom: '60px' }}>
        <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#1C1209', marginBottom: '20px', marginTop: 0 }}>Contents</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px', fontSize: '14px' }}>
          <div>
            <strong style={{ color: '#D4873A', display: 'block', marginBottom: '8px' }}>PART A — TERMS OF SERVICE</strong>
            <ul style={{ margin: 0, paddingLeft: '20px', color: '#4B5563', lineHeight: '1.8' }}>
              <li><a href="#part-a" style={{ color: '#4B5563', textDecoration: 'none' }}>Clauses 1–24</a></li>
            </ul>
          </div>
          <div>
            <strong style={{ color: '#D4873A', display: 'block', marginBottom: '8px' }}>PART B — PRIVACY POLICY</strong>
            <ul style={{ margin: 0, paddingLeft: '20px', color: '#4B5563', lineHeight: '1.8' }}>
              <li><a href="#part-b" style={{ color: '#4B5563', textDecoration: 'none' }}>Clauses 25–48</a></li>
            </ul>
          </div>
          <div>
            <strong style={{ color: '#D4873A', display: 'block', marginBottom: '8px' }}>ANNEXES</strong>
            <ul style={{ margin: 0, paddingLeft: '20px', color: '#4B5563', lineHeight: '1.8' }}>
              <li><a href="#annex-1" style={{ color: '#4B5563', textDecoration: 'none' }}>Annex 1: Verification Lifecycle</a></li>
              <li><a href="#annex-2" style={{ color: '#4B5563', textDecoration: 'none' }}>Annex 2: Contact Disclosure Principles</a></li>
              <li><a href="#annex-3" style={{ color: '#4B5563', textDecoration: 'none' }}>Annex 3: Privacy Request Route</a></li>
              <li><a href="#annex-4" style={{ color: '#4B5563', textDecoration: 'none' }}>Annex 4: Glossary</a></li>
            </ul>
          </div>
        </div>
      </div>

      {/* PART A */}
      <div id="part-a" style={{ marginBottom: '80px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
          <div style={{ width: '40px', height: '40px', background: '#FDF8F3', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#D4873A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
          </div>
          <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#1C1209', margin: 0 }}>PART A — TERMS OF SERVICE</h2>
        </div>

        <div style={{ paddingLeft: '52px' }}>
          <Clause number="1" title="INTRODUCTION AND ACCEPTANCE">
            <p>1.1 These Terms govern access to and use of the EHANI HOMES website, marketplace, account features, listing tools, property-verification features and related services (“Platform”).</p>
            <p>1.2 EHANI HOMES (“Ehani”, “we”, “us”) operates under the identity SEARCH. SETTLE. STUDY. These Terms apply to students, accommodation providers, visitors and other Platform users.</p>
            <p>1.3 By registering, submitting a listing, accessing gated contact details, paying a Platform fee or using a feature requiring acceptance, you agree to these Terms. If you do not agree, do not use the relevant feature.</p>
            <p>1.4 These Terms operate with the Privacy Policy, displayed fee schedules, verification instructions and feature-specific conditions. The Privacy Policy explains personal-data processing and does not replace these Terms.</p>
          </Clause>

          <Clause number="2" title="LEGAL IDENTITY AND PLATFORM ROLE">
            <p>2.1 EHANI HOMES is a registered business name operated by Eugene Larry Ososo, of 1098-60200, Meru, Kenya. Hereinafter referred to as “Ehani”, “we”, “us” or “our”.</p>
            <p>2.2 Ehani operates a digital accommodation-discovery marketplace. Providers submit listings; students discover listings and may access authorised contact information when applicable conditions are met.</p>
            <p>2.3 Ehani is not the owner of every advertised property, a tenancy party, property manager, letting agent, rent/deposit intermediary, guarantor, conveyancing service or government inspection authority.</p>
            <p>2.4 Ehani does not receive or hold rent or tenancy deposits, negotiate tenancy terms, execute tenancy agreements, guarantee accommodation or arrange meetings between students and providers. Users communicate, inspect, negotiate and contract independently.</p>
          </Clause>

          <Clause number="3" title="DEFINITIONS AND INTERPRETATION">
            <p>3.1 “Account” means a registered user profile and related authentication records. “Provider/Landlord” means a person authorised to advertise accommodation. “Listing” means property information, photographs, prices, amenities, location and availability submitted for display.</p>
            <p>3.2 “Contact Details” means provider phone, email or other fields designated as gated. “Verification” means Ehani’s time-limited inspection, review and approval—not a government certification, title search or guarantee.</p>
            <p>3.3 “Verified Period” means 12 months from approval unless verification is earlier suspended, withdrawn or invalidated. “Student” means an eligible adult using the Platform to discover accommodation; enrolment is not independently verified unless a feature expressly says so.</p>
            <p>3.4 “Personal Data” and “Applicable Law” have the meanings assigned by Kenyan data-protection law. Headings aid navigation; “including” is not limiting; singular includes plural where context permits; legal references include amendments and replacement legislation.</p>
          </Clause>

          <Clause number="4" title="SCOPE AND NATURE OF THE MARKETPLACE">
            <p>4.1 The Platform organises and presents accommodation information and may provide search, filtering, listing submission, administrative review, verification indicators and controlled contact disclosure.</p>
            <p>4.2 Listings are supplied by providers and may change. Publication does not confirm ownership, authority, legal compliance, availability, price accuracy, property condition, safety, suitability or future performance.</p>
            <p>4.3 The Platform is not a substitute for independent property inspection, identity checks, written tenancy agreements, legal advice, institutional guidance or due diligence.</p>
            <p>4.4 Ehani may introduce, modify, limit or discontinue features, subject to law and applicable contractual obligations.</p>
          </Clause>

          <Clause number="5" title="ELIGIBILITY AND USER CATEGORIES">
            <p>5.1 Accounts are intended for persons aged 18 or older. A person under 18 must not create an account. Ehani may restrict an account where age requirements appear unmet.</p>
            <p>5.2 Students use the Platform to discover accommodation and access gated contacts where conditions apply. Providers submit and manage listings, verification requests and contact information.</p>
            <p>5.3 A user representing an organisation must have authority to do so and must not misrepresent that authority.</p>
          </Clause>

          <Clause number="6" title="REGISTRATION AND ACCOUNT SECURITY">
            <p>6.1 Students ordinarily register using email and verify it. Standard student signup is intended to collect email only. Providers ordinarily submit display/account name, email and phone and verify email.</p>
            <p>6.2 A display name need not be a legal name but must not impersonate or deceive. Users must provide accurate information, maintain a valid email and update material account details.</p>
            <p>6.3 Email verification confirms control of an inbox at that time; it does not establish identity, ownership, student status, solvency or trustworthiness.</p>
            <p>6.4 Users must protect passwords, verification links and devices, avoid account sharing and notify Ehani promptly of suspected compromise. Ehani may request proportionate additional checks for security, fraud or legal compliance.</p>
          </Clause>

          <Clause number="7" title="LANDLORD/PROVIDER OBLIGATIONS">
            <ul style={{ margin: 0, paddingLeft: '20px', lineHeight: '1.8' }}>
              <li>7.1 Providers must own, manage, represent or otherwise be lawfully entitled to advertise the property and demonstrate authority when reasonably requested.</li>
              <li>7.2 Providers are responsible for accurate and current rent, deposit, location, accommodation type, amenities, distance, availability, descriptions and photographs.</li>
              <li>7.3 Material changes to price, availability, condition, authority or other listing facts must be updated promptly. Providers must not leave materially misleading listings live.</li>
              <li>7.4 Providers must not unlawfully discriminate, conceal material defects, fabricate credentials, misrepresent properties or advertise accommodation they cannot lawfully offer.</li>
              <li>7.5 Providers must cooperate with inspection arrangements, provide safe lawful access with consent and answer verification questions truthfully.</li>
              <li>7.6 Providers must not manipulate verification, bribe/threaten agents, submit fabricated evidence or portray expired/suspended verification as current.</li>
              <li>7.7 Providers must communicate responsibly, must not harass or misuse student information and must respect law and platform rules.</li>
              <li>7.8 Providers remain responsible for licences, permits, tenancy documents, safety, management, taxes and legal compliance. Platform publication does not transfer those duties to Ehani.</li>
            </ul>
          </Clause>

          <Clause number="8" title="LISTING CONTENT AND STANDARDS">
            <p>8.1 Listings may include property name, location, accommodation type, rent, deposit, amenities, distance to institution, photographs, availability and required form fields.</p>
            <p>8.2 Descriptions must be truthful, clear and not materially misleading. Price and deposit should state amount and currency. Claims such as “near campus”, “secure”, “furnished” or “available” require a reasonable factual basis.</p>
            <p>8.3 Photographs must relate to the property and not materially misrepresent size, condition, amenities or surroundings. Providers must hold rights and permissions to upload them.</p>
            <p>8.4 Avoid photographs containing identifiable people, children, identity documents, private correspondence or unrelated personal spaces unless necessary, lawful and authorised.</p>
            <p>8.5 Ehani may establish formatting, image-quality, location, completeness and safety rules. Non-compliant submissions may be returned, rejected, hidden or removed.</p>
            <p>8.6 A listing is not an offer by Ehani to enter a tenancy; availability and terms must be confirmed directly with the provider.</p>
          </Clause>

          <Clause number="9" title="REVIEW, MODERATION AND PUBLICATION">
            <p>9.1 Ehani may review submissions before publication and later conduct checks for completeness, consistency, duplication, image quality, verification status and risk.</p>
            <p>9.2 Ehani may approve, reject, request clarification, edit formatting, restrict, suspend or remove a listing that is incomplete, misleading, unlawful, duplicated, unsafe, unsupported or reported.</p>
            <p>9.3 Administrative approval is a platform decision, not legal certification or guarantee. An unverified listing must not be represented as verified.</p>
            <p>9.4 Ehani may temporarily restrict a listing during a fraud, safety, verification, legal or complaint investigation. Where practicable, a provider may be given reasons and an opportunity to respond unless that would compromise safety, evidence or law.</p>
            <p>9.5 Restricted moderation records may be retained for accountability, security, complaints or legal purposes under the retention schedule.</p>
          </Clause>

          <Clause number="10" title="INSPECTION AND VERIFICATION FRAMEWORK">
            <p>10.1 Assigned field agents inspect specified observable aspects of a property and compare findings with listing information.</p>
            <p>10.2 Inspection may cover location, visible accommodation features, amenities, photographs, material claims and checklist items. Scope may be limited by access, safety, consent or circumstances.</p>
            <p>10.3 Providers must secure lawful access and consent. Agents must not trespass, force entry or photograph unrelated personal material.</p>
            <p>10.4 Agents submit findings for administrative review. Ehani administration—not payment alone—decides approval, rejection, suspension or withdrawal.</p>
            <p>10.5 Inspection does not establish title, beneficial ownership, planning approval, structural integrity, fire compliance, utility reliability, neighbourhood safety or absence of hidden defects. It is not a professional survey or government inspection.</p>
            <p>10.6 Ehani may correct records, conduct follow-up inspection or withdraw a decision where material error, fraud, changed conditions or new evidence is identified.</p>
          </Clause>

          <Clause number="11" title="VERIFICATION FEE, VALIDITY AND RENEWAL">
            <p>11.1 The annual verification fee covers one package: fresh physical inspection, verification assessment/review and contact visibility for the approved 12-month period. No separate contact-visibility fee applies under the current model.</p>
            <p>11.2 Payment does not itself grant verification. Required inspection and administrative approval must be completed.</p>
            <p>11.3 The Verified Period is 12 months from approval unless earlier suspended or withdrawn. Expiry is not automatically extended by payment or a pending request.</p>
            <p>11.4 Renewal is not automatic. It requires applicable renewal payment, fresh physical inspection and new approval. Ehani may approve or reject based on findings, accuracy, cooperation, complaints or reasonable platform grounds.</p>
            <p>11.5 While inspection/review is pending, badge and contact access remain disabled unless Ehani expressly records otherwise.</p>
            <p>11.6 On expiry, rejection, suspension or withdrawal, the badge is removed/disabled and contacts return to gated status. A listing may remain published if ordinary rules are met, without implying current verification.</p>
            <p>11.7 Approval of a fresh inspection restores badge/contact access for a new 12-month period from the new approval date.</p>
            <p>11.8 Ehani may suspend or withdraw verification before expiry for discrepancies, fraud, safety concerns, non-cooperation or other reasonable grounds; notice and opportunity to respond may be provided where practicable.</p>
            <p>11.9 Fees, taxes and instructions must be displayed before payment. Fee changes apply prospectively and do not silently alter an already-paid period.</p>
          </Clause>

          <Clause number="12" title="CONTACT GATING AND DISCLOSURE">
            <p>12.1 Provider contacts are gated by default. Ehani controls whether specified fields are visible and may apply authorisation, account, listing, verification, security or other access conditions.</p>
            <p>12.2 Authorisation must identify provider, listing, exact fields, conditions/period, notice version and date/time. Ehani should retain evidence of authorisation and relevant disclosure events.</p>
            <p>12.3 When enabled, only authorised fields may be disclosed to eligible users. Disclosure may be logged with timestamp and relevant account/listing identifiers.</p>
            <p>12.4 Contact access does not guarantee provider response, property availability or tenancy.</p>
            <p>12.5 Providers may request withdrawal/restriction through support@ehani.co.ke. Ehani verifies the requester and restricts future disclosures where appropriate; it cannot retract information already lawfully disclosed or erase recipients’ memory.</p>
            <p>12.6 Contacts must not be scraped, bulk-exported, sold, reposted or used for unrelated marketing. Ehani may restrict accounts and investigate misuse.</p>
          </Clause>

          <Clause number="13" title="STUDENT USE AND DUE DILIGENCE">
            <p>13.1 Students should confirm directly availability, current rent/deposit, utilities, rules, occupancy, access, furnishings and material terms.</p>
            <p>13.2 Before paying or moving in, students should inspect where possible, verify provider identity/authority, understand the tenancy agreement, confirm payment recipient and obtain written terms/receipts.</p>
            <p>13.3 Do not send money solely because a listing appears on Ehani or bears a verification badge. Verification is not a guarantee of ownership, safety, availability or freedom from fraud.</p>
            <p>13.4 Students must communicate respectfully, protect personal information, avoid harassment/discrimination and report suspected fraud or unsafe listings.</p>
            <p>13.5 Ehani does not direct rent/deposit payments through the Platform and does not receive tenancy payments. Independent payments are between the parties.</p>
          </Clause>

          <Clause number="14" title="INDEPENDENT DEALINGS AND TENANCY ARRANGEMENTS">
            <p>14.1 Viewing, negotiation, reservation, tenancy agreement, rent, deposit, maintenance, eviction, refund or occupancy arrangements are independent dealings between provider and student.</p>
            <p>14.2 Ehani is not party to those arrangements and does not control property, recipient, contract, conduct or performance.</p>
            <p>14.3 Users should document agreements and seek legal/institutional guidance as needed. Platform moderation is not a court, tribunal, police or regulator.</p>
          </Clause>

          <Clause number="15" title="FEES, PAYMENT PROCESSING AND REFUNDS">
            <p>15.1 Platform fees relate to Ehani services such as verification/renewal and are separate from rent, deposits and utility charges.</p>
            <p>15.2 Ehani currently uses KCB Buni APIs for M-Pesa payment processing and a KCB business bank account for settlement, subject to configuration changes.</p>
            <p>15.3 Ehani may receive transaction reference, amount, status, timestamp and reconciliation information. Payment credentials should be handled by providers; Ehani should not store full authentication credentials.</p>
            <p>15.4 Successful payment does not approve a listing or verification; payment reconciliation and inspection/review are separate.</p>
            <p>15.5 For failed, duplicate, reversed, disputed or incorrectly credited payments, users should contact support with the transaction reference.</p>
            <p>15.6 Refund eligibility depends on service status, displayed terms, applicable law and circumstances. No blanket no-refund rule applies where law requires a refund or Ehani determines one is appropriate. Completed services may be non-refundable subject to law and disclosed conditions.</p>
            <p>15.7 Ehani does not guarantee provider processing or settlement time and does not control outages, bank delays or mobile-network failures.</p>
          </Clause>

          <Clause number="16" title="PROHIBITED CONDUCT AND PLATFORM INTEGRITY">
            <p>16.1 Prohibited conduct includes fake/copy/unauthorised listings, images or evidence; impersonation; harassment, threats, fraud or unlawful discrimination; scraping or bypassing contact gates; unauthorised access; malware or spam; infringement; resale or unrelated marketing of contact details; bribery or manipulation of agents; and unlawful accommodation or exploitation.</p>
            <p>16.2 Ehani may investigate, preserve evidence, remove content, restrict features, suspend/close accounts, notify affected parties or authorities and pursue lawful remedies.</p>
          </Clause>

          <Clause number="17" title="INTELLECTUAL PROPERTY AND CONTENT LICENCE">
            <p>17.1 Platform software, design, branding, text, layout, databases and original materials are owned by or licensed to Ehani, subject to third-party rights.</p>
            <p>17.2 Providers retain rights in submitted content and grant Ehani a non-exclusive, worldwide, royalty-free licence for the period reasonably needed to host, reproduce, format, review, display, promote listings, perform verification, secure service and maintain lawful records. The licence narrows/ends after removal except for necessary archives, backups or claims.</p>
            <p>17.3 Providers warrant that they have rights and permissions and that content does not infringe privacy, copyright, trademark or other rights.</p>
            <p>17.4 Users may not commercially exploit or redistribute Platform content except as permitted by law or written permission.</p>
          </Clause>

          <Clause number="18" title="AVAILABILITY, MAINTENANCE AND TECHNICAL LIMITATIONS">
            <p>18.1 Ehani aims for reliability but does not guarantee uninterrupted or error-free service. Hosting, database, email, payment, network and third-party failures may affect functionality.</p>
            <p>18.2 Ehani may conduct maintenance, updates, backups, feature changes or emergency interventions and will communicate material planned interruptions where practicable.</p>
            <p>18.3 Users maintain compatible devices, browsers, connectivity and secure credentials. Ehani is not responsible for failures caused by user devices/networks or third parties outside reasonable control.</p>
          </Clause>

          <Clause number="19" title="COMPLAINTS, REPORTS AND DISPUTES">
            <p>19.1 Report inaccurate listings, fraud, unsafe conditions, contact misuse, privacy concerns, discrimination or violations to <a href="mailto:support@ehani.co.ke" style={{ color: '#D4873A', textDecoration: 'none', fontWeight: '600' }}>support@ehani.co.ke</a>.</p>
            <p>19.2 Reports should identify listing/account, concern, dates, evidence and safe response channel. Ehani may request details and take interim action.</p>
            <p>19.3 Ehani assesses reports reasonably and prioritises urgent safety, fraud, privacy and security issues; it may protect confidential investigations and other persons’ data.</p>
            <p>19.4 Platform complaints may be raised with support. Independent tenancy disputes remain between parties and may require competent authorities or legal processes.</p>
          </Clause>

          <Clause number="20" title="SUSPENSION, TERMINATION AND ACCOUNT CLOSURE">
            <p>20.1 Ehani may suspend/terminate access for breach, security/legal risk, false information, contact misuse, inspection interference, verification failure or suspected fraud.</p>
            <p>20.2 Where appropriate, Ehani may provide notice, reasons and response opportunity. Immediate restriction may protect users, evidence, systems or legal interests.</p>
            <p>20.3 Account closure may be requested by email to support@ehani.co.ke from the registered email address. Ehani verifies the requester and disables access. Self-service closure is not currently promised.</p>
            <p>20.4 Closure may remove listings, badge and contact visibility. It is not automatic erasure of every record; necessary tax, accounting, security, complaint, legal or evidentiary records may remain.</p>
            <p>20.5 Ehani deletes/anonymises unnecessary information. Closure may not immediately remove records from backups or provider systems subject to lawful retention.</p>
          </Clause>

          <Clause number="21" title="DISCLAIMERS AND RISK ALLOCATION">
            <p>21.1 The Platform is an information/discovery service; provider statements are not necessarily independently verified in every respect.</p>
            <p>21.2 A badge records completion/approval of a defined Ehani process for a stated period; it is not government certification, title search, professional survey, safety warranty or promise of tenancy performance.</p>
            <p>21.3 Ehani does not warrant provider identity, ownership, authority, condition, compliance, availability, price accuracy after publication, suitability, security or user conduct.</p>
            <p>21.4 Users make their own decisions and assume due diligence, communication, payment, contract and occupancy responsibility. Non-waivable legal duties remain unaffected.</p>
            <p>21.5 External services/links are subject to third-party terms and availability; Ehani does not control those systems.</p>
          </Clause>

          <Clause number="22" title="LIABILITY AND INDEMNITY">
            <p>22.1 Nothing excludes liability for fraud, wilful misconduct, negligence causing death/personal injury, statutory consumer/data rights or liability that Kenyan law prohibits excluding.</p>
            <p>22.2 To the extent permitted by law, Ehani is not liable for indirect/consequential loss, lost opportunity, independent tenancy transactions, provider misrepresentation, user misuse of contacts, third-party outages or circumstances outside reasonable control.</p>
            <p>22.3 A user responsible for unlawful content, infringement, personal-data misuse or breach may be liable for losses and reasonable costs caused, subject to law; indemnity cannot remove non-waivable rights.</p>
            <p>22.4 No provision denies a remedy or protection under mandatory Kenyan law.</p>
          </Clause>

          <Clause number="23" title="NOTICES, AMENDMENTS AND GENERAL PROVISIONS">
            <p>23.1 Operational notices may be delivered through Platform, email or reasonable channels; users should keep email current.</p>
            <p>23.2 Material changes will be communicated reasonably and renewed acceptance obtained where required. Versions/effective dates should be recorded and accessible.</p>
            <p>23.3 Invalid clauses are severed or adjusted minimally; remaining provisions continue. Non-enforcement is not waiver.</p>
            <p>23.4 Users may not transfer accounts without permission. Ehani may transfer operational rights in lawful restructuring subject to data-protection obligations.</p>
            <p>23.5 These Terms, Privacy Policy and feature conditions govern Platform use subject to mandatory law.</p>
          </Clause>

          <Clause number="24" title="GOVERNING LAW AND CONTACT">
            <p>24.1 These Terms are governed by Kenyan law; competent Kenyan courts and dispute-resolution bodies may have jurisdiction subject to mandatory rules.</p>
            <p>24.2 <strong>EHANI HOMES</strong> | 1098-60200, Meru, Kenya | <a href="mailto:support@ehani.co.ke" style={{ color: '#D4873A', textDecoration: 'none', fontWeight: '600' }}>support@ehani.co.ke</a> | Website: <a href="https://ehani.co.ke" style={{ color: '#D4873A', textDecoration: 'none', fontWeight: '600' }}>ehani.co.ke</a>.</p>
          </Clause>
        </div>
      </div>

      {/* PART B */}
      <div id="part-b" style={{ marginBottom: '80px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
          <div style={{ width: '40px', height: '40px', background: '#FDF8F3', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#D4873A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
          </div>
          <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#1C1209', margin: 0 }}>PART B — PRIVACY POLICY</h2>
        </div>

        <div style={{ paddingLeft: '52px' }}>
          <Clause number="25" title="PRIVACY COMMITMENT AND SCOPE">
            <p>25.1 This Policy explains how EHANI HOMES collects, uses, stores, discloses, protects and disposes of personal data connected with the Platform.</p>
            <p>25.2 Ehani seeks lawful, fair, transparent, purpose-limited and proportionate processing, retention only as necessary, and privacy by design/default—including gated provider contacts.</p>
            <p>25.3 It applies to students, providers, agents, support correspondents, visitors and other individuals whose data Ehani processes; read it with collection notices and feature explanations.</p>
          </Clause>

          <Clause number="26" title="CONTROLLER IDENTITY AND RESPONSIBILITY">
            <p>26.1 The controller for Platform account, listing, inspection, verification, disclosure and operations is EHANI HOMES, operated by Eugene Larry Ososo, 1098-60200, Meru, Kenya.</p>
            <p>26.2 Privacy enquiries, rights requests and complaints: <a href="mailto:support@ehani.co.ke" style={{ color: '#D4873A', textDecoration: 'none', fontWeight: '600' }}>support@ehani.co.ke</a>. Requests may be verified proportionately to protect individuals.</p>
            <p>26.3 Service providers may be processors for specified activities or independent controllers for their own legal, payment, security or service purposes.</p>
          </Clause>

          <Clause number="27" title="PERSONAL DATA INVENTORY">
            <ul style={{ margin: 0, paddingLeft: '20px', lineHeight: '1.8' }}>
              <li><strong>27.1 Student:</strong> Email, verification status, account identifier, timestamps and necessary account/security records; standard signup intends email only.</li>
              <li><strong>27.2 Provider:</strong> Display name, email, phone, account identifier, verification status, listing relationships and security records.</li>
              <li><strong>27.3 Listing:</strong> Property name, location, type, rent/deposit, amenities, distance, photos, availability, description, status and provider association; property data may be personal data if it identifies a person.</li>
              <li><strong>27.4 Inspection:</strong> Appointment, assigned agent, checklist, findings, notes, photos, discrepancy records, decisions, badge period, renewal, suspension and withdrawal history.</li>
              <li><strong>27.5 Disclosure:</strong> Provider authorisation, authorised fields, listing, conditions, notice version, timestamp, recipient/account event where logged and withdrawal/restriction record.</li>
              <li><strong>27.6 Payment:</strong> Reference, amount, currency, status, timestamp, fee category, reconciliation, refund/reversal and account/listing association; full credentials should remain with provider.</li>
              <li><strong>27.7 Technical/security:</strong> Verification/authentication events, logs, IP/network/device/browser information where generated, errors, alerts and session data.</li>
              <li><strong>27.8 Support/complaints:</strong> Emails, request content, attachments, complaint details, limited identity verification, response and closure records.</li>
              <li><strong>27.9 Agents:</strong> Agent identity/contact, assignments, permissions, inspection submissions, training acknowledgements and incident reports.</li>
            </ul>
          </Clause>

          <Clause number="28" title="PURPOSES AND LAWFUL BASES">
            <ul style={{ margin: 0, paddingLeft: '20px', lineHeight: '1.8' }}>
              <li><strong>28.1 Accounts:</strong> Create and secure accounts, verify email, authenticate and provide features; basis may include requested steps/contract, legitimate interests or another lawful basis.</li>
              <li><strong>28.2 Listings:</strong> Receive, review, display, update and moderate listings; communicate status and maintain integrity.</li>
              <li><strong>28.3 Inspection:</strong> Assign agents, inspect, assess accuracy, record findings, approve/reject verification, manage 12-month period/renewal and address reports.</li>
              <li><strong>28.4 Disclosure:</strong> Gate contacts by default and disclose authorised fields only when provider authorisation and conditions are met; retain accountability records.</li>
              <li><strong>28.5 Payments:</strong> Initiate/reconcile Platform fees, confirm status, resolve failures/disputes, account for receipts and meet legal obligations.</li>
              <li><strong>28.6 Security:</strong> Detect compromise, fraud, scraping, impersonation, spam, misuse and unauthorised access; investigate and protect systems/users.</li>
              <li><strong>28.7 Support/rights:</strong> Respond to enquiries, complaints, rights requests and disputes; preserve necessary evidence and document decisions.</li>
              <li><strong>28.8 Legal:</strong> Comply with legal, regulatory, tax, court, law-enforcement and ODPC requirements subject to lawful process.</li>
              <li><strong>28.9 Improvement:</strong> Diagnose errors, improve usability/reliability and understand aggregate activity; use anonymised/aggregated information where possible.</li>
            </ul>
          </Clause>

          <Clause number="29" title="COLLECTION NOTICES AND TRANSPARENCY">
            <p>29.1 At or before collection, provide controller identity, purpose, data categories, lawful basis as appropriate, recipients, transfers, rights, security contact, whether provision is required/optional and consequences of non-provision.</p>
            <p>29.2 For indirect collection, assess and provide information as required by law subject to exceptions.</p>
            <p>29.3 Record notice/consent version, timestamp, account and action where appropriate. Do not use blanket acceptance to justify unrelated optional processing.</p>
            <p>29.4 For incompatible new purposes, assess lawful requirements and provide notice or obtain consent where required before processing.</p>
          </Clause>

          <Clause number="30" title="ACCOUNT AND AUTHENTICATION PROCESSING">
            <p>30.1 Email verification confirms control of an inbox and reduces fake/mistyped accounts; tokens should be time-limited and protected.</p>
            <p>30.2 Authentication/security records help detect suspicious access, protect accounts, enforce rules and investigate incidents.</p>
            <p>30.3 Do not collect student identity documents, university registration numbers, financial profiles or additional details at standard signup without defined feature, lawful basis and notice.</p>
            <p>30.4 Users may request correction; limited records may remain after closure for security, legal, accounting or disputes.</p>
          </Clause>

          <Clause number="31" title="LISTING AND PROPERTY DATA">
            <p>31.1 Providers submit listing data directly. Ehani uses it to review/display accommodation, search/filter, manage status, verify and respond to reports.</p>
            <p>31.2 Property information may reveal an owner, tenant, caretaker or other identifiable person. Ehani assesses risk and avoids unrelated personal information.</p>
            <p>31.3 Public fields are limited to those selected for publication; contacts remain gated unless conditions are met.</p>
            <p>31.4 Providers should avoid images/descriptions containing personal data of occupants, neighbours or children without lawful basis and permission.</p>
          </Clause>

          <Clause number="32" title="INSPECTION AND FIELD-AGENT PROCESSING">
            <p>32.1 Agents receive limited information for assigned inspections; access is scoped by task and removed when assignment ends.</p>
            <p>32.2 Photos/notes document observable conditions and claims, support review, record decisions and respond to disputes/complaints.</p>
            <p>32.3 Agents use approved devices/channels, avoid unnecessary images of people/documents, upload promptly and avoid personal cloud/email/messaging storage unless expressly authorised.</p>
            <p>32.4 Ehani may review agent access/submissions; separate agent agreements establish confidentiality and handling duties.</p>
          </Clause>

          <Clause number="33" title="VERIFICATION AND CONTACT DISCLOSURE">
            <p>33.1 Inspection/verification data supports assessment of platform criteria and badge administration.</p>
            <p>33.2 Annual fee covers fresh physical inspection, review and contact visibility for approved 12 months; no separate contact fee under current model.</p>
            <p>33.3 Expiry, rejection, suspension or withdrawal removes/disables badge and re-gates contacts; compliant listings may remain live.</p>
            <p>33.4 Renewal requires payment, fresh physical inspection and approval; payment alone does not restore access.</p>
            <p>33.5 Provider authorisation and relevant disclosure events are recorded; contacts are not sold or used for unrelated marketing.</p>
          </Clause>

          <Clause number="34" title="PAYMENTS AND FINANCIAL RECORDS">
            <p>34.1 KCB Buni APIs process M-Pesa Platform fees and KCB business bank account receives settlement, subject to current configuration. Providers/banks may process data under their own duties.</p>
            <p>34.2 Ehani receives necessary transaction information and should not retain full payment authentication credentials.</p>
            <p>34.3 Financial records may be retained for statutory tax/accounting, reconciliation, fraud and dispute purposes; this does not justify indefinite retention of unrelated profile data.</p>
          </Clause>

          <Clause number="35" title="RECIPIENTS AND DATA SHARING">
            <p>35.1 Recipients may include authorised administrators/support staff; assigned agents; eligible students receiving authorised contact fields; hosting/database/email/payment/security providers; professional advisers; competent authorities where lawful; and parties to lawful restructuring subject to safeguards.</p>
            <p>35.2 Ehani does not sell personal data or disclose contacts for unrelated advertising/bulk marketing. New sharing purposes require assessment and transparent notice.</p>
          </Clause>

          <Clause number="36" title="PROCESSORS AND SERVICE PROVIDERS">
            <p>36.1 Current providers: Hosting.com (hosting), Supabase (database/email verification), KCB Buni APIs (M-Pesa), and KCB business banking (settlement).</p>
            <p>36.2 Roles vary by activity. Identify processor functions, document instructions, execute written terms where required, assess subprocessors and monitor material changes.</p>
            <p>36.3 Contracts/settings should address confidentiality, security, access, incident notification, rights assistance, deletion/return, audit information, subprocessors and transfer safeguards.</p>
            <p>36.4 Providers may independently process data for law, fraud prevention, security or payment/banking obligations under their notices.</p>
          </Clause>

          <Clause number="37" title="INTERNATIONAL TRANSFERS AND DATA LOCATIONS">
            <p>37.1 Confirm countries/regions where data is stored, accessed, backed up or processed by providers/subprocessors.</p>
            <p>37.2 For transfers outside Kenya, assess and implement required safeguards and legal conditions, including adequacy, contractual, consent or other lawful mechanisms.</p>
            <p>37.3 A provider’s Kenyan-facing website does not prove Kenyan data storage; do not claim local-only storage without verification.</p>
            <p>37.4 Published notices should accurately identify destinations/categories and safeguards consistent with actual arrangements.</p>
          </Clause>

          <Clause number="38" title="SECURITY SAFEGUARDS">
            <p>38.1 Safeguards should include least-privilege roles; separate administrator/agent access; MFA for privileged access where available; secure passwords, API keys and secrets; encryption in transit and appropriate at-rest protection; secure development and updates; monitoring, backup/restore; confidentiality/training; minimisation; and periodic access/provider reviews.</p>
            <p>38.2 No internet service is completely secure. Ehani will take reasonable measures against unauthorised access, alteration, loss, disclosure or destruction and respond to risks.</p>
          </Clause>

          <Clause number="39" title="DATA BREACHES AND INCIDENT RESPONSE">
            <p>39.1 A breach may include unauthorised access/disclosure, loss, alteration, destruction, theft, misdirected communication, compromised credentials, exposed files or other incident affecting personal data.</p>
            <p>39.2 Agents, staff and processors report suspected incidents immediately to support@ehani.co.ke/designated contact with facts, timing, data, systems and containment.</p>
            <p>39.3 Ehani assesses, contains, preserves evidence, identifies affected data/persons, evaluates harm, documents decisions and corrects causes.</p>
            <p>39.4 Where statutory threshold applies, notify ODPC without delay and within applicable 72-hour period from awareness; notify affected individuals where required. Processor/agent contracts require prompt reporting.</p>
            <p>39.5 Incident records capture facts, impact, remediation, notification decisions, communications and lessons. Not every technical event is automatically a reportable personal-data breach.</p>
          </Clause>

          <Clause number="40" title="RETENTION AND DISPOSAL">
            <p>40.1 Retain data only as reasonably necessary for purpose, legal obligations, security, accounting, complaints, disputes or claims.</p>
            <p>40.2 A separate schedule sets categories, triggers, periods, disposal methods and holds; review periodically and when processing changes.</p>
            <p>40.3 At purpose expiry delete, erase, anonymise or pseudonymise unless lawful retention applies. Pseudonymised data remains personal data where re-identification is possible.</p>
            <p>40.4 Review inactive accounts after 12 months; this is a review trigger, not automatic deletion. Consider listings, verification, transactions, complaints, security and holds.</p>
            <p>40.5 Proposed internal target: delete/anonymise unnecessary personal data within 30 days of verified closure, subject to legal retention, backup cycles and justified exceptions. It is not a universal statutory deadline.</p>
            <p>40.6 Inspection records: during verification and proposed 24 months after expiry/withdrawal/replacement where needed. Relevant tax/accounting records may require generally at least five years; do not apply that period indiscriminately to all personal data.</p>
            <p>40.7 Backups may retain deleted data until rolling expiry. Restrict access and document provider cycles. Legal holds pause deletion only for relevant records and are reviewed periodically.</p>
          </Clause>

          <Clause number="41" title="DATA SUBJECT RIGHTS">
            <ul style={{ margin: 0, paddingLeft: '20px', lineHeight: '1.8' }}>
              <li>41.1 Right to be informed about use of personal data.</li>
              <li>41.2 Right to access personal data held about the individual.</li>
              <li>41.3 Right to correction of inaccurate, false or misleading data.</li>
              <li>41.4 Right to deletion where legal conditions apply; not absolute where lawful retention/claims apply.</li>
              <li>41.5 Right to object in circumstances provided by law, including qualifying legitimate-interest processing.</li>
              <li>41.6 Right to restriction where applicable, such as while accuracy or objection is assessed.</li>
              <li>41.7 Right to portability of qualifying data in structured, commonly used, machine-readable format and direct transmission where technically possible and applicable.</li>
              <li>41.8 Right to withdraw consent where consent is the basis; withdrawal does not invalidate prior lawful processing.</li>
              <li>41.9 Right to complain to Ehani and/or ODPC where rights are believed infringed.</li>
            </ul>
          </Clause>

          <Clause number="42" title="RIGHTS-REQUEST PROCEDURE">
            <p>42.1 Send requests to support@ehani.co.ke from registered email where possible or another reasonable channel. Ehani may proportionately verify identity/authority; do not send passwords or unnecessary documents.</p>
            <p>42.2 Register request date/type, verification, systems searched, owner, decision, response, extension/refusal reason and closure.</p>
            <p>42.3 Respond within applicable statutory period. General Regulations commonly provide 7 days for access, 14 days for rectification/erasure/objection/restriction and 30 days for portability.</p>
            <p>42.4 For refusal/limitation, explain reasons as legally permitted and relevant complaint/review route.</p>
            <p>42.5 Protect other persons’ data, privileged/security-sensitive information and lawful exceptions; consider redaction or partial response.</p>
          </Clause>

          <Clause number="43" title="COOKIES AND SIMILAR TECHNOLOGIES">
            <p>43.1 Essential cookies/similar technologies may support sessions, authentication, security, preferences and functionality.</p>
            <p>43.2 Non-essential analytics, advertising or tracking should not be deployed without notice and consent where required; maintain a live cookie inventory.</p>
            <p>43.3 Browser controls may manage cookies; disabling essential cookies may affect login/functionality.</p>
          </Clause>

          <Clause number="44" title="COMMUNICATIONS AND MARKETING">
            <p>44.1 Necessary communications include verification, security, listing decisions, renewal reminders, payment confirmations, support and policy changes.</p>
            <p>44.2 Marketing is separate; obtain consent or another lawful basis where required, provide opt-out and honour objections.</p>
            <p>44.3 Disclosed landlord contacts are not used for unrelated marketing or sold to third parties.</p>
          </Clause>

          <Clause number="45" title="CHILDREN AND AGE RESTRICTION">
            <p>45.1 Accounts are intended for adults 18+. Ehani does not knowingly invite children to register.</p>
            <p>45.2 If data is found collected contrary to age rules, Ehani assesses and takes protective, deletion or other lawful action.</p>
            <p>45.3 Age restriction does not remove legal obligations for incidental child data or a future child-facing service.</p>
          </Clause>

          <Clause number="46" title="AUTOMATED DECISIONS AND MODERATION">
            <p>46.1 Technical rules may support email verification, access gating, expiry calculations, listing status, fraud detection and alerts.</p>
            <p>46.2 Verification decisions are intended to involve administrative review of inspection findings; do not describe purely automated decisions as human review.</p>
            <p>46.3 For solely automated decisions with legal or similarly significant effects, assess applicable safeguards, information, review or contest rights.</p>
          </Clause>

          <Clause number="47" title="PRIVACY COMPLAINTS AND REGULATORY ESCALATION">
            <p>47.1 Privacy complaints and rights requests go to support@ehani.co.ke. Ehani investigates and responds within applicable periods and records outcomes.</p>
            <p>47.2 Individuals may also complain to ODPC. Ehani cooperates with lawful inquiries and preserves relevant records.</p>
            <p>47.3 A complaint does not automatically require disclosure of another person’s information or suspension of all processing; assess and act proportionately.</p>
          </Clause>

          <Clause number="48" title="POLICY UPDATES AND CONTACT">
            <p>48.1 Revise this Policy when practices, features, providers or law change. Communicate material changes reasonably and obtain new notice/consent where required.</p>
            <p>48.2 Published version should show effective date and maintain prior versions where useful for accountability.</p>
            <p>48.3 <strong>EHANI HOMES</strong> | <a href="mailto:support@ehani.co.ke" style={{ color: '#D4873A', textDecoration: 'none', fontWeight: '600' }}>support@ehani.co.ke</a> | 1098-60200, Meru, Kenya | Website: <a href="https://ehani.co.ke" style={{ color: '#D4873A', textDecoration: 'none', fontWeight: '600' }}>ehani.co.ke</a>.</p>
          </Clause>
        </div>
      </div>

      {/* ANNEXES */}
      <div style={{ marginBottom: '80px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
          <div style={{ width: '40px', height: '40px', background: '#FDF8F3', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#D4873A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
          </div>
          <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#1C1209', margin: 0 }}>ANNEXES</h2>
        </div>

        <div style={{ paddingLeft: '52px', display: 'flex', flexDirection: 'column', gap: '32px' }}>
          
          {/* Annex 1 */}
          <div id="annex-1" style={{ background: '#F9FAFB', padding: '32px', borderRadius: '16px', border: '1px solid #F0EAE3' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#1C1209', marginTop: 0, marginBottom: '16px' }}>ANNEX 1 — Verification Lifecycle</h3>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px', lineHeight: '1.6' }}>
                <thead>
                  <tr style={{ background: '#FDF8F3', textAlign: 'left' }}>
                    <th style={{ padding: '12px', borderBottom: '2px solid #D4873A', color: '#1C1209', fontWeight: '700' }}>Stage</th>
                    <th style={{ padding: '12px', borderBottom: '2px solid #D4873A', color: '#1C1209', fontWeight: '700' }}>Badge</th>
                    <th style={{ padding: '12px', borderBottom: '2px solid #D4873A', color: '#1C1209', fontWeight: '700' }}>Contact/listing</th>
                  </tr>
                </thead>
                <tbody style={{ color: '#4B5563' }}>
                  <tr><td style={{ padding: '12px', borderBottom: '1px solid #E5E7EB' }}>New/unverified</td><td style={{ padding: '12px', borderBottom: '1px solid #E5E7EB' }}>Off</td><td style={{ padding: '12px', borderBottom: '1px solid #E5E7EB' }}>Contacts gated; listing may be live</td></tr>
                  <tr><td style={{ padding: '12px', borderBottom: '1px solid #E5E7EB' }}>Inspection pending</td><td style={{ padding: '12px', borderBottom: '1px solid #E5E7EB' }}>Off</td><td style={{ padding: '12px', borderBottom: '1px solid #E5E7EB' }}>Contacts gated</td></tr>
                  <tr><td style={{ padding: '12px', borderBottom: '1px solid #E5E7EB' }}>Approved</td><td style={{ padding: '12px', borderBottom: '1px solid #E5E7EB' }}>On for 12 months</td><td style={{ padding: '12px', borderBottom: '1px solid #E5E7EB' }}>Authorised contacts enabled</td></tr>
                  <tr><td style={{ padding: '12px', borderBottom: '1px solid #E5E7EB' }}>Approaching expiry</td><td style={{ padding: '12px', borderBottom: '1px solid #E5E7EB' }}>On until expiry</td><td style={{ padding: '12px', borderBottom: '1px solid #E5E7EB' }}>Enabled while valid</td></tr>
                  <tr><td style={{ padding: '12px', borderBottom: '1px solid #E5E7EB' }}>Expired</td><td style={{ padding: '12px', borderBottom: '1px solid #E5E7EB' }}>Off</td><td style={{ padding: '12px', borderBottom: '1px solid #E5E7EB' }}>Contacts gated; listing may remain live</td></tr>
                  <tr><td style={{ padding: '12px', borderBottom: '1px solid #E5E7EB' }}>Fee paid, inspection pending</td><td style={{ padding: '12px', borderBottom: '1px solid #E5E7EB' }}>Off</td><td style={{ padding: '12px', borderBottom: '1px solid #E5E7EB' }}>Contacts gated</td></tr>
                  <tr><td style={{ padding: '12px', borderBottom: '1px solid #E5E7EB' }}>Inspection rejected</td><td style={{ padding: '12px', borderBottom: '1px solid #E5E7EB' }}>Off</td><td style={{ padding: '12px', borderBottom: '1px solid #E5E7EB' }}>Contacts gated</td></tr>
                  <tr><td style={{ padding: '12px' }}>Fresh inspection approved</td><td style={{ padding: '12px' }}>Restored 12 months</td><td style={{ padding: '12px' }}>Contacts restored subject to authorisation</td></tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Annex 2 */}
          <div id="annex-2" style={{ background: '#F9FAFB', padding: '32px', borderRadius: '16px', border: '1px solid #F0EAE3' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#1C1209', marginTop: 0, marginBottom: '16px' }}>ANNEX 2 — Contact Disclosure Principles</h3>
            <ul style={{ margin: 0, paddingLeft: '20px', color: '#4B5563', lineHeight: '1.8', fontSize: '15px' }}>
              <li>Contacts gated by default.</li>
              <li>Disclose only specifically authorised fields.</li>
              <li>Keep authorisation and notice-version evidence.</li>
              <li>Apply verification/access conditions before release.</li>
              <li>Log disclosure events where technically feasible.</li>
              <li>Provide withdrawal/correction route.</li>
              <li>Prohibit scraping, resale, bulk use and unrelated marketing.</li>
              <li>Re-gate automatically on expiry, suspension or withdrawal.</li>
            </ul>
          </div>

          {/* Annex 3 */}
          <div id="annex-3" style={{ background: '#F9FAFB', padding: '32px', borderRadius: '16px', border: '1px solid #F0EAE3' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#1C1209', marginTop: 0, marginBottom: '16px' }}>ANNEX 3 — Privacy Request Route</h3>
            <p style={{ margin: 0, color: '#4B5563', lineHeight: '1.7', fontSize: '15px' }}>
              Email <a href="mailto:support@ehani.co.ke" style={{ color: '#D4873A', textDecoration: 'none', fontWeight: '600' }}>support@ehani.co.ke</a> with subject “Privacy Request” or “Account Closure”. Include registered email, request type and enough detail to identify data/account. Do not send passwords or unnecessary identity documents. Ehani may request proportionate verification.
            </p>
          </div>

          {/* Annex 4 */}
          <div id="annex-4" style={{ background: '#F9FAFB', padding: '32px', borderRadius: '16px', border: '1px solid #F0EAE3' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#1C1209', marginTop: 0, marginBottom: '16px' }}>ANNEX 4 — Glossary</h3>
            <div style={{ display: 'grid', gap: '16px', fontSize: '15px' }}>
              <div><strong style={{ color: '#1C1209' }}>Anonymisation:</strong> <span style={{ color: '#4B5563' }}>Irreversibly transforming data so an individual is no longer identifiable using reasonably available means.</span></div>
              <div><strong style={{ color: '#1C1209' }}>Controller:</strong> <span style={{ color: '#4B5563' }}>Person/entity determining purposes and means of personal-data processing.</span></div>
              <div><strong style={{ color: '#1C1209' }}>Processor:</strong> <span style={{ color: '#4B5563' }}>Person/entity processing personal data on behalf of a controller under instructions.</span></div>
              <div><strong style={{ color: '#1C1209' }}>Data subject:</strong> <span style={{ color: '#4B5563' }}>Identified or identifiable natural person to whom data relates.</span></div>
              <div><strong style={{ color: '#1C1209' }}>Disclosure:</strong> <span style={{ color: '#4B5563' }}>Making personal data available to another person, including displaying gated contact fields.</span></div>
              <div><strong style={{ color: '#1C1209' }}>Legal hold:</strong> <span style={{ color: '#4B5563' }}>Documented pause in deletion for legal, regulatory, dispute, security or evidentiary purpose.</span></div>
              <div><strong style={{ color: '#1C1209' }}>Personal data:</strong> <span style={{ color: '#4B5563' }}>Information relating to an identified or identifiable natural person.</span></div>
              <div><strong style={{ color: '#1C1209' }}>Pseudonymisation:</strong> <span style={{ color: '#4B5563' }}>Processing preventing attribution without separately held information; may remain personal data.</span></div>
              <div><strong style={{ color: '#1C1209' }}>Verification:</strong> <span style={{ color: '#4B5563' }}>Ehani’s defined inspection/review approval for a stated period, subject to suspension/withdrawal.</span></div>
            </div>
          </div>

        </div>
      </div>

      {/* Contact Section */}
      <div style={{ background: '#F9FAFB', padding: '40px', borderRadius: '16px', border: '1px solid #F0EAE3', textAlign: 'center' }}>
        <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#1C1209', marginBottom: '12px' }}>Questions or Legal Concerns?</h3>
        <p style={{ fontSize: '15px', color: '#6B5B4E', marginBottom: '24px', lineHeight: '1.6' }}>
          If you have any questions regarding these terms, our privacy practices, or wish to exercise your data rights, please contact our legal and support team.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
          <a href="mailto:support@ehani.co.ke" style={{ color: '#1C1209', fontWeight: '600', fontSize: '14px', textDecoration: 'none', background: 'white', padding: '10px 20px', borderRadius: '8px', border: '1px solid #E5E7EB' }}>
            support@ehani.co.ke
          </a>
          <a href="tel:+254710236242" style={{ color: '#1C1209', fontWeight: '600', fontSize: '14px', textDecoration: 'none', background: 'white', padding: '10px 20px', borderRadius: '8px', border: '1px solid #E5E7EB' }}>
            +254 710 236 242
          </a>
        </div>
      </div>

      {/* Footer Link */}
      <div style={{ marginTop: '60px', textAlign: 'center' }}>
        <Link href="/" style={{ color: '#6B5B4E', textDecoration: 'none', fontSize: '13px', fontWeight: '500' }}>
          © {new Date().getFullYear()} Ehani Homes. All rights reserved.
        </Link>
      </div>
    </div>
  )
}

// Reusable Clause Component for consistent styling
function Clause({ number, title, children }: { number: string, title: string, children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: '32px' }}>
      <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1C1209', marginBottom: '12px' }}>{number}. {title}</h3>
      <div style={{ fontSize: '15px', color: '#4B5563', lineHeight: '1.7' }}>
        {children}
      </div>
    </div>
  )
}
