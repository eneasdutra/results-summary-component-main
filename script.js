// Obtém o contêiner onde os itens do resumo serão inseridos
const summaryList = document.getElementById('summary-list');

// Função para buscar e processar os dados
async function loadSummaryData() {
    try {
        // 1. Busca os dados do arquivo data.json
        const response = await fetch('data.json'); 
        
        // Verifica se a resposta foi bem-sucedida (status 200)
        if (!response.ok) {
            throw new Error(`Erro ao carregar dados: ${response.statusText}`);
        }

        const data = await response.json();

        // 2. Itera sobre cada item do array
        data.forEach(item => {
            // Cria o elemento div principal do item
            const summaryItem = document.createElement('div');
            // A classe é baseada na categoria para aplicar estilos específicos de cor (ex: reaction, memory)
            const categoryLower = item.category.toLowerCase();
            summaryItem.classList.add('summary-item', categoryLower);

            // 3. Monta o conteúdo HTML do item
            // Observe que aqui estamos usando uma template string (backticks ``)
            summaryItem.innerHTML = `
                <span class="item-category">
                    <img src="${item.icon}" alt="Ícone de ${item.category}"> 
                    ${item.category}
                </span>
                <span class="item-score">
                    ${item.score} <span class="max-score">/ 100</span>
                </span>
            `;

            // 4. Adiciona o item ao contêiner principal na página
            summaryList.appendChild(summaryItem);
        });

    } catch (error) {
        console.error('Falha ao buscar ou renderizar os dados do resumo:', error);
        // Exibe uma mensagem amigável para o usuário caso falhe
        summaryList.innerHTML = `<p style="color: red;">Não foi possível carregar os dados do resumo.</p>`;
    }
}

// Chama a função para iniciar o carregamento dos dados
loadSummaryData();