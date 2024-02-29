import config from '../config';

// INTERFACES 
interface IGProfileResponse {
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
  status: string;
  message: string | null;
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
      displayName: data.full_name,
      username: data.username,
      profilePictureUrl: data.profile_pic_url,
      isVerified: data.is_verified,
      postCount: data.post_count,
      followerCount: data.followers,
      followingCount: data.followings,
      biography: data.biography,
      externalLink: data.external_url,
    };
  };

  // API FETCHERS
  public getProfile = async (username: string) => {
    console.log(this.baseUrl, username, this.headers);
    const response = await fetch(`${this.baseUrl}/webget_user_id/${username}`, {
      headers: this.headers,
    });
    try {
      const result = await response.json();

      if (result && result.data) {
        return this.formatProfile(result);
      }
    } catch (error) {
      console.error({ error });
      throw new Error('Fetch Profile from API Error - check logs');
    }
  };
}
