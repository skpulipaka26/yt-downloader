import axios from 'axios';
import fileType from 'file-type';
import ytsr from 'ytsr';

export const getSearchResults = async (query: string, limit: number) => {
  const res = await ytsr(query, { limit });
  return res.items;
};

export const getSongData = async (url: string) => {
  const res = await axios(
    `https://boiling-citadel-77681.herokuapp.com:32813/download?url=${url}`,
    {
      responseType: 'arraybuffer',
    }
  );
  const songTypeData = await fileType.fromBuffer(res.data);
  return {
    songData: res.data,
    songTypeData,
  };
};
