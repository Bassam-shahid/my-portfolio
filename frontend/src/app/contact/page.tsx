import ContactSection from '@/components/sections/contact-section'
import PageTransition from '@/components/shared/page-transition'

export default function ContactPage() {
  return (
    <PageTransition>
      <main className="relative min-h-screen">
        <ContactSection />
      </main>
    </PageTransition>
  )
}
