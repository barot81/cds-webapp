import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'exxat-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {

  filesList = [
    { fileName: "Abcd_Example.pdf", type: "icon", errorMessage: '', fileSize: '1mb' },
    { fileName: "Abcd_Long_File_Name_Example.pdf", type: "spinner", errorMessage: '', fileSize: '3gb' },
    { fileName: "Abcd_Example.pdf", type: "icon", errorMessage: '', fileSize: '4gb' },
    { fileName: "Text of this link remain as per user input.", type: "spinner", errorMessage: '', fileSize: '100kb' },
    { fileName: "Abcd_Example.pdf", type: "spinner", errorMessage: '2mb is used out of 8 mb', fileSize: '2mb' }
  ]
  constructor() { }

  ngOnInit() {
  }

}
