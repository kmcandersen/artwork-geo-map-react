export const drawing =
  "(drypoint) OR (aquatint) OR (book) OR (etching) OR (woodblock) OR (woodcut) OR (bite) OR (biting) OR (engraving) OR (engraved) OR (sketch) OR (sketchbook) OR (leaf) OR (drawing) OR (drawings) OR (perspective) OR (elevation) OR (graphite) OR (charcoal) OR (silkscreen) OR (screenprint) OR (poster) OR (stencil) OR (pastel) OR (lithotint) OR (crayon) OR (pencil) OR (mezzotint) OR (serigraph) OR (screentone)";

export const painting =
  "(painting) OR (paint) OR (acrylic) OR (oil) OR (mural) OR (bark) OR (fresco) OR (watercolor) OR (gouache) OR (wash) OR (brush) OR (scroll)";

export const photography =
  "(photograph) OR (photography) OR (chromogenic) OR (photomechanical) OR (gelatin) OR (albumen) OR (collodion) OR (collotype) OR (carte-de-visite) OR (daguerreotype) OR (tintype) OR (ambrotype) OR (woodburytype) OR (bromoil) OR (bichromate) OR (salted) OR (negative) OR (transparency) OR (lantern)";

export const sculpture =
  "(sculpture) OR (stone) OR (marble) OR (bust/head) OR (statue) OR (terracotta)";

export const textile =
  "(textile) OR (weaving) OR (needlework) OR (costume) OR (lace) OR (cloth) OR (clothing) OR (garment) OR (dress) OR (fiber) OR (silk) OR (wool) OR (sampler) OR (embroidery)";

export const classStrToQuery = (classStr) => {
  switch (classStr) {
    case "drawing":
      return drawing;
    case "painting":
      return painting;
    case "photography":
      return photography;
    case "sculpture":
      return sculpture;
    case "textile":
      return textile;
    default:
      return "";
  }
};
