class Config {
  env = {
    BASE_URL: '',
    BACKEND_URL: '',
  };

  constructor() {
    this.env = {
      BASE_URL: this.getEnv('BASE_URL', '/'),
      BACKEND_URL: this.getEnv('BACKEND_URL', '/'),
    }
  }

  private getEnv(name: string, defaultVal: string) {
    const env = import.meta.env;

    return this.trim(env[name] || defaultVal);
  }

  private trim(str: string) {
    return (str || '').trim();
  }
}

export default new Config();
