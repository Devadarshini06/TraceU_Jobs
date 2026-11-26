import os
import sys
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.lib.units import inch
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak, KeepTogether, HRFlowable
)
from reportlab.pdfgen import canvas

class NumberedCanvas(canvas.Canvas):
    def __init__(self, *args, **kwargs):
        super(NumberedCanvas, self).__init__(*args, **kwargs)
        self._saved_page_states = []

    def showPage(self):
        self._saved_page_states.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        num_pages = len(self._saved_page_states)
        for state in self._saved_page_states:
            self.__dict__.update(state)
            self.draw_header_footer(num_pages)
            super(NumberedCanvas, self).showPage()
        super(NumberedCanvas, self).save()

    def draw_header_footer(self, page_count):
        self.saveState()
        self.setFont("Helvetica-Bold", 8)
        self.setFillColor(colors.HexColor("#64748B"))
        
        # Header (pages > 1)
        if self._pageNumber > 1:
            self.drawString(54, 755, "TraceU Jobs — Enterprise Frontend Architecture & Client Presentation Guide")
            self.setStrokeColor(colors.HexColor("#E2E8F0"))
            self.setLineWidth(0.75)
            self.line(54, 747, 558, 747)
            
        # Footer
        self.setFont("Helvetica", 8)
        self.drawString(54, 35, "Confidential — Prepared by Prajai Technology Private Limited")
        page_str = f"Page {self._pageNumber} of {page_count}"
        self.drawRightString(558, 35, page_str)
        self.setStrokeColor(colors.HexColor("#E2E8F0"))
        self.setLineWidth(0.75)
        self.line(54, 47, 558, 47)
        self.restoreState()

def build_pdf(filename):
    doc = SimpleDocTemplate(
        filename,
        pagesize=letter,
        leftMargin=54,
        rightMargin=54,
        topMargin=54,
        bottomMargin=54
    )

    styles = getSampleStyleSheet()
    
    # Custom palette
    PURPLE = colors.HexColor("#530EF0")
    DARK = colors.HexColor("#0F172A")
    BODY_COLOR = colors.HexColor("#334155")
    MUTED = colors.HexColor("#64748B")
    BG_LIGHT = colors.HexColor("#F8FAFC")
    PURPLE_LIGHT = colors.HexColor("#F5F3FF")
    PURPLE_BORDER = colors.HexColor("#C084FC")
    BORDER_LIGHT = colors.HexColor("#E2E8F0")
    GREEN = colors.HexColor("#059669")
    BLUE = colors.HexColor("#2563EB")
    ORANGE = colors.HexColor("#D97706")

    # Typography styles
    styles.add(ParagraphStyle(
        name='DocTitle',
        fontName='Helvetica-Bold',
        fontSize=24,
        leading=28,
        textColor=PURPLE,
        spaceAfter=6
    ))
    
    styles.add(ParagraphStyle(
        name='DocSubtitle',
        fontName='Helvetica',
        fontSize=12,
        leading=16,
        textColor=MUTED,
        spaceAfter=14
    ))

    styles.add(ParagraphStyle(
        name='SectionHeader',
        fontName='Helvetica-Bold',
        fontSize=14,
        leading=18,
        textColor=DARK,
        spaceBefore=14,
        spaceAfter=8,
        keepWithNext=True
    ))

    styles.add(ParagraphStyle(
        name='SubSectionHeader',
        fontName='Helvetica-Bold',
        fontSize=11,
        leading=15,
        textColor=PURPLE,
        spaceBefore=10,
        spaceAfter=4,
        keepWithNext=True
    ))

    styles.add(ParagraphStyle(
        name='BodyCustom',
        fontName='Helvetica',
        fontSize=9.5,
        leading=13.5,
        textColor=BODY_COLOR,
        spaceAfter=6
    ))

    styles.add(ParagraphStyle(
        name='BulletCustom',
        fontName='Helvetica',
        fontSize=9,
        leading=13,
        textColor=BODY_COLOR,
        leftIndent=14,
        spaceAfter=3
    ))

    styles.add(ParagraphStyle(
        name='CalloutText',
        fontName='Helvetica-Oblique',
        fontSize=9,
        leading=13,
        textColor=colors.HexColor("#4338CA")
    ))

    styles.add(ParagraphStyle(
        name='TableHeader',
        fontName='Helvetica-Bold',
        fontSize=9,
        leading=11,
        textColor=colors.white
    ))

    styles.add(ParagraphStyle(
        name='TableCellBold',
        fontName='Helvetica-Bold',
        fontSize=8.5,
        leading=11,
        textColor=DARK
    ))

    styles.add(ParagraphStyle(
        name='TableCellText',
        fontName='Helvetica',
        fontSize=8.5,
        leading=11,
        textColor=BODY_COLOR
    ))

    story = []

    # ==========================================
    # COVER / HEADER
    # ==========================================
    story.append(Paragraph("TraceU Jobs", styles['DocTitle']))
    story.append(Paragraph("Enterprise Recruitment Platform — Complete Frontend Architecture & Presentation Guide", styles['DocSubtitle']))
    
    meta_data = [
        [Paragraph("<b>Prepared For:</b> Client Presentation & Executive Walkthrough", styles['TableCellText']),
         Paragraph("<b>Date:</b> November 2026", styles['TableCellText'])],
        [Paragraph("<b>Author / Organization:</b> Prajai Technology Private Limited", styles['TableCellText']),
         Paragraph("<b>Tech Stack:</b> React 18, Vite, Material-UI v6, Ant Design Icons", styles['TableCellText'])]
    ]
    t_meta = Table(meta_data, colWidths=[280, 224])
    t_meta.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), PURPLE_LIGHT),
        ('BOX', (0,0), (-1,-1), 1, colors.HexColor("#DDD6FE")),
        ('INNERGRID', (0,0), (-1,-1), 0.5, colors.HexColor("#EDE9FE")),
        ('TOPPADDING', (0,0), (-1,-1), 6),
        ('BOTTOMPADDING', (0,0), (-1,-1), 6),
        ('LEFTPADDING', (0,0), (-1,-1), 8),
        ('RIGHTPADDING', (0,0), (-1,-1), 8),
    ]))
    story.append(t_meta)
    story.append(Spacer(1, 14))

    # ==========================================
    # 1. EXECUTIVE SUMMARY & SYSTEM OVERVIEW
    # ==========================================
    story.append(Paragraph("1. Executive Summary & Platform Purpose", styles['SectionHeader']))
    story.append(Paragraph(
        "<b>TraceU Jobs</b> is an enterprise-grade digital recruitment and talent acquisition ecosystem. "
        "It eliminates hiring friction by connecting four essential stakeholders into a unified, coherent platform: "
        "<b>Executive Administrators</b>, <b>Human Resources Managers</b>, <b>Corporate Employers / Recruiters</b>, and <b>Job Candidates</b>. "
        "The application delivers end-to-end recruitment lifecycle automation—spanning requisition approval, "
        "AI resume parsing and match scoring, applicant tracking (ATS), interview workflows, passive talent pooling, and real-time operational analytics.",
        styles['BodyCustom']
    ))
    story.append(Spacer(1, 4))

    # Callout Box
    key_points = [
        [Paragraph("<b>Key Architectural Value for Clients:</b><br/>"
                   "• <b>Unified Enterprise Design System:</b> Pixel-perfect layout consistency across 20+ specialized pages, standardized 40px actions, 8px spacing grid, and fluid responsiveness.<br/>"
                   "• <b>1-Click Demo Login System:</b> Frictionless presentation mode allowing seamless switching between Admin, HR, Employer, and Candidate personas in under 2 seconds.<br/>"
                   "• <b>Time-Adaptive Intelligence:</b> Real-time dynamic contextual greetings ('Good Morning', 'Good Afternoon', 'Good Evening') customized across all user profiles.",
                   styles['CalloutText'])]
    ]
    t_callout = Table(key_points, colWidths=[504])
    t_callout.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor("#EEF2FF")),
        ('BOX', (0,0), (-1,-1), 1, colors.HexColor("#C7D2FE")),
        ('LEFTPADDING', (0,0), (-1,-1), 10),
        ('RIGHTPADDING', (0,0), (-1,-1), 10),
        ('TOPPADDING', (0,0), (-1,-1), 8),
        ('BOTTOMPADDING', (0,0), (-1,-1), 8),
    ]))
    story.append(t_callout)
    story.append(Spacer(1, 14))

    # ==========================================
    # 2. THE 4 LOGIN PERSONAS & PORTALS
    # ==========================================
    story.append(Paragraph("2. The 4 Login Personas & Access Architecture", styles['SectionHeader']))
    story.append(Paragraph(
        "The platform provides strict role-based views. Below is the detailed breakdown of each user persona, their credentials, system entry point, and their operational domain:",
        styles['BodyCustom']
    ))

    login_table_data = [
        [Paragraph("Portal Persona", styles['TableHeader']),
         Paragraph("Route", styles['TableHeader']),
         Paragraph("Credentials", styles['TableHeader']),
         Paragraph("Core Permissions & Capabilities", styles['TableHeader'])],
        
        [Paragraph("<b>Platform Administrator</b><br/>(Full Governance)", styles['TableCellBold']),
         Paragraph("<code>/admin/login</code><br/>→ <code>/admin/dashboard</code>", styles['TableCellText']),
         Paragraph("admin@traceu.com<br/><code>Admin@123</code>", styles['TableCellText']),
         Paragraph("• Master System Control & Governance<br/>"
                   "• Requisition review, approval & sync<br/>"
                   "• Enterprise ATS across all departments<br/>"
                   "• AI Studio models & prompt tuning<br/>"
                   "• System-wide Analytics & Settings", styles['TableCellText'])],

        [Paragraph("<b>Human Resources (HR)</b><br/>(Recruitment Operations)", styles['TableCellBold']),
         Paragraph("<code>/hr/login</code><br/>→ <code>/hr/dashboard</code>", styles['TableCellText']),
         Paragraph("hr@traceu.com<br/><code>Hr@123</code>", styles['TableCellText']),
         Paragraph("• Operational hiring workflows & pipelines<br/>"
                   "• Candidate screening & stage progression<br/>"
                   "• Resume parsing & AI match verification<br/>"
                   "• Interview scheduling & offer management<br/>"
                   "• Department hiring velocity tracking", styles['TableCellText'])],

        [Paragraph("<b>Employer / Recruiter</b><br/>(Hiring Manager)", styles['TableCellBold']),
         Paragraph("<code>/employer/login</code><br/>→ <code>/employer/dashboard</code>", styles['TableCellText']),
         Paragraph("employer@traceu.com<br/><code>Employer@123</code>", styles['TableCellText']),
         Paragraph("• Create & submit new job requisitions<br/>"
                   "• Track applicants for specific team jobs<br/>"
                   "• Review shortlisted candidate profiles<br/>"
                   "• Direct talent pool candidate search<br/>"
                   "• Provide stage-by-stage feedback", styles['TableCellText'])],

        [Paragraph("<b>Candidate / Job Seeker</b><br/>(Applicant Portal)", styles['TableCellBold']),
         Paragraph("<code>/candidate/login</code><br/>→ <code>/candidate/dashboard</code>", styles['TableCellText']),
         Paragraph("candidate@traceu.com<br/><code>Candidate@123</code>", styles['TableCellText']),
         Paragraph("• Browse and 1-Click apply to curated jobs<br/>"
                   "• Track live application progress & status<br/>"
                   "• Discover internship programs<br/>"
                   "• Access AI Career Tools & Resume Builder<br/>"
                   "• Save job bookmarks & explore companies", styles['TableCellText'])]
    ]

    t_login = Table(login_table_data, colWidths=[100, 95, 105, 204])
    t_login.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), PURPLE),
        ('BOX', (0,0), (-1,-1), 1, BORDER_LIGHT),
        ('INNERGRID', (0,0), (-1,-1), 0.5, BORDER_LIGHT),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('TOPPADDING', (0,0), (-1,-1), 6),
        ('BOTTOMPADDING', (0,0), (-1,-1), 6),
        ('LEFTPADDING', (0,0), (-1,-1), 6),
        ('RIGHTPADDING', (0,0), (-1,-1), 6),
        ('BACKGROUND', (0,1), (-1,1), BG_LIGHT),
        ('BACKGROUND', (0,3), (-1,3), BG_LIGHT),
    ]))
    story.append(t_login)
    story.append(Spacer(1, 14))

    # ==========================================
    # 3. 1-CLICK CLIENT DEMO EXPERIENCE
    # ==========================================
    story.append(Paragraph("3. Client Demo Architecture — How 1-Click Login Works", styles['SectionHeader']))
    story.append(Paragraph(
        "For sales presentations and client demonstrations, the login interface (<code>TraceULoginCard.jsx</code>) "
        "is engineered with a specialized <b>Quick-Switch Demo Controller</b> located at the top of the login card:",
        styles['BodyCustom']
    ))
    story.append(Paragraph("• <b>Instant Role Switching:</b> Four visual tab selectors (Admin, HR, Candidate, Employer) allow the presenter to effortlessly jump between roles.", styles['BulletCustom']))
    story.append(Paragraph("• <b>Pre-Configured Identity Hydration:</b> Selecting any tab automatically fills the verified email, credential, and loads role-specific avatar metadata into the frontend state.", styles['BulletCustom']))
    story.append(Paragraph("• <b>One-Touch Sign In:</b> Clicking the primary purple action button (e.g. <i>'Sign In as Admin'</i>) immediately authenticates the session and redirects directly into the corresponding dashboard with zero latency.", styles['BulletCustom']))
    story.append(Paragraph("• <b>Safe Fallback:</b> Standard email and password inputs remain active for live typed authentication if requested by security auditors during technical evaluations.", styles['BulletCustom']))
    
    story.append(PageBreak())

    # ==========================================
    # 4. END-TO-END PLATFORM FLOW
    # ==========================================
    story.append(Paragraph("4. End-to-End Recruitment Workflow (Platform Flow)", styles['SectionHeader']))
    story.append(Paragraph(
        "When presenting to the client, walk them through the lifecycle of a hiring requisition from inception to onboarding:",
        styles['BodyCustom']
    ))

    flow_steps = [
        ("Step 1: Requisition Creation & Careers Site Sync",
         "The hiring process begins when an Employer or Admin creates a new Requisition (e.g., REQ-0018). The platform supports direct manual creation or automated synchronization with company careers websites. Requisitions feature salary brackets, headcount requirements, priority tags, and hiring manager assignments."),
        
        ("Step 2: Executive Approval & Job Publishing",
         "Requisitions in 'Pending Approval' status are reviewed in the Requisition Approval Hub. Once approved, TraceU Jobs automatically promotes the requisition to an active Job Posting (e.g., JOB-0012) published live across candidate channels."),
        
        ("Step 3: Candidate Discovery & 1-Click Application",
         "Job seekers access the Candidate Portal to filter open opportunities by role, experience level, salary range, and work mode (Remote / Hybrid / On-site). Candidates upload resumes with automated parsing, bookmark opportunities, and submit 1-click applications."),
        
        ("Step 4: AI Matching & Resume Scoring (ATS Studio)",
         "Applications flow directly into the Applicant Tracking System (ATS). The integrated AI Studio evaluates candidate resumes against job descriptions, calculating an objective Match Score (0–100%), highlighting key matched skills, and flagging gaps for HR reviewers."),
        
        ("Step 5: Multi-Stage Hiring Pipeline",
         "HR Managers and recruiters advance candidates through structured interview stages: <i>Screening → Shortlisted → Technical Round → Final Interview → Offer Extended</i>. Status chips, audit histories, and batch communications keep all stakeholders synchronized."),
        
        ("Step 6: Talent Pool & Future-Proof Sourcing",
         "Promising candidates not hired for immediate roles are transitioned to the centralized Talent Pool. When future requisitions open, recruiters can query the talent pool by skill and availability (Immediate, 1 Month) to hire without running expensive ad campaigns."),
        
        ("Step 7: Executive Analytics & Recruitment Intelligence",
         "Both Admin and HR dashboards provide real-time KPI metrics: Total Candidates, Active Requisitions, Time-to-Hire, Offer Acceptance Rate, Source Efficiency (LinkedIn, Referrals, Career Site), and Stage Conversion Funnels.")
    ]

    for title, desc in flow_steps:
        box_data = [
            [Paragraph(f"<b>{title}</b>", styles['SubSectionHeader'])],
            [Paragraph(desc, styles['BodyCustom'])]
        ]
        t_box = Table(box_data, colWidths=[504])
        t_box.setStyle(TableStyle([
            ('BACKGROUND', (0,0), (-1,-1), BG_LIGHT),
            ('BOX', (0,0), (-1,-1), 0.75, BORDER_LIGHT),
            ('LEFTPADDING', (0,0), (-1,-1), 10),
            ('RIGHTPADDING', (0,0), (-1,-1), 10),
            ('TOPPADDING', (0,0), (-1,-1), 5),
            ('BOTTOMPADDING', (0,0), (-1,-1), 6),
        ]))
        story.append(t_box)
        story.append(Spacer(1, 6))

    story.append(Spacer(1, 8))

    # ==========================================
    # 5. FRONTEND DESIGN SYSTEM & STANDARDIZATION
    # ==========================================
    story.append(Paragraph("5. Enterprise Frontend Standards & Highlights", styles['SectionHeader']))
    story.append(Paragraph(
        "Highlight these frontend design and architectural standards during your presentation to demonstrate enterprise maturity:",
        styles['BodyCustom']
    ))

    standards_data = [
        [Paragraph("Standard Element", styles['TableHeader']),
         Paragraph("Specification / Rule", styles['TableHeader']),
         Paragraph("Client Benefit / Impact", styles['TableHeader'])],

        [Paragraph("<b>Design Tokens</b>", styles['TableCellBold']),
         Paragraph("Brand Purple (<code>#530EF0</code>), Dark Slate (<code>#111827</code>), Soft Card Borders (<code>#F3F4F6</code>)", styles['TableCellText']),
         Paragraph("Cohesive, modern high-tech visual identity matching Fortune 500 standards.", styles['TableCellText'])],

        [Paragraph("<b>Typography</b>", styles['TableCellBold']),
         Paragraph("Inter Font Family • Headings: 24px Bold • Sections: 18px Semi • Body: 14px", styles['TableCellText']),
         Paragraph("Maximum readability across large data tables and dashboards.", styles['TableCellText'])],

        [Paragraph("<b>Button Standards</b>", styles['TableCellBold']),
         Paragraph("Primary: 40px height, 8px radius, #530EF0 • Secondary: 40px bordered", styles['TableCellText']),
         Paragraph("Zero visual jumping; uniform interactive click targets across all pages.", styles['TableCellText'])],

        [Paragraph("<b>Data Tables</b>", styles['TableCellBold']),
         Paragraph("Vertical middle alignment, nowrap text columns, clean hover states, pagination", styles['TableCellText']),
         Paragraph("Prevents awkward text wraps (e.g. Software Engineer) and keeps dense lists readable.", styles['TableCellText'])],

        [Paragraph("<b>Performance</b>", styles['TableCellBold']),
         Paragraph("Vite 7 build, code-split chunks, sub-300ms initial launch", styles['TableCellText']),
         Paragraph("Instantaneous route transitions and smooth client demonstrations.", styles['TableCellText'])],

        [Paragraph("<b>Adaptive Greetings</b>", styles['TableCellBold']),
         Paragraph("Time-based greeting (Good Morning / Afternoon / Evening) on all portals", styles['TableCellText']),
         Paragraph("Human-centric, personalized touch for users logging in throughout the day.", styles['TableCellText'])]
    ]

    t_std = Table(standards_data, colWidths=[100, 204, 200])
    t_std.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), PURPLE),
        ('BOX', (0,0), (-1,-1), 1, BORDER_LIGHT),
        ('INNERGRID', (0,0), (-1,-1), 0.5, BORDER_LIGHT),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('TOPPADDING', (0,0), (-1,-1), 5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 5),
        ('LEFTPADDING', (0,0), (-1,-1), 6),
        ('RIGHTPADDING', (0,0), (-1,-1), 6),
        ('BACKGROUND', (0,1), (-1,1), BG_LIGHT),
        ('BACKGROUND', (0,3), (-1,3), BG_LIGHT),
        ('BACKGROUND', (0,5), (-1,5), BG_LIGHT),
    ]))
    story.append(t_std)
    story.append(Spacer(1, 14))

    # ==========================================
    # 6. CLIENT PRESENTATION TALKING POINTS
    # ==========================================
    story.append(Paragraph("6. Recommended Client Presentation Script / Agenda", styles['SectionHeader']))
    story.append(Paragraph("Follow this step-by-step agenda during the meeting:", styles['BodyCustom']))
    story.append(Paragraph("<b>1. Start at Login (`http://localhost:3000/login`):</b> Show the clean 4-tab demo selector. Explain how the platform serves 4 distinct audiences with zero login friction.", styles['BulletCustom']))
    story.append(Paragraph("<b>2. Tour Platform Administration:</b> Click 'Sign In as Admin'. Showcase the live KPIs, time-adaptive greeting, Requisition Approval workflow, and ATS overview.", styles['BulletCustom']))
    story.append(Paragraph("<b>3. Demonstrate ATS & AI Screening:</b> Open `/admin/applications`. Show the clean candidate table, Match Score badges (e.g., 92% match), and resume preview.", styles['BulletCustom']))
    story.append(Paragraph("<b>4. Switch to HR Operations:</b> Log in as HR (`/hr/dashboard`). Demonstrate daily recruiter workflows, applicant screening, and candidate stage progression.", styles['BulletCustom']))
    story.append(Paragraph("<b>5. Showcase Job Seeker Portal:</b> Log in as Candidate (`/candidate/dashboard`). Highlight the modern job search, internships, saved bookmarks, and AI career tools.", styles['BulletCustom']))
    story.append(Paragraph("<b>6. Conclude with ROI & Scalability:</b> Emphasize faster time-to-hire, lower cost-per-hire via the Talent Pool, and centralized visibility for leadership.", styles['BulletCustom']))

    doc.build(story, canvasmaker=NumberedCanvas)
    print(f"PDF successfully generated at: {filename}")

if __name__ == '__main__':
    target_path = sys.argv[1] if len(sys.argv) > 1 else "TraceU_Jobs_Client_Presentation_Guide.pdf"
    build_pdf(target_path)
