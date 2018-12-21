module.exports = (api, options, rootOptions) => {
    let scripts = {};
    let preversion = [
        'export NODE_ENV=production',
    ];
    let version = [];
    let postversion = [];

    if (api.hasPlugin('eslint')) {
        scripts['lint'] = 'vue-cli-service lint .';
        preversion.push('npm run lint');
    }

    if (api.hasPlugin('unit-jest')) {
        preversion.push('npm run test:unit');
    }

    if (api.hasPlugin('prettier-package-json')) {
        scripts['package-lint'] = 'prettier-package-json --write --tab-width=4 ./package.json';
        preversion.push('npm run package-lint');
    }

    scripts['build:bundle'] = `vue-cli-service build --target lib --name ${rootOptions.projectName} ./src/index.js`;
    version.push('npm run build:bundle');

    postversion.push('git push');
    postversion.push('git push --tags');

    if (preversion.length > 0) {
        scripts.preversion = preversion.join(' && ');
    }

    if (version.length > 0) {
        scripts.version = version.join(' && ');
    }

    if (postversion.length > 0) {
        scripts.postversion = postversion.join(' && ');
    }

    api.extendPackage({
        private: false,
        description: options.description || '',
        scripts: scripts,
        version: '0.0.1',
        main: `./dist/${rootOptions.projectName}.common.js`,
        files: [
            '/dist',
        ],
        repository: {
            type: 'git',
            url: `https://github.com/arnedesmedt/${rootOptions.projectName}.git`,
        },
        bugs: {
            url: `https://github.com/arnedesmedt/${rootOptions.projectName}/issues`,
        },
        homepage: `https://github.com/arnedesmedt/${rootOptions.projectName}`,
        author: 'Arne De Smedt <arnedesmdt@gmail.com> (https://twitter.com/ArneSmedt)',
        license: 'MIT',
        keywords: options.keywords,
    });
};
