import { Pipe, PipeTransform } from '@angular/core';
import { Image } from '../../interfaces/common'

@Pipe({name: 'imageSize'})
export class ImageSizePipe implements PipeTransform {
  transform(images: Array<Image>, minSize: number): string {
    let best = images[0];

    images.forEach(image => {
        if (image.height > minSize && image.height < best.height) {
            best = image;
        }
    });

    return best.url;
  }
}