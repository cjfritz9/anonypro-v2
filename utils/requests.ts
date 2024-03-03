import { cache } from 'react';

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
