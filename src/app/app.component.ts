import { GlobalOverlayService } from './common/global-overlay.service';
import { Component } from '@angular/core';

@Component({
  selector: 'kt-app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    public overlay: GlobalOverlayService,
  ) {}

  public onActivate() {
    
  }
}
