import { Link } from "gatsby";
import React from "react";
import styled from "styled-components";
import {
  BLACK_COLOR,
  GRAY_COLOR,
  RED_COLOR,
  SKY_COLOR,
} from "../../constants/colors";

const NavbarContainer = styled.nav`
  width: 50%;
`;

const NavbarList = styled.ul`
  display: flex;
  justify-content: space-between;
  list-style: none;
`;

const NavbarItem = styled.li`
  font-size: 2rem;
  font-weight: bold;

  a {
    color: white;
    text-decoration: none;

    &:hover,
    &.selected {
      color: white;
      -webkit-text-stroke: 1px ${GRAY_COLOR};
    }
  }
`;

const Navbar = () => {
  return (
    <NavbarContainer>
      <NavbarList>
        <NavbarItem>
          <Link to="/" className="HeaderMenu-link">
            Home
          </Link>
        </NavbarItem>

        <NavbarItem>
          <Link to="/comics" className="HeaderMenu-link">
            Comics
          </Link>
        </NavbarItem>

        <NavbarItem>
          <Link to="/stories" className="HeaderMenu-link">
            Stories
          </Link>
        </NavbarItem>

        <NavbarItem>
          <Link to="/favorites" className="HeaderMenu-link">
            Favorites
          </Link>
        </NavbarItem>
      </NavbarList>
    </NavbarContainer>
  );
};

export default Navbar;
