import ProductionConfig from './production.config.json';
import DevelopmentConfig from './development.config.json';

export const CONFIG = process.env.NODE_ENV === 'development'
                      ? ProductionConfig
                      : DevelopmentConfig;