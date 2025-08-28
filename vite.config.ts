import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
    plugins: [vue()],
    base: "/cc-tweaked",
    build: {
        outDir: "docs"
    },
    server: {
        port: 3000
    }
});
