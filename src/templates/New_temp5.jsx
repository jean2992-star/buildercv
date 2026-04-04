import React from "react";

export default function NewTemp5({ data }) {
  const habilidades = data?.habilidades || [];
  const experiencias = data?.experiencias || [];
  const formacoes = data?.formacoes || [];
  const cursos = data?.cursos || [];
  const idiomas = data?.idiomas || [];

  return (
    <div className="cv-page tech">
      <header
        style={{
          marginBottom: "28px",
          paddingBottom: "18px",
          borderBottom: "2px solid #dbe2ea",
        }}
      >
        <h1>{data?.nome || "Seu Nome Completo"}</h1>
        <h2>{data?.cargo || "Desenvolvedor / Profissional Tech"}</h2>

        <div
          style={{
            marginTop: "14px",
            display: "flex",
            flexWrap: "wrap",
            gap: "14px",
            color: "#475569",
            fontSize: "14px",
            lineHeight: 1.7,
          }}
        >
          {data?.email && <span>{data.email}</span>}
          {data?.telefone && <span>{data.telefone}</span>}
          {(data?.cidade || data?.estado) && (
            <span>{[data?.cidade, data?.estado].filter(Boolean).join(", ")}</span>
          )}
          {data?.linkedin && <span>{data.linkedin}</span>}
        </div>
      </header>

      <section>
        <h3>RESUMO</h3>
        <p style={{ lineHeight: 1.8 }}>
          {data?.resumo || "Resumo profissional não fornecido."}
        </p>
      </section>

      <section>
        <h3>HABILIDADES</h3>

        {habilidades.length > 0 ? (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "12px 18px",
            }}
          >
            {habilidades.map((skill, i) => (
              <div
                key={i}
                style={{
                  padding: "10px 14px",
                  borderRadius: "12px",
                  background: "#ffffff",
                  border: "1px solid #dbe2ea",
                  display: "flex",
                  justifyContent: "space-between",
                  gap: "10px",
                }}
              >
                <span style={{ fontWeight: 600 }}>
                  {typeof skill === "string" ? skill : skill.nome}
                </span>
                <span style={{ color: "#2563eb", fontWeight: 600 }}>
                  {typeof skill === "string" ? "" : skill.nivel}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p>Nenhuma habilidade adicionada.</p>
        )}
      </section>

      <section>
        <h3>EXPERIÊNCIA PROFISSIONAL</h3>

        {experiencias.length > 0 ? (
          experiencias.map((exp, i) => (
            <div
              key={i}
              style={{
                marginBottom: "22px",
                padding: "14px 0",
                borderBottom: "1px solid #dbe2ea",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: "16px",
                  flexWrap: "wrap",
                  marginBottom: "6px",
                }}
              >
                <div>
                  <strong
                    style={{
                      display: "block",
                      fontSize: "18px",
                      marginBottom: "4px",
                    }}
                  >
                    {exp.cargo || "Cargo"}
                  </strong>
                  <p style={{ color: "#475569", fontWeight: 500 }}>
                    {exp.empresa || "Empresa"}
                    {exp.local ? ` • ${exp.local}` : ""}
                  </p>
                </div>

                {(exp.inicio || exp.fim) && (
                  <div style={{ color: "#64748b", fontSize: "14px" }}>
                    {[exp.inicio, exp.fim].filter(Boolean).join(" - ")}
                  </div>
                )}
              </div>

              {exp.atividades && (
                <ul
                  style={{
                    marginTop: "10px",
                    paddingLeft: "18px",
                    lineHeight: 1.8,
                  }}
                >
                  {exp.atividades
                    .split("\n")
                    .filter(Boolean)
                    .map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                </ul>
              )}
            </div>
          ))
        ) : (
          <p>Nenhuma experiência profissional adicionada.</p>
        )}
      </section>

      <section>
        <h3>FORMAÇÃO</h3>

        {formacoes.length > 0 ? (
          formacoes.map((edu, i) => (
            <div
              key={i}
              style={{
                marginBottom: "18px",
                paddingBottom: "12px",
                borderBottom: "1px solid #dbe2ea",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: "16px",
                  flexWrap: "wrap",
                }}
              >
                <div>
                  <strong
                    style={{
                      display: "block",
                      fontSize: "18px",
                      marginBottom: "4px",
                    }}
                  >
                    {edu.curso || "Curso"}
                  </strong>
                  <p style={{ color: "#475569", fontWeight: 500 }}>
                    {edu.instituicao || "Instituição"}
                    {edu.local ? ` • ${edu.local}` : ""}
                  </p>
                </div>

                {(edu.inicio || edu.fim) && (
                  <div style={{ color: "#64748b", fontSize: "14px" }}>
                    {[edu.inicio, edu.fim].filter(Boolean).join(" - ")}
                  </div>
                )}
              </div>

              {edu.detalhes && (
                <p style={{ marginTop: "8px", lineHeight: 1.7 }}>{edu.detalhes}</p>
              )}
            </div>
          ))
        ) : (
          <p>Nenhuma formação adicionada.</p>
        )}
      </section>

      {cursos.length > 0 && (
        <section>
          <h3>CURSOS E CERTIFICAÇÕES</h3>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "14px 18px",
            }}
          >
            {cursos.map((curso, i) => (
              <div
                key={i}
                style={{
                  padding: "12px 14px",
                  borderRadius: "12px",
                  border: "1px solid #dbe2ea",
                  background: "#ffffff",
                }}
              >
                <strong style={{ display: "block", marginBottom: "4px" }}>
                  {curso.nome || "Curso"}
                </strong>
                {curso.instituicao && (
                  <p style={{ color: "#64748b" }}>{curso.instituicao}</p>
                )}
                {(curso.periodo || curso.local) && (
                  <p style={{ color: "#64748b", marginTop: "4px" }}>
                    {[curso.periodo, curso.local].filter(Boolean).join(" • ")}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {idiomas.length > 0 && (
        <section>
          <h3>IDIOMAS</h3>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "10px",
            }}
          >
            {idiomas.map((item, i) => (
              <div
                key={i}
                style={{
                  padding: "8px 14px",
                  borderRadius: "999px",
                  background: "#dbeafe",
                  color: "#1d4ed8",
                  fontWeight: 600,
                  fontSize: "14px",
                }}
              >
                {typeof item === "string"
                  ? item
                  : `${item.nome}${item.nivel ? ` — ${item.nivel}` : ""}`}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}