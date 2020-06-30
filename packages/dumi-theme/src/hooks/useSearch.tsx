import React, { useState } from 'react';

export default function useSearch() {
  const [keyword, setKeyword] = useState('');
  return {
    keyword,
  };
}
