/**
 * 用户权限检查
 */
const authority = {
  USER_KEY: '__user__',
  isLoginIn() {
    const user = JSON.parse(localStorage.getItem(authority.USER_KEY));
    // 用户处于登录状态的条件：本地存储以及 cookie 同时存在
    if (user) {
      authority.user = user;
      return true;
    } else {
      return false;
    }
  },

  register(user) {
    authority.user = user;
    // 用户信息（基本信息、权限等存放 localStorage，减少前后端通信）
    localStorage.setItem(authority.USER_KEY, JSON.stringify(user));
  },

  destroy() {
    localStorage.removeItem(authority.USER_KEY);
  }
};

if (__DEV__) {
  // 开发环境登录状态写死
  authority.register({
    name: 'DEMO'
  });
}

export default authority;
