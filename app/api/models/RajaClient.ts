import config from '../config';
import { APIResponse } from './APIResponse';

interface APIParams {
  service: string;
  link: string;
  quantity: string;
}

export class RajaClient {
  private baseUrl = new URL(config.smmRajaApi.baseUrl);
  private apiKey: string;
  private storyViewsId = '3949';
  private likesId = '5057';
  private request: Request;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
    this.baseUrl.searchParams.append('key', apiKey);
    this.baseUrl.searchParams.append('action', 'add');
    this.request = new Request(this.baseUrl, {
      method: 'POST',
    });
  }

  private updateRequest = ({ service, link, quantity }: APIParams) => {
    this.baseUrl.searchParams.set('service', service);
    this.baseUrl.searchParams.set('link', link);
    this.baseUrl.searchParams.set('quantity', quantity);
    this.request = new Request(this.baseUrl, this.request);
  };

  public boostStoryViews = async (username: string): Promise<APIResponse> => {
    const params = {
      service: this.storyViewsId,
      link: `https://www.instagram.com/${username}`,
      quantity: '10',
    };
    this.updateRequest(params);

    const response = await fetch(this.request);

    if (response && response.ok) {
      const result = await response.json();
      console.log(result)

      if (result.error) {
        return new APIResponse('error', result.error, null);
      } else {
        return new APIResponse('ok', null, null);
      }
    } else {
      console.error(await response.text());
      return new APIResponse('error', 'External API error', null);
    }
  };

  public boostLikes = async (shortcode: string): Promise<APIResponse> => {
    const params = {
      service: this.likesId,
      link: `https://www.instagram.com/p/${shortcode}`,
      quantity: '10',
    };
    this.updateRequest(params);

    const response = await fetch(this.request);

    if (response && response.ok) {
      const result = await response.json();

      if (result.error) {
        return new APIResponse('error', result.error, null);
      } else {
        return new APIResponse('ok', null, null);
      }
    } else {
      console.error(await response.text());
      return new APIResponse('error', 'External API error', null);
    }
  };

  public test = () => {
    return {
      url: this.baseUrl,
    };
  };
}
