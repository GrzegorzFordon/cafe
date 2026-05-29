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
        console.log(spritePath);
        const res = await import(`../assets/cards/${cardID ?? "def"}.png`);
        setImage(res.default);
      } catch (error) {
        console.log(error);
      }
    };
    fetchImage();
  }, [cardID, spritePath]);

  return { image };
};

export default useCardImage;
