// components/MainContent/MainContent.tsx
'use client';

import React, { useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
import DOMPurify from 'dompurify';

export default function MainContent({
  content,
}: {
  content: string;
}) {
  const safe = useMemo(
    () => DOMPurify.sanitize(content),
    [content]
  );

  return (
    <ReactMarkdown rehypePlugins={[rehypeRaw, rehypeSanitize]}>
      {safe}
    </ReactMarkdown>
  );
}
