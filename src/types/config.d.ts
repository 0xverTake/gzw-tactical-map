declare module '*/config.json' {
  interface Config {
    ANTHROPIC_API_KEY: string;
  }
  const config: Config;
  export default config;
}
