export class Flower {
    private _id: number;
    private _popular_name: string;
    private _latin_name: string;
    private _symbolic_meaning: string;
    private _color: string;
    private _season: string;
    private _is_visible: boolean;
    constructor(id: number, popular_name: string, latin_name: string, symbolic_meaning: string, color: string, season: string, is_visible: boolean) {
        this._id = id;
        this._popular_name = popular_name;
        this._latin_name = latin_name;
        this._symbolic_meaning = symbolic_meaning;
        this._color = color;
        this._season = season;
        this._is_visible = is_visible;
    }

    get id(): number {
        return this._id;
    }

    get popular_name(): string {
        return this._popular_name;
    }

    get latin_name(): string {
        return this._latin_name;
    }

    get symbolic_meaning(): string {
        return this._symbolic_meaning;
    }
    get color(): string {
        return this._color;
    }
    get season(): string {
        return this._season;
    }
    get is_visible(): boolean {
        return this._is_visible;
    }

    // Setters

    set id(id: number) {
        this._id = id;
    }

    set popular_name(popular_name: string) {
        this._popular_name = popular_name;
    }
    set latin_name(latin_name: string) {
        this._latin_name = latin_name;
    }
    set symbolic_meaning(symbolic_meaning: string) {
        this._symbolic_meaning = symbolic_meaning;
    }
    set color(color: string) {
        this._color = color;
    }
    set season(season: string) {
        this._season = season;
    }
    set is_visible(is_visible: boolean) {
        this._is_visible = is_visible;
    }

    //toString

    public toString = (): string => {
        return 'Flower: ' + this._popular_name + ', ' + this._latin_name + ', ' + this._symbolic_meaning + ', ' + this._color + ', ' + this._season + '\n';

    }
}