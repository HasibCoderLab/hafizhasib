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
        title: "Arabic Alphabet",
        subtitle: "হরফ চেনা ও উচ্চারণ",
        subject: "Nazra",
        accent: "#1B4332",
        color: "from-[#1B4332] to-[#2D6A4F]",
        topics: [
            "২৯টি আরবি হরফ",
            "হরফের আকৃতি",
            "মাখরাজ (উচ্চারণস্থান)",
            "হরফ জোড়া লাগানো",
        ],
        outcomes: [
            "সকল হরফ চিনতে পারবে",
            "সঠিক উচ্চারণ করতে পারবে",
            "শব্দ পড়তে পারবে",
            "✅ স্বাধীনভাবে পড়া শুরু করতে পারবে",
        ],
    },
    {
        id: 2,
        title: "Harakat & Vowels",
        subtitle: "হরকত ও স্বরচিহ্ন",
        subject: "Nazra",
        accent: "#2D6A4F",
        color: "from-[#2D6A4F] to-[#40916C]",
        topics: [
            "ফাতহা, কাসরা, দাম্মা",
            "তানভিন",
            "সুকুন ও শাদ্দাহ",
            "মাদ্দ (টানা স্বর)",
        ],
        outcomes: [
            "হরকত দিয়ে পড়তে পারবে",
            "তানভিন চিনবে",
            "মাদ্দ সহ পড়তে পারবে",
            "✅ কুরআনের শব্দ পড়তে পারবে",
        ],
    },
    {
        id: 3,
        title: "Basic Tajweed",
        subtitle: "তাজবিদের মূল নিয়ম",
        subject: "Tajweed",
        accent: "#D4AF37",
        color: "from-[#D4AF37] to-[#B8860B]",
        topics: [
            "নূন সাকিন ও তানভিন",
            "ইযহার, ইদগাম",
            "ইকলাব, ইখফা",
            "মিম সাকিনের নিয়ম",
        ],
        outcomes: [
            "নূন সাকিনের ৪ নিয়ম জানবে",
            "মিম সাকিনের নিয়ম জানবে",
            "তাজবিদ সহ পড়তে পারবে",
            "✅ শুদ্ধভাবে কুরআন তিলাওয়াত করতে পারবে",
        ],
    },
    {
        id: 4,
        title: "Advanced Tajweed",
        subtitle: "উন্নত তাজবিদ নিয়ম",
        subject: "Tajweed",
        accent: "#B8860B",
        color: "from-[#B8860B] to-[#8B6914]",
        topics: [
            "মাদ্দের প্রকারভেদ",
            "ওয়াকফ ও ইবতিদা",
            "লাম শামসিয়া ও কামারিয়া",
            "সিফাতুল হুরুফ",
        ],
        outcomes: [
            "মাদ্দের সব প্রকার জানবে",
            "সঠিক জায়গায় থামতে পারবে",
            "লাম এর নিয়ম জানবে",
            "✅ Expert পর্যায়ে তিলাওয়াত করতে পারবে",
        ],
    },
    {
        id: 5,
        title: "Short Surahs",
        subtitle: "ছোট সূরা মুখস্থ",
        subject: "Hifz",
        accent: "#40916C",
        color: "from-[#40916C] to-[#52B788]",
        topics: [
            "সূরা ফাতিহা",
            "সূরা ইখলাস, ফালাক, নাস",
            "সূরা কাউসার, মাউন",
            "সূরা কুরাইশ, ফিল",
        ],
        outcomes: [
            "১০টি ছোট সূরা মুখস্থ হবে",
            "নামাজে পড়তে পারবে",
            "অর্থ জানবে",
            "✅ নামাজ সহিহ হবে",
        ],
    },
    {
        id: 6,
        title: "Medium Surahs",
        subtitle: "মাঝারি সূরা হিফয",
        subject: "Hifz",
        accent: "#52B788",
        color: "from-[#52B788] to-[#74C69D]",
        topics: [
            "সূরা ইয়াসিন (অংশ)",
            "সূরা মুলক",
            "সূরা ওয়াকিয়া (অংশ)",
            "সূরা রহমান (অংশ)",
        ],
        outcomes: [
            "৩টি মাঝারি সূরা মুখস্থ হবে",
            "তাজবিদ সহ পড়তে পারবে",
            "ফযিলত জানবে",
            "✅ রাতের নামাজে পড়তে পারবে",
        ],
    },
    {
        id: 7,
        title: "Daily Duas",
        subtitle: "দৈনন্দিন দোয়া",
        subject: "Dua",
        accent: "#74C69D",
        color: "from-[#74C69D] to-[#95D5B2]",
        topics: [
            "ঘুমের ও জাগার দোয়া",
            "খাওয়ার দোয়া",
            "বাথরুমের দোয়া",
            "যাতায়াতের দোয়া",
        ],
        outcomes: [
            "২০টি দৈনন্দিন দোয়া মুখস্থ হবে",
            "সঠিক সময়ে পড়তে পারবে",
            "অর্থ বুঝবে",
            "✅ জীবনে দোয়া অভ্যাস হবে",
        ],
    },
    {
        id: 8,
        title: "Namaz Duas",
        subtitle: "নামাজের দোয়া ও তাসবিহ",
        subject: "Dua",
        accent: "#95D5B2",
        color: "from-[#95D5B2] to-[#B7E4C7]",
        topics: [
            "সানা ও তাশাহহুদ",
            "দরুদ ইব্রাহিম",
            "রুকু ও সিজদার তাসবিহ",
            "দোয়া কুনুত",
        ],
        outcomes: [
            "নামাজের সব দোয়া জানবে",
            "খুশুর সাথে নামাজ পড়বে",
            "অর্থ বুঝে পড়বে",
            "✅ পরিপূর্ণ নামাজ আদায় করতে পারবে",
        ],
    },
];

export default curriculumData;