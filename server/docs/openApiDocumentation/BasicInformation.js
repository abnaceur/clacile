const swaggerDocument = {
    "swagger": "2.0",
    "info": {
        "title": "MaClasse",
        "description": "MaClasse is a solution to connect teachers with studnets in one place \
      using P2P technology.",
        "version": "Beta"
    },
    "servers": [
        {
            "url": 'http://localhost:3000/',
            "description": 'Local server'
        }
    ],
    "produces": ["application/json"],
    "consumes": "application/json",
    "paths": {}
};

module.exports = swaggerDocument;