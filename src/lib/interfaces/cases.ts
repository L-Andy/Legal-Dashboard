export interface ICase {
    id: string;
    title: string;
    status: CaseStatusEnum;
    lastUpdated: string;
    type: string;
    date: string;
  }
  
  export interface IDocument {
    id: string;
    name: string;
    case: string;
    version: string;
    status: string;
    lastUpdated: string;
  }

  export interface ITimeEntry {
    id: string;
    hours: number;
    date: string;
    case: string;
    description: string;
    billable: boolean;
  }

  export enum CaseStatusEnum {
    ACTIVE = 'Active',
    PENDING = 'Pending',
    CLOSED = 'Closed'
  }