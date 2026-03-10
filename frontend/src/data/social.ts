export interface SocialLink {
  platform: 'github' | 'linkedin' | 'twitter' | 'email'
  url: string
  label: string
  icon: string
}

export const socialLinks: SocialLink[] = [
  {
    platform: 'github',
    url: 'https://github.com/Bassam-shahid',
    label: 'GitHub',
    icon: 'github',
  },
  {
    platform: 'linkedin',
    url: 'https://www.linkedin.com/in/bassam-shahid-90588024a/',
    label: 'LinkedIn',
    icon: 'linkedin',
  },
  {
    platform: 'twitter',
    url: 'https://twitter.com/bassam',
    label: 'Twitter',
    icon: 'twitter',
  },
  {
    platform: 'email',
    url: 'mailto:contact@bassam.dev',
    label: 'Email',
    icon: 'mail',
  },
]

export const contactEmail = 'contact@bassam.dev'
export const resumeUrl = '/resume.pdf'
