"use client"

import * as React from "react"
import { CalendarIcon } from "@radix-ui/react-icons"
import { format } from "date-fns"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface CalendarDemoProps {
  setDueDate: React.Dispatch<React.SetStateAction<string>>;
}

export function CalendarDemo({setDueDate}: CalendarDemoProps) {
  const [date, setDate] = React.useState<Date | undefined>()

  const handleSelectDate = (selectedDate: Date) => {
    setDate(selectedDate);
    if (selectedDate) {
      setDueDate(format(selectedDate, "yyyy-MM-dd")); // Format date as needed
    } else {
      setDueDate(''); // Reset due date if no date is selected
    }
  };


  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[240px] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
      <Calendar
          mode="single"
          selected={date}
          onSelect={(selectedDate) => handleSelectDate(selectedDate as Date)}
          initialFocus
        />
        
      </PopoverContent>
    </Popover>
  )
}
