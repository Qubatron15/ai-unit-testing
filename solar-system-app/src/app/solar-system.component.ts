import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SolarSystemPlanetsHelper } from './solar-system-planets.helper';

// Mock implementation of SolarSystemDetails for demonstration
class MockSolarSystemDetails {
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

@Component({
  selector: 'app-solar-system',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './solar-system.component.html',
  styleUrl: './solar-system.component.scss'
})
export class SolarSystemComponent implements OnInit {
  planetsHelper: SolarSystemPlanetsHelper;

  constructor() {
    const mockSolarSystemDetails = new MockSolarSystemDetails();
    this.planetsHelper = new SolarSystemPlanetsHelper(mockSolarSystemDetails);
  }

  ngOnInit(): void {
    // Any initialization logic can go here
  }

  getSolarSystemProbesCost(): number {
    return this.planetsHelper.getSolarSystemProbesCost();
  }
}
