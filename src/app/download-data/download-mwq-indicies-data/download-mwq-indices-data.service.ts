import { Injectable } from '@angular/core';

import * as XLSX from 'xlsx';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable()
export class DownloadMwqIndicesDataService {

  constructor() { }
  static toExportFileName(excelFileName: string): string {
    return `${excelFileName}_export_${new Date().getTime()}.xlsx`;
  }

  public exportAsExcelFile(json: any[], excelFileName: string): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const workbook: XLSX.WorkBook = {Sheets: {'MWQ_INDICES_DATA': worksheet}, SheetNames: ['MWQ_INDICES_DATA']};
    XLSX.writeFile(workbook, DownloadMwqIndicesDataService.toExportFileName(excelFileName));
  }

}