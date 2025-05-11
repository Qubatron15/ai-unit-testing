import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SolarSystemDetailsService {
  getSolarSystemPlanetsDetails() {
    return [
      {
        probes: () => [
          { isCostKnown: () => true, getCost: () => 100 },
          { isCostKnown: () => true, getCost: () => 200 }
        ],
        moonList: () => [
          {
            probes: () => [
              { isCostKnown: () => true, getCost: () => 50 }
            ]
          }
        ]
      }
    ];
  }
}
