import { cn } from "@/lib/utils";

export default function CustomSeparator({
  children,
  squareSize = 12,
  lineWidth = 2,
  gap = 0,
  background = "transparent",
  className = "",
}: {
  children?: React.ReactNode;
  squareSize?: number;
  lineWidth?: number;
  gap?: number;
  background?: string;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center justify-center w-full", className)}>
      <div
        className="flex-1 bg-linear-to-l from-[#4D475F] to-[#4d475f00]"
        style={{ height: `${lineWidth}px` }}
      />
      {children ? (
        children
      ) : (
        <div
          className={`mx-${gap} border-[#4D475F] bg-${background}`}
          style={{
            width: `${squareSize}px`,
            height: `${squareSize}px`,
            borderWidth: `${lineWidth}px`,
            transform: "rotate(45deg)",
          }}
        />
      )}

      <div
        className="flex-1 bg-linear-to-r from-[#4D475F] to-[#4d475f00]"
        style={{ height: `${lineWidth}px` }}
      />
    </div>
  );
}
