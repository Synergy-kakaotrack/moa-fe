interface Props {
  params: Promise<{
    projectId: string;
    stage: string;
  }>;
}

export default async function ProjectStagePage({ params }: Props) {
  const { projectId, stage } = await params;

  return (
    <div>
      <h1>프로젝트 단계 페이지</h1>
      <p>Project: {projectId}</p>
      <p>Stage: {decodeURIComponent(stage)}</p>
    </div>
  );
}
