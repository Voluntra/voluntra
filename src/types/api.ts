export interface XelloResponse {
  data: Login;
}

export interface Login {
  url: string;
  isMustResetPassword: boolean;
  userAccountId: number;
  jwtToken: string;
  userType: number;
  grade: number;
  isSource: boolean;
}

export interface Experiences {
  id: number;
  experienceCategoryId: string;
  experience: string;
  organization: string;
  city: string;
  stateProvince: string;
  country: string;
  formattedAddress: string;
  startDate: string;
  endDate: string;
  isOngoing: boolean;
  liked: string;
  disliked: string;
  learned: string;
  serviceHour: number;
  showInResume: boolean;
  resumeNotes: any;
}

export interface PostExperiences {
  experience: string;
  organization: string;
  city: string;
  stateProvince: string;
  country: string;
  formattedAddress: string;
  liked: string;
  disliked: string;
  learned: string;
  isOngoing: boolean;
  experienceCategoryId: string;
  startDate: string;
  endDate: string;
  serviceHour: number;
}
