"use client";

import React, { useState, useEffect } from "react";

export function HeaderClock() {
  const [timeString, setTimeString] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      };
      const formatted = new Intl.DateTimeFormat("en-US", options).format(now);
      setTimeString(formatted);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!timeString) {
    return <span className="font-mono text-xs sm:text-sm font-semibold text-muted-foreground">--:--:-- IST</span>;
  }

  return (
    <span className="font-mono text-xs sm:text-sm font-semibold text-muted-foreground tracking-tight">
      {timeString} IST
    </span>
  );
}
