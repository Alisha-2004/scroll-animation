gsap.registerPlugin(ScrollTrigger);

const storyContainer = document.getElementById("storyContainer");
const startBtn = document.getElementById("startBtn");
const genreDropdown = document.getElementById("genreDropdown");

// Generate placeholder chapter text
function makeChapterText(sceneNum, genre) {
  const lines = {
    adventure: [
      "The sun lit the horizon with golden rays.",
      "A winding path beckoned our hero forward.",
      "The river's rush whispered of distant lands.",
      "Footprints in the mud told of someone ahead.",
      "The air smelled of pine and freedom."
    ],
    mystery: [
      "A creak echoed in the silent hallway.",
      "The candle flickered, casting strange shadows.",
      "Footsteps stopped just outside the door.",
      "An old book revealed a hidden note.",
      "A locked drawer seemed oddly warm to touch."
    ],
    "sci-fi": [
      "The stars shimmered like scattered diamonds.",
      "The control panel beeped in rhythmic patterns.",
      "A wormhole pulsed ahead, swirling in colors.",
      "The airlock hissed as it slowly opened.",
      "Alien glyphs glowed faintly on the walls."
    ]
  };

  return `${lines[genre][sceneNum % lines[genre].length]} Scene #${sceneNum + 1} unfolds with intrigue.`;
}

// Generate 50 chapters dynamically
function makeLongStory(genre) {
  let chapters = [];
  for (let i = 0; i < 50; i++) {
    chapters.push({
      title: `Chapter ${i + 1}`,
      text: makeChapterText(i, genre),
      img: `https://picsum.photos/800/500?random=${genre.charCodeAt(0) + i}`
    });
  }
  return chapters;
}

// Load selected story
startBtn.addEventListener("click", () => {
  const genre = genreDropdown.value;
  if (!genre) {
    alert("Please select a genre!");
    return;
  }

  storyContainer.innerHTML = ""; // Clear old story

  // Generate story sections
  const chapters = makeLongStory(genre);
  chapters.forEach((chapter) => {
    const section = document.createElement("section");
    section.classList.add("panel", "chapter");
    section.innerHTML = `
      <div class="content">
        <h2>${chapter.title}</h2>
        <p>${chapter.text}</p>
        <img src="${chapter.img}" alt="Chapter Image">
      </div>
    `;
    storyContainer.appendChild(section);
  });

  applyAnimations();
  window.scrollTo({ top: document.querySelector(".genre-select").offsetHeight, behavior: "smooth" });
});

// Apply GSAP animations to new content
function applyAnimations() {
  gsap.utils.toArray(".chapter").forEach((section) => {
    gsap.from(section.querySelector("h2"), {
      y: 50,
      opacity: 0,
      duration: 0.8,
      scrollTrigger: {
        trigger: section,
        start: "top 85%",
        toggleActions: "play none none reverse"
      }
    });

    gsap.from(section.querySelector("p"), {
      y: 30,
      opacity: 0,
      duration: 0.8,
      delay: 0.1,
      scrollTrigger: {
        trigger: section,
        start: "top 85%",
        toggleActions: "play none none reverse"
      }
    });

    gsap.from(section.querySelector("img"), {
      scale: 0.9,
      opacity: 0,
      duration: 0.8,
      delay: 0.2,
      scrollTrigger: {
        trigger: section,
        start: "top 85%",
        toggleActions: "play none none reverse"
      }
    });
  });
}
