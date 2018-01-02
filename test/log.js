const db = require('dxl-mongoose')({
     host: '192.168.22.230',
     database: 'footer'
 });
 const projectSchemas = {
     name: {type: String},
     cityList: {type: Array}
 }

const Project = db.mongoose.model('project', new db.mongoose.Schema(projectSchemas), 'project');

Project.find(function (err, res) {
    console.log(JSON.stringify(res))
})