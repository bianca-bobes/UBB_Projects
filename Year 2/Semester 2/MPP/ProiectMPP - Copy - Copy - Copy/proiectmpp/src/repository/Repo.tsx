import { flower } from "../domain/Flowers";

export class Repo {
    private _flowers: flower[];
    private _nextId: number = 1;

    constructor() {
        this._flowers = [
            new flower(1, "Poppy", "Papaver somniferum", "Dreams, Rest, Calmness", "Red", "Spring", true),
            new flower(2, "Tulip", "Tulipa", "Love, Elegance, Grace", "Purple", "Spring", true),
            new flower(3, "Sunflower", "Helianthus annuus", "Adoration, Loyalty, Longevity", "Yellow", "Summer", true),
            new flower(4, "Rose", "Rosa", "Love, Beauty, Passion", "Red", "Summer", true),
            new flower(5, "Chrysanthemum", "Chrysanthemum", "Friendship, Joy, Optimism", "White", "Autumn", true),
            new flower(6, "Dahlia", "Dahlia", "Elegance, Dignity, Inner Strength", "Pink", "Autumn", true),
            new flower(7, "Poinsettia", "Euphorbia pulcherrima", "Joy, Celebration, Success", "Red", "Winter", true),
            new flower(8, "Cyclamen", "Cyclamen", "Perseverance, Resilience, Goodbye", "Pink", "Winter", true),
            new flower(9, "Lilac", "Syringa vulgaris", "Innocence, Youthfulness, Spirituality, Tranquility", "Purple", "Spring", true)
        ];
    }

    addFlower(flower: flower): void {
        const existingFlower = this._flowers.find(f => f.popular_name === flower.popular_name);
        if (existingFlower) {
            console.log("Flower already exists");
        } else {
            flower.id = this._nextId++;
            this._flowers.push(flower);
        }
    }

    deleteFlower(popular_name: string): void {
        const flower = this._flowers.find(f => f.popular_name === popular_name);
        if (!flower) {
            console.log("No flower with that name");
        } else {
            flower.is_visible = false;
        }
    }

    updateFlower(popular_name: string, updatedFlower: flower): void {
        const flowerToUpdate = this._flowers.find(f => f.popular_name === popular_name);
        if (!flowerToUpdate) {
            console.log("No flower with that name");
        } else {
            flowerToUpdate.latin_name = updatedFlower.latin_name;
            flowerToUpdate.symbolic_meaning = updatedFlower.symbolic_meaning;
            flowerToUpdate.color = updatedFlower.color;
            flowerToUpdate.season = updatedFlower.season;
        }
    }

    getAllFlowers(): flower[] {
        return this._flowers;
    }

    getAllVisibleFlowers(): flower[] {
        return this._flowers.filter(f => f.is_visible);
    }
}
