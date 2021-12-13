import { request } from 'umi';

export async function listGroup(params, options) {
    return request(`/api/group/list`, {
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


  