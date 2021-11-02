import { request } from 'umi';

export async function listAllUser(params, options) {
    return request(`/api/user/list`, {
      method: 'GET',
      params: {
        ...params
      },
    })
  }

export async function addUser(params, options) {
    return request(`/api/user/add`, {
      method: 'POST',
      params: {
        ...params,
      },
    })
  }


  