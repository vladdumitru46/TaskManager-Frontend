export interface Project {
    id: number;
    name: string;
    description: string;
    startDate: string;  // Use string because JSON date formats are returned as strings
    endDate: string;
  }
  