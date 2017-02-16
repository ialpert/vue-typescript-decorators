# Typescript decorators for Vue 2.0 [![Build Status](https://travis-ci.org/Evertt/vue-typescript-decorators.svg?branch=master)](https://travis-ci.org/Evertt/vue-typescript-decorators)
-----

## Intro

This started as a fork of the amazingly awesome library [av-ts](https://github.com/HerringtonDarkholme/av-ts). I forked it, because I wanted to have a few things styled differently, syntax wise. And I turned it into its own library, because I wanted to be able to add it like a normal library in my `package.json`.

## Example of most of the features:

```typescript
import { Vue, Component, prop, watch, lifecycle, filter
  state, mutation, getter, action } from 'vue-typescript-decorators'
import { OtherComponent } from './components/OtherComponent.vue'

@Component
export class MyComponent extends Vue {
  // Static properties and methods are
  // automatically added to the component's options.
  static components = { OtherComponent }

  // Any regular properties are added to the data-option.
  myData = '123'

  // This still counts as a property and so will be
  // added to the data-option instead of the methods-option.
  funcData = function() {
    console.log('ひふみ')
  }

  // The given type will end up being the prop's type.
  @prop numberWithoutDefault: number
  @prop noDefaultInfersRequired: number

  // The given default value will be the prop's default.
  @prop defaultInfersNotRequired = 'Hello World!'
  @prop nullableSoNotRequired: boolean | null = null

  // This prop will be of type function
  // and the given function will be its default value.
  @prop functionType = (a: number) => a === 5

  /**
   * This prop will be of type number
   * and the **result** of the given
   * function will be its default value.
   * The function will only run if
   * no value was given at creation
   */
  @prop functionDefault: number = resultOf(
    function(this: MyComponent) {
      return this.countIncrementedByFunctionDefaultProp++
    }
  )
  @prop countIncrementedByFunctionDefaultProp = 0

  /**
   * This object will be placed in a function
   * and cloned for every new instance,
   * so no worries about shared state
   */
  @prop objectDefault = {a: 123, b: 456}

  @prop({required: true})
  forcedRequired = 123

  @prop({required: false})
  forcedNotRequired: number

  @prop({default: 'overwritten'})
  defaultOverwritten = 'this will be overwritten'

  /**
   * When a prop has multiple types
   * then this library can't infer them.
   * So you'll have to define them explicitly.
   */
  @prop(String, Number)
  multiTyped: string | number = '1234'

  // Any regular method will be
  // added to the methods-option.
  myMethod() {
    alert('Hi!')
  }

  // Any regular getter / setter will
  // be added to the computed-option.
  get myGetter() {
    return this.myData
  }

  myWatchee = 'watch me!'

  @watch('myWatchee')
  logWatch(str: string) {
    console.log(this.myData)
  }

  /**
   * both these methods will be added
   * to the methods-option, and they
   * will both be called at the moment
   * the lifecyle hook runs. So you
   * can have multiple methods for
   * one lifecycle hook.
   */
  @lifecycle created() {
    this.lifecycleHooksCalled++
  }

  @lifecycle('created')
  initializeSomeStuff() {
    this.lifecycleHooksCalled++
  }

  lifecycleHooksCalled = 0

  // This method will not be added to the
  // methods option. It will only be
  // added to the filters option.
  @filter toUpper(input: string): string {
    return input.toUpperCase()
  }

  // maps store.state.counter
  @state counter: number

  // maps store.mutations.increment
  @mutation increment: () => void

  // you can also provide a string identifier
  @getter('unfinishedTodos') todos: string[]

  // finally we also map actions of course
  @action doSomething: (n: number) => void
}
```

For all other features I refer you to the [original library](https://github.com/HerringtonDarkholme/av-ts).