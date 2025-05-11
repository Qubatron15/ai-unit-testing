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
  styles: [`
    .solar-system-info {
      font-family: Arial, sans-serif;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      background-color: #f4f4f4;
      border-radius: 8px;
    }
    
    h2 {
      color: #333;
      text-align: center;
      border-bottom: 2px solid #007bff;
      padding-bottom: 10px;
    }
    
    .planet-names, .planet-checks, .probes-cost {
      background-color: white;
      margin: 15px 0;
      padding: 15px;
      border-radius: 5px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    
    h3 {
      color: #007bff;
      margin-bottom: 10px;
    }
    
    ul {
      list-style-type: none;
      padding: 0;
    }
    
    li {
      margin: 5px 0;
      padding: 5px;
      background-color: #f9f9f9;
      border-radius: 3px;
    }
  `]
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
