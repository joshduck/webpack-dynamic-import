// @flow
import('./dynamic').then(({ default: dynamic }) => {
  console.log('resolved');
  console.log(dynamic());
})
