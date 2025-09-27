const validateUser = (req, res, next) => {
    console.log ("req", req);

    const {params, query, body} = req


    console.log('params', params);

    console.log('query params', query);

    console.log('body', body);


    next()

}

module.exports = validateUser