import { request } from 'umi';

export async function listAllFolder(params, options) {
    return request(`/api/folder/list`, {
      method: 'GET',
      params: {
        ...params
      },
    })
  }

export async function addFolder(params, options) {
    return request(`/api/folder/add`, {
      method: 'POST',
      params: {
        ...params,
      },
    })
  }

export async function deleteFolder(params, options){
    return request(`/api/folder/delete`, {
        method: 'POST',
        params: {
          ...params,
        },
    })
}

  