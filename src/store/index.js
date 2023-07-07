import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './reducers'; // Create this file to combine your reducers

const store = createStore(rootReducer);

export default store;

// Wrap your App component with the Provider component
// Example usage in App.js:
// import store from './store';
// ...
// const App = () => {
//   return (
//     <Provider store={store}>
//       <RootNavigator />
//     </Provider>
//   );
// };
