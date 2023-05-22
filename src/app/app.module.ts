import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { TableComponent } from './components/table/table.component';
import { ClientComponent } from './components/client/client.component';
import { PreloaderComponent } from './components/preloader/preloader.component';
import { ModalComponent } from './components/modals/modal/modal.component';
import { HttpClientModule } from '@angular/common/http';
import { ContactsComponent } from './components/contacts/contacts.component';
import { DeleteModalComponent } from './components/delete-modal/delete-modal.component';
import { ModalContactListComponent } from './components/modals/modal-contact-list/modal-contact-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchPipe } from './pipes/search.pipe';
import { EditModalComponent } from './components/modals/edit-modal/edit-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TableComponent,
    ClientComponent,
    PreloaderComponent,
    ModalComponent,
    ContactsComponent,
    DeleteModalComponent,
    ModalContactListComponent,
    SearchPipe,
    EditModalComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
