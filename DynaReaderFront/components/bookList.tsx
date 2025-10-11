import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
} from "react-native";
import { PdfRef } from "../services/pdfService";
import PdfPageCounter from "./pdfLoader";

type Props = {
  pdfs: PdfRef[];
  onSelect: (pdf: PdfRef) => void;
  updatePdfPagesCount: (uri: string, pages: number) => void; // Adicione esta prop
};

export default function BookList({ pdfs, onSelect, updatePdfPagesCount }: Props) {
  return (
    <>
      {/* Componentes invisíveis para contar páginas */}
      {pdfs.map((pdf) => (
        !pdf.pages && (
          <PdfPageCounter
            key={pdf.uri}
            uri={pdf.uri}
            onLoadComplete={(numberOfPages) => updatePdfPagesCount(pdf.uri, numberOfPages)}
          />
        )
      ))}
      
      {/* Lista de PDFs */}
      <FlatList
        style={{ alignSelf: "stretch" }}
        data={pdfs}
        keyExtractor={(item, index) => `${item.uri}-${index}`}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.title}>
              {item.name.replace(/\.pdf$/i, "")}
            </Text>
            <Text>Páginas: {item.pages || "Carregando..."}</Text>
            <Text>Autor:</Text>
            <Text>Progresso:</Text>
          </View>
        )}
        ListEmptyComponent={
          <View style={styles.item}>
            <Text>Nenhum PDF selecionado ainda.</Text>
          </View>
        }
      />
    </>
  );
}

const styles = StyleSheet.create({
  item: { 
    padding: 15 
  },
  title: { 
    fontSize: 16, 
    fontWeight: "bold" 
  },
  separator: { 
    height: 1, 
    backgroundColor: "#ddd", 
    marginHorizontal: 10 
  },
});