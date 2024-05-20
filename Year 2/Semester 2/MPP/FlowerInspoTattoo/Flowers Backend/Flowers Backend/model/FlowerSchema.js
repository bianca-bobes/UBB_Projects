"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const FlowerSchema = new mongoose_1.default.Schema({
    popular_name: String,
    latin_name: String,
    symbolic_meaning: String,
    color: String,
    season: String,
    is_visible: Boolean,
});
exports.default = mongoose_1.default.model('Flower', FlowerSchema);
//# sourceMappingURL=FlowerSchema.js.map