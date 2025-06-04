import { test, expect } from '@playwright/test';

test('GET /todos - should return a list of todos', async ({ request }) => {
  const response = await request.get('/todos');
  expect(response.ok()).toBeTruthy();
  expect(response.status()).toBe(200);

  const body = await response.json();
  expect(Array.isArray(body.todos)).toBe(true);
  expect(body.todos.length).toBeGreaterThan(0);

  const todo = body.todos[0];
  expect(todo).toHaveProperty('id');
  expect(todo).toHaveProperty('todo');
  expect(todo).toHaveProperty('completed');
  expect(todo).toHaveProperty('userId');
});

test('PUT /todos - should update todo text and status', async ({ request }) => {
  const updatedData = {
    todo: 'Updated test todo',
    completed: true,
  };

  const response = await request.put('/todos/1', {
    data: updatedData,
  });

  expect(response.ok()).toBeTruthy();
  expect(response.status()).toBe(200);

  const updated = await response.json();
  expect(updated.todo).toBe(updatedData.todo);
  expect(updated.completed).toBe(updatedData.completed);
});

test('GET /todos - should return 404 for invalid ID', async ({ request }) => {
  const response = await request.get('/todos/99999');
  expect(response.status()).toBe(404);
});

test('POST /todos - should create a new todo', async ({ request }) => {
  const newTodo = {
    todo: 'Write Playwright API test',
    completed: false,
    userId: 5, // userId mora biti broj koji postoji (1–30)
  };

  const response = await request.post('/todos/add', {
    data: newTodo,
  });

  expect(response.ok()).toBeTruthy();
  expect(response.status()).toBe(201);

  const createdTodo = await response.json();

  expect(createdTodo).toHaveProperty('id');
  expect(createdTodo.todo).toBe(newTodo.todo);
  expect(createdTodo.completed).toBe(false);
  expect(createdTodo.userId).toBe(5);

});

test('DELETE /todos - should delete a todo by ID', async ({ request }) => {
  const response = await request.delete('/todos/1');

  expect(response.ok()).toBeTruthy();
  expect(response.status()).toBe(200);

  const result = await response.json();
  expect(result.id).toBe(1);
  expect(result.isDeleted).toBe(true);
  expect(result.deletedOn).toBeDefined();

});
