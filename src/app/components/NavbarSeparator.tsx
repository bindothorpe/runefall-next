import { Separator } from "@/components/ui/separator";
export default function NavbarSeparator(props: { height: string }) {
  return (
    <Separator
      orientation="vertical"
      className={`${props.height} w-0.5! bg-linear-to-b from-[#47466900] via-[#474669] to-[#47466900]`}
    />
  );
}
