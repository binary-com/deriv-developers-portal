/* eslint-disable */
module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:import/recommended",
        "plugin:import/errors",
        "plugin:import/warnings",
        "plugin:import/typescript"
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "@typescript-eslint"
    ],
    "rules": {
        "react/react-in-jsx-scope": "off",
        "camelcase": 0,
        // semi                                : ["error", "always"],
        "array-callback-return": 0,
        "arrow-body-style": 0,
        "brace-style": ["error", "1tbs", { allowSingleLine: true }],
        "curly": 0,
        // "comma-dangle"                      : ["error", "always-multiline"],
        "eol-last": ["error", "always"],
        "func-names": ["error", "never"],
        "key-spacing": 0,
        "max-classes-per-file": ["warn", 2],
        // "keyword-spacing"                   : ["error", { after: true }],
        "lines-between-class-members": 0,
        "indent": 0,
        // "max-len": ["error", { code: 120, "ignoreComments": true }],
        "no-extra-semi": "error",
        "no-console": "error",
        "no-else-return": ["error", { allowElseIf: true }],
        "no-multi-assign": 0,
        "no-multi-spaces": [2, { exceptions: { "BinaryExpression": true, "VariableDeclarator": true, "ImportDeclaration": true } }],
        "no-param-reassign": ["error", { props: false }],
        "no-restricted-globals": 0,
        "no-script-url": 0,
        // "no-trailing-spaces"                : ["error", { skipBlankLines: true }],
        "object-curly-spacing": ["error", "always", { arraysInObjects: true, objectsInObjects: true }],
        "one-var": ["error", { initialized: "never", uninitialized: "always" }],
        "prefer-destructuring": 0,
        "quotes": 0,
        // "space-in-parens"                   : ["error", "never"],
        "space-infix-ops": "error",
        // "space-unary-ops"                   : "error",
        "no-multiple-empty-lines": ["error", { "max": 1, "maxEOF": 1 }],
    
        // import rules
        "import/no-extraneous-dependencies": ["error", { "devDependencies": ["**/__tests__/**/*.js", "**/test*.js", "**/*.test.js*", "**/*.spec.js", "**/*.spec.jsx"] }],
    
        "import/no-useless-path-segments": "error",
        "import/order": [
          0, // TODO: we should turn this to error after we sorted our import orders.
          {
            "groups": [["builtin", "external"], "internal", "sibling", "parent"],
            "newlines-between": "ignore",
          },
        ],
        "import/prefer-default-export": 0,
        "import/extensions": ["warn", "never", { jsx: "never", json: "always" }],
        "no-sequences": ["warn"],
    
        // react rules
        // "jsx-quotes"                        : ["error", "prefer-single"],
        // "react/jsx-closing-bracket-location": ["error", { selfClosing: "line-aligned", nonEmpty: "line-aligned" }],
        // "react/jsx-closing-tag-location"    : "error",
        // "react/jsx-first-prop-new-line"     : ["error", "multiline-multiprop"],
        // "react/jsx-indent"                  : ["error", 4],
        // "react/jsx-indent-props"            : ["error", 4],
        // "react/jsx-max-props-per-line"      : ["error", { when: "multiline" }],
        // "react/jsx-tag-spacing"             : ["error", { closingSlash: "never", beforeSelfClosing: "always" }],
        "react/prop-types": 0,
        "react/self-closing-comp": "error",
        "react/no-unescaped-entities": 0,
        // "react/sort-prop-types"             : ["error", { ignoreCase: true, sortShapeProp: true }],
    },
}
