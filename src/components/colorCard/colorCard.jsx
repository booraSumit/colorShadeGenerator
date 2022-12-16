import React from "react";
import "./colorCard.css";

const ColorCard = (props) => {
  const { onCopy, onRemove, onLock, count, onShades } = props;
  const { colorCode } = props.colorCode;
  const { h, s, l } = colorCode;
  return (
    <div className="card">
      <div className="card_action">
        <i className="fa fa-edit action_btn"></i>
        <i className="fa fa-th action_btn" onClick={onShades}></i>
        <i
          className={
            props.colorCode.isLocked
              ? "fa fa-lock action_btn"
              : "fa fa-unlock action_btn"
          }
          onClick={onLock}
        ></i>
        {count > 4 && (
          <i className="fa fa-times action_btn" onClick={onRemove}></i>
        )}
      </div>
      <div
        className="card_color"
        style={{
          backgroundColor: `hsl(${h},${s}%,${l}%)`,
        }}
      ></div>
      <input
        type="text"
        value={`hsl(${h},${s}%,${l}%)`}
        onClick={(el) => onCopy(el)}
        readOnly
      />
    </div>
  );
};

export default ColorCard;
