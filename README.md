# Sports Leagues

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.3.10.

### AI Tools Used

GitHub Copilot was used to quickly scaffold the initial HTML and CSS structure, speeding up early UI implementation.

Copilot assisted with generating repetitive markup and boilerplate styles, while all component logic, state flow, and architecture decisions were implemented manually.

ChatGPT was used as an auxiliary tool for error checking, similar to using a search engine or technical reference.

### Design Decisions

#### Signals for Reactivity

Angular Signals were chosen as the primary reactivity model to reduce template complexity, avoid unnecessary subscriptions, and improve performance through fine-grained reactivity.

#### @ngrx/signals Store

Used as a lightweight, signal-based state management layer. This allowed shared state (search term, selected dropdown value, filters, etc.) between the search bar, dropdown, and the Home component without introducing the complexity of a full NgRx setup.

#### Component Isolation

Each UI feature is built as an independent component (header, search bar, dropdown, card, league list). This improves reusability, readability, and testability.

#### Shared Store for Search Workflow

Both the search bar and dropdown interact with the central FilterStore, ensuring consistent state flow and eliminating props drilling.

#### Clean, Predictable Data Flow

The app follows a one-directional data flow:
Store (signals) → Components → User Actions → Store Updates.
