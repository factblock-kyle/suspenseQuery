export interface BannerResponse {
    list: BannerItem[];
  }
  
  export type BannerItem = {
    bg_color_hex: string;
    created_at: string;
    head_copy: string;
    id: number;
    image_url: string;
    link_url: string;
    order: number;
    outlink: boolean;
    page: string;
    sub_copy: string;
  };
  