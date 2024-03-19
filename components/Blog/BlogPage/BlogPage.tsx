import React from 'react';
import BlogCard from '../BlogCard';

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
}

const BlogPage: React.FC<Props> = ({ articles }) => {
  return (
    <div>
      <h1></h1>
      <div className="overflow flex flex-wrap gap-8">
        {articles.map((article: any) => (
          <BlogCard
            key={article.id}
            author={{ name: article.author.name, slug: article.author.slug }}
            category={article.category}
            datePosted={article.datePosted}
            thumbnailUrl={article.heroImage.url.url}
            title={article.title}
            slug={article.slug}
          />
        ))}
      </div>
    </div>
  );
};

export default BlogPage;
