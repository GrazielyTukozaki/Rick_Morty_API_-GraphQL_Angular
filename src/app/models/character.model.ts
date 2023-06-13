export class Character {
  name: string;
  species: string;
  status: string;
  type: string;
  gender: string;
  origin: string;
  location: string;
  image: string;

  constructor(
    name: string,
    species: string,
    status: string,
    type: string,
    gender: string,
    origin: string,
    location: string,
    image: string
  ) {
    this.name = name;
    this.species = species;
    this.status = status;
    this.type = type;
    this.gender = gender;
    this.origin = origin;
    this.location = location;
    this.image = image;
  }
}
