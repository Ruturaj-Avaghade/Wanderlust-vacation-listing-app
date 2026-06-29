# 🐞 Wanderlust Debug Notes

## 1. Mongoose buffering timed out

### Error

Operation `listings.deleteMany()` buffering timed out after 10000ms

### Cause

Database connection was not established before running `deleteMany()`.

### Fix

- Load `.env`
- Connect using `await mongoose.connect(dbUrl)`
- Run `initDB()` only after the connection succeeds.

---

## 2. `process.env.ATLASDB_URL` is `undefined`

### Error

`process.env.ATLASDB_URL === undefined`

### Cause

`.env` was not loaded in `init/index.js`.

### Fix

- Load `.env` in `init/index.js`

```javascript
require("dotenv").config({ path: "./.env" });
```

---

## 3. Invalid scheme, expected connection string to start with "mongodb://" or "mongodb+srv://"

### Error

Invalid scheme, expected connection string to start with "mongodb://" or "mongodb+srv://"

### Cause

Passed `"dbUrl"` (string) instead of `dbUrl` (variable), or `dbUrl` was `undefined`.

### Fix

```javascript
await mongoose.connect(dbUrl);
```

Not

```javascript
await mongoose.connect("dbUrl");
```

Also verify that `process.env.ATLASDB_URL` is defined.

---

## 3. Seed Script (`init/index.js`)

### Checklist

- Load `.env`
- Connect to MongoDB
- Wait for connection
- Run database queries
- Close the connection (optional)
