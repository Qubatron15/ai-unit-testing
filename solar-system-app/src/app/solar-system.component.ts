import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SolarSystemDetailsService } from './solar-system-details.service';

@Component({
  selector: 'app-solar-system',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './solar-system.component.html',
  styleUrl: './solar-system.component.scss'
})
export class SolarSystemComponent implements OnInit {
  private planets = ['Mercury', 'Venus', 'Earth', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune', 'Pluto'];

  constructor(private solarSystemDetails: SolarSystemDetailsService) {}

  ngOnInit(): void {
    // Any initialization logic can go here
  }

  getPlanetName(planetNumber: number): string {
    return this.planets[planetNumber];
  }

  isSolarSystemPlanet(planetName: string): boolean {
    return this.planets.indexOf(planetName) >= 0;
  }

  getSolarSystemProbesCost(): number {
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

    return s;
  }
}
