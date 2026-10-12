# EazyTicks - Authentication Guide

## Table of Contents
1. [Overview](#overview)
2. [Authentication Architecture](#authentication-architecture)
3. [Signup Flow](#signup-flow)
4. [Login Flow](#login-flow)
5. [Cookie Management](#cookie-management)
6. [Bearer Token & Authorization](#bearer-token--authorization)
7. [Session & Token Expiry](#session--token-expiry)
8. [Logout Flow](#logout-flow)
9. [Protected Routes & Middleware](#protected-routes--middleware)
10. [Error Handling](#error-handling)

---

## Overview

EazyTicks implements a **JWT-based (JSON Web Token) authentication system** with cookie storage. The authentication flow uses:
- **JWT tokens** for stateless authentication
- **HttpOnly cookies** for secure token storage
- **Role-based access control** (USER, ADMIN/Seller)
- **Bearer token authentication** for API requests
- **ReCAPTCHA verification** for login security

### Key Components:
- **AppContext** - Main authentication state management
- **AuthContext** - Additional authentication state (if used)
- **useCookie Hook** - Cookie operations
- **axiosAuthRequest** - Automatic Bearer token injection
- **BusinessRequests** - API endpoint functions

---

## Authentication Architecture

### State Management Flow

```
User Action (Signup/Login)
    ↓
Component (SignupPage, LoginForm)
    ↓
API Request (registerUserRequest, loginUser)
    ↓
Backend Response (user data + token)
    ↓
AppContext (setUser function)
    ├─ Parse JWT Token (jwtDecode)
    ├─ Encode & Store in Cookie (setCookie)
    ├─ Dispatch state updates (SET_USER, SET_ADMIN)
    └─ Fetch User Profile (fetchUserProfile)
    ↓
Global state updated
    ↓
Components re-render with isLoggedIn = true
```

### AppContext State Structure

```tsx
interface AppContextState {
  user: any;                          // User object from login response
  userProfile: UserProfile | null;    // Detailed user profile data
  isLoggedIn: boolean;                // Authentication status
  isAdmin: boolean;                   // Role check (Seller/Staff = admin)
  isLoading: boolean;                 // Loading state during auth operations
  tokenExpired: boolean;              // Token expiry flag
  ...otherFields
}
```

---

## Signup Flow

### 1. Signup Component Structure

**Location:** `src/app/account/signup/_components/SignupPage.tsx`

The signup page includes:
- **Account type selection** - "Individual" or "Organizer"
- **Multi-step form** - Different fields based on account type
- **RegisterForm component** - Handles individual user signup
- **OrganizerForm component** - Handles organizer-specific signup

**Component Hierarchy:**
```
SignupPage (Main container)
├── Account Type Selector
│   ├── "Individual" Button
│   └── "Organizer" Button
├── Step 0: Account Selection
│   ├── RegisterForm (for individuals)
│   └── OrganizerForm (for organizers)
└── Step 1: Additional Details
    └── Follow-up form (if multi-step)
```

### 2. Signup Form Fields

**Individual/User Signup:**
```tsx
{
  firstName: string;        // User's first name
  lastName: string;         // User's last name
  email: string;            // Email address
  password: string;         // User password
  confirmPassword: string;  // Password confirmation
  phoneNumber?: string;     // Optional phone
}
```

**Organizer Signup:**
```tsx
{
  fName: string;              // Contact person first name
  lName: string;              // Contact person last name
  email: string;              // Business email
  password: string;           // Account password
  confirmPassword: string;    // Password confirmation
  organizerName: string;      // Company/organization name
  address: string;            // Organization address
  description?: string;       // Organization description
}
```

**Note:** Organizer form uses `fName` and `lName` (not `firstName` and `lastName`). These are transformed into a nested object format before sending to backend.

### 3. Signup API Request

**Function:** `registerUserRequest(data)`  
**Location:** `src/helpers/businessRequests.js`

```typescript
export const registerUserRequest = async (data) => {
  try {
    const response = await fetch(`${baseURL}/Auth/Register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await response?.json();
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};
```

**Request Endpoint:** `POST ${baseURL}/Auth/Register`  
**Content-Type:** `application/json`

### 4. Signup Response Structure

**On Success:**
```json
{
  "succeeded": true,
  "messages": ["Registration successful"],
  "data": {
    "id": "user-uuid",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "tokenExpiryTime": "2026-03-08T12:00:00Z",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "phoneNumber": "+1234567890",
    "isEmailVerified": false
  }
}
```

**On Error:**
```json
{
  "succeeded": false,
  "messages": ["Email already exists", "Password too weak"],
  "data": null
}
```

### 5. Signup Form Validation

**Validation Library:** `react-hook-form` with `zod` schema

```tsx
const schema = z.object({
  firstName: z.string().min(2, "First name required"),
  lastName: z.string().min(2, "Last name required"),
  email: z.string().email("Invalid email"),
  password: z.string()
    .min(6, "Password must be 6+ characters")
    .regex(/[A-Z]/, "Must contain uppercase")
    .regex(/[0-9]/, "Must contain number"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});
```

---

## Login Flow

### 1. Login Component

**Location:** `src/app/account/_components/LoginForm.tsx`

**Key Features:**
- Email and password input fields
- ReCAPTCHA verification (v3)
- Password visibility toggle
- Error message display
- Redirect after login success

### 2. Login Process - Step by Step

#### Step 1: Form Submission
```tsx
const onSubmit = async (values: formType) => {
  // values = { email, password }
  
  // User fills in email and password
  // Form validation runs automatically (react-hook-form)
};
```

#### Step 2: ReCAPTCHA Verification
```tsx
// Generate ReCAPTCHA token
const token = await captchaRef.current?.executeAsync();

if (!token) {
  setErrorMessage(["Captcha verification failed"]);
  return;
}
```

**Why ReCAPTCHA?** - Prevents brute force attacks and bot login attempts

#### Step 3: Create Login Payload
```tsx
const payload = {
  email: "user@example.com",
  password: "password123",
  token: recaptchaToken,  // ReCAPTCHA token from backend verification
};
```

#### Step 4: Send Login Request
```tsx
// Calls AppContext logIn function
const response = await logIn(payload);
```

**Function:** `logIn(values)`  
**Location:** `src/context/AppContext.tsx`

```typescript
const logIn = async (values: loginData) => {
  try {
    const { data } = await LoginUser(values);
    
    if (data?.succeeded === true) {
      setUser(data?.data, true);  // Parse response & store user
    } else {
      // Handle error
      console.log("Error>>", data);
    }
    return Promise.resolve(data);
  } catch (error) {
    return Promise.reject("Failed to login!");
  }
};
```

#### Step 5: Backend API Call
**Function:** `LoginUser(data)`  
**Location:** `src/helpers/businessRequests.js`

```typescript
export async function LoginUser(data) {
  return await axios.post(
    process.env.NEXT_PUBLIC_API_URL + "/api/Auth/Login",
    data
  );
}
```

**Endpoint:** `POST /api/Auth/Login`  
**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "token": "recaptcha_token"
}
```

### 3. Login Response

**Successful Response:**
```json
{
  "succeeded": true,
  "messages": ["Login successful"],
  "data": {
    "id": "user-12345",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "phoneNumber": "+1234567890",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTYiLCJuYW1lIjoiSm9obiBEb2UiLCJyb2xlIjoiVXNlciIsImlhdCI6MTUxNjIzOTAyMn0...",
    "tokenExpiryTime": "2026-03-08T12:00:00Z",
    "role": "USER"
  }
}
```

**Failed Response:**
```json
{
  "succeeded": false,
  "messages": ["Invalid email or password"],
  "data": null
}
```

---

## Cookie Management

### useCookie Hook

**Location:** `src/hooks/useCookie.tsx`

The `useCookie` hook provides cookie management functions:

#### 1. getCookie()

**Purpose:** Retrieve authentication cookie from browser

```typescript
const getCookie = useCallback(() => {
  const nameLenPlus = cookieName.length + 1;
  return (
    document.cookie
      .split(";")
      .map((c) => c.trim())
      .filter(
        (cookie) => cookie.substring(0, nameLenPlus) === `${cookieName}=`
      )
      .map((cookie) =>
        decodeURIComponent(cookie.substring(nameLenPlus))
      )[0] || null
  );
}, []);
```

**Returns:** Parsed cookie value (user object with token) or `null`

**Example:**
```javascript
const cookie = getCookie();
// Returns: { token: "jwt-token", isAdmin: false, tokenExpiryTime: "..." }
```

#### 2. setCookie(value)

**Purpose:** Store authentication data in browser cookie (7-day expiration)

```typescript
const setCookie = useCallback((value: any) => {
  const expires = new Date(
    Date.now() + 7 * 24 * 60 * 60 * 1000  // 7 days
  ).toUTCString();
  
  const stringValue = encodeURIComponent(JSON.stringify(value));
  
  document.cookie = `${cookieName}=${stringValue}; expires=${expires}; path=/; ${COOKIE_DOMAIN} Secure; SameSite=None`;
}, []);
```

**Cookie Attributes:**
| Attribute | Value | Purpose |
|-----------|-------|---------|
| `expires` | 7 days | Cookie validity duration |
| `path=/` | Root path | Cookie available site-wide |
| `Secure` | HTTPS only | Secure transmission |
| `SameSite=None` | Cross-site allowed | Allow cross-site requests |

**Usage:**
```javascript
const userObj = {
  token: "jwt-token-here",
  isAdmin: false,
  tokenExpiryTime: "2026-03-08T12:00:00Z"
};

setCookie(userObj);  // Stores in browser cookie
```

#### 3. deleteCookie()

**Purpose:** Remove authentication cookie

```typescript
const deleteCookie = useCallback(() => {
  document.cookie = `${cookieName}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT; ${COOKIE_DOMAIN}`;
}, []);
```

**Usage:** Called during logout or session expiry

#### 4. clearAllCookies()

**Purpose:** Clear all cookies and localStorage keys

```typescript
const clearAllCookies = useCallback(() => {
  const cookies = document.cookie.split(";");
  const domain = window.location.hostname;
  const path = window.location.pathname;

  cookies.forEach((cookie) => {
    const eqPos = cookie.indexOf("=");
    const name = eqPos > -1 ? cookie.slice(0, eqPos).trim() : cookie.trim();

    if (name) {
      // Remove from root path
      document.cookie = `${name}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT; Secure; SameSite=None`;
      
      // Remove from current path
      document.cookie = `${name}=; Path=${path}; Domain=${domain}; Expires=Thu, 01 Jan 1970 00:00:01 GMT; Secure; SameSite=None`;
    }
  });

  // Clear localStorage
  if (typeof window !== "undefined") {
    localStorage.removeItem("eztUser");
  }
}, []);
```

**Usage:** Called on complete logout or when auth token is invalid

### Cookie Configuration

**Cookie Name:** Defined in `src/lib/utils.ts` (line 13)
```typescript
export const cookieName = "eztUser";
```

**Cookie Domain:** Defined in `src/lib/utils.ts` (lines 14-15) - **Conditional based on environment**
```typescript
export const COOKIE_DOMAIN =
  process.env.NODE_ENV === "production" ? "domain=eazyticks.com;" : "";
```

**Important:** In production, domain is set to `eazyticks.com`. In development, it's empty string (localhost). This ensures cookies work correctly across different environments.

---

## Bearer Token & Authorization

### What is a Bearer Token?

A **Bearer token** is a token in the `Authorization` HTTP header that validates the user's identity for API requests.

**Format:**
```
Authorization: Bearer <jwt-token>
```

### How Bearer Token is Used

#### 1. Auto-Injection via axiosAuthRequest

**Location:** `src/helpers/axiosAuthRequest.js`

```typescript
import axios from "axios";

const axiosAuthRequest = axios.create({});

// Request Interceptor - Automatically adds Bearer token
axiosAuthRequest.interceptors.request.use(function (config) {
  const user = JSON.parse(fetchCookie());  // Get user from cookie
  
  if (user) {
    // Add Authorization header with Bearer token
    config.headers.Authorization = `Bearer ${user?.token}`;
  }
  
  return config;
});

// Response Interceptor - Catches 401 errors
axiosAuthRequest.interceptors.response.use(
  function (response) {
    return response;  // Success response
  },
  function (error) {
    if (error?.response?.status === 401) {
      // Token expired or invalid
      console.log("Interceptor error", error);
      // Optionally redirect to login
    }
    return Promise.reject(error);
  }
);

export default axiosAuthRequest;
```

**How It Works:**
1. Before sending any request, the interceptor runs
2. Retrieves user data from cookie (including JWT token)
3. Adds `Authorization: Bearer <token>` to request headers
4. Sends request to backend with token
5. Backend validates token and processes request

#### 2. API Calls Using Bearer Token

**Example: Getting user profile**

```typescript
// Function in businessRequests.js
export async function getUserProfile() {
  return await axiosAuthRequest.get(
    process.env.NEXT_PUBLIC_API_URL + "/api/auth/userinfo"
  );
}
```

**What Happens:**
```
1. axiosAuthRequest.get() is called
   ↓
2. Request interceptor automatically adds:
   Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ↓
3. Request sent to backend:
   GET /api/auth/userinfo
   Headers: {
     "Authorization": "Bearer <token>",
     "Content-Type": "application/json"
   }
   ↓
4. Backend validates token
   ↓
5. If valid → Returns user data
   If invalid → Returns 401 error
```

#### 3. Token Validation

**Backend receives:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTYiLCJuYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE2MDAwMDB9.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
```

**Backend actions:**
1. Extracts token from header
2. Validates signature using secret key
3. Checks token expiry time
4. Extracts user claims (id, email, role, etc.)
5. Returns 401 if token invalid/expired
6. Proceeds if valid

#### 4. Authenticated API Calls Examples

**Authenticated requests (use `axiosAuthRequest`):**
```javascript
// Profile
export async function getUserProfile() {
  return await axiosAuthRequest.get(
    `/api/auth/userinfo`
  );
}

// Wishlist
export async function getWishlist() {
  return await axiosAuthRequest(`/api/wishlist`);
}

// Follow Organizer
export async function FollowOrganizer(orgId) {
  return await axiosAuthRequest(
    `/api/UserInfo/followings/follow?orgId=${orgId}`
  );
}

// Place Order
export async function placeTheOrder(order) {
  return await axiosAuthRequest.post(
    `/api/checkout`,
    order
  );
}
```

**Unauthenticated requests (use regular `axios`):**
```javascript
// Login (no token needed)
export async function LoginUser(data) {
  return await axios.post(
    `/api/Auth/Login`,
    data
  );
}

// Browse Events (public)
export async function getCategory(name, page = 1) {
  const query = `${baseURL}/Event/category?categoryName=${name}&pageNo=${page}`;
  return await axios.get(query);
}
```

### JWT Token Structure

A JWT token consists of 3 parts separated by dots:

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTYiLCJuYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE2MDAwMDB9.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
│                              │                                                    │
Header (algorithm & type)      Payload (user claims)                              Signature
```

**Decoded Payload Example:**
```json
{
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier": "user-12345",
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress": "user@example.com",
  "http://schemas.microsoft.com/ws/2008/06/identity/claims/role": "User",
  "iat": 1600000000,
  "exp": 1600086400
}
```

**Token Decoding in Frontend:**
```typescript
import { jwtDecode } from "jwt-decode";

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...";
const decoded = jwtDecode(token);

console.log(decoded);
// {
//   "http://schemas.microsoft.com/ws/2008/06/identity/claims/role": "User",
//   "iat": 1600000000,
//   "exp": 1600086400
// }

// Check if user is admin/seller
const role = decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
if (role === "Seller" || role === "Staff") {
  // User is admin
}
```

---

## Session & Token Expiry

### Token Expiry Handling

**Utility Function:** `isTokenExpired()` in `src/lib/utils.ts` (line 100)

```typescript
export const isTokenExpired = (userToken: User): boolean => {
  const currentTime = new Date();
  const tokenExpiryTime = new Date(userToken?.tokenExpiryTime);
  // Compare the current time with the token expiry time
  return currentTime > tokenExpiryTime;
};
```

**Note:** The function takes the entire `User` object and extracts `tokenExpiryTime` from it, not just the time string.

### Token Refresh Logic

**In AppContext:**
```typescript
const startTkLoading = (value: boolean) => {
  dispatch({
    type: "SET_TKlOADING",
    payload: value,
  });
};

// Check token expiry during critical operations
const checkTokenExpiry = () => {
  const cookie = fetchCookie();
  if (cookie && isTokenExpired(cookie.tokenExpiryTime)) {
    // Token expired - redirect to login
    logout();
  }
};
```

### Session Validation on App Load

**In Index.tsx (Root component):**
```typescript
useEffect(() => {
  // On app load, check if user is still authenticated
  checkAuth();
}, []);
```

---

## Logout Flow

### Logout Function (line 264)

```typescript
const logout = async () => {
  // 1. Clear user from context
  await setUser(null, false);
  
  // 2. Clear admin flag
  dispatch({
    type: "SET_ADMIN",
    payload: false,
  });
  
  // 3. Clear user profile
  dispatch({
    type: "SET_USER_PROFILE",
    payload: null,
  });
  
  // 4. Remove authentication cookie
  deleteCookie();
  
  // 5. Refresh page to update all components
  router.refresh();
};
```

**Important Note:** The logout function uses `deleteCookie()` to remove the authentication cookie. The `deleteCookie()` utility function removes the `eztUser` cookie from the browser. For complete cleanup, consider using `clearAllCookies()` hook method which clears all cookies AND localStorage keys.outer.refresh();
};
``` (SET_USER, SET_ADMIN, SET_USER_PROFILE)
2. **Cookie Deletion** - `eztUser` authentication cookie removed from browser via `deleteCookie()`
3. **Token Removal** - Bearer token no longer available for authenticated API requests
4. **Page Refresh** - `router.refresh()` called to update server components and re-render with `isLoggedIn = false`
5. **Result** - User sees public pages only, protected routes require re-login global context
2. **Cookie Deletion** - Authentication cookie removed from browser
3. **Token Removal** - Bearer token no longer available
4. **Page Refresh** - Components re-render with `isLoggedIn = false`
5. **Redirect** - User redirected to home or login page

### Usage:

```typescript
import useApp from "@/context/useApp";

function MyComponent() {
  const { logout } = useApp();
  
  return (
    <button onClick={logout}>
      Logout
    </button>
  );
}
```

---

## Protected Routes & Middleware

### Middleware

**Location:** `src/middleware.ts`

Runs on every request to check authentication before allowing access:

```typescript
import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("eztAuth");
  const pathname = request.nextUrl.pathname;
  
  // Routes that require authentication
  const protectedRoutes = ["/dashboard", "/account/profile", "/checkout"];
  
  if (protectedRoutes.some(route => pathname.startsWith(route))) {
    if (!token) {
      // No token - redirect to login
      return NextResponse.redirect(new URL("/account/signin", request.url));
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/account/:path*",
    "/checkout/:path*",
  ],
};
```

### Protected Component Pattern

**Protecting components:**

```typescript
"use client";
import useApp from "@/context/useApp";
import LoginModal from "@/components/LoginModal";
import { useState } from "react";

function ProtectedFeature() {
  const { isLoggedIn, user } = useApp();
  const [showLogin, setShowLogin] = useState(false);
  
  if (!isLoggedIn) {
    return (
      <>
        <button onClick={() => setShowLogin(true)}>
          Access This Feature
        </button>
        <LoginModal open={showLogin} onClose={() => setShowLogin(false)} />
      </>
    );
  }
  
  return (
    <div>
      <p>Welcome, {user?.firstName}!</p>
      {/* Protected content here */}
    </div>
  );
}
```

---

## Error Handling

### Common Authentication Errors

#### 1. Invalid Credentials

**Response from Backend:**
```json
{
  "succeeded": false,
  "messages": ["Invalid email or password"],
  "statusCode": 400
}
```

**Handling in Component:**
```typescript
const onSubmit = async (values) => {
  const response = await logIn(values);
  
  if (!response?.succeeded) {
    setErrorMessage(response?.messages);  // Display error to user
  }
};
```

#### 2. Token Expired

**axiosAuthRequest Response Interceptor:**
```typescript
axiosAuthRequest.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error?.response?.status === 401) {
      // Token expired or invalid
      // Logout and redirect to login
      window.location.href = "/account/signin";
    }
    return Promise.reject(error);
  }
);
```

#### 3. Email Already Exists (During Signup)

**Response:**
```json
{
  "succeeded": false,
  "messages": ["An account with this email already exists"],
  "statusCode": 400
}
```

**Validation:**
```typescript
// Show error and suggest forgot password link
if (response?.messages?.includes("already exists")) {
  setErrorMessage("Email already registered. Try signing in instead.");
}
```

#### 4. ReCAPTCHA Verification Failed

**Handling:**
```typescript
const token = await captchaRef.current?.executeAsync();

if (!token) {
  setErrorMessage(["ReCAPTCHA verification failed. Please try again."]);
  return;
}

captchaRef.current.reset();
```

#### 5. Password Too Weak

**Response:**
```json
{
  "succeeded": false,
  "messages": [
    "Password must be at least 8 characters",
    "Password must contain uppercase letters",
    "Password must contain numbers",
    "Password must contain special characters"
  ]
}
```

### Error Recovery

**Logout on Authentication Error:**
```typescript
// In any request interceptor or error handler
const handleAuthError = async () => {
  const { logout } = useAppContext();
  await logout();
  router.push("/account/signin?error=session_expired");
};
```

---

## Complete Authentication Flow Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                     USER AUTHENTICATION FLOW                 │
└─────────────────────────────────────────────────────────────┘

                    ┌─────────────────┐
                    │   User Opens    │
                    │   Signup/Login  │
                    └────────┬────────┘
                             │
                ┌────────────┴────────────┐
                │                         │
        ┌───────▼─────────┐      ┌──────▼──────────┐
        │   SIGNUP FLOW   │      │   LOGIN FLOW    │
        └───────┬─────────┘      └──────┬──────────┘
                │                       │
                │ Enter user details    │ Enter email & password
                │ (name, email, pass)   │ Execute ReCAPTCHA
                │                       │
                ▼                       ▼
        ┌───────────────────┐   ┌─────────────────────┐
        │ registerUserReq   │   │  ReCAPTCHA Token    │
        │ POST /Auth/Reg    │   │  (Bot protection)   │
        └────────┬──────────┘   └────────┬────────────┘
                 │                       │
                 │                       ▼
                 │              ┌──────────────────┐
                 │              │  LoginUser()     │
                 │              │  POST /Auth/Login│
                 │              └────────┬─────────┘
                 │                       │
                 └───────────┬───────────┘
                             │
                      ┌──────▼──────────┐
                      │  Backend Auth   │
                      │  Validation     │
                      └────────┬────────┘
                               │
                    ┌──────────┴──────────┐
                    │                     │
            ┌───────▼─────┐      ┌────────▼──────┐
            │   Invalid   │      │    Valid      │
            │ Credentials │      │ Credentials   │
            └──────┬──────┘      └────────┬──────┘
                   │                      │
            Show Error Message    Return User + Token
                   │                      │
                   │                      ▼
                   │           ┌─────────────────────┐
                   │           │  setUser() Called   │
                   │           │  AppContext         │
                   │           └────────┬────────────┘
                   │                    │
                   │            ┌───────▼───────────┐
                   │            │  jwtDecode Token  │
                   │            │  Check Role       │
                   │            │  (Admin/User)     │
                   │            └────────┬──────────┘
                   │                     │
                   │            ┌────────▼──────────┐
                   │            │  setCookie()      │
                   │            │  Store in Cookie  │
                   │            │  (7-day expiry)   │
                   │            └────────┬──────────┘
                   │                     │
                   │            ┌────────▼──────────┐
                   │            │ fetchUserProfile()│
                   │            │ Get full profile  │
                   │            └────────┬──────────┘
                   │                     │
                   │            ┌────────▼──────────┐
                   │            │ Update State      │
                   │            │ isLoggedIn = true │
                   │            │ user = userData   │
                   │            └────────┬──────────┘
                   │                     │
                   │                     ▼
                   │           ┌──────────────────────┐
                   │           │ Components Re-render │
                   │           │ With Auth State      │
                   │           └──────────┬───────────┘
                   │                      │
                   │                      ▼
                   │           ┌──────────────────────┐
                   │           │ Redirect to Home/    │
                   │           │ Dashboard            │
                   │           └──────────────────────┘
                   │
                   ▼
           ┌────────────────┐
           │  Retry Login   │
           │  Or Signup     │
           └────────────────┘
```

---

## Key Files Reference

| File | Purpose | Key Functions |
|------|---------|----------------|
| `src/context/AppContext.tsx` | Main auth context | `logIn()`, `logout()`, `setUser()`, `fetchUserProfile()` |
| `src/context/AuthContext.tsx` | Auth state management | `checkAuth()`, `useAuth()` |
| `src/hooks/useCookie.tsx` | Cookie operations | `getCookie()`, `setCookie()`, `deleteCookie()`, `clearAllCookies()` |
| `src/hooks/useLocalStorage.tsx` | LocalStorage management | Storage operations for preferences |
| `src/helpers/axiosAuthRequest.js` | Axios interceptors | Auto Bearer token injection |
| `src/helpers/businessRequests.js` | API endpoint functions | `LoginUser()`, `registerUserRequest()`, `getUserProfile()` |
| `src/app/account/_components/LoginForm.tsx` | Login UI component | Login form with email, password, ReCAPTCHA validation |
| `src/app/account/signup/_components/RegisterForm.tsx` | Individual signup | signup with firstName, lastName, email, password |
| `src/app/account/signup/_components/OrganizerForm.tsx` | Organizer signup | Signup with fName, lName, organizerName, address, description |
| `src/app/account/signup/_components/SignupPage.tsx` | Signup container | Account type selection (Individual/Organizer) |
| `src/lib/utils.ts` | Utility functions | `fetchCookie()` (line 45), `isTokenExpired()` (line 100), `deleteCookie()` (line 55), `cookieName` (line 13), `COOKIE_DOMAIN` (lines 14-15) |
| `src/middleware.ts` | Route protection | Route authentication validation |

---

## Best Practices

### 1. **Always Use axiosAuthRequest for Authenticated Calls**
```typescript
// ✅ Correct
export async function getUserProfile() {
  return await axiosAuthRequest.get(`/api/auth/userinfo`);
}

// ❌ Avoid
export async function getUserProfile() {
  return await axios.get(`/api/auth/userinfo`);  // Missing token
}
```

### 2. **Check Authentication Status Before Rendering Protected Content**
```typescript
// ✅ Correct
function Dashboard() {
  const { isLoggedIn, user } = useApp();
  
  if (!isLoggedIn) {
    return <LoginModal />;
  }
  
  return <DashboardContent />;
}
```

### 3. **Handle Token Expiry Gracefully**
```typescript
// ✅ Show user-friendly message and redirect to login
if (error?.response?.status === 401) {
  setToaster("info", "Your session has expired. Please log in again.");
  logout();
  router.push("/account/signin");
}
```

### 4. **Validate User Input Before Sending**
```typescript
// ✅ Use react-hook-form + zod for validation
const schema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Too short"),
});

// Apply with zodResolver in useForm
```

### 5. **Secure Sensitive Operations**
```typescript
// ✅ Always verify ReCAPTCHA before sensitive operations
const token = await captchaRef.current?.executeAsync();
if (!token) {
  return; // ReCAPTCHA failed
}
```

### 6. **Clear Cookies on Logout**
```typescript
// ✅ Always clear all cookies and localStorage
const logout = async () => {
  clearAllCookies();  // Comprehensive cleanup
  localStorage.removeItem("eztUser");
  router.refresh();
};
```

---

## Troubleshooting

### Problem: User Still Logged In After Logout
**Solution:** Ensure `clearAllCookies()` is called in logout function, not just `deleteCookie()`

### Problem: Bearer Token Not Being Sent
**Solution:** Ensure you're using `axiosAuthRequest` instead of `axios` for authenticated calls

### Problem: ReCAPTCHA Always Fails
**Solution:** Check ReCAPTCHA key in `.env.local`, ensure it matches backend configuration

### Problem: Token Expired but User Still Has Access
**Solution:** Implement token refresh middleware or check expiry before each request

### Problem: Mixed Authentication State
**Solution:** Use single source of truth (AppContext), avoid storing auth data in multiple places

---

## Helper Functions for Authentication

### fetchClient Helper

**Location:** Used in `src/context/AppContext.tsx` for server-side authenticated requests

**Purpose:** Wrapper around fetch API that automatically includes Bearer token in Authorization header for authenticated HTTPS requests to the backend API.

```typescript
// Usage in fetchUserProfile:
export const fetchUserProfile = async () => {
  try {
    const response = await fetchClient(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth/userinfo`
    );
    if (response.ok) {
      const userProfileData = await response.json();
      return userProfileData;
    }
  } catch (error) {
    console.error("Error fetching user profile:", error);
	// On 401: logout is called, session expires
    return null;
  }
};
```

### fetchCookie Utility

**Location:** `src/lib/utils.ts` (line 45)

**Purpose:** Extracts and parses the `eztUser` authentication cookie from `document.cookie`

```typescript
export const fetchCookie = () => {
  const cookieValue = document.cookie
    .split("; ")
    .find((row) => row.startsWith(cookieName + "="))
    ?.split("=")[1];
  
  return cookieValue ? decodeURIComponent(cookieValue) : null;
};
```

**Usage:** Called by axios interceptor (`axiosAuthRequest`) to extract token for Bearer injection

## Best Practices & Implementation Notes

### Form Field Naming Conventions

The project uses different field naming conventions depending on signup type:

**Individual User (RegisterForm):**
- Uses camelCase: `firstName`, `lastName`
- Simple flat structure sent to API
- Location: `src/app/account/signup/_components/RegisterForm.tsx`

**Organizer/Business (OrganizerForm):**
- Uses abbreviated camelCase: `fName`, `lName`
- Transformed into nested object before API call:
  ```typescript
  {
    user: { fName, lName, email, password },
    organization: { organizerName, address, description },
    token: recaptchaToken
  }
  ```
- Location: `src/app/account/signup/_components/OrganizerForm.tsx`

**Important:** When handling signup responses and setting user data, use the correct field names based on signup type.

### Cookie Cleanup vs Deletion

**`deleteCookie()`** - (Used in logout)
- Removes only the `eztUser` authentication cookie
- Leaves other cookies intact
- Good for logout flow where you want clean auth state
- Location: `src/lib/utils.ts` line 55

**`clearAllCookies()`** - (Available in useCookie hook)
- Removes ALL cookies from browser
- Clears localStorage keys like `token` and `userProfile`
- More comprehensive cleanup
- Use when full session wipe needed (e.g., security logout)

```typescript
// Example usage from useCookie hook
export const clearAllCookies = () => {
  // Delete the authentication cookie
  deleteCookie();
  
  // Clear localStorage keys
  localStorage.removeItem("token");
  localStorage.removeItem("userProfile");
  // ... other localStorage keys
};
```

## Security Considerations
2. **SameSite Policy** - Prevents CSRF attacks
3. **JWT Signature** - Backend validates token signature
4. **Token Expiry** - Prevents indefinite session access
5. **ReCAPTCHA** - Prevents bot login attempts
6. **Password Hashing** - Passwords hashed on backend (bcrypt or similar)
7. **Rate Limiting** - Backend should rate-limit login attempts
8. **HTTPS Enforcement** - Redirect HTTP to HTTPS
9. **Secure Headers** - Use security headers (CSP, X-Frame-Options, etc.)

---

**Last Updated:** March 2026  
**Version:** 1.0  
**Maintained By:** RF Technologies Team
