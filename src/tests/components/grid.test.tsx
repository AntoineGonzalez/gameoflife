import { fireEvent, render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import Grid from '../../components/Grid'
import { store } from '../../store/store'


describe('components/Grid.tsx', () => {
    it('displays a grid with desired dimensions', () => {
        const {width, height} = {width:20 , height:10}

        render(<Provider store={store}><Grid width={width} height={height} /></Provider>)

        expect(screen.getAllByRole('row').length).toEqual(10)
        expect(screen.getAllByRole('gridcell').length).toEqual(200)

        screen.getAllByRole('gridcell').forEach((cell) => {
            expect(cell).toHaveStyle("width:3em;height:3em;background-color:grey")
        })
    })

    it('displays an initialised grid with only dead cells', () => {
        const {width, height} = {width:20 , height:10}

        render(<Provider store={store}><Grid width={width} height={height} /></Provider>)

        screen.getAllByRole('gridcell').forEach((cell) => {
            expect(cell).toHaveStyle("width:3em;height:3em;background-color:grey")
        })
    })

    it('toggles isAlive cells porperty onclick', () => {
        const {width, height} = {width:20 , height:10}

        render(<Provider store={store}><Grid width={width} height={height} /></Provider>)

        const cell = screen.getAllByRole('gridcell')[0]
        expect(cell).toHaveStyle("width:3em;height:3em;background-color:grey")
        fireEvent.click(cell)
        expect(cell).toHaveStyle("width:3em;height:3em;background-color:white")
        fireEvent.click(cell)
        expect(cell).toHaveStyle("width:3em;height:3em;background-color:grey")
    })
})
