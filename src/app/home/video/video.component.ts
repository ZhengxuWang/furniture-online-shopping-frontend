import { Component, OnInit } from '@angular/core';
import {EmbedVideoService} from 'ngx-embed-video/dist';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnInit {
  youtubeUrl = 'https://www.youtube.com/watch?v=k7GPm0M6wHE';
  yt_iframe_html: any;
  constructor(private embedService: EmbedVideoService) {
    this.yt_iframe_html = this.embedService.embed(this.youtubeUrl, {
      query: { portrait: 0, color: '333' },
      attr: { width: 1280, height: 500 }
    });
  }

  ngOnInit() {
  }

}
