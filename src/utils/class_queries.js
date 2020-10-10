export const sculpture =
  "(sculpture) OR (stone) OR (marble) OR (bust/head) OR (statue) OR (terracotta)";

//   "(sculpture) OR (stone) OR (marble) OR ('bust/head') OR (statue) OR (statuette) OR ('architectural sculpture') OR ('terracotta (sculpture)') OR ('sculpture/stone') OR ('sculpture/wood') OR ('installation (sculpture)')";

export const classStrToQuery = (classStr) => {
  switch (classStr) {
    case "sculpture":
      return sculpture;
      break;
    //case y:
    // code block
    //break;
    //default:
    // code block
  }
};
