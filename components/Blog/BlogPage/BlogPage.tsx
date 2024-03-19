import React from 'react';
import BlogCard from '../BlogCard';
import CategorySelector from '../CategorySelector';

export const categories = [
  {
    name: 'ALL',
    displayName: 'All Articles',
    handle: '',
  },
  {
    name: 'STORY_VIEWER',
    displayName: 'Story Viewer',
    handle: 'story-viewer',
  },
  {
    name: 'POST_HIGHLIGHTS',
    displayName: 'Post Highlights',
    handle: 'post-highlights',
  },
  {
    name: 'CREATING_POSTS',
    displayName: 'Creating Posts',
    handle: 'creating-posts',
  },
];

export type Category = (typeof categories)[0];

interface Props {
  articles: any[];
  heading: string;
}

const BlogPage: React.FC<Props> = ({ articles, heading }) => {
  return (
    <div className="my-12 lg:my-20">
      <h1 className="mb-12 text-center text-4xl font-semibold">{heading}</h1>
      <CategorySelector />
      <div className="overflow flex justify-center flex-wrap gap-8">
        {articles && articles[0] ? (
          articles.map((article: any) => (
            <BlogCard
              key={article.id}
              author={{ name: article.author.name, slug: article.author.slug }}
              category={article.category}
              datePosted={article.datePosted}
              thumbnailUrl={article.heroImage.url.url}
              title={article.title}
              slug={article.slug}
            />
          ))
        ) : (
          <h2 className="prose w-full text-center my-6">
            No articles here yet, stay tuned!
          </h2>
        )}
      </div>
    </div>
  );
};

export default BlogPage;
