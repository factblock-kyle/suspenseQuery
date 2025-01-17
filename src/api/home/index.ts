import axios from "axios";

import { BannerPrams, CommunityCardResponse } from "@dto/bannerprams";
import { BannerResponse } from "@dto/BannerResponse";
import { headers } from "next/headers";

export const getBanners = async (params: BannerPrams) => {
    const { data } = await axios.get<BannerResponse>(`https://dev-api.fablo.app/v1/banners`, {
      params,
      headers: {
        'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDk0LCJ1c2VyX3R5cGUiOiJFbmRVc2VyIiwiZW1haWwiOiJoYXlkZW5AZmFjdGJsb2NrLmNvbSIsInRva2VuX3R5cGUiOiJhY2Nlc3NUb2tlbiIsImV4cCI6MTc1MjMwMDU4OH0.xgPZdzd7DZJyE6VZFa5wVRkcMcw2i5472Z-dRH1HQYE`
      }
    });
    return data;
  };


  export const getCommunitiesForHome = async () => {
    const { data } = await axios.get<CommunityCardResponse>(
      `https://dev-api.fablo.app/v1/communities/for-home`, {
        headers: {
            'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDk0LCJ1c2VyX3R5cGUiOiJFbmRVc2VyIiwiZW1haWwiOiJoYXlkZW5AZmFjdGJsb2NrLmNvbSIsInRva2VuX3R5cGUiOiJhY2Nlc3NUb2tlbiIsImV4cCI6MTc1MjMwMDU4OH0.xgPZdzd7DZJyE6VZFa5wVRkcMcw2i5472Z-dRH1HQYE`
        }
      }
    );
  
    return data;
  };