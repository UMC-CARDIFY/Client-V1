import { createRoot } from 'react-dom/client';
import ImageCard from '../../Cards/ImageCard';

class ImageCardView {
  constructor(node, view, getPos, openModal) {
    this.node = node;
    this.view = view;
    this.getPos = getPos;

    // DOM 요소를 생성합니다.
    this.dom = document.createElement('div');
    this.dom.className = 'image-card-container';

    // React 컴포넌트를 렌더링합니다.
    this.root = createRoot(this.dom);
    this.root.render(
      <ImageCard 
        src={node.attrs.src}
        alt={node.attrs.alt}
        overlays={node.attrs.overlays}
        view={view} 
        getPos={getPos}
        updateCard={(attrs) => this.updateNode(attrs)}
      />
    );
  }

  updateNode(attrs) {
    const { state, dispatch } = this.view;
    const pos = this.getPos();

    const tr = state.tr.setNodeMarkup(pos, null, {
      ...this.node.attrs,
      ...attrs,
    });

    dispatch(tr);
  }

  update(node) {
    if (node.attrs.src !== this.node.attrs.src || node.attrs.overlays !== this.node.attrs.overlays) {
      this.node = node;
      this.root.render(
        <ImageCard 
          src={node.attrs.src}
          alt={node.attrs.alt}
          overlays={node.attrs.overlays}
          view={this.view} 
          getPos={this.getPos}
          updateCard={(attrs) => this.updateNode(attrs)}
        />
      );
    }
    return true;
  }

  destroy() {
    this.root.unmount();  // React 18 unmount 메서드
  }
}

export default ImageCardView;