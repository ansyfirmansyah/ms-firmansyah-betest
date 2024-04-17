const helper = {}

// Fungsi untuk build key dari query param
helper.getRedisKeyByReqQuery = (query) => {
    let redisKey = `allParam:default`
    Object.entries(query).forEach(([key, value]) => {
        redisKey += `-${key}:${value}`;
    })
    return redisKey;
}

module.exports = helper;