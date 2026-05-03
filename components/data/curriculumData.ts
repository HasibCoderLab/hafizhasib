// components/data/curriculumData.ts

export interface CurriculumMonth {
    id: number;
    title: string;
    subtitle: string;
    subject: string;
    accent: string;
    color: string;
    topics: string[];
    outcomes: string[];
}

const curriculumData: CurriculumMonth[] = [
    {
        id: 1,
        title: "stage1Title",
        subtitle: "stage1Subtitle",
        subject: "Nazra",
        accent: "#1B4332",
        color: "from-[#1B4332] to-[#2D6A4F]",
        topics: [
            "stage1Topic1",
            "stage1Topic2",
            "stage1Topic3",
            "stage1Topic4",
        ],
        outcomes: [
            "stage1Outcome1",
            "stage1Outcome2",
            "stage1Outcome3",
            "stage1Outcome4",
        ],
    },
    {
        id: 2,
        title: "stage2Title",
        subtitle: "stage2Subtitle",
        subject: "Nazra",
        accent: "#2D6A4F",
        color: "from-[#2D6A4F] to-[#40916C]",
        topics: [
            "stage2Topic1",
            "stage2Topic2",
            "stage2Topic3",
            "stage2Topic4",
        ],
        outcomes: [
            "stage2Outcome1",
            "stage2Outcome2",
            "stage2Outcome3",
            "stage2Outcome4",
        ],
    },
    {
        id: 3,
        title: "stage3Title",
        subtitle: "stage3Subtitle",
        subject: "Tajweed",
        accent: "#D4AF37",
        color: "from-[#D4AF37] to-[#B8860B]",
        topics: [
            "stage3Topic1",
            "stage3Topic2",
            "stage3Topic3",
            "stage3Topic4",
        ],
        outcomes: [
            "stage3Outcome1",
            "stage3Outcome2",
            "stage3Outcome3",
            "stage3Outcome4",
        ],
    },
    {
        id: 4,
        title: "stage4Title",
        subtitle: "stage4Subtitle",
        subject: "Tajweed",
        accent: "#B8860B",
        color: "from-[#B8860B] to-[#8B6914]",
        topics: [
            "stage4Topic1",
            "stage4Topic2",
            "stage4Topic3",
            "stage4Topic4",
        ],
        outcomes: [
            "stage4Outcome1",
            "stage4Outcome2",
            "stage4Outcome3",
            "stage4Outcome4",
        ],
    },
    {
        id: 5,
        title: "stage5Title",
        subtitle: "stage5Subtitle",
        subject: "Hifz",
        accent: "#40916C",
        color: "from-[#40916C] to-[#52B788]",
        topics: [
            "stage5Topic1",
            "stage5Topic2",
            "stage5Topic3",
            "stage5Topic4",
        ],
        outcomes: [
            "stage5Outcome1",
            "stage5Outcome2",
            "stage5Outcome3",
            "stage5Outcome4",
        ],
    },
    {
        id: 6,
        title: "stage6Title",
        subtitle: "stage6Subtitle",
        subject: "Hifz",
        accent: "#52B788",
        color: "from-[#52B788] to-[#74C69D]",
        topics: [
            "stage6Topic1",
            "stage6Topic2",
            "stage6Topic3",
            "stage6Topic4",
        ],
        outcomes: [
            "stage6Outcome1",
            "stage6Outcome2",
            "stage6Outcome3",
            "stage6Outcome4",
        ],
    },
    {
        id: 7,
        title: "stage7Title",
        subtitle: "stage7Subtitle",
        subject: "Dua",
        accent: "#74C69D",
        color: "from-[#74C69D] to-[#95D5B2]",
        topics: [
            "stage7Topic1",
            "stage7Topic2",
            "stage7Topic3",
            "stage7Topic4",
        ],
        outcomes: [
            "stage7Outcome1",
            "stage7Outcome2",
            "stage7Outcome3",
            "stage7Outcome4",
        ],
    },
    {
        id: 8,
        title: "stage8Title",
        subtitle: "stage8Subtitle",
        subject: "Dua",
        accent: "#95D5B2",
        color: "from-[#95D5B2] to-[#B7E4C7]",
        topics: [
            "stage8Topic1",
            "stage8Topic2",
            "stage8Topic3",
            "stage8Topic4",
        ],
        outcomes: [
            "stage8Outcome1",
            "stage8Outcome2",
            "stage8Outcome3",
            "stage8Outcome4",
        ],
    },
];

export default curriculumData;