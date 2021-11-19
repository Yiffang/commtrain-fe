import { request } from 'umi';

export async function uploadFile(params, options) {
    return request(`/api/file/upload`, {
      method: 'POST',
      params: {
        ...params
      },
    })
  }