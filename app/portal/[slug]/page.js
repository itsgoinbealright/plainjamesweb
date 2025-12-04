import ProjectPortal from '@/components/ProjectPortal';

export default async function PortalPage({ params }) {
  const { slug } = await params;
  
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/project/${slug}`, {
    cache: 'no-store'
  });
  
  const data = await res.json();

  if (!data.success) {
    return <div className="min-h-screen bg-[#F5F3EF] flex items-center justify-center text-[#5C5C5C]">Project not found</div>;
  }

  return (
    <ProjectPortal
      estimate={data.estimate}
      invoices={data.invoices}
      invoiceSummary={data.invoiceSummary}
      calendar={data.calendar}
      project={data.project}
    />
  );
}