"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.asyncEach = exports.timeout = void 0;
const is_async_function_1 = __importDefault(require("./utils/is-async-function"));
const timeout = (duration) => __awaiter(void 0, void 0, void 0, function* () { return new Promise((resolve) => setTimeout(resolve, duration * 1000)); });
exports.timeout = timeout;
const asyncEach = (values, cb) => __awaiter(void 0, void 0, void 0, function* () {
    if (Array.isArray(values)) {
        const promises = [];
        let i = 0;
        for (const value of values) {
            promises.push(cb(value, i));
            i++;
        }
        if ((0, is_async_function_1.default)(cb)) {
            return yield Promise.all(promises);
        }
        return promises;
    }
    else {
        const obj = {};
        for (const [key, value] of Object.entries(values)) {
            obj[key] = cb(value, key);
        }
        if ((0, is_async_function_1.default)(cb)) {
            for (const [key, value] of Object.entries(obj)) {
                obj[key] = yield value;
            }
        }
        return obj;
    }
});
exports.asyncEach = asyncEach;
