interface Server {
  host: string,
  port: number
}

export interface Config {
  server: Server,
  secret: string,
  nodeEnv: string
}

export const configSchema = {
  server: {
    host: {
      format: String,
      default: '0.0.0.0',
      env: 'HOST'
    },
    port: {
      format: Number,
      default: 4000,
      env: 'PORT'
    },
  },
  secret: {
    format: String,
    default: 'SecretToken123',
    env: 'SECRET'
  },
  nodeEnv: {
    format: String,
    default: '',
    env: 'NODE_ENV'
  }
}
