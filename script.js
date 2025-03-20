// Exemplo de interatividade: Adicionar uma animação ao rolar a página
window.addEventListener('scroll', () => {
    const servicos = document.querySelector('#servicos');
    const servicosPosition = servicos.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.3;

    if (servicosPosition < screenPosition) {
        servicos.style.opacity = '1';
        servicos.style.transform = 'translateY(0)';
    }
});