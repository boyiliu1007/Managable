# Backend API

## Development
```sh
cd backend
npm install
npm run dev
```

## API
### User
<details>
<summary><code>POST /api/user/register</code> - User registration</summary>

**Body**
| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| username | String | Yes | Username |
| password | String | Yes | Password |

**Response**
| HTTP Code | Content-Type | Body |
| --------- | ------------ | ---- |
| 400 | application/json | `{ "error": "Username and password are required" }` |
| 400 | application/json | `{ "error": "Username already exists" }` |
| 201 | application/json | `{ "message": "User created successfully" }` |
</details>

<details>
<summary><code>POST /api/user/login</code> - Login</summary>

**Body**
| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| username | String | Yes | Username |
| password | String | Yes | Password |

**Response**
| HTTP Code | Content-Type | Body |
| --------- | ------------ | ---- |
| 400 | application/json | `{ "error": "Username and password are required" }` |
| 400 | application/json | `{ "error": "Invalid password" }` |
| 200 | application/json | `{ "token": "<Token>" }` |
</details>

### Task
The following endpoints require a valid bearer token in the `Authorization` header, which can be obtained by logging in.


<!-- Get all tasks -->
<details>
<summary><code>GET /api/task</code> - Get all tasks</summary>

**Query**
| Name | Type | Description |
| ---- | ---- | ----------- |
| sortBy | String | Sort tasks by a field |
| order | asc/desc | Sort order |
| status | String | Filter tasks by status |

**Response**
| HTTP Code | Content-Type | Body |
| --------- | ------------ | ---- |
| 200 | application/json | Array of tasks |
</details>

<!-- Get a Task -->
<details>
<summary><code>GET /api/task/:id</code> - Get a task</summary>

**Params**
| Name | Type | Description |
| ---- | ---- | ----------- |
| id | String | Task ID |

**Response**
| HTTP Code | Content-Type | Body |
| --------- | ------------ | ---- |
| 200 | application/json | Task |
| 404 | application/json | `{ "error": "Task not found" }` |
</details>

<!-- Add a task -->
<details>
<summary><code>POST /api/task/:id</code> - Add a task</summary>

**Params**
| Name | Type | Description |
| ---- | ---- | ----------- |
| id | String | Task ID |

**Response**
| HTTP Code | Content-Type | Body |
| --------- | ------------ | ---- |
| 201 | application/json | Task |

</details>

<!-- Edit a task -->
<details>
<summary><code>PUT /api/task/:id</code> - Edit a task</summary>

**Params**
| Name | Type | Description |
| ---- | ---- | ----------- |
| id | String | Task ID |

**Response**
| HTTP Code | Content-Type | Body |
| --------- | ------------ | ---- |
| 200 | application/json | Task |
</details>

<!-- Delete a task -->
<details>
<summary><code>DELETE /api/task/:id</code> - Delete a task</summary>

**Params**
| Name | Type | Description |
| ---- | ---- | ----------- |
| id | String | Task ID |

**Response**
| HTTP Code | Content-Type | Body |
| --------- | ------------ | ---- |
| 200 | application/json | `{ "message": "Task deleted" }` |

</details>