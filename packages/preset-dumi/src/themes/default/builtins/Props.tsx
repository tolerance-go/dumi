import React from 'react';
// @ts-ignore
import assets from '@@/.dumi/assets';

interface PropsCommand {
  name: string;
}

const Props: React.FC<PropsCommand> = ({ name }) => {
  const currentComponent = assets.assets.atoms[name];
  return currentComponent ? (
    <div style={{ padding: 12, backgroundColor: '#e3e3e3' }}>
      <pre>{JSON.stringify(assets.assets.atoms[name], null, 2)}</pre>
    </div>
  ) : null;
};

export default Props;
