'use client';

import { useEffect, useState, useRef } from 'react';

type Props = {
  text: string | string[];
  typewriterSpeed?: number;
  typewriterDeleteSpeed?: number;
  typewriterPause?: number;
  className?: string;
  style?: React.CSSProperties;
};

export default function Description({
  text,
  typewriterSpeed = 80,
  typewriterDeleteSpeed = 40,
  typewriterPause = 1500,
  className,
  style,
}: Props) {
  const phrases = Array.isArray(text) ? text : null;
  const [display, setDisplay] = useState(phrases ? '' : (text as string));
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(true);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!phrases) return;
    const blink = setInterval(() => setCursorVisible((v) => !v), 500);
    return () => clearInterval(blink);
  }, [phrases]);

  useEffect(() => {
    if (!phrases) return;
    const current = phrases[phraseIdx] ?? '';
    if (timer.current) clearTimeout(timer.current);

    if (!deleting && display === current) {
      timer.current = setTimeout(() => setDeleting(true), typewriterPause);
      return;
    }
    if (deleting && display === '') {
      setDeleting(false);
      setPhraseIdx((i) => (i + 1) % phrases.length);
      return;
    }
    const delay = deleting ? typewriterDeleteSpeed : typewriterSpeed;
    timer.current = setTimeout(() => {
      if (deleting) {
        setDisplay((d) => d.slice(0, -1));
      } else {
        setDisplay(current.slice(0, display.length + 1));
      }
    }, delay);

    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [phrases, phraseIdx, display, deleting, typewriterSpeed, typewriterDeleteSpeed, typewriterPause]);

  if (!phrases) {
    return (
      <p className={className} style={style}>
        {text}
      </p>
    );
  }

  return (
    <p className={className} style={style} aria-live="polite">
      <span>{display}</span>
      <span style={{ opacity: cursorVisible ? 1 : 0, marginLeft: 1 }}>|</span>
    </p>
  );
}
