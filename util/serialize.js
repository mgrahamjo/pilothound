module.exports = data => {

    const ret = [];

    Object.keys(data).forEach(key => {

        ret.push(key + '=' + encodeURIComponent(data[key].toString()));

    });

    return ret.join('&');
  
};
