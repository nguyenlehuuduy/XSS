const express = require("express");
const session = require("express-session");
const fs = require("fs");

const port = 3000;
const app = express();

let reviews = [];

app.use(express.static("public"));
app.use(
  session({
    secret: "my-secret",
    resave: true,
    saveUninitialized: true,
    cookie: {
      httpOnly: false, // true : ngăn chặn mã JavaScript trên trang web từ truy cập vào giá trị của cookie.
    },
  })
);

app.get("/", function (req, res) {
  if (req.query.newReview) reviews.push(req.query.newReview);
  const formattedReviews = reviews
    .map((review) => `<dt>Hữu Duy</dt><dd>${review}</dd>`)
    .join(" ");
  const template = fs.readFileSync("./templates/index.html", "utf8");
  const view = template.replace("$reviews$", formattedReviews);
  res.send(view);
});

app.listen(port, () =>
  console.log(`The server is listening at http://localhost:${port}`)
);
