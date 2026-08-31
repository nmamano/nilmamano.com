import React from "react";

/**
 * Renders the small subset of markdown allowed in figure captions: **bold**,
 * [links](href) and `inline code`. Shared by BlogImage, BlogVideo and
 * BlogCarousel so a caption behaves the same wherever it appears.
 */
export function parseCaption(text: string) {
  const parts = [];
  let currentIndex = 0;

  const pattern = /\*\*(.*?)\*\*|\[([^\]]+)\]\(([^)]+)\)|`([^`]+)`/g;
  let match;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > currentIndex) {
      parts.push(text.slice(currentIndex, match.index));
    }

    if (match[1] !== undefined) {
      parts.push(<strong key={match.index}>{match[1]}</strong>);
    } else if (match[4] !== undefined) {
      parts.push(<code key={match.index}>{match[4]}</code>);
    } else {
      parts.push(
        <a key={match.index} href={match[3]}>
          {match[2]}
        </a>,
      );
    }

    currentIndex = match.index + match[0].length;
  }

  if (currentIndex < text.length) {
    parts.push(text.slice(currentIndex));
  }

  return parts;
}
