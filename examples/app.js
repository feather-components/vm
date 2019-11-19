const server = require('express')()

server.get('*', (req, res) => {
    if (req.url == '/favicon.ico') {
        res.end();
        return false;
    }

    res.end(require('fs').readFileSync(require('path').join(__dirname, '_build_', req.url), 'utf-8'));
});

server.listen(9090)