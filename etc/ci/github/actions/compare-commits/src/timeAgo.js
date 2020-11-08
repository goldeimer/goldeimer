import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'

// TODO: make dynamic
// Use German version in next map release.
// --> Needs: Implementation of lazy loading / dynamic require.
TimeAgo.addLocale(en)

const newTimeAgo = () => {
    const _timeAgo = new TimeAgo('en-US')

    return (value) => _timeAgo.format(
        new DateTime(value)
    )
}

const timeAgo = newTimeAgo()

export default timeAgo
