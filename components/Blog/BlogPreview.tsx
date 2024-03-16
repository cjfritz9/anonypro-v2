import React from 'react';

interface Props {
  translations: {
    heading: string;
  };
}
const BlogPreview: React.FC<Props> = ({ translations }) => {
  const { heading } = translations;
  return <div></div>;
};

export default BlogPreview;
