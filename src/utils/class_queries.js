export const photography =
  "(photograph) OR (photography) OR (chromogenic) OR (photomechanical) OR (gelatin) OR (albumen) OR (collodion) OR (collotype) OR (carte-de-visite) OR (daguerreotype) OR (tintype) OR (ambrotype) OR (woodburytype) OR (bromoil) OR (bichromate)";

export const sculpture =
  "(sculpture) OR (stone) OR (marble) OR (bust/head) OR (statue) OR (terracotta)";

export const textile =
  "(textile) OR (weaving) OR (needlework) OR (costume) OR (lace) OR (cloth) OR (clothing) OR (garment) OR (dress) OR (fiber) OR (silk) OR (wool) OR (sampler) OR (embroidery)";

export const classStrToQuery = (classStr) => {
  switch (classStr) {
    case "sculpture":
      return sculpture;
    case "photography":
      return photography;
    case "textile":
      return textile;
    //default:
    // code block
  }
};
