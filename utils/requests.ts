import { cache } from 'react';

interface Highlight {
  title: string;
  media_count: number;
  coverImage: string;
  created_at: number;
  items: {
    id: string;
    type: 'image' | 'video';
    imageUrl: string;
    videoUrl: string | null;
  }[];
}

export const fetchProfile = cache(async (username: string) => {
  const response = await fetch('/api/profile', {
    method: 'POST',
    body: JSON.stringify({
      username: username,
    }),
  });

  if (!response) return;

  try {
    const result = await response.json();

    return result;
  } catch (error) {
    console.error(error);
  }
});

export const fetchStories = cache(async (username: string) => {
  const response = await fetch('/api/stories', {
    method: 'POST',
    body: JSON.stringify({
      username: username,
    }),
  });

  if (!response) return;

  try {
    const result = await response.json();

    return result;
  } catch (error) {
    console.error(error);
  }
});

export const fetchPosts = cache(async (id: string) => {
  const response = await fetch('/api/posts', {
    method: 'POST',
    body: JSON.stringify({
      id,
    }),
  });

  if (!response) return;

  try {
    const result = await response.json();

    return result;
  } catch (error) {
    console.error(error);
  }
});

export const fetchHighlights = cache(async (username: string) => {
  const response = await fetch('/api/highlights', {
    method: 'POST',
    body: JSON.stringify({
      username,
    }),
  });

  if (!response) return;

  try {
    const result = await response.json();

    return result;
  } catch (error) {
    console.error(error);
  }
});

export const fetchHighlightById = cache(
  async (highlightId: string): Promise<Highlight | undefined> => {
    const response = await fetch(`/api/highlights/${highlightId}`);

    if (!response) return;

    try {
      const result = await response.json();

      return result;
    } catch (error) {
      console.error(error);
    }
  }
);

export const fetchReels = cache(async (id: string) => {
  const response = await fetch('/api/reels', {
    method: 'POST',
    body: JSON.stringify({
      id,
    }),
  });

  if (!response) return;

  try {
    const result = await response.json();

    return result;
  } catch (error) {
    console.error(error);
  }
});

export const postBoost = cache(async (username: string) => {
  try {
    const response = await fetch('/api/boost/story', {
      method: 'POST',
      body: JSON.stringify({
        username,
      }),
    });

    if (!response) return;

    const result = await response.json();

    return result;
  } catch (error) {
    console.error(error);
  }
});
