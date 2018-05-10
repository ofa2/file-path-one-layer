import Promise from"bluebird";import fs from"fs-extra";import path from"path";async function filePathOneLayer(t){let a=await fs.readdir(t);return(await Promise.map(a,a=>{let e=path.join(t,a),r=path.parse(e);return".js"!==r.ext?null:fs.stat(e).then(t=>Object.assign({path:e,stat:t},r))})).filter(t=>t&&t.stat&&t.stat.isFile())}export default filePathOneLayer;
//# sourceMappingURL=bundle.esm.js.map
