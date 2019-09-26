import service from './service'

const baseUrl = `${service.apiVersion}/users`
const baseUrlAuth = `${service.apiVersion}/auth`

const userApi = {}

/**
 * 获得用户属性
 * @param username
 */
userApi.getProfile = (username) => {
  return service({
    url: `${baseUrl}/${username}`,
    method: 'get'
  })
}

userApi.getProfileById = (username) => {
  return service({
    url: `${baseUrl}/i${username}`,
    method: 'get'
  })
}

/**
 * 获取用户文章
 * @param username
 */
userApi.getPosts = (username) => {
  return service({
    url: `${baseUrl}/${username}/posts`,
    method: 'get'
  })
}

/**
 * 注册
 * @param user
 */
userApi.register = (user) => {
  return service({
    url: `api/users/register`,
    method: 'post',
    data: user
  })
}

/**
 * 登录
 * @param username
 * @param password
 */
userApi.login = (username, password) => {
  return service({
    url: `${baseUrlAuth}/token`,
    method: 'post',
    data: {'username': username, 'password': password}
  })
}

userApi.updateProfile = profile => {
  return service({
    url: `${baseUrl}/profiles`,
    method: 'put',
    data: profile
  })
}

userApi.updatePassword = (oldPassword, newPassword) => {
  return service({
    url: `${baseUrl}/password`,
    method: 'put',
    data: {
      oldPassword: oldPassword,
      newPassword: newPassword
    }
  })
}

userApi.logout = () => {
}

export default userApi
