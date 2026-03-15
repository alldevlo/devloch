import type { ReactNode } from "react";

type RichSegment =
  | { type: "text"; value: string }
  | { type: "bold"; value: string }
  | { type: "link"; text: string; href: string };

function tokenize(input: string): RichSegment[] {
  const segments: RichSegment[] = [];
  // Match **bold**, [text](url), or plain text
  const pattern = /\*\*(.+?)\*\*|\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(input)) !== null) {
    if (match.index > lastIndex) {
      segments.push({ type: "text", value: input.slice(lastIndex, match.index) });
    }
    if (match[1] !== undefined) {
      segments.push({ type: "bold", value: match[1] });
    } else if (match[2] !== undefined && match[3] !== undefined) {
      segments.push({ type: "link", text: match[2], href: match[3] });
    }
    lastIndex = pattern.lastIndex;
  }

  if (lastIndex < input.length) {
    segments.push({ type: "text", value: input.slice(lastIndex) });
  }

  return segments;
}

export function renderRichText(input: string): ReactNode[] {
  const segments = tokenize(input);

  return segments.map((seg, i) => {
    switch (seg.type) {
      case "bold":
        return <strong key={i}>{seg.value}</strong>;
      case "link":
        return (
          <a key={i} href={seg.href} rel="noopener noreferrer" target="_blank" className="underline hover:text-[var(--primary)]">
            {seg.text}
          </a>
        );
      case "text":
      default:
        return <span key={i}>{seg.value}</span>;
    }
  });
}

export function RichParagraph({ children, className }: { children: string; className?: string }) {
  return <p className={className}>{renderRichText(children)}</p>;
}
