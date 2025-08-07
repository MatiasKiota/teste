const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());

let statusLoja = "aberto"; // status inicial

app.get('/status', (req, res) => {
  res.json({ status: statusLoja });
});

app.get('/mudar/:novoStatus', (req, res) => {
  const novoStatus = req.params.novoStatus.toLowerCase();
  if (novoStatus === 'aberto' || novoStatus === 'fechado') {
    statusLoja = novoStatus;
    return res.json({ mensagem: `Status alterado para ${novoStatus}` });
  }
  res.status(400).json({ erro: "Status inválido" });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
