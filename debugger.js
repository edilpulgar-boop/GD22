// ---- debugger.js ----
// Construye un "trace" (lista de fotos) de la ejecución de un programa,
// paso a paso, para poder recorrerlo con Anterior/Siguiente sin volver
// a ejecutar nada. Reutiliza el mismo Interpreter, solo le agrega dos
// ganchos: onStep (antes de cada statement) y onPrint (para ir
// acumulando la consola).

function snapshotVars(scope) {
  const out = {};
  for (const key of Object.keys(scope)) {
    try { out[key] = gdStr(scope[key]); }
    catch (e) { out[key] = '?'; }
  }
  return out;
}

// Construye el trace completo de un programa.
// Devuelve { steps, error } donde:
//   steps: array de { lineNo, vars, consoleLines } (consoleLines = copia
//          de todo lo impreso ANTES de ejecutar esa línea)
//   error: mensaje de error si el programa falló en algún punto, o null
function buildTrace(code) {
  const steps = [];
  const consoleLines = [];
  let error = null;

  const interp = new Interpreter(
    (msg, isErr) => { consoleLines.push({ text: msg, isErr: !!isErr }); },
    (stmt, scope) => {
      steps.push({
        lineNo: stmt.lineNo || null,
        vars: snapshotVars(scope),
        consoleLines: consoleLines.slice(),
      });
    }
  );

  try {
    interp.run(code);
  } catch (e) {
    error = e.message;
  }

  // paso final: estado con el que terminó el programa (o el error)
  const lastLineNo = steps.length > 0 ? steps[steps.length - 1].lineNo : null;
  steps.push({
    lineNo: error ? lastLineNo : null,
    vars: snapshotVars(interp.globals),
    consoleLines: consoleLines.slice(),
    finalError: error,
  });

  return { steps, error };
}
