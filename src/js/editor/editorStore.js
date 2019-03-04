import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { $ordering } from '@redux'

export const editorStore = createStore(
  function reduce (nullableState, action) {
    const state = nullableState == null ? {} : nullableState

    return {
      ordering: $ordering.reduce(state.ordering, action)
    }
  },
  composeWithDevTools()
)
