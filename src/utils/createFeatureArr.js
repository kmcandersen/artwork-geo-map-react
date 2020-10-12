import { getCoords, capitalize, truncateString } from "./helpers.js";

export const createFeatureArr = (arr, placesArr) => {
  let features = [];
  let idCount = 0;

  for (let i = 0; i < arr.length; i++) {
    let el = arr[i];

    //exclude API results with no image or location
    if (el.thumbnail && el.place_of_origin) {
      idCount++;

      let feature = {
        ObjectID: 0,
        aic_id: 0,
        title: "",
        artist_title: "",
        place_of_origin: "",
        date_start: 0,
        date_display: 0,
        thumbnailUrl: "",
        classification_title: "",
        style_title: "",
        api_link: "",
        is_public_domain: null,
        coords: [],
        latitude: 0,
        longitude: 0,
      };

      feature.ObjectID = idCount;
      feature.aic_id = el.id;
      feature.title = truncateString(el.title);
      feature.artist_title = el.artist_title || "Unknown Artist";
      feature.place_of_origin = el.place_of_origin;
      feature.date_start = el.date_start;
      feature.date_display = el.date_display;
      feature.thumbnailUrl = el.thumbnail.url;
      feature.classification_title =
        el.classification_title.length &&
        capitalize(truncateString(el.classification_title, 39));
      feature.style_title = el.style_title && capitalize(el.style_title);
      feature.api_link = el.api_link;
      feature.is_public_domain = el.is_public_domain.toString();
      //so setCoords only run 1x
      feature.coords = getCoords(placesArr, el.place_of_origin) || [];
      feature.longitude = feature.coords[0] || 0;
      feature.latitude = feature.coords[1] || 0;
      //only items with a matching place & identified coordinates in are held in state (& shown in list)
      if (feature.coords.length) {
        features.push(feature);
      }
    }
  }
  return features;
};
