import React, { useState } from 'react';
import { Button, Popover } from 'antd';
import { JsonEditor as Editor } from 'jsoneditor-react';
import ace from 'brace';
import 'brace/mode/json';
import 'brace/theme/github';
// @ts-ignore
import assets from '@@/.dumi/assets';
import 'jsoneditor-react/es/editor.min.css';
import './Presets.less';

export default ({ module }) => {
  if (!module) {
    return null;
  }

  const { [module]: Component } = require(process.env.PKG_NAME);
  const [presets, setPresets] = useState(assets.assets.examples);
  let list = presets;

  return (
    <div className="__dumi-default-presets markdown">
      <h2>预设值 Demo</h2>
      <Popover
        trigger="click"
        placement="right"
        content={
          <div style={{ width: 600 }}>
            <Editor
              value={presets}
              onChange={setPresets}
              mode="code"
              ace={ace}
              htmlElementProps={{ style: { height: 300, 'overscroll-behavior': 'contain' } }}
              theme="ace/theme/github"
              navigationBar={false}
              statusBar={false}
              search={false}
            />
            {process.env.NODE_ENV ==== 'development' && (
              <Button
                style={{ marginTop: 16 }}
                type="primary"
                onClick={() =>
                  fetch('_dumi/presets', {
                    method: 'POST',
                    body: JSON.stringify({ [module]: presets }, null, 2),
                  })
                }
              >
                保存预设值
              </Button>
            )}
          </div>
        }
      >
        <Button icon="setting">编辑预设值</Button>
      </Popover>
      {list.map(({ props, name, description }, i, arr) => (
        <>
          <h4>{name}</h4>
          <p>{description}</p>
          <Component {...props} />
          {i < arr.length - 1 && <hr />}
        </>
      ))}
    </div>
  );
};
