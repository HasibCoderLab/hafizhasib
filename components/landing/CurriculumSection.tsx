"use client";

// components/landing/CurriculumSection.tsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import curriculumData from "../data/curriculumData";

export default function CurriculumSection() {
    const t = useTranslations("curriculum");
    const [activeMonth, setActiveMonth] = useState(0);
    const current = curriculumData[activeMonth];

    const subjectColors: Record<string, string> = {
        Nazra: "bg-emerald-100 text-emerald-700",
        Tajweed: "bg-yellow-100 text-yellow-700",
        Hifz: "bg-teal-100 text-teal-700",
        Dua: "bg-green-100 text-green-700",
    };

    return (
        <section
            className="w-full py-20 px-4 overflow-hidden relative"
            style={{ backgroundColor: "#F0F4F0" }}
        >
            {/* Background grid */}
            <div
                className="absolute inset-0 pointer-events-none opacity-5"
                style={{
                    backgroundImage: `linear-gradient(#1B4332 1px, transparent 1px), linear-gradient(90deg, #1B4332 1px, transparent 1px)`,
                    backgroundSize: "40px 40px",
                }}
            />

            <div className="max-w-6xl mx-auto relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <div className="flex items-center justify-center gap-4 mb-6">
                        <div className="h-px flex-1 max-w-24" style={{ backgroundColor: "#D4AF37" }} />
                        <span
                            className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full border"
                            style={{ color: "#D4AF37", borderColor: "#D4AF37", backgroundColor: "#D4AF3711" }}
                        >
                            {t("badge")}
                        </span>
                        <div className="h-px flex-1 max-w-24" style={{ backgroundColor: "#D4AF37" }} />
                    </div>

                    <h2 className="text-3xl md:text-4xl font-black mb-4" style={{ color: "#1B4332" }}>
                        {t("title")}{" "}
                        <motion.span
                            style={{ color: "#D4AF37" }}
                            animate={{ textShadow: ["0 0 0px #D4AF37", "0 0 20px #D4AF3788", "0 0 0px #D4AF37"] }}
                            transition={{ duration: 3, repeat: Infinity }}
                        >
                            {t("titleHighlight")}
                        </motion.span>
                    </h2>
                    <p className="text-base max-w-xl mx-auto" style={{ color: "#4A7C59" }}>
                        {t("subtitle")}
                    </p>
                </motion.div>

                {/* Month/Stage tabs */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex flex-wrap justify-center gap-2 mb-10"
                >
                    {curriculumData.map((item, i) => (
                        <motion.button
                            key={item.id}
                            onClick={() => setActiveMonth(i)}
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            className="relative px-4 py-2 rounded-full text-sm font-bold transition-all duration-300 cursor-pointer overflow-hidden"
                            style={{
                                backgroundColor: activeMonth === i ? item.accent : "#FFFFFF",
                                color: activeMonth === i ? "#FFFFFF" : "#6B7280",
                                boxShadow: activeMonth === i ? `0 4px 20px ${item.accent}44` : "0 1px 4px #00000011",
                                border: activeMonth === i ? "none" : "1px solid #E5E7EB",
                            }}
                        >
                            {activeMonth === i && (
                                <motion.span
                                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                                    animate={{ x: ["-100%", "200%"] }}
                                    transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 0.5 }}
                                />
                            )}
                            Stage {item.id}
                        </motion.button>
                    ))}
                </motion.div>

                {/* Stage title bar */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={`title-${current.id}`}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.3 }}
                        className="flex justify-center mb-8"
                    >
                        <div
                            className="relative px-6 py-2 rounded-full text-white font-bold text-sm shadow-lg overflow-hidden"
                            style={{
                                background: `linear-gradient(135deg, ${current.accent}, ${current.accent}bb)`,
                                boxShadow: `0 4px 20px ${current.accent}44`,
                            }}
                        >
                            <motion.span
                                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent"
                                animate={{ x: ["-100%", "200%"] }}
                                transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 1 }}
                            />
                            Stage {current.id}: {current.title} — {current.subtitle}
                            <span
                                className="ml-3 text-xs px-2 py-0.5 rounded-full font-black"
                                style={{ backgroundColor: "rgba(255,255,255,0.25)" }}
                            >
                                {current.subject}
                            </span>
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* Desktop 3-column */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={`content-${current.id}`}
                        initial={{ opacity: 0, scale: 0.97 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.97 }}
                        transition={{ duration: 0.4 }}
                        className="hidden md:grid grid-cols-3 gap-6 items-start"
                    >
                        {/* Left: Topics */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.4 }}
                            className="bg-white rounded-3xl border border-gray-100 shadow-xl p-6"
                        >
                            <h3 className="text-xs text-gray-400 uppercase tracking-widest mb-4 pb-2 border-b border-gray-100 flex items-center gap-2">
                                {t("topicsLabel")}{" "}
                                <span
                                    className="font-black text-sm px-2 py-0.5 rounded-md"
                                    style={{ color: current.accent, backgroundColor: current.accent + "15" }}
                                >
                                    {t("topicsHighlight")}
                                </span>
                            </h3>
                            <div className="flex flex-col gap-2">
                                {current.topics.map((topic, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: -15 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.08 }}
                                        whileHover={{ x: 4 }}
                                        className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-semibold text-gray-700 border border-gray-100 bg-gray-50 cursor-default"
                                    >
                                        <span
                                            className="w-2 h-2 rounded-full shrink-0"
                                            style={{ backgroundColor: current.accent }}
                                        />
                                        {topic}
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Center: Stage card */}
                        <div className="flex items-center justify-center">
                            <motion.div
                                key={`card-${current.id}`}
                                initial={{ scale: 0.5, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                                className="relative"
                            >
                                {/* Glow rings */}
                                <motion.div
                                    className="absolute -inset-4 rounded-[2.5rem] border-2 opacity-30"
                                    style={{ borderColor: current.accent }}
                                    animate={{ scale: [1, 1.08, 1], opacity: [0.2, 0.5, 0.2] }}
                                    transition={{ duration: 2.5, repeat: Infinity }}
                                />
                                <motion.div
                                    className="absolute inset-0 rounded-3xl blur-2xl"
                                    style={{ backgroundColor: current.accent }}
                                    animate={{ opacity: [0.3, 0.6, 0.3] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                />

                                {/* Card */}
                                <div
                                    className="relative w-40 h-40 rounded-3xl flex flex-col items-center justify-center shadow-2xl border border-white/20 text-white"
                                    style={{ background: `linear-gradient(135deg, ${current.accent}, ${current.accent}bb)` }}
                                >
                                    <motion.div
                                        className="absolute inset-0 rounded-3xl bg-gradient-to-r from-transparent via-white/20 to-transparent"
                                        animate={{ x: ["-100%", "200%"] }}
                                        transition={{ duration: 2, repeat: Infinity, repeatDelay: 1.5 }}
                                    />

                                    {/* Arabic number decoration */}
                                    <motion.div
                                        className="text-5xl font-black opacity-20 absolute"
                                        style={{ fontFamily: "Amiri, serif" }}
                                        animate={{ scale: [1, 1.05, 1] }}
                                        transition={{ duration: 3, repeat: Infinity }}
                                    >
                                        ٣
                                    </motion.div>

                                    <span className="text-white/80 font-bold text-xs uppercase tracking-widest z-10">
                                        Stage
                                    </span>
                                    <motion.span
                                        className="text-white font-black text-5xl leading-none z-10"
                                        animate={{ scale: [1, 1.05, 1] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                    >
                                        {current.id < 10 ? `0${current.id}` : current.id}
                                    </motion.span>
                                    <span
                                        className="text-xs font-black px-2 py-0.5 rounded-full mt-1 z-10"
                                        style={{ backgroundColor: "rgba(255,255,255,0.25)" }}
                                    >
                                        {current.subject}
                                    </span>
                                </div>
                            </motion.div>
                        </div>

                        {/* Right: Outcomes */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.4 }}
                            className="bg-white rounded-3xl border border-gray-100 shadow-xl p-6"
                        >
                            <h3 className="text-xs text-gray-400 uppercase tracking-widest mb-4 pb-2 border-b border-gray-100">
                                {t("outcomesLabel")}{" "}
                                <span className="font-black text-sm text-red-500 bg-red-50 px-2 py-0.5 rounded-md">
                                    {t("outcomesHighlight")}
                                </span>
                            </h3>
                            <ul className="flex flex-col gap-2.5">
                                {current.outcomes.map((outcome, i) => {
                                    const isLast = i === current.outcomes.length - 1;
                                    return (
                                        <motion.li
                                            key={i}
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: i * 0.1 }}
                                            whileHover={{ x: -3 }}
                                            className={`flex items-start gap-2.5 text-sm px-4 py-3 rounded-xl border transition-all ${isLast
                                                    ? "border-emerald-300 bg-emerald-50 text-emerald-700 font-semibold shadow-sm"
                                                    : "border-gray-100 bg-gray-50 text-gray-600"
                                                }`}
                                        >
                                            <span className="mt-0.5 shrink-0 text-base">
                                                {isLast ? (
                                                    <motion.span
                                                        animate={{ scale: [1, 1.2, 1] }}
                                                        transition={{ duration: 2, repeat: Infinity }}
                                                    >
                                                        ✅
                                                    </motion.span>
                                                ) : (
                                                    <span style={{ color: current.accent }}>◆</span>
                                                )}
                                            </span>
                                            {outcome}
                                        </motion.li>
                                    );
                                })}
                            </ul>
                        </motion.div>
                    </motion.div>
                </AnimatePresence>

                {/* Mobile Layout */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={`mobile-${current.id}`}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="md:hidden flex flex-col gap-4"
                    >
                        {/* Center card */}
                        <div className="flex justify-center py-2">
                            <div
                                className="w-28 h-28 rounded-3xl flex flex-col items-center justify-center text-white shadow-2xl"
                                style={{ background: `linear-gradient(135deg, ${current.accent}, ${current.accent}bb)` }}
                            >
                                <span className="text-white/80 text-[10px] font-bold uppercase tracking-widest">Stage</span>
                                <span className="text-white font-black text-4xl leading-none">
                                    {current.id < 10 ? `0${current.id}` : current.id}
                                </span>
                                <span className="text-[10px] font-black mt-1 px-2 py-0.5 rounded-full" style={{ backgroundColor: "rgba(255,255,255,0.25)" }}>
                                    {current.subject}
                                </span>
                            </div>
                        </div>

                        {/* Topics */}
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-md p-5">
                            <h4 className="text-xs text-gray-400 uppercase tracking-widest mb-3 font-bold">{t("mobileTopicsLabel")}</h4>
                            <div className="flex flex-wrap gap-2">
                                {current.topics.map((topic, i) => (
                                    <span
                                        key={i}
                                        className="text-xs px-3 py-1.5 rounded-xl font-semibold border border-gray-200 bg-gray-50 text-gray-700"
                                    >
                                        {topic}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Outcomes */}
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-md p-5">
                            <h4 className="text-xs text-gray-400 uppercase tracking-widest mb-3 font-bold">{t("mobileOutcomesLabel")}</h4>
                            <ul className="flex flex-col gap-2">
                                {current.outcomes.map((outcome, i) => {
                                    const isLast = i === current.outcomes.length - 1;
                                    return (
                                        <li
                                            key={i}
                                            className={`flex items-start gap-2 text-sm px-3 py-2 rounded-xl ${isLast
                                                    ? "bg-emerald-50 text-emerald-700 font-semibold border border-emerald-200"
                                                    : "text-gray-600"
                                                }`}
                                        >
                                            <span>{isLast ? "✅" : "◆"}</span>
                                            {outcome}
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* Progress bar */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-12"
                >
                    <div className="flex justify-between items-center text-xs mb-3">
                        <span className="text-gray-500 font-bold">Stage 01</span>
                        <span
                            className="px-3 py-1 rounded-full text-white font-bold text-xs"
                            style={{
                                backgroundColor: current.accent,
                                boxShadow: `0 2px 10px ${current.accent}44`,
                            }}
                        >
                            {Math.round(((activeMonth + 1) / curriculumData.length) * 100)}% {t("completed")}
                        </span>
                        <span className="text-gray-500 font-bold">Stage {curriculumData.length}</span>
                    </div>
                    <div className="relative w-full h-4 bg-white rounded-full p-0.5 shadow-inner border border-gray-200">
                        <motion.div
                            className="h-full rounded-full"
                            style={{
                                background: `linear-gradient(90deg, ${current.accent}, ${current.accent}bb)`,
                                boxShadow: `0 0 15px ${current.accent}66`,
                            }}
                            animate={{ width: `${((activeMonth + 1) / curriculumData.length) * 100}%` }}
                            transition={{ duration: 0.6, ease: "circOut" }}
                        >
                            <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent rounded-full" />
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}