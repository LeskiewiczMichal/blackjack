import { AppThunk } from "store/store";

const preloadImage =
  (imgUrl: string): AppThunk =>
  async () => {
    return new Promise<void>((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        resolve();
      };
      img.onerror = (err) => {
        reject(err);
      };
      img.src = imgUrl;
    });
  };

export { preloadImage };
