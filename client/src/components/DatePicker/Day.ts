import { getWeekNumber } from '../../helpers/functions';

export class Day {
  Date: Date;
  dayNumberOfMonth: number;
  dayNumberOfWeek: number;
  dayNameOfWeek: string;
  dayNameOfWeekShort: string;
  yearNumber: number;
  yearNumberShort: number;
  monthName: string;
  monthNameShort: string;
  monthNumber: number;
  timestamp: number;
  weekNumber: number;

  constructor(day: Date | null = null, lang = 'default') {
    day = day ?? new Date();

    this.Date = day;
    /* date */ this.dayNumberOfMonth = day.getDate();
    /* dayNumber */ this.dayNumberOfWeek = day.getDay() + 1;
    /* day */ this.dayNameOfWeek = day.toLocaleString(lang, {
      weekday: 'long',
    });
    /* dayShort */ this.dayNameOfWeekShort = day.toLocaleString(lang, {
      weekday: 'short',
    });
    this.yearNumber = day.getFullYear();
    this.yearNumberShort = Number(
      day.toLocaleString(lang, { year: '2-digit' })
    );
    this.monthName = day.toLocaleString(lang, { month: 'long' });
    this.monthNameShort = day.toLocaleString(lang, { month: 'short' });
    this.monthNumber = day.getMonth() + 1;
    this.timestamp = day.getTime();
    this.weekNumber = getWeekNumber(day);
  }

  get isToday() {
    return this.isEqualTo(new Date());
  }

  isEqualTo(day: Day | Date) {
    day = day instanceof Day ? day.Date : day;

    return (
      day.getDate() === this.dayNumberOfMonth &&
      day.getMonth() === this.monthNumber - 1 &&
      day.getFullYear() === this.yearNumber
    );
  }

  format(dateStr: string) {
    return dateStr
      .replace(/\bYYYY\b/, this.yearNumber.toString())
      .replace(/\b(YYY|YY)\b/, this.yearNumberShort.toString())
      .replace(/\bWWW\b/, this.weekNumber.toString().padStart(2, '0'))
      .replace(/\bW\b/, this.weekNumber.toString())
      .replace(/\bMMMM*\b/, this.monthName)
      .replace(/\bMMM\b/, this.monthNameShort)
      .replace(/\bMMMM\b/, this.monthName)
      .replace(/\bMM\b/, this.monthNumber.toString())
      .replace(/\bM\b/, this.monthNumber.toString())
      .replace(/\bDDDD\b/, this.dayNameOfWeek)
      .replace(/\bDD\b/, this.dayNumberOfMonth.toString().padStart(2, '0'))
      .replace(/\bD\b/, this.dayNumberOfWeek.toString());
  }
}
