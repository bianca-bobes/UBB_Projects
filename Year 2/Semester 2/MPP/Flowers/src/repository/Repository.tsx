import { Flower } from "../domain/Flower"; // Make sure the import statement matches the class name

export class Repo {
    private _flowers: Flower[];
    private _nextId: number = 1;

    constructor() {
        this._flowers = [];

        // Initialize flowers in the constructor
        this.addFlower(new Flower(1, "Poppy", "Papaver somniferum", "Dreams, Rest, Calmness", "Red", "Spring", true));
        this.addFlower(new Flower(2, "Tulip", "Tulipa", "Love, Elegance, Grace", "Purple", "Spring", true));
        this.addFlower(new Flower(3, "Sunflower", "Helianthus annuus", "Adoration, Loyalty, Longevity", "Yellow", "Summer", true));
        this.addFlower(new Flower(4, "Rose", "Rosa", "Love, Beauty, Passion", "Red", "Summer", true));
        this.addFlower(new Flower(5, "Chrysanthemum", "Chrysanthemum", "Friendship, Joy, Optimism", "White", "Autumn", true));
        this.addFlower(new Flower(6, "Dahlia", "Dahlia", "Elegance, Dignity, Inner Strength", "Pink", "Autumn", true));
        this.addFlower(new Flower(7, "Poinsettia", "Euphorbia pulcherrima", "Joy, Celebration, Success", "Red", "Winter", true));
        this.addFlower(new Flower(8, "Cyclamen", "Cyclamen", "Perseverance, Resilience, Goodbye", "Pink", "Winter", true));
        this.addFlower(new Flower(9, "Lilac", "Syringa vulgaris", "Innocence, Youthfulness, Spirituality, Tranquility", "Purple", "Spring", true));
    }

    addFlower(flower: Flower): void {
        const existingFlower = this._flowers.find(f => f.popular_name === flower.popular_name);
        if (existingFlower) {
            alert("Flower already exists");
        } else {
            flower.id = this._nextId++;
            flower.image = `${flower.popular_name}.png`; // Set the image property based on the popular name
            this._flowers.push(flower);
        }
    }

    deleteFlower(popular_name: string): void {
        const flower = this._flowers.find(f => f.popular_name === popular_name);
        if (!flower) {
            alert("No flower with that name");
        } else {
            flower.is_visible = false;
        }
    }

    updateFlower(popular_name: string, updatedFlower: Flower): void {
        const index = this._flowers.findIndex(f => f.popular_name === popular_name);
        if (index === -1) {
            alert("No flower with that name");
        } else {
            this._flowers[index] = updatedFlower;
        }
    }

    getAllFlowers(): Flower[] {
        return this._flowers;
    }

    getAllVisibleFlowers(): Flower[] {
        return this._flowers.filter(f => f.is_visible);
    }
}
