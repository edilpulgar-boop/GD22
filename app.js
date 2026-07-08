// ---- dropdown menus (Ejercicios / Más) ----
function setupDropdown(wrapId, toggleId, panelId) {
  const wrap = document.getElementById(wrapId);
  const toggle = document.getElementById(toggleId);
  const panel = document.getElementById(panelId);

  function close() { wrap.classList.remove('open'); }
  function open() {
    closeAllDropdowns();
    wrap.classList.add('open');
  }

  toggle.addEventListener('click', (e) => {
    e.stopPropagation();
    if (wrap.classList.contains('open')) close(); else open();
  });
  panel.addEventListener('click', (e) => e.stopPropagation());

  return close;
}

const closeExercisesDropdown = setupDropdown('exercisesMenuWrap', 'exercisesToggleBtn', 'exercisesDropdown');
const closeMoreDropdown = setupDropdown('moreMenuWrap', 'moreToggleBtn', 'moreDropdown');
const closeShortcutsDropdown = setupDropdown('shortcutsMenuWrap', 'shortcutsToggleBtn', 'shortcutsDropdown');
const closeRefDropdown = setupDropdown('refMenuWrap', 'refToggleBtn', 'refDropdown');

function closeAllDropdowns() {
  closeExercisesDropdown();
  closeMoreDropdown();
  closeShortcutsDropdown();
  closeRefDropdown();
}

document.addEventListener('click', closeAllDropdowns);
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeAllDropdowns(); });

// al elegir un ejercicio nuevo o cargar un ejemplo, cerramos el menú para dejar ver el resultado
document.getElementById('exerciseBtn').addEventListener('click', closeAllDropdowns);
document.getElementById('examples').addEventListener('change', closeAllDropdowns);

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

// ---- chuleta de condicionales modal ----
const condBtnEl = document.getElementById('condBtn');
const condOverlayEl = document.getElementById('condOverlay');
const condCloseBtnEl = document.getElementById('condCloseBtn');

function openCondModal() { condOverlayEl.classList.add('open'); }
function closeCondModal() { condOverlayEl.classList.remove('open'); }

condBtnEl.addEventListener('click', openCondModal);
condCloseBtnEl.addEventListener('click', closeCondModal);
condOverlayEl.addEventListener('click', (e) => { if (e.target === condOverlayEl) closeCondModal(); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && condOverlayEl.classList.contains('open')) closeCondModal(); });

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

const savedCode = loadSavedCode();
codeEl.value = (savedCode !== null && savedCode !== '') ? savedCode : EXAMPLES["FizzBuzz"];
updateGutter();
updateHighlight();
editHistory = [codeEl.value];
historyIndex = 0;
updateUndoRedoButtons();
bootSequence();
