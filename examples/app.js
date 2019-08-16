const template = require('fs').readFileSync(require('path').join(__dirname, '_build_/index.html'), 'utf-8');
const server = require('express')()

server.get('*', (req, res) => {
  if (/\.js|\.css/.test(req.url)) {
    res.end(require('fs').readFileSync(require('path').join(__dirname, '_build_', req.url), 'utf-8'));
    return;
  }

  res.end(template);
});

server.listen(9090)