import React, { useContext } from "react";
import styled from "styled-components";
import { DocumentContext } from "../../documents/documentContext";

// Define types for the DocumentContext
interface DocumentContextType {
  createDocument: () => void;
}

// Style the button
const StyledCreateButton = styled.button`
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  width: 202px;
  height: 40px;
  padding: 0px 17px;
  margin: 0px;
  margin-right: 16px;
  border: none;
  border-radius: 4px;
  color: #ffffff;
  background-color: #e46643;
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 15px;
  line-height: 18px;
  cursor: pointer;

  &:hover {
    background-color: #f39765;
  }
`;

// CreateButton component
const CreateButton: React.FC = () => {
  const { createDocument } = useContext(DocumentContext) as DocumentContextType;

  return (
    <StyledCreateButton onClick={() => createDocument()}>
      + New Document
    </StyledCreateButton>
  );
};

export default CreateButton;
