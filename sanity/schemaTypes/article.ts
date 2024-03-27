const article = {
  name: 'article',
  title: 'Blog Article',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title of Blog Article',
      type: 'string',
      validation: (rule: any) => rule.required().min(10).max(80),
    },
    {
      name: 'slug',
      title: 'Slug of Blog Article (/blog/{slug})',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 80,
      },
    },
    {
      name: 'metaTitle',
      title: 'Meta Title',
      type: 'string',
      validation: (rule: any) => rule.required(),
    },
    {
      name: 'metaDesc',
      title: 'Meta Description',
      type: 'string',
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          {
            title: 'Story Viewer',
            value: 'story-viewer',
          },
          {
            title: 'Post Highlights',
            value: 'post-highlights',
          },
          {
            title: 'Creating Posts',
            value: 'creating-posts',
          },
        ],
        layout: 'radio',
      },
      validation: (rule: any) => rule.required(),
    },
    {
      name: 'author',
      type: 'reference',
      title: 'Author of the Article',
      to: [
        {
          type: 'author',
        },
      ],
      validation: (rule: any) => rule.required(),
    },
    {
      name: 'datePosted',
      type: 'date',
      title: 'Date Posted',
      validation: (rule: any) => rule.required(),
    },
    {
      name: 'description',
      title: 'Short Description',
      type: 'text',
      validation: (rule: any) => rule.required().min(64).max(354),
    },
    {
      name: 'heroImage',
      type: 'image',
      title: 'Hero Image',
      validation: (rule: any) => rule.required(),
    },
    {
      name: 'content',
      type: 'array',
      title: 'Article Content',
      of: [
        {
          type: 'block',
          marks: {
            decorators: [
              {title: 'Strong', value: 'strong'},
              {title: 'Emphasis', value: 'em'},
              {title: 'Code', value: 'code'},
            ],
          },
        },
        {
          type: 'image',
        },
      ],
      validation: (rule: any) => rule.required(),
    },
  ],
}

export default article
