export interface Testimonials {
    imageUrl: string
    socialUrl: string
    platform: string
    note?: string
  }



export const testimonials: Testimonials[] = [
    {
      imageUrl: '/assets/testimonials/dmitrii_sakharov.webp',
      socialUrl: 'https://www.linkedin.com/feed/update/urn:li:activity:7262128537543786497/',
      platform: 'linkedin'  // or 'linkedin', etc.
    },
    {
        imageUrl: '/assets/testimonials/datature.png',
        socialUrl: 'https://www.linkedin.com/feed/update/urn:li:activity:7261972596458438656/',
        platform: 'linkedin',
        note: "CEO of Datature"
    },
    {
        imageUrl: '/assets/testimonials/rittik_panda.png',
        socialUrl: 'https://x.com/rittik_panda/status/1854989544049066303',
        platform: 'twitter'
    },
    {
        imageUrl: '/assets/testimonials/gonzalo_liedo.png',
        socialUrl: 'https://www.linkedin.com/feed/update/urn:li:activity:7260131224340328451/',
        platform: 'linkedin'
    },
    {
        imageUrl: '/assets/testimonials/sergei_chicherin.png',
        socialUrl: 'https://www.linkedin.com/feed/update/urn:li:activity:7259354845051002882/',
        platform: 'linkedin',
        note: "Computer Vision Engineer"
    },
    {
        imageUrl: '/assets/testimonials/alexandr_simonyan.png',
        socialUrl: 'https://www.linkedin.com/feed/update/urn:li:activity:7259736304416874497/',
        platform: 'linkedin'
    },
    {
        imageUrl: '/assets/testimonials/anmol_sharan.png',
        socialUrl: 'https://www.linkedin.com/feed/update/urn:li:activity:7179530063627870209',
        platform: 'linkedin'
    },
    {
        imageUrl: '/assets/testimonials/christof_henkel.png',
        socialUrl: 'https://x.com/kagglingdieter/status/1775760029754253659',
        platform: 'twitter',
        note: "Kaggle CompetitionsGrandmaster. Top 1 in the world."
    },
    {
        imageUrl: '/assets/testimonials/deepneuralnetwork.png',
        socialUrl: 'https://www.reddit.com/r/computervision/comments/1gju7oe/comment/lvh4w6s/',
        platform: 'reddit'
    },
    {
        imageUrl: '/assets/testimonials/venkatkumar_r.png',
        socialUrl: 'https://www.linkedin.com/feed/update/urn:li:activity:7262002222035546112/',
        platform: 'linkedin'
    }
]
