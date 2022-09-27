const getWeekNumber = (day: Date) => {
  const firstDayOfTheYear = new Date(day.getFullYear(), 0, 1);
  const pastDaysOfYear =
    (day.getTime() - firstDayOfTheYear.getTime()) / (24 * 60 * 60 * 1000);

  return Math.ceil((pastDaysOfYear + firstDayOfTheYear.getDay() + 1) / 7);
};

const isLeapYear = (year: number) =>
  year % 100 === 0 ? year % 400 === 0 : year % 4 === 0;

class Day {
  Date: Date;
  dayOfMonth: number;
  dayNumberOfWeek: number;
  dayNameOfWeek: string;
  dayNameOfWeekShort: string;
  year: number;
  yearShort: number;
  month: string;
  monthNumber: number;
  monthShort: string;
  timestamp: number;
  week: number;

  constructor(day: Date | null = null, lang = 'default') {
    day = day ?? new Date();

    this.Date = day;
    /* date */ this.dayOfMonth = day.getDate();
    /* dayNumber */ this.dayNumberOfWeek = day.getDay() + 1;
    /* day */ this.dayNameOfWeek = day.toLocaleString(lang, {
      weekday: 'long',
    });
    /* dayShort */ this.dayNameOfWeekShort = day.toLocaleString(lang, {
      weekday: 'short',
    });
    this.year = day.getFullYear();
    this.yearShort = Number(day.toLocaleString(lang, { year: '2-digit' }));
    this.month = day.toLocaleString(lang, { month: 'long' });
    this.monthNumber = day.getMonth() + 1;
    this.monthShort = day.toLocaleString(lang, { month: 'short' });
    this.timestamp = day.getTime();
    this.week = getWeekNumber(day);
  }

  get isToday() {
    return this.isEqualTo(new Date());
  }

  isEqualTo(day: Day | Date) {
    day = day instanceof Day ? day.Date : day;

    return (
      day.getDate() === this.dayOfMonth &&
      day.getMonth() === this.monthNumber - 1 &&
      day.getFullYear() === this.year
    );
  }

  format(dateStr: string) {
    return dateStr
      .replace(/\bYYYY\b/, this.year.toString())
      .replace(/\b(YYY|YY)\b/, this.yearShort.toString())
      .replace(/\bWWW\b/, this.week.toString().padStart(2, '0'))
      .replace(/\bW\b/, this.week.toString())
      .replace(/\bMMMM*\b/, this.month)
      .replace(/\bMMMM\b/, this.month)
      .replace(/\bMMM\b/, this.monthShort)
      .replace(/\bMM\b/, this.monthNumber.toString())
      .replace(/\bM\b/, this.monthNumber.toString())
      .replace(/\bDDDD\b/, this.dayNameOfWeek)
      .replace(/\bDD\b/, this.dayOfMonth.toString().padStart(2, '0'))
      .replace(/\bD\b/, this.dayNumberOfWeek.toString());
  }
}

export class Month implements Iterable<Day> {
  lang: string;
  name: string;
  number: number;
  year: number;
  numberOfDays: number;

  constructor(date: Date | null = null, lang = 'default') {
    const day = new Day(null, lang);
    const monthsSize = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    this.lang = lang;

    this.name = day.month;
    this.number = day.monthNumber;
    this.year = day.year;
    this.numberOfDays = monthsSize[this.number - 1];

    if (this.number === 2) {
      this.numberOfDays += isLeapYear(day.year) ? 1 : 0;
    }
  }

  *[Symbol.iterator](): Iterator<Day> {
    let number = 1;
    yield this.getDay(number);
    while (number < this.numberOfDays) {
      ++number;
      yield this.getDay(number);
    }
  }

  getDay(day: number) {
    return new Day(new Date(this.year, this.number - 1, day), this.lang);
  }
}

class Calendar implements Iterable<Month> {
  today: Day;
  year: number;
  month: Month;
  lang: string;
  weekDays = Array.from({ length: 7 });

  constructor(year = null, monthNumber = null, lang = 'default') {
    this.today = new Day(null, lang);
    this.year = year ?? this.today.year;
    this.month = new Month(
      new Date(this.year, (monthNumber || this.today.monthNumber) - 1),
      lang
    );
    this.lang = lang;

    this.weekDays.forEach((_, i) => {
      const day = this.month.getDay(i);
      if (!this.weekDays.includes(day.dayNameOfWeek)) {
        this.weekDays[day.dayNumberOfWeek - 1] = day.dayNameOfWeek;
      }
    });
  }
  *[Symbol.iterator](): Iterator<Month> {
    let number = 1;
    yield this.getMonth(number);
    while (number < 12) {
      ++number;
      yield this.getMonth(number);
    }
  }

  get isLeapYear() {
    return isLeapYear(this.year);
  }

  getMonth(monthNumber: number): Month {
    return new Month(
      new Date(this.year, (monthNumber || this.today.monthNumber) - 1),
      this.lang
    );
  }
}

const month = new Calendar(null, null, 'pt');

console.log(month);
