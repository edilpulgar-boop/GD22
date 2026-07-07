// ---- scene.js ----
// Motor mínimo de "escenas" jugables. V1: una sola escena (Character2D
// tipo plataformas). El estudiante escribe _physics_process(delta) y
// nosotros lo llamamos ~60 veces por segundo, dibujando el resultado.
//
// Deliberadamente NO hay física real (colisiones, capas, etc.) — la
// gravedad y el piso los resuelve el propio código del estudiante, igual
// que en Godot real. Nosotros solo damos player/Input y el loop.

const SCENE_TEMPLATES = {
  character2d: {
    label: 'Character2D (plataformas)',
    groundY: 332,
    starterCode: `func _physics_process(delta):
    # gravedad
    player.velocity.y += 900 * delta

    # moverse con las flechas
    if Input.is_action_pressed("ui_right"):
        player.velocity.x = 200
    elif Input.is_action_pressed("ui_left"):
        player.velocity.x = -200
    else:
        player.velocity.x = 0

    # saltar con espacio (solo si está tocando el piso)
    if Input.is_action_just_pressed("ui_select") and player.position.y >= 300:
        player.velocity.y = -420

    player.position.x += player.velocity.x * delta
    player.position.y += player.velocity.y * delta

    # piso: no dejar que caiga más abajo de y = 300
    if player.position.y > 300:
        player.position.y = 300
        player.velocity.y = 0
`,
    createInitialState: () => ({
      player: { position: { x: 100, y: 300 }, velocity: { x: 0, y: 0 } },
    }),
  },
};

const SCENE_KEY_TO_ACTION = {
  ArrowRight: 'ui_right', ArrowLeft: 'ui_left', ArrowUp: 'ui_up', ArrowDown: 'ui_down',
  ' ': 'ui_select', Spacebar: 'ui_select',
};

function createSceneInputController() {
  const heldActions = new Set();
  const justPressedActions = new Set();

  function onKeyDown(e) {
    const action = SCENE_KEY_TO_ACTION[e.key];
    if (!action) return;
    if (!heldActions.has(action)) justPressedActions.add(action);
    heldActions.add(action);
    e.preventDefault();
  }
  function onKeyUp(e) {
    const action = SCENE_KEY_TO_ACTION[e.key];
    if (!action) return;
    heldActions.delete(action);
    e.preventDefault();
  }

  window.addEventListener('keydown', onKeyDown);
  window.addEventListener('keyup', onKeyUp);

  return {
    __gd_input: true,
    heldActions,
    justPressedActions,
    clearJustPressed() { justPressedActions.clear(); },
    destroy() {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
    },
  };
}

function drawScene(ctx, canvas, templateKey, state) {
  const template = SCENE_TEMPLATES[templateKey];
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#11151e';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#1c222e';
  ctx.fillRect(0, template.groundY, canvas.width, canvas.height - template.groundY);
  ctx.strokeStyle = '#252c3a';
  ctx.beginPath();
  ctx.moveTo(0, template.groundY);
  ctx.lineTo(canvas.width, template.groundY);
  ctx.stroke();

  const p = state.player.position;
  ctx.fillStyle = '#5fd9c0';
  ctx.fillRect(p.x - 16, p.y - 32, 32, 32);
}

// Corre una escena en un canvas. Devuelve { stop() }.
function runScene(templateKey, code, canvas, callbacks) {
  const template = SCENE_TEMPLATES[templateKey];
  const ctx = canvas.getContext('2d');
  const state = template.createInitialState();
  const input = createSceneInputController();

  const interp = new Interpreter((msg, isErr) => {
    if (callbacks.onPrint) callbacks.onPrint(msg, isErr);
  });
  interp.globals.player = state.player;
  interp.globals.Input = input;

  let stopped = false;
  let rafId = null;
  let lastTime = null;

  function stop() {
    if (stopped) return;
    stopped = true;
    if (rafId) cancelAnimationFrame(rafId);
    input.destroy();
  }

  try {
    interp.run(code);
  } catch (e) {
    input.destroy();
    callbacks.onError(e.message);
    return { stop() {} };
  }

  if (!interp.functions['_physics_process']) {
    input.destroy();
    callbacks.onError('Falta la función _physics_process(delta) — la escena necesita esa función para poder correr.');
    return { stop() {} };
  }

  function frame(t) {
    if (stopped) return;
    if (lastTime === null) lastTime = t;
    // clamp: si la pestaña estuvo pausada, evita un salto gigante de una sola vez
    const delta = Math.min((t - lastTime) / 1000, 0.05);
    lastTime = t;
    try {
      interp.callFunction('_physics_process', [delta], interp.globals);
    } catch (e) {
      callbacks.onError(e.message);
      stop();
      return;
    }
    input.clearJustPressed();
    drawScene(ctx, canvas, templateKey, state);
    rafId = requestAnimationFrame(frame);
  }

  drawScene(ctx, canvas, templateKey, state);
  rafId = requestAnimationFrame(frame);

  return { stop };
}
