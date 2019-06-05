import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnChanges {

  @Input() pageSize = 10;
  @Input() elements: Object[];
  @Output() pagedList = new EventEmitter<Object[]>(true);

  currentPage = 1;
  nmbOfPages: number;
  begin: number;
  end: number;

  constructor() { }

  ngOnChanges() {
    if (this.elements) {
      this.nmbOfPages = Math.ceil(this.elements.length / this.pageSize);
      this.currentPage = Math.min(this.currentPage, this.nmbOfPages > 0 ? this.nmbOfPages : 1);
      this.begin = this.elements.length > 0 ? 1 + (this.currentPage - 1) * this.pageSize : 0;
      const possibleEnd = this.pageSize + (this.currentPage - 1) * this.pageSize;
      this.end = possibleEnd > this.elements.length ? this.elements.length : possibleEnd;
      const pagedList = this.elements.slice(this.begin - 1, this.end);
      this.pagedList.emit(pagedList);
    }
  }
  next() {
    if (this.currentPage < this.nmbOfPages) {
      this.currentPage++;
      this.ngOnChanges();
    }

  }

  previous() {
    if (this.currentPage > 1 ) {
      this.currentPage--;
      this.ngOnChanges();
    }
  }

}
