import { create } from 'zustand'

interface GameState {
  faith: number
  money: number
  time: number // 0-24 hours
  weather: 'sunny' | 'rain' | 'cloudy'
  
  // Actions
  addFaith: (amount: number) => void
  addMoney: (amount: number) => void
  tick: () => void // Advance time
  setWeather: (weather: 'sunny' | 'rain' | 'cloudy') => void
}

export const useGameStore = create<GameState>((set) => ({
  faith: 0,
  money: 0,
  time: 12, // Start at noon
  weather: 'sunny',

  addFaith: (amount) => set((state) => ({ faith: state.faith + amount })),
  addMoney: (amount) => set((state) => ({ money: state.money + amount })),
  tick: () => set((state) => {
    const newTime = (state.time + 0.1) % 24
    return { time: newTime }
  }),
  setWeather: (weather) => set({ weather }),
}))
