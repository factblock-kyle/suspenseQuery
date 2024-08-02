import axios from 'axios';

export const postLogout = async (token: string): Promise<void> => {
    await axios.post(
      `${process.env.NEXT_PUBLIC_DEV_ENDPOINT}/v1/user/logout`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
};