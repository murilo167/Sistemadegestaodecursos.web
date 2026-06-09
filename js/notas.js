// ======================
// NOTAS
// ======================

const listaNotas =
document.getElementById("listaNotas");

let notas =
JSON.parse(
localStorage.getItem("notas")
) || [];

// ======================
// SALVAR
// ======================

function salvarNotas(){

    localStorage.setItem(
        "notas",
        JSON.stringify(notas)
    );
}

// ======================
// GERAR NOTAS
// ======================

function gerarNotas(){

    const matriculas =
    JSON.parse(
    localStorage.getItem("matriculas")
    ) || [];

    matriculas.forEach(m=>{

        const existe =
        notas.find(n=>

            n.aluno === m.aluno &&
            n.curso === m.curso

        );

        if(!existe){

            notas.push({

                aluno:m.aluno,
                curso:m.curso,
                nota1:"",
                nota2:""

            });
        }

    });

    salvarNotas();

    renderNotas();
}

// ======================
// MÉDIA
// ======================

function calcularMedia(n1,n2){

    const nota1 =
    Number(n1) || 0;

    const nota2 =
    Number(n2) || 0;

    return (
        (nota1 + nota2) / 2
    );
}

// ======================
// RENDER
// ======================

function renderNotas(){

    if(!listaNotas) return;

    listaNotas.innerHTML = "";

    notas.forEach((nota,index)=>{

        const media =
        calcularMedia(
            nota.nota1,
            nota.nota2
        );

        const situacao =
        media >= 7
        ? "✅ Aprovado"
        : "❌ Reprovado";

        listaNotas.innerHTML += `

        <tr>

            <td>
                ${nota.aluno}
            </td>

            <td>
                ${nota.curso}
            </td>

            <td>

                <input
                type="number"
                min="0"
                max="10"
                value="${nota.nota1}"

                onchange="
                alterarNota1(
                ${index},
                this.value
                )">

            </td>

            <td>

                <input
                type="number"
                min="0"
                max="10"
                value="${nota.nota2}"

                onchange="
                alterarNota2(
                ${index},
                this.value
                )">

            </td>

            <td>
                ${media.toFixed(1)}
            </td>

            <td>
                ${situacao}
            </td>

        </tr>

        `;
    });

    if(typeof renderCertificados === "function"){
        renderCertificados();
    }
}

// ======================
// ALTERAR N1
// ======================

function alterarNota1(index,valor){

    notas[index].nota1 =
    valor;

    salvarNotas();

    renderNotas();
}

// ======================
// ALTERAR N2
// ======================

function alterarNota2(index,valor){

    notas[index].nota2 =
    valor;

    salvarNotas();

    renderNotas();
}

// ======================
// REMOVER NOTA
// ======================

function removerNota(index){

    notas.splice(index,1);

    salvarNotas();

    renderNotas();
}

// ======================
// INICIAR
// ======================

gerarNotas();
renderNotas();