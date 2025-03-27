document.addEventListener('DOMContentLoaded', function() {
    // Preço por rifa ALTERADO PARA R$2,29
    const PRICE_PER_TICKET = 2.29; // VALOR ALTERADO AQUI
    const WHATSAPP_NUMBER = "5511985310434";

    // ... (todo o restante do script.js permanece IGUAL) ...

    // Exemplo da mensagem que será enviada para seu WhatsApp:
    const message = `🎟️ *COMPRA DE RIFAS - 10K SEGUIDORES* 🎟️\n\n` +
                    `📌 *RESUMO DA COMPRA*\n` +
                    `• Quantidade: ${quantity} rifas\n` +
                    `• Valor unitário: R$${PRICE_PER_TICKET.toFixed(2)}\n` + // Mostrará R$2,29
                    `• Valor total: R$${totalValue.toFixed(2)}\n\n` +
                    `🔢 Números: ${ticketNumbers.join(', ')}\n\n` +
                    `👤 *DADOS*\n` +
                    `• Nome: ${fullName}\n` +
                    `• CPF: ${cpfValue}\n` +
                    `• Celular: ${phoneValue}\n\n` +
                    `💳 *PAGAMENTO VIA PIX*`; // Mensagem atualizada
});
