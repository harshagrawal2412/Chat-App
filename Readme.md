
# Online Chat App

This is a project on MERN stack using socket.io with realtime chatting feature with 1-1 conversation and group messaging.



## Run Locally

Install dependencies

```bash
  npm install
```

Start the server

```bash
  nodemon server
```

## API Reference

To start backend:


### User APIs
#### Get all users

```http
  GET /api/user
```

| Header          | Type              | Description                |
| :--------       | :-------          | :------------------------- |
| `Authorizarion` | `Bearer {Token}`  | **Required**. Token        |

#### login

```http
  POST /api/user/login
```

| Header              | Type               | Description                       |
| :--------           | :-------           | :-------------------------------- |
| `Content-Type`      | `Application/JSON` | **Required**. {email,password} |


#### Register

```http
  POST /api/user/
```

| Header              | Type               | Description                       |
| :--------           | :-------           | :-------------------------------- |
| `Content-Type`      | `Application/JSON` | **Required**. {name,email,password} |

#### Get Online-users

```http
  GET /api/user/online-user
```
| Header          | Type              | Description                |
| :--------       | :-------          | :------------------------- |
| `Authorizarion` | `Bearer {Token}`  | **Required**. Token        |

#### Update Online-user
```http
  PUT /api/user/online-user/${id}
```
| param           | Type              | Description                |
| :--------       | :-------          | :------------------------- |
| `is`            | `id`              | **Required**. Token        |




### Message APIs


#### Get message details

```http
  GET /api/message/${id}
```

| Header          | Type              | Description                |
| :--------       | :-------          | :------------------------- |
| `Authorizarion` | `Bearer {Token}`  | **Required**. Token        |

#### Sending new message

```http
  POST /api/message
```

| Header              | Type               | Description                       |
| :--------           | :-------           | :-------------------------------- |
| `Content-Type`      | `Application/JSON` | **Required**. {content,chatId} |



### Chat APIs

#### Access Chat

```http
  POST /api/chat
```

| Header          | Type              | Description                |
| :--------       | :-------          | :------------------------- |
| `Authorizarion` | `Bearer {Token}`  | **Required**. Token        |
| `Content-Type`  | `Application/JSON`| **Required**. {userId}     |

#### Fetch Chats

```http
  GET /api/chat
```

| Header              | Type               | Description                       |
| :--------           | :-------           | :-------------------------------- |
| `Authorizarion`     | `Bearer {Token}`   | **Required**. Token               |


#### Create Groups

```http
  POST /api/chat/group
```

| Header          | Type              | Description                |
| :--------       | :-------          | :------------------------- |
| `Authorizarion` | `Bearer {Token}`  | **Required**. Token                    |
| `Content-Type`  | `Application/JSON`| **Required**. {name,users[userId]}     |

#### Rename Group

```http
  PUT /api/chat/rename
```
| Header          | Type              | Description                |
| :--------       | :-------          | :------------------------- |
| `Authorizarion` | `Bearer {Token}`  | **Required**. Token        |
| `Content-Type`  | `Application/JSON`| **Required**. {chatId,chatName}     |

#### Remove user
```http
  PUT /api/chat/groupremove
```
| Header          | Type              | Description                |
| :--------       | :-------          | :------------------------- |
| `Authorizarion` | `Bearer {Token}`  | **Required**. Token        |
| `Content-Type`  | `Application/JSON`| **Required**. {userId}     |

#### Add user
```http
  PUT /api/chat/groupadd
```
| Header          | Type              | Description                |
| :--------       | :-------          | :------------------------- |
| `Authorizarion` | `Bearer {Token}`  | **Required**. Token        |
| `Content-Type`  | `Application/JSON`| **Required**. {userId}     |

