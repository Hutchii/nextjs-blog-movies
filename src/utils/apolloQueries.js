import { gql } from "@apollo/client";

export const FEATURED_MOVIES = gql`
  query FeaturedMovies {
    movies(
      pagination: { start: 0, limit: 8 }
      sort: ["featured.id:desc", "createdAt:desc"]
    ) {
      data {
        id
        attributes {
          title
          description
          createdAt
          slug
          image {
            data {
              attributes {
                url
              }
            }
          }
          directors {
            data {
              attributes {
                director
              }
            }
          }
        }
      }
    }
    directors(
      pagination: { start: 0, limit: 1 }
      filters: { is_featured: { eq: true } }
    ) {
      data {
        id
        attributes {
          director
          image {
            data {
              attributes {
                url
              }
            }
          }
        }
      }
    }
    articles {
      data {
        id
        attributes {
          title
          createdAt
          description
          slug
          image {
            data {
              attributes {
                url
              }
            }
          }
        }
      }
      meta {
        pagination {
          total
        }
      }
    }
  }
`;

export const MOVIES_FILTERS = gql`
  query MoviesFilters(
    $start: Int!
    $limit: Int!
    $genre: String!
    $title: String!
  ) {
    movies(
      pagination: { start: $start, limit: $limit }
      sort: "createdAt:desc"
      filters: {
        genres: { title: { eq: $genre } }
        title: { contains: $title }
      }
    ) {
      data {
        id
        attributes {
          title
          description
          createdAt
          slug
          image {
            data {
              attributes {
                url
              }
            }
          }
          directors {
            data {
              attributes {
                director
              }
            }
          }
          genres {
            data {
              attributes {
                title
              }
            }
          }
        }
      }
      meta {
        pagination {
          total
        }
      }
    }
  }
`;

export const DIRECTOR = gql`
  query Director {
    directors(filters: { is_featured: { eq: true } }) {
      data {
        id
        attributes {
          director
          image {
            data {
              attributes {
                url
              }
            }
          }
        }
      }
    }
  }
`;

export const ARTICLES = gql`
  query Articles($start: Int!, $limit: Int!) {
    articles(pagination: { start: $start, limit: $limit }) {
      data {
        id
        attributes {
          title
          createdAt
          description
          slug
          image {
            data {
              attributes {
                url
              }
            }
          }
        }
      }
      meta {
        pagination {
          total
        }
      }
    }
  }
`;

export const MOVIES_FILTERS_PAGINATION = gql`
  query MoviesFilters {
    movies(
      sort: "createdAt:desc"
      pagination: { start: 0, limit: 100 }
      ) 
      {
      data {
        id
        attributes {
          title
          description
          createdAt
          slug
          image {
            data {
              attributes {
                url
              }
            }
          }
          directors {
            data {
              attributes {
                director
              }
            }
          }
          genres {
            data {
              attributes {
                title
              }
            }
          }
        }
      }
    }
  }
`;

export const SLUG = gql`
  query Slug {
    movies {
      data {
        attributes {
          slug
        }
      }
    }
  }
`;

export const SLUG_DATA = gql`
  query SlugData($slug: String!, $publicationState: PublicationState!) {
    movies(
      filters: { slug: { eq: $slug } }
      publicationState: $publicationState
    ) {
      data {
        id
        attributes {
          title
          content
          createdAt
          slug
          image {
            data {
              attributes {
                url
              }
            }
          }
          directors {
            data {
              attributes {
                director
              }
            }
          }
          genres {
            data {
              attributes {
                title
              }
            }
          }
        }
      }
    }
  }
`;

export const PREVIEW = gql`
  query SlugData($slug: String!) {
    movies(filters: { slug: { eq: $slug } }, publicationState: PREVIEW) {
      data {
        attributes {
          slug
        }
      }
    }
  }
`;