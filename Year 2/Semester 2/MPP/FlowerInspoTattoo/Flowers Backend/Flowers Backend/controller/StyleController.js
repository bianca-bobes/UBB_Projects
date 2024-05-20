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
const express_1 = require("express");
const FlowerSchema_1 = __importDefault(require("../model/FlowerSchema"));
const mongoose_1 = __importDefault(require("mongoose"));
const router = (0, express_1.Router)();
const StyleSchema = new mongoose_1.default.Schema({
    name: String,
    description: String,
    flower: [String], // Array of popular names of flowers
});
const StyleModel = mongoose_1.default.model('Style', StyleSchema);
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const styles = yield StyleModel.find();
        res.json(styles);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}));
// GET a specific style by name
router.get('/:name', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const styleName = req.params.name;
    try {
        const style = yield StyleModel.findOne({ name: styleName });
        if (!style) {
            return res.status(404).json({ error: 'Style not found' });
        }
        res.json(style);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}));
// POST a new style
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, description } = req.body;
    try {
        // Check if a style with the same name already exists
        const existingStyle = yield StyleModel.findOne({ name });
        if (existingStyle) {
            return res.status(400).json({ error: 'Style with that name already exists' });
        }
        // Create a new style document
        const newStyle = new StyleModel({ name, description });
        yield newStyle.save();
        res.status(201).json(newStyle);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}));
// PUT update style by name
router.put('/:name', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const styleName = req.params.name;
    const { description } = req.body;
    try {
        // Find the style by its name and update its description
        const updatedStyle = yield StyleModel.findOneAndUpdate({ name: styleName }, { description }, { new: true });
        if (!updatedStyle) {
            return res.status(404).json({ error: 'Style not found' });
        }
        res.json(updatedStyle);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}));
// DELETE style by name
router.delete('/:name', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const styleName = req.params.name;
    try {
        // Find the style by its name and delete it
        const deletedStyle = yield StyleModel.findOneAndDelete({ name: styleName });
        if (!deletedStyle) {
            return res.status(404).json({ error: 'Style not found' });
        }
        res.json({ message: 'Style deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}));
// Add a flower to a style by style name
router.post('/:name/flowers', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const styleName = req.params.name;
    const { popularName } = req.body;
    try {
        const style = yield StyleModel.findOne({ name: styleName });
        if (!style) {
            return res.status(404).json({ error: 'Style not found' });
        }
        // Check if the flower exists
        const flower = yield FlowerSchema_1.default.findOne({ popular_name: popularName });
        if (!flower) {
            return res.status(404).json({ error: 'Flower not found' });
        }
        style.flower.push(popularName); // Add the popular name to the style's flower array
        yield style.save();
        res.json(style);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}));
// Remove a flower from a style by style name
router.delete('/:name/flowers/:popularName', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const styleName = req.params.name;
    const popularName = req.params.popularName;
    try {
        const style = yield StyleModel.findOne({ name: styleName });
        if (!style) {
            return res.status(404).json({ error: 'Style not found' });
        }
        // Remove the flower's popular name from the style's array
        style.flower = style.flower.filter(name => name !== popularName);
        yield style.save();
        res.json(style);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}));
router.get('/flowers/:name', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const flowerName = req.params.name;
    try {
        // Find all styles that include the specified flower name in their flower array
        const styles = yield StyleModel.find({ flower: flowerName });
        // Send the count of styles as the response
        res.json({ count: styles.length });
    }
    catch (error) {
        // Handle any errors
        res.status(500).json({ error: error.message });
    }
}));
exports.default = router;
//# sourceMappingURL=StyleController.js.map