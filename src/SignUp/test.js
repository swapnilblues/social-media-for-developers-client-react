const jdenticon = require("jdenticon");
const fs = require("fs");


function createImage(name){
    let size = 200;
    let png = jdenticon.toPng(name, size);
    fs.writeFileSync("./testicon.png", png);
}

export default createImage;

