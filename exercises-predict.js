// ---- banco de ejercicios: modo "Predice la salida" ----
// El código se muestra de solo lectura. El usuario elige, sin ejecutar,
// cuál de las opciones es la salida correcta.
const EXERCISES_PREDICT = {
  variables: {
    label: 'Variables',
    items: [
      { id: 'predict-variables-1', difficulty: 'facil', title: 'Precedencia de operadores', prompt: 'Sin ejecutarlo, ¿qué imprime este código?', code: 'var a = 5\nvar b = 2\nprint(a + b * 2)', options: ['14', '9', '12', '7'], answerIndex: 1 },
      { id: 'predict-variables-2', difficulty: 'medio', title: 'Suma de strings', prompt: '¿Qué imprime este código?', code: 'var texto = "7"\nprint(texto + "7")', options: ['14', '"77"', '77', 'Error'], answerIndex: 2 },
      { id: 'predict-variables-3', difficulty: 'medio', title: 'División entera', prompt: '¿Qué imprime este código?', code: 'var x = 10\nvar y = 3\nprint(x / y)', options: ['3.33', '3', '3.0', '1'], answerIndex: 1 },
      { id: 'predict-variables-4', difficulty: 'dificil', title: 'División con decimales', prompt: '¿Qué imprime este código?', code: 'var x = 10.0\nvar y = 4\nprint(x / y)', options: ['2.5', '2', '2.0', '0'], answerIndex: 1 },
      { id: 'predict-variables-5', difficulty: 'medio', title: 'Copia de valores', prompt: '¿Qué imprime este código?', code: 'var a = 5\nvar b = a\nb = 9\nprint(a)', options: ['9', '5', '14', 'null'], answerIndex: 1 },
      { id: 'predict-variables-6', difficulty: 'facil', title: 'Tipo de un entero', prompt: '¿Qué imprime este código?', code: 'var edad = 20\nprint(typeof(edad))', options: ['int', 'float', 'String', 'Integer'], answerIndex: 0 },
      { id: 'predict-variables-7', difficulty: 'facil', title: 'Concatenar texto', prompt: '¿Qué imprime este código?', code: 'var nombre = "Ana"\nprint("Hola " + nombre)', options: ['Hola nombre', 'Hola Ana', '"Hola " Ana', 'Error'], answerIndex: 1 },
      { id: 'predict-variables-8', difficulty: 'medio', title: 'Asignaciones compuestas encadenadas', prompt: '¿Qué imprime este código?', code: 'var n = 3\nn += 2\nn *= 2\nprint(n)', options: ['10', '8', '6', '5'], answerIndex: 0 },
      { id: 'predict-variables-9', difficulty: 'facil', title: 'Negación booleana', prompt: '¿Qué imprime este código?', code: 'var activo = false\nprint(not activo)', options: ['false', 'true', 'null', 'Error'], answerIndex: 1 },
      { id: 'predict-variables-10', difficulty: 'facil', title: 'Operador "or"', prompt: '¿Qué imprime este código?', code: 'var a = true\nvar b = false\nprint(a or b)', options: ['false', 'true', 'a', 'Error'], answerIndex: 1 },
    ]
  },
  condicionales: {
    label: 'Condicionales',
    items: [
      { id: 'predict-condicionales-1', difficulty: 'facil', title: 'Cadena de elif', prompt: '¿Qué imprime este código?', code: 'var num = 8\nif num > 10:\n    print("Grande")\nelif num > 5:\n    print("Mediano")\nelse:\n    print("Pequeño")', options: ['Grande', 'Mediano', 'Pequeño', 'Error'], answerIndex: 1 },
      { id: 'predict-condicionales-2', difficulty: 'facil', title: 'Comparar iguales', prompt: '¿Qué imprime este código?', code: 'var a = 4\nvar b = 4\nif a == b:\n    print("Iguales")\nelse:\n    print("Distintos")', options: ['Iguales', 'Distintos', 'true', '4'], answerIndex: 0 },
      { id: 'predict-condicionales-3', difficulty: 'facil', title: 'Rango con "and"', prompt: '¿Qué imprime este código?', code: 'var x = 5\nif x > 0 and x < 10:\n    print("En rango")\nelse:\n    print("Fuera")', options: ['Fuera', 'En rango', 'true', '5'], answerIndex: 1 },
      { id: 'predict-condicionales-4', difficulty: 'facil', title: 'Comparación simple', prompt: '¿Qué imprime este código?', code: 'var edad = 17\nif edad >= 18:\n    print("Mayor")\nelse:\n    print("Menor")', options: ['Mayor', 'Menor', '17', 'Error'], answerIndex: 1 },
      { id: 'predict-condicionales-5', difficulty: 'medio', title: 'Cero como "falsy"', prompt: '¿Qué imprime este código?', code: 'var n = 0\nif n:\n    print("Verdadero")\nelse:\n    print("Falso")', options: ['Verdadero', 'Falso', '0', 'true'], answerIndex: 1 },
      { id: 'predict-condicionales-6', difficulty: 'medio', title: '"and" y "or" combinados', prompt: '¿Qué imprime este código?', code: 'var a = true\nvar b = false\nif a and b:\n    print("Ambos")\nelif a or b:\n    print("Uno")\nelse:\n    print("Ninguno")', options: ['Ambos', 'Uno', 'Ninguno', 'Error'], answerIndex: 1 },
      { id: 'predict-condicionales-7', difficulty: 'facil', title: 'Módulo para paridad', prompt: '¿Qué imprime este código?', code: 'var num = 12\nif num % 2 == 0:\n    print("Par")\nelse:\n    print("Impar")', options: ['Par', 'Impar', '0', '12'], answerIndex: 0 },
      { id: 'predict-condicionales-8', difficulty: 'medio', title: 'Múltiples elif', prompt: '¿Qué imprime este código?', code: 'var nivel = 3\nif nivel == 1:\n    print("Bajo")\nelif nivel == 2:\n    print("Medio")\nelif nivel == 3:\n    print("Alto")\nelse:\n    print("Desconocido")', options: ['Bajo', 'Medio', 'Alto', 'Desconocido'], answerIndex: 2 },
      { id: 'predict-condicionales-9', difficulty: 'dificil', title: 'Negar una comparación', prompt: '¿Qué imprime este código?', code: 'var x = -4\nif not (x > 0):\n    print("No positivo")\nelse:\n    print("Positivo")', options: ['Positivo', 'No positivo', 'true', 'false'], answerIndex: 1 },
      { id: 'predict-condicionales-10', difficulty: 'medio', title: 'Guardar el resultado en una variable', prompt: '¿Qué imprime este código?', code: 'var puntaje = 75\nvar g = ""\nif puntaje >= 90:\n    g = "A"\nelif puntaje >= 70:\n    g = "B"\nelse:\n    g = "C"\nprint(g)', options: ['A', 'B', 'C', '75'], answerIndex: 1 },
    ]
  },
  bucles: {
    label: 'Bucles',
    items: [
      { id: 'predict-bucles-1', difficulty: 'facil', title: 'range() con un argumento', prompt: '¿Qué imprime este código?', code: 'for i in range(3):\n    print(i)', options: ['1\n2\n3', '0\n1\n2', '0\n1\n2\n3', '3'], answerIndex: 1 },
      { id: 'predict-bucles-2', difficulty: 'medio', title: 'Suma acumulada', prompt: '¿Qué imprime este código?', code: 'var suma = 0\nfor i in range(1, 4):\n    suma += i\nprint(suma)', options: ['6', '10', '3', 'Error'], answerIndex: 0 },
      { id: 'predict-bucles-3', difficulty: 'facil', title: 'while básico', prompt: '¿Qué imprime este código?', code: 'var i = 0\nwhile i < 3:\n    print(i)\n    i += 1', options: ['1\n2\n3', '0\n1\n2', '0\n1\n2\n3', 'Bucle infinito'], answerIndex: 1 },
      { id: 'predict-bucles-4', difficulty: 'dificil', title: 'range() con paso negativo', prompt: '¿Qué imprime este código?', code: 'for i in range(5, 0, -2):\n    print(i)', options: ['5\n4\n3\n2\n1', '5\n3\n1', '5\n3\n1\n-1', '0\n2\n4'], answerIndex: 1 },
      { id: 'predict-bucles-5', difficulty: 'medio', title: 'Saltar un valor con continue', prompt: '¿Qué imprime este código?', code: 'var total = 0\nfor i in range(1, 5):\n    if i == 3:\n        continue\n    total += i\nprint(total)', options: ['10', '7', '6', 'Error'], answerIndex: 1 },
      { id: 'predict-bucles-6', difficulty: 'dificil', title: 'Cortar con break antes de tiempo', prompt: '¿Qué imprime este código?', code: 'var contador = 0\nfor i in range(10):\n    if i >= 5:\n        break\n    contador += 1\nprint(contador)', options: ['10', '6', '5', '0'], answerIndex: 2 },
      { id: 'predict-bucles-7', difficulty: 'medio', title: 'range() con paso 3', prompt: '¿Qué imprime este código?', code: 'for i in range(2, 10, 3):\n    print(i)', options: ['2\n4\n6\n8', '2\n5\n8', '2\n5\n8\n11', '10'], answerIndex: 1 },
      { id: 'predict-bucles-8', difficulty: 'medio', title: 'Recorrer letras de un string', prompt: '¿Qué imprime este código?', code: 'var palabra = "hi"\nfor c in palabra:\n    print(c, c)', options: ['h\ni', 'hh\nii', 'hi\nhi', 'hihi'], answerIndex: 1 },
      { id: 'predict-bucles-9', difficulty: 'dificil', title: 'Bucles anidados', prompt: '¿Qué imprime este código?', code: 'for i in range(3):\n    for j in range(2):\n        print(i + j)', options: ['0\n1\n2', '0\n1\n2\n3\n4\n5', '0\n1\n1\n2\n2\n3', '1\n2\n3'], answerIndex: 2 },
      { id: 'predict-bucles-10', difficulty: 'medio', title: 'while con multiplicación', prompt: '¿Qué imprime este código?', code: 'var n = 1\nwhile n < 20:\n    n *= 2\nprint(n)', options: ['16', '20', '32', '64'], answerIndex: 2 },
    ]
  },
  funciones: {
    label: 'Funciones',
    items: [
      { id: 'predict-funciones-1', difficulty: 'facil', title: 'Función simple', prompt: '¿Qué imprime este código?', code: 'func doble(n):\n    return n * 2\nprint(doble(5))', options: ['5', '10', '25', 'Error'], answerIndex: 1 },
      { id: 'predict-funciones-2', difficulty: 'facil', title: 'Resta con números negativos', prompt: '¿Qué imprime este código?', code: 'func resta(a, b):\n    return a - b\nprint(resta(3, 10))', options: ['7', '-7', '13', '-13'], answerIndex: 1 },
      { id: 'predict-funciones-3', difficulty: 'facil', title: 'Función que retorna booleano', prompt: '¿Qué imprime este código?', code: 'func es_mayor(a, b):\n    return a > b\nprint(es_mayor(4, 9))', options: ['true', 'false', '4', '9'], answerIndex: 1 },
      { id: 'predict-funciones-4', difficulty: 'dificil', title: 'Parámetros por valor', prompt: '¿Qué imprime este código?', code: 'func triple(n):\n    n = n * 3\n    return n\nvar x = 5\nprint(triple(x))\nprint(x)', options: ['15\n15', '15\n5', '5\n15', '5\n5'], answerIndex: 1 },
      { id: 'predict-funciones-5', difficulty: 'facil', title: 'Función sin retorno, llamada dos veces', prompt: '¿Qué imprime este código?', code: 'func saluda():\n    print("Hola")\nsaluda()\nsaluda()', options: ['Hola', 'Hola\nHola', 'Hola\nHola\nHola', 'Error'], answerIndex: 1 },
      { id: 'predict-funciones-6', difficulty: 'medio', title: 'Función con array', prompt: '¿Qué imprime este código?', code: 'func suma_lista(lista):\n    var total = 0\n    for n in lista:\n        total += n\n    return total\nprint(suma_lista([2, 4, 6]))', options: ['12', '2', '246', 'Error'], answerIndex: 0 },
      { id: 'predict-funciones-7', difficulty: 'dificil', title: 'Recursión con suma', prompt: '¿Qué imprime este código?', code: 'func f(n):\n    if n <= 0:\n        return 0\n    return n + f(n - 1)\nprint(f(4))', options: ['4', '10', '24', '0'], answerIndex: 1 },
      { id: 'predict-funciones-8', difficulty: 'medio', title: 'Parámetro con valor por defecto', prompt: '¿Qué imprime este código?', code: 'func multiplicar(a, b = 2):\n    return a * b\nprint(multiplicar(5))', options: ['5', '10', 'Error', '2'], answerIndex: 1 },
      { id: 'predict-funciones-9', difficulty: 'facil', title: 'Guardar el resultado en una variable', prompt: '¿Qué imprime este código?', code: 'func es_positivo(n):\n    return n > 0\nvar r = es_positivo(-3)\nprint(r)', options: ['true', 'false', '-3', '0'], answerIndex: 1 },
      { id: 'predict-funciones-10', difficulty: 'facil', title: 'Concatenar con una función', prompt: '¿Qué imprime este código?', code: 'func concatenar(a, b):\n    return a + b\nprint(concatenar("Go", "dot"))', options: ['Go dot', 'Godot', 'GoDot', 'Error'], answerIndex: 1 },
    ]
  },
  arrays: {
    label: 'Arrays',
    items: [
      { id: 'predict-arrays-1', difficulty: 'facil', title: 'Agregar un elemento', prompt: '¿Qué imprime este código?', code: 'var a = [1, 2, 3]\na.append(4)\nprint(a)', options: ['[1, 2, 3]', '[1, 2, 3, 4]', '[4, 1, 2, 3]', 'Error'], answerIndex: 1 },
      { id: 'predict-arrays-2', difficulty: 'facil', title: 'Tamaño del array', prompt: '¿Qué imprime este código?', code: 'var a = [10, 20, 30]\nprint(a.size())', options: ['30', '3', '10', 'Error'], answerIndex: 1 },
      { id: 'predict-arrays-3', difficulty: 'facil', title: 'Ordenar números', prompt: '¿Qué imprime este código?', code: 'var a = [5, 3, 8, 1]\na.sort()\nprint(a)', options: ['[5, 3, 8, 1]', '[1, 3, 5, 8]', '[8, 5, 3, 1]', 'Error'], answerIndex: 1 },
      { id: 'predict-arrays-4', difficulty: 'dificil', title: 'duplicate() no afecta al original', prompt: '¿Qué imprime este código?', code: 'var a = [1, 2, 3]\nvar b = a.duplicate()\nb.append(9)\nprint(a)', options: ['[1, 2, 3]', '[1, 2, 3, 9]', '[9, 1, 2, 3]', 'Error'], answerIndex: 0 },
      { id: 'predict-arrays-5', difficulty: 'facil', title: 'Buscar un elemento', prompt: '¿Qué imprime este código?', code: 'var frutas = ["pera", "kiwi"]\nprint(frutas.has("kiwi"))', options: ['true', 'false', 'kiwi', '1'], answerIndex: 0 },
      { id: 'predict-arrays-6', difficulty: 'medio', title: 'Sumar elementos con un for', prompt: '¿Qué imprime este código?', code: 'var a = [2, 4, 6, 8]\nvar suma = 0\nfor n in a:\n    suma += n\nprint(suma)', options: ['4', '20', '2468', 'Error'], answerIndex: 1 },
      { id: 'predict-arrays-7', difficulty: 'facil', title: 'Eliminar un valor', prompt: '¿Qué imprime este código?', code: 'var a = [1, 2, 3, 4, 5]\na.erase(3)\nprint(a)', options: ['[1, 2, 4, 5]', '[1, 2, 3, 4, 5]', '[1, 2, 4]', 'Error'], answerIndex: 0 },
      { id: 'predict-arrays-8', difficulty: 'medio', title: 'Acceder tras invertir', prompt: '¿Qué imprime este código?', code: 'var a = ["x", "y", "z"]\na.reverse()\nprint(a[0])', options: ['x', 'y', 'z', 'Error'], answerIndex: 2 },
      { id: 'predict-arrays-9', difficulty: 'medio', title: 'Concatenar dos arrays con +', prompt: '¿Qué imprime este código?', code: 'var a = [1, 2, 3]\nvar b = [4, 5]\nprint(a + b)', options: ['[1, 2, 3, 4, 5]', '[5, 7]', 'Error', '[1, 2, 3][4, 5]'], answerIndex: 0 },
      { id: 'predict-arrays-10', difficulty: 'medio', title: 'Contar repeticiones', prompt: '¿Qué imprime este código?', code: 'var a = [3, 1, 4, 1, 5]\nprint(a.count(1))', options: ['1', '2', '5', 'Error'], answerIndex: 1 },
    ]
  },
  diccionarios: {
    label: 'Diccionarios',
    items: [
      { id: 'predict-diccionarios-1', difficulty: 'facil', title: 'Sumar dos valores', prompt: '¿Qué imprime este código?', code: 'var d = {"x": 1, "y": 2}\nprint(d["x"] + d["y"])', options: ['12', '3', '"xy"', 'Error'], answerIndex: 1 },
      { id: 'predict-diccionarios-2', difficulty: 'facil', title: 'Tamaño tras agregar una clave', prompt: '¿Qué imprime este código?', code: 'var d = {"a": 1}\nd["b"] = 5\nprint(d.size())', options: ['1', '2', '5', 'Error'], answerIndex: 1 },
      { id: 'predict-diccionarios-3', difficulty: 'facil', title: 'Verificar una clave existente', prompt: '¿Qué imprime este código?', code: 'var d = {"nombre": "Ana"}\nprint(d.has("nombre"))', options: ['true', 'false', 'Ana', 'nombre'], answerIndex: 0 },
      { id: 'predict-diccionarios-4', difficulty: 'medio', title: 'Recorrer claves', prompt: '¿Qué imprime este código?', code: 'var d = {"a": 10, "b": 20}\nfor k in d.keys():\n    print(k)', options: ['a\nb', 'b\na', '10\n20', 'a: 10\nb: 20'], answerIndex: 0 },
      { id: 'predict-diccionarios-5', difficulty: 'facil', title: 'Tamaño tras eliminar una clave', prompt: '¿Qué imprime este código?', code: 'var d = {"a": 1, "b": 2, "c": 3}\nd.erase("a")\nprint(d.size())', options: ['3', '2', '1', 'Error'], answerIndex: 1 },
      { id: 'predict-diccionarios-6', difficulty: 'medio', title: 'Comprobar una clave inexistente', prompt: '¿Qué imprime este código?', code: 'var d = {"x": 5}\nif not d.has("y"):\n    print("No existe")\nelse:\n    print("Existe")', options: ['Existe', 'No existe', 'true', 'y'], answerIndex: 1 },
      { id: 'predict-diccionarios-7', difficulty: 'medio', title: 'Sumar los valores', prompt: '¿Qué imprime este código?', code: 'var d = {"a": 1, "b": 2}\nvar total = 0\nfor v in d.values():\n    total += v\nprint(total)', options: ['2', '3', '12', 'Error'], answerIndex: 1 },
      { id: 'predict-diccionarios-8', difficulty: 'facil', title: 'Sobrescribir una clave', prompt: '¿Qué imprime este código?', code: 'var d = {"nombre": "Kai", "edad": 10}\nd["edad"] = 11\nprint(d["edad"])', options: ['10', '11', 'edad', 'Error'], answerIndex: 1 },
      { id: 'predict-diccionarios-9', difficulty: 'medio', title: 'Array dentro de un diccionario', prompt: '¿Qué imprime este código?', code: 'var jugador = {"items": ["a", "b", "c"]}\nprint(jugador["items"].size())', options: ['items', '3', '[a, b, c]', 'Error'], answerIndex: 1 },
      { id: 'predict-diccionarios-10', difficulty: 'facil', title: 'Diccionario vacío', prompt: '¿Qué imprime este código?', code: 'var d = {}\nd["z"] = 100\nprint(d)', options: ['{}', '{"z": 100}', 'z: 100', 'Error'], answerIndex: 1 },
    ]
  },
  tipado: {
    label: 'Tipado, const y enum',
    items: [
      { id: 'predict-tipado-1', difficulty: 'facil', title: 'Valor de un enum', prompt: '¿Qué imprime este código?', code: 'enum Estado { IDLE, RUN, JUMP }\nprint(Estado.JUMP)', options: ['0', '1', '2', 'JUMP'], answerIndex: 2 },
      { id: 'predict-tipado-2', difficulty: 'medio', title: 'Enum con valor inicial', prompt: '¿Qué imprime este código?', code: 'enum { A, B = 10, C }\nprint(C)', options: ['2', '10', '11', '1'], answerIndex: 2 },
      { id: 'predict-tipado-3', difficulty: 'medio', title: 'Reasignar una constante', prompt: '¿Qué ocurre al ejecutar este código?', code: 'const X = 5\nX = 10\nprint(X)', options: ['Imprime 10', 'Imprime 5', 'Error: no se puede reasignar la constante', 'Imprime null'], answerIndex: 2 },
      { id: 'predict-tipado-4', difficulty: 'facil', title: 'El tipado no cambia el valor', prompt: '¿Qué imprime este código?', code: 'var x: int = 4\nvar y: int = 6\nprint(x + y)', options: ['10', '"4 6"', '46', 'Error'], answerIndex: 0 },
    ]
  },
  clases: {
    label: 'Clases',
    items: [
      { id: 'predict-clases-1', difficulty: 'facil', title: 'Valor por defecto de un campo', prompt: '¿Qué imprime este código?', code: 'class Punto:\n    var x = 5\nvar p = Punto.new()\nprint(p.x)', options: ['0', '5', 'null', 'Error'], answerIndex: 1 },
      { id: 'predict-clases-2', difficulty: 'medio', title: 'Instancias independientes', prompt: '¿Qué imprime este código?', code: 'class Contador:\n    var valor = 0\n    func sumar():\n        self.valor += 1\nvar a = Contador.new()\nvar b = Contador.new()\na.sumar()\na.sumar()\nb.sumar()\nprint(a.valor)\nprint(b.valor)', options: ['2\n2', '2\n1', '1\n1', '3\n0'], answerIndex: 1 },
      { id: 'predict-clases-3', difficulty: 'dificil', title: 'Método sobrescrito', prompt: '¿Qué imprime este código?', code: 'class Animal:\n    func hablar():\n        return "..."\nclass Perro:\n    extends Animal\n    func hablar():\n        return "Guau"\nvar a = Animal.new()\nvar d = Perro.new()\nprint(a.hablar())\nprint(d.hablar())', options: ['...\n...', 'Guau\nGuau', '...\nGuau', 'Guau\n...'], answerIndex: 2 },
      { id: 'predict-clases-4', difficulty: 'dificil', title: 'Campo heredado', prompt: '¿Qué imprime este código?', code: 'class Personaje:\n    var vida = 100\nclass Heroe:\n    extends Personaje\n    var mana = 20\nvar h = Heroe.new()\nprint(h.vida)\nprint(h.mana)', options: ['null\n20', '100\n20', '100\nnull', 'Error'], answerIndex: 1 },
    ]
  },
  senales: {
    label: 'Señales',
    items: [
      { id: 'predict-senales-1', difficulty: 'facil', title: 'Emitir sin conectar', prompt: '¿Qué imprime este código?', code: 'signal saludo\nfunc on_saludo():\n    print("Hola!")\nsaludo.emit()', options: ['Hola!', '(nada, no se imprime)', 'Error', 'null'], answerIndex: 1 },
      { id: 'predict-senales-2', difficulty: 'medio', title: 'Dos funciones conectadas', prompt: '¿Qué imprime este código?', code: 'signal aviso\nfunc f1():\n    print("Uno")\nfunc f2():\n    print("Dos")\naviso.connect(f1)\naviso.connect(f2)\naviso.emit()', options: ['Uno', 'Dos', 'Uno\nDos', 'Dos\nUno'], answerIndex: 2 },
      { id: 'predict-senales-3', difficulty: 'dificil', title: 'Argumento de la señal', prompt: '¿Qué imprime este código?', code: 'signal cambio\nfunc on_cambio(valor):\n    print("Nuevo valor: ", valor)\ncambio.connect(on_cambio)\ncambio.emit(42)', options: ['Nuevo valor: 42', 'Nuevo valor: null', 'Error', '(nada)'], answerIndex: 0 },
    ]
  },
};
