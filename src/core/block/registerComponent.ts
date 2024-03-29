/* eslint-disable @typescript-eslint/no-explicit-any */
import Handlebars, { HelperOptions } from 'handlebars';
import { BlockClass } from './Block';

export default function registerComponent<Props extends {}>(
  Component: BlockClass<Props>,
) {
  Handlebars.registerHelper(
    Component.componentName,
    function func(
      this: Props,
      { hash: { ref, ...hash }, data, fn }: HelperOptions,
    ) {
      if (!data.root.children) {
        data.root.children = {};
      }
      if (!data.root.refs) {
        data.root.refs = {};
      }
      const { children, refs } = data.root;
      (Object.keys(hash) as any).forEach((key: keyof Props) => {
        if (this[key] && typeof this[key] === 'string') {
          hash[key] = hash[key].replace(new RegExp(`{{${String(key)}}}`, 'i'), this[key]);
        }
      });
      const component = new Component(hash);
      children[component.id] = component;
      if (ref) {
        refs[ref] = component;
      }
      const contents = fn ? fn(this) : '';
      return `<div data-id="${component.id}">${contents}</div>`;
    },
  );
}
