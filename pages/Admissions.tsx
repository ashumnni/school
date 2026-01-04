
import React from 'react';
import { ADMISSIONS_FAQ } from '../constants';
import { AdmissionsAssistant } from '../components/AdmissionsAssistant';

const TimelineStep: React.FC<{ 
  number: string; 
  title: string; 
  description: string; 
  isLast?: boolean 
}> = ({ number, title, description, isLast }) => (
  <div className="relative flex gap-8 pb-12 group">
    {/* Vertical Line */}
    {!isLast && (
      <div className="absolute left-[23px] top-[48px] bottom-0 w-[2px] bg-emerald-100 group-hover:bg-emerald-200 transition-colors" />
    )}
    
    {/* Circle & Number */}
    <div className="relative z-10 flex-shrink-0 w-12 h-12 bg-emerald-600 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-[0_10px_20px_-5px_rgba(5,150,105,0.4)] group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
      {number}
    </div>

    {/* Content Card */}
    <div className="flex-grow pt-1">
      <div className="bg-white p-6 rounded-2xl border border-transparent group-hover:border-emerald-100 group-hover:bg-emerald-50/30 transition-all duration-300">
        <h3 className="text-xl font-bold mb-2 text-slate-900">{title}</h3>
        <p className="text-slate-600 text-sm leading-relaxed">{description}</p>
      </div>
    </div>
  </div>
);

export const Admissions: React.FC = () => {
  return (
    <div className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          <div className="space-y-12">
            <div>
              <h1 className="text-5xl font-bold text-slate-900 mb-8 leading-tight">
                Your Journey to <span className="text-emerald-600">Excellence</span> Starts Here
              </h1>
              <p className="text-lg text-slate-600 mb-12">
                We've designed our admissions process to be personal and transparent. Follow these steps to become part of the Lumina legacy.
              </p>
            </div>
            
            {/* Visual Timeline Component */}
            <div className="relative pr-4">
              <TimelineStep 
                number="1" 
                title="Inquiry & Campus Tour" 
                description="Begin your journey by visiting our beautiful Sunshine Valley campus. Meet our faculty and see our students in their natural learning environment during a private tour or open house."
              />
              <TimelineStep 
                number="2" 
                title="Application Submission" 
                description="Complete our comprehensive online application. This includes submitting transcripts, standardized test scores, and three teacher recommendations via our secure portal."
              />
              <TimelineStep 
                number="3" 
                title="Personal Interview" 
                description="We want to know the person behind the paper. Applicants meet with our admissions committee for a 30-minute conversational interview focused on their passions and goals."
              />
              <TimelineStep 
                number="4" 
                title="Enrollment & Welcome" 
                isLast={true}
                description="Once accepted, you'll receive your Lumina Welcome Package. Secure your spot by submitting the enrollment deposit and preparing for your orientation day!"
              />
            </div>

            <div className="bg-slate-50 p-8 md:p-12 rounded-3xl shadow-inner border border-slate-100 mt-16">
              <h2 className="text-2xl font-bold mb-8">Ready to Take the First Step?</h2>
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Parent First Name</label>
                    <input type="text" className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all" placeholder="John" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Parent Last Name</label>
                    <input type="text" className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all" placeholder="Doe" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Email Address</label>
                  <input type="email" className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all" placeholder="john@example.com" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Grade Level of Interest</label>
                  <select className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all cursor-pointer">
                    <option>Select Grade</option>
                    <option>Elementary (K-5)</option>
                    <option>Middle School (6-8)</option>
                    <option>High School (9-12)</option>
                  </select>
                </div>
                <button className="w-full py-4 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 transition-all shadow-[0_10px_20px_-5px_rgba(5,150,105,0.4)] active:scale-[0.98]">
                  Submit Inquiry
                </button>
              </form>
            </div>
          </div>

          <div className="lg:sticky lg:top-24 space-y-8">
            {/* AI Assistant Section */}
            <div className="mb-8 group">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <span className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center shadow-sm group-hover:rotate-12 transition-transform">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </span>
                AI Admissions Guide
              </h2>
              <p className="text-slate-500 text-sm mb-6">Ask our assistant about scholarships, deadlines, or curriculum specifics.</p>
              <AdmissionsAssistant />
            </div>

            <div className="p-8 bg-slate-900 rounded-3xl text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
                </svg>
              </div>
              <h4 className="font-bold text-xl mb-3">Visit us in person</h4>
              <p className="text-slate-400 text-sm mb-6 leading-relaxed">Experience the unique energy of Lumina Academy. Our campus ambassadors are ready to show you our state-of-the-art facilities.</p>
              <button className="bg-emerald-600 hover:bg-emerald-500 px-6 py-2 rounded-xl text-sm font-bold transition-colors">
                Book a Tour &rarr;
              </button>
            </div>
          </div>
        </div>

        <div className="mt-32">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Admissions FAQ</h2>
            <p className="text-slate-500">Find quick answers to the most common questions from prospective families.</p>
          </div>
          <div className="max-w-3xl mx-auto space-y-4">
            {ADMISSIONS_FAQ.map((faq, i) => (
              <details key={i} className="group p-6 bg-slate-50 rounded-2xl border border-slate-100 hover:border-emerald-200 transition-all cursor-pointer">
                <summary className="list-none flex justify-between items-center font-bold text-slate-800">
                  {faq.q}
                  <span className="text-emerald-500 group-open:rotate-180 transition-transform">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </summary>
                <p className="mt-4 text-slate-600 text-sm leading-relaxed">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
