importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js');

if (workbox) {
    // we could cache everything from specified domains using
    // a route expression such as /.*(?:mydomain|myotherdomain)\.co.uk/
    // but instead the example below creates separate caches for
    // css, js, images and fonts so that fairly static resources can be
    // held longer that those that may change frequently.

    // use cached CSS file and update them the background
    workbox.routing.registerRoute(
      /\.css$/,
      new workbox.strategies.StaleWhileRevalidate({
        cacheName: 'app-cache',
        plugins: [
          new workbox.broadcastUpdate.Plugin({
            headersToCheck: ['Last-Modified', 'etag', 'date'],
            channelName: 'app-cache-update'
          })
        ]
      })
    );

    // cache the Google Fonts for offline use and expire 
    // the cache after one month
    workbox.routing.registerRoute(
      /^https:\/\/fonts\.gstatic\.com/,
      new workbox.strategies.CacheFirst({
        cacheName: 'app-cache',
        plugins: [
          new workbox.cacheableResponse.Plugin({
            statuses: [0, 200],
          }),
          new workbox.expiration.Plugin({
            maxAgeSeconds: 2628000,
          }),
          new workbox.broadcastUpdate.Plugin({
            headersToCheck: ['Last-Modified', 'etag', 'date'],
            channelName: 'app-cache-update'
          })
        ]
      }),
    );

    // use the small number of cached image files and expire
    // the cache after a seven days
    workbox.routing.registerRoute(
      /\.(?:png|jpg|gif|ico)$/,
      new workbox.strategies.CacheFirst({
        cacheName: 'app-cache',
        plugins: [
          new workbox.expiration.Plugin({
            maxEntries: 10,
            maxAgeSeconds: 604800,
          }),
          new workbox.broadcastUpdate.Plugin({
            headersToCheck: ['Last-Modified', 'etag', 'date'],
            channelName: 'app-cache-update'
          })
        ]
      })
    );

    // fallback to cached javascript files if network 
    // not available due to the network response taking longer
    // than 5 seconds.  cross origin expressions, such as jquery, 
    // must be an exact match with the url references
    //
    // note updates to jquery will not broadcast a message as it is an 
    // opaque response.  see Response-Type for the Cache Storage
    // in the browsers developer tools.
    workbox.routing.registerRoute(
      /(^https:\/\/cdnjs\.cloudflare\.com\/ajax\/libs\/jquery\/3\.4\.1\/jquery\.min\.js)|(.*.js)/,
      new workbox.strategies.NetworkFirst({
        networkTimeoutSeconds: 5,
        cacheName: 'app-cache',
        plugins: [
          new workbox.broadcastUpdate.Plugin({
            headersToCheck: ['Last-Modified', 'etag', 'date'],
            channelName: 'app-cache-update'
          })
        ]
      })
    );

    // fallback to cached html pages 
    workbox.routing.registerRoute(
      /\.*.html/,
      new workbox.strategies.NetworkFirst({
        networkTimeoutSeconds: 5,
        cacheName: 'app-cache',
        plugins: [
          new workbox.expiration.Plugin({
            maxEntries: 10
          }),
          new workbox.broadcastUpdate.Plugin({
            headersToCheck: ['Last-Modified', 'etag', 'date'],
            channelName: 'app-cache-update'
          })
        ]
      })
    );

} else {
  console.log(`Failure: Workbox didn't load.`);
}