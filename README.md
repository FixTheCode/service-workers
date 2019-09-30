# Offline Web Application Demonstration
Demonstration of Service Workers with Workbox to provide offline caching of resources.

## Offline Storage:

Use the Service Workers Caches API for storing network-based resources necessary to load your application when offline.

All other data should use IndexedDB.

## Offline Storage Limits:

Storage quotas vary between browsers and there could be differing limits for IndexedDB and Caches API.  The general rule is 20% of  free space available but typically ranges from 50MB to 20GB.

Apple limits the browser cache storage to 50MB and IndexedDB storage upto 500MB depending on available free space.

There should be enough space to cache assets required for your application to work offline providing the device used has a reasonable amount of unused storage. 

## Opaque responses and cache bloat

Opaque responses are received when a browser receives content from untrusted origins.  For security reasons the browser obfuscates the response code and the response status will be 0 rather than a value http response such as 200.   In our example code, an opaque response is returned when we reference the jQuery script from a CDN.

Caching opaque responses can bloat your caches by several megabytes for each opaque response cached. This can result in the storage quota being exceeded.

## Cache bloat mitigation

Configure a Cross-Origin Resource Sharing (CORS) HTTP response header. E.g. configure the server to Access-Control-Allow-Origin: *

See https://enable-cors.org/ 

For static assets such as images you can add crossorigin='anonymous' to img tags and link style sheet tags. This will work where the asset sources support Cross-Origin Resource Sharing (CORS).


## Development setup:

For testing with a local web server ensure that you reference index.html directly.  There is no Service Worker route for root / defined.

Validate reqular expressions using an online tool such as https://regexr.com/ 

There is no use of polyfils to support older browsers.  The demo has been built and tested with Chrome 76.
