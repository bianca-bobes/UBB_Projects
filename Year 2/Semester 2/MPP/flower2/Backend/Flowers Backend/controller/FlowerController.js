"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Flower_1 = require("../model/Flower");
const path_1 = __importDefault(require("path"));
const router = (0, express_1.Router)();
let flowers = [
    new Flower_1.Flower(1, "Poppy", "Papaver somniferum", "Dreams, Rest, Calmness", "Red", "Spring", true),
    new Flower_1.Flower(2, "Tulip", "Tulipa", "Love, Elegance, Grace", "Purple", "Spring", true),
    new Flower_1.Flower(3, "Sunflower", "Helianthus annuus", "Adoration, Loyalty, Longevity", "Yellow", "Summer", true),
    new Flower_1.Flower(4, "Rose", "Rosa", "Love, Beauty, Passion", "Red", "Summer", true),
    new Flower_1.Flower(5, "Chrysanthemum", "Chrysanthemum", "Friendship, Joy, Optimism", "White", "Autumn", true),
    new Flower_1.Flower(6, "Dahlia", "Dahlia", "Elegance, Dignity, Inner Strength", "Pink", "Autumn", true),
    new Flower_1.Flower(7, "Poinsettia", "Euphorbia pulcherrima", "Joy, Celebration, Success", "Red", "Winter", true),
    new Flower_1.Flower(8, "Cyclamen", "Cyclamen", "Perseverance, Resilience, Goodbye", "Pink", "Winter", true),
    new Flower_1.Flower(9, "Lilac", "Syringa vulgaris", "Innocence, Youthfulness, Spirituality, Tranquility", "Purple", "Spring", true)
];
// GET all flowers
router.get('/', (req, res) => {
    res.json(flowers);
});
//get image from images folder by flower popular name and if not found return epmty.png also from images folder
router.get('/images/:popular_name', (req, res) => {
    const popular_name = req.params.popular_name;
    const imagePath = path_1.default.join(__dirname, `../images/${popular_name}.png`);
    res.sendFile(imagePath);
});
// GET all visible flowers
router.get('/visible', (req, res) => {
    const visibleFlowers = flowers.filter(flower => flower.is_visible);
    res.json(visibleFlowers);
});
// GET flower by popular name
router.get('/:popular_name', (req, res) => {
    const popular_name = req.params.popular_name;
    const flower = flowers.find(flower => flower.popular_name === popular_name);
    if (!flower) {
        return res.status(404).json({ error: 'Flower not found' });
    }
    res.json(flower);
});
// POST create new flower
router.post('/', (req, res) => {
    const { popular_name, latin_name, symbolic_meaning, color, season, is_visible } = req.body;
    const existingFlower = flowers.find(flower => flower.popular_name === popular_name);
    if (existingFlower) {
        return res.status(400).json({ error: 'Flower with that name already exists' });
    }
    const newFlower = new Flower_1.Flower(flowers.length + 1, popular_name, latin_name, symbolic_meaning, color, season, is_visible);
    flowers.push(newFlower);
    res.status(201).json(newFlower);
});
// PUT update flower by popular name
router.put('/:popular_name', (req, res) => {
    const popular_name = req.params.popular_name;
    const flowerIndex = flowers.findIndex(flower => flower.popular_name === popular_name);
    if (flowerIndex === -1) {
        return res.status(404).json({ error: 'Flower not found' });
    }
    const { latin_name, symbolic_meaning, color, season, is_visible } = req.body;
    flowers[flowerIndex] = new Flower_1.Flower(flowers[flowerIndex].id, popular_name, latin_name, symbolic_meaning, color, season, is_visible);
    res.json(flowers[flowerIndex]);
});
// DELETE delete flower by popular name
router.delete('/:popular_name', (req, res) => {
    const popular_name = req.params.popular_name;
    const deletedFlower = flowers.find(flower => flower.popular_name === popular_name);
    if (!deletedFlower) {
        return res.status(404).json({ error: 'Flower not found' });
    }
    deletedFlower.is_visible = false;
    res.json({ message: 'Flower deleted successfully' });
});
exports.default = router;
//# sourceMappingURL=FlowerController.js.map