// components/data/learningStepsData.ts

export interface LearningStep {
    id: number;
    title: string;
    subtitle: string;
    desc: string;
    accent: string;
    label: string;
    tags: {
        label: string;
        icon: string;
        bg: string;
        text: string;
    }[];
}

const learningStepsData: LearningStep[] = [
    {
        id: 1,
        title: "step1Title",
        subtitle: "step1Subtitle",
        desc: "step1Desc",
        accent: "#1B4332",
        label: "STEP ONE",
        tags: [
            { label: "Google Meet", icon: "🎥", bg: "bg-emerald-50", text: "text-emerald-700" },
            { label: "বিনামূল্যে", icon: "✅", bg: "bg-green-50", text: "text-green-700" },
            { label: "যেকোনো সময়", icon: "🕐", bg: "bg-teal-50", text: "text-teal-700" },
            { label: "সব বয়স", icon: "👨‍👩‍👧", bg: "bg-emerald-50", text: "text-emerald-700" },
        ],
    },
    {
        id: 2,
        title: "step2Title",
        subtitle: "step2Subtitle",
        desc: "step2Desc",
        accent: "#D4AF37",
        label: "STEP TWO",
        tags: [
            { label: "Timezone Auto", icon: "🌍", bg: "bg-yellow-50", text: "text-yellow-700" },
            { label: "30-60 মিনিট", icon: "⏱️", bg: "bg-amber-50", text: "text-amber-700" },
            { label: "সাপ্তাহিক", icon: "📅", bg: "bg-yellow-50", text: "text-yellow-700" },
            { label: "রিশিডিউল", icon: "🔄", bg: "bg-amber-50", text: "text-amber-700" },
        ],
    },
    {
        id: 3,
        title: "step3Title",
        subtitle: "step3Subtitle",
        desc: "step3Desc",
        accent: "#2D6A4F",
        label: "STEP THREE",
        tags: [
            { label: "Google Meet", icon: "🎥", bg: "bg-emerald-50", text: "text-emerald-700" },
            { label: "Zoom", icon: "💻", bg: "bg-teal-50", text: "text-teal-700" },
            { label: "লাইভ ফিডব্যাক", icon: "🎯", bg: "bg-green-50", text: "text-green-700" },
            { label: "রেকর্ডিং", icon: "📹", bg: "bg-emerald-50", text: "text-emerald-700" },
        ],
    },
    {
        id: 4,
        title: "step4Title",
        subtitle: "step4Subtitle",
        desc: "step4Desc",
        accent: "#40916C",
        label: "STEP FOUR",
        tags: [
            { label: "Dashboard", icon: "📊", bg: "bg-emerald-50", text: "text-emerald-700" },
            { label: "Teacher Notes", icon: "📝", bg: "bg-teal-50", text: "text-teal-700" },
            { label: "Homework", icon: "📚", bg: "bg-green-50", text: "text-green-700" },
            { label: "Certificate", icon: "🏆", bg: "bg-emerald-50", text: "text-emerald-700" },
        ],
    },
];

export default learningStepsData;