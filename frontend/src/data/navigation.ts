export interface NavItem {
  label: string
  href: string
}

export const navigation: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Projects', href: '/projects' },
  { label: 'Skills', href: '/skills' },
  { label: 'Experience', href: '/experience' },
  { label: 'Contact', href: '/contact' },
]

export const socialLinks = [
  { platform: 'github', url: 'https://github.com/bassam', label: 'GitHub' },
  { platform: 'linkedin', url: 'https://linkedin.com/in/bassam', label: 'LinkedIn' },
  { platform: 'twitter', url: 'https://twitter.com/bassam', label: 'Twitter' },
]
