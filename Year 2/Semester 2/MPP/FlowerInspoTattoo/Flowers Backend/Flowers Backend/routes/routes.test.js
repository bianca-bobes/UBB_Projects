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
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../server")); // Assuming your Express application file is named 'app.ts' or 'server.ts'
describe('Flower API endpoints', () => {
    // Test GET /flowers
    it('should return all flowers when GET /flowers is called', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(server_1.default).get('/flowers');
        expect(res.status).toBe(200);
        expect(res.body.length).toBeGreaterThan(0); // Ensure response contains at least one flower
    }));
    // Test GET /flowers/:popular_name
    it('should return the specific flower when GET /flowers/:popular_name is called with a valid popular name', () => __awaiter(void 0, void 0, void 0, function* () {
        const popularName = 'Poppy'; // Assume 'Poppy' exists in your flowers array
        const res = yield (0, supertest_1.default)(server_1.default).get(`/flowers/${popularName}`);
        expect(res.status).toBe(200);
        expect(res.body._popular_name).toBe(popularName);
    }));
    // Test POST /flowers
    it('should create a new flower when POST /flowers is called with valid flower data', () => __awaiter(void 0, void 0, void 0, function* () {
        const newFlowerData = {
            _popular_name: 'Test Flower',
            _latin_name: 'Test Latin Name',
            _symbolic_meaning: 'Test Symbolic Meaning',
            _color: 'Test Color',
            _season: 'Test Season',
            _is_visible: true
        };
        const res = yield (0, supertest_1.default)(server_1.default).post('/flowers').send(newFlowerData);
        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty('_id');
    }));
    // Test PUT /flowers/:popular_name
    it('should update the specified flower when PUT /flowers/:popular_name is called with valid updated data', () => __awaiter(void 0, void 0, void 0, function* () {
        const popularName = 'Test Flower'; // Assume 'Test Flower' was created in a previous test
        const updatedFlowerData = {
            _latin_name: 'Updated Latin Name',
            _symbolic_meaning: 'Updated Symbolic Meaning',
            _color: 'Updated Color',
            _season: 'Updated Season',
            _is_visible: false
        };
        const res = yield (0, supertest_1.default)(server_1.default).put(`/flowers/${popularName}`).send(updatedFlowerData);
        expect(res.status).toBe(200);
    }));
    // Test DELETE /flowers/:popular_name
    it('should delete the specified flower when DELETE /flowers/:popular_name is called with a valid popular name', () => __awaiter(void 0, void 0, void 0, function* () {
        const popularName = 'Test Flower'; // Assume 'Test Flower' was created in a previous test
        const res = yield (0, supertest_1.default)(server_1.default).delete(`/flowers/${popularName}`);
        expect(res.status).toBe(200);
        expect(res.body.message).toBe('Flower deleted successfully');
    }));
});
//# sourceMappingURL=routes.test.js.map