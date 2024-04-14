"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Flower = void 0;
class Flower {
    constructor(id, popular_name, latin_name, symbolic_meaning, color, season, is_visible) {
        this.toString = () => {
            return 'Flower: ' + this._popular_name + ', ' + this._latin_name + ', ' + this._symbolic_meaning + ', ' + this._color + ', ' + this._season + '\n';
        };
        this._id = id;
        this._popular_name = popular_name;
        this._latin_name = latin_name;
        this._symbolic_meaning = symbolic_meaning;
        this._color = color;
        this._season = season;
        this._is_visible = is_visible;
    }
    get id() {
        return this._id;
    }
    get popular_name() {
        return this._popular_name;
    }
    get latin_name() {
        return this._latin_name;
    }
    get symbolic_meaning() {
        return this._symbolic_meaning;
    }
    get color() {
        return this._color;
    }
    get season() {
        return this._season;
    }
    get is_visible() {
        return this._is_visible;
    }
    // Setters
    set id(id) {
        this._id = id;
    }
    set popular_name(popular_name) {
        this._popular_name = popular_name;
    }
    set latin_name(latin_name) {
        this._latin_name = latin_name;
    }
    set symbolic_meaning(symbolic_meaning) {
        this._symbolic_meaning = symbolic_meaning;
    }
    set color(color) {
        this._color = color;
    }
    set season(season) {
        this._season = season;
    }
    set is_visible(is_visible) {
        this._is_visible = is_visible;
    }
}
exports.Flower = Flower;
//# sourceMappingURL=Flower.js.map