import Vue = require('vue')

import {Component} from './core'
import {$$Prop} from './interface'

const FILTER_KEY = '$$Filter' as $$Prop

export function Filter(target: Vue, key: string): void {
  let filters: string[] = target[FILTER_KEY] = target[FILTER_KEY] || []
  filters.push(key)
}

Component.register(FILTER_KEY, function(proto, instance, options) {
  let filterMethods: string[] = proto[FILTER_KEY]
  options.filters = options.filters || {}
  for (let filter of filterMethods) {
    options.filters[filter] = proto[filter]
    delete proto[filter]
  }
})
