import React from "react";
import ColorCard from "./colorCard/colorCard";
import generate from "../utils/generate";
import "../App.css";
import Shade from "./colorCard/shade";
import { paginate } from "../utils/paginate";

const { generateUniqueId, generateRandomColor, getColor, generateShades } =
  generate;

class ColorPlatlet extends React.Component {
  state = {
    color: [],
    isCopied: false,
    shade: {
      page: [],
      shades: [],
      showShadeCard: false,
      currenPage: 0,
      pageSize: 25,
    },
  };

  handleCopy = (el) => {
    el.target.select();
    document.execCommand("copy");
    this.setState({ isCopied: true });
    setTimeout(() => {
      this.setState({ isCopied: false });
    }, 1000);
  };

  handleAddTemplate = () => {
    if (this.state.color.length >= 7) return null;
    const color = [...this.state.color];
    const colorCode = generateRandomColor();
    color.push({
      colorCode,
      isLocked: false,
      id: generateUniqueId(colorCode),
    });
    this.setState({ color });
  };

  handleNextTemplate = () => {
    const color = [...this.state.color];
    for (let i = 0; i < color.length; i++) {
      if (color[i].isLocked) continue;
      color[i].colorCode = generateRandomColor();
    }
    this.setState({ color });
  };

  handleLock = (card) => {
    const color = [...this.state.color];
    const index = color.findIndex((c) => c.id === card.id);
    color[index].isLocked = !color[index].isLocked;
    this.setState({ color });
  };

  handleRemove = (card) => {
    if (this.state.color.length <= 4 || card.isLocked) return;
    const color = [...this.state.color].filter((c) => c.id !== card.id);
    this.setState({ color });
  };

  handleShadeCardSlide = () => {
    const showShadeCard = !this.state.shade.showShadeCard;
    const shade = this.state.shade;

    shade.showShadeCard = showShadeCard;
    this.setState({ shade });
  };

  handleShades = (card) => {
    if (this.state.shade.showShadeCard) return;
    this.handleShadeCardSlide();
    const shade = this.state.shade;
    shade.currenPage = 0;
    const { currenPage, pageSize } = shade;
    shade.shades = generateShades(card);
    shade.page = paginate(shade.shades, currenPage, pageSize);
    this.setState({ shade });
  };

  handleBack = () => {
    const { currenPage } = this.state.shade;
    if (currenPage <= 0) return;
    const shade = this.state.shade;
    shade.currenPage -= 1;
    shade.page = paginate(shade.shades, shade.currenPage, shade.pageSize);
    this.setState({ shade });
  };

  handleNext = () => {
    const { currenPage } = this.state.shade;
    if (currenPage >= 3) return;
    const shade = this.state.shade;
    shade.currenPage += 1;
    shade.page = paginate(shade.shades, shade.currenPage, shade.pageSize);
    this.setState({ shade });
  };

  componentDidMount() {
    this.setState({ color: getColor() });
  }

  render() {
    const { isCopied } = this.state;
    const { length: count } = this.state.color;
    return (
      <React.Fragment>
        <p
          className="clipboardCopy"
          style={{ display: isCopied ? "block" : "none" }}
        >
          {isCopied ? "Copied!" : null}
        </p>
        <button className="btn" onClick={this.handleNextTemplate}>
          Next Template
        </button>
        <button className="btn" onClick={this.handleAddTemplate}>
          Add Template
        </button>
        <div className="card_wrapper">
          {this.state.color.map((color) => (
            <ColorCard
              key={color.id}
              colorCode={color}
              onCopy={this.handleCopy}
              onRemove={() => this.handleRemove(color)}
              onLock={() => this.handleLock(color)}
              onShades={() => this.handleShades(color)}
              count={count}
            />
          ))}
        </div>
        <Shade
          shade={this.state.shade}
          onToggleSlide={this.handleShadeCardSlide}
          onCopy={this.handleCopy}
          onNext={this.handleNext}
          onBack={this.handleBack}
        />
      </React.Fragment>
    );
  }
}

export default ColorPlatlet;
