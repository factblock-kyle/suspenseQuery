export type BannerPrams = {
    lang: string;
    page?: string;
    community_id?: number;
  };


  export interface CommunityResponse {
    community_id: number;
    name: string;
    logo_url: string;
    description: string;
    following: boolean;
    follower_count: number;
    daily_event_count: number;
    general_event_count: number;
  }
  
  export interface CommunityCardResponse {
    page_size: number;
    page_number: number;
    communities: CommunityResponse[];
  }