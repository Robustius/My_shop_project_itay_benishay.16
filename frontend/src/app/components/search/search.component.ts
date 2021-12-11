import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  @Output() searched = new EventEmitter<string>();
  constructor() { }

  ngOnInit(): void {
  }

  public onSearch(searchTerm: any): void {
    this.searched.emit(searchTerm);
  }
}
