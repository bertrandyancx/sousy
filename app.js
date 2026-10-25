let ingredients = [];
let equipment = [];
const carbonaraTestTasks = [
  { tag:'SET UP', title:'Wash your hands', duration:'1 min', minutes:1, copy:'Turn on the tap. Wet both hands, apply soap, and scrub your palms, backs of hands, between your fingers, and under your nails for at least 20 seconds. Rinse and dry with a clean towel.', cue:'Your hands are clean and dry.' },
  { tag:'SET UP', title:'Clear your workspace', duration:'2 min', minutes:2, copy:'Move unrelated items away from the counter and wipe the work surface with a clean cloth. Leave enough room for the cutting board, the mixing bowl, and the finished pasta.', cue:'The work surface is clear, clean, and dry.' },
  { tag:'SET UP', title:'Place the cutting station', duration:'1 min', minutes:1, copy:'Put the clean cutting board flat on the counter. Place the chef’s knife beside it with the blade facing away from the counter edge. Do not hold the knife while you are setting up.', cue:'The cutting board is stable and the knife is safely placed.' },
  { tag:'SET UP', title:'Place the frying pan', duration:'1 min', minutes:1, copy:'Put the large frying pan on the front burner. Keep the burner off for now and turn the pan handle inward so it cannot be bumped.', cue:'The pan is on the stove and the burner is off.' },
  { tag:'SET UP', title:'Place the pasta equipment', duration:'1 min', minutes:1, copy:'Put the large pot on the largest burner. Put the colander in the sink where you can drain the pasta safely later. Keep the pot empty and the burner off for now.', cue:'The pot and colander are ready.' },
  { tag:'SET UP', title:'Place the small tools', duration:'1 min', minutes:1, copy:'Place the small bowl and whisk beside the cutting board. Put the measuring cup and tongs beside the stove, within easy reach but away from the burners.', cue:'The small bowl, whisk, measuring cup, and tongs are within reach.' },
  { tag:'SET UP', title:'Lay out the ingredients', duration:'2 min', minutes:2, copy:'Place the bacon first, then the egg yolks, parmesan, pepper, pasta, salt, and cream on the counter. Check each item against the ingredient list. Keep the eggs and cream refrigerated until you need them.', cue:'All seven ingredients are present and in the order we will use them.' },
  { tag:'PREP', title:'Start the pasta water', duration:'2 min', minutes:2, copy:'Fill the large pot about three-quarters full with cold water. Add one generous teaspoon of salt. Put the lid on the pot and turn the largest burner to high, 9 out of 10.', cue:'The pot is heating and the burner is on high.', timer:true, timerLabel:'Pasta water' },
  { tag:'PREP', title:'Open the bacon safely', duration:'1 min', minutes:1, copy:'Wash and dry your hands again. Open the bacon package over the cutting board. Keep the package and any raw bacon juices away from the bowl, whisk, and other ready-to-eat ingredients.', cue:'The bacon is on the cutting board and raw packaging is separate.' },
  { tag:'PREP', title:'Dice the bacon', duration:'4 min', minutes:4, copy:'Use the chef’s knife to cut the bacon into pieces about 1 centimetre wide. Keep your fingertips curled away from the blade and keep the knife tip on the board as much as possible. Take your time.', cue:'The bacon pieces are small and roughly even.' },
  { tag:'PREP', title:'Put the bacon in the cold pan', duration:'1 min', minutes:1, copy:'Use clean tongs to move the diced bacon from the cutting board into the cold frying pan. Keep the bacon in a single layer if possible. Leave the burner off until every piece is in the pan.', cue:'All of the bacon is in the cold pan.' },
  { tag:'PREP', title:'Clean the raw-bacon station', duration:'2 min', minutes:2, copy:'Put the used bacon packaging in the trash. Wash the chef’s knife and cutting board with hot, soapy water before they touch anything else. Dry them with a clean towel. Do not use this board for serving.', cue:'The knife and cutting board are clean and the raw-bacon packaging is discarded.' },
  { tag:'PREP', title:'Separate the egg yolks', duration:'3 min', minutes:3, copy:'Get the small bowl. Crack one egg into your hand over a separate cup, letting the white slip through your fingers while you keep the yolk. Place the yolk in the bowl. Repeat for all 4 eggs. Wash your hands afterward.', cue:'The bowl contains 4 yolks with no shell pieces.' },
  { tag:'PREP', title:'Add parmesan and pepper', duration:'1 min', minutes:1, copy:'Measure 3 tablespoons of finely grated parmesan into the bowl with the yolks. Add a few twists of pepper. Do not add salt yet because the bacon, pasta water, and cheese are already salty.', cue:'The parmesan and pepper are in the bowl with the yolks.' },
  { tag:'PREP', title:'Whisk the egg mixture', duration:'2 min', minutes:2, copy:'Use the whisk to mix the yolks, parmesan, and pepper until the mixture is smooth and thick. Scrape the sides of the bowl so no dry parmesan remains.', cue:'The mixture is evenly combined with no dry pockets.' },
  { tag:'PREP', title:'Set the egg mixture aside', duration:'1 min', minutes:1, copy:'Place the bowl beside the stove but away from the heat. Put the whisk inside the bowl. Do not put the bowl on a hot burner or inside the frying pan.', cue:'The egg mixture is waiting safely off the heat.' },
  { tag:'COOK', title:'Check the pasta water', duration:'1 min', minutes:1, copy:'Lift the pot lid away from your face. Look for large bubbles breaking the whole surface. If the water is not boiling yet, keep the burner on high and wait. If it is boiling, tap “I’m done.”', cue:'The water is at a full boil with large bubbles.' },
  { tag:'COOK', title:'Cook the bacon', duration:'1 min', minutes:1, copy:'Turn the frying-pan burner to medium, about 5 out of 10. Start with the pan cold so the bacon fat renders gradually. Stay beside the stove while it cooks.', cue:'The burner is set to medium and the bacon is beginning to sizzle.' },
  { tag:'COOK', title:'Stir the bacon', duration:'5 min', minutes:5, copy:'Stir the bacon with the tongs every 30 seconds. Cook for about 5 minutes, until the fat has rendered and the edges are lightly crisp. If the bacon starts smoking, lower the burner to low, about 2 out of 10.', cue:'The bacon is browned at the edges, cooked through, and not burnt.', timer:true, timerLabel:'Bacon' },
  { tag:'COOK', title:'Turn off the bacon burner', duration:'1 min', minutes:1, copy:'Turn the frying-pan burner completely off. Keep the pan on that burner for now. Do not pour out the bacon fat; it carries flavor into the sauce.', cue:'The bacon burner is off.' },
  { tag:'COOK', title:'Add the pasta', duration:'1 min', minutes:1, copy:'Use the tongs to lower the pasta into the boiling water. Do not drop it from a height because boiling water can splash and burn you. Stir immediately so the strands separate.', cue:'All of the pasta is in the pot and moving freely.' },
  { tag:'COOK', title:'Set the pasta timer', duration:'1 min', minutes:1, copy:'Read the cooking time printed on the pasta package. Set the Sousy timer for 1 minute less than that time. Keep the pot at a steady boil, not an aggressive overflow.', cue:'The pasta timer is set for the package time minus 1 minute.', timer:true, timerLabel:'Pasta' },
  { tag:'COOK', title:'Stir the pasta', duration:'1 min', minutes:1, copy:'Stir the pasta once with the tongs now, then stir it again after about 2 minutes. Keep your face and hands away from the steam.', cue:'The pasta is separated and the water is not overflowing.' },
  { tag:'COOK', title:'Reserve pasta water', duration:'1 min', minutes:1, copy:'When the pasta timer finishes, use the measuring cup to scoop 1 cup of the hot pasta water. Set the cup on a heatproof surface. The water will help loosen the sauce later.', cue:'One cup of pasta water is safely reserved.' },
  { tag:'COOK', title:'Drain the pasta', duration:'1 min', minutes:1, copy:'Turn the pasta burner off. Put the colander firmly in the sink. Pour the pot away from your body into the colander, using dry oven mitts if the pot handles are hot. Let the pasta drain, but do not rinse it.', cue:'The pasta is drained and still hot.' },
  { tag:'COOK', title:'Add cream and parmesan', duration:'1 min', minutes:1, copy:'With the bacon pan still off the heat, carefully pour in 600 millilitres of thickened cream. Add the remaining parmesan. Keep your face away from the pan in case steam rises.', cue:'The cream and parmesan are in the bacon pan.' },
  { tag:'COOK', title:'Melt the cheese gently', duration:'2 min', minutes:2, copy:'Turn the frying-pan burner to low, about 2 out of 10. Stir slowly with the tongs or a heatproof spoon until the cheese melts. Do not let the cream boil or bubble.', cue:'The sauce is warm, smooth, and steaming gently without bubbling.' },
  { tag:'COOK', title:'Move the pan off heat', duration:'1 min', minutes:1, copy:'Turn the burner completely off. Move the frying pan to a cool burner or a heatproof surface. The pan must be off direct heat before the egg mixture goes in.', cue:'The pan is off the burner and away from direct heat.' },
  { tag:'COOK', title:'Warm the egg mixture', duration:'1 min', minutes:1, copy:'Add 2 tablespoons of hot reserved pasta water to the egg mixture while whisking constantly. Add it slowly so the eggs warm gradually instead of scrambling.', cue:'The egg mixture is warm and still smooth.' },
  { tag:'COOK', title:'Combine the pasta and bacon sauce', duration:'1 min', minutes:1, copy:'Move the drained pasta into the frying pan with the bacon, cream, and cheese. Use the tongs to lift and turn the pasta so it is coated.', cue:'The pasta is in the pan and coated with the warm cream sauce.' },
  { tag:'FINISH', title:'Add the tempered eggs', duration:'1 min', minutes:1, copy:'Pour the warm egg mixture over the pasta. Start tossing immediately with the tongs. Do not turn the burner back on; the hot pasta and residual heat cook the eggs gently.', cue:'The egg mixture is distributed through the pasta.' },
  { tag:'FINISH', title:'Toss until glossy', duration:'1–2 min', minutes:2, copy:'Keep tossing continuously for 1–2 minutes. Lift pasta from the bottom and fold it over the top. The sauce should become glossy and cling to the strands.', cue:'The sauce is glossy and coating the pasta instead of pooling at the bottom.', timer:true, timerLabel:'Tossing' },
  { tag:'FINISH', title:'Adjust with pasta water', duration:'1 min', minutes:1, copy:'If the sauce looks thick or dry, add the reserved pasta water 1 tablespoon at a time and toss after each addition. Stop when the sauce looks silky. Do not add all the water automatically.', cue:'The sauce is silky enough to coat the pasta.' },
  { tag:'FINISH', title:'Taste and check', duration:'1 min', minutes:1, copy:'Use a clean fork to taste a small amount. Check that the pasta is tender, the sauce is warm, and the seasoning tastes balanced. Do not taste with the cooking tongs.', cue:'The pasta tastes ready to serve.' },
  { tag:'FINISH', title:'Serve the carbonara', duration:'2 min', minutes:2, copy:'Use clean tongs or a clean pasta fork to divide the pasta between 4 bowls. Keep the bowls away from the hot pan. Serve immediately while the sauce is glossy.', cue:'The carbonara is divided into 4 servings.' },
  { tag:'CLEAN UP', title:'Turn off every burner', duration:'1 min', minutes:1, copy:'Look at the stove and confirm every burner is off. Move the hot frying pan and pot to safe, heatproof surfaces where no one will touch them.', cue:'Every burner is off and the hot cookware is safely placed.' },
  { tag:'CLEAN UP', title:'Handle the bacon fat', duration:'2 min', minutes:2, copy:'Let the bacon fat cool until it is safe to handle. Wipe or pour the cooled fat into the trash. Never pour bacon fat down the sink because it can harden inside the drain.', cue:'The bacon fat is disposed of safely.' },
  { tag:'CLEAN UP', title:'Wash the raw-food tools', duration:'3 min', minutes:3, copy:'Wash the knife, cutting board, bowl, whisk, and any utensil that touched raw bacon or egg with hot, soapy water. Wash your hands again after cleaning those tools.', cue:'The raw-food tools and your hands are clean.' },
  { tag:'CLEAN UP', title:'Wash the cookware', duration:'4 min', minutes:4, copy:'Soak the frying pan if sauce is stuck to it. Wash the pot, colander, measuring cup, and tongs with hot, soapy water. Rinse and place everything where it can dry.', cue:'The cookware is washed, rinsed, and drying.' },
  { tag:'CLEAN UP', title:'Reset the kitchen', duration:'2 min', minutes:2, copy:'Wipe the counter, wipe any splashes from the stove, put away the ingredients, and place leftovers in a covered container in the refrigerator within 2 hours.', cue:'The kitchen is clean, the stove is off, and leftovers are stored.' }
];

// A recipe is intentionally not selected on first load. Imported recipe plans
// replace this array once the user chooses a URL, PDF, or picture.
let tasks = [];

const $ = (id) => document.getElementById(id);
let current = 0;
let voiceOn = true;
let listening = false;
let timerSeconds = 0;
let timerHandle = null;
let wakeLock = null;
let recognition = null;
let manualMode = false;
let speechStartHandle = null;
let importRequestId = 0;
let importController = null;
let supabaseClient = null;
let authUser = null;
let authScreenMode = 'signin';
let profileDraftPhoto = '';

function renderLists() {
  $('ingredient-list').innerHTML = ingredients.length ? ingredients.map((item, index) => `<li><label class="check-item"><input type="checkbox" class="station-check" data-station="ingredient-${index}" /><span>${item}</span></label></li>`).join('') : '<li class="empty-list">Import a recipe to see ingredients.</li>';
  $('equipment-list').innerHTML = equipment.length ? equipment.map((item, index) => `<li><label class="check-item"><input type="checkbox" class="station-check" data-station="equipment-${index}" /><span>${item}</span></label></li>`).join('') : '<li class="empty-list">Import a recipe to see equipment.</li>';
  $('progress-pill').textContent = `0 / ${tasks.length}`;
  $('action-count').textContent = `${tasks.length} detailed action${tasks.length === 1 ? '' : 's'}`;
  $('start-cooking').disabled = tasks.length === 0;
  renderOverview();
  document.querySelectorAll('.station-check').forEach((check) => check.addEventListener('change', () => { showToast(check.checked ? 'Marked ready.' : 'Marked not ready.'); }));
}

function renderOverview() {
  const list = $('overview-list');
  const stageCount = $('overview-stage-count');
  if (!tasks.length) {
    stageCount.textContent = '0 stages';
    list.innerHTML = '<li class="empty-plan"><b>Your plan will appear here</b><span>Import a recipe above to build a high-level plan and detailed instructions.</span></li>';
    return;
  }
  const count = Math.min(6, tasks.length);
  const chunkSize = Math.ceil(tasks.length / count);
  const stages = [];
  for (let index = 0; index < tasks.length; index += chunkSize) {
    const group = tasks.slice(index, index + chunkSize);
    stages.push(`<li><b>${escapeInstructionHtml(group[0].title)}</b><span>${group.length} detailed action${group.length === 1 ? '' : 's'} · ${escapeInstructionHtml(group[0].tag.toLowerCase())}</span></li>`);
  }
  stageCount.textContent = `${stages.length} stages`;
  list.innerHTML = stages.join('');
}

function speak(text, priority = false) {
  if (!voiceOn || !('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();
  window.clearTimeout(speechStartHandle);
  window.speechSynthesis.resume();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = priority ? 1.08 : .92;
  utterance.pitch = 1.03;
  speechStartHandle = window.setTimeout(() => window.speechSynthesis.speak(utterance), 40);
}

function showToast(message) {
  const toast = $('toast');
  toast.textContent = message;
  toast.classList.add('show');
  window.clearTimeout(showToast.timeout);
  showToast.timeout = window.setTimeout(() => toast.classList.remove('show'), 2800);
}

function renderLyrics() {
  $('lyrics-list').innerHTML = tasks.map((task, index) => `<div class="lyric-line ${index < current ? 'done' : ''} ${index === current ? 'current' : ''}" data-index="${index}">${index < current ? '✓ ' : ''}${task.title}</div>`).join('');
  const active = $('lyrics-list').querySelector('.current');
  if (active) active.scrollIntoView({ block:'center', behavior:'smooth' });
}

function escapeInstructionHtml(text) {
  return text.replace(/[&<>"']/g, (character) => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#039;' }[character]));
}

function formatInstruction(text) {
  const equipment = ['large frying pan', 'frying pan', 'large pot', 'colander', 'cutting board', 'chef’s knife', 'chef\'s knife', 'knife', 'small bowl', 'bowl', 'whisk', 'tongs', 'measuring cup', 'burner', 'stove', 'heatproof surface', 'plate'].sort((a, b) => b.length - a.length).map((item) => item.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|');
  const time = String.raw`\b\d+(?:[–-]\d+)?\s*(?:seconds?|minutes?|hours?)\b`;
  const temperature = String.raw`\b(?:\d+\s*(?:°F|°C)|\d+\s+out\s+of\s+10|medium-low|high|medium|low|off|cold|hot|full boil)\b`;
  const tokenPattern = new RegExp(`(${time}|${temperature}|\\b(?:${equipment})\\b)`, 'gi');
  let result = '';
  let cursor = 0;
  for (const match of text.matchAll(tokenPattern)) {
    result += escapeInstructionHtml(text.slice(cursor, match.index));
    const token = match[0];
    const kind = new RegExp(time, 'i').test(token) ? 'time' : new RegExp(temperature, 'i').test(token) ? 'temperature' : 'equipment';
    result += `<span class="instruction-${kind}">${escapeInstructionHtml(token)}</span>`;
    cursor = match.index + token.length;
  }
  return result + escapeInstructionHtml(text.slice(cursor));
}

function renderTask(announce = false) {
  const task = tasks[current];
  $('task-tag').textContent = task.tag;
  $('current-task-title').textContent = task.title;
  $('current-task-copy').innerHTML = formatInstruction(task.copy);
  $('completion-copy').innerHTML = formatInstruction(task.cue);
  $('task-duration').textContent = task.duration;
  $('step-count').textContent = `Step ${current + 1} of ${tasks.length}`;
  $('instruction-counter').textContent = `${current + 1} / ${tasks.length}`;
  $('progress-bar').style.width = `${((current) / tasks.length) * 100}%`;
  const remaining = tasks.slice(current).reduce((sum, item) => sum + (item.minutes || 0), 0);
  $('remaining-time').textContent = `about ${remaining} min left`;
  $('progress-pill').textContent = `${current} / ${tasks.length}`;
  stopTimer();
  $('timer-row').hidden = false;
  timerSeconds = Math.max(1, task.minutes || 1) * 60;
  $('timer-display').textContent = formatTime(timerSeconds);
  $('timer-button').textContent = 'Pause countdown';
  renderLyrics();
  startTimer();
  if (announce) speak(`${task.title}. ${task.copy} ${task.cue}`);
}

function formatTime(seconds) { return `${String(Math.floor(seconds / 60)).padStart(2,'0')}:${String(seconds % 60).padStart(2,'0')}`; }

function stopTimer() { window.clearInterval(timerHandle); timerHandle = null; }

function startTimer() {
  if (timerHandle) { stopTimer(); $('timer-button').textContent = 'Resume countdown'; showToast('Countdown paused.'); return; }
  if (timerSeconds <= 0) return;
  $('timer-button').textContent = 'Pause countdown';
  timerHandle = window.setInterval(() => {
    timerSeconds -= 1;
    $('timer-display').textContent = formatTime(Math.max(timerSeconds, 0));
    if (timerSeconds <= 0) {
      stopTimer();
      $('timer-button').textContent = 'Moving on…';
      handleOverdueStep();
    }
  }, 1000);
}

function handleOverdueStep() {
  const overdueTask = tasks[current];
  const urgent = ['COOK', 'FINISH'].includes(overdueTask.tag);
  const nextTask = tasks[current + 1];
  soundAlarm();
  const message = urgent
    ? `I marked “${overdueTask.title}” complete and moved to “${nextTask ? nextTask.title : 'finish'}” so the highest-priority action happens next.`
    : `I marked “${overdueTask.title}” complete and moved to “${nextTask ? nextTask.title : 'finish'}” while carrying the plan forward.`;
  if (current >= tasks.length - 1) {
    finishCooking();
    return;
  }
  advanceTask();
  showWarning(urgent ? 'Priority adjustment' : 'Plan adjusted', message, urgent);
}

function recalculateInstructions(reason) {
  const task = tasks[current];
  const urgent = /burn|smoke|boil over|too hot|stuck/i.test(reason);
  stopTimer();
  if (urgent) {
    tasks.splice(current + 1, 0, { tag:'URGENT', title:'Make the heat safe', duration:'1 min', minutes:1, copy:'Turn the active burner to off. Move the hot pan or pot to a heatproof surface using dry oven mitts. Do not continue until the smoke, splatter, or overheating has stopped.', cue:'The heat is off and the cookware is safely placed.' });
    advanceTask();
    showWarning('Recalculated for safety', 'I moved heat control to the front of the plan. Tell me when the cookware is safe.', true);
    return;
  }
  task.minutes = Math.max(1, task.minutes || 1) + 1;
  task.cue = 'Take the extra time you need. Say “done” only when this action is actually complete.';
  renderTask(true);
  showWarning('Plan recalculated', `I added time to “${task.title}” and will stay with you here.`, false);
}

function soundAlarm() {
  try {
    const context = new (window.AudioContext || window.webkitAudioContext)();
    [0, .25, .5].forEach((delay) => { const oscillator = context.createOscillator(); const gain = context.createGain(); oscillator.frequency.value = 660; gain.gain.value = .16; oscillator.connect(gain); gain.connect(context.destination); oscillator.start(context.currentTime + delay); oscillator.stop(context.currentTime + delay + .12); });
  } catch (error) { /* visual alert remains available */ }
  speak('Timer complete. Please check your cooking.', true);
}

function showWarning(title, copy, urgent = false) { $('warning-title').textContent = title; $('warning-copy').textContent = copy; $('live-warning').hidden = false; if (urgent) $('live-warning').classList.add('urgent'); }

function hideWarning() { $('live-warning').hidden = true; $('live-warning').classList.remove('urgent'); }

function showMicWarning() {
  manualMode = true;
  $('listen-status').classList.add('off');
  $('listening-label').textContent = 'Manual mode';
  $('mic-warning').hidden = false;
}

function beginListening() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) { showMicWarning(); return; }
  recognition = new SpeechRecognition();
  recognition.continuous = true; recognition.interimResults = false; recognition.lang = 'en-US';
  recognition.onstart = () => { manualMode = false; listening = true; $('listen-status').classList.remove('off'); $('listening-label').textContent = 'Listening'; };
  recognition.onend = () => { listening = false; if (!$('cook-mode').hidden) { window.setTimeout(() => { try { recognition.start(); } catch (error) {} }, 300); } };
  recognition.onerror = (event) => { $('listen-status').classList.add('off'); if (event.error === 'not-allowed' || event.error === 'service-not-allowed') { showMicWarning(); recognition.onend = null; try { recognition.stop(); } catch (error) {} recognition = null; } else $('listening-label').textContent = 'Manual mode'; };
  recognition.onresult = (event) => { const last = event.results[event.results.length - 1][0].transcript.toLowerCase(); handleVoiceCommand(last); };
  try { recognition.start(); } catch (error) { $('listen-status').classList.add('off'); }
}

function handleVoiceCommand(text) {
  if (text.includes('repeat')) { renderTask(true); return; }
  if (text.includes('pause')) { pauseCooking(); return; }
  if (text.includes('not progressing') || text.includes('not done') || text.includes('not ready') || text.includes('still working') || text.includes('taking longer') || text.includes('stuck')) { recalculateInstructions(text); return; }
  if (text.includes('wrong') || text.includes('problem') || text.includes('burn') || text.includes('smoke')) { recalculateInstructions(text); return; }
  if (text.includes('ready') || text.includes('done') || text.includes('next')) { advanceTask(); return; }
  showToast(`I heard: “${text}”`);
}

async function requestWakeLock() { if (!('wakeLock' in navigator)) { showToast('Wake Lock is not supported here; keep the screen active.'); return; } try { wakeLock = await navigator.wakeLock.request('screen'); $('wake-button').textContent = '◉'; showToast('Screen will stay awake while cooking.'); } catch (error) { showToast('Please keep the screen awake while cooking.'); } }

function stopListening() { if (recognition) { recognition.onend = null; recognition.stop(); recognition = null; } listening = false; }

function startCooking() { if (!tasks.length) { showToast('Import a recipe before starting.'); return; } cookingActive = true; $('dashboard').hidden = true; $('setup-panel').hidden = true; $('cook-mode').hidden = false; current = 0; renderTask(true); requestWakeLock(); beginListening(); window.scrollTo({top:0, behavior:'smooth'}); }

function advanceTask() { if (current >= tasks.length - 1) { finishCooking(); return; } stopTimer(); hideWarning(); current += 1; renderTask(true); }

function finishCooking() { $('progress-bar').style.width = '100%'; $('current-task-title').textContent = 'Dinner is ready'; $('current-task-copy').textContent = 'You made it through the plan. Sit down, take a breath, and enjoy your meal.'; $('completion-copy').textContent = 'You made it through the full cooking and cleanup plan.'; $('done-button').textContent = 'Finished ✓'; speak('Dinner is ready. You made it through the plan.'); showToast('Beautiful work — dinner is ready.'); stopListening(); if (wakeLock) wakeLock.release(); }

function pauseCooking() { if (window.speechSynthesis) window.speechSynthesis.pause(); showToast('Cooking paused. Say “ready” when you want to continue.'); }

function setup() { renderLists(); $('open-setup').addEventListener('click', () => { $('setup-panel').hidden = false; $('setup-panel').scrollIntoView({behavior:'smooth'}); }); $('close-setup').addEventListener('click', () => $('setup-panel').hidden = true); $('analyze-plan').addEventListener('click', () => { $('analyze-plan').textContent = 'Plan updated ✓'; showToast('Your preferences are ready for the cooking plan.'); window.setTimeout(() => { $('analyze-plan').innerHTML = 'Update my plan <span>→</span>'; }, 2200); }); $('start-cooking').addEventListener('click', startCooking); $('back-to-prep').addEventListener('click', () => { $('cook-mode').hidden = true; $('dashboard').hidden = false; stopListening(); stopTimer(); if (wakeLock) wakeLock.release(); }); $('done-button').addEventListener('click', advanceTask); $('repeat-button').addEventListener('click', () => renderTask(true)); $('pause-button').addEventListener('click', pauseCooking); $('speak-button').addEventListener('click', () => renderTask(true)); $('timer-button').addEventListener('click', startTimer); $('dismiss-warning').addEventListener('click', hideWarning); $('issue-button').addEventListener('click', () => { showWarning('Tell me what changed', 'The plan is paused. You can say “the sauce is too thick,” “I’m missing an ingredient,” or tap Resume when ready.'); pauseCooking(); }); $('wake-button').addEventListener('click', requestWakeLock); $('sound-toggle').addEventListener('click', () => { voiceOn = !voiceOn; $('sound-toggle').textContent = voiceOn ? '⌁' : '⌁̸'; showToast(voiceOn ? 'Voice instructions on.' : 'Voice instructions muted.'); }); }

setup();

// Navigation and secondary surfaces keep the cooking flow available without
// making the bottom navigation decorative.
const savedInspirations = new Map();
let newRecipes = JSON.parse(localStorage.getItem('sousy-new-recipes') || '[]');
let activeView = 'home';
let cookingActive = false;
let activeSourceType = 'url';

function showView(view) {
  activeView = view;
  document.querySelectorAll('.nav-item').forEach((item) => item.classList.toggle('active', item.dataset.view === view));
  document.querySelectorAll('.content-view').forEach((item) => { item.hidden = item.id !== `${view}-view`; });
  document.querySelectorAll('.home-only').forEach((item) => { if (view !== 'home' || (cookingActive && item.id !== 'setup-panel')) item.hidden = true; else if (item.id !== 'setup-panel') item.hidden = false; });
  if (view === 'home') {
    $('cook-mode').hidden = !cookingActive;
    if (!cookingActive) $('dashboard').hidden = false;
  } else {
    $('cook-mode').hidden = true;
    if (recognition) stopListening();
  }
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function saveInspiration(id, title, source, icon) {
  if (savedInspirations.has(id)) {
    savedInspirations.delete(id);
    showToast('Removed from saved inspirations.');
  } else {
    savedInspirations.set(id, { title, source, icon });
    showToast('Saved to your inspiration library.');
  }
  renderSavedInspirations();
}

function renderSavedInspirations() {
  const list = $('saved-inspiration-list');
  $('saved-count').textContent = `${savedInspirations.size} saved`;
  $('empty-saved').hidden = savedInspirations.size > 0;
  list.innerHTML = [...savedInspirations.values()].map((item) => `<article class="saved-inspiration"><div class="mini-saved">${item.icon}</div><div><h3>${item.title}</h3><p>Source: ${item.source}</p></div></article>`).join('');
}

function renderNewRecipes() {
  $('empty-new-recipes').hidden = newRecipes.length > 0;
  $('new-recipe-list').innerHTML = newRecipes.map((recipe) => `<article class="new-recipe-saved"><div class="recipe-mini-icon">🍽</div><div><h3>${escapeInstructionHtml(recipe.title)}</h3><p>Source: ${escapeInstructionHtml(recipe.source)}${recipe.servings ? ` · ${recipe.servings} servings` : ''}</p></div></article>`).join('');
}

function saveNewRecipe(recipe, sourceUrl) {
  const saved = { id: sourceUrl || `${recipe.title}-${Date.now()}`, title: recipe.title, source: recipe.source || 'Imported recipe', servings: recipe.servings || null, ingredients: [...ingredients], sourceUrl: sourceUrl || '' };
  newRecipes = [saved, ...newRecipes.filter((item) => item.id !== saved.id)];
  localStorage.setItem('sousy-new-recipes', JSON.stringify(newRecipes));
  renderNewRecipes();
  renderShopping();
}

function ingredientKey(item) {
  return item.toLowerCase().replace(/^\s*[\d./-]+\s*(?:g|kg|ml|l|tbsp|tsp|cups?|ounces?|oz|pounds?|lb)?\s*/i, '').replace(/,.*$/, '').trim();
}

function renderShopping() {
  const query = ($('shopping-filter')?.value || '').trim().toLowerCase();
  const matchingRecipes = newRecipes.filter((recipe) => !query || recipe.title.toLowerCase().includes(query) || recipe.source.toLowerCase().includes(query) || recipe.ingredients.some((item) => item.toLowerCase().includes(query)));
  const combined = new Map();
  matchingRecipes.forEach((recipe) => recipe.ingredients.forEach((item) => { const key = ingredientKey(item); if (!combined.has(key)) combined.set(key, { item, recipes: [] }); if (!combined.get(key).recipes.includes(recipe.title)) combined.get(key).recipes.push(recipe.title); }));
  $('shopping-count').textContent = `${combined.size} item${combined.size === 1 ? '' : 's'}`;
  $('shopping-combined').innerHTML = combined.size ? `<div class="shopping-section"><h3>Everything you need</h3>${[...combined.values()].map((entry, index) => `<label class="shopping-item"><input type="checkbox" data-shopping-check="combined-${index}" /><span>${escapeInstructionHtml(entry.item)}</span><small>${entry.recipes.length > 1 ? `${entry.recipes.length} recipes` : ''}</small></label>`).join('')}</div>` : '<div class="shopping-empty">Import a recipe to start your shopping list.</div>';
  $('shopping-by-recipe').innerHTML = matchingRecipes.length ? matchingRecipes.map((recipe) => `<div class="shopping-section"><h3>${escapeInstructionHtml(recipe.title)}</h3>${recipe.ingredients.map((item, index) => `<label class="shopping-item"><input type="checkbox" data-shopping-check="${recipe.id}-${index}" /><span>${escapeInstructionHtml(item)}</span></label>`).join('')}</div>`).join('') : '<div class="shopping-empty">No recipes or ingredients match that filter.</div>';
}

function initializeSourceTabs() {
  document.querySelectorAll('.source-tab').forEach((tab) => tab.addEventListener('click', () => {
    activeSourceType = tab.dataset.sourceType;
    document.querySelectorAll('.source-tab').forEach((item) => item.classList.remove('active'));
    tab.classList.add('active');
    document.querySelectorAll('.source-panel').forEach((panel) => { panel.hidden = panel.id !== `source-${tab.dataset.sourceType}-panel`; });
    showToast(`${tab.textContent} recipe source selected.`);
  }));
  $('recipe-source').addEventListener('input', () => parseServingSource($('recipe-source').value, 'URL or pasted recipe'));
  $('recipe-source').addEventListener('paste', () => window.setTimeout(() => parseServingSource($('recipe-source').value, 'pasted recipe'), 0));
  $('recipe-pdf').addEventListener('change', async (event) => {
    const file = event.target.files[0];
    $('pdf-name').textContent = file ? `${file.name} ready to analyze.` : 'Choose a PDF to extract the recipe from.';
    if (!file) return;
    $('serving-status').textContent = 'Reading serving size from the original PDF…';
    const text = await file.text();
    parseServingSource(`${file.name}\n${text}`, 'PDF');
    if (!parseServingSize(text)) requestParsedServing('pdf', text, 'PDF');
  });
  $('recipe-photo').addEventListener('change', (event) => {
    const file = event.target.files[0];
    $('photo-name').textContent = file ? `${file.name} ready to analyze.` : 'Take a photo or choose an image of the recipe.';
    if (!file) return;
    $('serving-status').textContent = 'Reading serving size from the original picture…';
    const nameMatch = parseServingSize(file.name);
    if (nameMatch) applyParsedServingSize(nameMatch, 'Picture filename');
    else {
      $('serving-status').textContent = 'Reading serving size from the original picture…';
      const reader = new FileReader();
      reader.onload = () => requestParsedServing('photo', reader.result, 'recipe picture');
      reader.readAsDataURL(file);
    }
  });
  parseServingSource($('recipe-source').value, 'Original recipe');
}

function parseServingSize(source) {
  const match = String(source).match(/(?:serves?|servings?|yield|makes|recipeYield)\s*[:=]?\s*(?:about\s*)?(\d+)/i);
  return match ? Number(match[1]) : null;
}

function applyParsedServingSize(value, origin) {
  if (!value || value < 1 || value > 100) return;
  $('servings').value = value;
  $('serving-status').textContent = `Serving size parsed from ${origin} · editable if needed.`;
}

function parseServingSource(source, origin) {
  if (!String(source || '').trim()) {
    $('serving-status').textContent = 'Serving size will be parsed after you import a recipe.';
    return;
  }
  const knownCarbonara = /bestrecipes\.com\.au\/recipes\/simple-pasta-carbonara/i.test(source);
  const value = parseServingSize(source) || (knownCarbonara ? 4 : null);
  if (value) applyParsedServingSize(value, origin);
  else $('serving-status').textContent = 'No serving count found yet. Add the serving number from the original recipe.';
}

async function requestParsedServing(sourceType, sourceValue, origin) {
  try {
    const response = await fetch('/api/parse-source', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({ source_type:sourceType, source_value:sourceValue }) });
    if (!response.ok) throw new Error('Parser unavailable');
    const result = await response.json();
    if (result.servings) applyParsedServingSize(result.servings, result.source || origin);
    else $('serving-status').textContent = `No serving count found in the ${origin}. Add it manually if the recipe does not state one.`;
  } catch (error) {
    $('serving-status').textContent = `Source loaded. Add the serving count manually if it is not detected.`;
  }
}

function initializeSecondaryViews() {
  document.querySelectorAll('.nav-item').forEach((item) => item.addEventListener('click', () => showView(item.dataset.view)));
  document.querySelectorAll('[data-saved-tab]').forEach((tab) => tab.addEventListener('click', () => {
    document.querySelectorAll('[data-saved-tab]').forEach((item) => item.classList.toggle('active', item === tab));
    $('saved-inspirations').hidden = tab.dataset.savedTab !== 'inspirations';
    $('saved-new-recipes').hidden = tab.dataset.savedTab !== 'new-recipes';
    $('saved-past').hidden = tab.dataset.savedTab !== 'past';
  }));
  document.querySelectorAll('[data-shopping-mode]').forEach((tab) => tab.addEventListener('click', () => {
    document.querySelectorAll('[data-shopping-mode]').forEach((item) => item.classList.toggle('active', item === tab));
    $('shopping-combined').hidden = tab.dataset.shoppingMode !== 'combined';
    $('shopping-by-recipe').hidden = tab.dataset.shoppingMode !== 'by-recipe';
  }));
  $('shopping-filter').addEventListener('input', renderShopping);
  document.querySelectorAll('[data-save]').forEach((button) => button.addEventListener('click', () => {
    const data = { carbonara:['Simple pasta carbonara','Australia’s Best Recipes','🍝'], crumble:['Strawberry oat crumble','Mara’s family notebook','🍓'], greens:['Weeknight greens pasta','adapted from Bon Appétit','🥬'], focaccia:['Rosemary focaccia','Mara’s family notebook','🥖'], 'tomato-soup':['Cozy tomato soup','Noah’s weeknight rotation','🍲'] }[button.dataset.save];
    saveInspiration(button.dataset.save, ...data);
    button.textContent = savedInspirations.has(button.dataset.save) ? '♥ Saved' : '♡ Save inspiration';
  }));
  $('open-post').addEventListener('click', () => { $('post-panel').hidden = false; $('post-panel').scrollIntoView({behavior:'smooth'}); });
  $('close-post').addEventListener('click', () => { $('post-panel').hidden = true; });
  $('publish-post').addEventListener('click', () => {
    const title = $('post-title').value.trim();
    const source = $('post-source').value.trim() || 'Shared with the Sousy community';
    if (!title) { showToast('Add a recipe title first.'); $('post-title').focus(); return; }
    const card = document.createElement('article');
    card.className = 'inspiration-card';
    card.innerHTML = `<div class="mini-art green-art">✦</div><div><span class="community-tag">YOUR POST</span><h3>${title}</h3><p class="source">Source: ${source}</p><p>${$('post-story').value.trim() || 'A recipe worth passing along.'}</p><button class="text-action" data-save="posted-${Date.now()}">♡ Save inspiration</button></div>`;
    $('inspiration-grid').prepend(card);
    card.querySelector('[data-save]').addEventListener('click', () => { saveInspiration(card.querySelector('[data-save]').dataset.save, title, source, '✦'); card.querySelector('[data-save]').textContent = '♥ Saved'; });
    $('post-title').value = ''; $('post-source').value = ''; $('post-story').value = ''; $('post-panel').hidden = true; showToast('Your inspiration is now on the community page.');
  });
  $('cook-again').addEventListener('click', () => { cookingActive = false; showView('home'); $('start-cooking').click(); });
  $('dark-mode-toggle').checked = localStorage.getItem('sousy-dark-mode') === 'true';
  document.documentElement.classList.toggle('dark-mode', $('dark-mode-toggle').checked);
  $('dark-mode-toggle').addEventListener('change', (event) => { document.documentElement.classList.toggle('dark-mode', event.target.checked); localStorage.setItem('sousy-dark-mode', event.target.checked); showToast(event.target.checked ? 'Dark mode on.' : 'Light mode on.'); });
  $('voice-setting').addEventListener('change', (event) => { voiceOn = event.target.checked; if (!voiceOn) window.speechSynthesis?.cancel(); showToast(voiceOn ? 'Voice instructions on.' : 'Voice instructions muted.'); });
  renderNewRecipes();
  renderShopping();
}

initializeSourceTabs();
initializeSecondaryViews();
$('back-to-prep').addEventListener('click', () => { cookingActive = false; });
$('recipe-source').addEventListener('change', () => importRecipeFromUrl($('recipe-source').value));
$('recipe-source').addEventListener('paste', () => window.setTimeout(() => importRecipeFromUrl($('recipe-source').value), 350));
$('analyze-plan').addEventListener('click', updatePlanFromSource);

function setProfile(name, handle) {
  $('profile-name').textContent = name;
  $('profile-handle').textContent = handle;
  $('profile-avatar').textContent = name.trim().charAt(0).toUpperCase();
  $('menu-profile-name').textContent = name;
  $('menu-profile-handle').textContent = handle.startsWith('@') ? handle : handle;
  $('menu-avatar').textContent = name.trim().charAt(0).toUpperCase();
  $('profile-button').textContent = name.trim().charAt(0).toUpperCase();
  localStorage.setItem('sousy-profile', JSON.stringify({ name, handle }));
}

function populateProfileForm(profile = {}, user = authUser) {
  if (!$('profile-display-name')) return;
  const metadata = user?.user_metadata || {};
  $('profile-display-name').value = profile.display_name || metadata.display_name || metadata.full_name || user?.email?.split('@')[0] || '';
  $('profile-username').value = profile.username || metadata.username || '';
  $('profile-bio').value = profile.bio || '';
  $('profile-location').value = profile.location || '';
  $('profile-cooking-style').value = profile.cooking_style || '';
  $('profile-email').value = user?.email || '';
  profileDraftPhoto = profile.avatar_url || '';
  const avatar = $('profile-edit-avatar');
  if (avatar) avatar.innerHTML = profileDraftPhoto ? `<img src="${profileDraftPhoto}" alt="Your profile photo" />` : escapeInstructionHtml(($('profile-display-name').value || 'B').charAt(0).toUpperCase());
}

async function saveProfileChanges() {
  if (!hasRealAccount()) { showToast('Sign in to edit your profile.'); return; }
  const displayName = $('profile-display-name').value.trim();
  const username = $('profile-username').value.trim();
  if (!displayName || !/^[A-Za-z0-9_]{3,30}$/.test(username)) { showToast('Add a display name and a valid username.'); return; }
  const button = $('save-profile');
  const status = $('profile-save-status');
  button.disabled = true;
  button.textContent = 'Saving…';
  try {
    const { data, error } = await supabaseClient.from('profiles').update({
      display_name: displayName,
      username,
      bio: $('profile-bio').value.trim(),
      location: $('profile-location').value.trim(),
      cooking_style: $('profile-cooking-style').value,
      avatar_url: profileDraftPhoto || null,
    }).eq('id', authUser.id).select('username,display_name,avatar_url,bio,location,cooking_style').single();
    if (error) throw error;
    setProfile(data.display_name, `@${data.username}`);
    if (data.avatar_url) applyProfilePhoto(data.avatar_url);
    status.textContent = 'Profile saved.';
    showToast('Your profile is up to date.');
  } catch (error) {
    status.textContent = error.message || 'Profile could not be saved.';
    showToast('Profile could not be saved.');
  } finally {
    button.disabled = false;
    button.innerHTML = 'Save profile <span>→</span>';
  }
}

function initializeProfileEditor() {
  $('profile-page-photo').addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) { showToast('Choose a photo under 2 MB.'); return; }
    const reader = new FileReader();
    reader.onload = () => {
      profileDraftPhoto = reader.result;
      $('profile-edit-avatar').innerHTML = `<img src="${profileDraftPhoto}" alt="Your profile photo" />`;
    };
    reader.readAsDataURL(file);
  });
  $('save-profile').addEventListener('click', saveProfileChanges);
}

function setAuthScreenMode(mode) {
  authScreenMode = mode;
  const signup = mode === 'signup';
  document.querySelectorAll('[data-auth-mode]').forEach((tab) => tab.classList.toggle('active', tab.dataset.authMode === mode));
  $('auth-username-field').hidden = !signup;
  $('auth-screen-eyebrow').textContent = signup ? 'JOIN THE COOKING CIRCLE' : 'WELCOME BACK';
  $('auth-screen-title').innerHTML = signup ? 'Make room for<br /><em>more good food.</em>' : 'Good cooking,<br /><em>no thinking.</em>';
  $('auth-screen-copy').textContent = signup ? 'Create your Sousy account to find friends, save recipes, and keep your cooking progress close.' : 'Sign in to return to your cooking circle, saved recipes, and guided plans.';
  $('auth-submit').innerHTML = signup ? 'Create my Sousy account <span>→</span>' : 'Sign in to Sousy <span>→</span>';
  $('auth-password').autocomplete = signup ? 'new-password' : 'current-password';
}

function showAuthScreen() {
  setAuthScreenMode('signin');
  $('auth-screen').hidden = false;
  window.scrollTo({ top: 0, behavior: 'smooth' });
  window.setTimeout(() => $('auth-email').focus(), 50);
}

function hideAuthScreen() { $('auth-screen').hidden = true; }

async function submitAuthScreen() {
  if (!supabaseClient) { showToast('Supabase accounts are not configured yet.'); return; }
  const signup = authScreenMode === 'signup';
  const button = $('auth-submit');
  const email = $('auth-email').value.trim();
  const password = $('auth-password').value;
  const username = $('auth-username').value.trim();
  if (!email || !email.includes('@') || !password || (signup && !username)) { showToast(signup ? 'Add an email, username, and password.' : 'Add your email and password.'); return; }
  if (signup && !/^[A-Za-z0-9_]{3,30}$/.test(username)) { showToast('Username must be 3–30 letters, numbers, or underscores.'); return; }
  button.disabled = true;
  button.textContent = signup ? 'Creating account…' : 'Signing in…';
  try {
    const result = signup
      ? await supabaseClient.auth.signUp({ email, password, options: { data: { username, display_name: username } } })
      : await supabaseClient.auth.signInWithPassword({ email, password });
    if (result.error) { showToast(result.error.message); return; }
    if (signup && !result.data.session) showToast('Check your email to confirm your account.');
    else { hideAuthScreen(); showToast(signup ? 'Your Sousy account is ready.' : 'Welcome back to Sousy.'); }
  } catch (error) {
    showToast(`Account request failed: ${error.message || 'Please try again.'}`);
  } finally {
    button.disabled = false;
    setAuthScreenMode(authScreenMode);
  }
}

function initializeAuthScreen() {
  document.querySelectorAll('[data-auth-mode]').forEach((tab) => tab.addEventListener('click', () => setAuthScreenMode(tab.dataset.authMode)));
  $('auth-submit').addEventListener('click', submitAuthScreen);
  $('auth-password').addEventListener('keydown', (event) => { if (event.key === 'Enter') submitAuthScreen(); });
  $('auth-google').addEventListener('click', async () => {
    if (!supabaseClient) { showToast('Supabase accounts are not configured yet.'); return; }
    const { error } = await supabaseClient.auth.signInWithOAuth({ provider: 'google', options: { redirectTo: window.location.origin } });
    if (error) showToast(error.message);
  });
  $('auth-continue').addEventListener('click', hideAuthScreen);
  setAuthScreenMode('signin');
}

function hasRealAccount() { return Boolean(supabaseClient && authUser); }

async function loadAuthenticatedProfile(user) {
  authUser = user;
  const { data } = await supabaseClient.from('profiles').select('username,display_name,avatar_url,bio,location,cooking_style').eq('id', user.id).maybeSingle();
  const metadata = user.user_metadata || {};
  const displayName = data?.display_name || metadata.display_name || metadata.full_name || user.email?.split('@')[0] || 'Sousy cook';
  const username = data?.username || metadata.username || `cook_${user.id.slice(0, 8)}`;
  setProfile(displayName, `@${username.replace(/^@/, '')}`);
  if (data?.avatar_url) applyProfilePhoto(data.avatar_url);
  populateProfileForm(data || {}, user);
  hideAuthScreen();
  await loadFriendRequests();
}

function renderRealFriendRows(profiles) {
  const list = $('friend-list');
  if (!profiles.length) {
    list.innerHTML = '<p class="feed-note">No cooks found. Try another username.</p>';
    return;
  }
  list.innerHTML = profiles.map((profile) => {
    const name = profile.display_name || profile.username;
    const initial = escapeInstructionHtml(name.charAt(0).toUpperCase());
    return `<article class="friend-row"><div class="friend-avatar">${initial}</div><div class="friend-info"><strong>${escapeInstructionHtml(name)}</strong><p>@${escapeInstructionHtml(profile.username)}</p></div><button class="follow-button" data-real-friend-id="${profile.id}">Add friend</button></article>`;
  }).join('');
  list.querySelectorAll('[data-real-friend-id]').forEach((button) => button.addEventListener('click', () => sendFriendRequest(button.dataset.realFriendId, button)));
}

async function searchRealFriends(query) {
  const safeQuery = query.replace(/[%_]/g, '');
  let request = supabaseClient.from('profiles').select('id,username,display_name,avatar_url').neq('id', authUser.id).order('username').limit(20);
  if (safeQuery) request = request.or(`username.ilike.%${safeQuery}%,display_name.ilike.%${safeQuery}%`);
  const { data, error } = await request;
  if (error) { showToast('I could not search cooks right now.'); return; }
  renderRealFriendRows(data || []);
  showToast(data?.length ? `${data.length} cook${data.length === 1 ? '' : 's'} found.` : 'No cooks found yet.');
}

async function sendFriendRequest(receiverId, button) {
  button.disabled = true;
  const { error } = await supabaseClient.from('friend_requests').insert({ sender_id: authUser.id, receiver_id: receiverId });
  if (error) {
    button.disabled = false;
    showToast(error.code === '23505' ? 'A request already exists.' : 'I could not send that request.');
    return;
  }
  button.textContent = 'Requested';
  showToast('Friend request sent.');
}

async function loadFriendRequests() {
  const container = $('friend-requests-list');
  if (!container || !hasRealAccount()) return;
  const { data: requests } = await supabaseClient.from('friend_requests').select('id,sender_id,status').eq('receiver_id', authUser.id).eq('status', 'pending').order('created_at', { ascending: false });
  const senderIds = (requests || []).map((request) => request.sender_id);
  let profiles = [];
  if (senderIds.length) {
    const result = await supabaseClient.from('profiles').select('id,username,display_name').in('id', senderIds);
    profiles = result.data || [];
  }
  const profileMap = new Map(profiles.map((profile) => [profile.id, profile]));
  container.innerHTML = requests?.length ? requests.map((request) => {
    const profile = profileMap.get(request.sender_id) || { username: 'cook', display_name: 'Sousy cook' };
    return `<div class="request-row"><div class="friend-avatar">${escapeInstructionHtml(profile.display_name.charAt(0).toUpperCase())}</div><div class="friend-info"><strong>${escapeInstructionHtml(profile.display_name)}</strong><p>@${escapeInstructionHtml(profile.username)} wants to follow you</p></div><button class="accept-button" data-accept-request="${request.id}">Accept</button></div>`;
  }).join('') : '<p class="feed-note">No pending friend requests.</p>';
  container.querySelectorAll('[data-accept-request]').forEach((button) => button.addEventListener('click', () => acceptFriendRequest(button.dataset.acceptRequest, button)));
}

async function acceptFriendRequest(requestId, button) {
  const { error } = await supabaseClient.from('friend_requests').update({ status: 'accepted' }).eq('id', requestId).eq('receiver_id', authUser.id);
  if (error) { showToast('I could not accept that request.'); return; }
  button.textContent = 'Accepted';
  button.disabled = true;
  showToast('Friend request accepted.');
}

async function initializeSupabase() {
  if (!window.supabase?.createClient) return;
  try {
    const response = await fetch('/api/config');
    const config = await response.json();
    if (!config.supabase_url || !config.supabase_anon_key) return;
    supabaseClient = window.supabase.createClient(config.supabase_url, config.supabase_anon_key);
    const { data } = await supabaseClient.auth.getSession();
    if (data.session?.user) await loadAuthenticatedProfile(data.session.user);
    supabaseClient.auth.onAuthStateChange((_event, session) => {
      window.setTimeout(() => session?.user ? loadAuthenticatedProfile(session.user) : (authUser = null), 0);
    });
  } catch (error) {
    console.warn('Supabase is not configured yet.');
  }
}

function initializeSocialInteractions() {
  document.querySelectorAll('[data-recipe-tab]').forEach((tab) => tab.addEventListener('click', () => {
    document.querySelectorAll('[data-recipe-tab]').forEach((item) => item.classList.toggle('active', item === tab));
    $('for-you-recipes').hidden = tab.dataset.recipeTab !== 'for-you';
    $('friends-recipes').hidden = tab.dataset.recipeTab !== 'friends';
  }));

  document.querySelectorAll('[data-follow]').forEach((button) => button.addEventListener('click', () => {
    const isFollowing = button.classList.toggle('following');
    button.textContent = isFollowing ? 'Following' : 'Follow';
    const count = Number(($('friend-count').textContent.match(/\d+/) || ['0'])[0]) + (isFollowing ? 1 : -1);
    $('friend-count').textContent = `${count} following`;
    showToast(isFollowing ? 'Added to your cooking circle.' : 'Removed from your cooking circle.');
  }));
  document.querySelectorAll('[data-accept]').forEach((button) => button.addEventListener('click', () => { button.classList.add('accepted'); button.textContent = 'Accepted'; showToast('Friend request accepted.'); }));
  $('find-friend-button').addEventListener('click', async () => {
    const query = $('friend-search-input').value.trim().toLowerCase();
    if (hasRealAccount()) { await searchRealFriends(query); return; }
    const rows = [...document.querySelectorAll('#friend-list .friend-row')];
    let matches = 0;
    rows.forEach((row) => { const visible = !query || row.textContent.toLowerCase().includes(query); row.hidden = !visible; if (visible) matches += 1; });
    showToast(matches ? `${matches} cook${matches === 1 ? '' : 's'} found.` : 'No cooks found yet. Try another username.');
  });
  $('friend-search-input').addEventListener('keydown', (event) => { if (event.key === 'Enter') $('find-friend-button').click(); });

  const storedProfile = JSON.parse(localStorage.getItem('sousy-profile') || 'null');
  if (storedProfile) setProfile(storedProfile.name, storedProfile.handle);
  $('open-account').addEventListener('click', () => { $('account-panel').hidden = !$('account-panel').hidden; });
  document.querySelectorAll('[data-account-tab]').forEach((tab) => tab.addEventListener('click', () => {
    document.querySelectorAll('[data-account-tab]').forEach((item) => item.classList.toggle('active', item === tab));
    const signup = tab.dataset.accountTab === 'signup';
    $('account-username').parentElement.hidden = !signup;
    $('account-submit').innerHTML = signup ? 'Create my Sousy account <span>→</span>' : 'Sign in to Sousy <span>→</span>';
  }));
  $('google-signin').addEventListener('click', async () => {
    if (!supabaseClient) { showToast('Supabase accounts are not configured yet.'); return; }
    const { error } = await supabaseClient.auth.signInWithOAuth({ provider: 'google', options: { redirectTo: window.location.origin } });
    if (error) showToast(error.message);
  });
  $('account-submit').addEventListener('click', async () => {
    const signup = document.querySelector('[data-account-tab].active').dataset.accountTab === 'signup';
    const email = $('account-email').value.trim();
    const username = $('account-username').value.trim();
    const password = $('account-password').value;
    if (!supabaseClient) { showToast('Supabase accounts are not configured yet.'); return; }
    if (!email || !email.includes('@') || !password || (signup && !username)) { showToast(signup ? 'Add an email, username, and password.' : 'Add your email and password.'); return; }
    if (signup && !/^[A-Za-z0-9_]{3,30}$/.test(username)) { showToast('Username must be 3–30 letters, numbers, or underscores.'); return; }
    const button = $('account-submit');
    button.disabled = true;
    button.textContent = signup ? 'Creating account…' : 'Signing in…';
    try {
      const result = signup
        ? await supabaseClient.auth.signUp({ email, password, options: { data: { username, display_name: username } } })
        : await supabaseClient.auth.signInWithPassword({ email, password });
      if (result.error) { showToast(result.error.message); return; }
      $('account-panel').hidden = true;
      showToast(signup && !result.data.session ? 'Check your email to confirm your account.' : (signup ? 'Your Sousy account is ready.' : 'Welcome back to Sousy.'));
    } catch (error) {
      showToast(`Account request failed: ${error.message || 'Please try again.'}`);
    } finally {
      button.disabled = false;
      button.innerHTML = signup ? 'Create my Sousy account <span>→</span>' : 'Sign in to Sousy <span>→</span>';
    }
  });
}

initializeSocialInteractions();

function initializeProfileMenu() {
  const menu = $('profile-menu');
  $('profile-button').addEventListener('click', (event) => {
    event.stopPropagation();
    menu.hidden = !menu.hidden;
    $('profile-button').setAttribute('aria-expanded', String(!menu.hidden));
  });
  menu.addEventListener('click', (event) => event.stopPropagation());
  document.addEventListener('click', () => { menu.hidden = true; $('profile-button').setAttribute('aria-expanded', 'false'); });
  document.querySelectorAll('[data-profile-action]').forEach((button) => button.addEventListener('click', async () => {
    const action = button.dataset.profileAction;
    menu.hidden = true;
    $('profile-button').setAttribute('aria-expanded', 'false');
    if (action === 'settings' || action === 'saved' || action === 'friends') showView(action);
    else if (action === 'profile') { showView('profile'); populateProfileForm({}, authUser); }
    else if (action === 'help') showToast('Tell us what would make cooking easier.');
    else if (action === 'signout') {
      if (supabaseClient) {
        const { error } = await supabaseClient.auth.signOut();
        if (error) { showToast('Sign out failed. Please try again.'); return; }
      }
      authUser = null;
      localStorage.removeItem('sousy-profile');
      localStorage.removeItem('sousy-profile-photo');
      setProfile('Bertrand', '@homecook');
      $('profile-menu').hidden = true;
      $('profile-button').setAttribute('aria-expanded', 'false');
      showAuthScreen();
      showToast('Signed out.');
    }
  }));
  $('profile-photo').addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => { localStorage.setItem('sousy-profile-photo', reader.result); applyProfilePhoto(reader.result); showToast('Profile photo updated.'); };
    reader.readAsDataURL(file);
  });
  const savedPhoto = localStorage.getItem('sousy-profile-photo');
  if (savedPhoto) applyProfilePhoto(savedPhoto);
}

function applyProfilePhoto(source) {
  $('menu-avatar').innerHTML = `<img src="${source}" alt="Your profile photo" />`;
  $('profile-button').innerHTML = `<img src="${source}" alt="Open your profile" />`;
  if ($('profile-edit-avatar')) $('profile-edit-avatar').innerHTML = `<img src="${source}" alt="Your profile photo" />`;
}

initializeProfileMenu();
initializeProfileEditor();
$('close-mic-warning').addEventListener('click', () => { $('mic-warning').hidden = true; showToast('Manual mode on — tap “I’m done” after every action.'); });
initializeAuthScreen();
showAuthScreen();
initializeSupabase();

async function updatePlanFromSource() {
  if (activeSourceType === 'pdf') {
    const file = $('recipe-pdf').files[0];
    if (!file) { showToast('Choose a PDF first.'); return; }
    await importTextRecipe(await file.text(), file.name, 'Uploaded PDF');
    return;
  }
  if (activeSourceType === 'photo') {
    const file = $('recipe-photo').files[0];
    if (!file) { showToast('Choose a recipe picture first.'); return; }
    const reader = new FileReader();
    reader.onload = () => importImageRecipe(reader.result, file.name);
    reader.readAsDataURL(file);
    return;
  }
  const source = $('recipe-source').value.trim();
  if (!source) { showToast('Add a recipe URL first.'); return; }
  await importRecipeFromUrl(source);
}

async function importTextRecipe(text, title, source) {
  const button = $('analyze-plan');
  const originalLabel = button.innerHTML;
  button.innerHTML = 'Reading recipe and rebuilding plan…';
  try {
    const response = await fetch('/api/analyze', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({ recipe_text:text, preferences:{ servings:$('servings').value, skill:$('skill')?.value || 'New to cooking', stove_scale:$('stove-scale')?.value || '1–10' } }) });
    if (!response.ok) throw new Error('Recipe analysis failed');
    const result = await response.json();
    applyImportedRecipe({ recipe:{ title, source, servings:parseServingSize(text), total_time:null }, plan:result.plan }, title);
  } catch (error) { showToast('I could not read that file. Try a clearer recipe source.'); }
  finally { button.innerHTML = originalLabel; }
}

async function importImageRecipe(image, title) {
  const button = $('analyze-plan');
  const originalLabel = button.innerHTML;
  button.innerHTML = 'Reading picture and rebuilding plan…';
  try {
    const response = await fetch('/api/analyze-image', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({ image, preferences:{ servings:$('servings').value, skill:$('skill')?.value || 'New to cooking', stove_scale:$('stove-scale')?.value || '1–10' } }) });
    if (!response.ok) throw new Error('Image analysis failed');
    const result = await response.json();
    applyImportedRecipe({ recipe:{ title, source:'Uploaded picture', servings:result.plan?.servings || null, total_time:null }, plan:result.plan }, title);
  } catch (error) { showToast('I could not read that picture. Try a clearer image.'); }
  finally { button.innerHTML = originalLabel; }
}

function parseDurationMinutes(duration) {
  const match = String(duration || '').match(/(\d+)(?:[–-](\d+))?\s*(?:minutes?|mins?)/i);
  if (!match) return 1;
  return Math.max(1, Number(match[2] || match[1]));
}

function formatRecipeTime(totalTime) {
  const match = String(totalTime || '').match(/PT(?:(\d+)H)?(?:(\d+)M)?/i);
  if (!match) return 'time varies';
  const minutes = Number(match[1] || 0) * 60 + Number(match[2] || 0);
  return minutes ? `${minutes} min` : 'time varies';
}

function applyImportedRecipe(payload, sourceUrl) {
  const recipe = payload.recipe;
  const plan = payload.plan || {};
  const title = $('recipe-title');
  title.textContent = recipe.title || 'Imported recipe';
  const sourceMark = document.createElement('span');
  sourceMark.className = 'title-source';
  sourceMark.textContent = ` · ${recipe.source || 'Recipe source'}`;
  title.appendChild(sourceMark);
  $('recipe-source-label').innerHTML = '';
  const sourceLabel = document.createElement('strong');
  sourceLabel.textContent = 'Source: ';
  $('recipe-source-label').append(sourceLabel, `${recipe.source || 'Recipe source'}${recipe.servings ? ` · ${recipe.servings} servings` : ''}`);
  $('recipe-time').textContent = `◷ ${formatRecipeTime(recipe.total_time)}`;
  if (recipe.servings) applyParsedServingSize(recipe.servings, recipe.source || 'original recipe');
  else {
    $('servings').value = '';
    $('serving-status').textContent = 'No serving count found in this recipe. Add one if needed.';
  }

  ingredients = (plan.ingredients || []).map((entry) => typeof entry === 'string' ? entry : `${entry.quantity || ''} ${entry.item || ''}`.trim()).filter(Boolean);
  equipment = (plan.equipment || []).map((entry) => typeof entry === 'string' ? entry : `${entry.item || ''}${entry.purpose ? ` — ${entry.purpose}` : ''}`.trim()).filter(Boolean);
  const plannedTasks = (plan.tasks || []).map((entry) => ({ tag:'COOK', title:entry.task || 'Cooking step', duration:entry.duration || '1 min', minutes:parseDurationMinutes(entry.duration), copy:entry.task || 'Complete this cooking step.', cue:entry.completion_cue || 'Tell me when this step is complete.' }));
  const cleanupTasks = (plan.cleanup || []).map((entry) => ({ tag:'CLEAN UP', title:'Clean up', duration:'1 min', minutes:1, copy:entry.task || 'Complete this cleanup step.', cue:entry.safety_note || 'Tell me when cleanup is complete.' }));
  tasks.splice(0, tasks.length, ...plannedTasks, ...cleanupTasks);
  current = 0;
  renderLists();
  saveNewRecipe(recipe, sourceUrl);
  showToast(`Loaded “${recipe.title}” and rebuilt the cooking plan.`);
}

async function importRecipeFromUrl(url) {
  const normalizedUrl = normalizeRecipeUrl(url);
  if (!normalizedUrl) {
    if (String(url || '').trim()) showToast('Paste a complete recipe URL, including its website address.');
    return;
  }
  $('recipe-source').value = normalizedUrl;
  const requestId = ++importRequestId;
  importController?.abort();
  importController = new AbortController();
  const button = $('analyze-plan');
  const originalLabel = button.innerHTML;
  button.innerHTML = 'Reading recipe and rebuilding plan…';
  $('serving-status').textContent = 'Reading the original recipe…';
  try {
    const response = await fetch('/api/import-recipe', { method:'POST', headers:{'Content-Type':'application/json'}, signal:importController.signal, body:JSON.stringify({ url:normalizedUrl, preferences:{ servings:$('servings').value, skill:$('skill')?.value || 'New to cooking', stove_scale:$('stove-scale')?.value || '1–10' } }) });
    const result = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(result.error || `Import failed (${response.status})`);
    if (requestId !== importRequestId) return;
    applyImportedRecipe(result, normalizedUrl);
  } catch (error) {
    if (error.name === 'AbortError' || requestId !== importRequestId) return;
    $('serving-status').textContent = 'Import failed. Check the URL and make sure the Sousy server is running.';
    showToast(`I could not import that recipe: ${error.message}`);
  } finally {
    if (requestId === importRequestId) button.innerHTML = originalLabel;
  }
}

function normalizeRecipeUrl(value) {
  let candidate = String(value || '').trim().replace(/^['"]|['"]$/g, '').replace(/[.,);\]>]+$/, '');
  if (candidate.startsWith('www.')) candidate = `https://${candidate}`;
  if (!/^https?:\/\//i.test(candidate) && /^[^\s.]+\.[^\s]+/.test(candidate)) candidate = `https://${candidate}`;
  try {
    const parsed = new URL(candidate);
    return ['http:', 'https:'].includes(parsed.protocol) && parsed.hostname ? parsed.href : '';
  } catch (error) {
    return '';
  }
}
