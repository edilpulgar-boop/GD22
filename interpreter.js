// ---------- Mini GDScript interpreter (subset) ----------

function stripComment(s) {
  let inStr = false, q = null;
  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    if (inStr) {
      if (c === '\\') { i++; continue; }
      if (c === q) inStr = false;
    } else {
      if (c === '"' || c === "'") { inStr = true; q = c; }
      else if (c === '#') return s.slice(0, i);
    }
  }
  return s;
}

function splitLines(code) {
  const rawLines = code.split('\n');
  const lines = [];
  for (let ln = 0; ln < rawLines.length; ln++) {
    let raw = rawLines[ln].replace(/\t/g, '    ');
    const noComment = stripComment(raw);
    const content = noComment.trim();
    if (content === '') continue;
    const indent = noComment.length - noComment.trimStart().length;
    lines.push({ indent, content, lineNo: ln + 1 });
  }
  return lines;
}

// ---------- Expression tokenizer ----------
function tokenize(expr) {
  const toks = [];
  let i = 0;
  const n = expr.length;
  while (i < n) {
    const c = expr[i];
    if (c === ' ') { i++; continue; }
    if (c === '"' || c === "'") {
      const q = c; let j = i + 1; let val = '';
      while (j < n && expr[j] !== q) {
        if (expr[j] === '\\' && j + 1 < n) { val += ({'n':'\n','t':'\t'}[expr[j+1]] ?? expr[j+1]); j += 2; }
        else { val += expr[j]; j++; }
      }
      toks.push({ type: 'str', value: val });
      i = j + 1; continue;
    }
    if (/[0-9]/.test(c) || (c === '.' && /[0-9]/.test(expr[i+1] || ''))) {
      let j = i; let isFloat = false;
      while (j < n && (/[0-9]/.test(expr[j]) || (expr[j] === '.' && !isFloat))) {
        if (expr[j] === '.') isFloat = true;
        j++;
      }
      toks.push({ type: 'num', value: isFloat ? parseFloat(expr.slice(i, j)) : parseInt(expr.slice(i, j), 10) });
      i = j; continue;
    }
    if (/[A-Za-z_]/.test(c)) {
      let j = i;
      while (j < n && /[A-Za-z0-9_]/.test(expr[j])) j++;
      const word = expr.slice(i, j);
      const kw = ['and', 'or', 'not', 'true', 'false', 'null'];
      toks.push({ type: kw.includes(word) ? word : 'ident', value: word });
      i = j; continue;
    }
    const two = expr.slice(i, i + 2);
    if (['==', '!=', '<=', '>=', '+=', '-=', '*=', '/='].includes(two)) {
      toks.push({ type: 'op', value: two }); i += 2; continue;
    }
    if ('+-*/%<>()[]{},.:'.includes(c)) {
      toks.push({ type: 'op', value: c }); i++; continue;
    }
    if (c === '=') { toks.push({ type: 'op', value: '=' }); i++; continue; }
    throw new Error(`Carácter inesperado '${c}'`);
  }
  toks.push({ type: 'eof' });
  return toks;
}

// ---------- Expression parser (Pratt / recursive descent) ----------
function parseExpr(tokens) {
  let pos = 0;
  const peek = () => tokens[pos];
  const next = () => tokens[pos++];
  const expect = (val) => {
    const t = next();
    if (t.value !== val) throw new Error(`Se esperaba '${val}' pero se encontró '${t.value ?? t.type}'`);
    return t;
  };

  function parseTernary() {
    const left = parseOr();
    if (peek().type === 'ident' && peek().value === 'if') {
      next();
      const cond = parseOr();
      if (!(peek().type === 'ident' && peek().value === 'else')) {
        throw new Error(`Se esperaba 'else' en expresión ternaria`);
      }
      next();
      const otherwise = parseTernary();
      return { type: 'ternary', cond, then: left, otherwise };
    }
    return left;
  }
  function parseOr() {
    let left = parseAnd();
    while (peek().type === 'or') { next(); left = { type: 'or', left, right: parseAnd() }; }
    return left;
  }
  function parseAnd() {
    let left = parseNot();
    while (peek().type === 'and') { next(); left = { type: 'and', left, right: parseNot() }; }
    return left;
  }
  function parseNot() {
    if (peek().type === 'not') { next(); return { type: 'not', value: parseNot() }; }
    return parseComparison();
  }
  function parseComparison() {
    let left = parseAdd();
    while (peek().type === 'op' && ['==', '!=', '<', '>', '<=', '>='].includes(peek().value)) {
      const op = next().value;
      left = { type: 'cmp', op, left, right: parseAdd() };
    }
    return left;
  }
  function parseAdd() {
    let left = parseMul();
    while (peek().type === 'op' && ['+', '-'].includes(peek().value)) {
      const op = next().value;
      left = { type: 'bin', op, left, right: parseMul() };
    }
    return left;
  }
  function parseMul() {
    let left = parseUnary();
    while (peek().type === 'op' && ['*', '/', '%'].includes(peek().value)) {
      const op = next().value;
      left = { type: 'bin', op, left, right: parseUnary() };
    }
    return left;
  }
  function parseUnary() {
    if (peek().type === 'op' && peek().value === '-') { next(); return { type: 'neg', value: parseUnary() }; }
    return parsePostfix();
  }
  function parsePostfix() {
    let node = parsePrimary();
    while (true) {
      if (peek().type === 'op' && peek().value === '.') {
        next();
        const name = expect_ident();
        if (peek().type === 'op' && peek().value === '(') {
          next();
          const args = parseArgs();
          node = { type: 'method', target: node, name, args };
        } else {
          node = { type: 'member', target: node, name };
        }
      } else if (peek().type === 'op' && peek().value === '[') {
        next();
        const idx = parseTernary();
        expect(']');
        node = { type: 'index', target: node, index: idx };
      } else if (peek().type === 'op' && peek().value === '(') {
        next();
        const args = parseArgs();
        node = { type: 'call', callee: node, args };
      } else break;
    }
    return node;
  }
  function expect_ident() {
    const t = next();
    if (t.type !== 'ident') throw new Error('Se esperaba un identificador');
    return t.value;
  }
  function parseArgs() {
    const args = [];
    if (peek().type === 'op' && peek().value === ')') { next(); return args; }
    while (true) {
      args.push(parseTernary());
      if (peek().type === 'op' && peek().value === ',') { next(); continue; }
      expect(')');
      break;
    }
    return args;
  }
  function parsePrimary() {
    const t = peek();
    if (t.type === 'num') { next(); return { type: 'lit', value: t.value }; }
    if (t.type === 'str') { next(); return { type: 'lit', value: t.value }; }
    if (t.type === 'true') { next(); return { type: 'lit', value: true }; }
    if (t.type === 'false') { next(); return { type: 'lit', value: false }; }
    if (t.type === 'null') { next(); return { type: 'lit', value: null }; }
    if (t.type === 'ident') { next(); return { type: 'var', name: t.value }; }
    if (t.type === 'op' && t.value === '(') {
      next(); const e = parseTernary(); expect(')'); return e;
    }
    if (t.type === 'op' && t.value === '[') {
      next();
      const items = [];
      if (!(peek().type === 'op' && peek().value === ']')) {
        while (true) {
          items.push(parseTernary());
          if (peek().type === 'op' && peek().value === ',') { next(); continue; }
          break;
        }
      }
      expect(']');
      return { type: 'array', items };
    }
    if (t.type === 'op' && t.value === '{') {
      next();
      const pairs = [];
      if (!(peek().type === 'op' && peek().value === '}')) {
        while (true) {
          const k = parseTernary();
          expect(':');
          const v = parseTernary();
          pairs.push([k, v]);
          if (peek().type === 'op' && peek().value === ',') { next(); continue; }
          break;
        }
      }
      expect('}');
      return { type: 'dict', pairs };
    }
    throw new Error(`Expresión inesperada cerca de '${t.value ?? t.type}'`);
  }

  const result = parseTernary();
  if (peek().type !== 'eof') throw new Error(`Token inesperado '${peek().value}'`);
  return result;
}

function parseExprString(s) { return parseExpr(tokenize(s)); }

// ---------- Statement parser ----------
function findColonHeader(content) {
  // header ends with ':' (compound statement)
  return content.endsWith(':');
}

function parseBlock(lines, pos, indent) {
  const stmts = [];
  while (pos < lines.length && lines[pos].indent === indent) {
    const [stmt, newPos] = parseStatement(lines, pos, indent);
    stmts.push(stmt);
    pos = newPos;
  }
  return [stmts, pos];
}

function parseNestedBlock(lines, pos, parentIndent) {
  if (pos >= lines.length || lines[pos].indent <= parentIndent) return [[], pos];
  const nestedIndent = lines[pos].indent;
  return parseBlock(lines, pos, nestedIndent);
}

function parseStatement(lines, pos, indent) {
  const line = lines[pos];
  const c = line.content;
  const lineNo = line.lineNo;

  const kw = (word) => c === word || c.startsWith(word + ' ') || c.startsWith(word + ':') || c.startsWith(word + '(');

  try {
    if (kw('if') && findColonHeader(c)) {
      const cond = c.slice(2, -1).trim();
      pos++;
      const [body, p1] = parseNestedBlock(lines, pos, indent);
      pos = p1;
      const branches = [{ cond: parseExprString(cond), body }];
      let elseBody = [];
      while (pos < lines.length && lines[pos].indent === indent && (lines[pos].content.startsWith('elif ') )) {
        const econd = lines[pos].content.slice(5, -1).trim();
        pos++;
        const [ebody, p2] = parseNestedBlock(lines, pos, indent);
        pos = p2;
        branches.push({ cond: parseExprString(econd), body: ebody });
      }
      if (pos < lines.length && lines[pos].indent === indent && lines[pos].content === 'else:') {
        pos++;
        const [ebody, p3] = parseNestedBlock(lines, pos, indent);
        pos = p3;
        elseBody = ebody;
      }
      return [{ type: 'if', branches, elseBody, lineNo }, pos];
    }

    if (kw('for') && findColonHeader(c)) {
      const m = c.match(/^for\s+([A-Za-z_][A-Za-z0-9_]*)\s+in\s+(.+):$/);
      if (!m) throw new Error(`Sintaxis de 'for' inválida`);
      const varName = m[1];
      const iterExpr = m[2].trim();
      pos++;
      const [body, p1] = parseNestedBlock(lines, pos, indent);
      return [{ type: 'for', varName, iterExpr: parseIterExpr(iterExpr), body, lineNo }, p1];
    }

    if (kw('match') && findColonHeader(c)) {
      const exprStr = c.slice(5, -1).trim();
      const matchExpr = parseExprString(exprStr);
      pos++;
      const cases = [];
      if (pos < lines.length && lines[pos].indent > indent) {
        const caseIndent = lines[pos].indent;
        while (pos < lines.length && lines[pos].indent === caseIndent) {
          const caseLine = lines[pos];
          const cc = caseLine.content;
          if (!findColonHeader(cc)) throw new Error(`Línea ${caseLine.lineNo}: se esperaba un caso terminado en ':'`);
          const patternStr = cc.slice(0, -1).trim();
          pos++;
          const [body, p2] = parseNestedBlock(lines, pos, caseIndent);
          pos = p2;
          const patterns = patternStr === '_' ? null : splitTopLevelCommas(patternStr).map(s => parseExprString(s.trim()));
          cases.push({ patterns, body });
        }
      }
      return [{ type: 'match', expr: matchExpr, cases, lineNo }, pos];
    }

    if (kw('while') && findColonHeader(c)) {
      const cond = c.slice(5, -1).trim();
      pos++;
      const [body, p1] = parseNestedBlock(lines, pos, indent);
      return [{ type: 'while', cond: parseExprString(cond), body, lineNo }, p1];
    }

    if (kw('func') && findColonHeader(c)) {
      const m = c.match(/^func\s+([A-Za-z_][A-Za-z0-9_]*)\s*\((.*)\)\s*(->\s*\w+\s*)?:$/);
      if (!m) throw new Error(`Sintaxis de 'func' inválida`);
      const name = m[1];
      const stripType = (s) => s.replace(/:\s*[A-Za-z_][A-Za-z0-9_]*(\[[A-Za-z_][A-Za-z0-9_]*\])?\s*$/, '').trim();
      const params = m[2].trim() === '' ? [] : splitTopLevelCommas(m[2]).map(s => {
        const ps = s.trim();
        const eq = matchAssignment(ps);
        if (eq && eq.op === '=') return { name: stripType(eq.targetStr), defaultExpr: parseExprString(eq.exprStr) };
        return { name: stripType(ps), defaultExpr: null };
      });
      pos++;
      const [body, p1] = parseNestedBlock(lines, pos, indent);
      return [{ type: 'func', name, params, body, lineNo }, p1];
    }

    // class_name Nombre  (declara el nombre de la clase del script; no tiene efecto en la ejecución)
    if (c.startsWith('class_name ')) {
      const name = c.slice('class_name '.length).trim().split(/\s+/)[0];
      return [{ type: 'classname', name, lineNo }, pos + 1];
    }

    // extends Nombre  (a nivel de script raíz es informativo; dentro de un bloque 'class' define la clase base)
    if (c === 'extends' || c.startsWith('extends ')) {
      const name = c.slice('extends'.length).trim();
      return [{ type: 'extends', name, lineNo }, pos + 1];
    }

    // class Nombre:  (clase interna con var = campos, func = métodos, y opcionalmente _init)
    if (kw('class') && findColonHeader(c)) {
      const m = c.match(/^class\s+([A-Za-z_][A-Za-z0-9_]*)\s*:$/);
      if (!m) throw new Error(`Sintaxis de 'class' inválida`);
      const name = m[1];
      pos++;
      const [body, p1] = parseNestedBlock(lines, pos, indent);
      return [{ type: 'class', name, body, lineNo }, p1];
    }

    // signal nombre  o  signal nombre(a, b)
    if (kw('signal')) {
      const m = c.match(/^signal\s+([A-Za-z_][A-Za-z0-9_]*)\s*(\(.*\))?$/);
      if (!m) throw new Error(`Sintaxis de 'signal' inválida`);
      return [{ type: 'signal', name: m[1], lineNo }, pos + 1];
    }

    // const NOMBRE = valor  (opcionalmente con anotación de tipo: const NOMBRE: int = valor)
    if (kw('const')) {
      const m = c.match(/^const\s+([A-Za-z_][A-Za-z0-9_]*)\s*(?::\s*[A-Za-z_][A-Za-z0-9_]*)?\s*=\s*(.+)$/);
      if (!m) throw new Error(`Sintaxis de 'const' inválida (debe declararse con un valor)`);
      return [{ type: 'const', name: m[1], expr: parseExprString(m[2].trim()), lineNo }, pos + 1];
    }

    // enum Nombre { A, B, C }  o  enum { A, B, C }  (con valores opcionales: A = 5)
    if (kw('enum')) {
      const m = c.match(/^enum\s*([A-Za-z_][A-Za-z0-9_]*)?\s*\{(.*)\}\s*$/);
      if (!m) throw new Error(`Sintaxis de 'enum' inválida`);
      const body = m[2].trim();
      const members = body === '' ? [] : splitTopLevelCommas(body).map(s => {
        const t = s.trim();
        const eq = t.match(/^([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.+)$/);
        if (eq) return { name: eq[1], valueExpr: parseExprString(eq[2].trim()) };
        return { name: t, valueExpr: null };
      });
      return [{ type: 'enum', name: m[1] || null, members, lineNo }, pos + 1];
    }

    if (c === 'pass') return [{ type: 'pass', lineNo }, pos + 1];
    if (c === 'break') return [{ type: 'break', lineNo }, pos + 1];
    if (c === 'continue') return [{ type: 'continue', lineNo }, pos + 1];

    if (c.startsWith('return')) {
      const rest = c.slice(6).trim();
      return [{ type: 'return', expr: rest ? parseExprString(rest) : null, lineNo }, pos + 1];
    }

    if (c.startsWith('print(') || c.startsWith('prints(') || c.startsWith('printerr(')) {
      const isErr = c.startsWith('printerr(');
      const argsStr = c.slice(c.indexOf('(') + 1, c.lastIndexOf(')'));
      const args = splitTopLevelCommas(argsStr).filter(s => s.trim() !== '').map(parseExprString);
      return [{ type: 'print', args, isErr, lineNo }, pos + 1];
    }

    if (kw('var')) {
      const mMulti = c.match(/^var\s+([A-Za-z_][A-Za-z0-9_]*(?:\s*,\s*[A-Za-z_][A-Za-z0-9_]*)+)\s*=\s*(.+)$/);
      if (mMulti) {
        const names = mMulti[1].split(',').map(s => s.trim());
        const expr = parseExprString(mMulti[2].trim());
        return [{ type: 'vardestruct', names, expr, lineNo }, pos + 1];
      }
      const m = c.match(/^var\s+([A-Za-z_][A-Za-z0-9_]*)\s*(?::\s*[A-Za-z_][A-Za-z0-9_]*(?:\[[A-Za-z_][A-Za-z0-9_]*\])?)?\s*(=\s*(.+))?$/);
      if (!m) throw new Error(`Sintaxis de 'var' inválida`);
      const name = m[1];
      const expr = m[3] ? parseExprString(m[3].trim()) : { type: 'lit', value: null };
      return [{ type: 'var', name, expr, lineNo }, pos + 1];
    }

    // assignment / compound assignment / bare expression (incl. method calls, .append, etc.)
    const assignMatch = matchAssignment(c);
    if (assignMatch) {
      const { targetStr, op, exprStr } = assignMatch;
      return [{ type: 'assign', target: parseExprString(targetStr), op, expr: parseExprString(exprStr), lineNo }, pos + 1];
    }

    // bare expression statement (e.g., function call, arr.append(x))
    return [{ type: 'exprstmt', expr: parseExprString(c), lineNo }, pos + 1];
  } catch (e) {
    throw new Error(`Línea ${lineNo}: ${e.message}`);
  }
}

function splitTopLevelCommas(s) {
  const parts = []; let depth = 0; let cur = ''; let inStr = false, q = null;
  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    if (inStr) {
      cur += c;
      if (c === '\\') { i++; cur += s[i]; continue; }
      if (c === q) inStr = false;
      continue;
    }
    if (c === '"' || c === "'") { inStr = true; q = c; cur += c; continue; }
    if ('([{'.includes(c)) depth++;
    if (')]}'.includes(c)) depth--;
    if (c === ',' && depth === 0) { parts.push(cur); cur = ''; continue; }
    cur += c;
  }
  if (cur.trim() !== '') parts.push(cur);
  return parts;
}

function matchAssignment(c) {
  // find top-level assignment operator not inside strings/brackets, and not '==' etc.
  let depth = 0, inStr = false, q = null;
  const ops = ['+=', '-=', '*=', '/=', '='];
  for (let i = 0; i < c.length; i++) {
    const ch = c[i];
    if (inStr) { if (ch === '\\') { i++; continue; } if (ch === q) inStr = false; continue; }
    if (ch === '"' || ch === "'") { inStr = true; q = ch; continue; }
    if ('([{'.includes(ch)) depth++;
    if (')]}'.includes(ch)) depth--;
    if (depth === 0) {
      for (const op of ops) {
        if (c.slice(i, i + op.length) === op) {
          // avoid matching == != <= >=
          const prev = c[i - 1]; const nextCh = c[i + op.length];
          if (op === '=' && (prev === '=' || prev === '!' || prev === '<' || prev === '>' || nextCh === '=')) continue;
          return { targetStr: c.slice(0, i).trim(), op, exprStr: c.slice(i + op.length).trim() };
        }
      }
    }
  }
  return null;
}

function parseIterExpr(s) {
  const m = s.match(/^range\((.*)\)$/);
  if (m) {
    const args = splitTopLevelCommas(m[1]).map(x => parseExprString(x.trim()));
    return { type: 'range', args };
  }
  return { type: 'expr', expr: parseExprString(s) };
}

// ---------- Evaluator ----------
class BreakSignal {}
class ContinueSignal {}
class ReturnSignal { constructor(v) { this.value = v; } }

function gdStr(v) {
  if (v === null || v === undefined) return 'null';
  if (typeof v === 'boolean') return v ? 'true' : 'false';
  if (Array.isArray(v)) return '[' + v.map(gdStr).join(', ') + ']';
  if (typeof v === 'object' && v.__gdfunc) return `<Callable: ${v.__gdfunc}>`;
  if (typeof v === 'object' && v.__gdclass_instance) return `<${v.__gdclass_instance} instance>`;
  if (typeof v === 'object' && v.__gdclass) return `<class ${v.__gdclass}>`;
  if (typeof v === 'object' && v.__gdsignal) return `<Signal: ${v.__gdsignal}>`;
  if (typeof v === 'object') {
    return '{' + Object.entries(v).map(([k, val]) => `${JSON.stringify(k)}: ${gdStr(val)}`).join(', ') + '}';
  }
  return String(v);
}

function gdFormat(fmt, arg) {
  const args = Array.isArray(arg) ? arg.slice() : [arg];
  let i = 0;
  return fmt.replace(/%[sd%f]/g, (m) => {
    if (m === '%%') return '%';
    const val = args[i++];
    if (m === '%d') return String(Math.trunc(Number(val)));
    if (m === '%f') return String(Number(val));
    return gdStr(val);
  });
}

function truthy(v) {
  if (Array.isArray(v)) return v.length > 0;
  if (v === null || v === undefined) return false;
  return !!v;
}

class Interpreter {
  constructor(onPrint, onStep) {
    this.functions = {};
    this.classes = {};
    this.constNames = new Set();
    this.globals = {};
    this.onPrint = onPrint || (() => {});
    this.onStep = onStep || null;
    this.steps = 0;
    this.MAX_STEPS = 200000;
  }

  tick() {
    this.steps++;
    if (this.steps > this.MAX_STEPS) throw new Error('Se excedió el límite de ejecución (¿bucle infinito?)');
  }

  run(code) {
    const lines = splitLines(code);
    const [stmts] = parseBlock(lines, 0, lines.length ? lines[0].indent : 0);
    // hoist funcs y clases (para poder usarlas antes de donde aparecen declaradas)
    for (const s of stmts) if (s.type === 'func') this.functions[s.name] = s;
    for (const s of stmts) if (s.type === 'class') this.execStmtInner(s, this.globals);
    const scope = this.globals;
    for (const s of stmts) {
      if (s.type === 'func' || s.type === 'class') continue;
      this.execStmt(s, scope);
    }
  }

  execBlock(stmts, scope) {
    for (const s of stmts) this.execStmt(s, scope);
  }

  execStmt(s, scope) {
    if (this.onStep) this.onStep(s, scope);
    this.tick();
    try {
      return this.execStmtInner(s, scope);
    } catch (e) {
      if (e instanceof BreakSignal || e instanceof ContinueSignal || e instanceof ReturnSignal) throw e;
      if (e instanceof Error && !e.__lineTagged && s.lineNo) {
        e.message = `Línea ${s.lineNo}: ${e.message}`;
        e.__lineTagged = true;
      }
      throw e;
    }
  }

  execStmtInner(s, scope) {
    switch (s.type) {
      case 'var':
        scope[s.name] = this.eval(s.expr, scope);
        return;
      case 'vardestruct': {
        const val = this.eval(s.expr, scope);
        if (!Array.isArray(val)) throw new Error(`Se esperaba un Array para repartir en ${s.names.length} variables`);
        s.names.forEach((name, i) => { scope[name] = val[i] !== undefined ? val[i] : null; });
        return;
      }
      case 'assign': {
        const val = this.eval(s.expr, scope);
        this.assignTo(s.target, s.op, val, scope);
        return;
      }
      case 'print': {
        const parts = s.args.map(a => gdStr(this.eval(a, scope)));
        this.onPrint(parts.join(''), s.isErr);
        return;
      }
      case 'if': {
        for (const b of s.branches) {
          if (truthy(this.eval(b.cond, scope))) { this.execBlock(b.body, scope); return; }
        }
        this.execBlock(s.elseBody, scope);
        return;
      }
      case 'for': {
        const iter = this.resolveIter(s.iterExpr, scope);
        for (const v of iter) {
          scope[s.varName] = v;
          try { this.execBlock(s.body, scope); }
          catch (e) { if (e instanceof BreakSignal) break; if (e instanceof ContinueSignal) continue; throw e; }
        }
        return;
      }
      case 'match': {
        const val = this.eval(s.expr, scope);
        for (const c of s.cases) {
          if (c.patterns === null) { this.execBlock(c.body, scope); return; }
          for (const p of c.patterns) {
            if (JSON.stringify(this.eval(p, scope)) === JSON.stringify(val)) { this.execBlock(c.body, scope); return; }
          }
        }
        return;
      }
      case 'while': {
        while (truthy(this.eval(s.cond, scope))) {
          this.tick();
          try { this.execBlock(s.body, scope); }
          catch (e) { if (e instanceof BreakSignal) break; if (e instanceof ContinueSignal) continue; throw e; }
        }
        return;
      }
      case 'func':
        this.functions[s.name] = s;
        return;
      case 'const': {
        scope[s.name] = this.eval(s.expr, scope);
        this.constNames.add(s.name);
        return;
      }
      case 'enum': {
        const obj = {};
        let next = 0;
        for (const mem of s.members) {
          if (mem.valueExpr) next = this.eval(mem.valueExpr, scope);
          obj[mem.name] = next;
          next++;
        }
        if (s.name) {
          scope[s.name] = obj;
          this.constNames.add(s.name);
        } else {
          for (const k of Object.keys(obj)) { scope[k] = obj[k]; this.constNames.add(k); }
        }
        return;
      }
      case 'signal':
        scope[s.name] = { __gdsignal: s.name, listeners: [] };
        return;
      case 'classname':
      case 'extends':
        return; // informativos, sin efecto en la ejecución de este subconjunto
      case 'class': {
        let extendsName = null;
        const fields = [];
        const methods = {};
        for (const st of s.body) {
          if (st.type === 'extends') extendsName = st.name;
          else if (st.type === 'var') fields.push(st);
          else if (st.type === 'func') methods[st.name] = st;
        }
        this.classes[s.name] = { name: s.name, extendsName, fields, methods };
        scope[s.name] = { __gdclass: s.name };
        return;
      }
      case 'return':
        throw new ReturnSignal(s.expr ? this.eval(s.expr, scope) : null);
      case 'break':
        throw new BreakSignal();
      case 'continue':
        throw new ContinueSignal();
      case 'pass':
        return;
      case 'exprstmt':
        this.eval(s.expr, scope);
        return;
      default:
        throw new Error(`Sentencia no soportada: ${s.type}`);
    }
  }

  resolveIter(iterExpr, scope) {
    if (iterExpr.type === 'range') {
      const vals = iterExpr.args.map(a => this.eval(a, scope));
      let start = 0, stop, step = 1;
      if (vals.length === 1) stop = vals[0];
      else if (vals.length === 2) { start = vals[0]; stop = vals[1]; }
      else { start = vals[0]; stop = vals[1]; step = vals[2]; }
      const out = [];
      if (step > 0) for (let i = start; i < stop; i += step) out.push(i);
      else if (step < 0) for (let i = start; i > stop; i += step) out.push(i);
      return out;
    }
    const v = this.eval(iterExpr.expr, scope);
    if (typeof v === 'number') return this.resolveIter({ type: 'range', args: [{ type: 'lit', value: v }] }, scope);
    if (Array.isArray(v)) return v;
    if (typeof v === 'string') return v.split('');
    if (v && typeof v === 'object') return Object.keys(v);
    throw new Error('No se puede iterar sobre este valor');
  }

  assignTo(target, op, val, scope) {
    const combine = (old) => {
      switch (op) {
        case '=': return val;
        case '+=': return Array.isArray(old) ? old.concat(val) : old + val;
        case '-=': return old - val;
        case '*=': return old * val;
        case '/=': return old / val;
        default: throw new Error(`Operador no soportado: ${op}`);
      }
    };
    if (target.type === 'var') {
      if (this.constNames.has(target.name)) throw new Error(`No se puede reasignar la constante '${target.name}'`);
      const old = scope.hasOwnProperty(target.name) ? scope[target.name] : this.globals[target.name];
      scope[target.name] = combine(old);
      return;
    }
    if (target.type === 'index') {
      const obj = this.eval(target.target, scope);
      const idx = this.eval(target.index, scope);
      obj[idx] = combine(obj[idx]);
      return;
    }
    if (target.type === 'member') {
      const obj = this.eval(target.target, scope);
      obj[target.name] = combine(obj[target.name]);
      return;
    }
    throw new Error('Destino de asignación no válido');
  }

  callFunction(name, args, scope) {
    // built-ins
    const builtins = {
      len: (v) => Array.isArray(v) ? v.length : (typeof v === 'string' ? v.length : Object.keys(v).length),
      str: (v) => gdStr(v),
      int: (v) => Math.trunc(Number(v)),
      float: (v) => Number(v),
      abs: (v) => Math.abs(v),
      min: (...a) => Math.min(...(a.length === 1 && Array.isArray(a[0]) ? a[0] : a)),
      max: (...a) => Math.max(...(a.length === 1 && Array.isArray(a[0]) ? a[0] : a)),
      floor: (v) => Math.floor(v),
      ceil: (v) => Math.ceil(v),
      round: (v) => Math.round(v),
      randi: () => Math.floor(Math.random() * 2147483647),
      randf: () => Math.random(),
      randi_range: (a, b) => Math.floor(Math.random() * (b - a + 1)) + a,
      typeof: (v) => Array.isArray(v) ? 'Array' : (v === null ? 'Nil' : (v && typeof v === 'object' && v.__gdclass_instance) ? v.__gdclass_instance : typeof v === 'object' ? 'Dictionary' : typeof v === 'string' ? 'String' : typeof v === 'boolean' ? 'bool' : Number.isInteger(v) ? 'int' : 'float'),
      range: (...a) => this.resolveIter({ type: 'range', args: a.map(x => ({ type: 'lit', value: x })) }, scope),
      keys: (d) => Object.keys(d),
      values: (d) => Object.values(d),
    };
    if (this.functions[name]) {
      const def = this.functions[name];
      const local = {};
      def.params.forEach((p, i) => {
        if (i < args.length && args[i] !== undefined) local[p.name] = args[i];
        else if (p.defaultExpr) local[p.name] = this.eval(p.defaultExpr, local);
        else local[p.name] = null;
      });
      try {
        this.execBlock(def.body, local);
      } catch (e) {
        if (e instanceof ReturnSignal) return e.value;
        throw e;
      }
      return null;
    }
    if (builtins[name]) return builtins[name](...args);
    throw new Error(`Función no definida: ${name}`);
  }

  eval(node, scope) {
    this.tick();
    switch (node.type) {
      case 'lit': return node.value;
      case 'var': {
        if (scope.hasOwnProperty(node.name)) return scope[node.name];
        if (this.globals.hasOwnProperty(node.name)) return this.globals[node.name];
        if (this.functions[node.name]) return { __gdfunc: node.name };
        throw new Error(`Variable no definida: ${node.name}`);
      }
      case 'array': return node.items.map(i => this.eval(i, scope));
      case 'dict': {
        const o = {};
        for (const [k, v] of node.pairs) o[this.eval(k, scope)] = this.eval(v, scope);
        return o;
      }
      case 'ternary': return truthy(this.eval(node.cond, scope)) ? this.eval(node.then, scope) : this.eval(node.otherwise, scope);
      case 'neg': return -this.eval(node.value, scope);
      case 'not': return !truthy(this.eval(node.value, scope));
      case 'and': return truthy(this.eval(node.left, scope)) ? truthy(this.eval(node.right, scope)) : false;
      case 'or': return truthy(this.eval(node.left, scope)) ? true : truthy(this.eval(node.right, scope));
      case 'cmp': {
        const l = this.eval(node.left, scope), r = this.eval(node.right, scope);
        switch (node.op) {
          case '==': return JSON.stringify(l) === JSON.stringify(r);
          case '!=': return JSON.stringify(l) !== JSON.stringify(r);
          case '<': return l < r; case '>': return l > r;
          case '<=': return l <= r; case '>=': return l >= r;
        }
      }
      case 'bin': {
        const l = this.eval(node.left, scope), r = this.eval(node.right, scope);
        switch (node.op) {
          case '+': return Array.isArray(l) ? l.concat(r) : l + r;
          case '-': return l - r;
          case '*': return l * r;
          case '/': return (Number.isInteger(l) && Number.isInteger(r)) ? Math.trunc(l / r) : l / r;
          case '%': return typeof l === 'string' ? gdFormat(l, r) : l % r;
        }
      }
      case 'index': {
        const obj = this.eval(node.target, scope);
        const idx = this.eval(node.index, scope);
        return obj[idx];
      }
      case 'member': {
        const obj = this.eval(node.target, scope);
        if (node.name === 'size') return () => (Array.isArray(obj) ? obj.length : Object.keys(obj).length);
        return obj[node.name];
      }
      case 'method': {
        const obj = this.eval(node.target, scope);
        const args = node.args.map(a => this.eval(a, scope));
        return this.callMethod(obj, node.name, args);
      }
      case 'call': {
        if (node.callee.type === 'var') {
          const args = node.args.map(a => this.eval(a, scope));
          return this.callFunction(node.callee.name, args, scope);
        }
        throw new Error('Llamada no soportada');
      }
      default:
        throw new Error(`Nodo no soportado: ${node.type}`);
    }
  }

  instantiateClass(name, args) {
    const chain = [];
    let cur = name;
    while (cur) {
      const def = this.classes[cur];
      if (!def) throw new Error(`Clase no definida: ${cur}`);
      chain.unshift(def);
      cur = def.extendsName;
    }
    const instance = { __gdclass_instance: name };
    for (const def of chain) {
      for (const f of def.fields) instance[f.name] = this.eval(f.expr, instance);
    }
    const found = this.findMethod(name, '_init');
    if (found) this.invokeMethod(instance, found.def, args);
    return instance;
  }

  findMethod(className, methodName) {
    let cur = className;
    while (cur) {
      const def = this.classes[cur];
      if (!def) return null;
      if (def.methods[methodName]) return { def: def.methods[methodName] };
      cur = def.extendsName;
    }
    return null;
  }

  invokeMethod(instance, methodDef, args) {
    const local = { self: instance };
    methodDef.params.forEach((p, i) => {
      if (i < args.length && args[i] !== undefined) local[p.name] = args[i];
      else if (p.defaultExpr) local[p.name] = this.eval(p.defaultExpr, local);
      else local[p.name] = null;
    });
    try {
      this.execBlock(methodDef.body, local);
    } catch (e) {
      if (e instanceof ReturnSignal) return e.value;
      throw e;
    }
    return null;
  }

  callCallable(fn, args) {
    if (fn && typeof fn === 'object' && fn.__gdfunc) return this.callFunction(fn.__gdfunc, args, this.globals);
    throw new Error('Se esperaba una función (Callable), ej. pasar el nombre de una función sin paréntesis');
  }

  callMethod(obj, name, args) {
    if (obj && typeof obj === 'object' && obj.__gdclass) {
      if (name === 'new') return this.instantiateClass(obj.__gdclass, args);
      throw new Error(`No se puede llamar '.${name}()' sobre una clase; ¿quisiste decir '.new()'?`);
    }
    if (obj && typeof obj === 'object' && obj.__gdclass_instance) {
      const found = this.findMethod(obj.__gdclass_instance, name);
      if (!found) throw new Error(`La clase '${obj.__gdclass_instance}' no tiene el método '.${name}()'`);
      return this.invokeMethod(obj, found.def, args);
    }
    if (obj && typeof obj === 'object' && obj.__gdsignal) {
      if (name === 'connect') { obj.listeners.push(args[0]); return null; }
      if (name === 'emit') { for (const l of obj.listeners.slice()) this.callCallable(l, args); return null; }
      throw new Error(`La señal '${obj.__gdsignal}' no tiene el método '.${name}()'`);
    }
    if (Array.isArray(obj)) {
      switch (name) {
        case 'append': obj.push(args[0]); return null;
        case 'push_back': obj.push(args[0]); return null;
        case 'pop_back': return obj.pop();
        case 'pop_front': return obj.shift();
        case 'size': return obj.length;
        case 'has': return obj.includes(args[0]);
        case 'find': return obj.indexOf(args[0]);
        case 'erase': { const i = obj.indexOf(args[0]); if (i >= 0) obj.splice(i, 1); return null; }
        case 'reverse': obj.reverse(); return null;
        case 'sort': obj.sort((a, b) => a < b ? -1 : a > b ? 1 : 0); return null;
        case 'clear': obj.length = 0; return null;
        case 'duplicate': return obj.slice();
        case 'slice': return obj.slice(args[0], args[1]);
        case 'count': return obj.filter(v => JSON.stringify(v) === JSON.stringify(args[0])).length;
        case 'insert': obj.splice(args[0], 0, args[1]); return null;
        case 'join': return obj.map(v => gdStr(v)).join(args[0] ?? '');
        case 'map': return obj.map(v => this.callCallable(args[0], [v]));
        case 'filter': return obj.filter(v => truthy(this.callCallable(args[0], [v])));
        case 'reduce': {
          if (obj.length === 0 && args.length < 2) throw new Error("reduce() en un Array vacío necesita un valor inicial");
          let acc = args.length > 1 ? args[1] : obj[0];
          const start = args.length > 1 ? 0 : 1;
          for (let i = start; i < obj.length; i++) acc = this.callCallable(args[0], [acc, obj[i]]);
          return acc;
        }
      }
    } else if (typeof obj === 'string') {
      switch (name) {
        case 'to_upper': return obj.toUpperCase();
        case 'to_lower': return obj.toLowerCase();
        case 'length': return obj.length;
        case 'strip_edges': return obj.trim();
        case 'split': return obj.split(args[0] ?? ' ');
        case 'begins_with': return obj.startsWith(args[0]);
        case 'ends_with': return obj.endsWith(args[0]);
        case 'replace': return obj.split(args[0]).join(args[1]);
        case 'count': return args[0] ? obj.split(args[0]).length - 1 : 0;
        case 'substr': return args[1] !== undefined ? obj.substr(args[0], args[1]) : obj.substr(args[0]);
        case 'find': return obj.indexOf(args[0]);
        case 'format': return gdFormat(obj, args[0]);
      }
    } else if (obj && typeof obj === 'object') {
      switch (name) {
        case 'keys': return Object.keys(obj);
        case 'values': return Object.values(obj);
        case 'has': return Object.prototype.hasOwnProperty.call(obj, args[0]);
        case 'size': return Object.keys(obj).length;
        case 'erase': { delete obj[args[0]]; return null; }
        case 'duplicate': return { ...obj };
      }
    }
    throw new Error(`Método no soportado: .${name}()`);
  }
}


