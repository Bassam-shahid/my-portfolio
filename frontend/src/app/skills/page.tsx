import SkillsSection from '@/components/sections/skills-section'
import PageTransition from '@/components/shared/page-transition'

export default function SkillsPage() {
  return (
    <PageTransition>
      <main className="relative min-h-screen">
        <SkillsSection layout="rings" />
      </main>
    </PageTransition>
  )
}
