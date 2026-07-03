// ---- symbols modal ----
const symbolsBtnEl = document.getElementById('symbolsBtn');
const symbolsOverlayEl = document.getElementById('symbolsOverlay');
const symbolsCloseBtnEl = document.getElementById('symbolsCloseBtn');

function openSymbolsModal() { symbolsOverlayEl.classList.add('open'); }
function closeSymbolsModal() { symbolsOverlayEl.classList.remove('open'); }

symbolsBtnEl.addEventListener('click', openSymbolsModal);
symbolsCloseBtnEl.addEventListener('click', closeSymbolsModal);
symbolsOverlayEl.addEventListener('click', (e) => { if (e.target === symbolsOverlayEl) closeSymbolsModal(); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && symbolsOverlayEl.classList.contains('open')) closeSymbolsModal(); });

// ---- boot sequence ----
const BOOT_LINES = [
  'GDConsola — subconjunto de GDScript para practicar sintaxis',
  'Sin motor Godot: variables, condicionales, bucles, funciones, arrays y diccionarios',
  'Escribe tu código a la izquierda y presiona Ejecutar (o Ctrl+Enter)',
];

function bootSequence() {
  let i = 0;
  function step() {
    if (i < BOOT_LINES.length) {
      printLine(BOOT_LINES[i], 'boot');
      i++;
      setTimeout(step, 220);
    } else {
      const row = document.createElement('div');
      row.className = 'prompt-row';
      row.innerHTML = 'gd&gt; <span class="cursor"></span>';
      consoleEl.appendChild(row);
    }
  }
  step();
}

codeEl.value = EXAMPLES["FizzBuzz"];
updateGutter();
updateHighlight();
editHistory = [codeEl.value];
historyIndex = 0;
updateUndoRedoButtons();
bootSequence();
