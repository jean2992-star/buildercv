import React from "react";

export default function NewTemp1({ data }) {
  const habilidades = data?.habilidades || [];
  const idiomas = data?.idiomas || [];
  const experiencias = data?.experiencias || [];
  const formacoes = data?.formacoes || [];
  const cursos = data?.cursos || [];
  const referencias = data?.referencias || [];

  return (
    <div className="cv-page new-template">
      <div className="cv-header-modern">
        <h1>{data?.nome || "SEU NOME COMPLETO"}</h1>
        <p className="cv-role">{data?.cargo || "Profissão"}</p>

        <div className="cv-contact">
          {data?.telefone && <span>{data.telefone}</span>}
          {data?.email && <span>{data.email}</span>}
          {(data?.cidade || data?.estado) && (
            <span>
              {[data?.cidade, data?.estado].filter(Boolean).join(" - ")}
            </span>
          )}
        </div>
      </div>

      <div className="cv-grid">
        <aside className="cv-sidebar">
          <section>
            <h3>CONTACT</h3>
            {data?.endereco && <p>{data.endereco}</p>}
            {(data?.cidade || data?.estado) && (
              <p>{[data?.cidade, data?.estado].filter(Boolean).join(", ")}</p>
            )}
            {data?.telefone && <p>{data.telefone}</p>}
            {data?.email && <p>{data.email}</p>}
            {data?.linkedin && <p>{data.linkedin}</p>}
          </section>

          <section>
            <h3>SKILLS</h3>
            {habilidades.length > 0 ? (
              <ul>
                {habilidades.map((skill, i) => (
                  <li key={i}>
                    {typeof skill === "string"
                      ? skill
                      : `${skill.nome}${skill.nivel ? ` — ${skill.nivel}` : ""}`}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No skills added</p>
            )}
          </section>

          <section>
            <h3>LANGUAGES</h3>
            {idiomas.length > 0 ? (
              <ul>
                {idiomas.map((lang, i) => (
                  <li key={i}>
                    {typeof lang === "string"
                      ? lang
                      : `${lang.nome}${lang.nivel ? ` — ${lang.nivel}` : ""}`}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No languages added</p>
            )}
          </section>

          {cursos.length > 0 && (
            <section>
              <h3>COURSES</h3>
              <ul>
                {cursos.map((curso, i) => (
                  <li key={i}>
                    <strong>{curso.nome}</strong>
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

        <main className="cv-main">
          <section>
            <h3>SUMMARY</h3>
            <p>{data?.resumo || "Professional summary not provided."}</p>
          </section>

          <section>
            <h3>WORK EXPERIENCE</h3>

            {experiencias.length > 0 ? (
              experiencias.map((exp, i) => (
                <div key={i} className="job">
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
                      <p className="job-company">
                        {exp.empresa || "Empresa"}
                        {exp.local ? ` • ${exp.local}` : ""}
                      </p>
                    </div>

                    {(exp.inicio || exp.fim) && (
                      <div style={{ fontSize: "14px", color: "#666" }}>
                        {[exp.inicio, exp.fim].filter(Boolean).join(" - ")}
                      </div>
                    )}
                  </div>

                  {exp.atividades && (
                    <ul style={{ marginTop: "10px", paddingLeft: "18px" }}>
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
              <p>No work experience added.</p>
            )}
          </section>

          <section>
            <h3>EDUCATION</h3>

            {formacoes.length > 0 ? (
              formacoes.map((edu, i) => (
                <div key={i} className="job">
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
                      <p className="job-company">
                        {edu.instituicao || "Instituição"}
                        {edu.local ? ` • ${edu.local}` : ""}
                      </p>
                    </div>

                    {(edu.inicio || edu.fim) && (
                      <div style={{ fontSize: "14px", color: "#666" }}>
                        {[edu.inicio, edu.fim].filter(Boolean).join(" - ")}
                      </div>
                    )}
                  </div>

                  {edu.detalhes && (
                    <p style={{ marginTop: "8px" }}>{edu.detalhes}</p>
                  )}
                </div>
              ))
            ) : (
              <p>No education added.</p>
            )}
          </section>

          <section>
            <h3>REFERENCES</h3>

            {referencias.length > 0 ? (
              referencias.map((ref, i) => (
                <div key={i} className="job">
                  <strong>{ref.nome || "Reference"}</strong>
                  {ref.empresa && <p className="job-company">{ref.empresa}</p>}
                  {ref.contato && <p>{ref.contato}</p>}
                </div>
              ))
            ) : (
              <p>Available upon request.</p>
            )}
          </section>
        </main>
      </div>
    </div>
  );
}