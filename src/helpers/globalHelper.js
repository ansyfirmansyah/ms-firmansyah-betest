const helper = {}

// Fungsi untuk build key dari query param
helper.getRedisKeyByReqQuery = (query) => {
    let redisKey = `allParam:default`
    const queryKeys = Object.keys(query);
    queryKeys.forEach(key => {
        const value = query[key];
        redisKey += `-${key}:${value}`;
    });
    return redisKey;
}

module.exports = helper;