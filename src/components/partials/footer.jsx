import React from "react";
import styled from "styled-components";
import { BLACK_COLOR } from "../../constants/colors";

const FooterDiv = styled.footer`
  width: 100%;
  background-color: ${BLACK_COLOR};
  height: 100px;
  position: fixed;
  bottom: 0;
`;

const Footer = () => {
  return <FooterDiv></FooterDiv>;
};

export default Footer