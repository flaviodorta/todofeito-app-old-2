import { Day } from './Day';
import { isLeapYear } from '../../helpers/functions';

export class Month implements Iterable<Day> {
  lang: string;
  name: string;
  number: number;
  year: number;
  numberOfDays: number;

  constructor(date: Date | null = null, lang = 'default') {
    const day = new Day(date, lang);
    const monthsSize = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    this.lang = lang;
    this.name = day.monthName;
    this.number = day.monthNumber;
    this.year = day.yearNumber;
    this.numberOfDays = monthsSize[this.number - 1];

    if (this.number === 2) {
      this.numberOfDays += isLeapYear(day.yearNumber) ? 1 : 0;
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

  get isLeapYear() {
    return isLeapYear(this.year);
  }

  getDay(day: number) {
    return new Day(new Date(this.year, this.number - 1, day), this.lang);
  }
}
