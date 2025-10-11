import { useState } from "react";
import * as DocumentPicker from "expo-document-picker";
import PdfPageImage from "react-native-pdf-page-image"; // Import the new library

type PdfRef = {
  uri: string;
  name: string;
  thumbnailUri?: string;
};

export function usePdfService() {
  const [pdfs, setPdfs] = useState<PdfRef[]>([]);

  const pickPdfs = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "application/pdf",
        multiple: true,
        copyToCacheDirectory: true, // Ensure the file is accessible
      });

      if (result.canceled) {
        return;
      }

      // Map the assets and generate a thumbnail for each one
      const newPdfFiles = await Promise.all(
        result.assets.map(async (asset) => {
          try {
            // Generate the thumbnail for the first page (page 1)
            // The scale factor (1.0) can be adjusted for image quality/size
            const image = await PdfPageImage.generate(asset.uri, 1, 1.0);
            return {
              uri: asset.uri,
              name: asset.name || "Unnamed File",
              thumbnailUri: image.uri, // Store the generated thumbnail URI
            };
          } catch (thumbnailError) {
            console.error("Failed to generate thumbnail for:", asset.name, thumbnailError);
            // If thumbnail generation fails, return the file without a thumbnail
            return {
              uri: asset.uri,
              name: asset.name || "Unnamed File",
            };
          }
        })
      );

      setPdfs((prevPdfs) => [...prevPdfs, ...newPdfFiles]);
    } catch (error) {
      console.error("Error picking PDFs:", error);
    }
  };

  return { pdfs, pickPdfs };
}