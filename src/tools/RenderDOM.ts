import Block from './Block.ts';

function renderDOM(query: string, block: Block) {
  const root = document.querySelector(query);

  const element = block.getContent();

  if (element) root?.appendChild(element);

  block.dispatchComponentDidMount();

  return root;
}

export default renderDOM;
