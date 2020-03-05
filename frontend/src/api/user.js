import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/vue-element-admin/user',
    method: 'get',
    params: query
  })
}

export function create(data) {
  return request({
    url: '/vue-element-admin/user',
    method: 'post',
    data
  })
}

export function update(data) {
  return request({
    url: '/vue-element-admin/user',
    method: 'patch',
    data
  })
}

export function deleteByID(id) {
  return request({
    url: '/vue-element-admin/user',
    method: 'delete',
    params: { id }
  })
}
