import { Asterisk } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Marquee({
  items,
  className,
  itemClassName,
  slow = false,
  separator,
}: {
  items: string[];
  className?: string;
  itemClassName?: string;
  slow?: boolean;
  separator?: React.ReactNode;
}) {
  const row = [...items, ...items, ...items];
  const Sep = () => (
    <span className="mx-6 inline-flex shrink-0 items-center">
      {separator ?? <Asterisk className="size-4" strokeWidth={2.4} />}
    </span>
  );
  return (
    <div className={cn("relative overflow-hidden", className)}>
      <div
        className={cn(
          "flex w-max items-center whitespace-nowrap",
          slow ? "animate-marquee-slow" : "animate-marquee",
        )}
      >
        {[0, 1].map((half) => (
          <div
            key={half}
            aria-hidden={half === 1}
            className="flex items-center"
          >
            {row.map((item, i) => (
              <span key={i} className="flex items-center">
                <span className={cn("inline-block", itemClassName)}>
                  {item}
                </span>
                <Sep />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
