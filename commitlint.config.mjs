const config = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // Comprimento máximo do header (tipo + escopo + assunto)
    'header-max-length': [2, 'always', 1500],

    // Comprimento mínimo do assunto
    'subject-min-length': [2, 'always', 3],

    // Tipos de commit permitidos
    'type-enum': [
      2,
      'always',
      [
        'feat', // Nova funcionalidade
        'fix', // Correção de bug
        'docs', // Documentação
        'style', // Formatação, ponto e vírgula, etc
        'refactor', // Refatoração de código
        'perf', // Melhoria de performance
        'test', // Adição ou correção de testes
        'build', // Sistema de build, dependências
        'ci', // Integração contínua
        'chore', // Outras tarefas
        'revert', // Reverter commit anterior
      ],
    ],

    // O tipo deve ser em minúsculo
    'type-case': [2, 'always', 'lower-case'],

    // O tipo não pode ser vazio
    'type-empty': [2, 'never'],

    // O assunto não pode ser vazio
    'subject-empty': [2, 'never'],

    // O assunto deve começar com letra minúscula
    'subject-case': [0, 'always', ['lower-case', 'sentence-case']],

    // O assunto não deve terminar com ponto
    'subject-full-stop': [2, 'never', '.'],
  },
};

export default config;
