// ---- exercises ----
// ---- helpers para ejercicios procedurales ----
function randInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
function randFloat1(min, max) { return Math.round((Math.random() * (max - min) + min) * 10) / 10; }
function pickRandom(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
function computeExpected(code) {
  const lines = [];
  const interp = new Interpreter((msg, isErr) => { if (!isErr) lines.push(msg); });
  interp.run(code);
  return lines.join('\n').trim();
}

const EXERCISES = {
  variables: {
    label: 'Variables',
    items: [
      { id: 'variables-1', difficulty: 'facil', title: 'Declarar e imprimir', prompt: 'Crea una variable llamada <code>mensaje</code> con el valor <code>"Hola GDScript"</code> e imprímela con <code>print()</code>.', expected: 'Hola GDScript' },
      { id: 'variables-2', difficulty: 'facil', title: 'Suma de dos variables', prompt: 'Crea dos variables <code>a = 8</code> y <code>b = 15</code>. Imprime su suma con <code>print(a + b)</code>.', expected: '23' },
      { id: 'variables-3', difficulty: 'facil', title: 'Intercambiar valores', prompt: 'Crea <code>x = 3</code> e <code>y = 9</code>. Imprime primero el valor de <code>y</code> y luego el de <code>x</code>, cada uno con su propio <code>print()</code>.', expected: '9\n3' },
      { id: 'variables-4', difficulty: 'medio', title: 'Concatenar texto', prompt: 'Crea <code>nombre = "Luna"</code> y <code>edad = 12</code>. Imprime exactamente <code>Luna tiene 12 años</code> usando un solo <code>print(nombre, " tiene ", edad, " años")</code>.', expected: 'Luna tiene 12 años' },
      { id: 'variables-5', difficulty: 'medio', title: 'Tipo de dato', prompt: 'Crea <code>var valor = 3.5</code>. Imprime su tipo con <code>print(typeof(valor))</code>.', expected: 'float' },
      { id: 'variables-6', difficulty: 'facil', title: 'Multiplicación simple', prompt: 'Crea <code>a = 6</code> y <code>b = 7</code>. Imprime su producto con <code>print(a * b)</code>.', expected: '42' },
      { id: 'variables-7', difficulty: 'facil', title: 'Asignación compuesta', prompt: 'Crea <code>contador = 10</code>. Súmale 5 con <code>contador += 5</code> e imprímelo.', expected: '15' },
      { id: 'variables-8', difficulty: 'medio', title: 'Conversión de tipo', prompt: 'Crea <code>texto = "42"</code>. Imprime <code>int(texto) + 8</code>.', expected: '50' },
      { id: 'variables-9', difficulty: 'facil', title: 'Valor absoluto', prompt: 'Crea <code>n = -15</code>. Imprime <code>abs(n)</code>.', expected: '15' },
      { id: 'variables-10', difficulty: 'medio', title: 'Booleanos combinados', prompt: 'Crea <code>activo = true</code> y <code>nivel = 5</code>. Imprime <code>activo and nivel > 3</code>.', expected: 'true' },
    ]
  },
  condicionales: {
    label: 'Condicionales',
    generators: [
      {
        id: 'condicionales-mayor-menor', difficulty: 'facil', title: 'Comparar con un número',
        build: () => {
          const num = randInt(1, 50);
          const umbral = randInt(1, 50);
          return {
            prompt: `Crea <code>num = ${num}</code>. Si <code>num</code> es mayor que ${umbral}, imprime <code>"Mayor"</code>. Si no, imprime <code>"Menor o igual"</code>.`,
            code: `var num = ${num}\nif num > ${umbral}:\n    print("Mayor")\nelse:\n    print("Menor o igual")`,
          };
        }
      },
      {
        id: 'condicionales-signo', difficulty: 'medio', title: 'Positivo, negativo o cero',
        build: () => {
          const num = pickRandom([0, randInt(-30, -1), randInt(1, 30)]);
          return {
            prompt: `Crea <code>num = ${num}</code>. Usa <code>if/elif/else</code> para imprimir <code>"Positivo"</code> si es mayor que 0, <code>"Negativo"</code> si es menor que 0, o <code>"Cero"</code> si es igual.`,
            code: `var num = ${num}\nif num > 0:\n    print("Positivo")\nelif num < 0:\n    print("Negativo")\nelse:\n    print("Cero")`,
          };
        }
      },
      {
        id: 'condicionales-par-impar', difficulty: 'facil', title: 'Par o impar',
        build: () => {
          const num = randInt(1, 100);
          return {
            prompt: `Crea <code>num = ${num}</code>. Imprime <code>"Par"</code> si <code>num % 2 == 0</code>, si no imprime <code>"Impar"</code>.`,
            code: `var num = ${num}\nif num % 2 == 0:\n    print("Par")\nelse:\n    print("Impar")`,
          };
        }
      },
      {
        id: 'condicionales-rango-edad', difficulty: 'medio', title: 'Rango de edad',
        build: () => {
          const edad = randInt(1, 90);
          return {
            prompt: `Crea <code>edad = ${edad}</code>. Con <code>if/elif/else</code> imprime <code>"Niño"</code> si es menor a 13, <code>"Adolescente"</code> si es menor a 18, <code>"Adulto"</code> si es menor a 65, o <code>"Adulto mayor"</code> en cualquier otro caso.`,
            code: `var edad = ${edad}\nif edad < 13:\n    print("Niño")\nelif edad < 18:\n    print("Adolescente")\nelif edad < 65:\n    print("Adulto")\nelse:\n    print("Adulto mayor")`,
          };
        }
      },
      {
        id: 'condicionales-nota-aprobatoria', difficulty: 'facil', title: 'Nota aprobatoria',
        build: () => {
          const nota = randFloat1(2, 10);
          return {
            prompt: `Crea <code>nota = ${nota}</code>. Imprime <code>"Aprobado"</code> si <code>nota >= 6</code>, si no imprime <code>"Reprobado"</code>.`,
            code: `var nota = ${nota}\nif nota >= 6:\n    print("Aprobado")\nelse:\n    print("Reprobado")`,
          };
        }
      },
      {
        id: 'condicionales-multiplo', difficulty: 'medio', title: 'Múltiplo de 3 y 5',
        build: () => {
          const num = pickRandom([15, 30, 45, 60, randInt(1, 60)]);
          return {
            prompt: `Crea <code>num = ${num}</code>. Si es múltiplo de 3 <b>y</b> de 5 imprime <code>"FizzBuzz"</code>, si no imprime <code>"No"</code>.`,
            code: `var num = ${num}\nif num % 3 == 0 and num % 5 == 0:\n    print("FizzBuzz")\nelse:\n    print("No")`,
          };
        }
      },
      {
        id: 'condicionales-comparar-strings', difficulty: 'facil', title: 'Comparar strings',
        build: () => {
          const nombres = ['Ana', 'Leo', 'Sol', 'Kai', 'Mia', 'Tom'];
          const nombre = pickRandom(nombres);
          const objetivo = pickRandom(nombres);
          return {
            prompt: `Crea <code>nombre = "${nombre}"</code>. Si <code>nombre == "${objetivo}"</code> imprime <code>"Coincide"</code>, si no imprime <code>"No coincide"</code>.`,
            code: `var nombre = "${nombre}"\nif nombre == "${objetivo}":\n    print("Coincide")\nelse:\n    print("No coincide")`,
          };
        }
      },
      {
        id: 'condicionales-validar-rango', difficulty: 'medio', title: 'Validar rango',
        build: () => {
          const x = pickRandom([randInt(1, 100), randInt(-20, 0), randInt(101, 130)]);
          return {
            prompt: `Crea <code>x = ${x}</code>. Si <code>x</code> está entre 1 y 100 (inclusive) imprime <code>"En rango"</code>, si no imprime <code>"Fuera de rango"</code>.`,
            code: `var x = ${x}\nif x >= 1 and x <= 100:\n    print("En rango")\nelse:\n    print("Fuera de rango")`,
          };
        }
      },
      {
        id: 'condicionales-negar', difficulty: 'dificil', title: 'Negar una condición',
        build: () => {
          const n = pickRandom([0, 0, randInt(1, 20)]);
          return {
            prompt: `Crea <code>n = ${n}</code>. Usa <code>not n</code> en un <code>if</code> para imprimir <code>"Es cero"</code> si <code>n</code> es "falsy", si no imprime <code>"No es cero"</code>.`,
            code: `var n = ${n}\nif not n:\n    print("Es cero")\nelse:\n    print("No es cero")`,
          };
        }
      },
      {
        id: 'condicionales-categoria-nota', difficulty: 'medio', title: 'Categoría de nota',
        build: () => {
          const nota = randInt(0, 100);
          return {
            prompt: `Crea <code>nota = ${nota}</code>. Con <code>if/elif/elif/else</code> imprime <code>"A"</code> (>=90), <code>"B"</code> (>=80), <code>"C"</code> (>=70) o <code>"D"</code>.`,
            code: `var nota = ${nota}\nif nota >= 90:\n    print("A")\nelif nota >= 80:\n    print("B")\nelif nota >= 70:\n    print("C")\nelse:\n    print("D")`,
          };
        }
      },
    ]
  },
  bucles: {
    label: 'Bucles',
    items: [
      { id: 'bucles-1', difficulty: 'facil', title: 'Contar del 1 al 5', prompt: 'Usa un <code>for</code> con <code>range()</code> para imprimir los números del 1 al 5, cada uno en su propia línea.', expected: '1\n2\n3\n4\n5' },
      { id: 'bucles-2', difficulty: 'medio', title: 'Sumar del 1 al 10', prompt: 'Usa un <code>for</code> con <code>range()</code> para sumar los números del 1 al 10 en una variable <code>suma</code>, y al final imprime el resultado con un solo <code>print()</code>.', expected: '55' },
      { id: 'bucles-3', difficulty: 'medio', title: 'Tabla del 3', prompt: 'Con un <code>for</code>, imprime la tabla del 3 del 1 al 5. Cada línea con <code>print(3, " x ", i, " = ", 3*i)</code>.', expected: '3 x 1 = 3\n3 x 2 = 6\n3 x 3 = 9\n3 x 4 = 12\n3 x 5 = 15' },
      { id: 'bucles-4', difficulty: 'facil', title: 'Pares con while', prompt: 'Usa un <code>while</code> para imprimir los números pares del 2 al 10 (2,4,6,8,10), cada uno en su propia línea.', expected: '2\n4\n6\n8\n10' },
      { id: 'bucles-5', difficulty: 'medio', title: 'Saltar múltiplos de 3', prompt: 'Usa un <code>for</code> con <code>range(1, 11)</code> y <code>continue</code> para imprimir todos los números del 1 al 10 excepto los múltiplos de 3.', expected: '1\n2\n4\n5\n7\n8\n10' },
      { id: 'bucles-6', difficulty: 'medio', title: 'Cuenta regresiva', prompt: 'Usa <code>range(5, 0, -1)</code> en un <code>for</code> para imprimir del 5 al 1, cada uno en su propia línea.', expected: '5\n4\n3\n2\n1' },
      { id: 'bucles-7', difficulty: 'dificil', title: 'Suma con while y break', prompt: 'Crea <code>i = 0</code> y <code>suma = 0</code>. Con <code>while true:</code> suma <code>i</code> a <code>suma</code> y aumenta <code>i</code> en 1, usando <code>if i >= 5: break</code> para detenerte. Imprime <code>suma</code> al final.', expected: '10' },
      { id: 'bucles-8', difficulty: 'medio', title: 'Bucle anidado', prompt: 'Usa dos <code>for</code> anidados con <code>range(1, 3)</code> para imprimir <code>print(i, "-", j)</code> para cada combinación.', expected: '1-1\n1-2\n2-1\n2-2' },
      { id: 'bucles-9', difficulty: 'medio', title: 'Filtrar impares con continue', prompt: 'Usa un <code>for</code> con <code>range(1, 11)</code> y <code>continue</code> para imprimir solo los números pares del 1 al 10.', expected: '2\n4\n6\n8\n10' },
      { id: 'bucles-10', difficulty: 'facil', title: 'Recorrer un string', prompt: 'Crea <code>palabra = "sol"</code>. Usa un <code>for</code> para imprimir cada letra en su propia línea.', expected: 's\no\nl' },
    ]
  },
  funciones: {
    label: 'Funciones',
    items: [
      { id: 'funciones-1', difficulty: 'facil', title: 'Función simple', prompt: 'Crea una función <code>saludar(nombre)</code> que retorne <code>"Hola, " + nombre + "!"</code>. Llama <code>saludar("Mundo")</code> e imprime el resultado.', expected: 'Hola, Mundo!' },
      { id: 'funciones-2', difficulty: 'facil', title: 'Suma de dos números', prompt: 'Crea una función <code>sumar(a, b)</code> que retorne <code>a + b</code>. Imprime <code>sumar(4, 9)</code>.', expected: '13' },
      { id: 'funciones-3', difficulty: 'medio', title: 'Es par', prompt: 'Crea <code>es_par(n)</code> que retorne <code>true</code> si <code>n</code> es par y <code>false</code> si no. Imprime <code>es_par(10)</code> y luego <code>es_par(7)</code>, cada uno en su propia línea.', expected: 'true\nfalse' },
      { id: 'funciones-4', difficulty: 'dificil', title: 'Factorial recursivo', prompt: 'Crea una función recursiva <code>factorial(n)</code> (caso base: <code>n <= 1</code> retorna 1). Imprime <code>factorial(6)</code>.', expected: '720' },
      { id: 'funciones-5', difficulty: 'medio', title: 'Máximo de dos', prompt: 'Crea <code>mayor(a, b)</code> que retorne el mayor de los dos con <code>if/else</code>. Imprime <code>mayor(15, 9)</code>.', expected: '15' },
      { id: 'funciones-6', difficulty: 'facil', title: 'Función sin retorno', prompt: 'Crea <code>despedir(nombre)</code> que imprima directamente <code>"Chau, " + nombre + "!"</code> (sin usar <code>return</code>). Llama <code>despedir("Tom")</code>.', expected: 'Chau, Tom!' },
      { id: 'funciones-7', difficulty: 'medio', title: 'Promedio de tres', prompt: 'Crea <code>promedio(a, b, c)</code> que retorne <code>(a + b + c) / 3</code>. Imprime <code>promedio(4, 5, 9)</code>.', expected: '6' },
      { id: 'funciones-8', difficulty: 'dificil', title: 'Fibonacci recursivo', prompt: 'Crea <code>fib(n)</code> recursiva (caso base <code>n <= 1</code> retorna <code>n</code>). Imprime <code>fib(7)</code>.', expected: '13' },
      { id: 'funciones-9', difficulty: 'medio', title: 'Función con array', prompt: 'Crea <code>contiene_par(lista)</code> que recorra la lista y retorne <code>true</code> si encuentra algún número par, o <code>false</code> si no. Imprime <code>contiene_par([1, 3, 5, 4])</code>.', expected: 'true' },
      { id: 'funciones-10', difficulty: 'medio', title: 'Función que llama a otra', prompt: 'Crea <code>cuadrado(n)</code> que retorne <code>n * n</code>, y <code>suma_cuadrados(a, b)</code> que retorne <code>cuadrado(a) + cuadrado(b)</code>. Imprime <code>suma_cuadrados(3, 4)</code>.', expected: '25' },
    ]
  },
  arrays: {
    label: 'Arrays',
    items: [
      { id: 'arrays-1', difficulty: 'facil', title: 'Crear e imprimir', prompt: 'Crea <code>numeros = [10, 20, 30]</code> e imprímelo directamente con <code>print(numeros)</code>.', expected: '[10, 20, 30]' },
      { id: 'arrays-2', difficulty: 'facil', title: 'Agregar elemento', prompt: 'Crea <code>numeros = [1, 2, 3]</code>. Usa <code>.append()</code> para agregar el 4. Imprime el array completo.', expected: '[1, 2, 3, 4]' },
      { id: 'arrays-3', difficulty: 'facil', title: 'Tamaño del array', prompt: 'Crea <code>frutas = ["manzana", "pera", "uva", "kiwi"]</code>. Imprime su tamaño con <code>print(frutas.size())</code>.', expected: '4' },
      { id: 'arrays-4', difficulty: 'medio', title: 'Recorrer y sumar', prompt: 'Crea <code>numeros = [4, 8, 15, 16, 23]</code>. Usa un <code>for</code> para sumar todos sus elementos en <code>suma</code>, luego imprime el resultado.', expected: '66' },
      { id: 'arrays-5', difficulty: 'facil', title: 'Buscar elemento', prompt: 'Crea <code>colores = ["rojo", "verde", "azul"]</code>. Imprime directamente el resultado de <code>colores.has("verde")</code>.', expected: 'true' },
      { id: 'arrays-6', difficulty: 'facil', title: 'Eliminar elemento', prompt: 'Crea <code>lista = [1, 2, 3, 4, 5]</code>. Usa <code>.erase(3)</code> para quitar el valor 3. Imprime la lista.', expected: '[1, 2, 4, 5]' },
      { id: 'arrays-7', difficulty: 'facil', title: 'Invertir array', prompt: 'Crea <code>letras = ["a", "b", "c"]</code>. Usa <code>.reverse()</code> e imprime el resultado.', expected: '[c, b, a]' },
      { id: 'arrays-8', difficulty: 'medio', title: 'Duplicar sin afectar el original', prompt: 'Crea <code>original = [1, 2, 3]</code>. Crea <code>copia = original.duplicate()</code>, agrégale un 4 con <code>.append()</code>, e imprime primero <code>original</code> y luego <code>copia</code>.', expected: '[1, 2, 3]\n[1, 2, 3, 4]' },
      { id: 'arrays-9', difficulty: 'medio', title: 'Ordenar de mayor a menor', prompt: 'Crea <code>n = [5, 1, 4, 2, 3]</code>. Usa <code>.sort()</code> y luego <code>.reverse()</code> para dejarlo de mayor a menor. Imprímelo.', expected: '[5, 4, 3, 2, 1]' },
      { id: 'arrays-10', difficulty: 'dificil', title: 'Filtrar mayores a 10', prompt: 'Crea <code>numeros = [3, 8, 12, 7, 20, 5]</code> y una lista vacía <code>mayores = []</code>. Recórrela y agrega a <code>mayores</code> los valores mayores a 10. Imprime <code>mayores</code>.', expected: '[12, 20]' },
    ]
  },
  diccionarios: {
    label: 'Diccionarios',
    items: [
      { id: 'diccionarios-1', difficulty: 'facil', title: 'Crear y acceder', prompt: 'Crea <code>persona = {"nombre": "Eli", "edad": 25}</code>. Imprime <code>persona["nombre"]</code>.', expected: 'Eli' },
      { id: 'diccionarios-2', difficulty: 'medio', title: 'Agregar clave', prompt: 'Crea <code>datos = {"a": 1}</code>. Agrega la clave <code>"b"</code> con valor 2 (<code>datos["b"] = 2</code>). Imprime el diccionario completo con <code>print(datos)</code>.', expected: '{"a": 1, "b": 2}' },
      { id: 'diccionarios-3', difficulty: 'facil', title: 'Tamaño del diccionario', prompt: 'Crea <code>inventario = {"espada": 1, "escudo": 2, "poción": 5}</code>. Imprime su tamaño con <code>print(inventario.size())</code>.', expected: '3' },
      { id: 'diccionarios-4', difficulty: 'medio', title: 'Recorrer claves', prompt: 'Crea <code>puntajes = {"Ana": 90, "Leo": 75}</code>. Con un <code>for</code> sobre <code>puntajes.keys()</code>, imprime cada línea como <code>print(clave, ": ", puntajes[clave])</code>.', expected: 'Ana: 90\nLeo: 75' },
      { id: 'diccionarios-5', difficulty: 'facil', title: 'Verificar existencia', prompt: 'Crea <code>stock = {"manzanas": 10}</code>. Imprime directamente el resultado de <code>stock.has("peras")</code>.', expected: 'false' },
      { id: 'diccionarios-6', difficulty: 'facil', title: 'Eliminar una clave', prompt: 'Crea <code>d = {"a": 1, "b": 2, "c": 3}</code>. Usa <code>.erase("b")</code> e imprime el diccionario resultante.', expected: '{"a": 1, "c": 3}' },
      { id: 'diccionarios-7', difficulty: 'medio', title: 'Sumar todos los valores', prompt: 'Crea <code>precios = {"pan": 2, "leche": 3, "huevo": 4}</code>. Recorre <code>precios.keys()</code> y suma todos los valores en <code>total</code>. Imprime <code>total</code>.', expected: '9' },
      { id: 'diccionarios-8', difficulty: 'medio', title: 'Agregar si no existe', prompt: 'Crea <code>stock = {"manzana": 5}</code>. Si <code>not stock.has("pera")</code>, agrega <code>stock["pera"] = 0</code>. Imprime <code>stock</code>.', expected: '{"manzana": 5, "pera": 0}' },
      { id: 'diccionarios-9', difficulty: 'dificil', title: 'Diccionario con array adentro', prompt: 'Crea <code>jugador = {"nombre": "Kai", "items": ["espada", "escudo"]}</code>. Imprime <code>jugador["items"].size()</code>.', expected: '2' },
      { id: 'diccionarios-10', difficulty: 'medio', title: 'Contar mayores de edad', prompt: 'Crea <code>edades = {"Ana": 15, "Leo": 22, "Sol": 9, "Max": 30}</code>. Recorre <code>edades.values()</code> y cuenta en <code>adultos</code> cuántos son <code>>= 18</code>. Imprime <code>adultos</code>.', expected: '2' },
    ]
  },
  tipado: {
    label: 'Tipado, const y enum',
    items: [
      { id: 'tipado-1', difficulty: 'facil', title: 'Variable tipada', prompt: 'Declara <code>var edad: int = 12</code> e imprímela con <code>print(edad)</code>.', expected: '12' },
      { id: 'tipado-2', difficulty: 'facil', title: 'Constante simple', prompt: 'Declara <code>const PI = 3</code> e imprímela.', expected: '3' },
      { id: 'tipado-3', difficulty: 'medio', title: 'Función con tipos', prompt: 'Crea <code>func doblar(n: int) -> int:</code> que retorne <code>n * 2</code>. Imprime <code>doblar(9)</code>.', expected: '18' },
      { id: 'tipado-4', difficulty: 'medio', title: 'Enum con nombre', prompt: 'Crea <code>enum Color { ROJO, VERDE, AZUL }</code>. Imprime <code>Color.VERDE</code>.', expected: '1' },
      { id: 'tipado-5', difficulty: 'dificil', title: 'Enum anónimo con valor inicial', prompt: 'Crea <code>enum { A = 10, B, C }</code> (sin nombre). Imprime <code>B</code> y luego <code>C</code>.', expected: '11\n12' },
      { id: 'tipado-6', difficulty: 'medio', title: 'Constante inmutable', prompt: 'Crea <code>const LIMITE = 5</code> e imprímela directamente (sin intentar reasignarla, porque una constante no se puede modificar).', expected: '5' },
    ]
  },
  clases: {
    label: 'Clases',
    items: [
      { id: 'clases-1', difficulty: 'facil', title: 'Clase con un campo', prompt: 'Crea <code>class Punto:</code> con <code>var x = 0</code>. Instancia con <code>p = Punto.new()</code> e imprime <code>p.x</code>.', expected: '0' },
      { id: 'clases-2', difficulty: 'facil', title: 'Constructor _init', prompt: 'Crea <code>class Jugador:</code> con <code>var nombre = ""</code> y <code>func _init(n):</code> que asigne <code>self.nombre = n</code>. Instancia <code>Jugador.new("Ana")</code> e imprime <code>.nombre</code>.', expected: 'Ana' },
      { id: 'clases-3', difficulty: 'medio', title: 'Método que modifica un campo', prompt: 'Crea <code>class Contador:</code> con <code>var valor = 0</code> y un método <code>func sumar():</code> que haga <code>self.valor += 1</code>. Llama a <code>sumar()</code> tres veces e imprime <code>.valor</code>.', expected: '3' },
      { id: 'clases-4', difficulty: 'medio', title: 'Método con retorno', prompt: 'Crea <code>class Rectangulo:</code> con <code>var ancho</code> y <code>var alto</code> asignados en <code>_init(a, h)</code>, y un método <code>area()</code> que retorne <code>self.ancho * self.alto</code>. Instancia con <code>4, 5</code> e imprime el área.', expected: '20' },
      { id: 'clases-5', difficulty: 'dificil', title: 'Herencia con extends', prompt: 'Crea <code>class Animal:</code> con método <code>hablar()</code> que retorne <code>"..."</code>. Crea <code>class Gato:</code> con <code>extends Animal</code> que sobrescriba <code>hablar()</code> para retornar <code>"Miau"</code>. Instancia <code>Gato.new()</code> e imprime <code>.hablar()</code>.', expected: 'Miau' },
      { id: 'clases-6', difficulty: 'dificil', title: 'Herencia con campo heredado', prompt: 'Crea <code>class Personaje:</code> con <code>var vida = 100</code>. Crea <code>class Heroe:</code> con <code>extends Personaje</code> y un método <code>esta_vivo()</code> que retorne <code>self.vida > 0</code>. Instancia <code>Heroe.new()</code> e imprime <code>.vida</code> y luego <code>.esta_vivo()</code>.', expected: '100\ntrue' },
    ]
  },
  senales: {
    label: 'Señales',
    items: [
      { id: 'senales-1', difficulty: 'facil', title: 'Declarar y emitir', prompt: 'Declara <code>signal saludo</code>. Crea <code>func on_saludo():</code> que imprima <code>"Hola!"</code>. Conéctala con <code>saludo.connect(on_saludo)</code> y emítela con <code>saludo.emit()</code>.', expected: 'Hola!' },
      { id: 'senales-2', difficulty: 'medio', title: 'Señal con argumento', prompt: 'Declara <code>signal puntos_sumados</code>. Crea <code>func on_puntos(cantidad):</code> que imprima <code>"Sumaste ", cantidad, " puntos"</code>. Conéctala y emítela con <code>puntos_sumados.emit(50)</code>.', expected: 'Sumaste 50 puntos' },
      { id: 'senales-3', difficulty: 'medio', title: 'Dos escuchas para la misma señal', prompt: 'Declara <code>signal aviso</code>. Crea dos funciones, <code>func f1():</code> que imprima <code>"Escucha 1"</code> y <code>func f2():</code> que imprima <code>"Escucha 2"</code>. Conecta ambas a <code>aviso</code> y emítela una sola vez.', expected: 'Escucha 1\nEscucha 2' },
      { id: 'senales-4', difficulty: 'dificil', title: 'Señal disparada condicionalmente', prompt: 'Declara <code>signal murio</code> y <code>var vida = 10</code>. Crea <code>func recibir_dano(cantidad):</code> que reste de <code>vida</code> y, si <code>vida <= 0</code>, emita <code>murio</code>. Conecta <code>murio</code> a una función que imprima <code>"Game Over"</code>. Llama <code>recibir_dano(15)</code>.', expected: 'Game Over' },
    ]
  },
};

const DIFFICULTY_LABEL = { facil: '🟢 Fácil', medio: '🟡 Medio', dificil: '🔴 Difícil' };

const exerciseModeEl = document.getElementById('exerciseMode');
const predictOptionsEl = document.getElementById('predictOptions');
const exerciseTopicEl = document.getElementById('exerciseTopic');
const exerciseDifficultyEl = document.getElementById('exerciseDifficulty');
const exerciseBtnEl = document.getElementById('exerciseBtn');
const exercisePanelEl = document.getElementById('exercisePanel');
const exerciseTopicLabelEl = document.getElementById('exerciseTopicLabel');
const exerciseDiffLabelEl = document.getElementById('exerciseDiffLabel');
const exerciseTitleEl = document.getElementById('exerciseTitle');
const exerciseSolvedBadgeEl = document.getElementById('exerciseSolvedBadge');
const exercisePromptEl = document.getElementById('exercisePrompt');
const exerciseResultEl = document.getElementById('exerciseResult');
const verifyBtnEl = document.getElementById('verifyBtn');
const nextExerciseBtnEl = document.getElementById('nextExerciseBtn');
const closeExerciseBtnEl = document.getElementById('closeExerciseBtn');
const statProgressTextEl = document.getElementById('statProgressText');
const statProgressFillEl = document.getElementById('statProgressFill');
const statStreakEl = document.getElementById('statStreak');
const statBestEl = document.getElementById('statBest');
const resetProgressBtnEl = document.getElementById('resetProgressBtn');

// ---- progress / streak persistence ----
const LS_SOLVED = 'gdconsola_solved_v1';
const LS_STREAK = 'gdconsola_streak_v1';
const LS_BEST = 'gdconsola_best_streak_v1';

function lsGetSet(key) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? new Set(JSON.parse(raw)) : new Set();
  } catch (e) { return new Set(); }
}
function lsSaveSet(key, set) {
  try { localStorage.setItem(key, JSON.stringify(Array.from(set))); } catch (e) { /* storage unavailable */ }
}
function lsGetNum(key) {
  try { return parseInt(localStorage.getItem(key) || '0', 10) || 0; } catch (e) { return 0; }
}
function lsSaveNum(key, val) {
  try { localStorage.setItem(key, String(val)); } catch (e) { /* storage unavailable */ }
}

let solvedIds = lsGetSet(LS_SOLVED);
let currentStreak = lsGetNum(LS_STREAK);
let bestStreak = lsGetNum(LS_BEST);

let exerciseMode = 'write';

function activeDataset() {
  if (exerciseMode === 'bug') return EXERCISES_BUG;
  if (exerciseMode === 'predict') return EXERCISES_PREDICT;
  return EXERCISES;
}

function topicPoolMeta(topicKey, dataset) {
  const t = (dataset || activeDataset())[topicKey];
  if (!t) return [];
  if (t.generators) return t.generators.map(g => ({ id: g.id, difficulty: g.difficulty }));
  return t.items.map(it => ({ id: it.id, difficulty: it.difficulty }));
}

function allExerciseItems() {
  const out = [];
  for (const dataset of [EXERCISES, EXERCISES_BUG, EXERCISES_PREDICT]) {
    for (const topicKey of Object.keys(dataset)) {
      for (const item of topicPoolMeta(topicKey, dataset)) out.push({ topicKey, item });
    }
  }
  return out;
}

function refreshTopicOptions() {
  const prevValue = exerciseTopicEl.value;
  exerciseTopicEl.innerHTML = '';
  const optAll = document.createElement('option');
  optAll.value = '';
  optAll.textContent = 'Ejercicios: elegir tema';
  exerciseTopicEl.appendChild(optAll);
  const dataset = activeDataset();
  for (const key of Object.keys(dataset)) {
    const meta = topicPoolMeta(key, dataset);
    const solvedCount = meta.filter(it => solvedIds.has(it.id)).length;
    const opt = document.createElement('option');
    opt.value = key;
    opt.textContent = `${dataset[key].label} (${solvedCount}/${meta.length})`;
    exerciseTopicEl.appendChild(opt);
  }
  exerciseTopicEl.value = prevValue;
}

function refreshStats() {
  const all = allExerciseItems();
  const solvedCount = all.filter(({ item }) => solvedIds.has(item.id)).length;
  const pct = all.length ? Math.round((solvedCount / all.length) * 100) : 0;
  statProgressTextEl.textContent = `✓ ${solvedCount}/${all.length} resueltos`;
  statProgressFillEl.style.width = pct + '%';
  statStreakEl.textContent = `🔥 racha ${currentStreak}`;
  statBestEl.textContent = `mejor: ${bestStreak}`;
  refreshTopicOptions();
}

function resetProgress() {
  solvedIds = new Set();
  currentStreak = 0;
  bestStreak = 0;
  lsSaveSet(LS_SOLVED, solvedIds);
  lsSaveNum(LS_STREAK, 0);
  lsSaveNum(LS_BEST, 0);
  refreshStats();
  if (currentExercise) updateSolvedBadge();
}

resetProgressBtnEl.addEventListener('click', () => {
  if (confirm('¿Reiniciar todo el progreso, la racha y los ejercicios resueltos? Esta acción no se puede deshacer.')) {
    resetProgress();
  }
});

refreshStats();

let currentExercise = null;
let currentTopicKey = null;
let lastExerciseKey = null;

function updateSolvedBadge() {
  if (currentExercise && solvedIds.has(currentExercise.id)) {
    exerciseSolvedBadgeEl.style.display = '';
  } else {
    exerciseSolvedBadgeEl.style.display = 'none';
  }
}

function renderPredictOptions() {
  predictOptionsEl.innerHTML = '';
  predictOptionsEl.style.display = '';
  predictOptionsEl.classList.remove('answered');
  currentExercise.options.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.className = 'btn predict-option-btn';
    btn.textContent = opt;
    btn.addEventListener('click', () => answerPredict(i, btn));
    predictOptionsEl.appendChild(btn);
  });
}

function answerPredict(selectedIndex, btnEl) {
  if (!currentExercise || predictOptionsEl.classList.contains('answered')) return;
  predictOptionsEl.classList.add('answered');
  const buttons = Array.from(predictOptionsEl.querySelectorAll('button'));
  buttons.forEach(b => b.disabled = true);
  const correct = selectedIndex === currentExercise.answerIndex;
  buttons[currentExercise.answerIndex].classList.add('correct');
  if (!correct) btnEl.classList.add('incorrect');

  if (correct) {
    exerciseResultEl.className = 'exercise-result show pass';
    const alreadySolved = solvedIds.has(currentExercise.id);
    exerciseResultEl.textContent = alreadySolved
      ? '✓ ¡Correcto! (ya lo habías resuelto antes)'
      : '✓ ¡Correcto!';
    if (!alreadySolved) {
      solvedIds.add(currentExercise.id);
      lsSaveSet(LS_SOLVED, solvedIds);
    }
    currentStreak += 1;
    if (currentStreak > bestStreak) { bestStreak = currentStreak; lsSaveNum(LS_BEST, bestStreak); }
    lsSaveNum(LS_STREAK, currentStreak);
  } else {
    exerciseResultEl.className = 'exercise-result show fail';
    exerciseResultEl.textContent = '✗ No — la respuesta correcta era: ' + currentExercise.options[currentExercise.answerIndex];
    currentStreak = 0;
    lsSaveNum(LS_STREAK, currentStreak);
  }
  updateSolvedBadge();
  refreshStats();
}

function pickExercise() {
  const dataset = activeDataset();
  let topicKey = exerciseTopicEl.value;
  if (!topicKey || !dataset[topicKey]) {
    const keys = Object.keys(dataset);
    topicKey = keys[Math.floor(Math.random() * keys.length)];
    exerciseTopicEl.value = topicKey;
  }
  const topic = dataset[topicKey];
  const diffFilter = exerciseDifficultyEl.value;
  let poolMeta = topicPoolMeta(topicKey, dataset).filter(it => !diffFilter || it.difficulty === diffFilter);
  if (poolMeta.length === 0) poolMeta = topicPoolMeta(topicKey, dataset); // fallback if a topic has no items at that difficulty

  // prefer exercises not yet solved, when possible
  const unsolved = poolMeta.filter(it => !solvedIds.has(it.id));
  const candidates = unsolved.length > 0 ? unsolved : poolMeta;

  let idx = Math.floor(Math.random() * candidates.length);
  let pickedMeta = candidates[idx];
  if (candidates.length > 1 && pickedMeta.id === lastExerciseKey) {
    idx = (idx + 1) % candidates.length;
    pickedMeta = candidates[idx];
  }
  lastExerciseKey = pickedMeta.id;
  currentTopicKey = topicKey;

  if (topic.generators) {
    const genMeta = topic.generators.find(g => g.id === pickedMeta.id);
    let built, expected;
    try {
      built = genMeta.build();
      expected = computeExpected(built.code);
    } catch (e) {
      console.error('Error generando ejercicio procedural', genMeta.id, e);
      built = { prompt: 'Hubo un problema generando este ejercicio, presiona "Otro ejercicio".', code: '' };
      expected = '';
    }
    currentExercise = { id: genMeta.id, difficulty: genMeta.difficulty, title: genMeta.title, prompt: built.prompt, expected, code: built.code };
  } else {
    currentExercise = topic.items.find(it => it.id === pickedMeta.id);
  }

  exerciseTopicLabelEl.textContent = topic.label;
  exerciseDiffLabelEl.textContent = DIFFICULTY_LABEL[currentExercise.difficulty];
  exerciseDiffLabelEl.className = 'exercise-diff-pill ' + currentExercise.difficulty;
  exerciseTitleEl.textContent = currentExercise.title;
  exercisePromptEl.innerHTML = currentExercise.prompt;
  exerciseResultEl.className = 'exercise-result';
  exerciseResultEl.textContent = '';
  updateSolvedBadge();
  exercisePanelEl.classList.add('visible');
  clearConsole();

  if (exerciseMode === 'predict') {
    codeEl.readOnly = true;
    runBtn.disabled = true;
    verifyBtnEl.style.display = 'none';
    setEditorValue(currentExercise.code, 0, true);
    renderPredictOptions();
  } else {
    codeEl.readOnly = false;
    runBtn.disabled = false;
    verifyBtnEl.style.display = '';
    predictOptionsEl.style.display = 'none';
    predictOptionsEl.innerHTML = '';
    const starterCode = exerciseMode === 'bug' ? currentExercise.code : '';
    setEditorValue(starterCode, 0, true);
    codeEl.focus();
  }
}

function verifyExercise() {
  if (!currentExercise) return;
  clearConsole();
  const code = codeEl.value;
  const lines = [];
  const interp = new Interpreter((msg, isErr) => {
    printLine(msg, isErr ? 'stderr' : 'stdout');
    if (!isErr) lines.push(msg);
  });
  try {
    interp.run(code);
  } catch (e) {
    printLine(e.message, 'error');
    exerciseResultEl.className = 'exercise-result show fail';
    exerciseResultEl.textContent = '✗ Tu código tiene un error — revisa la salida de la consola.';
    currentStreak = 0;
    lsSaveNum(LS_STREAK, currentStreak);
    refreshStats();
    return;
  }
  const actual = lines.join('\n').trim();
  const expected = currentExercise.expected.trim();
  if (actual === expected) {
    exerciseResultEl.className = 'exercise-result show pass';
    const alreadySolved = solvedIds.has(currentExercise.id);
    exerciseResultEl.textContent = alreadySolved
      ? '✓ ¡Correcto! (ya lo habías resuelto antes)'
      : '✓ ¡Correcto! La salida coincide.';
    if (!alreadySolved) {
      solvedIds.add(currentExercise.id);
      lsSaveSet(LS_SOLVED, solvedIds);
    }
    currentStreak += 1;
    if (currentStreak > bestStreak) { bestStreak = currentStreak; lsSaveNum(LS_BEST, bestStreak); }
    lsSaveNum(LS_STREAK, currentStreak);
    updateSolvedBadge();
    refreshStats();
  } else {
    exerciseResultEl.className = 'exercise-result show fail';
    exerciseResultEl.textContent = '✗ Aún no — tu salida fue:\n' + (actual || '(sin salida)') + '\n\nSe esperaba:\n' + expected;
    currentStreak = 0;
    lsSaveNum(LS_STREAK, currentStreak);
    refreshStats();
  }
}

exerciseModeEl.addEventListener('change', () => {
  exerciseMode = exerciseModeEl.value;
  exerciseTopicEl.value = '';
  refreshTopicOptions();
  if (exercisePanelEl.classList.contains('visible')) {
    pickExercise();
  }
});

exerciseBtnEl.addEventListener('click', pickExercise);
nextExerciseBtnEl.addEventListener('click', pickExercise);
verifyBtnEl.addEventListener('click', verifyExercise);
closeExerciseBtnEl.addEventListener('click', () => {
  exercisePanelEl.classList.remove('visible');
  currentExercise = null;
  codeEl.readOnly = false;
  runBtn.disabled = false;
  predictOptionsEl.style.display = 'none';
  verifyBtnEl.style.display = '';
});

