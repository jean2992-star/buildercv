import React from "react";

export default function NewTemp4({ data }) {
  const experiencias = data?.experiencias || [];
  const habilidades = data?.habilidades || [];
  const formacoes = data?.formacoes || [];
  const idiomas = data?.idiomas || [];
  const referencias = data?.referencias || [];

  return (
    <div className="cv-page dark">
      <header
        style={{
          borderBottom: "1px solid rgba(255,255,255,0.12)",
          paddingBottom: "20px",
          marginBottom: "28px",
        }}
      >
        <h1>{data?.nome || "Seu Nome Completo"}</h1>
        <p
          style={{
            fontSize: "22px",
            color: "#93c5fd",
            fontWeight: 600,
            marginTop: "8px",
          }}
        >
          {data?.cargo || "Cargo Desejado"}
        </p>

        <div
          style={{
            marginTop: "16px",
            display: "grid",
            gap: "6px",
            color: "rgba(255,255,255,0.78)",
            fontSize: "14px",
            lineHeight: 1.7,
          }}
        >
          {data?.email && <p>{data.email}</p>}
          {data?.telefone && <p>{data.telefone}</p>}
          {(data?.cidade || data?.estado) && (
            <p>{[data?.cidade, data?.estado].filter(Boolean).join(", ")}</p>
          )}
          {data?.endereco && <p>{data.endereco}</p>}
          {data?.linkedin && <p>{data.linkedin}</p>}
        </div>
      </header>

      <section>
        <h3>Summary</h3>
        <p style={{ lineHeight: 1.8, color: "rgba(255,255,255,0.88)" }}>
          {data?.resumo || "Professional summary not provided."}
        </p>
      </section>

      <section>
        <h3>Experience</h3>

        {experiencias.length > 0 ? (
          experiencias.map((exp, i) => (
            <div
              key={i}
              style={{
                marginBottom: "22px",
                padding: "14px 0",
                borderBottom: "1px solid rgba(255,255,255,0.10)",
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
                      color: "#ffffff",
                    }}
                  >
                    {exp.cargo || "Cargo"}
                  </strong>
                  <p
                    style={{
                      color: "#cbd5e1",
                      fontWeight: 500,
                    }}
                  >
                    {exp.empresa || "Empresa"}
                    {exp.local ? ` • ${exp.local}` : ""}
                  </p>
                </div>

                {(exp.inicio || exp.fim) && (
                  <div
                    style={{
                      color: "#93c5fd",
                      fontSize: "14px",
                      fontWeight: 600,
                    }}
                  >
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
                    color: "rgba(255,255,255,0.82)",
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
          <p style={{ color: "rgba(255,255,255,0.75)" }}>
            No experience added.
          </p>
        )}
      </section>

      <section>
        <h3>Skills</h3>

        {habilidades.length > 0 ? (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "12px 18px",
            }}
          >
            {habilidades.map((item, i) => (
              <div
                key={i}
                style={{
                  padding: "10px 14px",
                  borderRadius: "12px",
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  display: "flex",
                  justifyContent: "space-between",
                  gap: "10px",
                }}
              >
                <span style={{ fontWeight: 600, color: "#fff" }}>
                  {typeof item === "string" ? item : item.nome}
                </span>
                <span style={{ color: "#93c5fd" }}>
                  {typeof item === "string" ? "" : item.nivel}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p style={{ color: "rgba(255,255,255,0.75)" }}>No skills added.</p>
        )}
      </section>

      <section>
        <h3>Education</h3>

        {formacoes.length > 0 ? (
          formacoes.map((edu, i) => (
            <div
              key={i}
              style={{
                marginBottom: "18px",
                paddingBottom: "12px",
                borderBottom: "1px solid rgba(255,255,255,0.10)",
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
                      color: "#fff",
                    }}
                  >
                    {edu.curso || "Curso"}
                  </strong>
                  <p style={{ color: "#cbd5e1" }}>
                    {edu.instituicao || "Instituição"}
                    {edu.local ? ` • ${edu.local}` : ""}
                  </p>
                </div>

                {(edu.inicio || edu.fim) && (
                  <div style={{ color: "#93c5fd", fontSize: "14px" }}>
                    {[edu.inicio, edu.fim].filter(Boolean).join(" - ")}
                  </div>
                )}
              </div>

              {edu.detalhes && (
                <p
                  style={{
                    marginTop: "8px",
                    lineHeight: 1.7,
                    color: "rgba(255,255,255,0.82)",
                  }}
                >
                  {edu.detalhes}
                </p>
              )}
            </div>
          ))
        ) : (
          <p style={{ color: "rgba(255,255,255,0.75)" }}>
            No education added.
          </p>
        )}
      </section>

      {idiomas.length > 0 && (
        <section>
          <h3>Languages</h3>

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
                  background: "rgba(147,197,253,0.12)",
                  border: "1px solid rgba(147,197,253,0.22)",
                  color: "#bfdbfe",
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

      {referencias.length > 0 && (
        <section>
          <h3>References</h3>

          {referencias.map((ref, i) => (
            <div
              key={i}
              style={{
                marginBottom: "14px",
                padding: "12px 14px",
                borderRadius: "12px",
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <strong style={{ color: "#ffffff" }}>
                {ref.nome || "Reference"}
              </strong>
              {ref.empresa && (
                <p style={{ color: "#cbd5e1", marginTop: "4px" }}>
                  {ref.empresa}
                </p>
              )}
              {ref.contato && (
                <p style={{ color: "rgba(255,255,255,0.8)", marginTop: "4px" }}>
                  {ref.contato}
                </p>
              )}
            </div>
          ))}
        </section>
      )}
    </div>
  );
}