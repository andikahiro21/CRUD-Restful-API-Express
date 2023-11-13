const express = require("express");
const joi = require("joi");
const fs = require("fs");
const app = express();

const PORT = 3000;
const database = "./database/db.json";
const data = JSON.parse(fs.readFileSync(database));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const handleServerError = (res) => {
  return res.status(500).json({ message: "Internal Server Error" });
};

const handleClientError = (res, status, message) => {
  return res.status(status).json({ message });
};

app.get("/all/:bookstore", (req, res) => {
  try {
    const { bookstore } = req.params;
    if (!data[bookstore]) {
      return handleClientError(res, 404, "Bookstore Not Found");
    }
    return res.status(200).json({ data: data[bookstore], status: "Success" });
  } catch (error) {
    return handleServerError(res);
  }
});

app.get("/all/:bookstore/:genre/:name", (req, res) => {
  try {
    const { bookstore, genre, name } = req.params;
    if (!data[bookstore] || !data[bookstore][genre] || !data[bookstore][genre].find((item) => item.name.toLowerCase() === name.toLowerCase())) {
      return handleClientError(res, 404, "Book Not Found");
    }
    const selectedBook = data[bookstore][genre].filter((item) => item.name.toLowerCase() === name.toLowerCase());
    return res.status(202).json({ data: selectedBook[0], message: "Success" });
  } catch (error) {
    return handleServerError(res);
  }
});

app.post("/create/:bookstore/:genre", (req, res) => {
  try {
    const { bookstore, genre } = req.params;
    const newData = req.body;

    const scheme = joi.object({
      name: joi.string().min(3).required(),
      description: joi.string().required(),
      stock: joi.number().required(),
    });

    const { error } = scheme.validate(newData);
    if (error) {
      res.status(400).json({ status: "Validation Failed", message: error.details[0].message });
    }

    if (data[bookstore][genre].find((item) => item.name.toLowerCase() === newData.name.toLowerCase())) {
      return handleClientError(res, 400, "Book Already Existed");
    }

    data[bookstore][genre].push(newData);

    fs.writeFileSync(database, JSON.stringify(data));

    return res.status(201).json({ data: data[bookstore][genre], status: "Success" });
  } catch (error) {
    return handleServerError(res);
  }
});

app.put("/buy/:bookstore/:genre/:name", (req, res) => {
  try {
    const { bookstore, genre, name } = req.params;

    const bookSold = data[bookstore][genre].find((item) => item.name.toLowerCase() === name.toLowerCase());

    if (!bookSold) {
      return handleClientError(res, 404, "Book Not Found");
    }

    if (bookSold && bookSold.stock < 1) {
      return handleClientError(res, 404, "Book Sold Out");
    }

    const filtered = data[bookstore][genre].filter((item) => item.name.toLowerCase() !== name.toLowerCase());

    if (bookSold) {
      bookSold.stock -= 1;
      filtered.push(bookSold);
    }

    data[bookstore][genre] = filtered;

    fs.writeFileSync(database, JSON.stringify(data));

    return res.status(200).json({ data: bookSold, message: "Purchase Successful" });
  } catch (error) {
    return handleServerError(res);
  }
});

app.delete("/all/:bookstore/:genre/:name", (req, res) => {
  try {
    const { bookstore, genre, name } = req.params;

    if (!data[bookstore][genre].find((item) => item.name.toLowerCase() === name.toLowerCase())) {
      return handleClientError(res, 404, "Book Not Found");
    }

    const filtered = data[bookstore][genre].filter((el) => el.name.toLowerCase() !== name.toLowerCase());
    data[bookstore][genre] = filtered;
    fs.writeFileSync(database, JSON.stringify(data));

    return res.status(200).json({ data: data[bookstore][genre], message: "Success" });
  } catch (error) {
    return handleServerError(res);
  }
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
