# Stock Market Dashboard - React and Django

This repository contains a Stock Market Dashboard built with React for the frontend and Django for the backend. The dashboard allows users to view stock market data and manage their watchlist of stocks.

## Installation

### Prerequisites
- Node.js and npm (Node Package Manager)
- Python and pip

### Frontend Setup
1. Clone the repository to your local machine:
   ```
   git clone <repository-url>
   ```
2. Navigate to the frontend-react directory:
   ```
   cd frontend-react
   ```
3. Install frontend dependencies:
   ```
   npm install
   ```
4. Start the frontend server:
   ```
   npm start
   ```
   This will start the client and you can access it at `http://localhost:3000`.

### Backend Setup
1. Navigate to the server directory:
   ```
   cd server
   ```
2. Install backend dependencies:
   ```
   pip install django djangorestframework django-cors-headers
   ```
3. Run the Django server:
   ```
   python manage.py runserver
   ```
   The Django server should be running at `http://localhost:8000`.

## Usage
- Upon successful setup, you can access the Stock Market Dashboard in your web browser.
- The dashboard provides features to view stock market data and manage a watchlist of stocks.
- Users can add new stocks to their watchlist and remove existing ones.
- By default, two stock symbols (IBM and MSFT) are added to the watchlist of a new user.

## Issues
The Stock Market API used in the project may have limitations, such as the inability to retrieve details about all stock symbols. To address this, default stock symbols are included in the watchlist of new users to ensure they have data to view on the dashboard.

