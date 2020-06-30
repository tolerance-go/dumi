import React, { useState } from 'react';

export default function useCodesandBox() {
  const [keyword, setKeyword] = useState('');
  return {
    keyword,
  };
}
