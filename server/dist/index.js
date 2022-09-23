"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var morgan_1 = __importDefault(require("morgan"));
var helmet_1 = __importDefault(require("helmet"));
var express_rate_limit_1 = __importDefault(require("express-rate-limit"));
var error_middleware_1 = __importDefault(require("./middleware/error.middleware"));
var config_1 = __importDefault(require("./config"));
var app = (0, express_1.default)();
var PORT = config_1.default.port || 4000;
var limiter = (0, express_rate_limit_1.default)({
    windowMs: 60 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
    message: 'Too many requests from this IP',
});
app.use(express_1.default.json());
app.use((0, morgan_1.default)('common'));
app.use((0, helmet_1.default)());
app.use(limiter);
app.get('/', function (req, res) {
    res.json({
        message: 'Hello World',
    });
});
app.post('/', function (req, res) {
    // console.log(req.body);
    res.json({
        message: 'Hello World',
        data: req.body,
    });
});
app.use(error_middleware_1.default);
app.use(function (_req, res) {
    res.status(404).json({
        message: 'Oh you are lost',
    });
});
app.listen(PORT, function () {
    console.log("Server running in port: ".concat(PORT));
});
exports.default = app;
