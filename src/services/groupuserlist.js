import { request } from 'umi';

export async function userlistGroup(params, options) {
    return request(`/api/group/userlist`, {
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