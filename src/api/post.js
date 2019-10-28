import service from './service'

const baseUrl = `${service.apiVersion}/posts`

const baseMyUrl = `${service.apiVersion}/my/posts`

const postApi = {}

postApi.url = (url) => {
  return service({
    url: `${baseUrl}/${url}`,
    method: 'get',
    params: {
      cp: 1
    }
  })
}

postApi.create = (postToCreate, autoSave) => {
  return service({
    url: baseUrl,
    method: 'post',
    data: postToCreate,
    mute: autoSave,
    params: {
      autoSave: autoSave
    }
  })
}

postApi.update = (postId, postToUpdate, autoSave) => {
  return service({
    url: `${baseUrl}/${postId}`,
    method: 'put',
    data: postToUpdate,
    params: {
      autoSave: autoSave
    }
  })
}

postApi.updateStatus = (postId, status) => {
  return service({
    url: `${baseUrl}/${postId}/status/${status}`,
    method: 'put'
  })
}

postApi.delete = postId => {
  return service({
    url: `${baseUrl}/${postId}`,
    method: 'delete'
  })
}

postApi.get = (postId) => {
  return service({
    url: `${baseUrl}/i/${postId}`,
    method: 'get'
  })
}

postApi.my = (params) => {
  return service({
    url: `${baseMyUrl}`,
    method: 'get',
    params: params
  })
}

/**
 * 添加评论
 * author评论者昵称不能为空
 * email邮箱不能为空
 * authorUrl评论者博客链接
 * content评论内容
 * postId文章ID
 * parentId 上级评论ID
 */
// TODO send to zh
postApi.comments = (comment) => {
  return service({
    url: `${baseUrl}/comments`,
    method: 'post',
    data: comment
  })
}

postApi.postStatus = {
  PUBLISHED: {
    color: 'green',
    status: 'success',
    text: '已发布'
  },
  DRAFT: {
    color: 'yellow',
    status: 'warning',
    text: '草稿'
  },
  RECYCLE: {
    color: 'red',
    status: 'error',
    text: '回收站'
  }
}

export default postApi
