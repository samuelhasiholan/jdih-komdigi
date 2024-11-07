import CookieManager from ".";

class AuthCookie extends CookieManager {
  constructor() {
    super("auth");
  }

  get token() {
    return this.value && this.value.tokenAdmin;
  }

  get refreshToken() {
    return this.value && this.value.refreshTokenAdmin;
  }

  get user() {
    return this.value && this.value.user;
  }

  get expiresIn() {
    return this.value && this.value.expiresIn;
  }

  get isAuthenticated() {
    return !!this.value && !!this.value.tokenAdmin;
  }
}

export default new AuthCookie();
