const octokit = require('@octokit/rest')();

module.exports = (api, options, rootOptions) => {
    if (options.githubToken) {
        octokit.authenticate({
            type: 'token',
            token: options.githubToken,
        });

        // todo create develop branch
        // todo add remote github url

        try {
            octokit.repos.createForAuthenticatedUser({
                name: rootOptions.projectName,
                description: options.description,
                private: false,
                has_projects: false,
                has_wiki: false,
                allow_squash_merge: false,
                allow_rebase_merge: false,
            });
        } catch (e) {
            /* eslint-disable no-console */
            console.log(e);
            console.log(`Could not create new gitlab project with name '${rootOptions.projectName}'.`);
            /* eslint-enable no-console */
        }
    }
};
