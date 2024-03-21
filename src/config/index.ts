class Config {
  env = {
    BASE_URL: '',
    BACKEND_URL: '',
  };

  constructor() {
    const generateEnv = this.generateEnv.bind(this);
    this.env = new Proxy(this.env, {
      get(target, prop: string) {
        const env = generateEnv();

        // @ts-ignore
        return env[prop] || '';
      },
    });
  }

  generateEnv() {
    const BASE_URL = this.getEnv('BASE_URL', '/');
    const BACKEND_URL = this.getEnv('BACKEND_URL', window.location.origin);

    return {
      BASE_URL,
      BACKEND_URL,
    };
  }

  getEnv(name: string, defaultVal: string) {
    const env = import.meta.env;

    return this.trim(env[name] || defaultVal);
  }

  private trim(str: string) {
    return (str || '').trim();
  }
}

export default new Config();
