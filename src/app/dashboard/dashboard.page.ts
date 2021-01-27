import { Gallary } from './../models/gallary.model';
import { Component, OnDestroy, ViewChild, EventEmitter } from '@angular/core';
import { EllipseGalleryComponent } from './components/ellipse-gallery/ellipse-gallery.component';
import { LoginService } from '../login/services/login.service';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'kt-dashboard-page',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss']
})

export class DashboardPage implements OnDestroy {
  public ellipseGalleryData: Gallary[] = [];

  public currentIndex = 0;

  public unsubscribe = new EventEmitter();

  @ViewChild(EllipseGalleryComponent, { static: true }) ellipseGallery: EllipseGalleryComponent;

  constructor(
    private route: ActivatedRoute,
    private _loginService: LoginService,
  ) {
    this.route.data.pipe(takeUntil(this.unsubscribe)).subscribe(data => this.init(data.gallaryData));
  }

  private init(gallaryData: Gallary[]): void {
    this.ellipseGalleryData = gallaryData;
  }

  goToSlide(index: number) {
    this.ellipseGallery.goToSlide(index);
  }

  logOut(): void {
    this._loginService.logOut();
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
