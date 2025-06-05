# API Tests with Playwright

This project contains automated API tests using [Playwright](https://playwright.dev/), written in TypeScript. The tests are targeting the public [DummyJSON](https://dummyjson.com) API.

---

## 📁 Project Structure

```
├── tests/               # Test files
│   └── products.spec.ts
│   └── todos.spec.ts
├── playwright.config.ts # Playwright configuration (with baseURL)
├── README.md            # You're here!
```

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run tests

```bash
npx playwright test
```
---

## 🔧 Configuration

Playwright is configured with a `baseURL` pointing to `https://dummyjson.com`, which simplifies API calls like:

```ts
await request.get('/products/1');
```

---

## 🧪 Covered Test Areas

* **Products**

  * `GET /products/:id`
  * `POST /products/add`

* **Todos**

  * `GET /todos/:id`
  * `POST /todos/add`
  * `DELETE /todos/:id`

---

## 📝 Notes

* The API is public and non-persistent. `POST`, `PUT`, `DELETE` operations simulate success, but don’t actually save data.
* Test results are intended for educational/demo purposes.


