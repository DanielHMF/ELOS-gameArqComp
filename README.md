# Elos da Máquina

Jogo no navegador para estudar os termos de **Tópicos de Arquitetura Computacional** (Sprint 3), com a identidade visual do projeto ELOS.

🔗 **Jogar:** LINK_DO_SITE

## Como jogar

O jogo tem três modos, escolhidos no menu à esquerda.

### Cruzadinha
1. Clique numa casa ou numa pista para selecionar a palavra.
2. Digite as letras direto nas casas. O cursor anda sozinho; Backspace volta e as setas mudam de casa e de direção.
3. Clique de novo numa casa de cruzamento para trocar entre horizontal e vertical.
4. **Conferir** pinta as palavras certas e erradas, marca ✓ ou ✗ nas pistas e atualiza o contador (ex.: "8 de 16 palavras").
5. **Reiniciar** limpa o tabuleiro.

### Elos
1. As 16 palavras aparecem misturadas.
2. Selecione 4 que tenham algo em comum e clique em **Confirmar**.
3. Grupo certo vira uma faixa colorida com o nome do elo. Grupo errado custa uma das 4 tentativas.
4. Se 3 das 4 palavras forem do mesmo grupo, aparece o aviso "Quase!".

### Mapa do computador
1. O desenho mostra um computador por dentro e um Arduino, com 16 partes numeradas.
2. Escolha o número no campo **Número** (ou clique nele no desenho) e veja a dica.
3. Escreva o nome no campo **Nome da parte** e confirme. Vale maiúscula ou minúscula, com ou sem acento, a sigla ou o nome em português (ex.: "UC" ou "unidade de controle").
4. A parte acende no desenho e ganha ✓ na lista.

## Palavras e pistas da cruzadinha

### Horizontais

| Nº | Pista | Resposta |
|---|---|---|
| 1 | Chip com processador, memória e entradas e saídas juntos, como o ATmega328P. | MICROCONTROLADOR |
| 6 | Processador com quatro CPUs completas trabalhando ao mesmo tempo no mesmo chip. | QUADCORE |
| 8 | No Arduino, 1 KB que guarda configurações mesmo depois de desligar. | EEPROM |
| 10 | Lê cada instrução, descobre o que ela pede e dá as ordens às outras partes. | UC |
| 11 | Mesma tecnologia do pendrive; no Arduino, guarda o código gravado na placa. | FLASH |
| 12 | Parte do processador que soma, subtrai e faz operações como AND, OR e NOT. | ULA |
| 14 | Fios de ida e volta que levam o valor que foi lido ou escrito. | DATABUS |
| 15 | Base da pirâmide: SSD ou HD, a camada maior, mais lenta e não volátil. | MEMORIADEMASSA |
| 16 | Espaços minúsculos dentro do processador, o topo e o nível mais rápido da pirâmide. | REGISTRADORES |

### Verticais

| Nº | Pista | Resposta |
|---|---|---|
| 2 | Cérebro do computador: busca e executa as instruções dos programas. | CPU |
| 3 | Pequena e muito rápida, guarda uma cópia do que o processador usou há pouco. | CACHE |
| 4 | Fios que só saem do processador e indicam ONDE ler ou escrever. | ADDRESSBUS |
| 5 | Memória de trabalho com os programas abertos; perde tudo quando falta energia. | RAM |
| 7 | Não volátil, nas primeiras versões gravada só na fábrica; guarda a BIOS. | ROM |
| 9 | Processador com duas CPUs completas trabalhando ao mesmo tempo no mesmo chip. | DUALCORE |
| 13 | Copia informações entre um dispositivo e a RAM sem ocupar o processador. | DMA |

## Grupos do modo Elos

| Elo | Palavras |
|---|---|
| Dentro do processador | ULA, UC, Registradores, Cache |
| Guardam tudo sem energia | ROM, EEPROM, Flash, Memória de massa |
| Tipos de chip que processam | CPU, Microcontrolador, Dual core, Quad core |
| A RAM e quem leva dados até ela | RAM, DMA, Address bus, Data bus |

## Tecnologias

HTML, CSS e JavaScript puros, sem bibliotecas.

| Arquivo | O que faz |
|---|---|
| `index.html` | estrutura das telas e o desenho (SVG) do mapa |
| `style.css` | identidade visual ELOS (paleta Gruta Azul, Nunito e Nunito Sans) |
| `script.js` | lógica dos três modos |
