export interface Sponsor {
    name: string
    tier: string
    url: string
    imgFilename: string
    description: string
  }


export const sponsors: Sponsor[] = [
    {
      name: 'Datature',
      tier: 'silver',
      url: 'https://datature.io',
      imgFilename: 'datature-full.png',
      description: 'Build, Train, and Deploy Enterprise Computer Vision Applications in One Platform'
    },
    {
      name: 'Roboflow',
      tier: 'bronze',
      url: 'https://roboflow.com',
      imgFilename: 'roboflow.png',
      description: 'Computer vision infrastructure for developers'
    }
  ]
