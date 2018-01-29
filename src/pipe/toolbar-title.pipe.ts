
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'ToolbarTilte' })
export class ToolbarTiltePipe implements PipeTransform {
    transform(value: string, args: string[]): any {
        if (!value) {
            return value;
        }

        const title = value.replace('/', '');
        return title;
    }
}
