const ProjectsGitlabApi = require('gitlab/dist/latest/services/Projects').default;

const createGitLabProjectsApi = (gitlabToken) => {
    return new ProjectsGitlabApi({
        token: gitlabToken.trim(),
    });
};

const createGitlabProject = (api, options) => {
    api
        .create(options)
        .catch(error => {
            /* eslint-disable no-console */
            console.log(error);
            console.error(`Could not create new gitlab project with name '${options.name}'.`);
            /* eslint-enable no-console */
        });
};

module.exports = (api, options, rootOptions) => {
    if (!options.gitlabToken.trim() ||
        options.gitlabToken.trim().toLowerCase() === 'n'
    ) {
        return;
    }

    const gitlabProjectsApi = createGitLabProjectsApi(options.gitlabToken);

    let gitlabOptions = {
        name: rootOptions.projectName,
        default_branch: 'develop',
        description: options.description,
        jobs_enabled: false,
        wiki_enabled: false,
        snippets_enabled: false,
        container_registry_enabled: false,
        shared_runners_enabled: false,
        visibility: 'public',
        only_allow_merge_if_all_discussions_are_resolved: true,
        lfs_enabled: false,
        tag_list: options.keywords,
        user_id: 'arnedesmedt',
        printing_merge_request_link_enabled: true,
        approvals_before_merge: 1,
    };

    createGitlabProject(
        gitlabProjectsApi,
        gitlabOptions
    );
};
