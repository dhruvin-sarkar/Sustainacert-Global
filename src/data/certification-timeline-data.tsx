import { CheckCircle2 } from "lucide-react";

const bodyTextClassName =
  "text-muted-foreground dark:text-neutral-200 text-sm md:text-base font-normal mb-8";

const stepTitleClassName = "text-foreground dark:text-white font-semibold";

const renderImage = (src: string, alt: string) => (
  <div className="mb-8 overflow-hidden rounded-3xl border border-border/70 bg-card shadow-card">
    <img src={src} alt={alt} className="h-48 w-full object-cover" />
  </div>
);

const renderChecklist = (items: string[]) => (
  <div className="mb-8 space-y-3">
    {items.map((item) => (
      <div
        key={item}
        className="flex items-start gap-3 text-sm md:text-base text-muted-foreground dark:text-neutral-200"
      >
        <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
        <span>{item}</span>
      </div>
    ))}
  </div>
);

export const certificationTimelineData = [
  {
    title: "Step 1",
    content: (
      <div>
        {renderImage(
          "/two-researches-man-woman-examine-greenery-with-tablet-all-white-greenhouse.jpg.jpeg",
          "Application submission and consultation process"
        )}
        <p className={bodyTextClassName}>
          <strong className={stepTitleClassName}>Application Submission</strong>
          <br />
          Submit your application with relevant documentation and scope details.
          Our team will review your submission and confirm receipt within 1-2
          business days.
        </p>
        {renderChecklist([
          "Complete online application form",
          "Define certification scope and objectives",
          "Submit company documentation and quality manuals",
          "Provide organizational structure details",
        ])}
      </div>
    ),
  },
  {
    title: "Step 2",
    content: (
      <div>
        {renderImage(
          "/empty-laboratory-workspace-displays-jars-blood-samples-tools-prepared-analysis-clinical.jpg.jpeg",
          "Document review and laboratory analysis process"
        )}
        <p className={bodyTextClassName}>
          <strong className={stepTitleClassName}>Document Review</strong>
          <br />
          Our team reviews your documentation for completeness and compliance
          readiness. This comprehensive analysis typically takes 5-10 business
          days.
        </p>
        <p className={bodyTextClassName}>
          Our certified auditors conduct a thorough gap analysis against
          applicable standards, providing pre-audit recommendations and
          identifying areas requiring attention.
        </p>
        {renderChecklist([
          "Comprehensive document analysis",
          "Gap analysis against standards",
          "Pre-audit recommendations",
          "Identification of improvement areas",
        ])}
      </div>
    ),
  },
  {
    title: "Step 3",
    content: (
      <div>
        {renderImage(
          "/interior-view-steel-factory.jpg.jpeg",
          "On-site audit at manufacturing facility"
        )}
        <p className={bodyTextClassName}>
          <strong className={stepTitleClassName}>On-site/Remote Audit</strong>
          <br />
          Comprehensive audit conducted by qualified assessors at your
          facilities. The audit consists of two stages and typically takes 2-5
          days depending on scope.
        </p>
        {renderChecklist([
          "Stage 1: Documentation and readiness review",
          "Stage 2: Full system implementation audit",
          "Conducted by internationally certified auditors",
          "Flexible on-site or remote options available",
        ])}
      </div>
    ),
  },
  {
    title: "Step 4",
    content: (
      <div>
        {renderImage(
          "/pharmacy-industry-factory-man-worker-protective-clothing-sterile-working-conditions-operating-pharmaceutical-equipment.jpg.jpeg",
          "Compliance evaluation and quality control assessment"
        )}
        <p className={bodyTextClassName}>
          <strong className={stepTitleClassName}>Compliance Evaluation</strong>
          <br />
          Findings are evaluated against the standards and requirements. Our
          team conducts detailed analysis and evidence validation, typically
          completed within 7-14 business days.
        </p>
        {renderChecklist([
          "Detailed analysis of audit findings",
          "Non-conformity identification",
          "Corrective action review",
          "Evidence validation against requirements",
        ])}
      </div>
    ),
  },
  {
    title: "Step 5",
    content: (
      <div>
        {renderImage(
          "/technologist-food-processing-factory-controlling-process-apple-fruit-selection-production.jpg.jpeg",
          "Certification decision and quality approval process"
        )}
        <p className={bodyTextClassName}>
          <strong className={stepTitleClassName}>Certification Decision</strong>
          <br />
          Independent certification decision based on audit findings and
          evidence. The certification committee reviews all documentation and
          makes an impartial decision within 3-5 business days.
        </p>
        {renderChecklist([
          "Independent review by certification committee",
          "Impartial decision-making process",
          "Certificate issuance upon approval",
          "Entry into international registry",
        ])}
      </div>
    ),
  },
  {
    title: "Step 6",
    content: (
      <div>
        {renderImage(
          "/shot-wind-turbines-mountains.jpg.jpeg",
          "Ongoing surveillance and renewable energy certification monitoring"
        )}
        <p className={bodyTextClassName}>
          <strong className={stepTitleClassName}>
            Surveillance &amp; Renewals
          </strong>
          <br />
          Ongoing surveillance audits and periodic recertification to maintain
          status. This ensures continuous compliance and improvement throughout
          the 3-year certification cycle.
        </p>
        {renderChecklist([
          "Annual surveillance audits",
          "Periodic recertification every 3 years",
          "Continuous improvement monitoring",
          "Support for maintaining certification",
        ])}
      </div>
    ),
  },
];
