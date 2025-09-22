## API Usage Examples

To get providers for a specific list of users:

```
GET {{url}}/provider?userNames=User 1,User 4,User 5
```

To get all providers:

```
GET {{url}}/provider
```

## Project Setup Instructions

1. **Rename Environment File**
	- Rename `.env.example` to `.env`.
	- You must provide valid PostgreSQL database credentials in the `.env` file.

2. **Install Dependencies**
	- Run:
	  ```sh
	  npm install
	  ```

3. **Build the Project**
	- Run:
	  ```sh
	  npm run build
	  ```

4. **Run Database Migrations**
	- Run:
	  ```sh
	  npm run typeorm:run-migrations
	  ```

5. **Start Development Server**
	- Run:
	  ```sh
	  npm run start:dev
	  ```
