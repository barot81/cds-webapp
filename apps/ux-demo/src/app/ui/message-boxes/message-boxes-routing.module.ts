import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MessageBoxesComponent } from "./pages/message-boxes.component";

const routes: Routes = [
    {
        path: 'message-boxes',
        component: MessageBoxesComponent
    }
]
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MessageBoxesRoutingModule { }