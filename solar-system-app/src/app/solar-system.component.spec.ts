import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SolarSystemComponent } from './solar-system.component';
import { SolarSystemDetailsService } from './solar-system-details.service';

describe('SolarSystemComponent', () => {
  let component: SolarSystemComponent;
  let fixture: ComponentFixture<SolarSystemComponent>;
  let mockSolarSystemDetailsService: jest.Mocked<SolarSystemDetailsService>;

  beforeEach(async () => {
    // Create a mock service with spy methods
    mockSolarSystemDetailsService = {
      getSolarSystemPlanetsDetails: jest.fn()
    } as jest.Mocked<SolarSystemDetailsService>;

    await TestBed.configureTestingModule({
      imports: [SolarSystemComponent],
      providers: [
        { provide: SolarSystemDetailsService, useValue: mockSolarSystemDetailsService }
      ]
    }).compileComponents();

    // Create component and detect changes
    fixture = TestBed.createComponent(SolarSystemComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('getPlanetName', () => {
    it('should return correct planet name for valid index', () => {
      expect(component.getPlanetName(0)).toBe('Mercury');
      expect(component.getPlanetName(1)).toBe('Venus');
      expect(component.getPlanetName(8)).toBe('Pluto');
    });

    it('should return undefined for out of bounds index', () => {
      expect(component.getPlanetName(9)).toBeUndefined();
      expect(component.getPlanetName(-1)).toBeUndefined();
    });
  });

  describe('isSolarSystemPlanet', () => {
    it('should return true for existing planets', () => {
      expect(component.isSolarSystemPlanet('Earth')).toBe(true);
      expect(component.isSolarSystemPlanet('Mars')).toBe(true);
    });

    it('should return false for non-existing planets', () => {
      expect(component.isSolarSystemPlanet('Andromeda')).toBe(false);
      expect(component.isSolarSystemPlanet('Kepler')).toBe(false);
    });

    it('should be case-sensitive', () => {
      expect(component.isSolarSystemPlanet('earth')).toBe(false);
    });
  });

  describe('getSolarSystemProbesCost', () => {
    it('should return 0 if service method is not available', () => {
      mockSolarSystemDetailsService.getSolarSystemPlanetsDetails.mockReturnValue([]);
      expect(component.getSolarSystemProbesCost()).toBe(0);
    });

    it('should calculate total probes cost correctly', () => {
      // Mock the service to return a predictable structure
      mockSolarSystemDetailsService.getSolarSystemPlanetsDetails.mockReturnValue([
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
      ]);

      // Expected total: 100 + 200 + 50 = 350
      expect(component.getSolarSystemProbesCost()).toBe(350);
    });

    it('should ignore probes with unknown costs', () => {
      mockSolarSystemDetailsService.getSolarSystemPlanetsDetails.mockReturnValue([
        {
          probes: () => [
            { isCostKnown: () => false, getCost: () => 100 },
            { isCostKnown: () => true, getCost: () => 200 }
          ],
          moonList: () => [
            {
              probes: () => [
                { isCostKnown: () => false, getCost: () => 50 }
              ]
            }
          ]
        }
      ]);

      // Expected total: only 200 (the known cost probe)
      expect(component.getSolarSystemProbesCost()).toBe(200);
    });
  });

  describe('Component Template', () => {
    beforeEach(() => {
      // Setup mock service with predictable data
      mockSolarSystemDetailsService.getSolarSystemPlanetsDetails.mockReturnValue([
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
      ]);

      // Trigger change detection
      fixture.detectChanges();
    });

    it('should render planet names correctly', () => {
      const planetNameElements = fixture.nativeElement.querySelectorAll('.planet-names li');
      expect(planetNameElements.length).toBe(9);
      
      const expectedPlanets = ['Mercury', 'Venus', 'Earth', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune', 'Pluto'];
      planetNameElements.forEach((element: HTMLElement, index: number) => {
        expect(element.textContent?.trim()).toBe(`Planet ${index}: ${expectedPlanets[index]}`);
      });
    });

    it('should render planet existence checks', () => {
      const planetChecks = fixture.nativeElement.querySelectorAll('.planet-checks p');
      
      expect(planetChecks.length).toBe(2);
      expect(planetChecks[0].textContent?.trim()).toContain('Is \'Earth\' a solar system planet? true');
      expect(planetChecks[1].textContent?.trim()).toContain('Is \'Andromeda\' a solar system planet? false');
    });

    it('should render solar system probes cost', () => {
      const probesCostElement = fixture.nativeElement.querySelector('.probes-cost p');
      
      expect(probesCostElement).toBeTruthy();
      expect(probesCostElement.textContent?.trim()).toBe('Total Probes Cost: $350');
    });

    it('should have correct CSS classes', () => {
      const rootElement = fixture.nativeElement.querySelector('.solar-system-info');
      expect(rootElement).toBeTruthy();

      const sections = [
        '.planet-names',
        '.planet-checks',
        '.probes-cost'
      ];

      sections.forEach(selector => {
        const section = fixture.nativeElement.querySelector(selector);
        expect(section).toBeTruthy();
      });
    });
  });
});
