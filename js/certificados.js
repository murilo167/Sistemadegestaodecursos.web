// ======================
// CERTIFICADOS
// ======================

const listaCertificados =
document.getElementById(
"listaCertificados"
);

// ======================
// RENDER
// ======================

function renderCertificados(){

    if(!listaCertificados) return;

    listaCertificados.innerHTML = "";

    notas.forEach(nota=>{

        const media =
        (
            (Number(nota.nota1) || 0)
            +
            (Number(nota.nota2) || 0)
        ) / 2;

        if(media >= 7){

            listaCertificados.innerHTML += `

            <div class="certificado">

                <h2>
                    🏆 Certificado Disponível
                </h2>

                <p>

                    Aluno:
                    <strong>
                    ${nota.aluno}
                    </strong>

                </p>

                <p>

                    Curso:
                    <strong>
                    ${nota.curso}
                    </strong>

                </p>

                <p>

                    Média:
                    <strong>
                    ${media.toFixed(1)}
                    </strong>

                </p>

                <button
                onclick="
                emitirCertificado(
                '${nota.aluno}',
                '${nota.curso}',
                '${media.toFixed(1)}'
                )">

                    📄 Emitir Certificado

                </button>

            </div>

            `;
        }

    });

    if(listaCertificados.innerHTML === ""){

        listaCertificados.innerHTML = `

        <div class="certificado">

            <h2>
                Nenhum certificado disponível
            </h2>

            <p>
                Os alunos precisam ter
                média mínima 7.0.
            </p>

        </div>

        `;
    }
}

// ======================
// EMITIR
// ======================

function emitirCertificado(
aluno,
curso,
media
){

    const dataAtual =
    new Date()
    .toLocaleDateString("pt-BR");

    const janela =
    window.open(
    "",
    "_blank",
    "width=1000,height=700"
    );

    janela.document.write(`

    <!DOCTYPE html>

    <html>

    <head>

    <title>
        Certificado
    </title>

    <style>

    body{

        font-family:
        Arial,sans-serif;

        display:flex;

        justify-content:center;

        align-items:center;

        height:100vh;

        background:#f5f5f5;

    }

    .certificado{

        width:900px;

        background:white;

        border:12px solid gold;

        padding:60px;

        text-align:center;

        border-radius:20px;

        box-shadow:
        0 10px 40px
        rgba(0,0,0,.15);
    }

    h1{

        font-size:3rem;

        margin-bottom:30px;

        color:#2563eb;
    }

    h2{

        margin:25px 0;

        font-size:2rem;
    }

    p{

        font-size:1.2rem;

        line-height:1.8;
    }

    .assinatura{

        margin-top:60px;
    }

    </style>

    </head>

    <body>

        <div class="certificado">

            <h1>
                CERTIFICADO
            </h1>

            <p>

            Certificamos que

            </p>

            <h2>

            ${aluno}

            </h2>

            <p>

            concluiu com êxito o curso

            <strong>

            ${curso}

            </strong>

            obtendo média

            <strong>

            ${media}

            </strong>

            </p>

            <br>

            <p>

            Data:
            ${dataAtual}

            </p>

            <div class="assinatura">

                ______________________

                <br>

                Coordenação

            </div>

        </div>

    </body>

    </html>

    `);

    janela.document.close();

    setTimeout(()=>{

        janela.print();

    },500);
}

// ======================
// INICIAR
// ======================

renderCertificados();