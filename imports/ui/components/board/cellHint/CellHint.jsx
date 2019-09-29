import React from "react";
import "./CellHint.scss";
import PropTypes from "prop-types";

const CellHint = props => {
  return (
    <div className={`cellHint ${props.isCol ? "cellHint--isCol" : null}`}>
      {props.hint.split("-").map((row, i) => {
        return (
          <p
            className={`cellHint__text ${
              props.isCol ? "cellHint__text--isCol" : null
            }`}
            key={i}>
            {row}
          </p>
        );
      })}
    </div>
  );
};

CellHint.propTypes = {
  i: PropTypes.number,
  hint: PropTypes.string,
  isCol: PropTypes.bool
};

export default CellHint;
