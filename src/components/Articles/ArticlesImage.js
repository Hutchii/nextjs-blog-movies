import Image from "next/image";
import { imageUrlBuilder } from "../../utils/imageUrlBuilder";

export default function ArticlesImage({ imageUrl }) {
  return (
    <Image
      src={imageUrlBuilder(imageUrl)}
      alt="Director"
      width={750}
      height={410}
      quality={90}
    />
  );
}
