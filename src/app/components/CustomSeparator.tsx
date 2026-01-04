import { cn } from "@/lib/utils";

export default function CustomSeparator({
  squareSize = 12,
  lineWidth = 2,
  gap = 0,
  className = "",
}: {
  squareSize?: number;
  lineWidth?: number;
  gap?: number;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center justify-center w-full", className)}>
      <div
        className="flex-1 bg-linear-to-l from-[#4D475F] to-[#4d475f00]"
        style={{ height: `${lineWidth}px` }}
      />
      <div
        className={`mx-${gap} border-[#4D475F] bg-transparent`}
        style={{
          width: `${squareSize}px`,
          height: `${squareSize}px`,
          borderWidth: `${lineWidth}px`,
          transform: "rotate(45deg)",
        }}
      />
      <div
        className="flex-1 bg-linear-to-r from-[#4D475F] to-[#4d475f00]"
        style={{ height: `${lineWidth}px` }}
      />
    </div>
  );
}
