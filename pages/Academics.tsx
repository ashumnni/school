
import React from 'react';
import { DEPARTMENTS } from '../constants';

export const Academics: React.FC = () => {
  return (
    <div className="py-12 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="mb-16 text-center max-w-3xl mx-auto">
          <h1 className="text-5xl font-bold text-slate-900 mb-6">Our Academic Philosophy</h1>
          <p className="text-lg text-slate-600">
            At Lumina Academy, we believe that education should be holistic. Our curriculum is designed to push boundaries and encourage students to find connections between different fields of study.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-12">
          {DEPARTMENTS.map((dept, idx) => (
            <div 
              key={dept.id} 
              className={`bg-white rounded-3xl overflow-hidden shadow-sm flex flex-col ${idx % 2 !== 0 ? 'md:flex-row-reverse' : 'md:flex-row'}`}
            >
              <div className="md:w-1/2">
                <img 
                  src={`https://picsum.photos/seed/${dept.id}/800/600`} 
                  alt={dept.name} 
                  className="w-full h-full object-cover min-h-[300px]"
                />
              </div>
              <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                <h2 className="text-3xl font-bold text-slate-900 mb-4">{dept.name}</h2>
                <p className="text-slate-600 mb-6 leading-relaxed">{dept.description}</p>
                <div className="mb-6">
                  <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">Core Courses</h4>
                  <div className="flex flex-wrap gap-2">
                    {dept.courses.map((course, i) => (
                      <span key={i} className="px-3 py-1 bg-slate-100 text-slate-700 text-xs font-medium rounded-full">
                        {course}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="pt-6 border-t border-slate-100">
                  <span className="text-sm text-slate-500">Department Head:</span>
                  <span className="ml-2 font-bold text-slate-800">{dept.head}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <section className="mt-24 bg-emerald-600 rounded-3xl p-12 text-white text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to start your journey?</h2>
          <p className="text-emerald-100 mb-8 max-w-2xl mx-auto">
            Our admissions office is ready to help you navigate the process of joining the Lumina community.
          </p>
          <button className="px-8 py-3 bg-white text-emerald-600 font-bold rounded-lg hover:bg-emerald-50 transition-colors shadow-xl">
            Download Prospectus
          </button>
        </section>
      </div>
    </div>
  );
};
