// ---------- UI wiring ----------
const codeEl = document.getElementById('code');
const gutterEl = document.getElementById('gutter');
const consoleEl = document.getElementById('console');
const runBtn = document.getElementById('runBtn');
const clearBtn = document.getElementById('clearBtn');
const examplesEl = document.getElementById('examples');
const refToggle = document.getElementById('refToggle');
const refPanel = document.getElementById('refPanel');
const refArrow = document.getElementById('refArrow');
const highlightCodeEl = document.getElementById('highlightCode');
const highlightEl = document.getElementById('highlight');
const codeAreaEl = document.getElementById('codeArea');
const autocompleteEl = document.getElementById('autocomplete');

const EXAMPLES = {
  "Variables y tipos": `var nombre = "Ana"
var edad = 30
var activo = true

print("Nombre: ", nombre)
print("Edad: ", edad)
print("Activo: ", activo)`,

  "Condicionales": `var edad = 16

if edad < 13:
    print("Eres un niño")
elif edad < 18:
    print("Eres adolescente")
else:
    print("Eres adulto")`,

  "Bucle for + range": `for i in range(1, 6):
    print("Iteración ", i)

var frutas = ["manzana", "pera", "uva"]
for f in frutas:
    print("Fruta: ", f)`,

  "Bucle while": `var contador = 0
while contador < 5:
    print("Contador: ", contador)
    contador += 1`,

  "Funciones y recursión": `func factorial(n):
    if n <= 1:
        return 1
    return n * factorial(n - 1)

func es_par(n):
    return n % 2 == 0

print("5! = ", factorial(5))
print("¿8 es par? ", es_par(8))`,

  "Arrays (Array)": `var numeros = [4, 1, 7, 3]
numeros.append(9)
numeros.sort()

print("Array: ", numeros)
print("Tamaño: ", numeros.size())
print("¿Tiene 7?: ", numeros.has(7))

for n in numeros:
    print(n, " al cuadrado es ", n * n)`,

  "Diccionarios (Dictionary)": `var jugador = {"nombre": "Rex", "vida": 100, "nivel": 3}

print("Jugador: ", jugador["nombre"])
jugador["nivel"] += 1

for clave in jugador.keys():
    print(clave, " -> ", jugador[clave])`,

  "FizzBuzz": `for i in range(1, 21):
    if i % 15 == 0:
        print("FizzBuzz")
    elif i % 3 == 0:
        print("Fizz")
    elif i % 5 == 0:
        print("Buzz")
    else:
        print(i)`,

  "Tipado, const y enum": `enum Estado { IDLE, CORRIENDO, SALTANDO }

const VIDA_MAXIMA = 100
const NOMBRE_JUEGO: String = "Aventura GD"

var vida: int = VIDA_MAXIMA
var estado_actual: int = Estado.IDLE

func describir_estado(estado: int) -> String:
    if estado == Estado.IDLE:
        return "quieto"
    elif estado == Estado.CORRIENDO:
        return "corriendo"
    return "saltando"

print(NOMBRE_JUEGO)
print("Vida: ", vida, " / ", VIDA_MAXIMA)
print("Estado: ", describir_estado(estado_actual))`,

  "Clases básicas": `class Personaje:
    var nombre = "Sin nombre"
    var vida = 100

    func _init(n, v = 100):
        self.nombre = n
        self.vida = v

    func recibir_dano(cantidad):
        self.vida -= cantidad
        if self.vida < 0:
            self.vida = 0

    func esta_vivo():
        return self.vida > 0

class Mago:
    extends Personaje
    var mana = 50

    func lanzar_hechizo():
        return self.nombre + " lanza una bola de fuego!"

var heroe = Personaje.new("Kai", 80)
var gandalf = Mago.new("Gandalf")

heroe.recibir_dano(30)
print(heroe.nombre, " tiene ", heroe.vida, " de vida")
print("¿Vivo? ", heroe.esta_vivo())
print(gandalf.lanzar_hechizo())
print(gandalf.nombre, " hereda ", gandalf.vida, " de vida de Personaje")`,

  "Señales": `signal vida_cambiada
signal murio

var vida = 100

func on_vida_cambiada(nueva_vida):
    print("La vida cambió a ", nueva_vida)

func on_murio():
    print("El jugador murió")

func recibir_dano(cantidad):
    vida -= cantidad
    vida_cambiada.emit(vida)
    if vida <= 0:
        murio.emit()

vida_cambiada.connect(on_vida_cambiada)
murio.connect(on_murio)

recibir_dano(40)
recibir_dano(70)`,
};

for (const name of Object.keys(EXAMPLES)) {
  const opt = document.createElement('option');
  opt.value = name;
  opt.textContent = name;
  examplesEl.appendChild(opt);
}
examplesEl.addEventListener('change', () => {
  if (examplesEl.value) {
    setEditorValue(EXAMPLES[examplesEl.value], EXAMPLES[examplesEl.value].length, true);
    examplesEl.value = '';
    codeEl.focus();
  }
});

// ---- gutter (line numbers) sync ----
function updateGutter() {
  const lines = codeEl.value.split('\n').length;
  let out = '';
  for (let i = 1; i <= lines; i++) out += i + '\n';
  gutterEl.textContent = out;
}

// ---- syntax highlighting ----
function escapeHtml(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

const HL_KEYWORDS = new Set(['var','if','elif','else','for','in','while','func','return','break','continue','pass','and','or','not','match','class','class_name','extends','signal','const','enum','self']);
const HL_CONSTS = new Set(['true','false','null']);
const HL_BUILTINS = new Set(['len','str','int','float','abs','min','max','floor','ceil','round','randi','randf','randi_range','typeof','range','keys','values','print','prints','printerr']);
const HL_RE = /(#[^\n]*)|("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*')|\b(\d+\.\d+|\d+)\b|\b([A-Za-z_]\w*)\b/g;

function highlightToHtml(code) {
  let out = '';
  let last = 0;
  let m;
  let prevWasFunc = false;
  HL_RE.lastIndex = 0;
  while ((m = HL_RE.exec(code))) {
    out += escapeHtml(code.slice(last, m.index));
    last = HL_RE.lastIndex;
    if (m[1] !== undefined) {
      out += `<span class="tok-comment">${escapeHtml(m[1])}</span>`;
      prevWasFunc = false;
    } else if (m[2] !== undefined) {
      out += `<span class="tok-str">${escapeHtml(m[2])}</span>`;
      prevWasFunc = false;
    } else if (m[3] !== undefined) {
      out += `<span class="tok-num">${escapeHtml(m[3])}</span>`;
      prevWasFunc = false;
    } else if (m[4] !== undefined) {
      const word = m[4];
      if (prevWasFunc) {
        out += `<span class="tok-func">${escapeHtml(word)}</span>`;
      } else if (HL_KEYWORDS.has(word) || HL_CONSTS.has(word)) {
        out += `<span class="tok-kw">${escapeHtml(word)}</span>`;
      } else if (HL_BUILTINS.has(word)) {
        out += `<span class="tok-builtin">${escapeHtml(word)}</span>`;
      } else if (/^\s*\(/.test(code.slice(last))) {
        out += `<span class="tok-func">${escapeHtml(word)}</span>`;
      } else {
        out += escapeHtml(word);
      }
      prevWasFunc = (word === 'func');
    }
  }
  out += escapeHtml(code.slice(last));
  return out;
}

function updateHighlight() {
  highlightCodeEl.innerHTML = highlightToHtml(codeEl.value) + '\n';
}

function syncOverlayScroll() {
  gutterEl.scrollTop = codeEl.scrollTop;
  highlightEl.scrollTop = codeEl.scrollTop;
  highlightEl.scrollLeft = codeEl.scrollLeft;
}

// ---- undo / redo history ----
let editHistory = [''];
let historyIndex = 0;
let historyTimer = null;
const MAX_HISTORY = 300;

function commitHistory() {
  const v = codeEl.value;
  if (v === editHistory[historyIndex]) return;
  editHistory = editHistory.slice(0, historyIndex + 1);
  editHistory.push(v);
  if (editHistory.length > MAX_HISTORY) editHistory.shift();
  historyIndex = editHistory.length - 1;
  updateUndoRedoButtons();
}

function scheduleHistoryCommit() {
  clearTimeout(historyTimer);
  historyTimer = setTimeout(commitHistory, 450);
}

function updateUndoRedoButtons() {
  // los botones de deshacer/rehacer se quitaron de la UI (Ctrl+Z / Ctrl+Y siguen funcionando por teclado)
}

function afterProgrammaticEdit() {
  updateGutter();
  updateHighlight();
  closeAutocomplete();
}

// sets editor content programmatically (examples, snippets, undo/redo) and records history
function setEditorValue(text, cursorPos, commitNow) {
  clearTimeout(historyTimer);
  if (commitNow) commitHistory();
  codeEl.value = text;
  codeEl.selectionStart = codeEl.selectionEnd = (cursorPos === undefined ? text.length : cursorPos);
  afterProgrammaticEdit();
  commitHistory();
}

function undo() {
  clearTimeout(historyTimer);
  commitHistory();
  if (historyIndex > 0) {
    historyIndex--;
    codeEl.value = editHistory[historyIndex];
    codeEl.selectionStart = codeEl.selectionEnd = codeEl.value.length;
    afterProgrammaticEdit();
    updateUndoRedoButtons();
  }
}

function redo() {
  if (historyIndex < editHistory.length - 1) {
    historyIndex++;
    codeEl.value = editHistory[historyIndex];
    codeEl.selectionStart = codeEl.selectionEnd = codeEl.value.length;
    afterProgrammaticEdit();
    updateUndoRedoButtons();
  }
}

// (Ctrl+Z / Ctrl+Y siguen funcionando: ver el listener de keydown más abajo)

// ---- snippets / autocomplete ----
const SNIPPETS = {
  'if': { template: 'if «cond»:\n    ', desc: 'condicional' },
  'elif': { template: 'elif «cond»:\n    ', desc: 'condicional adicional' },
  'else': { template: 'else:\n    ', desc: 'alternativa' },
  'for': { template: 'for i in range(«n»):\n    ', desc: 'bucle for' },
  'while': { template: 'while «cond»:\n    ', desc: 'bucle while' },
  'func': { template: 'func «nombre»(«params»):\n    ', desc: 'función' },
  'var': { template: 'var «nombre» = «valor»', desc: 'variable' },
  'print': { template: 'print(«valor»)', desc: 'imprimir' },
  'return': { template: 'return «valor»', desc: 'retornar' },
  'break': { template: 'break', desc: 'salir del bucle' },
  'continue': { template: 'continue', desc: 'siguiente iteración' },
  'pass': { template: 'pass', desc: 'no-op' },
  'range': { template: 'range(«n»)', desc: 'builtin' },
  'len': { template: 'len(«valor»)', desc: 'builtin' },
  'match': { template: 'match «valor»:\n    «caso»:\n        pass\n    _:\n        pass', desc: 'sentencia match' },
  'class': { template: 'class «Nombre»:\n    var «campo» = «valor»\n\n    func _init(«args»):\n        pass', desc: 'clase interna' },
  'signal': { template: 'signal «nombre»', desc: 'declarar señal' },
  'const': { template: 'const «NOMBRE» = «valor»', desc: 'constante' },
  'enum': { template: 'enum «Nombre» { «A», «B», «C» }', desc: 'enumeración' },
  'class_name': { template: 'class_name «Nombre»', desc: 'nombra la clase del script' },
  'extends': { template: 'extends «Base»', desc: 'clase base' },
};
const SNIPPET_KEYS = Object.keys(SNIPPETS);

function buildSnippetInsertion(template) {
  let result = '';
  let selStart = -1, selEnd = -1;
  let firstDone = false;
  let i = 0;
  while (i < template.length) {
    if (template[i] === '«') {
      const end = template.indexOf('»', i);
      const word = template.slice(i + 1, end);
      if (!firstDone) { selStart = result.length; }
      result += word;
      if (!firstDone) { selEnd = result.length; firstDone = true; }
      i = end + 1;
    } else {
      result += template[i]; i++;
    }
  }
  if (selStart === -1) { selStart = selEnd = result.length; }
  return { text: result, selStart, selEnd };
}

let acItems = [];
let acIndex = 0;
let acWordStart = 0, acWordEnd = 0;

function getCurrentWord() {
  const pos = codeEl.selectionStart;
  const text = codeEl.value;
  let start = pos;
  while (start > 0 && /[A-Za-z_0-9]/.test(text[start - 1])) start--;
  return { word: text.slice(start, pos), start, end: pos };
}

function getCaretCoords(textarea, position) {
  const div = document.createElement('div');
  const style = getComputedStyle(textarea);
  ['boxSizing','width','paddingTop','paddingRight','paddingBottom','paddingLeft','borderTopWidth','borderRightWidth','borderBottomWidth','borderLeftWidth','fontFamily','fontSize','fontWeight','lineHeight','letterSpacing','tabSize'].forEach(p => { div.style[p] = style[p]; });
  div.style.position = 'absolute';
  div.style.visibility = 'hidden';
  div.style.whiteSpace = 'pre';
  div.style.top = '0';
  div.style.left = '-9999px';
  document.body.appendChild(div);
  div.textContent = textarea.value.substring(0, position);
  const span = document.createElement('span');
  span.textContent = textarea.value.substring(position) || '.';
  div.appendChild(span);
  const rect = span.getBoundingClientRect();
  const divRect = div.getBoundingClientRect();
  const coords = { top: rect.top - divRect.top, left: rect.left - divRect.left };
  document.body.removeChild(div);
  return coords;
}

function closeAutocomplete() {
  autocompleteEl.classList.remove('open');
  autocompleteEl.innerHTML = '';
  acItems = [];
}

function renderAutocomplete() {
  autocompleteEl.innerHTML = '';
  acItems.forEach((key, idx) => {
    const div = document.createElement('div');
    div.className = 'ac-item' + (idx === acIndex ? ' active' : '');
    div.innerHTML = `<span>${key}</span><span class="ac-hint">${SNIPPETS[key].desc}</span>`;
    div.addEventListener('mousedown', (e) => { e.preventDefault(); applySnippet(key); });
    autocompleteEl.appendChild(div);
  });
}

function openAutocompleteAt(start) {
  const coords = getCaretCoords(codeEl, start);
  autocompleteEl.style.left = (coords.left - codeEl.scrollLeft) + 'px';
  autocompleteEl.style.top = (coords.top - codeEl.scrollTop + 21) + 'px';
  autocompleteEl.classList.add('open');
}

function updateAutocomplete() {
  const { word, start, end } = getCurrentWord();
  if (!word) { closeAutocomplete(); return; }
  const list = SNIPPET_KEYS.filter(k => k.startsWith(word.toLowerCase()));
  if (list.length === 0) { closeAutocomplete(); return; }
  acItems = list;
  acIndex = 0;
  acWordStart = start; acWordEnd = end;
  renderAutocomplete();
  openAutocompleteAt(start);
}

function applySnippet(key) {
  const snip = SNIPPETS[key];
  const { text, selStart, selEnd } = buildSnippetInsertion(snip.template);
  const before = codeEl.value.slice(0, acWordStart);
  const after = codeEl.value.slice(acWordEnd);
  clearTimeout(historyTimer);
  commitHistory();
  codeEl.value = before + text + after;
  codeEl.selectionStart = before.length + selStart;
  codeEl.selectionEnd = before.length + selEnd;
  afterProgrammaticEdit();
  commitHistory();
  codeEl.focus();
}

// ---- indentation checker ----
function checkIndentation(code) {
  const rawLines = code.split('\n');
  const lines = [];
  for (let i = 0; i < rawLines.length; i++) {
    const raw = rawLines[i].replace(/\t/g, '    ');
    const noComment = stripComment(raw);
    const content = noComment.trim();
    if (content === '') continue;
    const indent = noComment.length - noComment.trimStart().length;
    lines.push({ indent, content, lineNo: i + 1 });
  }
  const errors = [];
  const warnings = [];
  const stack = [0];
  let expectIndent = false;
  for (const line of lines) {
    if (line.indent % 4 !== 0) {
      warnings.push(`Línea ${line.lineNo}: la indentación (${line.indent} espacios) no es múltiplo de 4`);
    }
    if (expectIndent) {
      if (line.indent <= stack[stack.length - 1]) {
        errors.push(`Línea ${line.lineNo}: se esperaba un bloque indentado después de ':'`);
      } else {
        stack.push(line.indent);
      }
      expectIndent = false;
    } else if (line.indent > stack[stack.length - 1]) {
      errors.push(`Línea ${line.lineNo}: indentación inesperada (la línea anterior no termina en ':')`);
      stack.push(line.indent);
    } else if (line.indent < stack[stack.length - 1]) {
      while (stack.length > 1 && stack[stack.length - 1] > line.indent) stack.pop();
      if (stack[stack.length - 1] !== line.indent) {
        errors.push(`Línea ${line.lineNo}: la indentación no coincide con ningún bloque anterior`);
        stack.push(line.indent);
      }
    }
    if (line.content.endsWith(':')) expectIndent = true;
  }
  return { errors, warnings };
}

// ---- event wiring ----
codeEl.addEventListener('input', () => {
  updateGutter();
  updateHighlight();
  scheduleHistoryCommit();
  updateAutocomplete();
});
codeEl.addEventListener('scroll', syncOverlayScroll);
codeEl.addEventListener('click', closeAutocomplete);
codeEl.addEventListener('blur', () => setTimeout(closeAutocomplete, 150));

function selectWordOrNextOccurrence() {
  const text = codeEl.value;
  const s = codeEl.selectionStart, en = codeEl.selectionEnd;
  const isWordChar = (ch) => ch !== undefined && /[A-Za-z0-9_]/.test(ch);
  if (s === en) {
    // nada seleccionado: selecciona la palabra bajo el cursor
    let start = s, end = s;
    while (start > 0 && isWordChar(text[start - 1])) start--;
    while (end < text.length && isWordChar(text[end])) end++;
    if (start === end) return; // el cursor está sobre un espacio o símbolo, no hay palabra
    codeEl.selectionStart = start;
    codeEl.selectionEnd = end;
  } else {
    // ya hay algo seleccionado: salta a la siguiente aparición del mismo texto
    const selected = text.slice(s, en);
    if (!selected.trim()) return;
    let idx = text.indexOf(selected, en);
    if (idx === -1) idx = text.indexOf(selected, 0); // da la vuelta al principio
    if (idx === -1) return;
    codeEl.selectionStart = idx;
    codeEl.selectionEnd = idx + selected.length;
  }
}

codeEl.addEventListener('keydown', (e) => {
  if (autocompleteEl.classList.contains('open')) {
    if (e.key === 'ArrowDown') { e.preventDefault(); acIndex = (acIndex + 1) % acItems.length; renderAutocomplete(); return; }
    if (e.key === 'ArrowUp') { e.preventDefault(); acIndex = (acIndex - 1 + acItems.length) % acItems.length; renderAutocomplete(); return; }
    if (e.key === 'Enter' || e.key === 'Tab') { e.preventDefault(); applySnippet(acItems[acIndex]); return; }
    if (e.key === 'Escape') { e.preventDefault(); closeAutocomplete(); return; }
  }

  if ((e.ctrlKey || e.metaKey) && !e.shiftKey && e.key.toLowerCase() === 'z') {
    e.preventDefault();
    undo();
    return;
  }
  if ((e.ctrlKey || e.metaKey) && !e.shiftKey && e.key.toLowerCase() === 'd') {
    e.preventDefault();
    selectWordOrNextOccurrence();
    return;
  }
  if (((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'z') || ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'y')) {
    e.preventDefault();
    redo();
    return;
  }

  if (e.key === 'Tab') {
    e.preventDefault();
    clearTimeout(historyTimer);
    commitHistory();
    const s = codeEl.selectionStart, en = codeEl.selectionEnd;
    codeEl.value = codeEl.value.slice(0, s) + '    ' + codeEl.value.slice(en);
    codeEl.selectionStart = codeEl.selectionEnd = s + 4;
    afterProgrammaticEdit();
    commitHistory();
  }
  if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
    e.preventDefault();
    executeCode();
  }
  if (e.key === 'Enter') {
    // auto-indent: keep same indent as current line, add 4 more if line ends with ':'
    const s = codeEl.selectionStart;
    const before = codeEl.value.slice(0, s);
    const lineStart = before.lastIndexOf('\n') + 1;
    const currentLine = before.slice(lineStart);
    const indentMatch = currentLine.match(/^[ ]*/);
    let indent = indentMatch ? indentMatch[0] : '';
    if (currentLine.trim().endsWith(':')) indent += '    ';
    if (indent) {
      e.preventDefault();
      clearTimeout(historyTimer);
      commitHistory();
      const en = codeEl.selectionEnd;
      const insert = '\n' + indent;
      codeEl.value = codeEl.value.slice(0, s) + insert + codeEl.value.slice(en);
      codeEl.selectionStart = codeEl.selectionEnd = s + insert.length;
      afterProgrammaticEdit();
      commitHistory();
    }
  }
});

// ---- console rendering ----
function printLine(text, cls) {
  const div = document.createElement('div');
  div.className = 'console-line ' + (cls || 'stdout');
  div.textContent = text;
  consoleEl.appendChild(div);
  consoleEl.scrollTop = consoleEl.scrollHeight;
}

function printIndentBanner(errors) {
  const div = document.createElement('div');
  div.className = 'indent-error';
  div.textContent = '✗ Errores de indentación — corrígelos antes de ejecutar:\n' + errors.map(e => '· ' + e).join('\n');
  consoleEl.appendChild(div);
}

function clearConsole() {
  consoleEl.innerHTML = '';
}

function executeCode() {
  if (runBtn.disabled) return;
  clearConsole();
  const code = codeEl.value;

  const { errors, warnings } = checkIndentation(code);
  if (errors.length > 0) {
    printIndentBanner(errors);
    return;
  }
  warnings.forEach(w => printLine('⚠ ' + w, 'system'));

  const interp = new Interpreter((msg, isErr) => printLine(msg, isErr ? 'stderr' : 'stdout'));
  const t0 = performance.now();
  try {
    interp.run(code);
    const ms = (performance.now() - t0).toFixed(1);
    printLine(`— ejecución terminada en ${ms} ms —`, 'system');
  } catch (e) {
    printLine(e.message, 'error');
  }
  const row = document.createElement('div');
  row.className = 'prompt-row';
  row.innerHTML = 'gd&gt; <span class="cursor"></span>';
  consoleEl.appendChild(row);
  consoleEl.scrollTop = consoleEl.scrollHeight;
}

runBtn.addEventListener('click', executeCode);
clearBtn.addEventListener('click', clearConsole);
refToggle.addEventListener('click', () => {
  const open = refPanel.classList.toggle('open');
  refArrow.textContent = open ? 'ocultar' : 'mostrar';
});

