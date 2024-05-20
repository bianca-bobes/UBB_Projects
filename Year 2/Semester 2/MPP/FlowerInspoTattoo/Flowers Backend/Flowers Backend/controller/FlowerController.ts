import express, { Request, Response, Router, NextFunction } from 'express';
import { Flower } from '../model/Flower';
import path from 'path';
import faker from 'faker'; // Import Faker library
import mongoose from 'mongoose';
import FlowerModel from '../model/FlowerSchema';
import * as jwt from 'jsonwebtoken';
import User from '../model/User';

const router = Router();

// Function to generate fake flower data
function generateFakeFlowers(count: number): Flower[] {
    const seasons = ['Spring', 'Summer', 'Autumn', 'Winter'];
    const fakeFlowers: Flower[] = [];
    for (let i = 0; i < count; i++) {
        const randomSeasonIndex = faker.random.number({ min: 0, max: 3 });
        fakeFlowers.push(new Flower(
            i + 10, // Start IDs from 10
            faker.random.word(), // Generate a fake popular name
            faker.lorem.words(), // Generate a fake Latin name
            faker.lorem.words(), // Generate a fake symbolic meaning
            faker.internet.color(), // Generate a fake color
            seasons[randomSeasonIndex], // Select a random season from predefined options
            faker.random.boolean() // Generate a random visibility status
        ));
    }
    return fakeFlowers;
}

// Generate fake flower data when the server starts
const initialFlowers: Flower[] = [
    new Flower(1, "Poppy", "Papaver somniferum", "Dreams, Rest, Calmness", "Red", "Spring", true),
    new Flower(2, "Tulip", "Tulipa", "Love, Elegance, Grace", "Purple", "Spring", true),
    new Flower(3, "Sunflower", "Helianthus annuus", "Adoration, Loyalty, Longevity", "Yellow", "Summer", true),
    new Flower(4, "Rose", "Rosa", "Love, Beauty, Passion", "Red", "Summer", true),
    new Flower(5, "Chrysanthemum", "Chrysanthemum", "Friendship, Joy, Optimism", "White", "Autumn", true),
    new Flower(6, "Dahlia", "Dahlia", "Elegance, Dignity, Inner Strength", "Pink", "Autumn", true),
    new Flower(7, "Poinsettia", "Euphorbia pulcherrima", "Joy, Celebration, Success", "Red", "Winter", true),
    new Flower(8, "Cyclamen", "Cyclamen", "Perseverance, Resilience, Goodbye", "Pink", "Winter", true),
    new Flower(9, "Lilac", "Syringa vulgaris", "Innocence, Youthfulness, Spirituality, Tranquility", "Purple", "Spring", true)
];

let flowers: Flower[] = [...initialFlowers, ...generateFakeFlowers(5)]; // Generate 5 additional fake flowers initially
// Authentication middleware
export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.sendStatus(401); // Unauthorized
    }

    jwt.verify(token, 'flori', (err: any, user: any) => {
        if (err) {
            return res.sendStatus(403); // Forbidden
        }
        req.user = user; // Attach user to the request
        next();
    });
};
// Routes

router.get('/', authenticateToken ,async (req: Request, res: Response) => {
    try {
        const flowers = await FlowerModel.find();
        res.json(flowers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/images/:popular_name', authenticateToken, (req: Request, res: Response) => {
    const popular_name = req.params.popular_name;
    const imagePath = path.join(__dirname, `../images/${popular_name}.png`);
    res.sendFile(imagePath);
});

router.get('/visible', authenticateToken,async (req: Request, res: Response) => {
    try {
        const visibleFlowers = await FlowerModel.find({ is_visible: true });
        res.json(visibleFlowers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/:popular_name', authenticateToken, async (req: Request, res: Response) => {
    const popular_name = req.params.popular_name;
    try {
        const flower = await FlowerModel.findOne({ popular_name });
        if (!flower) {
            return res.status(404).json({ error: 'Flower not found' });
        }
        res.json(flower);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Apply authentication middleware to the routes that modify data
router.post('/', authenticateToken, async (req: Request, res: Response) => {
    const { popular_name, latin_name, symbolic_meaning, color, season, is_visible } = req.body;

    try {
        const existingFlower = await FlowerModel.findOne({ popular_name });

        if (existingFlower) {
            return res.status(400).json({ error: 'Flower with that name already exists' });
        }

        const newFlower = await FlowerModel.create({ popular_name, latin_name, symbolic_meaning, color, season, is_visible });

        res.status(201).json(newFlower);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/:popular_name', authenticateToken, async (req: Request, res: Response) => {
    const popular_name = req.params.popular_name;
    const { latin_name, symbolic_meaning, color, season, is_visible } = req.body;

    try {
        const updatedFlower = await FlowerModel.findOneAndUpdate(
            { popular_name },
            { latin_name, symbolic_meaning, color, season, is_visible },
            { new: true }
        );

        if (!updatedFlower) {
            return res.status(404).json({ error: 'Flower not found' });
        }

        res.json(updatedFlower);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/:popular_name', authenticateToken, async (req: Request, res: Response) => {
    const popular_name = req.params.popular_name;

    try {
        const deletedFlower = await FlowerModel.findOneAndDelete({ popular_name });

        if (!deletedFlower) {
            return res.status(404).json({ error: 'Flower not found' });
        }

        res.json({ message: 'Flower deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// User registration and login routes
router.post('/register', async (req: Request, res: Response) => {
    const { username, password } = req.body;
    try {
        const user = new User({ username, password });
        await user.save();
        const token = jwt.sign({ id: user._id }, 'flori', { expiresIn: '1h' });
        res.status(201).json({ token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.post('/login', async (req: Request, res: Response) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (user && await user.matchPassword(password)) {
            const token = jwt.sign({ id: user._id }, 'flori', { expiresIn: '1h' });
            res.json({ token });
        } else {
            res.status(400).json({ error: 'Invalid credentials' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

export default router;
