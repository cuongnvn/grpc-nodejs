const client = require("./client");

const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/news", (req, res) => {
  client.getAllNews({}, (error, news) => {
    // if (error) throw error;
    if (error) return res.status(404).send(error);
    res.send(news);
  });
});

app.get("/news/:id", (req, res) => {
  client.getNews({ id: req.params.id }, (error, news) => {
    if (error) return res.status(404).send(error);
    return res.send(news);
  });
});

app.post("/news", (req, res) => {
  client.addNews(
    {
      body: req.body.body,
      postImage: req.body.postImage,
      title: req.body.title,
    },
    (error, news) => {
      if (error) return res.status(404).send(error);
      return res.send({ data: news, msg: "Successfully created a news." });
    }
  );
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running at port %d", PORT);
});
