import React from "react";
import styled from "styled-components";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

// Define types for the props
interface NavigationProps {
  showSidebar: boolean;
  handleSidebar: () => void;
  handleEnter: () => void;
  setModalOpen: (open: boolean) => void;
}

const StyledNavigation = styled.div``;

const Navigation: React.FC<NavigationProps> = ({
  showSidebar,
  handleSidebar,
  handleEnter,
  setModalOpen,
}) => {
  return (
    <StyledNavigation>
      <Sidebar showSidebar={showSidebar} handleSidebar={handleSidebar} />
      <Navbar
        showSidebar={showSidebar}
        handleSidebar={handleSidebar}
        handleEnter={handleEnter}
        setModalOpen={setModalOpen}
      />
    </StyledNavigation>
  );
};

export default Navigation;
