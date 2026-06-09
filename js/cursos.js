// ======================
// CURSOS
// ======================

const formCurso =
document.getElementById("formCurso");

const listaCursos =
document.getElementById("listaCursos");

let cursos =
JSON.parse(
localStorage.getItem("cursos")
) || [];

// ======================
// SALVAR
// ======================

function salvarCursos(){

    localStorage.setItem(
        "cursos",
        JSON.stringify(cursos)
    );

    atualizarDashboard();

    if(typeof atualizarSelects === "function"){
        atualizarSelects();
    }
}

// ======================
// RENDERIZAR
// ======================

function renderCursos(){

    if(!listaCursos) return;

    listaCursos.innerHTML = "";

    cursos.forEach((curso,index)=>{

        listaCursos.innerHTML += `

        <tr>

            <td>
                📚 ${curso.nome}
            </td>

            <td>
                ${curso.carga}h
            </td>

            <td>

                <button
                onclick="editarCurso(${index})">

                    ✏️

                </button>

                <button
                onclick="excluirCurso(${index})">

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

if(formCurso){

formCurso.addEventListener(
"submit",
(e)=>{

    e.preventDefault();

    const nome =
    document.getElementById(
    "cursoNome"
    ).value;

    const carga =
    document.getElementById(
    "cursoCarga"
    ).value;

    if(!nome || !carga){

        alert(
        "Preencha todos os campos."
        );

        return;
    }

    cursos.push({

        nome,
        carga

    });

    salvarCursos();

    renderCursos();

    formCurso.reset();

});
}

// ======================
// EXCLUIR
// ======================

function excluirCurso(index){

    const confirmar =
    confirm(
    "Deseja excluir este curso?"
    );

    if(!confirmar) return;

    cursos.splice(index,1);

    salvarCursos();

    renderCursos();
}

// ======================
// EDITAR
// ======================

function editarCurso(index){

    const novoNome =
    prompt(
    "Novo nome do curso:",
    cursos[index].nome
    );

    if(!novoNome) return;

    const novaCarga =
    prompt(
    "Nova carga horária:",
    cursos[index].carga
    );

    if(!novaCarga) return;

    cursos[index].nome =
    novoNome;

    cursos[index].carga =
    novaCarga;

    salvarCursos();

    renderCursos();
}

// ======================
// PESQUISA
// ======================

function pesquisarCurso(texto){

    const filtrados =
    cursos.filter(curso=>

    curso.nome
    .toLowerCase()
    .includes(
    texto.toLowerCase()
    )

    );

    listaCursos.innerHTML = "";

    filtrados.forEach((curso,index)=>{

        listaCursos.innerHTML += `

        <tr>

            <td>${curso.nome}</td>

            <td>${curso.carga}h</td>

            <td>

                <button
                onclick="editarCurso(${index})">

                    ✏️

                </button>

                <button
                onclick="excluirCurso(${index})">

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

renderCursos();