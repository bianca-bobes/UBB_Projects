import express, { Request, Response, Router, NextFunction } from 'express';
import { Flower } from '../model/Flower';
import path from 'path';
import faker from 'faker';
import mongoose from 'mongoose';
import FlowerModel from '../model/FlowerSchema';
import User from '../model/User';
import jwt from 'jsonwebtoken';

const router = Router();

declare module 'express-serve-static-core' {
    interface Request {
        user?: jwt.JwtPayload // Using the JwtPayload type from jsonwebtoken
    }
}

function generateFakeFlowers(count: number): Flower[] {
    const seasons = ['Spring', 'Summer', 'Autumn', 'Winter'];
    const fakeFlowers: Flower[] = [];
    for (let i = 0; i < count; i++) {
        const randomSeasonIndex = faker.datatype.number({ min: 0, max: 3 });
        fakeFlowers.push(new Flower(
            i + 10,
            faker.random.word(),
            faker.lorem.words(),
            faker.lorem.words(),
            faker.internet.color(),
            seasons[randomSeasonIndex],
            faker.datatype.boolean()
        ));
    }
    return fakeFlowers;
}

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

let flowers: Flower[] = [...initialFlowers, ...generateFakeFlowers(5)];

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.sendStatus(401); // Unauthorized
    }

    try {
        const decoded = jwt.verify(token, 'flori') as jwt.JwtPayload;
        req.user = decoded; // Assuming decoded contains the user payload
        next();
    } catch (error) {
        return res.sendStatus(403); // Forbidden
    }
};

router.get('/', authenticateToken, async (req: Request, res: Response) => {
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

router.get('/visible', authenticateToken, async (req: Request, res: Response) => {
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

router.post('/register', async (req: Request, res: Response) => {
    const { username, password } = req.body;
    try {
        // Note: Removing hashing here for testing purposes
        const user = new User({ username, password });
        await user.save();
        res.status(201).json({ message: 'Registration successful' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.post('/login', async (req: Request, res: Response) => {
    const { username, password } = req.body;

    try {
        // Find the user by username
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        // Direct comparison of passwords (not recommended for production)
        if (user.password !== password) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user._id }, 'flori', { expiresIn: '1h' });

        // Send the token in the response
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
