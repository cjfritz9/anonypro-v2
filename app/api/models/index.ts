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
      product_type: 'carousel_container' | 'clips' | 'feed';
      code: string;
      caption: {
        text: string;
        media_id: string;
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
        image_versions2: {
          candidates: {
            height: number;
            width: number;
            url: string;
          }[];
        };
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
    };
  };

  private formatStories = (rawStories: IGStoryResponse) => {
    const { data } = rawStories;
    return data.stories.map((story) => ({
      type: story.video_versions ? 'video' : 'image',
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
      next_max_id: data.next_max_id,
      items: data.items.map((post) => ({
        id: post.caption.media_id,
        type:
          post.product_type === 'clips'
            ? 'video'
            : post.product_type === 'carousel_container'
              ? 'album'
              : 'image',
        media:
          post.product_type === 'clips'
            ? post.video_versions!.map((video) => ({
                height: video.height,
                width: video.width,
                url: video.url,
              }))
            : post.product_type === 'carousel_container' ? post.carousel_media!.map((media) => ({
              height: media.image_versions2.candidates[0].height,
              width: media.image_versions2.candidates[0].width,
              url: media.image_versions2.candidates[0].url,
            })) : [{
              height: post.image_versions2.candidates[0].height,
              width: post.image_versions2.candidates[0].width,
              url: post.image_versions2.candidates[0].url,
              }],
        caption: post.caption.text,
        shortcode: post.code,
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

      if (result && result.message && result.message.includes('rate limit')) {
        return { error: 'Rate Limit Exceeded' };
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

      if (result && result.message && result.message.includes('rate limit')) {
        return { error: 'Rate Limit Exceeded' };
      }

      if (result && result.data) {
        return this.formatStories(result);
      }
    } catch (error) {
      console.error({ error });
      return error;
    }
  };

  public getPosts = async (id: string) => {
    try {
      const response = await fetch(`${this.baseUrl}/webuser_posts_v2/${id}?count=8&nocors=true`, {
        headers: this.headers,
      });

      const result: IGPostsResponse = await response.json();

      if (result && result.message) {
        if (result.message.includes('rate limit')) {
          return { error: 'Rate Limit Exceeded' };
        } else {
          console.log(result.message, id)
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
}
