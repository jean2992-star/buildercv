// ===== helpers =====
const $ = (s) => document.querySelector(s);
const cvRoot = $("#cvRoot");
// helper para converter textarea em bullets por linha
Handlebars.registerHelper('splitLines', function(text) {
  if (!text) return [];
  return String(text).split(/\r?\n/).map(s => s.trim());
});

// modelos que usam foto
const TEMPLATES_WITH_PHOTO = new Set(["modelo2","modelo5", "modelo6","modelo7","modelo8"]); // adicione outros aqui quando precisar
const fotoWrap = document.getElementById("fotoWrap");
const fotoInput = document.getElementById("fotoInput");
const fotoPreview = document.getElementById("fotoPreview");
let photoDataUrl = ""; // base já redimensionada

function toggleFotoField() {
  const tpl = document.getElementById("templateSelect").value;
  const show = TEMPLATES_WITH_PHOTO.has(tpl);
  fotoWrap.style.display = show ? "block" : "none";
}

document.getElementById("templateSelect").addEventListener("change", () => {
  toggleFotoField();
  render();
});
window.addEventListener("load", toggleFotoField);

// Redimensiona para no máximo 600px no maior lado, mantendo proporção
function resizeImageToDataURL(file, maxSize = 600) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        const scale = Math.min(1, maxSize / Math.max(img.width, img.height));
        const w = Math.round(img.width * scale);
        const h = Math.round(img.height * scale);
        const canvas = document.createElement("canvas");
        canvas.width = w; canvas.height = h;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, w, h);
        // qualidade 0.9 para manter boa nitidez
        const dataUrl = canvas.toDataURL("image/jpeg", 0.9);
        resolve(dataUrl);
      };
      img.onerror = reject;
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}

fotoInput?.addEventListener("change", async (e) => {
  const file = e.target.files?.[0];
  if (!file) return;
  try {
    photoDataUrl = await resizeImageToDataURL(file, 700);
    // preview
    fotoPreview.src = photoDataUrl;
    fotoPreview.style.display = "block";
    // salva no rascunho também
    const draft = JSON.parse(localStorage.getItem("cvDraft") || "{}");
    draft.photoDataUrl = photoDataUrl;
    localStorage.setItem("cvDraft", JSON.stringify(draft));
    render();
  } catch (err) {
    alert("Não consegui processar a imagem.");
    console.error(err);
  }
});

// coleta dados do formulário (mesmo do MVP anterior)
function coletaArray(seletor, mapFn){
  return Array.from(document.querySelectorAll(seletor)).map(mapFn).filter(x =>
    Object.values(x).some(v => String(v||"").trim() !== "")
  );
}
function getData(){
  return {
    nome:   $("#nome")?.value?.trim() || "",
    titulo: $("#titulo")?.value?.trim() || "",
    email:  $("#email")?.value?.trim() || "",
    telefone: $("#telefone")?.value?.trim() || "",
    local:  $("#local")?.value?.trim() || "",
    links:  $("#links")?.value?.trim() || "",
    resumo: $("#resumo")?.value?.trim() || "",

    experiencias: coletaArray("#expList .item", el => ({
      cargo: el.querySelector(".cargo")?.value?.trim(),
      empresa: el.querySelector(".empresa")?.value?.trim(),
      inicio: el.querySelector(".inicio")?.value?.trim(),
      fim: el.querySelector(".fim")?.value?.trim(),
      descricao: el.querySelector(".descricao")?.value?.trim(),
    })),
    educacao: coletaArray("#eduList .item", el => ({
      curso: el.querySelector(".curso")?.value?.trim(),
      instituicao: el.querySelector(".instituicao")?.value?.trim(),
      inicio: el.querySelector(".inicio")?.value?.trim(),
      fim: el.querySelector(".fim")?.value?.trim(),
    })),
    projetos: coletaArray("#projList .item", el => ({
      titulo: el.querySelector(".titulo")?.value?.trim(),
      link: el.querySelector(".link")?.value?.trim(),
      descricao: el.querySelector(".descricao")?.value?.trim(),
    })),

    skills:    $("#skills")?.value?.trim() || "",
    idiomas:   $("#idiomas")?.value?.trim() || "",
    cursos:    $("#cursos")?.value?.trim() || "",
    softwares: $("#softwares")?.value?.trim() || "",
    atividades:$("#atividades")?.value?.trim() || "",
    infoExtra: $("#infoExtra")?.value?.trim() || "",

    photo: photoDataUrl || (JSON.parse(localStorage.getItem("cvDraft")||"{}").photoDataUrl || "")
  };
}


// ===== loader de template + css =====
let compiled = null;
async function loadTemplate(name){
  const [hbs, css] = await Promise.all([
    fetch(`templates/${name}.hbs`).then(r=>r.text()),
    fetch(`templates/${name}.css`).then(r=>r.text())
  ]);

  // injeta CSS do modelo
  let style = document.getElementById("tpl-style");
  if(!style){
    style = document.createElement("style");
    style.id = "tpl-style";
    document.head.appendChild(style);
  }
  style.textContent = css;

  compiled = Handlebars.compile(hbs);
}

// renderiza o modelo selecionado
async function render(){
  const sel = $("#templateSelect").value;
  if(!compiled || render.currentTpl !== sel){
    await loadTemplate(sel);
    render.currentTpl = sel;
  }
  const html = compiled(getData());
  cvRoot.innerHTML = html;
}

document.getElementById("templateSelect").addEventListener("change", render);
document.getElementById("btnPreview").addEventListener("click", render);

// PDF
// PDF (margens reduzidas + modo compacto na exportação)
// PDF — página A4 cheia (sem sobra) em todos os modelos
document.getElementById("btnPDF").addEventListener("click", async (e) => {
  e.preventDefault();
  if (typeof html2pdf === "undefined") {
    alert("html2pdf não carregou."); return;
  }

  await render();

  // ativa modo de exportação (remove bordas/raios, força largura A4)
  cvRoot.classList.add("pdf-tight");

  const opt = {
    // sem margens no PDF (A4 “cheio”)
    margin: [0, 0, 0, 0],
    filename: `curriculo-${(document.getElementById("nome").value || "meu-cv")
      .toLowerCase().replace(/\s+/g, "-")}.pdf`,
    image: { type: "jpeg", quality: 1 },
    html2canvas: {
      scale: 2,
      useCORS: true,
      backgroundColor: "#ffffff",
      scrollY: 0,               // evita incluir espaço do scroll
      windowWidth: 1240         // ajuda a fixar layout antes do render
    },
    jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    pagebreak: { mode: ["css", "legacy"] }
  };

  try {
    await html2pdf().set(opt).from(cvRoot).save();
  } finally {
    cvRoot.classList.remove("pdf-tight"); // volta ao normal no app
  }
});



// Salvar rascunho (inclui foto)
document.getElementById("btnSalvar").addEventListener("click", () => {
  const dados = getData();
  dados.photoDataUrl = photoDataUrl; // garante que a foto vai junto
  localStorage.setItem("cvDraft", JSON.stringify(dados));
  alert("Rascunho salvo.");
});

// Limpar rascunho
document.getElementById("btnLimpar").addEventListener("click", () => {
  if (confirm("Limpar tudo?")) {
    localStorage.removeItem("cvDraft");
    location.reload();
  }
});

// Restaurar rascunho ao carregar
window.addEventListener("load", () => {
  const raw = localStorage.getItem("cvDraft");
  if (raw) {
    const dados = JSON.parse(raw);

    // Restaurar campos de texto
    for (const campo in dados) {
      const el = document.querySelector(`[name="${campo}"]`);
      if (el && campo !== "photoDataUrl") {
        el.value = dados[campo];
      }
    }

    // Restaurar foto (se existir)
    if (dados.photoDataUrl) {
      photoDataUrl = dados.photoDataUrl;
      fotoPreview.src = photoDataUrl;
      fotoPreview.style.display = "block";
    }

    render();
  }
});

// botões de adicionar itens (se existirem nessa página)
$("#addExp")?.addEventListener("click", ()=>{
  const wrap = document.createElement("div"); wrap.className="item";
  wrap.innerHTML = `
    <div class="row">
      <label>Cargo <input class="cargo"></label>
      <label>Empresa <input class="empresa"></label>
    </div>
    <div class="row">
      <label>Início <input class="inicio" placeholder="01/2023"></label>
      <label>Fim <input class="fim" placeholder="Atual"></label>
    </div>
    <label>Descrição <textarea rows="3" class="descricao"></textarea></label>`;
  document.getElementById("expList").appendChild(wrap);
});
$("#addEdu")?.addEventListener("click", ()=>{
  const wrap = document.createElement("div"); wrap.className="item";
  wrap.innerHTML = `
    <div class="row">
      <label>Curso <input class="curso"></label>
      <label>Instituição <input class="instituicao"></label>
    </div>
    <div class="row">
      <label>Início <input class="inicio"></label>
      <label>Fim <input class="fim"></label>
    </div>`;
  document.getElementById("eduList").appendChild(wrap);
});
$("#addProj")?.addEventListener("click", ()=>{
  const wrap = document.createElement("div"); wrap.className="item";
  wrap.innerHTML = `
    <div class="row">
      <label>Título <input class="titulo"></label>
      <label>Link <input class="link" placeholder="https://..."></label>
    </div>
    <label>Descrição <textarea rows="2" class="descricao"></textarea></label>`;
  document.getElementById("projList").appendChild(wrap);
});

// carrega um modelo por padrão
window.addEventListener("load", render);

// quebra textarea por linha
Handlebars.registerHelper('splitLines', function (text) {
  if (!text) return [];
  return String(text).split(/\r?\n/).map(s => s.trim()).filter(Boolean);
});

// Extrai o nome do idioma antes dos dois pontos (ex.: "Inglês: B2")
Handlebars.registerHelper('langName', function (line) {
  const m = String(line).match(/^([^:]+)\s*:/i);
  return m ? m[1].trim() : line;
});

// Largura da barra a partir do nível (A1..C2, Básico/Intermediário/Avançado/Nativo)
Handlebars.registerHelper('nivelWidth', function (line) {
  const txt = String(line).toLowerCase();
  const byLevel = {
    'a1': '20%', 'a2': '35%',
    'b1': '55%', 'b2': '70%',
    'c1': '85%', 'c2': '100%',
    'básico': '35%', 'basico': '35%',
    'intermediário': '55%', 'intermediario': '55%',
    'avançado': '85%', 'avancado': '85%',
    'nativo': '100%', 'fluente': '95%'
  };
  for (const k in byLevel) if (txt.includes(k)) return byLevel[k];
  return '60%'; // default
});

// ===== Otimizador: auto-wire por data-atributos =====
// ===== Funções utilitárias =====
function STOP(text) {
  return text
    .toLowerCase()
    .replace(/[\n\r]+/g, " ")
    .replace(/[^a-záàâãéèêíïóôõöúçñ\s]/gi, "");
}

function tokenize(text) {
  return STOP(text).split(/\s+/).filter(w => w.length > 2);
}

function topKeywords(tokens, n = 10) {
  const freq = {};
  tokens.forEach(t => freq[t] = (freq[t] || 0) + 1);
  return Object.entries(freq)
    .sort((a, b) => b[1] - a[1])
    .slice(0, n)
    .map(([word, count]) => ({ word, count }));
}

function getCvPlain() {
  const cvRoot = document.querySelector(".cv-root");
  return cvRoot ? cvRoot.innerText : "";
}

function analyzeATS(jobDesc) {
  const cvText = getCvPlain();
  const jobTokens = tokenize(jobDesc);
  const cvTokens = tokenize(cvText);

  const jobWords = [...new Set(jobTokens)];
  const cvWords = [...new Set(cvTokens)];

  const matched = jobWords.filter(w => cvWords.includes(w));
  const missing = jobWords.filter(w => !cvWords.includes(w));

  const score = Math.round((matched.length / jobWords.length) * 100);

  return {
    score,
    matched: matched.sort(),
    missing: missing.sort(),
    topJob: topKeywords(jobTokens, 10),
    topCv: topKeywords(cvTokens, 10)
  };
}

function renderATS(outEl, res) {
  outEl.innerHTML = `
    <div class="ats-box">
      <h3>Compatibilidade: ${res.score}%</h3>
      <p><strong>Palavras-chave encontradas:</strong> ${res.matched.join(", ") || "Nenhuma"}</p>
      <p><strong>Palavras-chave ausentes:</strong> ${res.missing.join(", ") || "Nenhuma"}</p>
      <h4>Principais palavras da vaga:</h4>
      <ul>${res.topJob.map(k => `<li>${k.word} (${k.count})</li>`).join("")}</ul>
      <h4>Principais palavras do CV:</h4>
      <ul>${res.topCv.map(k => `<li>${k.word} (${k.count})</li>`).join("")}</ul>
    </div>
  `;
}

// ===== Inicialização =====
(function initATS() {
  const desc = document.querySelector('[data-ats="desc"]');
  const btn = document.querySelector('[data-ats="btn"]');
  const out = document.querySelector('[data-ats="out"]');

  if (!desc || !btn || !out) {
    console.warn("ATS: Elementos não encontrados.");
    return;
  }

  btn.addEventListener("click", function () {
    const txt = desc.value.trim();
    if (txt.length < 40) {
      out.innerHTML = `<div class="ats-box">Cole a descrição completa da vaga para analisar.</div>`;
      return;
    }
    const res = analyzeATS(txt);
    renderATS(out, res);
  });
})();
