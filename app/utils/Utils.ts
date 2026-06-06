import { Chord } from "./Chord";
import { ChordDegree } from "./ChordDegree";
import { Mode } from "./Mode";
import { ModeChords } from "./ModeChords";
import { ModeNotes } from "./ModeNotes";

class Utils {
  twelveNotes: string[] = [
    "C", "C#", "D", "D#", "E", "F", 
    "F#", "G", "G#", "A", "A#", "B"
  ];

  scaleFormula: Mode[] = [
    { name: "ionian", intervals: ["1", "2", "3", "4", "5", "6", "7"] },
    { name: "dorian", intervals: ["1", "2", "b3", "4", "5", "6", "b7"] },
    { name: "phrygian", intervals: ["1", "b2", "b3", "4", "5", "b6", "b7"] },
    { name: "lydian", intervals: ["1", "2", "3", "#4", "5", "6", "7"] },
    { name: "mixolydian", intervals: ["1", "2", "3", "4", "5", "6", "b7"] },
    { name: "eolian", intervals: ["1", "2", "b3", "4", "5", "b6", "b7"] },
    { name: "locrian", intervals: ["1", "b2", "b3", "4", "b5", "b6", "b7"] },
  ];

  semitones: Record<string, number> = {
    "1": 0, "2": 2, "3": 4, "4": 5, "5": 7, "6": 9, "7": 11,
  };

  scales: ModeNotes[];
  scaleChords: ModeChords[];

  constructor(tone: string) {
    this.scales = this.getScales(tone);
    this.scaleChords = this.getScaleChords(this.scales);
  }

  private getScales(tone: string) {
    const scale: ModeNotes[] = [];
    const rootIndex: number = this.twelveNotes.findIndex((note) => note === tone);

    if (rootIndex === -1) {
      throw new Error(`Tone ${tone} not found.`);
    }

    for (const mode of this.scaleFormula) {
      const name = mode.name;
      const intervals = mode.intervals;
      const notes: string[] = [];

      intervals.forEach((interval) => {
        const semitones = this.semitones[interval.replace(/[b#]/g, "")];
        let currentNoteIndex = rootIndex + semitones;

        if (interval.includes("b")) currentNoteIndex -= 1;
        if (interval.includes("#")) currentNoteIndex += 1;

        currentNoteIndex = currentNoteIndex % this.twelveNotes.length;
        notes.push(this.twelveNotes[currentNoteIndex]);
      });

      scale.push({ name: name, notes: notes });
    }

    return scale;
  }

  private getScaleChords(scales: ModeNotes[]): ModeChords[] {
    const scaleChords: ModeChords[] = [];

    for (const scale of scales) {
      const notes: string[] = scale.notes;
      const size = notes.length;
      const chords: Chord[] = [];

      for (let index = 0; index < size; index++) {
        const indexes = {
          tone: this.getIndex("tone", index, size),
          third: this.getIndex("third", index, size),
          fifth: this.getIndex("fifth", index, size),
          seventh: this.getIndex("seventh", index, size),
        };

        const toneStr = notes[indexes.tone];
        const thirdStr = notes[indexes.third];
        const fifthStr = notes[indexes.fifth];
        const seventhStr = notes[indexes.seventh];

        const names = this.getChordNames(toneStr, thirdStr, fifthStr, seventhStr);

        const chord: Chord = {
          tone: toneStr,
          third: thirdStr,
          fifth: fifthStr,
          seventh: seventhStr,
          triadName: names.triadName,
          tetradName: names.tetradName,
        };

        chords.push(chord);
      }

      scaleChords.push({
        mode: scale.name,
        chords: chords,
      });
    }

    return scaleChords;
  }

  private getChordNames(
    toneStr: string,
    thirdStr: string,
    fifthStr: string,
    seventhStr: string
  ): { triadName: string; tetradName: string } {
    const getSemitones = (note1: string, note2: string): number => {
      const i1 = this.twelveNotes.indexOf(note1);
      const i2 = this.twelveNotes.indexOf(note2);
      return (i2 - i1 + 12) % 12;
    };

    const thirdDistance = getSemitones(toneStr, thirdStr);
    const fifthDistance = getSemitones(toneStr, fifthStr);
    const seventhDistance = getSemitones(toneStr, seventhStr);

    let triadName = toneStr;
    let tetradName = toneStr;

    if (thirdDistance === 3) {
      if (fifthDistance === 6) {
        triadName += "dim";
        tetradName += "m7b5";
      } else {
        triadName += "m";  
        tetradName += "m7";
      }
    } else if (thirdDistance === 4) {
      if (seventhDistance === 11) {
        tetradName += "maj7";
      } else if (seventhDistance === 10) {
        tetradName += "7";
      }
    }

    return { triadName, tetradName };
  }

  private getIndex(chordDegree: ChordDegree, index: number, size: number): number {
    const degreeOffsets: Record<ChordDegree, number> = {
      tone: 0, third: 2, fifth: 4, seventh: 6,
    };
    return (index + degreeOffsets[chordDegree]) % size;
  }
}

export { Utils };