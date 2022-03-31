import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import dts from 'rollup-plugin-dts';
import typescript from 'rollup-plugin-typescript2';

import pkg from './package.json';

const config = [
  {
    input: './src/index.tsx',
    output: [
      {
        file: './lib/index.cjs.js',
        format: 'cjs',
      },
      {
        file: './lib/index.esm.js',
        format: 'es',
      },
    ],
    external: [...Object.keys(pkg.peerDependencies)],
    plugins: [
      nodeResolve(),
      commonjs(),
      typescript({ tsconfig: './tsconfig.json' })
    ]
  },
  {
    input: './lib/index.d.ts',
    output: [{ file: './lib/index.d.ts', format: 'es' }],
    plugins: [
      dts(),
    ]
  }
];

export default config;
