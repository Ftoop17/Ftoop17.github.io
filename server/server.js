const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Загрузка словаря
let dictionary = { ru: {}, kchr: {} };

function loadDictionary() {
    try {
        const data = fs.readFileSync(path.join(__dirname, '../public/words.txt'), 'utf8');
        const lines = data.split('\n');
        
        lines.forEach(line => {
            if (line.trim() && !line.startsWith('#')) {
                const [ruWord, kchrWord] = line.split('=').map(w => w.trim());
                if (ruWord && kchrWord) {
                    dictionary.ru[ruWord.toLowerCase()] = kchrWord;
                    dictionary.kchr[kchrWord.toLowerCase()] = ruWord;
                }
            }
        });
        
        console.log('Словарь загружен');
    } catch (err) {
        console.error('Ошибка загрузки словаря:', err);
    }
}

// Инициализация
loadDictionary();

// API endpoint для перевода
app.post('/api/translate', (req, res) => {
    const { sourceLang, targetLang, text, apiKey } = req.body;
    
    // Простая проверка API ключа (в реальном проекте нужно что-то более надежное)
    if (!apiKey || !apiKey.startsWith('miraje_')) {
        return res.status(401).json({ 
            success: false, 
            error: 'Неверный API ключ' 
        });
    }
    
    if (!text || !sourceLang || !targetLang) {
        return res.status(400).json({ 
            success: false, 
            error: 'Не хватает обязательных параметров' 
        });
    }
    
    if (!['ru', 'kchr'].includes(sourceLang) || !['ru', 'kchr'].includes(targetLang)) {
        return res.status(400).json({ 
            success: false, 
            error: 'Неподдерживаемый язык' 
        });
    }
    
    // Функция перевода
    function translate(text, fromLang, toLang) {
        const words = text.split(/\s+/);
        return words.map(word => {
            const punctuation = word.match(/[.,!?;:]+$/)?.[0] || '';
            const cleanWord = word.replace(/[.,!?;:]+$/, '').toLowerCase();
            
            let translated = dictionary[fromLang][cleanWord] || 
                          dictionary[fromLang][cleanWord + '?'] || 
                          word;
            
            if (word[0] === word[0]?.toUpperCase() && word[0] !== word[0]?.toLowerCase()) {
                translated = translated.charAt(0).toUpperCase() + translated.slice(1);
            }
            
            return translated + punctuation;
        }).join(' ');
    }
    
    const translatedText = translate(text, sourceLang, targetLang);
    
    res.json({
        success: true,
        translatedText,
        sourceText: text
    });
});

// Запуск сервера
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});