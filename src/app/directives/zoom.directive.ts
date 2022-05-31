import {Directive, ElementRef, HostListener, Renderer2} from '@angular/core';

@Directive({
  selector: '[appZoom]'
})
export class ZoomDirective {
  constructor(private el: ElementRef, private renderer: Renderer2) {
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.zoom();
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.out();
  }

  private zoom() {
    this.renderer.setStyle(this.el.nativeElement, '-ms-transform', `scale(1.1)`);
    this.renderer.setStyle(this.el.nativeElement, '-moz-transform', `scale(1.1)`);
    this.renderer.setStyle(this.el.nativeElement, '-webkit-transform', `scale(1.1)`);
    this.renderer.setStyle(this.el.nativeElement, '-o-transform', `scale(1.1)`);
    this.renderer.setStyle(this.el.nativeElement, 'transform', `scale(1.1)`);
  }
  private out() {
    this.renderer.setStyle(this.el.nativeElement, '-ms-transform', `scale(1)`);
    this.renderer.setStyle(this.el.nativeElement, '-moz-transform', `scale(1)`);
    this.renderer.setStyle(this.el.nativeElement, '-webkit-transform', `scale(1)`);
    this.renderer.setStyle(this.el.nativeElement, '-o-transform', `scale(1)`);
    this.renderer.setStyle(this.el.nativeElement, 'transform', `scale(1)`);
  }
}
