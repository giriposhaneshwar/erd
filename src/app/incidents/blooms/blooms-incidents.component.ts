import { Component, OnInit, ViewChild } from '@angular/core';
import { PageTitleService } from '../../core/page-title/page-title.service';
import { fadeInAnimation } from '../../core/route-animation/route.animation';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { IncidentsService } from '../incidents.service';

@Component({
  selector: 'ms-blooms',
  templateUrl: './blooms-incidents.component.html',
  styleUrls: ['./blooms-incidents.component.scss'],
  host: {
    "[@fadeInAnimation]": 'true'
  },
  animations: [fadeInAnimation]
})

export class BloomsIncidentComponent implements OnInit {
  mondalOpen: any;
  modalShowWindow: Boolean = false;
  bllomIncidentRows = [];
  selectedRow = [];
  temp = [];
  bloomsIncidentDetails = [];
  bloomsIncidentResp: any;
  value: any;

  blommIncidentInfo: any = {
    Name: "", statId: "", x: "", y: "", location: "", areacovered: "", bloomtype: "",
    AffectedSpecies: "", CreatedBy: "Admin", status: "Open", Remarks: "",
  };

  columns: any[] = [
    { prop: 'bloomIncidentId' },
    { name: 'Incident Description' },
    { name: 'Incident Reported DateTime' },
    { name: 'Incident Severity' }

  ];


  @ViewChild(DatatableComponent) table: DatatableComponent;

  constructor(private pageTitleService: PageTitleService, private incidentsService: IncidentsService) {
    this.loadBloomIncidentsData();
  }

  ngOnInit() {
    this.pageTitleService.setTitle("Marine Water Quality Management System");
  }

  loadBloomIncidentsData(): void {
    this.incidentsService.getBloomsIncidentData().subscribe((resp) => {
      this.bloomsIncidentResp = resp;
      this.bloomsIncidentDetails = this.bloomsIncidentResp.getAlgalbloomIncidentsResult.AlgalBloomList;
      this.selectedRow = [this.bloomsIncidentDetails[1]];
      this.temp = [...this.bloomsIncidentDetails];
    });
  }

  onSelect({ selected }) {
    console.log('Select Event', selected, this.selectedRow);
  }

  onActivate(event) {
    //console.log('Activate Event', event);
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();
    // filter our data
    const temp = this.temp.filter(function (d) {
      return d.incidentid.toLowerCase().indexOf(val) !== -1 || !val;
    });
    // update the rows
    this.bloomsIncidentDetails = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }

  createAlgolBloomIncident(blommIncidentInfo) {
    console.log("---------" + JSON.stringify(blommIncidentInfo));
    this.incidentsService.addBloomsIncidentInfo(blommIncidentInfo).subscribe((resp) => {
      console.log(JSON.stringify(resp));
    });
  }

  addTableRow() {
    this.openModal();
  }
  siteDatePrev() { }
  openModal() {
    this.modalShowWindow = true;
  }
  closeModal() {
    this.modalShowWindow = false;
  }
}
