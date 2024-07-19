import React, { useContext } from "react";
import styled from "styled-components";
import iconDelete from "../../assets/icon-delete.svg";
import { DocumentContext } from "../../documents/documentContext";

// Define types for the props
interface DeleteButtonProps {
  setModalOpen: (open: boolean) => void;
}

// Style the button
const StyledDeleteButton = styled.button`
  height: 20px;
  width: 18px;
  margin-right: 24px;
  padding: 0%;
  background-color: #2b2d31;
  cursor: pointer;
  border: none;

  /* &:hover {
    color: #e46643;
  } */
`;

// Style the icon
const DeleteIcon = styled.img<{ disabled: boolean }>`
  &:hover {
    filter: ${({ disabled }) =>
      disabled
        ? ""
        : "invert(55%) sepia(52%) saturate(4781%) hue-rotate(339deg) brightness(99%) contrast(80%)"};
  }
`;

// DeleteButton component
const DeleteButton: React.FC<DeleteButtonProps> = ({ setModalOpen }) => {
  const { documents } = useContext(DocumentContext);

  return (
    <StyledDeleteButton
      onClick={() => {
        setModalOpen(true);
      }}
      disabled={documents.length === 0}
    >
      <DeleteIcon src={iconDelete} disabled={documents.length === 0} />
    </StyledDeleteButton>
  );
};

export default DeleteButton;
