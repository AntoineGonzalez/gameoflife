import { Provider } from 'react-redux'
import { store } from '../../store/store'

const wrapWithReduxProvider = (reactElement: React.ReactElement<any, string | React.JSXElementConstructor<any>>) => {
  return <Provider store={store}>{reactElement}</Provider>
}

export default wrapWithReduxProvider
