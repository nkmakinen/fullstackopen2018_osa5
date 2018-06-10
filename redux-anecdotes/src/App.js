import React from 'react'
import PropTypes from 'prop-types'
import AnecdoteForm from './AnecdoteForm'
import AnecdoteList from './AnecdoteList'

class App extends React.Component {
    render() {
        return (
            <div>
                <AnecdoteList />
                <AnecdoteForm />
            </div>
        )
    }
}

App.contextTypes = {
    store: PropTypes.object
}

export default App