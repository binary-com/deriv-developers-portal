const fs = require("fs");
const dirTree = require("directory-tree");

const tree = dirTree('./config/v3', {extensions:/\.json$/});

fs.writeFile('./api-data/config-tree.json', JSON.stringify(tree, null, 2), function (err) {
    if (err) throw err;
    console.log('Saved!');
});