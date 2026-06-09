// ======================
// ALUNOS
// ======================

const formAluno =
document.getElementById("formAluno");

const listaAlunos =
document.getElementById("listaAlunos");

let alunos =
JSON.parse(
localStorage.getItem("alunos")
) || [];

// ======================
// SALVAR
// ======================

function salvarAlunos(){

    localStorage.setItem(
        "alunos",
        JSON.stringify(alunos)
    );

    atualizarDashboard();

    if(typeof atualizarSelects === "function"){
        atualizarSelects();
    }
}

// ======================
// RENDERIZAR
// ======================

function renderAlunos(){

    if(!listaAlunos) return;

    listaAlunos.innerHTML = "";

    alunos.forEach((aluno,index)=>{

        listaAlunos.innerHTML += `

        <tr>

            <td>
                👨‍🎓 ${aluno.nome}
            </td>

            <td>
                ${aluno.email}
            </td>

            <td>

                <button
                onclick="editarAluno(${index})">

                    ✏️

                </button>

                <button
                onclick="excluirAluno(${index})">

                    🗑️

                </button>

            </td>

        </tr>

        `;
    });
}

// ======================
// CADASTRAR
// ======================

if(formAluno){

formAluno.addEventListener(
"submit",
(e)=>{

    e.preventDefault();

    const nome =
    document.getElementById(
    "alunoNome"
    ).value;

    const email =
    document.getElementById(
    "alunoEmail"
    ).value;

    if(!nome || !email){

        alert(
        "Preencha todos os campos."
        );

        return;
    }

    alunos.push({

        nome,
        email

    });

    salvarAlunos();

    renderAlunos();

    formAluno.reset();

});
}

// ======================
// EXCLUIR
// ======================

function excluirAluno(index){

    const confirmar =
    confirm(
    "Deseja excluir este aluno?"
    );

    if(!confirmar) return;

    alunos.splice(index,1);

    salvarAlunos();

    renderAlunos();
}

// ======================
// EDITAR
// ======================

function editarAluno(index){

    const novoNome =
    prompt(
    "Novo nome:",
    alunos[index].nome
    );

    if(!novoNome) return;

    const novoEmail =
    prompt(
    "Novo email:",
    alunos[index].email
    );

    if(!novoEmail) return;

    alunos[index].nome =
    novoNome;

    alunos[index].email =
    novoEmail;

    salvarAlunos();

    renderAlunos();
}

// ======================
// PESQUISAR
// ======================

function pesquisarAluno(texto){

    const filtrados =
    alunos.filter(aluno=>

    aluno.nome
    .toLowerCase()
    .includes(
    texto.toLowerCase()
    )

    );

    listaAlunos.innerHTML = "";

    filtrados.forEach((aluno,index)=>{

        listaAlunos.innerHTML += `

        <tr>

            <td>${aluno.nome}</td>

            <td>${aluno.email}</td>

            <td>

                <button
                onclick="editarAluno(${index})">

                    ✏️

                </button>

                <button
                onclick="excluirAluno(${index})">

                    🗑️

                </button>

            </td>

        </tr>

        `;
    });
}

// ======================
// INICIAR
// ======================

renderAlunos();