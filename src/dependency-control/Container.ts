export default class Container {
  private static injectionRecord = new Map<string, unknown>();

  static register(key: string, instance: unknown) {
    Container.injectionRecord.set(key, instance);
  }

  static get(key: string) {
    return Container.injectionRecord.get(key);
  }
}
