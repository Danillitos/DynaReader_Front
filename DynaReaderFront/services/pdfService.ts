import { useState } from "react";
import * as DocumentPicker from "expo-document-picker";

export type PdfRef = { uri: string; name: string; pages?: number };

export function usePdfService() {
  const [pdfs, setPdfs] = useState<PdfRef[]>([]);

  const updatePdfPagesCount = (uri: string, pages: number) => {
    setPdfs(currentPdfs =>
      currentPdfs.map(pdf =>
        pdf.uri === uri ? { ...pdf, pages } : pdf
      )
    );
  };

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

  return { pdfs, pickPdfs, updatePdfPagesCount };
}