// bgImg is the background image to be modified.
// fgImg is the foreground image.
// fgOpac is the opacity of the foreground image.
// fgPos is the position of the foreground image in pixels. It can be negative and (0,0) means the top-left pixels of the foreground and background are aligned.
function composite(bgImg, fgImg, fgOpac, fgPos) {
    // Fro reference: extracting width and height from both fg and bg
    const bgWidth = bgImg.width, bgHeight = bgImg.height;
    const fgWidth = fgImg.width, fgHeight = fgImg.height;

    // Looping over each pixel of the fgImg...
    for (let y = 0; y < fgHeight; y++) {
        for (let x = 0; x < fgWidth; x++) {
            // to calculate the corresponding pixel position on the bgImg
            const bgX = x + fgPos.x;
            const bgY = y + fgPos.y;

            // Before blending, checking if the calculated pos falls within the bgImg boundaries (ignore otherwise)
            if (bgX >= 0 && bgY >= 0 && bgX < bgWidth && bgY < bgHeight) {
                // Then calculating the index in the image data array for both fg and bg pixels
                // IDA = linear arrays with 4 entries per pixel: RGBA (thus the "*4")
                const fgIndex = (y * fgWidth + x) * 4;
                const bgIndex = (bgY * bgWidth + bgX) * 4;

                // Extracting RGBA values for the current fg and bg pixel
                const fgR = fgImg.data[fgIndex];
                const fgG = fgImg.data[fgIndex + 1];
                const fgB = fgImg.data[fgIndex + 2];
                const fgA = fgImg.data[fgIndex + 3] * fgOpac;
                //fg alpha value scaled by "fgOpac" to adjust opacity
                const bgR = bgImg.data[bgIndex];
                const bgG = bgImg.data[bgIndex + 1];
                const bgB = bgImg.data[bgIndex + 2];
                const bgA = bgImg.data[bgIndex + 3];

                // Alpha blending by formula (assumed 0 to 255)
                const alpha = fgA + bgA * (1 - fgA / 255);
                const r = (fgR * fgA + bgR * bgA * (1 - fgA / 255)) / alpha;
                const g = (fgG * fgA + bgG * bgA * (1 - fgA / 255)) / alpha;
                const b = (fgB * fgA + bgB * bgA * (1 - fgA / 255)) / alpha;

                // Assigning blended values back to the bgImag
                bgImg.data[bgIndex] = r;
                bgImg.data[bgIndex + 1] = g;
                bgImg.data[bgIndex + 2] = b;
                bgImg.data[bgIndex + 3] = alpha;
            }
        }
    }
}
// Live Server for simulations (from the .html project)
