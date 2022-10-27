import { Component, Input, OnInit } from '@angular/core';
import { Publication } from 'src/app/models/publication';

@Component({
  selector: 'app-publication-view',
  templateUrl: './publication-view.component.html',
  styleUrls: ['./publication-view.component.scss']
})
export class PublicationViewComponent {
  @Input() publication?: Publication;

  constructor() { }

}
