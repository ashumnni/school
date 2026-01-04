
import React, { useState } from 'react';
import { MOCK_RESULTS } from '../constants';
import { StudentResult } from '../types';

export const Results: React.FC = () => {
  const [searchId, setSearchId] = useState('');
  const [result, setResult] = useState<StudentResult | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  const validateId = (id: string) => {
    const formatRegex = /^LUM-\d{4}-\d{3}$/i;
    if (!formatRegex.test(id)) {
      return "Invalid ID Format. Please use LUM-YYYY-NNN (e.g., LUM-2023-892).";
    }
    return null;
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);
    setHasSearched(false);
    setResult(null);

    const trimmedId = searchId.trim();
    if (!trimmedId) {
      setValidationError("Please enter a Student ID.");
      return;
    }

    const error = validateId(trimmedId);
    if (error) {
      setValidationError(error);
      return;
    }

    setIsSearching(true);
    // Simulate API delay
    setTimeout(() => {
      const found = MOCK_RESULTS.find(r => r.studentId.toUpperCase() === trimmedId.toUpperCase());
      setResult(found || null);
      setHasSearched(true);
      setIsSearching(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header / Hero */}
      <section className="bg-emerald-600 py-16 text-white text-center">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Academic Results Portal</h1>
          <p className="text-emerald-100 max-w-2xl mx-auto mb-10">
            Verify academic transcripts and terminal reports. Please enter the unique Student ID provided by the registrar.
          </p>

          <div className="max-w-xl mx-auto">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                value={searchId}
                onChange={(e) => {
                  setSearchId(e.target.value);
                  if (validationError) setValidationError(null);
                }}
                placeholder="e.g. LUM-2023-892"
                className={`w-full px-6 py-4 bg-white rounded-2xl text-slate-900 shadow-2xl outline-none pr-16 transition-all font-medium uppercase tracking-wider border-2 ${
                  validationError ? 'border-red-400 focus:ring-red-400/50' : 'border-transparent focus:ring-emerald-400/50'
                } focus:ring-4`}
              />
              <button
                type="submit"
                disabled={isSearching}
                className="absolute right-2 top-2 bottom-2 bg-emerald-700 text-white px-5 rounded-xl flex items-center justify-center hover:bg-emerald-800 transition-colors disabled:opacity-50"
              >
                {isSearching ? (
                  <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                )}
              </button>
            </form>
            {validationError && (
              <div className="mt-3 flex items-center justify-center gap-2 text-red-200 text-sm font-bold animate-pulse">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {validationError}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-16">
        {!hasSearched ? (
          <div className="text-center py-10">
            <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-sm">
              <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Ready to Verify?</h2>
            <p className="text-slate-500">Enter a valid Student ID in the search bar above to fetch academic records.</p>
          </div>
        ) : result ? (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header Summary */}
            <div className="bg-white rounded-[2rem] p-8 shadow-xl shadow-slate-200/50 border border-slate-100 mb-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-6">
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mb-1">
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">Verified Record</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-3xl font-bold text-slate-900 mb-2">{result.name}</h2>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-bold">{result.studentId}</span>
                    <span className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-xs font-bold">{result.gradeLevel}</span>
                    <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-bold">{result.term}</span>
                  </div>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    Lumina Academy Official Academic Statement. This record is electronically generated and verified by our central admissions database.
                  </p>
                </div>
                
                <div className="bg-slate-50 rounded-3xl p-6 text-center border border-slate-100">
                  <div className="text-5xl font-black text-slate-900 mb-1">{result.gpa.toFixed(2)}</div>
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Overall GPA</div>
                  <div className="inline-block px-4 py-1.5 bg-emerald-600 text-white rounded-full text-xs font-black uppercase shadow-lg shadow-emerald-200">
                    {result.standing}
                  </div>
                </div>
              </div>
            </div>

            {/* Grades Table */}
            <div className="bg-white rounded-[2rem] overflow-hidden shadow-xl shadow-slate-200/50 border border-slate-100">
              <div className="px-8 py-6 border-b border-slate-100 flex justify-between items-center">
                <h3 className="text-xl font-bold text-slate-900">Transcript Details</h3>
                <button className="text-emerald-600 hover:text-emerald-700 p-2 rounded-full hover:bg-emerald-50 transition-colors">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-slate-50 text-slate-400 text-[10px] font-black uppercase tracking-widest border-b border-slate-100">
                    <tr>
                      <th className="px-8 py-4">Course Title</th>
                      <th className="px-6 py-4">Credits</th>
                      <th className="px-6 py-4">Grade</th>
                      <th className="px-6 py-4">Grade Points</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {result.grades.map((g, idx) => (
                      <tr key={idx} className="hover:bg-slate-50 transition-colors">
                        <td className="px-8 py-5 font-bold text-slate-700">{g.subject}</td>
                        <td className="px-6 py-5 text-slate-500">{g.credits.toFixed(1)}</td>
                        <td className="px-6 py-5">
                          <span className={`px-2.5 py-1 rounded-lg text-xs font-black ${
                            g.grade.startsWith('A') ? 'bg-emerald-100 text-emerald-700' :
                            g.grade.startsWith('B') ? 'bg-blue-100 text-blue-700' :
                            'bg-amber-100 text-amber-700'
                          }`}>
                            {g.grade}
                          </span>
                        </td>
                        <td className="px-6 py-5 font-medium text-slate-900">{g.points.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <p className="mt-8 text-center text-xs text-slate-400 font-medium">
              Information on this page is confidential and subject to privacy laws. 
              <br />For official signed transcripts, contact <strong>registrar@luminaacademy.edu</strong>
            </p>
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border border-red-100 shadow-xl shadow-red-50/50">
            <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">No Record Found</h3>
            <p className="text-slate-500 px-4">
              We couldn't find any results for valid ID <span className="font-bold text-red-600">"{searchId}"</span>.
              <br />Please ensure the student has completed the current term assessments.
            </p>
            <button 
              onClick={() => { setHasSearched(false); setSearchId(''); setValidationError(null); }}
              className="mt-6 text-emerald-600 font-bold hover:underline"
            >
              Try another search
            </button>
          </div>
        )}
      </main>
    </div>
  );
};
