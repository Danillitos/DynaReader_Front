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
              <View style={ styles.Row }>
                <TouchableOpacity onPress = {() => onSelect(item)}>
                  {item.thumbnail ? (
                    <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} />
                  ) : (
                    <View style={[styles.thumbnail, styles.placeholder]}>
                      <Text style={styles.thumbnailText}>Abra o PDF para extrair as informações</Text>
                    </View>
                  )}
                </TouchableOpacity>
                <View>
                    <Text style={styles.title}>
                      {item.name.replace(/\.pdf$/i, "")}
                    </Text>
                    <Text>Páginas: {item.pages || ""}</Text>
                    <Text>Autor:</Text>
                    <Text>Progresso:</Text>
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
    margin: 10,
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 20,
    marginTop: 30,
  },
  thumbnail: {
  width: 113,
  height: 164,
  backgroundColor: "#ccc",
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.3,
  shadowRadius: 3,
  elevation: 5,
  },
  thumbnailText: {
    textAlign: "center",
    padding: 10,
    
  },
  placeholder: {
    justifyContent: "center",
    alignItems: "center",
  },
  Row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  }
});