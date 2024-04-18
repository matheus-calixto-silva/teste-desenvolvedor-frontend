import axios from 'axios';

import { IDataResponse } from '../interfaces/IDataResponse';

const baseURL = 'http://localhost:3000';

const getMedicinesByPage = async (pageNum: number) => {
  const request = await axios.get<IDataResponse>(`${baseURL}/data?_page=${pageNum}`);
  return request.data;
};

export default {
  getMedicinesByPage,
};
