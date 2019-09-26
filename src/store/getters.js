const getters = {
  token: state => state.user.token,
  user: state => state.user.user,
  avatar: state => state.user.avatar,
  nickname: state => state.user.name,
  roles: state => state.user.roles,
  current: state => state.user.current
}

export default getters
