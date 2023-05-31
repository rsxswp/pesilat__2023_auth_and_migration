# Travel API

1. run `npm i`
2. atur database config di bagian `app/config/configDatabase.json`
3. lalu jalankan `npm run "migrate:fresh --seed"` untuk migrate semua tabel dan mengisi data data pada tabel
4. lalu jalankan `npm start` untuk menjalankan project
5. import collection `thunder-collection_travel-api.json` ke postman atau thunder client

```json
{
  "Authorization" : "Bearer Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFkbWluIiwibmFtZSI6ImFkbWluIiwiYWxhbWF0IjoiSmFrYXJ0YSIsImVtYWlsIjoiYWRtaW5AZ21haWwuY29tIiwiaWF0IjoxNjg1NDM2NjA2LCJleHAiOjE2ODU1MjMwMDZ9.tMNt89-ouGs6YPZgLxyE36D04o8GJyvvinZ3Wqrc2eo"
}
```

