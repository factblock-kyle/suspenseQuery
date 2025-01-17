import axios from "axios";

import { BannerPrams, CommunityCardResponse } from "@dto/bannerprams";
import { BannerResponse } from "@dto/BannerResponse";
import { headers } from "next/headers";

export const getBanners = async () => {
    const { data } = await axios.get(`https://cat-fact.herokuapp.com/facts/`);
    return data;
  };


  export const getCommunitiesForHome = async () => {
    const { data } = await axios.get(
      `https://dog.ceo/api/breeds/list/all`, 
    );
    return data;
  };