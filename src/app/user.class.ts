export class User {
  constructor(
    public id: number | null,
    public name: string | null,
    public role: string | null,
    public age?: number | null
  ) { }
}