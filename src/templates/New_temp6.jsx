
import React from "react";

export default function NewTemp6({ data }) {
  const experiencias = data?.experiencias || [];
  const formacoes = data?.formacoes || [];
  const habilidades = data?.habilidades || [];
  const idiomas = data?.idiomas || [];
  const cursos = data?.cursos || [];
  const referencias = data?.referencias || [];

  return (
    <div className="cv-page minimal">
      <header
        style={{
          marginBottom: "28px",
          paddingBottom: "18px",
          borderBottom: "1px solid #d1d5db",
        }}
      >
        <h1>{data?.nome || "Seu Nome Completo"}</h1>
        <p>{data?.cargo || "Cargo Desejado"}</p>

        <div
          style={{
            marginTop: "14px",
            display: "flex",
            flexWrap: "wrap",
            gap: "14px",
            color: "#6b7280",
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
        <h3>EXPERIÊNCIA PROFISSIONAL</h3>

        {experiencias.length > 0 ? (
          experiencias.map((exp, i) => (
            <div
              key={i}
              style={{
                marginBottom: "20px",
                paddingBottom: "14px",
                borderBottom: "1px solid #e5e7eb",
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
                    {exp.cargo || "Cargo"}
                  </strong>
                  <p style={{ color: "#6b7280" }}>
                    {exp.empresa || "Empresa"}
                    {exp.local ? ` • ${exp.local}` : ""}
                  </p>
                </div>

                {(exp.inicio || exp.fim) && (
                  <div style={{ color: "#6b7280", fontSize: "14px" }}>
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
                borderBottom: "1px solid #e5e7eb",
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
                  <p style={{ color: "#6b7280" }}>
                    {edu.instituicao || "Instituição"}
                    {edu.local ? ` • ${edu.local}` : ""}
                  </p>
                </div>

                {(edu.inicio || edu.fim) && (
                  <div style={{ color: "#6b7280", fontSize: "14px" }}>
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

      {habilidades.length > 0 && (
        <section>
          <h3>HABILIDADES</h3>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "10px 18px",
            }}
          >
            {habilidades.map((item, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: "10px",
                  paddingBottom: "6px",
                  borderBottom: "1px solid #e5e7eb",
                }}
              >
                <span style={{ fontWeight: 600 }}>
                  {typeof item === "string" ? item : item.nome}
                </span>
                <span style={{ color: "#6b7280" }}>
                  {typeof item === "string" ? "" : item.nivel}
                </span>
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
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "10px 18px",
            }}
          >
            {idiomas.map((item, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: "10px",
                  paddingBottom: "6px",
                  borderBottom: "1px solid #e5e7eb",
                }}
              >
                <span style={{ fontWeight: 600 }}>
                  {typeof item === "string" ? item : item.nome}
                </span>
                <span style={{ color: "#6b7280" }}>
                  {typeof item === "string" ? "" : item.nivel}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {cursos.length > 0 && (
        <section>
          <h3>CURSOS</h3>

          {cursos.map((curso, i) => (
            <div
              key={i}
              style={{
                marginBottom: "14px",
                paddingBottom: "10px",
                borderBottom: "1px solid #e5e7eb",
              }}
            >
              <strong>{curso.nome || "Curso"}</strong>
              {curso.instituicao && (
                <p style={{ color: "#6b7280", marginTop: "4px" }}>
                  {curso.instituicao}
                </p>
              )}
              {(curso.periodo || curso.local) && (
                <p style={{ color: "#6b7280", marginTop: "4px" }}>
                  {[curso.periodo, curso.local].filter(Boolean).join(" • ")}
                </p>
              )}
            </div>
          ))}
        </section>
      )}

      {referencias.length > 0 && (
        <section>
          <h3>REFERÊNCIAS</h3>

          {referencias.map((ref, i) => (
            <div
              key={i}
              style={{
                marginBottom: "14px",
                paddingBottom: "10px",
                borderBottom: "1px solid #e5e7eb",
              }}
            >
              <strong>{ref.nome || "Referência"}</strong>
              {ref.empresa && (
                <p style={{ color: "#6b7280", marginTop: "4px" }}>
                  {ref.empresa}
                </p>
              )}
              {ref.contato && <p style={{ marginTop: "4px" }}>{ref.contato}</p>}
            </div>
          ))}
        </section>
      )}
    </div>
  );
}