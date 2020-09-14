import { getCoords } from "./helpers.js";

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
        latitude: 0,
        longitude: 0,
      };

      feature.ObjectID = idCount;
      feature.aic_id = el.id;
      feature.title = el.title;
      feature.artist_title = el.artist_title;
      feature.place_of_origin = el.place_of_origin;
      feature.date_start = el.date_start;
      feature.date_display = el.date_display;
      feature.thumbnailUrl = el.thumbnail.url;
      feature.classification_title = el.classification_title;
      feature.style_title = el.style_title;
      feature.api_link = el.api_link;
      feature.is_public_domain = el.is_public_domain.toString();
      feature.longitude = getCoords(placesArr, el.place_of_origin)[0];
      feature.latitude = getCoords(placesArr, el.place_of_origin)[1];
      features.push(feature);
    }
  }
  return features;
};
