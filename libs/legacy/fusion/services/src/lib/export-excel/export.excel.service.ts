import { Injectable } from '@angular/core';
import { ExcelModel } from '@exxat/fusion/models';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
@Injectable({providedIn: 'any'})

export class ExportExcelService {
constructor() { }
public exportAsExcelFile(excelData: ExcelModel[], excelFileName: string): void {

  var excelBuffer : any;
  var workbook : XLSX.WorkBook = XLSX.utils.book_new();

  excelData.forEach(element => {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(element.sheetData, {header: element.headerOrder ? element.headerOrder: null});
    XLSX.utils.book_append_sheet(workbook, worksheet, element.sheetName);
  });
  excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  this.saveAsExcelFile(excelBuffer, excelFileName);
}
private saveAsExcelFile(buffer: any, fileName: string): void {
   const data: Blob = new Blob([buffer], {type: EXCEL_TYPE});
   FileSaver.saveAs(data, fileName +  EXCEL_EXTENSION);
}
}
