const express = require("express");
const questionRoute = express.Router();
const Question = require("../models/Question");
const AsyncHandler = require("express-async-handler");

// Rota para pegar uma pergunta (por ordem ou ID)
// questionRoute.get('/', async (req, res) => {
//     const questionIndex = req.query.current || 0; // Pega a pergunta atual, 0 por padrão
//     const questions = await Question.find();

//     if (questionIndex < questions.length) {
//         res.json(questions[questionIndex]); // Envia a pergunta atual
//     } else {
//         res.status(404).send('Nenhuma pergunta disponível');
//     }
// });

questionRoute.get(
  "/",
  AsyncHandler(async (req, res) => {
    const questions = await Question.find({});
    res.json(questions);
  })
);

module.exports = questionRoute;
