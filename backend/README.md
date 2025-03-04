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

**Example**
```javascript
fetch('/api/user/register', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        username: 'user',
        password: 'password'
    })
})
```
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

**Example**
```javascript
fetch('/api/user/login', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        username: 'user',
        password: 'password'
    })
})
```
</details>

### Task
The following endpoints require a valid bearer token in the `Authorization` header, which can be obtained by logging in.


<!-- Get all tasks -->
<details>
<summary><code>GET /api/task</code> - Get all tasks</summary>

**Query**
| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| sortBy | String | No | Sort tasks by a field |
| order | asc/desc | No | Sort order |
| status | String | No | Filter tasks by status |

**Response**
| HTTP Code | Content-Type | Body |
| --------- | ------------ | ---- |
| 200 | application/json | Array of tasks |

**Example**
```javascript
fetch('/api/task?order=desc', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    },
})
```
</details>

<!-- Add a task -->
<details>
<summary><code>POST /api/task/:id</code> - Add a task</summary>

**Body**
| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| title | String | Yes | Title |
| description | String | No | Description |
| due | Date | No | Due date |
| status | String | No | Status (todo / in_progress / done) |
| username | String | Yes | Username |
    

**Response**
| HTTP Code | Content-Type | Body |
| --------- | ------------ | ---- |
| 201 | application/json | `{ "message": "Task created successfully", "task": <Task> }` |
| 400 | application/json | `{ "error": "Title and due date are required" }` |

**Example**
```javascript
fetch('/api/task', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
        title: 'Task',
        description: 'Description',
        due: '2025-12-31',
        status: 'todo',
        username: 'username'
    })
})
```
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

**Example**
```javascript
fetch('/api/task/12345', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    },
})
```
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

**Example**
```javascript
fetch('/api/task/12345', {
    method: 'PUT',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
        status: 'done'
    })
})
```
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


**Example**
```javascript
fetch('/api/task/12345', {
    method: 'DELETE',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    },
})
```
</details>