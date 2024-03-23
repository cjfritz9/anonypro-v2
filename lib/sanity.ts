import { createClient } from 'next-sanity';

export const client = createClient({
  apiVersion: '2022-03-07',
  dataset: 'production',
  projectId: 'vvw86v5i',
  useCdn: false,
});

// interface Article {

// }

export const getAllArticles = async (page = 1) => {
  const query = `
  *[_type == 'article'] | order(_createdAt desc)[${(page - 1) * 12}..${page * 12 - 1}] {
    'id': _id,
    'slug': slug.current,
    title,
    category,
    'author': *[_type == 'author' && article.author._ref == ^.id][0] {
      name,
      'slug': slug.current
    },
    datePosted,
    heroImage {
      'url': asset->{url}
    },
    "total": count(*[_type == 'article']),
  }`;

  const data = await client.fetch(query);

  return data;
};

export const getLatestThreeArticles = async () => {
  const query = `
  *[_type == 'article'] | order(_createdAt desc)[0..2] {
    'id': _id,
    'slug': slug.current,
    title,
    category,
    'author': *[_type == 'author' && article.author._ref == ^.id][0] {
      name,
      'slug': slug.current
    },
    datePosted,
    heroImage {
      'url': asset->{url}
    },
  }`;

  const data = await client.fetch(query);

  return data;
};

export const getArticleByCategorySlug = async (
  category: string,
  slug: string
) => {
  const query = `
  *[_type == 'article' && category == '${category}' && slug.current == '${slug}'] | order(_createdAt desc)[0] {
    'id': _id,
    title,
    category,
    'author': *[_type == 'author' && article.author._ref == ^.id][0] {
      name,
      'slug': slug.current,
      bio,
      profilePic {
        asset->{url}
      },
      socialLinks,
      titles
    },
    datePosted,
    description,
    heroImage {
      'url': asset->{url}
    },
    content
  }`;

  const data = await client.fetch(query);

  return data;
};

export const getArticlesByCategory = async (category: string, page = 1) => {
  const query = `
  *[_type == 'article' && category == '${category}'] | order(_createdAt desc)[${(page - 1) * 12}..${page * 12 - 1}] {
    'id': _id,
    'slug': slug.current,
    title,
    category,
    'author': *[_type == 'author' && article.author._ref == ^.id][0] {
      name,
      'slug': slug.current
    },
    datePosted,
    heroImage {
      'url': asset->{url}
    },
    "total": count(*[_type == "article" && category == '${category}']),
  }`;

  const data = await client.fetch(query);

  return data;
};

export const getAuthorBySlug = async (slug: string) => {
  const query = `
  *[_type == 'author' && slug.current == '${slug}'][0] {
    name,
    'slug': slug.current,
    'bio': bioLong,
    profilePic {
      asset->{url}
      },
    socialLinks,
    titles,
    'articles': *[_type == "article" && author._ref in *[_type=="author" && slug.current == '${slug}']._id] | order(_createdAt desc)[0..2] {
      'id': _id,
      'slug': slug.current,
      title,
      category,
      datePosted,
      heroImage {
      'url': asset->{url}
      },
      "total": count(*[_type == "article" && author._ref in *[_type=="author" && slug.current == '${slug}']._id]),
    }
  }`;

  const data = await client.fetch(query);

  return data;
};

export const getArticlesByAuthor = async (slug: string, page = 1) => {
  const query = `
  *[_type == "article" && author._ref in *[_type=="author" && slug.current == '${slug}']._id] | order(_createdAt desc)[${(page - 1) * 3}..${page * 3 - 1}] {
    'id': _id,
    'slug': slug.current,
    title,
    category,
    datePosted,
    heroImage {
    'url': asset->{url}
    }
  }`;

  const data = await client.fetch(query);

  return data;
};

export const getArticlesForSitemap = async () => {
  const query = `
  *[_type == "article"] {
    'slug': slug.current,
    category,
    datePosted
  }`;

  const data = await client.fetch(query);

  return data;
};

export const getAuthorsForSitemap = async () => {
  const query = `
  *[_type == "author"] {
    'slug': slug.current,
    _updatedAt
  }`;

  const data = await client.fetch(query);

  return data;
}
