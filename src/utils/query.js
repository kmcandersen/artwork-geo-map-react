export const query = (startYear, endYear, classQuery) => {
  if (classQuery) {
    //queryClass
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
        bool: {
          filter: [
            {
              match: {
                classification_title: {
                  query: classQuery,
                },
              },
            },
            {
              term: {
                is_public_domain: true,
              },
            },
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
    };
  } else {
    //query noClass
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
        bool: {
          filter: [
            // {
            //   match: {
            //     classification_title: {
            //       query: "(sculpture) OR (stone) OR (marble) OR (bust/head) OR (statue) OR (terracotta)",
            //     },
            //   },
            // },
            {
              term: {
                is_public_domain: true,
              },
            },
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
    };
  }
};
