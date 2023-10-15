import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'handleLink',
})
export class HandleLinkPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(tweetText: string): SafeHtml {
    // Regular expression to identify handles
    const handleRegex = /@(\w+)/g;

    const sanitizedHtml = tweetText.replace(
      handleRegex,
      (match, handle) =>
        `<a href="https://twitter.com/${handle}" target="_blank" rel="noopener noreferrer">@${handle}</a>`
    );

    return this.sanitizer.bypassSecurityTrustHtml(sanitizedHtml);
  }
}
