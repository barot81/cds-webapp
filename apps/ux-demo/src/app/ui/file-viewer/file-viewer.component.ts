import { Component, OnInit } from '@angular/core';
import { DocumentViewerConfiguration } from '@zhealthcare/plugin/file-upload';
import { FileEndpoint, FileSandbox } from '@zhealthcare/plugin/file-upload';

@Component({
  selector: 'document-viewer',
  templateUrl: './file-viewer.component.html'
})

export class FileViewerComponent implements OnInit {
  documentConfiguration :DocumentViewerConfiguration;
  constructor(private fileService:FileSandbox) { }

  ngOnInit() {

   // this.documentConfiguration.isKey=true;
 //  this.documentConfiguration.files=[{"id":"07a7d29d-9aae-4957-95f2-c8627a37339f","fileCollectionKey":"3f817ef6-74a5-463b-bc64-64d44a966089","fileName":"image (2).png","description":null,"tag":null,"createdTimestamp":"2020-04-17T10:44:06.8081024Z","updatedTimestamp":"2020-04-17T10:44:06.8081025Z","contentType":"image/png","size":107275,"filePath":"publication","fileType":"Image","tempFilePath":null,"isSecured":false,"outputFormat":{"thumbnailsmall":{"fileId":"f8119723-1a6e-498a-a053-66bfa584df26","contentType":"image/png"},"thumbnailmedium":{"fileId":"eee0f607-3033-4ced-a190-49d0a710ba9c","contentType":"image/png"},"thumbnaillarge":{"fileId":"b5144516-f36d-447b-80e3-877072df9b3e","contentType":"image/png"}},"tenantId":null,"owningOrganizationUnit":null,"owningUser":null,"securityContext":{"owningUser":"103","tenantId":"zhealthcare","owningOrganizationUnit":"P006"},"partitionKey":"zhealthcare","entityName":"zhealthcare.Services.File.Entity.Models.FileDescription","_rid":"R0VqAMffYm8nAwAAAAAAAA==","_self":"dbs/R0VqAA==/colls/R0VqAMffYm8=/docs/R0VqAMffYm8nAwAAAAAAAA==/","_ts":1587120252,"_etag":"\"190087c6-0000-2000-0000-5e99887c0000\""},{"id":"e60328b2-a0f8-4ed1-8522-c38874bcb274","fileCollectionKey":"3f817ef6-74a5-463b-bc64-64d44a966089","fileName":"Screenshot (18).png","description":null,"tag":null,"createdTimestamp":"2020-04-17T11:26:23.9157345Z","updatedTimestamp":"2020-04-17T11:26:23.9157347Z","contentType":"image/png","size":204765,"filePath":"publication","fileType":"Image","tempFilePath":null,"isSecured":false,"outputFormat":{"thumbnailsmall":{"fileId":"3cd999a6-c84f-480f-9682-4aeba5f77ffb","contentType":"image/png"},"thumbnailmedium":{"fileId":"5c7cbddf-4f69-4af3-86f3-acb4b09b9339","contentType":"image/png"},"thumbnaillarge":{"fileId":"65d94aac-62c1-40bc-a6ec-019a0afbabcb","contentType":"image/png"}},"tenantId":null,"owningOrganizationUnit":null,"owningUser":null,"securityContext":{"owningUser":"103","tenantId":"zhealthcare","owningOrganizationUnit":"P006"},"partitionKey":"zhealthcare","entityName":"zhealthcare.Services.File.Entity.Models.FileDescription","_rid":"R0VqAMffYm8pAwAAAAAAAA==","_self":"dbs/R0VqAA==/colls/R0VqAMffYm8=/docs/R0VqAMffYm8pAwAAAAAAAA==/","_ts":1587122786,"_etag":"\"1a0084f1-0000-2000-0000-5e9992620000\""},{"id":"57ba7749-191e-44d4-986d-174c5ffe948a","fileCollectionKey":"3f817ef6-74a5-463b-bc64-64d44a966089","fileName":"Validation Service.pdf","description":null,"tag":null,"createdTimestamp":"2020-04-18T12:50:55.2419619Z","updatedTimestamp":"2020-04-18T12:50:55.2419621Z","contentType":"application/pdf","size":94816,"filePath":"publication","fileType":"Document","tempFilePath":null,"isSecured":false,"outputFormat":{},"tenantId":null,"owningOrganizationUnit":null,"owningUser":null,"securityContext":{"owningUser":"103","tenantId":"zhealthcare","owningOrganizationUnit":"P006"},"partitionKey":"zhealthcare","entityName":"zhealthcare.Services.File.Entity.Models.FileDescription","_rid":"R0VqAMffYm85AwAAAAAAAA==","_self":"dbs/R0VqAA==/colls/R0VqAMffYm8=/docs/R0VqAMffYm85AwAAAAAAAA==/","_ts":1587214273,"_etag":"\"3200064f-0000-2000-0000-5e9af7c10000\""},{"id":"5af1addc-1ce8-452a-91b6-16c7a8df1e7a","fileCollectionKey":"3f817ef6-74a5-463b-bc64-64d44a966089","fileName":"file-sample_1MB.docx","description":null,"tag":null,"createdTimestamp":"2020-04-18T12:51:10.4540715Z","updatedTimestamp":"2020-04-18T12:51:10.4540716Z","contentType":"application/vnd.openxmlformats-officedocument.wordprocessingml.document","size":1026736,"filePath":"publication","fileType":"Document","tempFilePath":null,"isSecured":false,"outputFormat":{},"tenantId":null,"owningOrganizationUnit":null,"owningUser":null,"securityContext":{"owningUser":"103","tenantId":"zhealthcare","owningOrganizationUnit":"P006"},"partitionKey":"zhealthcare","entityName":"zhealthcare.Services.File.Entity.Models.FileDescription","_rid":"R0VqAMffYm86AwAAAAAAAA==","_self":"dbs/R0VqAA==/colls/R0VqAMffYm8=/docs/R0VqAMffYm86AwAAAAAAAA==/","_ts":1587214274,"_etag":"\"3200074f-0000-2000-0000-5e9af7c20000\""}];

 this.documentConfiguration  = new DocumentViewerConfiguration();
// this.documentConfiguration.defaultFileName="e60328b2-a0f8-4ed1-8522-c38874bcb274";
 this.documentConfiguration.fileEndpoint = new FileEndpoint('student.profile','student');
 this.documentConfiguration.fileCollectionKey='53486f01-8162-4a8b-b174-cb7a448dbe95';
 //this.documentConfiguration.files=Response;
 this.documentConfiguration.isKey=true;

    this.fileService.getFileDescription(
      new FileEndpoint('student.profile','student'),
      '53486f01-8162-4a8b-b174-cb7a448dbe95').subscribe(Response => {
      if(Response)
      {
      }

    });

  }
}
