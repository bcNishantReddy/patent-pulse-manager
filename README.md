# Patent ERP

This is a Django-based Patent Management System. Follow the steps below to set up and run the project locally.

## Prerequisites

Before you begin, ensure you have the following installed:
- **[Python 3.8+](https://www.python.org/downloads/)**: Required to run the project.
- **[Git](https://git-scm.com/downloads)**: To clone the repository.
- **[PostgreSQL](https://www.postgresql.org/download/)**: The database engine.
- **[pgAdmin](https://www.pgadmin.org/download/)** (optional): A GUI tool to manage PostgreSQL.
- A terminal or command-line interface (e.g., Command Prompt on Windows, Terminal on macOS/Linux).

## Step 1: Clone the Repository

1. Open your terminal and navigate to the directory where you want to store the project:
   ```bash
   cd /path/to/your/directory
   ```
2. Clone the repository from GitHub (replace `yourusername` with the actual GitHub username):
   ```bash
   git clone [https://github.com/yourusername/patent_erp.git](https://github.com/bcNishantReddy/patent-pulse-manager.git)
   ```

## Step 2: Set Up PostgreSQL Database

1. Install PostgreSQL if not already installed. Download it from [PostgreSQL](https://www.postgresql.org/download/).
2. Launch **pgAdmin** or use the `psql` command-line tool.
3. Create the database and user by running the following SQL commands:
   ```sql
   -- Create the database
   CREATE DATABASE myproject_db;
   
   -- Create a user with a password
   CREATE USER myuser WITH PASSWORD 'mypassword';
   
   -- Grant privileges to the user
   GRANT ALL PRIVILEGES ON DATABASE myproject_db TO myuser;
   
   -- Connect to the database
   \c myproject_db
   
   -- Grant schema permissions
   GRANT USAGE ON SCHEMA public TO myuser;
   GRANT CREATE ON SCHEMA public TO myuser;
   ```
4. Verify the setup by running:
   ```sql
   \dn
   ```
   You should see the `public` schema listed.

## Step 3: Set Up a Virtual Environment

1. Create a virtual environment in the project directory:
   - On Windows:
     ```bash
     python -m venv venv
     ```
   - On macOS/Linux:
     ```bash
     python3 -m venv venv
     ```
2. Activate the virtual environment:
   - On Windows:
     ```bash
     venv\Scripts\activate
     ```
   - On macOS/Linux:
     ```bash
     source venv/bin/activate
     ```
   You should see `(venv)` in your terminal prompt.

## Step 4: Install Dependencies

Ensure you’re in the `mysite` directory where `requirements.txt` is located. Then, install dependencies:
```bash
pip install -r requirements.txt
```
If `requirements.txt` is missing, ask the project owner for it. Common dependencies might include:
```text
Django>=4.0
psycopg2-binary>=2.9
```

## Step 5: Configure Django Settings

1. Open `mysite/settings.py` in a text editor.
2. Update the `DATABASES` setting to use PostgreSQL:
   ```python
   DATABASES = {
       'default': {
           'ENGINE': 'django.db.backends.postgresql',
           'NAME': 'myproject_db',
           'USER': 'myuser',
           'PASSWORD': 'mypassword',
           'HOST': 'localhost',
           'PORT': '5432',
       }
   }
   ```
3. Save the file.

## Step 6: Apply Migrations

Run the following commands to set up the database schema:
```bash
python manage.py makemigrations
python manage.py migrate
```

(Optional) Create a superuser to access the Django admin:
```bash
python manage.py createsuperuser
```
Follow the prompts to set a username, email, and password.

## Step 7: Run the Development Server

Start the Django development server:
```bash
python manage.py runserver
```

Open a web browser and go to [http://127.0.0.1:8000/](http://127.0.0.1:8000/) to see the app running.

## Troubleshooting

- **PostgreSQL Connection Error:** Ensure PostgreSQL is running (via pgAdmin or `services.msc` on Windows) and the credentials match `settings.py`.
- **Module Not Found:** If a package is missing, install it with:
  ```bash
  pip install <package-name>
  ```
  Then update `requirements.txt` with:
  ```bash
  pip freeze > requirements.txt
  ```
- **Port Conflict:** If port `8000` is in use, run:
  ```bash
  python manage.py runserver 8080
  ```
