"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const FlowerController_1 = __importDefault(require("../controller/FlowerController"));
const StyleController_1 = __importDefault(require("../controller/StyleController"));
const router = (0, express_1.Router)();
// Mount the FlowerController routes
router.use('/flowers', FlowerController_1.default);
router.use('/styles', StyleController_1.default);
exports.default = router;
//# sourceMappingURL=routes.js.map