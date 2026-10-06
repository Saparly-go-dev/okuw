const $ = s => document.querySelector(s);
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

/* ---------- Senesler ---------- */
const MONTHS = ['ýanwar', 'fewral', 'mart', 'aprel', 'maý', 'iýun', 'iýul', 'awgust', 'sentýabr', 'oktýabr', 'noýabr', 'dekabr'];
const DAYS_SHORT = ['Duş', 'Siş', 'Çar', 'Pen', 'Ann', 'Şen', 'Ýek'];
const DAYS_FULL = ['Duşenbe', 'Sişenbe', 'Çarşenbe', 'Penşenbe', 'Anna', 'Şenbe', 'Ýekşenbe'];

const pad = n => String(n).padStart(2, '0');
const iso = d => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const fromIso = s => { const [y, m, d] = s.split('-').map(Number); return new Date(y, m - 1, d); };
const fmt = s => { const d = fromIso(s); return `${pad(d.getDate())}.${pad(d.getMonth() + 1)}.${d.getFullYear()}`; };
const longDate = d => `${d.getDate()} ${MONTHS[d.getMonth()]}, ${d.getFullYear()}`;
const weekday = d => (d.getDay() + 6) % 7; // 0 = Duşenbe
const addDays = (d, n) => { const x = new Date(d); x.setDate(x.getDate() + n); return x; };

const today = new Date();
const todayIso = iso(today);
const monthKey = todayIso.slice(0, 7);
const weekStart = addDays(today, -weekday(today));
const week = [...Array(7)].map((_, i) => addDays(weekStart, i));

/* ---------- Maglumatlar ---------- */
const STORAGE_KEY = 'okuw-data-v2';
const daysAgo = n => iso(addDays(today, -n));

function seed() {
  // Hemişe birmeňzeş netije berýän tötänleýin san generatory
  let s0 = 20260906;
  const rnd = () => (s0 = (s0 * 1103515245 + 12345) % 2147483648) / 2147483648;
  const pick = a => a[Math.floor(rnd() * a.length)];

  const courses = [
    { id: 1, name: 'Iňlis dili', level: 'Başlangyç · A1 – A2', teacher: 'Aýna Myradowa', icon: 'Aa', color: 'mint', capacity: 24, fee: 450, room: '101-nji otag', start: '09:00', end: '10:20', days: [0, 2, 4] },
    { id: 2, name: 'Web programmirleme', level: 'HTML, CSS we JavaScript', teacher: 'Merdan Orazow', icon: '</>', color: 'blue', capacity: 20, fee: 600, room: 'IT otagy', start: '10:30', end: '11:50', days: [0, 1, 3, 5] },
    { id: 3, name: 'Grafiki dizaýn', level: 'Figma we Adobe Photoshop', teacher: 'Selbi Amanowa', icon: '◈', color: 'orange', capacity: 16, fee: 500, room: '203-nji otag', start: '14:00', end: '15:20', days: [1, 3, 5] },
    { id: 4, name: 'Rus dili', level: 'Orta dereje · B1', teacher: 'Maral Annagulyýewa', icon: 'Яя', color: 'purple', capacity: 20, fee: 400, room: '102-nji otag', start: '15:30', end: '16:50', days: [0, 2, 4] },
    { id: 5, name: 'Iňlis dili · IELTS', level: 'Ýokary dereje · B2 – C1', teacher: 'Jahan Gurbanowa', icon: 'IE', color: 'blue', capacity: 12, fee: 700, room: '104-nji otag', start: '17:00', end: '18:30', days: [1, 3, 5] },
    { id: 6, name: 'Matematika', level: 'Ýokary okuwa taýýarlyk', teacher: 'Begmyrat Annaýew', icon: '∑', color: 'mint', capacity: 18, fee: 350, room: '201-nji otag', start: '09:00', end: '10:20', days: [1, 3, 5] },
    { id: 7, name: 'Kompýuter sowatlylygy', level: 'Word, Excel we internet', teacher: 'Gülşat Rejepowa', icon: '⌘', color: 'orange', capacity: 15, fee: 300, room: 'IT otagy', start: '13:00', end: '14:20', days: [0, 2, 4] },
    { id: 8, name: 'Buhgalteriýa we 1C', level: 'Hasabat we salgyt esaslary', teacher: 'Nurmuhammet Täçmyradow', icon: '₼', color: 'purple', capacity: 14, fee: 550, room: '202-nji otag', start: '18:00', end: '19:20', days: [0, 2] }
  ];

  const maleNames = ['Maksat', 'Döwlet', 'Batyr', 'Serdar', 'Rowşen', 'Arslan', 'Kerim', 'Merdan', 'Begenç', 'Atamyrat', 'Dowletmyrat', 'Myrat', 'Ýusup', 'Şatlyk', 'Baýram', 'Parahat', 'Azat', 'Ilmyrat', 'Eziz', 'Nury', 'Kakajan', 'Gurbanguly', 'Annamuhammet', 'Yhlas', 'Resul'];
  const femaleNames = ['Aýgül', 'Selbi', 'Mähri', 'Ogulnabat', 'Jeren', 'Leýli', 'Gözel', 'Maýsa', 'Aýna', 'Bahar', 'Enejan', 'Ogulgerek', 'Gülälek', 'Dünýä', 'Läle', 'Mährijemal', 'Sona', 'Nabat', 'Arzuw', 'Şirin', 'Aýjemal', 'Bägül', 'Ýazgül', 'Oguljan', 'Merjen'];
  const roots = ['Meredow', 'Orazow', 'Ataýew', 'Amanow', 'Saparow', 'Hojaýew', 'Berdiýew', 'Kakaýew', 'Annaýew', 'Gurbanow', 'Hydyrow', 'Çaryýew', 'Nuryýew', 'Baýramow', 'Rejepow', 'Myradow', 'Allaberdiýew', 'Durdyýew', 'Jumaýew', 'Öwezow', 'Halmyradow', 'Babaýew', 'Garryýew', 'Tagangeldiýew', 'Muhammedow', 'Weliýew', 'Ussaýew', 'Pirliýew'];
  const operators = ['61', '62', '63', '64', '65', '71'];

  const used = new Set(), students = [];
  courses.forEach(c => {
    const count = Math.round(c.capacity * (0.6 + rnd() * 0.35));
    for (let k = 0; k < count; k++) {
      let name;
      do {
        const female = rnd() < 0.55;
        name = `${pick(female ? femaleNames : maleNames)} ${pick(roots)}${female ? 'a' : ''}`;
      } while (used.has(name));
      used.add(name);
      const r = () => pad(Math.floor(rnd() * 100));
      students.push({ id: students.length + 1, name, course: c.id, phone: `+993 ${pick(operators)} ${r()}-${r()}-${r()}`, date: daysAgo(Math.floor(Math.pow(rnd(), 0.8) * 140)) });
    }
  });

  // Tölegler: geçen aýlar köplenç tölenen, şu aý — bölekleýin
  const payments = {};
  students.forEach(s => {
    for (let m = fromIso(s.date.slice(0, 7) + '-01'); iso(m).slice(0, 7) <= monthKey; m.setMonth(m.getMonth() + 1)) {
      const key = iso(m).slice(0, 7);
      if (rnd() < (key === monthKey ? 0.68 : 0.96)) (payments[key] = payments[key] || {})[s.id] = true;
    }
  });

  // Gatnaşyk: soňky 4 hepdäniň geçen sapaklary
  const attendance = {};
  for (let n = 28; n >= 0; n--) {
    const d = iso(addDays(today, -n)), wd = weekday(fromIso(d));
    students.forEach(s => {
      const c = courseById_(courses, s.course);
      if (s.date > d || !c.days.includes(wd) || (n === 0 && c.start >= '12:00')) return;
      (attendance[d] = attendance[d] || {})[s.id] = rnd() < 0.9;
    });
  }
  return { courses, students, payments, attendance, nextId: students.length + 100 };
}
const courseById_ = (list, id) => list.find(c => c.id === id);

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) { /* ýatda saklama elýeterli däl */ }
  return seed();
}
function save() {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(db)); } catch (e) { /* ýatda saklama elýeterli däl */ }
}

let db = load();
const newId = () => db.nextId++;
const courseById = id => db.courses.find(c => c.id === id);
const studentsOf = id => db.students.filter(s => s.course === id);
const isPaid = s => !!(db.payments[monthKey] || {})[s.id];
const attendanceOf = (s, day) => (db.attendance[day] || {})[s.id];
function attendanceRate(s) {
  let total = 0, present = 0;
  Object.values(db.attendance).forEach(day => { if (s.id in day) { total++; if (day[s.id]) present++; } });
  return { total, present, pct: total ? Math.round(present / total * 100) : null };
}

/* ---------- Ýagdaý ---------- */
const navs = [
  ['home', '▦', 'Baş sahypa'], ['courses', '▤', 'Kurslar'], ['students', '♧', 'Diňleýjiler'],
  ['schedule', '▦', 'Sapak tertibi'], ['attendance', '☑', 'Gatnaşyk'], ['payments', '▣', 'Tölegler']
];
let current = 'home', query = '', selectedDay = todayIso;

$('#nav').innerHTML = navs.map(([id, icon, text]) =>
  `<a href="#${id}" aria-label="${text}" title="${text}"><span class="nav-icon">${icon}</span><span class="nav-text">${text}</span>${id === 'courses' ? '<span class="badge-count" id="course-count"></span>' : ''}</a>`
).join('');
$('#today').textContent = `${DAYS_FULL[weekday(today)]}, ${longDate(today)}`;
$('#year').textContent = today.getFullYear();

function greeting() {
  const h = today.getHours();
  if (h < 12) return 'Ertiriňiz haýyrly bolsun!';
  if (h < 18) return 'Günüňiz haýyrly bolsun!';
  return 'Agşamyňyz haýyrly bolsun!';
}
const initials = name => name.split(' ').filter(Boolean).map(n => n[0]).slice(0, 2).join('').toUpperCase();

/* ---------- Bölekler ---------- */
function courseCards(full = false) {
  if (!db.courses.length) return '<p class="empty">Heniz kurs goşulmady.</p>';
  const list = full ? db.courses : db.courses.slice(0, 4);
  return `<div class="course-grid ${full ? 'view-courses' : ''}">${list.map(c => {
    const st = studentsOf(c.id), count = st.length;
    const faces = st.slice(0, 3).map(s => `<span class="face">${esc(initials(s.name))}</span>`).join('') + (count > 3 ? `<span class="face">+${count - 3}</span>` : '');
    const full_ = count >= c.capacity;
    return `<article class="course-card" tabindex="0" role="button" data-course="${c.id}" aria-label="${esc(c.name)} kursuny aç">
      <div class="course-top"><span class="course-icon ${esc(c.color)}">${esc(c.icon)}</span><span class="status">${full_ ? 'Orun ýok' : 'Dowam edýär'}</span></div>
      <h3>${esc(c.name)}</h3><p class="desc">${esc(c.level)}</p>
      <div class="course-meta"><span>♧ ${count} diňleýji</span><span>${c.capacity} orun</span></div>
      <div class="progress"><span style="width:${Math.min(count / c.capacity * 100, 100)}%"></span></div>
      <div class="course-bottom"><div class="faces">${faces}</div><span>${c.fee} TMT / aý</span></div>
    </article>`;
  }).join('')}</div>`;
}

function lessonsFor(dayIso) {
  const wd = weekday(fromIso(dayIso));
  return db.courses.filter(c => (c.days || []).includes(wd)).sort((a, b) => a.start.localeCompare(b.start));
}

function lessons(wide = false) {
  const list = lessonsFor(selectedDay);
  if (weekday(fromIso(selectedDay)) === 6) return '<p class="empty">Ýekşenbe — dynç güni. Sapak ýok.</p>';
  if (!list.length) return '<p class="empty">Bu gün sapak ýok.</p>';
  return `<div class="${wide ? 'schedule-wide' : ''}">${(wide ? list : list.slice(0, 3)).map(c =>
    `<div class="lesson"><div class="time">${esc(c.start)}<small>${esc(c.end)}</small></div><div class="lesson-info"><h3>${esc(c.name)}</h3><p>${esc(c.teacher)}</p><small>${esc(c.room)}</small></div></div>`
  ).join('')}</div>`;
}

function calendar() {
  return `<div class="calendar">${week.map((d, i) =>
    `<button class="day ${iso(d) === selectedDay ? 'selected' : ''}" data-day="${iso(d)}">${DAYS_SHORT[i]}<b>${d.getDate()}</b></button>`
  ).join('')}</div>`;
}

function studentTable(mode = 'students', limit = 0) {
  let rows = [...db.students].sort((a, b) => mode === 'students' ? b.date.localeCompare(a.date) : a.name.localeCompare(b.name, 'tk'))
    .filter(s => (s.name + ' ' + (courseById(s.course)?.name || '')).toLocaleLowerCase().includes(query.toLocaleLowerCase()));
  if (limit) rows = rows.slice(0, limit);
  const head3 = mode === 'payments' ? 'AÝLYK TÖLEG' : mode === 'attendance' ? 'UMUMY GATNAŞYK' : 'GOŞULAN SENESI';
  const head4 = mode === 'attendance' ? `${fmt(todayIso)} · GATNAŞYK` : `TÖLEG · ${MONTHS[today.getMonth()].toUpperCase()}`;
  const body = rows.map(s => {
    const c = courseById(s.course) || { name: '—', fee: 0 };
    const att = attendanceOf(s, todayIso);
    const rate = mode === 'attendance' ? attendanceRate(s) : null;
    const col3 = mode === 'payments' ? `${c.fee} TMT` : rate ? (rate.pct === null ? '—' : `${rate.pct}% · ${rate.present}/${rate.total}`) : fmt(s.date);
    const col4 = mode === 'attendance'
      ? `<button class="attendance-btn ${att === false ? 'absent' : ''}" data-attend="${s.id}">${att === true ? '✓ Gatnaşdy' : att === false ? 'Gatnaşmady' : 'Bellenmedi'}</button>`
      : `<span class="payment ${isPaid(s) ? '' : 'pending'}">${isPaid(s) ? 'Tölendi' : 'Garaşylýar'}</span>`;
    const col5 = mode === 'payments'
      ? (isPaid(s) ? `<button class="text-btn" data-unpay="${s.id}">Ýatyr</button>` : `<button class="text-btn" data-pay="${s.id}">Tölegi belle</button>`)
      : mode === 'attendance' ? '' : `<div class="row-actions"><button class="row-action" data-student="${s.id}" aria-label="${esc(s.name)} maglumatlary">↗</button></div>`;
    return `<tr><td><div class="student-cell"><span class="avatar">${esc(initials(s.name))}</span>${esc(s.name)}</div></td><td>${esc(c.name)}</td><td>${col3}</td><td>${col4}</td><td>${col5}</td></tr>`;
  }).join('');
  return `<div class="table-scroll"><table><thead><tr><th>DIŇLEÝJI</th><th>KURS</th><th>${head3}</th><th>${head4}</th><th></th></tr></thead><tbody>${body}</tbody></table>${rows.length ? '' : '<p class="empty">Gözlege laýyk diňleýji tapylmady.</p>'}</div>`;
}

function stats() {
  const paidTotal = db.students.filter(isPaid).reduce((a, s) => a + (courseById(s.course)?.fee || 0), 0);
  const expected = db.students.reduce((a, s) => a + (courseById(s.course)?.fee || 0), 0);
  const todays = lessonsFor(todayIso);
  const range = todays.length ? `${todays[0].start} – ${todays[todays.length - 1].end} aralygynda` : 'Şu gün sapak ýok';
  return `<div class="stats">
    <div class="stat"><div class="stat-top">Jemi diňleýji <span class="stat-icon">♧</span></div><div class="stat-number">${db.students.length}</div><div class="stat-note"><span class="positive">${db.courses.length} kurs</span> boýunça bilim alýar</div></div>
    <div class="stat"><div class="stat-top">Işjeň kurslar <span class="stat-icon">▤</span></div><div class="stat-number">${pad(db.courses.length)}</div><div class="stat-note"><span class="positive">${db.courses.reduce((a, c) => a + c.capacity, 0)} orun</span> jemi</div></div>
    <div class="stat"><div class="stat-top">Şu günki sapaklar <span class="stat-icon">▦</span></div><div class="stat-number">${pad(todays.length)}</div><div class="stat-note">${range}</div></div>
    <div class="stat"><div class="stat-top">Şu aýyň tölegleri <span class="stat-icon">▣</span></div><div class="stat-number">${paidTotal.toLocaleString('en-US')} <small>TMT</small></div><div class="stat-note">Garaşylýan: ${(expected - paidTotal).toLocaleString('en-US')} TMT</div></div>
  </div>`;
}

/* ---------- Sahypa ---------- */
function subtitle() {
  const ws = week[0], we = week[6];
  return {
    home: 'Kurslaryňyz, diňleýjileriňiz we şu günüň meýilnamasy — bir ýerde.',
    courses: 'Bilime täze mümkinçilikler açýan okuw kurslary.',
    students: 'Diňleýjileriň hasaby we olaryň saýlan kurslary.',
    schedule: `${ws.getDate()} ${MONTHS[ws.getMonth()]} – ${we.getDate()} ${MONTHS[we.getMonth()]}, ${we.getFullYear()} · Hepdelik meýilnama`,
    attendance: `${longDate(today)} · Gatnaşygy üýtgetmek üçin ýagdaýa basyň.`,
    payments: `${MONTHS[today.getMonth()][0].toUpperCase() + MONTHS[today.getMonth()].slice(1)} aýy üçin diňleýjileriň okuw tölegleri.`
  }[current];
}

function render() {
  current = location.hash.slice(1) || 'home';
  if (!navs.some(n => n[0] === current)) current = 'home';
  const label = navs.find(n => n[0] === current)[2];
  $('#crumb').textContent = label;
  $('#title').innerHTML = current === 'home' ? `${greeting()} <span class="sun">☀</span>` : label;
  $('#subtitle').textContent = subtitle();
  $('#course-count').textContent = db.courses.length;
  document.querySelectorAll('nav a').forEach(a => {
    const on = a.hash === '#' + current;
    a.classList.toggle('active', on);
    on ? a.setAttribute('aria-current', 'page') : a.removeAttribute('aria-current');
  });
  $('#add-btn').textContent = current === 'courses' ? '＋ Kurs goş' : '＋ Diňleýji goş';

  const sd = fromIso(selectedDay);
  let html = '';
  if (current === 'home') {
    html = stats() + `<div class="dashboard-grid">
      <section class="panel"><div class="panel-head"><div><h2>Işjeň kurslar</h2><p>Ösüşe tarap her gün bir ädim</p></div><a class="text-btn" href="#courses">Ählisini gör →</a></div>${courseCards()}</section>
      <section class="panel"><div class="panel-head"><div><h2>Şu hepdäniň sapaklary</h2><p>${DAYS_FULL[weekday(sd)]}, ${longDate(sd)}</p></div><span class="muted">▦</span></div>
        <div class="schedule">${calendar()}<div id="lessons">${lessons()}</div><a class="text-btn" href="#schedule" style="display:block;margin-top:22px">Doly tertibi gör →</a></div></section>
    </div>
    <section class="panel bottom-panel"><div class="panel-head"><h2>Soňky goşulan diňleýjiler</h2><a class="text-btn" href="#students">Ählisini gör →</a></div>${studentTable('students', 5)}</section>`;
  } else if (current === 'courses') {
    html = courseCards(true);
  } else if (current === 'schedule') {
    html = `<section class="panel"><div class="panel-head"><div><h2>Hepdelik sapak tertibi</h2><p>${DAYS_FULL[weekday(sd)]}, ${longDate(sd)}</p></div></div><div class="schedule">${calendar()}<div id="lessons">${lessons(true)}</div></div></section>`;
  } else {
    html = `<section class="panel"><div class="panel-head"><h2>${label} <span class="muted">(${db.students.length})</span></h2>
      <div class="toolbar"><input class="search" aria-label="Diňleýji gözle" placeholder="Ady ýa-da kursy boýunça gözle…" value="${esc(query)}"></div></div>
      <div id="table">${studentTable(current)}</div></section>`;
  }
  $('#content').innerHTML = html;
  const input = $('.search');
  if (input) input.oninput = e => { query = e.target.value; $('#table').innerHTML = studentTable(current); };
}

/* ---------- Habarnama we penjire ---------- */
let toastTimer;
function toast(t) {
  $('#toast').textContent = t;
  $('#toast').classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => $('#toast').classList.remove('show'), 3000);
}

function modal(title, fields, submit, onDelete) {
  $('#modal-title').textContent = title;
  $('#fields').innerHTML = fields;
  $('.form-actions').style.display = submit ? 'flex' : 'none';
  $('#delete-btn').hidden = !onDelete;
  $('#delete-btn').onclick = onDelete || null;
  $('#form').onsubmit = e => { e.preventDefault(); if (submit) submit(new FormData(e.target)); };
  $('#modal').showModal();
}
function done(message) { save(); $('#modal').close(); render(); toast(message); }

function studentForm(s = {}) {
  return `<label for="name">Ady we familiýasy</label><input id="name" name="name" required maxlength="70" placeholder="Meselem: Aýgül Meredowa" value="${esc(s.name)}">
    <label for="phone">Telefon belgisi</label><input id="phone" name="phone" type="tel" maxlength="20" placeholder="+993 6X XX-XX-XX" value="${esc(s.phone)}">
    <label for="course">Okuw kursy</label><select id="course" name="course">${db.courses.map(c => `<option value="${c.id}" ${c.id === s.course ? 'selected' : ''}>${esc(c.name)}</option>`).join('')}</select>
    <label for="paid">Şu aýyň tölegi</label><select name="paid" id="paid"><option value="false">Garaşylýar</option><option value="true" ${s.id && isPaid(s) ? 'selected' : ''}>Tölendi</option></select>`;
}

function setPaid(id, paid) {
  db.payments[monthKey] = db.payments[monthKey] || {};
  if (paid) db.payments[monthKey][id] = true; else delete db.payments[monthKey][id];
}

function addStudent() {
  if (!db.courses.length) return toast('Ilki bilen kurs goşuň');
  modal('Täze diňleýji', studentForm(), f => {
    const name = f.get('name').trim();
    if (!name) return;
    const s = { id: newId(), name, phone: f.get('phone').trim(), course: Number(f.get('course')), date: todayIso };
    db.students.push(s);
    setPaid(s.id, f.get('paid') === 'true');
    done('Diňleýji goşuldy');
  });
}

function editStudent(s) {
  const rate = attendanceRate(s);
  const months = Object.keys(db.payments).filter(m => m >= s.date.slice(0, 7)).sort();
  const history = months.map(m => `${MONTHS[Number(m.slice(5)) - 1]}: ${db.payments[m][s.id] ? 'tölendi' : 'garaşylýar'}`).join(' · ');
  modal(s.name, studentForm(s) + `<p class="note">Goşulan senesi: ${fmt(s.date)}<br>Gatnaşyk: ${rate.pct === null ? 'heniz sapak ýok' : `${rate.pct}% (${rate.present} / ${rate.total} sapak)`}${history ? `<br>Tölegler: ${history}` : ''}</p>`, f => {
    const name = f.get('name').trim();
    if (!name) return;
    Object.assign(s, { name, phone: f.get('phone').trim(), course: Number(f.get('course')) });
    setPaid(s.id, f.get('paid') === 'true');
    done('Maglumatlar täzelendi');
  }, () => {
    if (!confirm(`${s.name} pozulsynmy?`)) return;
    db.students = db.students.filter(x => x.id !== s.id);
    done('Diňleýji pozuldy');
  });
}

function courseForm(c = {}) {
  const days = c.days || [0, 2, 4];
  return `<label for="name">Kursuň ady</label><input id="name" name="name" required maxlength="70" value="${esc(c.name)}">
    <label for="level">Derejesi / mazmuny</label><input id="level" name="level" maxlength="70" value="${esc(c.level)}">
    <label for="teacher">Mugallym</label><input id="teacher" name="teacher" required maxlength="70" value="${esc(c.teacher)}">
    <label for="room">Otag</label><input id="room" name="room" maxlength="40" value="${esc(c.room)}">
    <label>Sapak günleri</label><div class="calendar" style="border:0;padding:0">${DAYS_SHORT.slice(0, 6).map((d, i) =>
      `<label style="margin:0;text-align:center;font-size:12px"><input type="checkbox" name="days" value="${i}" ${days.includes(i) ? 'checked' : ''} style="width:auto"> ${d}</label>`).join('')}</div>
    <label for="start">Başlanýan wagty</label><input id="start" name="start" type="time" value="${esc(c.start || '09:00')}" required>
    <label for="end">Gutarýan wagty</label><input id="end" name="end" type="time" value="${esc(c.end || '10:20')}" required>
    <label for="capacity">Orun sany</label><input id="capacity" name="capacity" type="number" min="1" max="200" value="${c.capacity || 20}" required>
    <label for="fee">Aýlyk töleg (TMT)</label><input id="fee" name="fee" type="number" min="0" max="100000" value="${c.fee ?? 450}" required>`;
}

function readCourse(f) {
  return {
    name: f.get('name').trim(), level: f.get('level').trim() || 'Täze topar', teacher: f.get('teacher').trim(),
    room: f.get('room').trim() || 'Bellenmedi', days: f.getAll('days').map(Number),
    start: f.get('start'), end: f.get('end'), capacity: Number(f.get('capacity')), fee: Number(f.get('fee'))
  };
}

const COLORS = ['mint', 'blue', 'orange', 'purple'];
function addCourse() {
  modal('Täze kurs', courseForm(), f => {
    const data = readCourse(f);
    if (!data.name || !data.teacher) return;
    db.courses.push({ id: newId(), icon: initials(data.name) || 'Aa', color: COLORS[db.courses.length % COLORS.length], ...data });
    done('Täze kurs goşuldy');
  });
}

function editCourse(c) {
  const count = studentsOf(c.id).length;
  modal(c.name, `<p class="detail-list">Diňleýjiler: <strong>${count} / ${c.capacity}</strong> · Sapaklar: <strong>${(c.days || []).map(d => DAYS_SHORT[d]).join(', ') || '—'}</strong></p>` + courseForm(c), f => {
    const data = readCourse(f);
    if (!data.name || !data.teacher) return;
    Object.assign(c, data);
    done('Kurs täzelendi');
  }, () => {
    if (count) return toast('Bu kursda diňleýjiler bar — ilki olary başga kursa geçiriň');
    if (!confirm(`«${c.name}» kursy pozulsynmy?`)) return;
    db.courses = db.courses.filter(x => x.id !== c.id);
    done('Kurs pozuldy');
  });
}

/* ---------- Wakalar ---------- */
$('#add-btn').onclick = () => current === 'courses' ? addCourse() : addStudent();
document.querySelectorAll('.close').forEach(b => b.onclick = () => $('#modal').close());

$('#content').onclick = e => {
  const c = e.target.closest('[data-course]'), s = e.target.closest('[data-student]'), d = e.target.closest('[data-day]'),
    a = e.target.closest('[data-attend]'), p = e.target.closest('[data-pay]'), u = e.target.closest('[data-unpay]');
  if (c) editCourse(courseById(Number(c.dataset.course)));
  if (s) editStudent(db.students.find(x => x.id === Number(s.dataset.student)));
  if (d) { selectedDay = d.dataset.day; render(); }
  if (a) {
    const id = Number(a.dataset.attend);
    db.attendance[todayIso] = db.attendance[todayIso] || {};
    db.attendance[todayIso][id] = db.attendance[todayIso][id] !== true;
    save();
    $('#table').innerHTML = studentTable(current);
    toast('Gatnaşyk täzelendi');
  }
  if (p) {
    const st = db.students.find(x => x.id === Number(p.dataset.pay)), cr = courseById(st.course);
    modal('Tölegi hasaba al', `<p>${esc(st.name)}</p><p class="detail-list">${esc(cr.name)} — <strong>${cr.fee} TMT</strong></p><p class="note">Töleg ${MONTHS[today.getMonth()]} aýy üçin «Tölendi» diýip bellener.</p>`,
      () => { setPaid(st.id, true); done('Töleg hasaba alyndy'); });
  }
  if (u) { setPaid(Number(u.dataset.unpay), false); save(); render(); toast('Töleg ýatyryldy'); }
};
$('#content').onkeydown = e => {
  if ((e.key === 'Enter' || e.key === ' ') && e.target.matches('[data-course]')) { e.preventDefault(); e.target.click(); }
};
window.addEventListener('hashchange', () => { query = ''; render(); });
render();
