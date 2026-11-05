# Web & Server Terminologies in Node.js

A comprehensive, beginner-friendly dictionary explaining all fundamental networking and server terminologies used in backend Node.js development.

---

## 1. What is a Client?
A **client** is any device, program, or user interface that requests data or services from a server.
- **Examples**: Google Chrome, Firefox, Postman, a mobile app on Android/iOS, or even another Node.js server.
- **Role**: Sends requests and displays or processes the response received from the server.

---

## 2. What is a Server?
A **server** is a computer program (or dedicated machine) that waits for incoming requests from clients, processes the requests, and sends back appropriate responses.
- **Examples**: A Node.js HTTP server, Apache, Nginx, or a PostgreSQL database server.
- **Role**: Protects business logic, connects to databases, and serves resources (HTML, JSON, images).

---

## 3. What is Client-Server Architecture?
The **Client-Server Architecture** is the fundamental computing model of the internet where workloads are partitioned between two separate entities:
1. **The Client (Frontend)**: Initiates communication and requests resources.
2. **The Server (Backend)**: Listens for requests, performs authentication and computation, and returns responses.

```
 ┌─────────────────┐       HTTP Request       ┌─────────────────┐
 │     Client      ├─────────────────────────►│     Server      │
 │ (Browser / App) │◄─────────────────────────┤    (Node.js)    │
 └─────────────────┘       HTTP Response      └─────────────────┘
```
- **Why it matters**: It separates concerns — the user interface runs on user devices, while sensitive data and business rules remain secure on central servers.

---

## 4. What is HTTP?
**HTTP** stands for **Hypertext Transfer Protocol**.
- It is the standard set of rules and grammar that governs how web browsers and servers communicate over the internet.
- **Stateless Nature**: HTTP is inherently stateless — each request is independent; the server does not remember previous requests from the same client unless tracking mechanisms like Cookies, Sessions, or JWT tokens are used.
- **HTTPS**: Secure HTTP encrypted using TLS/SSL to prevent eavesdropping and data tampering.

---

## 5. What is a Request?
An **HTTP Request** is a message sent by a client to a server asking to perform an action or retrieve information.
- A request contains:
  1. A target URL path (e.g., `/users`).
  2. An HTTP Method (e.g., `GET`, `POST`).
  3. Headers (metadata about the client and format).
  4. An optional body (data sent to server).

---

## 6. Explain Request Important Keys (`req`)

In Node.js, `http.createServer((req, res) => { ... })` passes an `IncomingMessage` object called `req`. Here are its most important properties:

| Key / Property | What it does | Example Value |
| :--- | :--- | :--- |
| **`req.url`** | The URL path and query string requested by the client | `"/api/users?page=1"` |
| **`req.method`** | The HTTP verb used for the request | `"GET"`, `"POST"`, `"DELETE"` |
| **`req.headers`** | An object containing all headers sent by the client | `{ "content-type": "application/json", "user-agent": "Mozilla..." }` |
| **`req.socket.remoteAddress`** | The IP address of the client making the request | `"127.0.0.1"` or `"192.168.1.5"` |
| **`req.statusCode`** | (When making outgoing requests) The HTTP response code | `200`, `404` |
| **Request Body Stream** | Raw incoming payload streams in chunks via data events | `req.on('data', chunk => ...)` |

---

## 7. What is a Response?
An **HTTP Response** is the message sent back by the server to the client after processing its request.
- A response contains:
  1. **Status Code**: A 3-digit number indicating success or failure (e.g., `200 OK`, `404 Not Found`).
  2. **Headers**: Metadata about the payload (e.g., `Content-Type: application/json`).
  3. **Body**: The actual data (HTML, JSON, plain text, file download).

### Key Response Methods in Node.js (`res`):
- `res.statusCode = 200`: Sets the HTTP status code.
- `res.setHeader('Content-Type', 'text/html')`: Sets an individual response header.
- `res.writeHead(status, headers)`: Sends response status and multiple headers at once.
- `res.write(data)`: Streams a chunk of response data to the client.
- `res.end(data)`: Sends the final piece of data and closes the HTTP connection.

---

## 8. What is an IP Address?
An **IP Address** (Internet Protocol Address) is a unique numerical label assigned to every device connected to a computer network.
- **Analogy**: Just like your house has a unique postal street address so mail can be delivered, a computer has an IP address so data packets can find it.
- **Two Major Standards**:
  - **IPv4**: 32-bit format written as four numbers separated by dots (e.g., `192.168.1.1` or `142.250.190.46`).
  - **IPv6**: 128-bit hexadecimal format created because IPv4 ran out of unique addresses (e.g., `2001:0db8:85a3:0000:0000:8a2e:0370:7334`).

---

## 9. What is a Domain?
A **Domain** (or Domain Name) is a human-friendly, memorable text name used to identify a website instead of memorizing a numeric IP address.
- **Example**: `google.com`, `github.com`, `nodejs.org`.
- **DNS (Domain Name System)**: Acts as the "phonebook of the internet", translating human-readable domain names like `google.com` into machine IP addresses like `142.250.190.46`.

---

## 10. What is a Host?
A **Host** is any device or computer system connected to a network that provides services, data, or resources to other nodes. In web terminology, the "host" header indicates which specific domain or server machine is handling the request (e.g., `localhost:8000` or `api.mysite.com`).

---

## 11. What is Localhost?
**Localhost** is a standard domain name reserved to mean *"this current computer"*.
- It maps directly to the loopback IP address **`127.0.0.1`** (IPv4) or **`::1`** (IPv6).
- When you tell your browser to visit `http://localhost:8000`, the network request never leaves your computer; it loops right back into your local machine to communicate with your locally running Node.js server.

---

## 12. What is a PORT?
A **Port** is a virtual doorway or numerical communication endpoint on an operating system that routes network traffic to a specific application or process.
- **Analogy**: If an **IP address** is the physical building address of an apartment complex, the **Port** is the specific apartment number inside that building!
- A single computer can run multiple servers simultaneously by binding each one to a different port:
  - Port `80`: Standard unencrypted HTTP web traffic.
  - Port `443`: Standard encrypted HTTPS traffic.
  - Port `3000` / `8000`: Commonly used for local Node.js development.
  - Port `5432`: PostgreSQL database.
  - Port `27017`: MongoDB database.

---

## 13. What is "Server Listening"?
**Server Listening** is the state where a server application has successfully bound itself to a specific IP address and Port number, opened a network socket, and is actively waiting to accept incoming client connections.
```javascript
// The server starts "listening" on Port 8000:
server.listen(8000, () => {
  console.log("Server is listening on http://localhost:8000");
});
```

---

## 14. What is a URL?
**URL** stands for **Uniform Resource Locator**. It is the global address used to locate a specific resource on the internet.

### URL Anatomy:
```
https://www.example.com:8080/products/shoes?category=running&sort=price#reviews
│       │               │    │              │                          │
│       │               │    │              └── Query Parameters       └── Hash/Fragment
│       │               │    └── Path
│       │               └── Port Number
│       └── Host / Domain Name
└── Scheme / Protocol
```

---

## 15. What are HTTP Headers?
**HTTP Headers** are key-value pairs transmitted at the beginning of every request and response to convey metadata, settings, authentication, and content details.

### Common Request Headers:
- `Content-Type`: Tells the server the data format of the body (e.g., `application/json`).
- `Authorization`: Sends security tokens (e.g., `Bearer eyJhbGci...`).
- `User-Agent`: Information about client's browser, OS, and device.
- `Accept`: Tells the server what data formats the client can understand.

### Common Response Headers:
- `Content-Type`: Tells the client how to render the response (`text/html`, `application/json`, `image/png`).
- `Set-Cookie`: Sends session or tracking cookies to be saved in the client's browser.
- `Access-Control-Allow-Origin`: Configures CORS (Cross-Origin Resource Sharing).

---

## Important Forgotten Concepts (Key Additions)

### 1. HTTP Status Codes Cheat Sheet
Every server response must send an HTTP status code to inform the client of the outcome:

| Range | Category | Common Examples | Meaning |
| :--- | :--- | :--- | :--- |
| **`2xx`** | **Success** | `200 OK`<br>`201 Created` | Request was received, understood, and accepted. |
| **`3xx`** | **Redirection** | `301 Moved Permanently`<br>`304 Not Modified` | Further action needed to complete request. |
| **`4xx`** | **Client Error** | `400 Bad Request`<br>`401 Unauthorized`<br>`404 Not Found` | The error was caused by the client (invalid URL or bad data). |
| **`5xx`** | **Server Error** | `500 Internal Server Error`<br>`502 Bad Gateway` | The server failed or crashed while trying to fulfill the request. |

### 2. Modern URL Parsing with the `URL` API
In modern Node.js, avoid deprecated `url.parse()`. Use the WHATWG `URL` class:
```javascript
const fullUrl = new URL(req.url, `http://${req.headers.host}`);
console.log("Pathname:", fullUrl.pathname);               // e.g. "/search"
console.log("Query param:", fullUrl.searchParams.get('q'));// e.g. "nodejs"
```
