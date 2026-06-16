import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, User, MessageSquare, Send, Terminal, ShieldAlert } from "lucide-react";

export default function ContactSection() {
    const [form, setForm] = useState({ name: "", email: "", message: "" });
    const [status, setStatus] = useState("idle"); // idle, submitting, success

    const handleSubmit = (e) => {
        e.preventDefault();
        setStatus("submitting");

        // Simulate telemetry uplink pipeline delay
        setTimeout(() => {
            setStatus("success");
            setForm({ name: "", email: "", message: "" });
        }, 1500);
    };

    return (
        <section
            id="contact"
            className="relative z-10 py-24 text-white select-none"
        >
            <div className="max-w-[1440px] mx-auto px-6 md:px-8">
                {/* Section Header */}
                <div className="flex flex-col mb-20">
                    <motion.span
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="text-[10px] font-black uppercase tracking-[0.5em] text-[#FF6100] mb-2"
                    >
                        COMMS UPLINK
                    </motion.span>
                    <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter text-white">
                        Connect <span className="text-[#FF6100]">System.</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">

                    {/* LEFT COLUMN: TECHNICAL INFO (4 Cols) */}
                    <div className="lg:col-span-5 space-y-10">
                        <div className="space-y-4">
                            <h3 className="text-2xl font-black uppercase tracking-tight text-white">
                                Initialize Direct Channel
                            </h3>
                            <p className="text-zinc-400 text-sm font-medium leading-relaxed max-w-sm">
                                Have questions regarding node deployment, sub-meter accuracy calibrations, or enterprise integration options? Submit a telemetry payload.
                            </p>
                        </div>

                        {/* Technical Meta Metrics */}
                        <div className="space-y-6 border-l-2 border-white/10 pl-6">
                            <div className="group flex items-center gap-4">
                                <div className="p-3 bg-white/5 rounded-xl border border-white/10 text-[#FF6100] group-hover:bg-[#FF6100] group-hover:text-white transition-all duration-300">
                                    <Terminal size={18} />
                                </div>
                                <div>
                                    <p className="text-[9px] font-black uppercase tracking-widest text-white/30">Core Network</p>
                                    <p className="text-sm font-bold text-zinc-300">noc@ambient.space</p>
                                </div>
                            </div>

                            <div className="group flex items-center gap-4">
                                <div className="p-3 bg-white/5 rounded-xl border border-white/10 text-[#FF6100] group-hover:bg-[#FF6100] group-hover:text-white transition-all duration-300">
                                    <ShieldAlert size={18} />
                                </div>
                                <div>
                                    <p className="text-[9px] font-black uppercase tracking-widest text-white/30">Response Threshold</p>
                                    <p className="text-sm font-bold text-zinc-300">&lt; 12 Hours Standard Latency</p>
                                </div>
                            </div>
                        </div>

                        {/* Micro Coordinates Watermark */}
                        <div className="hidden lg:block text-[10px] font-mono tracking-wider text-white/10 space-y-1">
                            <p>SYS_STATUS // ONLINE</p>
                            <p>SECURE_PORT // 443 TLS_1.3</p>
                            <p>LOC_REF // 30.0444° N, 31.2357° E</p>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: PREMIUM DARK-GLASS FORM (7 Cols) */}
                    <div className="lg:col-span-7 bg-white/5 backdrop-blur-md rounded-[2.5rem] p-8 md:p-12 border border-white/10 shadow-2xl shadow-black/50 relative overflow-hidden">

                        {status === "success" ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="h-[350px] flex flex-col items-center justify-center text-center space-y-4"
                            >
                                <div className="h-12 w-12 rounded-full bg-[#FF6100]/20 flex items-center justify-center text-[#FF6100] border border-[#FF6100]/30 animate-pulse">
                                    <Send size={20} />
                                </div>
                                <h4 className="text-xl font-black uppercase tracking-tight">Payload Dispatched</h4>
                                <p className="text-zinc-400 text-sm max-w-xs">
                                    Your message has bypassed atmospheric noise and is safely routing to our monitoring terminal.
                                </p>
                                <button
                                    onClick={() => setStatus("idle")}
                                    className="text-[10px] font-black uppercase tracking-widest text-[#FF6100] underline underline-offset-4 hover:text-white transition-colors"
                                >
                                    Transmit New Packet
                                </button>
                            </motion.div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">

                                {/* Input Name */}
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-white/40 flex items-center gap-2">
                                        <User size={12} className="text-[#FF6100]" /> Entity Identifier
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        disabled={status === "submitting"}
                                        placeholder="YOUR FULL NAME"
                                        value={form.name}
                                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 focus:border-[#FF6100] rounded-xl px-5 py-4 text-sm font-medium tracking-wide text-white outline-none placeholder-white/10 focus:ring-1 focus:ring-[#FF6100]/20 transition-all duration-300 disabled:opacity-50"
                                    />
                                </div>

                                {/* Input Email */}
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-white/40 flex items-center gap-2">
                                        <Mail size={12} className="text-[#FF6100]" /> Routing Address
                                    </label>
                                    <input
                                        type="email"
                                        required
                                        disabled={status === "submitting"}
                                        placeholder="NAME@DOMAIN.COM"
                                        value={form.email}
                                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 focus:border-[#FF6100] rounded-xl px-5 py-4 text-sm font-medium tracking-wide text-white outline-none placeholder-white/10 focus:ring-1 focus:ring-[#FF6100]/20 transition-all duration-300 disabled:opacity-50"
                                    />
                                </div>

                                {/* Input Message */}
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-white/40 flex items-center gap-2">
                                        <MessageSquare size={12} className="text-[#FF6100]" /> Transmission Data
                                    </label>
                                    <textarea
                                        rows={4}
                                        required
                                        disabled={status === "submitting"}
                                        placeholder="ENTER COMMUNIQUE BRIEFING..."
                                        value={form.message}
                                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 focus:border-[#FF6100] rounded-xl px-5 py-4 text-sm font-medium tracking-wide text-white outline-none placeholder-white/10 focus:ring-1 focus:ring-[#FF6100]/20 transition-all duration-300 resize-none disabled:opacity-50"
                                    />
                                </div>

                                {/* Action CTA Button */}
                                <div className="pt-4">
                                    <motion.button
                                        type="submit"
                                        disabled={status === "submitting"}
                                        whileHover={{ scale: status === "submitting" ? 1 : 1.02 }}
                                        whileTap={{ scale: status === "submitting" ? 1 : 0.98 }}
                                        className="w-full py-4 bg-white text-black text-[10px] font-black uppercase tracking-widest rounded-full hover:bg-[#FF6100] hover:text-white transition-colors duration-300 shadow-xl disabled:opacity-50 flex items-center justify-center gap-2"
                                    >
                                        {status === "submitting" ? (
                                            <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                                        ) : (
                                            <>
                                                Broadcast Comms <Send size={12} />
                                            </>
                                        )}
                                    </motion.button>
                                </div>

                            </form>
                        )}
                    </div>

                </div>
            </div>
        </section>
    );
}