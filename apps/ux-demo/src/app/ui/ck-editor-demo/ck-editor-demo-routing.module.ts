import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CkEditorDemoComponent } from "./pages";

const routes: Routes = [
    {
        path: 'ck-editor-demo',
        component: CkEditorDemoComponent
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class CkEditorDemoRoutingModule { }