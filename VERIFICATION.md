# Dashboard API Integration Verification Guide

## Prerequisites

1. **Backend Server** must be running on `http://127.0.0.1:8000`
2. **Database** must be set up and accessible
3. **Frontend** environment variable configured

## Step 1: Set Up Environment Variable

Create a `.env` file in the frontend root directory (`SER515-Group1-Frontend-Repo/`) with:

```
VITE_BASE_URL=http://127.0.0.1:8000
```

Or the code will use `http://127.0.0.1:8000` as fallback if not set.

## Step 2: Start Backend Server

Navigate to backend directory and start the server:

```bash
cd SER515-Group1-Backend-Repo
# Activate your virtual environment if you have one
# For example: myenv\Scripts\activate (Windows)
uvicorn main:app --reload
```

The backend should be running on `http://127.0.0.1:8000`

You can verify by visiting: `http://127.0.0.1:8000/docs` (FastAPI Swagger UI)

## Step 3: Start Frontend Development Server

In a new terminal, navigate to frontend directory:

```bash
cd SER515-Group1-Frontend-Repo
npm install  # If dependencies not installed
npm run dev
```

The frontend should start on `http://localhost:5173` (or another port if 5173 is busy)

## Step 4: Verify Integration

### Test 1: Check Loading State
1. Open browser and navigate to `http://localhost:5173/dashboard`
2. You should see a **loading spinner** with "Loading dashboard..." message
3. This confirms the API call is being made

### Test 2: Verify Data Loading
1. After loading completes, check the browser console (F12 → Console tab)
2. Look for any errors
3. The dashboard should display task columns with data from the API
4. If no data exists, columns should be empty (no dummy data)

### Test 3: Test API Endpoint Directly
Open browser or use curl:

```bash
# Using curl
curl http://127.0.0.1:8000/stories

# Or visit in browser
http://127.0.0.1:8000/stories
```

You should see JSON response with stories array.

### Test 4: Test Error Handling
1. Stop the backend server
2. Refresh the dashboard page
3. You should see an **error message** with a "Retry" button
4. This confirms error handling is working

### Test 5: Test Creating New Story
1. Click the "+" button or "Create Idea" button
2. Fill in the form (title, description, assignee)
3. Click "Save Idea"
4. The dashboard should refresh and show the new story in the appropriate column
5. Check browser console for any errors

### Test 6: Check Network Tab
1. Open browser DevTools (F12)
2. Go to **Network** tab
3. Refresh the dashboard page
4. Look for a request to `/stories` endpoint
5. Check:
   - Status code should be `200` (success)
   - Response should contain stories data
   - Request URL should use the correct base URL

## Expected Behavior

✅ **Loading State**: Spinner appears when fetching data  
✅ **Success**: Dashboard displays stories from API in correct columns  
✅ **Error Handling**: Error message with retry button if API fails  
✅ **Auto-refresh**: Dashboard refreshes after creating new story  
✅ **No Console Errors**: Browser console should be clean (no red errors)

## Troubleshooting

### Issue: Loading spinner never stops
- **Check**: Backend server is running
- **Check**: API endpoint is accessible (`http://127.0.0.1:8000/stories`)
- **Check**: CORS is configured correctly in backend

### Issue: Empty dashboard
- **Check**: Database has stories data
- **Check**: API returns data (test with curl/browser)
- **Check**: Browser console for errors

### Issue: CORS errors
- **Check**: Backend CORS middleware includes frontend URL
- **Check**: Frontend is running on allowed origin (localhost:5173)

### Issue: Environment variable not working
- **Check**: `.env` file is in frontend root directory
- **Check**: Restart dev server after creating `.env` file
- **Check**: Variable name is `VITE_BASE_URL` (must start with `VITE_`)

## Quick Verification Checklist

- [ ] Backend server running on port 8000
- [ ] Frontend server running (usually port 5173)
- [ ] `.env` file created with `VITE_BASE_URL`
- [ ] Loading spinner appears on dashboard load
- [ ] Stories display correctly in columns
- [ ] Error handling works (test by stopping backend)
- [ ] Creating new story works and refreshes dashboard
- [ ] No console errors

