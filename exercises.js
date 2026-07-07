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

const variablesGenerators = [
  // ---- migrated originals (facil: 6) ----
  { id: 'variables-1', difficulty: 'facil', title: 'Declarar e imprimir', build: () => ({
    prompt: 'Crea una variable llamada <code>mensaje</code> con el valor <code>"Hola GDScript"</code> e imprímela con <code>print()</code>.',
    code: 'var mensaje = "Hola GDScript"\nprint(mensaje)' }) },
  { id: 'variables-2', difficulty: 'facil', title: 'Suma de dos variables', build: () => ({
    prompt: 'Crea dos variables <code>a = 8</code> y <code>b = 15</code>. Imprime su suma con <code>print(a + b)</code>.',
    code: 'var a = 8\nvar b = 15\nprint(a + b)' }) },
  { id: 'variables-3', difficulty: 'facil', title: 'Intercambiar valores', build: () => ({
    prompt: 'Crea <code>x = 3</code> e <code>y = 9</code>. Imprime primero el valor de <code>y</code> y luego el de <code>x</code>, cada uno con su propio <code>print()</code>.',
    code: 'var x = 3\nvar y = 9\nprint(y)\nprint(x)' }) },
  { id: 'variables-6', difficulty: 'facil', title: 'Multiplicación simple', build: () => ({
    prompt: 'Crea <code>a = 6</code> y <code>b = 7</code>. Imprime su producto con <code>print(a * b)</code>.',
    code: 'var a = 6\nvar b = 7\nprint(a * b)' }) },
  { id: 'variables-7', difficulty: 'facil', title: 'Asignación compuesta', build: () => ({
    prompt: 'Crea <code>contador = 10</code>. Súmale 5 con <code>contador += 5</code> e imprímelo.',
    code: 'var contador = 10\ncontador += 5\nprint(contador)' }) },
  { id: 'variables-9', difficulty: 'facil', title: 'Valor absoluto', build: () => ({
    prompt: 'Crea <code>n = -15</code>. Imprime <code>abs(n)</code>.',
    code: 'var n = -15\nprint(abs(n))' }) },
  // ---- migrated originals (medio: 4) ----
  { id: 'variables-4', difficulty: 'medio', title: 'Concatenar texto', build: () => ({
    prompt: 'Crea <code>nombre = "Luna"</code> y <code>edad = 12</code>. Imprime exactamente <code>Luna tiene 12 años</code> usando un solo <code>print(nombre, " tiene ", edad, " años")</code>.',
    code: 'var nombre = "Luna"\nvar edad = 12\nprint(nombre, " tiene ", edad, " años")' }) },
  { id: 'variables-5', difficulty: 'medio', title: 'Tipo de dato', build: () => ({
    prompt: 'Crea <code>var valor = 3.5</code>. Imprime su tipo con <code>print(typeof(valor))</code>.',
    code: 'var valor = 3.5\nprint(typeof(valor))' }) },
  { id: 'variables-8', difficulty: 'medio', title: 'Conversión de tipo', build: () => ({
    prompt: 'Crea <code>texto = "42"</code>. Imprime <code>int(texto) + 8</code>.',
    code: 'var texto = "42"\nprint(int(texto) + 8)' }) },
  { id: 'variables-10', difficulty: 'medio', title: 'Booleanos combinados', build: () => ({
    prompt: 'Crea <code>activo = true</code> y <code>nivel = 5</code>. Imprime <code>activo and nivel > 3</code>.',
    code: 'var activo = true\nvar nivel = 5\nprint(activo and nivel > 3)' }) },

  // ---- new facil (4) ----
  { id: 'variables-11', difficulty: 'facil', title: 'Resta de variables', build: () => {
    const a = randInt(20, 60), b = randInt(1, 19);
    return { prompt: `Crea <code>a = ${a}</code> y <code>b = ${b}</code>. Imprime su resta con <code>print(a - b)</code>.`,
      code: `var a = ${a}\nvar b = ${b}\nprint(a - b)` };
  } },
  { id: 'variables-12', difficulty: 'facil', title: 'Tamaño de un texto', build: () => {
    const palabra = pickRandom(['dragón', 'espada', 'castillo', 'aventura', 'mapa']);
    return { prompt: `Crea <code>palabra = "${palabra}"</code>. Imprime su longitud con <code>print(palabra.length())</code>.`,
      code: `var palabra = "${palabra}"\nprint(palabra.length())` };
  } },
  { id: 'variables-13', difficulty: 'facil', title: 'Booleano directo', build: () => {
    const val = pickRandom([true, false]);
    return { prompt: `Crea <code>encendido = ${val}</code>. Imprímela directamente con <code>print(encendido)</code>.`,
      code: `var encendido = ${val}\nprint(encendido)` };
  } },
  { id: 'variables-14', difficulty: 'facil', title: 'Menor entre dos', build: () => {
    const a = randInt(1, 50), b = randInt(1, 50);
    return { prompt: `Crea <code>a = ${a}</code> y <code>b = ${b}</code>. Imprime el menor con <code>print(min(a, b))</code>.`,
      code: `var a = ${a}\nvar b = ${b}\nprint(min(a, b))` };
  } },

  // ---- new medio (6) ----
  { id: 'variables-15', difficulty: 'medio', title: 'División entera', build: () => {
    const a = randInt(20, 99), b = randInt(2, 9);
    return { prompt: `Crea <code>a = ${a}</code> y <code>b = ${b}</code> (ambos enteros). Imprime <code>a / b</code> y observa que el resultado se trunca (división entera).`,
      code: `var a = ${a}\nvar b = ${b}\nprint(a / b)` };
  } },
  { id: 'variables-16', difficulty: 'medio', title: 'Redondear un valor', build: () => {
    const n = randFloat1(1, 20);
    return { prompt: `Crea <code>n = ${n}</code>. Imprime <code>round(n)</code>.`,
      code: `var n = ${n}\nprint(round(n))` };
  } },
  { id: 'variables-17', difficulty: 'medio', title: 'Asignaciones compuestas encadenadas', build: () => {
    const inicio = randInt(2, 10), suma = randInt(2, 8), mult = randInt(2, 4);
    return { prompt: `Crea <code>valor = ${inicio}</code>. Súmale ${suma} con <code>+=</code> y luego multiplícalo por ${mult} con <code>*=</code>. Imprime el resultado final.`,
      code: `var valor = ${inicio}\nvalor += ${suma}\nvalor *= ${mult}\nprint(valor)` };
  } },
  { id: 'variables-18', difficulty: 'medio', title: 'Expresión ternaria', build: () => {
    const n = randInt(-10, 10);
    return { prompt: `Crea <code>n = ${n}</code>. Con una sola línea, imprime <code>"positivo"</code> si <code>n >= 0</code> o <code>"negativo"</code> en caso contrario, usando la expresión ternaria: <code>print("positivo" if n >= 0 else "negativo")</code>.`,
      code: `var n = ${n}\nprint("positivo" if n >= 0 else "negativo")` };
  } },
  { id: 'variables-19', difficulty: 'medio', title: 'Convertir texto a decimal', build: () => {
    const texto = randFloat1(1, 50).toString();
    const suma = randInt(1, 10);
    return { prompt: `Crea <code>texto = "${texto}"</code>. Imprime <code>float(texto) + ${suma}</code>.`,
      code: `var texto = "${texto}"\nprint(float(texto) + ${suma})` };
  } },
  { id: 'variables-20', difficulty: 'medio', title: 'Comparar mayor o igual', build: () => {
    const puntaje = randInt(0, 100), meta = randInt(0, 100);
    return { prompt: `Crea <code>puntaje = ${puntaje}</code> y <code>meta = ${meta}</code>. Imprime <code>puntaje >= meta</code>.`,
      code: `var puntaje = ${puntaje}\nvar meta = ${meta}\nprint(puntaje >= meta)` };
  } },

  // ---- new dificil (10) ----
  { id: 'variables-21', difficulty: 'dificil', title: 'Ternario anidado', build: () => {
    const n = randInt(0, 100);
    return { prompt: `Crea <code>n = ${n}</code>. En una sola línea, usando ternarios anidados, imprime <code>"alto"</code> si <code>n > 70</code>, <code>"medio"</code> si <code>n > 30</code>, o <code>"bajo"</code> en otro caso: <code>print("alto" if n > 70 else ("medio" if n > 30 else "bajo"))</code>.`,
      code: `var n = ${n}\nprint("alto" if n > 70 else ("medio" if n > 30 else "bajo"))` };
  } },
  { id: 'variables-22', difficulty: 'dificil', title: 'Formatear con %', build: () => {
    const nombre = pickRandom(['Ana', 'Kai', 'Sol']);
    const puntos = randInt(1, 999);
    return { prompt: `Crea <code>nombre = "${nombre}"</code> y <code>puntos = ${puntos}</code>. Imprime <code>"%s tiene %d puntos" % [nombre, puntos]</code>.`,
      code: `var nombre = "${nombre}"\nvar puntos = ${puntos}\nprint("%s tiene %d puntos" % [nombre, puntos])` };
  } },
  { id: 'variables-23', difficulty: 'dificil', title: 'Repartir un array en variables', build: () => {
    const a = randInt(1, 50), b = randInt(1, 50);
    return { prompt: `Crea <code>var x, y = [${a}, ${b}]</code> para repartir el array en dos variables de una sola vez. Imprime <code>x + y</code>.`,
      code: `var x, y = [${a}, ${b}]\nprint(x + y)` };
  } },
  { id: 'variables-24', difficulty: 'dificil', title: 'Lógica combinada con not', build: () => {
    const a = pickRandom([true, false]), b = pickRandom([true, false]);
    return { prompt: `Crea <code>a = ${a}</code> y <code>b = ${b}</code>. Imprime <code>not a and b or not b</code>.`,
      code: `var a = ${a}\nvar b = ${b}\nprint(not a and b or not b)` };
  } },
  { id: 'variables-25', difficulty: 'dificil', title: 'Truncar un decimal a entero', build: () => {
    const n = randFloat1(1, 99);
    return { prompt: `Crea <code>n = ${n}</code>. Imprime <code>int(n)</code> y observa cómo se trunca (no redondea) el decimal.`,
      code: `var n = ${n}\nprint(int(n))` };
  } },
  { id: 'variables-26', difficulty: 'dificil', title: 'Encadenar métodos de texto', build: () => {
    const frase = pickRandom(['hola mundo', 'gdscript es genial', 'godot engine']);
    return { prompt: `Crea <code>frase = "${frase}"</code>. Imprime <code>frase.to_upper().substr(0, 5)</code> (mayúsculas y luego los primeros 5 caracteres).`,
      code: `var frase = "${frase}"\nprint(frase.to_upper().substr(0, 5))` };
  } },
  { id: 'variables-27', difficulty: 'dificil', title: 'Comparar tipos distintos', build: () => {
    const n = randInt(1, 20);
    return { prompt: `Crea <code>n = ${n}</code> y <code>texto = "${n}"</code>. Imprime <code>typeof(n) == typeof(texto)</code>.`,
      code: `var n = ${n}\nvar texto = "${n}"\nprint(typeof(n) == typeof(texto))` };
  } },
  { id: 'variables-28', difficulty: 'dificil', title: 'Separar y volver a unir texto', build: () => {
    const frase = pickRandom(['uno dos tres', 'sol luna estrella', 'rojo verde azul']);
    return { prompt: `Crea <code>frase = "${frase}"</code>. Usa <code>frase.split(" ")</code> para separarla en palabras, guarda el resultado en <code>partes</code>, y luego imprime <code>partes.join("-")</code>.`,
      code: `var frase = "${frase}"\nvar partes = frase.split(" ")\nprint(partes.join("-"))` };
  } },
  { id: 'variables-29', difficulty: 'dificil', title: 'Máximo de un conjunto', build: () => {
    const a = randInt(1, 30), b = randInt(1, 30), c = randInt(1, 30);
    return { prompt: `Crea <code>a = ${a}</code>, <code>b = ${b}</code> y <code>c = ${c}</code>. Imprime <code>max(a, b, c)</code>.`,
      code: `var a = ${a}\nvar b = ${b}\nvar c = ${c}\nprint(max(a, b, c))` };
  } },
  { id: 'variables-30', difficulty: 'dificil', title: 'Precedencia de operadores', build: () => {
    const a = randInt(2, 9), b = randInt(2, 9), c = randInt(2, 9);
    return { prompt: `Crea <code>a = ${a}</code>, <code>b = ${b}</code> y <code>c = ${c}</code>. Imprime <code>a + b * c - a % b</code> (respetando la precedencia de operadores).`,
      code: `var a = ${a}\nvar b = ${b}\nvar c = ${c}\nprint(a + b * c - a % b)` };
  } },

  // ---- new experto (10) ----
  { id: 'variables-31', difficulty: 'experto', title: 'Diccionario anidado en una variable', build: () => {
    const nombre = pickRandom(['Rex', 'Nova', 'Zeta']);
    const nivel = randInt(1, 20);
    return { prompt: `Crea <code>heroe = {"nombre": "${nombre}", "stats": {"nivel": ${nivel}}}</code>. Imprime <code>heroe["stats"]["nivel"]</code>.`,
      code: `var heroe = {"nombre": "${nombre}", "stats": {"nivel": ${nivel}}}\nprint(heroe["stats"]["nivel"])` };
  } },
  { id: 'variables-32', difficulty: 'experto', title: 'Array dentro de un array', build: () => {
    const a = randInt(1, 9), b = randInt(1, 9);
    return { prompt: `Crea <code>tablero = [[1, 2], [${a}, ${b}]]</code>. Imprime <code>tablero[1][1]</code>.`,
      code: `var tablero = [[1, 2], [${a}, ${b}]]\nprint(tablero[1][1])` };
  } },
  { id: 'variables-33', difficulty: 'experto', title: 'Guardar una función en una variable', build: () => {
    const a = randInt(1, 9), b = randInt(1, 9), c = randInt(1, 9);
    return { prompt: `Crea una función <code>doblar(n):</code> que retorne <code>n * 2</code>. Crea <code>operacion = doblar</code> (sin paréntesis, para guardar la función en la variable) y un array <code>numeros = [${a}, ${b}, ${c}]</code>. Imprime <code>numeros.map(operacion)</code>.`,
      code: `func doblar(n):\n    return n * 2\nvar operacion = doblar\nvar numeros = [${a}, ${b}, ${c}]\nprint(numeros.map(operacion))` };
  } },
  { id: 'variables-34', difficulty: 'experto', title: 'Conversión mixta con texto', build: () => {
    const flag = pickRandom([true, false]);
    const val = randFloat1(1, 9);
    return { prompt: `Crea <code>activo = ${flag}</code> y <code>medida = ${val}</code>. Imprime <code>str(activo) + " / " + str(medida)</code>.`,
      code: `var activo = ${flag}\nvar medida = ${val}\nprint(str(activo) + " / " + str(medida))` };
  } },
  { id: 'variables-35', difficulty: 'experto', title: 'Orden de evaluación con reasignación', build: () => {
    const inicio = randInt(1, 10);
    return { prompt: `Crea <code>x = ${inicio}</code>. Imprime <code>x</code>, luego haz <code>x = x + x</code> e imprímela de nuevo, y finalmente haz <code>x = x * x</code> e imprímela una tercera vez (tres <code>print()</code> distintos).`,
      code: `var x = ${inicio}\nprint(x)\nx = x + x\nprint(x)\nx = x * x\nprint(x)` };
  } },
  { id: 'variables-36', difficulty: 'experto', title: 'Texto con salto de línea', build: () => {
    const a = pickRandom(['Fuego', 'Hielo', 'Rayo']);
    const b = pickRandom(['Ataque', 'Defensa', 'Velocidad']);
    return { prompt: `Crea <code>linea = "${a}\\n${b}"</code> (usando <code>\\n</code> como salto de línea dentro del texto). Imprímela con un solo <code>print(linea)</code>.`,
      code: `var linea = "${a}\\n${b}"\nprint(linea)` };
  } },
  { id: 'variables-37', difficulty: 'experto', title: 'Valor absoluto de una resta', build: () => {
    const a = randInt(1, 100), b = randInt(1, 100);
    return { prompt: `Crea <code>a = ${a}</code> y <code>b = ${b}</code>. Imprime <code>abs(a - b)</code> (la distancia entre ambos, sin importar cuál es mayor).`,
      code: `var a = ${a}\nvar b = ${b}\nprint(abs(a - b))` };
  } },
  { id: 'variables-38', difficulty: 'experto', title: 'Comparación encadenada con and/or', build: () => {
    const edad = randInt(0, 100);
    const tieneEntrada = pickRandom([true, false]);
    return { prompt: `Crea <code>edad = ${edad}</code> y <code>tiene_entrada = ${tieneEntrada}</code>. Imprime <code>(edad >= 18 or tiene_entrada) and edad < 90</code>.`,
      code: `var edad = ${edad}\nvar tiene_entrada = ${tieneEntrada}\nprint((edad >= 18 or tiene_entrada) and edad < 90)` };
  } },
  { id: 'variables-39', difficulty: 'experto', title: 'Reemplazar texto', build: () => {
    const opciones = [
      { original: 'gato negro', buscar: 'negro', reemplazo: 'blanco' },
      { original: 'perro café', buscar: 'café', reemplazo: 'gris' },
      { original: 'ave azul', buscar: 'azul', reemplazo: 'roja' },
    ];
    const { original, buscar, reemplazo } = pickRandom(opciones);
    return { prompt: `Crea <code>texto = "${original}"</code>. Imprime <code>texto.replace("${buscar}", "${reemplazo}")</code>.`,
      code: `var texto = "${original}"\nprint(texto.replace("${buscar}", "${reemplazo}"))` };
  } },
  { id: 'variables-40', difficulty: 'experto', title: 'Piso y techo combinados', build: () => {
    const n = randFloat1(1, 50);
    return { prompt: `Crea <code>n = ${n}</code>. Imprime <code>ceil(n) - floor(n)</code>.`,
      code: `var n = ${n}\nprint(ceil(n) - floor(n))` };
  } },

  // ---- new maestro (10) ----
  { id: 'variables-41', difficulty: 'maestro', title: 'Cadena de conversiones', build: () => {
    const n = randInt(1, 50);
    return { prompt: `Crea <code>n = ${n}</code>. Imprime <code>int(str(float(n)))</code> (convierte a decimal, luego a texto, y de vuelta a entero).`,
      code: `var n = ${n}\nprint(int(str(float(n))))` };
  } },
  { id: 'variables-42', difficulty: 'maestro', title: 'Diccionario con array y acceso a método', build: () => {
    const items = pickRandom([['espada', 'escudo'], ['poción', 'mapa'], ['arco', 'flecha']]);
    return { prompt: `Crea <code>mochila = {"objetos": ["${items[0]}", "${items[1]}"], "peso": 5}</code>. Imprime <code>mochila["objetos"].size() + mochila["peso"]</code>.`,
      code: `var mochila = {"objetos": ["${items[0]}", "${items[1]}"], "peso": 5}\nprint(mochila["objetos"].size() + mochila["peso"])` };
  } },
  { id: 'variables-43', difficulty: 'maestro', title: 'Ternario dentro de un formateo', build: () => {
    const vida = randInt(0, 100);
    return { prompt: `Crea <code>vida = ${vida}</code>. Imprime <code>"Estado: %s" % ["vivo" if vida > 0 else "muerto"]</code>.`,
      code: `var vida = ${vida}\nprint("Estado: %s" % ["vivo" if vida > 0 else "muerto"])` };
  } },
  { id: 'variables-44', difficulty: 'maestro', title: 'Reasignar usando su propio valor formateado', build: () => {
    const base = randInt(1, 20);
    return { prompt: `Crea <code>puntaje = ${base}</code>. Reasígnala así: <code>puntaje = puntaje * 2 - 1</code>. Imprime <code>"Puntaje final: " + str(puntaje)</code>.`,
      code: `var puntaje = ${base}\npuntaje = puntaje * 2 - 1\nprint("Puntaje final: " + str(puntaje))` };
  } },
  { id: 'variables-45', difficulty: 'maestro', title: 'Múltiples condiciones booleanas combinadas', build: () => {
    const a = randInt(0, 20), b = randInt(0, 20), c = randInt(0, 20);
    return { prompt: `Crea <code>a = ${a}</code>, <code>b = ${b}</code> y <code>c = ${c}</code>. Imprime <code>(a > b and b > c) or (a == c and not (a > b))</code>.`,
      code: `var a = ${a}\nvar b = ${b}\nvar c = ${c}\nprint((a > b and b > c) or (a == c and not (a > b)))` };
  } },
  { id: 'variables-46', difficulty: 'maestro', title: 'Repartir y recombinar valores', build: () => {
    const a = randInt(1, 20), b = randInt(1, 20), c = randInt(1, 20);
    return { prompt: `Crea <code>var x, y, z = [${a}, ${b}, ${c}]</code>. Imprime <code>(x + y + z) / 3</code> (el promedio, como división entera).`,
      code: `var x, y, z = [${a}, ${b}, ${c}]\nprint((x + y + z) / 3)` };
  } },
  { id: 'variables-47', difficulty: 'maestro', title: 'Texto anidado con formateo múltiple', build: () => {
    const nombre = pickRandom(['Iris', 'Draco', 'Nyx']);
    const nivel = randInt(1, 99);
    const clase = pickRandom(['Mago', 'Guerrero', 'Arquero']);
    return { prompt: `Crea <code>nombre = "${nombre}"</code>, <code>nivel = ${nivel}</code> y <code>clase = "${clase}"</code>. Imprime <code>"%s (Nv. %d) - %s" % [nombre, nivel, clase]</code>.`,
      code: `var nombre = "${nombre}"\nvar nivel = ${nivel}\nvar clase = "${clase}"\nprint("%s (Nv. %d) - %s" % [nombre, nivel, clase])` };
  } },
  { id: 'variables-48', difficulty: 'maestro', title: 'Filtrar con una función guardada en variable', build: () => {
    const vals = [randInt(-10, -1), randInt(1, 10), randInt(-10, -1), randInt(1, 10)];
    return { prompt: `Crea <code>es_positivo(n):</code> que retorne <code>n > 0</code>. Crea <code>verificador = es_positivo</code> y <code>numeros = [${vals.join(', ')}]</code>. Imprime <code>numeros.filter(verificador)</code>.`,
      code: `func es_positivo(n):\n    return n > 0\nvar verificador = es_positivo\nvar numeros = [${vals.join(', ')}]\nprint(numeros.filter(verificador))` };
  } },
  { id: 'variables-49', difficulty: 'maestro', title: 'Encadenar substr, to_upper y longitud', build: () => {
    const frase = pickRandom(['el dragón vuela alto', 'la princesa lee libros', 'el mago lanza hechizos']);
    return { prompt: `Crea <code>frase = "${frase}"</code>. Imprime <code>frase.substr(3, 6).to_upper().length()</code>.`,
      code: `var frase = "${frase}"\nprint(frase.substr(3, 6).to_upper().length())` };
  } },
  { id: 'variables-50', difficulty: 'maestro', title: 'Tres variables, dos condiciones ternarias', build: () => {
    const hp = randInt(0, 100), mp = randInt(0, 100);
    return { prompt: `Crea <code>hp = ${hp}</code> y <code>mp = ${mp}</code>. Imprime en una sola línea: <code>print("HP:", "bajo" if hp < 30 else "ok", " MP:", "bajo" if mp < 30 else "ok")</code>.`,
      code: `var hp = ${hp}\nvar mp = ${mp}\nprint("HP:", "bajo" if hp < 30 else "ok", " MP:", "bajo" if mp < 30 else "ok")` };
  } },
];

const condicionalesGenerators = [
  // ---- migrated originals ----
  { id: 'condicionales-mayor-menor', difficulty: 'facil', title: 'Comparar con un número', build: () => {
    const num = randInt(1, 50); const umbral = randInt(1, 50);
    return { prompt: `Crea <code>num = ${num}</code>. Si <code>num</code> es mayor que ${umbral}, imprime <code>"Mayor"</code>. Si no, imprime <code>"Menor o igual"</code>.`,
      code: `var num = ${num}\nif num > ${umbral}:\n    print("Mayor")\nelse:\n    print("Menor o igual")` };
  } },
  { id: 'condicionales-signo', difficulty: 'medio', title: 'Positivo, negativo o cero', build: () => {
    const num = pickRandom([0, randInt(-30, -1), randInt(1, 30)]);
    return { prompt: `Crea <code>num = ${num}</code>. Usa <code>if/elif/else</code> para imprimir <code>"Positivo"</code> si es mayor que 0, <code>"Negativo"</code> si es menor que 0, o <code>"Cero"</code> si es igual.`,
      code: `var num = ${num}\nif num > 0:\n    print("Positivo")\nelif num < 0:\n    print("Negativo")\nelse:\n    print("Cero")` };
  } },
  { id: 'condicionales-par-impar', difficulty: 'facil', title: 'Par o impar', build: () => {
    const num = randInt(1, 100);
    return { prompt: `Crea <code>num = ${num}</code>. Imprime <code>"Par"</code> si <code>num % 2 == 0</code>, si no imprime <code>"Impar"</code>.`,
      code: `var num = ${num}\nif num % 2 == 0:\n    print("Par")\nelse:\n    print("Impar")` };
  } },
  { id: 'condicionales-rango-edad', difficulty: 'medio', title: 'Rango de edad', build: () => {
    const edad = randInt(1, 90);
    return { prompt: `Crea <code>edad = ${edad}</code>. Con <code>if/elif/else</code> imprime <code>"Niño"</code> si es menor a 13, <code>"Adolescente"</code> si es menor a 18, <code>"Adulto"</code> si es menor a 65, o <code>"Adulto mayor"</code> en cualquier otro caso.`,
      code: `var edad = ${edad}\nif edad < 13:\n    print("Niño")\nelif edad < 18:\n    print("Adolescente")\nelif edad < 65:\n    print("Adulto")\nelse:\n    print("Adulto mayor")` };
  } },
  { id: 'condicionales-nota-aprobatoria', difficulty: 'facil', title: 'Nota aprobatoria', build: () => {
    const nota = randFloat1(2, 10);
    return { prompt: `Crea <code>nota = ${nota}</code>. Imprime <code>"Aprobado"</code> si <code>nota >= 6</code>, si no imprime <code>"Reprobado"</code>.`,
      code: `var nota = ${nota}\nif nota >= 6:\n    print("Aprobado")\nelse:\n    print("Reprobado")` };
  } },
  { id: 'condicionales-multiplo', difficulty: 'medio', title: 'Múltiplo de 3 y 5', build: () => {
    const num = pickRandom([15, 30, 45, 60, randInt(1, 60)]);
    return { prompt: `Crea <code>num = ${num}</code>. Si es múltiplo de 3 <b>y</b> de 5 imprime <code>"FizzBuzz"</code>, si no imprime <code>"No"</code>.`,
      code: `var num = ${num}\nif num % 3 == 0 and num % 5 == 0:\n    print("FizzBuzz")\nelse:\n    print("No")` };
  } },
  { id: 'condicionales-comparar-strings', difficulty: 'facil', title: 'Comparar strings', build: () => {
    const nombres = ['Ana', 'Leo', 'Sol', 'Kai', 'Mia', 'Tom'];
    const nombre = pickRandom(nombres); const objetivo = pickRandom(nombres);
    return { prompt: `Crea <code>nombre = "${nombre}"</code>. Si <code>nombre == "${objetivo}"</code> imprime <code>"Coincide"</code>, si no imprime <code>"No coincide"</code>.`,
      code: `var nombre = "${nombre}"\nif nombre == "${objetivo}":\n    print("Coincide")\nelse:\n    print("No coincide")` };
  } },
  { id: 'condicionales-validar-rango', difficulty: 'medio', title: 'Validar rango', build: () => {
    const x = pickRandom([randInt(1, 100), randInt(-20, 0), randInt(101, 130)]);
    return { prompt: `Crea <code>x = ${x}</code>. Si <code>x</code> está entre 1 y 100 (inclusive) imprime <code>"En rango"</code>, si no imprime <code>"Fuera de rango"</code>.`,
      code: `var x = ${x}\nif x >= 1 and x <= 100:\n    print("En rango")\nelse:\n    print("Fuera de rango")` };
  } },
  { id: 'condicionales-negar', difficulty: 'dificil', title: 'Negar una condición', build: () => {
    const n = pickRandom([0, 0, randInt(1, 20)]);
    return { prompt: `Crea <code>n = ${n}</code>. Usa <code>not n</code> en un <code>if</code> para imprimir <code>"Es cero"</code> si <code>n</code> es "falsy", si no imprime <code>"No es cero"</code>.`,
      code: `var n = ${n}\nif not n:\n    print("Es cero")\nelse:\n    print("No es cero")` };
  } },
  { id: 'condicionales-categoria-nota', difficulty: 'medio', title: 'Categoría de nota', build: () => {
    const nota = randInt(0, 100);
    return { prompt: `Crea <code>nota = ${nota}</code>. Con <code>if/elif/elif/else</code> imprime <code>"A"</code> (>=90), <code>"B"</code> (>=80), <code>"C"</code> (>=70) o <code>"D"</code>.`,
      code: `var nota = ${nota}\nif nota >= 90:\n    print("A")\nelif nota >= 80:\n    print("B")\nelif nota >= 70:\n    print("C")\nelse:\n    print("D")` };
  } },

  // ---- new facil (6) ----
  { id: 'condicionales-11', difficulty: 'facil', title: 'Es mayor de edad', build: () => {
    const edad = randInt(1, 99);
    return { prompt: `Crea <code>edad = ${edad}</code>. Imprime <code>"Mayor de edad"</code> si <code>edad >= 18</code>, si no imprime <code>"Menor de edad"</code>.`,
      code: `var edad = ${edad}\nif edad >= 18:\n    print("Mayor de edad")\nelse:\n    print("Menor de edad")` };
  } },
  { id: 'condicionales-12', difficulty: 'facil', title: 'Contraseña correcta', build: () => {
    const opciones = ['1234', 'clave', 'abcd', 'admin'];
    const real = pickRandom(opciones); const ingresada = pickRandom(opciones);
    return { prompt: `Crea <code>real = "${real}"</code> e <code>ingresada = "${ingresada}"</code>. Si son iguales imprime <code>"Acceso concedido"</code>, si no <code>"Acceso denegado"</code>.`,
      code: `var real = "${real}"\nvar ingresada = "${ingresada}"\nif real == ingresada:\n    print("Acceso concedido")\nelse:\n    print("Acceso denegado")` };
  } },
  { id: 'condicionales-13', difficulty: 'facil', title: 'Número dentro de un array', build: () => {
    const lista = [randInt(1, 20), randInt(1, 20), randInt(1, 20)];
    const buscado = pickRandom([...lista, randInt(21, 30)]);
    return { prompt: `Crea <code>lista = [${lista.join(', ')}]</code> y <code>buscado = ${buscado}</code>. Si <code>lista.has(buscado)</code> imprime <code>"Está"</code>, si no <code>"No está"</code>.`,
      code: `var lista = [${lista.join(', ')}]\nvar buscado = ${buscado}\nif lista.has(buscado):\n    print("Está")\nelse:\n    print("No está")` };
  } },
  { id: 'condicionales-14', difficulty: 'facil', title: 'Vida agotada', build: () => {
    const vida = randInt(0, 20);
    return { prompt: `Crea <code>vida = ${vida}</code>. Imprime <code>"Game Over"</code> si <code>vida <= 0</code>, si no imprime <code>"Sigue jugando"</code>.`,
      code: `var vida = ${vida}\nif vida <= 0:\n    print("Game Over")\nelse:\n    print("Sigue jugando")` };
  } },
  { id: 'condicionales-15', difficulty: 'facil', title: 'Temperatura de congelación', build: () => {
    const temp = randInt(-10, 30);
    return { prompt: `Crea <code>temp = ${temp}</code>. Imprime <code>"Se congela"</code> si <code>temp <= 0</code>, si no imprime <code>"No se congela"</code>.`,
      code: `var temp = ${temp}\nif temp <= 0:\n    print("Se congela")\nelse:\n    print("No se congela")` };
  } },
  { id: 'condicionales-16', difficulty: 'facil', title: 'Divisible por 4', build: () => {
    const num = randInt(1, 100);
    return { prompt: `Crea <code>num = ${num}</code>. Imprime <code>"Divisible"</code> si <code>num % 4 == 0</code>, si no <code>"No divisible"</code>.`,
      code: `var num = ${num}\nif num % 4 == 0:\n    print("Divisible")\nelse:\n    print("No divisible")` };
  } },

  // ---- new medio (5) ----
  { id: 'condicionales-17', difficulty: 'medio', title: 'Clasificar triángulo por lados', build: () => {
    const tipo = pickRandom(['equilatero', 'isoceles', 'escaleno']);
    let a, b, c;
    if (tipo === 'equilatero') { a = b = c = randInt(2, 10); }
    else if (tipo === 'isoceles') { a = b = randInt(2, 10); c = a + randInt(1, 3); }
    else { a = randInt(2, 6); b = a + randInt(1, 3); c = b + randInt(1, 3); }
    return { prompt: `Crea <code>a = ${a}</code>, <code>b = ${b}</code>, <code>c = ${c}</code>. Con <code>if/elif/else</code> imprime <code>"Equilátero"</code> si los tres son iguales, <code>"Isósceles"</code> si al menos dos son iguales, o <code>"Escaleno"</code> si todos son distintos.`,
      code: `var a = ${a}\nvar b = ${b}\nvar c = ${c}\nif a == b and b == c:\n    print("Equilátero")\nelif a == b or b == c or a == c:\n    print("Isósceles")\nelse:\n    print("Escaleno")` };
  } },
  { id: 'condicionales-18', difficulty: 'medio', title: 'Año bisiesto', build: () => {
    const anio = pickRandom([2000, 2020, 2024, 1900, 2023, 2100, randInt(1900, 2100)]);
    return { prompt: `Crea <code>anio = ${anio}</code>. Imprime <code>"Bisiesto"</code> si <code>(anio % 4 == 0 and anio % 100 != 0) or anio % 400 == 0</code>, si no imprime <code>"No bisiesto"</code>.`,
      code: `var anio = ${anio}\nif (anio % 4 == 0 and anio % 100 != 0) or anio % 400 == 0:\n    print("Bisiesto")\nelse:\n    print("No bisiesto")` };
  } },
  { id: 'condicionales-19', difficulty: 'medio', title: 'Descuento por cantidad', build: () => {
    const cantidad = randInt(1, 30);
    return { prompt: `Crea <code>cantidad = ${cantidad}</code>. Con <code>if/elif/else</code> imprime <code>"20% descuento"</code> si compra 10 o más, <code>"10% descuento"</code> si compra 5 o más, o <code>"Sin descuento"</code>.`,
      code: `var cantidad = ${cantidad}\nif cantidad >= 10:\n    print("20% descuento")\nelif cantidad >= 5:\n    print("10% descuento")\nelse:\n    print("Sin descuento")` };
  } },
  { id: 'condicionales-20', difficulty: 'medio', title: 'Rango de IMC simplificado', build: () => {
    const imc = randInt(15, 35);
    return { prompt: `Crea <code>imc = ${imc}</code>. Con <code>if/elif/elif/else</code> imprime <code>"Bajo peso"</code> (<18), <code>"Normal"</code> (<25), <code>"Sobrepeso"</code> (<30) o <code>"Obesidad"</code>.`,
      code: `var imc = ${imc}\nif imc < 18:\n    print("Bajo peso")\nelif imc < 25:\n    print("Normal")\nelif imc < 30:\n    print("Sobrepeso")\nelse:\n    print("Obesidad")` };
  } },
  { id: 'condicionales-21', difficulty: 'medio', title: 'Ambos positivos', build: () => {
    const a = randInt(-10, 10); const b = randInt(-10, 10);
    return { prompt: `Crea <code>a = ${a}</code> y <code>b = ${b}</code>. Imprime <code>"Ambos positivos"</code> si <code>a > 0 and b > 0</code>, si no imprime <code>"No ambos positivos"</code>.`,
      code: `var a = ${a}\nvar b = ${b}\nif a > 0 and b > 0:\n    print("Ambos positivos")\nelse:\n    print("No ambos positivos")` };
  } },

  // ---- new dificil (9) ----
  { id: 'condicionales-22', difficulty: 'dificil', title: 'Día de la semana laboral', build: () => {
    const dia = randInt(1, 7);
    return { prompt: `Crea <code>dia = ${dia}</code> (1=Lunes ... 7=Domingo). Imprime <code>"Fin de semana"</code> si <code>dia == 6 or dia == 7</code>, si no imprime <code>"Día laboral"</code>.`,
      code: `var dia = ${dia}\nif dia == 6 or dia == 7:\n    print("Fin de semana")\nelse:\n    print("Día laboral")` };
  } },
  { id: 'condicionales-23', difficulty: 'dificil', title: 'Match con números', build: () => {
    const n = randInt(1, 5);
    return { prompt: `Crea <code>n = ${n}</code>. Usa <code>match n:</code> con casos <code>1:</code>, <code>2:</code>, <code>3:</code> imprimiendo <code>"Uno"</code>, <code>"Dos"</code>, <code>"Tres"</code> respectivamente, y un caso <code>_:</code> que imprima <code>"Otro"</code>.`,
      code: `var n = ${n}\nmatch n:\n    1:\n        print("Uno")\n    2:\n        print("Dos")\n    3:\n        print("Tres")\n    _:\n        print("Otro")` };
  } },
  { id: 'condicionales-24', difficulty: 'dificil', title: 'Match con varios valores por caso', build: () => {
    const dia = randInt(1, 7);
    return { prompt: `Crea <code>dia = ${dia}</code>. Usa <code>match dia:</code> con un caso <code>1, 2, 3, 4, 5:</code> que imprima <code>"Semana"</code> y otro caso <code>6, 7:</code> que imprima <code>"Finde"</code>.`,
      code: `var dia = ${dia}\nmatch dia:\n    1, 2, 3, 4, 5:\n        print("Semana")\n    6, 7:\n        print("Finde")` };
  } },
  { id: 'condicionales-25', difficulty: 'dificil', title: 'Condición con paréntesis mixtos', build: () => {
    const a = randInt(0, 20); const b = randInt(0, 20); const c = randInt(0, 20);
    return { prompt: `Crea <code>a = ${a}</code>, <code>b = ${b}</code>, <code>c = ${c}</code>. Imprime <code>"Cumple"</code> si <code>(a > 10 or b > 10) and c > 5</code>, si no <code>"No cumple"</code>.`,
      code: `var a = ${a}\nvar b = ${b}\nvar c = ${c}\nif (a > 10 or b > 10) and c > 5:\n    print("Cumple")\nelse:\n    print("No cumple")` };
  } },
  { id: 'condicionales-26', difficulty: 'dificil', title: 'Clasificación de un carácter', build: () => {
    const c = pickRandom(['a', 'e', 'b', 'z', 'o', 'x']);
    const vocales = ['a', 'e', 'i', 'o', 'u'];
    return { prompt: `Crea <code>letra = "${c}"</code>. Imprime <code>"Vocal"</code> si <code>letra == "a" or letra == "e" or letra == "i" or letra == "o" or letra == "u"</code>, si no imprime <code>"Consonante"</code>.`,
      code: `var letra = "${c}"\nif letra == "a" or letra == "e" or letra == "i" or letra == "o" or letra == "u":\n    print("Vocal")\nelse:\n    print("Consonante")` };
  } },
  { id: 'condicionales-27', difficulty: 'dificil', title: 'Condición anidada (if dentro de if)', build: () => {
    const edad = randInt(1, 90); const tienePermiso = pickRandom([true, false]);
    return { prompt: `Crea <code>edad = ${edad}</code> y <code>tiene_permiso = ${tienePermiso}</code>. Si <code>edad >= 18</code>, evalúa (anidado) si <code>tiene_permiso</code> es verdadero para imprimir <code>"Puede entrar"</code>, o <code>"Necesita permiso"</code> si no. Si <code>edad < 18</code>, imprime <code>"No puede entrar"</code>.`,
      code: `var edad = ${edad}\nvar tiene_permiso = ${tienePermiso}\nif edad >= 18:\n    if tiene_permiso:\n        print("Puede entrar")\n    else:\n        print("Necesita permiso")\nelse:\n    print("No puede entrar")` };
  } },
  { id: 'condicionales-28', difficulty: 'dificil', title: 'Comparar longitudes de texto', build: () => {
    const a = pickRandom(['sol', 'luna', 'estrellas', 'cielo']);
    const b = pickRandom(['sol', 'luna', 'estrellas', 'cielo']);
    return { prompt: `Crea <code>a = "${a}"</code> y <code>b = "${b}"</code>. Imprime <code>"a es más larga"</code> si <code>a.length() > b.length()</code>, <code>"b es más larga"</code> si es al revés, o <code>"Iguales"</code> si tienen la misma longitud.`,
      code: `var a = "${a}"\nvar b = "${b}"\nif a.length() > b.length():\n    print("a es más larga")\nelif b.length() > a.length():\n    print("b es más larga")\nelse:\n    print("Iguales")` };
  } },
  { id: 'condicionales-29', difficulty: 'dificil', title: 'Match con rango simulado', build: () => {
    const nota = randInt(0, 10);
    return { prompt: `Crea <code>nota = ${nota}</code>. Usa <code>match nota:</code> con casos <code>0, 1, 2, 3, 4:</code> para <code>"Reprobado"</code>, <code>5, 6:</code> para <code>"Suficiente"</code>, y <code>_:</code> para <code>"Bueno"</code>.`,
      code: `var nota = ${nota}\nmatch nota:\n    0, 1, 2, 3, 4:\n        print("Reprobado")\n    5, 6:\n        print("Suficiente")\n    _:\n        print("Bueno")` };
  } },
  { id: 'condicionales-30', difficulty: 'dificil', title: 'Verificar clave y nivel mínimo', build: () => {
    const nivel = randInt(1, 30); const clave = pickRandom(['oro', 'plata', 'bronce']);
    return { prompt: `Crea <code>nivel = ${nivel}</code> y <code>clave = "${clave}"</code>. Imprime <code>"Acceso VIP"</code> si <code>clave == "oro" and nivel >= 10</code>, si no imprime <code>"Acceso normal"</code>.`,
      code: `var nivel = ${nivel}\nvar clave = "${clave}"\nif clave == "oro" and nivel >= 10:\n    print("Acceso VIP")\nelse:\n    print("Acceso normal")` };
  } },

  // ---- new experto (10) ----
  { id: 'condicionales-31', difficulty: 'experto', title: 'Clasificar con dict y match', build: () => {
    const opcion = randInt(1, 4);
    return { prompt: `Crea <code>opciones = {1: "Espada", 2: "Escudo", 3: "Poción", 4: "Mapa"}</code> y <code>opcion = ${opcion}</code>. Usa <code>match opcion:</code> con casos <code>1, 2:</code> imprimiendo <code>"Equipo: " + opciones[opcion]</code>, y <code>_:</code> imprimiendo <code>"Objeto: " + opciones[opcion]</code>.`,
      code: `var opciones = {1: "Espada", 2: "Escudo", 3: "Poción", 4: "Mapa"}\nvar opcion = ${opcion}\nmatch opcion:\n    1, 2:\n        print("Equipo: " + opciones[opcion])\n    _:\n        print("Objeto: " + opciones[opcion])` };
  } },
  { id: 'condicionales-32', difficulty: 'experto', title: 'Validar dentro de un array de rangos', build: () => {
    const valores = [randInt(1, 100), randInt(1, 100), randInt(1, 100)];
    return { prompt: `Crea <code>valores = [${valores.join(', ')}]</code> y una lista vacía <code>validos = []</code>. Recorre <code>valores</code> con <code>for</code>; si el valor es <code>>= 50</code>, agrégalo a <code>validos</code> con <code>.append()</code>. Al final imprime <code>validos</code>.`,
      code: `var valores = [${valores.join(', ')}]\nvar validos = []\nfor v in valores:\n    if v >= 50:\n        validos.append(v)\nprint(validos)` };
  } },
  { id: 'condicionales-33', difficulty: 'experto', title: 'Condición con enum', build: () => {
    const idx = randInt(0, 2);
    return { prompt: `Crea <code>enum Estado { IDLE, CORRIENDO, SALTANDO }</code> y <code>actual = ${idx}</code>. Imprime <code>"En movimiento"</code> si <code>actual == Estado.CORRIENDO or actual == Estado.SALTANDO</code>, si no imprime <code>"Quieto"</code>.`,
      code: `enum Estado { IDLE, CORRIENDO, SALTANDO }\nvar actual = ${idx}\nif actual == Estado.CORRIENDO or actual == Estado.SALTANDO:\n    print("En movimiento")\nelse:\n    print("Quieto")` };
  } },
  { id: 'condicionales-34', difficulty: 'experto', title: 'Condicional dentro de una función', build: () => {
    const n = randInt(-20, 20);
    return { prompt: `Crea una función <code>clasificar(n):</code> que retorne <code>"cero"</code> si <code>n == 0</code>, <code>"positivo"</code> si <code>n > 0</code>, o <code>"negativo"</code> si no. Imprime <code>clasificar(${n})</code>.`,
      code: `func clasificar(n):\n    if n == 0:\n        return "cero"\n    elif n > 0:\n        return "positivo"\n    else:\n        return "negativo"\nprint(clasificar(${n}))` };
  } },
  { id: 'condicionales-35', difficulty: 'experto', title: 'Verificar clave en diccionario antes de usarla', build: () => {
    const stock = { manzana: randInt(0, 10), pera: randInt(0, 10) };
    const buscado = pickRandom(['manzana', 'pera', 'uva']);
    return { prompt: `Crea <code>stock = {"manzana": ${stock.manzana}, "pera": ${stock.pera}}</code> y <code>producto = "${buscado}"</code>. Si <code>stock.has(producto)</code> imprime <code>stock[producto]</code>, si no imprime <code>"No existe"</code>.`,
      code: `var stock = {"manzana": ${stock.manzana}, "pera": ${stock.pera}}\nvar producto = "${buscado}"\nif stock.has(producto):\n    print(stock[producto])\nelse:\n    print("No existe")` };
  } },
  { id: 'condicionales-36', difficulty: 'experto', title: 'Condición con tamaño de array', build: () => {
    const n = randInt(1, 6);
    const items = Array.from({ length: n }, () => randInt(1, 20));
    return { prompt: `Crea <code>items = [${items.join(', ')}]</code>. Imprime <code>"Inventario lleno"</code> si <code>items.size() >= 5</code>, si no imprime <code>"Hay espacio"</code>.`,
      code: `var items = [${items.join(', ')}]\nif items.size() >= 5:\n    print("Inventario lleno")\nelse:\n    print("Hay espacio")` };
  } },
  { id: 'condicionales-37', difficulty: 'experto', title: 'Condición combinando funciones', build: () => {
    const n = randInt(1, 50);
    return { prompt: `Crea una función <code>es_par(n):</code> que retorne <code>n % 2 == 0</code>. Crea <code>num = ${n}</code>. Imprime <code>"Par y mayor a 10"</code> si <code>es_par(num) and num > 10</code>, si no imprime <code>"No cumple"</code>.`,
      code: `func es_par(n):\n    return n % 2 == 0\nvar num = ${n}\nif es_par(num) and num > 10:\n    print("Par y mayor a 10")\nelse:\n    print("No cumple")` };
  } },
  { id: 'condicionales-38', difficulty: 'experto', title: 'Match con clases de daño', build: () => {
    const tipo = pickRandom(['fuego', 'agua', 'planta']);
    return { prompt: `Crea <code>tipo = "${tipo}"</code>. Usa <code>match tipo:</code> con casos <code>"fuego":</code>, <code>"agua":</code>, <code>"planta":</code> que impriman <code>"Débil contra agua"</code>, <code>"Débil contra planta"</code>, <code>"Débil contra fuego"</code> respectivamente.`,
      code: `var tipo = "${tipo}"\nmatch tipo:\n    "fuego":\n        print("Débil contra agua")\n    "agua":\n        print("Débil contra planta")\n    "planta":\n        print("Débil contra fuego")` };
  } },
  { id: 'condicionales-39', difficulty: 'experto', title: 'Doble condición con distintas variables', build: () => {
    const hp = randInt(0, 100); const mp = randInt(0, 100); const escudo = pickRandom([true, false]);
    return { prompt: `Crea <code>hp = ${hp}</code>, <code>mp = ${mp}</code> y <code>escudo = ${escudo}</code>. Imprime <code>"Sobrevive"</code> si <code>hp > 0 and (mp > 20 or escudo)</code>, si no <code>"Derrotado"</code>.`,
      code: `var hp = ${hp}\nvar mp = ${mp}\nvar escudo = ${escudo}\nif hp > 0 and (mp > 20 or escudo):\n    print("Sobrevive")\nelse:\n    print("Derrotado")` };
  } },
  { id: 'condicionales-40', difficulty: 'experto', title: 'Clasificación de string vacío', build: () => {
    const texto = pickRandom(['', 'hola', '', 'mundo']);
    return { prompt: `Crea <code>texto = "${texto}"</code>. Imprime <code>"Vacío"</code> si <code>not texto</code>, si no imprime <code>"Tiene contenido"</code>.`,
      code: `var texto = "${texto}"\nif not texto:\n    print("Vacío")\nelse:\n    print("Tiene contenido")` };
  } },

  // ---- new maestro (10) ----
  { id: 'condicionales-41', difficulty: 'maestro', title: 'Sistema de rangos con match y función', build: () => {
    const puntos = randInt(0, 3000);
    return { prompt: `Crea una función <code>rango(puntos):</code> que use <code>match</code>: si <code>puntos / 1000 == 0</code> retorna <code>"Bronce"</code>, si es <code>1</code> retorna <code>"Plata"</code>, si es <code>2</code> retorna <code>"Oro"</code>, de otro modo <code>"Platino"</code> (usa <code>_:</code>). Imprime <code>rango(${puntos})</code>.`,
      code: `func rango(puntos):\n    match puntos / 1000:\n        0:\n            return "Bronce"\n        1:\n            return "Plata"\n        2:\n            return "Oro"\n        _:\n            return "Platino"\nprint(rango(${puntos}))` };
  } },
  { id: 'condicionales-42', difficulty: 'maestro', title: 'Filtrar y clasificar en un solo flujo', build: () => {
    const n = randInt(3, 6);
    const nums = Array.from({ length: n }, () => randInt(-10, 10));
    return { prompt: `Crea <code>numeros = [${nums.join(', ')}]</code>, <code>pares_pos = []</code> y <code>impares_neg = []</code>. Recorre <code>numeros</code>: si es par y positivo agrégalo a <code>pares_pos</code>; si es impar y negativo agrégalo a <code>impares_neg</code>. Imprime primero <code>pares_pos</code> y luego <code>impares_neg</code>.`,
      code: `var numeros = [${nums.join(', ')}]\nvar pares_pos = []\nvar impares_neg = []\nfor n in numeros:\n    if n % 2 == 0 and n > 0:\n        pares_pos.append(n)\n    elif n % 2 != 0 and n < 0:\n        impares_neg.append(n)\nprint(pares_pos)\nprint(impares_neg)` };
  } },
  { id: 'condicionales-43', difficulty: 'maestro', title: 'Condición con clase y método', build: () => {
    const vida = randInt(0, 100);
    return { prompt: `Crea <code>class Personaje:</code> con <code>var vida = ${vida}</code> y un método <code>esta_vivo():</code> que retorne <code>self.vida > 0</code>. Instancia <code>p = Personaje.new()</code>. Imprime <code>"Vivo"</code> si <code>p.esta_vivo()</code>, si no <code>"Muerto"</code>.`,
      code: `class Personaje:\n    var vida = ${vida}\n    func esta_vivo():\n        return self.vida > 0\nvar p = Personaje.new()\nif p.esta_vivo():\n    print("Vivo")\nelse:\n    print("Muerto")` };
  } },
  { id: 'condicionales-44', difficulty: 'maestro', title: 'Match anidado dentro de un for', build: () => {
    const n = randInt(3, 5);
    const vals = Array.from({ length: n }, () => randInt(1, 3));
    return { prompt: `Crea <code>valores = [${vals.join(', ')}]</code>. Recorre con <code>for</code> y usa <code>match v:</code> dentro del bucle con casos <code>1:</code>, <code>2:</code>, <code>3:</code> imprimiendo <code>"Uno"</code>, <code>"Dos"</code>, <code>"Tres"</code> respectivamente.`,
      code: `var valores = [${vals.join(', ')}]\nfor v in valores:\n    match v:\n        1:\n            print("Uno")\n        2:\n            print("Dos")\n        3:\n            print("Tres")` };
  } },
  { id: 'condicionales-45', difficulty: 'maestro', title: 'Combinar condición, diccionario y formateo', build: () => {
    const jugador = { nombre: pickRandom(['Kai', 'Mia', 'Leo']), vida: randInt(0, 100) };
    return { prompt: `Crea <code>jugador = {"nombre": "${jugador.nombre}", "vida": ${jugador.vida}}</code>. Si <code>jugador["vida"] > 50</code> imprime <code>"%s está bien" % jugador["nombre"]</code>, si no imprime <code>"%s necesita ayuda" % jugador["nombre"]</code>.`,
      code: `var jugador = {"nombre": "${jugador.nombre}", "vida": ${jugador.vida}}\nif jugador["vida"] > 50:\n    print("%s está bien" % jugador["nombre"])\nelse:\n    print("%s necesita ayuda" % jugador["nombre"])` };
  } },
  { id: 'condicionales-46', difficulty: 'maestro', title: 'Triple condición con break', build: () => {
    const objetivo = randInt(1, 20);
    const lista = [randInt(1, 20), randInt(1, 20), objetivo, randInt(1, 20)];
    return { prompt: `Crea <code>lista = [${lista.join(', ')}]</code> y <code>objetivo = ${objetivo}</code>. Recorre <code>lista</code> con <code>for</code>; si encuentras un valor igual a <code>objetivo</code>, imprime <code>"Encontrado"</code> y sal del bucle con <code>break</code>. Si el bucle termina sin usar <code>break</code>, el programa no imprimirá nada extra (no necesitas manejar ese caso).`,
      code: `var lista = [${lista.join(', ')}]\nvar objetivo = ${objetivo}\nfor v in lista:\n    if v == objetivo:\n        print("Encontrado")\n        break` };
  } },
  { id: 'condicionales-47', difficulty: 'maestro', title: 'Herencia con condición sobre el método', build: () => {
    const esGato = pickRandom([true, false]);
    const clase = esGato ? 'Gato' : 'Perro';
    return { prompt: `Crea <code>class Animal:</code> con método <code>sonido():</code> que retorne <code>"..."</code>. Crea <code>class Gato:</code> con <code>extends Animal</code> que sobrescriba <code>sonido()</code> para retornar <code>"Miau"</code>, y <code>class Perro:</code> con <code>extends Animal</code> que retorne <code>"Guau"</code>. Instancia <code>a = ${clase}.new()</code>. Imprime <code>"Es un gato"</code> si <code>a.sonido() == "Miau"</code>, si no imprime <code>"No es un gato"</code>.`,
      code: `class Animal:\n    func sonido():\n        return "..."\nclass Gato:\n    extends Animal\n    func sonido():\n        return "Miau"\nclass Perro:\n    extends Animal\n    func sonido():\n        return "Guau"\nvar a = ${clase}.new()\nif a.sonido() == "Miau":\n    print("Es un gato")\nelse:\n    print("No es un gato")` };
  } },
  { id: 'condicionales-48', difficulty: 'maestro', title: 'Validación compuesta con reduce', build: () => {
    const n = randInt(3, 5);
    const nums = Array.from({ length: n }, () => randInt(1, 20));
    return { prompt: `Crea <code>numeros = [${nums.join(', ')}]</code>. Crea una función <code>sumar(a, b):</code> que retorne <code>a + b</code>. Usa <code>numeros.reduce(sumar)</code> para obtener el total en <code>total</code>. Imprime <code>"Alto"</code> si <code>total > 30</code>, si no <code>"Bajo"</code>.`,
      code: `var numeros = [${nums.join(', ')}]\nfunc sumar(a, b):\n    return a + b\nvar total = numeros.reduce(sumar)\nif total > 30:\n    print("Alto")\nelse:\n    print("Bajo")` };
  } },
  { id: 'condicionales-49', difficulty: 'maestro', title: 'Señal disparada bajo condición compuesta', build: () => {
    const vida = randInt(1, 20); const dano = randInt(1, 25);
    return { prompt: `Crea <code>signal murio</code> y <code>vida = ${vida}</code>. Crea <code>func on_murio():</code> que imprima <code>"Game Over"</code> y conéctala a <code>murio</code>. Crea <code>func recibir_dano(cantidad):</code> que reste <code>cantidad</code> de <code>vida</code> (usando <code>vida</code> como variable global) y, si <code>vida <= 0</code>, emita <code>murio</code>; si no, imprima <code>"Vida restante: " + str(vida)</code>. Llama <code>recibir_dano(${dano})</code>.`,
      code: `signal murio\nvar vida = ${vida}\nfunc on_murio():\n    print("Game Over")\nmurio.connect(on_murio)\nfunc recibir_dano(cantidad):\n    vida -= cantidad\n    if vida <= 0:\n        murio.emit()\n    else:\n        print("Vida restante: " + str(vida))\nrecibir_dano(${dano})` };
  } },
  { id: 'condicionales-50', difficulty: 'maestro', title: 'Clasificación completa de un personaje', build: () => {
    const clase = pickRandom(['Mago', 'Guerrero', 'Arquero']);
    const nivel = randInt(1, 50);
    return { prompt: `Crea <code>clase = "${clase}"</code> y <code>nivel = ${nivel}</code>. Usa <code>match clase:</code> con casos <code>"Mago":</code>, <code>"Guerrero":</code>, <code>"Arquero":</code> que impriman <code>"Ataque mágico"</code>, <code>"Ataque cuerpo a cuerpo"</code>, <code>"Ataque a distancia"</code> respectivamente. Luego, fuera del match, imprime <code>"Veterano"</code> si <code>nivel >= 30</code>, si no <code>"Novato"</code>.`,
      code: `var clase = "${clase}"\nvar nivel = ${nivel}\nmatch clase:\n    "Mago":\n        print("Ataque mágico")\n    "Guerrero":\n        print("Ataque cuerpo a cuerpo")\n    "Arquero":\n        print("Ataque a distancia")\nif nivel >= 30:\n    print("Veterano")\nelse:\n    print("Novato")` };
  } },
];

const buclesGenerators = [
  // ---- migrated originals ----
  { id: 'bucles-1', difficulty: 'facil', title: 'Contar del 1 al 5', build: () => ({
    prompt: 'Usa un <code>for</code> con <code>range()</code> para imprimir los números del 1 al 5, cada uno en su propia línea.',
    code: 'for i in range(1, 6):\n    print(i)' }) },
  { id: 'bucles-4', difficulty: 'facil', title: 'Pares con while', build: () => ({
    prompt: 'Usa un <code>while</code> para imprimir los números pares del 2 al 10 (2,4,6,8,10), cada uno en su propia línea.',
    code: 'var i = 2\nwhile i <= 10:\n    print(i)\n    i += 2' }) },
  { id: 'bucles-10', difficulty: 'facil', title: 'Recorrer un string', build: () => ({
    prompt: 'Crea <code>palabra = "sol"</code>. Usa un <code>for</code> para imprimir cada letra en su propia línea.',
    code: 'var palabra = "sol"\nfor letra in palabra:\n    print(letra)' }) },
  { id: 'bucles-2', difficulty: 'medio', title: 'Sumar del 1 al 10', build: () => ({
    prompt: 'Usa un <code>for</code> con <code>range()</code> para sumar los números del 1 al 10 en una variable <code>suma</code>, y al final imprime el resultado con un solo <code>print()</code>.',
    code: 'var suma = 0\nfor i in range(1, 11):\n    suma += i\nprint(suma)' }) },
  { id: 'bucles-3', difficulty: 'medio', title: 'Tabla del 3', build: () => ({
    prompt: 'Con un <code>for</code>, imprime la tabla del 3 del 1 al 5. Cada línea con <code>print(3, " x ", i, " = ", 3*i)</code>.',
    code: 'for i in range(1, 6):\n    print(3, " x ", i, " = ", 3*i)' }) },
  { id: 'bucles-5', difficulty: 'medio', title: 'Saltar múltiplos de 3', build: () => ({
    prompt: 'Usa un <code>for</code> con <code>range(1, 11)</code> y <code>continue</code> para imprimir todos los números del 1 al 10 excepto los múltiplos de 3.',
    code: 'for i in range(1, 11):\n    if i % 3 == 0:\n        continue\n    print(i)' }) },
  { id: 'bucles-6', difficulty: 'medio', title: 'Cuenta regresiva', build: () => ({
    prompt: 'Usa <code>range(5, 0, -1)</code> en un <code>for</code> para imprimir del 5 al 1, cada uno en su propia línea.',
    code: 'for i in range(5, 0, -1):\n    print(i)' }) },
  { id: 'bucles-8', difficulty: 'medio', title: 'Bucle anidado', build: () => ({
    prompt: 'Usa dos <code>for</code> anidados con <code>range(1, 3)</code> para imprimir <code>print(i, "-", j)</code> para cada combinación.',
    code: 'for i in range(1, 3):\n    for j in range(1, 3):\n        print(i, "-", j)' }) },
  { id: 'bucles-9', difficulty: 'medio', title: 'Filtrar impares con continue', build: () => ({
    prompt: 'Usa un <code>for</code> con <code>range(1, 11)</code> y <code>continue</code> para imprimir solo los números pares del 1 al 10.',
    code: 'for i in range(1, 11):\n    if i % 2 != 0:\n        continue\n    print(i)' }) },
  { id: 'bucles-7', difficulty: 'dificil', title: 'Suma con while y break', build: () => ({
    prompt: 'Crea <code>i = 0</code> y <code>suma = 0</code>. Con <code>while true:</code> suma <code>i</code> a <code>suma</code> y aumenta <code>i</code> en 1, usando <code>if i >= 5: break</code> para detenerte. Imprime <code>suma</code> al final.',
    code: 'var i = 0\nvar suma = 0\nwhile true:\n    suma += i\n    i += 1\n    if i >= 5:\n        break\nprint(suma)' }) },

  // ---- new facil (7) ----
  { id: 'bucles-11', difficulty: 'facil', title: 'Rango personalizado', build: () => {
    const a = randInt(1, 5), b = randInt(a + 3, a + 10);
    return { prompt: `Usa un <code>for</code> con <code>range(${a}, ${b})</code> para imprimir cada número, cada uno en su propia línea.`,
      code: `for i in range(${a}, ${b}):\n    print(i)` };
  } },
  { id: 'bucles-12', difficulty: 'facil', title: 'Repetir un mensaje N veces', build: () => {
    const n = randInt(3, 8);
    return { prompt: `Usa un <code>for</code> con <code>range(${n})</code> para imprimir <code>"Hola"</code> exactamente ${n} veces, cada una en su propia línea.`,
      code: `for i in range(${n}):\n    print("Hola")` };
  } },
  { id: 'bucles-13', difficulty: 'facil', title: 'Recorrer un array simple', build: () => {
    const items = [pickRandom(['rojo', 'verde', 'azul']), pickRandom(['sol', 'luna']), pickRandom(['gato', 'perro'])];
    return { prompt: `Crea <code>lista = ["${items[0]}", "${items[1]}", "${items[2]}"]</code>. Usa un <code>for</code> para imprimir cada elemento en su propia línea.`,
      code: `var lista = ["${items[0]}", "${items[1]}", "${items[2]}"]\nfor v in lista:\n    print(v)` };
  } },
  { id: 'bucles-14', difficulty: 'facil', title: 'Sumar de 2 en 2', build: () => {
    const tope = randInt(6, 10) * 2;
    return { prompt: `Usa <code>range(0, ${tope + 1}, 2)</code> en un <code>for</code> para imprimir los números pares del 0 al ${tope}, cada uno en su propia línea.`,
      code: `for i in range(0, ${tope + 1}, 2):\n    print(i)` };
  } },
  { id: 'bucles-15', difficulty: 'facil', title: 'While simple decreciente', build: () => {
    const inicio = randInt(3, 8);
    return { prompt: `Crea <code>i = ${inicio}</code>. Usa un <code>while i > 0:</code> para imprimir <code>i</code> y luego restarle 1 (<code>i -= 1</code>), hasta llegar a 0.`,
      code: `var i = ${inicio}\nwhile i > 0:\n    print(i)\n    i -= 1` };
  } },
  { id: 'bucles-16', difficulty: 'facil', title: 'Contar caracteres de un array con for', build: () => {
    const n = randInt(3, 6);
    const arr = Array.from({ length: n }, () => randInt(1, 9));
    return { prompt: `Crea <code>numeros = [${arr.join(', ')}]</code>. Usa un <code>for</code> con <code>range(numeros.size())</code> para imprimir cada índice <code>i</code>.`,
      code: `var numeros = [${arr.join(', ')}]\nfor i in range(numeros.size()):\n    print(i)` };
  } },
  { id: 'bucles-17', difficulty: 'facil', title: 'Imprimir cuadrados pequeños', build: () => {
    const tope = randInt(3, 6);
    return { prompt: `Usa un <code>for</code> con <code>range(1, ${tope + 1})</code> para imprimir <code>i * i</code> en cada línea.`,
      code: `for i in range(1, ${tope + 1}):\n    print(i * i)` };
  } },

  // ---- new medio (4) ----
  { id: 'bucles-18', difficulty: 'medio', title: 'Producto acumulado', build: () => {
    const tope = randInt(3, 6);
    return { prompt: `Crea <code>producto = 1</code>. Usa un <code>for</code> con <code>range(1, ${tope + 1})</code> para multiplicar <code>producto</code> por cada <code>i</code>. Imprime <code>producto</code> al final.`,
      code: `var producto = 1\nfor i in range(1, ${tope + 1}):\n    producto *= i\nprint(producto)` };
  } },
  { id: 'bucles-19', difficulty: 'medio', title: 'Contar cuántos son mayores a un umbral', build: () => {
    const n = randInt(4, 7);
    const arr = Array.from({ length: n }, () => randInt(1, 30));
    const umbral = randInt(5, 25);
    return { prompt: `Crea <code>numeros = [${arr.join(', ')}]</code> y <code>contador = 0</code>. Recorre <code>numeros</code> con <code>for</code> y suma 1 a <code>contador</code> por cada valor mayor a ${umbral}. Imprime <code>contador</code>.`,
      code: `var numeros = [${arr.join(', ')}]\nvar contador = 0\nfor n in numeros:\n    if n > ${umbral}:\n        contador += 1\nprint(contador)` };
  } },
  { id: 'bucles-20', difficulty: 'medio', title: 'While con condición compuesta', build: () => {
    const limite = randInt(15, 30);
    return { prompt: `Crea <code>i = 1</code> y <code>suma = 0</code>. Usa <code>while suma < ${limite}:</code> para sumar <code>i</code> a <code>suma</code> y luego incrementar <code>i</code> en 1. Al terminar, imprime <code>suma</code>.`,
      code: `var i = 1\nvar suma = 0\nwhile suma < ${limite}:\n    suma += i\n    i += 1\nprint(suma)` };
  } },
  { id: 'bucles-21', difficulty: 'medio', title: 'Recorrer claves de un diccionario', build: () => {
    const precios = { pan: randInt(1, 5), leche: randInt(1, 5), huevo: randInt(1, 5) };
    return { prompt: `Crea <code>precios = {"pan": ${precios.pan}, "leche": ${precios.leche}, "huevo": ${precios.huevo}}</code>. Usa un <code>for</code> sobre <code>precios.keys()</code> para imprimir cada <code>print(clave, ": ", precios[clave])</code>.`,
      code: `var precios = {"pan": ${precios.pan}, "leche": ${precios.leche}, "huevo": ${precios.huevo}}\nfor clave in precios.keys():\n    print(clave, ": ", precios[clave])` };
  } },

  // ---- new dificil (9) ----
  { id: 'bucles-22', difficulty: 'dificil', title: 'Bucle anidado con multiplicación', build: () => {
    const n = randInt(2, 4);
    return { prompt: `Usa dos <code>for</code> anidados, ambos con <code>range(1, ${n + 1})</code>, para imprimir <code>print(i, "*", j, "=", i*j)</code> para cada combinación.`,
      code: `for i in range(1, ${n + 1}):\n    for j in range(1, ${n + 1}):\n        print(i, "*", j, "=", i*j)` };
  } },
  { id: 'bucles-23', difficulty: 'dificil', title: 'Break dentro de un for', build: () => {
    const objetivo = randInt(3, 8);
    return { prompt: `Usa un <code>for</code> con <code>range(1, 20)</code> para imprimir cada número, pero detén el bucle con <code>break</code> apenas <code>i</code> sea igual a ${objetivo} (sin imprimir ese número).`,
      code: `for i in range(1, 20):\n    if i == ${objetivo}:\n        break\n    print(i)` };
  } },
  { id: 'bucles-24', difficulty: 'dificil', title: 'Suma solo de números pares con while', build: () => {
    const tope = randInt(10, 20);
    return { prompt: `Crea <code>i = 1</code> y <code>suma = 0</code>. Usa <code>while i <= ${tope}:</code> para sumar <code>i</code> a <code>suma</code> solo si es par, incrementando <code>i</code> en 1 en cada vuelta. Imprime <code>suma</code> al final.`,
      code: `var i = 1\nvar suma = 0\nwhile i <= ${tope}:\n    if i % 2 == 0:\n        suma += i\n    i += 1\nprint(suma)` };
  } },
  { id: 'bucles-25', difficulty: 'dificil', title: 'Contar vocales en un texto', build: () => {
    const palabra = pickRandom(['aventura', 'biblioteca', 'montaña', 'oceano']);
    return { prompt: `Crea <code>palabra = "${palabra}"</code> y <code>contador = 0</code>. Recorre cada letra con <code>for</code>; si es <code>"a"</code>, <code>"e"</code>, <code>"i"</code>, <code>"o"</code> o <code>"u"</code>, suma 1 a <code>contador</code>. Imprime <code>contador</code>.`,
      code: `var palabra = "${palabra}"\nvar contador = 0\nfor letra in palabra:\n    if letra == "a" or letra == "e" or letra == "i" or letra == "o" or letra == "u":\n        contador += 1\nprint(contador)` };
  } },
  { id: 'bucles-26', difficulty: 'dificil', title: 'Bucle con for anidado y break interno', build: () => {
    const objetivo = randInt(2, 3);
    return { prompt: `Usa un <code>for i in range(1, 4):</code> y adentro un <code>for j in range(1, 4):</code>; cuando <code>j == ${objetivo}</code>, usa <code>break</code> para salir solo del bucle interno (no del externo). Antes del <code>break</code>, imprime <code>print(i, "-", j)</code> en cada vuelta del bucle interno.`,
      code: `for i in range(1, 4):\n    for j in range(1, 4):\n        print(i, "-", j)\n        if j == ${objetivo}:\n            break` };
  } },
  { id: 'bucles-27', difficulty: 'dificil', title: 'Encontrar el primer múltiplo', build: () => {
    const divisor = randInt(3, 9);
    return { prompt: `Crea <code>i = 1</code>. Usa <code>while true:</code> para incrementar <code>i</code> hasta encontrar el primer valor múltiplo de ${divisor} (usa <code>if i % ${divisor} == 0: break</code> luego de incrementar). Imprime <code>i</code> al final.`,
      code: `var i = 0\nwhile true:\n    i += 1\n    if i % ${divisor} == 0:\n        break\nprint(i)` };
  } },
  { id: 'bucles-28', difficulty: 'dificil', title: 'Recorrer array con índice y valor', build: () => {
    const n = randInt(3, 5);
    const arr = Array.from({ length: n }, () => randInt(10, 99));
    return { prompt: `Crea <code>lista = [${arr.join(', ')}]</code>. Usa un <code>for</code> con <code>range(lista.size())</code> para imprimir <code>print(i, ": ", lista[i])</code>.`,
      code: `var lista = [${arr.join(', ')}]\nfor i in range(lista.size()):\n    print(i, ": ", lista[i])` };
  } },
  { id: 'bucles-29', difficulty: 'dificil', title: 'Doble condición con continue', build: () => {
    const n = randInt(1, 20);
    return { prompt: `Usa un <code>for</code> con <code>range(1, 21)</code>. Con <code>continue</code>, salta los números que sean divisibles por 2 <b>o</b> por 7. Imprime todos los demás.`,
      code: `for i in range(1, 21):\n    if i % 2 == 0 or i % 7 == 0:\n        continue\n    print(i)` };
  } },
  { id: 'bucles-30', difficulty: 'dificil', title: 'Bucle con acumulador de texto', build: () => {
    const letras = ['a', 'b', 'c', 'd'].slice(0, randInt(2, 4));
    return { prompt: `Crea <code>letras = [${letras.map(l => `"${l}"`).join(', ')}]</code> y <code>resultado = ""</code>. Con un <code>for</code>, concatena cada letra a <code>resultado</code> usando <code>resultado += letra</code>. Imprime <code>resultado</code>.`,
      code: `var letras = [${letras.map(l => `"${l}"`).join(', ')}]\nvar resultado = ""\nfor letra in letras:\n    resultado += letra\nprint(resultado)` };
  } },

  // ---- new experto (10) ----
  { id: 'bucles-31', difficulty: 'experto', title: 'Tabla de multiplicar completa', build: () => {
    const tabla = randInt(2, 9);
    return { prompt: `Usa un <code>for</code> con <code>range(1, 11)</code> para imprimir la tabla del ${tabla}, con el formato <code>print(${tabla}, " x ", i, " = ", ${tabla}*i)</code>.`,
      code: `for i in range(1, 11):\n    print(${tabla}, " x ", i, " = ", ${tabla}*i)` };
  } },
  { id: 'bucles-32', difficulty: 'experto', title: 'Bucle sobre valores de un diccionario', build: () => {
    const edades = { Ana: randInt(5, 80), Leo: randInt(5, 80), Sol: randInt(5, 80) };
    return { prompt: `Crea <code>edades = {"Ana": ${edades.Ana}, "Leo": ${edades.Leo}, "Sol": ${edades.Sol}}</code> y <code>adultos = 0</code>. Recorre <code>edades.values()</code> con <code>for</code> y cuenta cuántos son <code>>= 18</code>. Imprime <code>adultos</code>.`,
      code: `var edades = {"Ana": ${edades.Ana}, "Leo": ${edades.Leo}, "Sol": ${edades.Sol}}\nvar adultos = 0\nfor v in edades.values():\n    if v >= 18:\n        adultos += 1\nprint(adultos)` };
  } },
  { id: 'bucles-33', difficulty: 'experto', title: 'Fibonacci con while', build: () => {
    const n = randInt(6, 10);
    return { prompt: `Crea <code>a = 0</code>, <code>b = 1</code> y <code>contador = 0</code>. Usa <code>while contador < ${n}:</code> para imprimir <code>a</code>, luego calcular <code>var siguiente = a + b</code>, actualizar <code>a = b</code>, <code>b = siguiente</code>, y sumar 1 a <code>contador</code>.`,
      code: `var a = 0\nvar b = 1\nvar contador = 0\nwhile contador < ${n}:\n    print(a)\n    var siguiente = a + b\n    a = b\n    b = siguiente\n    contador += 1` };
  } },
  { id: 'bucles-34', difficulty: 'experto', title: 'Bucle dentro de una función', build: () => {
    const tope = randInt(3, 8);
    return { prompt: `Crea una función <code>sumar_hasta(n):</code> que use un <code>for</code> con <code>range(1, n + 1)</code> para acumular la suma en una variable local y la retorne. Imprime <code>sumar_hasta(${tope})</code>.`,
      code: `func sumar_hasta(n):\n    var total = 0\n    for i in range(1, n + 1):\n        total += i\n    return total\nprint(sumar_hasta(${tope}))` };
  } },
  { id: 'bucles-35', difficulty: 'experto', title: 'Encontrar el máximo con un bucle', build: () => {
    const n = randInt(4, 6);
    const arr = Array.from({ length: n }, () => randInt(1, 99));
    return { prompt: `Crea <code>numeros = [${arr.join(', ')}]</code> y <code>maximo = numeros[0]</code>. Recorre <code>numeros</code> con <code>for</code> y actualiza <code>maximo</code> si encuentras un valor mayor. Imprime <code>maximo</code>.`,
      code: `var numeros = [${arr.join(', ')}]\nvar maximo = numeros[0]\nfor n in numeros:\n    if n > maximo:\n        maximo = n\nprint(maximo)` };
  } },
  { id: 'bucles-36', difficulty: 'experto', title: 'Doble bucle generando un array de pares', build: () => {
    const n = randInt(2, 3);
    return { prompt: `Crea <code>pares = []</code>. Usa dos <code>for</code> anidados con <code>range(1, ${n + 1})</code> para agregar <code>[i, j]</code> a <code>pares</code> con <code>.append()</code> en cada combinación. Imprime <code>pares</code>.`,
      code: `var pares = []\nfor i in range(1, ${n + 1}):\n    for j in range(1, ${n + 1}):\n        pares.append([i, j])\nprint(pares)` };
  } },
  { id: 'bucles-37', difficulty: 'experto', title: 'Contar palabras de un texto separado', build: () => {
    const frase = pickRandom(['el sol brilla fuerte', 'la luna sale de noche', 'las estrellas son bellas']);
    return { prompt: `Crea <code>frase = "${frase}"</code> y <code>palabras = frase.split(" ")</code>. Con un <code>for</code>, cuenta cuántas palabras tienen más de 3 letras en <code>largas</code>. Imprime <code>largas</code>.`,
      code: `var frase = "${frase}"\nvar palabras = frase.split(" ")\nvar largas = 0\nfor p in palabras:\n    if p.length() > 3:\n        largas += 1\nprint(largas)` };
  } },
  { id: 'bucles-38', difficulty: 'experto', title: 'Bucle que construye un diccionario', build: () => {
    const n = randInt(3, 5);
    const nums = Array.from({ length: n }, (_, i) => i + 1);
    return { prompt: `Crea <code>cuadrados = {}</code>. Usa un <code>for</code> con <code>range(1, ${n + 1})</code> para asignar <code>cuadrados[i] = i * i</code>. Imprime <code>cuadrados</code>.`,
      code: `var cuadrados = {}\nfor i in range(1, ${n + 1}):\n    cuadrados[i] = i * i\nprint(cuadrados)` };
  } },
  { id: 'bucles-39', difficulty: 'experto', title: 'Bucle con condición de parada temprana', build: () => {
    const n = randInt(5, 8);
    const arr = Array.from({ length: n }, () => randInt(1, 15));
    const umbral = randInt(5, 12);
    return { prompt: `Crea <code>numeros = [${arr.join(', ')}]</code>. Recorre con <code>for</code> y usa <code>break</code> en el primer valor mayor a ${umbral}, imprimiéndolo antes de salir. Si ninguno cumple, el programa simplemente no imprime nada (no necesitas manejarlo).`,
      code: `var numeros = [${arr.join(', ')}]\nfor n in numeros:\n    if n > ${umbral}:\n        print(n)\n        break` };
  } },
  { id: 'bucles-40', difficulty: 'experto', title: 'Duplicar valores de un array con bucle', build: () => {
    const n = randInt(3, 5);
    const arr = Array.from({ length: n }, () => randInt(1, 20));
    return { prompt: `Crea <code>numeros = [${arr.join(', ')}]</code> y <code>dobles = []</code>. Recorre <code>numeros</code> con <code>for</code> y agrega el doble de cada valor a <code>dobles</code> con <code>.append()</code>. Imprime <code>dobles</code>.`,
      code: `var numeros = [${arr.join(', ')}]\nvar dobles = []\nfor n in numeros:\n    dobles.append(n * 2)\nprint(dobles)` };
  } },

  // ---- new maestro (10) ----
  { id: 'bucles-41', difficulty: 'maestro', title: 'Números primos en un rango', build: () => {
    const tope = randInt(15, 30);
    return { prompt: `Usa un <code>for n in range(2, ${tope + 1}):</code>. Para cada <code>n</code>, crea <code>es_primo = true</code> y con otro <code>for</code> anidado (<code>d in range(2, n)</code>) marca <code>es_primo = false</code> si <code>n % d == 0</code>. Si <code>es_primo</code> sigue siendo <code>true</code> al terminar el bucle interno, imprime <code>n</code>.`,
      code: `for n in range(2, ${tope + 1}):\n    var es_primo = true\n    for d in range(2, n):\n        if n % d == 0:\n            es_primo = false\n    if es_primo:\n        print(n)` };
  } },
  { id: 'bucles-42', difficulty: 'maestro', title: 'Matriz recorrida con bucles anidados', build: () => {
    const filas = randInt(2, 3);
    const cols = randInt(2, 3);
    const matriz = Array.from({ length: filas }, () => Array.from({ length: cols }, () => randInt(1, 9)));
    const matrizStr = '[' + matriz.map(f => '[' + f.join(', ') + ']').join(', ') + ']';
    return { prompt: `Crea <code>matriz = ${matrizStr}</code> y <code>suma = 0</code>. Usa dos <code>for</code> anidados (<code>fila in matriz</code>, luego <code>valor in fila</code>) para sumar todos los valores en <code>suma</code>. Imprime <code>suma</code>.`,
      code: `var matriz = ${matrizStr}\nvar suma = 0\nfor fila in matriz:\n    for valor in fila:\n        suma += valor\nprint(suma)` };
  } },
  { id: 'bucles-43', difficulty: 'maestro', title: 'Bucle con función y acumulador de objetos', build: () => {
    const n = randInt(3, 5);
    const nombres = ['Ana', 'Kai', 'Sol', 'Leo', 'Mia'].slice(0, n);
    return { prompt: `Crea <code>nombres = [${nombres.map(n => `"${n}"`).join(', ')}]</code> y <code>jugadores = []</code>. Crea una función <code>crear_jugador(nombre):</code> que retorne <code>{"nombre": nombre, "vida": 100}</code>. Recorre <code>nombres</code> con <code>for</code> y agrega <code>crear_jugador(n)</code> a <code>jugadores</code>. Imprime <code>jugadores.size()</code>.`,
      code: `var nombres = [${nombres.map(n => `"${n}"`).join(', ')}]\nvar jugadores = []\nfunc crear_jugador(nombre):\n    return {"nombre": nombre, "vida": 100}\nfor n in nombres:\n    jugadores.append(crear_jugador(n))\nprint(jugadores.size())` };
  } },
  { id: 'bucles-44', difficulty: 'maestro', title: 'Simulación de turnos con while y match', build: () => {
    const turnos = randInt(3, 5);
    return { prompt: `Crea <code>turno = 1</code>. Usa <code>while turno <= ${turnos}:</code> y dentro un <code>match turno % 2:</code> con casos <code>0:</code> imprimiendo <code>"Turno par: " + str(turno)</code> y <code>1:</code> imprimiendo <code>"Turno impar: " + str(turno)</code>. Incrementa <code>turno</code> en 1 en cada vuelta.`,
      code: `var turno = 1\nwhile turno <= ${turnos}:\n    match turno % 2:\n        0:\n            print("Turno par: " + str(turno))\n        1:\n            print("Turno impar: " + str(turno))\n    turno += 1` };
  } },
  { id: 'bucles-45', difficulty: 'maestro', title: 'Filtrar y transformar en un solo bucle', build: () => {
    const n = randInt(4, 6);
    const arr = Array.from({ length: n }, () => randInt(-10, 10));
    return { prompt: `Crea <code>numeros = [${arr.join(', ')}]</code> y <code>resultado = []</code>. Recorre con <code>for</code>; si el valor es positivo, agrega su cuadrado a <code>resultado</code> con <code>.append()</code> (ignora los negativos y el cero). Imprime <code>resultado</code>.`,
      code: `var numeros = [${arr.join(', ')}]\nvar resultado = []\nfor n in numeros:\n    if n > 0:\n        resultado.append(n * n)\nprint(resultado)` };
  } },
  { id: 'bucles-46', difficulty: 'maestro', title: 'Bucle con clase e instancias acumuladas', build: () => {
    const n = randInt(2, 4);
    return { prompt: `Crea <code>class Contador:</code> con <code>var valor = 0</code> y método <code>sumar():</code> que haga <code>self.valor += 1</code>. Crea <code>c = Contador.new()</code>. Usa un <code>for</code> con <code>range(${n})</code> para llamar <code>c.sumar()</code> en cada vuelta. Imprime <code>c.valor</code>.`,
      code: `class Contador:\n    var valor = 0\n    func sumar():\n        self.valor += 1\nvar c = Contador.new()\nfor i in range(${n}):\n    c.sumar()\nprint(c.valor)` };
  } },
  { id: 'bucles-47', difficulty: 'maestro', title: 'Bucle con dos condiciones de salida', build: () => {
    const limite = randInt(20, 40);
    return { prompt: `Crea <code>i = 1</code>, <code>suma = 0</code>. Usa <code>while true:</code> para sumar <code>i</code> a <code>suma</code>, incrementar <code>i</code> en 1, y salir con <code>break</code> si <code>suma > ${limite}</code> <b>o</b> si <code>i > 50</code>. Imprime <code>suma</code> al final.`,
      code: `var i = 1\nvar suma = 0\nwhile true:\n    suma += i\n    i += 1\n    if suma > ${limite} or i > 50:\n        break\nprint(suma)` };
  } },
  { id: 'bucles-48', difficulty: 'maestro', title: 'Bucle que agrupa por paridad en un diccionario', build: () => {
    const n = randInt(4, 6);
    const arr = Array.from({ length: n }, () => randInt(1, 30));
    return { prompt: `Crea <code>numeros = [${arr.join(', ')}]</code> y <code>grupos = {"pares": [], "impares": []}</code>. Recorre con <code>for</code>: si es par, agrégalo a <code>grupos["pares"]</code>, si no a <code>grupos["impares"]</code>. Imprime <code>grupos</code>.`,
      code: `var numeros = [${arr.join(', ')}]\nvar grupos = {"pares": [], "impares": []}\nfor n in numeros:\n    if n % 2 == 0:\n        grupos["pares"].append(n)\n    else:\n        grupos["impares"].append(n)\nprint(grupos)` };
  } },
  { id: 'bucles-49', difficulty: 'maestro', title: 'Recursión simulada con while (potencia)', build: () => {
    const base = randInt(2, 4), exp = randInt(2, 5);
    return { prompt: `Crea <code>base = ${base}</code>, <code>exp = ${exp}</code>, <code>resultado = 1</code> y <code>contador = 0</code>. Usa <code>while contador < exp:</code> para multiplicar <code>resultado</code> por <code>base</code> en cada vuelta e incrementar <code>contador</code>. Imprime <code>resultado</code> (equivalente a <code>base</code> elevado a <code>exp</code>).`,
      code: `var base = ${base}\nvar exp = ${exp}\nvar resultado = 1\nvar contador = 0\nwhile contador < exp:\n    resultado *= base\n    contador += 1\nprint(resultado)` };
  } },
  { id: 'bucles-50', difficulty: 'maestro', title: 'Bucle combinando señal, condición y acumulador', build: () => {
    const n = randInt(4, 6);
    const arr = Array.from({ length: n }, () => randInt(1, 20));
    const umbral = randInt(30, 60);
    return { prompt: `Crea <code>signal limite_alcanzado</code> y <code>func on_limite():</code> que imprima <code>"¡Límite alcanzado!"</code>, conectada a la señal. Crea <code>numeros = [${arr.join(', ')}]</code> y <code>suma = 0</code>. Recorre con <code>for</code>, sumando cada valor a <code>suma</code>; si en algún momento <code>suma > ${umbral}</code>, emite <code>limite_alcanzado</code> y usa <code>break</code>.`,
      code: `signal limite_alcanzado\nfunc on_limite():\n    print("¡Límite alcanzado!")\nlimite_alcanzado.connect(on_limite)\nvar numeros = [${arr.join(', ')}]\nvar suma = 0\nfor n in numeros:\n    suma += n\n    if suma > ${umbral}:\n        limite_alcanzado.emit()\n        break` };
  } },
];

const funcionesGenerators = [
  // ---- migrated originals ----
  { id: 'funciones-1', difficulty: 'facil', title: 'Función simple', build: () => ({
    prompt: 'Crea una función <code>saludar(nombre)</code> que retorne <code>"Hola, " + nombre + "!"</code>. Llama <code>saludar("Mundo")</code> e imprime el resultado.',
    code: 'func saludar(nombre):\n    return "Hola, " + nombre + "!"\nprint(saludar("Mundo"))' }) },
  { id: 'funciones-2', difficulty: 'facil', title: 'Suma de dos números', build: () => ({
    prompt: 'Crea una función <code>sumar(a, b)</code> que retorne <code>a + b</code>. Imprime <code>sumar(4, 9)</code>.',
    code: 'func sumar(a, b):\n    return a + b\nprint(sumar(4, 9))' }) },
  { id: 'funciones-6', difficulty: 'facil', title: 'Función sin retorno', build: () => ({
    prompt: 'Crea <code>despedir(nombre)</code> que imprima directamente <code>"Chau, " + nombre + "!"</code> (sin usar <code>return</code>). Llama <code>despedir("Tom")</code>.',
    code: 'func despedir(nombre):\n    print("Chau, " + nombre + "!")\ndespedir("Tom")' }) },
  { id: 'funciones-3', difficulty: 'medio', title: 'Es par', build: () => ({
    prompt: 'Crea <code>es_par(n)</code> que retorne <code>true</code> si <code>n</code> es par y <code>false</code> si no. Imprime <code>es_par(10)</code> y luego <code>es_par(7)</code>, cada uno en su propia línea.',
    code: 'func es_par(n):\n    return n % 2 == 0\nprint(es_par(10))\nprint(es_par(7))' }) },
  { id: 'funciones-5', difficulty: 'medio', title: 'Máximo de dos', build: () => ({
    prompt: 'Crea <code>mayor(a, b)</code> que retorne el mayor de los dos con <code>if/else</code>. Imprime <code>mayor(15, 9)</code>.',
    code: 'func mayor(a, b):\n    if a > b:\n        return a\n    else:\n        return b\nprint(mayor(15, 9))' }) },
  { id: 'funciones-7', difficulty: 'medio', title: 'Promedio de tres', build: () => ({
    prompt: 'Crea <code>promedio(a, b, c)</code> que retorne <code>(a + b + c) / 3</code>. Imprime <code>promedio(4, 5, 9)</code>.',
    code: 'func promedio(a, b, c):\n    return (a + b + c) / 3\nprint(promedio(4, 5, 9))' }) },
  { id: 'funciones-9', difficulty: 'medio', title: 'Función con array', build: () => ({
    prompt: 'Crea <code>contiene_par(lista)</code> que recorra la lista y retorne <code>true</code> si encuentra algún número par, o <code>false</code> si no. Imprime <code>contiene_par([1, 3, 5, 4])</code>.',
    code: 'func contiene_par(lista):\n    for v in lista:\n        if v % 2 == 0:\n            return true\n    return false\nprint(contiene_par([1, 3, 5, 4]))' }) },
  { id: 'funciones-10', difficulty: 'medio', title: 'Función que llama a otra', build: () => ({
    prompt: 'Crea <code>cuadrado(n)</code> que retorne <code>n * n</code>, y <code>suma_cuadrados(a, b)</code> que retorne <code>cuadrado(a) + cuadrado(b)</code>. Imprime <code>suma_cuadrados(3, 4)</code>.',
    code: 'func cuadrado(n):\n    return n * n\nfunc suma_cuadrados(a, b):\n    return cuadrado(a) + cuadrado(b)\nprint(suma_cuadrados(3, 4))' }) },
  { id: 'funciones-4', difficulty: 'dificil', title: 'Factorial recursivo', build: () => ({
    prompt: 'Crea una función recursiva <code>factorial(n)</code> (caso base: <code>n <= 1</code> retorna 1). Imprime <code>factorial(6)</code>.',
    code: 'func factorial(n):\n    if n <= 1:\n        return 1\n    return n * factorial(n - 1)\nprint(factorial(6))' }) },
  { id: 'funciones-8', difficulty: 'dificil', title: 'Fibonacci recursivo', build: () => ({
    prompt: 'Crea <code>fib(n)</code> recursiva (caso base <code>n <= 1</code> retorna <code>n</code>). Imprime <code>fib(7)</code>.',
    code: 'func fib(n):\n    if n <= 1:\n        return n\n    return fib(n - 1) + fib(n - 2)\nprint(fib(7))' }) },

  // ---- new facil (7) ----
  { id: 'funciones-11', difficulty: 'facil', title: 'Resta de dos números', build: () => {
    const a = randInt(10, 50), b = randInt(1, 9);
    return { prompt: `Crea <code>restar(a, b)</code> que retorne <code>a - b</code>. Imprime <code>restar(${a}, ${b})</code>.`,
      code: `func restar(a, b):\n    return a - b\nprint(restar(${a}, ${b}))` };
  } },
  { id: 'funciones-12', difficulty: 'facil', title: 'Duplicar un número', build: () => {
    const n = randInt(1, 50);
    return { prompt: `Crea <code>doblar(n)</code> que retorne <code>n * 2</code>. Imprime <code>doblar(${n})</code>.`,
      code: `func doblar(n):\n    return n * 2\nprint(doblar(${n}))` };
  } },
  { id: 'funciones-13', difficulty: 'facil', title: 'Función que imprime un saludo con edad', build: () => {
    const nombre = pickRandom(['Ana', 'Kai', 'Sol']); const edad = randInt(5, 80);
    return { prompt: `Crea <code>presentar(nombre, edad)</code> que imprima <code>print(nombre, " tiene ", edad, " años")</code> (sin usar <code>return</code>). Llama <code>presentar("${nombre}", ${edad})</code>.`,
      code: `func presentar(nombre, edad):\n    print(nombre, " tiene ", edad, " años")\npresentar("${nombre}", ${edad})` };
  } },
  { id: 'funciones-14', difficulty: 'facil', title: 'Función sin parámetros', build: () => {
    const msg = pickRandom(['¡Bienvenido!', '¡Buena suerte!', '¡A jugar!']);
    return { prompt: `Crea <code>mensaje()</code> (sin parámetros) que retorne <code>"${msg}"</code>. Imprime <code>mensaje()</code>.`,
      code: `func mensaje():\n    return "${msg}"\nprint(mensaje())` };
  } },
  { id: 'funciones-15', difficulty: 'facil', title: 'Es negativo', build: () => {
    const n = randInt(-20, 20);
    return { prompt: `Crea <code>es_negativo(n)</code> que retorne <code>n < 0</code>. Imprime <code>es_negativo(${n})</code>.`,
      code: `func es_negativo(n):\n    return n < 0\nprint(es_negativo(${n}))` };
  } },
  { id: 'funciones-16', difficulty: 'facil', title: 'Parámetro con valor por defecto', build: () => {
    const n = randInt(1, 20);
    return { prompt: `Crea <code>incrementar(n, cantidad = 1)</code> que retorne <code>n + cantidad</code>. Imprime <code>incrementar(${n})</code> (sin pasar el segundo argumento, para usar el valor por defecto).`,
      code: `func incrementar(n, cantidad = 1):\n    return n + cantidad\nprint(incrementar(${n}))` };
  } },
  { id: 'funciones-17', difficulty: 'facil', title: 'Concatenar dos textos', build: () => {
    const a = pickRandom(['Hola', 'Buenas', 'Saludos']); const b = pickRandom(['mundo', 'amigo', 'gente']);
    return { prompt: `Crea <code>unir(a, b)</code> que retorne <code>a + " " + b</code>. Imprime <code>unir("${a}", "${b}")</code>.`,
      code: `func unir(a, b):\n    return a + " " + b\nprint(unir("${a}", "${b}"))` };
  } },

  // ---- new medio (5) ----
  { id: 'funciones-18', difficulty: 'medio', title: 'Contar elementos que cumplen condición', build: () => {
    const n = randInt(4, 6);
    const arr = Array.from({ length: n }, () => randInt(1, 30));
    const umbral = randInt(5, 25);
    return { prompt: `Crea <code>contar_mayores(lista, umbral)</code> que recorra <code>lista</code> con <code>for</code> y retorne cuántos valores son mayores que <code>umbral</code>. Imprime <code>contar_mayores([${arr.join(', ')}], ${umbral})</code>.`,
      code: `func contar_mayores(lista, umbral):\n    var total = 0\n    for v in lista:\n        if v > umbral:\n            total += 1\n    return total\nprint(contar_mayores([${arr.join(', ')}], ${umbral}))` };
  } },
  { id: 'funciones-19', difficulty: 'medio', title: 'Función con tipo de retorno', build: () => {
    const n = randInt(1, 20);
    return { prompt: `Crea <code>func triplicar(n: int) -> int:</code> que retorne <code>n * 3</code>. Imprime <code>triplicar(${n})</code>.`,
      code: `func triplicar(n: int) -> int:\n    return n * 3\nprint(triplicar(${n}))` };
  } },
  { id: 'funciones-20', difficulty: 'medio', title: 'Función que retorna un array', build: () => {
    const n = randInt(3, 5);
    return { prompt: `Crea <code>rango_cuadrados(n)</code> que use un <code>for</code> con <code>range(1, n + 1)</code> para construir y retornar un array con los cuadrados de 1 a <code>n</code>. Imprime <code>rango_cuadrados(${n})</code>.`,
      code: `func rango_cuadrados(n):\n    var resultado = []\n    for i in range(1, n + 1):\n        resultado.append(i * i)\n    return resultado\nprint(rango_cuadrados(${n}))` };
  } },
  { id: 'funciones-21', difficulty: 'medio', title: 'Función booleana con and', build: () => {
    const n = randInt(1, 100);
    return { prompt: `Crea <code>es_multiplo_ambos(n)</code> que retorne <code>true</code> si <code>n</code> es múltiplo de 2 y de 3 a la vez. Imprime <code>es_multiplo_ambos(${n})</code>.`,
      code: `func es_multiplo_ambos(n):\n    return n % 2 == 0 and n % 3 == 0\nprint(es_multiplo_ambos(${n}))` };
  } },
  { id: 'funciones-22', difficulty: 'medio', title: 'Función con múltiples returns', build: () => {
    const n = randInt(-10, 100);
    return { prompt: `Crea <code>clasificar(n)</code> que retorne <code>"negativo"</code> si <code>n < 0</code>, <code>"cero"</code> si <code>n == 0</code>, o <code>"positivo"</code> si no (usando varios <code>if/elif/else</code> con <code>return</code>). Imprime <code>clasificar(${n})</code>.`,
      code: `func clasificar(n):\n    if n < 0:\n        return "negativo"\n    elif n == 0:\n        return "cero"\n    else:\n        return "positivo"\nprint(clasificar(${n}))` };
  } },

  // ---- new dificil (8) ----
  { id: 'funciones-23', difficulty: 'dificil', title: 'Suma de dígitos recursiva', build: () => {
    const n = randInt(10, 999);
    return { prompt: `Crea <code>suma_digitos(n)</code> recursiva: caso base <code>n < 10</code> retorna <code>n</code>; si no, retorna <code>n % 10 + suma_digitos(n / 10)</code> (recuerda que <code>/</code> entre enteros trunca). Imprime <code>suma_digitos(${n})</code>.`,
      code: `func suma_digitos(n):\n    if n < 10:\n        return n\n    return n % 10 + suma_digitos(n / 10)\nprint(suma_digitos(${n}))` };
  } },
  { id: 'funciones-24', difficulty: 'dificil', title: 'Potencia recursiva', build: () => {
    const base = randInt(2, 5), exp = randInt(2, 6);
    return { prompt: `Crea <code>potencia(base, exp)</code> recursiva: caso base <code>exp == 0</code> retorna 1; si no, retorna <code>base * potencia(base, exp - 1)</code>. Imprime <code>potencia(${base}, ${exp})</code>.`,
      code: `func potencia(base, exp):\n    if exp == 0:\n        return 1\n    return base * potencia(base, exp - 1)\nprint(potencia(${base}, ${exp}))` };
  } },
  { id: 'funciones-25', difficulty: 'dificil', title: 'Función que modifica un array recibido', build: () => {
    const arr = [randInt(1, 20), randInt(1, 20), randInt(1, 20)];
    return { prompt: `Crea <code>agregar_bonus(lista)</code> que use <code>.append(100)</code> sobre <code>lista</code> (sin retornar nada). Crea <code>numeros = [${arr.join(', ')}]</code>, llama <code>agregar_bonus(numeros)</code>, e imprime <code>numeros</code> (los arrays se pasan por referencia).`,
      code: `func agregar_bonus(lista):\n    lista.append(100)\nvar numeros = [${arr.join(', ')}]\nagregar_bonus(numeros)\nprint(numeros)` };
  } },
  { id: 'funciones-26', difficulty: 'dificil', title: 'Máximo común divisor recursivo', build: () => {
    const a = randInt(12, 60), b = randInt(4, 30);
    return { prompt: `Crea <code>mcd(a, b)</code> recursiva: caso base <code>b == 0</code> retorna <code>a</code>; si no, retorna <code>mcd(b, a % b)</code>. Imprime <code>mcd(${a}, ${b})</code>.`,
      code: `func mcd(a, b):\n    if b == 0:\n        return a\n    return mcd(b, a % b)\nprint(mcd(${a}, ${b}))` };
  } },
  { id: 'funciones-27', difficulty: 'dificil', title: 'Función con parámetros por defecto combinados', build: () => {
    const n = randInt(1, 20);
    return { prompt: `Crea <code>calcular(n, multiplicador = 2, extra = 0)</code> que retorne <code>n * multiplicador + extra</code>. Imprime <code>calcular(${n})</code>, luego <code>calcular(${n}, 3)</code>, cada uno en su propia línea.`,
      code: `func calcular(n, multiplicador = 2, extra = 0):\n    return n * multiplicador + extra\nprint(calcular(${n}))\nprint(calcular(${n}, 3))` };
  } },
  { id: 'funciones-28', difficulty: 'dificil', title: 'Función que usa map', build: () => {
    const n = randInt(3, 5);
    const arr = Array.from({ length: n }, () => randInt(1, 10));
    return { prompt: `Crea <code>cuadrado(n)</code> que retorne <code>n * n</code>. Crea <code>numeros = [${arr.join(', ')}]</code> e imprime <code>numeros.map(cuadrado)</code>.`,
      code: `func cuadrado(n):\n    return n * n\nvar numeros = [${arr.join(', ')}]\nprint(numeros.map(cuadrado))` };
  } },
  { id: 'funciones-29', difficulty: 'dificil', title: 'Función con match interno', build: () => {
    const n = randInt(1, 4);
    return { prompt: `Crea <code>nombre_dia(n)</code> que use <code>match n:</code> con casos <code>1:</code>, <code>2:</code>, <code>3:</code> retornando <code>"Lunes"</code>, <code>"Martes"</code>, <code>"Miércoles"</code>, y <code>_:</code> retornando <code>"Otro día"</code>. Imprime <code>nombre_dia(${n})</code>.`,
      code: `func nombre_dia(n):\n    match n:\n        1:\n            return "Lunes"\n        2:\n            return "Martes"\n        3:\n            return "Miércoles"\n        _:\n            return "Otro día"\nprint(nombre_dia(${n}))` };
  } },
  { id: 'funciones-30', difficulty: 'dificil', title: 'Filtrar con una función auxiliar', build: () => {
    const n = randInt(4, 6);
    const arr = Array.from({ length: n }, () => randInt(-10, 10));
    return { prompt: `Crea <code>es_positivo(n)</code> que retorne <code>n > 0</code>. Crea <code>numeros = [${arr.join(', ')}]</code> e imprime <code>numeros.filter(es_positivo)</code>.`,
      code: `func es_positivo(n):\n    return n > 0\nvar numeros = [${arr.join(', ')}]\nprint(numeros.filter(es_positivo))` };
  } },

  // ---- new experto (10) ----
  { id: 'funciones-31', difficulty: 'experto', title: 'Reduce con función personalizada', build: () => {
    const n = randInt(3, 5);
    const arr = Array.from({ length: n }, () => randInt(1, 10));
    return { prompt: `Crea <code>multiplicar(a, b)</code> que retorne <code>a * b</code>. Crea <code>numeros = [${arr.join(', ')}]</code> e imprime <code>numeros.reduce(multiplicar)</code> (el producto de todos).`,
      code: `func multiplicar(a, b):\n    return a * b\nvar numeros = [${arr.join(', ')}]\nprint(numeros.reduce(multiplicar))` };
  } },
  { id: 'funciones-32', difficulty: 'experto', title: 'Función recursiva que cuenta ocurrencias', build: () => {
    const n = randInt(8, 20);
    return { prompt: `Crea <code>contar_pares(n)</code> recursiva: caso base <code>n <= 0</code> retorna 0; si no, retorna <code>(1 if n % 2 == 0 else 0) + contar_pares(n - 1)</code>. Imprime <code>contar_pares(${n})</code> (cuenta pares entre 1 y n).`,
      code: `func contar_pares(n):\n    if n <= 0:\n        return 0\n    return (1 if n % 2 == 0 else 0) + contar_pares(n - 1)\nprint(contar_pares(${n}))` };
  } },
  { id: 'funciones-33', difficulty: 'experto', title: 'Función que retorna un diccionario', build: () => {
    const nombre = pickRandom(['Kai', 'Ana', 'Sol']); const vida = randInt(50, 100);
    return { prompt: `Crea <code>crear_jugador(nombre, vida)</code> que retorne <code>{"nombre": nombre, "vida": vida}</code>. Crea <code>j = crear_jugador("${nombre}", ${vida})</code>. Imprime <code>j["nombre"]</code>.`,
      code: `func crear_jugador(nombre, vida):\n    return {"nombre": nombre, "vida": vida}\nvar j = crear_jugador("${nombre}", ${vida})\nprint(j["nombre"])` };
  } },
  { id: 'funciones-34', difficulty: 'experto', title: 'Función con enum como parámetro', build: () => {
    const idx = randInt(0, 2);
    return { prompt: `Crea <code>enum Color { ROJO, VERDE, AZUL }</code>. Crea <code>nombre_color(c)</code> que use <code>match c:</code> con casos <code>Color.ROJO:</code>, <code>Color.VERDE:</code>, <code>Color.AZUL:</code> retornando <code>"Rojo"</code>, <code>"Verde"</code>, <code>"Azul"</code>. Imprime <code>nombre_color(${idx})</code>.`,
      code: `enum Color { ROJO, VERDE, AZUL }\nfunc nombre_color(c):\n    match c:\n        Color.ROJO:\n            return "Rojo"\n        Color.VERDE:\n            return "Verde"\n        Color.AZUL:\n            return "Azul"\nprint(nombre_color(${idx}))` };
  } },
  { id: 'funciones-35', difficulty: 'experto', title: 'Dos funciones recursivas mutuas simuladas', build: () => {
    const n = randInt(1, 15);
    return { prompt: `Crea <code>es_par(n)</code> que retorne <code>true</code> si <code>n == 0</code>, o si no <code>es_impar(n - 1)</code>; y <code>es_impar(n)</code> que retorne <code>false</code> si <code>n == 0</code>, o si no <code>es_par(n - 1)</code>. Imprime <code>es_par(${n})</code>.`,
      code: `func es_par(n):\n    if n == 0:\n        return true\n    return es_impar(n - 1)\nfunc es_impar(n):\n    if n == 0:\n        return false\n    return es_par(n - 1)\nprint(es_par(${n}))` };
  } },
  { id: 'funciones-36', difficulty: 'experto', title: 'Aplicar una función dos veces con map', build: () => {
    const n = randInt(2, 12);
    return { prompt: `Crea <code>doblar(n)</code> que retorne <code>n * 2</code>. Crea <code>numeros = [${n}]</code> e imprime <code>numeros.map(doblar).map(doblar)</code> (aplica <code>doblar</code> dos veces seguidas sobre el array).`,
      code: `func doblar(n):\n    return n * 2\nvar numeros = [${n}]\nprint(numeros.map(doblar).map(doblar))` };
  } },
  { id: 'funciones-37', difficulty: 'experto', title: 'Función con array de arrays', build: () => {
    const filas = randInt(2, 3), cols = randInt(2, 3);
    const matriz = Array.from({ length: filas }, () => Array.from({ length: cols }, () => randInt(1, 9)));
    const matrizStr = '[' + matriz.map(f => '[' + f.join(', ') + ']').join(', ') + ']';
    return { prompt: `Crea <code>sumar_matriz(matriz)</code> que recorra con dos <code>for</code> anidados (fila, luego valor) y retorne la suma total. Imprime <code>sumar_matriz(${matrizStr})</code>.`,
      code: `func sumar_matriz(matriz):\n    var total = 0\n    for fila in matriz:\n        for valor in fila:\n            total += valor\n    return total\nprint(sumar_matriz(${matrizStr}))` };
  } },
  { id: 'funciones-38', difficulty: 'experto', title: 'Función validadora con múltiples condiciones', build: () => {
    const edad = randInt(1, 90); const tieneCarnet = pickRandom([true, false]);
    return { prompt: `Crea <code>puede_conducir(edad, tiene_carnet)</code> que retorne <code>edad >= 18 and tiene_carnet</code>. Imprime <code>puede_conducir(${edad}, ${tieneCarnet})</code>.`,
      code: `func puede_conducir(edad, tiene_carnet):\n    return edad >= 18 and tiene_carnet\nprint(puede_conducir(${edad}, ${tieneCarnet}))` };
  } },
  { id: 'funciones-39', difficulty: 'experto', title: 'Función que cuenta con acumulador y condición doble', build: () => {
    const n = randInt(4, 6);
    const arr = Array.from({ length: n }, () => randInt(-20, 20));
    return { prompt: `Crea <code>contar_en_rango(lista, min, max)</code> que retorne cuántos elementos de <code>lista</code> están entre <code>min</code> y <code>max</code> (inclusive). Imprime <code>contar_en_rango([${arr.join(', ')}], -5, 5)</code>.`,
      code: `func contar_en_rango(lista, min, max):\n    var total = 0\n    for v in lista:\n        if v >= min and v <= max:\n            total += 1\n    return total\nprint(contar_en_rango([${arr.join(', ')}], -5, 5))` };
  } },
  { id: 'funciones-40', difficulty: 'experto', title: 'Función con señal interna', build: () => {
    const vida = randInt(1, 15); const dano = randInt(10, 30);
    return { prompt: `Crea <code>signal murio</code>, <code>func on_murio():</code> que imprima <code>"Fin del juego"</code> (conéctala a <code>murio</code>), y <code>recibir_dano(vida, cantidad)</code> que retorne <code>vida - cantidad</code>. Crea <code>vida = ${vida}</code>, calcula <code>vida = recibir_dano(vida, ${dano})</code>, y si <code>vida <= 0</code>, emite <code>murio</code>.`,
      code: `signal murio\nfunc on_murio():\n    print("Fin del juego")\nmurio.connect(on_murio)\nfunc recibir_dano(vida, cantidad):\n    return vida - cantidad\nvar vida = ${vida}\nvida = recibir_dano(vida, ${dano})\nif vida <= 0:\n    murio.emit()` };
  } },

  // ---- new maestro (10) ----
  { id: 'funciones-41', difficulty: 'maestro', title: 'Memoización simulada con diccionario', build: () => {
    const n = randInt(5, 10);
    return { prompt: `Crea <code>cache = {}</code> y <code>fib(n)</code> recursiva que primero revise si <code>cache.has(n)</code> (retornando <code>cache[n]</code> si existe); si no, calcule el resultado con la recursión clásica de Fibonacci (caso base <code>n <= 1</code> retorna <code>n</code>), lo guarde en <code>cache[n]</code>, y lo retorne. Imprime <code>fib(${n})</code>.`,
      code: `var cache = {}\nfunc fib(n):\n    if cache.has(n):\n        return cache[n]\n    if n <= 1:\n        return n\n    var resultado = fib(n - 1) + fib(n - 2)\n    cache[n] = resultado\n    return resultado\nprint(fib(${n}))` };
  } },
  { id: 'funciones-42', difficulty: 'maestro', title: 'Función que retorna una función (Callable)', build: () => {
    const n = randInt(1, 10);
    return { prompt: `Crea <code>doblar(n)</code> que retorne <code>n * 2</code>, y <code>obtener_operacion()</code> que retorne <code>doblar</code> (el nombre de la función, sin paréntesis). Crea <code>op = obtener_operacion()</code> y un array <code>numeros = [${n}]</code>. Imprime <code>numeros.map(op)</code>.`,
      code: `func doblar(n):\n    return n * 2\nfunc obtener_operacion():\n    return doblar\nvar op = obtener_operacion()\nvar numeros = [${n}]\nprint(numeros.map(op))` };
  } },
  { id: 'funciones-43', difficulty: 'maestro', title: 'Ordenar manualmente con función auxiliar', build: () => {
    const n = randInt(3, 5);
    const arr = Array.from({ length: n }, () => randInt(1, 50));
    return { prompt: `Crea <code>encontrar_min(lista)</code> que recorra <code>lista</code> con <code>for</code> y retorne el valor mínimo (sin usar <code>min()</code> ni <code>.sort()</code>, hazlo manualmente comparando). Imprime <code>encontrar_min([${arr.join(', ')}])</code>.`,
      code: `func encontrar_min(lista):\n    var minimo = lista[0]\n    for v in lista:\n        if v < minimo:\n            minimo = v\n    return minimo\nprint(encontrar_min([${arr.join(', ')}]))` };
  } },
  { id: 'funciones-44', difficulty: 'maestro', title: 'Función con clase y método combinados', build: () => {
    const ancho = randInt(2, 10), alto = randInt(2, 10);
    return { prompt: `Crea <code>class Rectangulo:</code> con <code>var ancho</code> y <code>var alto</code> definidos en <code>_init(a, h)</code>, y un método <code>area():</code> que retorne <code>self.ancho * self.alto</code>. Crea una función <code>describir(r)</code> que retorne <code>"Área: " + str(r.area())</code>. Instancia <code>rect = Rectangulo.new(${ancho}, ${alto})</code> e imprime <code>describir(rect)</code>.`,
      code: `class Rectangulo:\n    var ancho\n    var alto\n    func _init(a, h):\n        self.ancho = a\n        self.alto = h\n    func area():\n        return self.ancho * self.alto\nfunc describir(r):\n    return "Área: " + str(r.area())\nvar rect = Rectangulo.new(${ancho}, ${alto})\nprint(describir(rect))` };
  } },
  { id: 'funciones-45', difficulty: 'maestro', title: 'Recursión con dos parámetros acumuladores', build: () => {
    const n = randInt(3, 8);
    return { prompt: `Crea <code>suma_hasta(n, acumulado = 0)</code> recursiva: caso base <code>n == 0</code> retorna <code>acumulado</code>; si no, retorna <code>suma_hasta(n - 1, acumulado + n)</code>. Imprime <code>suma_hasta(${n})</code>.`,
      code: `func suma_hasta(n, acumulado = 0):\n    if n == 0:\n        return acumulado\n    return suma_hasta(n - 1, acumulado + n)\nprint(suma_hasta(${n}))` };
  } },
  { id: 'funciones-46', difficulty: 'maestro', title: 'Pipeline de funciones con map y filter', build: () => {
    const n = randInt(5, 7);
    const arr = Array.from({ length: n }, () => randInt(-10, 10));
    return { prompt: `Crea <code>es_positivo(n)</code> que retorne <code>n > 0</code>, y <code>cuadrado(n)</code> que retorne <code>n * n</code>. Crea <code>numeros = [${arr.join(', ')}]</code>. Imprime <code>numeros.filter(es_positivo).map(cuadrado)</code>.`,
      code: `func es_positivo(n):\n    return n > 0\nfunc cuadrado(n):\n    return n * n\nvar numeros = [${arr.join(', ')}]\nprint(numeros.filter(es_positivo).map(cuadrado))` };
  } },
  { id: 'funciones-47', difficulty: 'maestro', title: 'Torres de Hanoi (contar movimientos)', build: () => {
    const n = randInt(3, 6);
    return { prompt: `Crea <code>hanoi(n)</code> recursiva que retorne el número mínimo de movimientos para resolver la Torre de Hanoi con <code>n</code> discos: caso base <code>n == 0</code> retorna 0; si no, retorna <code>2 * hanoi(n - 1) + 1</code>. Imprime <code>hanoi(${n})</code>.`,
      code: `func hanoi(n):\n    if n == 0:\n        return 0\n    return 2 * hanoi(n - 1) + 1\nprint(hanoi(${n}))` };
  } },
  { id: 'funciones-48', difficulty: 'maestro', title: 'Validación en cadena con early return', build: () => {
    const nombre = pickRandom(['', 'Ana', 'Kai']); const edad = randInt(-5, 90);
    return { prompt: `Crea <code>validar(nombre, edad)</code> que retorne <code>"Nombre vacío"</code> si <code>not nombre</code>, <code>"Edad inválida"</code> si <code>edad < 0 or edad > 120</code>, o <code>"Válido"</code> si ambos pasan (usando <code>return</code> temprano en cada caso). Imprime <code>validar("${nombre}", ${edad})</code>.`,
      code: `func validar(nombre, edad):\n    if not nombre:\n        return "Nombre vacío"\n    if edad < 0 or edad > 120:\n        return "Edad inválida"\n    return "Válido"\nprint(validar("${nombre}", ${edad}))` };
  } },
  { id: 'funciones-49', difficulty: 'maestro', title: 'Función que construye y usa una clase', build: () => {
    const n = randInt(3, 5);
    const nombres = ['Ana', 'Kai', 'Sol', 'Leo', 'Mia'].slice(0, n);
    return { prompt: `Crea <code>class Jugador:</code> con <code>var nombre = ""</code> definido en <code>_init(n):</code> como <code>self.nombre = n</code>. Crea <code>crear_equipo(nombres)</code> que recorra <code>nombres</code> con <code>for</code> y retorne un array de instancias <code>Jugador.new(n)</code>. Crea <code>equipo = crear_equipo([${nombres.map(n => `"${n}"`).join(', ')}])</code>. Imprime <code>equipo.size()</code>.`,
      code: `class Jugador:\n    var nombre = ""\n    func _init(n):\n        self.nombre = n\nfunc crear_equipo(nombres):\n    var equipo = []\n    for n in nombres:\n        equipo.append(Jugador.new(n))\n    return equipo\nvar equipo = crear_equipo([${nombres.map(n => `"${n}"`).join(', ')}])\nprint(equipo.size())` };
  } },
  { id: 'funciones-50', difficulty: 'maestro', title: 'Combinación de recursión, match y acumulador', build: () => {
    const n = randInt(4, 8);
    return { prompt: `Crea <code>clasificar_todos(n)</code> recursiva: caso base <code>n == 0</code> retorna <code>""</code>; si no, usa <code>match n % 3:</code> con casos <code>0:</code> retornando <code>"Fizz " + clasificar_todos(n - 1)</code> y <code>_:</code> retornando <code>str(n) + " " + clasificar_todos(n - 1)</code>. Imprime <code>clasificar_todos(${n})</code>.`,
      code: `func clasificar_todos(n):\n    if n == 0:\n        return ""\n    match n % 3:\n        0:\n            return "Fizz " + clasificar_todos(n - 1)\n        _:\n            return str(n) + " " + clasificar_todos(n - 1)\nprint(clasificar_todos(${n}))` };
  } },
];

const arraysGenerators = [
  // ---- migrated originals ----
  { id: 'arrays-1', difficulty: 'facil', title: 'Crear e imprimir un array', build: () => ({
    prompt: 'Crea <code>frutas = ["manzana", "pera", "uva"]</code> e imprímelo directamente con <code>print(frutas)</code>.',
    code: 'var frutas = ["manzana", "pera", "uva"]\nprint(frutas)' }) },
  { id: 'arrays-2', difficulty: 'facil', title: 'Acceder por índice', build: () => ({
    prompt: 'Crea <code>numeros = [10, 20, 30, 40]</code>. Imprime el elemento en la posición 2 con <code>print(numeros[2])</code>.',
    code: 'var numeros = [10, 20, 30, 40]\nprint(numeros[2])' }) },
  { id: 'arrays-3', difficulty: 'facil', title: 'Agregar un elemento', build: () => ({
    prompt: 'Crea <code>lista = [1, 2, 3]</code>. Agrégale el número 4 con <code>.append(4)</code> e imprime la lista.',
    code: 'var lista = [1, 2, 3]\nlista.append(4)\nprint(lista)' }) },
  { id: 'arrays-5', difficulty: 'facil', title: 'Tamaño de un array', build: () => ({
    prompt: 'Crea <code>colores = ["rojo", "verde", "azul", "amarillo"]</code>. Imprime <code>colores.size()</code>.',
    code: 'var colores = ["rojo", "verde", "azul", "amarillo"]\nprint(colores.size())' }) },
  { id: 'arrays-6', difficulty: 'facil', title: 'Verificar si contiene un valor', build: () => ({
    prompt: 'Crea <code>numeros = [5, 10, 15]</code>. Imprime <code>numeros.has(10)</code>.',
    code: 'var numeros = [5, 10, 15]\nprint(numeros.has(10))' }) },
  { id: 'arrays-7', difficulty: 'facil', title: 'Eliminar un elemento', build: () => ({
    prompt: 'Crea <code>lista = [1, 2, 3, 4]</code>. Elimina el valor 3 con <code>.erase(3)</code> e imprime la lista.',
    code: 'var lista = [1, 2, 3, 4]\nlista.erase(3)\nprint(lista)' }) },
  { id: 'arrays-4', difficulty: 'medio', title: 'Sumar todos los elementos', build: () => ({
    prompt: 'Crea <code>numeros = [4, 8, 15, 16, 23]</code> y <code>suma = 0</code>. Con un <code>for</code>, suma todos los elementos e imprime <code>suma</code>.',
    code: 'var numeros = [4, 8, 15, 16, 23]\nvar suma = 0\nfor n in numeros:\n    suma += n\nprint(suma)' }) },
  { id: 'arrays-8', difficulty: 'medio', title: 'Invertir un array', build: () => ({
    prompt: 'Crea <code>lista = [1, 2, 3, 4, 5]</code>. Usa <code>.reverse()</code> para invertirla e imprímela.',
    code: 'var lista = [1, 2, 3, 4, 5]\nlista.reverse()\nprint(lista)' }) },
  { id: 'arrays-9', difficulty: 'medio', title: 'Ordenar un array', build: () => ({
    prompt: 'Crea <code>numeros = [5, 2, 8, 1, 9]</code>. Usa <code>.sort()</code> para ordenarlo de menor a mayor e imprímelo.',
    code: 'var numeros = [5, 2, 8, 1, 9]\nnumeros.sort()\nprint(numeros)' }) },
  { id: 'arrays-10', difficulty: 'dificil', title: 'Filtrar y transformar', build: () => ({
    prompt: 'Crea <code>numeros = [1, 2, 3, 4, 5, 6]</code>, una función <code>es_par(n)</code> que retorne <code>n % 2 == 0</code>, y una función <code>cuadrado(n)</code> que retorne <code>n * n</code>. Imprime <code>numeros.filter(es_par).map(cuadrado)</code>.',
    code: 'var numeros = [1, 2, 3, 4, 5, 6]\nfunc es_par(n):\n    return n % 2 == 0\nfunc cuadrado(n):\n    return n * n\nprint(numeros.filter(es_par).map(cuadrado))' }) },

  // ---- new facil (4) ----
  { id: 'arrays-11', difficulty: 'facil', title: 'Primer elemento', build: () => {
    const arr = [pickRandom(['rojo', 'sol', 'gato']), pickRandom(['verde', 'luna', 'perro']), pickRandom(['azul', 'mar', 'pez'])];
    return { prompt: `Crea <code>lista = ["${arr[0]}", "${arr[1]}", "${arr[2]}"]</code>. Imprime el primer elemento con <code>print(lista[0])</code>.`,
      code: `var lista = ["${arr[0]}", "${arr[1]}", "${arr[2]}"]\nprint(lista[0])` };
  } },
  { id: 'arrays-12', difficulty: 'facil', title: 'Último elemento', build: () => {
    const n = randInt(3, 6);
    const arr = Array.from({ length: n }, () => randInt(1, 50));
    return { prompt: `Crea <code>numeros = [${arr.join(', ')}]</code>. Imprime el último elemento con <code>print(numeros[numeros.size() - 1])</code>.`,
      code: `var numeros = [${arr.join(', ')}]\nprint(numeros[numeros.size() - 1])` };
  } },
  { id: 'arrays-13', difficulty: 'facil', title: 'Array vacío y luego con elementos', build: () => {
    const a = randInt(1, 20), b = randInt(1, 20);
    return { prompt: `Crea <code>lista = []</code>. Agrega ${a} y luego ${b} con dos llamadas a <code>.append()</code>. Imprime <code>lista</code>.`,
      code: `var lista = []\nlista.append(${a})\nlista.append(${b})\nprint(lista)` };
  } },
  { id: 'arrays-14', difficulty: 'facil', title: 'Array vacío', build: () => {
    return { prompt: `Crea <code>lista = []</code>. Imprime <code>lista.size() == 0</code>.`,
      code: `var lista = []\nprint(lista.size() == 0)` };
  } },

  // ---- new medio (7) ----
  { id: 'arrays-15', difficulty: 'medio', title: 'Promedio de un array', build: () => {
    const n = randInt(3, 5);
    const arr = Array.from({ length: n }, () => randInt(1, 20));
    return { prompt: `Crea <code>numeros = [${arr.join(', ')}]</code>. Usa un <code>for</code> para sumar todos los valores y luego imprime <code>suma / numeros.size()</code>.`,
      code: `var numeros = [${arr.join(', ')}]\nvar suma = 0\nfor n in numeros:\n    suma += n\nprint(suma / numeros.size())` };
  } },
  { id: 'arrays-16', difficulty: 'medio', title: 'Concatenar dos arrays', build: () => {
    const a = [randInt(1, 20), randInt(1, 20)];
    const b = [randInt(1, 20), randInt(1, 20)];
    return { prompt: `Crea <code>a = [${a.join(', ')}]</code> y <code>b = [${b.join(', ')}]</code>. Imprime <code>a + b</code>.`,
      code: `var a = [${a.join(', ')}]\nvar b = [${b.join(', ')}]\nprint(a + b)` };
  } },
  { id: 'arrays-17', difficulty: 'medio', title: 'Insertar en una posición', build: () => {
    const arr = [randInt(1, 20), randInt(1, 20), randInt(1, 20)];
    const valor = randInt(1, 20);
    return { prompt: `Crea <code>lista = [${arr.join(', ')}]</code>. Usa <code>.insert(1, ${valor})</code> para insertar ${valor} en la posición 1 e imprime <code>lista</code>.`,
      code: `var lista = [${arr.join(', ')}]\nlista.insert(1, ${valor})\nprint(lista)` };
  } },
  { id: 'arrays-18', difficulty: 'medio', title: 'Duplicar un array', build: () => {
    const arr = [randInt(1, 20), randInt(1, 20), randInt(1, 20)];
    return { prompt: `Crea <code>original = [${arr.join(', ')}]</code>. Usa <code>.duplicate()</code> para crear <code>copia</code>, agrégale un 99 a <code>copia</code> con <code>.append(99)</code>, e imprime <code>original</code> (debe quedar intacto).`,
      code: `var original = [${arr.join(', ')}]\nvar copia = original.duplicate()\ncopia.append(99)\nprint(original)` };
  } },
  { id: 'arrays-19', difficulty: 'medio', title: 'Encontrar el índice de un valor', build: () => {
    const arr = [randInt(1, 20), randInt(1, 20), randInt(1, 20), randInt(1, 20)];
    const buscado = pickRandom(arr);
    return { prompt: `Crea <code>lista = [${arr.join(', ')}]</code>. Imprime <code>lista.find(${buscado})</code> (la posición del valor ${buscado}).`,
      code: `var lista = [${arr.join(', ')}]\nprint(lista.find(${buscado}))` };
  } },
  { id: 'arrays-20', difficulty: 'medio', title: 'Rebanar un array (slice)', build: () => {
    const arr = Array.from({ length: 6 }, () => randInt(1, 50));
    return { prompt: `Crea <code>lista = [${arr.join(', ')}]</code>. Imprime <code>lista.slice(1, 4)</code> (del índice 1 al 3, sin incluir el 4).`,
      code: `var lista = [${arr.join(', ')}]\nprint(lista.slice(1, 4))` };
  } },
  { id: 'arrays-21', difficulty: 'medio', title: 'Contar apariciones simuladas', build: () => {
    const objetivo = randInt(1, 5);
    const arr = Array.from({ length: 6 }, () => randInt(1, 5));
    return { prompt: `Crea <code>lista = [${arr.join(', ')}]</code> y <code>contador = 0</code>. Recorre con <code>for</code> y suma 1 a <code>contador</code> cada vez que encuentres el valor ${objetivo}. Imprime <code>contador</code>.`,
      code: `var lista = [${arr.join(', ')}]\nvar contador = 0\nfor v in lista:\n    if v == ${objetivo}:\n        contador += 1\nprint(contador)` };
  } },

  // ---- new dificil (9) ----
  { id: 'arrays-22', difficulty: 'dificil', title: 'Array bidimensional', build: () => {
    const filas = randInt(2, 3), cols = randInt(2, 3);
    const matriz = Array.from({ length: filas }, () => Array.from({ length: cols }, () => randInt(1, 9)));
    const matrizStr = '[' + matriz.map(f => '[' + f.join(', ') + ']').join(', ') + ']';
    const fi = randInt(0, filas - 1), ci = randInt(0, cols - 1);
    return { prompt: `Crea <code>matriz = ${matrizStr}</code>. Imprime <code>matriz[${fi}][${ci}]</code>.`,
      code: `var matriz = ${matrizStr}\nprint(matriz[${fi}][${ci}])` };
  } },
  { id: 'arrays-23', difficulty: 'dificil', title: 'Map con una función auxiliar', build: () => {
    const arr = Array.from({ length: 4 }, () => randInt(1, 10));
    return { prompt: `Crea una función <code>al_cubo(n)</code> que retorne <code>n * n * n</code>. Crea <code>numeros = [${arr.join(', ')}]</code> e imprime <code>numeros.map(al_cubo)</code>.`,
      code: `func al_cubo(n):\n    return n * n * n\nvar numeros = [${arr.join(', ')}]\nprint(numeros.map(al_cubo))` };
  } },
  { id: 'arrays-24', difficulty: 'dificil', title: 'Reduce para el máximo simulado', build: () => {
    const arr = Array.from({ length: 5 }, () => randInt(1, 50));
    return { prompt: `Crea una función <code>mayor(a, b)</code> que retorne el mayor de los dos con <code>if/else</code>. Crea <code>numeros = [${arr.join(', ')}]</code> e imprime <code>numeros.reduce(mayor)</code>.`,
      code: `func mayor(a, b):\n    if a > b:\n        return a\n    else:\n        return b\nvar numeros = [${arr.join(', ')}]\nprint(numeros.reduce(mayor))` };
  } },
  { id: 'arrays-25', difficulty: 'dificil', title: 'Quitar el primer elemento', build: () => {
    const arr = Array.from({ length: 5 }, () => randInt(1, 50));
    return { prompt: `Crea <code>lista = [${arr.join(', ')}]</code>. Usa <code>.pop_front()</code> para quitar y obtener el primer elemento, guárdalo en <code>eliminado</code>, e imprime <code>eliminado</code> y luego <code>lista</code> (cada uno en su propia línea).`,
      code: `var lista = [${arr.join(', ')}]\nvar eliminado = lista.pop_front()\nprint(eliminado)\nprint(lista)` };
  } },
  { id: 'arrays-26', difficulty: 'dificil', title: 'Array de diccionarios', build: () => {
    const jugadores = [
      { nombre: pickRandom(['Ana', 'Kai']), vida: randInt(50, 100) },
      { nombre: pickRandom(['Sol', 'Leo']), vida: randInt(50, 100) },
    ];
    const arrStr = '[' + jugadores.map(j => `{"nombre": "${j.nombre}", "vida": ${j.vida}}`).join(', ') + ']';
    return { prompt: `Crea <code>jugadores = ${arrStr}</code>. Con un <code>for</code>, imprime el nombre de cada jugador con <code>print(j["nombre"])</code>.`,
      code: `var jugadores = ${arrStr}\nfor j in jugadores:\n    print(j["nombre"])` };
  } },
  { id: 'arrays-27', difficulty: 'dificil', title: 'Construir un array con bucle y condición', build: () => {
    const n = randInt(10, 20);
    return { prompt: `Crea <code>multiplos = []</code>. Usa un <code>for</code> con <code>range(1, ${n + 1})</code> para agregar a <code>multiplos</code> (con <code>.append()</code>) solo los números que sean múltiplos de 3. Imprime <code>multiplos</code>.`,
      code: `var multiplos = []\nfor i in range(1, ${n + 1}):\n    if i % 3 == 0:\n        multiplos.append(i)\nprint(multiplos)` };
  } },
  { id: 'arrays-28', difficulty: 'dificil', title: 'Comparar dos arrays elemento a elemento', build: () => {
    const n = randInt(3, 4);
    const a = Array.from({ length: n }, () => randInt(1, 10));
    const b = a.map((v, i) => i === 0 ? v + 1 : v);
    return { prompt: `Crea <code>a = [${a.join(', ')}]</code> y <code>b = [${b.join(', ')}]</code>, y <code>diferencias = 0</code>. Usa un <code>for</code> con <code>range(a.size())</code> para comparar <code>a[i]</code> con <code>b[i]</code>, sumando 1 a <code>diferencias</code> si son distintos. Imprime <code>diferencias</code>.`,
      code: `var a = [${a.join(', ')}]\nvar b = [${b.join(', ')}]\nvar diferencias = 0\nfor i in range(a.size()):\n    if a[i] != b[i]:\n        diferencias += 1\nprint(diferencias)` };
  } },
  { id: 'arrays-29', difficulty: 'dificil', title: 'Unir un array de textos', build: () => {
    const palabras = ['sol', 'luna', 'mar', 'cielo', 'viento'].sort(() => Math.random() - 0.5).slice(0, 3);
    return { prompt: `Crea <code>palabras = [${palabras.map(p => `"${p}"`).join(', ')}]</code>. Imprime <code>palabras.join(", ")</code>.`,
      code: `var palabras = [${palabras.map(p => `"${p}"`).join(', ')}]\nprint(palabras.join(", "))` };
  } },
  { id: 'arrays-30', difficulty: 'dificil', title: 'Verificar si todos cumplen una condición', build: () => {
    const arr = Array.from({ length: 4 }, () => randInt(1, 20));
    return { prompt: `Crea <code>numeros = [${arr.join(', ')}]</code> y <code>todos_positivos = true</code>. Recorre con <code>for</code> y, si encuentras un valor <code>&lt;= 0</code>, cambia <code>todos_positivos</code> a <code>false</code>. Imprime <code>todos_positivos</code>.`,
      code: `var numeros = [${arr.join(', ')}]\nvar todos_positivos = true\nfor n in numeros:\n    if n <= 0:\n        todos_positivos = false\nprint(todos_positivos)` };
  } },

  // ---- new experto (10) ----
  { id: 'arrays-31', difficulty: 'experto', title: 'Pipeline filter + map + reduce', build: () => {
    const arr = Array.from({ length: 6 }, () => randInt(-10, 10));
    return { prompt: `Crea <code>es_positivo(n)</code> que retorne <code>n > 0</code>, <code>cuadrado(n)</code> que retorne <code>n * n</code>, y <code>sumar(a, b)</code> que retorne <code>a + b</code>. Crea <code>numeros = [${arr.join(', ')}]</code>. Imprime <code>numeros.filter(es_positivo).map(cuadrado).reduce(sumar)</code>.`,
      code: `func es_positivo(n):\n    return n > 0\nfunc cuadrado(n):\n    return n * n\nfunc sumar(a, b):\n    return a + b\nvar numeros = [${arr.join(', ')}]\nprint(numeros.filter(es_positivo).map(cuadrado).reduce(sumar))` };
  } },
  { id: 'arrays-32', difficulty: 'experto', title: 'Array de arrays con acumulación', build: () => {
    const grupos = [
      Array.from({ length: 2 }, () => randInt(1, 10)),
      Array.from({ length: 2 }, () => randInt(1, 10)),
      Array.from({ length: 2 }, () => randInt(1, 10)),
    ];
    const grupoStr = '[' + grupos.map(g => '[' + g.join(', ') + ']').join(', ') + ']';
    return { prompt: `Crea <code>grupos = ${grupoStr}</code> y <code>total = 0</code>. Recorre con dos <code>for</code> anidados (grupo, luego valor) sumando todo a <code>total</code>. Imprime <code>total</code>.`,
      code: `var grupos = ${grupoStr}\nvar total = 0\nfor grupo in grupos:\n    for valor in grupo:\n        total += valor\nprint(total)` };
  } },
  { id: 'arrays-33', difficulty: 'experto', title: 'Buscar el segundo mayor', build: () => {
    const arr = Array.from({ length: 5 }, () => randInt(1, 99));
    return { prompt: `Crea <code>numeros = [${arr.join(', ')}]</code>. Usa <code>.sort()</code> y luego <code>.reverse()</code> para ordenarlo de mayor a menor. Imprime <code>numeros[1]</code> (el segundo mayor).`,
      code: `var numeros = [${arr.join(', ')}]\nnumeros.sort()\nnumeros.reverse()\nprint(numeros[1])` };
  } },
  { id: 'arrays-34', difficulty: 'experto', title: 'Construir diccionario de frecuencias', build: () => {
    const arr = Array.from({ length: 6 }, () => pickRandom(['a', 'b', 'c']));
    return { prompt: `Crea <code>letras = [${arr.map(l => `"${l}"`).join(', ')}]</code> y <code>frecuencia = {}</code>. Recorre con <code>for</code>: si <code>frecuencia.has(letra)</code>, incrementa su valor en 1; si no, asígnale 1. Imprime <code>frecuencia</code>.`,
      code: `var letras = [${arr.map(l => `"${l}"`).join(', ')}]\nvar frecuencia = {}\nfor letra in letras:\n    if frecuencia.has(letra):\n        frecuencia[letra] += 1\n    else:\n        frecuencia[letra] = 1\nprint(frecuencia)` };
  } },
  { id: 'arrays-35', difficulty: 'experto', title: 'Array con objetos y método de clase', build: () => {
    const vidas = [randInt(1, 100), randInt(1, 100), randInt(1, 100)];
    return { prompt: `Crea <code>class Enemigo:</code> con <code>var vida</code> definida en <code>_init(v): self.vida = v</code>, y un método <code>esta_vivo(): return self.vida > 0</code>. Crea <code>enemigos = [Enemigo.new(${vidas[0]}), Enemigo.new(${vidas[1]}), Enemigo.new(${vidas[2]})]</code> y <code>vivos = 0</code>. Recorre con <code>for</code> sumando 1 a <code>vivos</code> por cada uno vivo. Imprime <code>vivos</code>.`,
      code: `class Enemigo:\n    var vida\n    func _init(v):\n        self.vida = v\n    func esta_vivo():\n        return self.vida > 0\nvar enemigos = [Enemigo.new(${vidas[0]}), Enemigo.new(${vidas[1]}), Enemigo.new(${vidas[2]})]\nvar vivos = 0\nfor e in enemigos:\n    if e.esta_vivo():\n        vivos += 1\nprint(vivos)` };
  } },
  { id: 'arrays-36', difficulty: 'experto', title: 'Dividir un array en dos según condición', build: () => {
    const arr = Array.from({ length: 6 }, () => randInt(1, 30));
    return { prompt: `Crea <code>numeros = [${arr.join(', ')}]</code>, <code>menores = []</code> y <code>mayores = []</code>. Recorre con <code>for</code>: si el valor es menor a 15 agrégalo a <code>menores</code>, si no a <code>mayores</code>. Imprime primero <code>menores</code> y luego <code>mayores</code>.`,
      code: `var numeros = [${arr.join(', ')}]\nvar menores = []\nvar mayores = []\nfor n in numeros:\n    if n < 15:\n        menores.append(n)\n    else:\n        mayores.append(n)\nprint(menores)\nprint(mayores)` };
  } },
  { id: 'arrays-37', difficulty: 'experto', title: 'Aplanar un array de arrays', build: () => {
    const grupos = [Array.from({ length: 2 }, () => randInt(1, 9)), Array.from({ length: 2 }, () => randInt(1, 9))];
    const grupoStr = '[' + grupos.map(g => '[' + g.join(', ') + ']').join(', ') + ']';
    return { prompt: `Crea <code>grupos = ${grupoStr}</code> y <code>plano = []</code>. Recorre con dos <code>for</code> anidados y agrega cada valor individual a <code>plano</code> con <code>.append()</code>. Imprime <code>plano</code>.`,
      code: `var grupos = ${grupoStr}\nvar plano = []\nfor grupo in grupos:\n    for valor in grupo:\n        plano.append(valor)\nprint(plano)` };
  } },
  { id: 'arrays-38', difficulty: 'experto', title: 'Encontrar posiciones que cumplen condición', build: () => {
    const arr = Array.from({ length: 6 }, () => randInt(1, 20));
    const umbral = randInt(5, 15);
    return { prompt: `Crea <code>numeros = [${arr.join(', ')}]</code> y <code>posiciones = []</code>. Usa un <code>for</code> con <code>range(numeros.size())</code> para agregar el índice <code>i</code> a <code>posiciones</code> cuando <code>numeros[i] > ${umbral}</code>. Imprime <code>posiciones</code>.`,
      code: `var numeros = [${arr.join(', ')}]\nvar posiciones = []\nfor i in range(numeros.size()):\n    if numeros[i] > ${umbral}:\n        posiciones.append(i)\nprint(posiciones)` };
  } },
  { id: 'arrays-39', difficulty: 'experto', title: 'Array con señal al superar un límite', build: () => {
    const arr = Array.from({ length: 5 }, () => randInt(1, 30));
    const limite = randInt(50, 90);
    return { prompt: `Crea <code>signal limite_superado</code> y <code>func on_limite(): print("¡Alerta!")</code> (conéctala a la señal). Crea <code>numeros = [${arr.join(', ')}]</code> y <code>suma = 0</code>. Recorre con <code>for</code> sumando cada valor; si en algún momento <code>suma > ${limite}</code>, emite <code>limite_superado</code> con <code>.emit()</code>.`,
      code: `signal limite_superado\nfunc on_limite():\n    print("¡Alerta!")\nlimite_superado.connect(on_limite)\nvar numeros = [${arr.join(', ')}]\nvar suma = 0\nfor n in numeros:\n    suma += n\n    if suma > ${limite}:\n        limite_superado.emit()` };
  } },
  { id: 'arrays-40', difficulty: 'experto', title: 'Array tipado', build: () => {
    const arr = Array.from({ length: 4 }, () => randInt(1, 20));
    return { prompt: `Crea <code>var numeros: Array[int] = [${arr.join(', ')}]</code> (array tipado). Con un <code>for</code>, imprime la suma de todos los valores.`,
      code: `var numeros: Array[int] = [${arr.join(', ')}]\nvar suma = 0\nfor n in numeros:\n    suma += n\nprint(suma)` };
  } },

  // ---- new maestro (10) ----
  { id: 'arrays-41', difficulty: 'maestro', title: 'Ordenamiento burbuja manual', build: () => {
    const arr = Array.from({ length: 5 }, () => randInt(1, 50));
    return { prompt: `Crea <code>numeros = [${arr.join(', ')}]</code>. Implementa un ordenamiento burbuja manual: usa un <code>for i in range(numeros.size()):</code> y adentro <code>for j in range(0, numeros.size() - 1):</code>; si <code>numeros[j] > numeros[j + 1]</code>, intercambia ambos usando una variable temporal. Imprime <code>numeros</code> al final.`,
      code: `var numeros = [${arr.join(', ')}]\nfor i in range(numeros.size()):\n    for j in range(0, numeros.size() - 1):\n        if numeros[j] > numeros[j + 1]:\n            var temp = numeros[j]\n            numeros[j] = numeros[j + 1]\n            numeros[j + 1] = temp\nprint(numeros)` };
  } },
  { id: 'arrays-42', difficulty: 'maestro', title: 'Búsqueda binaria manual', build: () => {
    const size = 7;
    const arr = Array.from({ length: size }, (_, i) => i * 2 + randInt(0, 1)).sort((a, b) => a - b);
    const objetivo = pickRandom(arr);
    return { prompt: `Crea <code>numeros = [${arr.join(', ')}]</code> (ya ordenado) y <code>objetivo = ${objetivo}</code>. Implementa búsqueda binaria: <code>izq = 0</code>, <code>der = numeros.size() - 1</code>, <code>encontrado = -1</code>. Con <code>while izq <= der:</code>, calcula <code>medio = (izq + der) / 2</code>; si <code>numeros[medio] == objetivo</code>, guarda <code>encontrado = medio</code> y usa <code>break</code>; si <code>numeros[medio] < objetivo</code>, mueve <code>izq = medio + 1</code>, si no <code>der = medio - 1</code>. Imprime <code>encontrado</code>.`,
      code: `var numeros = [${arr.join(', ')}]\nvar objetivo = ${objetivo}\nvar izq = 0\nvar der = numeros.size() - 1\nvar encontrado = -1\nwhile izq <= der:\n    var medio = (izq + der) / 2\n    if numeros[medio] == objetivo:\n        encontrado = medio\n        break\n    elif numeros[medio] < objetivo:\n        izq = medio + 1\n    else:\n        der = medio - 1\nprint(encontrado)` };
  } },
  { id: 'arrays-43', difficulty: 'maestro', title: 'Agrupar objetos por categoría', build: () => {
    const items = [
      { nombre: pickRandom(['espada', 'arco']), tipo: 'arma' },
      { nombre: pickRandom(['poción', 'elixir']), tipo: 'consumible' },
      { nombre: pickRandom(['escudo', 'casco']), tipo: 'armadura' },
    ];
    const itemsStr = '[' + items.map(i => `{"nombre": "${i.nombre}", "tipo": "${i.tipo}"}`).join(', ') + ']';
    return { prompt: `Crea <code>items = ${itemsStr}</code> y <code>grupos = {}</code>. Recorre con <code>for</code>: si <code>grupos.has(item["tipo"])</code>, usa <code>.append()</code> sobre esa lista para agregar <code>item["nombre"]</code>; si no, crea <code>grupos[item["tipo"]] = [item["nombre"]]</code>. Imprime <code>grupos</code>.`,
      code: `var items = ${itemsStr}\nvar grupos = {}\nfor item in items:\n    if grupos.has(item["tipo"]):\n        grupos[item["tipo"]].append(item["nombre"])\n    else:\n        grupos[item["tipo"]] = [item["nombre"]]\nprint(grupos)` };
  } },
  { id: 'arrays-44', difficulty: 'maestro', title: 'Eliminar duplicados manualmente', build: () => {
    const base = Array.from({ length: 4 }, () => randInt(1, 5));
    const arr = [...base, ...base];
    return { prompt: `Crea <code>numeros = [${arr.join(', ')}]</code> y <code>unicos = []</code>. Recorre con <code>for</code> y agrega cada valor a <code>unicos</code> solo si <code>not unicos.has(valor)</code>. Imprime <code>unicos</code>.`,
      code: `var numeros = [${arr.join(', ')}]\nvar unicos = []\nfor valor in numeros:\n    if not unicos.has(valor):\n        unicos.append(valor)\nprint(unicos)` };
  } },
  { id: 'arrays-45', difficulty: 'maestro', title: 'Pipeline completo con clase, filter y reduce', build: () => {
    const vidas = [randInt(1, 100), randInt(1, 100), randInt(1, 100), randInt(1, 100)];
    return { prompt: `Crea <code>class Personaje:</code> con <code>var vida</code> en <code>_init(v): self.vida = v</code>. Crea las funciones <code>esta_vivo(p)</code> (retorna <code>p.vida > 0</code>), <code>obtener_vida(p)</code> (retorna <code>p.vida</code>) y <code>sumar(a, b)</code> (retorna <code>a + b</code>). Crea <code>personajes = [Personaje.new(${vidas[0]}), Personaje.new(${vidas[1]}), Personaje.new(${vidas[2]}), Personaje.new(${vidas[3]})]</code>. Imprime <code>personajes.filter(esta_vivo).map(obtener_vida).reduce(sumar)</code>.`,
      code: `class Personaje:\n    var vida\n    func _init(v):\n        self.vida = v\nfunc esta_vivo(p):\n    return p.vida > 0\nfunc obtener_vida(p):\n    return p.vida\nfunc sumar(a, b):\n    return a + b\nvar personajes = [Personaje.new(${vidas[0]}), Personaje.new(${vidas[1]}), Personaje.new(${vidas[2]}), Personaje.new(${vidas[3]})]\nprint(personajes.filter(esta_vivo).map(obtener_vida).reduce(sumar))` };
  } },
  { id: 'arrays-46', difficulty: 'maestro', title: 'Matriz transpuesta manual', build: () => {
    const matriz = [[randInt(1, 9), randInt(1, 9)], [randInt(1, 9), randInt(1, 9)]];
    const matrizStr = '[' + matriz.map(f => '[' + f.join(', ') + ']').join(', ') + ']';
    return { prompt: `Crea <code>matriz = ${matrizStr}</code> (2x2) y <code>transpuesta = [[0, 0], [0, 0]]</code>. Usa dos <code>for</code> anidados con <code>range(2)</code> (<code>i</code>, luego <code>j</code>) para asignar <code>transpuesta[j][i] = matriz[i][j]</code>. Imprime <code>transpuesta</code>.`,
      code: `var matriz = ${matrizStr}\nvar transpuesta = [[0, 0], [0, 0]]\nfor i in range(2):\n    for j in range(2):\n        transpuesta[j][i] = matriz[i][j]\nprint(transpuesta)` };
  } },
  { id: 'arrays-47', difficulty: 'maestro', title: 'Simulación de cola con arrays', build: () => {
    const arr = Array.from({ length: 4 }, () => randInt(1, 20));
    return { prompt: `Crea <code>cola = [${arr.join(', ')}]</code>. Simula atender la cola: mientras <code>cola.size() > 0</code>, imprime <code>"Atendiendo: " + str(cola[0])</code> y elimina ese primer elemento con <code>.pop_front()</code>.`,
      code: `var cola = [${arr.join(', ')}]\nwhile cola.size() > 0:\n    print("Atendiendo: " + str(cola[0]))\n    cola.pop_front()` };
  } },
  { id: 'arrays-48', difficulty: 'maestro', title: 'Contar frecuencia y encontrar el más repetido', build: () => {
    const opciones = ['espada', 'escudo', 'poción'];
    const arr = Array.from({ length: 6 }, () => pickRandom(opciones));
    return { prompt: `Crea <code>objetos = [${arr.map(o => `"${o}"`).join(', ')}]</code> y <code>frecuencia = {}</code>. Recorre con <code>for</code> contando ocurrencias (igual que un diccionario de frecuencias). Luego recorre <code>frecuencia.keys()</code> para encontrar la clave con el valor más alto, guardándola en <code>mas_comun</code>. Imprime <code>mas_comun</code>.`,
      code: `var objetos = [${arr.map(o => `"${o}"`).join(', ')}]\nvar frecuencia = {}\nfor o in objetos:\n    if frecuencia.has(o):\n        frecuencia[o] += 1\n    else:\n        frecuencia[o] = 1\nvar mas_comun = ""\nvar maximo = 0\nfor clave in frecuencia.keys():\n    if frecuencia[clave] > maximo:\n        maximo = frecuencia[clave]\n        mas_comun = clave\nprint(mas_comun)` };
  } },
  { id: 'arrays-49', difficulty: 'maestro', title: 'Sistema de inventario con clases y arrays', build: () => {
    const items = [
      { nombre: pickRandom(['espada', 'poción']), peso: randInt(1, 10) },
      { nombre: pickRandom(['escudo', 'mapa']), peso: randInt(1, 10) },
    ];
    return { prompt: `Crea <code>class Item:</code> con <code>var nombre</code> y <code>var peso</code> en <code>_init(n, p)</code>. Crea <code>inventario = [Item.new("${items[0].nombre}", ${items[0].peso}), Item.new("${items[1].nombre}", ${items[1].peso})]</code>. Crea una función <code>peso_total(inv)</code> que recorra el array con <code>for</code> sumando <code>item.peso</code>. Imprime <code>peso_total(inventario)</code>.`,
      code: `class Item:\n    var nombre\n    var peso\n    func _init(n, p):\n        self.nombre = n\n        self.peso = p\nvar inventario = [Item.new("${items[0].nombre}", ${items[0].peso}), Item.new("${items[1].nombre}", ${items[1].peso})]\nfunc peso_total(inv):\n    var total = 0\n    for item in inv:\n        total += item.peso\n    return total\nprint(peso_total(inventario))` };
  } },
  { id: 'arrays-50', difficulty: 'maestro', title: 'Generar y filtrar una tabla de multiplicar', build: () => {
    const tabla = randInt(2, 9);
    const umbral = randInt(20, 60);
    return { prompt: `Crea <code>resultados = []</code>. Usa un <code>for</code> con <code>range(1, 11)</code> para calcular <code>${tabla} * i</code> y agregarlo a <code>resultados</code> solo si el valor es mayor a ${umbral}. Imprime <code>resultados</code>.`,
      code: `var resultados = []\nfor i in range(1, 11):\n    var v = ${tabla} * i\n    if v > ${umbral}:\n        resultados.append(v)\nprint(resultados)` };
  } },
];

const diccionariosGenerators = [
  // ---- migrated originals ----
  { id: 'diccionarios-1', difficulty: 'facil', title: 'Crear e imprimir un diccionario', build: () => ({
    prompt: 'Crea <code>persona = {"nombre": "Ana", "edad": 25}</code> e imprímelo directamente con <code>print(persona)</code>.',
    code: 'var persona = {"nombre": "Ana", "edad": 25}\nprint(persona)' }) },
  { id: 'diccionarios-3', difficulty: 'facil', title: 'Acceder a una clave', build: () => ({
    prompt: 'Crea <code>persona = {"nombre": "Leo", "edad": 30}</code>. Imprime <code>persona["nombre"]</code>.',
    code: 'var persona = {"nombre": "Leo", "edad": 30}\nprint(persona["nombre"])' }) },
  { id: 'diccionarios-5', difficulty: 'facil', title: 'Verificar si existe una clave', build: () => ({
    prompt: 'Crea <code>stock = {"manzana": 5, "pera": 3}</code>. Imprime <code>stock.has("manzana")</code>.',
    code: 'var stock = {"manzana": 5, "pera": 3}\nprint(stock.has("manzana"))' }) },
  { id: 'diccionarios-6', difficulty: 'facil', title: 'Tamaño de un diccionario', build: () => ({
    prompt: 'Crea <code>colores = {"rojo": 1, "verde": 2, "azul": 3}</code>. Imprime <code>colores.size()</code>.',
    code: 'var colores = {"rojo": 1, "verde": 2, "azul": 3}\nprint(colores.size())' }) },
  { id: 'diccionarios-2', difficulty: 'medio', title: 'Modificar un valor', build: () => ({
    prompt: 'Crea <code>puntajes = {"jugador1": 100, "jugador2": 80}</code>. Cambia el valor de <code>"jugador1"</code> a 150 e imprime el diccionario.',
    code: 'var puntajes = {"jugador1": 100, "jugador2": 80}\npuntajes["jugador1"] = 150\nprint(puntajes)' }) },
  { id: 'diccionarios-4', difficulty: 'medio', title: 'Agregar una nueva clave', build: () => ({
    prompt: 'Crea <code>persona = {"nombre": "Sol"}</code>. Agrega la clave <code>"edad"</code> con valor 22, e imprime el diccionario.',
    code: 'var persona = {"nombre": "Sol"}\npersona["edad"] = 22\nprint(persona)' }) },
  { id: 'diccionarios-7', difficulty: 'medio', title: 'Recorrer claves', build: () => ({
    prompt: 'Crea <code>precios = {"pan": 2, "leche": 3, "huevo": 4}</code>. Con un <code>for</code> sobre <code>precios.keys()</code>, imprime cada clave.',
    code: 'var precios = {"pan": 2, "leche": 3, "huevo": 4}\nfor clave in precios.keys():\n    print(clave)' }) },
  { id: 'diccionarios-8', difficulty: 'medio', title: 'Recorrer valores', build: () => ({
    prompt: 'Crea <code>notas = {"mate": 8, "lengua": 9, "arte": 7}</code> y <code>suma = 0</code>. Con un <code>for</code> sobre <code>notas.values()</code>, suma todo e imprime <code>suma</code>.',
    code: 'var notas = {"mate": 8, "lengua": 9, "arte": 7}\nvar suma = 0\nfor v in notas.values():\n    suma += v\nprint(suma)' }) },
  { id: 'diccionarios-10', difficulty: 'medio', title: 'Diccionario anidado', build: () => ({
    prompt: 'Crea <code>jugador = {"nombre": "Kai", "stats": {"vida": 100, "nivel": 5}}</code>. Imprime <code>jugador["stats"]["nivel"]</code>.',
    code: 'var jugador = {"nombre": "Kai", "stats": {"vida": 100, "nivel": 5}}\nprint(jugador["stats"]["nivel"])' }) },
  { id: 'diccionarios-9', difficulty: 'dificil', title: 'Eliminar una clave', build: () => ({
    prompt: 'Crea <code>inventario = {"espada": 1, "poción": 3, "mapa": 1}</code>. Elimina la clave <code>"mapa"</code> con <code>.erase("mapa")</code> e imprime el diccionario.',
    code: 'var inventario = {"espada": 1, "poción": 3, "mapa": 1}\ninventario.erase("mapa")\nprint(inventario)' }) },

  // ---- new facil (6) ----
  { id: 'diccionarios-11', difficulty: 'facil', title: 'Diccionario numérico', build: () => {
    const a = randInt(1, 100), b = randInt(1, 100);
    return { prompt: `Crea <code>puntos = {"jugador1": ${a}, "jugador2": ${b}}</code>. Imprime <code>puntos["jugador2"]</code>.`,
      code: `var puntos = {"jugador1": ${a}, "jugador2": ${b}}\nprint(puntos["jugador2"])` };
  } },
  { id: 'diccionarios-12', difficulty: 'facil', title: 'Diccionario con clave numérica', build: () => {
    const nombre = pickRandom(['Espada', 'Escudo', 'Poción']);
    return { prompt: `Crea <code>objetos = {1: "${nombre}", 2: "Mapa"}</code>. Imprime <code>objetos[1]</code>.`,
      code: `var objetos = {1: "${nombre}", 2: "Mapa"}\nprint(objetos[1])` };
  } },
  { id: 'diccionarios-13', difficulty: 'facil', title: 'Diccionario vacío', build: () => {
    const clave = pickRandom(['nombre', 'vida', 'nivel']);
    const valor = randInt(1, 20);
    return { prompt: `Crea <code>datos = {}</code>. Agrega la clave <code>"${clave}"</code> con valor <code>${valor}</code> e imprime <code>datos</code>.`,
      code: `var datos = {}\ndatos["${clave}"] = ${valor}\nprint(datos)` };
  } },
  { id: 'diccionarios-14', difficulty: 'facil', title: 'Verificar clave inexistente', build: () => {
    return { prompt: `Crea <code>stock = {"pan": 2, "leche": 5}</code>. Imprime <code>stock.has("huevo")</code>.`,
      code: `var stock = {"pan": 2, "leche": 5}\nprint(stock.has("huevo"))` };
  } },
  { id: 'diccionarios-15', difficulty: 'facil', title: 'Diccionario con booleanos', build: () => {
    const activo = pickRandom([true, false]);
    return { prompt: `Crea <code>config = {"sonido": true, "musica": ${activo}}</code>. Imprime <code>config["musica"]</code>.`,
      code: `var config = {"sonido": true, "musica": ${activo}}\nprint(config["musica"])` };
  } },
  { id: 'diccionarios-16', difficulty: 'facil', title: 'Tamaño de un diccionario pequeño', build: () => {
    const n = randInt(1, 4);
    const claves = ['a', 'b', 'c', 'd'].slice(0, n);
    const dictStr = '{' + claves.map(c => `"${c}": ${randInt(1, 20)}`).join(', ') + '}';
    return { prompt: `Crea <code>datos = ${dictStr}</code>. Imprime <code>datos.size()</code>.`,
      code: `var datos = ${dictStr}\nprint(datos.size())` };
  } },

  // ---- new medio (5) ----
  { id: 'diccionarios-17', difficulty: 'medio', title: 'Sumar valores de un diccionario', build: () => {
    const precios = { manzana: randInt(1, 10), pera: randInt(1, 10), uva: randInt(1, 10) };
    return { prompt: `Crea <code>precios = {"manzana": ${precios.manzana}, "pera": ${precios.pera}, "uva": ${precios.uva}}</code> y <code>total = 0</code>. Con un <code>for</code> sobre <code>precios.values()</code>, suma todo e imprime <code>total</code>.`,
      code: `var precios = {"manzana": ${precios.manzana}, "pera": ${precios.pera}, "uva": ${precios.uva}}\nvar total = 0\nfor v in precios.values():\n    total += v\nprint(total)` };
  } },
  { id: 'diccionarios-18', difficulty: 'medio', title: 'Incrementar un valor existente', build: () => {
    const inicio = randInt(1, 20); const suma = randInt(1, 10);
    return { prompt: `Crea <code>inventario = {"oro": ${inicio}}</code>. Increméntalo en ${suma} con <code>inventario["oro"] += ${suma}</code>. Imprime <code>inventario</code>.`,
      code: `var inventario = {"oro": ${inicio}}\ninventario["oro"] += ${suma}\nprint(inventario)` };
  } },
  { id: 'diccionarios-19', difficulty: 'medio', title: 'Duplicar un diccionario', build: () => {
    const a = randInt(1, 20);
    return { prompt: `Crea <code>original = {"vida": ${a}}</code>. Usa <code>.duplicate()</code> para crear <code>copia</code>, modifica <code>copia["vida"] = 0</code>, e imprime <code>original</code> (debe quedar intacto).`,
      code: `var original = {"vida": ${a}}\nvar copia = original.duplicate()\ncopia["vida"] = 0\nprint(original)` };
  } },
  { id: 'diccionarios-20', difficulty: 'medio', title: 'Recorrer clave y valor juntos', build: () => {
    const precios = { pan: randInt(1, 5), leche: randInt(1, 5) };
    return { prompt: `Crea <code>precios = {"pan": ${precios.pan}, "leche": ${precios.leche}}</code>. Con un <code>for</code> sobre <code>precios.keys()</code>, imprime <code>print(clave, ": $", precios[clave])</code> para cada uno.`,
      code: `var precios = {"pan": ${precios.pan}, "leche": ${precios.leche}}\nfor clave in precios.keys():\n    print(clave, ": $", precios[clave])` };
  } },
  { id: 'diccionarios-21', difficulty: 'medio', title: 'Diccionario con arrays como valores', build: () => {
    const a = randInt(1, 20), b = randInt(1, 20);
    return { prompt: `Crea <code>equipo = {"jugadores": ["Ana", "Kai"], "puntos": [${a}, ${b}]}</code>. Imprime <code>equipo["puntos"][1]</code>.`,
      code: `var equipo = {"jugadores": ["Ana", "Kai"], "puntos": [${a}, ${b}]}\nprint(equipo["puntos"][1])` };
  } },

  // ---- new dificil (9) ----
  { id: 'diccionarios-22', difficulty: 'dificil', title: 'Contador de frecuencia con diccionario', build: () => {
    const arr = Array.from({ length: 6 }, () => pickRandom(['rojo', 'azul', 'verde']));
    return { prompt: `Crea <code>colores = [${arr.map(c => `"${c}"`).join(', ')}]</code> y <code>frecuencia = {}</code>. Recorre con <code>for</code>: si <code>frecuencia.has(color)</code>, incrementa su valor, si no asígnale 1. Imprime <code>frecuencia</code>.`,
      code: `var colores = [${arr.map(c => `"${c}"`).join(', ')}]\nvar frecuencia = {}\nfor color in colores:\n    if frecuencia.has(color):\n        frecuencia[color] += 1\n    else:\n        frecuencia[color] = 1\nprint(frecuencia)` };
  } },
  { id: 'diccionarios-23', difficulty: 'dificil', title: 'Buscar la clave de un valor máximo', build: () => {
    const notas = { Ana: randInt(1, 10), Kai: randInt(1, 10), Sol: randInt(1, 10) };
    return { prompt: `Crea <code>notas = {"Ana": ${notas.Ana}, "Kai": ${notas.Kai}, "Sol": ${notas.Sol}}</code>, <code>mejor = ""</code> y <code>maximo = -1</code>. Recorre <code>notas.keys()</code> con <code>for</code> y actualiza <code>mejor</code> y <code>maximo</code> cuando encuentres un valor mayor. Imprime <code>mejor</code>.`,
      code: `var notas = {"Ana": ${notas.Ana}, "Kai": ${notas.Kai}, "Sol": ${notas.Sol}}\nvar mejor = ""\nvar maximo = -1\nfor clave in notas.keys():\n    if notas[clave] > maximo:\n        maximo = notas[clave]\n        mejor = clave\nprint(mejor)` };
  } },
  { id: 'diccionarios-24', difficulty: 'dificil', title: 'Diccionario con función de acceso seguro', build: () => {
    const stock = { manzana: randInt(1, 10) };
    const buscado = pickRandom(['manzana', 'pera']);
    return { prompt: `Crea <code>func obtener(dic, clave):</code> que retorne <code>dic[clave]</code> si <code>dic.has(clave)</code>, o <code>0</code> si no. Crea <code>stock = {"manzana": ${stock.manzana}}</code>. Imprime <code>obtener(stock, "${buscado}")</code>.`,
      code: `func obtener(dic, clave):\n    if dic.has(clave):\n        return dic[clave]\n    return 0\nvar stock = {"manzana": ${stock.manzana}}\nprint(obtener(stock, "${buscado}"))` };
  } },
  { id: 'diccionarios-25', difficulty: 'dificil', title: 'Fusionar dos diccionarios', build: () => {
    const a = randInt(1, 20), b = randInt(1, 20);
    return { prompt: `Crea <code>base = {"vida": ${a}}</code> y <code>extra = {"mana": ${b}}</code>. Con un <code>for</code> sobre <code>extra.keys()</code>, agrega cada clave de <code>extra</code> a <code>base</code>. Imprime <code>base</code>.`,
      code: `var base = {"vida": ${a}}\nvar extra = {"mana": ${b}}\nfor clave in extra.keys():\n    base[clave] = extra[clave]\nprint(base)` };
  } },
  { id: 'diccionarios-26', difficulty: 'dificil', title: 'Diccionario de listas acumuladas', build: () => {
    const alumnos = [
      { nombre: pickRandom(['Ana', 'Kai']), curso: 'A' },
      { nombre: pickRandom(['Sol', 'Leo']), curso: 'B' },
      { nombre: pickRandom(['Mia', 'Tom']), curso: 'A' },
    ];
    const arrStr = '[' + alumnos.map(a => `{"nombre": "${a.nombre}", "curso": "${a.curso}"}`).join(', ') + ']';
    return { prompt: `Crea <code>alumnos = ${arrStr}</code> y <code>por_curso = {}</code>. Recorre con <code>for</code>: si <code>por_curso.has(a["curso"])</code>, agrega el nombre a esa lista con <code>.append()</code>; si no, crea la lista con ese nombre. Imprime <code>por_curso</code>.`,
      code: `var alumnos = ${arrStr}\nvar por_curso = {}\nfor a in alumnos:\n    if por_curso.has(a["curso"]):\n        por_curso[a["curso"]].append(a["nombre"])\n    else:\n        por_curso[a["curso"]] = [a["nombre"]]\nprint(por_curso)` };
  } },
  { id: 'diccionarios-27', difficulty: 'dificil', title: 'Diccionario con valores calculados', build: () => {
    const n = randInt(3, 5);
    return { prompt: `Crea <code>cuadrados = {}</code>. Usa un <code>for</code> con <code>range(1, ${n + 1})</code> para asignar <code>cuadrados[i] = i * i</code>. Imprime <code>cuadrados</code>.`,
      code: `var cuadrados = {}\nfor i in range(1, ${n + 1}):\n    cuadrados[i] = i * i\nprint(cuadrados)` };
  } },
  { id: 'diccionarios-28', difficulty: 'dificil', title: 'Verificar todas las claves requeridas', build: () => {
    const config = { volumen: randInt(0, 100), dificultad: pickRandom(['facil', 'dificil']) };
    return { prompt: `Crea <code>config = {"volumen": ${config.volumen}, "dificultad": "${config.dificultad}"}</code> y <code>requeridas = ["volumen", "dificultad", "idioma"]</code>. Recorre <code>requeridas</code> con <code>for</code> y usa <code>if not config.has(clave): print("Falta: " + clave)</code> para cada una que falte.`,
      code: `var config = {"volumen": ${config.volumen}, "dificultad": "${config.dificultad}"}\nvar requeridas = ["volumen", "dificultad", "idioma"]\nfor clave in requeridas:\n    if not config.has(clave):\n        print("Falta: " + clave)` };
  } },
  { id: 'diccionarios-29', difficulty: 'dificil', title: 'Diccionario dentro de un array, buscando por clave', build: () => {
    const items = [
      { nombre: pickRandom(['espada', 'arco']), precio: randInt(10, 100) },
      { nombre: pickRandom(['escudo', 'poción']), precio: randInt(10, 100) },
    ];
    const buscado = items[0].nombre;
    return { prompt: `Crea <code>items = [{"nombre": "${items[0].nombre}", "precio": ${items[0].precio}}, {"nombre": "${items[1].nombre}", "precio": ${items[1].precio}}]</code>. Recorre con <code>for</code> e imprime el precio del ítem cuyo nombre sea <code>"${buscado}"</code>.`,
      code: `var items = [{"nombre": "${items[0].nombre}", "precio": ${items[0].precio}}, {"nombre": "${items[1].nombre}", "precio": ${items[1].precio}}]\nfor item in items:\n    if item["nombre"] == "${buscado}":\n        print(item["precio"])` };
  } },
  { id: 'diccionarios-30', difficulty: 'dificil', title: 'Diccionario con clase como valor', build: () => {
    const vida = randInt(50, 100);
    return { prompt: `Crea <code>class Jugador:</code> con <code>var vida</code> en <code>_init(v): self.vida = v</code>. Crea <code>equipo = {"principal": Jugador.new(${vida})}</code>. Imprime <code>equipo["principal"].vida</code>.`,
      code: `class Jugador:\n    var vida\n    func _init(v):\n        self.vida = v\nvar equipo = {"principal": Jugador.new(${vida})}\nprint(equipo["principal"].vida)` };
  } },

  // ---- new experto (10) ----
  { id: 'diccionarios-31', difficulty: 'experto', title: 'Diccionario con match sobre sus valores', build: () => {
    const nivel = randInt(1, 3);
    return { prompt: `Crea <code>jugador = {"nivel": ${nivel}}</code>. Usa <code>match jugador["nivel"]:</code> con casos <code>1:</code>, <code>2:</code>, <code>3:</code> imprimiendo <code>"Novato"</code>, <code>"Intermedio"</code>, <code>"Experto"</code> respectivamente.`,
      code: `var jugador = {"nivel": ${nivel}}\nmatch jugador["nivel"]:\n    1:\n        print("Novato")\n    2:\n        print("Intermedio")\n    3:\n        print("Experto")` };
  } },
  { id: 'diccionarios-32', difficulty: 'experto', title: 'Diccionario anidado con modificación', build: () => {
    const vida = randInt(50, 100); const dano = randInt(1, 40);
    return { prompt: `Crea <code>jugador = {"nombre": "Kai", "stats": {"vida": ${vida}}}</code>. Resta ${dano} a <code>jugador["stats"]["vida"]</code> con <code>-=</code>. Imprime <code>jugador["stats"]["vida"]</code>.`,
      code: `var jugador = {"nombre": "Kai", "stats": {"vida": ${vida}}}\njugador["stats"]["vida"] -= ${dano}\nprint(jugador["stats"]["vida"])` };
  } },
  { id: 'diccionarios-33', difficulty: 'experto', title: 'Convertir diccionario a array de pares', build: () => {
    const precios = { pan: randInt(1, 10), leche: randInt(1, 10) };
    return { prompt: `Crea <code>precios = {"pan": ${precios.pan}, "leche": ${precios.leche}}</code> y <code>pares = []</code>. Recorre <code>precios.keys()</code> con <code>for</code> y agrega <code>[clave, precios[clave]]</code> a <code>pares</code> con <code>.append()</code>. Imprime <code>pares</code>.`,
      code: `var precios = {"pan": ${precios.pan}, "leche": ${precios.leche}}\nvar pares = []\nfor clave in precios.keys():\n    pares.append([clave, precios[clave]])\nprint(pares)` };
  } },
  { id: 'diccionarios-34', difficulty: 'experto', title: 'Función que retorna un diccionario resumen', build: () => {
    const arr = Array.from({ length: 5 }, () => randInt(1, 30));
    return { prompt: `Crea <code>resumen(lista)</code> que retorne un diccionario con las claves <code>"suma"</code> (total con <code>for</code>) y <code>"cantidad"</code> (con <code>.size()</code>). Crea <code>numeros = [${arr.join(', ')}]</code>. Imprime <code>resumen(numeros)</code>.`,
      code: `func resumen(lista):\n    var suma = 0\n    for v in lista:\n        suma += v\n    return {"suma": suma, "cantidad": lista.size()}\nvar numeros = [${arr.join(', ')}]\nprint(resumen(numeros))` };
  } },
  { id: 'diccionarios-35', difficulty: 'experto', title: 'Diccionario con claves dinámicas en bucle', build: () => {
    const nombres = ['Ana', 'Kai', 'Sol'];
    const edades = nombres.map(() => randInt(5, 80));
    return { prompt: `Crea <code>nombres = [${nombres.map(n => `"${n}"`).join(', ')}]</code> y <code>edades = [${edades.join(', ')}]</code>, y <code>personas = {}</code>. Usa un <code>for</code> con <code>range(nombres.size())</code> para asignar <code>personas[nombres[i]] = edades[i]</code>. Imprime <code>personas</code>.`,
      code: `var nombres = [${nombres.map(n => `"${n}"`).join(', ')}]\nvar edades = [${edades.join(', ')}]\nvar personas = {}\nfor i in range(nombres.size()):\n    personas[nombres[i]] = edades[i]\nprint(personas)` };
  } },
  { id: 'diccionarios-36', difficulty: 'experto', title: 'Contar claves que cumplen una condición', build: () => {
    const stock = { manzana: randInt(0, 20), pera: randInt(0, 20), uva: randInt(0, 20) };
    return { prompt: `Crea <code>stock = {"manzana": ${stock.manzana}, "pera": ${stock.pera}, "uva": ${stock.uva}}</code> y <code>agotados = 0</code>. Recorre <code>stock.values()</code> con <code>for</code> y suma 1 a <code>agotados</code> por cada valor igual a 0. Imprime <code>agotados</code>.`,
      code: `var stock = {"manzana": ${stock.manzana}, "pera": ${stock.pera}, "uva": ${stock.uva}}\nvar agotados = 0\nfor v in stock.values():\n    if v == 0:\n        agotados += 1\nprint(agotados)` };
  } },
  { id: 'diccionarios-37', difficulty: 'experto', title: 'Diccionario tipado', build: () => {
    const a = randInt(1, 20), b = randInt(1, 20);
    return { prompt: `Crea <code>var puntos: Dictionary = {"jugador1": ${a}, "jugador2": ${b}}</code> (diccionario tipado). Imprime la suma de sus valores con un <code>for</code>.`,
      code: `var puntos: Dictionary = {"jugador1": ${a}, "jugador2": ${b}}\nvar suma = 0\nfor v in puntos.values():\n    suma += v\nprint(suma)` };
  } },
  { id: 'diccionarios-38', difficulty: 'experto', title: 'Diccionario con señal al vaciarse', build: () => {
    const stock = { pociones: randInt(1, 5) };
    return { prompt: `Crea <code>signal agotado</code> y <code>func on_agotado(): print("¡Sin pociones!")</code> (conéctala). Crea <code>stock = {"pociones": ${stock.pociones}}</code>. Usa <code>stock["pociones"] -= ${stock.pociones}</code> y luego, si <code>stock["pociones"] <= 0</code>, emite <code>agotado</code>.`,
      code: `signal agotado\nfunc on_agotado():\n    print("¡Sin pociones!")\nagotado.connect(on_agotado)\nvar stock = {"pociones": ${stock.pociones}}\nstock["pociones"] -= ${stock.pociones}\nif stock["pociones"] <= 0:\n    agotado.emit()` };
  } },
  { id: 'diccionarios-39', difficulty: 'experto', title: 'Diccionario con enum como clave de acceso', build: () => {
    const idx = randInt(0, 1);
    return { prompt: `Crea <code>enum Dificultad { FACIL, DIFICIL }</code> y <code>tiempos = {0: 60, 1: 30}</code>. Crea <code>actual = ${idx}</code>. Imprime <code>tiempos[actual]</code>.`,
      code: `enum Dificultad { FACIL, DIFICIL }\nvar tiempos = {0: 60, 1: 30}\nvar actual = ${idx}\nprint(tiempos[actual])` };
  } },
  { id: 'diccionarios-40', difficulty: 'experto', title: 'Actualizar diccionario dentro de una función', build: () => {
    const vida = randInt(1, 50);
    return { prompt: `Crea <code>curar(personaje, cantidad)</code> que haga <code>personaje["vida"] += cantidad</code> (sin retornar nada, los diccionarios se pasan por referencia). Crea <code>p = {"vida": ${vida}}</code>, llama <code>curar(p, 20)</code>, e imprime <code>p["vida"]</code>.`,
      code: `func curar(personaje, cantidad):\n    personaje["vida"] += cantidad\nvar p = {"vida": ${vida}}\ncurar(p, 20)\nprint(p["vida"])` };
  } },

  // ---- new maestro (10) ----
  { id: 'diccionarios-41', difficulty: 'maestro', title: 'Sistema de inventario completo', build: () => {
    const objetos = { espada: randInt(1, 5), pocion: randInt(1, 10), escudo: randInt(1, 3) };
    return { prompt: `Crea <code>inventario = {"espada": ${objetos.espada}, "pocion": ${objetos.pocion}, "escudo": ${objetos.escudo}}</code>. Crea <code>usar(inventario, item)</code> que retorne <code>false</code> si <code>not inventario.has(item) or inventario[item] <= 0</code>, o si no reste 1 a <code>inventario[item]</code> y retorne <code>true</code>. Imprime <code>usar(inventario, "pocion")</code> y luego <code>inventario["pocion"]</code>.`,
      code: `var inventario = {"espada": ${objetos.espada}, "pocion": ${objetos.pocion}, "escudo": ${objetos.escudo}}\nfunc usar(inventario, item):\n    if not inventario.has(item) or inventario[item] <= 0:\n        return false\n    inventario[item] -= 1\n    return true\nprint(usar(inventario, "pocion"))\nprint(inventario["pocion"])` };
  } },
  { id: 'diccionarios-42', difficulty: 'maestro', title: 'Ordenar claves manualmente por valor', build: () => {
    const notas = { Ana: randInt(1, 10), Kai: randInt(1, 10), Sol: randInt(1, 10) };
    return { prompt: `Crea <code>notas = {"Ana": ${notas.Ana}, "Kai": ${notas.Kai}, "Sol": ${notas.Sol}}</code> y <code>orden = notas.keys()</code>. Ordena <code>orden</code> manualmente de mayor a menor nota usando burbuja: dos <code>for</code> anidados comparando <code>notas[orden[j]]</code> con <code>notas[orden[j+1]]</code> e intercambiando posiciones si el segundo es mayor. Imprime <code>orden</code>.`,
      code: `var notas = {"Ana": ${notas.Ana}, "Kai": ${notas.Kai}, "Sol": ${notas.Sol}}\nvar orden = notas.keys()\nfor i in range(orden.size()):\n    for j in range(0, orden.size() - 1):\n        if notas[orden[j]] < notas[orden[j + 1]]:\n            var temp = orden[j]\n            orden[j] = orden[j + 1]\n            orden[j + 1] = temp\nprint(orden)` };
  } },
  { id: 'diccionarios-43', difficulty: 'maestro', title: 'Diccionario de diccionarios (base de datos simple)', build: () => {
    const p1 = { nombre: pickRandom(['Ana', 'Kai']), vida: randInt(50, 100) };
    const p2 = { nombre: pickRandom(['Sol', 'Leo']), vida: randInt(50, 100) };
    return { prompt: `Crea <code>jugadores = {"p1": {"nombre": "${p1.nombre}", "vida": ${p1.vida}}, "p2": {"nombre": "${p2.nombre}", "vida": ${p2.vida}}}</code> y <code>total = 0</code>. Recorre <code>jugadores.keys()</code> con <code>for</code> sumando <code>jugadores[clave]["vida"]</code> a <code>total</code>. Imprime <code>total</code>.`,
      code: `var jugadores = {"p1": {"nombre": "${p1.nombre}", "vida": ${p1.vida}}, "p2": {"nombre": "${p2.nombre}", "vida": ${p2.vida}}}\nvar total = 0\nfor clave in jugadores.keys():\n    total += jugadores[clave]["vida"]\nprint(total)` };
  } },
  { id: 'diccionarios-44', difficulty: 'maestro', title: 'Sistema de votación con diccionario', build: () => {
    const votos = Array.from({ length: 6 }, () => pickRandom(['A', 'B', 'C']));
    return { prompt: `Crea <code>votos = [${votos.map(v => `"${v}"`).join(', ')}]</code> y <code>conteo = {}</code>. Cuenta los votos con <code>for</code> (igual que un diccionario de frecuencias). Luego recorre <code>conteo.keys()</code> para encontrar la opción con más votos, guardándola en <code>ganador</code>. Imprime <code>ganador</code>.`,
      code: `var votos = [${votos.map(v => `"${v}"`).join(', ')}]\nvar conteo = {}\nfor v in votos:\n    if conteo.has(v):\n        conteo[v] += 1\n    else:\n        conteo[v] = 1\nvar ganador = ""\nvar maximo = 0\nfor clave in conteo.keys():\n    if conteo[clave] > maximo:\n        maximo = conteo[clave]\n        ganador = clave\nprint(ganador)` };
  } },
  { id: 'diccionarios-45', difficulty: 'maestro', title: 'Clase que usa un diccionario interno', build: () => {
    const items = { oro: randInt(1, 100), plata: randInt(1, 100) };
    return { prompt: `Crea <code>class Billetera:</code> con <code>var monedas = {"oro": ${items.oro}, "plata": ${items.plata}}</code> y un método <code>total(): var suma = 0; for v in self.monedas.values(): suma += v; return suma</code> (con la indentación correcta de GDScript). Crea <code>b = Billetera.new()</code>. Imprime <code>b.total()</code>.`,
      code: `class Billetera:\n    var monedas = {"oro": ${items.oro}, "plata": ${items.plata}}\n    func total():\n        var suma = 0\n        for v in self.monedas.values():\n            suma += v\n        return suma\nvar b = Billetera.new()\nprint(b.total())` };
  } },
  { id: 'diccionarios-46', difficulty: 'maestro', title: 'Fusionar múltiples diccionarios con prioridad', build: () => {
    const base = { volumen: randInt(0, 100), dificultad: 'normal' };
    const usuario = { volumen: randInt(0, 100) };
    return { prompt: `Crea <code>base = {"volumen": ${base.volumen}, "dificultad": "normal"}</code> y <code>usuario = {"volumen": ${usuario.volumen}}</code>. Crea <code>final = base.duplicate()</code> y, recorriendo <code>usuario.keys()</code> con <code>for</code>, sobrescribe cada clave en <code>final</code> con el valor de <code>usuario</code> (el usuario tiene prioridad). Imprime <code>final</code>.`,
      code: `var base = {"volumen": ${base.volumen}, "dificultad": "normal"}\nvar usuario = {"volumen": ${usuario.volumen}}\nvar final = base.duplicate()\nfor clave in usuario.keys():\n    final[clave] = usuario[clave]\nprint(final)` };
  } },
  { id: 'diccionarios-47', difficulty: 'maestro', title: 'Validación de esquema con match', build: () => {
    const tipo = pickRandom(['espada', 'pocion', 'mapa']);
    return { prompt: `Crea <code>func validar_tipo(tipo): match tipo: "espada": return "arma"; "pocion": return "consumible"; _: return "desconocido"</code> (usa la sintaxis correcta con indentación de GDScript, con dos puntos y bloques). Crea <code>item = "${tipo}"</code>. Imprime <code>validar_tipo(item)</code>.`,
      code: `func validar_tipo(tipo):\n    match tipo:\n        "espada":\n            return "arma"\n        "pocion":\n            return "consumible"\n        _:\n            return "desconocido"\nvar item = "${tipo}"\nprint(validar_tipo(item))` };
  } },
  { id: 'diccionarios-48', difficulty: 'maestro', title: 'Diccionario con array de instancias', build: () => {
    const vidas = [randInt(1, 100), randInt(1, 100)];
    return { prompt: `Crea <code>class Enemigo:</code> con <code>var vida</code> en <code>_init(v): self.vida = v</code>. Crea <code>sala = {"enemigos": [Enemigo.new(${vidas[0]}), Enemigo.new(${vidas[1]})]}</code> y <code>vivos = 0</code>. Recorre <code>sala["enemigos"]</code> con <code>for</code> sumando 1 a <code>vivos</code> por cada <code>e.vida > 0</code>. Imprime <code>vivos</code>.`,
      code: `class Enemigo:\n    var vida\n    func _init(v):\n        self.vida = v\nvar sala = {"enemigos": [Enemigo.new(${vidas[0]}), Enemigo.new(${vidas[1]})]}\nvar vivos = 0\nfor e in sala["enemigos"]:\n    if e.vida > 0:\n        vivos += 1\nprint(vivos)` };
  } },
  { id: 'diccionarios-49', difficulty: 'maestro', title: 'Estadísticas completas desde un diccionario', build: () => {
    const notas = { Ana: randInt(1, 10), Kai: randInt(1, 10), Sol: randInt(1, 10), Leo: randInt(1, 10) };
    return { prompt: `Crea <code>notas = {"Ana": ${notas.Ana}, "Kai": ${notas.Kai}, "Sol": ${notas.Sol}, "Leo": ${notas.Leo}}</code>. Crea una función <code>estadisticas(dic)</code> que retorne <code>{"promedio": suma/dic.size(), "cantidad": dic.size()}</code> (calculando <code>suma</code> con un <code>for</code> sobre <code>dic.values()</code>). Imprime <code>estadisticas(notas)</code>.`,
      code: `var notas = {"Ana": ${notas.Ana}, "Kai": ${notas.Kai}, "Sol": ${notas.Sol}, "Leo": ${notas.Leo}}\nfunc estadisticas(dic):\n    var suma = 0\n    for v in dic.values():\n        suma += v\n    return {"promedio": suma / dic.size(), "cantidad": dic.size()}\nprint(estadisticas(notas))` };
  } },
  { id: 'diccionarios-50', difficulty: 'maestro', title: 'Sistema de crafteo con diccionarios anidados', build: () => {
    const madera = randInt(5, 20), piedra = randInt(1, 10);
    return { prompt: `Crea <code>receta = {"nombre": "Hacha", "materiales": {"madera": 3, "piedra": 1}}</code> y <code>inventario = {"madera": ${madera}, "piedra": ${piedra}}</code>. Crea <code>puede_craftear(inventario, receta)</code> que recorra <code>receta["materiales"].keys()</code> con <code>for</code>, retornando <code>false</code> si algún material falta o es insuficiente, o <code>true</code> si todos alcanzan. Imprime <code>puede_craftear(inventario, receta)</code>.`,
      code: `var receta = {"nombre": "Hacha", "materiales": {"madera": 3, "piedra": 1}}\nvar inventario = {"madera": ${madera}, "piedra": ${piedra}}\nfunc puede_craftear(inventario, receta):\n    for material in receta["materiales"].keys():\n        if not inventario.has(material) or inventario[material] < receta["materiales"][material]:\n            return false\n    return true\nprint(puede_craftear(inventario, receta))` };
  } },
];

const tipadoGenerators = [
  // ---- migrated originals ----
  { id: 'tipado-1', difficulty: 'facil', title: 'Variable tipada', build: () => ({
    prompt: 'Declara <code>var edad: int = 12</code> e imprímela con <code>print(edad)</code>.',
    code: 'var edad: int = 12\nprint(edad)' }) },
  { id: 'tipado-2', difficulty: 'facil', title: 'Constante simple', build: () => ({
    prompt: 'Declara <code>const PI = 3</code> e imprímela.',
    code: 'const PI = 3\nprint(PI)' }) },
  { id: 'tipado-3', difficulty: 'medio', title: 'Función con tipos', build: () => ({
    prompt: 'Crea <code>func doblar(n: int) -> int:</code> que retorne <code>n * 2</code>. Imprime <code>doblar(9)</code>.',
    code: 'func doblar(n: int) -> int:\n    return n * 2\nprint(doblar(9))' }) },
  { id: 'tipado-4', difficulty: 'medio', title: 'Enum con nombre', build: () => ({
    prompt: 'Crea <code>enum Color { ROJO, VERDE, AZUL }</code>. Imprime <code>Color.VERDE</code>.',
    code: 'enum Color { ROJO, VERDE, AZUL }\nprint(Color.VERDE)' }) },
  { id: 'tipado-6', difficulty: 'medio', title: 'Constante inmutable', build: () => ({
    prompt: 'Crea <code>const LIMITE = 5</code> e imprímela directamente (sin intentar reasignarla, porque una constante no se puede modificar).',
    code: 'const LIMITE = 5\nprint(LIMITE)' }) },
  { id: 'tipado-5', difficulty: 'dificil', title: 'Enum anónimo con valor inicial', build: () => ({
    prompt: 'Crea <code>enum { A = 10, B, C }</code> (sin nombre). Imprime <code>B</code> y luego <code>C</code>.',
    code: 'enum { A = 10, B, C }\nprint(B)\nprint(C)' }) },

  // ---- new facil (4) ----
  { id: 'tipado-11', difficulty: 'facil', title: 'Variable de tipo float', build: () => {
    const n = randFloat1(1, 50);
    return { prompt: `Declara <code>var altura: float = ${n}</code> e imprímela.`,
      code: `var altura: float = ${n}\nprint(altura)` };
  } },
  { id: 'tipado-12', difficulty: 'facil', title: 'Variable de tipo String', build: () => {
    const n = pickRandom(['Ana', 'Kai', 'Sol']);
    return { prompt: `Declara <code>var nombre: String = "${n}"</code> e imprímela.`,
      code: `var nombre: String = "${n}"\nprint(nombre)` };
  } },
  { id: 'tipado-13', difficulty: 'facil', title: 'Constante de texto', build: () => {
    const n = pickRandom(['GDScript', 'Godot', 'Videojuego']);
    return { prompt: `Declara <code>const NOMBRE_JUEGO = "${n}"</code> e imprímela.`,
      code: `const NOMBRE_JUEGO = "${n}"\nprint(NOMBRE_JUEGO)` };
  } },
  { id: 'tipado-14', difficulty: 'facil', title: 'Variable de tipo bool', build: () => {
    const v = pickRandom([true, false]);
    return { prompt: `Declara <code>var activo: bool = ${v}</code> e imprímela.`,
      code: `var activo: bool = ${v}\nprint(activo)` };
  } },

  // ---- new medio (3) ----
  { id: 'tipado-15', difficulty: 'medio', title: 'Función con múltiples tipos', build: () => {
    const a = randInt(1, 20), b = randInt(1, 20);
    return { prompt: `Crea <code>func sumar(a: int, b: int) -> int:</code> que retorne <code>a + b</code>. Imprime <code>sumar(${a}, ${b})</code>.`,
      code: `func sumar(a: int, b: int) -> int:\n    return a + b\nprint(sumar(${a}, ${b}))` };
  } },
  { id: 'tipado-16', difficulty: 'medio', title: 'Enum con varios valores', build: () => {
    const idx = randInt(0, 2);
    return { prompt: `Crea <code>enum Estado { IDLE, CORRIENDO, SALTANDO }</code>. Crea <code>actual = ${idx}</code>. Imprime <code>actual == Estado.CORRIENDO</code>.`,
      code: `enum Estado { IDLE, CORRIENDO, SALTANDO }\nvar actual = ${idx}\nprint(actual == Estado.CORRIENDO)` };
  } },
  { id: 'tipado-17', difficulty: 'medio', title: 'Constante usada en cálculo', build: () => {
    const radio = randInt(1, 20);
    return { prompt: `Crea <code>const PI = 3</code> y <code>radio = ${radio}</code>. Imprime <code>PI * radio * radio</code> (aproximación del área de un círculo).`,
      code: `const PI = 3\nvar radio = ${radio}\nprint(PI * radio * radio)` };
  } },

  // ---- new dificil (5) ----
  { id: 'tipado-18', difficulty: 'dificil', title: 'Array tipado con elementos', build: () => {
    const arr = Array.from({ length: 4 }, () => randInt(1, 20));
    return { prompt: `Declara <code>var numeros: Array[int] = [${arr.join(', ')}]</code>. Imprime <code>numeros.size()</code>.`,
      code: `var numeros: Array[int] = [${arr.join(', ')}]\nprint(numeros.size())` };
  } },
  { id: 'tipado-19', difficulty: 'dificil', title: 'Función con tipo de retorno String', build: () => {
    const n = randInt(1, 100);
    return { prompt: `Crea <code>func describir(n: int) -> String:</code> que retorne <code>"El número es " + str(n)</code>. Imprime <code>describir(${n})</code>.`,
      code: `func describir(n: int) -> String:\n    return "El número es " + str(n)\nprint(describir(${n}))` };
  } },
  { id: 'tipado-20', difficulty: 'dificil', title: 'Enum usado en match', build: () => {
    const idx = randInt(0, 2);
    return { prompt: `Crea <code>enum Color { ROJO, VERDE, AZUL }</code> y <code>actual = ${idx}</code>. Usa <code>match actual:</code> con casos <code>Color.ROJO:</code>, <code>Color.VERDE:</code>, <code>Color.AZUL:</code> que impriman <code>"Rojo"</code>, <code>"Verde"</code>, <code>"Azul"</code>.`,
      code: `enum Color { ROJO, VERDE, AZUL }\nvar actual = ${idx}\nmatch actual:\n    Color.ROJO:\n        print("Rojo")\n    Color.VERDE:\n        print("Verde")\n    Color.AZUL:\n        print("Azul")` };
  } },
  { id: 'tipado-21', difficulty: 'dificil', title: 'Constante en un array', build: () => {
    const n = randInt(1, 10);
    return { prompt: `Crea <code>const MULTIPLICADOR = 3</code> y <code>numeros = [${n}, ${n + 1}, ${n + 2}]</code>. Usa <code>.map()</code> con una función que multiplique por <code>MULTIPLICADOR</code>, e imprime el resultado.`,
      code: `const MULTIPLICADOR = 3\nfunc escalar(n):\n    return n * MULTIPLICADOR\nvar numeros = [${n}, ${n + 1}, ${n + 2}]\nprint(numeros.map(escalar))` };
  } },
  { id: 'tipado-22', difficulty: 'dificil', title: 'Diccionario tipado con función', build: () => {
    const a = randInt(1, 30), b = randInt(1, 30);
    return { prompt: `Declara <code>var config: Dictionary = {"volumen": ${a}, "brillo": ${b}}</code>. Crea <code>func total(dic: Dictionary) -> int:</code> que sume sus valores con <code>for</code> y los retorne. Imprime <code>total(config)</code>.`,
      code: `var config: Dictionary = {"volumen": ${a}, "brillo": ${b}}\nfunc total(dic: Dictionary) -> int:\n    var suma = 0\n    for v in dic.values():\n        suma += v\n    return suma\nprint(total(config))` };
  } },

  // ---- new experto (6) ----
  { id: 'tipado-23', difficulty: 'experto', title: 'Enum anónimo con aritmética', build: () => {
    return { prompt: `Crea <code>enum { PRIMERO = 5, SEGUNDO, TERCERO }</code>. Imprime <code>PRIMERO + SEGUNDO + TERCERO</code> (todo en un solo <code>print()</code>).`,
      code: `enum { PRIMERO = 5, SEGUNDO, TERCERO }\nprint(PRIMERO + SEGUNDO + TERCERO)` };
  } },
  { id: 'tipado-24', difficulty: 'experto', title: 'Función tipada dentro de una clase', build: () => {
    const a = randInt(2, 10), h = randInt(2, 10);
    return { prompt: `Crea <code>class Rectangulo:</code> con <code>var ancho: int</code> y <code>var alto: int</code> asignados en <code>_init(a: int, h: int):</code>, y <code>func area() -> int:</code> que retorne <code>self.ancho * self.alto</code>. Instancia con <code>${a}, ${h}</code> e imprime el área.`,
      code: `class Rectangulo:\n    var ancho: int\n    var alto: int\n    func _init(a: int, h: int):\n        self.ancho = a\n        self.alto = h\n    func area() -> int:\n        return self.ancho * self.alto\nvar rect = Rectangulo.new(${a}, ${h})\nprint(rect.area())` };
  } },
  { id: 'tipado-25', difficulty: 'experto', title: 'Enum comparado con match múltiple', build: () => {
    const idx = randInt(0, 3);
    return { prompt: `Crea <code>enum Rareza { COMUN, RARO, EPICO, LEGENDARIO }</code> y <code>item = ${idx}</code>. Usa <code>match item:</code> con un caso <code>Rareza.COMUN, Rareza.RARO:</code> que imprima <code>"Normal"</code>, y otro <code>Rareza.EPICO, Rareza.LEGENDARIO:</code> que imprima <code>"Especial"</code>.`,
      code: `enum Rareza { COMUN, RARO, EPICO, LEGENDARIO }\nvar item = ${idx}\nmatch item:\n    Rareza.COMUN, Rareza.RARO:\n        print("Normal")\n    Rareza.EPICO, Rareza.LEGENDARIO:\n        print("Especial")` };
  } },
  { id: 'tipado-26', difficulty: 'experto', title: 'Constante compartida entre funciones', build: () => {
    const n = randInt(1, 20);
    return { prompt: `Crea <code>const BONUS = 10</code>, <code>func con_bonus(n): return n + BONUS</code> y <code>func sin_bonus(n): return n</code> (con la sintaxis correcta de GDScript). Imprime <code>con_bonus(${n})</code> y luego <code>sin_bonus(${n})</code>.`,
      code: `const BONUS = 10\nfunc con_bonus(n):\n    return n + BONUS\nfunc sin_bonus(n):\n    return n\nprint(con_bonus(${n}))\nprint(sin_bonus(${n}))` };
  } },
  { id: 'tipado-27', difficulty: 'experto', title: 'Array tipado filtrado', build: () => {
    const arr = Array.from({ length: 5 }, () => randInt(-10, 10));
    return { prompt: `Declara <code>var numeros: Array[int] = [${arr.join(', ')}]</code>. Crea <code>func es_positivo(n: int) -> bool:</code> que retorne <code>n > 0</code>. Imprime <code>numeros.filter(es_positivo)</code>.`,
      code: `var numeros: Array[int] = [${arr.join(', ')}]\nfunc es_positivo(n: int) -> bool:\n    return n > 0\nprint(numeros.filter(es_positivo))` };
  } },
  { id: 'tipado-28', difficulty: 'experto', title: 'Clase con enum interno usado en método', build: () => {
    const idx = randInt(0, 1);
    return { prompt: `Crea <code>enum Clase { GUERRERO, MAGO }</code>. Crea <code>class Personaje:</code> con <code>var clase: int</code> en <code>_init(c: int): self.clase = c</code>, y un método <code>describir(): if self.clase == Clase.GUERRERO: return "Guerrero"; else: return "Mago"</code> (con la sintaxis correcta de GDScript). Instancia <code>Personaje.new(${idx})</code> e imprime <code>.describir()</code>.`,
      code: `enum Clase { GUERRERO, MAGO }\nclass Personaje:\n    var clase: int\n    func _init(c: int):\n        self.clase = c\n    func describir():\n        if self.clase == Clase.GUERRERO:\n            return "Guerrero"\n        else:\n            return "Mago"\nvar p = Personaje.new(${idx})\nprint(p.describir())` };
  } },

  // ---- new maestro (6) ----
  { id: 'tipado-29', difficulty: 'maestro', title: 'Sistema de rareza con enum, match y función tipada', build: () => {
    const idx = randInt(0, 3);
    return { prompt: `Crea <code>enum Rareza { COMUN, RARO, EPICO, LEGENDARIO }</code> y <code>func color_de(r: int) -> String:</code> que use <code>match r:</code> con casos para cada rareza retornando <code>"gris"</code>, <code>"azul"</code>, <code>"morado"</code>, <code>"dorado"</code> respectivamente. Crea <code>item = ${idx}</code>. Imprime <code>color_de(item)</code>.`,
      code: `enum Rareza { COMUN, RARO, EPICO, LEGENDARIO }\nfunc color_de(r: int) -> String:\n    match r:\n        Rareza.COMUN:\n            return "gris"\n        Rareza.RARO:\n            return "azul"\n        Rareza.EPICO:\n            return "morado"\n        Rareza.LEGENDARIO:\n            return "dorado"\nvar item = ${idx}\nprint(color_de(item))` };
  } },
  { id: 'tipado-30', difficulty: 'maestro', title: 'Clase con constante de clase y validación tipada', build: () => {
    const vida = randInt(1, 150);
    return { prompt: `Crea <code>const VIDA_MAXIMA = 100</code>. Crea <code>class Personaje:</code> con <code>var vida: int</code> en <code>_init(v: int): self.vida = min(v, VIDA_MAXIMA)</code> (usando la constante global para limitar el valor). Instancia <code>Personaje.new(${vida})</code> e imprime <code>.vida</code>.`,
      code: `const VIDA_MAXIMA = 100\nclass Personaje:\n    var vida: int\n    func _init(v: int):\n        self.vida = min(v, VIDA_MAXIMA)\nvar p = Personaje.new(${vida})\nprint(p.vida)` };
  } },
  { id: 'tipado-31', difficulty: 'maestro', title: 'Pipeline tipado completo', build: () => {
    const arr = Array.from({ length: 5 }, () => randInt(1, 20));
    return { prompt: `Declara <code>var numeros: Array[int] = [${arr.join(', ')}]</code>. Crea <code>func es_par(n: int) -> bool:</code> que retorne <code>n % 2 == 0</code>, <code>func cuadrado(n: int) -> int:</code> que retorne <code>n * n</code>, y <code>func sumar(a: int, b: int) -> int:</code> que retorne <code>a + b</code>. Imprime <code>numeros.filter(es_par).map(cuadrado).reduce(sumar)</code>.`,
      code: `var numeros: Array[int] = [${arr.join(', ')}]\nfunc es_par(n: int) -> bool:\n    return n % 2 == 0\nfunc cuadrado(n: int) -> int:\n    return n * n\nfunc sumar(a: int, b: int) -> int:\n    return a + b\nprint(numeros.filter(es_par).map(cuadrado).reduce(sumar))` };
  } },
  { id: 'tipado-32', difficulty: 'maestro', title: 'Enum anónimo usado como índice de array', build: () => {
    const nombres = ['Lunes', 'Martes', 'Miércoles'];
    return { prompt: `Crea <code>enum { LUN = 0, MAR, MIE }</code> y <code>dias = ["${nombres[0]}", "${nombres[1]}", "${nombres[2]}"]</code>. Imprime <code>dias[MAR]</code>.`,
      code: `enum { LUN = 0, MAR, MIE }\nvar dias = ["${nombres[0]}", "${nombres[1]}", "${nombres[2]}"]\nprint(dias[MAR])` };
  } },
  { id: 'tipado-33', difficulty: 'maestro', title: 'Señal global combinada con una clase tipada', build: () => {
    const vida = randInt(1, 20); const dano = randInt(15, 30);
    return { prompt: `Crea <code>signal murio</code> y <code>func on_murio(): print("Personaje derrotado")</code> (conéctala a la señal). Crea <code>class Personaje:</code> con <code>var vida: int</code> en <code>_init(v: int): self.vida = v</code>, y <code>func recibir_dano(cantidad: int):</code> que reste de <code>self.vida</code> y retorne <code>self.vida</code>. Instancia <code>p = Personaje.new(${vida})</code>. Si <code>p.recibir_dano(${dano}) <= 0</code>, emite <code>murio</code>.`,
      code: `signal murio\nfunc on_murio():\n    print("Personaje derrotado")\nmurio.connect(on_murio)\nclass Personaje:\n    var vida: int\n    func _init(v: int):\n        self.vida = v\n    func recibir_dano(cantidad: int):\n        self.vida -= cantidad\n        return self.vida\nvar p = Personaje.new(${vida})\nif p.recibir_dano(${dano}) <= 0:\n    murio.emit()` };
  } },
  { id: 'tipado-34', difficulty: 'maestro', title: 'Función genérica con validación de tipo simulada', build: () => {
    const n = randInt(-20, 20);
    return { prompt: `Crea <code>func clasificar_tipado(n: int) -> String:</code> que retorne <code>"cero"</code> si <code>n == 0</code>, <code>"positivo"</code> si <code>n > 0</code>, o <code>"negativo"</code> si no (con <code>if/elif/else</code> y <code>return</code>). Imprime <code>clasificar_tipado(${n})</code>.`,
      code: `func clasificar_tipado(n: int) -> String:\n    if n == 0:\n        return "cero"\n    elif n > 0:\n        return "positivo"\n    else:\n        return "negativo"\nprint(clasificar_tipado(${n}))` };
  } },
];

const clasesGenerators = [
  // ---- migrated originals ----
  { id: 'clases-1', difficulty: 'facil', title: 'Clase con un campo', build: () => ({
    prompt: 'Crea <code>class Punto:</code> con <code>var x = 0</code>. Instancia con <code>p = Punto.new()</code> e imprime <code>p.x</code>.',
    code: 'class Punto:\n    var x = 0\nvar p = Punto.new()\nprint(p.x)' }) },
  { id: 'clases-2', difficulty: 'facil', title: 'Constructor _init', build: () => ({
    prompt: 'Crea <code>class Jugador:</code> con <code>var nombre = ""</code> y <code>func _init(n):</code> que asigne <code>self.nombre = n</code>. Instancia <code>Jugador.new("Ana")</code> e imprime <code>.nombre</code>.',
    code: 'class Jugador:\n    var nombre = ""\n    func _init(n):\n        self.nombre = n\nvar j = Jugador.new("Ana")\nprint(j.nombre)' }) },
  { id: 'clases-3', difficulty: 'medio', title: 'Método que modifica un campo', build: () => ({
    prompt: 'Crea <code>class Contador:</code> con <code>var valor = 0</code> y un método <code>func sumar():</code> que haga <code>self.valor += 1</code>. Llama a <code>sumar()</code> tres veces e imprime <code>.valor</code>.',
    code: 'class Contador:\n    var valor = 0\n    func sumar():\n        self.valor += 1\nvar c = Contador.new()\nc.sumar()\nc.sumar()\nc.sumar()\nprint(c.valor)' }) },
  { id: 'clases-4', difficulty: 'medio', title: 'Método con retorno', build: () => ({
    prompt: 'Crea <code>class Rectangulo:</code> con <code>var ancho</code> y <code>var alto</code> asignados en <code>_init(a, h)</code>, y un método <code>area()</code> que retorne <code>self.ancho * self.alto</code>. Instancia con <code>4, 5</code> e imprime el área.',
    code: 'class Rectangulo:\n    var ancho\n    var alto\n    func _init(a, h):\n        self.ancho = a\n        self.alto = h\n    func area():\n        return self.ancho * self.alto\nvar r = Rectangulo.new(4, 5)\nprint(r.area())' }) },
  { id: 'clases-5', difficulty: 'dificil', title: 'Herencia con extends', build: () => ({
    prompt: 'Crea <code>class Animal:</code> con método <code>hablar()</code> que retorne <code>"..."</code>. Crea <code>class Gato:</code> con <code>extends Animal</code> que sobrescriba <code>hablar()</code> para retornar <code>"Miau"</code>. Instancia <code>Gato.new()</code> e imprime <code>.hablar()</code>.',
    code: 'class Animal:\n    func hablar():\n        return "..."\nclass Gato:\n    extends Animal\n    func hablar():\n        return "Miau"\nvar g = Gato.new()\nprint(g.hablar())' }) },
  { id: 'clases-6', difficulty: 'dificil', title: 'Herencia con campo heredado', build: () => ({
    prompt: 'Crea <code>class Personaje:</code> con <code>var vida = 100</code>. Crea <code>class Heroe:</code> con <code>extends Personaje</code> y un método <code>esta_vivo()</code> que retorne <code>self.vida > 0</code>. Instancia <code>Heroe.new()</code> e imprime <code>.vida</code> y luego <code>.esta_vivo()</code>.',
    code: 'class Personaje:\n    var vida = 100\nclass Heroe:\n    extends Personaje\n    func esta_vivo():\n        return self.vida > 0\nvar h = Heroe.new()\nprint(h.vida)\nprint(h.esta_vivo())' }) },

  // ---- new facil (4) ----
  { id: 'clases-11', difficulty: 'facil', title: 'Clase con campo numérico', build: () => {
    const n = randInt(1, 100);
    return { prompt: `Crea <code>class Nivel:</code> con <code>var valor = ${n}</code>. Instancia <code>n = Nivel.new()</code> e imprime <code>n.valor</code>.`,
      code: `class Nivel:\n    var valor = ${n}\nvar n = Nivel.new()\nprint(n.valor)` };
  } },
  { id: 'clases-12', difficulty: 'facil', title: 'Clase con dos campos', build: () => {
    const nombre = pickRandom(['Kai', 'Ana', 'Sol']); const nivel = randInt(1, 50);
    return { prompt: `Crea <code>class Personaje:</code> con <code>var nombre = "${nombre}"</code> y <code>var nivel = ${nivel}</code>. Instancia <code>p = Personaje.new()</code> e imprime <code>p.nombre</code> y luego <code>p.nivel</code>.`,
      code: `class Personaje:\n    var nombre = "${nombre}"\n    var nivel = ${nivel}\nvar p = Personaje.new()\nprint(p.nombre)\nprint(p.nivel)` };
  } },
  { id: 'clases-13', difficulty: 'facil', title: 'Modificar un campo directamente', build: () => {
    const inicio = randInt(1, 20); const nuevo = randInt(21, 50);
    return { prompt: `Crea <code>class Contador:</code> con <code>var valor = ${inicio}</code>. Instancia <code>c = Contador.new()</code>, asigna <code>c.valor = ${nuevo}</code> directamente, e imprime <code>c.valor</code>.`,
      code: `class Contador:\n    var valor = ${inicio}\nvar c = Contador.new()\nc.valor = ${nuevo}\nprint(c.valor)` };
  } },
  { id: 'clases-14', difficulty: 'facil', title: 'Método simple sin parámetros', build: () => {
    const msg = pickRandom(['¡Hola!', '¡A jugar!', '¡Buena suerte!']);
    return { prompt: `Crea <code>class Saludador:</code> con un método <code>saludar()</code> que retorne <code>"${msg}"</code>. Instancia <code>s = Saludador.new()</code> e imprime <code>s.saludar()</code>.`,
      code: `class Saludador:\n    func saludar():\n        return "${msg}"\nvar s = Saludador.new()\nprint(s.saludar())` };
  } },

  // ---- new medio (4) ----
  { id: 'clases-15', difficulty: 'medio', title: 'Método con parámetro', build: () => {
    const inicio = randInt(1, 20), inc = randInt(1, 10);
    return { prompt: `Crea <code>class Contador:</code> con <code>var valor = ${inicio}</code> y un método <code>sumar(cantidad):</code> que haga <code>self.valor += cantidad</code>. Instancia <code>c = Contador.new()</code>, llama <code>c.sumar(${inc})</code> e imprime <code>c.valor</code>.`,
      code: `class Contador:\n    var valor = ${inicio}\n    func sumar(cantidad):\n        self.valor += cantidad\nvar c = Contador.new()\nc.sumar(${inc})\nprint(c.valor)` };
  } },
  { id: 'clases-16', difficulty: 'medio', title: 'Dos instancias independientes', build: () => {
    const a = randInt(1, 50), b = randInt(1, 50);
    return { prompt: `Crea <code>class Jugador:</code> con <code>var vida = 100</code> en <code>_init(v): self.vida = v</code> (con la sintaxis correcta). Instancia <code>j1 = Jugador.new(${a})</code> y <code>j2 = Jugador.new(${b})</code>. Imprime <code>j1.vida</code> y luego <code>j2.vida</code>.`,
      code: `class Jugador:\n    var vida = 100\n    func _init(v):\n        self.vida = v\nvar j1 = Jugador.new(${a})\nvar j2 = Jugador.new(${b})\nprint(j1.vida)\nprint(j2.vida)` };
  } },
  { id: 'clases-17', difficulty: 'medio', title: 'Método que usa condicionales', build: () => {
    const vida = randInt(0, 100);
    return { prompt: `Crea <code>class Personaje:</code> con <code>var vida</code> en <code>_init(v): self.vida = v</code>, y un método <code>estado():</code> que retorne <code>"Vivo"</code> si <code>self.vida > 0</code> o <code>"Muerto"</code> si no. Instancia <code>Personaje.new(${vida})</code> e imprime <code>.estado()</code>.`,
      code: `class Personaje:\n    var vida\n    func _init(v):\n        self.vida = v\n    func estado():\n        if self.vida > 0:\n            return "Vivo"\n        else:\n            return "Muerto"\nvar p = Personaje.new(${vida})\nprint(p.estado())` };
  } },
  { id: 'clases-18', difficulty: 'medio', title: 'Clase con campo de tipo array', build: () => {
    const items = ['espada', 'escudo', 'poción'];
    return { prompt: `Crea <code>class Mochila:</code> con <code>var objetos = ["${items[0]}", "${items[1]}"]</code>. Instancia <code>m = Mochila.new()</code>, agrega <code>"${items[2]}"</code> con <code>.append()</code> sobre <code>m.objetos</code>, e imprime <code>m.objetos</code>.`,
      code: `class Mochila:\n    var objetos = ["${items[0]}", "${items[1]}"]\nvar m = Mochila.new()\nm.objetos.append("${items[2]}")\nprint(m.objetos)` };
  } },

  // ---- new dificil (4) ----
  { id: 'clases-19', difficulty: 'dificil', title: 'Herencia con método que llama al del padre parcialmente', build: () => {
    const vida = randInt(1, 100);
    return { prompt: `Crea <code>class Animal:</code> con <code>var vida = ${vida}</code> y un método <code>describir(): return "Vida: " + str(self.vida)</code>. Crea <code>class Perro:</code> con <code>extends Animal</code> y un método <code>ladrar(): return "Guau"</code>. Instancia <code>p = Perro.new()</code>. Imprime <code>p.describir()</code> y luego <code>p.ladrar()</code>.`,
      code: `class Animal:\n    var vida = ${vida}\n    func describir():\n        return "Vida: " + str(self.vida)\nclass Perro:\n    extends Animal\n    func ladrar():\n        return "Guau"\nvar p = Perro.new()\nprint(p.describir())\nprint(p.ladrar())` };
  } },
  { id: 'clases-20', difficulty: 'dificil', title: 'Clase con método que usa un bucle', build: () => {
    const n = randInt(3, 8);
    return { prompt: `Crea <code>class Calculadora:</code> con un método <code>sumar_hasta(n):</code> que use un <code>for</code> con <code>range(1, n + 1)</code> para acumular la suma en una variable local y la retorne. Instancia <code>c = Calculadora.new()</code> e imprime <code>c.sumar_hasta(${n})</code>.`,
      code: `class Calculadora:\n    func sumar_hasta(n):\n        var total = 0\n        for i in range(1, n + 1):\n            total += i\n        return total\nvar c = Calculadora.new()\nprint(c.sumar_hasta(${n}))` };
  } },
  { id: 'clases-21', difficulty: 'dificil', title: 'Clase con array de instancias de otra clase', build: () => {
    const vidas = [randInt(1, 100), randInt(1, 100)];
    return { prompt: `Crea <code>class Enemigo:</code> con <code>var vida</code> en <code>_init(v): self.vida = v</code>. Crea <code>enemigos = [Enemigo.new(${vidas[0]}), Enemigo.new(${vidas[1]})]</code> y <code>total = 0</code>. Con un <code>for</code>, suma <code>e.vida</code> de cada uno a <code>total</code>. Imprime <code>total</code>.`,
      code: `class Enemigo:\n    var vida\n    func _init(v):\n        self.vida = v\nvar enemigos = [Enemigo.new(${vidas[0]}), Enemigo.new(${vidas[1]})]\nvar total = 0\nfor e in enemigos:\n    total += e.vida\nprint(total)` };
  } },
  { id: 'clases-22', difficulty: 'dificil', title: 'Herencia de tres niveles', build: () => {
    const vida = randInt(1, 100);
    return { prompt: `Crea <code>class Ser:</code> con <code>var vida = ${vida}</code>. Crea <code>class Animal:</code> con <code>extends Ser</code> y método <code>tipo(): return "Animal"</code>. Crea <code>class Gato:</code> con <code>extends Animal</code> y método <code>sonido(): return "Miau"</code>. Instancia <code>g = Gato.new()</code>. Imprime <code>g.vida</code>, <code>g.tipo()</code> y <code>g.sonido()</code> (cada uno en su propia línea).`,
      code: `class Ser:\n    var vida = ${vida}\nclass Animal:\n    extends Ser\n    func tipo():\n        return "Animal"\nclass Gato:\n    extends Animal\n    func sonido():\n        return "Miau"\nvar g = Gato.new()\nprint(g.vida)\nprint(g.tipo())\nprint(g.sonido())` };
  } },

  // ---- new experto (6) ----
  { id: 'clases-23', difficulty: 'experto', title: 'Clase con método que usa otro método propio', build: () => {
    const ancho = randInt(2, 10), alto = randInt(2, 10);
    return { prompt: `Crea <code>class Rectangulo:</code> con <code>var ancho</code> y <code>var alto</code> en <code>_init(a, h)</code>, un método <code>area(): return self.ancho * self.alto</code>, y un método <code>perimetro(): return 2 * self.ancho + 2 * self.alto</code>. Instancia <code>Rectangulo.new(${ancho}, ${alto})</code>. Imprime <code>.area()</code> y luego <code>.perimetro()</code>.`,
      code: `class Rectangulo:\n    var ancho\n    var alto\n    func _init(a, h):\n        self.ancho = a\n        self.alto = h\n    func area():\n        return self.ancho * self.alto\n    func perimetro():\n        return 2 * self.ancho + 2 * self.alto\nvar r = Rectangulo.new(${ancho}, ${alto})\nprint(r.area())\nprint(r.perimetro())` };
  } },
  { id: 'clases-24', difficulty: 'experto', title: 'Clase con campo diccionario', build: () => {
    const vida = randInt(50, 100), mana = randInt(10, 50);
    return { prompt: `Crea <code>class Personaje:</code> con <code>var stats = {"vida": ${vida}, "mana": ${mana}}</code> y un método <code>total(): var suma = 0; for v in self.stats.values(): suma += v; return suma</code> (con la sintaxis correcta de GDScript). Instancia <code>p = Personaje.new()</code> e imprime <code>p.total()</code>.`,
      code: `class Personaje:\n    var stats = {"vida": ${vida}, "mana": ${mana}}\n    func total():\n        var suma = 0\n        for v in self.stats.values():\n            suma += v\n        return suma\nvar p = Personaje.new()\nprint(p.total())` };
  } },
  { id: 'clases-25', difficulty: 'experto', title: 'Polimorfismo simple con array de distintas clases', build: () => {
    return { prompt: `Crea <code>class Animal:</code> con método <code>sonido(): return "..."</code>. Crea <code>class Gato:</code> con <code>extends Animal</code> que retorne <code>"Miau"</code>, y <code>class Perro:</code> con <code>extends Animal</code> que retorne <code>"Guau"</code>. Crea <code>animales = [Gato.new(), Perro.new()]</code>. Con un <code>for</code>, imprime <code>a.sonido()</code> de cada uno.`,
      code: `class Animal:\n    func sonido():\n        return "..."\nclass Gato:\n    extends Animal\n    func sonido():\n        return "Miau"\nclass Perro:\n    extends Animal\n    func sonido():\n        return "Guau"\nvar animales = [Gato.new(), Perro.new()]\nfor a in animales:\n    print(a.sonido())` };
  } },
  { id: 'clases-26', difficulty: 'experto', title: 'Clase usada dentro de una función', build: () => {
    const n = randInt(3, 5);
    return { prompt: `Crea <code>class Jugador:</code> con <code>var vida = 100</code>. Crea una función <code>crear_equipo(n):</code> que use un <code>for</code> con <code>range(n)</code> para construir y retornar un array de <code>n</code> instancias <code>Jugador.new()</code>. Imprime <code>crear_equipo(${n}).size()</code>.`,
      code: `class Jugador:\n    var vida = 100\nfunc crear_equipo(n):\n    var equipo = []\n    for i in range(n):\n        equipo.append(Jugador.new())\n    return equipo\nprint(crear_equipo(${n}).size())` };
  } },
  { id: 'clases-27', difficulty: 'experto', title: 'Clase con método que retorna otra instancia', build: () => {
    const x = randInt(1, 10), y = randInt(1, 10);
    return { prompt: `Crea <code>class Punto:</code> con <code>var x</code> y <code>var y</code> en <code>_init(px, py)</code>, y un método <code>duplicar(): return Punto.new(self.x, self.y)</code>. Instancia <code>p1 = Punto.new(${x}, ${y})</code> y <code>p2 = p1.duplicar()</code>. Imprime <code>p2.x</code> y luego <code>p2.y</code>.`,
      code: `class Punto:\n    var x\n    var y\n    func _init(px, py):\n        self.x = px\n        self.y = py\n    func duplicar():\n        return Punto.new(self.x, self.y)\nvar p1 = Punto.new(${x}, ${y})\nvar p2 = p1.duplicar()\nprint(p2.x)\nprint(p2.y)` };
  } },
  { id: 'clases-28', difficulty: 'experto', title: 'Clase con validación en el constructor', build: () => {
    const v = randInt(-20, 150);
    return { prompt: `Crea <code>class Personaje:</code> con <code>var vida</code> en <code>_init(v): self.vida = max(0, min(v, 100))</code> (limitando el valor entre 0 y 100). Instancia <code>Personaje.new(${v})</code> e imprime <code>.vida</code>.`,
      code: `class Personaje:\n    var vida\n    func _init(v):\n        self.vida = max(0, min(v, 100))\nvar p = Personaje.new(${v})\nprint(p.vida)` };
  } },

  // ---- new maestro (6) ----
  { id: 'clases-29', difficulty: 'maestro', title: 'Sistema de combate entre dos clases', build: () => {
    const vidaA = randInt(50, 100), vidaB = randInt(50, 100), dano = randInt(10, 30);
    return { prompt: `Crea <code>class Luchador:</code> con <code>var nombre</code> y <code>var vida</code> en <code>_init(n, v)</code>, y un método <code>atacar(objetivo, dano): objetivo.vida -= dano</code> (con la sintaxis correcta). Instancia <code>a = Luchador.new("A", ${vidaA})</code> y <code>b = Luchador.new("B", ${vidaB})</code>. Llama <code>a.atacar(b, ${dano})</code> e imprime <code>b.vida</code>.`,
      code: `class Luchador:\n    var nombre\n    var vida\n    func _init(n, v):\n        self.nombre = n\n        self.vida = v\n    func atacar(objetivo, dano):\n        objetivo.vida -= dano\nvar a = Luchador.new("A", ${vidaA})\nvar b = Luchador.new("B", ${vidaB})\na.atacar(b, ${dano})\nprint(b.vida)` };
  } },
  { id: 'clases-30', difficulty: 'maestro', title: 'Herencia con sobrescritura parcial y llamada condicional', build: () => {
    const idx = randInt(0, 1);
    const clase = idx === 0 ? 'Mago' : 'Guerrero';
    return { prompt: `Crea <code>class Personaje:</code> con método <code>atacar(): return "Ataque básico"</code>. Crea <code>class Mago:</code> con <code>extends Personaje</code> que sobrescriba <code>atacar()</code> retornando <code>"Bola de fuego"</code>, y <code>class Guerrero:</code> con <code>extends Personaje</code> (sin sobrescribir, hereda el ataque básico). Instancia <code>p = ${clase}.new()</code>. Imprime <code>p.atacar()</code>.`,
      code: `class Personaje:\n    func atacar():\n        return "Ataque básico"\nclass Mago:\n    extends Personaje\n    func atacar():\n        return "Bola de fuego"\nclass Guerrero:\n    extends Personaje\nvar p = ${clase}.new()\nprint(p.atacar())` };
  } },
  { id: 'clases-31', difficulty: 'maestro', title: 'Clase con acumulador y filtro sobre instancias', build: () => {
    const vidas = [randInt(1, 100), randInt(1, 100), randInt(1, 100), randInt(1, 100)];
    return { prompt: `Crea <code>class Enemigo:</code> con <code>var vida</code> en <code>_init(v): self.vida = v</code>. Crea <code>func esta_vivo(e): return e.vida > 0</code>. Crea <code>enemigos = [Enemigo.new(${vidas[0]}), Enemigo.new(${vidas[1]}), Enemigo.new(${vidas[2]}), Enemigo.new(${vidas[3]})]</code>. Imprime <code>enemigos.filter(esta_vivo).size()</code>.`,
      code: `class Enemigo:\n    var vida\n    func _init(v):\n        self.vida = v\nfunc esta_vivo(e):\n    return e.vida > 0\nvar enemigos = [Enemigo.new(${vidas[0]}), Enemigo.new(${vidas[1]}), Enemigo.new(${vidas[2]}), Enemigo.new(${vidas[3]})]\nprint(enemigos.filter(esta_vivo).size())` };
  } },
  { id: 'clases-32', difficulty: 'maestro', title: 'Sistema de niveles con match dentro de un método', build: () => {
    const exp = randInt(0, 300);
    return { prompt: `Crea <code>class Personaje:</code> con <code>var experiencia</code> en <code>_init(e): self.experiencia = e</code>, y un método <code>nivel():</code> que use <code>match self.experiencia / 100:</code> con casos <code>0:</code> retornando <code>1</code>, <code>1:</code> retornando <code>2</code>, y <code>_:</code> retornando <code>3</code>. Instancia <code>Personaje.new(${exp})</code> e imprime <code>.nivel()</code>.`,
      code: `class Personaje:\n    var experiencia\n    func _init(e):\n        self.experiencia = e\n    func nivel():\n        match self.experiencia / 100:\n            0:\n                return 1\n            1:\n                return 2\n            _:\n                return 3\nvar p = Personaje.new(${exp})\nprint(p.nivel())` };
  } },
  { id: 'clases-33', difficulty: 'maestro', title: 'Composición: una clase que contiene instancias de otra', build: () => {
    const nombres = ['Ana', 'Kai', 'Sol'];
    return { prompt: `Crea <code>class Jugador:</code> con <code>var nombre</code> en <code>_init(n): self.nombre = n</code>. Crea <code>class Equipo:</code> con <code>var miembros = []</code> y un método <code>agregar(j): self.miembros.append(j)</code>, y otro método <code>listar():</code> que recorra <code>self.miembros</code> con <code>for</code> imprimiendo <code>m.nombre</code> de cada uno. Instancia <code>e = Equipo.new()</code>, agrega <code>Jugador.new("${nombres[0]}")</code> y <code>Jugador.new("${nombres[1]}")</code>, y llama <code>e.listar()</code>.`,
      code: `class Jugador:\n    var nombre\n    func _init(n):\n        self.nombre = n\nclass Equipo:\n    var miembros = []\n    func agregar(j):\n        self.miembros.append(j)\n    func listar():\n        for m in self.miembros:\n            print(m.nombre)\nvar e = Equipo.new()\ne.agregar(Jugador.new("${nombres[0]}"))\ne.agregar(Jugador.new("${nombres[1]}"))\ne.listar()` };
  } },
  { id: 'clases-34', difficulty: 'maestro', title: 'Clase con método recursivo', build: () => {
    const n = randInt(3, 7);
    return { prompt: `Crea <code>class Matematica:</code> con un método <code>factorial(n):</code> recursivo (caso base <code>n <= 1</code> retorna 1; si no, retorna <code>n * self.factorial(n - 1)</code>). Instancia <code>m = Matematica.new()</code> e imprime <code>m.factorial(${n})</code>.`,
      code: `class Matematica:\n    func factorial(n):\n        if n <= 1:\n            return 1\n        return n * self.factorial(n - 1)\nvar m = Matematica.new()\nprint(m.factorial(${n}))` };
  } },
];

const senalesGenerators = [
  // ---- migrated originals ----
  { id: 'senales-1', difficulty: 'facil', title: 'Declarar y emitir', build: () => ({
    prompt: 'Declara <code>signal saludo</code>. Crea <code>func on_saludo():</code> que imprima <code>"Hola!"</code>. Conéctala con <code>saludo.connect(on_saludo)</code> y emítela con <code>saludo.emit()</code>.',
    code: 'signal saludo\nfunc on_saludo():\n    print("Hola!")\nsaludo.connect(on_saludo)\nsaludo.emit()' }) },
  { id: 'senales-2', difficulty: 'medio', title: 'Señal con argumento', build: () => ({
    prompt: 'Declara <code>signal puntos_sumados</code>. Crea <code>func on_puntos(cantidad):</code> que imprima <code>"Sumaste ", cantidad, " puntos"</code>. Conéctala y emítela con <code>puntos_sumados.emit(50)</code>.',
    code: 'signal puntos_sumados\nfunc on_puntos(cantidad):\n    print("Sumaste ", cantidad, " puntos")\npuntos_sumados.connect(on_puntos)\npuntos_sumados.emit(50)' }) },
  { id: 'senales-3', difficulty: 'medio', title: 'Dos escuchas para la misma señal', build: () => ({
    prompt: 'Declara <code>signal aviso</code>. Crea dos funciones, <code>func f1():</code> que imprima <code>"Escucha 1"</code> y <code>func f2():</code> que imprima <code>"Escucha 2"</code>. Conecta ambas a <code>aviso</code> y emítela una sola vez.',
    code: 'signal aviso\nfunc f1():\n    print("Escucha 1")\nfunc f2():\n    print("Escucha 2")\naviso.connect(f1)\naviso.connect(f2)\naviso.emit()' }) },
  { id: 'senales-4', difficulty: 'dificil', title: 'Señal disparada condicionalmente', build: () => ({
    prompt: 'Declara <code>signal murio</code> y <code>var vida = 10</code>. Crea <code>func recibir_dano(cantidad):</code> que reste de <code>vida</code> y, si <code>vida <= 0</code>, emita <code>murio</code>. Conecta <code>murio</code> a una función que imprima <code>"Game Over"</code>. Llama <code>recibir_dano(15)</code>.',
    code: 'signal murio\nvar vida = 10\nfunc on_murio():\n    print("Game Over")\nmurio.connect(on_murio)\nfunc recibir_dano(cantidad):\n    vida -= cantidad\n    if vida <= 0:\n        murio.emit()\nrecibir_dano(15)' }) },

  // ---- new facil (3) ----
  { id: 'senales-5', difficulty: 'facil', title: 'Señal sin escuchas', build: () => {
    return { prompt: `Declara <code>signal alerta</code>. Emítela con <code>alerta.emit()</code> sin haberla conectado a nada (no imprime nada, pero no debe dar error). Luego imprime <code>"Fin"</code>.`,
      code: `signal alerta\nalerta.emit()\nprint("Fin")` };
  } },
  { id: 'senales-6', difficulty: 'facil', title: 'Emitir una señal con texto', build: () => {
    const msg = pickRandom(['Nivel completado', 'Nuevo récord', 'Objeto encontrado']);
    return { prompt: `Declara <code>signal evento</code>. Crea <code>func on_evento(): print("${msg}")</code>. Conéctala y emítela.`,
      code: `signal evento\nfunc on_evento():\n    print("${msg}")\nevento.connect(on_evento)\nevento.emit()` };
  } },
  { id: 'senales-7', difficulty: 'facil', title: 'Señal con un número', build: () => {
    const n = randInt(1, 100);
    return { prompt: `Declara <code>signal numero_recibido</code>. Crea <code>func on_numero(n): print(n * 2)</code>. Conéctala y emítela con <code>numero_recibido.emit(${n})</code>.`,
      code: `signal numero_recibido\nfunc on_numero(n):\n    print(n * 2)\nnumero_recibido.connect(on_numero)\nnumero_recibido.emit(${n})` };
  } },

  // ---- new medio (2) ----
  { id: 'senales-8', difficulty: 'medio', title: 'Señal con dos argumentos', build: () => {
    const nombre = pickRandom(['Ana', 'Kai']); const puntos = randInt(1, 100);
    return { prompt: `Declara <code>signal jugador_gano</code>. Crea <code>func on_gano(nombre, puntos): print(nombre, " ganó con ", puntos, " puntos")</code>. Conéctala y emítela con <code>jugador_gano.emit("${nombre}", ${puntos})</code>.`,
      code: `signal jugador_gano\nfunc on_gano(nombre, puntos):\n    print(nombre, " ganó con ", puntos, " puntos")\njugador_gano.connect(on_gano)\njugador_gano.emit("${nombre}", ${puntos})` };
  } },
  { id: 'senales-9', difficulty: 'medio', title: 'Emitir una señal dentro de un for', build: () => {
    const n = randInt(3, 5);
    return { prompt: `Declara <code>signal contador_actualizado</code>. Crea <code>func on_contador(valor): print("Contador: " + str(valor))</code>. Conéctala. Usa un <code>for</code> con <code>range(1, ${n + 1})</code> para emitir <code>contador_actualizado.emit(i)</code> en cada vuelta.`,
      code: `signal contador_actualizado\nfunc on_contador(valor):\n    print("Contador: " + str(valor))\ncontador_actualizado.connect(on_contador)\nfor i in range(1, ${n + 1}):\n    contador_actualizado.emit(i)` };
  } },

  // ---- new dificil (3) ----
  { id: 'senales-10', difficulty: 'dificil', title: 'Señal disparada según una condición compleja', build: () => {
    const hp = randInt(0, 100); const escudo = pickRandom([true, false]);
    return { prompt: `Declara <code>signal peligro</code> y <code>func on_peligro(): print("¡Cuidado!")</code> (conéctala). Crea <code>hp = ${hp}</code> y <code>escudo = ${escudo}</code>. Si <code>hp < 30 and not escudo</code>, emite <code>peligro</code>.`,
      code: `signal peligro\nfunc on_peligro():\n    print("¡Cuidado!")\npeligro.connect(on_peligro)\nvar hp = ${hp}\nvar escudo = ${escudo}\nif hp < 30 and not escudo:\n    peligro.emit()` };
  } },
  { id: 'senales-11', difficulty: 'dificil', title: 'Señal que recorre un array antes de emitir', build: () => {
    const arr = Array.from({ length: 5 }, () => randInt(1, 20));
    const umbral = randInt(30, 60);
    return { prompt: `Declara <code>signal limite_alcanzado</code> y <code>func on_limite(total): print("Total alcanzado: " + str(total))</code> (conéctala). Crea <code>numeros = [${arr.join(', ')}]</code> y <code>suma = 0</code>. Recorre con <code>for</code> sumando cada valor; si <code>suma > ${umbral}</code>, emite <code>limite_alcanzado.emit(suma)</code> y usa <code>break</code>.`,
      code: `signal limite_alcanzado\nfunc on_limite(total):\n    print("Total alcanzado: " + str(total))\nlimite_alcanzado.connect(on_limite)\nvar numeros = [${arr.join(', ')}]\nvar suma = 0\nfor n in numeros:\n    suma += n\n    if suma > ${umbral}:\n        limite_alcanzado.emit(suma)\n        break` };
  } },
  { id: 'senales-12', difficulty: 'dificil', title: 'Señal con match dentro del handler', build: () => {
    const nivel = randInt(1, 3);
    return { prompt: `Declara <code>signal cambio_nivel</code>. Crea <code>func on_cambio(n):</code> que use <code>match n:</code> con casos <code>1:</code>, <code>2:</code>, <code>3:</code> imprimiendo <code>"Fácil"</code>, <code>"Medio"</code>, <code>"Difícil"</code> respectivamente. Conéctala y emítela con <code>cambio_nivel.emit(${nivel})</code>.`,
      code: `signal cambio_nivel\nfunc on_cambio(n):\n    match n:\n        1:\n            print("Fácil")\n        2:\n            print("Medio")\n        3:\n            print("Difícil")\ncambio_nivel.connect(on_cambio)\ncambio_nivel.emit(${nivel})` };
  } },

  // ---- new experto (4) ----
  { id: 'senales-13', difficulty: 'experto', title: 'Señal que actualiza una instancia de clase', build: () => {
    const dano = randInt(10, 40);
    return { prompt: `Declara <code>signal atacado</code>. Crea <code>class Personaje:</code> con <code>var vida = 100</code> y un método <code>recibir(cantidad): self.vida -= cantidad</code>. Instancia <code>p = Personaje.new()</code>. Crea <code>func on_atacado(cantidad): p.recibir(cantidad)</code> (usando <code>p</code> como variable global). Conecta <code>atacado.connect(on_atacado)</code> y emite <code>atacado.emit(${dano})</code>. Imprime <code>p.vida</code>.`,
      code: `signal atacado\nclass Personaje:\n    var vida = 100\n    func recibir(cantidad):\n        self.vida -= cantidad\nvar p = Personaje.new()\nfunc on_atacado(cantidad):\n    p.recibir(cantidad)\natacado.connect(on_atacado)\natacado.emit(${dano})\nprint(p.vida)` };
  } },
  { id: 'senales-14', difficulty: 'experto', title: 'Señal que actualiza un diccionario', build: () => {
    const inicial = randInt(0, 50);
    return { prompt: `Declara <code>signal moneda_ganada</code> y <code>jugador = {"oro": ${inicial}}</code>. Crea <code>func on_moneda(cantidad): jugador["oro"] += cantidad</code>. Conéctala, emite <code>moneda_ganada.emit(25)</code>, e imprime <code>jugador["oro"]</code>.`,
      code: `signal moneda_ganada\nvar jugador = {"oro": ${inicial}}\nfunc on_moneda(cantidad):\n    jugador["oro"] += cantidad\nmoneda_ganada.connect(on_moneda)\nmoneda_ganada.emit(25)\nprint(jugador["oro"])` };
  } },
  { id: 'senales-15', difficulty: 'experto', title: 'Cadena de señales (una emite a otra)', build: () => {
    return { prompt: `Declara <code>signal fase1</code> y <code>signal fase2</code>. Crea <code>func iniciar_fase2(): print("Fase 1 completa"); fase2.emit()</code> (con la sintaxis correcta, cada sentencia en su línea) y <code>func on_fase2(): print("Fase 2 iniciada")</code>. Conecta <code>fase1</code> a <code>iniciar_fase2</code> y <code>fase2</code> a <code>on_fase2</code>. Emite <code>fase1.emit()</code>.`,
      code: `signal fase1\nsignal fase2\nfunc iniciar_fase2():\n    print("Fase 1 completa")\n    fase2.emit()\nfunc on_fase2():\n    print("Fase 2 iniciada")\nfase1.connect(iniciar_fase2)\nfase2.connect(on_fase2)\nfase1.emit()` };
  } },
  { id: 'senales-16', difficulty: 'experto', title: 'Señal con acumulador entre varias emisiones', build: () => {
    const emisiones = [randInt(1, 20), randInt(1, 20), randInt(1, 20)];
    return { prompt: `Declara <code>signal dano_recibido</code> y <code>vida_total = 100</code>. Crea <code>func on_dano(cantidad): vida_total -= cantidad; print("Vida: " + str(vida_total))</code> (con la sintaxis correcta, cada sentencia en su línea). Conéctala y emite la señal tres veces seguidas con <code>dano_recibido.emit(${emisiones[0]})</code>, <code>dano_recibido.emit(${emisiones[1]})</code>, <code>dano_recibido.emit(${emisiones[2]})</code>.`,
      code: `signal dano_recibido\nvar vida_total = 100\nfunc on_dano(cantidad):\n    vida_total -= cantidad\n    print("Vida: " + str(vida_total))\ndano_recibido.connect(on_dano)\ndano_recibido.emit(${emisiones[0]})\ndano_recibido.emit(${emisiones[1]})\ndano_recibido.emit(${emisiones[2]})` };
  } },

  // ---- new maestro (4) ----
  { id: 'senales-17', difficulty: 'maestro', title: 'Sistema de eventos con múltiples señales y clase', build: () => {
    const vida = randInt(30, 100); const dano = randInt(31, 100);
    return { prompt: `Declara <code>signal murio</code> y <code>func on_murio(): print("Game Over")</code> (conéctala). Crea <code>class Personaje:</code> con <code>var vida</code> en <code>_init(v): self.vida = v</code>, y un método <code>recibir_dano(cantidad): self.vida -= cantidad; return self.vida</code> (con la sintaxis correcta, cada sentencia en su línea). Instancia <code>p = Personaje.new(${vida})</code>. Si <code>p.recibir_dano(${dano}) <= 0</code>, emite <code>murio</code>.`,
      code: `signal murio\nfunc on_murio():\n    print("Game Over")\nmurio.connect(on_murio)\nclass Personaje:\n    var vida\n    func _init(v):\n        self.vida = v\n    func recibir_dano(cantidad):\n        self.vida -= cantidad\n        return self.vida\nvar p = Personaje.new(${vida})\nif p.recibir_dano(${dano}) <= 0:\n    murio.emit()` };
  } },
  { id: 'senales-18', difficulty: 'maestro', title: 'Señal que recorre un array de jugadores', build: () => {
    const vidas = [randInt(1, 100), randInt(1, 100), randInt(1, 100)];
    return { prompt: `Declara <code>signal todos_muertos</code> y <code>func on_todos(): print("Fin de la partida")</code> (conéctala). Crea <code>vidas = [${vidas.join(', ')}]</code> y <code>alguien_vivo = false</code>. Recorre con <code>for</code> marcando <code>alguien_vivo = true</code> si algún valor es mayor a 0. Si <code>not alguien_vivo</code>, emite <code>todos_muertos</code>.`,
      code: `signal todos_muertos\nfunc on_todos():\n    print("Fin de la partida")\ntodos_muertos.connect(on_todos)\nvar vidas = [${vidas.join(', ')}]\nvar alguien_vivo = false\nfor v in vidas:\n    if v > 0:\n        alguien_vivo = true\nif not alguien_vivo:\n    todos_muertos.emit()` };
  } },
  { id: 'senales-19', difficulty: 'maestro', title: 'Máquina de estados simple con señales', build: () => {
    const estadoInicial = pickRandom(['idle', 'corriendo']);
    return { prompt: `Declara <code>signal cambio_estado</code> y <code>estado = "${estadoInicial}"</code>. Crea <code>func on_cambio(nuevo): estado = nuevo; print("Nuevo estado: " + estado)</code> (con la sintaxis correcta, cada sentencia en su línea, usando <code>estado</code> como variable global). Conéctala y emite <code>cambio_estado.emit("saltando")</code>.`,
      code: `signal cambio_estado\nvar estado = "${estadoInicial}"\nfunc on_cambio(nuevo):\n    estado = nuevo\n    print("Nuevo estado: " + estado)\ncambio_estado.connect(on_cambio)\ncambio_estado.emit("saltando")` };
  } },
  { id: 'senales-20', difficulty: 'maestro', title: 'Señal con múltiples escuchas y efectos distintos', build: () => {
    const puntos = randInt(10, 100);
    return { prompt: `Declara <code>signal puntos_ganados</code> y <code>total = 0</code>, <code>eventos = 0</code>. Crea <code>func acumular(p): total += p</code> y <code>func contar(p): eventos += 1</code> (usando <code>total</code> y <code>eventos</code> como variables globales). Conecta ambas funciones a <code>puntos_ganados</code> y emítela con <code>puntos_ganados.emit(${puntos})</code>. Imprime <code>total</code> y luego <code>eventos</code>.`,
      code: `signal puntos_ganados\nvar total = 0\nvar eventos = 0\nfunc acumular(p):\n    total += p\nfunc contar(p):\n    eventos += 1\npuntos_ganados.connect(acumular)\npuntos_ganados.connect(contar)\npuntos_ganados.emit(${puntos})\nprint(total)\nprint(eventos)` };
  } },
];

const EXERCISES = {
  variables: { label: 'Variables', generators: variablesGenerators },
  condicionales: { label: 'Condicionales', generators: condicionalesGenerators },
  bucles: { label: 'Bucles', generators: buclesGenerators },
  funciones: { label: 'Funciones', generators: funcionesGenerators },
  arrays: { label: 'Arrays', generators: arraysGenerators },
  diccionarios: { label: 'Diccionarios', generators: diccionariosGenerators },
  tipado: { label: 'Tipado, const y enum', generators: tipadoGenerators },
  clases: { label: 'Clases', generators: clasesGenerators },
  senales: { label: 'Señales', generators: senalesGenerators },
};

const DIFFICULTY_LABEL = { facil: '🟢 Fácil', medio: '🟡 Medio', dificil: '🔴 Difícil', experto: '🟣 Experto', maestro: '⚫ Maestro' };

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

// ---- guardar también EN QUÉ ejercicio estabas (tema, dificultad, modo, y
// el ejercicio ya generado tal cual, para no "re-tirar los dados" al volver) ----
const LS_EXERCISE_STATE = 'gdconsola_exercise_state_v1';

function saveExerciseState() {
  try {
    if (!currentExercise || !exercisePanelEl.classList.contains('visible')) {
      localStorage.removeItem(LS_EXERCISE_STATE);
      return;
    }
    const dataset = activeDataset();
    const topic = dataset[currentTopicKey];
    localStorage.setItem(LS_EXERCISE_STATE, JSON.stringify({
      mode: exerciseMode,
      topicKey: currentTopicKey,
      topicLabel: topic ? topic.label : '',
      difficultyFilter: exerciseDifficultyEl.value,
      exercise: currentExercise,
    }));
  } catch (e) { /* storage unavailable */ }
}

function clearExerciseState() {
  try { localStorage.removeItem(LS_EXERCISE_STATE); } catch (e) { /* storage unavailable */ }
}

// Vuelve a mostrar el mismo ejercicio (con el mismo enunciado/respuesta
// esperada) que estaba abierto cuando se cerró la página, en vez de perderlo.
function restoreExerciseState() {
  let saved;
  try {
    const raw = localStorage.getItem(LS_EXERCISE_STATE);
    if (!raw) return false;
    saved = JSON.parse(raw);
  } catch (e) { return false; }
  if (!saved || !saved.exercise) return false;

  exerciseMode = saved.mode || 'write';
  exerciseModeEl.value = exerciseMode;
  refreshTopicOptions();
  exerciseTopicEl.value = saved.topicKey || '';
  exerciseDifficultyEl.value = saved.difficultyFilter || '';
  currentTopicKey = saved.topicKey;
  currentExercise = saved.exercise;
  lastExerciseKey = saved.exercise.id;

  exerciseTopicLabelEl.textContent = saved.topicLabel || '';
  exerciseDiffLabelEl.textContent = DIFFICULTY_LABEL[currentExercise.difficulty] || '';
  exerciseDiffLabelEl.className = 'exercise-diff-pill ' + currentExercise.difficulty;
  exerciseTitleEl.textContent = currentExercise.title;
  exercisePromptEl.innerHTML = currentExercise.prompt;
  exerciseResultEl.className = 'exercise-result';
  exerciseResultEl.textContent = '';
  updateSolvedBadge();
  exercisePanelEl.classList.add('visible');

  if (exerciseMode === 'predict') {
    codeEl.readOnly = true;
    runBtn.disabled = true;
    verifyBtnEl.style.display = 'none';
    codeEl.value = currentExercise.code; // en este modo el código es fijo y de solo lectura
    updateGutter();
    updateHighlight();
    renderPredictOptions();
  } else {
    codeEl.readOnly = false;
    runBtn.disabled = false;
    verifyBtnEl.style.display = '';
    predictOptionsEl.style.display = 'none';
    predictOptionsEl.innerHTML = '';
    // el código en sí (lo que el usuario había escrito) ya se restauró aparte
  }
  return true;
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

function setExerciseResult(className, text) {
  exerciseResultEl.className = className;
  exerciseResultEl.textContent = '';
  const span = document.createElement('span');
  span.className = 'exercise-result-text';
  span.textContent = text;
  exerciseResultEl.appendChild(span);
  if (text) {
    const closeBtn = document.createElement('button');
    closeBtn.type = 'button';
    closeBtn.className = 'exercise-result-close';
    closeBtn.setAttribute('aria-label', 'Cerrar');
    closeBtn.textContent = '✕';
    closeBtn.addEventListener('click', () => {
      exerciseResultEl.className = 'exercise-result';
      exerciseResultEl.textContent = '';
    });
    exerciseResultEl.appendChild(closeBtn);
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
    const alreadySolved = solvedIds.has(currentExercise.id);
    setExerciseResult('exercise-result show pass', alreadySolved
      ? '✓ ¡Correcto! (ya lo habías resuelto antes)'
      : '✓ ¡Correcto!');
    if (!alreadySolved) {
      solvedIds.add(currentExercise.id);
      lsSaveSet(LS_SOLVED, solvedIds);
    }
    currentStreak += 1;
    if (currentStreak > bestStreak) { bestStreak = currentStreak; lsSaveNum(LS_BEST, bestStreak); }
    lsSaveNum(LS_STREAK, currentStreak);
  } else {
    setExerciseResult('exercise-result show fail', '✗ No — la respuesta correcta era: ' + currentExercise.options[currentExercise.answerIndex]);
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
  saveExerciseState();
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
    setExerciseResult('exercise-result show fail', '✗ Tu código tiene un error — revisa la salida de la consola.');
    currentStreak = 0;
    lsSaveNum(LS_STREAK, currentStreak);
    refreshStats();
    return;
  }
  const actual = lines.join('\n').trim();
  const expected = currentExercise.expected.trim();
  if (actual === expected) {
    const alreadySolved = solvedIds.has(currentExercise.id);
    setExerciseResult('exercise-result show pass', alreadySolved
      ? '✓ ¡Correcto! (ya lo habías resuelto antes)'
      : '✓ ¡Correcto! La salida coincide.');
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
    setExerciseResult('exercise-result show fail', '✗ Aún no — tu salida fue:\n' + (actual || '(sin salida)') + '\n\nSe esperaba:\n' + expected);
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
function closeExercisePanel() {
  exercisePanelEl.classList.remove('visible');
  currentExercise = null;
  codeEl.readOnly = false;
  runBtn.disabled = false;
  predictOptionsEl.style.display = 'none';
  verifyBtnEl.style.display = '';
  clearExerciseState();
}

closeExerciseBtnEl.addEventListener('click', closeExercisePanel);

restoreExerciseState();

