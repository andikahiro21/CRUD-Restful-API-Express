# Basic Express

Basic express.js project with basic routes:

- Express
- Joi
- Fs

---

## URL

_Server_

```
http://localhost:3000
```

---

## Global Response

_Response (500 - Internal Server Error)_

```
{
  "message": "Internal Server Error"
}
```

---

## RESTful endpoints

### POST /create/:bookstore/:genre

> Create book

_Request Header_

```
not needed
```

_Request Body_

```
{
  "name" : "<name>",
  "description" : "<description>"
  "stock" : <stock>
}
```

_Response (200)_

```
{
    "data": [<data_genre>],
    "status": "Success"
}
```

_Response (400 - Validation Error)_

```
{
    "status": "Validation Failed",
    "message": "\"description\" is required"
}
```

---

### GET /all/:bookstore

> Get all by bookstore

_Request Header_

```
not needed
```

_Request Body_

```
not needed
```

_Response (200)_

```
{

    "data": {
        "<data_bookstore>": [
	        <data_genre>
	       ]
        },

    "status": "Success"

}
```

---

### GET /all/:bookstore/:genre/:name

> Get by name

_Request Params_

```
<bookstore_name>/<genre_name>/<book_name>

```

_Request Header_

```
not needed
```

_Request Body_

```
not needed
```

_Response (200)_

```
{
    "data": {
        "name": "<name>",
        "description": "<description>"
        "stock": <stock>
    },
    "message": "Success"
}
```

_Response (404)_

```
{
    "message": "Book Not Found"
}
```

---

### PUT /all/:bookstore/:genre/:name

> Update Stock

_Request Params_

```
/<bookstore_name>/<genre_name>/<book_name>
```

_Request Header_

```
not needed
```

_Request Body_

```
not needed
```

_Response (200)_

```
{
    "data": {
        <book_data>
    },
    "message": "Purchase Successful"
}
```

_Response (404)_

```
{
    "message": "Book Sold Out"
}
```

_Response (404 - Error Not Found)_

```
{
    "message": "Book Not Found"
}
```

---

### DELETE /all/:bookstore/:genre/:name

> Delete by name

_Request Params_

```
/<bookstore_name>/<genre_name>/<name>
```

_Request Header_

```
not needed
```

_Request Body_

```
not needed
```

_Response (200)_

```
{
    "data": [<genre_list>],
    "message": "Success"
}
```

_Response (404 - Error Not Found)_

```
{
    "message": "Book Not Found"
}
```

---
