import babel from "rollup-plugin-babel";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import postcss from "rollup-plugin-postcss";
import typescript from "@rollup/plugin-typescript";
import terser from '@rollup/plugin-terser'
import { fileURLToPath } from 'node:url'
import { readFileSync } from 'fs'
import path from 'node:path'
import copy from 'rollup-plugin-copy'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

const pkg = JSON.parse(readFileSync(path.join(__dirname, './package.json'), 'utf-8'))
const dependencies = (res) => {
	return Object.keys(res.dependencies || {})
}

const pkgdependencies = dependencies(pkg)

const isDemo = process.env.BUILD === 'demo'
export default {
	external: id => {
    return pkgdependencies.includes(id)
  },
  input: "src/index.tsx",
  output: [
    {
      file: isDemo ? "test/dist/index.js" : "dist/index.js",
      format: "iife",
      sourcemap: true,
      // plugins: [terser()]
    },
    {
      file: isDemo ? "test/dist/index.cjs" : "dist/index.cjs",
      format: "cjs",
      sourcemap: true,
      // plugins: [terser()]
    },
    {
      file: isDemo ? "test/dist/index.mjs" : "dist/index.mjs",
      format: "esm",
      sourcemap: true,
      // plugins: [terser()]
    },
  ],
  plugins: [
    peerDepsExternal(),
    postcss({
      // extract: true,
      // inject: true,
    }),
    typescript({
      exclude: ['**/*.css']
    }),
    babel({
      extensions: [".js", ".jsx", ".ts", ".tsx"],
      exclude: "node_modules/**",
    }),
    resolve(),
    commonjs(),
		copy(isDemo ? {
			targets: [
        isDemo ? { src: 'package.json', dest: "test/" } : null
      ]
		} : {})
  ],
};
