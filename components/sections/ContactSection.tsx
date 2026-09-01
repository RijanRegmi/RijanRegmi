'use client';

import React, { useState } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle2,
  AlertCircle,
  Instagram,
  Facebook,
  Github,
  Linkedin
} from 'lucide-react';
import XIcon from '@/components/icons/XIcon';
import { contactApi } from '@/lib/api/contact.api';

export default function ContactSection() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitStatus, setSubmitStatus] = useState<{
    loading: boolean;
    success?: boolean;
    message?: string;
  }>({ loading: false });

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) {
      setSubmitStatus({
        loading: false,
        success: false,
        message: 'Please fill in all required fields.',
      });
      return;
    }

    setSubmitStatus({ loading: true });
    try {
      const response = await contactApi.submitContact(formState);
      if (response.success) {
        setSubmitStatus({
          loading: false,
          success: true,
          message: 'Thank you! Your message has been sent successfully.',
        });
        setFormState({ name: '', email: '', subject: '', message: '' });
      } else {
        setSubmitStatus({
          loading: false,
          success: false,
          message: response.message || 'Something went wrong. Please try again.',
        });
      }
    } catch (err: any) {
      setSubmitStatus({
        loading: false,
        success: false,
        message: err.message || 'An unexpected error occurred. Please try again.',
      });
    }
  };

  return (
    <section id="contact" className="py-20 bg-white border-t border-slate-200/80 relative overflow-hidden w-full max-w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8 reveal-left delay-1">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#9333ea] font-bold">Contact</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 mt-2">
                Let&apos;s Work Together
              </h2>
              <p className="text-slate-600 text-sm mt-4 leading-relaxed">
                Have a project in mind, an inquiry about my services, or just want to connect? Send a message and I will get back to you as soon as possible.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200 shadow-sm hover:border-purple-300 transition-colors">
                <div className="p-3 rounded-lg bg-purple-100 text-[#9333ea] border border-purple-200">
                  <Mail size={20} />
                </div>
                <div>
                  <span className="text-xs text-slate-500 block">Email</span>
                  <a href="mailto:rijanregmi8@gmail.com" className="text-sm font-semibold text-slate-900 hover:text-[#9333ea] transition-colors">
                    rijanregmi8@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200 shadow-sm hover:border-purple-300 transition-colors">
                <div className="p-3 rounded-lg bg-purple-100 text-[#9333ea] border border-purple-200">
                  <Phone size={20} />
                </div>
                <div>
                  <span className="text-xs text-slate-500 block">Phone</span>
                  <a href="tel:+9779869061333" className="text-sm font-semibold text-slate-900 hover:text-[#9333ea] transition-colors">
                    + (977) 9869061333
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200 shadow-sm hover:border-purple-300 transition-colors">
                <div className="p-3 rounded-lg bg-purple-100 text-[#9333ea] border border-purple-200">
                  <MapPin size={20} />
                </div>
                <div>
                  <span className="text-xs text-slate-500 block">Location</span>
                  <span className="text-sm font-semibold text-slate-900">Nepal, Kathmandu</span>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <span className="text-xs font-bold text-slate-900 block mb-3 uppercase tracking-wider">Follow Me</span>
              <div className="flex items-center gap-3">
                <a
                  href="https://www.instagram.com/rijanregmi_"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white hover:bg-[#9333ea] text-slate-700 hover:text-white border border-slate-200/80 hover:border-purple-500 transition-all flex items-center justify-center shadow-md shadow-slate-200/60 hover:shadow-xl hover:shadow-purple-900/20 hover:scale-110 cursor-pointer"
                  aria-label="Instagram"
                >
                  <Instagram size={19} />
                </a>
                <a
                  href="https://www.linkedin.com/in/rijan-regmi-a720372b3"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white hover:bg-[#9333ea] text-slate-700 hover:text-white border border-slate-200/80 hover:border-purple-500 transition-all flex items-center justify-center shadow-md shadow-slate-200/60 hover:shadow-xl hover:shadow-purple-900/20 hover:scale-110 cursor-pointer"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={19} />
                </a>
                <a
                  href="https://github.com/RijanRegmi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white hover:bg-[#9333ea] text-slate-700 hover:text-white border border-slate-200/80 hover:border-purple-500 transition-all flex items-center justify-center shadow-md shadow-slate-200/60 hover:shadow-xl hover:shadow-purple-900/20 hover:scale-110 cursor-pointer"
                  aria-label="GitHub"
                >
                  <Github size={19} />
                </a>
                <a
                  href="https://x.com/rijanregmi_"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white hover:bg-[#9333ea] text-slate-700 hover:text-white border border-slate-200/80 hover:border-purple-500 transition-all flex items-center justify-center shadow-md shadow-slate-200/60 hover:shadow-xl hover:shadow-purple-900/20 hover:scale-110 cursor-pointer"
                  aria-label="X"
                >
                  <XIcon size={17} />
                </a>
                <a
                  href="https://www.facebook.com/rijan.regmi.946"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white hover:bg-[#9333ea] text-slate-700 hover:text-white border border-slate-200/80 hover:border-purple-500 transition-all flex items-center justify-center shadow-md shadow-slate-200/60 hover:shadow-xl hover:shadow-purple-900/20 hover:scale-110 cursor-pointer"
                  aria-label="Facebook"
                >
                  <Facebook size={19} />
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-5 sm:p-7 md:p-8 rounded-2xl sm:rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/50 reveal-right delay-2">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-5 sm:mb-6">Send a Message</h3>

            {submitStatus.message && (
              <div
                className={`p-4 rounded-xl sm:rounded-2xl mb-5 text-sm flex items-center gap-3 ${
                  submitStatus.success
                    ? 'bg-emerald-50 border border-emerald-300 text-emerald-800'
                    : 'bg-rose-50 border border-rose-300 text-rose-800'
                }`}
              >
                {submitStatus.success ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
                <span>{submitStatus.message}</span>
              </div>
            )}

            <form onSubmit={handleContactSubmit} className="space-y-4 sm:space-y-5">
              <div>
                <label htmlFor="name" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Your Name *
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  placeholder="John Doe"
                  className="w-full px-4 sm:px-5 py-3.5 sm:py-3.5 rounded-xl sm:rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-base sm:text-sm focus:outline-none focus:border-[#9333ea] focus:bg-white focus:ring-2 focus:ring-purple-500/20 transition-all"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Your Email *
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={formState.email}
                  onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                  placeholder="john@example.com"
                  className="w-full px-4 sm:px-5 py-3.5 sm:py-3.5 rounded-xl sm:rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-base sm:text-sm focus:outline-none focus:border-[#9333ea] focus:bg-white focus:ring-2 focus:ring-purple-500/20 transition-all"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Subject
                </label>
                <input
                  id="subject"
                  type="text"
                  value={formState.subject}
                  onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                  placeholder="Project Inquiry"
                  className="w-full px-4 sm:px-5 py-3.5 sm:py-3.5 rounded-xl sm:rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-base sm:text-sm focus:outline-none focus:border-[#9333ea] focus:bg-white focus:ring-2 focus:ring-purple-500/20 transition-all"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  rows={4}
                  required
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  placeholder="Tell me about your project..."
                  className="w-full px-4 sm:px-5 py-3.5 sm:py-4 rounded-xl sm:rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-base sm:text-sm focus:outline-none focus:border-[#9333ea] focus:bg-white focus:ring-2 focus:ring-purple-500/20 transition-all resize-none min-h-[120px] sm:min-h-[130px]"
                />
              </div>

              <button
                type="submit"
                disabled={submitStatus.loading}
                className="w-full py-4 sm:py-3.5 px-6 rounded-xl sm:rounded-2xl bg-gradient-to-r from-[#c026d3] via-[#9333ea] to-[#7c3aed] hover:from-[#a21caf] hover:to-[#6b21a8] text-white font-bold text-base sm:text-sm shadow-xl shadow-purple-900/25 transition-all flex items-center justify-center gap-2 disabled:opacity-50 hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
              >
                {submitStatus.loading ? (
                  <span>Sending message...</span>
                ) : (
                  <>
                    <Send size={18} />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
