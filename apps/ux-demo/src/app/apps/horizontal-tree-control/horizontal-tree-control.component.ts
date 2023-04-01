import { Component, Input} from '@angular/core';
import { HeaderService } from '@exxat/ux';

@Component({
  selector: 'ryzen-horizontal-tree-control',
  templateUrl: './horizontal-tree-control.component.html',
  styleUrls: ['./horizontal-tree-control.component.scss']
})

export class HorizontalTreeControlComponent {
  initialStepData = [];
  lists = [];
  autoScroll = false;
    
  // on click of list item fetch items for next list and show that list. 
  getStepInfo(itemId, listId): void {
    // If item from available list is clicked then clear all the steps ahead of that list.
    if(this.lists.length > listId){
      this.lists.splice(listId);
    }

    this.lists[this.lists.length-1].selectedId=itemId;

    // API call to get items of next list depending on items selected in current list. 
    let nextStepId = this.lists.length + 1;
    let listData = [];
    for(let i = 1; i <= 5; i++){
      let item = {title : 'Step ' + nextStepId +' Item '+ i , id: i};
      listData.push(item);
    }
    // get the items with using list id under which list item is selected and id of selected item
    this.lists.push({listId : nextStepId, listData : listData, name:"Step " + nextStepId ,  selecetdId : null });
    this.autoScroll = true;
  }

  navigateToStep(stepId){
    this.lists.splice(stepId);
  }

  scrollToRight(){
    if (this.autoScroll){
      document.getElementById('tree-cards').scrollLeft += (document.getElementById('tree-cards').offsetWidth  * 0.4 + 20);
    }
    this.autoScroll = false ;
  }

  constructor(public headerService: HeaderService) {
    // API call to get items in first step of this screen. 
    for(let i = 1; i <= 5; i++){
      let item = {title : 'Step ' + 1 +' Item '+ i , id: i};
      this.initialStepData.push(item);
    }

    // Default list visible on page load
    this.lists = [{ listId : 1, listData: this.initialStepData, name:"Step 1" , selecetdId : null}];
  }

  ngOnInit() {

  }

  ngAfterViewInit() {
    this.headerService.setCurrentHeaderHeight(290);
  }

}







