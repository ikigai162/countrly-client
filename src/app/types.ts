export type User = {
  id: string;
  email: string;
  password: string;
  name?: string;
};

export interface CountryDTO {
  id: number;
  name: string;
  shape: string;
}
