import { Component, OnInit } from '@angular/core';
import { zhealthcareOverlayRef } from '@zhealthcare/ux';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'ryzen-subscribe',
  templateUrl: './subscribe.component.html',
  styleUrls: ['./subscribe.component.scss']
})
export class SubscribeComponent {

  frmSubscribe: FormGroup;
  
  constructor(private fb: FormBuilder, private overlayRef: zhealthcareOverlayRef) {
    this.frmSubscribe = this.fb.group({
      name: this.overlayRef.data.name,
      email: [
        this.overlayRef.data.email,
        Validators.compose([Validators.email, Validators.required])
      ]
    });
  }
  
  cancel() {
    this.overlayRef.close(this.frmSubscribe.value);
  }

}
