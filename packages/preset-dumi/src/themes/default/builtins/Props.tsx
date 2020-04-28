import React from 'react';
// @ts-ignore
import assets from '@@/.dumi/assets';

const Props: React.FC = () => {
  return <>{JSON.stringify(assets, null, 2)}</>;
};

export default Props;
