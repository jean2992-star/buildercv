import React, { useEffect, useMemo, useRef, useState } from "react";
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

import "./templates/classic.css";
import "./templates/elegant.css";
import "./templates/modern.css";
import "./templates/minimal.css";

import "./templates/New_temp1.css";
import "./templates/New_temp2.css";
import "./templates/New_temp3.css";
import "./templates/New_temp4.css";
import "./templates/New_temp5.css";
import "./templates/New_temp6.css";
import "./templates/New_temp7.css";
import "./templates/New_temp8.css";

import NewTemp1 from "./templates/New_temp1";
import NewTemp2 from "./templates/New_temp2";
import NewTemp3 from "./templates/New_temp3";
import NewTemp4 from "./templates/New_temp4";
import NewTemp5 from "./templates/New_temp5";
import NewTemp6 from "./templates/New_temp6";
import NewTemp7 from "./templates/New_temp7";
import NewTemp8 from "./templates/New_temp8";

const translations = {
  pt: {
    badge: "Gerador Profissional de Currículo",
    title: "Crie currículos rápidos, bonitos e personalizados",
    desc: "Escolha um template inspirado em modelos premium, preencha os dados e baixe o currículo em PDF com um clique.",
    download: "Baixar PDF",
    template: "Template",
    basic: "Básico",
    experience: "Experiência",
    education: "Formação",
    extras: "Extras",
    fullName: "Nome completo",
    role: "Cargo / título profissional",
    email: "E-mail",
    phone: "Telefone",
    city: "Cidade",
    state: "Estado",
    address: "Endereço",
    linkedin: "LinkedIn ou portfólio",
    summary: "Resumo profissional",
    addExperience: "Adicionar experiência",
    addEducation: "Adicionar formação",
    addSkill: "Adicionar habilidade",
    addLanguage: "Adicionar idioma",
    addCourse: "Adicionar curso",
    addReference: "Adicionar referência",
    preview: "Preview em tempo real",
    selectedTemplate: "Template selecionado",
    skills: "Habilidades",
    languages: "Idiomas",
    courses: "Cursos",
    references: "Referências",
    courseName: "Nome do curso",
    institution: "Instituição",
    period: "Período",
    level: "Nível",
    language: "Idioma",
    details: "Detalhes",
    start: "Início",
    end: "Fim",
    company: "Empresa",
    location: "Local",
    activities: "Atividades (uma por linha)",
    experienceItem: "Experiência",
    educationItem: "Formação",
    skillItem: "Habilidade",
    languageItem: "Idioma",
    courseItem: "Curso",
    referenceItem: "Referência",
    templateHelp: "Layout profissional pronto para personalização.",
    nameShort: "Nome",
    contactShort: "Contato",
  },
  en: {
    badge: "Professional Resume Builder",
    title: "Create fast, beautiful and personalized resumes",
    desc: "Choose a premium-inspired template, fill in the data and download the resume as PDF in one click.",
    download: "Download PDF",
    template: "Template",
    basic: "Basic",
    experience: "Experience",
    education: "Education",
    extras: "Extras",
    fullName: "Full name",
    role: "Job title / professional title",
    email: "Email",
    phone: "Phone",
    city: "City",
    state: "State",
    address: "Address",
    linkedin: "LinkedIn or portfolio",
    summary: "Professional summary",
    addExperience: "Add experience",
    addEducation: "Add education",
    addSkill: "Add skill",
    addLanguage: "Add language",
    addCourse: "Add course",
    addReference: "Add reference",
    preview: "Live preview",
    selectedTemplate: "Selected template",
    skills: "Skills",
    languages: "Languages",
    courses: "Courses",
    references: "References",
    courseName: "Course name",
    institution: "Institution",
    period: "Period",
    level: "Level",
    language: "Language",
    details: "Details",
    start: "Start",
    end: "End",
    company: "Company",
    location: "Location",
    activities: "Activities (one per line)",
    experienceItem: "Experience",
    educationItem: "Education",
    skillItem: "Skill",
    languageItem: "Language",
    courseItem: "Course",
    referenceItem: "Reference",
    templateHelp: "Professional layout ready for customization.",
    nameShort: "Name",
    contactShort: "Contact",
  },
  es: {
    badge: "Generador Profesional de Currículum",
    title: "Crea currículums rápidos, bonitos y personalizados",
    desc: "Elige una plantilla inspirada en modelos premium, completa los datos y descarga el currículum en PDF con un clic.",
    download: "Descargar PDF",
    template: "Plantilla",
    basic: "Básico",
    experience: "Experiencia",
    education: "Formación",
    extras: "Extras",
    fullName: "Nombre completo",
    role: "Cargo / título profesional",
    email: "Correo electrónico",
    phone: "Teléfono",
    city: "Ciudad",
    state: "Estado",
    address: "Dirección",
    linkedin: "LinkedIn o portafolio",
    summary: "Resumen profesional",
    addExperience: "Agregar experiencia",
    addEducation: "Agregar formación",
    addSkill: "Agregar habilidad",
    addLanguage: "Agregar idioma",
    addCourse: "Agregar curso",
    addReference: "Agregar referencia",
    preview: "Vista previa en tiempo real",
    selectedTemplate: "Plantilla seleccionada",
    skills: "Habilidades",
    languages: "Idiomas",
    courses: "Cursos",
    references: "Referencias",
    courseName: "Nombre del curso",
    institution: "Institución",
    period: "Período",
    level: "Nivel",
    language: "Idioma",
    details: "Detalles",
    start: "Inicio",
    end: "Fin",
    company: "Empresa",
    location: "Lugar",
    activities: "Actividades (una por línea)",
    experienceItem: "Experiencia",
    educationItem: "Formación",
    skillItem: "Habilidad",
    languageItem: "Idioma",
    courseItem: "Curso",
    referenceItem: "Referencia",
    templateHelp: "Diseño profesional listo para personalizar.",
    nameShort: "Nombre",
    contactShort: "Contacto",
  },
};

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
  { id: "new1", nome: "Professional Modern" },
  { id: "new2", nome: "Corporate Resume" },
  { id: "new3", nome: "Creative Designer" },
  { id: "new4", nome: "Executive Dark" },
  { id: "new5", nome: "Tech Developer" },
  { id: "new6", nome: "Clean Minimal" },
  { id: "new7", nome: "Professional Sidebar" },
  // ADICIONE ESTA LINHA:
  { id: "new8", nome: "Corporate Executive" },
];

// Barra de progresso para preenchimento do formulário
const calculateProgress = (data) => {
  // Todos os campos do currículo mapeados para a barra de progresso
  const essentialFields = [
    'nome', 
    'cargo', 
    'email', 
    'telefone', 
    'cidade', 
    'estado', 
    'endereco', 
    'linkedin', 
    'resumo',
    'habilidades', 
    'idiomas', 
    'experiencias', 
    'formacoes', 
    'cursos', 
    'referencias'
  ];
  
  let completed = 0;
  
  essentialFields.forEach(field => {
    const value = data[field];
    // Verifica se é array com itens (para as listas) ou string preenchida (para textos normais)
    if (Array.isArray(value) && value.length > 0) completed++;
    else if (typeof value === 'string' && value.trim() !== '') completed++;
  });

  return Math.round((completed / essentialFields.length) * 100);
};

// Componente Visual da Barra
const ProgressBar = ({ progress }) => (
  <div style={{ width: '100%', marginBottom: '20px' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '14px', fontWeight: '600', color: '#4b5563' }}>
      <span>Força do Currículo</span>
      <span>{progress}%</span>
    </div>
    <div style={{ width: '100%', height: '8px', background: '#e5e7eb', borderRadius: '10px', overflow: 'hidden' }}>
      <div 
        style={{ 
          width: `${progress}%`, 
          height: '100%', 
          background: progress < 50 ? '#ef4444' : progress < 80 ? '#f59e0b' : '#10b981',
          transition: 'width 0.5s ease-in-out' 
        }} 
      />
    </div>
    <p style={{ fontSize: '12px', color: '#6b7280', marginTop: '6px' }}>
      {progress < 100 ? "Complete os campos obrigatórios para um currículo perfeito! " : "Currículo excelente! Pronto para baixar ✅"}
    </p>
  </div>
);


// Termino barra de progresso


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
        style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}
      >
        {icon}
        <h3 style={{ fontSize: 20, fontWeight: 700 }}>{title}</h3>
      </div>
      {children}
    </div>
  );
}

function TextInput({ label, value, onChange, placeholder = "", type = "text" }) {
  return (
    <div className="form-group">
      <label>{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
}

function TextAreaInput({ label, value, onChange, rows = 4, placeholder = "" }) {
  return (
    <div className="form-group">
      <label>{label}</label>
      <textarea
        rows={rows}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
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
            boxShadow: "none",
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
    <div className="cv-page classic">
      <div className="classic-header">
        <p>
          {data.cidade}, {data.estado} • {data.email} • {data.telefone}
        </p>
        <h1>{data.nome}</h1>
        <p>{data.cargo}</p>
      </div>

      <div className="classic-section">
        <h3>Resumo Profissional</h3>
        <p>{data.resumo}</p>
      </div>

      <div className="classic-section">
        <h3>Experiência Profissional</h3>
        {data.experiencias.map((exp, index) => (
          <div key={index} className="classic-job">
            <div style={{ display: "flex", justifyContent: "space-between", gap: 16 }}>
              <div>
                <h4 style={{ fontSize: 24, fontWeight: 700 }}>{exp.cargo}</h4>
                <p style={{ fontStyle: "italic", fontSize: 20 }}>{exp.empresa}</p>
              </div>
              <div style={{ textAlign: "right" }}>
                <p style={{ fontWeight: 700, fontSize: 18 }}>{exp.inicio} — {exp.fim}</p>
                <p>{exp.local}</p>
              </div>
            </div>
            <ul style={{ marginTop: 12, paddingLeft: 24, lineHeight: 1.8 }}>
              {exp.atividades.split("\n").filter(Boolean).map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="classic-section">
        <h3>Idiomas</h3>
        <p>
          {data.idiomas.map((idioma) => `${idioma.nome} (${idioma.nivel})`).join(", ")}.
        </p>
      </div>

      <div className="classic-section">
        <h3>Formação</h3>
        {data.formacoes.map((form, index) => (
          <div key={index} className="classic-job">
            <div style={{ display: "flex", justifyContent: "space-between", gap: 16 }}>
              <div>
                <h4 style={{ fontSize: 24, fontWeight: 700 }}>{form.curso}</h4>
                <p style={{ fontStyle: "italic", fontSize: 20 }}>{form.instituicao}</p>
              </div>
              <div style={{ textAlign: "right" }}>
                <p style={{ fontWeight: 700, fontSize: 18 }}>{form.inicio} — {form.fim}</p>
                <p>{form.local}</p>
              </div>
            </div>
            <p style={{ marginTop: 8, lineHeight: 1.8 }}>{form.detalhes}</p>
          </div>
        ))}
      </div>

      <div className="classic-section">
        <h3>Habilidades</h3>
        <p>
          {data.habilidades.map((hab) => `${hab.nome} (${hab.nivel})`).join(", ")}.
        </p>
      </div>
    </div>
  );
}

function ElegantTemplate({ data }) {
  return (
    <div className="cv-page elegant">
      <div className="elegant-header">
        <h1>{data.nome}</h1>
        <p>{data.cargo}</p>
        <p>
          {data.endereco}, {data.cidade}, {data.estado} • {data.telefone} • {data.email}
        </p>
      </div>

      <div className="elegant-section">
        <ElegantSection title="Resumo">
          <p>{data.resumo}</p>
        </ElegantSection>

        <ElegantSection title="Experiência Profissional">
          <div style={{ display: "grid", gap: 24 }}>
            {data.experiencias.map((exp, index) => (
              <div key={index} className="elegant-job">
                <p style={{ fontSize: 24, fontWeight: 700 }}>
                  {exp.cargo} <span style={{ fontWeight: 400 }}>{exp.inicio} — {exp.fim}</span>
                </p>
                <p style={{ fontSize: 22, fontWeight: 700, marginTop: 6 }}>
                  {exp.empresa} <span style={{ fontWeight: 400 }}>— {exp.local}</span>
                </p>
                <ul style={{ marginTop: 12, paddingLeft: 22, lineHeight: 1.8 }}>
                  {exp.atividades.split("\n").filter(Boolean).map((item, i) => (
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
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, fontSize: 17 }}>
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
    <div className="cv-page modern">
      <div className="modern-container">
        <aside className="modern-sidebar">
          <SidebarTitle icon={<User size={20} />} title="Contatos" />
          <div style={{ lineHeight: 1.7, marginBottom: 28 }}>
            <p>{data.endereco}, {data.cidade}, {data.estado}</p>
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
                <p>{curso.periodo} • {curso.local}</p>
              </div>
            ))}
          </div>
        </aside>

        <main className="modern-main">
          <h1 className="modern-title">{data.nome}</h1>
          <div className="modern-role">{data.cargo}</div>

          <div className="modern-section">
            <ModernSection icon={<FileText size={20} />} title="Resumo">
              <p style={{ lineHeight: 1.8 }}>{data.resumo}</p>
            </ModernSection>
          </div>

          <div className="modern-section">
            <ModernSection icon={<Briefcase size={20} />} title="Experiência">
              <div style={{ display: "grid", gap: 24 }}>
                {data.experiencias.map((exp, index) => (
                  <div key={index}>
                    <div
                      style={{ display: "flex", justifyContent: "space-between", gap: 16 }}
                    >
                      <div>
                        <p style={{ fontSize: 22, fontWeight: 700 }}>{exp.empresa}</p>
                        <p style={{ fontSize: 22 }}>{exp.cargo}</p>
                      </div>
                      <div style={{ textAlign: "right", color: "#666" }}>
                        <p>{exp.local}</p>
                        <p>{exp.inicio} — {exp.fim}</p>
                      </div>
                    </div>
                    <ul style={{ marginTop: 12, paddingLeft: 22, lineHeight: 1.8 }}>
                      {exp.atividades.split("\n").filter(Boolean).map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </ModernSection>
          </div>

          <div className="modern-section">
            <ModernSection icon={<GraduationCap size={20} />} title="Formação">
              <div style={{ display: "grid", gap: 16 }}>
                {data.formacoes.map((form, index) => (
                  <div key={index}>
                    <p style={{ color: "#666" }}>{form.inicio} — {form.fim}</p>
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
          </div>

          <div className="modern-section">
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
          </div>
        </main>
      </div>
    </div>
  );
}

function MinimalTemplate({ data }) {
  return (
    <div className="cv-page minimal">
      <div className="minimal-header">
        <h1>{data.nome}, {data.cargo}</h1>
        <p>
          {data.endereco}, {data.cidade}, {data.estado}, {data.telefone}, {data.email}
        </p>
      </div>

      <div className="minimal-grid">
        <div className="minimal-label">Resumo</div>
        <div className="minimal-content">{data.resumo}</div>

        <div className="minimal-label">Experiência</div>
        <div className="minimal-content">
          <div style={{ display: "grid", gap: 24 }}>
            {data.experiencias.map((exp, index) => (
              <div key={index} style={{ display: "grid", gridTemplateColumns: "150px 1fr 90px", gap: 16 }}>
                <div>{exp.inicio} — {exp.fim}</div>
                <div>
                  <p style={{ fontSize: 22, fontWeight: 700 }}>
                    {exp.cargo}, {exp.empresa}
                  </p>
                  <ul style={{ paddingLeft: 20, marginTop: 8 }}>
                    {exp.atividades.split("\n").filter(Boolean).map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div style={{ textAlign: "right" }}>{exp.local}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="minimal-label">Formação</div>
        <div className="minimal-content">
          <div style={{ display: "grid", gap: 18 }}>
            {data.formacoes.map((form, index) => (
              <div key={index} style={{ display: "grid", gridTemplateColumns: "150px 1fr 90px", gap: 16 }}>
                <div>{form.inicio} — {form.fim}</div>
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
        </div>

        <div className="minimal-label">Habilidades</div>
        <div className="minimal-content">
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
        </div>

        <div className="minimal-label">Idiomas</div>
        <div className="minimal-content">
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
        </div>
      </div>
    </div>
  );
}

function ElegantSection({ title, children }) {
  return (
    <section>
      <div style={{ width: 170, borderTop: "2px solid #d4d4d4", marginBottom: 14 }} />
      <h3 style={{ fontSize: 34, color: "#2c5ea2", fontWeight: 700, marginBottom: 14 }}>
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

function ResumePreview({ template, data, previewRef }) {
  return (
    <div className="preview-container" style={{ background: "#eceff3" }}>
      <div style={{ transformOrigin: "top center", width: "fit-content", margin: "0 auto" }}>
        <div ref={previewRef}>
          {template === "classic" && <ClassicTemplate data={data} />}
          {template === "elegant" && <ElegantTemplate data={data} />}
          {template === "modern" && <ModernTemplate data={data} />}
          {template === "minimal" && <MinimalTemplate data={data} />}
          {template === "new1" && <NewTemp1 data={data} />}
          {template === "new2" && <NewTemp2 data={data} />}
          {template === "new3" && <NewTemp3 data={data} />}
          {template === "new4" && <NewTemp4 data={data} />}
          {template === "new5" && <NewTemp5 data={data} />}
          {template === "new6" && <NewTemp6 data={data} />}
          {template === "new7" && <NewTemp7 data={data} />}
          {/* ADICIONE ESTA LINHA: */}
          {template === "new8" && <NewTemp8 data={data}/>}
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [data, setData] = useState(defaultData);
  const [template, setTemplate] = useState("classic");
  const [activeTab, setActiveTab] = useState("basico");
  const [language, setLanguage] = useState("pt");
  const previewRef = useRef(null);

  const t = translations[language];
  const progress = calculateProgress(data);

  

  useEffect(() => {
    const savedLanguage = localStorage.getItem("buildercv_language");
    if (savedLanguage) setLanguage(savedLanguage);
  }, []);

  useEffect(() => {
    localStorage.setItem("buildercv_language", language);
  }, [language]);

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
          <div className="form-card" style={{ borderRadius: 22, padding: 28 }}>
            
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
                  {t.badge}
                </div>
                <h1 style={{ fontSize: 38, fontWeight: 900, marginBottom: 8 }}>
                  {t.title}
                </h1>
                <p style={{ color: "#666", maxWidth: 760 }}>{t.desc}</p>
              </div>

              <div
                style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}
              >
                <div style={{ minWidth: 180 }}>
                  <select value={language} onChange={(e) => setLanguage(e.target.value)}>
                    <option value="pt">Português</option>
                    <option value="en">English</option>
                    <option value="es">Español</option>
                  </select>
                </div>

                <button className="button" onClick={downloadPDF}>
                  <Download size={18} style={{ marginRight: 8 }} />
                  {t.download}
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
      {/* Barra de progresso adicionada aqui */}
      <ProgressBar progress={progress} />  
      <div className="layout" style={{ gridTemplateColumns: "520px 1fr" }}>
        <div>
          <FormSection title={t.template} icon={<Palette size={20} color="#111827" />}>
            <div className="template-grid">
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
                    {t.templateHelp}
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
                { id: "basico", label: t.basic },
                { id: "experiencia", label: t.experience },
                { id: "formacao", label: t.education },
                { id: "extras", label: t.extras },
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
                  label={t.fullName}
                  value={data.nome}
                  onChange={(e) => updateField("nome", e.target.value)}
                />
                <TextInput
                  label={t.role}
                  value={data.cargo}
                  onChange={(e) => updateField("cargo", e.target.value)}
                />
                <TextInput
                  label={t.email}
                  value={data.email}
                  onChange={(e) => updateField("email", e.target.value)}
                />
                <TextInput
                  label={t.phone}
                  value={data.telefone}
                  onChange={(e) => updateField("telefone", e.target.value)}
                />
                <TextInput
                  label={t.city}
                  value={data.cidade}
                  onChange={(e) => updateField("cidade", e.target.value)}
                />
                <TextInput
                  label={t.state}
                  value={data.estado}
                  onChange={(e) => updateField("estado", e.target.value)}
                />
                <TextInput
                  label={t.address}
                  value={data.endereco}
                  onChange={(e) => updateField("endereco", e.target.value)}
                />
                <TextInput
                  label={t.linkedin}
                  value={data.linkedin}
                  onChange={(e) => updateField("linkedin", e.target.value)}
                />
                <TextAreaInput
                  label={t.summary}
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
                    {t.addExperience}
                  </button>
                </div>

                {data.experiencias.map((exp, index) => (
                  <ItemBox
                    key={index}
                    title={`${t.experienceItem} ${index + 1}`}
                    onRemove={() => removeListItem(setData, "experiencias", index)}
                  >
                    <TextInput
                      label={t.role}
                      value={exp.cargo}
                      onChange={(e) =>
                        updateListItem(setData, "experiencias", index, "cargo", e.target.value)
                      }
                    />
                    <TextInput
                      label={t.company}
                      value={exp.empresa}
                      onChange={(e) =>
                        updateListItem(setData, "experiencias", index, "empresa", e.target.value)
                      }
                    />
                    <TextInput
                      label={t.location}
                      value={exp.local}
                      onChange={(e) =>
                        updateListItem(setData, "experiencias", index, "local", e.target.value)
                      }
                    />
                    <TextInput
                      label={t.start}
                      value={exp.inicio}
                      onChange={(e) =>
                        updateListItem(setData, "experiencias", index, "inicio", e.target.value)
                      }
                    />
                    <TextInput
                      label={t.end}
                      value={exp.fim}
                      onChange={(e) =>
                        updateListItem(setData, "experiencias", index, "fim", e.target.value)
                      }
                    />
                    <TextAreaInput
                      label={t.activities}
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
                    {t.addEducation}
                  </button>
                </div>

                {data.formacoes.map((form, index) => (
                  <ItemBox
                    key={index}
                    title={`${t.educationItem} ${index + 1}`}
                    onRemove={() => removeListItem(setData, "formacoes", index)}
                  >
                    <TextInput
                      label={t.courseName}
                      value={form.curso}
                      onChange={(e) =>
                        updateListItem(setData, "formacoes", index, "curso", e.target.value)
                      }
                    />
                    <TextInput
                      label={t.institution}
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
                      label={t.location}
                      value={form.local}
                      onChange={(e) =>
                        updateListItem(setData, "formacoes", index, "local", e.target.value)
                      }
                    />
                    <TextInput
                      label={t.start}
                      value={form.inicio}
                      onChange={(e) =>
                        updateListItem(setData, "formacoes", index, "inicio", e.target.value)
                      }
                    />
                    <TextInput
                      label={t.end}
                      value={form.fim}
                      onChange={(e) =>
                        updateListItem(setData, "formacoes", index, "fim", e.target.value)
                      }
                    />
                    <TextAreaInput
                      label={t.details}
                      rows={4}
                      value={form.detalhes}
                      onChange={(e) =>
                        updateListItem(setData, "formacoes", index, "detalhes", e.target.value)
                      }
                    />
                  </ItemBox>
                ))}
              </div>
            )}

            {activeTab === "extras" && (
              <div>
                <div style={{ marginBottom: 18 }}>
                  <h3 style={{ fontSize: 18, marginBottom: 10 }}>{t.skills}</h3>
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
                    {t.addSkill}
                  </button>
                </div>

                {data.habilidades.map((item, index) => (
                  <ItemBox
                    key={`hab-${index}`}
                    title={`${t.skillItem} ${index + 1}`}
                    onRemove={() => removeListItem(setData, "habilidades", index)}
                  >
                    <TextInput
                      label={t.nameShort}
                      value={item.nome}
                      onChange={(e) => updateListItem(setData, "habilidades", index, "nome", e.target.value)}
                    />
                    <SelectInput
                      label={t.level}
                      value={item.nivel}
                      onChange={(e) => updateListItem(setData, "habilidades", index, "nivel", e.target.value)}
                      options={["Básico", "Intermediário", "Avançado", "Especialista"]}
                    />
                  </ItemBox>
                ))}

                <div style={{ marginBottom: 18, marginTop: 28 }}>
                  <h3 style={{ fontSize: 18, marginBottom: 10 }}>{t.languages}</h3>
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
                    {t.addLanguage}
                  </button>
                </div>

                {data.idiomas.map((item, index) => (
                  <ItemBox
                    key={`idioma-${index}`}
                    title={`${t.languageItem} ${index + 1}`}
                    onRemove={() => removeListItem(setData, "idiomas", index)}
                  >
                    <TextInput label={t.language} value={item.nome} onChange={(e) => updateListItem(setData, "idiomas", index, "nome", e.target.value)} />
                    <TextInput label={t.level} value={item.nivel} onChange={(e) => updateListItem(setData, "idiomas", index, "nivel", e.target.value)} />
                  </ItemBox>
                ))}

                <div style={{ marginBottom: 18, marginTop: 28 }}>
                  <h3 style={{ fontSize: 18, marginBottom: 10 }}>{t.courses}</h3>
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
                    {t.addCourse}
                  </button>
                </div>

                {data.cursos.map((item, index) => (
                  <ItemBox
                    key={`curso-${index}`}
                    title={`${t.courseItem} ${index + 1}`}
                    onRemove={() => removeListItem(setData, "cursos", index)}
                  >
                    <TextInput
                      label={t.courseName}
                      value={item.nome}
                      onChange={(e) =>
                        updateListItem(setData, "cursos", index, "nome", e.target.value)
                      }
                    />
                    <TextInput
                      label={t.institution}
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
                      label={t.period}
                      value={item.periodo}
                      onChange={(e) =>
                        updateListItem(setData, "cursos", index, "periodo", e.target.value)
                      }
                    />
                    <TextInput
                      label={t.location}
                      value={item.local}
                      onChange={(e) =>
                        updateListItem(setData, "cursos", index, "local", e.target.value)
                      }
                    />
                  </ItemBox>
                ))}

                <div style={{ marginBottom: 18, marginTop: 28 }}>
                  <h3 style={{ fontSize: 18, marginBottom: 10 }}>{t.references}</h3>
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
                    {t.addReference}
                  </button>
                </div>

                {data.referencias.map((item, index) => (
                  <ItemBox
                    key={`ref-${index}`}
                    title={`${t.referenceItem} ${index + 1}`}
                    onRemove={() => removeListItem(setData, "referencias", index)}
                  >
                    <TextInput
                      label={t.nameShort}
                      value={item.nome}
                      onChange={(e) => updateListItem(setData, "referencias", index, "nome", e.target.value)}
                    />
                    <TextInput label={t.company} value={item.empresa} onChange={(e) => updateListItem(setData, "referencias", index, "empresa", e.target.value)} />
                    <TextInput
                      label={t.company}
                      value={item.empresa}
                      onChange={(e) =>
                        updateListItem(setData, "referencias", index, "empresa", e.target.value)
                      }
                    />
                    <TextInput
                      label={t.contactShort}
                      value={item.contato}
                      onChange={(e) => updateListItem(setData, "referencias", index, "contato", e.target.value)}
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
              <h2 style={{ fontSize: 28, fontWeight: 700 }}>{t.preview}</h2>
              <p style={{ color: "#666", marginTop: 4 }}>
                {t.selectedTemplate}: {templateName}
              </p>
            </div>

            <button className="button" onClick={downloadPDF}>
              <Download size={18} style={{ marginRight: 8 }} />
              {t.download}
            </button>
          </div>

          <ResumePreview template={template} data={data} previewRef={previewRef} />
        </div>
      </div>
    </div>
  );
}