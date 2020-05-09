import fs from 'fs';
import path from 'path';
import transformer from '../transformer';
import ctx from '../context';

/**
 * extract Front Matter config from markdown file
 */
export default (fileAbsPath: string): { [key: string]: any } => {
  const content = fs.readFileSync(fileAbsPath).toString();

  return transformer.markdown(content, { fileAbsPath, onlyConfig: !ctx.assets }).config;
};
