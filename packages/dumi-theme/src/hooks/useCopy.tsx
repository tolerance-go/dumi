import React, { useState } from 'react';

export default function useCopy() {
  const [content, setContent] = useState('');
  return {
    content,
  };
}
