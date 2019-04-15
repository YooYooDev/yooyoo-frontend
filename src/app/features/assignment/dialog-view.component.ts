import { DialogComponent } from '@syncfusion/ej2-angular-popups';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import {
  DialogEditEventArgs
} from '@syncfusion/ej2-angular-grids';
import { ClickEventArgs } from '@syncfusion/ej2-angular-navigations';

@Component({
  selector: 'yoo-dialog-view',
  template: ` <ejs-dialog
          id="dialog"
          #Dialog
          header="Dialog"
          height="auto"
          width="100px"
          [visible]="false"
          showOnInit="false"
          showCloseIcon="true"
        >
          <iframe
            style="width:100%;height:550px;padding:20px;"
            src="https://www.youtube.com/embed/mWZDcLoeMXw"
            frameborder="0"
            allow="autoplay; encrypted-media"
            allowfullscreen=""
          ></iframe>
        </ejs-dialog>`
})
export class DialogViewComponent implements OnInit {

  @ViewChild('Dialog') Dialog: DialogComponent;
  editparams: { params: { popupHeight: string } };
  public header: String = 'Upload Student';
  public showCloseIcon: Boolean = true;
  public width: String = '300px';
  public position: object = { X: 'center', Y: 'center' };
  constructor() {}
  ngOnInit(): void {
    // this.Dialog.hide();
  }
  onOpenDialog(event: any): void {
    this.Dialog.show();
}
}
