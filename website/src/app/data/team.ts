export interface TeamMember {
    name: string
    photo: string,
    twitter: string,
    github: string,
    linkedin: string
    instagram?: string
  }

export const team: TeamMember[] = [
    {
        "name": "Vladimir Iglovikov",
        "photo": "iglovikov.jpg",
        "twitter": "viglovikov",
        "github": "ternaus",
        "linkedin": "iglovikov",
        "instagram": "ternaus"
    }
]

export const ex_team: TeamMember[] = [
    {
        "name": "Alexander Buslaev",
        "photo": "buslaev.jpg",
        "twitter": "AlBuslaev",
        "github": "albu",
        "linkedin": "al-buslaev"
    },
    {
        "name": "Alex Parinov",
        "photo": "parinov.jpg",
        "twitter": "creaf",
        "github": "creafz",
        "linkedin": "alex-parinov"
    },
    {
        "name": "Evegene Khvedchenya",
        "photo": "khvedchenya.jpg",
        "twitter": "cvtalks",
        "github": "BloodAxe",
        "linkedin": "cvtalks"
    },
    {
        "name": "Mikhail Druzhinin",
        "photo": "druzhinin.jpg",
        "twitter": "Dipetm",
        "github": "Dipet",
        "linkedin": "mikhail-druzhinin-548229100"
    }
]
