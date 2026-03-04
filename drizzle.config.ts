import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './src/infra/db/drizzle/config/migrations/schema.ts',
  out: './src/infra/db/drizzle/config/migrations',
  dialect: 'postgresql', // 'mysql' ou 'sqlite',
  dbCredentials: {
    url: process.env.DATABASE_URL as string,
    // Certifique-se de que estas variáveis de ambiente estão carregadas
    // ao executar o script do drizzle-kit

    /* database: process.env.DRIZZLE_DATABASE as string,
    user: process.env.DRIZZLE_USER as string,
    password: process.env.DRIZZLE_PASSAWORD as string,
    host: process.env.DRIZZLE_HOST as string,
    port: parseInt(process.env.DRIZZLE_PORT as string),
    ssl: {
      ca: `-----BEGIN CERTIFICATE-----
${process.env.DRIZZLE_CA as string}
-----END CERTIFICATE-----`,
    },
    */
  },
  verbose: true,
  strict: true,
});
