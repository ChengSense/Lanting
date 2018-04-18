import babel from 'rollup-plugin-babel'
import uglify from 'rollup-plugin-uglify'

export default [{
    input: 'src/WorkIndex.js',
    output: {
        file: 'release/work.js',
        format: 'iife',
        name: "view"
    },
    plugins: [babel()]
}, {
    input: 'src/WorkIndex.js',
    output: {
        file: 'release/mini.work.js',
        format: 'iife',
        name: "view"
    },
    plugins: [babel(), uglify()]
}, {
    input: 'src/WorkIndex.js',
    output: {
        file: 'release/es.work.js',
        format: 'es'
    }
}];
