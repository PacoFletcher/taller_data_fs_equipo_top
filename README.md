# Taller conjunto Data & Full Stack

## Índice

- [Taller conjunto Data & Full Stack](#taller_data_fs)
  - [0. Puesta en marcha con Docker](#0-puesta-en-marcha-con-docker)
  - [1. Presentación de la base de datos y análisis exploratorio de datos](#1-presentación-de-la-base-de-datos-y-análisis-exploratorio-de-datos)
    - [1.1. Presentación de la base de datos](#11-presentación-de-la-base-de-datos)
    - [1.2. Análisis exploratorio de datos](#12-análisis-exploratorio-de-datos)
  - [2. Creación del modelo predictivo](#2-creación-del-modelo-predictivo)
    - [2.1. Preprocesamiento de datos](#21-preprocesamiento-de-datos)
    - [2.2. Entrenamiento del modelo](#22-entrenamiento-del-modelo)
    - [2.3. Evaluación del modelo](#23-evaluación-del-modelo)
  - [3. Creación de la API en Python](#3-creación-de-la-api-en-python)
    - [3.1. Creación de la API](#31-creación-de-la-api)
    - [3.2. Definición de las rutas y los endpoints](#32-definición-de-las-rutas-y-los-endpoints)
  - [4. Introducción al desarrollo con React](#4-introducción-al-desarrollo-con-react)
  - [5. Creación de la app con React](#5-creación-de-la-app-con-react)
  - [6. Pruebas y puesta en común](#6-pruebas-y-puesta-en-común)
  - [7. Bonus: Devolver una gráfica con los resultados para múltiples inputs](#7-bonus-devolver-una-gráfica-con-los-resultados-para-múltiples-inputs)

## Taller conjunto Data & Full Stack

Duración: 3h y media (dividido en dos sesiones de 2h  y 1 hora y media)

### Objetivo del taller:
- Fomentar la comunicación y colaboración entre alumnos de las verticales de Data y Full Stack
- Preparar a los alumnos para el proyecto conjunto al finalizar el curso
- Generar un modelo predictivo sencillo utilizando una base de datos de viviendas de alquiler
- Crear una API en Python que reciba inputs y devuelva un output basado en el modelo predictivo
- Desarrollar una app sencilla con React que llame a la API y muestre los resultados del modelo predictivo en función de los inputs del usuario

### Organización del taller:

#### Sesión 1 (2h):

0. Introducción y presentación del taller (**10 minutos**)
   - Explicar el objetivo del taller
   - Presentar a los alumnos de ambas verticales

1. Presentación de la base de datos y análisis exploratorio de datos (**15 minutos**)
   - Mostrar la estructura y contenido de la base de datos de viviendas de alquiler
   - Realizar un análisis exploratorio de datos para identificar las principales características y variables relevantes

2. Creación del modelo predictivo (**45 minutos**)
   - Explicar el concepto de modelo predictivo
   - Utilizar bibliotecas de Python, como pandas y scikit-learn, para preprocesar datos y entrenar un modelo sencillo de regresión
   - Evaluar y mejorar el rendimiento del modelo

3. Creación de la API en Python (**50 minutos**)
   - Presentar el concepto de una API y su importancia en la comunicación entre Data y Full Stack
   - Utilizar el framework Flask para crear una API básica en Python
   - Definir las rutas y los endpoints necesarios para recibir inputs y devolver un output basado en el modelo predictivo

#### Sesión 2 (1 hora 30 min):

4. Introducción al desarrollo con React (**10 minutos**)
   - Explicar los conceptos básicos de React
   - Mostrar ejemplos de componentes y cómo se estructura una aplicación

5. Creación de la app con React (**65 minutos**)
   - Configurar un proyecto de React utilizando Create React App
   - Crear componentes de interfaz de usuario para mostrar un formulario con las características necesarias para obtener un precio de alquiler
   - Utilizar fetch para llamar a los endpoints de la API y mostrar el resultado en la interfaz de usuario de la app

6. Pruebas y puesta en común (**15 minutos**)
   - Realizar pruebas de funcionalidad de la app y de la API
   - Compartir los resultados e intercambiar opiniones entre los alumnos de Data y Full Stack
   - Recabar feedback y sugerencias para mejorar el proyecto conjunto

## 0. Puesta en marcha con Docker

Para poder analizar los datos y generar los modelos y la API, dispondréis de un docker-compose.yml que pone en marcha el notebook y una API de Python en contenedores de Docker.
Para levantar los contenedores, ejecutéis el siguiente comando:
```bash
docker-compose up -d
```
Esto levantará los contenedores y los pondrá a disposición en el puerto 8888 para el notebook y en el puerto 5000 para la API.
Para mantener la dockerización de la aplicación, habrá que respetar la estructura de directorios:
- **./api**: Contiene el código de la API en Python
- **./client**: Contiene el código de la app en React
- **./notebooks**: Contiene el notebook de Jupyter con los datos y el código de preprocesamiento y entrenamiento del modelo
Podemos observar los logs de los contenedores con los siguientes comandos (se puede añadir el flag `-f` para seguir los logs en tiempo real):
```bash
docker logs taller_notebook # logs del notebook
```
```bash
docker logs taller_api # logs de la API
```
### 0.1. Notebook
Para acceder al notebook, necesitamos el código que jupyter nos proporciona. Podemos verlo en los logs del contenedor ejecutando el comando anterior.
Encontraréis el notebook en la siguiente URL:
```bash
http://localhost:8888
```

### 0.2. API
La API se creará en el archivo `app.py` dentro de la carpeta `api`. En este archivo, se define la API y se configuran las rutas y los endpoints necesarios para recibir inputs y devolver outputs basados en el modelo predictivo.
Para acceder a la API, abrid el navegador y acceded a la siguiente URL:
```bash
http://localhost:5000
```


## 1. Presentación de la base de datos y análisis exploratorio de datos

### 1.1. Presentación de la base de datos

La base de datos que vamos a utilizar en este taller contiene información sobre viviendas de alquiler en 50 provincias en octubre del 2022. Se encuentra en el archivo housing.csv que se ha comprimido en un archivo .zip para facilitar su subida a GitHub. Para poder utilizarlo, primero tenemos que descomprimirlo.

La base de datos contiene las siguientes variables:

- **id**: identificador único del registro
- **title**: título del anuncio
- **price**: precio del alquiler en euros
- **surface**: superficie de la vivienda en metros cuadrados
- **bedrooms**: número de habitaciones
- **restrooms**: número de baños
- **features**: lista de características de la vivienda
- **description**: descripción del anuncio
- **rent**: 1 si es un alquiler, 0 si es una venta
- **location_name**: nombre de la provincia o ciudad
- **is_province**: 1 si es una provincia, 0 si es una ciudad


### 1.2. Análisis exploratorio de datos

Para realizar un análisis exploratorio de datos, vamos a utilizar la biblioteca pandas de Python. Para ello, primero tenemos que importar la biblioteca y cargar la base de datos en un DataFrame:

```python
import pandas as pd

df = pd.read_csv('housing.csv')
```

Una vez tenemos la base de datos cargada, podemos utilizar la función head() para mostrar las primeras filas:

```python
df.head()
```

| id | title                                   |   price |   surface |   bedrooms |   restrooms | features                                                                                     | description|




Para poder hacer un buen uso de los datos, habrá que limpiarlos y preprocesarlos.

## 2. Creación del modelo predictivo

### 2.1. Preprocesamiento de datos

Antes de entrenar el modelo, es importante realizar un preprocesamiento de los datos para asegurarnos de que estén en el formato adecuado y eliminar cualquier dato que pueda afectar negativamente el rendimiento del modelo.

Algunas tareas de preprocesamiento que podríamos realizar en este caso incluyen:

- Lidiar con valores faltantes: Revisar si existen valores faltantes en el conjunto de datos y decidir cómo manejarlos. Esto podría implicar eliminar las filas con valores faltantes, imputar valores utilizando técnicas como la media o la mediana, o utilizar modelos más complejos para predecir los valores faltantes.

- Codificación de variables categóricas: En el caso de la variable "location_name" que contiene los nombres de las provincias, es necesario codificarla numéricamente para que el modelo pueda entenderla. Esto se puede hacer utilizando técnicas como el one-hot encoding o el label encoding.

- Normalización de variables numéricas: Si tenemos variables numéricas con rangos muy distintos, es recomendable normalizarlos para evitar que una variable tenga un mayor peso en el modelo solo por su escala. Esto se puede lograr utilizando técnicas como la estandarización o la normalización Min-Max.

### 2.2. Entrenamiento del modelo

Una vez que los datos han sido preprocesados, procedemos a entrenar un modelo de regresión. En este caso, utilizaremos un modelo sencillo llamado regresión lineal.

Para ello, dividiremos nuestros datos en conjuntos de entrenamiento y prueba, donde utilizaremos el conjunto de entrenamiento para entrenar el modelo y el conjunto de prueba para evaluar su rendimiento.

```python
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error

# Definir las variables predictoras X y la variable objetivo y
X = df[['surface', 'bedrooms', 'restrooms']]
y = df['price']

# Dividir los datos en conjuntos de entrenamiento y prueba
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Crear una instancia del modelo
model = LinearRegression()

# Entrenar el modelo con los datos de entrenamiento
model.fit(X_train, y_train)

# Realizar predicciones con los datos de prueba
y_pred = model.predict(X_test)

# Calcular el error cuadrático medio (MSE) para evaluar el rendimiento del modelo
mse = mean_squared_error(y_test, y_pred) 


# Guardar el modelo en un archivo con pickle

import pickle

# Guardar el modelo entrenado en un archivo
with open('model.pkl', 'wb') as file:
    pickle.dump(model, file)

```

### 2.3. Evaluación del modelo

Una vez entrenado el modelo, es importante evaluar su rendimiento para determinar qué tan bien se ajusta a los datos y qué tan buenas son sus predicciones.

En este caso, utilizamos el error cuadrático medio (MSE) como medida de evaluación. Cuanto menor sea el MSE, mejor será el rendimiento del modelo.

```python
print("Error cuadrático medio (MSE):", mse)
```

Además del MSE, también podríamos calcular otras métricas como el coeficiente de determinación (R^2) o visualizar los residuos del modelo para tener una idea más completa de su desempeño.

Esto nos permitirá tener una idea de qué tan bueno es nuestro modelo y si es necesario realizar ajustes o mejoras en el mismo.

---
## 3. Creación de la API en Python

### 3.1. Creación de la API

Para comenzar, instalaremos Flask. Desde la línea de comando, ejecutaremos el siguiente comando:

```bash
$ pip install flask
```

Una vez instalado Flask, crearemos un archivo Python llamado `app.py` y comenzaremos a escribir el código para nuestra API.

```python
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


```

En este código, importamos la clase `Flask` de la biblioteca `flask` y creamos una instancia de la clase `Flask` llamada `app`. Luego, utilizamos el decorador `@app.route("/")` para definir una ruta principal `/` y la función `home()` que se ejecutará cuando se acceda a esa ruta. En este caso, simplemente devolvemos un mensaje de bienvenida en formato JSON utilizando la función `jsonify()` de Flask.

Por último, ejecutamos la aplicación utilizando `app.run(debug=True)`. Esto ejecutará el servidor y hará que nuestra API esté disponible localmente en `http://localhost:5000`.

### 3.2. Definición de las rutas y los endpoints

Ahora que tenemos una ruta principal en nuestra API, debemos definir las rutas y los endpoints necesarios para recibir los inputs del usuario y devolver el resultado del modelo predictivo.

Por ejemplo, supongamos que queremos que el usuario pueda enviar la superficie, el número de habitaciones y el número de baños de una vivienda y obtener el precio de alquiler predecido.

En nuestro archivo `app.py`, podemos escribir la siguiente función como un endpoint para manejar estos inputs y devolver el output:

```python
import pandas as pd
from flask import Flask, jsonify,request
from flask_cors import CORS

app = Flask(__name__)
cors = CORS(app)


@app.route('/')
def home():
    return jsonify({'message': 'Welcome to the housing API!'})



# Cargar la base de datos en un DataFrame
model = pd.read_pickle('models/model.pkl')
@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()

    surface = int(data['surface'])
    bedrooms = int(data['bedrooms'])
    restrooms = int(data['restrooms'])

    input_data = [[surface, bedrooms, restrooms]]
    prediction = model.predict(input_data)

    return jsonify({'prediction': float(prediction[0])})

if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0")
```

En este código, hemos definido un nuevo endpoint `/predict` utilizando el decorador `@app.route("/predict", methods=['POST'])`. Esto indica que el endpoint "predict" solo aceptará solicitudes POST.

Dentro de la función `predict()`, primero obtenemos los datos enviados por el usuario utilizando `request.get_json()`. Es importante asegurarse de que los nombres de las variables coincidan con los esperados.

Luego, utilizamos estos datos para crear una nueva entrada en el formato esperado por el modelo (`[[surface, bedrooms, restrooms]]`).

Después, realizamos la predicción utilizando el modelo entrenado y devolvemos el resultado en formato JSON utilizando `jsonify()`.

Ahora tenemos una API en Python que acepta inputs y devuelve outputs basados en el modelo predictivo.

## 4. Introducción al desarrollo con React

Antes de comenzar a desarrollar la aplicación sencilla con React, es importante introducir los conceptos básicos de React.

React es un framework de JavaScript para construir interfaces de usuario. Utiliza un enfoque basado en componentes, lo que significa que se divide la interfaz en componentes reutilizables y se construye la aplicación utilizando estos componentes.

En una aplicación de React, cada componente es una función o una clase que puede contener una parte del código HTML (conocido como JSX) y funciones o métodos para manipular y actualizar el estado de la aplicación.

Al utilizar React, podemos crear una interfaz de usuario dinámica y reactiva que se actualiza automáticamente cuando el estado de la aplicación cambia.

## 5. Creación de la app con React

Para comenzar a crear la app con React, necesitaremos tener instalado Node.js y npm. Podemos verificar la instalación ejecutando los siguientes comandos en la línea de comandos:

```bash
$ node -v
$ npm -v
```

Si no tienes Node.js y npm instalados, puedes descargarlos e instalarlos desde el sitio web oficial de Node.js.

Una vez que tenemos Node.js y npm instalados, podemos crear una nueva aplicación de React utilizando Create React App. Desde la línea de comandos, ejecutamos el siguiente comando:

```bash
$ cd client
$ npm create vite .
$ npm install
```
Escogemos `React`y `JavaScript` en el prompt.
Esto creará una plantilla de aplicación de React preconfigurada en el directorio actual (`./client`).

Una vez que la aplicación se haya creado correctamente, podemos iniciar el servidor de desarrollo con el siguiente comando:

```bash
$ npm run dev
```

Esto iniciará el servidor de desarrollo de React y abrirá la aplicación en nuestro navegador predeterminado en `http://localhost:5173`.

Ahora podemos comenzar a desarrollar la aplicación con React.

En el archivo `src/App.js`, podemos comenzar borrando el código existente y reemplazándolo por el siguiente código:

```jsx
import React, { useState } from 'react';

function App() {
  const [inputs, setInputs] = useState({
    surface: '',
    bedrooms: '',
    restrooms: ''
  });

  const [prediction, setPrediction] = useState(null);

  const handleChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('http://localhost:5000/predict', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(inputs)
    });

    const data = await response.json();

    setPrediction(data.prediction);
  };

  return (
    <div className="App">
      <h1>Housing Price Prediction</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="surface">Surface:</label>
        <input type="text" id="surface" name="surface" value={inputs.surface} onChange={handleChange} />

        <label htmlFor="bedrooms">Bedrooms:</label>
        <input type="text" id="bedrooms" name="bedrooms" value={inputs.bedrooms} onChange={handleChange} />

        <label htmlFor="restrooms">Restrooms:</label>
        <input type="text" id="restrooms" name="restrooms" value={inputs.restrooms} onChange={handleChange} />

        <button type="submit">Predict</button>
      </form>

      {prediction && (
        <p>Predicted Price: {prediction}</p>
      )}
    </div>
  );
}

export default App;
```

En este código, hemos importado la función `useState` de React que nos permite manejar el estado en nuestros componentes de función.

Hemos creado dos estados: `inputs`, que mantendrá los inputs del usuario, y `prediction`, que almacenará el resultado de la predicción.

La función `handleChange` se encarga de actualizar el estado `inputs` en función de los cambios en los inputs del usuario.

La función `handleSubmit` se encarga de enviar los inputs al endpoint de la API utilizando fetch y actualizar el estado `prediction` con el resultado de la predicción.

Dentro de la función `App`, hemos creado el markup HTML utilizando JSX. Hemos agregado un formulario con inputs para la superficie, el número de habitaciones y el número de baños. También hemos agregado un botón de envío para realizar la predicción.

Finalmente, hemos agregado una condición para mostrar el resultado de la predicción en caso de que haya un valor.

Ahora podemos guardar el archivo y ver los cambios en nuestro navegador. Podremos ingresar los inputs deseados y hacer clic en el botón "Predict" para obtener el resultado de la predicción.

Este es solo un ejemplo básico y el código se puede mejorar y ampliar según sea necesario.

## 6. Pruebas y puesta en común

Una vez completada la implementación de la app y la API, es importante realizar pruebas para asegurarse de que todo funciona correctamente y reunirse para compartir los resultados y recibir feedback.

Es recomendable hacer pruebas exploratorias de la app y la API, ingresando diferentes inputs y verificando los resultados obtenidos. También puede ser útil realizar pruebas automatizadas para garantizar el correcto funcionamiento en diferentes escenarios.

Durante la reunión de puesta en común, los alumnos de Data y Full Stack pueden discutir los resultados obtenidos, intercambiar opiniones y sugerencias para mejorar el proyecto conjunto. También es un buen momento para recopilar feedback de otros compañeros y profesores.

## 7. Bonus: Devolver una gráfica con los resultados para múltiples inputs

En este taller, hemos creado una app sencilla que recibe inputs y devuelve un output basado en un modelo predictivo. Sin embargo, también podríamos devolver una gráfica con los resultados para múltiples inputs.

Para ello, podemos usar bibliotecas como plotly o matplotlib para crear la gráfica y devolverla en formato JSON utilizando la función `jsonify()` de Flask.

### API
```python
import pandas as pd
from flask import Flask, jsonify,request
from flask_cors import CORS
import plotly.express as px
import numpy as np

app = Flask(__name__)
cors = CORS(app)
@app.route('/')
def home():
    return jsonify({'message': 'Welcome to the housing API!'})

model = pd.read_pickle('models/model.pkl')


@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()

    surface = parseInt(data['surface'])
    bedrooms = parseInt(data['bedrooms'])
    restrooms = parseInt(data['restrooms'])
    columns = ['surface', 'bedrooms', 'restrooms']
    array = np.array([surface, bedrooms, restrooms]).transpose()
    input_data = pd.DataFrame(data = array,
                              columns=columns)
    prediction = parseFloat(model.predict(input_data))
    fig = px.bar( x =[i for i in range(1, len(prediction)+1)],y=[prediction])
    fig.update_layout(title='Housing Price Prediction',xaxis_title="House",yaxis_title="Price",showlegend=False)
    graphJSON = fig.to_json()

    return jsonify({'prediction': prediction, 'graph': graphJSON})

def parseInt(x):
    # if x is an array, convert each element to int
    if type(x) == list:
        return [int(i) for i in x]
    # if x is a single int, convert to int
    else:
        return int(x)
    
def parseFloat(x):
    print("type",type(x),flush=True)
    # if x is a list or a pandas series, convert each element to float
    if type(x) == list or type(x) == pd.Series or type(x) == np.ndarray:
        return [float(i) for i in x]
    # if x is a single int, convert to int
    else:
        return float(x)

if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0")
```

En este código, hemos importado la biblioteca `plotly.express` como `px` y hemos creado una gráfica de barras utilizando los datos de predicción.

Después, convertimos la gráfica a formato JSON utilizando el método `to_json()` y la asignamos a la variable `graphJSON`.

Finalmente, devolvemos tanto la predicción como la gráfica en formato JSON utilizando `jsonify()`. El resultado se verá así:

```json
{
  "prediction": 150000,
  "graph": {
    ...
  }
}
```

### Cliente

En el lado del cliente, podemos utilizar la biblioteca `react-plotly.js` para renderizar la gráfica devuelta por la API.

Primero, instalemos la biblioteca ejecutando el siguiente comando desde la línea de comandos en la carpeta raíz del proyecto de React:

```bash
npm install react-plotly.js plotly.js
```

Luego, podemos modificar el componente `App` para renderizar la gráfica devuelta por la API. Actualice el código en `src/App.js` de la siguiente manera:

```jsx
import React, { useState } from 'react';
import Plot from 'react-plotly.js';

function App() {
  const [inputs, setInputs] = useState({
    surface: '',
    bedrooms: '',
    restrooms: ''
  });
  const [multipleInputs, setMultipleInputs] = useState({
    surface: [],
    bedrooms: [],
    restrooms: []
  });

  const [prediction, setPrediction] = useState(null);
  const [graph, setGraph] = useState(null);

  const handleChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('http://localhost:5000/predict', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(multipleInputs)
    });

    const data = await response.json();
 
    console.log(data.prediction)
    setPrediction(data.prediction);

    const graph = JSON.parse(data.graph);
    setGraph(graph);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if(!inputs.surface || !inputs.bedrooms || !inputs.restrooms) return;
    setMultipleInputs({
      surface: [...multipleInputs.surface, inputs.surface],
      bedrooms: [...multipleInputs.bedrooms, inputs.bedrooms],
      restrooms: [...multipleInputs.restrooms, inputs.restrooms]
    });
    setInputs({
      surface: '',
      bedrooms: '',
      restrooms: ''
    });
    

    // Lógica adicional si se requiere
  };

  return (
    <div className="App">
      <h1>Housing Price Prediction</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="surface">Surface:</label>
        <input type="text" id="surface" name="surface" value={inputs.surface} onChange={handleChange} />

        <label htmlFor="bedrooms">Bedrooms:</label>
        <input type="text" id="bedrooms" name="bedrooms" value={inputs.bedrooms} onChange={handleChange} />

        <label htmlFor="restrooms">Restrooms:</label>
        <input type="text" id="restrooms" name="restrooms" value={inputs.restrooms} onChange={handleChange} />

        <button onClick={handleSave}>Save</button>
        <button type="submit">Predict</button>
      </form>
      {multipleInputs.surface.length > 0 && (
        <div>
          <h2>Multiple Inputs</h2>
          <ul>
            {multipleInputs.surface.map((surface, index) => (
              <li key={index}>
                <p>Surface: {surface} | Bedrooms: {multipleInputs.bedrooms[index]} | Restrooms: {multipleInputs.restrooms[index]}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
      {prediction && (
        <section className="prediction">
        <h2>Predicted Price: </h2>
        {prediction.map((price, index) => (
          <p key={index}>{parseFloat(price).toFixed(2)}€</p>
        ))}
      </section>

      )}

      {graph && (
        <Plot
          data={graph.data}
          layout={graph.layout}
        />
      )}
    </div>
  );
}

export default App;
```

En este código, hemos importado el componente `Plot` de `react-plotly.js`. También hemos añadido un nuevo estado llamado `graph` para almacenar la información de la gráfica.

En la función `handleSubmit`, ahora actualizamos tanto el estado `prediction` como el estado `graph` con los datos devueltos por la API.

Debajo de la condición para mostrar el resultado de la predicción, hemos agregado una nueva condición para renderizar la gráfica utilizando el componente `Plot`. Pasamos los datos de la gráfica proporcionados por la API al componente `Plot`.

Guarda los cambios realizados en el archivo `App.js` y vuelve a cargar la aplicación en tu navegador. Ahora, después de realizar una predicción, deberías ver la gráfica renderizada junto con el resultado.


## Referencias

- Data:
    - [Pandas](https://pandas.pydata.org/)
    - [Scikit-learn](https://scikit-learn.org/stable/)
    - [python plotly](https://plotly.com/python/)
    - [Flask](https://flask.palletsprojects.com/en/2.3.x/)
- Full Stack:
    - [React](https://react.dev/)
    - [react-plotly.js](https://plotly.com/javascript/react/)
    - [Vite](https://vitejs.dev/)
- Docker:
    - [Docker](https://www.docker.com/)
    - [Docker Compose](https://docs.docker.com/compose/)
