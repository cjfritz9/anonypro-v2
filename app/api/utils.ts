export class APIResponse {
  private status;
  private message;
  private data;

  constructor(status: 'ok' | 'error', message: string | null, data: any) {
    this.status = status;
    this.message = message;
    this.data = data;

    console.log(data)
    console.log(this)

    return this;
  }

  public update = (
    status?: typeof this.status,
    message?: typeof this.message,
    data?: typeof this.data
  ) => {
    if (status) {
      this.status = status;
    }

    if (message) {
      this.message = message;
    }

    if (data) {
      this.data = data;
    }

    return this;
  };
}
