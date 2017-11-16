import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'pitchClass'})
export class PitchClassPipe implements PipeTransform {
  transform(pitch: number): string {
    switch(pitch) {
        case 0:
            return 'C';
        case 1:
            return 'C# / D♭'
        case 2:
            return 'D';
        case 3:
            return 'D# / E♭'
        case 4:
            return 'E / F♭';
        case 5:
            return 'F / E#'
        case 6:
            return 'F# / G♭'
        case 7:
            return 'G'
        case 8:
            return 'G# / A♭'
        case 9:
            return 'A'
        case 10:
            return 'A# / B♭'
        case 11:
            return 'B / C♭'
    }
  }
}