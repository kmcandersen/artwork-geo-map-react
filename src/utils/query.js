export const query = (startYear, endYear) => {
  return {
    resources: "artworks",
    fields: [
      "id",
      "title",
      "artist_title",
      "image_id",
      "place_of_origin",
      "date_start",
      "date_display",
      "thumbnail",
      "classification_title",
      "style_title",
      "is_public_domain",
      "api_link",
    ],
    boost: false,
    limit: 25,
    query: {
      function_score: {
        query: {
          bool: {
            filter: [
              {
                term: {
                  is_public_domain: true,
                },
              },
              // {
              //   match: {
              //     place_of_origin: "China",
              //     classification_title: "photo*",
              //   },
              // },
              {
                range: {
                  date_start: {
                    gte: startYear,
                  },
                },
              },
              {
                range: {
                  date_start: {
                    lte: endYear,
                  },
                },
              },
              {
                exists: {
                  field: "image_id",
                },
              },
              {
                exists: {
                  field: "thumbnail.width",
                },
              },
              {
                exists: {
                  field: "thumbnail.height",
                },
              },
            ],
          },
        },
        boost_mode: "replace",
        random_score: {
          field: "id",
        },
      },
    },
  };
};
