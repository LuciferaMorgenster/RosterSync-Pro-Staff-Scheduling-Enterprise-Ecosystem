export const translations = {
  en: {
    // Brand & Header
    brandTitle: 'RosterSync Pro',
    brandTagline: 'Staff Roster & Ecosystem Hub',
    navRoster: 'Weekly Roster',
    navIntegrations: 'Connected Apps',
    navSeo: 'SEO & Social Preview',
    navPayroll: 'Payroll & Accounting',
    navSponsor: 'Support Developer',
    navGithub: 'Publish on GitHub',
    languageLabel: 'Language',
    
    // Roster Controls
    weekView: 'Week',
    today: 'Today',
    prevWeek: 'Previous Week',
    nextWeek: 'Next Week',
    filterDepartment: 'Department',
    allDepartments: 'All Departments',
    engineering: 'Engineering',
    operations: 'Operations',
    customerCare: 'Customer Care',
    logistics: 'Logistics',
    addShift: 'New Shift',
    quickTemplate: 'Quick Templates',
    exportSchedule: 'Export Roster',
    
    // Stats Bar
    totalScheduledHours: 'Scheduled Hours',
    activeStaff: 'Active Staff',
    overtimeAlerts: 'Overtime Alerts',
    grossWageEstimate: 'Est. Payroll Cost',
    fillRate: 'Roster Coverage',

    // Grid Days
    monday: 'Mon',
    tuesday: 'Tue',
    wednesday: 'Wed',
    thursday: 'Thu',
    friday: 'Fri',
    saturday: 'Sat',
    sunday: 'Sun',
    
    // Shift Details
    shiftMorning: 'Morning Shift',
    shiftDay: 'Day Shift',
    shiftEvening: 'Evening Shift',
    shiftNight: 'Night Shift',
    hoursShort: 'h',
    breakTime: 'Break',
    contractTarget: 'Contract',
    overtime: 'Overtime',
    doubleBooked: 'Shift Overlap Conflict',
    noShiftsScheduled: 'No shifts scheduled for this day',
    dragToMove: 'Drag to reassign day or staff member',

    // Modals
    modalNewShiftTitle: 'Schedule New Shift',
    modalEditShiftTitle: 'Edit Shift Details',
    employeeSelect: 'Employee',
    dateLabel: 'Date',
    startTime: 'Start Time',
    endTime: 'End Time',
    breakMinutesLabel: 'Break Duration (mins)',
    roleLabel: 'Duty / Role Name',
    projectAllocation: 'Kopilot Project Link',
    noProject: 'No specific project (General operations)',
    notesLabel: 'Notes & Special Instructions',
    cancel: 'Cancel',
    saveShift: 'Save Shift',
    deleteShift: 'Delete Shift',
    confirmDelete: 'Are you sure you want to remove this shift?',

    // Connected Apps
    integrationsTitle: 'Connected Business Apps Ecosystem',
    integrationsSubtitle: 'Automated bidirectional data bridge between your HRIS, Project Management, and Accounting software.',
    syncAllApps: 'Sync All Applications',
    lastSynced: 'Last synchronized',
    syncInProgress: 'Synchronizing records...',
    viewApiPayload: 'View Bridge Payload',
    liveLogs: 'Synchronization Activity Log',
    
    // App 1: TalentPulse-HRIS
    talentPulseName: 'TalentPulse-HRIS',
    talentPulseCategory: 'Human Resources & Staff Directory',
    talentPulseDesc: 'Synchronizes employee contracts, working hours agreements, department affiliations, leave balances, and role privileges.',
    talentPulseAction: 'Pull Employee Updates',
    talentPulseStatusActive: 'Active Directory Sync (12 Employees)',

    // App 2: Kopilot-Projects
    kopilotName: 'Kopilot-Projects',
    kopilotCategory: 'Project & Milestone Planning',
    kopilotDesc: 'Maps shift hours directly to active client deliverables, sprints, and project milestones to track actual billable resource utilization.',
    kopilotAction: 'Sync Project Deliverables',
    kopilotStatusActive: '4 Active Client Projects Linked',

    // App 3: BoekhoudGemak
    boekhoudgemakName: 'BoekhoudGemak',
    boekhoudgemakCategory: 'Accounting, Timesheets & Payroll',
    boekhoudgemakDesc: 'Calculates regular hours and 150% overtime wage premiums, generating verified timesheets ready for SEPA and payroll processing.',
    boekhoudgemakAction: 'Export Payroll Batch',
    boekhoudgemakStatusActive: 'Ready to Process Timesheet Batch',

    // Payroll View
    payrollTitle: 'BoekhoudGemak Payroll & Wage Ledger',
    payrollSubtitle: 'Real-time calculation of contracted vs actual hours, overtime surcharges, and gross payroll estimates.',
    staffMember: 'Staff Member',
    contractHoursHeader: 'Contract Hours',
    actualHoursHeader: 'Scheduled Hours',
    baseWage: 'Base Rate / hr',
    overtimeHours: 'Overtime (+50%)',
    totalGross: 'Gross Total',
    downloadPayrollCsv: 'Download CSV for BoekhoudGemak',
    downloadPayrollJson: 'Download JSON Bridge Payload',

    // SEO & Social Preview
    seoTitle: 'SEO & Social Share Preview (LinkedIn & Facebook)',
    seoSubtitle: 'Preview how RosterSync Pro renders with OpenGraph social cards, Twitter cards, and Schema.org rich snippets.',
    previewPlatform: 'Select Social Preview Platform',
    metaTitleLabel: 'Meta Title (<title> & og:title)',
    metaDescriptionLabel: 'Meta Description (og:description)',
    coverImageLabel: 'Cover Image (og:image)',
    schemaDataLabel: 'Schema.org JSON-LD Structured Data',
    linkedInPreview: 'LinkedIn Feed Card Preview',
    facebookPreview: 'Facebook Share Preview',
    twitterPreview: 'Twitter / X Summary Card Preview',
    copiedToClipboard: 'Copied to clipboard!',

    // Support / Sponsor Modal
    sponsorTitle: 'Support & Sponsor Development',
    sponsorSubtitle: 'Sponsor this project directly via PayPal to support continued maintenance and new enterprise integrations.',
    sponsorRecipient: 'PayPal Account: luciferamorgenster@gmail.com',
    sponsorButtonDirect: 'Send Sponsorship via PayPal',
    sponsorNote: 'Thank you for supporting independent open-source development!',
    close: 'Close',

    // GitHub Modal
    githubTitle: 'Publish Application to GitHub',
    githubSubtitle: 'Deploy and synchronize this codebase directly to your GitHub account.',
    githubUserEmail: 'Author Account: luciferamorgenster@gmail.com',
    githubStepsHeading: 'Quick Deployment Instructions',
    step1: '1. Create a new repository on your GitHub account (e.g. rostersync-pro).',
    step2: '2. Run the Git commands below in your terminal to initialize and push:',
    step3: '3. Verify your README.md with the embedded cover image and documentation.',
    copyCommands: 'Copy Git Commands',
    downloadReadme: 'Download Bilingual README.md'
  },
  nl: {
    // Brand & Header
    brandTitle: 'RosterSync Pro',
    brandTagline: 'Personeelsrooster & Ecosysteem Hub',
    navRoster: 'Weekrooster',
    navIntegrations: 'Gekoppelde Apps',
    navSeo: 'SEO & Social Preview',
    navPayroll: 'Verloning & Boekhouding',
    navSponsor: 'Steun Ontwikkelaar',
    navGithub: 'Publiceer op GitHub',
    languageLabel: 'Taal',
    
    // Roster Controls
    weekView: 'Week',
    today: 'Vandaag',
    prevWeek: 'Vorige week',
    nextWeek: 'Volgende week',
    filterDepartment: 'Afdeling',
    allDepartments: 'Alle afdelingen',
    engineering: 'Techniek & IT',
    operations: 'Operaties & Support',
    customerCare: 'Klantenservice',
    logistics: 'Logistiek',
    addShift: 'Nieuwe dienst',
    quickTemplate: 'Snelmodellen',
    exportSchedule: 'Rooster exporteren',
    
    // Stats Bar
    totalScheduledHours: 'Ingeplande uren',
    activeStaff: 'Actief personeel',
    overtimeAlerts: 'Overuren waarschuwingen',
    grossWageEstimate: 'Geschatte loonkosten',
    fillRate: 'Roosterdekking',

    // Grid Days
    monday: 'Ma',
    tuesday: 'Di',
    wednesday: 'Wo',
    thursday: 'Do',
    friday: 'Vr',
    saturday: 'Za',
    sunday: 'Zo',
    
    // Shift Details
    shiftMorning: 'Ochtenddienst',
    shiftDay: 'Dagdienst',
    shiftEvening: 'Avonddienst',
    shiftNight: 'Nachtdienst',
    hoursShort: 'u',
    breakTime: 'Pauze',
    contractTarget: 'Contract',
    overtime: 'Overuren',
    doubleBooked: 'Dubbele boeking conflict',
    noShiftsScheduled: 'Geen diensten ingepland voor deze dag',
    dragToMove: 'Sleep om dag of medewerker te wijzigen',

    // Modals
    modalNewShiftTitle: 'Nieuwe dienst inplannen',
    modalEditShiftTitle: 'Dienstgegevens bewerken',
    employeeSelect: 'Medewerker',
    dateLabel: 'Datum',
    startTime: 'Starttijd',
    endTime: 'Eindtijd',
    breakMinutesLabel: 'Pauzeduur (minuten)',
    roleLabel: 'Functie / Taakomschrijving',
    projectAllocation: 'Kopilot Project koppeling',
    noProject: 'Geen specifiek project (Algemene werkzaamheden)',
    notesLabel: 'Notities & instructies',
    cancel: 'Annuleren',
    saveShift: 'Dienst opslaan',
    deleteShift: 'Dienst verwijderen',
    confirmDelete: 'Weet u zeker dat u deze dienst wilt verwijderen?',

    // Connected Apps
    integrationsTitle: 'Gekoppelde Bedrijfsapplicaties Ecosysteem',
    integrationsSubtitle: 'Geautomatiseerde tweerichtings data-uitwisseling tussen uw HRIS, Projectmanagement en Boekhouding.',
    syncAllApps: 'Alle apps synchroniseren',
    lastSynced: 'Laatst gesynchroniseerd',
    syncInProgress: 'Gegevens synchroniseren...',
    viewApiPayload: 'Bekijk Bridge Payload',
    liveLogs: 'Synchronisatie Logboek',
    
    // App 1: TalentPulse-HRIS
    talentPulseName: 'TalentPulse-HRIS',
    talentPulseCategory: 'Personeelsbeheer & HR-Dossiers',
    talentPulseDesc: 'Synchroniseert personeelscontracten, contracturen, afdelingsindelingen, verlofsaldi en bevoegdheden.',
    talentPulseAction: 'Medewerkers ophalen',
    talentPulseStatusActive: 'Actieve koppeling (12 Medewerkers gesynchroniseerd)',

    // App 2: Kopilot-Projects
    kopilotName: 'Kopilot-Projects',
    kopilotCategory: 'Project- & Mijlpaalplanning',
    kopilotDesc: 'Koppelt ingeplande roosteruren rechtstreeks aan actieve klantprojecten, sprints en taken voor nauwkeurige nacalculatie.',
    kopilotAction: 'Projecttaken synchroniseren',
    kopilotStatusActive: '4 Actieve Klantprojecten gekoppeld',

    // App 3: BoekhoudGemak
    boekhoudgemakName: 'BoekhoudGemak',
    boekhoudgemakCategory: 'Boekhouding, Urenregistratie & Loonstrook',
    boekhoudgemakDesc: 'Berekent reguliere uren en 150% overurentoeslag en exporteert direct goedgekeurde urenstaten voor de salarisadministratie.',
    boekhoudgemakAction: 'Loonbatch exporteren',
    boekhoudgemakStatusActive: 'Klaar voor verwerking salarisadministratie',

    // Payroll View
    payrollTitle: 'BoekhoudGemak Uren & Salarisgrootboek',
    payrollSubtitle: 'Realtime berekening van contracturen versus gerealiseerde uren, overurentoeslagen en bruto loonkosten.',
    staffMember: 'Medewerker',
    contractHoursHeader: 'Contracturen',
    actualHoursHeader: 'Ingeplande uren',
    baseWage: 'Uurtarief',
    overtimeHours: 'Overuren (+50%)',
    totalGross: 'Bruto Totaal',
    downloadPayrollCsv: 'Download CSV voor BoekhoudGemak',
    downloadPayrollJson: 'Download JSON Bridge Payload',

    // SEO & Social Preview
    seoTitle: 'SEO & Social Media Preview (LinkedIn & Facebook)',
    seoSubtitle: 'Bekijk hoe RosterSync Pro getoond wordt met OpenGraph social cards, Twitter cards en Schema.org structured data.',
    previewPlatform: 'Kies social media platform',
    metaTitleLabel: 'Meta Titel (<title> & og:title)',
    metaDescriptionLabel: 'Meta Omschrijving (og:description)',
    coverImageLabel: 'Omslagafbeelding (og:image)',
    schemaDataLabel: 'Schema.org JSON-LD Gestructureerde Gegevens',
    linkedInPreview: 'LinkedIn Tijdlijn Card Preview',
    facebookPreview: 'Facebook Deelkaart Preview',
    twitterPreview: 'Twitter / X Summary Card Preview',
    copiedToClipboard: 'Gekopieerd naar klembord!',

    // Support / Sponsor Modal
    sponsorTitle: 'Ondersteun & Sponsoring Ontwikkeling',
    sponsorSubtitle: 'Sponsor dit project rechtstreeks via PayPal om voortdurende updates en nieuwe integraties mogelijk te maken.',
    sponsorRecipient: 'PayPal Rekening: luciferamorgenster@gmail.com',
    sponsorButtonDirect: 'Donatie overmaken via PayPal',
    sponsorNote: 'Hartelijk dank voor het ondersteunen van onafhankelijke softwareontwikkeling!',
    close: 'Sluiten',

    // GitHub Modal
    githubTitle: 'Applicatie Publiceren op GitHub',
    githubSubtitle: 'Synchroniseer en publiceer deze broncode direct naar uw GitHub-account.',
    githubUserEmail: 'Auteur Account: luciferamorgenster@gmail.com',
    githubStepsHeading: 'Snelle Publicatie Instructies',
    step1: '1. Maak een nieuwe repository aan op uw GitHub-account (bijv. rostersync-pro).',
    step2: '2. Voer de onderstaande Git-commando\'s uit in uw terminal om te initialiseren en pushen:',
    step3: '3. Controleer uw meertalige README.md met de ingebedde omslagafbeelding en handleiding.',
    copyCommands: 'Kopieer Git Commando\'s',
    downloadReadme: 'Download Meertalige README.md'
  }
};
