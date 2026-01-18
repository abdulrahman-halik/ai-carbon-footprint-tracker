# Technical Implementation Roadmap: AI-Powered Environmental Impact Tracker

**Project:** AI-Powered Personalized Environmental Impact Tracker and Advisor  
**Document Type:** Technical Specification & Coding Plan  
**Version:** 2.0 (Strict Alignment with Methodology & 3NF Schema)

---

## 1. System Overview & Technical Objectives

This document outlines the engineering roadmap for building the full-stack web application. It translates the academic research aims into concrete software requirements.

### 1.1 Core Engineering Analysis
- **System Type:** Full-Stack Web Application (SPA) + AI/ML Inference Engine
- **Primary Function:** Carbon footprint creation (CRUD), ML Prediction, Recommendation delivery.
- **Architectural Pattern:** Layered Architecture (Frontend -> REST API -> Controller -> Service -> DAL -> Database).

### 1.2 Technical Considerations (From Methodology)
- **Performance:** API response time ≤ 2 seconds (95th percentile).
- **Scalability:** Support 100+ concurrent users (Methodology Section 1.6).
- **Availability:** 99% Uptime.
- **Security:** HTTPS encryption, bcrypthashing for passwords, JWT for stateless authentication.

### 1.3 Tech Stack (Mandated)
| Layer | Technology | Justification (Feasibility Study) |
|-------|------------|-----------------------------------|
| **Frontend** | React.js (Vite), Tailwind CSS | Component-based, responsive, fast build. |
| **Backend** | Python (Flask) | Native support for ML libraries (PyTorch/Scikit-learn). |
| **Database** | MongoDB (NoSQL) | Flexible schema for lifestyle data, scalable. |
| **ML Engine** | TensorFlow / PyTorch | Temporal Fusion Transformer & LSTM-DML implementation. |
| **Tracking** | CodeCarbon | Real-time operational emissions monitoring. |
| **DevOps** | Docker, GitHub Actions | Containerization and CI/CD. |

---

## 2. Data Dictionary & Schema Design (3NF)

The database schema is strictly normalized to **Third Normal Form (3NF)** as defined in the Methodology (Section 2.6.2).

### 2.1 Collections / Tables

#### **User Collection** (User Profile)
| Field | Type | Constraint | Description |
|-------|------|------------|-------------|
| `userId` | ObjectId | **PK, Required** | Unique identifier for the user. |
| `name` | String | Required | User's full name. |
| `email` | String | **Unique, Required** | User's email address (Login ID). |
| `passwordHash` | String | Required | Bcrypt salted hash (No plaintext). |
| `personalityProfile` | Object | Optional | HEXACO assessment results (Openness, Conscientiousness scores). |
| `behaviorStage` | String | Enum | TTM Stage: 'Pre-contemplation', 'Action', etc. |
| `createdAt` | DateTime | Default: Now | Account creation timestamp. |

#### **LifestyleInput Collection** (Raw Data Log)
*One-to-Many relationship with User*
| Field | Type | Constraint | Description |
|-------|------|------------|-------------|
| `inputId` | ObjectId | **PK, Required** | Unique ID for the input record. |
| `userId` | ObjectId | **FK (User)** | Reference to the user. |
| `transportMode` | String | Required | e.g., 'Car', 'Bus', 'Bike'. |
| `dietType` | String | Required | e.g., 'Vegan', 'Meat-based'. |
| `electricityUsage` | Float | Required | kWh value. |
| `wasteGenerated` | Float | Required | kg value. |
| `timestamp` | DateTime | Required | Date of the activity/input. |

#### **CarbonPrediction Collection** (Inference Results)
*One-to-One relationship with LifestyleInput*
| Field | Type | Constraint | Description |
|-------|------|------------|-------------|
| `predictionId` | ObjectId | **PK, Required** | Unique ID for the prediction. |
| `userId` | ObjectId | **FK (User)** | Owner of the prediction. |
| `inputId` | ObjectId | **FK (LifestyleInput)** | Source data for this prediction. |
| `carbonValue` | Float | Required | Predicted CO2e in kg. |
| `confidenceScore` | Float | Range 0.0-1.0 | Model confidence level. |
| `modelVersion` | String | Required | e.g., 'v1.2-LSTM'. |
| `calculatedAt` | DateTime | Default: Now | Timestamp of calculation. |

#### **Recommendation Collection** (Actionable output)
*Many-to-One relationship with CarbonPrediction*
| Field | Type | Constraint | Description |
|-------|------|------------|-------------|
| `recId` | ObjectId | **PK, Required** | Unique ID. |
| `userId` | ObjectId | **FK (User)** | Target user. |
| `predictionId` | ObjectId | **FK (CarbonPrediction)**| Context for the recommendation. |
| `content` | String | Required | The text message (e.g., "Switch to LED"). |
| `nudgeType` | String | Enum (23 types) | e.g., 'Loss Aversion', 'Social Comparison'. |
| `status` | String | Enum | 'Pending', 'Viewed', 'Actioned'. |

#### **EmissionFactors Collection** (Reference Data)
*Reference lookup for calculations*
| Field | Type | Constraint | Description |
|-------|------|------------|-------------|
| `factorId` | ObjectId | **PK** | Unique ID. |
| `category` | String | Indexed | 'Transport', 'Diet', 'Energy'. |
| `subCategory` | String | Indexed | 'Diesel Car', 'Beef'. |
| `co2ePerUnit` | Float | Required | Emission factor value. |
| `unit` | String | Required | 'kg/km', 'kg/serving'. |
| `source` | String | Required | 'IPCC', 'WWF'. |

---

## 3. API Contract Specifications

### 3.1 Authentication (`/api/auth`)
- `POST /register`: Create account. Validates email format, password complexity.
- `POST /login`: Authenticates user. Returns **JWT Access Token**.
- `POST /refresh`: Refreshes expired access token.

### 3.2 Lifestyle Management (`/api/lifestyle`)
- `POST /submit`: Accepts JSON payload with transport, diet, energy data. Validates ranges.
- `GET /history`: Returns paginated list of past inputs for a user.

### 3.3 Prediction Engine (`/api/predictions`)
- `POST /calculate`: Triggers the ML model.
  - **Input**: User lifestyle data (JSON).
  - **Process**: (1) Get Emission Factors -> (2) Run ML Inference -> (3) Store Result.
  - **Output**: Calculated Carbon Footprint (JSON).

### 3.4 Recommendations (`/api/recommendations`)
- `GET /daily`: Fetches active recommendations based on latest predictions.
- `POST /feedback`: Tracks user interaction with nudges (for RL feedback loop).

### 3.5 System & Analytics (`/api/system`)
- `GET /emissions`: Returns CodeCarbon operational emission stats.
- `GET /health`: System health check (Database/ML Service status).

---

## 4. Development Implementation Phases

### Phase 1: Environment Setup & Project Initialization
**Goal**: Functional "Hello World" Development Environment.
- [ ] **Repository**: Initialize Git with `.gitignore` (Python/Node).
- [ ] **Frontend**: Scaffold React+Vite project (`npm create vite`).
- [ ] **Backend**: Setup Python Virtual Env, install Flask, Flask-CORS.
- [ ] **Docker**: Create `docker-compose.yml` for local MongoDB & App services.
- [ ] **Validation**: Verify Backend (Port 5000) talks to Frontend (Port 5173).

### Phase 2: Database Implementation (3NF Schema)
**Goal**: Operational MongoDB Database with Collections.
- [ ] **Setup**: Connect Flask to MongoDB (using `flask-pymongo` or `mongoengine`).
- [ ] **Schema**: Implement the 5 Collections defined in Section 2.
- [ ] **Seeding**: Write scripts to populate `EmissionFactors` collection (IPCC data).
- [ ] **Indexing**: Create indexes on `userId`, `email`, and `timestamp` fields.
- [ ] **Validation**: Test CRUD operations on all collections.

### Phase 3: Backend Core & Authentication
**Goal**: Secure API with User Management.
- [ ] **Auth Service**: Implement Registration & Login logic.
- [ ] **Security**: Implement `bcrypt` password hashing.
- [ ] **Token**: Implement JWT generation and verification decorators (`@jwt_required`).
- [ ] **Validation**: Input validation middleware (Email format, required fields).
- [ ] **Testing**: Unit tests for Auth endpoints (success/fail scenarios).

### Phase 4: Machine Learning Engine Integration
**Goal**: Functional AI Service returning Predictions.
- [ ] **Integration**: Create `MLService` class in Python.
- [ ] **Model Implementation**:
  - Implement Baseline Models (Linear Regression).
  - Implement **Temporal Fusion Transformer** logic (using PyTorch/TensorFlow).
  - Implement **LSTM-DML (Double Machine Learning)** logic for causal inference (isolating behavior vs. emission impact).
- [ ] **Pipeline**: Build data preprocessing pipeline (StandardScaler, Imputation).
- [ ] **CodeCarbon**: Integrate `CodeCarbon` tracker into the inference pipeline.
- [ ] **API**: Connect `/api/predictions/calculate` to the ML Service.

### Phase 5: Behavioral & Recommendation Logic
**Goal**: 23-Type Nudge System & RL Optimizer.
- [ ] **Logic**: Implement Rule-Based Engine for initial recommendations.
- [ ] **Nudge Library**: Implement library of **23 predefined nudge types** (e.g., loss aversion, social comparison, implementation intentions).
- [ ] **Personalization**: Integration HEXACO profile data & TTM stage into recommendation selection.
- [ ] **RL Optimizer**: Implement Reinforcement Learning loop (Contextual Bandit) to optimize engagement.
- [ ] **API**: Implement `/api/recommendations` endpoints.

### Phase 6: Frontend - Dashboard & Core UI (Cognitive Design)
**Goal**: Responsive UI matching "Three-Panel" Design & implementing 7 Cognitive Principles.
- [ ] **Auth UI**: Login/Register Forms with error handling.
- [ ] **Layout**: Main Layout with Navigation and Sidebar.
- [ ] **Dashboard Panel 1**: Emissions Overview (using Chart.js).
  - *Principle 1*: **Temporal Comparison** (Sparklines with 30-day rolling avg).
  - *Principle 3*: **Proportional Impact** (Visualizing CO2e in "car miles" or "trees").
  - *Principle 7*: **Affective Engagement** (Emotive imagery for high-impact actions).
- [ ] **Dashboard Panel 2**: Behavior Matrix (Grid layout).
  - *Principle 2*: **Spatial Contextualization** (GIS-based neighborhood benchmarks).
  - *Principle 5*: **Goal Gradient** (Completion thermometers/progress bars).
- [ ] **Dashboard Panel 3**: Social Leaderboard & Simulation.
  - *Principle 4*: **Progressive Disclosure** (Drill-down views).
  - *Principle 6*: **Future Simulation** ("What-if" scenario modeling tool).
- [ ] **Forms**: Multi-step "Lifestyle Input" wizard with input validation.

### Phase 7: Frontend - State & Optimization
**Goal**: Fast, interactive experience (< 3s load).
- [ ] **State Management**: Implement **React Context API** for User/Data state.
- [ ] **API Integration**: Connect React components to Flask endpoints (Axios).
- [ ] **Error Handling**: Graceful UI for network errors/validation failures.
- [ ] **Responsive Check**: Verify layout on Mobile (375px) vs Desktop (1440px).

### Phase 8: Testing & Quality Assurance
**Goal**: Verify Technical Requirements.
- [ ] **Unit Testing**: Pytest for Backend (target >80% coverage).
- [ ] **Integration Testing**: Test full flow (Register -> Input -> Predict -> Result).
- [ ] **ML Validation**: Run test set against models to verify >85% accuracy.
- [ ] **Performance Testing**: Load test API (ensure <2s response).
- [ ] **Security Scan**: Check for dependencies vulnerabilities (`npm audit`, `pip-audit`).

### Phase 9: Deployment & Infrastructure
**Goal**: Production-ready Release.
- [ ] **Containerization**: Optimize Dockerfiles (Multistage builds).
- [ ] **CI/CD**: Setup GitHub Actions for Auto-Test on Push.
- [ ] **Hosting**: Deploy to Cloud (Render/AWS/Vercel).
- [ ] **Monitoring**: Setup Logging and Uptime monitoring.

### Phase 10: Final Documentation & Handover
**Goal**: Complete Project Artifacts.
- [ ] **API Docs**: Generate Swagger/OpenAPI documentation.
- [ ] **User Manual**: Write "How-To" guide for end-users.
- [ ] **Admin Guide**: Documentation for maintaining the ML models.
- [ ] **Final Report**: Project technical summary.

---

## 5. Success Criteria (Definition of Done)

### 5.1 Functional Criteria
- [ ] User can register, login, and stay logged in.
- [ ] User can input transport, diet, and energy data.
- [ ] System accurately calculates and displays carbon footprint.
- [ ] System provides at least 3 distinct personalized recommendations per session.
- [ ] Admin can update Emission Factors without code changes.

### 5.2 Non-Functional Criteria (Strict)
- [ ] **Accuracy**: ML Model achieves >85% accuracy on test data.
- [ ] **Latency**: "Enter Data" -> "See Result" completes in < 4 seconds total.
- [ ] **Sustainability**: Operational carbon cost < 100g CO2e/user/month (Verified by CodeCarbon).
- [ ] **Accessibility**: UI passes WCAG AA basic checks.
