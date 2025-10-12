import React from "react";
import { View, StyleSheet, Modal, TouchableOpacity, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context"
import Pdf from "react-native-pdf";
import { PdfRef } from "../services/pdfService";

type Props = {
  visible: boolean;
  pdf: PdfRef | null;
  onClose: () => void;
  onPdfLoadComplete?: (pdfUri: string, numberOfPages: number) => void
};

export default function PdfViewer({ visible, pdf, onClose, onPdfLoadComplete }: Props) {
  if (!pdf) return null;

  const source = { uri: pdf.uri, cache: true };

  return (
    <Modal visible={visible} animationType="slide">
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeText}>Fechar</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle} numberOfLines={1}>
            {pdf.name}
          </Text>
        </View>

        <Pdf
          source={source}
          style={styles.pdf}
          onError={(error) => console.error("Erro ao carregar PDF:", error)}
          enablePaging
          enableAnnotationRendering
          trustAllCerts={false}
          onLoadComplete={(numberOfPages) => {
            console.log(`Total de páginas: ${numberOfPages}`)
            if (onPdfLoadComplete && pdf) {
              onPdfLoadComplete(pdf.uri, numberOfPages)
            }
          }}
        />
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    backgroundColor: "#eee",
  },
  closeButton: { padding: 5 },
  closeText: { fontSize: 16, color: "blue" },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
  pdf: { flex: 1, width: "100%" },
});
