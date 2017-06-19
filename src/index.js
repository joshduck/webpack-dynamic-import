// @flow
import {inspect} from 'import-inspector';

const stopInspecting = inspect(metadata => {
  console.log('Imported', metadata);
});

import('./dynamic').then(({ default: dynamic }) => {
  dynamic();
});

setTimeout(stopInspecting);
