// Variável para armazenar o último momento em que os dados foram enviados
let lastSubmissionTime = 0;

function submitForm(event) {
    event.preventDefault();
    
    const now = Date.now();
    // Verificar se já se passaram 30 segundos desde o último envio
    if (now - lastSubmissionTime < 30000) {
        alert('Por favor, aguarde 30 segundos antes de enviar novamente.');
        return;
    }
    
    const form = document.getElementById('myForm');
    const formData = new FormData(form);
    
    // Validar nome
    const nome = formData.get('nome');
    if (!/^[a-zA-ZÀ-ú\s]+$/.test(nome)) {
        alert('Por favor, insira apenas letras no campo de nome.');
        return;
    }

    // Validar telefone
    let telefone = formData.get('telefone');
    // Remover todos os caracteres que não são dígitos
    const telefoneNumerico = telefone.replace(/\D/g, '');
    // Verificar se o número de telefone tem 11 dígitos (DDD + número)
    if (!/^\d{11}$/.test(telefoneNumerico)) {
        alert('Por favor, insira um número de telefone válido no formato DDDXXXXXXXXXX (11 dígitos).');
        return;
    }
    
    // Adicionar o parêntese se ele não estiver presente
    if (telefone.indexOf('(') === -1 && telefoneNumerico.length >= 2) {
        telefone = `(${telefoneNumerico.substring(0, 2)}) ${telefoneNumerico.substring(2)}`;
    }

    // Adicionar hífen no número de telefone
    telefone = telefone.replace(/^(\d{2})(\d{5})(\d{4})$/, '$1 $2-$3');
    formData.set('telefone', telefone);

    // Verificar se um radio button foi selecionado
    const role = document.querySelector('input[name="role"]:checked');
    if (!role) {
        alert('Por favor, selecione uma opção (Motorista ou Empresa).');
        return;
    }
    formData.append('role', role.value);

    // Enviar o formulário
    fetch('https://script.google.com/macros/s/AKfycbwwd8paTFBLnEuNzL-Z5qR-lqE0aQcWqyFuvcPsRBcYK3lgT5swi1poQd7tq5ZmpP3q/exec', {
        method: 'POST',
        body: new URLSearchParams(formData)
    })
    .then(response => response.text())
    .then(responseText => {
        alert(responseText);
        form.reset();
        // Atualizar o último momento de envio
        lastSubmissionTime = now;
    })
    .catch(error => console.error('Error!', error.message));
}
