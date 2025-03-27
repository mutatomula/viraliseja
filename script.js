document.addEventListener('DOMContentLoaded', function() {
    // Elementos do formulário
    const form = document.getElementById('rifaForm');
    const quantityInput = document.getElementById('quantity');
    const randomRadio = document.querySelector('input[value="random"]');
    const chooseRadio = document.querySelector('input[value="choose"]');
    const numbersContainer = document.getElementById('numbersContainer');
    const chosenNumbersInput = document.getElementById('chosenNumbers');
    const calculateBtn = document.getElementById('calculateBtn');
    const totalValueDiv = document.getElementById('totalValue');
    const totalAmountSpan = document.getElementById('totalAmount');
    const quantityDisplay = document.getElementById('quantityDisplay');
    const userDataDiv = document.getElementById('userData');
    const buyBtn = document.getElementById('buyBtn');
    const errorAlert = document.getElementById('errorAlert');
    const successAlert = document.getElementById('successAlert');

    // Preço por rifa
    const PRICE_PER_TICKET = 5.50;
    const WHATSAPP_NUMBER = "5511985310434";

    // Mostrar/ocultar campo de escolha de números
    chooseRadio.addEventListener('change', function() {
        numbersContainer.style.display = this.checked ? 'block' : 'none';
        if (!this.checked) {
            chosenNumbersInput.value = '';
        }
    });

    // Calcular valor total
    calculateBtn.addEventListener('click', function() {
        const quantity = parseInt(quantityInput.value);
        
        // Reset alerts
        errorAlert.style.display = 'none';
        successAlert.style.display = 'none';
        
        if (isNaN(quantity)) {
            showError('Por favor, insira um número válido.');
            quantityInput.value = 1;
            return;
        }

        if (quantity < 1 || quantity > 100) {
            showError('Por favor, insira uma quantidade entre 1 e 100.');
            quantityInput.value = quantity < 1 ? 1 : 100;
            return;
        }

        // Verificar se está escolhendo números e se a quantidade bate
        if (chooseRadio.checked) {
            const chosenNumbers = chosenNumbersInput.value
                .split(',')
                .map(num => parseInt(num.trim()))
                .filter(num => !isNaN(num) && num >= 1 && num <= 1000);
            
            if (chosenNumbers.length === 0) {
                showError('Por favor, insira pelo menos um número válido (entre 1 e 1000).');
                return;
            }
            
            if (chosenNumbers.length !== quantity) {
                showError(`Você deve selecionar exatamente ${quantity} números válidos (entre 1 e 1000).`);
                return;
            }
            
            // Verificar números duplicados
            const uniqueNumbers = [...new Set(chosenNumbers)];
            if (uniqueNumbers.length !== chosenNumbers.length) {
                showError('Por favor, não repita números.');
                return;
            }
            
            // Verificar números inválidos
            const invalidNumbers = chosenNumbers.filter(num => num < 1 || num > 1000);
            if (invalidNumbers.length > 0) {
                showError(`Números inválidos: ${invalidNumbers.join(', ')}. Por favor, use apenas números entre 1 e 1000.`);
                return;
            }
        }

        const totalValue = quantity * PRICE_PER_TICKET;
        totalAmountSpan.textContent = `R$${totalValue.toFixed(2).replace('.', ',')}`;
        quantityDisplay.textContent = quantity;
        totalValueDiv.style.display = 'block';
        userDataDiv.style.display = 'block';
        
        // Rolagem suave para os dados do usuário
        setTimeout(() => {
            userDataDiv.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        }, 100);
        
        showSuccess('Valor calculado com sucesso! Preencha seus dados para continuar.');
    });

    // Formatar CPF
    const cpf = document.getElementById('cpf');
    cpf.addEventListener('input', function() {
        let value = this.value.replace(/\D/g, '');
        
        if (value.length > 3) {
            value = value.substring(0, 3) + '.' + value.substring(3);
        }
        if (value.length > 7) {
            value = value.substring(0, 7) + '.' + value.substring(7);
        }
        if (value.length > 11) {
            value = value.substring(0, 11) + '-' + value.substring(11);
        }
        if (value.length > 14) {
            value = value.substring(0, 14);
        }
        
        this.value = value;
    });

    // Formatar telefone
    const phone = document.getElementById('phone');
    phone.addEventListener('input', function() {
        let value = this.value.replace(/\D/g, '');
        
        if (value.length > 0) {
            value = '(' + value.substring(0, 2) + ') ' + value.substring(2);
        }
        if (value.length > 10) {
            value = value.substring(0, 10) + '-' + value.substring(10);
        }
        if (value.length > 15) {
            value = value.substring(0, 15);
        }
        
        this.value = value;
    });

    // Validar data de nascimento
    const birthDate = document.getElementById('birthDate');
    birthDate.addEventListener('change', function() {
        const today = new Date();
        const birthDate = new Date(this.value);
        const age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        
        if (age < 18) {
            showError('Você deve ter pelo menos 18 anos para participar.');
            this.value = '';
        }
    });

    // Enviar formulário
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const quantity = parseInt(quantityInput.value);
        const isRandom = randomRadio.checked;
        const fullName = document.getElementById('fullName').value.trim();
        const birthDateValue = document.getElementById('birthDate').value;
        const cpfValue = cpf.value.trim();
        const phoneValue = phone.value.trim();
        
        // Validar dados
        if (!fullName) {
            showError('Por favor, preencha seu nome completo.');
            return;
        }
        
        if (!birthDateValue) {
            showError('Por favor, preencha sua data de nascimento.');
            return;
        }
        
        if (!cpfValue || cpfValue.length < 14) {
            showError('Por favor, preencha um CPF válido.');
            return;
        }
        
        if (!phoneValue || phoneValue.length < 15) {
            showError('Por favor, preencha um número de celular válido.');
            return;
        }
        
        // Gerar números da rifa
        let ticketNumbers = [];
        
        if (isRandom) {
            // Gerar números aleatórios únicos
            const availableNumbers = Array.from({length: 1000}, (_, i) => i + 1);
            for (let i = 0; i < quantity; i++) {
                const randomIndex = Math.floor(Math.random() * availableNumbers.length);
                ticketNumbers.push(availableNumbers[randomIndex]);
                availableNumbers.splice(randomIndex, 1);
            }
            ticketNumbers.sort((a, b) => a - b);
        } else {
            // Usar números escolhidos
            ticketNumbers = chosenNumbersInput.value
                .split(',')
                .map(num => parseInt(num.trim()))
                .filter(num => !isNaN(num) && num >= 1 && num <= 1000)
                .sort((a, b) => a - b);
        }
        
        // Calcular valor total
        const totalValue = quantity * PRICE_PER_TICKET;
        
        // Criar mensagem para WhatsApp
        const message = `🎟️ *COMPRA DE RIFAS - 10K SEGUIDORES* 🎟️\n\n` +
                        `📌 *RESUMO DA COMPRA*\n` +
                        `• Quantidade de rifas: ${quantity}\n` +
                        `• Valor unitário: R$${PRICE_PER_TICKET.toFixed(2)}\n` +
                        `• Valor total: R$${totalValue.toFixed(2)}\n\n` +
                        `🔢 *NÚMEROS DA RIFA*\n${ticketNumbers.join(', ')}\n\n` +
                        `👤 *DADOS PESSOAIS*\n` +
                        `• Nome completo: ${fullName}\n` +
                        `• Data de nascimento: ${birthDateValue}\n` +
                        `• CPF: ${cpfValue}\n` +
                        `• Celular: ${phoneValue}\n\n` +
                        `📝 *INFORMAÇÕES ADICIONAIS*\n` +
                        `• Tipo de números: ${isRandom ? 'Aleatórios' : 'Escolhidos'}\n` +
                        `• Data/hora: ${new Date().toLocaleString('pt-BR')}\n\n` +
                        `Por favor, confirme os dados acima e informe como devo proceder com o pagamento. Obrigado!`;
        
        // Codificar mensagem para URL
        const encodedMessage = encodeURIComponent(message);
        
        // Redirecionar para WhatsApp
        window.location.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
    });

    function showError(message) {
        errorAlert.textContent = message;
        errorAlert.style.display = 'block';
        successAlert.style.display = 'none';
        setTimeout(() => {
            errorAlert.style.display = 'none';
        }, 5000);
    }

    function showSuccess(message) {
        successAlert.textContent = message;
        successAlert.style.display = 'block';
        errorAlert.style.display = 'none';
        setTimeout(() => {
            successAlert.style.display = 'none';
        }, 5000);
    }
});