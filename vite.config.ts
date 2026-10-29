import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    build: {
      rollupOptions: {
        input: {
          main: path.resolve(__dirname, 'index.html'),
          properties: path.resolve(__dirname, 'properties.html'),
          property: path.resolve(__dirname, 'property.html'),
          vehicles: path.resolve(__dirname, 'vehicles.html'),
          products: path.resolve(__dirname, 'products.html'),
          categories: path.resolve(__dirname, 'categories.html'),
          postListing: path.resolve(__dirname, 'post-listing.html'),
          listProperty: path.resolve(__dirname, 'list-property.html'),
          about: path.resolve(__dirname, 'about.html'),
          saved: path.resolve(__dirname, 'saved.html'),
          discover: path.resolve(__dirname, 'discover.html'),
          services: path.resolve(__dirname, 'services.html'),
          agriculture: path.resolve(__dirname, 'agriculture.html'),
          mining: path.resolve(__dirname, 'mining.html'),
          offline: path.resolve(__dirname, 'offline.html'),
        },
      },
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      port: 3000,
      host: '0.0.0.0',
    },
  };
});
