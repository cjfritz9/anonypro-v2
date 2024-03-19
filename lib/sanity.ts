import { sanityClient } from '@/app/api/clients';

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
    }
  }`;

  const data = await sanityClient.fetch(query);

  return data;
};

export const getArticleByCategorySlug = async (
  category: string,
  slug: string
) => {
  const query = `
  *[_type == 'article' && category == '${category}' && slug.current == '${slug}'] | order(_createdAt desc)[0] {
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

  const data = await sanityClient.fetch(query);

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
    }
  }`;

  const data = await sanityClient.fetch(query);

  return data;
};
