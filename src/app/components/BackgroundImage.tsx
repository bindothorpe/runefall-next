import Image from "next/image";

export type BackgroundImageProps = {
  url: string;
  alt: string;
};

export default function BackgroundImage(props: BackgroundImageProps) {
  return (
    <div className="absolute w-455 top-0 left-1/2 -translate-x-1/2 inset-0 overflow-hidden flex items-center h-300">
      <Image
        src={props.url}
        alt={props.alt}
        fill
        className="relative object-contain object-[center_-8rem] md:object-[center_top]"
        priority
        quality={100}
        unoptimized={true}
      />
    </div>
  );
}
