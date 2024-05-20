import mongoose from 'mongoose';

const FlowerSchema = new mongoose.Schema({
    popular_name: String,
    latin_name: String,
    symbolic_meaning: String,
    color: String,
    season: String,
    is_visible: Boolean,
});

export default mongoose.model('Flower', FlowerSchema);
