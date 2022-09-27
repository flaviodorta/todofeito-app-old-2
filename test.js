"use strict";
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.Month = void 0;
var getWeekNumber = function (day) {
    var firstDayOfTheYear = new Date(day.getFullYear(), 0, 1);
    var pastDaysOfYear = (day.getTime() - firstDayOfTheYear.getTime()) / (24 * 60 * 60 * 1000);
    return Math.ceil((pastDaysOfYear + firstDayOfTheYear.getDay() + 1) / 7);
};
var isLeapYear = function (year) {
    return year % 100 === 0 ? year % 400 === 0 : year % 4 === 0;
};
var Day = /** @class */ (function () {
    function Day(day, lang) {
        if (day === void 0) { day = null; }
        if (lang === void 0) { lang = 'default'; }
        day = day !== null && day !== void 0 ? day : new Date();
        this.Date = day;
        /* date */ this.dayOfMonth = day.getDate();
        /* dayNumber */ this.dayNumberOfWeek = day.getDay() + 1;
        /* day */ this.dayNameOfWeek = day.toLocaleString(lang, {
            weekday: 'long'
        });
        /* dayShort */ this.dayNameOfWeekShort = day.toLocaleString(lang, {
            weekday: 'short'
        });
        this.year = day.getFullYear();
        this.yearShort = Number(day.toLocaleString(lang, { year: '2-digit' }));
        this.month = day.toLocaleString(lang, { month: 'long' });
        this.monthNumber = day.getMonth() + 1;
        this.monthShort = day.toLocaleString(lang, { month: 'short' });
        this.timestamp = day.getTime();
        this.week = getWeekNumber(day);
    }
    Object.defineProperty(Day.prototype, "isToday", {
        get: function () {
            return this.isEqualTo(new Date());
        },
        enumerable: false,
        configurable: true
    });
    Day.prototype.isEqualTo = function (day) {
        day = day instanceof Day ? day.Date : day;
        return (day.getDate() === this.dayOfMonth &&
            day.getMonth() === this.monthNumber - 1 &&
            day.getFullYear() === this.year);
    };
    Day.prototype.format = function (dateStr) {
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
    };
    return Day;
}());
var Month = /** @class */ (function () {
    function Month(date, lang) {
        if (date === void 0) { date = null; }
        if (lang === void 0) { lang = 'default'; }
        var day = new Day(null, lang);
        var monthsSize = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        this.lang = lang;
        this.name = day.month;
        this.number = day.monthNumber;
        this.year = day.year;
        this.numberOfDays = monthsSize[this.number - 1];
        if (this.number === 2) {
            this.numberOfDays += isLeapYear(day.year) ? 1 : 0;
        }
    }
    Month.prototype[Symbol.iterator] = function () {
        var number;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    number = 1;
                    return [4 /*yield*/, this.getDay(number)];
                case 1:
                    _a.sent();
                    _a.label = 2;
                case 2:
                    if (!(number < this.numberOfDays)) return [3 /*break*/, 4];
                    ++number;
                    return [4 /*yield*/, this.getDay(number)];
                case 3:
                    _a.sent();
                    return [3 /*break*/, 2];
                case 4: return [2 /*return*/];
            }
        });
    };
    Month.prototype.getDay = function (day) {
        return new Day(new Date(this.year, this.number - 1, day), this.lang);
    };
    return Month;
}());
exports.Month = Month;
var Calendar = /** @class */ (function () {
    function Calendar(year, monthNumber, lang) {
        if (year === void 0) { year = null; }
        if (monthNumber === void 0) { monthNumber = null; }
        if (lang === void 0) { lang = 'default'; }
        var _this = this;
        this.weekDays = Array.from({ length: 7 });
        this.today = new Day(null, lang);
        this.year = year !== null && year !== void 0 ? year : this.today.year;
        this.month = new Month(new Date(this.year, (monthNumber || this.today.monthNumber) - 1), lang);
        this.lang = lang;
        this.weekDays.forEach(function (_, i) {
            var day = _this.month.getDay(i);
            if (!_this.weekDays.includes(day.dayNameOfWeek)) {
                _this.weekDays[day.dayNumberOfWeek - 1] = day.dayNameOfWeek;
            }
        });
    }
    Calendar.prototype[Symbol.iterator] = function () {
        var number;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    number = 1;
                    return [4 /*yield*/, this.getMonth(number)];
                case 1:
                    _a.sent();
                    _a.label = 2;
                case 2:
                    if (!(number < 12)) return [3 /*break*/, 4];
                    ++number;
                    return [4 /*yield*/, this.getMonth(number)];
                case 3:
                    _a.sent();
                    return [3 /*break*/, 2];
                case 4: return [2 /*return*/];
            }
        });
    };
    Object.defineProperty(Calendar.prototype, "isLeapYear", {
        get: function () {
            return isLeapYear(this.year);
        },
        enumerable: false,
        configurable: true
    });
    Calendar.prototype.getMonth = function (monthNumber) {
        return new Month(new Date(this.year, (monthNumber || this.today.monthNumber) - 1), this.lang);
    };
    return Calendar;
}());
var month = new Calendar(null, null, 'pt');
console.log(month);
