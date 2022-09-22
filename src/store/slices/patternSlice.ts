import { createSlice } from '@reduxjs/toolkit'
import { Selector } from '../store'
import { GridProps } from './gameSlice'

export type Pattern = {
  id: number
  name: string
  size: GridProps
  content: boolean[][]
}

export type PatternsState = Pattern[]

export const initialState: PatternsState = [
  {
    id: 1,
    name: 'Box',
    size: { width: 2, height: 2 },
    content: [
      [true, true],
      [true, true]
    ]
  },
  {
    id: 2,
    name: 'Frog',
    size: { width: 4, height: 4 },
    content: [
      [false, true, true, false],
      [true, false, false, false],
      [false, false, false, true],
      [false, true, true, false]
    ]
  },
  {
    id: 3,
    name: 'Space Ship',
    size: { width: 3, height: 3 },
    content: [
      [false, true, false],
      [false, false, true],
      [true, true, true]
    ]
  },
  {
    id: 4,
    name: 'Canon',
    size: { width: 38, height: 9 },
    content: [
      [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, false, true, false, false, false, false, false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false, false, false, false, false, false, true, true, false, false, false, false, false, false, true, true, false, false, false, false, false, false, false, false, false, false, false, false, true, true],
      [false, false, false, false, false, false, false, false, false, false, false, true, false, false, false, true, false, false, false, false, true, true, false, false, false, false, false, false, false, false, false, false, false, false, true, true],
      [true, true, false, false, false, false, false, false, false, false, true, false, false, false, false, false, true, false, false, false, true, true, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
      [true, true, false, false, false, false, false, false, false, false, true, false, false, false, true, false, true, true, false, false, false, false, true, false, true, false, false, false, false, false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false, false, false, false, true, false, false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false, false, false, false, false, true, false, false, false, true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false, false, false, false, false, false, true, true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]
    ]
  }
]

export const patternsSlice = createSlice({
  name: 'patterns',
  initialState,
  reducers: {}
})

export const selectPatterns: Selector<Pattern[]> = state => state.patterns
export default patternsSlice
