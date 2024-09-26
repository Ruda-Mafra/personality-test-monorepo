const express = require("express");
const router = express.Router();
const Result = require("../models/Result"); // Importe o modelo de Result

// Função para calcular o resultado com base na pontuação total
async function calculateResult(score) {
  try {
    // Encontra o resultado que corresponde ao intervalo de pontuação
    console.log(`Buscando resultado para a pontuação: ${score}`);
    const result = await Result.findOne({
      minScore: { $lte: score },
      maxScore: { $gte: score },
    });

    console.log("Resultado encontrado:", result);

    if (result) {
      return result.result;
    } else {
      throw new Error("Resultado não encontrado.");
    }
  } catch (error) {
    throw new Error("Erro ao calcular o resultado: " + error.message);
  }
}

// Rota GET para obter o resultado com base na pontuação total
router.get("/:score", async (req, res) => {
  const score = parseInt(req.params.score);

  if (isNaN(score)) {
    return res.status(400).json({ error: "Pontuação inválida." });
  }

  try {
    const resultDescription = await calculateResult(score);
    res.json({ result: resultDescription });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
