import React, { useState, useEffect, createContext, ReactNode } from "react";
import defaultDocuments from "./data.json";
import { v4 as uuidv4 } from "uuid";

// Define types for document and context
interface Document {
  id: string;
  name: string;
  createdAt: string;
  content: string;
}

interface DocumentContextType {
  documents: Document[];
  activeDocument: Document | null;
  createDocument: () => void;
  deleteDocument: () => void;
  onDocumentContentChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onDocumentNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  saveDocument: () => void;
  changeActiveDocument: (id: string) => void;
}

export const DocumentContext = createContext<DocumentContextType>({
  documents: JSON.parse(localStorage.getItem("documents-browserMarkdownApp") || '[]'),
  activeDocument: null,
  createDocument: () => {},
  deleteDocument: () => {},
  onDocumentContentChange: () => {},
  onDocumentNameChange: () => {},
  saveDocument: () => {},
  changeActiveDocument: () => {},
});

/* eslint-disable react/prop-types */

interface DocumentContextWrapperProps {
  children: ReactNode;
}

const DocumentContextWrapper: React.FC<DocumentContextWrapperProps> = ({ children }) => {
  const [documents, setDocuments] = useState<Document[]>(
    JSON.parse(localStorage.getItem("documents-browserMarkdownApp") || '[]') || defaultDocuments
  );
  const [activeDocument, setActiveDocument] = useState<Document | null>(
    JSON.parse(localStorage.getItem("activeDocument-browserMarkdownApp") || 'null') || defaultDocuments[0]
  );

  useEffect(() => {
    const documents = JSON.parse(localStorage.getItem("documents-browserMarkdownApp") || '[]');
    if (documents) {
      setDocuments(documents);
    }
  }, []);

  useEffect(() => {
    const activeDocument = JSON.parse(localStorage.getItem("activeDocument-browserMarkdownApp") || 'null');
    if (activeDocument) {
      setActiveDocument(activeDocument);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("documents-browserMarkdownApp", JSON.stringify(documents));
    localStorage.setItem("activeDocument-browserMarkdownApp", JSON.stringify(activeDocument));
  }, [documents, activeDocument]);

  // Create a new document
  const createDocument = () => {
    const newID = uuidv4();
    const newDateObject = new Date();
    const newDateString =
      `${newDateObject.toLocaleString("default", { day: "numeric" })} ` +
      `${newDateObject.toLocaleString("default", { month: "long" })} ` +
      `${newDateObject.toLocaleString("default", { year: "numeric" })}`;

    const newDocument: Document = {
      id: newID,
      name: "untitled-document.md",
      createdAt: newDateString,
      content: "# Create your new markdown here!",
    };

    setActiveDocument(newDocument);

    setDocuments((existingDocuments) => [
      ...existingDocuments,
      newDocument,
    ]);
  };

  // Handle document content change
  const onDocumentContentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (activeDocument) {
      setActiveDocument({
        ...activeDocument,
        content: event.target.value,
      });
    }
  };

  // Handle document name change
  const onDocumentNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (activeDocument) {
      setActiveDocument({
        ...activeDocument,
        name: event.target.value,
      });
    }
  };

  // Save the document
  const saveDocument = () => {
    setDocuments((existingDocuments) =>
      existingDocuments.map((document) =>
        document.id === activeDocument?.id
          ? { ...document, name: activeDocument?.name, content: activeDocument?.content }
          : document
      )
    );
  };

  // Delete the document
  const deleteDocument = () => {
    if (activeDocument) {
      const existingDocuments = documents.filter(
        (document) => document.id !== activeDocument.id
      );
      setDocuments(existingDocuments);
      setActiveDocument(existingDocuments.length === 0 ? null : existingDocuments[0]);
    }
  };

  // Change the active document
  const changeActiveDocument = (id: string) => {
    const doc = documents.find((document) => document.id === id) || null;
    setActiveDocument(doc);
  };

  return (
    <DocumentContext.Provider
      value={{
        documents,
        activeDocument,
        createDocument,
        deleteDocument,
        onDocumentContentChange,
        onDocumentNameChange,
        saveDocument,
        changeActiveDocument,
      }}
    >
      {children}
    </DocumentContext.Provider>
  );
};

export default DocumentContextWrapper;
