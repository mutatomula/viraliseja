document.addEventListener('DOMContentLoaded', function() {
    // Configuração dos botões de compra
    const buyButtons = document.querySelectorAll('.buy-btn');
    const whatsappNumber = "5511985310434"; // Seu número com código do país
    
    buyButtons.forEach(button => {
        button.addEventListener('click', function() {
            const product = this.getAttribute('data-product');
            const price = this.getAttribute('data-price');
            
            // Mensagem formatada para o WhatsApp
            const message = `✅ *Viralize Já* ✅\n\n` +
                          `📌 *Produto:* ${product}\n` +
                          `💰 *Valor:* R$ ${price}\n\n` +
                          `Eu quero comprar este produto! Por favor, me informe como proceder.\n\n` +
                          `_Mensagem enviada automaticamente pelo site_`;
            
            const encodedMessage = encodeURIComponent(message);
            window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, '_blank');
        });
    });

    // Botão flutuante do WhatsApp
    const whatsappFloat = document.querySelector('.whatsapp-button');
    if (whatsappFloat) {
        whatsappFloat.addEventListener('click', function(e) {
            e.preventDefault();
            window.open(`https://wa.me/${whatsappNumber}`, '_blank');
        });
    }
});