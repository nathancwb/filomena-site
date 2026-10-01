export interface AuthorInfo {
  name: string;
  type: "Organization" | "Person";
  role: string;
  url: string;
  linkedin: string;
  sameAs: string[];
}

export const authorsRegistry: Record<string, AuthorInfo> = {
  "Filomena Propaganda": {
    name: "Filomena Propaganda",
    type: "Organization",
    role: "Estratégia, Branding & Performance",
    url: "https://www.filomenapropaganda.com.br/sobre/",
    linkedin: "https://www.linkedin.com/company/filomenaagencia/",
    sameAs: [
      "https://www.linkedin.com/company/filomenaagencia/",
      "https://www.instagram.com/filomenaagencia/",
      "https://www.facebook.com/filomenaagencia",
      "https://www.behance.net/filomenapropaganda"
    ]
  },
  "Equipe Filomena": {
    name: "Filomena Propaganda",
    type: "Organization",
    role: "Estratégia, Branding & Performance",
    url: "https://www.filomenapropaganda.com.br/sobre/",
    linkedin: "https://www.linkedin.com/company/filomenaagencia/",
    sameAs: [
      "https://www.linkedin.com/company/filomenaagencia/",
      "https://www.instagram.com/filomenaagencia/",
      "https://www.facebook.com/filomenaagencia"
    ]
  },
  "Ana Carolina Zanchim": {
    name: "Ana Carolina Zanchim",
    type: "Person",
    role: "Diretora de Atendimento e Estratégia",
    url: "https://www.filomenapropaganda.com.br/sobre/",
    linkedin: "https://www.linkedin.com/company/filomenaagencia/",
    sameAs: [
      "https://www.linkedin.com/company/filomenaagencia/"
    ]
  },
  "Nathan Almeida": {
    name: "Nathan Almeida",
    type: "Person",
    role: "Diretor de Criação & Estratégia",
    url: "https://www.filomenapropaganda.com.br/sobre/",
    linkedin: "https://www.linkedin.com/company/filomenaagencia/",
    sameAs: [
      "https://www.linkedin.com/company/filomenaagencia/"
    ]
  }
};

export const DEFAULT_AUTHOR = "Filomena Propaganda";

export function getAuthorInfo(name?: string, customLinkedIn?: string, customRole?: string): AuthorInfo {
  const chosenName = (!name || name === "Equipe Filomena") ? DEFAULT_AUTHOR : name;
  const isOrg = chosenName.toLowerCase().includes("filomena") || chosenName.toLowerCase().includes("agência") || chosenName.toLowerCase().includes("agencia");
  
  const base = authorsRegistry[chosenName] || {
    name: chosenName,
    type: isOrg ? "Organization" : "Person",
    role: customRole || (isOrg ? "Agência de Publicidade & Marketing" : "Especialista em Branding e Estratégia"),
    url: "https://www.filomenapropaganda.com.br/sobre/",
    linkedin: customLinkedIn || "https://www.linkedin.com/company/filomenaagencia/",
    sameAs: [customLinkedIn || "https://www.linkedin.com/company/filomenaagencia/"]
  };

  const finalLinkedIn = customLinkedIn || base.linkedin;
  const finalSameAs = Array.from(new Set([...(base.sameAs || []), ...(finalLinkedIn ? [finalLinkedIn] : [])]));

  return {
    ...base,
    name: chosenName,
    role: customRole || base.role,
    linkedin: finalLinkedIn,
    sameAs: finalSameAs
  };
}
