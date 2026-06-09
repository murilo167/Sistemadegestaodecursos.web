// ======================
// MATRÍCULAS
// ======================

const formMatricula =
document.getElementById("formMatricula");

const listaMatriculas =
document.getElementById("listaMatriculas");

const matAluno =
document.getElementById("matAluno");

const matCurso =
document.getElementById("matCurso");

const matDataNascimento =
document.getElementById("matDataNascimento");

let matriculas =
JSON.parse(
localStorage.getItem("matriculas")
) || [];

// ======================
// ATUALIZAR SELECTS
// ======================

function atualizarSelects(){

    if(!matAluno || !matCurso) return;

    const alunos =
    JSON.parse(
    localStorage.getItem("alunos")
    ) || [];

    const cursos =
    JSON.parse(
    localStorage.getItem("cursos")
    ) || [];

    matAluno.innerHTML =
    `<option value="">Selecione um aluno</option>`;

    matCurso.innerHTML =
    `<option value="">Selecione um curso</option>`;

    alunos.forEach(aluno=>{

        matAluno.innerHTML += `

        <option value="${aluno.nome}">
            ${aluno.nome}
        </option>

        `;
    });

    cursos.forEach(curso=>{

        matCurso.innerHTML += `

        <option value="${curso.nome}">
            ${curso.nome}
        </option>

        `;
    });
}

// ======================
// SALVAR
// ======================

function salvarMatriculas(){

    localStorage.setItem(
        "matriculas",
        JSON.stringify(matriculas)
    );

    atualizarDashboard();
}

// ======================
// RENDER
// ======================

function renderMatriculas(){

    if(!listaMatriculas) return;

    listaMatriculas.innerHTML = "";

    matriculas.forEach((matricula,index)=>{

        listaMatriculas.innerHTML += `

        <tr>

            <td>
                👨‍🎓 ${matricula.aluno}
            </td>

            <td>
                📚 ${matricula.curso}
            </td>

            <td>
                📅 ${matricula.dataNascimento ? new Date(matricula.dataNascimento).toLocaleDateString('pt-BR') : 'N/A'}
            </td>

            <td>

                <button
                onclick="removerMatricula(${index})">

                    ❌

                </button>

            </td>

        </tr>

        `;
    });
}

// ======================
// MATRICULAR
// ======================

if(formMatricula){

formMatricula.addEventListener(
"submit",
(e)=>{

    e.preventDefault();

    const aluno =
    matAluno.value;

    const curso =
    matCurso.value;

    const dataNascimento =
    matDataNascimento.value;

    if(!aluno || !curso || !dataNascimento){

        alert(
        "Preencha aluno, curso e data de nascimento."
        );

        return;
    }

    const existe =
    matriculas.find(m=>

        m.aluno === aluno &&
        m.curso === curso

    );

    if(existe){

        alert(
        "Aluno já matriculado."
        );

        return;
    }

    matriculas.push({

        aluno,
        curso,
        dataNascimento

    });

    salvarMatriculas();

    renderMatriculas();

    formMatricula.reset();

    if(typeof gerarNotas === "function"){
        gerarNotas();
    }

});
}

// ======================
// REMOVER
// ======================

function removerMatricula(index){

    const confirmar =
    confirm(
    "Deseja remover esta matrícula?"
    );

    if(!confirmar) return;

    matriculas.splice(index,1);

    salvarMatriculas();

    renderMatriculas();
}

// ======================
// INICIAR
// ======================

atualizarSelects();
renderMatriculas();