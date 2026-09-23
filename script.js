const opening = document.getElementById("opening");
const site = document.getElementById("site");
const openBtn = document.getElementById("openBtn");
const musicBtn = document.getElementById("musicBtn");
const audio = document.getElementById("birthdayAudio");
const replayBtn = document.getElementById("replayBtn");
const themeBtn = document.getElementById("themeBtn");
const themeBtnOpening = document.getElementById("themeBtnOpening");

// Function to play audio safely
async function startMusic() {
  if (audio && audio.paused) {
    try {
      await audio.play();
      if (musicBtn) musicBtn.innerHTML = "♫ <span>playing</span>";
    } catch (e) {
      console.log("Audio autoplay prevented or failed:", e);
    }
  }
}

function applyTheme(isDark) {
  if (isDark) {
    document.documentElement.classList.add("dark");
    document.body.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
    document.body.classList.remove("dark");
  }
  document.querySelectorAll(".theme-toggle-btn").forEach(btn => {
    btn.innerHTML = isDark ? "☀️ <span>Day</span>" : "🌙 <span>Night</span>";
  });
}

function toggleTheme() {
  const isDark = !document.documentElement.classList.contains("dark");
  try {
    localStorage.setItem("theme", isDark ? "dark" : "light");
  } catch(e) {}
  applyTheme(isDark);
}

// Initial theme check from localStorage or prefers-color-scheme
let isCurrentlyDark = document.documentElement.classList.contains("dark");
try {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark" || (!savedTheme && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
    isCurrentlyDark = true;
  } else if (savedTheme === "light") {
    isCurrentlyDark = false;
  }
} catch(e) {}
applyTheme(isCurrentlyDark);

// Attach theme toggle listener to all present theme buttons
document.querySelectorAll(".theme-toggle-btn").forEach(btn => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleTheme();
  });
});

openBtn.addEventListener("click", () => {
  opening.classList.add("out");
  site.classList.remove("hidden");
  requestAnimationFrame(() => site.classList.add("show"));
  burstPetals(28);
  window.scrollTo({top:0, behavior:"instant"});
  startMusic();
});

replayBtn.addEventListener("click", () => {
  opening.classList.remove("out");
  site.classList.remove("show");
  setTimeout(() => site.classList.add("hidden"), 900);
  window.scrollTo({top:0, behavior:"instant"});
});

musicBtn.addEventListener("click", async () => {
  if (audio.paused) {
    try {
      await audio.play();
      musicBtn.innerHTML = "♫ <span>playing</span>";
    } catch {
      musicBtn.innerHTML = "♫ <span>add mp3</span>";
      alert("Please ensure the audio file is accessible at assets/cocacola.mp3");
    }
  } else {
    audio.pause();
    musicBtn.innerHTML = "♫ <span>music</span>";
  }
});

const reasons = [
  "the way your smile changes the whole mood of a room",
  "your laugh — especially the completely unplanned ones",
  "how effortlessly you can make an ordinary day feel special",
  "your softness, even when you pretend you are not soft",
  "the little expressions you make without realizing it",
  "how beautiful you look when you are simply being yourself",
  "your eyes behind those glasses",
  "the way you carry your own sense of style",
  "your patience with the people you love",
  "the tiny details you notice that everyone else misses",
  "how you make photographs feel like memories",
  "your ability to be both elegant and wonderfully silly",
  "the calm that exists in your presence",
  "the way you look when you are genuinely happy",
  "your strength — including the parts you rarely talk about",
  "the kindness you show when nobody is watching",
  "your little reactions to things you love",
  "the conversations I wish could last a little longer",
  "the fact that you are unmistakably yourself",
  "how even your quiet moments feel worth remembering",
  "the warmth you bring with you",
  "your courage to keep becoming who you want to be",
  "the memories we have already made",
  "the possibility of all the memories still waiting for us",
  "the person you are today",
  "and simply because… you are Tanjim ♡"
];

const grid = document.getElementById("reasonGrid");
reasons.forEach((reason, i) => {
  const card = document.createElement("div");
  card.className = "reason reveal";
  card.innerHTML = `
    <div class="reason-inner">
      <div class="reason-front"><div class="num">${String(i+1).padStart(2,"0")}</div><small>tap to open</small></div>
      <div class="reason-back"><p>${reason}</p><span>♡</span></div>
    </div>`;
  card.addEventListener("click", () => card.classList.toggle("open"));
  grid.appendChild(card);
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, {threshold:.12});

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

function burstPetals(count=18) {
  const layer = document.getElementById("petals");
  for(let i=0;i<count;i++){
    const p = document.createElement("span");
    p.className = "petal";
    p.style.left = Math.random()*100 + "vw";
    p.style.animationDuration = (5 + Math.random()*5) + "s";
    p.style.animationDelay = (Math.random()*1.5) + "s";
    p.style.setProperty("--drift", (Math.random()*220-110) + "px");
    p.style.opacity = .35 + Math.random()*.55;
    layer.appendChild(p);
    setTimeout(()=>p.remove(), 11000);
  }
}

setInterval(() => {
  if (!document.hidden && !opening.classList.contains("out")) burstPetals(2);
}, 4500);
