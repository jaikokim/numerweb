import React from "react";
const footerStyle = {
  backgroundColor: "#370883",
  fontSize: "20px",
  color: "white",
  borderTop: "1px solid #E7E7E7",
  textAlign: "center",
  padding: "30px",
  position: "fixed",
  left: "0",
  bottom: "0",
  height: "80px",
  width: "100%"
};

const phantomStyle = {
  display: "block",
  padding: "20px",
  height: "120px",
  width: "100%"
};
const Footer = () => {
  return (
    <div>
      <div style={phantomStyle} />
      <div style={footerStyle}>
<<<<<<< HEAD
          <span>BENYA PRASERTSIRISIT<a className="App-link" href="http://cs.kmutnb.ac.th/">CS@KMUTNB</a></span>
=======
          <span>Kunut Chirdchai <a className="App-link" href="http://cs.kmutnb.ac.th/">CS@KMUTNB</a></span>
>>>>>>> 2ffbe89113d425462826858c8f82d8f551d791e5
      </div>
    </div>
  );
};
export default Footer;