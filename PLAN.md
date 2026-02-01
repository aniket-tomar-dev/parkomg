# ParkOMG MVP - Implementation Plan

## Phase 1: Project Setup & Configuration
- [x] **Dependencies**
    - [x] Install `react-native-paper` and `react-native-safe-area-context`
    - [x] Install `react-hook-form`, `zod`, and `@hookform/resolvers`
    - [x] Install `expo-haptics` and `expo-secure-store`
    - [x] Install `lucide-react-native` (or use Paper icons)
    - [x] Configure `babel-plugin-react-native-paper` if needed (usually handled by Expo)

- [x] **Theming & Design System**
    - [x] Create `constants/theme.ts`
    - [x] Define **Primary Color** `#2563EB`
    - [x] Define **Secondary Color** `#16A34A`
    - [x] Define **Accent Color** `#F59E0B`
    - [x] Define **Danger Color** `#DC2626`
    - [x] Define **Neutral Colors** (Background, Surface, Text)
    - [x] Configure **Typography** (Inter font family configuration)
    - [x] Create `PaperProvider` wrapper with custom theme in `_layout.tsx`

- [x] **Navigation Structure**
    - [x] Create `(auth)` group for Login screens
    - [x] Create `(app)` group for protected screens
    - [x] Create `(app)/owner` folder for Owner tabs/stack
    - [x] Create `(app)/staff` folder for Staff tabs/stack
    - [x] Implement conditional routing logic in Root Layout based on role

## Phase 2: UI Library (Atomic Components)
- [x] **Wrappers**
    - [x] Create `ScreenWrapper` component (SafeArea + Background Color)
    - [x] Create `KeyboardAvoidingView` wrapper

- [x] **Inputs**
    - [x] Create `AppTextInput` component using RN Paper
    - [x] Implement error message display in `AppTextInput`
    - [x] Create `VehicleNumberInput` (auto-uppercase logic)

- [x] **Buttons**
    - [x] Create `AppButton` (Primary variant)
    - [x] Create `AppButton` (Secondary/Outline variant)
    - [x] Create `AppButton` (Danger variant)

- [x] **Feedback**
    - [x] Create `LoadingOverlay` component
    - [x] Create `EmptyState` component

## Phase 3: Authentication Feature
- [x] **Login Screen**
    - [x] Create `LoginScreen` file
    - [x] Implement Zod schema for Phone Number validation
    - [x] Build UI: Logo + Phone Input + Get OTP Button
    - [x] Add Form State (react-hook-form)
    - [x] Mock API call for OTP request

- [x] **OTP Verification Screen**
    - [x] Create `OtpScreen` file
    - [x] Implement OTP Input UI (4-6 digits)
    - [x] Mock API call for Verify OTP
    - [x] Implement Role selection mock (Owner vs Staff for MVP demo) or hardcoded logic
    - [x] Save Token/Role to `SecureStore` upon success

## Phase 4: Staff Workflow Feature
- [x] **New Vehicle Entry Screen**
    - [x] Create `EntryScreen` file
    - [x] Implement Zod schema for Entry Form
    - [x] **Vehicle Number Field**: Connect `VehicleNumberInput`
    - [x] **Type Selector**: Create Segmented Button or Chips for types (Car/Bike)
    - [x] **Phone Field**: Connect `AppTextInput`
    - [x] **Calculations**: Implement auto-end time logic (Current + 8hrs)
    - [x] **Submit Action**: Implement "Start Parking" handler
    - [x] Add `Haptics.notificationAsync` on success

- [x] **Active Parkings Screen**
    - [x] Create `ActiveParkingScreen` file
    - [x] Define `ParkingTicket` type interface
    - [x] Create `ParkingCard` component
    - [x] Implement **Color Coding Logic** (Green < 75%, Amber > 75%, Red > 100%)
    - [x] Create Mock Data list for Active Parkings
    - [x] Render FlatList of `ParkingCard`s

- [ ] **Exit Flow**
    - [ ] Add tap handler on `ParkingCard` to open Exit Modal/Screen
    - [ ] Calculate Final Amount logic (Mock)
    - [ ] Show "Collect Payment" button
    - [ ] Remove from list on completion

## Phase 5: Owner Workflow Feature (MVP)
- [x] **Dashboard Screen**
    - [x] Create `DashboardScreen` file
    - [x] Create `StatCard` component (Title, Value, Index)
    - [x] Render Revenue, Active Cars, Completed mock stats

- [x] **Setup Screens**
    - [x] Create `PricingScreen` (Input implementations)
    - [x] Create `VehicleTypesScreen` (List + Add logic)

## Phase 6: Polish & Refinement
- [ ] **Haptics Integration**
    - [ ] Add haptic feedback to all primary buttons
- [ ] **Loading States**
    - [ ] Add skeleton loading to Dashboard
    - [ ] Add skeleton loading to Active Parkings
- [ ] **Offline Handling**
    - [ ] Add basic NetInfo check (optional for MVP but in PRD)
