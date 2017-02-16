import {
  Component, Prop, Watch,
  Lifecycle, Render, Filter, Vue, resultOf
} from '../index'


@Component
export class MyMixin extends Vue {
  public k: string
}

// extends interface option
declare module 'vue/types/options' {
  interface ComponentOptions<V extends Vue> {
    vuex?: {}
  }
}

@Component({
  directives: {},
  // components: { MyMixin },
  vuex: {},
  filters: {},
  name: 'my-component',
  transitions: {},
  delimiters: ['{{', '}}'],
})
export class MyComponent extends Vue {
  static components = { MyMixin }
  
  static method() {
    console.log('do something...')
  }

  myData = '123'
  lifecycleHooksCalled = 0

  funcData = function() {
    console.log('ひふみ')
  }

  @Prop numberWithoutDefault: number
  @Prop noDefaultInfersRequired: number
  @Prop defaultInfersNotRequired = 'Hello World!'
  @Prop nullableSoNotRequired: boolean | null = null
  @Prop countIncrementedByFunctionDefaultProp = 0

  @Prop functionType = (a: number) => a === 5

  /**
   * This function only runs when
   * no input value was given
   */
  @Prop functionDefault: number = resultOf(
    function(this: MyComponent) {
      return this.countIncrementedByFunctionDefaultProp++
    }
  )

  /**
   * This object will be placed in a function
   * and cloned for every new instance,
   * so no worries about shared state
   */
  @Prop objectDefault = {a: 123, b: 456}

  @Prop({required: true})
  forcedRequired = 123

  @Prop({required: false})
  forcedNotRequired: number

  @Prop({default: 'overwritten'})
  defaultOverwritten = 'this will be overwritten'

  @Prop(String, Number)
  multiTyped: string | number = '1234'

  myMethod() {
    // console.log(this)
  }

  get myGetter() {
    return this.myData
  }

  myWatchee = 'watch me!'

  @Watch('myWatchee')
  logWatch(str: string) {
    console.log(this.myData)
  }

  @Filter toUpper(input: string): string {
    return input.toUpperCase()
  }

  // instance property reification
  $parent: MyMixin
  $refs: {
    mychild: Vue
  }
  $el: HTMLDivElement

  @Lifecycle created() {
    this.lifecycleHooksCalled++
  }

  @Lifecycle('created')
  initializeSomeStuff() {
    this.lifecycleHooksCalled++
  }

  @Render render(h: Function) {
    return h('h1', 'Daisuke')
  }

}
