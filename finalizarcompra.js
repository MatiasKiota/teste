document.addEventListener('DOMContentLoaded', () => {
  const tipoEntrega = document.getElementById('tipo-entrega');
  const enderecoEntrega = document.getElementById('endereco-entrega');
  const btnCalcularFrete = document.getElementById('btn-calcular-frete');
  const valorFreteEl = document.getElementById('valor-frete');
  const totalGeralEl = document.getElementById('total-geral');
  const ruaInput = document.getElementById('rua');
  const cepInput = document.getElementById('cep');

  let frete = 0;

  // Lê o valor do pedido salvo no localStorage (salvo como número)
  const valorPedido = parseFloat(localStorage.getItem('valorPedido'));

  // Define constantes da loja para cálculo do frete
  const cepLojaInicio = '06160';
  const ruaLoja = 'zumbi dos palmares';

  // Exibe o valor do pedido ao carregar a página
  if (!isNaN(valorPedido)) {
    totalGeralEl.textContent = `Total geral: R$ ${valorPedido.toFixed(2).replace('.', ',')}`;
  } else {
    totalGeralEl.textContent = 'Total geral: R$ 0,00';
  }

  // Controla visibilidade do formulário de endereço
  tipoEntrega.addEventListener('change', () => {
    if (tipoEntrega.value === 'entrega') {
      enderecoEntrega.classList.remove('escondido');
    } else {
      enderecoEntrega.classList.add('escondido');
      frete = 0;
      valorFreteEl.textContent = '';
      totalGeralEl.textContent = `Total geral: R$ ${valorPedido.toFixed(2).replace('.', ',')}`;
    }
  });

  // Botão para calcular o frete
  btnCalcularFrete.addEventListener('click', () => {
    const cepCliente = cepInput.value.replace(/\D/g, '').slice(0, 5);
    const ruaCliente = ruaInput.value.trim().toLowerCase();

    if (!cepCliente || ruaCliente === '') {
      alert('Preencha a rua e o CEP para calcular o frete.');
      return;
    }

    if (ruaCliente.includes(ruaLoja)) {
      frete = 0;
    } else if (cepCliente === cepLojaInicio) {
      frete = 10;
    } else {
      frete = 20;
    }

    valorFreteEl.textContent = `Frete calculado: R$ ${frete.toFixed(2).replace('.', ',')}`;

    const totalComFrete = valorPedido + frete;
    totalGeralEl.textContent = `Total geral: R$ ${totalComFrete.toFixed(2).replace('.', ',')}`;
  });

  // Submissão do formulário (exemplo)
  document.getElementById('formulario-pedido').addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Pedido enviado com sucesso!');
    localStorage.removeItem('valorPedido');
  });
});
