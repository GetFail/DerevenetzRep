// Общие функции для всех страниц
const App = {
    // Инициализация приложения
    init: function() {
        this.checkAuth();
        this.initData();
    },
    
    // Проверка авторизации
    checkAuth: function() {
        const currentUser = localStorage.getItem('currentUser');
        if (!currentUser && !window.location.pathname.includes('index.html')) {
            window.location.href = 'index.html';
        }
    },
    
    // Инициализация данных
    initData: function() {
        // Инициализируем задачи, если их нет
        if (!localStorage.getItem('tasks')) {
            const sampleTasks = [
                {
                    id: 1,
                    name: "Ремонт кондиционера",
                    date: "2023-10-15",
                    notes: "Требуется специалист с опытом работы с системами вентиляции",
                    status: "new",
                    store: "ТЦ Глобус",
                    createdBy: "Управляющий магазином",
                    history: [
                        {
                            date: "2023-10-10 14:30",
                            status: "new",
                            user: "Иванов А.А.",
                            comment: "Задание создано"
                        }
                    ]
                },
                {
                    id: 2,
                    name: "Замена освещения",
                    date: "2023-10-20",
                    notes: "Необходимо заменить 15 светильников",
                    status: "work",
                    store: "ТЦ Глобус",
                    createdBy: "Управляющий магазином",
                    history: [
                        {
                            date: "2023-10-10 09:00",
                            status: "new",
                            user: "Иванов А.А.",
                            comment: "Задание создано"
                        },
                        {
                            date: "2023-10-11 11:30",
                            status: "work",
                            user: "Петров Б.Б.",
                            comment: "Отправлено в офис"
                        }
                    ]
                }
            ];
            localStorage.setItem('tasks', JSON.stringify(sampleTasks));
        }
        
        // Инициализируем сотрудников, если их нет
        if (!localStorage.getItem('employees')) {
            const sampleEmployees = [
                { id: 1, name: "Сидоров В.В.", specialization: "Электрик", status: "available" },
                { id: 2, name: "Кузнецов Д.И.", specialization: "Слесарь", status: "available" },
                { id: 3, name: "Петров А.С.", specialization: "Сантехник", status: "busy" },
                { id: 4, name: "Иванов М.П.", specialization: "IT-специалист", status: "available" }
            ];
            localStorage.setItem('employees', JSON.stringify(sampleEmployees));
        }
        
        // Инициализируем заявки на подбор, если их нет
        if (!localStorage.getItem('recruitmentRequests')) {
            localStorage.setItem('recruitmentRequests', JSON.stringify([]));
        }
    },
    
    // Показ уведомления
    showNotification: function(message, type = 'success') {
        // Создаем уведомление, если его нет
        let notification = document.getElementById('notification');
        if (!notification) {
            notification = document.createElement('div');
            notification.id = 'notification';
            notification.style.cssText = `
                position: fixed;
                bottom: 20px;
                right: 20px;
                padding: 15px 25px;
                border-radius: 8px;
                color: white;
                font-weight: bold;
                z-index: 1000;
                display: none;
                animation: slideIn 0.3s ease;
            `;
            document.body.appendChild(notification);
            
            // Добавляем анимацию
            const style = document.createElement('style');
            style.textContent = `
                @keyframes slideIn {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
            `;
            document.head.appendChild(style);
        }
        
        // Настраиваем уведомление
        notification.textContent = message;
        notification.style.background = type === 'success' ? '#2ecc71' : 
                                       type === 'error' ? '#e74c3c' : '#3498db';
        notification.style.display = 'block';
        
        // Скрываем через 3 секунды
        setTimeout(() => {
            notification.style.display = 'none';
        }, 3000);
    },
    
    // Получение текста статуса
    getStatusText: function(status) {
        switch(status) {
            case 'new': return 'Новый';
            case 'work': return 'В работе';
            case 'done': return 'Выполнен';
            case 'cancelled': return 'Отменен';
            case 'closed': return 'Закрыт';
            default: return status;
        }
    },
    
    // Получение класса статуса
    getStatusClass: function(status) {
        switch(status) {
            case 'new': return 'status-new';
            case 'work': return 'status-work';
            case 'done': return 'status-done';
            case 'cancelled': return 'status-cancelled';
            case 'closed': return 'status-closed';
            default: return '';
        }
    },
    
    // Выход из системы
    logout: function() {
        localStorage.removeItem('currentUser');
        window.location.href = 'index.html';
    }
};

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    App.init();
});