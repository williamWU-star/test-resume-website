# Security Specification - Personal Resume Webpage

This document defines the security boundaries, data invariants, and mock payloads for the `resumes` Firestore collection.

## 1. Data Invariants

*   **Public Visibility**: Resumes can be read (`get` and `list`) by any visitor (signed in or anonymous) to allow people to view the host's resume.
*   **Single Owner Control**: A resume document under `resumes/{resumeId}` can only be created or modified if the document's `ownerId` perfectly matches `request.auth.uid`.
*   **Email Verified Auth**: To prevent spoofing and spam, a user must have a verified Firebase Auth email (`request.auth.token.email_verified == true`) to perform creating or updating operations.
*   **Immutability of Owner ID**: Once created, the `ownerId` and `ownerEmail` of a resume cannot be altered under any circumstances.
*   **Field Level Validation**:
    *   `fullName` must be a string between 1 and 100 characters.
    *   `title` must be a string up to 100 characters.
    *   `email` must be a string up to 100 characters containing a valid-looking email format or basic length checks.
    *   `theme` must be a string up to 50 characters.

## 2. Invalidation & The "Dirty Dozen" Payloads

Here are the 12 attack vectors (Dirty Dozen) tested to confirm security:

1.  **Unauthenticated Write**: An anonymous user attempts to write a resume. *(Result: Denied)*
2.  **Unverified Email Write**: A user with `email_verified == false` attempts to write. *(Result: Denied)*
3.  **Identity Hijacking**: A user (UID `attacker123`) attempts to create a resume with `ownerId` set to `victim456`. *(Result: Denied)*
4.  **Shadow Update on Owner UID**: A user attempts to update their own resume to change the `ownerId` to someone else. *(Result: Denied)*
5.  **Exorbitant Payload (Denial of Wallet)**: A user attempts to set `fullName` to a 10MB string. *(Result: Denied)*
6.  **Path Variable Poisoning**: A user attempts to target a resume document with an extremely long invalid ID string. *(Result: Denied)*
7.  **Ghost Code Insertion**: A user attempts to add unmodeled fields to bypass strict parameters. *(Result: Denied)*
8.  **Fake Claim Spoof**: Attackers setting their own `isFeatured` flag. *(Result: Denied)*
9.  **Relational Orphan Write**: Attempting to set `ownerEmail` to something different than the authenticated user's email. *(Result: Denied)*
10. **Malicious Theme Injection**: Injecting script tags or HTML in the `theme` field. *(Result: Denied)*
11. **Malicious Resume Delete**: A user attempts to delete another user's resume. *(Result: Denied)*
12. **Malicious Resume Reading (If Private)**: N/A since resumes are public read, but write-rejection is verified.

## 3. Security Rules Draft (The Fortress Rules)

The final security rules will be written to `firestore.rules`.
