import config from '../config';

// INTERFACES
interface IGAPIResponse {
  data: object;
  status: 'ok' | 'error';
  message: null | string;
}

interface IGProfileResponse extends IGAPIResponse {
  data: {
    id: string;
    username: string;
    full_name: string;
    followers: number;
    followings: number;
    biography: string;
    external_url: string;
    bio_links: [
      {
        title: string;
        lynx_url: string;
        url: string;
        link_type: string;
      },
    ];
    is_business_account: boolean;
    is_professional_account: boolean;
    is_private: boolean;
    is_verified: boolean;
    is_verified_by_mv4b: boolean;
    profile_pic_url: string;
    profile_pic_url_hd: string;
    pronouns: string[];
    post_count: number;
    eimu_id: string;
  };
}

interface IGStoryResponse extends IGAPIResponse {
  data: {
    stories: {
      image_versions2: {
        candidates: {
          url: string;
          height: number;
          width: number;
        }[];
      };
      original_height: number;
      original_width: number;
      pk: string;
      taken_at: number;
      video_versions?: {
        url: string;
        height: number;
        width: number;
        type: number;
      }[];
      has_audio?: boolean;
    }[];
  };
}

interface IGPostsResponse extends IGAPIResponse {
  data: {
    num_results: number;
    more_available: boolean;
    items: {
      id: string;
      pk: string;
      taken_at: number;
      like_count: number;
      comment_count: number;
      product_type: 'carousel_container' | 'clips' | 'feed';
      code: string;
      caption?: {
        text: string;
        media_id?: string;
      };
      image_versions2: {
        candidates: {
          url: string;
          height: number;
          width: number;
        }[];
      };
      carousel_media_count?: number;
      carousel_media?: {
        pk: string;
        image_versions2: {
          candidates: {
            height: number;
            width: number;
            url: string;
          }[];
        };
        video_versions?: {
          height: number;
          width: number;
          url: string;
        }[];
      }[];
      video_versions?: {
        height: number;
        width: number;
        url: string;
      }[];
    }[];
    next_max_id: string;
    user: {};
    auto_load_more_enabled: boolean;
    status: string;
  };
}

interface IGHighlightsResponse extends IGAPIResponse {
  data: {
    highlights: {
      id: string;
      title: string;
      cover_media: {
        cropped_image_version: {
          url: string;
        };
      };
    }[];
  };
}

interface IGHighlightByIdResponse extends IGAPIResponse {
  data: {
    title: string;
    media_count: number;
    cover_media: string;
    created_at: number;
    items: {
      media_id: string;
      image_hd: string;
      video_hd: string | null;
    }[];
  };
}

interface IGReelsResponse extends IGAPIResponse {
  data: {
    items: {
      media: {
        pk: string;
        id: string;
        code: string;
        taken_at: number;
        like_count: number;
        comment_count: number;
        play_count?: number;
        view_count?: number;
        product_type: 'igtv' | 'clips' | 'feed';
        caption?: {
          text: string;
        };
        image_versions2: {
          candidates: {
            url: string;
            height: number;
            width: number;
          }[];
        };
        video_versions?: {
          height: number;
          width: number;
          url: string;
        }[];
      };
    }[];
    paging_info: {
      max_id: string;
      more_available: boolean;
    };
  };
}

interface IGDownloadResponse extends IGAPIResponse {
  data: {
    main_media_hd: string;
    main_media_type: string;
    child_medias_hd?: {
      url: string;
      type: string;
    }[];
  };
}

/**
 * API Client used for automatically formatting requests
 * for Rapid API.
 *
 * Includes formatting utilities and error handling.
 */
export class IGClient {
  private baseUrl = config.igApi.baseUrl!;
  private apiKey: string;
  private headers = {
    'X-RapidAPI-Key': '',
    'X-RapidAPI-Host': '',
  };

  /**
   *
   * @param {string} apiKey - {@link https://rapidapi.com/mrngstar/api/instagram-bulk-scraper-latest | Instagram Bulk Scraper Latest} API Key
   */
  constructor(apiKey: string) {
    this.apiKey = apiKey;
    this.headers = {
      'X-RapidAPI-Key': this.apiKey,
      'X-RapidAPI-Host': this.baseUrl.slice(8),
    };
  }

  // HELPERS
  private formatProfile = (rawProfile: IGProfileResponse) => {
    const { data } = rawProfile;
    return {
      id: data.id,
      displayName: data.full_name,
      username: data.username,
      profilePictureUrl: data.profile_pic_url_hd,
      isVerified: data.is_verified,
      postCount: data.post_count,
      followerCount: data.followers,
      followingCount: data.followings,
      biography: data.biography,
      externalLink: data.external_url,
      isPrivate: data.is_private,
    };
  };

  private formatStories = (rawStories: IGStoryResponse) => {
    const { data } = rawStories;
    return data.stories.map((story) => ({
      id: story.pk,
      type: story.video_versions ? 'video' : 'image',
      thumbnailUrl: story.image_versions2.candidates[0].url,
      mediaUrl: story.video_versions
        ? story.video_versions[0].url
        : story.image_versions2.candidates[0].url,
    }));
  };

  private formatPosts = (rawPosts: IGPostsResponse) => {
    const { data } = rawPosts;

    return {
      more_available: data.more_available,
      num_results: data.num_results,
      next_max_id:
        data.items.length > 5
          ? data.items[5].id
          : data.items[data.items.length - 1].id,
      items: data.items
        .map((post) => ({
          id: post.pk,
          created_at: post.taken_at,
          like_count: post.like_count,
          comment_count: post.comment_count,
          type:
            post.product_type === 'clips'
              ? 'video'
              : post.product_type === 'carousel_container'
                ? 'album'
                : 'image',
          thumbnail: post.image_versions2.candidates[0].url,
          media:
            post.product_type === 'clips'
              ? [
                  {
                    id: post.pk,
                    type: 'video',
                    height: post.video_versions![0].height,
                    width: post.video_versions![0].width,
                    url: post.video_versions![0].url,
                  },
                ]
              : post.product_type === 'carousel_container'
                ? post.carousel_media!.map((media) =>
                    media.video_versions
                      ? {
                          id: media.pk,
                          type: 'video',
                          height: media.video_versions[0].height,
                          width: media.video_versions[0].width,
                          url: media.video_versions[0].url,
                        }
                      : {
                          id: media.pk,
                          type: 'image',
                          height: media.image_versions2.candidates[0].height,
                          width: media.image_versions2.candidates[0].width,
                          url: media.image_versions2.candidates[0].url,
                        }
                  )
                : [
                    {
                      id: post.pk,
                      type: 'image',
                      height: post.image_versions2.candidates[0].height,
                      width: post.image_versions2.candidates[0].width,
                      url: post.image_versions2.candidates[0].url,
                    },
                  ],
          caption: post.caption ? post.caption.text : '',
          shortcode: post.code,
        }))
        .slice(0, 6),
    };
  };

  private formatHighlights = (rawHighlights: IGHighlightsResponse) => {
    const { data } = rawHighlights;

    return data.highlights.map((hl) => ({
      id: hl.id,
      title: hl.title,
      imageUrl: hl.cover_media.cropped_image_version.url,
    }));
  };

  private formatHighlightMedia = (
    rawHighlightData: IGHighlightByIdResponse
  ) => {
    const { data } = rawHighlightData;

    return {
      title: data.title,
      media_count: data.media_count,
      coverImage: data.cover_media,
      created_at: data.created_at,
      items: data.items.map((item) => ({
        id: item.media_id,
        type: item.video_hd ? 'video' : 'image',
        imageUrl: item.image_hd,
        videoUrl: item.video_hd,
      })),
    };
  };

  private formatReels = (rawReels: IGReelsResponse) => {
    const { data } = rawReels;

    return {
      more_available: data.paging_info.more_available,
      next_max_id: data.paging_info.max_id,
      items: data.items.map(({ media: item }) => ({
        id: item.pk,
        created_at: item.taken_at,
        like_count: item.like_count,
        comment_count: item.comment_count,
        play_count: item.play_count ?? item.view_count,
        type:
          item.product_type === 'clips' || item.product_type === 'feed'
            ? 'video'
            : 'image',
        thumbnail: item.image_versions2.candidates[0].url,
        mediaUrl: item.video_versions
          ? item.video_versions[0].url
          : item.image_versions2.candidates[0].url,
        caption: item.caption ? item.caption.text : '',
        shortcode: item.code,
      })),
    };
  };

  // API FETCHERS
  public getProfile = async (username: string) => {
    try {
      const response = await fetch(
        `${this.baseUrl}/webget_user_id/${username}`,
        {
          headers: this.headers,
        }
      );
      const result: IGProfileResponse = await response.json();

      if (result && result.status === 'error' && result.message) {
        if (result.message.includes('rate limit')) {
          return { error: 'Rate Limit Exceeded' };
        }
        if (result.message === 'Username is not valid') {
          return { error: 'Invalid username' };
        }
      }

      if (result && result.data) {
        return this.formatProfile(result);
      }
    } catch (error) {
      console.error({ error });
      return error;
    }
  };

  public getStories = async (username: string) => {
    try {
      const response = await fetch(
        `${this.baseUrl}/download_story/${username}`,
        {
          headers: this.headers,
        }
      );

      const result: IGStoryResponse = await response.json();

      if (result && result.message) {
        if (result.message.includes('rate limit')) {
          return { error: 'Rate Limit Exceeded' };
        }

        if (result.message.includes('no active stories')) {
          return [];
        }
      }

      if (result && result.data) {
        return this.formatStories(result);
      }
    } catch (error) {
      console.error({ error });
      return error;
    }
  };

  public getPosts = async (id: string, nextCursor?: string) => {
    try {
      const response = await fetch(
        `${this.baseUrl}/webuser_posts_v2/${id}?count=6&nocors=true${nextCursor ? `&max_id=${nextCursor}` : ''}`,
        {
          headers: this.headers,
        }
      );

      const result: IGPostsResponse = await response.json();

      if (result && result.message) {
        if (result.message.includes('rate limit')) {
          return { error: 'Rate Limit Exceeded' };
        } else {
          console.error(result.message, id);
          return { error: 'Check logs' };
        }
      }

      if (result && result.data) {
        return this.formatPosts(result);
      }
    } catch (error) {
      console.error({ error });
      return error;
    }
  };

  public getHighlights = async (username: string) => {
    try {
      const response = await fetch(
        `${this.baseUrl}/user_highlights/${username}`,
        {
          headers: this.headers,
        }
      );

      const result: IGHighlightsResponse = await response.json();

      if (result && result.message) {
        if (result.message.includes('rate limit')) {
          return { error: 'Rate Limit Exceeded' };
        } else {
          console.error(result.message, username);
          return { error: 'Check logs' };
        }
      }

      if (result && result.data) {
        return this.formatHighlights(result);
      }
    } catch (error) {
      console.error({ error });
      return error;
    }
  };

  public getHighlightById = async (id: string) => {
    const hlId = id.replace('highlight:', '');
    try {
      const response = await fetch(
        `${this.baseUrl}/download_highlights/${hlId}`,
        {
          headers: this.headers,
        }
      );
      const result: IGHighlightByIdResponse = await response.json();

      if (result && result.message) {
        if (result.message.includes('rate limit')) {
          return { error: 'Rate Limit Exceeded' };
        } else {
          console.error(result.message, hlId);
          return { error: 'Check logs' };
        }
      }

      if (result && result.data) {
        return this.formatHighlightMedia(result);
      }
    } catch (error) {
      console.error(error);
    }
  };

  public getReels = async (id: string, nextCursor?: string) => {
    try {
      const response = await fetch(
        `${this.baseUrl}/webuser_reels/${id}?nocors=true${nextCursor ? `&max_id=${nextCursor}` : ''}`,
        {
          headers: this.headers,
        }
      );
      const result: IGReelsResponse = await response.json();

      if (result && result.message) {
        if (result.message.includes('rate limit')) {
          return { error: 'Rate Limit Exceeded' };
        } else {
          console.error(result.message, id);
          return { error: 'Check logs' };
        }
      }

      if (result && result.data) {
        return this.formatReels(result);
      }
    } catch (error) {
      console.error(error);
    }
  };

  public getDownloadableMediaById = async (id: string) => {
    try {
      const response = await fetch(`${this.baseUrl}/media_download/${id}`, {
        headers: this.headers,
      });
      const result = await response.json();

      if (result && result.data) {
        const { data }: IGDownloadResponse = result;
        const originResponse = await fetch(data.main_media_hd, {
          cache: 'no-cache',
        });

        if (originResponse && originResponse.ok) {
          return originResponse;
        }
      }
    } catch (error) {
      console.error(error);
    }
  };
}
