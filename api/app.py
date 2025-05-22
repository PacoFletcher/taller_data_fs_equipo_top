import pandas as pd
from flask import Flask, jsonify,request
from flask_cors import CORS

app = Flask(__name__)
cors = CORS(app)


@app.route('/')
def home():
    return jsonify({'message': 'Welcome to the housing API!'})


if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0")