import { useState, useEffect } from 'react'
import './App.css'
import confetti from 'canvas-confetti'
import { Square } from './components/Square'
import { TURNS } from './constants/constants'
import { CheckWinnerFrom, CheckEndGame } from './logics/board'
import { WinnerModal } from './components/WinnerModal'
import { saveGameToStorage, resetGameStorage } from './logics/storage'

function App () {
  console.log('rendering...')

  const [board, setBoard] = useState(() => {
    console.log('inicializing board...')
    const boardFromStorage = window.localStorage.getItem('board')
    console.log(boardFromStorage)
    if (boardFromStorage) return JSON.parse(boardFromStorage)
    return Array(9).fill(null)
  })

  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('turn')
    return turnFromStorage ?? TURNS.X
  })

  const [winner, setWinner] = useState(null)

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)

    resetGameStorage()
  }

  const updateBoard = (index) => {
    // si tiene algo, no haga nada porque ya está ocupada la posicion
    if (board[index] || winner) return

    /* Actualiza tablero */
    // const newBoard = structuredClone(newBoard) // hace na copia profunda del array
    const newBoard = [...board] // copia de una array de forma supercial
    newBoard[index] = turn
    setBoard(newBoard)

    /* Actualiza turno */
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)

    saveGameToStorage({ newBoard, newTurn })

    CheckEndGame(newBoard)

    // Revisar si ha ganador
    const newWinner = CheckWinnerFrom(newBoard)
    if (newWinner) {
      confetti()
      setWinner(newWinner)
    } else if (CheckWinnerFrom(newBoard)) {
      setWinner(false)
    }
  }

  // Se renderi
  useEffect(() => {
    console.log('inicializing useEffect...')
  }, [])

  return (
    <main className='board'>
      <h1>Tic tac toe</h1>
      <button onClick={resetGame}> Empezar de nuevo</button>
      <section className='game'>
        {
          board.map((square, index) => {
            return (
              <Square
                key={index}
                index={index}
                updateBoard={updateBoard}
              >
                {square}
              </Square>
            )
          })
        }
      </section>
      <section className='turn'>
        <Square isSelected={turn === TURNS.X}>
          {TURNS.X}
        </Square>
        <Square isSelected={turn === TURNS.O}>
          {TURNS.O}
        </Square>
      </section>

      <WinnerModal resetGame={resetGame} winner={winner} />

      <div>Project name</div>
      <div>Tic Tac Toe</div>
    </main>
  )
}

export default App
