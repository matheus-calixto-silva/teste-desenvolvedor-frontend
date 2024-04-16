export interface IDocument {
  id: string;
  expedient: string;
  type: string;
  url: string;
}

export interface IActivePrinciple {
  id: string;
  name: string;
}

export interface IMedicine {
  id: string;
  name: string;
  published_at: string;
  company: string;
  documents: IDocument[];
  active_principles: IActivePrinciple[];
}

interface IPagination {
  first: number;
  prev: number | null;
  next: number | null;
  last: number;
  pages: number;
  items: number;
}

export interface IDataResponse {
  pagination: IPagination;
  data: IMedicine[];
}
