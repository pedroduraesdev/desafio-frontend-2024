# Manual de Execução e Uso da Aplicação

Este manual contém instruções para configurar, executar e utilizar a aplicação **PokeClima**. Com ela, é possível buscar o clima de uma cidade e receber a sugestão de um Pokémon correspondente ao clima atual.

## Pré-requisitos

Certifique-se de ter o seguinte instalado em seu sistema:
- **Node.js** - [Instale aqui](https://nodejs.org)
- **Angular CLI** - Instale com o comando:
  ```bash
  npm install -g @angular/cli
  ```

## Passo a Passo para Executar a Aplicação

1. **Clonar o Repositório**  
   Clone o projeto para o ambiente local:
   ```bash
   git clone https://github.com/pedroduraesdev/desafio-frontend-2024.git
   ```
2. **Acessar o Diretório do Projeto**  
   Navegue até o diretório:
   ```bash
   cd projeto
   ```

3. **Instalar Dependências**  
   Instale as bibliotecas necessárias:
   ```bash
   npm install
   ```

4. **Configuração do Ambiente**  
   Verifique `environment.ts` em `src/environments/` para garantir que as chaves das APIs estão configuradas corretamente.

5. **Executar o Projeto**  
   Inicie a aplicação:
   ```bash
   ng serve
   ```

6. **Acessar a Aplicação**  
   No navegador, acesse `http://localhost:4200` para visualizar a aplicação.

## Como Usar

1. **Buscar uma Cidade**  
   - Digite o nome da cidade no campo "Buscar local:".
   - Pressione **Enter** ou clique no ícone de lupa para buscar o clima.

2. **Visualizar os Resultados**  
   - **Condições Climáticas**: Mostra a descrição do clima, um ícone representando o tempo atual, a temperatura, a cidade e a bandeira do país.
   - **Pokémon Sugerido**: Exibe um Pokémon correspondente ao clima, incluindo o tipo, o nome e uma imagem.

3. **Manejo de Erros**  
   - Se a cidade não for encontrada ou ocorrer um erro, será exibida uma mensagem de erro com uma imagem animada do Pikachu.

## Solução de Problemas Comuns

- **Erro de Dependência**: Tente `npm install` novamente ou `npm ci` para uma instalação limpa.
- **Porta em Uso**: Use outra porta com o comando:
  ```bash
  ng serve --port 4300
  ```
- **Erro de Chave de API**: Verifique se todas as chaves de API estão corretas no `environment.ts`.
