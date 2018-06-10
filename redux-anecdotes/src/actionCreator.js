const generateId = () => Number((Math.random() * 1000000).toFixed(0))

const actionFor = {
    anecdoteCreation(content) {
        return {
            type: 'NEW_ANECDOTE',
            data: {
                content,
                votes: 0,
                id: generateId()
            }
        }
    },
    voteIncrement(id, votes) {
        return {
            type: 'INCREMENT_VOTES',
            data: {
                id,
                votes
            }
        }
    }
}

export default actionFor