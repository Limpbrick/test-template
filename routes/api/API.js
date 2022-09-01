// Our API
const express = require("express");
const uuid = require("uuid");
const router = express.Router();
const datas = require("../../db/SCHEMA"); // Our Schema database

// Gets All Data
router.get("/", (req, res) => res.json(datas));

// Get Single Data
router.get("/:id", (req, res) => {
  const found = datas.some((data) =>
  data.id === parseInt(req.params.id));

  if (found) {
    res.json(datas.filter((data) =>
    data.id === parseInt(req.params.id)));
  } else {
    res.status(400).json({
      msg: `No member with the id of ${req.params.id}`
    });
  }
});

// Create Data
router.post("/", (req, res) => {
  const newData = {
    id: uuid.v4(),
    name: req.body.name,
    username: req.body.username,
  };

  if (!newData.name || !newData.username) {
    return res.status(400).json({
      msg: "Please include a name and username"
    });
  }

  datas.push(newData);
  //res.json(datas);
  res.redirect("/");
});

// Update Data
router.put("/:id", (req, res) => {
  const found = datas.some((data) =>
  data.id === parseInt(req.params.id));

  if (found) {
    const updData = req.body;
    datas.forEach((data) => {
      if (data.id === parseInt(req.params.id)) {
        data.name = updData.name ? updData.name : data.name;
        data.username = updData.username ? updData.username : data.username;

        res.json({
          msg: "Updated",
          data,
        });
      }
    });
  } else {
    res.status(400).json({
      msg: `No member with the id of ${req.params.id}`
    });
  }
});

// Delete Data
router.delete("/:id", (req, res) => {
  const found = datas.some((data) =>
  data.id === parseInt(req.params.id));

  if (found) {
    res.json({
      msg: "Deleted",
      datas: datas.filter((data) =>
      data.id !== parseInt(req.params.id)),
    });
  } else {
    res.status(400).json({ 
      msg: `No member with the id of ${req.params.id}` 
    });
  }
});

module.exports = router;
