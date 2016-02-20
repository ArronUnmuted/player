// Import all CSS files from ./styles/
let cssContext = require.context("./styles", true, /\.css$/);
cssContext.keys().forEach(cssContext);
