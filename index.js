const express = require('express');
const dotenv = require("dotenv");
const bodyParser = require("body-parser");

const loggerMiddleware = require("./middleware/logger");
const errorMiddleware = require("./middleware/error");

const booksApiRouter = require("./routes/api/books");
const booksRouter = require("./routes/books");
const indexRouter = require("./routes/index");

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(loggerMiddleware);


app.use("/", indexRouter);
app.use("/book", booksRouter);
app.use("/api/books", booksApiRouter);
app.post("/api/user/login", (req, res) => {

  res.statusCode = 201;
  res.json({id: 1, mail: "test@mail.ru"});
});

app.use(errorMiddleware);

app.listen(PORT, () => console.log(`start server PORT ${PORT} ===`));
