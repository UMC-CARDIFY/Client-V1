import ReactDOM from 'react-dom';
import WordCard from '../Cards/WordCard';
import BlankCard from '../Cards/BlankCard';
import MultiCard from '../Cards/MultiCard';
import ImageCard from '../Cards/ImageCard';

class ReactNodeView {
  constructor(node, view, getPos) {
    this.node = node;
    this.view = view;
    this.getPos = getPos;

    this.dom = document.createElement('div');
    this.dom.className = 'react-node-view';

    this.mount();
  }

  mount() {
    const Component = this.getComponent();
    console.log('Mounting component:', Component);
    if (Component) {
      this.root = ReactDOM.createRoot(this.dom);
      this.root.render(Component);
    }
  }

  getComponent() {
    switch (this.node.type.name) {
      case 'word_card':
        return <WordCard />;
      case 'blank_card':
        return <BlankCard />;
      case 'multi_card':
        return <MultiCard />;
      case 'image_card':
        return <ImageCard />;
      default:
        return null;
    }
  }
  
  update(node) {
    if (node.type !== this.node.type) {
      return false;
    }
    this.node = node;
    this.mount();
    return true;
  }

  selectNode() {
    this.dom.classList.add('ProseMirror-selectednode');
  }

  deselectNode() {
    this.dom.classList.remove('ProseMirror-selectednode');
  }

  destroy() {
    if (this.root) {
      this.root.unmount();
    }
  }
}

export default ReactNodeView;