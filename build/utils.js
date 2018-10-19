const path = require('path')

const config = require('./config')

// console.log(999, '--path----', path)

// console.log(888, '--posix----', path.posix)


exports.assetsPath = function(_path) {
    return path.posix.join(config.assetsSubDirectory, _path)
}

exports.resolve = function(dir) {
    return path.join(__dirname, './../', dir)
}
