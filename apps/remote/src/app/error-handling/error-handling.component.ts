import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-error-handler',
  templateUrl: './error-handling.component.html'
})
export class ErrorHandlingComponent implements OnInit {
  errorCode!: string;
  errorMessage!: string;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.errorCode = params['errorCode'];
      this.errorMessage = params['errorMessage'];
    });
  }
}
