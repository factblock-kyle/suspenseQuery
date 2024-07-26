import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // const eventIds = await fetch(
  //   `${process.env.NEXT_PUBLIC_DEV_ENDPOINT}/v1/event/ids`,
  //   {
  //     next: { revalidate: 60 },
  //   },
  // ).then((res) => res.json());
  // const communityIds = await fetch(
  //   `${process.env.NEXT_PUBLIC_DEV_ENDPOINT}/v1/community/ids`,
  //   {
  //     next: { revalidate: 60 },
  //   },
  // ).then((res) => res.json());

  // const eventMap =
  //   eventIds?.map((id: number) => ({
  //     url: `${process.env.NEXT_PUBLIC_URL}/en/event/${id}`,
  //     lastModified: new Date(),
  //   })) ?? [];

  // const communityMap =
  //   communityIds?.map((id: number) => ({
  //     url: `${process.env.NEXT_PUBLIC_URL}/en/community/${id}`,
  //     lastModified: new Date(),
  //   })) ?? [];

  return [
    {
      url: `${process.env.NEXT_PUBLIC_URL}/en` ?? '',
      lastModified: new Date(),
    },
    // {
    //   url: `${process.env.NEXT_PUBLIC_URL}/en/community`,
    //   lastModified: new Date(),
    // },
    // {
    //   url: `${process.env.NEXT_PUBLIC_URL}/en/event`,
    //   lastModified: new Date(),
    // },
    // {
    //   url: `${process.env.NEXT_PUBLIC_URL}/en/vote`,
    //   lastModified: new Date(),
    // },
    // {
    //   url: `${process.env.NEXT_PUBLIC_URL}/en/terms-of-use`,
    //   lastModified: new Date(),
    // },
    // {
    //   url: `${process.env.NEXT_PUBLIC_URL}/en/privacy-policy`,
    //   lastModified: new Date(),
    // },
    // {
    //   url: `${process.env.NEXT_PUBLIC_URL}/en/announcement`,
    //   lastModified: new Date(),
    // },
    // ...eventMap,
    // ...communityMap,
  ];
}
