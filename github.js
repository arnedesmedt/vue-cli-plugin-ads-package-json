const octokit = require('@octokit/rest')();

module.exports = (api, options, rootOptions) => {
    if (options.githubToken) {
        octokit.authenticate({
            type: 'token',
            token: options.githubToken,
        });

        octokit.repos.createForAuthenticatedUser({
            name: rootOptions.projectName,
            description: options.description,
            private: false,
            has_projects: false,
            has_wiki: false,
            allow_squash_merge: false,
            allow_rebase_merge: false,
        });
    }
};
