import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  Output,
  Renderer2,
  SimpleChanges
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SliderHandlerEnum, SliderTrack } from '../../utils';
import { Utilities } from '../../utils/utilities';

@Component({
  selector: 'range-slider',
  templateUrl: './range-slider.component.html',
  styleUrls: ['./range-slider.component.scss']
})
export class RangeSliderComponent extends Utilities
  implements OnInit, OnChanges, AfterViewInit {
  private sliderModel = [0, 0, 0];
  public step = 1;
  private totalDiff = 0;
  private startClientX = 0;
  private startPleft = 0;
  private startPRight = 0;
  public minValue: number;
  public maxValue: number;
  private selected: number;
  private maxSelected: number;
  private sliderInitiated = false;
  // --------------------------------------
  //  Regular expressions
  private integerUnsigned: string = '^[0-9]*$';
  private integerSigned: string = '^-?[0-9]+$';
  private decimalUnsigned: string = '^[0-9]+(.[0-9]+)?$';
  private decimalSigned: string = '^-?[0-9]+(.[0-9]+)?$';

  public sliderForm: FormGroup;
  public sliderTracks: Array<SliderTrack> = [];
  public sliderWidth = 0;
  public initValues: number[] = [];
  public currentValues: number[] = [0, 0];
  public handlerX: number[] = [0, 0];
  public isHandlerActive = false;
  public isTouchEventStart = false;
  public isMouseEventStart = false;
  public currentHandlerIndex = 0;
  public stepIndicatorPositions = [];
  public isDisabled = false;
  public hideInputBox = false;
  public hideDescription = false;
  public hideValues = false;
  public hideDecimalValues = false;
  public indicatorColor: string = null;

  public handlerIndex = SliderHandlerEnum;

  private handleElement: HTMLElement;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private _fb: FormBuilder
  ) {
    super();
  }

  ngAfterViewInit(): void {
    this.handleElement = this.el.nativeElement.querySelector('.handle');
    this.setHandleBg();
  }

  //#region  [Set Component Variables From Inputs]

  @Input('min')
  set setMinValues(value: number) {
    if (!isNaN(value)) {
      this.minValue = Number(value);
    }
  }

  @Input('max')
  set setMaxValues(value: number) {
    if (!isNaN(value)) {
      this.maxValue = Number(value);
    }
  }

  @Input('selected')
  set setSelectedValues(value: number) {
    if (!isNaN(value) && this.selected !== Number(value)) {
      this.selected = Number(value);
    }
  }

  @Input('maxSelected')
  set setMaxSelectedValues(value: number) {
    if (!isNaN(value) && this.maxSelected !== Number(value)) {
      this.maxSelected = Number(value);
    }
  }

  @Input('tracks')
  set setsliderTracks(value: Array<SliderTrack>) {
    if (value.length > 0) {
      this.sliderTracks = value;
      this.sliderTracks = this.sliderTracks.sort(
        (a, b) => a.endStep - b.endStep
      );
    }
  }

  @Input('step')
  set stepValue(value: number) {
    if (!isNaN(value)) {
      this.step = Number(value);
    }
  }

  @Input('disabled')
  set setDisabled(value: boolean) {
    this.isDisabled = this.toBoolean(value, 'disabled');
  }

  @Input('hideDescription')
  set setDescriptionVisibility(value: boolean) {
    this.hideDescription = this.toBoolean(value, 'hideDescription');
  }

  @Input('hideValues')
  set setValuesVisibility(value: boolean) {
    this.hideValues = this.toBoolean(value, 'hideValues');
  }

  @Input('hideInputBox')
  set setInputBoxVisibility(value: boolean) {
    this.hideInputBox = this.toBoolean(value, 'hideInputBox');
  }

  @Input('hideDecimalValues')
  set setDecimalValuesVisibility(value: boolean) {
    this.hideDecimalValues = this.toBoolean(value, 'hideInputBox');
  }

  @Input('indicatorColor')
  set setIndicatorColor(value: string) {
    this.indicatorColor = value;
    console.log(this.indicatorColor)
  }

  //#endregion

  @Output() onChange = new EventEmitter<number>();

  ngOnInit() {
    this.initForm();
    this.initializeSlider();

    // Set Handle Position Based on Form Control Changes
    this.sliderForm
      .get('sliderValue')
      .valueChanges.subscribe((value: string) => {
        if (
          value != null &&
          value.toString().substr(value.length - 1) != '.' &&
          Number(value) != this.currentValues[0]
        ) {
          if (
            Number(value) >= this.minValue &&
            Number(value) <= this.maxValue
          ) {
            let regex: string;
            if (this.step % 1 === 0) {
              regex = this.decimalUnsigned;
              let valid: boolean = new RegExp(regex).test(value);
              if (valid) {
                value = Math.round(Number(value)).toString();
              }
            }
            this.setSliderValues(value);
          } else if (Number(value) < this.minValue) {
            value = this.minValue.toString();
            this.sliderForm.get('sliderValue').patchValue(value);
            this.setSliderValues(value);
          } else if (Number(value) > this.maxValue) {
            value = this.maxValue.toString();
            this.sliderForm.get('sliderValue').patchValue(value);
            this.setSliderValues(value);
          }
        }
      });
  }

  // method to set Range Slider
  private setSliderValues(value: string) {
    this.setModelValue(this.currentHandlerIndex, Number(value));
    this.setModelValue(
      this.currentHandlerIndex + 1,
      this.maxValue - Number(value)
    );
    this.setHandlerPosition();
  }

  public onKeyPress(event) {
    var k;
    k = event.charCode;
    if (k === 45 || k === 101 || k === 43) return false;
    if (this.step % 1 === 0) {
      if (k === 46) return false;
    }
  }

  public roundOffInput(value: number) {
    if (value % 1 === 0) {
      value = Math.round(value);
      this.sliderForm.get('sliderValue').patchValue(value);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.sliderInitiated) {
      if (
        !this.isNullOrEmpty(changes.setSelectedValues) &&
        changes.setSelectedValues.previousValue ===
        changes.setSelectedValues.currentValue
      ) {
        return;
      }
      if (
        !this.isNullOrEmpty(changes.setMaxSelectedValues) &&
        changes.setMaxSelectedValues.previousValue ===
        changes.setMaxSelectedValues.currentValue
      ) {
        return;
      }
      this.resetModel();
    }
  }

  private initForm() {
    this.sliderForm = this._fb.group({
      sliderValue: [{ disabled: this.isDisabled }]
    });
  }

  /*Method to initailize entire Slider*/
  public initializeSlider() {
    try {
      // Taking width of slider bar element.
      this.sliderWidth = this.el.nativeElement.children[0].children[0].offsetWidth;
      this.resetModel();
      this.sliderInitiated = true;
    } catch (e) {
      console.error(e);
    }
  }

  /*Method to initialize variables and model values */
  private resetModel() {
    this.validateSliderValues();
    // Setting the model values
    this.sliderModel = [
      this.currentValues[0] - this.initValues[0],
      this.currentValues[1] - this.currentValues[0],
      this.initValues[1] - this.currentValues[1]
    ];

    this.totalDiff = this.sliderModel.reduce(
      (prevValue, curValue) => prevValue + curValue,
      0
    );

    // Validation for slider step
    if (this.totalDiff % this.step !== 0) {
      const newStep = this.findNextValidStepValue(this.totalDiff, this.step);
      console.warn(
        'Invalid step value "' +
        this.step +
        '" : and took "' +
        newStep +
        '" as default step'
      );
      this.step = newStep;
    }
    this.initializeStepIndicator();
    this.setHandlerPosition();
  }

  /*Method to do validation of init and seleted range values*/
  private validateSliderValues() {
    if (
      this.isNullOrEmpty(this.minValue) ||
      this.isNullOrEmpty(this.maxValue)
    ) {
      this.updateInitValues([0, 0]);
      this.updateCurrentValue([0, 0], true);
    } else if (this.minValue > this.maxValue) {
      this.updateInitValues([0, 0]);
      this.updateCurrentValue([0, 0], true);
    } else {
      this.initValues = [this.minValue, this.maxValue];
      /*
       * Validation for Selected range values
       */
      if (
        this.isNullOrEmpty(this.selected) ||
        this.selected < this.minValue ||
        this.selected > this.maxValue
      ) {
        this.selected = this.minValue;
      }
      if (
        this.isNullOrEmpty(this.maxSelected) ||
        this.maxSelected < this.minValue ||
        this.maxSelected > this.maxValue
      ) {
        this.maxSelected = this.maxValue;
      }
      if (this.selected > this.maxSelected) {
        this.selected = this.minValue;
        this.maxSelected = this.maxValue;
      }
      this.updateCurrentValue([this.selected, this.maxSelected], true);
    }
  }

  /*Method to add step inidicator to slider */
  private initializeStepIndicator() {
    this.stepIndicatorPositions.length = 0;
    const numOfStepIndicators = this.totalDiff / this.step;
    if (this.sliderWidth / numOfStepIndicators >= 10) {
      const increment = this.sliderWidth / numOfStepIndicators;
      let leftPosition = increment;
      let stepValue = this.minValue + this.step;
      while (this.stepIndicatorPositions.length < numOfStepIndicators) {
        const obj = {
          value: stepValue,
          position: +leftPosition.toFixed(1),
          bgColor: this.sliderTracks.find(x => stepValue <= x.endStep)
            ? this.sliderTracks.find(x => stepValue <= x.endStep).bgColor
            : this.sliderTracks[this.sliderTracks.length - 1].bgColor
        };
        this.stepIndicatorPositions.push(obj);
        stepValue += this.step;
        // leftPosition += increment;
      }
      if (
        this.sliderTracks &&
        this.sliderTracks.length > 0 &&
        this.stepIndicatorPositions &&
        this.stepIndicatorPositions.length > 0
      ) {
        let trackPositions = [];
        this.sliderTracks.forEach(track => {
          let filteredArray = this.stepIndicatorPositions.filter(
            x => x.value <= track.endStep
          );
          let width = 0;
          filteredArray.forEach(element => {
            width += element.position;
          });
          trackPositions.push(width);
        });

        if (trackPositions.length > 0) {
          trackPositions.forEach((element, i) => {
            let width = i > 0 ? element - trackPositions[i - 1] : element;
            width = +width.toFixed(1);
            this.sliderTracks[i].width = width;
          });
        }
      }
    } else {
      console.warn(`As 'step' value is too small compared to min & max value difference and slider width,
          Step Indicator can't be displayed!. Provide slight large value for 'step'`);
    }
  }

  /*Method to set current selected values */
  private updateCurrentValue(
    arrayValue: number[],
    privateChange: boolean = false
  ) {
    this.selected = this.currentValues[0] = arrayValue[0];
    this.maxSelected = this.currentValues[1] = arrayValue[1];
    if (!privateChange) {
      this.setHandleBg();
      /* Setting Current Value To Form Control Value*/
      this.sliderForm
        .get('sliderValue')
        .setValue(+this.currentValues[0].toFixed(1));
      this.onChange.emit(+this.currentValues[0].toFixed(1));
    }
  }

  /*Method to set handle background color */
  private setHandleBg() {
    let currentSelectedNode = this.sliderTracks.find(
      x => this.currentValues[0] <= x.endStep
    );
    if (currentSelectedNode && this.handleElement) {
      this.renderer.setStyle(
        this.handleElement,
        'background',
        this.indicatorColor && this.indicatorColor != null ? this.indicatorColor : currentSelectedNode.bgColor
      );
    }
  }

  /*Method to set current selected values */
  private updateInitValues(arrayValue: number[]) {
    this.minValue = this.initValues[0] = arrayValue[0];
    this.maxValue = this.initValues[1] = arrayValue[1];
  }

  /*Method to set handler position */
  private setHandlerPosition() {
    let runningTotal = 0;
    // Updating selected values : current values
    this.updateCurrentValue([
      this.initValues[0] + this.sliderModel[0],
      this.initValues[1] - this.sliderModel[2]
    ]);
    /*Setting handler position */
    for (let i = 0, len = this.sliderModel.length - 1; i < len; i++) {
      runningTotal += this.sliderModel[i];
      this.handlerX[i] = (runningTotal / this.totalDiff) * 100;
    }
  }

  /*Method to set model array values - will try to refine the values using step */
  private setModelValue(index: number, value: number) {
    if (this.step > 0) {
      // value = Math.round(value / this.step) * this.step;
      value = (value / this.step) * this.step;
    }
    this.sliderModel[index] = value;
  }

  /*Method to disable handler movement*/
  /*Execute on events:
   * on-mouseup
   * on-panend
   */
  @HostListener('document:mouseup')
  @HostListener('document:panend')
  setHandlerActiveOff() {
    this.isMouseEventStart = false;
    this.isTouchEventStart = false;
    this.isHandlerActive = false;
  }

  /*Method to detect start draging handler*/
  /*Execute on events:
   * on-mousedown
   * on-panstart
   */
  public setHandlerActive(event: any, handlerIndex: number) {
    event.preventDefault();
    if (!this.isDisabled) {
      if (!this.isNullOrEmpty(event.clientX)) {
        this.startClientX = event.clientX;
        this.isMouseEventStart = true;
        this.isTouchEventStart = false;
      } else if (!this.isNullOrEmpty(event.deltaX)) {
        this.startClientX = event.deltaX;
        this.isTouchEventStart = true;
        this.isMouseEventStart = false;
      }
      if (this.isMouseEventStart || this.isTouchEventStart) {
        this.currentHandlerIndex = handlerIndex;
        this.startPleft = this.sliderModel[handlerIndex];
        this.startPRight = this.sliderModel[handlerIndex + 1];
        this.isHandlerActive = true;
      }
    }
  }

  /*Method to calculate silder handler movement */
  /*Execute on events:
   * on-mousemove
   * on-panmove
   */
  public handlerSliding(event: any) {
    if (
      (this.isMouseEventStart && event.clientX) ||
      (this.isTouchEventStart && event.deltaX)
    ) {
      let movedX = 0;

      if (Number(this.step) % 1 === 0) {
        movedX = Math.round(
          (((event.clientX || event.deltaX) - this.startClientX) /
            this.sliderWidth) *
          this.totalDiff
        );
      } else {
        movedX = +(
          (((event.clientX || event.deltaX) - this.startClientX) /
            this.sliderWidth) *
          this.totalDiff
        ).toFixed(1);
      }
      const nextPLeft = this.startPleft + movedX;
      const nextPRight = this.startPRight - movedX;
      if (nextPLeft >= 0 && nextPRight >= 0) {
        this.setModelValue(this.currentHandlerIndex, nextPLeft);
        this.setModelValue(this.currentHandlerIndex + 1, nextPRight);
        this.setHandlerPosition();
      }
    }
  }

  public isIncludedInSliderTracks(value: number): boolean {
    return this.sliderTracks.find(x => x.endStep === value) != null ? true : false;
  }

  public getDescription(value: number): string {

    let track: SliderTrack = this.sliderTracks.find(x => x.endStep >= value);

    return track.description;

  }
}
