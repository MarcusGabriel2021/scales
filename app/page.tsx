"use client";

import { useState } from "react";
import { Utils } from "./utils/Utils";
import { ModeChords } from "./utils/ModeChords";

export default function Home() {
  const twelveNotes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
  const degrees = ["I", "II", "III", "IV", "V", "VI", "VII"];
  
  const modeColors = [
    "#577590", 
    "#43aa8b",
    "#90be6d", 
    "#f9c74f",
    "#f8961e", 
    "#f3722c", 
    "#f94144", 
  ];

  const [toneIndex, setToneIndex] = useState(0);
  const [showSevenths, setShowSevenths] = useState(false);

  const currentTone = twelveNotes[toneIndex];
  const utils = new Utils(currentTone);
  const modeChords: ModeChords[] = utils.scaleChords;

  const handlePrev = () => setToneIndex((prev) => (prev - 1 + 12) % 12);
  const handleNext = () => setToneIndex((prev) => (prev + 1) % 12);

  return (
    <div className="min-h-screen flex flex-col items-center p-4 md:p-10 font-sans">
      
      <h1 className="text-4xl md:text-5xl font-bold mb-8 md:mb-12 text-center text-neutral-900 dark:text-white">
        Modes
      </h1>

      <div className="flex items-center gap-6 mb-8">
        <button 
          onClick={handlePrev} 
          className="w-10 h-10 md:w-12 md:h-12 flex justify-center items-center rounded-full bg-neutral-200 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-300 hover:bg-neutral-300 dark:hover:bg-neutral-700 transition-colors cursor-pointer"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
        </button>

        <div className="w-24 h-20 md:w-32 md:h-28 flex justify-center items-center rounded-2xl bg-white text-black shadow-lg border border-neutral-200 dark:border-none">
          <span className="text-5xl md:text-6xl font-bold">{currentTone}</span>
        </div>

        <button 
          onClick={handleNext} 
          className="w-10 h-10 md:w-12 md:h-12 flex justify-center items-center rounded-full bg-neutral-200 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-300 hover:bg-neutral-300 dark:hover:bg-neutral-700 transition-colors cursor-pointer"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
        </button>
      </div>

      <button 
        onClick={() => setShowSevenths(!showSevenths)}
        className="w-fit px-8 mb-12 py-2.5 rounded-full border border-neutral-400 dark:border-neutral-600 text-neutral-800 dark:text-neutral-200 text-sm md:text-base font-semibold hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors cursor-pointer"
      >
        {showSevenths ? "7th Chords (Tetrads)" : "Simple Chords (Triads)"}
      </button>

      {/* Mobile */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:hidden">
        {modeChords.map((scale, modeIndex) => (
          <div 
            key={scale.mode} 
            className="flex flex-col p-5 border-2 rounded-3xl bg-neutral-100 dark:bg-[#161616]"
            style={{ borderColor: modeColors[modeIndex] }} // Aplica a cor na borda do cartão principal
          >
            
            <div 
              className="text-center font-bold capitalize text-xl mb-5"
              style={{ color: modeColors[modeIndex] }} 
            >
              {scale.mode}
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              {scale.chords.map((chord, index) => (
                <div 
                  key={index} 
                  className={`flex flex-col items-center justify-center border-2 rounded-2xl p-4 bg-white dark:bg-transparent ${index === 6 ? 'col-span-2' : ''}`}
                  style={{ borderColor: modeColors[modeIndex] }} // Aplica a cor nas caixinhas de dentro
                >
                  <span className="text-xs text-neutral-400 mb-1">{degrees[index]}</span>
                  <span className="font-bold text-lg text-neutral-900 dark:text-white">
                    {showSevenths ? chord.tetradName : chord.triadName}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Desktop */}
      <div className="hidden md:block w-full max-w-5xl">
        <table className="w-full text-center border-separate border-spacing-3 table-fixed">
          <thead>
            <tr>
              <th className="w-[160px] bg-neutral-200 dark:bg-[#1f1f1f] text-neutral-600 dark:text-neutral-400 py-4 rounded-xl font-medium text-sm">Mode</th>
              {degrees.map(d => (
                <th key={d} className="bg-neutral-200 dark:bg-[#1f1f1f] text-neutral-600 dark:text-neutral-400 py-4 rounded-xl font-medium text-sm">{d}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {modeChords.map((scale, modeIndex) => (
              <tr key={scale.mode}>
                <td 
                  className="border-2 text-neutral-900 dark:text-white py-5 rounded-2xl font-semibold capitalize bg-transparent"
                  style={{ borderColor: modeColors[modeIndex] }} // Cor dinâmica da borda
                >
                  {scale.mode}
                </td>
                
                {scale.chords.map((chord, index) => (
                  <td 
                    key={index} 
                    className="border-2 text-neutral-900 dark:text-white py-5 rounded-2xl font-bold text-lg bg-transparent hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
                    style={{ borderColor: modeColors[modeIndex] }} // Cor dinâmica da borda
                  >
                    {showSevenths ? chord.tetradName : chord.triadName}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}