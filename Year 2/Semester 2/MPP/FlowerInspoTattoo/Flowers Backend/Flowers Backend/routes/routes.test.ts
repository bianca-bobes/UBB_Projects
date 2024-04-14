import request from 'supertest';
import app from '../server'; // Assuming your Express application file is named 'app.ts' or 'server.ts'

describe('Flower API endpoints', () => {
    // Test GET /flowers
    it('should return all flowers when GET /flowers is called', async () => {
        const res = await request(app).get('/flowers');
        expect(res.status).toBe(200);
        expect(res.body.length).toBeGreaterThan(0); // Ensure response contains at least one flower
    });

    // Test GET /flowers/:popular_name
    it('should return the specific flower when GET /flowers/:popular_name is called with a valid popular name', async () => {
        const popularName = 'Poppy'; // Assume 'Poppy' exists in your flowers array
        const res = await request(app).get(`/flowers/${popularName}`);
        expect(res.status).toBe(200);
        expect(res.body._popular_name).toBe(popularName);
    });

    // Test POST /flowers
    it('should create a new flower when POST /flowers is called with valid flower data', async () => {
        const newFlowerData = {
            _popular_name: 'Test Flower',
            _latin_name: 'Test Latin Name',
            _symbolic_meaning: 'Test Symbolic Meaning',
            _color: 'Test Color',
            _season: 'Test Season',
            _is_visible: true
        };

        const res = await request(app).post('/flowers').send(newFlowerData);
        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty('_id');
    });


    // Test PUT /flowers/:popular_name
    it('should update the specified flower when PUT /flowers/:popular_name is called with valid updated data', async () => {
        const popularName = 'Test Flower'; // Assume 'Test Flower' was created in a previous test
        const updatedFlowerData = {
            _latin_name: 'Updated Latin Name',
            _symbolic_meaning: 'Updated Symbolic Meaning',
            _color: 'Updated Color',
            _season: 'Updated Season',
            _is_visible: false
        };

        const res = await request(app).put(`/flowers/${popularName}`).send(updatedFlowerData);
        expect(res.status).toBe(200);
    });

    // Test DELETE /flowers/:popular_name
    it('should delete the specified flower when DELETE /flowers/:popular_name is called with a valid popular name', async () => {
        const popularName = 'Test Flower'; // Assume 'Test Flower' was created in a previous test

        const res = await request(app).delete(`/flowers/${popularName}`);
        expect(res.status).toBe(200);
        expect(res.body.message).toBe('Flower deleted successfully');
    });
});
