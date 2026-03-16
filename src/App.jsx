import React, { useMemo, useRef, useState } from "react";
import {
  Download,
  FileText,
  Plus,
  Trash2,
  Sparkles,
  Briefcase,
  GraduationCap,
  Languages,
  User,
  Palette,
} from "lucide-react";
import { motion } from "framer-motion";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import "./App.css";

const defaultData = {
  nome: "Seu Nome Completo",
  cargo: "Cargo Desejado",
  email: "seuemail@exemplo.com",
  telefone: "(11) 99999-9999",
  cidade: "São Paulo",
  estado: "SP",
  endereco: "Rua Exemplo, 123",
  linkedin: "linkedin.com/in/seuperfil",
  resumo:
    "Profissional organizado, com experiência em rotinas administrativas, atendimento, processos internos e foco em resultados. Capacidade de adaptação, boa comunicação e atenção aos detalhes.",
  habilidades: [
    { nome: "Pacote Office", nivel: "Avançado" },
    { nome: "Atendimento ao Cliente", nivel: "Avançado" },
    { nome: "Organização", nivel: "Especialista" },
    { nome: "Comunicação", nivel: "Avançado" },
  ],
  idiomas: [
    { nome: "Português", nivel: "Nativo" },
    { nome: "Inglês", nivel: "Intermediário" },
  ],
  experiencias: [
    {
      cargo: "Assistente Administrativo",
      empresa: "Empresa Exemplo",
      local: "São Paulo, SP",
      inicio: "Jan 2021",
      fim: "Atual",
      atividades:
        "Apoio à gestão administrativa\nOrganização de agendas\nControle de documentos\nAtendimento a clientes\nSuporte às rotinas internas da empresa",
    },
  ],
  formacoes: [
    {
      curso: "Tecnólogo em Gestão Empresarial",
      instituicao: "Faculdade Exemplo",
      local: "São Paulo",
      inicio: "2018",
      fim: "2020",
      detalhes:
        "Conclusão com foco em gestão, processos e comunicação organizacional.",
    },
  ],
  cursos: [
    {
      nome: "Excel Completo",
      instituicao: "Escola Profissionalizante",
      periodo: "2023",
      local: "Online",
    },
  ],
  referencias: [
    {
      nome: "Maria Souza",
      empresa: "Empresa Exemplo",
      contato: "maria@empresa.com • (11) 98888-7777",
    },
  ],
};

const templates = [
  { id: "classic", nome: "Clássico Executivo" },
  { id: "elegant", nome: "Elegante Azul" },
  { id: "modern", nome: "Moderno Verde" },
  { id: "minimal", nome: "Minimalista Profissional" },
];

function updateListItem(setData, key, index, field, value) {
  setData((prev) => ({
    ...prev,
    [key]: prev[key].map((item, i) =>
      i === index ? { ...item, [field]: value } : item
    ),
  }));
}

function addListItem(setData, key, item) {
  setData((prev) => ({
    ...prev,
    [key]: [...prev[key], item],
  }));
}

function removeListItem(setData, key, index) {
  setData((prev) => ({
    ...prev,
    [key]: prev[key].filter((_, i) => i !== index),
  }));
}

async function exportToPDF(element, fileName) {
  if (!element) return;

  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    backgroundColor: "#ffffff",
  });

  const imgData = canvas.toDataURL("image/png");
  const pdf = new jsPDF({ orientation: "p", unit: "mm", format: "a4" });

  const pageWidth = 210;
  const pageHeight = 297;
  const imgWidth = pageWidth;
  const imgHeight = (canvas.height * imgWidth) / canvas.width;

  let heightLeft = imgHeight;
  let position = 0;

  pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
  heightLeft -= pageHeight;

  while (heightLeft > 0) {
    position = heightLeft - imgHeight;
    pdf.addPage();
    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;
  }

  pdf.save(fileName);
}

function FormSection({ title, icon, children }) {
  return (
    <div className="form-card">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          marginBottom: 18,
        }}
      >
        {icon}
        <h3 style={{ fontSize: 20, fontWeight: 700 }}>{title}</h3>
      </div>
      {children}
    </div>
  );
}

function TextInput({ label, value, onChange, placeholder = "" }) {
  return (
    <div className="form-group">
      <label>{label}</label>
      <input value={value} onChange={onChange} placeholder={placeholder} />
    </div>
  );
}

function TextAreaInput({ label, value, onChange, rows = 4 }) {
  return (
    <div className="form-group">
      <label>{label}</label>
      <textarea rows={rows} value={value} onChange={onChange} />
    </div>
  );
}

function SelectInput({ label, value, onChange, options }) {
  return (
    <div className="form-group">
      <label>{label}</label>
      <select value={value} onChange={onChange}>
        {options.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
}

function ItemBox({ title, onRemove, children }) {
  return (
    <div
      style={{
        border: "1px solid #d9d9d9",
        borderRadius: 12,
        padding: 16,
        marginBottom: 14,
        background: "#fff",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 14,
        }}
      >
        <strong>{title}</strong>
        <button
          type="button"
          className="button"
          style={{
            background: "#f3f4f6",
            color: "#222",
            padding: "8px 12px",
            marginTop: 0,
          }}
          onClick={onRemove}
        >
          <Trash2 size={16} />
        </button>
      </div>
      {children}
    </div>
  );
}

function ClassicTemplate({ data }) {
  return (
    <div
      className="cv-page"
      style={{
        fontFamily: "Georgia, 'Times New Roman', serif",
        color: "#222",
        padding: 48,
      }}
    >
      <div
        style={{
          borderTop: "4px solid #777",
          borderBottom: "1px solid #aaa",
          textAlign: "center",
          paddingTop: 14,
          paddingBottom: 10,
        }}
      >
        <p style={{ fontSize: 13, textTransform: "uppercase", letterSpacing: 1 }}>
          {data.cidade}, {data.estado} • {data.email} • {data.telefone}
        </p>
        <h1
          style={{
            fontSize: 42,
            fontWeight: 900,
            textTransform: "uppercase",
            marginTop: 12,
          }}
        >
          {data.nome}
        </h1>
        <p style={{ fontStyle: "italic", marginTop: 8, fontSize: 18 }}>
          {data.cargo}
        </p>
      </div>

      <CvBlockTitle>Resumo Profissional</CvBlockTitle>
      <p style={{ fontSize: 17, lineHeight: 1.8 }}>{data.resumo}</p>

      <CvBlockTitle>Experiência Profissional</CvBlockTitle>
      <div style={{ display: "grid", gap: 24 }}>
        {data.experiencias.map((exp, index) => (
          <div key={index}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: 16,
              }}
            >
              <div>
                <h4 style={{ fontSize: 24, fontWeight: 700 }}>{exp.cargo}</h4>
                <p style={{ fontStyle: "italic", fontSize: 20 }}>{exp.empresa}</p>
              </div>
              <div style={{ textAlign: "right" }}>
                <p style={{ fontWeight: 700, fontSize: 18 }}>
                  {exp.inicio} — {exp.fim}
                </p>
                <p>{exp.local}</p>
              </div>
            </div>
            <ul style={{ marginTop: 12, paddingLeft: 24, lineHeight: 1.8 }}>
              {exp.atividades
                .split("\n")
                .filter(Boolean)
                .map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
            </ul>
          </div>
        ))}
      </div>

      <CvBlockTitle>Idiomas</CvBlockTitle>
      <p style={{ fontSize: 17, lineHeight: 1.8 }}>
        {data.idiomas.map((idioma) => `${idioma.nome} (${idioma.nivel})`).join(", ")}.
      </p>

      <CvBlockTitle>Formação</CvBlockTitle>
      <div style={{ display: "grid", gap: 20 }}>
        {data.formacoes.map((form, index) => (
          <div key={index}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: 16,
              }}
            >
              <div>
                <h4 style={{ fontSize: 24, fontWeight: 700 }}>{form.curso}</h4>
                <p style={{ fontStyle: "italic", fontSize: 20 }}>
                  {form.instituicao}
                </p>
              </div>
              <div style={{ textAlign: "right" }}>
                <p style={{ fontWeight: 700, fontSize: 18 }}>
                  {form.inicio} — {form.fim}
                </p>
                <p>{form.local}</p>
              </div>
            </div>
            <p style={{ marginTop: 8, lineHeight: 1.8 }}>{form.detalhes}</p>
          </div>
        ))}
      </div>

      <CvBlockTitle>Habilidades</CvBlockTitle>
      <p style={{ fontSize: 17, lineHeight: 1.8 }}>
        {data.habilidades.map((hab) => `${hab.nome} (${hab.nivel})`).join(", ")}.
      </p>
    </div>
  );
}

function ElegantTemplate({ data }) {
  return (
    <div
      className="cv-page"
      style={{
        padding: 0,
        background: "#f8f8f7",
        color: "#242424",
        fontFamily: "Georgia, 'Times New Roman', serif",
      }}
    >
      <div
        style={{
          background: "#234f88",
          color: "#fff",
          padding: "48px 56px 42px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            width: 180,
            borderTop: "1px solid rgba(255,255,255,.7)",
            margin: "0 auto 24px",
          }}
        />
        <h1 style={{ fontSize: 46, fontWeight: 700 }}>{data.nome}</h1>
        <p style={{ fontSize: 28, fontWeight: 600, marginTop: 12 }}>{data.cargo}</p>
        <p style={{ fontSize: 15, marginTop: 18, lineHeight: 1.8 }}>
          {data.endereco}, {data.cidade}, {data.estado} • {data.telefone} • {data.email}
        </p>
      </div>

      <div style={{ padding: "40px 56px", display: "grid", gap: 34 }}>
        <ElegantSection title="Resumo">
          <p style={{ fontSize: 17, lineHeight: 1.8 }}>{data.resumo}</p>
        </ElegantSection>

        <ElegantSection title="Experiência Profissional">
          <div style={{ display: "grid", gap: 24 }}>
            {data.experiencias.map((exp, index) => (
              <div key={index}>
                <p style={{ fontSize: 24, fontWeight: 700 }}>
                  {exp.cargo}{" "}
                  <span style={{ fontWeight: 400 }}>
                    {exp.inicio} — {exp.fim}
                  </span>
                </p>
                <p style={{ fontSize: 22, fontWeight: 700, marginTop: 6 }}>
                  {exp.empresa}{" "}
                  <span style={{ fontWeight: 400 }}>— {exp.local}</span>
                </p>
                <ul style={{ marginTop: 12, paddingLeft: 22, lineHeight: 1.8 }}>
                  {exp.atividades
                    .split("\n")
                    .filter(Boolean)
                    .map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                </ul>
              </div>
            ))}
          </div>
        </ElegantSection>

        <ElegantSection title="Formação">
          <div style={{ display: "grid", gap: 18 }}>
            {data.formacoes.map((form, index) => (
              <div key={index}>
                <p style={{ fontSize: 22, fontWeight: 700 }}>
                  {form.inicio} — {form.fim} {form.curso}, {form.instituicao}
                </p>
                <p style={{ marginTop: 8, lineHeight: 1.8 }}>{form.detalhes}</p>
              </div>
            ))}
          </div>
        </ElegantSection>

        <ElegantSection title="Habilidades">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 12,
              fontSize: 17,
            }}
          >
            {data.habilidades.map((hab, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  borderBottom: "1px solid #ddd",
                  paddingBottom: 6,
                  gap: 16,
                }}
              >
                <span style={{ fontWeight: 700 }}>{hab.nome}</span>
                <span>{hab.nivel}</span>
              </div>
            ))}
          </div>
        </ElegantSection>
      </div>
    </div>
  );
}

function ModernTemplate({ data }) {
  return (
    <div
      className="cv-page"
      style={{
        background: "#f6f7f4",
        color: "#1f1f1f",
        padding: 40,
        fontFamily: "Arial, Helvetica, sans-serif",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "240px 1fr",
          gap: 36,
        }}
      >
        <aside>
          <SidebarTitle icon={<User size={20} />} title="Contatos" />
          <div style={{ lineHeight: 1.7, marginBottom: 28 }}>
            <p>
              {data.endereco}, {data.cidade}, {data.estado}
            </p>
            <p>{data.telefone}</p>
            <p style={{ wordBreak: "break-word" }}>{data.email}</p>
            <p style={{ wordBreak: "break-word" }}>{data.linkedin}</p>
          </div>

          <SidebarTitle icon={<Sparkles size={20} />} title="Habilidades" />
          <ul style={{ paddingLeft: 18, lineHeight: 1.7, marginBottom: 28 }}>
            {data.habilidades.map((hab, index) => (
              <li key={index}>
                <strong>{hab.nome}</strong> — {hab.nivel}
              </li>
            ))}
          </ul>

          <SidebarTitle icon={<GraduationCap size={20} />} title="Cursos" />
          <div style={{ display: "grid", gap: 14 }}>
            {data.cursos.map((curso, index) => (
              <div key={index}>
                <p style={{ fontWeight: 700 }}>{curso.nome}</p>
                <p>{curso.instituicao}</p>
                <p>
                  {curso.periodo} • {curso.local}
                </p>
              </div>
            ))}
          </div>
        </aside>

        <main>
          <h1 style={{ fontSize: 46, fontWeight: 900 }}>{data.nome}</h1>
          <div
            style={{
              marginTop: 16,
              background: "#9bc5aa",
              borderRadius: 16,
              padding: "12px 16px",
              fontSize: 28,
              fontWeight: 700,
              color: "#38544c",
            }}
          >
            {data.cargo}
          </div>

          <ModernSection icon={<FileText size={20} />} title="Resumo">
            <p style={{ lineHeight: 1.8 }}>{data.resumo}</p>
          </ModernSection>

          <ModernSection icon={<Briefcase size={20} />} title="Experiência">
            <div style={{ display: "grid", gap: 24 }}>
              {data.experiencias.map((exp, index) => (
                <div key={index}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      gap: 16,
                    }}
                  >
                    <div>
                      <p style={{ fontSize: 22, fontWeight: 700 }}>{exp.empresa}</p>
                      <p style={{ fontSize: 22 }}>{exp.cargo}</p>
                    </div>
                    <div style={{ textAlign: "right", color: "#666" }}>
                      <p>{exp.local}</p>
                      <p>
                        {exp.inicio} — {exp.fim}
                      </p>
                    </div>
                  </div>
                  <ul style={{ marginTop: 12, paddingLeft: 22, lineHeight: 1.8 }}>
                    {exp.atividades
                      .split("\n")
                      .filter(Boolean)
                      .map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                  </ul>
                </div>
              ))}
            </div>
          </ModernSection>

          <ModernSection icon={<GraduationCap size={20} />} title="Formação">
            <div style={{ display: "grid", gap: 16 }}>
              {data.formacoes.map((form, index) => (
                <div key={index}>
                  <p style={{ color: "#666" }}>
                    {form.inicio} — {form.fim}
                  </p>
                  <p style={{ fontSize: 22, fontWeight: 700 }}>
                    {form.curso}{" "}
                    <span style={{ fontWeight: 400, color: "#666" }}>
                      | {form.instituicao}
                    </span>
                  </p>
                  <p style={{ marginTop: 6, lineHeight: 1.8 }}>{form.detalhes}</p>
                </div>
              ))}
            </div>
          </ModernSection>

          <ModernSection icon={<Languages size={20} />} title="Referências">
            <div style={{ display: "grid", gap: 14 }}>
              {data.referencias.map((ref, index) => (
                <div key={index}>
                  <p style={{ fontWeight: 700 }}>
                    {ref.nome}, {ref.empresa}
                  </p>
                  <p>{ref.contato}</p>
                </div>
              ))}
            </div>
          </ModernSection>
        </main>
      </div>
    </div>
  );
}

function MinimalTemplate({ data }) {
  return (
    <div
      className="cv-page"
      style={{
        fontFamily: "Georgia, 'Times New Roman', serif",
        color: "#222",
        padding: 56,
      }}
    >
      <div
        style={{
          textAlign: "center",
          borderBottom: "2px solid #222",
          paddingBottom: 20,
        }}
      >
        <h1 style={{ fontSize: 40, fontWeight: 700 }}>
          {data.nome}, {data.cargo}
        </h1>
        <p style={{ marginTop: 12, lineHeight: 1.8 }}>
          {data.endereco}, {data.cidade}, {data.estado}, {data.telefone}, {data.email}
        </p>
      </div>

      <div
        style={{
          marginTop: 24,
          display: "grid",
          gridTemplateColumns: "180px 1fr",
          gap: "26px 28px",
          fontSize: 17,
          lineHeight: 1.8,
        }}
      >
        <MinimalLabel>Resumo</MinimalLabel>
        <MinimalContent>{data.resumo}</MinimalContent>

        <MinimalLabel>Experiência</MinimalLabel>
        <MinimalContent>
          <div style={{ display: "grid", gap: 24 }}>
            {data.experiencias.map((exp, index) => (
              <div
                key={index}
                style={{
                  display: "grid",
                  gridTemplateColumns: "150px 1fr 90px",
                  gap: 16,
                }}
              >
                <div>
                  {exp.inicio} — {exp.fim}
                </div>
                <div>
                  <p style={{ fontSize: 22, fontWeight: 700 }}>
                    {exp.cargo}, {exp.empresa}
                  </p>
                  <ul style={{ paddingLeft: 20, marginTop: 8 }}>
                    {exp.atividades
                      .split("\n")
                      .filter(Boolean)
                      .map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                  </ul>
                </div>
                <div style={{ textAlign: "right" }}>{exp.local}</div>
              </div>
            ))}
          </div>
        </MinimalContent>

        <MinimalLabel>Formação</MinimalLabel>
        <MinimalContent>
          <div style={{ display: "grid", gap: 18 }}>
            {data.formacoes.map((form, index) => (
              <div
                key={index}
                style={{
                  display: "grid",
                  gridTemplateColumns: "150px 1fr 90px",
                  gap: 16,
                }}
              >
                <div>
                  {form.inicio} — {form.fim}
                </div>
                <div>
                  <p style={{ fontSize: 22, fontWeight: 700 }}>
                    {form.curso}, {form.instituicao}
                  </p>
                  <p>{form.detalhes}</p>
                </div>
                <div style={{ textAlign: "right" }}>{form.local}</div>
              </div>
            ))}
          </div>
        </MinimalContent>

        <MinimalLabel>Habilidades</MinimalLabel>
        <MinimalContent>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {data.habilidades.map((hab, index) => (
              <div
                key={index}
                style={{ display: "flex", justifyContent: "space-between", gap: 16 }}
              >
                <span style={{ fontWeight: 700 }}>{hab.nome}</span>
                <span>{hab.nivel}</span>
              </div>
            ))}
          </div>
        </MinimalContent>

        <MinimalLabel>Idiomas</MinimalLabel>
        <MinimalContent>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {data.idiomas.map((item, index) => (
              <div
                key={index}
                style={{ display: "flex", justifyContent: "space-between", gap: 16 }}
              >
                <span style={{ fontWeight: 700 }}>{item.nome}</span>
                <span>{item.nivel}</span>
              </div>
            ))}
          </div>
        </MinimalContent>
      </div>
    </div>
  );
}

function CvBlockTitle({ children }) {
  return (
    <div
      style={{
        borderTop: "1px solid #aaa",
        borderBottom: "1px solid #aaa",
        padding: "8px 0",
        textAlign: "center",
        fontWeight: 700,
        fontSize: 26,
        textTransform: "uppercase",
        marginTop: 28,
        marginBottom: 14,
      }}
    >
      {children}
    </div>
  );
}

function ElegantSection({ title, children }) {
  return (
    <section>
      <div
        style={{
          width: 170,
          borderTop: "2px solid #d4d4d4",
          marginBottom: 14,
        }}
      />
      <h3
        style={{
          fontSize: 34,
          color: "#2c5ea2",
          fontWeight: 700,
          marginBottom: 14,
        }}
      >
        {title}
      </h3>
      {children}
    </section>
  );
}

function SidebarTitle({ icon, title }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        marginBottom: 14,
        color: "#2d564c",
        fontWeight: 800,
        textTransform: "uppercase",
        fontSize: 22,
      }}
    >
      <div
        style={{
          padding: 8,
          borderRadius: 8,
          background: "#cfe2d6",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {icon}
      </div>
      <span>{title}</span>
    </div>
  );
}

function ModernSection({ icon, title, children }) {
  return (
    <section style={{ marginTop: 28 }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          color: "#2d564c",
          fontWeight: 800,
          textTransform: "uppercase",
          fontSize: 22,
          marginBottom: 14,
        }}
      >
        <div
          style={{
            padding: 8,
            borderRadius: 8,
            background: "#cfe2d6",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {icon}
        </div>
        <span>{title}</span>
      </div>
      {children}
    </section>
  );
}

function MinimalLabel({ children }) {
  return (
    <div
      style={{
        fontWeight: 700,
        fontSize: 24,
        textTransform: "uppercase",
        borderTop: "2px solid #222",
        paddingTop: 12,
      }}
    >
      {children}
    </div>
  );
}

function MinimalContent({ children }) {
  return (
    <div
      style={{
        borderTop: "2px solid #222",
        paddingTop: 12,
      }}
    >
      {children}
    </div>
  );
}

function ResumePreview({ template, data, previewRef }) {
  return (
    <div className="preview-container" style={{ background: "#eceff3" }}>
      <div
        style={{
          transformOrigin: "top center",
          width: "fit-content",
          margin: "0 auto",
        }}
      >
        <div ref={previewRef}>
          {template === "classic" && <ClassicTemplate data={data} />}
          {template === "elegant" && <ElegantTemplate data={data} />}
          {template === "modern" && <ModernTemplate data={data} />}
          {template === "minimal" && <MinimalTemplate data={data} />}
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [data, setData] = useState(defaultData);
  const [template, setTemplate] = useState("classic");
  const [activeTab, setActiveTab] = useState("basico");
  const previewRef = useRef(null);

  const templateName = useMemo(
    () => templates.find((item) => item.id === template)?.nome || "curriculo",
    [template]
  );

  const updateField = (field, value) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  const downloadPDF = async () => {
    const safeName =
      data.nome?.trim()?.toLowerCase().replace(/\s+/g, "-") || "curriculo";
    await exportToPDF(previewRef.current, `${safeName}-curriculo.pdf`);
  };

  return (
    <div className="app-container">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
        <div className="header" style={{ marginBottom: 24 }}>
          <div
            className="form-card"
            style={{
              borderRadius: 22,
              padding: 28,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: 20,
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              <div>
                <div
                  style={{
                    display: "inline-block",
                    background: "#111827",
                    color: "#fff",
                    padding: "6px 14px",
                    borderRadius: 999,
                    fontSize: 13,
                    marginBottom: 14,
                  }}
                >
                  Gerador Profissional de Currículo
                </div>
                <h1 style={{ fontSize: 38, fontWeight: 900, marginBottom: 8 }}>
                  Crie currículos rapidos, bonitos e personalizados
                </h1>
                <p style={{ color: "#666", maxWidth: 760 }}>
                  Escolha um template inspirado em modelos premium, preencha os
                  dados e baixe o currículo em PDF com um clique.
                </p>
              </div>

              <button className="button" onClick={downloadPDF}>
                <Download size={18} style={{ marginRight: 8 }} />
                Baixar PDF
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="layout" style={{ gridTemplateColumns: "520px 1fr" }}>
        <div>
          <FormSection
            title="Template"
            icon={<Palette size={20} color="#111827" />}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 12,
              }}
            >
              {templates.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setTemplate(item.id)}
                  style={{
                    borderRadius: 16,
                    border:
                      template === item.id
                        ? "1px solid #111827"
                        : "1px solid #d1d5db",
                    padding: 16,
                    textAlign: "left",
                    cursor: "pointer",
                    background: template === item.id ? "#111827" : "#fff",
                    color: template === item.id ? "#fff" : "#111827",
                  }}
                >
                  <p style={{ fontWeight: 700 }}>{item.nome}</p>
                  <p
                    style={{
                      fontSize: 13,
                      marginTop: 6,
                      color: template === item.id ? "#d1d5db" : "#6b7280",
                    }}
                  >
                    Layout profissional pronto para personalização.
                  </p>
                </button>
              ))}
            </div>
          </FormSection>

          <div className="form-card" style={{ marginTop: 20 }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: 8,
                marginBottom: 20,
              }}
            >
              {[
                { id: "basico", label: "Básico" },
                { id: "experiencia", label: "Experiência" },
                { id: "formacao", label: "Formação" },
                { id: "extras", label: "Extras" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    border: "1px solid #d1d5db",
                    background: activeTab === tab.id ? "#111827" : "#fff",
                    color: activeTab === tab.id ? "#fff" : "#111827",
                    borderRadius: 12,
                    padding: "10px 12px",
                    cursor: "pointer",
                    fontWeight: 600,
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {activeTab === "basico" && (
              <div>
                <TextInput
                  label="Nome completo"
                  value={data.nome}
                  onChange={(e) => updateField("nome", e.target.value)}
                />
                <TextInput
                  label="Cargo / título profissional"
                  value={data.cargo}
                  onChange={(e) => updateField("cargo", e.target.value)}
                />
                <TextInput
                  label="E-mail"
                  value={data.email}
                  onChange={(e) => updateField("email", e.target.value)}
                />
                <TextInput
                  label="Telefone"
                  value={data.telefone}
                  onChange={(e) => updateField("telefone", e.target.value)}
                />
                <TextInput
                  label="Cidade"
                  value={data.cidade}
                  onChange={(e) => updateField("cidade", e.target.value)}
                />
                <TextInput
                  label="Estado"
                  value={data.estado}
                  onChange={(e) => updateField("estado", e.target.value)}
                />
                <TextInput
                  label="Endereço"
                  value={data.endereco}
                  onChange={(e) => updateField("endereco", e.target.value)}
                />
                <TextInput
                  label="LinkedIn ou portfólio"
                  value={data.linkedin}
                  onChange={(e) => updateField("linkedin", e.target.value)}
                />
                <TextAreaInput
                  label="Resumo profissional"
                  rows={6}
                  value={data.resumo}
                  onChange={(e) => updateField("resumo", e.target.value)}
                />
              </div>
            )}

            {activeTab === "experiencia" && (
              <div>
                <div style={{ marginBottom: 16 }}>
                  <button
                    type="button"
                    className="button"
                    onClick={() =>
                      addListItem(setData, "experiencias", {
                        cargo: "",
                        empresa: "",
                        local: "",
                        inicio: "",
                        fim: "",
                        atividades: "",
                      })
                    }
                  >
                    <Plus size={18} style={{ marginRight: 8 }} />
                    Adicionar experiência
                  </button>
                </div>

                {data.experiencias.map((exp, index) => (
                  <ItemBox
                    key={index}
                    title={`Experiência ${index + 1}`}
                    onRemove={() =>
                      removeListItem(setData, "experiencias", index)
                    }
                  >
                    <TextInput
                      label="Cargo"
                      value={exp.cargo}
                      onChange={(e) =>
                        updateListItem(
                          setData,
                          "experiencias",
                          index,
                          "cargo",
                          e.target.value
                        )
                      }
                    />
                    <TextInput
                      label="Empresa"
                      value={exp.empresa}
                      onChange={(e) =>
                        updateListItem(
                          setData,
                          "experiencias",
                          index,
                          "empresa",
                          e.target.value
                        )
                      }
                    />
                    <TextInput
                      label="Local"
                      value={exp.local}
                      onChange={(e) =>
                        updateListItem(
                          setData,
                          "experiencias",
                          index,
                          "local",
                          e.target.value
                        )
                      }
                    />
                    <TextInput
                      label="Início"
                      value={exp.inicio}
                      onChange={(e) =>
                        updateListItem(
                          setData,
                          "experiencias",
                          index,
                          "inicio",
                          e.target.value
                        )
                      }
                    />
                    <TextInput
                      label="Fim"
                      value={exp.fim}
                      onChange={(e) =>
                        updateListItem(
                          setData,
                          "experiencias",
                          index,
                          "fim",
                          e.target.value
                        )
                      }
                    />
                    <TextAreaInput
                      label="Atividades (uma por linha)"
                      rows={6}
                      value={exp.atividades}
                      onChange={(e) =>
                        updateListItem(
                          setData,
                          "experiencias",
                          index,
                          "atividades",
                          e.target.value
                        )
                      }
                    />
                  </ItemBox>
                ))}
              </div>
            )}

            {activeTab === "formacao" && (
              <div>
                <div style={{ marginBottom: 16 }}>
                  <button
                    type="button"
                    className="button"
                    onClick={() =>
                      addListItem(setData, "formacoes", {
                        curso: "",
                        instituicao: "",
                        local: "",
                        inicio: "",
                        fim: "",
                        detalhes: "",
                      })
                    }
                  >
                    <Plus size={18} style={{ marginRight: 8 }} />
                    Adicionar formação
                  </button>
                </div>

                {data.formacoes.map((form, index) => (
                  <ItemBox
                    key={index}
                    title={`Formação ${index + 1}`}
                    onRemove={() => removeListItem(setData, "formacoes", index)}
                  >
                    <TextInput
                      label="Curso"
                      value={form.curso}
                      onChange={(e) =>
                        updateListItem(
                          setData,
                          "formacoes",
                          index,
                          "curso",
                          e.target.value
                        )
                      }
                    />
                    <TextInput
                      label="Instituição"
                      value={form.instituicao}
                      onChange={(e) =>
                        updateListItem(
                          setData,
                          "formacoes",
                          index,
                          "instituicao",
                          e.target.value
                        )
                      }
                    />
                    <TextInput
                      label="Local"
                      value={form.local}
                      onChange={(e) =>
                        updateListItem(
                          setData,
                          "formacoes",
                          index,
                          "local",
                          e.target.value
                        )
                      }
                    />
                    <TextInput
                      label="Início"
                      value={form.inicio}
                      onChange={(e) =>
                        updateListItem(
                          setData,
                          "formacoes",
                          index,
                          "inicio",
                          e.target.value
                        )
                      }
                    />
                    <TextInput
                      label="Fim"
                      value={form.fim}
                      onChange={(e) =>
                        updateListItem(
                          setData,
                          "formacoes",
                          index,
                          "fim",
                          e.target.value
                        )
                      }
                    />
                    <TextAreaInput
                      label="Detalhes"
                      rows={4}
                      value={form.detalhes}
                      onChange={(e) =>
                        updateListItem(
                          setData,
                          "formacoes",
                          index,
                          "detalhes",
                          e.target.value
                        )
                      }
                    />
                  </ItemBox>
                ))}
              </div>
            )}

            {activeTab === "extras" && (
              <div>
                <div style={{ marginBottom: 18 }}>
                  <h3 style={{ fontSize: 18, marginBottom: 10 }}>Habilidades</h3>
                  <button
                    type="button"
                    className="button"
                    onClick={() =>
                      addListItem(setData, "habilidades", {
                        nome: "",
                        nivel: "Básico",
                      })
                    }
                  >
                    <Plus size={18} style={{ marginRight: 8 }} />
                    Adicionar habilidade
                  </button>
                </div>

                {data.habilidades.map((item, index) => (
                  <ItemBox
                    key={`hab-${index}`}
                    title={`Habilidade ${index + 1}`}
                    onRemove={() =>
                      removeListItem(setData, "habilidades", index)
                    }
                  >
                    <TextInput
                      label="Nome"
                      value={item.nome}
                      onChange={(e) =>
                        updateListItem(
                          setData,
                          "habilidades",
                          index,
                          "nome",
                          e.target.value
                        )
                      }
                    />
                    <SelectInput
                      label="Nível"
                      value={item.nivel}
                      onChange={(e) =>
                        updateListItem(
                          setData,
                          "habilidades",
                          index,
                          "nivel",
                          e.target.value
                        )
                      }
                      options={[
                        "Básico",
                        "Intermediário",
                        "Avançado",
                        "Especialista",
                      ]}
                    />
                  </ItemBox>
                ))}

                <div style={{ marginBottom: 18, marginTop: 28 }}>
                  <h3 style={{ fontSize: 18, marginBottom: 10 }}>Idiomas</h3>
                  <button
                    type="button"
                    className="button"
                    onClick={() =>
                      addListItem(setData, "idiomas", {
                        nome: "",
                        nivel: "Básico",
                      })
                    }
                  >
                    <Plus size={18} style={{ marginRight: 8 }} />
                    Adicionar idioma
                  </button>
                </div>

                {data.idiomas.map((item, index) => (
                  <ItemBox
                    key={`idioma-${index}`}
                    title={`Idioma ${index + 1}`}
                    onRemove={() => removeListItem(setData, "idiomas", index)}
                  >
                    <TextInput
                      label="Idioma"
                      value={item.nome}
                      onChange={(e) =>
                        updateListItem(
                          setData,
                          "idiomas",
                          index,
                          "nome",
                          e.target.value
                        )
                      }
                    />
                    <TextInput
                      label="Nível"
                      value={item.nivel}
                      onChange={(e) =>
                        updateListItem(
                          setData,
                          "idiomas",
                          index,
                          "nivel",
                          e.target.value
                        )
                      }
                    />
                  </ItemBox>
                ))}

                <div style={{ marginBottom: 18, marginTop: 28 }}>
                  <h3 style={{ fontSize: 18, marginBottom: 10 }}>Cursos</h3>
                  <button
                    type="button"
                    className="button"
                    onClick={() =>
                      addListItem(setData, "cursos", {
                        nome: "",
                        instituicao: "",
                        periodo: "",
                        local: "",
                      })
                    }
                  >
                    <Plus size={18} style={{ marginRight: 8 }} />
                    Adicionar curso
                  </button>
                </div>

                {data.cursos.map((item, index) => (
                  <ItemBox
                    key={`curso-${index}`}
                    title={`Curso ${index + 1}`}
                    onRemove={() => removeListItem(setData, "cursos", index)}
                  >
                    <TextInput
                      label="Nome do curso"
                      value={item.nome}
                      onChange={(e) =>
                        updateListItem(
                          setData,
                          "cursos",
                          index,
                          "nome",
                          e.target.value
                        )
                      }
                    />
                    <TextInput
                      label="Instituição"
                      value={item.instituicao}
                      onChange={(e) =>
                        updateListItem(
                          setData,
                          "cursos",
                          index,
                          "instituicao",
                          e.target.value
                        )
                      }
                    />
                    <TextInput
                      label="Período"
                      value={item.periodo}
                      onChange={(e) =>
                        updateListItem(
                          setData,
                          "cursos",
                          index,
                          "periodo",
                          e.target.value
                        )
                      }
                    />
                    <TextInput
                      label="Local"
                      value={item.local}
                      onChange={(e) =>
                        updateListItem(
                          setData,
                          "cursos",
                          index,
                          "local",
                          e.target.value
                        )
                      }
                    />
                  </ItemBox>
                ))}

                <div style={{ marginBottom: 18, marginTop: 28 }}>
                  <h3 style={{ fontSize: 18, marginBottom: 10 }}>Referências</h3>
                  <button
                    type="button"
                    className="button"
                    onClick={() =>
                      addListItem(setData, "referencias", {
                        nome: "",
                        empresa: "",
                        contato: "",
                      })
                    }
                  >
                    <Plus size={18} style={{ marginRight: 8 }} />
                    Adicionar referência
                  </button>
                </div>

                {data.referencias.map((item, index) => (
                  <ItemBox
                    key={`ref-${index}`}
                    title={`Referência ${index + 1}`}
                    onRemove={() =>
                      removeListItem(setData, "referencias", index)
                    }
                  >
                    <TextInput
                      label="Nome"
                      value={item.nome}
                      onChange={(e) =>
                        updateListItem(
                          setData,
                          "referencias",
                          index,
                          "nome",
                          e.target.value
                        )
                      }
                    />
                    <TextInput
                      label="Empresa"
                      value={item.empresa}
                      onChange={(e) =>
                        updateListItem(
                          setData,
                          "referencias",
                          index,
                          "empresa",
                          e.target.value
                        )
                      }
                    />
                    <TextInput
                      label="Contato"
                      value={item.contato}
                      onChange={(e) =>
                        updateListItem(
                          setData,
                          "referencias",
                          index,
                          "contato",
                          e.target.value
                        )
                      }
                    />
                  </ItemBox>
                ))}
              </div>
            )}
          </div>
        </div>

        <div>
          <div
            className="form-card"
            style={{
              marginBottom: 18,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 16,
              flexWrap: "wrap",
            }}
          >
            <div>
              <h2 style={{ fontSize: 28, fontWeight: 700 }}>
                Preview em tempo real
              </h2>
              <p style={{ color: "#666", marginTop: 4 }}>
                Template selecionado: {templateName}
              </p>
            </div>

            <button className="button" onClick={downloadPDF}>
              <Download size={18} style={{ marginRight: 8 }} />
              Baixar currículo
            </button>
          </div>

          <ResumePreview template={template} data={data} previewRef={previewRef} />
        </div>
      </div>
    </div>
  );
}