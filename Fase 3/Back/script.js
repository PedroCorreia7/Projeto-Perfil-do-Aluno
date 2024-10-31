
// ===FUNÇÃO DE VALIDAR CPF , EU JÁ HAVIA CRIADO ESSE CÓDIGO EM OUTRO PROJETO QUE FIZ AI DECIDI REUTILIZAR======


function formatarCPF(cpf) {
    // Remove todos os caracteres não numéricos
    cpf = cpf.replace(/\D/g, '');

    // Aplica a máscara (ddd.ddd.ddd.dd)
    cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
    cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
    cpf = cpf.replace(/(\d{3})(\d{1,2})$/, '$1-$2');

    return cpf;
}

function validarCPF(cpf) {
    // Remove caracteres não numéricos para validação
    cpf = cpf.replace(/[^\d]+/g, '');

    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) {
        return false;
    }

    let soma = 0;
    let resto;

    for (let i = 1; i <= 9; i++) {
        soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    }
    resto = (soma * 10) % 11;
    if (resto == 10 || resto == 11) resto = 0;
    if (resto != parseInt(cpf.substring(9, 10))) return false;

    soma = 0;
    for (let i = 1; i <= 10; i++) {
        soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    }
    resto = (soma * 10) % 11;
    if (resto == 10 || resto == 11) resto = 0;
    if (resto != parseInt(cpf.substring(10, 11))) return false;

    return true;
}

function aplicarMascaraCPF(event) {
    const input = event.target;
    input.value = formatarCPF(input.value);

    const tooltip = document.getElementById('tooltip');
    const cpf = input.value.replace(/\D/g, ''); // Remove não numéricos para validação

    // Exibe a caixa flutuante somente quando o CPF tiver 11 dígitos
    if (cpf.length === 11) {
        if (validarCPF(cpf)) {
            tooltip.textContent = "CPF válido!";
            tooltip.className = 'tooltip valid';
        } else {
            tooltip.textContent = "CPF inválido!";
            tooltip.className = 'tooltip invalid';
        }
        tooltip.style.display = 'block';
    } else {
        tooltip.style.display = 'none'; // Não exibe nada se o CPF estiver incompleto
    }
}

function changeImage(src) {
    const mainImage = document.getElementById('mainImage');
    mainImage.src = src;

}




function validarEmail() {
    const emailInput = document.getElementById("email");
    const erroEmail = document.getElementById("erro-email");
    const email = emailInput.value;

    // Expressão regular para validar o formato do email
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(email)) {
        erroEmail.style.display = "inline"; // Exibe a mensagem de erro
        emailInput.focus();
    } else {
        erroEmail.style.display = "none"; // Oculta a mensagem de erro
    }
}



// ============== ADICIONAR NOVAS UCS ============
function addUC() {
    let novaUC = prompt("Digite o nome da nova UC:");
    if (novaUC) {
        const li = document.createElement("li");
        li.innerHTML = `${novaUC} 
            <div class="buttons">
                <button onclick="moveUp(this)">⬆️</button>
                <button onclick="moveDown(this)">⬇️</button>
            </div>`;
        document.getElementById("uc-list").appendChild(li);
    }
}

// Função para mover UC para cima
function moveUp(button) {
    const li = button.closest("li");
    const previousLi = li.previousElementSibling;
    if (previousLi) {
        li.parentNode.insertBefore(li, previousLi);
    }
}

// Função para mover UC para baixo
function moveDown(button) {
    const li = button.closest("li");
    const nextLi = li.nextElementSibling;
    if (nextLi) {
        li.parentNode.insertBefore(nextLi, li);
    }
}


// Função para adicionar novas informações ao perfil
function addInfo() {
    const newInfoInput = document.getElementById("new-info");
    const infoText = newInfoInput.value.trim();

    if (infoText) {
        const infoList = document.getElementById("info-list");
        const newListItem = document.createElement("li");
        newListItem.textContent = infoText;
        infoList.appendChild(newListItem);
        newInfoInput.value = ""; // Limpa o campo após adicionar
    }
}