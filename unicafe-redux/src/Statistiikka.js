import React from 'react'

const Statistiikka = (palautteita) => {
    if (palautteita.feedback.good === 0 && palautteita.feedback.ok === 0 && palautteita.feedback.bad === 0) {
        return (
            <div>
                <h2>Statistiikka</h2>
                <div>ei yhtään palautetta annettu</div>
            </div>
        )
    }

    let ka = (palautteita.feedback.good - palautteita.feedback.bad) /
             (palautteita.feedback.good + palautteita.feedback.ok +
                palautteita.feedback.bad)
    if (isNaN(ka)) {
        ka = '-';
    } else {
        ka = ka.toFixed(1)
    }

    let positiivisia = palautteita.feedback.good / (palautteita.feedback.good +
                       palautteita.feedback.ok + palautteita.feedback.bad) * 100
    if (isNaN(positiivisia)) {
        positiivisia = '-'
    } else {
        positiivisia = positiivisia.toFixed(1) + " %"
    }
  
    return (
        <div>
            <h2>Statistiikka</h2>
            <table>
                <tbody>
                    <tr>
                        <td>hyvä</td>
                        <td>{palautteita.feedback.good}</td>
                    </tr>
                    <tr>
                        <td>neutraali</td>
                        <td>{palautteita.feedback.ok}</td>
                    </tr>
                    <tr>
                        <td>huono</td>
                        <td>{palautteita.feedback.bad}</td>
                    </tr>
                    <tr>
                        <td>keskiarvo</td>
                        <td>{ka}</td>
                    </tr>
                    <tr>
                        <td>positiivisia</td>
                        <td>{positiivisia}</td>
                    </tr>
                </tbody>
            </table>
    
            <button>nollaa tilasto</button>
        </div >
    )
}

export default Statistiikka