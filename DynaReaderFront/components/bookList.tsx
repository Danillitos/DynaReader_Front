import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import DraggableFlatList, { RenderItemParams} from "react-native-draggable-flatlist"
import { PdfRef } from "../services/pdfService";

type Props = {
  pdfs: PdfRef[];
  onSelect: (pdf: PdfRef) => void;
};


export default function BookList({ pdfs, onSelect }: Props) {
  const [ data, setData ] = useState<PdfRef[]>(pdfs)
  const [ favorite, setFavorite ] = useState<{ [uri: string]: boolean }>({})

  useEffect(() => {
    setData(pdfs)
  }, [pdfs])

  const toggleFavorite = ( uri: string ) => {
    setFavorite(prev => ({
      ...prev,
      [uri]: !prev[uri],
    }))
  }

  const renderItem = ({ item, drag, isActive }: RenderItemParams<PdfRef>) => (
    <TouchableOpacity
      onLongPress={drag}
      delayLongPress={100}
      activeOpacity={0.9}
      style={[ 
        styles.item,
         { 
          backgroundColor: isActive ? "#f0f0f0" : "#fff",
          transform: [{ scale: isActive ? 1.03 : 1 }],
          shadowOpacity: isActive ? 0.4 : 0.2, 
        } 
      ]}
    >
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
    </TouchableOpacity>
  )

  return (
    <>
      {pdfs.length === 0 ? (
        <View style={styles.emptyItem}>
          <Text style={styles.NoPdfText}>Nenhum PDF selecionado ainda.</Text>
        </View>
      ) : (
        <DraggableFlatList
          activationDistance={10}
          removeClippedSubviews={false}
          autoscrollSpeed={300}
          autoscrollThreshold={200}
          dragItemOverflow={true}
          animationConfig={{ damping: 15, mass: 0.2, stiffness: 150 }}
          style={{ alignSelf: "stretch" }}
          data={data}
          keyExtractor={(item, index) => `${item.uri}-${index}`}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          renderItem={renderItem}
          onDragEnd={({ data }) => setData(data)}
          contentContainerStyle={{ paddingBottom: 170 }}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  item: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
    elevation: 2,
  },
  emptyItem: { 
    flex: .8,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: { 
    fontSize: 16, 
    fontWeight: "bold",
    maxWidth: 250
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
  },
  NoPdfText: {
    fontSize: 16,
    textAlign: 'center',
  }
});