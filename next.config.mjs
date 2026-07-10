/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    // All images are local, self-authored assets — no remote hosts allowed.
    // Allow our own placeholder SVGs through next/image (sandboxed, no scripts).
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  webpack: (config) => {
    config.plugins.push(new VeliteWebpackPlugin());
    return config;
  },
};

// Runs Velite (content/projects/*.mdx → .velite) once before webpack compiles, so
// `next dev` / `next build` always build against fresh case-study data with no extra script.
class VeliteWebpackPlugin {
  static started = false;
  apply(/** @type {import('webpack').Compiler} */ compiler) {
    // Next invokes webpack up to three times (nodejs + edge server, client) — guard so build runs once.
    compiler.hooks.beforeCompile.tapPromise('VeliteWebpackPlugin', async () => {
      if (VeliteWebpackPlugin.started) return;
      VeliteWebpackPlugin.started = true;
      const dev = compiler.options.mode === 'development';
      const { build } = await import('velite');
      await build({ watch: dev, clean: !dev });
    });
  }
}

export default nextConfig;
