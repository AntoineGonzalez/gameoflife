import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import rootReducer from './store/reducers/rootReducer'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
const store = createStore(rootReducer)

root.render(
  <Provider store={store}>
    <App />
  </Provider>
)
