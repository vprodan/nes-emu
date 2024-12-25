export abstract class BaseRegister {
  protected value!: number;

  constructor(protected readonly defaultValue: number = 0) {
    this.reset();
  }

  public read(): number {
    return this.value;
  }

  public write(value: number): void {
    this.value = value;
  }

  public reset(): void {
    this.write(this.defaultValue);
  }
}
