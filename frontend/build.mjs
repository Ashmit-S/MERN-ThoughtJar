import { build } from 'vite';

try {
    await build();
    console.log("✅ Vite build completed");
} catch (err) {
    console.error("❌ Vite build failed");
    console.error(err);
    process.exit(1);
}
