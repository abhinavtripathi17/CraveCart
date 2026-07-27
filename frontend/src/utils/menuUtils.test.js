import test from 'node:test';
import assert from 'node:assert/strict';
import { filterFoodItems } from './menuUtils.js';

test('filterFoodItems returns only salad items for the Salad category', () => {
  const foodList = [
    { name: 'Greek salad', category: 'Salad' },
    { name: 'Veg salad', category: 'Salad' },
    { name: 'Chicken Rolls', category: 'Rolls' },
  ];

  const result = filterFoodItems(foodList, 'Salad', '');

  assert.equal(result.length, 2);
  assert.deepEqual(result.map((item) => item.name), ['Greek salad', 'Veg salad']);
});
