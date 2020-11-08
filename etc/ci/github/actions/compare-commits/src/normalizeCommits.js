import timeAgo from './timeAgo'

const normalizeCommit = ({
    commit: {
        author: _author,
        committer: _committer,
        ...commit
    },
    author,
    committer,
    ...rest
}) => ({
    ...rest,
    ...commit,
    author: {
        ..._author,
        ...author,
        date: timeAgo(_author.date)
    },
    committer: {
        ..._committer,
        ...committer,
        date: timeAgo(_committer.date)
    }
})

const normalizeCommits = (commits) => commits.map(normalizeCommit)

export {
    normalizeCommits as default,
    normalizeCommit
}
