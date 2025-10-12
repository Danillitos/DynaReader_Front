import React, { useState } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from "react-native";
import { PdfRef } from "../services/pdfService";

type Props = {
  pdfs: PdfRef[];
  onSelect: (pdf: PdfRef) => void;
};

export default function BookList({ pdfs, onSelect }: Props) {
  const [ favorite, setFavorite ] = useState<{ [uri: string]: boolean }>({})

  const toggleFavorite = ( uri: string ) => {
    setFavorite(prev => ({
      ...prev,
      [uri]: !prev[uri],
    }))
  }

  return (
    <>
      <FlatList
        style={{ alignSelf: "stretch" }}
        data={pdfs}
        keyExtractor={(item, index) => `${item.uri}-${index}`}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <TouchableOpacity onPress = {() => onSelect(item)}>
              <Text style={styles.title}>
                {item.name.replace(/\.pdf$/i, "")}
              </Text>
              <Text>Páginas: {item.pages || "Carregando..."}</Text>
              <Text>Autor:</Text>
              <Text>Progresso:</Text>
            </TouchableOpacity>
            <View style={ styles.iconRow }>
              <TouchableOpacity onPress={() => onSelect(item)}>
                <Image
                  source={require("../assets/images/read-Book-Icon.png")}
                  style={ styles.icons }
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => toggleFavorite(item.uri)}>
                <Image
                  source={favorite[item.uri] ? require("../assets/images/favorited-Book.png") : require("../assets/images/favorite-Book.png")}
                  style={ styles.icons }
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <Image
                  source={require("../assets/images/statistics.png")}
                  style={ styles.icons }
                />
              </TouchableOpacity>
            </View>
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
  icons: {
    width: 43,
    height: 43,
    margin: 5,
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 20,
  },
});