import { useState } from "react";
import * as DocumentPicker from "expo-document-picker";
import PdfPageImage from "react-native-pdf-page-image"

export type PdfRef = { uri: string; name: string; pages?: number; thumbnail?: string; };

export function usePdfService() {
  const [pdfs, setPdfs] = useState<PdfRef[]>([]);

  const pickPdfs = async () => {
    try {
      const res = await DocumentPicker.getDocumentAsync({
        type: ["application/pdf"],
        multiple: true,
        copyToCacheDirectory: true,
      });

      if ("canceled" in res) {
        if (res.canceled) return;
        const newFiles =
          res.assets?.map((a) => ({
            uri: a.uri,
            name: a.name || a.uri.split("/").pop() || "Arquivo sem nome",
          })) ?? [];
        setPdfs((prev) => [...prev, ...newFiles]);
        return;
      }

      // API antiga
      const legacy = res as any;
      if (legacy?.type === "success" && legacy?.uri) {
        setPdfs((prev) => [
          ...prev,
          {
            uri: legacy.uri,
            name:
              legacy.name ||
              legacy.uri.split("/").pop() ||
              "Arquivo sem nome",
          },
        ]);
      }
    } catch (err) {
      console.error("Erro ao selecionar PDFs:", err);
    }
  };

  const updatePdfData = (pdfUri: string, numberOfPages: number, thumbnail?: string) => {
    setPdfs((prev) => 
      prev.map((pdf =>
        pdf.uri === pdfUri ? { ...pdf, pages: numberOfPages, thumbnail } : pdf
      ))
    )
  }

  const generatePdfThumbnail = async (pdfUri: string): Promise<string | undefined> => {
    try {
      const pageNumber = 0
      const scale = 1.0
      const pageImage = await PdfPageImage.generate(pdfUri, pageNumber, scale)
      return pageImage.uri
    }
    catch (error) {
      console.error("Erro ao gerar thumbnail do PDF:", error)
      return undefined
    }  
  }

  return { pdfs, pickPdfs, updatePdfData, generatePdfThumbnail };
}
