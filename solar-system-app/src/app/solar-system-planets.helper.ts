export class SolarSystemPlanetsHelper {
  private planets = ['Mercury', 'Venus', 'Earth', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune', 'Pluto'];

  constructor(private solarSystemDetails: any) { }

  /**
   * Get name of the planet by index.
   * @param planetNumber
   */
  public getPlanetName(planetNumber: number): string {
    return this.planets[planetNumber];
  }

  public isSolarSystemPlanet(planetName: string): boolean {
    return this.planets.indexOf(planetName) >= 0;
  }

  /**
   * Get cost of the probes from planets and moons in solar system
   */
  public getSolarSystemProbesCost(): number {
    // s is sum of the costs
    let s: number = 0;
    
    // Ensure solarSystemDetails is defined and has the method
    if (!this.solarSystemDetails || typeof this.solarSystemDetails.getSolarSystemPlanetsDetails !== 'function') {
      return 0;
    }

    // x is planet
    const planetsDetails = this.solarSystemDetails.getSolarSystemPlanetsDetails();
    for (const x of planetsDetails) {
      // y is probe
      if (x.probes && typeof x.probes === 'function') {
        for (const y of x.probes()) {
          if (y.isCostKnown && typeof y.isCostKnown === 'function' && y.isCostKnown()) {
            s += y.getCost();
          }
        }
      }
      
      // z is moon
      if (x.moonList && typeof x.moonList === 'function') {
        for (const z of x.moonList()) {
          // y is probe
          if (z.probes && typeof z.probes === 'function') {
            for (const y of z.probes()) {
              if (y.isCostKnown && typeof y.isCostKnown === 'function' && y.isCostKnown()) {
                s += y.getCost();
              }
            }
          }
        }
      }
    }
    
    // returning s
    return s;
  }
}
