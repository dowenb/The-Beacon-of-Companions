/* Game state machine: title -> round -> result -> ... -> ending */

(function () {
  'use strict';

  const state = {
    roundIndex: 0,      // 0-based index into ROUNDS
    score: 0,           // number of collaborative choices (0 - 10)
    allies: [],         // ally thresholds that have been reached
    lastChoice: null,
    newAlly: null,
  };

  const $ = (id) => document.getElementById(id);
  const screens = {
    title: $('title-screen'),
    round: $('round-screen'),
    result: $('result-screen'),
    ending: $('ending-screen'),
  };

  function showScreen(name) {
    Object.keys(screens).forEach((key) => {
      screens[key].classList.toggle('hidden', key !== name);
    });
    const active = screens[name];
    active.classList.remove('animate-in');
    void active.offsetWidth; // force reflow so the animation restarts
    active.classList.add('animate-in');
    window.scrollTo(0, 0);
  }

  /* Collaborative players get the "supported" story variant earlier. */
  function supportedThreshold(roundNumber) {
    return Math.max(0, roundNumber - 2);
  }

  function currentAllies() {
    return state.allies.map((threshold) => ALLIES[threshold]);
  }

  /* Art is drawn once per party state; show only the companions who have joined. */
  function partyKey(allies) {
    return allies.length ? allies.map((ally) => ally.id).join('-') : 'none';
  }

  function artFor(scene, allies) {
    const variant = scene.images && scene.images[partyKey(allies)];
    return variant || { src: scene.image, alt: scene.alt };
  }

  function renderParty() {
    const allies = currentAllies();
    const party = $('party-list');

    $('bond-count').textContent = `${state.score} / ${ROUNDS.length}`;

    const pips = $('bond-pips');
    pips.innerHTML = '';
    for (let i = 0; i < ROUNDS.length; i += 1) {
      const pip = document.createElement('span');
      pip.className = 'pip' + (i < state.score ? ' pip--filled' : '');
      pips.appendChild(pip);
    }

    if (allies.length === 0) {
      party.innerHTML = '<span class="party-empty">Traveling alone</span>';
    } else {
      party.innerHTML = allies
        .map((ally) => `<span class="ally-chip" title="${ally.title}"><span aria-hidden="true">${ally.icon}</span> ${ally.name}</span>`)
        .join('');
    }
  }

  function renderRound() {
    const round = ROUNDS[state.roundIndex];
    const roundNumber = state.roundIndex + 1;
    const supported = state.score >= supportedThreshold(roundNumber);
    const allies = currentAllies();

    $('round-counter').textContent = `Round ${roundNumber} of ${ROUNDS.length}`;
    $('progress-fill').style.width = `${(state.roundIndex / ROUNDS.length) * 100}%`;
    document.querySelector('.progress').setAttribute('aria-valuenow', String(roundNumber - 1));
    $('round-title').textContent = round.title;
    const art = artFor(round, allies);
    $('round-image').src = art.src;
    $('round-image').alt = art.alt;

    const badge = $('difficulty-badge');
    badge.className = 'difficulty ' + (supported ? 'difficulty--supported' : 'difficulty--strained');
    badge.innerHTML = supported
      ? '<span aria-hidden="true">✦</span> The path is clearer — friends at your side'
      : '<span aria-hidden="true">◇</span> The path is harder — you’re on your own';

    let html = `<p>${round[supported ? 'supported' : 'strained']}</p>`;
    const assistLines = allies
      .filter((ally) => ally.assists[roundNumber])
      .map((ally) => `<p class="assist"><span aria-hidden="true">${ally.icon}</span> ${ally.assists[roundNumber]}</p>`);
    if (assistLines.length > 0) {
      html += `<div class="assists">${assistLines.join('')}</div>`;
    }
    $('story-text').innerHTML = html;

    $('choice-collab-label').textContent = round.choices.collab.label;
    $('choice-solo-label').textContent = round.choices.solo.label;

    if (allies.length > 0) {
      $('choice-collab-tag').textContent = `Together · ${allies[allies.length - 1].name} can help`;
    } else {
      $('choice-collab-tag').textContent = supported
        ? 'Together · the way is easier'
        : 'Reach out · uncertain';
    }
    $('choice-solo-tag').textContent = supported
      ? 'Alone · an unnecessary risk'
      : 'Hard choice · heavier burden';

    renderParty();
    showScreen('round');
  }

  function choose(type) {
    const round = ROUNDS[state.roundIndex];
    const choice = round.choices[type];
    state.lastChoice = { type, label: choice.label, result: choice.result };

    if (type === 'collab') {
      state.score += 1;
    }

    state.newAlly = null;
    ALLY_THRESHOLDS.forEach((threshold) => {
      if (state.score >= threshold && !state.allies.includes(threshold)) {
        state.allies.push(threshold);
        state.newAlly = ALLIES[threshold];
      }
    });

    renderResult();
  }

  function renderResult() {
    const choice = state.lastChoice;
    $('result-kicker').textContent = choice.type === 'collab' ? 'You reached out' : 'You went alone';
    $('result-choice').textContent = choice.label;
    $('result-text').textContent = choice.result;

    const join = $('result-join');
    if (state.newAlly) {
      join.classList.remove('hidden');
      join.innerHTML =
        `<span class="join-icon" aria-hidden="true">${state.newAlly.icon}</span>` +
        `<div><strong>${state.newAlly.name} ${state.newAlly.title} joins your party!</strong>` +
        `<p>${state.newAlly.join}</p></div>`;
    } else {
      join.classList.add('hidden');
      join.innerHTML = '';
    }

    $('result-continue').textContent =
      state.roundIndex === ROUNDS.length - 1 ? 'See your ending →' : 'Continue →';

    renderParty();
    showScreen('result');
  }

  function continueGame() {
    if (state.roundIndex < ROUNDS.length - 1) {
      state.roundIndex += 1;
      renderRound();
    } else {
      renderEnding();
    }
  }

  function renderEnding() {
    const ending = getEnding(state.score);
    const art = artFor(ending, currentAllies());
    $('ending-image').src = art.src;
    $('ending-image').alt = art.alt;
    $('ending-title').textContent = ending.title;
    $('ending-epigraph').textContent = ending.epigraph;
    $('ending-text').textContent = ending.text;
    $('ending-score').textContent =
      `${state.score} of ${ROUNDS.length} collaborative choices · ` +
      `${state.allies.length} companion${state.allies.length === 1 ? '' : 's'} gained`;
    $('progress-fill').style.width = '100%';
    document.querySelector('.progress').setAttribute('aria-valuenow', String(ROUNDS.length));
    renderParty();
    showScreen('ending');
  }

  function startGame() {
    state.roundIndex = 0;
    state.score = 0;
    state.allies = [];
    state.lastChoice = null;
    state.newAlly = null;
    renderRound();
  }

  $('start-button').addEventListener('click', startGame);
  $('replay-button').addEventListener('click', startGame);
  $('choice-collab').addEventListener('click', () => choose('collab'));
  $('choice-solo').addEventListener('click', () => choose('solo'));
  $('result-continue').addEventListener('click', continueGame);

  showScreen('title');
})();
