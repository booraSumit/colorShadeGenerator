import React from "react";
import "./colorCard.css";
const Shade = (props) => {
  const { onToggleSlide, shade, onCopy, onNext, onBack } = props;
  return (
    <div
      className="shade_wrapper"
      style={{ left: shade.showShadeCard ? "0" : "-100%" }}
    >
      <div className="shade_window_decoration">
        <div className="pages">
          <i class="fa fa-arrow-left" onClick={onBack}></i>
          <i class="fa fa-arrow-right" onClick={onNext}></i>
        </div>
        <i className="fa fa-times action_btn" onClick={onToggleSlide}></i>
      </div>
      {shade.page.map((c, id) => (
        <div key={id} className="shade_color">
          <input
            className="shade_name"
            style={{
              backgroundColor: `hsl(${c.h},${c.s}%,${c.l}%)`,
              color:
                (c.s < 40 && c.l < 40) || (c.s > 40 && c.l < 45)
                  ? "white"
                  : "black",
            }}
            onClick={(el) => onCopy(el)}
            readOnly
            value={`hsl(${c.h},${c.s}%,${c.l}%)`}
          />

          <span
            style={{
              color:
                (c.s < 40 && c.l < 40) || (c.s > 40 && c.l < 45)
                  ? "white"
                  : "black",
            }}
          >
            <i className="fa fa-info-circle action_btn"></i>
          </span>
        </div>
      ))}
    </div>
    // null
  );
};

export default Shade;
