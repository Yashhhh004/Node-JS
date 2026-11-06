# HTTP Methods in Node.js

A comprehensive, beginner-friendly guide covering HTTP methods (verbs), their roles in REST APIs, the differences between PUT and PATCH, and how to handle them in Node.js.

---

## 1. What is an HTTP Method?

An **HTTP Method** (also called an **HTTP Verb**) is a standard keyword in an HTTP request that informs the server what kind of action the client wants to perform on a target resource.

Just as English sentences use verbs (e.g., *read, write, delete*) to express actions, HTTP uses verbs (e.g., `GET`, `POST`, `DELETE`) to express actions on web resources:
- **`GET /products`**: "Please **get** (read) the list of products."
- **`POST /products`**: "Please **create** a new product."
- **`DELETE /products/15`**: "Please **delete** product number 15."

---

## 2. Why Do We Need HTTP Methods?

1. **Clean RESTful API Design**:
   Instead of inventing dozens of messy custom URLs (such as `/getUsers`, `/createNewUser`, `/deleteUserById`, `/updateUser`), REST APIs use a single clean resource path (`/users`) and differentiate actions purely by the HTTP method:
   - `GET /users` $\rightarrow$ Fetch all users
   - `POST /users` $\rightarrow$ Create a new user
   - `GET /users/:id` $\rightarrow$ Fetch one specific user
   - `PUT /users/:id` $\rightarrow$ Replace user entirely
   - `PATCH /users/:id` $\rightarrow$ Update a specific user field
   - `DELETE /users/:id` $\rightarrow$ Remove user
2. **Predictability & Standardization**: Every developer and HTTP tool (browsers, Postman, curl, search engines) immediately understands the intent of the request.
3. **Caching & Efficiency**: Browsers and CDNs automatically know that `GET` requests can be safely cached, while `POST` or `DELETE` requests modify data and must never be cached without explicit instruction.

---

## 3. How Many Types of HTTP Methods Are Available?

There are **9 official HTTP methods** defined in the HTTP specification:

### Primary Methods (Used in Daily Development):
1. **`GET`**: Retrieves data from the server. It must only fetch data and never modify server state.
2. **`POST`**: Submits data to the server to create a new record or trigger a process.
3. **`PUT`**: Completely replaces an existing resource with the incoming data payload.
4. **`PATCH`**: Partially updates specific fields of an existing resource without touching the rest.
5. **`DELETE`**: Deletes a specified resource from the server.

### Secondary / Infrastructure Methods:
6. **`HEAD`**: Identical to `GET`, but asks the server to return **headers only** (no response body). Useful to check if a file exists or check `Content-Length` before downloading a massive file.
7. **`OPTIONS`**: Asks the server which HTTP methods and headers are supported for that URL. Used automatically by browsers during **CORS preflight checks**.
8. **`TRACE`**: Performs a message loop-back test along the path to the target resource for debugging.
9. **`CONNECT`**: Establishes a two-way network tunnel with the server (commonly used for SSL/HTTPS proxies).

---

## 4. CRUD vs HTTP Methods Mapping

| CRUD Operation | Database Action (SQL / NoSQL) | HTTP Method |
| :--- | :--- | :--- |
| **C**reate | `INSERT` / `db.collection.insertOne()` | **`POST`** |
| **R**ead | `SELECT` / `db.collection.find()` | **`GET`** |
| **U**pdate (Full) | `UPDATE` (all columns) | **`PUT`** |
| **U**pdate (Partial)| `UPDATE` (specific columns) | **`PATCH`** |
| **D**elete | `DELETE` / `db.collection.deleteOne()` | **`DELETE`** |

---

## 5. What is the Difference Between PATCH and PUT, and Which is Good to Use?

Both `PUT` and `PATCH` are used to update existing resources, but their update behavior is fundamentally different:

### Direct Comparison:

| Feature | `PUT` (Full Replacement) | `PATCH` (Partial Update) |
| :--- | :--- | :--- |
| **Meaning** | Replace the resource completely | Modify only specified fields |
| **Payload required** | Must send the **entire** object | Send **only** the fields that changed |
| **Missing fields** | Any omitted field is erased, set to `null`, or reset to default | Omitted fields remain completely unchanged |
| **Idempotency** | **Idempotent** (Calling 10 times gives same result) | **Not necessarily idempotent** |
| **Bandwidth** | Higher (sends full resource) | Lower (sends only delta / changes) |

### Visual Example:

Suppose we have a user in our database:
```json
{
  "id": 101,
  "name": "Yash",
  "email": "yash@example.com",
  "role": "admin"
}
```

#### If you send a `PUT` request with `{ "name": "Yash K" }`:
Since `PUT` replaces the **entire** document, the missing fields (`email`, `role`) are wiped out:
```json
// Result after PUT:
{
  "id": 101,
  "name": "Yash K",
  "email": null,
  "role": null
}
```

#### If you send a `PATCH` request with `{ "name": "Yash K" }`:
Only the `name` field is modified; all other fields stay intact:
```json
// Result after PATCH:
{
  "id": 101,
  "name": "Yash K",
  "email": "yash@example.com",
  "role": "admin"
}
```

### Which is Good to Use?
- **Use `PATCH` for 90% of real-world scenarios**:
  - Updating a user's password, updating an profile picture, toggling a todo's `isCompleted` status, or modifying an email.
  - It saves network bandwidth and prevents race conditions where two users accidentally overwrite each other's unrelated fields.
- **Use `PUT` only when**:
  - You want to replace an entire record completely, or
  - You want "upsert" functionality (create the resource if it does not already exist, or replace it if it does).

---

## 6. Handling HTTP Methods in Node.js (Code Example)

Here is how you check and handle different HTTP methods in vanilla Node.js:

```javascript
const http = require('node:http');

const server = http.createServer((req, res) => {
  const { method, url } = req;

  // Set default header
  res.setHeader('Content-Type', 'application/json');

  if (url === '/api/user') {
    switch (method) {
      case 'GET':
        res.writeHead(200);
        res.end(JSON.stringify({ message: "Fetched user profile" }));
        break;

      case 'POST':
        res.writeHead(201);
        res.end(JSON.stringify({ message: "Created new user" }));
        break;

      case 'PATCH':
        res.writeHead(200);
        res.end(JSON.stringify({ message: "User field updated successfully" }));
        break;

      case 'PUT':
        res.writeHead(200);
        res.end(JSON.stringify({ message: "User completely replaced" }));
        break;

      case 'DELETE':
        res.writeHead(200);
        res.end(JSON.stringify({ message: "User deleted" }));
        break;

      default:
        res.writeHead(405); // 405 Method Not Allowed
        res.end(JSON.stringify({ error: `Method ${method} not allowed` }));
        break;
    }
  } else {
    res.writeHead(404);
    res.end(JSON.stringify({ error: "Route not found" }));
  }
});

server.listen(8000, () => {
  console.log("Server listening on http://localhost:8000");
});
```

---

## Important Forgotten Concepts (Key Additions)

### 1. Safe vs Idempotent Methods

In HTTP architecture, methods are classified into two crucial categories:

- **Safe Method**: A method that **does not alter** server state or data. Calling it never changes anything on the server.
  - Safe methods: `GET`, `HEAD`, `OPTIONS`.
- **Idempotent Method**: A method where making the same request multiple times produces the exact same end result on the server as making it once.
  - Idempotent methods: `GET`, `PUT`, `DELETE`, `HEAD`, `OPTIONS`.
  - Non-idempotent methods: `POST` (calling `POST /orders` 5 times creates 5 separate orders and charges your credit card 5 times!).

| HTTP Method | Safe? | Idempotent? |
| :--- | :---: | :---: |
| **`GET`** | Yes | Yes |
| **`HEAD`** | Yes | Yes |
| **`OPTIONS`** | Yes | Yes |
| **`PUT`** | No | Yes |
| **`DELETE`** | No | Yes |
| **`POST`** | No | No |
| **`PATCH`** | No | Generally No |

### 2. CORS Preflight & The `OPTIONS` Method
When a frontend on `http://localhost:5173` calls an API on `http://localhost:8000` with custom headers or `PUT`/`PATCH`/`DELETE`, the browser automatically fires an `OPTIONS` request first.
- The browser asks: *"Hey server, do you allow PUT requests from my origin?"*
- Your server must answer with status `204 No Content` and header `Access-Control-Allow-Methods: GET, POST, PUT, PATCH, DELETE` before the browser allows the actual request to go through.
