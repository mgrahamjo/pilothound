module.exports = (key, functions) => {
    
    return functions[key] ? functions[key]() : undefined;
    
};
