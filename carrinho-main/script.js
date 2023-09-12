// Declaração do Array produtos;
const produtos = [
    {
        id: "1",
        nome: "Informática para Internet: Interfaces Web II",
        prof: "Prof. Kelly",
        preco_de: 80,
        preco_por: 50,
        descricao: "O melhor curso de JavaScript",
        imagem: "./assets/1.png",
    },
    {
        id: "2",
        nome: "Gestão de conteúdo Web II",
        prof: "Prof. Kelly",
        preco_de: 80,
        preco_por: 50,
        descricao: "O melhor curso de JavaScript",
        imagem: "./assets/3.png",  
    }
];

function renderizaProdutos() { // Função que renderiza os produtos em nossa página.
    let html = ""; // Inicializa a string vazia. Armazena o HTML dos produtos.
    for (let i = 0; i < produtos.length; i++) { // Loop for para percorrer o Array produtos. 
        html = html + criarProduto(produtos[i], i); // Em cada iteração do loop, se adiciona o HTML de um produto à variável html.
    }
    return html; // Aquilo que for gerado será retornado.
}

// Função para criar um bloco html para página. 
function criarProduto(produto, index) {
    return `
    <div class="curso"> 
        <img class='inicio' title="t" src="${produto.imagem}" />
        <div class="curso-info">
            <h4>${produto.nome}</h4>
            <h4>${produto.prof}</h4>
            <h4>${produto.descricao}</h4>
        </div>
        <div class="curso-preco">
            <span class="preco-de">R$${produto.preco_de}</span>
            <span class="preco-por">R$${produto.preco_por}</span>
            <button class="btncar btn-add" data-index="${index}"></button>
        </div>
    </div>
    `;
	// Essa parte do código exibe informações dos produtos.
}

const container = document.querySelector("#container"); // Variável com o nome container. 

container.innerHTML = renderizaProdutos(); //Usando innerHTML será possível acessar o conteúdo (html).

const carrinhoItens = {}; // Constante que está vazia e que será utilizada para modificar propriedades do objeto.

// Função que renderiza os itens do carrinho.
function renderizaCarrinho() {
    let html = ''; // Começa a string vazia para armazenar o HTML dos itens no carrinho.
    for (let produtoId in carrinhoItens) { // Loop for in. Percorre as propriedades do objeto carrinhoItens.
        html = html + criaItemCarrinho(carrinhoItens[produtoId]); // Acessa um item específico do carrinho com base no produtoId; Aqui é chamada a função criaItemCarrinho.
    }
    document.querySelector('.carrinho_itens').innerHTML = html; // Inserção do HTML dos itens do carrinho em carrinho_itens.
}

// Função que cria o HTML de um item do carrinho.
function criaItemCarrinho(produto) {
    return `
    <div class="carrinho_compra"> 
        <h4>${produto.nome}</h4>
        <p>Preço unidade: ${produto.preco_por} | Quantidade: ${produto.quantidade}</p>
        <p>Valor: R$: ${produto.preco_por * produto.quantidade}</p>
        <button data-produto-id="${produto.id}" class="btn-remove"></button>
    </div>
    `;
	//Essa parte do HTML exibe as informações do produto no carrinho e temos um botão para remover o item do carrinho quando o usuário precisar.
}

// Função criada para calcular o total dos itens no carrinho e exibir os valores na página. 
function criaCarrinhoTotal() {
    let total = 0; // Começa com total como zero.
    for (let produtoId in carrinhoItens) { // Loop for in. Percorre os itens do objeto carrinhoItens.
        total = total + carrinhoItens[produtoId].preco_por * carrinhoItens[produtoId].quantidade; // Cálculo do valor total.
    }
    // Coloca o HTML do total do carrinho e um link para compra.
    document.querySelector('.carrinho_total').innerHTML = `
    <h4>Total: <strong> R$${total} </strong></h4>
    <a href ="#" target="_blank">
        <ion-icon name="card-outline"></ion-icon>
        <strong>Comprar Agora</strong>
    </a>
    `;
}

// Função chamada quando o usuário quiser adicionar um produto no carrinho.
function adicionaItemNoCarrinho(produto) { // Caso o produto ainda não esteja no carrinho, se cria um novo item no carrinho.
    if (!carrinhoItens[produto.id]) {
        carrinhoItens[produto.id] = produto; // Produto já no carrinho.
        carrinhoItens[produto.id].quantidade = 0; // Quantidade inicial do produto já no carrinho.
    }
    // Incrementa a quantidade do item.
    ++carrinhoItens[produto.id].quantidade;
    // Atualiza a exibição e o total do carrinho
    renderizaCarrinho();
    criaCarrinhoTotal();
}

// Ouvinte de evento de clique ao documento.
document.body.addEventListener('click', function (event) {
    const elemento = event.target;
    if (elemento.classList.contains('btn-add')) {
        // Caso o botão "Adicionar" receber um clique, se obtém o índice do produto e adiciona no carrinho.
        const index = parseInt(elemento.getAttribute('data-index'), 10);
        const produto = produtos[index];
        adicionaItemNoCarrinho(produto);
    }
    if (elemento.classList.contains('btn-remove')) {
        // Caso o botão "Remover" receber um clique, se remove o item do carrinho ou reduz sua quantidade.
        const produtoId = elemento.getAttribute('data-produto-id');
        if (carrinhoItens[produtoId].quantidade <= 1) {
            delete carrinhoItens[produtoId]; // Remove o item caso a quantidade for menor ou igual a 1.
        } else {
            --carrinhoItens[produtoId].quantidade; // Reduz a quantidade caso for maior que 1.
        }
        // Atualiza-se a exibição e o total do carrinho.
        renderizaCarrinho();
        criaCarrinhoTotal();
    }
});
