import { request } from 'umi';

export async function listAllDoc(params, options) {
    return request(`/api/doc/list`, {
      method: 'GET',
      params: {
        ...params
      },
    })
  }

export async function addDoc(params, options) {
    return request(`/api/doc/add`, {
      method: 'POST',
      params: {
        ...params
      },
    })
  }
