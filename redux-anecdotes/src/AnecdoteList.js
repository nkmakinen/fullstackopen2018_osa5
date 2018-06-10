import React from 'react'
import actionFor from './actionCreator'
import PropTypes from 'prop-types'

class AnecdoteList extends React.Component {
    componentDidMount() {
        const { store } = this.context
        this.unsubscribe = store.subscribe(() =>
            this.forceUpdate()
        )
    }

    componentWillUnmount() {
        this.unsubscribe()
    }

    addVote = (id, votes) => () => {
        this.context.store.dispatch( 
            actionFor.voteIncrement(id, votes)
        )
    }

    render() {
        const unsortedAnecdotes = this.context.store.getState()
        const anecdotes = unsortedAnecdotes.sort((anecdote1, anecdote2) => {
            return anecdote2.votes - anecdote1.votes
        })

        return (
            <div>
                <h2>Anecdotes</h2>
                {anecdotes.map(anecdote=>
                    <div key={anecdote.id}>
                        <div>
                            {anecdote.content} 
                        </div>
                        <div>
                            has {anecdote.votes}
                            <button onClick={this.addVote(anecdote.id, anecdote.votes)}>vote</button>
                        </div>
                    </div>
                )}
            </div>
        )
    }
}

AnecdoteList.contextTypes = {
    store: PropTypes.object
}

export default AnecdoteList