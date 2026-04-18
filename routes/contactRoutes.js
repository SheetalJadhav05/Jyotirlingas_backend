const express = require("express");
const {
  sendMessage,
  getMessages,
  deleteMessage,
} = require("../controllers/contactController");

const router = express.Router();

router.post("/", sendMessage);
router.get("/", getMessages);
router.delete("/:id", deleteMessage);
module.exports = router;
