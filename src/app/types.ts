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

interface Shape {
  id: number;
  image: string;
}

interface Complexity {
  id: number;
  complexity: string;
}

interface Country {
  id: number;
  name: string;
  complexity: Complexity;
  shape: Shape;
}
