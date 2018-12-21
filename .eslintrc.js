module.exports = {
    root: true,

    env: {
        node: true,
    },

    extends: [
        'plugin:vue/essential',
        '@vue/standard',
        'eslint-config-ads',
    ],

    parserOptions: {
        parser: 'babel-eslint',
    },
};
