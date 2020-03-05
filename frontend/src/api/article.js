import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/vue-element-admin/article/list',
    method: 'get',
    params: query
  })
}

export function fetchArticle(id) {
  return request({
    url: '/vue-element-admin/article/detail',
    method: 'get',
    params: { id }
  })
}

export function fetchPv(pv) {
  return request({
    url: '/vue-element-admin/article/pv',
    method: 'get',
    params: { pv }
  })
}

export function deleteID(id) {
  return request({
    url: '/vue-element-admin/user',
    method: 'delete',
    params: { id }
  })
}

export function create(data) {
  return request({
    url: '/vue-element-admin/create',
    method: 'post',
    data
  })
}

export function update(data) {
  return request({
    url: '/vue-element-admin/article/update',
    method: 'post',
    data
  })
}
