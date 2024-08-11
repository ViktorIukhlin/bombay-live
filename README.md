# Rock, Paper, Scissors (RPS) game

The main goal of this project is to meet the requirements for creating a flexible and maintainable application.
Also, if necessary, you can test this app on [git hub pages](https://viktoriukhlin.github.io/bombay-live/)

## RPS game settings
All settings regarding the game are in the [constants.ts](https://github.com/ViktorIukhlin/bombay-live/blob/main/src/features/rps/constants.ts) file (src/features/rps/constants.ts)

```
MINIMUM_BET
The minimum bet a user can place, or simply the bet size. 
The default value is 500 (Task requirement)

MAXIMUM_BET
The maximum bet a user can place on 1 position. 
The default value is null, which is equivalent to infinity. (Task requirement)

MAX_SELECTABLE_POSITIONS
The maximum number of positions a player can place bets on. 
The default value is 2. (Task requirement)

WINNING_RATE_FOR_ONE_POSITION 
Winning rate for bet on 1 position. 
The default value is 14. (Task requirement)

WINNING_RATE_FOR_TWO_POSITIONS 
Winning rate for bet on 2 and more positions. 
The default value is 3. (Task requirement)
```
You can also set up the starting balance in [this](https://github.com/ViktorIukhlin/bombay-live/blob/main/src/features/user/constants.ts) file (src/features/user/constants.ts)
The default value is 5000. (Task requirement)

## Project structure
```
bombay-live/
├── public/                       # Static assets (index.html, favicon, etc.)
├── src/                          # Source code
│   ├── app/                      # Global app configuration and store
│   │   └── store/                # Redux store setup
│   ├── components/               # Reusable React components
│   │   └── Button/               # Button component
│   ├── features/                 # Feature-specific logic and components
│   │   ├── rps/                  # Rock-Paper-Scissors feature
│   │   │   ├── components/       # RPS-specific components
│   │   │   │   ├── RpsCard/      # RPS Card component
│   │   │   │   ├── RpsHeader/    # RPS Header component
│   │   │   │   ├── RpsMessage/   # RPS Message component
│   │   │   │   └── RpsWrapper/   # RPS Wrapper component
│   │   │   ├── interfaces.ts     # TypeScript interfaces for RPS
│   │   │   ├── constants.ts      # Constants used in RPS feature
│   │   │   ├── enums.ts          # Enums used in RPS feature
│   │   │   ├── rpsService.ts     # Service for handling RPS logic
│   │   │   ├── rpsService.test.ts # Tests for RPS service
│   │   │   └── rpsSlice.ts       # Redux slice for RPS feature
│   │   └── user/                 # User management feature
│   │       ├── constants.ts      # Constants used in User feature
│   │       ├── interfaces.ts     # TypeScript interfaces for User feature
│   │       ├── userService.ts    # Service for handling User logic
│   │       ├── userService.test.ts # Tests for User service
│   │       └── userSlice.ts      # Redux slice for User feature
│   ├── lib/                      # Utility libraries and API clients
│   │   └── api/                  # API client configuration
│   ├── pages/                    # Top-level page components
│   │   └── RockPaperScissors/    # Rock-Paper-Scissors page component
│   ├── styles/                   # Global CSS/SCSS styles
│   │   ├── _colors.scss          # Color variables
│   │   ├── _defaults.scss        # Default styles
│   │   ├── _variables.scss       # General variables
│   │   └── index.scss            # Main stylesheet
│   ├── utils/                    # Utility functions and helpers
│   ├── index.tsx                 # Entry point for React
│   ├── react-app-env.d.ts        # TypeScript environment settings for React
│   ├── routes.tsx                # React Router configurations
│   └── setupTests.ts             # Jest setup file for tests
├── .gitignore                    # Git ignore file
├── README.md                     # Project documentation
├── tsconfig.json                 # TypeScript configuration
├── package.json                  # Project metadata and dependencies
└── yarn.lock / package-lock.json # Dependency lock file
```
