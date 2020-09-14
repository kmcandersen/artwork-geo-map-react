import { loadModules } from "esri-loader";

export function loadLayer(graphicsArr) {
  return loadModules(["esri/layers/FeatureLayer"]).then(([FeatureLayer]) => {
    const layer = new FeatureLayer({
      title: "Artwork Details",
      copyright: "Art Institute of Chicago",
      outFields: [
        "ObjectID",
        "aic_id",
        "title",
        "artist_title",
        "place_of_origin",
        "date_start",
        "date_display",
        "thumbnailUrl",
        "classification_title",
        "style_title",
        "api_link",
        "is_public_domain",
        "latitude",
        "longitude",
      ],
      fields: [
        {
          name: "ObjectID",
          type: "oid",
        },
        {
          name: "aic_id",
          type: "integer",
        },
        {
          name: "title",
          type: "string",
        },
        {
          name: "artist_title",
          type: "string",
        },
        {
          name: "place_of_origin",
          type: "string",
        },
        {
          name: "date_start",
          type: "integer",
        },
        {
          name: "date_display",
          type: "string",
        },
        {
          name: "thumbnailUrl",
          type: "string",
        },
        {
          name: "classification_title",
          type: "string",
        },
        {
          name: "style_title",
          type: "string",
        },
        {
          name: "api_link",
          type: "string",
        },
        {
          name: "is_public_domain",
          type: "string",
        },
        {
          name: "latitude",
          type: "double",
        },
        {
          name: "longitude",
          type: "double",
        },
      ],

      objectIdField: "ObjectID",
      geometryType: "point",
      spatialReference: { wkid: 4326 },
      source: graphicsArr || [], // empty arr at first
      renderer: {
        type: "simple",
        symbol: {
          type: "simple-marker",
          color: "#B50938",
          outline: null,
          size: 7,
        },
      },
    });
    return layer;
  });
}
