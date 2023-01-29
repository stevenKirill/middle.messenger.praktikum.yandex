import { registerComponent } from 'core';
import { BlockConstructable } from 'core/block/Block';
import * as components from '../components';

for (const component of Object.values(components) as BlockConstructable[]) {
  console.log(component);
  if (component.componentName) {
    registerComponent(component);
  }
}
