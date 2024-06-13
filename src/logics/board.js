import { WINNER_COMBOS } from '../constants/constants'

export const CheckWinnerFrom = (boarToCheck) => {
  for (const combo of WINNER_COMBOS) {
    const [a, b, c] = combo
    if (boarToCheck[a] &&
        boarToCheck[a] === boarToCheck[b] &&
        boarToCheck[a] === boarToCheck[c]
    ) {
      return boarToCheck[a]
    }
  }
  return null
}

// Check if game is over
export const CheckEndGame = (newBoard) => {
  return newBoard.every((square) => square !== null)
}
