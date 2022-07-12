Esse é o nosso código de conduta em relação a qualidade dos artefatos que geramos, todos somos responsáveis pela continuidade do projeto e por sua evolução constante, devemos cobrar um do outro essa postura e essa qualidade técnica, é importante que colaboramos com a resolução dos problemas de qualidade independento do autor, somos responsáveis também pela mentoria e auxilio nas resoluções dos problemas aqui apontados, não devemos julgar a pessoa, todo code review é impessoal, é objetivo claro, e tem a função de defender o projet, e somos os guardiões e professores para que esse processo seja cumprido.

# Objetividade

## O PR Possuí uma descrição clara?

Todo pull request deve ter uma descrição clara do problema e/ou solução do que foi resolvido
[Referência](https://imasters.com.br/desenvolvimento/mastering-on-github-1-pull-requests)

## O PR corresponde a resolução de um único problema?

Todo pull request deve se conter a resolução de um unico problema, em alguns casos a resolução de um problema impacta no ajuste ou adaptação de mais de uma funcionalidade, caso não seja possível dividir em múltiplos PRs,deve-se ao menos se limitar ao escopo do problema raiz.
[Referência](https://imasters.com.br/desenvolvimento/mastering-on-github-1-pull-requests)

# Código limpo

## Todo o código é facilmente entendido?

Algum dos pilares do clean code, é justamente a facilidade de compreensão e entendimento do objetivo/escopo da função, método ou classe, bem como seus utilitários, um dos fatores chave para dificuldade de compreensão é a complexidade ciclomática, como ifs encadeados, funções com múltiplas responsabilidades, entre outros fatores.

[Referência](https://imasters.com.br/desenvolvimento/mastering-on-github-1-pull-requests)

## O código funciona? Ele executa a função pretendida, a lógica está correta, etc.

Assim como no sentido de legibilidade, temos também a questão funcional, se a lógica aplicada é adequada para resolução do problema, ou se há desvios lógicos que impossibilitam a funcionalidade, tais como condições que nunca ocorrem. Esse princípio é exclusivo na analise lógica e funcional do código e não da executabilidade do mesmo.

[Referência](https://labs.bawi.io/complexidade-ciclom%C3%A1tica-89a47b00916e)

## Existe algum código redundante ou duplicado?

Esse é um dos pilares da responsabilidade única do SOLID, normalmente quando se duplica código ou se cria funções iguais ou semelhantes para tratar um mesmo problema, normalmente código duplicado tende gerar a complexidade na manutenção do projeto a longo prazo.

[Referência](https://medium.com/@itiroinazawa/refactoring-series-duplicidade-de-c%C3%B3digo-49281ee50d02)

## O código é o mais modular (desacoplado) possível?

Um código não modular tende a gerar forte acoplamento de módulos de terceiros ou ainda de módulos internos do sistema, um bom exemplo é a separação lógica entre banco de dados e repository, caso não haja uma abstração, qualquer mudança de fluxo de dados impacta em mudança em classes de controle, ou em um nível mais baixo, um acoplamento com o ORM, mas isso se aplica também em entidades auxiliares.

[Referência](https://medium.com/joaorobertopb/o-que-%C3%A9-solid-o-guia-completo-para-voc%C3%AA-entender-os-5-princ%C3%ADpios-da-poo-2b937b3fc530)

## Algum código pode ser substituído por funções da biblioteca nativa ou externa?

É muito comum cairmos no problema de reinventar a roda, ou seja, criar utilitários ou classes que já possuem módulos robustos para resolver o problema, ou ainda, o uso inadequado de biblioteca externa para algo que você pode usar nativamente com a linguagem ou versão da linguagem do projeto.

## O código está usando as melhores praticas da linguagem?

O código aplica as melhores práticas da linguagem, como no caso do TS, você está usando as definições de tipos adequadamente, está aplicando da melhor forma os padrões de do Ecmascript para estrutura de dados.

# Teste e Build

## Foi feito o teste unitário e passou (feature, bugfix)?

Em um contexto de nova feature ou bugfix, você aplicou teste unitário para o cenário desenvolvido, ou ainda, fez a adequação dos testes existentes?

## O build funcionou?

O build do pipeline está configurado, e ele funcionou? é primordial que haja travas, ainda que não haja, verifique no pipeline do repositório se o código passou pela etapa de build, caso contrário comunique o desenvolvedor.

## A analise estática gerou alguma regressão?

Caso o projeto tenha o Sonar ou alguma ferramenta de analise estática, é importante que ele não regrida nos padrões de qualidade, essas ferramentas analisam complexidade, código duplicado, uso de más práticas, e é importante que todo código não regrida em sua manutenibilidade.

## O teste de cobertura regrediu?

Assim como no caso da análise estática, é importante que todo código gerado não gere regressão nos padrões de cobertura de teste, sejam por acrécimo de regras ou ajuste de regras existentes, para garantir isso, basta em seus testes funcionais criar cenários onde o código pode entrar, sejam em condições lógicas, ou por comportamento de factories e builders.

# Padrões gerais

## O código gerou o incremento de algum novo componente de infraestrutura não previsto e aprovado?

O código gerou o incremento de algum novo componente de infraestrutura não previsto e aprovado? tais como inserção de um novo banco de dados, um novo componente de cache, um novo serviço externo, caso tenha criado, é importante que isso reflita no desenho técnico da solução, e que essa mudança tenha sido previamente acordada.

## O código segue a arquitetura definida?

O código gerado, alterou a estrutura do mesmo? Caso positivo, esse ajuste foi previamente acordado, pois toda mudança de estrutura impacta em aspectos funcionais e não funcionais podendo gerar perda de performance, não confiabilidade, ou ainda, dificuldade de manutenção. É importante que toda mudança estrutural seja acordada dentro do squad.

## O código está seguindo o stile guide (Lint)?

O código gerado gerou inline comments para desvio de regras do lint, caso positivo, é importante que sejá corrigido, ou caso seja uma regra esses comentários, é importante que ajuste o .eslint .tslit com as regras novas, dado que já é prática no projeto, nesses casos, será avaliado caso a caso pela equipe.

## O código alterou o contrato de saída mas não alterou o Swagger ou documentação?

Caso o código tenha alterado o contrato de saída é importante que esse ajuste reflita em sua documentação, bem como tenha sido previamente acordado com as partes que o consome, de modo que não gere problemas em serviços dependentes.
