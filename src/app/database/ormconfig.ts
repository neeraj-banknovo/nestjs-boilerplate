import { ConnectionOptions } from 'typeorm';
import { dbConfig } from '../config/config';

const defaultConfig: ConnectionOptions = {
  type: 'postgres',
  host: 'postgres',
  port: Number(dbConfig().port),
  username: dbConfig().username,
  password: dbConfig().password,
  database: dbConfig().database,
  entities: ['dist/app/modules/**/*.entity{.ts,.js}'],
  migrations: ['src/app/database/migrations/*.js'],
  migrationsRun: true,
  synchronize: false,
  migrationsTableName: 'migration',
  ssl: {
    rejectUnauthorized: false,
  },
  cli: {
    migrationsDir: 'src/app/database/migrations',
    entitiesDir: 'src/app/modules/**/entities',
  },
};

const _config = {
  development: {
    ...defaultConfig,
    seeds: ['src/app/database/seeds/dev/*.ts'],
    entities: process.env.TYPEORM_ENTITIES
      ? [process.env.TYPEORM_ENTITIES]
      : defaultConfig.entities,
    migrations: [__dirname + '/migrations/*.ts'],
    host: 'localhost',
    ssl: false,
    logging: true,
  },
  production: {
    ...defaultConfig,
    seeds: ['dist/src/app/database/seeds/prod/*.js'],
    logging: false,
  },
};

const ormConfig = _config[process.env.NODE_ENV];
export = ormConfig;
