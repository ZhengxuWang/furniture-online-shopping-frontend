import {Component} from '@angular/core';
import {NgbCarouselConfig} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-ngbd-carousel-config',
  templateUrl: './carousel-config.html',
  styleUrls: ['./carousel-config.scss'],
  providers: [NgbCarouselConfig]  // add NgbCarouselConfig to the component providers
})
export class NgbdCarouselConfigComponent {
  images = ['http://www.hgnv.com/wp-content/uploads/2017/11/Designer-Living-Room-Furniture-Interior-Design-living-room-picture-bedroom-design.jpg',
    'https://cb2.scene7.com/is/image/CB2/122918_cat_furniture_second?wid=1680&qlt=65',
    'https://www.gainseattle.com/i/2018/12/corner-velvet-leather-decor-couch-decorating-room-pillows-for-accents-accent-decorative-living-dark-grey-sectional-gray-ideas.jpg',
    'http://www.nidahspa.com/wp-content/uploads/2014/02/Comfortable-Living-room-in-Borrell-Street-Residence-with-Brown-Sofa-Black-Fireplace-and-Brown-Floor.jpg'];

  constructor(config: NgbCarouselConfig) {
    // customize default values of carousels used by this component tree
    config.interval = 10000;
    config.wrap = false;
    config.keyboard = false;
    config.pauseOnHover = false;
  }
}
