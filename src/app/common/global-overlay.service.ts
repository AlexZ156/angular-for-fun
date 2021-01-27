import { Injectable, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalOverlayService {
  public isVisible = new BehaviorSubject<boolean>(true);

  private _visible = true;

  public show(): void {
    this._visible = true;
    this.isVisible.next(this._visible);
  }

  public hide(): void {
    this._visible = false;
    this.isVisible.next(this._visible);
  }
}
