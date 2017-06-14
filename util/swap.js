module.exports = (key, functions) => {
    
    return functions[key] ? functions[key]() : functions.default ? functions.default() : undefined; // eslint-disable-line
    
};
