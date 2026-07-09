// ---- docs.js ----
// Diccionario de documentación para "toca para ver qué hace": cubre
// palabras clave, funciones globales y métodos de arrays/strings/
// diccionarios/señales. Un mismo nombre puede tener varios "sentidos"
// (ej. .size() en un array no es lo mismo que en un diccionario), por eso
// cada entrada es una lista.

const DOCS = {
  // ---- palabras clave ----
  'var': [{ kind: 'palabra clave', sig: 'var nombre = valor', desc: 'Crea una variable nueva.', example: 'var vida = 100' }],
  'const': [{ kind: 'palabra clave', sig: 'const NOMBRE = valor', desc: 'Crea una constante: no se puede reasignar después.', example: 'const LIMITE = 5' }],
  'if': [{ kind: 'palabra clave', sig: 'if cond:', desc: 'Ejecuta el bloque siguiente solo si la condición es verdadera.', example: 'if vida <= 0:\n    print("Game Over")' }],
  'elif': [{ kind: 'palabra clave', sig: 'elif cond:', desc: 'Condición adicional, se revisa solo si el/los "if" anteriores fueron falsos.', example: 'elif vida < 20:\n    print("Cuidado")' }],
  'else': [{ kind: 'palabra clave', sig: 'else:', desc: 'Bloque que corre si ninguna condición anterior fue verdadera.', example: 'else:\n    print("Normal")' }],
  'for': [{ kind: 'palabra clave', sig: 'for x in coleccion:', desc: 'Recorre cada elemento de un array, string, diccionario o range().', example: 'for i in range(5):\n    print(i)' }],
  'while': [{ kind: 'palabra clave', sig: 'while cond:', desc: 'Repite el bloque mientras la condición sea verdadera.', example: 'while vida > 0:\n    vida -= 1' }],
  'func': [{ kind: 'palabra clave', sig: 'func nombre(params):', desc: 'Declara una función.', example: 'func sumar(a, b):\n    return a + b' }],
  'return': [{ kind: 'palabra clave', sig: 'return valor', desc: 'Termina la función y entrega un resultado.', example: 'return a + b' }],
  'break': [{ kind: 'palabra clave', sig: 'break', desc: 'Sale del bucle (for/while) inmediatamente.', example: 'if encontrado:\n    break' }],
  'continue': [{ kind: 'palabra clave', sig: 'continue', desc: 'Salta directo a la siguiente vuelta del bucle, sin ejecutar el resto.', example: 'if n % 2 != 0:\n    continue' }],
  'pass': [{ kind: 'palabra clave', sig: 'pass', desc: 'No hace nada. Sirve para dejar un bloque vacío sin que sea un error.', example: 'if x:\n    pass' }],
  'match': [{ kind: 'palabra clave', sig: 'match valor:', desc: 'Compara un valor contra varios casos posibles, como una cadena de if/elif.', example: 'match n:\n    1:\n        print("uno")\n    _:\n        print("otro")' }],
  'class': [{ kind: 'palabra clave', sig: 'class Nombre:', desc: 'Declara una clase (una plantilla para crear objetos con .new()).', example: 'class Punto:\n    var x = 0' }],
  'extends': [{ kind: 'palabra clave', sig: 'extends Base', desc: 'Hace que una clase herede los campos y métodos de otra.', example: 'class Gato:\n    extends Animal' }],
  'self': [{ kind: 'palabra clave', sig: 'self.campo', desc: 'Dentro de un método, se refiere a la instancia actual de la clase.', example: 'func subir_nivel():\n    self.nivel += 1' }],
  'signal': [{ kind: 'palabra clave', sig: 'signal nombre', desc: 'Declara una señal: un evento al que otras funciones se pueden suscribir.', example: 'signal murio' }],
  'enum': [{ kind: 'palabra clave', sig: 'enum Nombre { A, B, C }', desc: 'Crea un grupo de constantes con nombre, numeradas desde 0.', example: 'enum Color { ROJO, VERDE, AZUL }\nprint(Color.VERDE)' }],
  'and': [{ kind: 'operador lógico', sig: 'a and b', desc: 'Verdadero solo si ambos lados son verdaderos.', example: 'if vida > 0 and mana > 0:' }],
  'or': [{ kind: 'operador lógico', sig: 'a or b', desc: 'Verdadero si al menos uno de los dos lados es verdadero.', example: 'if es_admin or es_dueño:' }],
  'not': [{ kind: 'operador lógico', sig: 'not a', desc: 'Invierte un valor: verdadero pasa a falso y viceversa.', example: 'if not encontrado:' }],
  'in': [{ kind: 'operador', sig: 'x in coleccion', desc: 'Pregunta si x está dentro de un array, string, o entre las claves de un diccionario. También se usa en "for x in coleccion:".', example: 'if "a" in "casa":\n    print("sí")' }],
  'true': [{ kind: 'valor', sig: 'true', desc: 'El valor booleano verdadero.' }],
  'false': [{ kind: 'valor', sig: 'false', desc: 'El valor booleano falso.' }],
  'null': [{ kind: 'valor', sig: 'null', desc: 'Representa "ningún valor".' }],

  // ---- funciones globales ----
  'print': [{ kind: 'función', sig: 'print(a, b, ...)', desc: 'Imprime en la consola. Puede recibir varios valores separados por coma y los junta en una sola línea.', example: 'print("Vida:", 100)' }],
  'len': [{ kind: 'función', sig: 'len(valor)', desc: 'Cantidad de elementos: caracteres si es texto, ítems si es array, claves si es diccionario.', example: 'len([1,2,3]) → 3' }],
  'range': [{ kind: 'función', sig: 'range(n) · range(a, b) · range(a, b, paso)', desc: 'Genera una secuencia de números para usar en un "for". Con 1 argumento va de 0 a n-1; con 2, de a a b-1; con 3, además define el salto entre número y número.', example: 'for i in range(2, 10, 2):\n    print(i)' }],
  'str': [{ kind: 'función', sig: 'str(valor)', desc: 'Convierte cualquier valor a texto (String).', example: 'str(42) → "42"' }],
  'int': [{ kind: 'función', sig: 'int(valor)', desc: 'Convierte a entero, truncando los decimales (no redondea).', example: 'int(4.9) → 4' }],
  'float': [{ kind: 'función', sig: 'float(valor)', desc: 'Convierte a número decimal.', example: 'float("3.5") → 3.5' }],
  'abs': [{ kind: 'función', sig: 'abs(n)', desc: 'Valor absoluto: quita el signo negativo si lo tiene.', example: 'abs(-7) → 7' }],
  'min': [{ kind: 'función', sig: 'min(a, b, ...)', desc: 'El menor de los valores dados.', example: 'min(4, 1, 9) → 1' }],
  'max': [{ kind: 'función', sig: 'max(a, b, ...)', desc: 'El mayor de los valores dados.', example: 'max(4, 1, 9) → 9' }],
  'floor': [{ kind: 'función', sig: 'floor(n)', desc: 'Redondea siempre hacia abajo.', example: 'floor(4.9) → 4' }],
  'ceil': [{ kind: 'función', sig: 'ceil(n)', desc: 'Redondea siempre hacia arriba.', example: 'ceil(4.1) → 5' }],
  'round': [{ kind: 'función', sig: 'round(n)', desc: 'Redondea al entero más cercano.', example: 'round(4.5) → 5' }],
  'randi': [{ kind: 'función', sig: 'randi()', desc: 'Da un número entero al azar (grande, sin rango fijo).' }],
  'randf': [{ kind: 'función', sig: 'randf()', desc: 'Da un número decimal al azar entre 0.0 y 1.0.' }],
  'randi_range': [{ kind: 'función', sig: 'randi_range(a, b)', desc: 'Entero al azar entre a y b, ambos incluidos.', example: 'randi_range(1, 6) → tirar un dado' }],
  'typeof': [{ kind: 'función', sig: 'typeof(valor)', desc: 'Retorna el tipo del valor como texto: "int", "float", "String", "bool", "Array", "Dictionary", etc.', example: 'typeof(5) → "int"' }],

  // ---- métodos de arrays ----
  'append': [{ kind: 'método de array', sig: 'array.append(valor)', desc: 'Agrega un elemento al final del array.', example: '[1,2].append(3) → [1,2,3]' }],
  'push_back': [{ kind: 'método de array', sig: 'array.push_back(valor)', desc: 'Igual que .append(): agrega un elemento al final.' }],
  'pop_back': [{ kind: 'método de array', sig: 'array.pop_back()', desc: 'Quita y retorna el último elemento del array.' }],
  'pop_front': [{ kind: 'método de array', sig: 'array.pop_front()', desc: 'Quita y retorna el primer elemento del array.' }],
  'reverse': [{ kind: 'método de array', sig: 'array.reverse()', desc: 'Invierte el orden de los elementos, en el mismo array.' }],
  'sort': [{ kind: 'método de array', sig: 'array.sort()', desc: 'Ordena el array de menor a mayor (o alfabéticamente si es texto), en el mismo array.' }],
  'clear': [{ kind: 'método de array', sig: 'array.clear()', desc: 'Vacía el array por completo.' }],
  'slice': [{ kind: 'método de array', sig: 'array.slice(inicio, fin)', desc: 'Retorna una porción del array, desde "inicio" hasta antes de "fin".', example: '[1,2,3,4].slice(1,3) → [2,3]' }],
  'insert': [{ kind: 'método de array', sig: 'array.insert(indice, valor)', desc: 'Inserta un valor en una posición específica del array.' }],
  'join': [{ kind: 'método de array', sig: 'array.join(separador)', desc: 'Une los elementos de un array en un solo texto, separados por el texto dado.', example: '["a","b"].join("-") → "a-b"' }],
  'map': [{ kind: 'método de array', sig: 'array.map(funcion)', desc: 'Aplica una función a cada elemento y retorna un array nuevo con los resultados.', example: 'numeros.map(cuadrado)' }],
  'filter': [{ kind: 'método de array', sig: 'array.filter(funcion)', desc: 'Retorna solo los elementos para los que la función da true.', example: 'numeros.filter(es_par)' }],
  'reduce': [{ kind: 'método de array', sig: 'array.reduce(funcion)', desc: 'Combina todos los elementos en un solo valor, aplicando la función de a pares.', example: 'numeros.reduce(sumar) → la suma total' }],

  // ---- métodos de strings ----
  'to_upper': [{ kind: 'método de texto', sig: 'texto.to_upper()', desc: 'Convierte el texto a MAYÚSCULAS.' }],
  'to_lower': [{ kind: 'método de texto', sig: 'texto.to_lower()', desc: 'Convierte el texto a minúsculas.' }],
  'strip_edges': [{ kind: 'método de texto', sig: 'texto.strip_edges()', desc: 'Quita espacios en blanco al inicio y al final del texto.' }],
  'split': [{ kind: 'método de texto', sig: 'texto.split(separador)', desc: 'Parte el texto en un array, cortando por el separador dado.', example: '"a,b,c".split(",") → ["a","b","c"]' }],
  'begins_with': [{ kind: 'método de texto', sig: 'texto.begins_with(otro)', desc: 'true si el texto empieza con "otro".' }],
  'ends_with': [{ kind: 'método de texto', sig: 'texto.ends_with(otro)', desc: 'true si el texto termina con "otro".' }],
  'replace': [{ kind: 'método de texto', sig: 'texto.replace(buscar, reemplazo)', desc: 'Reemplaza todas las apariciones de "buscar" por "reemplazo".', example: '"gato".replace("g","p") → "pato"' }],
  'substr': [{ kind: 'método de texto', sig: 'texto.substr(inicio, cantidad)', desc: 'Retorna una parte del texto, empezando en "inicio" y tomando "cantidad" caracteres.', example: '"hola".substr(1,2) → "ol"' }],
  'format': [{ kind: 'método de texto', sig: 'texto.format(valor)', desc: 'Formatea el texto insertando valores (similar al operador %).' }],

  // ---- señales ----
  'connect': [{ kind: 'método de señal', sig: 'señal.connect(funcion)', desc: 'Conecta una función para que se ejecute cada vez que la señal se emita.', example: 'murio.connect(on_murio)' }],
  'emit': [{ kind: 'método de señal', sig: 'señal.emit(valores...)', desc: 'Dispara la señal, ejecutando todas las funciones conectadas a ella.', example: 'murio.emit()' }],

  // ---- entrada de escena ----
  'is_action_pressed': [{ kind: 'método de Input', sig: 'Input.is_action_pressed("accion")', desc: 'true mientras la tecla/botón de esa acción esté sostenido.', example: 'Input.is_action_pressed("ui_right")' }],
  'is_action_just_pressed': [{ kind: 'método de Input', sig: 'Input.is_action_just_pressed("accion")', desc: 'true solo en el primer instante en que se presiona (no se repite mientras la sostienes). Ideal para saltar.', example: 'Input.is_action_just_pressed("ui_select")' }],

  // ---- métodos que existen en más de un tipo (varios "sentidos") ----
  'size': [
    { kind: 'método de array', sig: 'array.size()', desc: 'Cantidad de elementos en el array.' },
    { kind: 'método de diccionario', sig: 'dic.size()', desc: 'Cantidad de claves en el diccionario.' },
  ],
  'has': [
    { kind: 'método de array', sig: 'array.has(valor)', desc: 'true si el valor está en el array.' },
    { kind: 'método de diccionario', sig: 'dic.has(clave)', desc: 'true si esa clave existe en el diccionario.' },
  ],
  'find': [
    { kind: 'método de array', sig: 'array.find(valor)', desc: 'Retorna el índice de la primera aparición del valor, o -1 si no está.' },
    { kind: 'método de texto', sig: 'texto.find(otro)', desc: 'Retorna la posición donde empieza "otro" dentro del texto, o -1 si no aparece.' },
  ],
  'erase': [
    { kind: 'método de array', sig: 'array.erase(valor)', desc: 'Quita la primera aparición de ese valor del array.' },
    { kind: 'método de diccionario', sig: 'dic.erase(clave)', desc: 'Elimina esa clave (y su valor) del diccionario.' },
  ],
  'duplicate': [
    { kind: 'método de array', sig: 'array.duplicate()', desc: 'Crea una copia independiente del array (modificar la copia no afecta al original).' },
    { kind: 'método de diccionario', sig: 'dic.duplicate()', desc: 'Crea una copia independiente del diccionario.' },
  ],
  'count': [
    { kind: 'método de array', sig: 'array.count(valor)', desc: 'Cuántas veces aparece ese valor en el array.' },
    { kind: 'método de texto', sig: 'texto.count(otro)', desc: 'Cuántas veces aparece "otro" dentro del texto.' },
  ],
  'keys': [
    { kind: 'método de diccionario', sig: 'dic.keys()', desc: 'Retorna un array con todas las claves del diccionario.' },
  ],
  'values': [
    { kind: 'método de diccionario', sig: 'dic.values()', desc: 'Retorna un array con todos los valores del diccionario.' },
  ],
  'length': [
    { kind: 'método de texto', sig: 'texto.length()', desc: 'Cantidad de caracteres del texto.', example: '"hola".length() → 4' },
  ],
};
