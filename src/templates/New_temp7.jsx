import React from "react";

export default function NewTemp7({ data }) {
  const habilidades = data?.habilidades || [];
  const experiencias = data?.experiencias || [];
  const formacoes = data?.formacoes || [];
  const idiomas = data?.idiomas || [];
  const cursos = data?.cursos || [];
  const referencias = data?.referencias || [];

  return (
    <div className="cv-page sidebar-layout">
      <aside className="sidebar">
        <h2>{data?.nome || "Seu Nome Completo"}</h2>
        <p>{data?.cargo || "Cargo Desejado"}</p>

        <section>
          <h3>CONTATO</h3>
          {data?.email && <p>{data.email}</p>}
          {data?.telefone && <p>{data.telefone}</p>}
          {(data?.cidade || data?.estado) && (
            <p>{[data?.cidade, data?.estado].filter(Boolean).join(", ")}</p>
          )}
          {data?.endereco && <p>{data.endereco}</p>}
          {data?.linkedin && <p>{data.linkedin}</p>}
        </section>

        <section>
          <h3>RESUMO</h3>
          <p style={{ lineHeight: 1.7 }}>
            {data?.resumo || "Resumo profissional não fornecido."}
          </p>
        </section>

        <section>
          <h3>HABILIDADES</h3>
          {habilidades.length > 0 ? (
            <ul>
              {habilidades.map((item, i) => (
                <li key={i}>
                  {typeof item === "string"
                    ? item
                    : `${item.nome}${item.nivel ? ` — ${item.nivel}` : ""}`}
                </li>
              ))}
            </ul>
          ) : (
            <p>Nenhuma habilidade adicionada.</p>
          )}
        </section>

        {idiomas.length > 0 && (
          <section>
            <h3>IDIOMAS</h3>
            <ul>
              {idiomas.map((item, i) => (
                <li key={i}>
                  {typeof item === "string"
                    ? item
                    : `${item.nome}${item.nivel ? ` — ${item.nivel}` : ""}`}
                </li>
              ))}
            </ul>
          </section>
        )}

        {cursos.length > 0 && (
          <section>
            <h3>CURSOS</h3>
            <ul>
              {cursos.map((curso, i) => (
                <li key={i} style={{ marginBottom: "10px" }}>
                  <strong>{curso.nome || "Curso"}</strong>
                  {curso.instituicao && <div>{curso.instituicao}</div>}
                  {(curso.periodo || curso.local) && (
                    <div>
                      {[curso.periodo, curso.local].filter(Boolean).join(" • ")}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </section>
        )}
      </aside>

      <main className="content">
        <section>
          <h3>EXPERIÊNCIA PROFISSIONAL</h3>

          {experiencias.length > 0 ? (
            experiencias.map((exp, i) => (
              <div
                key={i}
                style={{
                  marginBottom: "20px",
                  paddingBottom: "14px",
                  borderBottom: "1px solid #d1d5db",
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
                  borderBottom: "1px solid #d1d5db",
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
                  <p style={{ marginTop: "8px", lineHeight: 1.7 }}>
                    {edu.detalhes}
                  </p>
                )}
              </div>
            ))
          ) : (
            <p>Nenhuma formação adicionada.</p>
          )}
        </section>

        {referencias.length > 0 && (
          <section>
            <h3>REFERÊNCIAS</h3>

            {referencias.map((ref, i) => (
              <div
                key={i}
                style={{
                  marginBottom: "14px",
                  paddingBottom: "10px",
                  borderBottom: "1px solid #d1d5db",
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
      </main>
    </div>
  );
}