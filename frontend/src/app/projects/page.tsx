import FeaturedProjects from '@/components/sections/featured-projects'
import PageTransition from '@/components/shared/page-transition'

export default function ProjectsPage() {
  return (
    <PageTransition>
      <main className="relative min-h-screen">
        <FeaturedProjects showAll={true} />
      </main>
    </PageTransition>
  )
}
