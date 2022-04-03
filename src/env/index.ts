import ProductionConfig from './production.config.json';
import DevelopmentConfig from './development.config.json';

// const defaultConfig =  process.env.NODE_ENV === 'production' ? ProductionConfig : DevelopmentConfig;
const defaultConfig =  process.env.NODE_ENV === 'development' ? ProductionConfig : DevelopmentConfig;

export const CONFIG = {
    sidooh: {
        ...defaultConfig.sidooh,
        tagline: 'Sidooh, Makes You Money with Every Purchase!',
        version: '2.0'
    }
}