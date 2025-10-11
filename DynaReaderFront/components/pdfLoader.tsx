import React from 'react';
import Pdf from 'react-native-pdf';

type Props = {
  uri: string;
  onLoadComplete: (pages: number) => void;
};

export default function PdfPageCounter({ uri, onLoadComplete }: Props) {
  return (
    <Pdf
      source={{ uri }}
      onLoadComplete={(numberOfPages) => {
        onLoadComplete(numberOfPages);
      }}
      onError={(error) => {
        console.log('Failed to get page count:', error);
      }}
      style={{ width: 1, height: 1, opacity: 0, position: 'absolute' }}
    />
  );
}