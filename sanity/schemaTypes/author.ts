const author = {
  name: 'author',
  title: 'Author',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Full Name',
      type: 'string',
      validation: (rule: any) => rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      validation: (rule: any) => rule.required(),
      options: {
        source: 'name',
      },
    },
    {
      name: 'titles',
      title: 'Titles',
      type: 'array',
      of: [
        {
          type: 'string',
        },
      ],
      options: {
        list: [
          {
            title: 'author',
            value: 'AUTHOR',
          },
          {
            title: 'contributor',
            value: 'CONTRIBUTOR',
          },
          {
            title: 'editor',
            value: 'EDITOR',
          },
        ],
      },
      validation: (rule: any) => rule.required(),
    },
    {
      name: 'socialLinks',
      title: 'Social Media Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              type: 'url',
              name: 'Facebook',
            },
            {
              type: 'url',
              name: 'LinkedIn',
            },
            {
              type: 'url',
              name: 'Instagram',
            },
          ],
        },
      ],
    },
    {
      name: 'bio',
      title: 'About the Author',
      type: 'text',
      validation: (rule: any) => rule.required(),
    },
    {
      name: 'profilePic',
      title: 'Profile Picture',
      type: 'image',
    },
  ],
}

export default author
