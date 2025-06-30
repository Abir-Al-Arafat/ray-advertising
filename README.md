# Ray Advertising - RESTful API

A simple RESTful API built with **TypeScript**, **Express**, and **Node.js** to perform CRUD operations. 

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [npm](https://www.npmjs.com/)
- (Optional) [Postman](https://www.postman.com/) or [Insomnia](https://insomnia.rest/) for testing the API

---

### 🔧 Installation

1. **Clone the repository**

```bash
git clone https://github.com/Abir-Al-Arafat/ray-advertising.git
cd ray-advertising
```

2. **Install dependencies**

```bash
npm install
```

3. **Start the server**
- In development mode:
```bash
npm run dev
```

3. **In production mode**
- In production mode:
```bash
npm run build
```
```bash
npm start
```
---
## ✅ Features

- Create, Read, Update, Delete (CRUD) operations
- Error handling with appropriate HTTP status codes
- Input validation with `express-validator`
- Clean and scalable code structure
- TypeScript-based development
- Dev mode using `nodemon`


| Method | Endpoint     | Description             |
| ------ | ------------ | ----------------------- |
| POST   | `/items`     | Create a new item       |
| GET    | `/items`     | Retrieve all items      |
| GET    | `/items/:id` | Get a single item by ID |
| PUT    | `/items/:id` | Update item by ID       |
| DELETE | `/items/:id` | Delete item by ID       |

---

## 🧪 Example Request (POST `/items`)

### Request Body

```json
{
  "name": "Sample Product",
  "price": 29.99,
  "description": "Sample Product Description"
}
```

## Sample Response

```json
{
    "success": true,
    "message": "item added successfully",
    "data": {
        "id": 1,
        "name": "Sample Product",
        "price": 29.99,
        "description": "Sample Product Description"
    }
}
```

---

## 📁 Project Structure


**Folder Descriptions:**

- `src/controllers/` – Business logic for API endpoints  
- `src/routes/` – Route definitions for the API  
- `src/interfaces/` – TypeScript interfaces  
- `src/middlewares/` – Error handling, validation, etc.  
- `src/index.ts` – Entry point of the application  
- `dist/` – Compiled JavaScript files (after build)  
- `package.json` – Project metadata and scripts  
- `tsconfig.json` – TypeScript configuration  
- `README.md` – Project documentation


