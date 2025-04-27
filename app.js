document.addEventListener('DOMContentLoaded', function() {
    // Элементы интерфейса
    const sourceText = document.getElementById('sourceText');
    const targetText = document.getElementById('targetText');
    const translateBtn = document.getElementById('translateBtn');
    const clearBtn = document.getElementById('clearBtn');
    const swapLangs = document.getElementById('swapLangs');
    const sourceLang = document.getElementById('sourceLang');
    const targetLang = document.getElementById('targetLang');
    const listenSource = document.getElementById('listenSource');
    const listenTarget = document.getElementById('listenTarget');
    const copyTarget = document.getElementById('copyTarget');
    const apiKeyBtn = document.getElementById('apiKeyBtn');
    const apiModal = document.getElementById('apiModal');
    const closeModal = document.querySelector('.close-modal');
    const apiKeyDisplay = document.getElementById('apiKey');
    const copyApiKey = document.getElementById('copyApiKey');

    // Загрузка словаря
    let dictionary = {};
    let phrases = {};
    
    async function loadDictionary() {
        try {
            const response = await fetch('words.txt');
            const text = await response.text();
            const lines = text.split('\n');
            
            dictionary = { ru: {}, kchr: {} };
            phrases = { ru: {}, kchr: {} };
            
            lines.forEach(line => {
                if (line.trim() && !line.startsWith('#')) {
                    // Обрабатываем отдельные слова
                    if (!line.includes(' ')) {
                        const [ruWord, kchrWord] = line.split('=').map(w => w.trim());
                        if (ruWord && kchrWord) {
                            dictionary.ru[ruWord.toLowerCase()] = kchrWord;
                            dictionary.kchr[kchrWord.toLowerCase()] = ruWord;
                        }
                    } else {
                        // Обрабатываем фразы
                        const [ruPhrase, kchrPhrase] = line.split('=').map(w => w.trim());
                        if (ruPhrase && kchrPhrase) {
                            phrases.ru[ruPhrase.toLowerCase()] = kchrPhrase;
                            phrases.kchr[kchrPhrase.toLowerCase()] = ruPhrase;
                        }
                    }
                }
            });
            
            console.log('Словарь и фразы загружены');
        } catch (error) {
            console.error('Ошибка загрузки словаря:', error);
            // Базовый словарь на случай ошибки
            dictionary = {
                ru: {
                    'привет': 'салам',
                    'мир': 'дуния',
                    'вода': 'суу',
                    'огонь': 'от',
                    'земля': 'джер'
                },
                kchr: {
                    'салам': 'привет',
                    'дуния': 'мир',
                    'суу': 'вода',
                    'от': 'огонь',
                    'джер': 'земля'
                }
            };
            phrases = {
                ru: {
                    'доброе утро': 'хош келигиз',
                    'как дела': 'ничахсыз',
                    'спасибо': 'сагъ олунгай'
                },
                kchr: {
                    'хош келигиз': 'доброе утро',
                    'ничахсыз': 'как дела',
                    'сагъ олунгай': 'спасибо'
                }
            };
        }
    }
    
    // Инициализация
    loadDictionary();

    // Функция для поиска похожих слов (исправление опечаток)
    function findSimilarWord(word, langDict, maxDistance = 2) {
        const words = Object.keys(langDict);
        let minDistance = Infinity;
        let closestWord = null;
        
        // Быстрый поиск по точному совпадению
        if (langDict[word]) return word;
        
        // Поиск по подстроке (для слов с приставками/суффиксами)
        for (const dictWord of words) {
            if (word.includes(dictWord) || dictWord.includes(word)) {
                return dictWord;
            }
        }
        
        // Полный поиск Левенштейна, если не нашли
        for (const dictWord of words) {
            const distance = levenshteinDistance(word, dictWord);
            if (distance < minDistance && distance <= maxDistance) {
                minDistance = distance;
                closestWord = dictWord;
            }
        }
        
        return closestWord;
    }

    // Расстояние Левенштейна для исправления опечаток
    function levenshteinDistance(a, b) {
        if (a.length === 0) return b.length;
        if (b.length === 0) return a.length;
        
        const matrix = [];
        for (let i = 0; i <= b.length; i++) {
            matrix[i] = [i];
        }
        for (let j = 0; j <= a.length; j++) {
            matrix[0][j] = j;
        }
        
        for (let i = 1; i <= b.length; i++) {
            for (let j = 1; j <= a.length; j++) {
                if (b.charAt(i-1) === a.charAt(j-1)) {
                    matrix[i][j] = matrix[i-1][j-1];
                } else {
                    matrix[i][j] = Math.min(
                        matrix[i-1][j-1] + 1,
                        matrix[i][j-1] + 1,
                        matrix[i-1][j] + 1
                    );
                }
            }
        }
        
        return matrix[b.length][a.length];
    }

    // Функция для выделения знаков препинания
    function processPunctuation(word) {
        const punctuationMatch = word.match(/[.,!?;:]+$/);
        const punctuation = punctuationMatch ? punctuationMatch[0] : '';
        const cleanWord = punctuationMatch ? word.slice(0, -punctuation.length) : word;
        return { cleanWord, punctuation };
    }

    // Функция перевода текста с учетом контекста
    function translateText(text, fromLang, toLang) {
        if (!text.trim()) return '';
        
        // Сначала проверяем полные фразы
        const lowerText = text.toLowerCase();
        for (const phrase in phrases[fromLang]) {
            if (lowerText.includes(phrase)) {
                const translatedPhrase = phrases[fromLang][phrase];
                // Сохраняем регистр первого символа
                const phraseIndex = lowerText.indexOf(phrase);
                const originalPhrase = text.slice(phraseIndex, phraseIndex + phrase.length);
                const firstCharUpper = originalPhrase[0] === originalPhrase[0].toUpperCase();
                const finalPhrase = firstCharUpper 
                    ? translatedPhrase.charAt(0).toUpperCase() + translatedPhrase.slice(1)
                    : translatedPhrase;
                
                text = text.replace(new RegExp(originalPhrase, 'i'), finalPhrase);
            }
        }
        
        // Затем переводим отдельные слова
        const words = text.split(/\s+/);
        const translatedWords = words.map(word => {
            // Обрабатываем знаки препинания
            const { cleanWord, punctuation } = processPunctuation(word);
            if (!cleanWord) return punctuation;
            
            // Проверяем регистр
            const isCapitalized = cleanWord[0] === cleanWord[0]?.toUpperCase() && 
                                cleanWord[0] !== cleanWord[0]?.toLowerCase();
            
            // Ищем перевод
            const lowerWord = cleanWord.toLowerCase();
            let translated = dictionary[fromLang][lowerWord];
            
            // Если не нашли, ищем похожие слова
            if (!translated) {
                const similarWord = findSimilarWord(lowerWord, dictionary[fromLang]);
                if (similarWord) {
                    translated = dictionary[fromLang][similarWord];
                } else {
                    translated = cleanWord; // Оставляем без перевода, если не нашли
                }
            }
            
            // Восстанавливаем регистр
            if (isCapitalized && translated) {
                translated = translated.charAt(0).toUpperCase() + translated.slice(1);
            }
            
            return translated + punctuation;
        });
        
        // Собираем текст обратно
        let translatedText = translatedWords.join(' ');
        
        // Пост-обработка: исправление артиклей, порядка слов и т.д.
        if (toLang === 'kchr') {
            // Пример: в карачаевском порядок слов может отличаться
            translatedText = translatedText.replace(/(\w+)\s(\w+)\s(\w+)/g, (match, g1, g2, g3) => {
                // Простая перестановка для демонстрации
                return Math.random() > 0.5 ? `${g2} ${g1} ${g3}` : match;
            });
        }
        
        return translatedText;
    }
    
    // Обработчики событий
    translateBtn.addEventListener('click', function() {
        const text = sourceText.value;
        const fromLang = sourceLang.value;
        const toLang = targetLang.value;
        
        const translatedText = translateText(text, fromLang, toLang);
        targetText.value = translatedText;
    });
    
    clearBtn.addEventListener('click', function() {
        sourceText.value = '';
        targetText.value = '';
    });
    
    swapLangs.addEventListener('click', function() {
        const tempLang = sourceLang.value;
        sourceLang.value = targetLang.value;
        targetLang.value = tempLang;
        
        const tempText = sourceText.value;
        sourceText.value = targetText.value;
        targetText.value = tempText;
    });
    
    listenSource.addEventListener('click', function() {
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(sourceText.value);
            utterance.lang = sourceLang.value === 'ru' ? 'ru-RU' : 'tr-TR'; // Для карачаевского используем турецкий как приближение
            speechSynthesis.speak(utterance);
        } else {
            alert('Браузер не поддерживает синтез речи');
        }
    });
    
    listenTarget.addEventListener('click', function() {
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(targetText.value);
            utterance.lang = targetLang.value === 'ru' ? 'ru-RU' : 'tr-TR';
            speechSynthesis.speak(utterance);
        } else {
            alert('Браузер не поддерживает синтез речи');
        }
    });
    
    copyTarget.addEventListener('click', function() {
        targetText.select();
        document.execCommand('copy');
        
        // Визуальная обратная связь
        const originalText = copyTarget.innerHTML;
        copyTarget.innerHTML = '<i class="fas fa-check"></i>';
        setTimeout(() => {
            copyTarget.innerHTML = originalText;
        }, 2000);
    });
    
    // API ключ модальное окно
    apiKeyBtn.addEventListener('click', function() {
        // Генерируем случайный API ключ
        const apiKey = 'miraje_' + Math.random().toString(36).substr(2, 16);
        apiKeyDisplay.textContent = apiKey;
        apiModal.style.display = 'block';
    });
    
    closeModal.addEventListener('click', function() {
        apiModal.style.display = 'none';
    });
    
    copyApiKey.addEventListener('click', function() {
        const range = document.createRange();
        range.selectNode(apiKeyDisplay);
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(range);
        document.execCommand('copy');
        window.getSelection().removeAllRanges();
        
        // Визуальная обратная связь
        const originalText = copyApiKey.innerHTML;
        copyApiKey.innerHTML = '<i class="fas fa-check"></i> Скопировано!';
        setTimeout(() => {
            copyApiKey.innerHTML = originalText;
        }, 2000);
    });
    
    window.addEventListener('click', function(event) {
        if (event.target === apiModal) {
            apiModal.style.display = 'none';
        }
    });
    
    // Автоперевод при вводе (с задержкой)
    let translateTimeout;
    sourceText.addEventListener('input', function() {
        clearTimeout(translateTimeout);
        translateTimeout = setTimeout(() => {
            const text = sourceText.value;
            const fromLang = sourceLang.value;
            const toLang = targetLang.value;
            
            if (text.trim()) {
                const translatedText = translateText(text, fromLang, toLang);
                targetText.value = translatedText;
            } else {
                targetText.value = '';
            }
        }, 500);
    });

    // Инициализация с примером перевода
    setTimeout(() => {
        sourceText.value = 'Привет, как дела?';
        const translatedText = translateText(sourceText.value, 'ru', 'kchr');
        targetText.value = translatedText;
    }, 1000);
});