// =====================================================================
// ELOS DA MÁQUINA · script.js
// 1. Navegação entre as telas
// 2. Cruzadinha
// 3. Elos (ache os 4 grupos)
// 4. Mapa do computador
// 5. Janela de parabéns
// =====================================================================


// =====================================================================
// 1. NAVEGAÇÃO
// =====================================================================

let telas = ["inicio", "cruzadinha", "elos", "mapa"];

function mostrarTela(nome) {
    for (let i = 0; i < telas.length; i++) {
        document.getElementById("tela_" + telas[i]).classList.remove("tela_ativa");
        document.getElementById("menu_" + telas[i]).classList.remove("menu_ativo");
    }
    document.getElementById("tela_" + nome).classList.add("tela_ativa");
    document.getElementById("menu_" + nome).classList.add("menu_ativo");
    window.scrollTo(0, 0);
}

// Tira acento, espaço e hífen e deixa tudo minúsculo: "Memória de Massa" vira "memoriademassa"
function normalizar(texto) {
    return texto
        .normalize("NFD")
        .replace(/[̀-ͯ]/g, "")
        .toLowerCase()
        .replace(/[\s\-_.]/g, "");
}

// Troca os itens de um vetor de lugar aleatoriamente
function embaralhar(vetor) {
    for (let i = vetor.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let guarda = vetor[i];
        vetor[i] = vetor[j];
        vetor[j] = guarda;
    }
}


// =====================================================================
// 2. CRUZADINHA
// =====================================================================

let LINHAS = 12;
let COLUNAS = 16;

// lin e col = casa onde a palavra começa; H = horizontal, V = vertical
let palavras = [
    { num: 1, dir: "H", lin: 0, col: 0, palavra: "MICROCONTROLADOR", pista: "Chip com processador, memória e entradas e saídas juntos, como o ATmega328P." },
    { num: 6, dir: "H", lin: 2, col: 1, palavra: "QUADCORE", pista: "Processador com quatro CPUs completas trabalhando ao mesmo tempo no mesmo chip." },
    { num: 8, dir: "H", lin: 3, col: 9, palavra: "EEPROM", pista: "No Arduino, 1 KB que guarda configurações mesmo depois de desligar." },
    { num: 10, dir: "H", lin: 5, col: 3, palavra: "UC", pista: "Lê cada instrução, descobre o que ela pede e dá as ordens às outras partes." },
    { num: 11, dir: "H", lin: 5, col: 9, palavra: "FLASH", pista: "Mesma tecnologia do pendrive; no Arduino, guarda o código gravado na placa." },
    { num: 12, dir: "H", lin: 7, col: 2, palavra: "ULA", pista: "Parte do processador que soma, subtrai e faz operações como AND, OR e NOT." },
    { num: 14, dir: "H", lin: 7, col: 8, palavra: "DATABUS", pista: "Fios de ida e volta que levam o valor que foi lido ou escrito." },
    { num: 15, dir: "H", lin: 9, col: 0, palavra: "MEMORIADEMASSA", pista: "Base da pirâmide: SSD ou HD, a camada maior, mais lenta e não volátil." },
    { num: 16, dir: "H", lin: 11, col: 2, palavra: "REGISTRADORES", pista: "Espaços minúsculos dentro do processador, o topo e o nível mais rápido da pirâmide." },
    { num: 2, dir: "V", lin: 0, col: 2, palavra: "CPU", pista: "Cérebro do computador: busca e executa as instruções dos programas." },
    { num: 3, dir: "V", lin: 0, col: 5, palavra: "CACHE", pista: "Pequena e muito rápida, guarda uma cópia do que o processador usou há pouco." },
    { num: 4, dir: "V", lin: 0, col: 12, palavra: "ADDRESSBUS", pista: "Fios que só saem do processador e indicam ONDE ler ou escrever." },
    { num: 5, dir: "V", lin: 0, col: 15, palavra: "RAM", pista: "Memória de trabalho com os programas abertos; perde tudo quando falta energia." },
    { num: 7, dir: "V", lin: 2, col: 7, palavra: "ROM", pista: "Não volátil, nas primeiras versões gravada só na fábrica; guarda a BIOS." },
    { num: 9, dir: "V", lin: 4, col: 3, palavra: "DUALCORE", pista: "Processador com duas CPUs completas trabalhando ao mesmo tempo no mesmo chip." },
    { num: 13, dir: "V", lin: 7, col: 6, palavra: "DMA", pista: "Copia informações entre um dispositivo e a RAM sem ocupar o processador." }
];

let resposta = [];        // resposta[lin][col] = letra certa, ou "" se a casa é vazia
let palavras_da_casa = []; // palavras_da_casa[lin][col] = posições (em "palavras") que passam pela casa
let palavra_atual = -1;   // posição da palavra selecionada
let direcao_atual = "H";

// Lista das casas de uma palavra: [[lin, col], [lin, col], ...]
function casasDaPalavra(p) {
    let casas = [];
    for (let i = 0; i < palavras[p].palavra.length; i++) {
        if (palavras[p].dir == "H") {
            casas.push([palavras[p].lin, palavras[p].col + i]);
        } else {
            casas.push([palavras[p].lin + i, palavras[p].col]);
        }
    }
    return casas;
}

function casa(lin, col) {
    return document.getElementById("casa_" + lin + "_" + col);
}

function montarCruzadinha() {
    // Começa com tudo vazio
    resposta = [];
    palavras_da_casa = [];
    for (let l = 0; l < LINHAS; l++) {
        resposta.push([]);
        palavras_da_casa.push([]);
        for (let c = 0; c < COLUNAS; c++) {
            resposta[l].push("");
            palavras_da_casa[l].push([]);
        }
    }

    // Coloca as letras certas e o número de cada palavra
    let numeros = {};
    for (let p = 0; p < palavras.length; p++) {
        let casas = casasDaPalavra(p);
        for (let i = 0; i < casas.length; i++) {
            resposta[casas[i][0]][casas[i][1]] = palavras[p].palavra[i];
            palavras_da_casa[casas[i][0]][casas[i][1]].push(p);
        }
        numeros[palavras[p].lin + "_" + palavras[p].col] = palavras[p].num;
    }

    // Desenha o tabuleiro
    let html = "";
    for (let l = 0; l < LINHAS; l++) {
        for (let c = 0; c < COLUNAS; c++) {
            if (resposta[l][c] == "") {
                html += `<div class="casa casa_vazia"></div>`;
            } else {
                let numero = "";
                if (numeros[l + "_" + c]) {
                    numero = `<span class="casa_numero">${numeros[l + "_" + c]}</span>`;
                }
                html += `
                    <div class="casa">
                        ${numero}
                        <input id="casa_${l}_${c}" maxlength="1" autocomplete="off"
                            onclick="clicarCasa(${l}, ${c})"
                            onkeydown="teclaCasa(event, ${l}, ${c})"
                            oninput="digitarCasa(${l}, ${c})">
                    </div>`;
            }
        }
    }
    div_tabuleiro.innerHTML = html;

    // Monta as listas de pistas
    let html_h = "";
    let html_v = "";
    for (let p = 0; p < palavras.length; p++) {
        let item = `<li id="pista_${p}" onclick="selecionarPalavra(${p}, 1)"><b>${palavras[p].num}</b><span>${palavras[p].pista}</span><span class="marca"></span></li>`;
        if (palavras[p].dir == "H") {
            html_h += item;
        } else {
            html_v += item;
        }
    }
    ul_horizontais.innerHTML = html_h;
    ul_verticais.innerHTML = html_v;
}

// Pinta a palavra escolhida e a pista dela
function selecionarPalavra(p, focar) {
    palavra_atual = p;
    direcao_atual = palavras[p].dir;

    let inputs = div_tabuleiro.querySelectorAll("input");
    for (let i = 0; i < inputs.length; i++) {
        inputs[i].classList.remove("selecionada", "atual");
    }
    let casas = casasDaPalavra(p);
    for (let i = 0; i < casas.length; i++) {
        casa(casas[i][0], casas[i][1]).classList.add("selecionada");
    }

    let itens = document.querySelectorAll(".pistas li");
    for (let i = 0; i < itens.length; i++) {
        itens[i].classList.remove("pista_ativa");
    }
    document.getElementById("pista_" + p).classList.add("pista_ativa");

    if (focar == 1) {
        // vai para a primeira casa ainda vazia da palavra
        let destino = casas[0];
        for (let i = casas.length - 1; i >= 0; i--) {
            if (casa(casas[i][0], casas[i][1]).value == "") {
                destino = casas[i];
            }
        }
        focarCasa(destino[0], destino[1]);
    }
}

function focarCasa(lin, col) {
    let atual = div_tabuleiro.querySelector(".atual");
    if (atual) {
        atual.classList.remove("atual");
    }
    casa(lin, col).classList.add("atual");
    casa(lin, col).focus();
}

// Clicou numa casa: escolhe a palavra. Clicar de novo troca a direção (se cruzar)
function clicarCasa(lin, col) {
    let lista = palavras_da_casa[lin][col];
    let escolhida = lista[0];

    if (lista.length > 1) {
        let ja_estava = casa(lin, col).classList.contains("atual");
        for (let i = 0; i < lista.length; i++) {
            let mesma_direcao = palavras[lista[i]].dir == direcao_atual;
            if (ja_estava && !mesma_direcao) {
                escolhida = lista[i];
            }
            if (!ja_estava && mesma_direcao) {
                escolhida = lista[i];
            }
        }
    }

    selecionarPalavra(escolhida, 0);
    focarCasa(lin, col);
}

// Próxima (passo = 1) ou anterior (passo = -1) casa na direção atual
function andar(lin, col, passo) {
    let l = lin;
    let c = col;
    if (direcao_atual == "H") {
        c = c + passo;
    } else {
        l = l + passo;
    }
    if (l >= 0 && l < LINHAS && c >= 0 && c < COLUNAS && resposta[l][c] != "") {
        focarCasa(l, c);
    }
}

function digitarCasa(lin, col) {
    let input = casa(lin, col);
    input.value = normalizar(input.value).toUpperCase().replace(/[^A-Z]/g, "");
    input.classList.remove("certa", "errada");
    if (input.value != "") {
        andar(lin, col, 1);
    }
}

function teclaCasa(evento, lin, col) {
    let input = casa(lin, col);

    // Digitar por cima de uma letra já escrita troca a letra
    if (evento.key.length == 1 && /[a-zA-ZçÇ]/.test(evento.key)) {
        input.value = "";
    }

    if (evento.key == "Backspace") {
        evento.preventDefault();
        if (input.value != "") {
            input.value = "";
        } else {
            andar(lin, col, -1);
            casa(lin, col).classList.remove("certa", "errada");
            let anterior = div_tabuleiro.querySelector(".atual");
            anterior.value = "";
            anterior.classList.remove("certa", "errada");
        }
    } else if (evento.key == "ArrowRight" || evento.key == "ArrowLeft" || evento.key == "ArrowDown" || evento.key == "ArrowUp") {
        evento.preventDefault();
        let nova_direcao = "H";
        let passo = 1;
        if (evento.key == "ArrowDown" || evento.key == "ArrowUp") {
            nova_direcao = "V";
        }
        if (evento.key == "ArrowLeft" || evento.key == "ArrowUp") {
            passo = -1;
        }
        direcao_atual = nova_direcao;
        andar(lin, col, passo);
        let lista = palavras_da_casa[lin][col];
        for (let i = 0; i < lista.length; i++) {
            if (palavras[lista[i]].dir == nova_direcao) {
                let atual = div_tabuleiro.querySelector(".atual");
                selecionarPalavra(lista[i], 0);
                atual.classList.add("atual");
            }
        }
    }
}

function conferirCruzadinha() {
    let acertos = 0;
    let certa = []; // certa[p] = 1 se a palavra p está certa

    for (let p = 0; p < palavras.length; p++) {
        let casas = casasDaPalavra(p);
        let escrita = "";
        for (let i = 0; i < casas.length; i++) {
            escrita += casa(casas[i][0], casas[i][1]).value;
        }

        let pista = document.getElementById("pista_" + p);
        pista.classList.remove("pista_certa", "pista_errada");

        if (escrita == palavras[p].palavra) {
            certa.push(1);
            acertos++;
            pista.classList.add("pista_certa");
            pista.querySelector(".marca").innerHTML = "✓";
        } else {
            certa.push(0);
            pista.classList.add("pista_errada");
            pista.querySelector(".marca").innerHTML = "✗";
        }
    }

    // Uma casa fica certa se pertence a pelo menos uma palavra certa
    for (let l = 0; l < LINHAS; l++) {
        for (let c = 0; c < COLUNAS; c++) {
            if (resposta[l][c] != "") {
                let lista = palavras_da_casa[l][c];
                let alguma_certa = 0;
                for (let i = 0; i < lista.length; i++) {
                    alguma_certa = alguma_certa + certa[lista[i]];
                }
                casa(l, c).classList.remove("certa", "errada", "selecionada", "atual");
                if (alguma_certa > 0) {
                    casa(l, c).classList.add("certa");
                } else {
                    casa(l, c).classList.add("errada");
                }
            }
        }
    }

    span_cruz_acertos.innerHTML = `${acertos} de ${palavras.length}`;

    if (acertos == palavras.length) {
        p_cruz_aviso.innerHTML = "";
        abrirJanela("Cruzadinha completa", "Você acertou as 16 palavras!", "Que tal agora encontrar os elos entre elas?", "elos");
    } else {
        p_cruz_aviso.innerHTML = `Você acertou ${acertos}. As palavras com ✗ ainda têm alguma letra errada ou faltando.`;
    }
}

function reiniciarCruzadinha() {
    let inputs = div_tabuleiro.querySelectorAll("input");
    for (let i = 0; i < inputs.length; i++) {
        inputs[i].value = "";
        inputs[i].classList.remove("certa", "errada", "selecionada", "atual");
    }
    let itens = document.querySelectorAll(".pistas li");
    for (let i = 0; i < itens.length; i++) {
        itens[i].classList.remove("pista_certa", "pista_errada", "pista_ativa");
        itens[i].querySelector(".marca").innerHTML = "";
    }
    palavra_atual = -1;
    span_cruz_acertos.innerHTML = `0 de ${palavras.length}`;
    p_cruz_aviso.innerHTML = "";
}


// =====================================================================
// 3. ELOS
// =====================================================================

let grupos = [
    { nome: "Dentro do processador", termos: ["ULA", "UC", "Registradores", "Cache"], cor: "fundo_capri_claro" },
    { nome: "Guardam tudo sem energia", termos: ["ROM", "EEPROM", "Flash", "Memória de massa"], cor: "fundo_lavanda" },
    { nome: "Tipos de chip que processam", termos: ["CPU", "Microcontrolador", "Dual core", "Quad core"], cor: "fundo_anil" },
    { nome: "A RAM e quem leva dados até ela", termos: ["RAM", "DMA", "Address bus", "Data bus"], cor: "fundo_ceu" }
];

let VIDAS_TOTAL = 4;
let em_jogo = [];     // termos que ainda estão na grade
let escolhidos = [];  // termos selecionados agora
let achados = [];     // posições (em "grupos") já encontradas
let vidas = VIDAS_TOTAL;
let tentativas = [];  // combinações já tentadas, para não perder vida repetindo
let elos_acabou = 0;

function reiniciarElos() {
    em_jogo = [];
    for (let g = 0; g < grupos.length; g++) {
        for (let t = 0; t < grupos[g].termos.length; t++) {
            em_jogo.push(grupos[g].termos[t]);
        }
    }
    embaralhar(em_jogo);
    escolhidos = [];
    achados = [];
    tentativas = [];
    vidas = VIDAS_TOTAL;
    elos_acabou = 0;
    div_grupos_achados.innerHTML = "";
    p_elos_aviso.innerHTML = "";
    desenharElos();
}

function grupoDoTermo(termo) {
    for (let g = 0; g < grupos.length; g++) {
        if (grupos[g].termos.indexOf(termo) != -1) {
            return g;
        }
    }
    return -1;
}

function desenharElos() {
    let html = "";
    for (let i = 0; i < em_jogo.length; i++) {
        let classe = "palavra_elo";
        if (escolhidos.indexOf(em_jogo[i]) != -1) {
            classe += " escolhida";
        }
        html += `<button class="${classe}" onclick="escolherTermo(${i})">${em_jogo[i]}</button>`;
    }
    div_elos_grade.innerHTML = html;

    let html_vidas = "";
    for (let v = 0; v < VIDAS_TOTAL; v++) {
        if (v < vidas) {
            html_vidas += `<i class="vida"></i>`;
        } else {
            html_vidas += `<i class="vida vida_perdida"></i>`;
        }
    }
    span_vidas.innerHTML = html_vidas;

    btn_confirmar_elos.disabled = escolhidos.length != 4 || elos_acabou == 1;
}

function escolherTermo(i) {
    if (elos_acabou == 1) {
        return;
    }
    let termo = em_jogo[i];
    let posicao = escolhidos.indexOf(termo);
    if (posicao != -1) {
        escolhidos.splice(posicao, 1);
    } else if (escolhidos.length < 4) {
        escolhidos.push(termo);
    }
    p_elos_aviso.innerHTML = "";
    desenharElos();
}

function limparSelecao() {
    escolhidos = [];
    p_elos_aviso.innerHTML = "";
    desenharElos();
}

function embaralharElos() {
    embaralhar(em_jogo);
    desenharElos();
}

function mostrarGrupo(g, revelado) {
    let classe = "grupo_achado " + grupos[g].cor;
    if (revelado == 1) {
        classe += " grupo_revelado";
    }
    div_grupos_achados.innerHTML += `
        <div class="${classe}">
            <h3>${grupos[g].nome}</h3>
            <p>${grupos[g].termos.join(", ")}</p>
        </div>`;

    // tira os 4 termos da grade
    let restantes = [];
    for (let i = 0; i < em_jogo.length; i++) {
        if (grupos[g].termos.indexOf(em_jogo[i]) == -1) {
            restantes.push(em_jogo[i]);
        }
    }
    em_jogo = restantes;
}

function confirmarGrupo() {
    if (escolhidos.length != 4 || elos_acabou == 1) {
        return;
    }

    // Já tentou exatamente esses 4?
    let chave = escolhidos.slice().sort().join("|");
    if (tentativas.indexOf(chave) != -1) {
        p_elos_aviso.innerHTML = "Você já tentou esse grupo.";
        return;
    }
    tentativas.push(chave);

    // Conta quantos dos 4 escolhidos são de cada grupo
    let contagem = [0, 0, 0, 0];
    for (let i = 0; i < escolhidos.length; i++) {
        contagem[grupoDoTermo(escolhidos[i])]++;
    }
    let maior = Math.max(...contagem);
    let grupo_certo = contagem.indexOf(maior);

    if (maior == 4) {
        achados.push(grupo_certo);
        mostrarGrupo(grupo_certo, 0);
        escolhidos = [];
        p_elos_aviso.innerHTML = "";

        if (achados.length == grupos.length) {
            elos_acabou = 1;
            desenharElos();
            abrirJanela("Todos os elos encontrados", "Você achou os 4 grupos!", `Você errou ${VIDAS_TOTAL - vidas} vez(es).`, "mapa");
            return;
        }
    } else {
        vidas--;
        let botoes = div_elos_grade.querySelectorAll(".escolhida");
        for (let i = 0; i < botoes.length; i++) {
            botoes[i].classList.add("tremer");
        }
        if (maior == 3) {
            p_elos_aviso.innerHTML = "Quase! Falta só uma palavra para fechar o grupo.";
        } else {
            p_elos_aviso.innerHTML = "Esses quatro não formam um grupo.";
        }

        if (vidas == 0) {
            elos_acabou = 1;
            escolhidos = [];
            for (let g = 0; g < grupos.length; g++) {
                if (achados.indexOf(g) == -1) {
                    mostrarGrupo(g, 1);
                }
            }
            p_elos_aviso.innerHTML = "Acabaram as tentativas. Os grupos que faltavam estão acima. Clique em Reiniciar para jogar de novo.";
        }

        setTimeout(desenharElos, 400);
        return;
    }
    desenharElos();
}


// =====================================================================
// 4. MAPA DO COMPUTADOR
// =====================================================================

// "aceitas" já está normalizado (sem acento, sem espaço, minúsculo)
let partes = [
    { nome: "CPU", aceitas: ["cpu", "processador", "unidadecentraldeprocessamento"], dica: "O chip inteiro que busca e executa as instruções." },
    { nome: "ULA", aceitas: ["ula", "unidadelogicaearitmetica", "unidadelogicaaritmetica", "unidadearitmeticaelogica", "alu"], dica: "Faz as contas e as operações lógicas dentro do processador." },
    { nome: "UC", aceitas: ["uc", "unidadedecontrole", "cu"], dica: "Interpreta cada instrução e dá as ordens às outras partes." },
    { nome: "Registradores", aceitas: ["registradores", "registrador", "registers"], dica: "Os espaços minúsculos e mais rápidos dentro do processador." },
    { nome: "Cache", aceitas: ["cache", "memoriacache"], dica: "Guarda uma cópia do que o processador usou há pouco." },
    { nome: "RAM", aceitas: ["ram", "memoriaram", "memoriaprincipal"], dica: "Memória de trabalho: perde tudo quando falta energia." },
    { nome: "Address bus", aceitas: ["addressbus", "barramentodeendereco", "barramentodeenderecos", "barramentodeenderecamento"], dica: "Fios só de ida: o processador avisa ONDE quer ler ou escrever." },
    { nome: "Data bus", aceitas: ["databus", "barramentodedados", "barramentodedado"], dica: "Fios de ida e volta que levam o valor lido ou escrito." },
    { nome: "ROM", aceitas: ["rom", "memoriarom"], dica: "Chip não volátil onde fica a BIOS." },
    { nome: "DMA", aceitas: ["dma", "acessodiretoamemoria"], dica: "Copia informações entre o SSD e a RAM sem ocupar o processador." },
    { nome: "Memória de massa", aceitas: ["memoriademassa", "armazenamento", "memoriadearmazenamento", "armazenamentoemmassa"], dica: "SSD ou HD: grande, lenta e não volátil." },
    { nome: "Microcontrolador", aceitas: ["microcontrolador", "microcontroller", "atmega328p", "atmega"], dica: "O chip do Arduino que junta processador, memória e entradas e saídas." },
    { nome: "Flash", aceitas: ["flash", "memoriaflash"], dica: "Onde fica o código gravado no Arduino (32 KB)." },
    { nome: "EEPROM", aceitas: ["eeprom", "memoriaeeprom"], dica: "1 KB do Arduino para guardar configurações." },
    { nome: "Dual core", aceitas: ["dualcore"], dica: "Processador com duas CPUs completas no mesmo chip." },
    { nome: "Quad core", aceitas: ["quadcore"], dica: "Processador com quatro CPUs completas no mesmo chip." }
];

let encontradas = []; // encontradas[i] = 1 quando a parte i + 1 já foi nomeada

function reiniciarMapa() {
    encontradas = [];
    for (let i = 0; i < partes.length; i++) {
        encontradas.push(0);
        document.getElementById("parte" + (i + 1)).classList.remove("achada");
    }
    ipt_nome.value = "";
    span_mapa_erro.innerHTML = "";
    atualizarMapa();
    mostrarDica();
}

function atualizarMapa() {
    // Select só com os números que faltam
    let selecionado = sel_numero.value;
    let opcoes = "";
    let total = 0;
    for (let i = 0; i < partes.length; i++) {
        if (encontradas[i] == 0) {
            opcoes += `<option value="${i + 1}">${i + 1}</option>`;
        } else {
            total++;
        }
    }
    if (opcoes == "") {
        opcoes = `<option value="">—</option>`;
    }
    sel_numero.innerHTML = opcoes;
    if (selecionado != "" && encontradas[Number(selecionado) - 1] == 0) {
        sel_numero.value = selecionado;
    }

    // Lista ao lado do desenho
    let lista = "";
    for (let i = 0; i < partes.length; i++) {
        if (encontradas[i] == 1) {
            lista += `<li class="parte_ok"><b>${i + 1}</b>${partes[i].nome}</li>`;
        } else {
            lista += `<li><b>${i + 1}</b>?</li>`;
        }
    }
    ul_partes.innerHTML = lista;

    span_mapa_acertos.innerHTML = `${total} de ${partes.length}`;
    destacarNumero();
}

// Deixa escuro o número escolhido no select
function destacarNumero() {
    let marcadores = document.querySelectorAll(".marcador");
    for (let i = 0; i < marcadores.length; i++) {
        marcadores[i].classList.remove("marcador_escolhido");
    }
    if (sel_numero.value != "") {
        document.querySelector("#parte" + sel_numero.value + " .marcador").classList.add("marcador_escolhido");
    }
}

function mostrarDica() {
    destacarNumero();
    if (sel_numero.value == "") {
        p_dica.innerHTML = "";
    } else {
        p_dica.innerHTML = `Dica do ${sel_numero.value}: ${partes[Number(sel_numero.value) - 1].dica}`;
    }
}

// Clicou num número do desenho
function escolherNumero(numero) {
    sel_numero.value = numero;
    span_mapa_erro.innerHTML = "";
    mostrarDica();
    ipt_nome.focus();
}

function confirmarParte() {
    if (sel_numero.value == "") {
        return;
    }
    let indice = Number(sel_numero.value) - 1;
    let escrito = normalizar(ipt_nome.value);

    if (escrito == "") {
        span_mapa_erro.innerHTML = "Escreva o nome da parte.";
        return;
    }

    if (partes[indice].aceitas.indexOf(escrito) != -1) {
        encontradas[indice] = 1;
        document.getElementById("parte" + (indice + 1)).classList.add("achada");
        ipt_nome.value = "";
        span_mapa_erro.innerHTML = "";
        atualizarMapa();
        mostrarDica();

        let total = 0;
        for (let i = 0; i < encontradas.length; i++) {
            total = total + encontradas[i];
        }
        if (total == partes.length) {
            abrirJanela("Mapa completo", "Você nomeou as 16 partes!", "Agora você sabe onde cada peça fica dentro da máquina.", "inicio");
        }
    } else {
        // Será que o nome é de outra parte que ainda falta?
        let outra = -1;
        for (let i = 0; i < partes.length; i++) {
            if (encontradas[i] == 0 && partes[i].aceitas.indexOf(escrito) != -1) {
                outra = i;
            }
        }
        if (outra != -1) {
            span_mapa_erro.innerHTML = `Esse nome existe no desenho, mas não é o número ${indice + 1}.`;
        } else {
            span_mapa_erro.innerHTML = `Não é esse. Releia a dica do número ${indice + 1}.`;
        }
    }
    ipt_nome.focus();
}


// =====================================================================
// 5. JANELA DE PARABÉNS
// =====================================================================

let nomes_telas = { inicio: "Voltar ao início", cruzadinha: "Ir para a cruzadinha", elos: "Ir para Elos", mapa: "Ir para o mapa" };

function abrirJanela(sobretitulo, titulo, texto, proxima) {
    div_janela.innerHTML = `
        <div class="janela">
            <p class="sobretitulo">${sobretitulo}</p>
            <h2>${titulo}</h2>
            <p>${texto}</p>
            <button class="botao_secundario" onclick="fecharJanela()">Fechar</button>
            <button class="botao_primario" onclick="fecharJanela(); mostrarTela('${proxima}')">${nomes_telas[proxima]}</button>
        </div>`;
}

function fecharJanela() {
    div_janela.innerHTML = "";
}


// =====================================================================
// COMEÇO: monta os três jogos quando a página abre
// =====================================================================
montarCruzadinha();
reiniciarElos();
reiniciarMapa();
