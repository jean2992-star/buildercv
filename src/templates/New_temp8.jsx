import React from "react";

export default function NewTemp8({ data, t }) {
  const safeData = data || {};
  
  // Alterado aqui: O padrão agora é 100% em Português
  const safeT = t || {
    summary: "RESUMO",
    experience: "EXPERIÊNCIA",
    education: "FORMAÇÃO",
    skills: "HABILIDADES",
    languages: "IDIOMAS",
    references: "REFERÊNCIAS",
  };

  const experiencias = safeData.experiencias || [];
  const formacoes = safeData.formacoes || [];
  const habilidades = safeData.habilidades || [];
  const idiomas = safeData.idiomas || [];

  return (
    <div className="cv-page new-temp8">
      {/* CABEÇALHO */}
      <header className="header-n8">
        <h1 className="name-n8">{safeData.nome}</h1>
        <h2 className="role-n8">{safeData.cargo}</h2>
        <p className="address-n8">
          {[safeData.endereco, safeData.cidade, safeData.estado]
            .filter(Boolean)
            .join(", ")}
        </p>
      </header>

      {/* LINHA DE CONTATO COM BORDAS */}
      <div className="contact-row-n8">
        <span>{safeData.telefone}</span>
        <span>{safeData.email}</span>
      </div>

      {/* RESUMO */}
      {safeData.resumo && (
        <section className="section-n8">
          <div className="section-title-container-n8">
            <h3 className="section-title-n8">{safeT.summary}</h3>
          </div>
          <p className="profile-text-n8">{safeData.resumo}</p>
        </section>
      )}

      {/* EXPERIÊNCIA */}
      {experiencias.length > 0 && (
        <section className="section-n8">
          <div className="section-title-container-n8">
            <h3 className="section-title-n8">{safeT.experience}</h3>
          </div>
          
          {experiencias.map((exp, index) => (
            <div key={index} className="exp-item-n8">
              <div className="exp-header-n8">
                <div className="exp-title-company-n8">
                  <span className="diamond-bullet">❖</span>
                  <strong style={{ marginLeft: "8px" }}>{exp.cargo}</strong>
                  {exp.empresa && <span> - {exp.empresa}</span>}
                </div>
                
                {/* LINHA PONTILHADA MÁGICA AQUI */}
                <div className="dotted-leader-n8"></div>

                <div className="exp-dates-container-n8">
                  <div className="exp-dates-n8">
                    {[exp.inicio, exp.fim].filter(Boolean).join(" - ")}
                  </div>
                  {exp.local && <div className="exp-location-n8">{exp.local}</div>}
                </div>
              </div>
              
              {exp.atividades && (
                <ul className="exp-activities-n8">
                  {exp.atividades
                    .split("\n")
                    .filter((item) => item.trim() !== "")
                    .map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                </ul>
              )}
            </div>
          ))}
        </section>
      )}

      {/* FORMAÇÃO */}
      {formacoes.length > 0 && (
        <section className="section-n8">
          <div className="section-title-container-n8">
            <h3 className="section-title-n8">{safeT.education}</h3>
          </div>
          
          {formacoes.map((form, index) => (
            <div key={index} className="exp-item-n8">
              <div className="exp-header-n8">
                <div className="exp-title-company-n8">
                  <span className="diamond-bullet">❖</span>
                  <strong style={{ marginLeft: "8px" }}>{form.curso}</strong>
                  {form.instituicao && <span>, {form.instituicao}</span>}
                </div>
                
                <div className="dotted-leader-n8"></div>

                <div className="exp-dates-container-n8">
                  <div className="exp-dates-n8">
                    {[form.inicio, form.fim].filter(Boolean).join(" - ")}
                  </div>
                  {form.local && <div className="exp-location-n8">{form.local}</div>}
                </div>
              </div>
              {form.detalhes && <p className="exp-activities-n8" style={{listStyle: 'none', fontStyle: 'italic', paddingLeft: '28px'}}>{form.detalhes}</p>}
            </div>
          ))}
        </section>
      )}

      {/* HABILIDADES E IDIOMAS */}
      {(habilidades.length > 0 || idiomas.length > 0) && (
        <section className="section-n8">
          <div className="section-title-container-n8">
            <h3 className="section-title-n8">{safeT.skills} & {safeT.languages}</h3>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", paddingLeft: "20px" }}>
            {habilidades.length > 0 && (
              <ul className="exp-activities-n8">
                {habilidades.map((hab, index) => (
                  <li key={index}><strong>{hab.nome}</strong> - {hab.nivel}</li>
                ))}
              </ul>
            )}
            {idiomas.length > 0 && (
              <ul className="exp-activities-n8">
                {idiomas.map((idioma, index) => (
                  <li key={index}><strong>{idioma.nome}</strong> - {idioma.nivel}</li>
                ))}
              </ul>
            )}
          </div>
        </section>
      )}
    </div>
  );
}