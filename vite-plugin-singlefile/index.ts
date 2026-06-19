/**
 * Based upon: https://github.com/richardtallent/vite-plugin-singlefile
 * See license.txt
 */

import { UserConfig, PluginOption } from 'vite';
import type { OutputChunk, OutputAsset } from 'rollup';

function replaceScript(
    html: string,
    scriptFilename: string,
    scriptCode: string
): string {
    const f = scriptFilename.replaceAll('.', '\\.');
    const reScript = new RegExp(
        `<script([^>]*?) src="(?:[^"]*?/)?${f}"([^>]*)></script>`
    );
    const preloadMarker = /"?__VITE_PRELOAD__"?/g;
    const newCode = scriptCode
        .replace(preloadMarker, 'void 0')
        .replace(/<(\/script>|!--)/g, '\\x3C$1');
    const inlined = html.replace(
        reScript,
        (_, beforeSrc, afterSrc) =>
            `<script${beforeSrc}${afterSrc}>${newCode.trim()}</script>`
    );
    return inlined;
}

function replaceCss(
    html: string,
    scriptFilename: string,
    scriptCode: string
): string {
    const f = scriptFilename.replaceAll('.', '\\.');
    const reStyle = new RegExp(`<link([^>]*?) href="(?:[^"]*?/)?${f}"([^>]*)>`);
    const newCode = scriptCode.replace(`@charset "UTF-8";`, '');
    const inlined = html.replace(
        reStyle,
        (_, beforeSrc, afterSrc) =>
            `<style${beforeSrc}${afterSrc}>${newCode.trim()}</style>`
    );
    return inlined;
}

const isJsFile = /\.[mc]?js$/;
const isCssFile = /\.css$/;
const isHtmlFile = /\.html?$/;

export default (): PluginOption => {
    // Modifies the Vite build config to make this plugin work well.
    const _useRecommendedBuildConfig = (config: UserConfig) => {
        if (!config.build) config.build = {};
        // Ensures that even very large assets are inlined in your JavaScript.
        config.build.assetsInlineLimit = () => true;
        // Avoid warnings about large chunks.
        config.build.chunkSizeWarningLimit = 100000000;
        // Emit all CSS as a single file, which `vite-plugin-singlefile` can then inline.
        config.build.cssCodeSplit = false;
        // We need relative path to support any static files in public folder,
        // which are copied to ${build.outDir} by vite.
        config.base = './';
        // Make generated files in ${build.outDir}'s root, instead of default ${build.outDir}/assets.
        // Then the embedded resources can be loaded by relative path.
        config.build.assetsDir = '';

        if (!config.build.rolldownOptions) {
            config.build.rolldownOptions = {};
        }
        if (!config.build.rolldownOptions.output) {
            config.build.rolldownOptions.output = {};
        }

        if (Array.isArray(config.build.rolldownOptions?.output)) {
            for (const o of config.build.rolldownOptions.output)
                o.codeSplitting = false;
        } else {
            config.build.rolldownOptions.output.codeSplitting = false;
        }
    };

    return {
        name: 'vite:singlefile',
        config: _useRecommendedBuildConfig,
        enforce: 'post',
        generateBundle(_options: unknown, bundle: Record<string, unknown>) {
            const warnNotInlined = (filename: string) =>
                this.info(`NOTE: asset not inlined: ${filename}`);
            const files = {
                html: [] as string[],
                css: [] as string[],
                js: [] as string[],
                other: [] as string[],
            };
            for (const i of Object.keys(bundle)) {
                if (isHtmlFile.test(i)) {
                    files.html.push(i);
                } else if (isCssFile.test(i)) {
                    files.css.push(i);
                } else if (isJsFile.test(i)) {
                    files.js.push(i);
                } else {
                    files.other.push(i);
                }
            }
            const bundlesToDelete = [] as string[];
            for (const name of files.html) {
                const htmlChunk = bundle[name] as OutputAsset;
                let replacedHtml = htmlChunk.source as string;
                for (const filename of files.js) {
                    const jsChunk = bundle[filename] as OutputChunk;
                    if (jsChunk.code != null) {
                        this.info(`Inlining: ${filename}`);
                        bundlesToDelete.push(filename);
                        replacedHtml = replaceScript(
                            replacedHtml,
                            jsChunk.fileName,
                            jsChunk.code
                        );
                    }
                }
                for (const filename of files.css) {
                    const cssChunk = bundle[filename] as OutputAsset;
                    this.info(`Inlining: ${filename}`);
                    bundlesToDelete.push(filename);
                    replacedHtml = replaceCss(
                        replacedHtml,
                        cssChunk.fileName,
                        cssChunk.source as string
                    );
                }
                htmlChunk.source = replacedHtml;
            }
            // delete inlined files
            for (const name of bundlesToDelete) {
                delete bundle[name];
            }
            for (const name of files.other) {
                warnNotInlined(name);
            }
        },
    };
};
