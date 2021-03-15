import {
    generateId,
    generateShortId
} from '@goldeimer/js-util'

const composePrepare = (...payloadMutators) => (value) => (
    payloadMutators.reduce((accumulatedPayload, payloadMutator) => {
        const {
            mutator = payloadMutator,
            options = {}
        } = payloadMutator

        return {
            ...mutator(accumulatedPayload, options)
        }
    }, { payload: value })
)

const addPrepare = (reducer, ...payloadMutators) => ({
    prepare: composePrepare(...payloadMutators),
    reducer
})

const withId = ({ payload = {} }, { key = 'id' }) => ({
    payload: {
        ...payload,
        [key]: generateId()
    }
})

const withShortId = ({ payload = {} }, { key = 'id' }) => ({
    payload: {
        ...payload,
        [key]: generateShortId()
    }
})

const withTimestamp = ({ payload = {} }, { key = 'timestamp' }) => ({
    payload: {
        ...payload,
        [key]: Date.now()
    }
})

export {
    addPrepare as default,
    composePrepare,
    withId,
    withShortId,
    withTimestamp
}
