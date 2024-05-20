import express, { Request, Response, Router } from 'express';
import path from 'path';
import FlowerModel from '../model/FlowerSchema';
import mongoose from 'mongoose';

const router = Router();
const StyleSchema = new mongoose.Schema({
    name: String,
    description: String,
    flower: [String], // Array of popular names of flowers
});


const StyleModel = mongoose.model('Style', StyleSchema);

router.get('/', async (req: Request, res: Response) => {
    try {
        const styles = await StyleModel.find();
        res.json(styles);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET a specific style by name
router.get('/:name', async (req: Request, res: Response) => {
    const styleName = req.params.name;
    try {
        const style = await StyleModel.findOne({ name: styleName });
        if (!style) {
            return res.status(404).json({ error: 'Style not found' });
        }
        res.json(style);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST a new style
router.post('/', async (req: Request, res: Response) => {
    const { name, description } = req.body;

    try {
        // Check if a style with the same name already exists
        const existingStyle = await StyleModel.findOne({ name });
        if (existingStyle) {
            return res.status(400).json({ error: 'Style with that name already exists' });
        }

        // Create a new style document
        const newStyle = new StyleModel({ name, description });
        await newStyle.save();
        res.status(201).json(newStyle);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// PUT update style by name
router.put('/:name', async (req: Request, res: Response) => {
    const styleName = req.params.name;
    const { description } = req.body;

    try {
        // Find the style by its name and update its description
        const updatedStyle = await StyleModel.findOneAndUpdate(
            { name: styleName },
            { description },
            { new: true }
        );
        if (!updatedStyle) {
            return res.status(404).json({ error: 'Style not found' });
        }
        res.json(updatedStyle);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// DELETE style by name
router.delete('/:name', async (req: Request, res: Response) => {
    const styleName = req.params.name;

    try {
        // Find the style by its name and delete it
        const deletedStyle = await StyleModel.findOneAndDelete({ name: styleName });
        if (!deletedStyle) {
            return res.status(404).json({ error: 'Style not found' });
        }
        res.json({ message: 'Style deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Add a flower to a style by style name
router.post('/:name/flowers', async (req: Request, res: Response) => {
    const styleName = req.params.name;
    const { popularName } = req.body;

    try {
        const style = await StyleModel.findOne({ name: styleName });
        if (!style) {
            return res.status(404).json({ error: 'Style not found' });
        }

        // Check if the flower exists
        const flower = await FlowerModel.findOne({ popular_name: popularName });
        if (!flower) {
            return res.status(404).json({ error: 'Flower not found' });
        }

        style.flower.push(popularName); // Add the popular name to the style's flower array
        await style.save();

        res.json(style);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Remove a flower from a style by style name
router.delete('/:name/flowers/:popularName', async (req: Request, res: Response) => {
    const styleName = req.params.name;
    const popularName = req.params.popularName;

    try {
        const style = await StyleModel.findOne({ name: styleName });
        if (!style) {
            return res.status(404).json({ error: 'Style not found' });
        }

        // Remove the flower's popular name from the style's array
        style.flower = style.flower.filter(name => name !== popularName);
        await style.save();

        res.json(style);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
router.get('/flowers/:name', async (req: Request, res: Response) => {
    const flowerName = req.params.name;

    try {
        // Find all styles that include the specified flower name in their flower array
        const styles = await StyleModel.find({ flower: flowerName });

        // Send the count of styles as the response
        res.json({ count: styles.length });
    } catch (error) {
        // Handle any errors
        res.status(500).json({ error: error.message });
    }
});


export default router;