// ======================
// CONTROLE DE SEÇÕES
// ======================

function mostrarSecao(id, button){

    document
        .querySelectorAll(".secao")
        .forEach(secao => {
            secao.classList.remove("ativa");
        });

    document
        .querySelectorAll(".sidebar button, .section-tabs button")
        .forEach(btn => {
            btn.classList.remove("active");
        });

    if(button){
        const section = button.getAttribute("data-section");
        if(section){
            document
                .querySelectorAll(`.sidebar button[data-section="${section}"], .section-tabs button[data-section="${section}"]`)
                .forEach(btn => btn.classList.add("active"));
        } else {
            button.classList.add("active");
        }
    }

    document
        .getElementById(id)
        .classList.add("ativa");
}

// ======================
// DASHBOARD
// ======================

function atualizarDashboard(){

    const cursos =
        JSON.parse(
            localStorage.getItem("cursos")
        ) || [];

    const alunos =
        JSON.parse(
            localStorage.getItem("alunos")
        ) || [];

    const matriculas =
        JSON.parse(
            localStorage.getItem("matriculas")
        ) || [];

    const totalCursos =
        document.getElementById("totalCursos");

    const totalAlunos =
        document.getElementById("totalAlunos");

    const totalMatriculas =
        document.getElementById("totalMatriculas");

    if(totalCursos)
        totalCursos.textContent =
        cursos.length;

    if(totalAlunos)
        totalAlunos.textContent =
        alunos.length;

    if(totalMatriculas)
        totalMatriculas.textContent =
        matriculas.length;
}

// ======================
// TEMA CLARO / ESCURO
// ======================

const themeToggle =
document.getElementById("themeToggle");

const temaSalvo =
localStorage.getItem("tema");

if(temaSalvo === "dark"){

    document.body.classList.add("dark");

    if(themeToggle){

        themeToggle.innerHTML =
        "☀️ Tema Claro";
    }
}

if(themeToggle){

    themeToggle.addEventListener(
        "click",
        () => {

        document.body.classList.toggle(
            "dark"
        );

        const darkAtivo =
        document.body.classList.contains(
            "dark"
        );

        localStorage.setItem(
            "tema",
            darkAtivo
            ? "dark"
            : "light"
        );

        themeToggle.innerHTML =
        darkAtivo
        ? "☀️ Tema Claro"
        : "🌙 Tema Escuro";

    });
}

// ======================
// ANIMAÇÃO DOS CARDS
// ======================

function animarCards(){

    const cards =
    document.querySelectorAll(".card");

    cards.forEach((card,index)=>{

        card.style.opacity = "0";
        card.style.transform =
        "translateY(20px)";

        setTimeout(()=>{

            card.style.transition =
            "all .5s ease";

            card.style.opacity = "1";

            card.style.transform =
            "translateY(0)";

        },index * 150);

    });
}

// ======================
// INICIALIZAÇÃO
// ======================

window.addEventListener(
    "load",
    ()=>{

    atualizarDashboard();

    animarCards();

});