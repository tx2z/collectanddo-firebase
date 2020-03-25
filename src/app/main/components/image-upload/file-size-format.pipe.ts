import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'fileSizePipe'
})
export class FileSizeFormatPipe implements PipeTransform {
  static forRoot() {
    throw new Error('Method not implemented.');
  }
  transform(sizeInBytes: number): string {
    const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    let power = Math.round(Math.log(sizeInBytes) / Math.log(1024));
    power = Math.min(power, units.length - 1);
    const size = sizeInBytes / Math.pow(1024, power); // size in new units
    const formattedSize = Math.round(size * 100) / 100; // keep up to 2 decimals
    const unit = units[power];
    return `${formattedSize} ${unit}`;
  }
}
