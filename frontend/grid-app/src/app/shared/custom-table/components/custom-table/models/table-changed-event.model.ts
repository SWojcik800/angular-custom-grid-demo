export interface TableChangedEvent {
  paging: Paging,
  sorting: Sorting
}

export interface Sorting {
    sortColumn?: string,
    sortDirection?: string
}

export interface Paging {
    pageIndex: number,
    pageSize: number
}
