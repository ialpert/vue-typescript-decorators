import Vuex from 'vuex'
import {expect} from 'chai'
import { Vue, Component, state, mutation } from '../index'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    count: 4,
    msg: 'Welcome to Your Vue.js App'
  },
  mutations: {
    increment (state: any) {
      state.count++
    }
  }
})

@Component
class Thing extends Vue {
  @state msg: string
  @state count: number
  @mutation increment: Function
}

describe('state decorator', () => {
  let thing = new Thing({store})

  it('should bind to the store\'s state', () => {
    expect(thing.count).to.equal(4)
  })
  
  it('should bind the correct state to the correct props', () => {
    expect(thing.msg).to.equal('Welcome to Your Vue.js App')
    expect(thing.count).to.equal(4)
  })
})