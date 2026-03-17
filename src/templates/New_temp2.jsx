import React from "react";

export default function NewTemp2({ data }) {
  const experiencias = data?.experiencias || [];
  const formacoes = data?.formacoes || [];
  const habilidades = data?.habilidades || [];
  const idiomas = data?.idiomas || [];
  const referencias = data?.referencias || [];

  return (
    <div className="cv-page corporate">
      <header className="corp-header">
        <h1>{data?.nome || "Seu Nome Completo"}</h1>
        <p>{data?.cargo || "Cargo Desejado"}</p>

        <div
          style={{
            marginTop: "14px",
            fontSize: "14px",
            color: "#4b5563",
            lineHeight: 1.7,
          }}
        >
          {data?.email && <div>{data.email}</div>}
          {data?.telefone && <div>{data.telefone}</div>}
          {(data?.cidade || data?.estado) && (
            <div>{[data?.cidade, data?.estado].filter(Boolean).join(", ")}</div>
          )}
          {data?.endereco && <div>{data.endereco}</div>}
          {data?.linkedin && <div>{data.linkedin}</div>}
        </div>
      </header>

      <div className="corp-body">
        <section>
          <h3>Summary</h3>
          <p>{data?.resumo || "Professional summary not provided."}</p>
        </section>

        <section>
          <h3>Experience</h3>

          {experiencias.length > 0 ? (
            experiencias.map((exp, i) => (
              <div
                key={i}
                style={{
                  marginBottom: "22px",
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
                    marginBottom: "6px",
                  }}
                >
                  <div>
                    <strong style={{ fontSize: "18px" }}>
                      {exp.cargo || "Cargo"}
                    </strong>
                    <p
                      style={{
                        color: "#4b5563",
                        fontWeight: 500,
                        marginTop: "4px",
                      }}
                    >
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
                      paddingLeft: "18px",
                      marginTop: "8px",
                      lineHeight: 1.7,
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
            <p>No experience added.</p>
          )}
        </section>

        <section>
          <h3>Education</h3>

          {formacoes.length > 0 ? (
            formacoes.map((edu, i) => (
              <div
                key={i}
                style={{
                  marginBottom: "20px",
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
                    <strong style={{ fontSize: "18px" }}>
                      {edu.curso || "Curso"}
                    </strong>
                    <p
                      style={{
                        color: "#4b5563",
                        fontWeight: 500,
                        marginTop: "4px",
                      }}
                    >
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
                  <p style={{ marginTop: "8px", lineHeight: 1.7 }}>
                    {edu.detalhes}
                  </p>
                )}
              </div>
            ))
          ) : (
            <p>No education added.</p>
          )}
        </section>

        <section>
          <h3>Skills</h3>

          {habilidades.length > 0 ? (
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
                    gap: "12px",
                    borderBottom: "1px solid #e5e7eb",
                    paddingBottom: "6px",
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
          ) : (
            <p>No skills added.</p>
          )}
        </section>

        <section>
          <h3>Languages</h3>

          {idiomas.length > 0 ? (
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
                    gap: "12px",
                    borderBottom: "1px solid #e5e7eb",
                    paddingBottom: "6px",
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
          ) : (
            <p>No languages added.</p>
          )}
        </section>

        {referencias.length > 0 && (
          <section>
            <h3>References</h3>

            {referencias.map((ref, i) => (
              <div key={i} style={{ marginBottom: "14px" }}>
                <strong>{ref.nome || "Reference"}</strong>
                {ref.empresa && (
                  <p style={{ color: "#4b5563", marginTop: "3px" }}>
                    {ref.empresa}
                  </p>
                )}
                {ref.contato && <p>{ref.contato}</p>}
              </div>
            ))}
          </section>
        )}
      </div>
    </div>
  );
}