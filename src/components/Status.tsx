'use client';

import { useEffect, useState } from 'react';

function LocalTime() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const update = () =>
      setTime(
        new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      );
    update();
    const id = setInterval(update, 30_000);
    return () => clearInterval(id);
  }, []);

  // Renders empty until mounted to avoid a server/client time mismatch
  return (
    <span className="tabular-nums" suppressHydrationWarning>
      {time ?? ' '}
    </span>
  );
}

export default function Status() {
  return (
    <div className="font-mono text-xs text-muted space-y-1.5">
      <p className="flex items-center gap-2">
        <span
          className="inline-block w-1.5 h-1.5 rounded-full bg-accent"
          aria-hidden
        />
        Probably building
      </p>
      <p>
        Local time <LocalTime />
      </p>
    </div>
  );
}
