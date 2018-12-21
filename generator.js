const packageJson = require('./packageJson');
const gitlab = require('./gitlab');
const github = require('./github');

module.exports = (api, options, rootOptions) => {
    if (!options.keywords) {
        options.keywords = [];
    }

    options.keywords = options.keywords
        .split(',')
        .map(keyword => keyword.trim());

    github(api, options, rootOptions);
    gitlab(api, options, rootOptions);
    packageJson(api, options, rootOptions);
};
