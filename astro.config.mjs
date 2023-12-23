import { defineConfig } from 'astro/config';

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  integrations: [react()],
  experiments: {
    dev: {
      proxy: {
        '/api/messages': 'http://localhost:5000',
      },
    },
  },
});

