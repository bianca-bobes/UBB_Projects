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
exports.authenticateToken = void 0;
const express_1 = require("express");
const Flower_1 = require("../model/Flower");
const path_1 = __importDefault(require("path"));
const faker_1 = __importDefault(require("faker")); // Import Faker library
const FlowerSchema_1 = __importDefault(require("../model/FlowerSchema"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../model/User"));
const router = (0, express_1.Router)();
// Function to generate fake flower data
function generateFakeFlowers(count) {
    const seasons = ['Spring', 'Summer', 'Autumn', 'Winter'];
    const fakeFlowers = [];
    for (let i = 0; i < count; i++) {
        const randomSeasonIndex = faker_1.default.random.number({ min: 0, max: 3 });
        fakeFlowers.push(new Flower_1.Flower(i + 10, // Start IDs from 10
        faker_1.default.random.word(), // Generate a fake popular name
        faker_1.default.lorem.words(), // Generate a fake Latin name
        faker_1.default.lorem.words(), // Generate a fake symbolic meaning
        faker_1.default.internet.color(), // Generate a fake color
        seasons[randomSeasonIndex], // Select a random season from predefined options
        faker_1.default.random.boolean() // Generate a random visibility status
        ));
    }
    return fakeFlowers;
}
// Generate fake flower data when the server starts
const initialFlowers = [
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
let flowers = [...initialFlowers, ...generateFakeFlowers(5)]; // Generate 5 additional fake flowers initially
// Authentication middleware
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return res.sendStatus(401); // Unauthorized
    }
    jsonwebtoken_1.default.verify(token, 'flori', (err, user) => {
        if (err) {
            return res.sendStatus(403); // Forbidden
        }
        req.user = user; // Attach user to the request
        next();
    });
};
exports.authenticateToken = authenticateToken;
// Routes
router.get('/', exports.authenticateToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const flowers = yield FlowerSchema_1.default.find();
        res.json(flowers);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}));
router.get('/images/:popular_name', exports.authenticateToken, (req, res) => {
    const popular_name = req.params.popular_name;
    const imagePath = path_1.default.join(__dirname, `../images/${popular_name}.png`);
    res.sendFile(imagePath);
});
router.get('/visible', exports.authenticateToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const visibleFlowers = yield FlowerSchema_1.default.find({ is_visible: true });
        res.json(visibleFlowers);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}));
router.get('/:popular_name', exports.authenticateToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const popular_name = req.params.popular_name;
    try {
        const flower = yield FlowerSchema_1.default.findOne({ popular_name });
        if (!flower) {
            return res.status(404).json({ error: 'Flower not found' });
        }
        res.json(flower);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}));
// Apply authentication middleware to the routes that modify data
router.post('/', exports.authenticateToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { popular_name, latin_name, symbolic_meaning, color, season, is_visible } = req.body;
    try {
        const existingFlower = yield FlowerSchema_1.default.findOne({ popular_name });
        if (existingFlower) {
            return res.status(400).json({ error: 'Flower with that name already exists' });
        }
        const newFlower = yield FlowerSchema_1.default.create({ popular_name, latin_name, symbolic_meaning, color, season, is_visible });
        res.status(201).json(newFlower);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}));
router.put('/:popular_name', exports.authenticateToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const popular_name = req.params.popular_name;
    const { latin_name, symbolic_meaning, color, season, is_visible } = req.body;
    try {
        const updatedFlower = yield FlowerSchema_1.default.findOneAndUpdate({ popular_name }, { latin_name, symbolic_meaning, color, season, is_visible }, { new: true });
        if (!updatedFlower) {
            return res.status(404).json({ error: 'Flower not found' });
        }
        res.json(updatedFlower);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}));
router.delete('/:popular_name', exports.authenticateToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const popular_name = req.params.popular_name;
    try {
        const deletedFlower = yield FlowerSchema_1.default.findOneAndDelete({ popular_name });
        if (!deletedFlower) {
            return res.status(404).json({ error: 'Flower not found' });
        }
        res.json({ message: 'Flower deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}));
// User registration and login routes
router.post('/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    try {
        const user = new User_1.default({ username, password });
        yield user.save();
        const token = jsonwebtoken_1.default.sign({ id: user._id }, 'flori', { expiresIn: '1h' });
        res.status(201).json({ token });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}));
router.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    try {
        const user = yield User_1.default.findOne({ username });
        if (user && (yield user.matchPassword(password))) {
            const token = jsonwebtoken_1.default.sign({ id: user._id }, 'flori', { expiresIn: '1h' });
            res.json({ token });
        }
        else {
            res.status(400).json({ error: 'Invalid credentials' });
        }
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}));
exports.default = router;
//# sourceMappingURL=FlowerController.js.map