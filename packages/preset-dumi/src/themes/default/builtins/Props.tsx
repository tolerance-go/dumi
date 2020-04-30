import React from 'react';
import { Table } from 'antd';
import 'antd/dist/antd.less';
// @ts-ignore
import assets from '@@/.dumi/assets';

interface PropsCommand {
  name: string;
}

const columns = [
  {
    dataIndex: 'key',
    title: '参数',
  },
  {
    dataIndex: 'displayName',
    title: '名称',
  },
  {
    dataIndex: 'description',
    title: '描述',
  },
  {
    dataIndex: 'type',
    title: '类型',
  },
  {
    dataIndex: 'defaultValue',
    title: '默认值',
  },
];

const Props: React.FC<PropsCommand> = ({ name }) => {
  const currentComponent = assets.assets.atoms[name];
  const propsConfig: { properties: { [key: string]: object } } = assets.assets.atoms[name];
  return currentComponent ? (
    <div className="markdown">
      <h2>组件 API</h2>
      <Table
        bordered
        size="middle"
        pagination={false}
        columns={columns}
        dataSource={Object.entries(propsConfig.properties).map(([key, v]) => ({ ...v, key }))}
      />
    </div>
  ) : null;
};

export default Props;
