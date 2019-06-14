import cfg from './cfg.default.js';

export default (config = {}) => {
    if (typeof config == 'object') {
        for (const key in config) {
            cfg[key] = config[key];
        }
    } else {
        return cfg[config];
    }
};