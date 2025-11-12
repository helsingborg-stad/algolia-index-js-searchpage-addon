import { createViteConfig } from "vite-config-factory";

const entries = {
        'js/main': './source/js/main.ts',
    'css/instantsearch': './source/sass/algolia-index-js-searchpage.scss',
};

export default createViteConfig(entries, {
	outDir: "assets/dist",
	manifestFile: "manifest.json",
});
