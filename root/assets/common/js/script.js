const form = document.getElementById('formulario')
function getError(id, mensagem, input) {
    const error = document.getElementById('error-' + id);
    error.innerHTML = mensagem;
    input.classList.add('inputErro')
}
function getResp(mensagem) {
    const alert = document.getElementById('resp');
    alert.innerHTML = mensagem;
}
function limpaErros() {
    let erro = document.getElementsByClassName('erro');
    [...erro].forEach(element => {
        console.log(element)
        element.innerHTML = '';
    });
}
form.addEventListener('submit', (e) => {
    e.preventDefault();
    limpaErros();
    var larguras = document.getElementsByName('lp');
    var alturas = document.getElementsByName('ap');
    var portas = document.getElementsByName('porta');
    var janelas = document.getElementsByName('janela');
    let areaParedeSomada = 0;
    let temErro = false;
    for (let index = 0; index < larguras.length; index++) {
        const largura = larguras[index];
        const altura = alturas[index];
        const porta = portas[index];
        const janela = janelas[index];
        let medidaPorta = {
            largura: 0.80,
            altura: 1.90
        };
        let medidaJanela = {
            largura: 2.00,
            altura: 1.20
        };
        const areaPorta = medidaPorta.largura * medidaPorta.altura;
        const areaJanela = medidaJanela.largura * medidaJanela.altura;
        const areaParede = altura.value * largura.value;
        if (altura.value <= medidaPorta.altura + 0.30 && validate(porta.id)) {
            getError(altura.id, "A altura da parede precisa ser 30 centimetros maior que a porta", altura)
        }
        if (altura.value <= 1) {
            getError(altura.id, "Altura deve ser maior ou igual a 1 metro", altura);
            temErro = true;
        } else if (altura.value >= 15) {
            getError(altura.id, "Altura deve ser menor ou igual a 15 metros", altura);
            temErro = true;

        }

        if (largura.value <= 1) {
            getError(largura.id, "Largura deve ser maior ou igual a 1 metro", largura);
            temErro = true;
        } else if (largura.value >= 15) {
            getError(largura.id, "Largura deve ser menor ou igual a 15 metros", largura);
            temErro = true;
        }
        if (validate(porta.id) && validate(janela.id)) {
            if (areaPorta + areaJanela > areaParede / 2) {
                getError(janela.id, "Area da porta e janela não podem ser superior à 50% area da parede", janela)
                temErro = true;

            }
        } else if (validate(porta.id)) {
            if (areaPorta > areaParede / 2) {
                getError(porta.id, "Area da porta não pode ser superior à 50% area da parede", porta)
                temErro = true;

            }
        } else if (validate(janela.id)) {
            if (areaJanela > areaParede / 2) {
                getError(janela.id, "Area da janela não pode ser superior à 50% area da parede")
                temErro = true;

            }
        }
        areaParedeSomada += areaParede;


    }
    const fields = [...document.querySelectorAll(".parede input")];

    fields.forEach(field => {
        if (field.value === "") form.classList.add("validate-error");
    });

    const formError = document.querySelector(".validate-error");
    console.log(formError)
    if (formError) {
        formError.addEventListener("animationend", event => {
            if (event.animationName === "nono") {
                formError.classList.remove("validate-error");
            }
        });
    } else {
        form.classList.add("form-hide");
    }
    if (!temErro) {
        quantTinta(areaParedeSomada);
    }
})
function validate(id) {
    return document.getElementById(id).checked
}
function quantTinta(areaParede) {
    const litrosTinta = areaParede / 5;
    if (litrosTinta <= 0.5) {
        getResp("A lata de tinta indicada é a de 0,5 litros")
    } else if (litrosTinta <= 2.5) {
        getResp("A lata de tinta indicada é a de 2,5 litros")
    } else if (litrosTinta <= 3.6) {
        getResp("A lata de tinta indicada é a de 3,6 litros")
    } else {
        getResp("A lata de tinta indicada é a de 18 litros")
    }
}

const ulSquares = document.querySelector("ul.squares");

for (let i = 0; i < 30; i++) {
    const li = document.createElement("li");

    const random = (min, max) => Math.random() * (max - min) + min;

    const size = Math.floor(random(10, 120));
    const position = random(1, 99);
    const delay = random(5, 0.1);
    const duration = random(24, 12);

    li.style.width = `${size}px`;
    li.style.height = `${size}px`;
    li.style.bottom = `-${size}px`;

    li.style.left = `${position}%`;

    li.style.animationDelay = `${delay}s`;
    li.style.animationDuration = `${duration}s`;
    li.style.animationTimingFunction = `cubic-bezier(${Math.random()}, ${Math.random()}, ${Math.random()}, ${Math.random()})`;

    ulSquares.appendChild(li);
}
