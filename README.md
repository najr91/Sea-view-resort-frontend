# Sea View Resort App

## Reglas de Ingeniería - Principios SOLID (Obligatorio)

Este proyecto debe desarrollarse respetando los principios SOLID. Toda contribución y refactorización debe cumplirlos.

- Single Responsibility (SRP): cada módulo/componente debe tener una única razón de cambio.
- Open/Closed (OCP): abierto a extensión, cerrado a modificación. Extiende mediante composición o nuevas implementaciones.
- Liskov Substitution (LSP): componentes intercambiables no deben romper el contrato esperado.
- Interface Segregation (ISP): evita interfaces/props demasiado grandes; divide en props enfocadas.
- Dependency Inversion (DIP): los componentes de alto nivel no deben depender de detalles de bajo nivel; depende de abstracciones.

### Guía práctica (checklist por PR)

- [ ] ¿Cada componente hace una sola cosa clara? (SRP)
- [ ] ¿Pudimos extender sin tocar código estable? (OCP)
- [ ] ¿Los componentes hijos pueden sustituirse sin romper al padre? (LSP)
- [ ] ¿Las props están segmentadas y son mínimas? (ISP)
- [ ] ¿No hay dependencias rígidas con detalles? (DIP)

### Organización sugerida

- `src/components/layout/*`: componentes de layout (Nav, MobileMenu, Footer).
- `src/components/home/*`: secciones de la Home (SearchFilters, Facilities, RoomsShowcase, Testimonials).
- `src/lib/*`: utilidades puras (por ejemplo `classNames`).
