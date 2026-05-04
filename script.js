// Инициализация EmailJS (замените на ваш User ID)
emailjs.init('YOUR_USER_ID');

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('emailForm');
    const envelope = document.getElementById('envelope');
    const paper = document.getElementById('paper');
    const letterMessage = document.getElementById('letter-message');
    const submitBtn = document.getElementById('submitBtn');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoader = submitBtn.querySelector('.btn-loader');
    const confirmation = document.getElementById('confirmation');
    const displayDateTime = document.getElementById('displayDateTime');
    const trackingNumber = document.getElementById('trackingNumber');

    form.addEventListener('submit', async function(e) {
        e.preventDefault();

        // Получаем данные формы
        const to = document.getElementById('to').value;
        const subject = document.getElementById('subject').value;
        const body = document.getElementById('body').value;
        const sendDateTime = document.getElementById('sendDateTime').value;

        // Обновляем содержимое письма
        letterMessage.textContent = body.substring(0, 100) + (body.length > 100 ? '...' : '');

        // Показываем анимацию открытия конверта
        envelope.classList.add('opening');
        paper.classList.add('visible');

        // Активируем кнопку загрузки
        btnText.style.display = 'none';
        btnLoader.style.display = 'inline-block';

        try {
            // Имитация отправки (в реальном проекте замените на emailjs.send)
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Генерируем трек-номер
            const trackId = 'TRK-' + Math.random().toString(36).substr(2, 9).toUpperCase();

            trackingNumber.textContent = trackId;

            // Показываем дату отправки
            displayDateTime.textContent = formatDateTime(sendDateTime);

            // Показываем подтверждение
            confirmation.style.display = 'block';
            
            // Создаём конфетти
            createConfetti();

            // Сброс формы через 5 секунд
            setTimeout(() => {
                resetForm();
            }, 5000);

        } catch (error) {
            console.error('Ошибка:', error);
            btnText.textContent = 'Ошибка! Попробуйте снова';
            btnText.style.color = '#e74c3c';
        }
    });

    function formatDateTime(dateTimeString) {
        const date = new Date(dateTimeString);
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        };
        return date.toLocaleDateString('ru-RU', options);
    }

    function createConfetti() {
        const colors = ['#e74c3c', '#3498db', '#2ecc71', '#f39c12', '#9b59b6'];
        for (let i = 0; i < 50; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.top = '-10px';
            document.body.appendChild(confetti);

            const animation = confetti.animate([
                { transform: 'translate
