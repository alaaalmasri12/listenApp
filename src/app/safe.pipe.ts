import { Pipe, PipeTransform} from '@angular/core';
import { DomSanitizer } from "@angular/platform-browser";

@Pipe({ name: 'safe' })

export class SafePipe implements PipeTransform {

constructor(private sanitizer: DomSanitizer) { }
transform(url:any) {
  var test="https://open.spotify.com/embed/track/"+ url.substring(url.lastIndexOf('/') + 1)
 return this.sanitizer.bypassSecurityTrustResourceUrl(test);
  }
}