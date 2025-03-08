from flask import Flask, render_template, request
import os

app = Flask(__name__)

# Загрузка слов и переводов из файла
def load_words():
    words = {}
    with open('words.txt', 'r', encoding='utf-8') as file:
        for line in file:
            parts = line.strip().split(' ')
            if len(parts) == 2:
                words[parts[0]] = parts[1]
    return words

@app.route('/', methods=['GET', 'POST'])
def index():
    translation = ""
    if request.method == 'POST':
        word = request.form['word']
        words = load_words()
        # Поиск перевода по частичному совпадению
        translation = {k: v for k, v in words.items() if word in k}
        if not translation:
            translation = "Перевод не найден."
    return render_template('index.html', translation=translation)

if __name__ == '__main__':
    app.run(debug=True)
