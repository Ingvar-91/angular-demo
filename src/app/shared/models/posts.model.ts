class Posts {
  constructor(
    public title: string,
    public id?: number,
    public content?: string,
    public excerpt?: string,
    public files?: string,
    public user_id?: number,
    public user_email?: string
  ) {}
}
