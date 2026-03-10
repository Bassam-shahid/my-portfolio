import ExperienceTimeline from '@/components/sections/experience-timeline'
import PageTransition from '@/components/shared/page-transition'

export default function ExperiencePage() {
  return (
    <PageTransition>
      <main className="relative min-h-screen">
        <ExperienceTimeline />
      </main>
    </PageTransition>
  )
}
