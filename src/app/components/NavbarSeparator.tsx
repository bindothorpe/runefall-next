import { Separator } from "@/components/ui/separator";
export default function NavbarSeparator(props: { hight: string }) {
  return (
    <Separator
      orientation="vertical"
      className={`!${props.hight} !w-0.5 bg-linear-to-b from-[#2a194500] via-[#2A1945] to-[#2a194500]`}
    />
  );
}
