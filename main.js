// Cria um array que representa o tabuleiro do jogo, inicialmente vazio.
let board3 = ["", "", "", "", "", "", "", "", ""];

// Define o jogador atual como "X".
let currentPlayer = "X";

// Variável que controla se o jogo está ativo ou não.
let gameActive = true;

// Define todas as possíveis combinações vencedoras do jogo.
const winningConditions = [
    [0, 1, 2], // Primeira linha
    [3, 4, 5], // Segunda linha
    [6, 7, 8], // Terceira linha
    [0, 3, 6], // Primeira coluna
    [1, 4, 7], // Segunda coluna
    [2, 5, 8], // Terceira coluna
    [0, 4, 8], // Diagonal principal
    [2, 4, 6]  // Diagonal secundária
];

// Seleciona todas as células do tabuleiro usando a classe 'cell'.
const cells = document.querySelectorAll('.cell');

// Adiciona um ouvinte de evento 'click' para cada célula.
cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

// Função chamada quando uma célula é clicada.
function handleCellClick(event) {

    // Obtém a célula que foi clicada.
    const clickedCell = event.target;

    // Obtém o índice da célula clicada a partir do atributo 'data-index'.
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

    // Verifica se a célula já foi preenchida ou se o jogo já acabou.
    if (board[clickedCellIndex] !== "" || !gameActive) {
        return; // Se sim, sai da função.
    }

    // Atualiza o tabuleiro com o símbolo do jogador atual.
    board[clickedCellIndex] = currentPlayer;

    // Exibe o símbolo do jogador atual na célula clicada.
    clickedCell.textContent = currentPlayer;

    // Verifica se o movimento resultou em uma vitória ou empate.
    checkResult();
}

// Função que verifica o resultado após cada movimento.
function checkResult() {
    let roundWon = false;

    // Itera sobre todas as condições de vitória.
    for (let i = 0; i < winningConditions.length; i++) {
        const winCondition = winningConditions[i];

        // Obtém o valor das três posições da condição de vitória atual.
        let a = board[winCondition[0]];
        let b = board[winCondition[1]];
        let c = board[winCondition[2]];

        // Se alguma dessas posições estiver vazia, pula para a próxima iteração.
        if (a === '' || b === '' || c === '') {
            continue;
        }

        // Se os três valores forem iguais, o jogador atual ganhou.
        if (a === b && b === c) {
            roundWon = true;
            break; // Sai do loop porque o jogo terminou.
        }
    }

    // Se houve uma vitória, exibe uma mensagem e termina o jogo.
    if (roundWon) {
        alert(`Jogador ${currentPlayer} ganhou!`);
        gameActive = false; // Desativa o jogo para impedir mais jogadas.
        return;
    }

    // Verifica se há um empate (nenhuma posição está vazia).
    let roundDraw = !board.includes("");
    if (roundDraw) {
        alert("Empate!"); // Exibe uma mensagem de empate.
        gameActive = false; // Desativa o jogo para impedir mais jogadas.
        return;
    }

    // Troca o jogador atual (de "X" para "O" ou vice-versa).
    currentPlayer = currentPlayer === "X" ? "O" : "X";
}

// Função que reinicia o jogo, limpando o tabuleiro.
function resetGame() {
    // Reseta o tabuleiro para o estado inicial, vazio.
    board = ["", "", "", "", "", "", "", "", ""];

    // Define o jogador atual como "X".
    currentPlayer = "X";

    // Reativa o jogo para permitir novas jogadas.
    gameActive = true;

    // Limpa o conteúdo de todas as células do tabuleiro.
    cells.forEach(cell => {
        cell.textContent = "";
    });
}
