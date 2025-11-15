import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function ActionPopover({
  trigger,
  children,
  align = "end",
  contentClassName,
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>{trigger}</PopoverTrigger>
      <PopoverContent className={contentClassName} align={align}>
        {children}
      </PopoverContent>
    </Popover>
  );
}
