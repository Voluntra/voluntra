export interface AmericorpsApiResponse {
  message: string;
  data: Data;
}

export interface Data {
  volunteerMatchAPI: VolunteerMatchApi;
  npsAPI: NpsApi;
}

export interface VolunteerMatchApi {
  data: Data2;
}

export interface Data2 {
  searchOpportunities: SearchOpportunities;
}

export interface SearchOpportunities {
  resultsSize: number;
  currentPage: number;
  numberOfResults: number;
  opportunities: Opportunity[];
}

export interface Opportunity {
  id: number;
  title: string;
  description: string;
  plaintextDescription: string;
  categories: string[];
  datePosted: string;
  skillsNeeded: string;
  greatFor: string[];
  redirectUrl?: string;
  connectionType?: string;
  url: string;
  requirements: Requirements;
  dateRange: DateRange;
  location: Location;
  parentOrg: ParentOrg;
}

export interface Requirements {
  bgCheck: boolean;
  drLicense: boolean;
  minimumAge: number;
  orientation: boolean;
}

export interface DateRange {
  startDate?: string;
  ongoing: boolean;
}

export interface Location {
  city: string;
  country: string;
  virtual: boolean;
  postalCode: string;
}

export interface ParentOrg {
  name: string;
  plaintextDescription: string;
  mission: string;
  id: number;
  location: Location2;
}

export interface Location2 {
  street1: string;
  city: string;
  country: string;
  postalCode: string;
}

export interface NpsApi {
  records: any[];
}
