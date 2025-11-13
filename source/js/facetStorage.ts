export class FacetStorage {
  private storageKey: string;

  constructor(storageKey: string = 'selectedFacets') {
    this.storageKey = storageKey;
  }

  saveFacets(facets: Record<string, unknown>): void {
    localStorage.setItem(this.storageKey, JSON.stringify(facets));
  }

  loadFacets(): Record<string, unknown> {
    const storedFacets = localStorage.getItem(this.storageKey);
    return storedFacets ? JSON.parse(storedFacets) : {};
  }

  clearFacets(): void {
    localStorage.removeItem(this.storageKey);
  }
}