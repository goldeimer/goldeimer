const github = require('@actions/github')

const fetchCompareCommits = async (
    base,
    head,
    oktokit = github.getOctokit()
) => {
    const response = await oktokit.repos.compareCommits({
        owner: 'Goldeimer',
        repo: 'goldeimer-web-apps',
        base,
        head
    })

    return response
}

export default fetchCompareCommits
