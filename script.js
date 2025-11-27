// === Get the container where the summary items will be inserted. === //
const summaryList = document.getElementById('summary-list');

// === Function to search and process the data. === //
async function loadSummaryData() {
    try {
        // --- 1. Retrieve the data from the data.json file. --- //
        const response = await fetch('data.json');

        // --- Check if the response was successful (status 200) --- //
        if (!response.ok) {
            throw new Error(`Erro ao carregar dados: ${response.statusText}`);
        }

        const data = await response.json();

        // --- 2. Iterate over each item in the array. --- //
        data.array.forEach(item => {
            // --- Creates the main div element for the item. --- //
            const summaryItem = document.createElement('div');
            // --- The class is based on the category to apply specific color styles. --- //
            const categoryLower = item.category.toLowerCase();
            summaryItem.classList.add('summary-item', categoryLower);

            // --- 3. Assemble the HTML content of the item. --- //
            // --- Note that here we are using a template string (backticks ``). --- //
            summaryItem.innerHTML = `
                <span class="item-category">
                    <img src="${item.icon}" alt="Icon of ${item.category}">
                    ${item.category}
                </span>
                <span class="item-score">
                    ${item.score} <span class="max-score">/ 100</span>
                </span>
            `;

            // --- 4. Add the item to the main container on the page. --- //
            summaryList.appendChild(summaryItem);
        });
    } 

    catch (error) {
    console.error('Falha ao buscar ou renderizar os dados do resumo:', error);
    // --- // Displays a user-friendly message in case of failure. ---//
    summaryList.innerHTML = `
        <p style="color: red;">Não foi possível carregar os dados do resumo.</p>
    `;
    }
}

// --- Call the function to start loading the data. --- //
loadSummaryData();