import Block from './Block';

export default function renderDOM(block: Block) {
  const root = document.querySelector('#app');

  if (!root) {
    throw new Error('Root element does not exist');
  }

  root.innerHTML = '';
  root.appendChild(block.getContent());
}
