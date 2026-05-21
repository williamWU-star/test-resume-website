import { useEffect, useState } from "react";
import { 
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut, 
  onAuthStateChanged, 
  User 
} from "firebase/auth";
import { 
  doc, 
  getDoc, 
  setDoc, 
  getDocFromServer 
} from "firebase/firestore";
import { db, auth, handleFirestoreError, OperationType } from "./firebase";
import { ResumeData } from "./types";
import { defaultResume } from "./data";
import ResumeView from "./components/ResumeView";
import ResumeEdit from "./components/ResumeEdit";
import { 
  UserCheck, 
  LogIn, 
  LogOut, 
  Sparkles, 
  Palette, 
  Edit3, 
  Eye, 
  Globe, 
  Loader2, 
  AlertTriangle 
} from "lucide-react";

// The official host email configured in the environment
const HOST_EMAIL = "wuchihua@stust.edu.tw";

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [hostResume, setHostResume] = useState<ResumeData>(defaultResume);
  const [userResume, setUserResume] = useState<ResumeData | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [isDataLoading, setIsDataLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [viewingMode, setViewingMode] = useState<"host" | "mine">("host");
  const [errorNotice, setErrorNotice] = useState<string | null>(null);

  // 1. Connection probe on startup
  useEffect(() => {
    async function testConnection() {
      try {
        await getDocFromServer(doc(db, "resumes", "connection_probe"));
      } catch (error) {
        if (error instanceof Error && error.message.includes("offline")) {
          console.error("Firebase is offline. Check credentials or internet connection.");
        }
      }
    }
    testConnection();
  }, []);

  // 2. Fetch the master host resume
  useEffect(() => {
    async function fetchHostResume() {
      try {
        const docRef = doc(db, "resumes", "host_resume");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setHostResume(docSnap.data() as ResumeData);
        } else {
          // If no host resume exists yet in Firestore, we use the default fallback
          setHostResume(defaultResume);
        }
      } catch (error) {
        console.warn("Could not fetch host resume from database, utilizing fallback local structure.", error);
      } finally {
        setIsDataLoading(false);
      }
    }
    fetchHostResume();
  }, []);

  // 3. Coordinate Auth states and load user-specific resumes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      setIsAuthLoading(true);
      setErrorNotice(null);

      if (currentUser) {
        try {
          // If the logged-in user is the host, they can edit 'host_resume'
          const docId = currentUser.email === HOST_EMAIL ? "host_resume" : currentUser.uid;
          const userDocRef = doc(db, "resumes", docId);
          const userDocSnap = await getDoc(userDocRef);

          if (userDocSnap.exists()) {
            setUserResume(userDocSnap.data() as ResumeData);
          } else {
            // Bootstrap new empty/temp resume details based on template
            const bootstrappedResume: ResumeData = {
              ...defaultResume,
              fullName: currentUser.displayName || defaultResume.fullName,
              email: currentUser.email || defaultResume.email,
              avatarUrl: currentUser.photoURL || defaultResume.avatarUrl,
              ownerId: currentUser.uid,
              ownerEmail: currentUser.email || "",
              isFeatured: currentUser.email === HOST_EMAIL,
              theme: defaultResume.theme
            };
            setUserResume(bootstrappedResume);
          }

          // If current user is host, keep viewing host mode but allow switching
          if (currentUser.email === HOST_EMAIL) {
            setViewingMode("host");
          } else {
            setViewingMode("mine");
          }
        } catch (error) {
          console.error("Error retrieving user resume profile", error);
          setErrorNotice("Failed to load your personal resume space. Authenticated permissions check failed.");
        }
      } else {
        setUserResume(null);
        setViewingMode("host");
        setIsEditing(false);
      }
      setIsAuthLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    try {
      setErrorNotice(null);
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Google authentication action failed", error);
      setErrorNotice("Sign-in process failed. Please check permissions.");
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Sign out action failed", error);
    }
  };

  // 4. Save edits persistently to Firestore
  const handleSaveResume = async (updatedData: ResumeData) => {
    if (!user) return;
    setIsSaving(true);
    setErrorNotice(null);

    // Determine target document ID: host's email profile or personal UID
    const docId = user.email === HOST_EMAIL ? "host_resume" : user.uid;
    const cleanData: ResumeData = {
      ...updatedData,
      ownerId: user.uid,
      ownerEmail: user.email || ""
    };

    try {
      const docRef = doc(db, "resumes", docId);
      await setDoc(docRef, cleanData);

      // Instantly synchronize localized state view variables
      if (user.email === HOST_EMAIL) {
        setHostResume(cleanData);
      }
      setUserResume(cleanData);
      setIsEditing(false);
    } catch (error) {
      // Throw structured FirestoreErrorInfo object matching rules diagnostics guidelines
      handleFirestoreError(error, OperationType.WRITE, `resumes/${docId}`);
    } finally {
      setIsSaving(false);
    }
  };

  const activeData = viewingMode === "host" ? hostResume : (userResume || defaultResume);
  const isHostUser = user?.email === HOST_EMAIL;

  if (isAuthLoading) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center text-neutral-800 gap-3" id="loading-mask">
        <Loader2 className="w-8 h-8 animate-spin text-black" />
        <span className="font-mono text-xs tracking-widest text-[#1a1a1a] capitalize">Initializing secured session...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#f8f8f8] font-sans text-neutral-900" id="application-shell">
      
      {/* Dynamic Top Control Banner (Clean Minimalism Webbar) */}
      <nav className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-[#e5e5e5] px-6 py-4 shrink-0 flex flex-col sm:flex-row items-center justify-between gap-4" id="navigation-top-bar">
        
        {/* Brand Label & Hosting Context */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
            <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold tracking-tight text-lg text-black">ResuMate</span>
              <span className="text-[10px] uppercase tracking-widest text-[#1a1a1a] font-bold py-0.5 px-1.5 bg-[#f8f8f8] border border-gray-200 rounded-sm">Portfolio</span>
            </div>
            <p className="text-[10px] text-gray-400 font-mono tracking-tight flex items-center gap-1.5">
              <Globe className="w-3 h-3 text-neutral-500" />
              <span>stust.edu.tw Domain Sandbox</span>
            </p>
          </div>
        </div>

        {/* Workspace Operations & Credentials Control */}
        <div className="flex flex-wrap items-center gap-3" id="workspace-controls">
          {user ? (
            /* AUTHENTICATED USER BAR */
            <div className="flex items-center bg-[#f8f8f8] border border-[#e5e5e5] rounded-xl px-3.5 py-1.5 gap-3 shadow-xs text-xs" id="user-badge-container">
              {user.photoURL ? (
                <img 
                  src={user.photoURL} 
                  alt={user.displayName || "User"} 
                  className="w-5 h-5 rounded-full object-cover border border-[#e5e5e5]" 
                  referrerPolicy="no-referrer"
                />
              ) : (
                <UserCheck className="w-3.5 h-3.5 text-black" />
              )}
              <div className="flex flex-col text-left">
                <span className="font-semibold text-neutral-800 leading-none truncate max-w-[120px]">
                  {user.displayName || user.email}
                </span>
                <span className="text-[9px] text-neutral-400 leading-normal font-mono">
                  {isHostUser ? "Host Owner" : "Visitor sandbox"}
                </span>
              </div>

              {/* Only non-host users get space toggles */}
              {!isHostUser && (
                <div className="flex bg-white rounded-lg p-0.5 border border-gray-200" id="sandbox-space-toggle">
                  <button
                    onClick={() => { setViewingMode("host"); setIsEditing(false); }}
                    className={`px-2.5 py-1 rounded-md text-[9px] font-bold transition-all ${
                      viewingMode === "host" ? "bg-black text-white" : "text-neutral-500 hover:text-black"
                    }`}
                    id="btn-view-host-space"
                  >
                    Host View
                  </button>
                  <button
                    onClick={() => { setViewingMode("mine"); }}
                    className={`px-2.5 py-1 rounded-md text-[9px] font-bold transition-all ${
                      viewingMode === "mine" ? "bg-black text-white" : "text-neutral-500 hover:text-black"
                    }`}
                    id="btn-view-sandbox-space"
                  >
                    My Space
                  </button>
                </div>
              )}

              {/* Trigger Editor buttons depending on layout capabilities */}
              {(isHostUser || viewingMode === "mine") && (
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-[10px] font-bold tracking-wider uppercase transition border ${
                    isEditing 
                      ? "bg-white border-gray-200 text-neutral-800 hover:bg-neutral-50" 
                      : "bg-black border-transparent text-white hover:bg-neutral-900 shadow-sm"
                  }`}
                  id="btn-edit-toggle"
                >
                  {isEditing ? (
                    <>
                      <Eye className="w-3.5 h-3.5" />
                      <span>Preview</span>
                    </>
                  ) : (
                    <>
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Customize</span>
                    </>
                  )}
                </button>
              )}

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="text-neutral-400 hover:text-red-500 p-1.5 rounded-lg hover:bg-white border border-transparent hover:border-[#e5e5e5] transition"
                title="Disconnect Account"
                id="btn-logout"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            /* UNAUTHENTICATED LOGIN BUTTON matching "Sign in with Google" minimalist block */
            <button
              onClick={handleLogin}
              className="flex items-center gap-3 py-2 px-4 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors shadow-xs text-xs font-semibold"
              id="btn-login-trigger"
            >
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              <span>Sign in with Google</span>
            </button>
          )}
        </div>

      </nav>

      {/* Notifications Error panel */}
      {errorNotice && (
        <div className="bg-red-50 border-b border-red-200 text-red-850 text-xs py-3 px-6 flex items-center justify-between gap-3 text-left" id="error-feedback-banner">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-red-500 shrink-0" />
            <span>{errorNotice}</span>
          </div>
          <button onClick={() => setErrorNotice(null)} className="text-red-500 hover:text-red-700 font-mono text-[10px] uppercase font-bold shrink-0">Dismiss</button>
        </div>
      )}

      {/* Main Structural Content Split Layout */}
      <div className="flex-1 flex flex-col md:flex-row min-h-0 relative" id="layout-body-split">
        
        {/* Editor Sidebar Workspace */}
        {isEditing && (isHostUser || viewingMode === "mine") ? (
          <div className="w-full md:w-[480px] lg:w-[540px] shrink-0 border-b md:border-b-0 md:border-r border-[#e5e5e5] bg-[#f8f8f8] flex flex-col h-[520px] md:h-auto" id="editor-sidebar-container">
            <ResumeEdit
              initialData={activeData}
              onSave={handleSaveResume}
              onCancel={() => setIsEditing(false)}
              isSaving={isSaving}
            />
          </div>
        ) : null}

        {/* Display Visualizer Canvas */}
        <div className="flex-1 overflow-y-auto" id="resume-viewer-container">
          
          {/* Editor Status bar when previewing edits in Mine mode */}
          {user && !isEditing && (isHostUser || viewingMode === "mine") && (
            <div className="bg-white border-b border-[#e5e5e5] px-6 py-3 flex items-center justify-between gap-2 text-xs text-neutral-500" id="preview-status-indicator">
              <span className="flex items-center gap-2 font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-black"></span>
                <span>Active Profile: <strong className="text-black font-semibold">{isHostUser ? "Host (Featured)" : "Custom sandbox draft"}</strong></span>
              </span>
              <button 
                onClick={() => setIsEditing(true)} 
                className="text-black hover:underline font-bold flex items-center gap-1"
                id="btn-re-edit"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Customize Profile</span>
              </button>
            </div>
          )}

          {/* Render ResumeView with beautiful theme setups */}
          <div className="relative" id="resume-view-canvas">
            {isDataLoading ? (
              <div className="flex flex-col items-center justify-center p-32 text-neutral-400 gap-2" id="canvas-loader">
                <Loader2 className="w-6 h-6 animate-spin text-neutral-500" />
                <span className="text-xs font-mono">Fetching profile...</span>
              </div>
            ) : (
              <ResumeView data={activeData} />
            )}
          </div>
        </div>

      </div>

      {/* Discrete Footer Info Bar */}
      <footer className="bg-white border-t border-[#e5e5e5] px-6 py-5 text-center text-[10px] text-gray-400 font-mono shrink-0" id="website-footer-bar">
        <div>
          <span>Personal Resume Webpage Platform &copy; 2026. Custom stust.edu.tw Faculty Hub.</span>
        </div>
        <div className="mt-1 flex justify-center items-center gap-1.5 opacity-80">
          <span>Powered and stored on sandboxed Google Cloud Run &amp; Firebase</span>
          {user ? (
            <span className="text-[#1a1a1a] font-bold">● Active session</span>
          ) : (
            <span className="text-neutral-400">● Draft state</span>
          )}
        </div>
      </footer>

    </div>
  );
}
