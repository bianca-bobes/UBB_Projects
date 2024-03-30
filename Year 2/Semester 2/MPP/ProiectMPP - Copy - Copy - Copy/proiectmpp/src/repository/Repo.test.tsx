import { flower } from '../domain/Flowers';
import { Repo } from './Repo';

describe('Repo', () => {
    let repo: Repo = new Repo(); // Initialize repo here

    beforeEach(() => {
        repo = new Repo(); // Reinitialize repo before each test
    });

    test('should add a flower to the repository', () => {
        const initialLength = repo.getAllVisibleFlowers().length;
        const newFlower = new flower(
            9,
            'Test Flower',
            'Test Latin Name',
            'Test Meaning',
            'Test Color',
            'Test Season',
            true
        );
        repo.addFlower(newFlower);
        const updatedLength = repo.getAllVisibleFlowers().length;
        expect(updatedLength).toBe(initialLength + 1);
    });

    test('should delete a flower from the repository', () => {
        const initialLength = repo.getAllVisibleFlowers().length;
        repo.deleteFlower('Poppy');
        const updatedLength = repo.getAllVisibleFlowers().length;
        expect(updatedLength).toBe(initialLength - 1);
    });

    test('should update a flower in the repository', () => {
        const flowerToUpdate = 'Poppy';
        const updatedFlower = new flower(
            1,
            'Updated Poppy',
            'Updated Latin Name',
            'Updated Meaning',
            'Updated Color',
            'Updated Season',
            true
        );
        repo.updateFlower(flowerToUpdate, updatedFlower);
        const updatedFlowerInRepo = repo.getAllVisibleFlowers().find((f: { popular_name: string }) => f.popular_name === 'Updated Poppy');

        expect(updatedFlowerInRepo).toBeTruthy();
    });
});
