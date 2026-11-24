// AI Evolution & Large Language Models - Interactive Technical Experience
// Design and interactivity inspired by Company Review (Nexora Zoho Ecosystem)

document.addEventListener("DOMContentLoaded", () => {
  initNavScrollSpy();
  initMobileNav();
  initSlideViewer();
  initHeroHierarchy();
  initTimeline();
  initMLClassifier();
  initNeuronSimulator();
  initTrainingSimulator();
  initPolysemyInspector();
  initAttentionVisualizer();
  initLiveTokenizer();
});

// 1. Navigation Scroll Spy & Smooth Scrolling
function initNavScrollSpy() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  window.addEventListener("scroll", () => {
    let current = "";
    const scrollPosition = window.pageYOffset + 140;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach(link => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  });
}

// 2. Mobile Navigation Toggle
function initMobileNav() {
  const toggleBtn = document.querySelector(".mobile-nav-toggle");
  const navMenu = document.querySelector(".nav-menu");

  if (toggleBtn && navMenu) {
    toggleBtn.addEventListener("click", () => {
      const isOpen = navMenu.style.display === "flex";
      navMenu.style.display = isOpen ? "none" : "flex";
      if (!isOpen) {
        navMenu.style.flexDirection = "column";
        navMenu.style.position = "absolute";
        navMenu.style.top = "72px";
        navMenu.style.left = "0";
        navMenu.style.width = "100%";
        navMenu.style.background = "#0a172f";
        navMenu.style.padding = "20px";
        navMenu.style.borderBottom = "1px solid rgba(255, 255, 255, 0.1)";
        navMenu.style.gap = "14px";
      }
    });

    navMenu.querySelectorAll(".nav-link").forEach(link => {
      link.addEventListener("click", () => {
        if (window.innerWidth <= 1040) {
          navMenu.style.display = "none";
        }
      });
    });
  }
}

// 3. Slide Deck Presentation Viewer Modal (12 Slides)
let currentSlide = 1;
const totalSlides = 12;

function initSlideViewer() {
  const modal = document.getElementById("slideModal");
  const openBtns = document.querySelectorAll(".open-slide-modal");
  const closeBtn = document.querySelector(".modal-close-btn");
  const prevBtn = document.getElementById("slidePrev");
  const nextBtn = document.getElementById("slideNext");
  const mainImg = document.getElementById("slideViewerImg");
  const counter = document.getElementById("slideCounter");
  const thumbsContainer = document.getElementById("slideThumbs");

  if (!modal) return;

  // Build 12 thumbnails
  if (thumbsContainer) {
    thumbsContainer.innerHTML = "";
    for (let i = 1; i <= totalSlides; i++) {
      const thumb = document.createElement("div");
      thumb.className = `thumb-item ${i === 1 ? "active" : ""}`;
      thumb.setAttribute("data-slide", i);
      thumb.innerHTML = `<img src="pdf_slides/slide_${i}.png" alt="Slide ${i}" class="thumb-img" loading="lazy" />`;
      thumb.addEventListener("click", () => {
        goToSlide(i);
      });
      thumbsContainer.appendChild(thumb);
    }
  }

  function updateSlideUI() {
    if (mainImg) mainImg.src = `pdf_slides/slide_${currentSlide}.png`;
    if (counter) counter.textContent = `Slide ${currentSlide} of ${totalSlides}`;

    document.querySelectorAll(".thumb-item").forEach(t => {
      const s = parseInt(t.getAttribute("data-slide"), 10);
      if (s === currentSlide) {
        t.classList.add("active");
        t.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
      } else {
        t.classList.remove("active");
      }
    });
  }

  function goToSlide(n) {
    if (n < 1) currentSlide = totalSlides;
    else if (n > totalSlides) currentSlide = 1;
    else currentSlide = n;
    updateSlideUI();
  }

  openBtns.forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const targetSlide = parseInt(btn.getAttribute("data-slide-target") || "1", 10);
      currentSlide = targetSlide;
      updateSlideUI();
      modal.classList.add("active");
      document.body.style.overflow = "hidden";
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      modal.classList.remove("active");
      document.body.style.overflow = "auto";
    });
  }

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("active");
      document.body.style.overflow = "auto";
    }
  });

  if (prevBtn) prevBtn.addEventListener("click", () => goToSlide(currentSlide - 1));
  if (nextBtn) nextBtn.addEventListener("click", () => goToSlide(currentSlide + 1));

  window.addEventListener("keydown", (e) => {
    if (!modal.classList.contains("active")) return;
    if (e.key === "ArrowLeft") goToSlide(currentSlide - 1);
    if (e.key === "ArrowRight") goToSlide(currentSlide + 1);
    if (e.key === "Escape") {
      modal.classList.remove("active");
      document.body.style.overflow = "auto";
    }
  });
}

// 4. Hero 4-Tier Hierarchy Interaction
function initHeroHierarchy() {
  const layers = document.querySelectorAll(".h-layer");
  const detailEl = document.getElementById("heroLayerDetail");

  const tierDetails = {
    "1": "<strong>Artificial Intelligence (1950s)</strong>: Broad computational systems engineered to perform complex tasks traditionally requiring human cognitive intelligence, from symbolic reasoning to autonomous perception.",
    "2": "<strong>Machine Learning (1990s)</strong>: Computational paradigm where algorithms learn statistical representations and predictive patterns directly from training examples without hand-coded procedural rules.",
    "3": "<strong>Deep Learning (2010s)</strong>: Specialized subset of ML utilizing layered neural networks with many hidden representation layers to extract hierarchical abstractions from massive raw inputs.",
    "4": "<strong>Large Language Models (2020s+)</strong>: Massive Transformer-based deep networks trained on multi-terabyte internet corpora, scaling billions of parameters for emergent reasoning and generation."
  };

  layers.forEach(layer => {
    layer.addEventListener("click", () => {
      layers.forEach(l => l.classList.remove("active"));
      layer.classList.add("active");
      const tier = layer.getAttribute("data-tier");
      if (detailEl && tierDetails[tier]) {
        detailEl.innerHTML = tierDetails[tier];
      }
    });
  });
}

// 5. AI Evolution Timeline
function initTimeline() {
  const nodes = document.querySelectorAll(".timeline-node");
  const yearEl = document.getElementById("tYearDisplay");
  const titleEl = document.getElementById("tTitleDisplay");
  const descEl = document.getElementById("tDescDisplay");

  const timelineData = {
    "1950": { title: "Turing's Landmark Work", desc: "Alan Turing proposes the Turing Test and the seminal question 'Can machines think?' in his paper 'Computing Machinery and Intelligence'." },
    "1956": { title: "Dartmouth Summer Workshop", desc: "John McCarthy, Marvin Minsky, Nathaniel Rochester, and Claude Shannon coin the term 'Artificial Intelligence', founding the formal field." },
    "1970s": { title: "Expert Systems & Knowledge Bases", desc: "Rule-based expert systems (MYCIN, DENDRAL) encode domain knowledge via deterministic if-then production rules; first AI Winter occurs when scaling stalls." },
    "1990s": { title: "Statistical Machine Learning", desc: "Data-driven statistical approaches (SVMs, Naive Bayes, Decision Trees) supersede purely symbolic logic, proving effective in spam detection and speech recognition." },
    "2010s": { title: "Deep Learning Renaissance", desc: "GPU acceleration and massive datasets (ImageNet) power deep convolutional networks (AlexNet), outperforming human benchmarks in vision." },
    "2017": { title: "Transformers & Attention Mechanism", desc: "Vaswani et al. publish 'Attention Is All You Need', introducing self-attention and replacing recurrence, establishing the bedrock for modern LLMs." },
    "2022+": { title: "Generative AI & LLM Frontier", desc: "Frontier Foundation Models (GPT-4, Gemini, Claude, Llama) demonstrate multi-modal reasoning, coding capability, and zero-shot problem solving." }
  };

  nodes.forEach(node => {
    node.addEventListener("click", () => {
      nodes.forEach(n => n.classList.remove("active"));
      node.classList.add("active");
      const year = node.getAttribute("data-year");
      if (timelineData[year]) {
        if (yearEl) yearEl.textContent = year;
        if (titleEl) titleEl.textContent = timelineData[year].title;
        if (descEl) descEl.textContent = timelineData[year].desc;
      }
    });
  });
}

// 6. Machine Learning Classifier Playground (Cat vs Dog)
function initMLClassifier() {
  const sampleBtns = document.querySelectorAll(".ml-sample-btn");
  const imgEl = document.getElementById("mlSampleImg");
  const predLabel = document.getElementById("mlPredLabel");
  const predConfidence = document.getElementById("mlPredConfidence");
  const catBar = document.getElementById("mlCatBar");
  const dogBar = document.getElementById("mlDogBar");

  const samples = {
    cat: { label: "Domestic Cat (Felis catus)", catConf: 96, dogConf: 4, icon: "🐱" },
    dog: { label: "Golden Retriever (Canis lupus)", catConf: 3, dogConf: 97, icon: "🐶" },
    ambiguous: { label: "Fluffy Pet (High Occlusion)", catConf: 58, dogConf: 42, icon: "🐾" }
  };

  sampleBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      sampleBtns.forEach(b => b.classList.remove("btn-primary"));
      btn.classList.add("btn-primary");
      const type = btn.getAttribute("data-sample");
      const data = samples[type];

      if (predLabel) predLabel.textContent = data.label;
      if (predConfidence) predConfidence.textContent = `${Math.max(data.catConf, data.dogConf)}% Confidence`;
      if (catBar) catBar.style.width = `${data.catConf}%`;
      if (dogBar) dogBar.style.width = `${data.dogConf}%`;
      if (imgEl) imgEl.textContent = data.icon;
    });
  });
}

// 7. Single Neuron Math Simulator
function initNeuronSimulator() {
  const x1Slider = document.getElementById("sliderX1");
  const x2Slider = document.getElementById("sliderX2");
  const w1Slider = document.getElementById("sliderW1");
  const w2Slider = document.getElementById("sliderW2");
  const biasSlider = document.getElementById("sliderBias");
  const actSelect = document.getElementById("actFunctionSelect");

  const valX1 = document.getElementById("valX1");
  const valX2 = document.getElementById("valX2");
  const valW1 = document.getElementById("valW1");
  const valW2 = document.getElementById("valW2");
  const valBias = document.getElementById("valBias");
  
  const zDisplay = document.getElementById("zFormulaDisplay");
  const outDisplay = document.getElementById("neuronOutputDisplay");

  function recalculate() {
    if (!x1Slider) return;
    const x1 = parseFloat(x1Slider.value);
    const x2 = parseFloat(x2Slider.value);
    const w1 = parseFloat(w1Slider.value);
    const w2 = parseFloat(w2Slider.value);
    const b = parseFloat(biasSlider.value);
    const act = actSelect ? actSelect.value : "relu";

    if (valX1) valX1.textContent = x1.toFixed(2);
    if (valX2) valX2.textContent = x2.toFixed(2);
    if (valW1) valW1.textContent = w1.toFixed(2);
    if (valW2) valW2.textContent = w2.toFixed(2);
    if (valBias) valBias.textContent = b.toFixed(2);

    const z = (x1 * w1) + (x2 * w2) + b;
    let activated = 0;
    if (act === "relu") {
      activated = Math.max(0, z);
    } else if (act === "sigmoid") {
      activated = 1 / (1 + Math.exp(-z));
    } else {
      activated = Math.tanh(z);
    }

    if (zDisplay) {
      zDisplay.textContent = `z = (${x1} × ${w1}) + (${x2} × ${w2}) + (${b}) = ${z.toFixed(3)}`;
    }
    if (outDisplay) {
      outDisplay.textContent = activated.toFixed(3);
    }
  }

  [x1Slider, x2Slider, w1Slider, w2Slider, biasSlider, actSelect].forEach(el => {
    if (el) el.addEventListener("input", recalculate);
  });
}

// 8. Closed-Loop Training Simulation (Loss & Optimizer)
function initTrainingSimulator() {
  const trainBtn = document.getElementById("btnTrainStep");
  const resetBtn = document.getElementById("btnTrainReset");
  const epochEl = document.getElementById("simEpochVal");
  const lossEl = document.getElementById("simLossVal");
  const gradEl = document.getElementById("simGradVal");
  const weightEl = document.getElementById("simWeightVal");
  const lossFill = document.getElementById("simLossFill");
  const stepStatus = document.getElementById("simStepStatus");

  let epoch = 0;
  let loss = 2.450;
  let weight = 0.150;
  let grad = -0.480;

  if (trainBtn) {
    trainBtn.addEventListener("click", () => {
      epoch += 1;
      // Exponential decay toward optimal minimum
      loss = Math.max(0.045, loss * 0.62 + (Math.random() * 0.02 - 0.01));
      grad = grad * 0.58;
      weight += 0.18 * Math.exp(-epoch * 0.4);

      if (epochEl) epochEl.textContent = `Epoch ${epoch}`;
      if (lossEl) lossEl.textContent = loss.toFixed(4);
      if (gradEl) gradEl.textContent = grad.toFixed(4);
      if (weightEl) weightEl.textContent = weight.toFixed(4);

      const percent = Math.min(100, (loss / 2.5) * 100);
      if (lossFill) lossFill.style.width = `${percent}%`;

      if (stepStatus) {
        stepStatus.innerHTML = `<strong>Cycle ${epoch} Complete</strong>: Backpropagation computed error gradient <code>∇L=${grad.toFixed(3)}</code>; Adam optimizer updated parameters. Loss decreased to <code>${loss.toFixed(4)}</code>.`;
      }
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      epoch = 0;
      loss = 2.450;
      weight = 0.150;
      grad = -0.480;
      if (epochEl) epochEl.textContent = "Epoch 0 (Untrained)";
      if (lossEl) lossEl.textContent = "2.4500";
      if (gradEl) gradEl.textContent = "-0.4800";
      if (weightEl) weightEl.textContent = "0.1500";
      if (lossFill) lossFill.style.width = "98%";
      if (stepStatus) stepStatus.textContent = "Model weights randomized. Click 'Run Training Iteration' to perform Forward Prop, Loss computation, Backpropagation, and Parameter Update.";
    });
  }
}

// 9. Polysemy Context Inspector (Slide 7)
function initPolysemyInspector() {
  const polyBoxes = document.querySelectorAll(".poly-box");
  const explanationEl = document.getElementById("polyExplanation");

  const explanations = {
    "finance": "<strong>Contextual Vector Focus: Financial Institution</strong><br/>Surrounding semantic tokens <em>'deposited'</em> and <em>'money'</em> shift the high-dimensional embedding of <code>bank</code> toward commercial banking, vaults, interest rates, and financial accounts.",
    "geography": "<strong>Contextual Vector Focus: River Shoreline</strong><br/>Surrounding contextual tokens <em>'sat'</em>, <em>'near'</em>, and <em>'river'</em> shift the embedding vector of <code>bank</code> entirely toward fluvial geography, sloping soil, water edges, and natural landscapes."
  };

  polyBoxes.forEach(box => {
    box.addEventListener("click", () => {
      polyBoxes.forEach(b => b.classList.remove("active"));
      box.classList.add("active");
      const ctx = box.getAttribute("data-context");
      if (explanationEl && explanations[ctx]) {
        explanationEl.innerHTML = explanations[ctx];
      }
    });
  });
}

// 10. Attention Mechanism Visualizer (Slide 9)
function initAttentionVisualizer() {
  const tokens = document.querySelectorAll(".attention-token");
  const sentenceVariantBtns = document.querySelectorAll(".att-variant-btn");
  const attDesc = document.getElementById("attDetailText");

  sentenceVariantBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      sentenceVariantBtns.forEach(b => b.classList.remove("btn-primary"));
      btn.classList.add("btn-primary");
      const variant = btn.getAttribute("data-variant");

      const itToken = document.querySelector(".attention-token[data-word='it']");
      const animalToken = document.querySelector(".attention-token[data-word='animal']");
      const roadToken = document.querySelector(".attention-token[data-word='road']");
      const lastToken = document.getElementById("attLastWord");

      if (variant === "tired") {
        if (lastToken) lastToken.textContent = "tired";
        tokens.forEach(t => t.classList.remove("selected", "related"));
        if (itToken) itToken.classList.add("selected");
        if (animalToken) animalToken.classList.add("related");
        if (attDesc) {
          attDesc.innerHTML = "<strong>Attention Focus: 'it' ➔ 'animal' (Weight: 0.91)</strong><br/>Because the qualifying predicate is <em>'tired'</em> (a biological state), the self-attention layer allocates 91% attention weight linking the pronoun <strong>'it'</strong> to <strong>'animal'</strong>.";
        }
      } else {
        if (lastToken) lastToken.textContent = "wide";
        tokens.forEach(t => t.classList.remove("selected", "related"));
        if (itToken) itToken.classList.add("selected");
        if (roadToken) roadToken.classList.add("related");
        if (attDesc) {
          attDesc.innerHTML = "<strong>Attention Focus: 'it' ➔ 'road' (Weight: 0.94)</strong><br/>Because the predicate changes to <em>'too wide'</em> (a spatial physical property), self-attention weights automatically rewire: <strong>'it'</strong> resolves to <strong>'road'</strong> with 94% confidence.";
        }
      }
    });
  });
}

// 11. Live Tokenizer (Slide 11)
function initLiveTokenizer() {
  const inputEl = document.getElementById("tokenizerInput");
  const outputEl = document.getElementById("tokenizerOutput");
  const tokenCountEl = document.getElementById("tokenCountBadge");
  const charCountEl = document.getElementById("charCountBadge");
  const presetBtns = document.querySelectorAll(".tokenizer-preset-btn");

  const colorPalettes = [
    { bg: "#e0f2fe", color: "#0369a1", border: "#bae6fd" },
    { bg: "#ede9fe", color: "#6d28d9", border: "#ddd6fe" },
    { bg: "#dcfce7", color: "#15803d", border: "#bbf7d0" },
    { bg: "#fef3c7", color: "#b45309", border: "#fde68a" },
    { bg: "#fee2e2", color: "#b91c1c", border: "#fecaca" },
    { bg: "#f3e8ff", color: "#7e22ce", border: "#e9d5ff" },
    { bg: "#cffafe", color: "#0e7490", border: "#a5f3fc" }
  ];

  function tokenizeText(text) {
    if (!text.trim()) {
      if (outputEl) outputEl.innerHTML = '<span style="color: var(--text-muted); font-size: 13.5px;">Type above to inspect subword tokens...</span>';
      if (tokenCountEl) tokenCountEl.textContent = "0 tokens";
      if (charCountEl) charCountEl.textContent = "0 chars";
      return;
    }

    // Realistic subword heuristic simulator
    const rawTokens = [];
    const words = text.match(/\S+|\s+/g) || [];

    words.forEach(chunk => {
      if (/^\s+$/.test(chunk)) {
        // whitespace combined with next token in BPE
        return;
      }
      // Subword segmentation logic
      if (chunk.length > 8) {
        rawTokens.push(chunk.slice(0, 5));
        rawTokens.push(chunk.slice(5));
      } else {
        // separate punctuation
        const punctMatch = chunk.match(/^(\w+)([!?,.:;]+)$/);
        if (punctMatch) {
          rawTokens.push(punctMatch[1]);
          rawTokens.push(punctMatch[2]);
        } else {
          rawTokens.push(chunk);
        }
      }
    });

    if (outputEl) {
      outputEl.innerHTML = "";
      rawTokens.forEach((t, i) => {
        const p = colorPalettes[i % colorPalettes.length];
        const span = document.createElement("span");
        span.className = "token-pill";
        span.style.backgroundColor = p.bg;
        span.style.color = p.color;
        span.style.borderColor = p.border;
        span.innerHTML = `${escapeHtml(t)} <span class="token-pill-num">#${i + 1}</span>`;
        outputEl.appendChild(span);
      });
    }

    if (tokenCountEl) tokenCountEl.textContent = `${rawTokens.length} tokens`;
    if (charCountEl) charCountEl.textContent = `${text.length} chars`;
  }

  function escapeHtml(str) {
    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  if (inputEl) {
    inputEl.addEventListener("input", (e) => tokenizeText(e.target.value));
    tokenizeText(inputEl.value);
  }

  presetBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const txt = btn.getAttribute("data-text");
      if (inputEl) {
        inputEl.value = txt;
        tokenizeText(txt);
      }
    });
  });
}


