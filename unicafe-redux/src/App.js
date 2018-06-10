import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Statistiikka from './Statistiikka'
import feedbackReducer from './feedbackReducer'
import { createStore } from 'redux'
import './App.css'

const store = createStore(feedbackReducer)

class App extends Component {
    klik = (nappi) => () => {
        store.dispatch({ type: nappi })
    }
  
    render() {
        return (
            <div>
                <h2>Anna palautetta</h2>
                <button onClick={this.klik('GOOD')}>hyvä</button>
                <button onClick={this.klik('OK')}>neutraali</button>
                <button onClick={this.klik('BAD')}>huono</button>
                <Statistiikka feedback={store.getState()} />
            </div>
        )
    }
}

const renderApp = () => {
    ReactDOM.render(<App />, document.getElementById('root'))
}

store.subscribe(renderApp)

export default App