from flask import Flask, render_template
import json

app = Flask(__name__)

# Загрузка данных о памятниках
try:
    with open('data/landmarks.json', 'r', encoding='utf-8') as f:
        landmarks = json.load(f)
except Exception as e:
    print(f"Ошибка загрузки данных: {e}")
    landmarks = []

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/map')
def map_page():
    return render_template('map.html', landmarks=landmarks)

@app.route('/conclusion')
def conclusion():
    return render_template('conclusion.html', landmarks=landmarks)

@app.route('/landmark/<int:id>')
def landmark_details(id: int):
    landmark = next((item for item in landmarks if item['id'] == id), None)
    if not landmark:
        return "Объект не найден", 404
    return render_template('landmark.html', landmark=landmark)

if __name__ == '__main__':
    app.run(debug=True)