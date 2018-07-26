export class User {
  constructor(
    public email: string,
    public password: string,
    public id?: string,
    public name?: string,
    public surname?: string,
    public patronymic?: string,
    public phone?: string,
    public image?: string
  ) {}
}
