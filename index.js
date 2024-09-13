const { select, input, checkbox } = require("@inquire/prompts");

let mensagem = "Bem-vindp ao app de metas"

let metas = [ metas ] 

const cadastrarMeta = async () => {
  const meta = await input({ message: "Digite a meta:"});

  if (meta.length == 0) {
    mensagem = "A meta não pode ser vazia.";
    return;
  }
  metas.push({ value: meta, checked: false });

  mensagem = "Meta cadastrada com sucesso"
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
    mensagem = "Nenhuma meta selecionada!"
    return
  }

  respostas.forEach((resposta) => {
    const meta = metas.find((m) => {
      return m.value == resposta
    })

    meta.checked = true
  })
  
   mensagem = 'meta(s) marcada(s) como concluida(s)'

};

const metasRealizadas = async () => {
  const realizadas = metas.filter((meta) => {
    return meta.checked
  })

  if(realizadas,length == 0) {
    mensagem = "Não existem metas realizadas! :("
  }

  await select({
    message:("Metas Realizadas :" + realizadas.length),
    choices: [...realizadas]
  })
}

const metasAbertas = async () => {
  const abertas = metas.filter((meta) =>{
    return meta.checked != true
  })

  if(abertas.length == 0) {
    mensagem = "Não existem metas abertas! :)"
    return
  }

  await select({
    message:("Metas Abertas :" + abertas.length),
    choices: [...abertas]
  })
}

const deletarMetas = async () => {
  const metasDesmarcadas = metas.map((meta) => {
    return { value: meta.value, checked: false }
  })

  const itemsADeletar = await checkbox({
    message: "Selecione meta para deletar",
    choices: [...metasDesmarcadas],
    instructions: false,
  })

  if(itemsADeletar.length == 0) {
    mensagem = "Nenhum item para deletar!"
    return
  }

  itemsADeletar.forEach((item) => {
    metas.filter((meta) => {
      return meta.value != item
    })
  })

  mensagem = "Meta(s) deletada(s) com sucesso!"
}

const mostrarMensagem = () => {
  console.clear();

  if(mensagem != "") {
    console.log(mensagem)
    console.log("")
    mensagem = ""
  }
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
          name: "Deletar metas",
          value: "deletar",
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
      case "deletar":
        await deletarMetas();
        break
      case "sair":
        await sair();
        console.log("Até  a próxima!")
        return;
    }
  }
};
