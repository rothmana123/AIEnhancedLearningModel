const architectureData = {
  program: [
    {
      id: 1,
      title: "Course Architecture",
      subtitle: "What AI helps you do: Structure the course coherently",
      blocks: [
        {
          title: "AI Course Mapping",
          bullets: ["Input: syllabus, rough materials", "Output: modules, sessions, outcomes, objectives"],
        },
        {
          title: "Outcome Alignment Engine",
          bullets: ["Aligns: objectives ↔ activities ↔ assessments"],
        },
        {
          title: "Content Gap Analysis",
          bullets: ['"What\'s missing / unclear?"'],
        },
      ],
    },
    {
      id: 2,
      title: "Content & Explanation",
      subtitle: "What AI helps you do: Produce clear, teachable materials",
      blocks: [
        {
          title: "Concept Decomposition",
          bullets: ["Break vague topics → teachable chunks"],
        },
        {
          title: "Instructional Slide Generation",
          bullets: ["10–15 slide structured decks"],
        },
        {
          title: "Explanation Refinement",
          bullets: ["Simplify, clarify, scaffold (especially for novices)"],
        },
      ],
    },
    {
      id: 3,
      title: "Active Learning Design",
      subtitle: "What AI helps you do: Turn content into doing",
      blocks: [
        {
          title: "Activity Generation",
          bullets: ["Pseudocode challenges, build tasks, case prompts"],
        },
        {
          title: "Scaffolded Practice Design",
          bullets: ['"I do → we do → you do" structures'],
        },
        {
          title: "Contextualization Engine",
          bullets: ["Real-world examples (APIs, apps, etc.)"],
        },
      ],
    },
    {
      id: 4,
      title: "Reinforcement Layer",
      subtitle: "What AI helps you do: Make learning stick",
      blocks: [
        {
          title: "Reinforcement Material Generation",
          bullets: ["Slide summaries, videos (NotebookLM), quick reviews"],
        },
        {
          title: "Retrieval Practice Design",
          bullets: ["Auto-generated quizzes tied to concepts"],
        },
        {
          title: "Spaced Review Assets",
          bullets: ["Revisit concepts after initial exposure"],
        },
      ],
    },
    {
      id: 5,
      title: "AI Learning Support",
      subtitle: "What AI helps you do: Extend support beyond class",
      blocks: [
        {
          title: "Review Chatbots",
          bullets: ["Trained on course materials"],
        },
        {
          title: "On-Demand Explanation",
          bullets: ["Students ask questions anytime"],
        },
        {
          title: "Guided Problem Solving",
          bullets: ["AI walks students through thinking (not just answers)"],
        },
      ],
    },
    {
      id: 6,
      title: "Assessment & Feedback",
      subtitle: "What AI helps you do: Close the loop",
      blocks: [
        {
          title: "Assessment Generation",
          bullets: ["MCQs, short answer, code reading"],
        },
        {
          title: "Feedback Assistance",
          bullets: ["Drafting targeted feedback"],
        },
        {
          title: "Iteration Loops",
          bullets: ["Students revise based on feedback"],
        },
      ],
    },
  ],
  implementation: [],
  evaluation: [],
};

function createChevron() {
  return `
    <svg class="chevron" viewBox="0 0 24 24" aria-hidden="true">
      <path fill="currentColor" d="M7.41 8.59 12 13.17l4.59-4.58L18 10l-6 6-6-6z"></path>
    </svg>
  `;
}

function renderColumn(columnKey, mountId) {
  const mount = document.getElementById(mountId);
  const items = architectureData[columnKey];

  if (!items || items.length === 0) {
    mount.innerHTML = "";
    return;
  }

  mount.innerHTML = items
    .map(
      (item) => `
      <article class="card" data-card="${columnKey}-${item.id}">
        <button type="button" aria-expanded="false">
          <span class="card-head">
            <span class="card-number">${item.id}</span>
            <span class="card-title-wrap">
              <span class="card-title">${item.title}</span>
            </span>
          </span>
          ${createChevron()}
        </button>
        <div class="card-content" aria-hidden="true">
          <div class="card-content-inner">
            <p class="card-subtitle">${item.subtitle}</p>
            ${item.blocks
              .map(
                (block) => `
                  <div class="mini-panel">
                    <h3>${block.title}</h3>
                    <ul>
                      ${block.bullets.map((bullet) => `<li>${bullet}</li>`).join("")}
                    </ul>
                  </div>
                `
              )
              .join("")}
          </div>
        </div>
      </article>
    `
    )
    .join("");

  mount.querySelectorAll(".card").forEach((card) => {
    const btn = card.querySelector("button");
    const content = card.querySelector(".card-content");
    btn.addEventListener("click", () => {
      const expanded = card.classList.toggle("is-open");
      btn.setAttribute("aria-expanded", String(expanded));
      content.setAttribute("aria-hidden", String(!expanded));
      if (expanded) {
        content.style.maxHeight = content.scrollHeight + "px";
      } else {
        content.style.maxHeight = "0px";
      }
    });
  });
}

function setActiveTab(tabKey) {
  document.querySelectorAll(".tab").forEach((btn) => {
    const isActive = btn.dataset.target === tabKey;
    btn.classList.toggle("is-active", isActive);
    btn.setAttribute("aria-selected", String(isActive));
  });

  document.querySelectorAll(".column-title").forEach((title) => {
    const column = title.closest(".column");
    const active = column?.dataset.column === tabKey;
    title.classList.toggle("is-active", active);
  });
}

renderColumn("program", "program-cards");
setActiveTab("program");

document.querySelectorAll(".tab").forEach((btn) => {
  btn.addEventListener("click", () => {
    setActiveTab(btn.dataset.target);
  });
});
