module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "amd": true,
        "mocha": true,
        "jquery": false,
        "browser": true,
        "commonjs": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "rules": {
        "indent": [
            "error",
            2,
            {
                "SwitchCase": 1,
                "VariableDeclarator": 2,
                "MemberExpression": 1,
                "FunctionDeclaration": {
                    "parameters": "first"
                }
            }
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "single",
            { "allowTemplateLiterals": true }
        ],
        "semi": [
            "error",
            "always"
        ]
    }
};
