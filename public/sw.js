importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js"
);

workbox.routing.registerRoute(
  ({ request }) => request.destination === "image",
  new workbox.strategies.NetworkFirst()
);

// const VERSION = "v3";

// self.addEventListener("install", () => {
//   self.skipWaiting();
//   console.log(`[${VERSION}] installing`);
// });

// self.addEventListener("activate", () => {
//   clients.claim();
//   console.log(`[${VERSION}] active`);
// });

// self.addEventListener("fetch", (event) => {
//   console.log(`[${VERSION}] Fetching ${event.request.url}`);
//   console.log(`[${VERSION}] Mode ${event.request.mode}`);

//   if (event.request.mode === "navigate") {
//     event.respondWith(
//       (async () => {
//         try {
//           const preloadResponse = await event.preloadResponse;
//           if (preloadResponse) {
//             return preloadResponse;
//           }

//           return await fetch(event.request);
//         } catch (err) {
//           return new Response("\n\n\n\nError while loading :", err);
//         }
//       })()
//     );
//   }
// });
