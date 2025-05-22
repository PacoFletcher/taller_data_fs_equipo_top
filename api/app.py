import pandas as pd
from flask import Flask, jsonify,request
from flask_cors import CORS


# import pickle

app = Flask(__name__)
cors = CORS(app)


@app.route('/')
def home():
    return jsonify({'message': 'Proyecto del equipo TOP'})


# Cargar la base de datos en un DataFrame

### AQUI VA EL MODELO
model = pd.read_pickle('./models/model.pkl')
###


@app.route('/predict', methods=['GET'])
def predict():
    # data = request.get_json()

    # surface = int(data['surface'])
    # bedrooms = int(data['bedrooms'])
    # restrooms = int(data['restrooms'])

    
    
    surface = request.args.get('surface', -1)
    bedrooms = request.args.get('bedrooms', -1)
    restrooms = request.args.get('restrooms', -1)

    input_data = [[float(surface), int(bedrooms), int(restrooms)]]
    
    ### PREDICCION
    prediction = model.predict(input_data)
    ###

    # return 1000
    ### Versión definitiva
    return jsonify({'prediction': prediction[0]})
    ###

if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0",port=5000)