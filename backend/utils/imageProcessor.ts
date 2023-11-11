import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';

export async function createThumbnail(file: any, fileName: string) {
    const thumbnailPath = path.join('./static/thumbnails', `thumbnail-${fileName}`);
    try {
        await fs.access(thumbnailPath);
        throw new Error('Thumbnail already exists');
    } catch (error: any) {
        if (error.message.includes('Thumbnail already exists')) {
            throw error;
        }
        const thumbnailBuffer = await sharp(file.buffer)
            .resize(200, null, {fit: 'inside'})
            .jpeg()
            .toBuffer();
        await fs.writeFile(thumbnailPath, thumbnailBuffer);
    }
}


export async function saveImage(file: any, fileName: string) {
    const imagePath = path.join('./static/images', `image-${fileName}`);
    try {
        await fs.access(imagePath);
        throw new Error('Image already exists');
    } catch (error: any) {
        if (error.message.includes('Image already exists')) {
            throw error;
        }
        await fs.writeFile(imagePath, file.buffer);
    }
}

