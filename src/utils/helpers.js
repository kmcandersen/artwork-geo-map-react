//arr = places places_list.js
export const getCoords = (placesArr, name) => {
  for (let i = 0; i < placesArr.length; i++) {
    if (name in placesArr[i]) {
      return placesArr[i][name].coords;
    }
  }
};

export const getFlags = (name, placesArr) => {
  let result = `<b>${name}</b>`;
  for (let i = 0; i < placesArr.length; i++) {
    for (let key in placesArr[i]) {
      if (key === name) {
        result = `<span class="flag-icon flag-icon-${placesArr[i][key].code}"></span><b>${name}</b>`;
      }
    }
  }
  return result;
};

export const capitalize = (str) => {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
};

//to order fetch results by place
export const compareValues = (key, order = "asc") => {
  return function innerSort(a, b) {
    if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
      // property doesn't exist on either object
      return 0;
    }

    const varA = typeof a[key] === "string" ? a[key].toUpperCase() : a[key];
    const varB = typeof b[key] === "string" ? b[key].toUpperCase() : b[key];

    let comparison = 0;
    if (varA > varB) {
      comparison = 1;
    } else if (varA < varB) {
      comparison = -1;
    }
    return order === "desc" ? comparison * -1 : comparison;
  };
};

export const truncateString = (str, len = 90, append = "...") => {
  if (str.length < len) {
    return str;
  }
  let truncString = str.slice(0, len); //cut the string at the new length
  truncString = truncString.replace(/\s+\S*$/, ""); //find the last punctuation mark or space before the sliced text
  if (truncString[truncString.length - 1] === ",") {
    truncString = truncString.slice(0, -1);
  }
  truncString = truncString + append;
  return truncString;
};
