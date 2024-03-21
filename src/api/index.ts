import selfish from '@/utils/selfish';
import { RAuth } from '@/api/repositories/auth';
import { AxiosHttpClient } from '@/api/clients/httpClient';

const axiosClient = new AxiosHttpClient();

export default {
  auth: selfish(new RAuth({ httpClient: axiosClient })),
};
