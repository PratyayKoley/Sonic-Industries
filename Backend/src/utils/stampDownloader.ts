import axios from "axios";

export const imageUrlToBase64 = async (url: string): Promise<string> => {
  const response = await axios.get(url, {
    responseType: "arraybuffer",
  });

  const base64 = Buffer.from(response.data, "binary").toString("base64");

  // Detect image type (jpg / png)
  const contentType = response.headers["content-type"];

  return `data:${contentType};base64,${base64}`;
};
