export default class Services {
  #BaseUrl;

  constructor() {
    this.#BaseUrl = 'http://localhost:8080';
  }

  async Post({ endpoint, body }) {
    try {
      return await fetch(this.#BaseUrl + endpoint, {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'post',
        body: JSON.stringify(body),
      });
    } catch (err) {
      throw err;
    }
  }
  async Get({ endpoint }) {
    try {
      const raw = await fetch(this.#BaseUrl + endpoint, {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'get',
      });
      const data = await raw.json();

      return data;
    } catch (err) {
      throw err;
    }
  }
  async Patch({ endpoint, body }) {
    try {
      return await fetch(this.#BaseUrl + endpoint, {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'patch',
        body: JSON.stringify(body),
      });
    } catch (err) {
      throw err;
    }
  }
  async Delete({ endpoint, body }) {
    try {
      const optoins = {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'delete',
      };

      if (body) optoins.body = JSON.stringify(body);

      return await fetch(this.#BaseUrl + endpoint);
    } catch (err) {
      throw err;
    }
  }

  async SaveAccount(account) {
    return this.Post({ endpoint: '/api/account', body: account });
  }
  async ListAccounts() {
    return this.Get({ endpoint: '/api/accounts' });
  }
}
