import { useEffect, useMemo, useState } from "react";

const useCardImage = (cardID) => {
  const [image, setImage] = useState(null);
  const spritePath = useMemo(
    () => `../assets/cards/${cardID ?? "def"}.png`,
    [cardID],
  );
  useEffect(() => {
    const fetchImage = async () => {
      try {
        const res = await import(spritePath);
        setImage(res);
      } catch (error) {
        console.log(error);
      }
    };
    fetchImage();
  }, [cardID, spritePath]);

  return { image };
};

export default useCardImage;
