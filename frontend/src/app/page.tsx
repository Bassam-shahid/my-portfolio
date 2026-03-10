import HeroSection from '@/components/sections/hero-section'
import FeaturedProjects from '@/components/sections/featured-projects'
import SkillsSection from '@/components/sections/skills-section'
import PageTransition from '@/components/shared/page-transition'

export default function Home() {
  return (
    <PageTransition>
      <main className="relative">
        <HeroSection />
        <FeaturedProjects />
        <SkillsSection layout="cards" />
      </main>
    </PageTransition>
  )
}
