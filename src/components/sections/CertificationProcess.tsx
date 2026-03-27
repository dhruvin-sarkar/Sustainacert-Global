import { Timeline } from '@/components/ui/timeline';
import { certificationTimelineData } from '@/data/certification-timeline-data';

export default function CertificationProcess() {
  return (
    <Timeline
      data={certificationTimelineData}
      heading="Certification Process"
      subheading="A streamlined, transparent approach from application to certification"
    />
  );
}
