import {NgModule} from "@angular/core";
import {SharedModule} from "../../shared/shared.module";
import {AppFooterComponent} from "./app-footer.component";
import {MatButtonModule, MatCardModule} from "@angular/material";

@NgModule({
  declarations: [
    AppFooterComponent
  ],
  imports: [
    SharedModule,

    MatButtonModule,
    MatCardModule

  ],
  exports: [
    AppFooterComponent,
  ],
  providers: []
})
export class AppFooterModule {
}
