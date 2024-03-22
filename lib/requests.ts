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

interface CaptchaResponse {
  success: boolean;
  score: number;
  action: string;
  challenge_ts: string;
  hostname: string;
  'error-codes'?: string[];
}

export const postRecaptchaToken = async (
  token: string
): Promise<CaptchaResponse | undefined> => {
  try {
    const response = await fetch(`/api/auth/recaptcha`, {
      method: 'POST',
      body: JSON.stringify(token),
    });

    if (!response) return;

    const result = await response.json();

    return result;
  } catch (error) {
    console.error(error);
  }
};

export const fetchProfile = async (username: string) => {
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
};

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

    if (result && result.status === 'ok') {
      return result.data;
    }
  } catch (error) {
    console.error(error);
  }
});

export const fetchPosts = cache(async (id: string, nextCursor?: string) => {
  const response = await fetch('/api/posts', {
    method: 'POST',
    body: JSON.stringify({
      id,
      next_cursor: nextCursor,
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

export const fetchReels = cache(async (id: string, nextCursor?: string) => {
  const response = await fetch('/api/reels', {
    method: 'POST',
    body: JSON.stringify({
      id,
      next_cursor: nextCursor,
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

export const getBoostViews = cache(async (username: string) => {
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

export const getBoostLikes = cache(async (shortcode: string) => {
  try {
    const response = await fetch('/api/boost/likes', {
      method: 'POST',
      body: JSON.stringify({
        shortcode,
      }),
    });

    if (!response) return;

    const result = await response.json();

    return result;
  } catch (error) {
    console.error(error);
  }
});

export const postNewContactForm = async ({
  name,
  email,
  subject,
  message,
}: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) => {
  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      body: JSON.stringify({
        name,
        email,
        subject,
        message,
      }),
    });

    if (!response) return;

    const result = await response.json();

    return result;
  } catch (error) {
    console.error(error);
  }
};
