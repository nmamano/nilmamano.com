#!/usr/bin/env node

// Example usage:
// $ bun run og-image-resizer.js "../public/blog/*/cover.png"

const path = require("path");
const sharp = require("sharp");
const glob = require("glob");

// Check if file path is provided
if (process.argv.length < 3) {
  console.error("Please provide an image file path or pattern");
  console.error("Usage: node og-image-resizer.js <image-path-or-pattern>");
  console.error("Examples:");
  console.error("  node og-image-resizer.js public/blog/post-name/cover.png");
  console.error('  node og-image-resizer.js "public/blog/*/cover.png"');
  process.exit(1);
}

// Get the input pattern and convert to forward slashes for consistent glob behavior
const inputPattern = process.argv[2].replace(/\\/g, "/");

// Target dimensions for OG image
const TARGET_WIDTH = 1200;
const TARGET_HEIGHT = 630;

// Process a single image
async function processImage(inputPath) {
  try {
    // Parse file info
    const fileInfo = path.parse(inputPath);
    const outputPath = path.join(
      fileInfo.dir,
      `${fileInfo.name}_resized${fileInfo.ext}`
    );

    console.log(`\nProcessing ${inputPath}...`);

    // Get image metadata
    const metadata = await sharp(inputPath).metadata();
    const { width, height } = metadata;

    console.log(`Original dimensions: ${width}×${height}px`);

    // Calculate scaling factors for both dimensions
    const widthRatio = TARGET_WIDTH / width;
    const heightRatio = TARGET_HEIGHT / height;

    // Always use the minimum ratio to ensure neither dimension exceeds target
    const scaleFactor = Math.min(widthRatio, heightRatio);

    if (width <= TARGET_WIDTH && height <= TARGET_HEIGHT) {
      console.log(
        "Image is smaller than target - scaling up to fit within constraints"
      );
    } else {
      console.log("Image is larger than target - scaling down to fit");
    }

    // Calculate new dimensions after scaling
    const newWidth = Math.round(width * scaleFactor);
    const newHeight = Math.round(height * scaleFactor);

    console.log(`Resizing to: ${newWidth}×${newHeight}px`);

    // Calculate position to center the image
    const left = Math.round((TARGET_WIDTH - newWidth) / 2);
    const top = Math.round((TARGET_HEIGHT - newHeight) / 2);

    // Create a new image with white background and place the resized image on it
    await sharp({
      create: {
        width: TARGET_WIDTH,
        height: TARGET_HEIGHT,
        channels: 4,
        background: { r: 255, g: 255, b: 255, alpha: 1 },
      },
    })
      .composite([
        {
          input: await sharp(inputPath).resize(newWidth, newHeight).toBuffer(),
          left,
          top,
        },
      ])
      .png()
      .toFile(outputPath);

    console.log(`Resized image saved to: ${outputPath}`);
    return true;
  } catch (error) {
    console.error(`Error processing ${inputPath}:`, error);
    return false;
  }
}

// Main function to process all matching files
async function resizeImages() {
  try {
    // IMPORTANT: Always use forward slashes for glob patterns, even on Windows
    // glob uses forward slashes internally regardless of platform
    console.log(`Searching for files matching pattern: ${inputPattern}`);

    // Use glob with specific options and keep forward slashes
    const files = glob.sync(inputPattern, {
      nodir: true,
      dot: false,
      nonull: false,
    });

    if (files.length === 0) {
      console.error(`Error: No files found matching pattern ${inputPattern}`);

      // For debugging, list directories in potential parent path
      const baseDirPattern = inputPattern.substring(
        0,
        inputPattern.lastIndexOf("/") + 1
      );
      console.log(`Looking for directories in: ${baseDirPattern}`);

      try {
        // Find all directories
        const directories = glob.sync(`${baseDirPattern}*/`);
        console.log(`Found ${directories.length} directories:`);
        directories.forEach((dir) => console.log(` - ${dir}`));

        // Also list direct files in parent directory
        const parentFiles = glob.sync(`${baseDirPattern}*.*`);
        console.log(`\nFound ${parentFiles.length} files in parent directory:`);
        parentFiles.forEach((file) => console.log(` - ${file}`));
      } catch (e) {
        console.error(`Error listing directories: ${e.message}`);
      }

      process.exit(1);
    }

    console.log(`Found ${files.length} file(s) to process:`);
    files.forEach((file) => console.log(` - ${file}`));

    let successCount = 0;
    let failCount = 0;

    // Process each file
    for (const file of files) {
      const success = await processImage(file);
      if (success) {
        successCount++;
      } else {
        failCount++;
      }
    }

    console.log(
      `\nSummary: ${successCount} file(s) processed successfully, ${failCount} failed`
    );
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
}

resizeImages();
