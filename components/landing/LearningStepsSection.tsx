"use client";

// components/landing/LearningStepsSection.tsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import learningStepsData from "../data/learningStepsData";

export default function LearningStepsSection() {
    const t = useTranslations("learning");
    const [activeStep, setActiveStep] = useState(0);
    const current = learningStepsData[activeStep];

    return (
        <section
            className="w-full py-20 px-4 overflow-hidden"
            style={{ backgroundColor: "#FDFBF7" }}
        >
            {/* Islamic pattern overlay */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Cg fill='none' stroke='%231B4332' stroke-width='0.5' opacity='0.04'%3E%3Cpolygon points='30,2 58,16 58,44 30,58 2,44 2,16'/%3E%3Cpolygon points='30,10 50,20 50,40 30,50 10,40 10,20'/%3E%3C/g%3E%3C/svg%3E")`,
                    backgroundRepeat: "repeat",
                }}
            />

            <div className="max-w-6xl mx-auto relative">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-14"
                >
                    {/* Gold divider line */}
                    <div className="flex items-center justify-center gap-4 mb-6">
                        <div
                            className="h-px flex-1 max-w-24"
                            style={{ backgroundColor: "#D4AF37" }}
                        />
                        <span
                            className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full border"
                            style={{
                                color: "#D4AF37",
                                borderColor: "#D4AF37",
                                backgroundColor: "#D4AF3711",
                            }}
                        >
                            {t("badge")}
                        </span>
                        <div
                            className="h-px flex-1 max-w-24"
                            style={{ backgroundColor: "#D4AF37" }}
                        />
                    </div>

                    <h2
                        className="text-3xl md:text-4xl font-black mb-4"
                        style={{ color: "#1B4332", fontFamily: "Inter, sans-serif" }}
                    >
                        {t("title")}{" "}
                        <motion.span
                            style={{ color: "#D4AF37" }}
                            animate={{
                                textShadow: [
                                    "0 0 0px #D4AF37",
                                    "0 0 20px #D4AF3788",
                                    "0 0 0px #D4AF37",
                                ],
                            }}
                            transition={{ duration: 3, repeat: Infinity }}
                        >
                            {t("titleHighlight")}
                        </motion.span>
                    </h2>
                    <p
                        className="text-base max-w-xl mx-auto"
                        style={{ color: "#4A7C59" }}
                    >
                        {t("subtitle")}
                    </p>
                </motion.div>

                {/* Desktop Layout */}
                <div className="hidden md:flex gap-8 items-start">
                    {/* Left: Steps list */}
                    <div className="w-1/3 flex flex-col gap-3">
                        {learningStepsData.map((step, i) => (
                            <motion.button
                                key={step.id}
                                onClick={() => setActiveStep(i)}
                                whileHover={{ x: 4 }}
                                whileTap={{ scale: 0.98 }}
                                className="text-left p-4 rounded-2xl border-2 transition-all duration-300 cursor-pointer"
                                style={{
                                    borderColor:
                                        activeStep === i ? current.accent : "#E5E7EB",
                                    backgroundColor:
                                        activeStep === i ? current.accent + "11" : "#FFFFFF",
                                    boxShadow:
                                        activeStep === i
                                            ? `0 4px 20px ${current.accent}22`
                                            : "none",
                                }}
                            >
                                <div className="flex items-center gap-3">
                                    <div
                                        className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-black text-sm shrink-0"
                                        style={{
                                            backgroundColor:
                                                activeStep === i ? step.accent : "#9CA3AF",
                                        }}
                                    >
                                        {step.id}
                                    </div>
                                    <div>
                                        <div
                                            className="font-bold text-sm"
                                            style={{
                                                color: activeStep === i ? step.accent : "#374151",
                                            }}
                                        >
                                            {t(step.title as any)}
                                        </div>
                                        <div className="text-xs text-gray-500">{t(step.subtitle as any)}</div>
                                    </div>
                                </div>
                            </motion.button>
                        ))}
                    </div>

                    {/* Right: Active step detail */}
                    <div className="w-2/3">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={current.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.35 }}
                                className="rounded-3xl p-8 border-2"
                                style={{
                                    borderColor: current.accent + "44",
                                    backgroundColor: "#FFFFFF",
                                    boxShadow: `0 8px 40px ${current.accent}15`,
                                }}
                            >
                                {/* Step badge */}
                                <motion.span
                                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest mb-4 border"
                                    style={{
                                        color: current.accent,
                                        borderColor: current.accent + "44",
                                        backgroundColor: current.accent + "11",
                                    }}
                                    animate={{
                                        boxShadow: [
                                            `0 0 0px ${current.accent}00`,
                                            `0 0 12px ${current.accent}44`,
                                            `0 0 0px ${current.accent}00`,
                                        ],
                                    }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                >
                                    {current.label}
                                </motion.span>

                                <h3
                                    className="text-3xl font-black mb-2"
                                    style={{ color: "#1B4332" }}
                                >
                                    {t(current.title as any)}
                                </h3>
                                <p className="text-sm text-gray-500 mb-2">{t(current.subtitle as any)}</p>
                                <p className="text-gray-600 mb-6 leading-relaxed">
                                    {t(current.desc as any)}
                                </p>

                                {/* Tags */}
                                <div className="flex flex-wrap gap-3 mb-8">
                                    {current.tags.map((tag, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, scale: 0.8, y: 10 }}
                                            animate={{ opacity: 1, scale: 1, y: 0 }}
                                            transition={{
                                                delay: i * 0.08,
                                                type: "spring",
                                                stiffness: 200,
                                            }}
                                            whileHover={{ y: -3, scale: 1.05 }}
                                            className={`flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 ${tag.bg} ${tag.text} text-sm font-bold`}
                                        >
                                            <span>{tag.icon}</span>
                                            {tag.label}
                                        </motion.div>
                                    ))}
                                </div>

                                {/* Progress dots */}
                                <div className="flex gap-2">
                                    {learningStepsData.map((_, i) => (
                                        <motion.button
                                            key={i}
                                            onClick={() => setActiveStep(i)}
                                            whileHover={{ scale: 1.3 }}
                                            whileTap={{ scale: 0.9 }}
                                            className="rounded-full transition-all duration-300 cursor-pointer"
                                            style={{
                                                width: activeStep === i ? 24 : 8,
                                                height: 8,
                                                backgroundColor:
                                                    activeStep === i ? current.accent : "#D1D5DB",
                                            }}
                                        />
                                    ))}
                                </div>
                            </motion.div>
                        </AnimatePresence>

                        {/* Prev/Next */}
                        <div className="flex gap-3 justify-end mt-4">
                            <motion.button
                                onClick={() => setActiveStep((p) => Math.max(0, p - 1))}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                disabled={activeStep === 0}
                                className="w-10 h-10 rounded-full border-2 flex items-center justify-center font-black text-lg transition-all cursor-pointer disabled:opacity-30"
                                style={{ borderColor: current.accent, color: current.accent }}
                            >
                                ‹
                            </motion.button>
                            <motion.button
                                onClick={() =>
                                    setActiveStep((p) =>
                                        Math.min(learningStepsData.length - 1, p + 1)
                                    )
                                }
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                disabled={activeStep === learningStepsData.length - 1}
                                className="w-10 h-10 rounded-full flex items-center justify-center font-black text-lg text-white transition-all cursor-pointer disabled:opacity-30"
                                style={{ backgroundColor: current.accent }}
                            >
                                ›
                            </motion.button>
                        </div>
                    </div>
                </div>

                {/* Mobile Layout */}
                <div className="md:hidden flex flex-col gap-4">
                    {learningStepsData.map((step, i) => (
                        <motion.div
                            key={step.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ delay: i * 0.1 }}
                            onClick={() => setActiveStep(activeStep === i ? -1 : i)}
                            className="rounded-2xl border-2 border-gray-200 border-l-4 overflow-hidden cursor-pointer"
                            style={{
                                borderLeftColor: step.accent,
                                backgroundColor: "#FFFFFF",
                            }}
                        >
                            {/* Header */}
                            <div className="flex items-center gap-3 p-4">
                                <div
                                    className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-black text-sm shrink-0"
                                    style={{ backgroundColor: step.accent }}
                                >
                                    {step.id}
                                </div>
                                <div className="flex-1">
                                    <div
                                        className="font-black text-base"
                                        style={{ color: "#1B4332" }}
                                    >
                                        {t(step.title as any)}
                                    </div>
                                    <div className="text-xs text-gray-500">{t(step.subtitle as any)}</div>
                                </div>
                                <motion.span
                                    animate={{ rotate: activeStep === i ? 180 : 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="text-gray-400 text-lg"
                                >
                                    ↓
                                </motion.span>
                            </div>

                            {/* Expandable */}
                            <AnimatePresence>
                                {activeStep === i && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="px-4 pb-4">
                                            <p className="text-gray-600 text-sm mb-3 leading-relaxed">
                                                {t(step.desc as any)}
                                            </p>
                                            <div className="flex flex-wrap gap-2">
                                                {step.tags.map((tag, ti) => (
                                                    <span
                                                        key={ti}
                                                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold border border-gray-200 ${tag.bg} ${tag.text}`}
                                                    >
                                                        <span>{tag.icon}</span>
                                                        {tag.label}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>

                {/* Bottom CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="text-center mt-12"
                >
                    <a
                        href="/free-trial"
                        className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl text-white font-black text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                        style={{
                            backgroundColor: "#D4AF37",
                            boxShadow: "0 8px 30px #D4AF3744",
                        }}
                    >
                        ✨ {t("ctaButton")}
                    </a>
                    <p className="text-sm text-gray-500 mt-3">
                        {t("ctaNote")}
                    </p>
                </motion.div>
            </div>
        </section>
    );
}