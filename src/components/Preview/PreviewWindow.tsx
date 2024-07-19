import React from "react";
import styled from "styled-components";

const StyledPreview = styled.div<{ showPreview: boolean }>`
  display: flex;
  flex-flow: column nowrap;
  height: 100%;
  width: ${({ showPreview }) => (showPreview ? "100%" : "50%")};
  color: ${(props) => props.theme.color.markdownbody};
  background-color: ${(props) => props.theme.background.main};

  @media screen and (max-width: 768px) {
    width: ${({ showPreview }) => (showPreview ? "100%" : "0%")};
  }
`;

const TitleContainer = styled.div`
  height: 42px;
  font-family: "Roboto";
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
  letter-spacing: 2px;
  padding-left: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: ${({ theme }) => theme.color.sectionheader};
  background-color: ${({ theme }) => theme.background.sectionheader};
`;

const MarkdownContainer = styled.div`
  height: calc(100% - 42px);
  padding-left: 16px;
  padding-right: 24px;
  overflow: auto;
`;

interface PreviewWindowProps {
  showPreview: boolean;
  handlePreview: () => void;
}

const PreviewWindow: React.FC<PreviewWindowProps> = ({ showPreview, handlePreview }) => {
  return (
    <StyledPreview showPreview={showPreview}>
      <TitleContainer>
        PREVIEW
        {/* Assuming PreviewButton is imported and used here */}
        <PreviewButton
          showPreview={showPreview}
          handlePreview={handlePreview}
          className="show-markdown-button"
        />
      </TitleContainer>
      <MarkdownContainer>
        {/* Placeholder for Markdown content */}
      </MarkdownContainer>
    </StyledPreview>
  );
};

PreviewWindow.displayName = "PreviewWindow";
export default PreviewWindow;
