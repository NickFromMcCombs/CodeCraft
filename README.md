<div align="center">

# CodeCraft Intranet (Lab 6 – React Advanced)

Modern React + Vite application demonstrating Context API, MUI components, and full CRUD backed by a MySQL (AWS RDS) database.

</div>

## ✅ Assignment Requirement Coverage
| Requirement | Status |
|-------------|--------|
| Vite React app initialized | Done |
| Dependencies installed (React, MUI, React Router) | Done |
| Header + Footer components | Done |
| Dynamic welcome header via Context (textbox + button) | Done |
| Dark background + light sections | Done |
| Employee Management CRUD (Add/Edit/Delete) | Done (real DB) |
| Uses Context API (no prop drilling for welcome name & employees) | Done |
| Non‑blue header color & sticky footer with dynamic year | Done |
| Modern styling (validation, currency formatting, snackbars) | Done |

## ✨ Features
- Global theme (dark base, light content sections) with custom palette.
- Centered header with dynamic greeting: “Welcome <name> to Codecraft intranet”.
- Context-driven state: welcome name + employee data + loading/error states.
- Employee CRUD:
	- Fields: first name, last name, email, birthdate, salary.
	- Validation (required fields, email pattern, future date disallowed, numeric salary).
	- Currency formatted salaries (USD, right-aligned, tabular numerics).
	- Snackbar success & error feedback.
- Accessible table structure prepared for screen readers (could add a caption for further enhancement).
- Responsive layout (MUI breakpoints in header text sizing).

## 🧱 Tech Stack
| Layer | Tools |
|-------|-------|
| Frontend | React 19, Vite, React Router, MUI 6 |
| State | React Context API |
| Backend | Express, mysql2, dotenv, CORS |
| DB | AWS RDS MySQL |

## 🗂 Project Structure (Relevant)
```
src/
	components/ (Header, Footer)
	pages/ (Home, EmployeeManagement)
	context/ (AppContext)
	main.jsx (routing + theme + providers)
server/
	index.js (Express + CRUD endpoints)
```

## ⚙️ Environment Variables
Copy `.env.example` to `.env`:
```
PORT=4000
DB_HOST=database-1.cdw6ge5dlp5u.us-east-1.rds.amazonaws.com
DB_PORT=3306
DB_USER=admin
DB_PASSWORD=Timndbpw10!
DB_NAME=nickdb
VITE_API_URL=http://localhost:4000/api
```
`/.env` is git‑ignored. Do not commit real credentials to a public repo.

## 🗄 Database Setup (MySQL)
```sql
CREATE DATABASE IF NOT EXISTS nickdb;
USE nickdb;
CREATE TABLE IF NOT EXISTS Employees (
	id INT AUTO_INCREMENT PRIMARY KEY,
	first_name VARCHAR(100) NOT NULL,
	last_name VARCHAR(100) NOT NULL,
	email VARCHAR(150) NOT NULL,
	birthdate DATE NULL,
	salary INT DEFAULT 0,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- Optional uniqueness
-- ALTER TABLE Employees ADD UNIQUE KEY uq_email (email);
```

## 🚀 Running Locally
1. Install deps:
```bash
npm install
```
2. Start backend & frontend concurrently:
```bash
npm run dev:full
```
	 Or separately:
```bash
npm run server
npm run dev
```
3. Open: http://localhost:5173 (or whichever port Vite prints).

## 🔌 API Endpoints
| Method | Path | Purpose | Body |
|--------|------|---------|------|
| GET | /api/health | Health check | — |
| GET | /api/employees | List employees | — |
| POST | /api/employees | Create employee | { first_name, last_name, email, birthdate?, salary? } |
| PUT | /api/employees/:id | Update employee | Same as POST |
| DELETE | /api/employees/:id | Remove employee | — |

Responses: JSON. Errors return `{ error: string }` with appropriate HTTP status (400 / 500).

## ✅ Validation Rules (Client)
| Field | Rules |
|-------|-------|
| first_name | required |
| last_name | required |
| email | required + simple pattern |
| birthdate | optional, not in future |
| salary | optional, numeric >= 0 |

## 🧪 Manual Testing Checklist
- Add a valid employee → snackbar “Employee added”.
- Edit an employee → snackbar “Employee updated”.
- Delete an employee → snackbar “Employee deleted”.
- Invalid email → shows inline error, button disabled (after touch) or blocked.
- Future date → inline error.
- Reload page → previously added data persists from DB.

## 🐛 Debugging Tips
- If employees list empty: check server console & run `curl http://localhost:4000/api/health`.
- DB connect errors: verify security group (Inbound 3306 from your IP) & `.env` values.
- CORS errors: ensure frontend hitting `VITE_API_URL` that matches server port.
- 500 on POST: confirm table columns & types (ALTER TABLE if missing birthdate/salary).

## 🔒 Security Notes
- Rotate the DB password after class if stored in any shared repo.
- Avoid exposing `.env` in screenshots / commits.

## 🚧 Possible Enhancements (Not Required)
- Search/filter and column sorting.
- Pagination or infinite scroll.
- Role-based auth (admin vs viewer).
- React Query / SWR caching.
- Docker Compose with local MySQL.
- Unit tests (formatting & context) + integration test for CRUD.

## 🙌 Acknowledgements
Built as part of MIS374 Lab 6 (React Advanced). Incorporates Material UI and a simple Express + MySQL backend.

---
Feel free to extend this README with screenshots or additional reflections about debugging & prompt engineering (if required by your submission rubric).
