import { test, expect } from '@playwright/test';

test('GET /products/:id - should fetch a product by ID', async ({ request }) => {
  const response = await request.get('/products/1');

  expect(response.ok()).toBeTruthy();
  expect(response.status()).toBe(200);

  const product = await response.json();

  expect(product).toHaveProperty('id', 1);
  expect(product).toHaveProperty('title');
  expect(product).toHaveProperty('price');

  expect(typeof product.title).toBe('string');
  expect(typeof product.price).toBe('number');
});

test('POST /products/add - should create a new product', async ({ request }) => {
  const newProduct = {
    title: 'Test Product',
    price: 9.99,
    description: 'This is a new test product',
    category: 'makeup',
    brand: 'Makeup Brand',
  };

  const response = await request.post('/products/add', {
    data: newProduct,
  });

  expect(response.ok()).toBeTruthy();
  expect(response.status()).toBe(201);

  const createdProduct = await response.json();

  expect(createdProduct).toHaveProperty('id');
  expect(createdProduct.title).toBe(newProduct.title);
  expect(createdProduct.price).toBe(newProduct.price);
  expect(createdProduct.description).toBe(newProduct.description);
  expect(createdProduct.category).toBe(newProduct.category);
  expect(createdProduct.brand).toBe(newProduct.brand);


});
