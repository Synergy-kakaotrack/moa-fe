// app/project/[projectId]/page.tsx
import ProjectDashboard from '@/components/dashboard/ProjectDashboard';

interface ProjectPageProps {
  params: {
    projectId: string;
  };
}

export default function ProjectPage({ params }: ProjectPageProps) {
  return <ProjectDashboard projectId={params.projectId} />;
}
