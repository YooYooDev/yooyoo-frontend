import { ToastService } from './../../shared/services/toast.service';
import { UtilService } from './../../shared/services/util.service';
import { RaiseTicketService } from './raise-a-ticket.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {
  ColumnMenuService,
  DetailRowService,
  DialogEditEventArgs,
  EditService,
  ExcelExportService,
  FilterService,
  FilterSettingsModel,
  GridComponent,
  GroupService,
  GroupSettingsModel,
  PageService,
  PageSettingsModel,
  PdfExportService,
  ReorderService,
  ResizeService,
  SaveEventArgs,
  SearchSettingsModel,
  SortService,
  ToolbarItems,
  ToolbarService
} from '@syncfusion/ej2-angular-grids';
import { ClickEventArgs } from '@syncfusion/ej2-angular-navigations';
import { DropDownListComponent } from '@syncfusion/ej2-angular-dropdowns';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';

@Component({
  selector: 'yoo-raise-a-ticket',
  templateUrl: './raise-a-ticket.component.html',
  styleUrls: ['./raise-a-ticket.component.css'],
  providers: [
    ToolbarService,
    PdfExportService,
    ExcelExportService,
    ReorderService,
    DetailRowService,
    SortService,
    ResizeService,
    GroupService,
    ColumnMenuService,
    PageService,
    FilterService,
    EditService
  ],
  encapsulation: ViewEncapsulation.None
})
export class RaiseATicketComponent implements OnInit {
  tickets = [];
  editparams: { params: { popupHeight: string } };
  schools: any;
  public editSettings: Object;
  pageSettings: PageSettingsModel;
  toolbar: Array<ToolbarItems>;
  initialSort: Object;
  searchSettings: SearchSettingsModel;
  filterOptions: FilterSettingsModel;
  groupOptions: GroupSettingsModel;
  constructor(
    private _ticketService: RaiseTicketService,
    private _util: UtilService,
    private _toast: ToastService
  ) {}

  ngOnInit() {
    this.pageSettings = { pageSize: 15 };
    this.toolbar = [
      'Add',
      'Edit',
      'Delete',
      'Search'
    ];
    this.searchSettings = {};
    this.filterOptions = { type: 'Excel' };
    this.editSettings = {
      allowEditing: true,
      allowAdding: true,
      allowDeleting: true,
      mode: 'Dialog'
    };
    this.editparams = { params: { popupHeight: '800px' } };
    this.initialSort = { columns: [{ field: '', direction: 'Ascending' }] };
    this._ticketService.getTickets().subscribe(res => {
      this.tickets = res;
    });
  }

  onFormSubmit(f): void {
    console.log(f.value);
    const schoolId = this._util.getSchoolId();
    const ticketData = f.value;
    ticketData.schoolId = schoolId;
    // this.tickets.push(this.ticketData)
    this._ticketService.submitTicket(ticketData).subscribe(res => {
      if (res) {
        this._toast.success('Ticket raised successfully!');
      } else {
        this._toast.error('There was an error, please try again!');
      }
      f.reset();
    });
  }
}
