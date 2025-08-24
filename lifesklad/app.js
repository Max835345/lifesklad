        
    ymaps.ready(init);

    function init() {
        myMap = new ymaps.Map("map", {
            center: [60.066125, 30.291052],
            zoom: 17,
        }, {
        }),
        myPlacemark = new ymaps.Placemark([60.066125, 30.291052],{
            balloonContentHeader: "",
            balloonContentBody: "",
            balloonContentFooter: "",
            hintContent: "Мы тут"
        });
        
    myMap.geoObjects.add(myPlacemark);
        
    }
        
        
        // Бургер-меню
        const burgerMenu = document.querySelector('.burger-menu');
        const mobileNav = document.querySelector('.mobile-nav');
        const overlay = document.querySelector('.overlay');
        
        burgerMenu.addEventListener('click', function() {
            this.classList.toggle('active');
            mobileNav.classList.toggle('active');
            overlay.classList.toggle('active');
            document.body.classList.toggle('no-scroll');
        });
        
        overlay.addEventListener('click', function() {
            burgerMenu.classList.remove('active');
            mobileNav.classList.remove('active');
            this.classList.remove('active');
            document.body.classList.remove('no-scroll');
        });
        
        // Закрытие меню при клике на пункт
        const mobileNavLinks = document.querySelectorAll('.mobile-nav a');
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', function() {
                burgerMenu.classList.remove('active');
                mobileNav.classList.remove('active');
                overlay.classList.remove('active');
                document.body.classList.remove('no-scroll');
            });
        });

        // Плавная прокрутка к якорям
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });

        // Подсветка активного пункта меню при прокрутке
        window.addEventListener('scroll', function() {
            const sections = document.querySelectorAll('section');
            const navLinks = document.querySelectorAll('nav a, .mobile-nav a');
            
            let current = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                
                if(pageYOffset >= (sectionTop - sectionHeight / 3)) {
                    current = section.getAttribute('id');
                }
            });
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                if(link.getAttribute('href').substring(1) === current) {
                    link.classList.add('active');
                }
            });
        });

        function createPhoneMask(inputId) {
            const input = document.getElementById(inputId);
            if (!input) return;
            
            // Обработчик ввода
            input.addEventListener('input', function(e) {
                const value = e.target.value.replace(/\D/g, '');
                let formattedValue = '';
                
                if (value.length > 0) {
                    formattedValue = '(' + value.substring(0, 3);
                }
                if (value.length > 3) {
                    formattedValue += ') ' + value.substring(3, 6);
                }
                if (value.length > 6) {
                    formattedValue += '-' + value.substring(6, 8);
                }
                if (value.length > 8) {
                    formattedValue += '-' + value.substring(8, 10);
                }
                
                e.target.value = formattedValue;
            });
            
            // Обработчик удаления
            input.addEventListener('keydown', function(e) {
                // Разрешаем удаление только цифр, а не форматирующих символов
                if (e.key === 'Backspace') {
                    const cursorPosition = e.target.selectionStart;
                    const value = e.target.value;
                    
                    // Если перед курсором не цифра, а форматирующий символ
                    if (cursorPosition > 0 && !/\d/.test(value.charAt(cursorPosition - 1))) {
                        e.preventDefault();
                        // Перемещаем курсор назад и удаляем цифру
                        const newPosition = cursorPosition - 1;
                        e.target.setSelectionRange(newPosition, newPosition);
                        
                        // Удаляем цифру перед форматирующим символом
                        const numbers = value.replace(/\D/g, '');
                        const newNumbers = numbers.substring(0, numbers.length - 1);
                        
                        // Форматируем заново
                        let formattedValue = '';
                        if (newNumbers.length > 0) {
                            formattedValue = '(' + newNumbers.substring(0, 3);
                        }
                        if (newNumbers.length > 3) {
                            formattedValue += ') ' + newNumbers.substring(3, 6);
                        }
                        if (newNumbers.length > 6) {
                            formattedValue += '-' + newNumbers.substring(6, 8);
                        }
                        if (newNumbers.length > 8) {
                            formattedValue += '-' + newNumbers.substring(8, 10);
                        }
                        
                        e.target.value = formattedValue;
                    }
                }
            });
        }

        document.addEventListener('DOMContentLoaded', function() {
            // Применяем маску к основному полю телефона
            createPhoneMask('phone');
            
            // Применяем маску к полю телефона в модальном окне
            createPhoneMask('discountPhone');
            
            // Обработчик отправки основной формы
            const orderForm = document.getElementById('orderForm');
            if (orderForm) {
                orderForm.addEventListener('submit', function(e) {
                    e.preventDefault();

                    // Проверяем, что номер телефона содержит достаточно цифр
                    const phoneInput = document.getElementById('phone');
                    const phoneValue = phoneInput.value.replace(/\D/g, '');
                    if (phoneValue.length < 10) {
                        alert('Пожалуйста, введите полный номер телефона');
                        phoneInput.focus();
                        return;
                    }

                    // Полный номер с +7
                    const fullPhone = '+7' + phoneValue;

                    // Собираем данные
                    const name = document.getElementById('name').value;
                    const box = document.querySelector('input[name="Бокс"]:checked').value;

                    // Формируем текст письма
                    const subject = "Заявка на аренду бокса";
                    const body = `Имя: ${name}%0D%0AТелефон: ${fullPhone}%0D%0AБокс: ${box}`;

                    // Открываем почтовый клиент
                    window.location.href = `mailto:инфо@лайф-склад.рф?subject=${subject}&body=${body}`;

                    // Очищаем форму
                    orderForm.reset();
                    
                    // Показываем сообщение об успехе
                    alert("Спасибо! Ваша заявка отправлена.");
                });
            }
            
            // Обработчик отправки формы в модальном окне
            const discountForm = document.getElementById('discountForm');
            if (discountForm) {
                discountForm.addEventListener('submit', function(e) {
                    e.preventDefault();

                    // Проверяем, что номер телефона содержит достаточно цифр
                    const discountPhoneInput = document.getElementById('discountPhone');
                    const phoneValue = discountPhoneInput.value.replace(/\D/g, '');
                    if (phoneValue.length < 10) {
                        alert('Пожалуйста, введите полный номер телефона');
                        discountPhoneInput.focus();
                        return;
                    }

                    // Полный номер с +7
                    const fullPhone = '+7' + phoneValue;

                    // Собираем данные
                    const name = document.getElementById('discountName').value;

                    // Формируем текст письма
                    const subject = "Заявка на бронирование скидки";
                    const body = `ФИО: ${name}%0D%0AТелефон: ${fullPhone}`;

                    // Открываем почтовый клиент
                    window.location.href = `mailto:инфо@лайф-склад.рф?subject=${subject}&body=${body}`;

                    // Очищаем форму
                    discountForm.reset();
                    
                    // Закрываем модальное окно
                    discountModal.style.display = 'none';
                    
                    // Показываем сообщение об успехе
                    alert("Спасибо! Ваша заявка на скидку отправлена.");
                });
            }
        });

        function createPhoneMask(inputId) {
            const input = document.getElementById(inputId);
            if (!input) return;
            
            // Обработчик ввода
            input.addEventListener('input', function(e) {
                const value = e.target.value.replace(/\D/g, '');
                let formattedValue = '';
                
                if (value.length > 0) {
                    formattedValue = '(' + value.substring(0, 3);
                }
                if (value.length > 3) {
                    formattedValue += ') ' + value.substring(3, 6);
                }
                if (value.length > 6) {
                    formattedValue += '-' + value.substring(6, 8);
                }
                if (value.length > 8) {
                    formattedValue += '-' + value.substring(8, 10);
                }
                
                e.target.value = formattedValue;
            });
            
            // Обработчик удаления
            input.addEventListener('keydown', function(e) {
                if (e.key === 'Backspace') {
                    const cursorPosition = e.target.selectionStart;
                    const value = e.target.value;
                    
                    // Если перед курсором не цифра, а форматирующий символ
                    if (cursorPosition > 0 && !/\d/.test(value.charAt(cursorPosition - 1))) {
                        e.preventDefault();
                        // Перемещаем курсор назад
                        const newPosition = cursorPosition - 1;
                        e.target.setSelectionRange(newPosition, newPosition);
                        
                        // Удаляем цифру перед форматирующим символом
                        const numbers = value.replace(/\D/g, '');
                        const newNumbers = numbers.substring(0, numbers.length - 1);
                        
                        // Форматируем заново
                        let formattedValue = '';
                        if (newNumbers.length > 0) {
                            formattedValue = '(' + newNumbers.substring(0, 3);
                        }
                        if (newNumbers.length > 3) {
                            formattedValue += ') ' + newNumbers.substring(3, 6);
                        }
                        if (newNumbers.length > 6) {
                            formattedValue += '-' + newNumbers.substring(6, 8);
                        }
                        if (newNumbers.length > 8) {
                            formattedValue += '-' + newNumbers.substring(8, 10);
                        }
                        
                        e.target.value = formattedValue;
                    }
                }
            });
        }

        document.addEventListener('DOMContentLoaded', function() {
            // Применяем маску к полю телефона
            createPhoneMask('discountPhone');
            
            // Получаем элементы модального окна
            const m = document.getElementById('discountModal');
            const openButton = document.getElementById('openDiscountModal');
            const closeButton = document.querySelector('.close');
            
            // Открытие модального окна
            openButton.addEventListener('click', function() {
                m.style.display = 'flex';
            });
            
            // Закрытие модального окна
            closeButton.addEventListener('click', function() {
                m.style.display = 'none';
            });
            
            // Закрытие при клике вне модального окна
            window.addEventListener('click', function(event) {
                if (event.target === m) {
                    m.style.display = 'none';
                }
            });
            
            // Обработчик отправки формы
            const discountForm = document.getElementById('discountForm');
            if (discountForm) {
                discountForm.addEventListener('submit', function(e) {
                    e.preventDefault();

                    // Проверяем, что номер телефона содержит достаточно цифр
                    const discountPhoneInput = document.getElementById('discountPhone');
                    const phoneValue = discountPhoneInput.value.replace(/\D/g, '');
                    if (phoneValue.length < 10) {
                        alert('Пожалуйста, введите полный номер телефона');
                        discountPhoneInput.focus();
                        return;
                    }

                    // Полный номер с +7
                    const fullPhone = '+7' + phoneValue;

                    // Собираем данные
                    const name = document.getElementById('discountName').value;

                    // Формируем текст письма
                    const subject = "Заявка на бронирование скидки";
                    const body = `ФИО: ${name}%0D%0AТелефон: ${fullPhone}`;

                    // Открываем почтовый клиент
                    window.location.href = `mailto:инфо@лайф-склад.рф?subject=${subject}&body=${body}`;

                    // Очищаем форму
                    discountForm.reset();
                    // Закрываем модальное окно
                    m.style.display = 'none';
                    
                    // Показываем сообщение об успехе
                    alert("Спасибо! Ваша заявка на скидку отправлена. Мы свяжемся с вами в ближайшее время.");
                });
            }
        });



                // Упрощенная и надежная маска для телефона
                function createPhoneMask(inputId) {
                    const input = document.getElementById(inputId);
                    if (!input) return;
                    
                    // Обработчик ввода
                    input.addEventListener('input', function(e) {
                        const value = e.target.value.replace(/\D/g, '');
                        let formattedValue = '';
                        
                        if (value.length > 0) {
                            formattedValue = '(' + value.substring(0, 3);
                        }
                        if (value.length > 3) {
                            formattedValue += ') ' + value.substring(3, 6);
                        }
                        if (value.length > 6) {
                            formattedValue += '-' + value.substring(6, 8);
                        }
                        if (value.length > 8) {
                            formattedValue += '-' + value.substring(8, 10);
                        }
                        
                        e.target.value = formattedValue;
                    });
                    
                    // Обработчик удаления
                    input.addEventListener('keydown', function(e) {
                        if (e.key === 'Backspace') {
                            const cursorPosition = e.target.selectionStart;
                            const value = e.target.value;
                            
                            // Если перед курсором не цифра, а форматирующий символ
                            if (cursorPosition > 0 && !/\d/.test(value.charAt(cursorPosition - 1))) {
                                e.preventDefault();
                                // Перемещаем курсор назад
                                const newPosition = cursorPosition - 1;
                                e.target.setSelectionRange(newPosition, newPosition);
                                
                                // Удаляем цифру перед форматирующим символом
                                const numbers = value.replace(/\D/g, '');
                                const newNumbers = numbers.substring(0, numbers.length - 1);
                                
                                // Форматируем заново
                                let formattedValue = '';
                                if (newNumbers.length > 0) {
                                    formattedValue = '(' + newNumbers.substring(0, 3);
                                }
                                if (newNumbers.length > 3) {
                                    formattedValue += ') ' + newNumbers.substring(3, 6);
                                }
                                if (newNumbers.length > 6) {
                                    formattedValue += '-' + newNumbers.substring(6, 8);
                                }
                                if (newNumbers.length > 8) {
                                    formattedValue += '-' + newNumbers.substring(8, 10);
                                }
                                
                                e.target.value = formattedValue;
                            }
                        }
                    });
                }
        
                document.addEventListener('DOMContentLoaded', function() {
                    // Применяем маску к полю телефона
                    createPhoneMask('bookingPhone');
                    
                    // Устанавливаем минимальную дату для выбора (сегодня)
                    const today = new Date();
                    const yyyy = today.getFullYear();
                    const mm = String(today.getMonth() + 1).padStart(2, '0');
                    const dd = String(today.getDate()).padStart(2, '0');
                    const todayStr = `${yyyy}-${mm}-${dd}`;
                    document.getElementById('bookingDate').min = todayStr;
                    
                    // Получаем элементы модального окна
                    const modal = document.getElementById('bookingModal');
                    const openButton = document.getElementById('openBookingModal');
                    const closeButton = document.querySelector('.close');
                    
                    // Открытие модального окна
                    openButton.addEventListener('click', function() {
                        modal.style.display = 'flex';
                    });
                    
                    // Закрытие модального окна
                    closeButton.addEventListener('click', function() {
                        modal.style.display = 'none';
                    });
                    
                    // Закрытие при клике вне модального окна
                    window.addEventListener('click', function(event) {
                        if (event.target === modal) {
                            modal.style.display = 'none';
                        }
                    });
                    
                    // Обработчик отправки формы
                    const bookingForm = document.getElementById('bookingForm');
                    if (bookingForm) {
                        bookingForm.addEventListener('submit', function(e) {
                            e.preventDefault();
        
                            // Проверяем, что номер телефона содержит достаточно цифр
                            const bookingPhoneInput = document.getElementById('bookingPhone');
                            const phoneValue = bookingPhoneInput.value.replace(/\D/g, '');
                            if (phoneValue.length < 10) {
                                alert('Пожалуйста, введите полный номер телефона');
                                bookingPhoneInput.focus();
                                return;
                            }
        
                            // Полный номер с +7
                            const fullPhone = '+7' + phoneValue;
        
                            // Собираем данные
                            const name = document.getElementById('bookingName').value;
                            const boxSize = document.querySelector('input[name="boxSize"]:checked').value;
                            const date = document.getElementById('bookingDate').value;
        
                            // Форматируем дату для отображения
                            const dateObj = new Date(date);
                            const formattedDate = dateObj.toLocaleDateString('ru-RU', {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric'
                            });
        
                            // Формируем текст письма
                            const subject = "Бронирование бокса";
                            const body = `ФИО: ${name}%0D%0AТелефон: ${fullPhone}%0D%0AРазмер бокса: ${boxSize}%0D%0AДата заезда: ${formattedDate}`;
        
                            // Открываем почтовый клиент
                            window.location.href = `mailto:инфо@лайф-склад.рф?subject=${subject}&body=${body}`;
        
                            // Очищаем форму
                            bookingForm.reset();
                            
                            // Закрываем модальное окно
                            modal.style.display = 'none';
                            
                            // Показываем сообщение об успехе
                            alert(`Спасибо, ${name}! Ваше бронирование бокса ${boxSize} на ${formattedDate} оформлено. Мы свяжемся с вами для подтверждения.`);
                        });
                    }
                });

                document.getElementById('privacyLink').addEventListener('click', function(e) {
                    e.preventDefault(); // Отменяем стандартное поведение ссылки
                    
                    // Создаем скрытую ссылку для скачивания
                    const downloadLink = document.createElement('a');
                    downloadLink.href = '20250819_Политика_конфиденциальности_ИП_Рахимов.docx'; // Укажите правильный путь к файлу
                    downloadLink.download = 'Политика_конфиденциальности.docx'; // Имя скачиваемого файла
                    
                    // Имитируем клик для скачивания
                    document.body.appendChild(downloadLink);
                    downloadLink.click();
                    document.body.removeChild(downloadLink);
                  });