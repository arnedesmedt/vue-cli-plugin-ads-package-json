const {execSync} = require('child_process');
const gitlabToken = execSync('pass Home/gitlab-api').toString('utf8').trim();
const githubToken = execSync('pass Home/github-api').toString('utf8').trim();

module.exports = [
    {
        name: 'description',
        message: 'Enter a project description: ',
    },
    {
        name: 'keywords',
        message: 'Enter some project keywords (separate by comma): ',
    },
    {
        name: 'gitlabToken',
        message: 'Gitlab token (if no specified, no gitlab repository will initiated): ',
        default: gitlabToken,
        type: 'password',
    },
    {
        name: 'githubToken',
        message: 'Github token (if no specified, no github repository will initiated): ',
        default: githubToken,
        type: 'password',
    },
];
