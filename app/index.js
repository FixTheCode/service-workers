// show what is in our caches
async function showCachedItems() {
    const n = await caches.keys();
    const result = [];
    for (const name of n) {
        const cache = await caches.open(name);
        for (const request of await cache.keys()) {
            result.push(request.url);
        }
    }
    return result;
}

// delete all caches
async function deleteCachedItems() {
    const n = await caches.keys();
    var result = false;
    for (const name of n) {
        result = await caches.delete(name);
    }
    return result;
}

// calculate storage used
async function showStorageUsed(objStorage) {
    if ('storage' in navigator && 'estimate' in navigator.storage) {
        const {usage, quota} = await navigator.storage.estimate();
        objStorage.percentUsed = Math.round(usage / quota * 100);
        objStorage.usageInMib = Math.round(usage / (1024 * 1024));
        objStorage.quotaInMib = Math.round(quota / (1024 * 1024));
        objStorage.quotaInGB = Math.round(objStorage.quotaInMib / 953.674);
    }
}