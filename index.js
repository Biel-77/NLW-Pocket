const { select, input, checkbox } = require("@inquire/prompts");

let metas = [ metas ] 

const cadastrarMeta = async () => {
  const meta = await input({ message: "Digite a meta:"});

  if (meta.length == 0) {
    console, log("A meta não pode ser vazia.");
    return;
  }
  metas.push({ value: meta, checked: false });
};

const listarMetas = async () => {
    const respostas = await checkbox({
    message: "Use as setas para mudar de metas, o espaço para marcar e desmarcar e o enter para finalizar essa etapa",
    choices: [...metas],
    instructions: false,
  })

  metas.forEach((m) => {
    m.checked = false
  })

  if(respostas.length == 0) {
    console.log("Nenhuma meta selecionada!")
    return
  }

  respostas.forEach((resposta) => {
    const meta = metas.find((m) => {
      return m.value == resposta
    })

    meta.checked = true
  })

  console.log('Meta(s) marcadas como concluida(s)')

};

const metasRealizadas = async () => {
  const realizadas = metas.filter((meta) => {
    return meta.checked
  })

  if(realizadas,length == 0) {
    console.log("Não existem metas realizadas! :(")
  }

  await select({
    message:("Metas Realizadas" + realizadas.length),
    choices: [...realizadas]
  })
}

const metasAbertas = async () => {
  const abertas = metas.filter((meta) =>{
    return meta.checked != true
  })

  if(abertas.length == 0) {
    console.log("Não existem metas abertas! :)")
    return
  }

  await select({
    message:("Metas Abertas" + abertas.length),
    choices: [...abertas]
  })
}
const start = async () => {
  while (true) {
    const opcao = await select({
      message: "Menu>",
      choices: [
        {
          name: "Cadastrar meta",
          value: "cadastrar",
        },
        {
          name: "Listar metas",
          value: "listar",
        },
        {
          name: "Metas realizadas",
          value: "realizacas",
        },
        {
          name: "Metas abertas",
          value: "abertas",
        },
        {
          name: "Sair",
          value: "sair",
        },
      ],
    });

    switch (opcao) {
      case "cadastrar":
        await cadastrarMeta();
        break;
      case "listar":
        await listarMeta();
        break;
      case "realizadas":
        await metasRealizadas();
        break
      case "abertas":
        await metasAbertas();
        break
      case "sair":
        await sair();
        console.log("Até  a próxima!")
        return;
    }
  }
};
