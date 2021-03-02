class Url {
  constructor(url) {
    this.url = url;
    this.nodeURL = new URL(url);
  }

  getScheme() {
    const scheme = this.nodeURL.protocol;
    return scheme.slice(0, scheme.length - 1);
  }

  getHostName() {
    return this.nodeURL.hostname;
  }

  getQueryParams() {
    const params = {};
    this.nodeURL.searchParams.forEach((value, key) => { params[key] = value });
    return params;
  }

  getQueryParam(searchParam, defaultParam = null) {
    return this.nodeURL.searchParams.get(searchParam) ?? defaultParam;
  }
  equals(obj) {
    return this.url === obj.url;
  }
}

module.exports = Url;
