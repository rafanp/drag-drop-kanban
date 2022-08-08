const task1 = {
  titulo: 'Syntax highlighting',
  lista: 'Done',
  conteudo:
    '### Syntax highlighting\n\n✨ Um pouco de JS\n\n```js\nimport * as React from \'react\';\nimport Box from \'@mui/material/Box\';\nimport TextField from \'@mui/material/TextField\';\n\nexport default function BasicTextFields() {\n  return (\n    <Box>\n      <TextField id="outlined-basic" label="Outlined" variant="outlined" />\n      <TextField id="filled-basic" label="Filled" variant="filled" />\n      <TextField id="standard-basic" label="Standard" variant="standard" />\n    </Box>\n  );\n}\n```',
};

const task2 = {
  titulo: 'Demonstração',
  lista: 'ToDo',
  conteudo:
    "# Demonstração\n\n### Let's Code Kanban\n\n👉 Clique no botão de + ao lado de Todo para adicionar um novo item\n\n👈 Movimente os cards arrastando ou clicando nas setas\n\n## Resumo\n\n* Crie todos simples ou\n* Utilize markdown\n* Adicione links: [Google](https://www.google.com)\n\n",
};

const task3 = {
  titulo: 'Finalizar UX',
  lista: 'Doing',
  conteudo: 'Finalizar a parte de UX',
};
const task4 = {
  titulo: 'Lógica de programação',
  lista: 'Doing',
  conteudo: 'Finalizar a lógica de programação',
};

const mockedTasks = [task1, task2, task3, task4];

export { mockedTasks };
