import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
} from "react-native";
import { PdfRef } from "../services/pdfService";

type Props = {
  pdfs: PdfRef[];
  onSelect: (pdf: PdfRef) => void;
};

export default function BookList({ pdfs, onSelect }: Props) {
  return (
    <>
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